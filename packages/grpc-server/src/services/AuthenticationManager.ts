/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as grpc from '@grpc/grpc-js';
import { EventEmitter } from 'events';
import * as crypto from 'crypto';

export interface ApiKey {
  id: string;
  key: string;
  name: string;
  permissions: string[];
  createdAt: Date;
  lastUsed?: Date;
  expiresAt?: Date;
  enabled: boolean;
}

export interface AuthenticationContext {
  apiKeyId?: string;
  permissions: string[];
  authenticated: boolean;
  authMethod: 'api_key' | 'oauth' | 'vertex_ai' | 'none';
}

/**
 * Manages authentication for gRPC requests
 */
export class AuthenticationManager extends EventEmitter {
  private apiKeys = new Map<string, ApiKey>();
  private sessionTokens = new Map<string, { apiKeyId: string; expiresAt: Date }>();
  
  private readonly defaultPermissions = [
    'chat',
    'file:read',
    'file:write',
    'session:read',
    'session:write',
  ];

  constructor() {
    super();
    
    // Create a default API key for development/testing
    if (process.env.NODE_ENV !== 'production') {
      this.createApiKey('default-key', 'Default Key', ['*']);
    }
  }

  /**
   * Create a new API key
   */
  createApiKey(name: string, description: string, permissions: string[] = this.defaultPermissions, expiresAt?: Date): ApiKey {
    const id = crypto.randomUUID();
    const key = this.generateApiKey();
    
    const apiKey: ApiKey = {
      id,
      key,
      name: description,
      permissions,
      createdAt: new Date(),
      expiresAt,
      enabled: true
    };

    this.apiKeys.set(key, apiKey);
    
    this.emit('apiKeyCreated', { id, name: description });
    
    return apiKey;
  }

  /**
   * Validate API key and return authentication context
   */
  async validateApiKey(key: string): Promise<AuthenticationContext | null> {
    const apiKey = this.apiKeys.get(key);
    
    if (!apiKey || !apiKey.enabled) {
      return null;
    }

    // Check expiration
    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
      this.emit('apiKeyExpired', { id: apiKey.id });
      return null;
    }

    // Update last used
    apiKey.lastUsed = new Date();
    
    this.emit('apiKeyUsed', { id: apiKey.id, permissions: apiKey.permissions });

    return {
      apiKeyId: apiKey.id,
      permissions: apiKey.permissions,
      authenticated: true,
      authMethod: 'api_key'
    };
  }

  /**
   * gRPC interceptor for authentication
   */
  createAuthInterceptor(): grpc.Interceptor {
    return (options, nextCall) => {
      return new grpc.InterceptingCall(nextCall(options), {
        start: async (metadata, listener, next) => {
          try {
            const authHeader = metadata.get('authorization')[0] as string;
            let authContext: AuthenticationContext;

            if (authHeader && authHeader.startsWith('Bearer ')) {
              const token = authHeader.substring(7);
              const context = await this.validateApiKey(token);
              
              if (context) {
                authContext = context;
              } else {
                const error = new Error('Invalid API key');
                (error as any).code = grpc.status.UNAUTHENTICATED;
                listener.onReceiveStatus({ code: grpc.status.UNAUTHENTICATED, details: 'Invalid API key' });
                return;
              }
            } else {
              // No authentication provided - use anonymous context
              const permissions = process.env.NODE_ENV !== 'production' ? ['*'] : [];
              authContext = {
                permissions,
                authenticated: false,
                authMethod: 'none'
              };
            }

            metadata.set('auth-context', JSON.stringify(authContext));
            next(metadata, listener);
          } catch (error) {
            listener.onReceiveStatus({ code: grpc.status.INTERNAL, details: 'Authentication error' });
          }
        }
      });
    };
  }

  /**
   * Check if the request has required permission
   */
  hasPermission(metadata: grpc.Metadata, requiredPermission: string): boolean {
    try {
      const authContextStr = metadata.get('auth-context')[0] as string;
      if (!authContextStr) {
        return false;
      }

      const authContext: AuthenticationContext = JSON.parse(authContextStr);
      return authContext.permissions.includes(requiredPermission) || authContext.permissions.includes('*');
    } catch {
      return false;
    }
  }

  /**
   * Get authentication context from metadata
   */
  getAuthContext(metadata: grpc.Metadata): AuthenticationContext | null {
    try {
      const authContextStr = metadata.get('auth-context')[0] as string;
      return authContextStr ? JSON.parse(authContextStr) : null;
    } catch {
      return null;
    }
  }

  /**
   * Revoke an API key
   */
  revokeApiKey(key: string): boolean {
    const apiKey = this.apiKeys.get(key);
    if (apiKey) {
      apiKey.enabled = false;
      this.emit('apiKeyRevoked', { id: apiKey.id });
      return true;
    }
    return false;
  }

  /**
   * List all API keys (without the actual key values)
   */
  listApiKeys(): Omit<ApiKey, 'key'>[] {
    return Array.from(this.apiKeys.values()).map(({ key, ...apiKeyInfo }) => apiKeyInfo);
  }

  /**
   * Clean up expired tokens and keys
   */
  cleanup(): void {
    const now = new Date();
    this.apiKeys.forEach((apiKey, key) => {
      if (apiKey.expiresAt && apiKey.expiresAt < now) {
        apiKey.enabled = false;
        this.emit('apiKeyExpired', { id: apiKey.id });
      }
    });
    this.sessionTokens.forEach((session, token) => {
      if (session.expiresAt < now) {
        this.sessionTokens.delete(token);
      }
    });
  }

  /**
   * Generate a secure API key
   */
  private generateApiKey(): string {
    return 'gemini_' + crypto.randomBytes(32).toString('hex');
  }

  /**
   * Start periodic cleanup
   */
  startCleanup(intervalMs: number = 60000): void {
    setInterval(() => this.cleanup(), intervalMs);
  }
}