/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { gemini } from '../proto/generated/gemini';
import { EventEmitter } from 'events';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';

export interface FileMetadata {
  path: string;
  size: number;
  mtime: Date;
  type: 'file' | 'directory' | 'symlink';
  permissions: string;
  checksum?: string;
  encoding?: string;
}

export interface DiffChunk {
  type: 'add' | 'remove' | 'modify' | 'context';
  oldLineStart: number;
  oldLineCount: number;
  newLineStart: number;
  newLineCount: number;
  lines: Array<{
    type: 'add' | 'remove' | 'context';
    content: string;
    oldLine?: number;
    newLine?: number;
  }>;
}

export interface FileDiff {
  filePath: string;
  oldContent?: string;
  newContent?: string;
  chunks: DiffChunk[];
  summary: {
    linesAdded: number;
    linesRemoved: number;
    linesModified: number;
  };
  binary: boolean;
}

export interface FileOperation {
  id: string;
  type: 'read' | 'write' | 'edit' | 'delete' | 'move' | 'copy' | 'mkdir';
  filePath: string;
  targetPath?: string; // For move/copy operations
  content?: string;
  encoding?: string;
  backup?: boolean;
  timestamp: Date;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  error?: string;
  preview?: FileDiff;
}

export interface FileWatchEvent {
  type: 'created' | 'modified' | 'deleted' | 'renamed';
  filePath: string;
  oldPath?: string; // For rename events
  metadata?: FileMetadata;
  timestamp: Date;
}

/**
 * Manages file operations, diff generation, and file system interactions
 */
export class FileManager extends EventEmitter {
  private operations = new Map<string, FileOperation>();
  private watchers = new Map<string, NodeJS.Timeout>();
  private fileCache = new Map<string, { content: string; metadata: FileMetadata; timestamp: Date }>();
  
  private readonly maxCacheSize = 100;
  private readonly maxCacheAge = 5 * 60 * 1000; // 5 minutes
  private readonly supportedEncodings = ['utf8', 'ascii', 'base64', 'binary'];

  constructor() {
    super();
    
    // Clean up cache periodically
    setInterval(() => this.cleanupCache(), 2 * 60 * 1000); // Every 2 minutes
  }

