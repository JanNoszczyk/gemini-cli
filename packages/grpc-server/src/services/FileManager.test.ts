/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FileManager, FileMetadata, FileDiff, FileOperation } from './FileManager';
import * as fs from 'fs/promises';
import * as path from 'path';

// Mock fs module
vi.mock('fs/promises');

describe('FileManager', () => {
  let fileManager: FileManager;
  let mockDate: Date;

  const mockFs = vi.mocked(fs);

  beforeEach(() => {
    vi.useFakeTimers();
    fileManager = new FileManager();
    mockDate = new Date('2024-01-01T12:00:00Z');
    vi.setSystemTime(mockDate);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('file reading', () => {
    it('should read file with metadata', async () => {
      const mockStats = {
        size: 1024,
        mtime: mockDate,
        isDirectory: vi.fn().mockReturnValue(false),
        isSymbolicLink: vi.fn().mockReturnValue(false),
        mode: 33188, // 0o100644
      };

      mockFs.stat.mockResolvedValue(mockStats as any);
      mockFs.readFile.mockResolvedValue('Hello, World!');

      const eventSpy = vi.fn();
      fileManager.on('fileRead', eventSpy);

      const result = await fileManager.readFile('/test/file.txt');

      expect(result.content).toBe('Hello, World!');
      expect(result.metadata.path).toBe(path.resolve('/test/file.txt'));
      expect(result.metadata.size).toBe(1024);
      expect(result.metadata.type).toBe('file');
      expect(result.metadata.encoding).toBe('utf8');
      expect(result.metadata.checksum).toBeDefined();

      expect(eventSpy).toHaveBeenCalledWith({
        filePath: path.resolve('/test/file.txt'),
        metadata: result.metadata,
      });
    });

    it('should use cached file content', async () => {
      const mockStats = {
        size: 1024,
        mtime: mockDate,
        isDirectory: vi.fn().mockReturnValue(false),
        isSymbolicLink: vi.fn().mockReturnValue(false),
        mode: 33188,
      };

      mockFs.stat.mockResolvedValue(mockStats as any);
      mockFs.readFile.mockResolvedValue('Hello, World!');

      // First read
      await fileManager.readFile('/test/file.txt');
      
      // Second read should use cache
      const result = await fileManager.readFile('/test/file.txt');

      expect(mockFs.readFile).toHaveBeenCalledTimes(1);
      expect(result.content).toBe('Hello, World!');
    });

    it('should handle read errors', async () => {
      const error = new Error('File not found');
      mockFs.stat.mockRejectedValue(error);

      const errorSpy = vi.fn();
      fileManager.on('fileError', errorSpy);

      await expect(fileManager.readFile('/nonexistent/file.txt')).rejects.toThrow('File not found');

      expect(errorSpy).toHaveBeenCalledWith({
        operation: 'read',
        filePath: path.resolve('/nonexistent/file.txt'),
        error: 'File not found',
      });
    });
  });

  describe('file writing', () => {
    it('should write file with backup', async () => {
      const mockStats = {
        size: 1024,
        mtime: mockDate,
        isDirectory: vi.fn().mockReturnValue(false),
        isSymbolicLink: vi.fn().mockReturnValue(false),
        mode: 33188,
      };

      mockFs.stat.mockResolvedValue(mockStats as any);
      mockFs.readFile.mockResolvedValue('Old content');
      mockFs.mkdir.mockResolvedValue(undefined);
      mockFs.writeFile.mockResolvedValue();
      mockFs.copyFile.mockResolvedValue();

      // Mock file exists check
      vi.spyOn(fileManager as any, 'fileExists').mockResolvedValue(true);

      const eventSpy = vi.fn();
      const backupSpy = vi.fn();
      fileManager.on('fileWritten', eventSpy);
      fileManager.on('backupCreated', backupSpy);

      const operation = await fileManager.writeFile('/test/file.txt', 'New content');

      expect(operation.status).toBe('completed');
      expect(operation.type).toBe('write');
      expect(operation.content).toBe('New content');
      expect(operation.backup).toBe(true);

      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.resolve('/test/file.txt'),
        'New content',
        'utf8'
      );

      expect(backupSpy).toHaveBeenCalled();
      expect(eventSpy).toHaveBeenCalled();
    });

    it('should generate diff preview for existing files', async () => {
      const mockStats = {
        size: 1024,
        mtime: mockDate,
        isDirectory: vi.fn().mockReturnValue(false),
        isSymbolicLink: vi.fn().mockReturnValue(false),
        mode: 33188,
      };

      mockFs.stat.mockResolvedValue(mockStats as any);
      mockFs.readFile.mockResolvedValue('Line 1\nLine 2\nLine 3');
      mockFs.mkdir.mockResolvedValue(undefined);
      mockFs.writeFile.mockResolvedValue();
      mockFs.copyFile.mockResolvedValue();

      vi.spyOn(fileManager as any, 'fileExists').mockResolvedValue(true);

      const operation = await fileManager.writeFile(
        '/test/file.txt',
        'Line 1\nModified Line 2\nLine 3'
      );

      expect(operation.preview).toBeDefined();
      expect(operation.preview!.filePath).toBe(path.resolve('/test/file.txt'));
      expect(operation.preview!.binary).toBe(false);
      expect(operation.preview!.summary.linesModified).toBeGreaterThan(0);
    });

    it('should handle write errors', async () => {
      const error = new Error('Permission denied');
      mockFs.mkdir.mockRejectedValue(error);

      const errorSpy = vi.fn();
      fileManager.on('fileError', errorSpy);

      await expect(fileManager.writeFile('/test/file.txt', 'content')).rejects.toThrow('Permission denied');

      const operation = fileManager.getAllOperations().find(op => op.type === 'write');
      expect(operation?.status).toBe('failed');
      expect(operation?.error).toBe('Permission denied');
    });
  });

  describe('file editing', () => {
    it('should apply patches to file content', async () => {
      const originalContent = 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5';
      
      mockFs.stat.mockResolvedValue({
        size: 1024,
        mtime: mockDate,
        isDirectory: vi.fn().mockReturnValue(false),
        isSymbolicLink: vi.fn().mockReturnValue(false),
        mode: 33188,
      } as any);

      mockFs.readFile.mockResolvedValue(originalContent);
      mockFs.mkdir.mockResolvedValue(undefined);
      mockFs.writeFile.mockResolvedValue();
      mockFs.copyFile.mockResolvedValue();

      vi.spyOn(fileManager as any, 'fileExists').mockResolvedValue(true);

      const patches = [
        { startLine: 2, endLine: 2, newContent: 'Modified Line 2' },
        { startLine: 4, endLine: 5, newContent: 'Combined Line 4-5' },
      ];

      const eventSpy = vi.fn();
      fileManager.on('fileEdited', eventSpy);

      const operation = await fileManager.editFile('/test/file.txt', patches);

      expect(operation.status).toBe('completed');
      expect(operation.type).toBe('edit');
      expect(operation.preview).toBeDefined();

      expect(eventSpy).toHaveBeenCalledWith({
        filePath: path.resolve('/test/file.txt'),
        patches,
        operationId: operation.id,
      });
    });
  });

  describe('file deletion', () => {
    it('should delete file with backup', async () => {
      const mockStats = {
        isDirectory: vi.fn().mockReturnValue(false),
      };

      mockFs.stat.mockResolvedValue(mockStats as any);
      mockFs.copyFile.mockResolvedValue();
      mockFs.unlink.mockResolvedValue();

      const eventSpy = vi.fn();
      const backupSpy = vi.fn();
      fileManager.on('fileDeleted', eventSpy);
      fileManager.on('backupCreated', backupSpy);

      const operation = await fileManager.deleteFile('/test/file.txt');

      expect(operation.status).toBe('completed');
      expect(operation.type).toBe('delete');

      expect(mockFs.unlink).toHaveBeenCalledWith(path.resolve('/test/file.txt'));
      expect(backupSpy).toHaveBeenCalled();
      expect(eventSpy).toHaveBeenCalled();
    });

    it('should delete directory recursively', async () => {
      const mockStats = {
        isDirectory: vi.fn().mockReturnValue(true),
      };

      mockFs.stat.mockResolvedValue(mockStats as any);
      mockFs.rm.mockResolvedValue();

      // Mock copyDirectory method
      vi.spyOn(fileManager as any, 'copyDirectory').mockResolvedValue(undefined);

      const operation = await fileManager.deleteFile('/test/dir', { recursive: true });

      expect(operation.status).toBe('completed');
      expect(mockFs.rm).toHaveBeenCalledWith(
        path.resolve('/test/dir'),
        { recursive: true, force: true }
      );
    });
  });

  describe('file moving', () => {
    it('should move file to new location', async () => {
      mockFs.mkdir.mockResolvedValue(undefined);
      mockFs.rename.mockResolvedValue();

      const eventSpy = vi.fn();
      fileManager.on('fileMoved', eventSpy);

      const operation = await fileManager.moveFile('/test/old.txt', '/test/new.txt');

      expect(operation.status).toBe('completed');
      expect(operation.type).toBe('move');
      expect(operation.filePath).toBe(path.resolve('/test/old.txt'));
      expect(operation.targetPath).toBe(path.resolve('/test/new.txt'));

      expect(mockFs.rename).toHaveBeenCalledWith(
        path.resolve('/test/old.txt'),
        path.resolve('/test/new.txt')
      );

      expect(eventSpy).toHaveBeenCalledWith({
        sourcePath: path.resolve('/test/old.txt'),
        targetPath: path.resolve('/test/new.txt'),
        operationId: operation.id,
      });
    });
  });

  describe('diff generation', () => {
    it('should generate unified diff for text changes', () => {
      const oldContent = 'Line 1\nLine 2\nLine 3';
      const newContent = 'Line 1\nModified Line 2\nLine 3\nLine 4';

      const diff = fileManager.generateDiff('/test/file.txt', oldContent, newContent);

      expect(diff.filePath).toBe('/test/file.txt');
      expect(diff.binary).toBe(false);
      expect(diff.oldContent).toBe(oldContent);
      expect(diff.newContent).toBe(newContent);
      expect(diff.chunks.length).toBeGreaterThan(0);
      expect(diff.summary.linesAdded).toBeGreaterThan(0);
    });

    it('should detect binary content', () => {
      const binaryContent = 'Binary\0Content';
      const textContent = 'Text content';

      const diff = fileManager.generateDiff('/test/binary.bin', binaryContent, textContent);

      expect(diff.binary).toBe(true);
      expect(diff.chunks).toHaveLength(0);
    });

    it('should compute LCS correctly', () => {
      const oldContent = 'A\nB\nC\nD';
      const newContent = 'A\nX\nC\nY';

      const diff = fileManager.generateDiff('/test/file.txt', oldContent, newContent);

      // The diff should detect changes
      expect(diff.chunks.length).toBeGreaterThan(0);
      expect(diff.summary.linesAdded + diff.summary.linesRemoved + diff.summary.linesModified).toBeGreaterThan(0);
    });
  });

  describe('directory listing', () => {
    it('should list directory contents with metadata', async () => {
      const mockEntries = [
        { name: 'file1.txt', isDirectory: vi.fn().mockReturnValue(false), isSymbolicLink: vi.fn().mockReturnValue(false) },
        { name: 'dir1', isDirectory: vi.fn().mockReturnValue(true), isSymbolicLink: vi.fn().mockReturnValue(false) },
        { name: '.hidden', isDirectory: vi.fn().mockReturnValue(false), isSymbolicLink: vi.fn().mockReturnValue(false) },
      ];

      const mockStats = {
        size: 1024,
        mtime: mockDate,
        mode: 33188,
      };

      mockFs.readdir.mockResolvedValue(mockEntries as any);
      mockFs.stat.mockResolvedValue(mockStats as any);

      const results = await fileManager.listDirectory('/test');

      expect(results).toHaveLength(2); // Excludes hidden file by default
      expect(results[0].type).toBe('directory');
      expect(results[1].type).toBe('file');
    });

    it('should include hidden files when requested', async () => {
      const mockEntries = [
        { name: 'file1.txt', isDirectory: vi.fn().mockReturnValue(false), isSymbolicLink: vi.fn().mockReturnValue(false) },
        { name: '.hidden', isDirectory: vi.fn().mockReturnValue(false), isSymbolicLink: vi.fn().mockReturnValue(false) },
      ];

      const mockStats = {
        size: 1024,
        mtime: mockDate,
        mode: 33188,
      };

      mockFs.readdir.mockResolvedValue(mockEntries as any);
      mockFs.stat.mockResolvedValue(mockStats as any);

      const results = await fileManager.listDirectory('/test', { includeHidden: true });

      expect(results).toHaveLength(2);
    });

    it('should filter by pattern', async () => {
      const mockEntries = [
        { name: 'file1.txt', isDirectory: vi.fn().mockReturnValue(false), isSymbolicLink: vi.fn().mockReturnValue(false) },
        { name: 'file2.js', isDirectory: vi.fn().mockReturnValue(false), isSymbolicLink: vi.fn().mockReturnValue(false) },
        { name: 'README.md', isDirectory: vi.fn().mockReturnValue(false), isSymbolicLink: vi.fn().mockReturnValue(false) },
      ];

      const mockStats = {
        size: 1024,
        mtime: mockDate,
        mode: 33188,
      };

      mockFs.readdir.mockResolvedValue(mockEntries as any);
      mockFs.stat.mockResolvedValue(mockStats as any);

      const results = await fileManager.listDirectory('/test', { pattern: /\.txt$/ });

      expect(results).toHaveLength(1);
      expect(results[0].path).toContain('file1.txt');
    });
  });

  describe('operation management', () => {
    it('should track all operations', async () => {
      mockFs.stat.mockResolvedValue({
        size: 1024,
        mtime: mockDate,
        isDirectory: vi.fn().mockReturnValue(false),
        isSymbolicLink: vi.fn().mockReturnValue(false),
        mode: 33188,
      } as any);
      mockFs.mkdir.mockResolvedValue(undefined);
      mockFs.writeFile.mockResolvedValue();

      vi.spyOn(fileManager as any, 'fileExists').mockResolvedValue(false);

      const operation = await fileManager.writeFile('/test/file.txt', 'content');

      expect(fileManager.getOperation(operation.id)).toBeDefined();
      expect(fileManager.getAllOperations()).toHaveLength(1);
    });

    it('should cancel pending operations', async () => {
      // Create a pending operation by mocking it
      const operationId = (fileManager as any).generateOperationId();
      const operation: FileOperation = {
        id: operationId,
        type: 'write',
        filePath: '/test/file.txt',
        content: 'content',
        timestamp: new Date(),
        status: 'pending',
      };

      (fileManager as any).operations.set(operationId, operation);

      const eventSpy = vi.fn();
      fileManager.on('operationCancelled', eventSpy);

      const cancelled = fileManager.cancelOperation(operationId);

      expect(cancelled).toBe(true);
      expect(operation.status).toBe('failed');
      expect(operation.error).toBe('Operation cancelled');
      expect(eventSpy).toHaveBeenCalledWith({ operationId });
    });

    it('should clear completed operations', async () => {
      // Add completed operation manually
      const operationId = (fileManager as any).generateOperationId();
      const operation: FileOperation = {
        id: operationId,
        type: 'write',
        filePath: '/test/file.txt',
        timestamp: new Date(),
        status: 'completed',
      };

      (fileManager as any).operations.set(operationId, operation);

      const cleared = fileManager.clearCompletedOperations();

      expect(cleared).toBe(1);
      expect(fileManager.getAllOperations()).toHaveLength(0);
    });
  });

  describe('cache management', () => {
    it('should clean up expired cache entries', async () => {
      const oldTime = new Date(mockDate.getTime() - 10 * 60 * 1000); // 10 minutes ago
      
      // Manually add expired cache entry
      const normalizedPath = path.resolve('/test/file.txt');
      (fileManager as any).fileCache.set(normalizedPath, {
        content: 'old content',
        metadata: {} as FileMetadata,
        timestamp: oldTime,
      });

      // Trigger cleanup
      (fileManager as any).cleanupCache();

      expect((fileManager as any).fileCache.has(normalizedPath)).toBe(false);
    });

    it('should limit cache size', async () => {
      const mockStats = {
        size: 1024,
        mtime: mockDate,
        isDirectory: vi.fn().mockReturnValue(false),
        isSymbolicLink: vi.fn().mockReturnValue(false),
        mode: 33188,
      };

      mockFs.stat.mockResolvedValue(mockStats as any);
      mockFs.readFile.mockResolvedValue('content');

      // Set a small cache size for testing
      (fileManager as any).maxCacheSize = 2;

      // Read multiple files to exceed cache size
      await fileManager.readFile('/test/file1.txt');
      await fileManager.readFile('/test/file2.txt');
      await fileManager.readFile('/test/file3.txt');

      expect((fileManager as any).fileCache.size).toBeLessThanOrEqual(2);
    });
  });

  describe('utility methods', () => {
    it('should calculate checksum correctly', () => {
      const content = 'Hello, World!';
      const checksum = (fileManager as any).calculateChecksum(content);
      
      expect(checksum).toBe('65a8e27d8879283831b664bd8b7f0ad4'); // MD5 of "Hello, World!"
    });

    it('should generate unique operation IDs', () => {
      const id1 = (fileManager as any).generateOperationId();
      const id2 = (fileManager as any).generateOperationId();
      
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^op_\d+_[a-z0-9]+$/);
    });

    it('should detect binary content', () => {
      const textContent = 'This is text content';
      const binaryContent = 'Binary\0Content';

      expect((fileManager as any).isBinaryContent(textContent)).toBe(false);
      expect((fileManager as any).isBinaryContent(binaryContent)).toBe(true);
    });
  });
});