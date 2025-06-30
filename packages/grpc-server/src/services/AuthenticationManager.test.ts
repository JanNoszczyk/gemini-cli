
import { describe, it, expect, vi } from 'vitest';
import * as grpc from '@grpc/grpc-js';
import { AuthenticationManager } from './AuthenticationManager';

describe('AuthenticationManager', () => {
  it('should set auth-context in metadata', async () => {
    const authManager = new AuthenticationManager();
    const apiKey = authManager.createApiKey('test-key', 'Test Key', ['*']);

    const interceptor = authManager.createAuthInterceptor();
    const metadata = new grpc.Metadata();
    metadata.set('authorization', `Bearer ${apiKey.key}`);

    const nextCall = (options: any) => {
      return {
        start: (metadata: grpc.Metadata, listener: any, next: any) => {
          next(metadata, listener);
        },
      };
    };

    const call = { metadata };
    const next = (nextMetadata: grpc.Metadata, listener: any) => {
      const authContextStr = nextMetadata.get('auth-context')[0] as string;
      const authContext = JSON.parse(authContextStr);
      expect(authContext.authenticated).toBe(true);
      expect(authContext.permissions).toContain('*');
    };

    interceptor(call as any, nextCall as any);
  });
});
