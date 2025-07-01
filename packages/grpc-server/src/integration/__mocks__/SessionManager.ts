import { vi } from 'vitest';
import { SessionManager } from '../../server/SessionManager';
import { vol } from 'memfs';
import path from 'path';

vi.mock('../../server/SessionManager');

vi.mocked(SessionManager).mockImplementation(() => {
  return {
    createSession: vi.fn().mockImplementation((startRequest) => {
      const sessionId = startRequest.session_id || `session-${Date.now()}`;
      return sessionId;
    }),
    getSession: vi.fn().mockImplementation((sessionId) => {
      if (sessionId.startsWith('test-session')) {
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
            deleteFile: vi.fn().mockResolvedValue({ id: 'mock-operation-id' }),
            readFile: vi.fn().mockImplementation(async (filePath) => {
              if (vol.existsSync(filePath)) {
                const content = await vol.promises.readFile(filePath, 'utf8');
                return {
                  content,
                  metadata: {
                    path: filePath,
                    size: content.length,
                    mtime: new Date(),
                    type: 'file',
                    permissions: 'rw-r--r--',
                    checksum: 'mock-checksum',
                    encoding: 'utf8',
                  },
                };
              }
              throw new Error('ENOENT: no such file or directory');
            }),
            writeFile: vi.fn().mockImplementation(async (filePath, content) => {
              await vol.promises.writeFile(filePath, content);
              return {
                id: 'mock-operation-id',
              };
            }),
            editFile: vi.fn().mockImplementation(async (filePath, patches) => {
              let content = await vol.promises.readFile(filePath, 'utf8');
              const lines = content.split('\n');
              for (const patch of patches) {
                lines.splice(patch.startLine - 1, patch.endLine - patch.startLine + 1, patch.newContent);
              }
              content = lines.join('\n');
              await vol.promises.writeFile(filePath, content);
              return {
                id: 'mock-operation-id',
                preview: {
                  additions: 1,
                  deletions: 1,
                  diff: 'mock-diff',
                },
              };
            }),
            listDirectory: vi.fn().mockImplementation(async (dirPath) => {
              const entries = await vol.promises.readdir(dirPath, { withFileTypes: true });
              return entries.map(entry => ({
                path: path.join(dirPath, entry.name),
                type: entry.isDirectory() ? 'directory' : 'file',
                size: 0,
                mtime: new Date(),
                permissions: 'rwxr-xr-x',
                checksum: '',
                encoding: '',
              }));
            }),
            generateFileDiff: vi.fn().mockImplementation((filePath, oldContent, newContent) => {
              return {
                additions: 1,
                deletions: 1,
                diff: 'mock-diff',
              };
            }),
          },
        } as any;
      }
      return undefined;
    }),
    getSessionStats: vi.fn().mockImplementation((sessionId) => {
      if (sessionId.startsWith('test-session')) {
        return {
          turnCount: 0,
          startTime: new Date(),
          lastMessageTime: new Date(),
          toolCalls: 0,
          toolErrors: 0,
        } as any;
      }
      throw new Error('Session not found');
    }),
    generateFileDiff: vi.fn().mockImplementation((sessionId, filePath, oldContent, newContent) => {
      return {
        additions: 1,
        deletions: 1,
        diff: 'mock-diff',
      };
    }),
  } as any;
});