  /**
   * Read file with caching and metadata
   */
  async readFile(filePath: string, encoding: string = 'utf8'): Promise<{ content: string; metadata: FileMetadata }> {
    const normalizedPath = path.resolve(filePath);
    
    // Check cache first
    const cached = this.fileCache.get(normalizedPath);
    if (cached && Date.now() - cached.timestamp.getTime() < this.maxCacheAge) {
      return { content: cached.content, metadata: cached.metadata };
    }

    try {
      const stats = await fs.stat(normalizedPath);
      const content = await fs.readFile(normalizedPath, encoding as BufferEncoding);
      
      const metadata: FileMetadata = {
        path: normalizedPath,
        size: stats.size,
        mtime: stats.mtime,
        type: stats.isDirectory() ? 'directory' : stats.isSymbolicLink() ? 'symlink' : 'file',
        permissions: stats.mode.toString(8),
        encoding,
        checksum: this.calculateChecksum(content),
      };

      // Cache the result
      this.fileCache.set(normalizedPath, {
        content,
        metadata,
        timestamp: new Date(),
      });

      // Manage cache size
      if (this.fileCache.size > this.maxCacheSize) {
        const oldestKey = Array.from(this.fileCache.keys())[0];
        this.fileCache.delete(oldestKey);
      }

      this.emit('fileRead', { filePath: normalizedPath, metadata });
      return { content, metadata };
    } catch (error) {
      this.emit('fileError', { 
        operation: 'read', 
        filePath: normalizedPath, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }

  /**
   * Write file with backup and confirmation
   */
  async writeFile(
    filePath: string, 
    content: string, 
    options: {
      encoding?: string;
      backup?: boolean;
      createDirectories?: boolean;
      confirmOverwrite?: boolean;
    } = {}
  ): Promise<FileOperation> {
    const {
      encoding = 'utf8',
      backup = true,
      createDirectories = true,
      confirmOverwrite = true,
    } = options;

    const operationId = this.generateOperationId();
    const normalizedPath = path.resolve(filePath);
    
    const operation: FileOperation = {
      id: operationId,
      type: 'write',
      filePath: normalizedPath,
      content,
      encoding,
      backup,
      timestamp: new Date(),
      status: 'pending',
    };

    this.operations.set(operationId, operation);

    try {
      operation.status = 'executing';

      // Check if file exists
      const fileExists = await this.fileExists(normalizedPath);
      
      if (fileExists && confirmOverwrite) {
        // Generate preview diff
        const { content: oldContent } = await this.readFile(normalizedPath);
        operation.preview = this.generateDiff(normalizedPath, oldContent, content);
      }

      // Create directories if needed
      if (createDirectories) {
        const dir = path.dirname(normalizedPath);
        await fs.mkdir(dir, { recursive: true });
      }

      // Create backup if requested and file exists
      if (backup && fileExists) {
        const backupPath = `${normalizedPath}.backup.${Date.now()}`;
        await fs.copyFile(normalizedPath, backupPath);
        this.emit('backupCreated', { filePath: normalizedPath, backupPath });
      }

      // Write the file
      await fs.writeFile(normalizedPath, content, encoding as BufferEncoding);
      
      // Update cache
      const stats = await fs.stat(normalizedPath);
      const metadata: FileMetadata = {
        path: normalizedPath,
        size: stats.size,
        mtime: stats.mtime,
        type: 'file',
        permissions: stats.mode.toString(8),
        encoding,
        checksum: this.calculateChecksum(content),
      };

      this.fileCache.set(normalizedPath, {
        content,
        metadata,
        timestamp: new Date(),
      });

      operation.status = 'completed';
      this.emit('fileWritten', { filePath: normalizedPath, metadata, operationId });
      
      return operation;
    } catch (error) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : 'Unknown error';
      
      this.emit('fileError', {
        operation: 'write',
        filePath: normalizedPath,
        error: operation.error,
        operationId,
      });
      
      throw error;
    }
  }

  /**
   * Edit file with patch application
   */
  async editFile(
    filePath: string,
    patches: Array<{
      startLine: number;
      endLine: number;
      newContent: string;
    }>,
    options: { backup?: boolean } = {}
  ): Promise<FileOperation> {
    const { backup = true } = options;
    const operationId = this.generateOperationId();
    const normalizedPath = path.resolve(filePath);

    const operation: FileOperation = {
      id: operationId,
      type: 'edit',
      filePath: normalizedPath,
      backup,
      timestamp: new Date(),
      status: 'pending',
    };

    this.operations.set(operationId, operation);

    try {
      operation.status = 'executing';

      const { content: originalContent } = await this.readFile(normalizedPath);
      const lines = originalContent.split('\n');
      
      // Sort patches by start line (descending) to apply from bottom to top
      const sortedPatches = [...patches].sort((a, b) => b.startLine - a.startLine);
      
      let modifiedLines = [...lines];
      
      for (const patch of sortedPatches) {
        const { startLine, endLine, newContent } = patch;
        const newContentLines = newContent.split('\n');
        
        // Replace lines from startLine to endLine with newContent
        modifiedLines.splice(startLine - 1, endLine - startLine + 1, ...newContentLines);
      }
      
      const newContent = modifiedLines.join('\n');
      
      // Generate diff for preview
      operation.preview = this.generateDiff(normalizedPath, originalContent, newContent);
      
      // Write the modified content
      await this.writeFile(normalizedPath, newContent, { backup });
      
      operation.status = 'completed';
      this.emit('fileEdited', { filePath: normalizedPath, patches, operationId });
      
      return operation;
    } catch (error) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : 'Unknown error';
      
      this.emit('fileError', {
        operation: 'edit',
        filePath: normalizedPath,
        error: operation.error,
        operationId,
      });
      
      throw error;
    }
  }

  /**
   * Delete file or directory
   */
  async deleteFile(filePath: string, options: { recursive?: boolean; backup?: boolean } = {}): Promise<FileOperation> {
    const { recursive = false, backup = true } = options;
    const operationId = this.generateOperationId();
    const normalizedPath = path.resolve(filePath);

    const operation: FileOperation = {
      id: operationId,
      type: 'delete',
      filePath: normalizedPath,
      backup,
      timestamp: new Date(),
      status: 'pending',
    };

    this.operations.set(operationId, operation);

    try {
      operation.status = 'executing';

      const stats = await fs.stat(normalizedPath);
      
      // Create backup if requested
      if (backup) {
        const backupPath = `${normalizedPath}.deleted.${Date.now()}`;
        if (stats.isDirectory()) {
          await this.copyDirectory(normalizedPath, backupPath);
        } else {
          await fs.copyFile(normalizedPath, backupPath);
        }
        this.emit('backupCreated', { filePath: normalizedPath, backupPath });
      }

      // Delete the file/directory
      if (stats.isDirectory()) {
        await fs.rm(normalizedPath, { recursive, force: true });
      } else {
        await fs.unlink(normalizedPath);
      }

      // Remove from cache
      this.fileCache.delete(normalizedPath);

      operation.status = 'completed';
      this.emit('fileDeleted', { filePath: normalizedPath, operationId });
      
      return operation;
    } catch (error) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : 'Unknown error';
      
      this.emit('fileError', {
        operation: 'delete',
        filePath: normalizedPath,
        error: operation.error,
        operationId,
      });
      
      throw error;
    }
  }

