/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { GrpcServiceImpl } from '../server/GrpcServiceImpl';
import { AuthenticationManager } from '../services/AuthenticationManager';
import path from 'path';
import * as fs from 'fs/promises';
import * as os from 'os';
import { gemini } from '../proto/generated/gemini';

describe('gRPC Server Integration Tests', () => {
  let server: grpc.Server;
  let client: any;
  let authManager: AuthenticationManager;
  let testPort: number;
  let testApiKey: string;
  let tempDir: string;
  let proto: any;

  beforeAll(async () => {
    // Create temporary directory for test files
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'grpc-test-'));
    
    // Set up server
    testPort = 50053; // Different port for testing
    
    // Load proto definition
    const PROTO_PATH = path.join(__dirname, '../../gemini.proto');
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    proto = grpc.loadPackageDefinition(packageDefinition) as any;

    // Create authentication manager and API key
    authManager = new AuthenticationManager();
    const apiKey = authManager.createApiKey('test-key', 'Integration Test Key');
    testApiKey = apiKey.key;

    // Create service implementation
    const serviceImpl = new GrpcServiceImpl(authManager);

    // Create and start server
    server = new grpc.Server({
      'grpc.interceptors': [authManager.createAuthInterceptor()],
    });
    server.addService(proto.gemini.GeminiService.service, {
      Chat: serviceImpl.chat.bind(serviceImpl),
      GetSessionInfo: serviceImpl.getSessionInfo.bind(serviceImpl),
      GetSessionStats: serviceImpl.getSessionStats.bind(serviceImpl),
      UpdateConfig: serviceImpl.updateConfig.bind(serviceImpl),
      GetConfig: serviceImpl.getConfig.bind(serviceImpl),
      ReadFile: serviceImpl.readFile.bind(serviceImpl),
      WriteFile: serviceImpl.writeFile.bind(serviceImpl),
      EditFile: serviceImpl.editFile.bind(serviceImpl),
      DeleteFile: serviceImpl.deleteFile.bind(serviceImpl),
      MoveFile: serviceImpl.moveFile.bind(serviceImpl),
      ListDirectory: serviceImpl.listDirectory.bind(serviceImpl),
      GenerateDiff: serviceImpl.generateDiff.bind(serviceImpl),
    });

    await new Promise<void>((resolve, reject) => {
      server.bindAsync(
        `localhost:${testPort}`,
        grpc.ServerCredentials.createInsecure(),
        (err, boundPort) => {
          if (err) {
            reject(err);
          } else {
            server.start();
            resolve();
          }
        }
      );
    });

    // Create client
    client = new proto.gemini.GeminiService(
      `localhost:${testPort}`,
      grpc.credentials.createInsecure()
    );
  });

  afterAll(async () => {
    // Clean up
    if (server) {
      server.forceShutdown();
    }
    
    // Clean up temp directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  beforeEach(() => {
    // Note: We use absolute paths instead of changing working directory
    // since process.chdir() is not supported in Vitest workers
  });

  describe('File Operations Integration', () => {
    it('should complete full file workflow: write, read, edit, delete', async () => {
      const sessionId = 'test-session-' + Date.now();
      const testFilePath = path.join(tempDir, 'test-file.txt');
      const originalContent = 'Hello, World!\nThis is line 2.\nThis is line 3.';
      const editedContent = 'Hello, World!\nThis is an edited line 2.\nThis is line 3.';

      // Create metadata with authentication
      const metadata = new grpc.Metadata();
      metadata.set('authorization', `Bearer ${testApiKey}`);

      // 1. Write file
      const writeResult = await new Promise<any>((resolve, reject) => {
        client.writeFile(
          {
            session_id: sessionId,
            file_path: testFilePath,
            content: originalContent,
            encoding: 'utf8',
            backup: true,
            create_directories: true,
            confirm_overwrite: false
          },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(writeResult.success).toBe(true);
      expect(writeResult.operation_id).toBeDefined();

      // 2. Read file back
      const readResult = await new Promise<any>((resolve, reject) => {
        client.readFile(
          {
            session_id: sessionId,
            file_path: testFilePath,
            encoding: 'utf8'
          },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(readResult.success).toBe(true);
      expect(readResult.content).toBe(originalContent);
      expect(readResult.metadata.path).toBe(testFilePath);
      expect(readResult.metadata.type).toBe('file');

      // 3. Edit file
      const editResult = await new Promise<any>((resolve, reject) => {
        client.editFile(
          {
            session_id: sessionId,
            file_path: testFilePath,
            patches: [{
              start_line: 2,
              end_line: 2,
              new_content: 'This is an edited line 2.'
            }],
            backup: true
          },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(editResult.success).toBe(true);
      expect(editResult.preview).toBeDefined();

      // 4. Generate diff
      const diffResult = await new Promise<any>((resolve, reject) => {
        client.generateDiff(
          {
            session_id: sessionId,
            file_path: testFilePath,
            old_content: originalContent,
            new_content: editedContent
          },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(diffResult.success).toBe(true);
      expect(diffResult.diff).toBeDefined();
      expect(diffResult.diff.additions).toBeGreaterThan(0);
      expect(diffResult.diff.deletions).toBeGreaterThan(0);

      // 5. Delete file
      const deleteResult = await new Promise<any>((resolve, reject) => {
        client.deleteFile(
          {
            session_id: sessionId,
            file_path: testFilePath,
            recursive: false,
            backup: true
          },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(deleteResult.success).toBe(true);

      // 6. Verify file is deleted
      const readDeletedResult = await new Promise<any>((resolve, reject) => {
        client.readFile(
          {
            session_id: sessionId,
            file_path: testFilePath,
            encoding: 'utf8'
          },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(readDeletedResult.success).toBe(false);
      expect(readDeletedResult.error_message).toContain('ENOENT');
    }, 10000);

    it('should list directory contents', async () => {
      const sessionId = 'test-session-' + Date.now();
      
      // Create some test files
      await fs.writeFile(path.join(tempDir, 'file1.txt'), 'content1');
      await fs.writeFile(path.join(tempDir, 'file2.js'), 'content2');
      await fs.mkdir(path.join(tempDir, 'subdir'));
      await fs.writeFile(path.join(tempDir, '.hidden'), 'hidden content');

      const metadata = new grpc.Metadata();
      metadata.set('authorization', `Bearer ${testApiKey}`);

      // List directory without hidden files
      const listResult = await new Promise<any>((resolve, reject) => {
        client.listDirectory(
          {
            session_id: sessionId,
            directory_path: tempDir,
            recursive: false,
            include_hidden: false
          },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(listResult.success).toBe(true);
      expect(listResult.files.length).toBe(3); // 2 files + 1 directory, no hidden
      
      const fileNames = listResult.files.map((f: any) => path.basename(f.path));
      expect(fileNames).toContain('file1.txt');
      expect(fileNames).toContain('file2.js');
      expect(fileNames).toContain('subdir');
      expect(fileNames).not.toContain('.hidden');

      // List with hidden files
      const listHiddenResult = await new Promise<any>((resolve, reject) => {
        client.listDirectory(
          {
            session_id: sessionId,
            directory_path: tempDir,
            recursive: false,
            include_hidden: true
          },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(listHiddenResult.success).toBe(true);
      expect(listHiddenResult.files.length).toBe(4); // Including hidden file
    }, 10000);
  });

  describe('Session Management Integration', () => {
    it('should manage session lifecycle through streaming chat', async () => {
      const sessionId = 'test-session-' + Date.now();
      const metadata = new grpc.Metadata();
      metadata.set('authorization', `Bearer ${testApiKey}`);

      const stream = client.chat(metadata);
      let sessionStarted = false;
      let receivedMessages = 0;

      await new Promise<void>((resolve, reject) => {
        stream.on('data', (response: any) => {
          if (response.session_started) {
            sessionStarted = true;
            expect(response.session_started.session_id).toBe(sessionId);
            
            // Send a chat message after session starts
            stream.write({
              chat_message: {
                content: 'Hello from integration test',
                is_shell_command: false
              }
            });
          }

          if (response.chat_content) {
            receivedMessages++;
            // Test should complete after receiving chat response
            if (receivedMessages >= 1) {
              stream.end();
            }
          }

          if (response.error_message) {
            reject(new Error(`Received error: ${response.error_message.message}`));
          }
        });

        stream.on('end', () => {
          expect(sessionStarted).toBe(true);
          expect(receivedMessages).toBeGreaterThan(0);
          resolve();
        });

        stream.on('error', (error: any) => {
          reject(error);
        });

        // Start session
        stream.write({
          start_request: {
            session_id: sessionId,
            initial_prompt: 'Integration test session',
            model: 'gemini-1.5-pro',
            approval_mode: proto.gemini.ApprovalMode.DEFAULT,
            theme: 'default',
            show_tool_descriptions: true
          }
        });
      });
    }, 15000);

    it('should get session info and stats', async () => {
      const sessionId = 'test-session-' + Date.now();
      const metadata = new grpc.Metadata();
      metadata.set('authorization', `Bearer ${testApiKey}`);

      // First create a session via streaming
      const stream = client.chat(metadata);
      
      await new Promise<void>((resolve, reject) => {
        stream.on('data', (response: any) => {
          if (response.session_started) {
            stream.end();
            resolve();
          }
        });

        stream.on('error', reject);

        stream.write({
          start_request: {
            session_id: sessionId,
            initial_prompt: 'Test session for stats',
            model: 'gemini-1.5-pro'
          }
        });
      });

      // Get session info
      const infoResult = await new Promise<any>((resolve, reject) => {
        client.getSessionInfo(
          { session_id: sessionId },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(infoResult.session_id).toBe(sessionId);
      expect(infoResult.model).toBe('gemini-1.5-pro');
      expect(infoResult.created_at).toBeDefined();

      // Get session stats
      const statsResult = await new Promise<any>((resolve, reject) => {
        client.getSessionStats(
          { session_id: sessionId },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(statsResult.stats).toBeDefined();
      expect(statsResult.stats.turn_count).toBeGreaterThanOrEqual(0);
    }, 10000);
  });

  describe('Authentication Integration', () => {
    it('should reject requests without authentication when required', async () => {
      // Set NODE_ENV to production and require auth
      const originalNodeEnv = process.env.NODE_ENV;
      const originalRequireAuth = process.env.REQUIRE_AUTH;
      
      process.env.NODE_ENV = 'production';
      process.env.REQUIRE_AUTH = 'true';

      try {
        const sessionId = 'test-session-' + Date.now();
        const testFilePath = path.join(tempDir, 'auth-test.txt');

        // Try without authentication
        const metadata = new grpc.Metadata();
        // No authorization header

        const result = await new Promise<any>((resolve, reject) => {
          client.readFile(
            {
              session_id: sessionId,
              file_path: testFilePath,
              encoding: 'utf8'
            },
            metadata,
            (err: any, response: any) => {
              if (err) reject(err);
              else resolve(response);
            }
          );
        });

        expect(result.success).toBe(false);
        expect(result.error_message).toContain('Permission denied');
      } finally {
        // Restore environment
        process.env.NODE_ENV = originalNodeEnv;
        process.env.REQUIRE_AUTH = originalRequireAuth;
      }
    });

    it('should accept requests with valid authentication', async () => {
      const sessionId = 'test-session-' + Date.now();
      const testFilePath = path.join(tempDir, 'auth-success-test.txt');

      // Create test file first
      await fs.writeFile(testFilePath, 'test content');

      const metadata = new grpc.Metadata();
      metadata.set('authorization', `Bearer ${testApiKey}`);

      const result = await new Promise<any>((resolve, reject) => {
        client.readFile(
          {
            session_id: sessionId,
            file_path: testFilePath,
            encoding: 'utf8'
          },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(result.success).toBe(true);
      expect(result.content).toBe('test content');
    });

    it('should reject requests with invalid API key', async () => {
      const sessionId = 'test-session-' + Date.now();
      const testFilePath = path.join(tempDir, 'invalid-auth-test.txt');

      const metadata = new grpc.Metadata();
      metadata.set('authorization', 'Bearer invalid-api-key');

      const result = await new Promise<any>((resolve, reject) => {
        client.readFile(
          {
            session_id: sessionId,
            file_path: testFilePath,
            encoding: 'utf8'
          },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(result.success).toBe(false);
      expect(result.error_message).toContain('Permission denied');
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle file not found errors gracefully', async () => {
      const sessionId = 'test-session-' + Date.now();
      const nonExistentFile = path.join(tempDir, 'does-not-exist.txt');

      const metadata = new grpc.Metadata();
      metadata.set('authorization', `Bearer ${testApiKey}`);

      const result = await new Promise<any>((resolve, reject) => {
        client.readFile(
          {
            session_id: sessionId,
            file_path: nonExistentFile,
            encoding: 'utf8'
          },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(result.success).toBe(false);
      expect(result.error_message).toContain('ENOENT');
    });

    it('should handle invalid session IDs', async () => {
      const invalidSessionId = 'non-existent-session';
      const testFilePath = path.join(tempDir, 'test.txt');

      const metadata = new grpc.Metadata();
      metadata.set('authorization', `Bearer ${testApiKey}`);

      const result = await new Promise<any>((resolve, reject) => {
        client.readFile(
          {
            session_id: invalidSessionId,
            file_path: testFilePath,
            encoding: 'utf8'
          },
          metadata,
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      expect(result.success).toBe(false);
      expect(result.error_message).toContain('not found');
    });
  });
});
