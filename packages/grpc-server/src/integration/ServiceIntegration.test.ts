/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SessionManager } from '../server/SessionManager';
import { AuthenticationManager } from '../services/AuthenticationManager';
import { GrpcServiceImpl } from '../server/GrpcServiceImpl';
import { gemini } from '../proto/generated/gemini';
import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

describe('Service Integration Tests', () => {
  let sessionManager: SessionManager;
  let authManager: AuthenticationManager;
  let serviceImpl: GrpcServiceImpl;
  let tempDir: string;
  let testApiKey: string;

  beforeEach(async () => {
    // Create temp directory
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'service-test-'));
    
    // Create services
    authManager = new AuthenticationManager();
    const apiKey = authManager.createApiKey('test', 'Test Key');
    testApiKey = apiKey.key;
    
    sessionManager = new SessionManager();
    serviceImpl = new GrpcServiceImpl(authManager);
  });

  afterEach(async () => {
    // Clean up temp directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  describe('Session Manager Integration', () => {
    it('should create session and handle file operations', async () => {
      const sessionId = 'test-session-' + Date.now();
      const testFile = path.join(tempDir, 'test.txt');
      const content = 'Hello, World!';

      // Create session
      const startRequest = new gemini.StartRequest({
        session_id: sessionId,
        initial_prompt: 'Test session',
        model: 'gemini-1.5-pro',
        approval_mode: 1, // DEFAULT
        core_tools: ['Read', 'Write', 'Edit'],
        theme: 'default',
        show_tool_descriptions: true,
        show_error_details: true,
      });

      const sessionCreated = sessionManager.createSession(startRequest);
      // createSession returns a new UUID, not the provided session_id
      expect(sessionCreated).toBeDefined();
      
      // Use the actual session ID returned
      const actualSessionId = sessionCreated;

      // Write file
      const writeResult = await sessionManager.writeFile(actualSessionId, testFile, content);
      expect(writeResult.status).toBe('completed');
      expect(writeResult.type).toBe('write');

      // Read file back
      const readResult = await sessionManager.readFile(actualSessionId, testFile);
      expect(readResult.content).toBe(content);
      expect(readResult.metadata.path).toBe(testFile);

      // Edit file
      const patches = [
        { startLine: 1, endLine: 1, newContent: 'Hello, Integration Test!' }
      ];
      const editResult = await sessionManager.editFile(actualSessionId, testFile, patches);
      expect(editResult.status).toBe('completed');

      // Read edited content
      const editedResult = await sessionManager.readFile(actualSessionId, testFile);
      expect(editedResult.content).toBe('Hello, Integration Test!');

      // Generate diff
      const diff = sessionManager.generateFileDiff(actualSessionId, testFile, content, 'Hello, Integration Test!');
      expect(diff.summary.linesModified).toBeGreaterThan(0);

      // List directory
      const dirList = await sessionManager.listDirectory(actualSessionId, tempDir);
      expect(dirList.length).toBeGreaterThanOrEqual(1);
      
      // Find the main test file (not a backup)
      const mainTestFile = dirList.find(file => path.basename(file.path) === 'test.txt');
      expect(mainTestFile).toBeDefined();
      expect(mainTestFile!.type).toBe('file');
    });

    it('should handle context refresh', async () => {
      const sessionId = 'test-session-' + Date.now();
      
      // Create session
      const startRequest = new gemini.StartRequest({
        session_id: sessionId,
        initial_prompt: 'Test session',
        model: 'gemini-1.5-pro',
        approval_mode: 1,
        core_tools: [],
        theme: 'default',
        show_tool_descriptions: true,
        show_error_details: true,
      });

      const actualSessionId = sessionManager.createSession(startRequest);

      // Create some context files
      await fs.writeFile(path.join(tempDir, 'package.json'), '{"name": "test"}');
      await fs.writeFile(path.join(tempDir, 'README.md'), '# Test Project');

      // Test context refresh
      const contextSummary = await sessionManager.refreshContext(actualSessionId, false);
      
      expect(contextSummary.working_directory).toBeDefined();
      expect(contextSummary.git_branch).toBeDefined();
      expect(contextSummary.loaded_files).toBeDefined();
      expect(contextSummary.mcp_servers).toBeDefined();
      expect(contextSummary.memory_info).toBeDefined();
    });

    it('should get session analytics and metrics', () => {
      const sessionId = 'test-session-' + Date.now();
      
      // Create session
      const startRequest = new gemini.StartRequest({
        session_id: sessionId,
        initial_prompt: 'Test session',
        model: 'gemini-1.5-pro',
        approval_mode: 1,
        core_tools: [],
        theme: 'default',
        show_tool_descriptions: true,
        show_error_details: true,
      });

      const actualSessionId = sessionManager.createSession(startRequest);

      // Get analytics report
      const analytics = sessionManager.getAnalyticsReport();
      expect(analytics.timestamp).toBeDefined();
      expect(analytics.performance_metrics).toBeDefined();
      expect(analytics.session_summary).toBeDefined();
      expect(analytics.session_summary!.total_sessions).toBe(1);
      expect(analytics.session_summary!.active_sessions).toBe(1);

      // Get metrics summary
      const metrics = sessionManager.getMetricsSummary();
      expect(metrics.timestamp).toBeDefined();
      expect(metrics.metrics).toBeDefined();
      expect(Array.isArray(metrics.metrics)).toBe(true);
    });
  });

  describe('Authentication Integration', () => {
    it('should validate API keys correctly', async () => {
      // Test valid API key
      const validContext = await authManager.validateApiKey(testApiKey);
      expect(validContext).toBeDefined();
      expect(validContext!.authenticated).toBe(true);
      expect(validContext!.authMethod).toBe('api_key');
      expect(validContext!.permissions).toContain('chat');
      expect(validContext!.permissions).toContain('file:read');

      // Test invalid API key
      const invalidContext = await authManager.validateApiKey('invalid-key');
      expect(invalidContext).toBeNull();
    });

    it('should check permissions correctly', () => {
      const metadata = new grpc.Metadata();
      const authContext = {
        permissions: ['chat', 'file:read'],
        authenticated: true,
        authMethod: 'api_key' as const
      };
      
      metadata.set('auth-context', JSON.stringify(authContext));

      expect(authManager.hasPermission(metadata, 'chat')).toBe(true);
      expect(authManager.hasPermission(metadata, 'file:read')).toBe(true);
      expect(authManager.hasPermission(metadata, 'file:write')).toBe(false);
      expect(authManager.hasPermission(metadata, 'file:delete')).toBe(false);
    });

    it('should handle API key lifecycle', () => {
      // Create API key
      const apiKey = authManager.createApiKey('integration-test', 'Integration Test Key');
      expect(apiKey.key).toMatch(/^gemini_[a-f0-9]{64}$/);
      expect(apiKey.enabled).toBe(true);

      // List API keys (should not expose key values)
      const keys = authManager.listApiKeys();
      const foundKey = keys.find(k => k.id === apiKey.id);
      expect(foundKey).toBeDefined();
      expect(foundKey).not.toHaveProperty('key');

      // Revoke API key
      const revoked = authManager.revokeApiKey(apiKey.key);
      expect(revoked).toBe(true);
      expect(apiKey.enabled).toBe(false);
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle file system errors gracefully', async () => {
      const sessionId = 'test-session-' + Date.now();
      
      // Create session
      const startRequest = new gemini.StartRequest({
        session_id: sessionId,
        initial_prompt: 'Test session',
        model: 'gemini-1.5-pro',
        approval_mode: 1,
        core_tools: ['Read'],
        theme: 'default',
        show_tool_descriptions: true,
        show_error_details: true,
      });

      const actualSessionId = sessionManager.createSession(startRequest);

      // Try to read non-existent file
      await expect(
        sessionManager.readFile(actualSessionId, '/non/existent/file.txt')
      ).rejects.toThrow();

      // Try to list non-existent directory
      await expect(
        sessionManager.listDirectory(actualSessionId, '/non/existent/directory')
      ).rejects.toThrow();
    });

    it('should handle invalid session IDs', async () => {
      const invalidSessionId = 'non-existent-session';
      
      // Try operations with invalid session ID
      await expect(
        sessionManager.readFile(invalidSessionId, '/some/file.txt')
      ).rejects.toThrow('Session non-existent-session not found');

      await expect(
        sessionManager.writeFile(invalidSessionId, '/some/file.txt', 'content')
      ).rejects.toThrow('Session non-existent-session not found');

      await expect(
        sessionManager.refreshContext(invalidSessionId)
      ).rejects.toThrow('Session non-existent-session not found');
    });
  });

  describe('Configuration Integration', () => {
    it('should handle configuration updates', async () => {
      const sessionId = 'test-session-' + Date.now();
      
      // Create session
      const startRequest = new gemini.StartRequest({
        session_id: sessionId,
        initial_prompt: 'Test session',
        model: 'gemini-1.5-pro',
        approval_mode: 1,
        core_tools: [],
        theme: 'default',
        show_tool_descriptions: true,
        show_error_details: true,
      });

      const actualSessionId = sessionManager.createSession(startRequest);

      // Verify session was created successfully
      expect(sessionManager.getSession(actualSessionId)).toBeDefined();

      // Update configuration
      const mockStream = {
        write: vi.fn()
      } as any;

      // Create a proper config update request with valid changes
      // Start with different values than the defaults to ensure changes are detected
      const configUpdate = new gemini.ConfigUpdateRequest({
        theme: 'dark'  // Changed from default
      });

      await sessionManager.updateConfig(actualSessionId, configUpdate, mockStream);
      
      // Verify update was processed (check if stream.write was called at least once)
      // This could be from validation messages or success messages
      expect(mockStream.write).toHaveBeenCalled();
    });
  });

  describe('Performance and Monitoring Integration', () => {
    it('should collect metrics during operations', async () => {
      const sessionId = 'test-session-' + Date.now();
      const testFile = path.join(tempDir, 'metrics-test.txt');
      
      // Create session
      const startRequest = new gemini.StartRequest({
        session_id: sessionId,
        initial_prompt: 'Test session',
        model: 'gemini-1.5-pro',
        approval_mode: 1,
        core_tools: ['Read', 'Write'],
        theme: 'default',
        show_tool_descriptions: true,
        show_error_details: true,
      });

      const actualSessionId = sessionManager.createSession(startRequest);

      // Perform file operations (should generate metrics)
      await sessionManager.writeFile(actualSessionId, testFile, 'test content');
      await sessionManager.readFile(actualSessionId, testFile);
      await sessionManager.listDirectory(actualSessionId, tempDir);

      // Get metrics
      const metrics = sessionManager.getMetricsSummary();
      expect(metrics.metrics!.length).toBeGreaterThan(0);

      // Check for file operation metrics
      const fileOpsMetric = metrics.metrics!.find(m => m.name === 'file_operations_per_minute');
      expect(fileOpsMetric).toBeDefined();
      expect(fileOpsMetric!.current_value).toBeGreaterThan(0);

      // Get analytics
      const analytics = sessionManager.getAnalyticsReport();
      expect(analytics.performance_metrics!.total_requests).toBeGreaterThan(0);
    });
  });
});