/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { GrpcServiceImpl } from '../server/GrpcServiceImpl';
import { AuthenticationManager } from '../services/AuthenticationManager';
import { MessageBuilders } from '../utils/MessageBuilders';
import path from 'path';
import * as fs from 'fs/promises';
import * as os from 'os';
import { gemini } from '../proto/generated/gemini';

vi.mock('fs/promises');

describe('gRPC Server Integration Tests', () => {
  let server: grpc.Server;
  let client: any;
  let authManager: AuthenticationManager;
  let testPort: number;
  let testApiKey: string;
  let tempDir: string;
  let proto: any;

  beforeAll(async () => {
    // Mock fs methods
    vi.mocked(fs).mkdtemp.mockResolvedValue('/tmp/grpc-test-12345');
    tempDir = '/tmp/grpc-test-12345';
    
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
    const apiKey = authManager.createApiKey('test-key', 'Integration Test Key', ['*']);
    testApiKey = apiKey.key;
  });

  beforeEach(async () => {
    vi.useFakeTimers();
    // Note: We use absolute paths instead of changing working directory
    // since process.chdir() is not supported in Vitest workers
    const sessionId = 'test-session-' + Date.now();
    
    const mockSessionManager: any = {
      createSession: vi.fn().mockImplementation((startRequest) => {
        const newSessionId = startRequest?.session_id || sessionId;
        return newSessionId;
      }),
      initializeChat: vi.fn().mockResolvedValue(undefined),
      handleChatMessage: vi.fn().mockImplementation(async (sessionId, message, call) => {
        // Simulate chat response
        call.write(MessageBuilders.chatContent('Mock response to: ' + message.content));
      }),
      terminateSession: vi.fn().mockResolvedValue(undefined),
      readFile: vi.fn().mockImplementation(async (sid, filePath, encoding) => {
        // Validate session ID first
        if (sid !== sessionId && !sid.startsWith('test-session-')) {
          throw new Error('Session not found');
        }
        
        // Check if file has been deleted
        if (mockSessionManager._deletedFiles && mockSessionManager._deletedFiles.has(filePath)) {
          throw new Error('ENOENT: no such file or directory');
        }
        
        // Track files that have been written
        const writtenFiles = mockSessionManager.writeFile.mock.calls
          .filter(call => call[0] === sessionId)
          .map(call => ({ path: call[1], content: call[2] }));
        
        const writtenFile = writtenFiles.find(f => f.path === filePath);
        
        if (writtenFile) {
          return {
            content: writtenFile.content,
            metadata: {
              path: filePath,
              size: writtenFile.content.length,
              mtime: new Date(),
              type: 'file',
              permissions: 'rw-r--r--',
              checksum: 'mock-checksum',
              encoding: encoding || 'utf8',
            },
          };
        }
        
        // Special cases for test files
        if (filePath.endsWith('auth-success-test.txt')) {
          return {
            content: 'test content',
            metadata: {
              path: filePath,
              size: 12,
              mtime: new Date(),
              type: 'file',
              permissions: 'rw-r--r--',
              checksum: 'mock-checksum',
              encoding: encoding || 'utf8',
            },
          };
        }
        
        // Default mock content
        if (!filePath.includes('does-not-exist') && !filePath.includes('non-existent')) {
          return {
            content: 'mocked file content',
            metadata: {
              path: filePath,
              size: 19,
              mtime: new Date(),
              type: 'file',
              permissions: 'rw-r--r--',
              checksum: 'mock-checksum',
              encoding: encoding || 'utf8',
            },
          };
        }
        
        throw new Error('ENOENT: no such file or directory');
      }),
      writeFile: vi.fn().mockImplementation(async (sessionId, filePath, content, options) => {
        return {
          id: 'mock-operation-id',
        };
      }),
      editFile: vi.fn().mockImplementation(async (sessionId, filePath, patches, options) => {
        return {
          id: 'mock-operation-id',
          preview: {
            filePath: filePath,
            summary: {
              linesAdded: 1,
              linesRemoved: 1,
            },
            chunks: [{
              oldLineStart: 2,
              oldLineCount: 1,
              newLineStart: 2,
              newLineCount: 1,
              lines: [
                { type: 'remove', content: 'This is line 2.' },
                { type: 'add', content: 'This is an edited line 2.' }
              ]
            }]
          },
        };
      }),
      deleteFile: vi.fn().mockImplementation(async (sessionId, filePath, recursive, backup) => {
        // Mark file as deleted for subsequent reads
        mockSessionManager._deletedFiles = mockSessionManager._deletedFiles || new Set();
        mockSessionManager._deletedFiles.add(filePath);
        return { id: 'mock-operation-id' };
      }),
      moveFile: vi.fn().mockImplementation(async (sessionId, sourcePath, targetPath, overwrite) => {
        return {
          id: 'mock-operation-id',
          newPath: targetPath,
        };
      }),
      listDirectory: vi.fn().mockImplementation(async (sessionId, dirPath, options) => {
        const includeHidden = options?.includeHidden;
        const files = [
          {
            path: path.join(dirPath, 'file1.txt'),
            type: 'file',
            size: 100,
            mtime: new Date(),
            permissions: 'rwxr-xr-x',
            checksum: '',
            encoding: '',
          },
          {
            path: path.join(dirPath, 'file2.js'),
            type: 'file',
            size: 200,
            mtime: new Date(),
            permissions: 'rwxr-xr-x',
            checksum: '',
            encoding: '',
          },
          {
            path: path.join(dirPath, 'subdir'),
            type: 'directory',
            size: 0,
            mtime: new Date(),
            permissions: 'rwxr-xr-x',
            checksum: '',
            encoding: '',
          },
        ];
        
        if (includeHidden) {
          files.push({
            path: path.join(dirPath, '.hidden'),
            type: 'file',
            size: 50,
            mtime: new Date(),
            permissions: 'rwxr-xr-x',
            checksum: '',
            encoding: '',
          });
        }
        
        return files;
      }),
      generateFileDiff: vi.fn().mockImplementation((sessionId, filePath, oldContent, newContent) => {
        return {
          filePath: filePath,
          summary: {
            linesAdded: 1,
            linesRemoved: 1,
          },
          chunks: [{
            oldLineStart: 2,
            oldLineCount: 1,
            newLineStart: 2,
            newLineCount: 1,
            lines: [
              { type: 'remove', content: 'This is line 2.' },
              { type: 'add', content: 'This is an edited line 2.' }
            ]
          }]
        };
      }),
      getSession: vi.fn().mockImplementation((sid) => {
        if (sid !== sessionId && !sid.startsWith('test-session-')) {
          throw new Error('Session not found');
        }
        return {
          id: sessionId,
          config: {
            getModel: () => 'gemini-1.5-pro',
          },
          stats: {
            turnCount: 0,
            startTime: new Date(),
          },
          configurationManager: {
            getCurrentConfig: () => ({
              model: 'gemini-1.5-pro',
              approvalMode: 'DEFAULT',
              theme: 'default',
              editorType: 'vim',
              showToolDescriptions: true,
              showErrorDetails: false,
              enabledTools: [],
              mcpServers: [],
            }),
          },
          fileManager: {
            deleteFile: vi.fn().mockImplementation(async (filePath, options) => {
              // Mark file as deleted for subsequent reads
              mockSessionManager._deletedFiles = mockSessionManager._deletedFiles || new Set();
              mockSessionManager._deletedFiles.add(filePath);
              return { id: 'mock-operation-id' };
            }),
            readFile: vi.fn().mockImplementation(async (filePath, encoding) => {
              // Use the same logic as the main readFile mock
              return mockSessionManager.readFile(sessionId, filePath, encoding);
            }),
            writeFile: vi.fn().mockImplementation(async (filePath, content, options) => {
              return mockSessionManager.writeFile(sessionId, filePath, content, options);
            }),
            editFile: vi.fn().mockImplementation(async (filePath, patches, options) => {
              return mockSessionManager.editFile(sessionId, filePath, patches, options);
            }),
            listDirectory: vi.fn().mockImplementation(async (dirPath, options) => {
              return mockSessionManager.listDirectory(sessionId, dirPath, options);
            }),
          },
        };}),
      getSessionStats: vi.fn().mockImplementation((sid) => {
        if (sid !== sessionId && !sid.startsWith('test-session-')) {
          throw new Error('Session not found');
        }
        return new gemini.SessionStats({
          turn_count: 0,
          tools_executed: 0,
          files_modified: 0,
          session_duration: '0s',
        });
      }),
      updateConfig: vi.fn().mockResolvedValue(undefined),
      getConfig: vi.fn().mockReturnValue({
        model: 'gemini-1.5-pro',
        approvalMode: 'DEFAULT',
        theme: 'default',
        editorType: 'vim',
        showToolDescriptions: true,
        showErrorDetails: false,
        enabledTools: [],
        mcpServers: [],
      }),
    };

    const serviceImpl = new GrpcServiceImpl();
    (serviceImpl as any).sessionManager = mockSessionManager;
    (serviceImpl as any).authManager = authManager;
    
    // Override checkPermission for testing
    (serviceImpl as any).checkPermission = async function(call: any, permission: string): Promise<boolean> {
      const metadata = call.metadata;
      const authHeader = metadata.get('authorization')[0];
      
      if (!authHeader) {
        return false;
      }
      
      const token = authHeader.toString().replace('Bearer ', '');
      const context = await authManager.validateApiKey(token);
      
      if (!context || !context.authenticated) {
        return false;
      }
      
      // Check if the user has the required permission or wildcard permission
      return context.permissions.includes(permission) || context.permissions.includes('*');
    };

    server = new grpc.Server();
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

    client = new proto.gemini.GeminiService(
      `localhost:${testPort}`,
      grpc.credentials.createInsecure()
    );
  });

  afterEach(async () => {
    if (server) {
      server.forceShutdown();
    }
  });

  afterAll(async () => {
    // Clean up
    if (server) {
      server.forceShutdown();
    }
    
    // Mock cleanup
    vi.mocked(fs).rm.mockResolvedValue();
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
      
      // Mock file operations
      vi.mocked(fs).writeFile.mockResolvedValue();
      vi.mocked(fs).mkdir.mockResolvedValue();

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
      // Use real timers for this test
      vi.useRealTimers();
      
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
              // Resolve immediately when we have what we need
              expect(sessionStarted).toBe(true);
              expect(receivedMessages).toBeGreaterThan(0);
              stream.end();
              resolve();
            }
          }

          if (response.error_message) {
            reject(new Error(`Received error: ${response.error_message.message}`));
          }
        });

        stream.on('end', () => {
          // Stream ended naturally
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
    }, 30000);

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

      // Mock file creation
      vi.mocked(fs).writeFile.mockResolvedValue();

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
      // Set environment to require auth
      const originalRequireAuth = process.env.REQUIRE_AUTH;
      process.env.REQUIRE_AUTH = 'true';
      
      try {
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
      } finally {
        // Restore environment
        process.env.REQUIRE_AUTH = originalRequireAuth;
      }
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