  /**
   * Move/rename file
   */
  async moveFile(sourcePath: string, targetPath: string): Promise<FileOperation> {
    const operationId = this.generateOperationId();
    const normalizedSource = path.resolve(sourcePath);
    const normalizedTarget = path.resolve(targetPath);

    const operation: FileOperation = {
      id: operationId,
      type: 'move',
      filePath: normalizedSource,
      targetPath: normalizedTarget,
      timestamp: new Date(),
      status: 'pending',
    };

    this.operations.set(operationId, operation);

    try {
      operation.status = 'executing';

      // Ensure target directory exists
      const targetDir = path.dirname(normalizedTarget);
      await fs.mkdir(targetDir, { recursive: true });

      // Move the file
      await fs.rename(normalizedSource, normalizedTarget);

      // Update cache
      const cached = this.fileCache.get(normalizedSource);
      if (cached) {
        this.fileCache.delete(normalizedSource);
        this.fileCache.set(normalizedTarget, {
          ...cached,
          metadata: { ...cached.metadata, path: normalizedTarget },
        });
      }

      operation.status = 'completed';
      this.emit('fileMoved', { 
        sourcePath: normalizedSource, 
        targetPath: normalizedTarget, 
        operationId 
      });
      
      return operation;
    } catch (error) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : 'Unknown error';
      
      this.emit('fileError', {
        operation: 'move',
        filePath: normalizedSource,
        error: operation.error,
        operationId,
      });
      
      throw error;
    }
  }

  /**
   * Generate unified diff between two file contents
   */
  generateDiff(filePath: string, oldContent: string, newContent: string): FileDiff {
    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');
    
    // Check if content is binary
    const isBinary = this.isBinaryContent(oldContent) || this.isBinaryContent(newContent);
    
    if (isBinary) {
      return {
        filePath,
        oldContent,
        newContent,
        chunks: [],
        summary: { linesAdded: 0, linesRemoved: 0, linesModified: 0 },
        binary: true,
      };
    }

    const chunks: DiffChunk[] = [];
    const diff = this.computeLCS(oldLines, newLines);
    
    let linesAdded = 0;
    let linesRemoved = 0;
    let linesModified = 0;

    // Convert LCS result to chunks
    let oldIndex = 0;
    let newIndex = 0;
    let currentChunk: DiffChunk | null = null;

    for (const change of diff) {
      if (change.type === 'context') {
        // Add context lines and finalize current chunk if exists
        if (currentChunk) {
          chunks.push(currentChunk);
          currentChunk = null;
        }
        oldIndex++;
        newIndex++;
      } else {
        // Start new chunk if needed
        if (!currentChunk) {
          currentChunk = {
            type: 'modify',
            oldLineStart: oldIndex + 1,
            oldLineCount: 0,
            newLineStart: newIndex + 1,
            newLineCount: 0,
            lines: [],
          };
        }

        if (change.type === 'remove') {
          currentChunk.lines.push({
            type: 'remove',
            content: change.content,
            oldLine: oldIndex + 1,
          });
          currentChunk.oldLineCount++;
          linesRemoved++;
          oldIndex++;
        } else if (change.type === 'add') {
          currentChunk.lines.push({
            type: 'add',
            content: change.content,
            newLine: newIndex + 1,
          });
          currentChunk.newLineCount++;
          linesAdded++;
          newIndex++;
        }
      }
    }

    // Add final chunk if exists
    if (currentChunk) {
      chunks.push(currentChunk);
    }

    // Calculate modified lines (approximate)
    linesModified = Math.min(linesAdded, linesRemoved);
    linesAdded -= linesModified;
    linesRemoved -= linesModified;

    return {
      filePath,
      oldContent,
      newContent,
      chunks,
      summary: { linesAdded, linesRemoved, linesModified },
      binary: false,
    };
  }

  /**
   * List directory contents with metadata
   */
  async listDirectory(dirPath: string, options: {
    recursive?: boolean;
    includeHidden?: boolean;
    pattern?: RegExp;
  } = {}): Promise<FileMetadata[]> {
    const { recursive = false, includeHidden = false, pattern } = options;
    const normalizedPath = path.resolve(dirPath);
    
    try {
      const entries = await fs.readdir(normalizedPath, { withFileTypes: true });
      const results: FileMetadata[] = [];

      for (const entry of entries) {
        if (!includeHidden && entry.name.startsWith('.')) {
          continue;
        }

        if (pattern && !pattern.test(entry.name)) {
          continue;
        }

        const fullPath = path.join(normalizedPath, entry.name);
        const stats = await fs.stat(fullPath);
        
        const metadata: FileMetadata = {
          path: fullPath,
          size: stats.size,
          mtime: stats.mtime,
          type: entry.isDirectory() ? 'directory' : entry.isSymbolicLink() ? 'symlink' : 'file',
          permissions: stats.mode.toString(8),
        };

        results.push(metadata);

        // Recurse into subdirectories if requested
        if (recursive && entry.isDirectory()) {
          const subResults = await this.listDirectory(fullPath, options);
          results.push(...subResults);
        }
      }

      return results.sort((a, b) => a.path.localeCompare(b.path));
    } catch (error) {
      this.emit('fileError', {
        operation: 'list',
        filePath: normalizedPath,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  /**
   * Get file operation by ID
   */
  getOperation(operationId: string): FileOperation | undefined {
    return this.operations.get(operationId);
  }

  /**
   * Get all file operations
   */
  getAllOperations(): FileOperation[] {
    return Array.from(this.operations.values());
  }

  /**
   * Cancel pending operation
   */
  cancelOperation(operationId: string): boolean {
    const operation = this.operations.get(operationId);
    if (operation && operation.status === 'pending') {
      operation.status = 'failed';
      operation.error = 'Operation cancelled';
      this.emit('operationCancelled', { operationId });
      return true;
    }
    return false;
  }

  /**
   * Clear completed operations
   */
  clearCompletedOperations(): number {
    const completed = Array.from(this.operations.entries())
      .filter(([_, op]) => op.status === 'completed' || op.status === 'failed');
    
    for (const [id] of completed) {
      this.operations.delete(id);
    }
    
    return completed.length;
  }

  /**
   * Check if file exists
   */
  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Calculate file checksum
   */
  private calculateChecksum(content: string): string {
    return crypto.createHash('md5').update(content).digest('hex');
  }

  /**
   * Generate unique operation ID
   */
  private generateOperationId(): string {
    return `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Check if content is binary
   */
  private isBinaryContent(content: string): boolean {
    // Simple heuristic: check for null bytes
    return content.includes('\0');
  }

  /**
   * Compute Longest Common Subsequence for diff generation
   */
  private computeLCS(oldLines: string[], newLines: string[]): Array<{
    type: 'add' | 'remove' | 'context';
    content: string;
  }> {
    const m = oldLines.length;
    const n = newLines.length;
    
    // Create LCS table
    const lcs: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (oldLines[i - 1] === newLines[j - 1]) {
          lcs[i][j] = lcs[i - 1][j - 1] + 1;
        } else {
          lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);
        }
      }
    }
    
    // Backtrack to build diff
    const result: Array<{ type: 'add' | 'remove' | 'context'; content: string }> = [];
    let i = m;
    let j = n;
    
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
        result.unshift({ type: 'context', content: oldLines[i - 1] });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || lcs[i][j - 1] >= lcs[i - 1][j])) {
        result.unshift({ type: 'add', content: newLines[j - 1] });
        j--;
      } else if (i > 0) {
        result.unshift({ type: 'remove', content: oldLines[i - 1] });
        i--;
      }
    }
    
    return result;
  }

  /**
   * Copy directory recursively
   */
  private async copyDirectory(source: string, target: string): Promise<void> {
    await fs.mkdir(target, { recursive: true });
    const entries = await fs.readdir(source, { withFileTypes: true });
    
    for (const entry of entries) {
      const sourcePath = path.join(source, entry.name);
      const targetPath = path.join(target, entry.name);
      
      if (entry.isDirectory()) {
        await this.copyDirectory(sourcePath, targetPath);
      } else {
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  }

  /**
   * Clean up old cache entries
   */
  private cleanupCache(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];
    
    for (const [key, cached] of this.fileCache.entries()) {
      if (now - cached.timestamp.getTime() > this.maxCacheAge) {
        expiredKeys.push(key);
      }
    }
    
    for (const key of expiredKeys) {
      this.fileCache.delete(key);
    }
  }
}