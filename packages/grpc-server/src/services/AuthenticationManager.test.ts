/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AuthenticationManager } from './AuthenticationManager';
import * as grpc from '@grpc/grpc-js';

describe('AuthenticationManager', () => {
  let authManager: AuthenticationManager;
  let mockDate: Date;

  beforeEach(() => {
    vi.useFakeTimers();
    // Set NODE_ENV to test to avoid creating development keys
    process.env.NODE_ENV = 'test';
    authManager = new AuthenticationManager();
    mockDate = new Date('2024-01-01T12:00:00Z');
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('API key management', () => {
    it('should create API key with default permissions', () => {
      const eventSpy = vi.fn();
      authManager.on('apiKeyCreated', eventSpy);

      const apiKey = authManager.createApiKey('test-key', 'Test API Key');

      expect(apiKey.id).toBeDefined();
      expect(apiKey.key).toMatch(/^gemini_[a-f0-9]{64}$/);
      expect(apiKey.name).toBe('Test API Key');
      expect(apiKey.permissions).toContain('chat');
      expect(apiKey.permissions).toContain('file:read');
      expect(apiKey.enabled).toBe(true);
      expect(apiKey.createdAt).toEqual(mockDate);

      expect(eventSpy).toHaveBeenCalledWith({
        id: apiKey.id,
        name: 'Test API Key'
      });
    });

    it('should create API key with custom permissions and expiration', () => {
      const expiresAt = new Date('2024-12-31T23:59:59Z');
      const customPermissions = ['chat', 'session:read'];

      const apiKey = authManager.createApiKey('custom-key', 'Custom Key', customPermissions, expiresAt);

      expect(apiKey.permissions).toEqual(customPermissions);
      expect(apiKey.expiresAt).toEqual(expiresAt);
    });

    it('should revoke API key', () => {
      const eventSpy = vi.fn();
      authManager.on('apiKeyRevoked', eventSpy);

      const apiKey = authManager.createApiKey('test-key', 'Test Key');
      const revoked = authManager.revokeApiKey(apiKey.key);

      expect(revoked).toBe(true);
      expect(eventSpy).toHaveBeenCalledWith({ id: apiKey.id });
    });

    it('should return false when revoking non-existent key', () => {
      const revoked = authManager.revokeApiKey('non-existent-key');
      expect(revoked).toBe(false);
    });

    it('should list API keys without exposing key values', () => {
      const apiKey1 = authManager.createApiKey('key1', 'Key 1');
      const apiKey2 = authManager.createApiKey('key2', 'Key 2');

      const keys = authManager.listApiKeys();

      expect(keys).toHaveLength(2);
      expect(keys[0]).not.toHaveProperty('key');
      expect(keys[0].id).toBe(apiKey1.id);
      expect(keys[1].id).toBe(apiKey2.id);
    });
  });

  describe('API key validation', () => {
    it('should validate valid API key', async () => {
      const apiKey = authManager.createApiKey('test-key', 'Test Key');
      const eventSpy = vi.fn();
      authManager.on('apiKeyUsed', eventSpy);

      const context = await authManager.validateApiKey(apiKey.key);

      expect(context).toBeDefined();
      expect(context!.authenticated).toBe(true);
      expect(context!.authMethod).toBe('api_key');
      expect(context!.apiKeyId).toBe(apiKey.id);
      expect(context!.permissions).toEqual(apiKey.permissions);

      expect(eventSpy).toHaveBeenCalledWith({
        id: apiKey.id,
        permissions: apiKey.permissions
      });
    });

    it('should reject invalid API key', async () => {
      const context = await authManager.validateApiKey('invalid-key');
      expect(context).toBeNull();
    });

    it('should reject disabled API key', async () => {
      const apiKey = authManager.createApiKey('test-key', 'Test Key');
      authManager.revokeApiKey(apiKey.key);

      const context = await authManager.validateApiKey(apiKey.key);
      expect(context).toBeNull();
    });

    it('should reject expired API key', async () => {
      const expiresAt = new Date('2023-12-31T23:59:59Z'); // Past date
      const apiKey = authManager.createApiKey('test-key', 'Test Key', undefined, expiresAt);
      
      const eventSpy = vi.fn();
      authManager.on('apiKeyExpired', eventSpy);

      const context = await authManager.validateApiKey(apiKey.key);

      expect(context).toBeNull();
      expect(eventSpy).toHaveBeenCalledWith({ id: apiKey.id });
    });

    it('should update last used timestamp', async () => {
      const apiKey = authManager.createApiKey('test-key', 'Test Key');
      
      expect(apiKey.lastUsed).toBeUndefined();

      await authManager.validateApiKey(apiKey.key);

      expect(apiKey.lastUsed).toEqual(mockDate);
    });
  });

  describe('permission checking', () => {
    it('should check permissions from metadata', () => {
      const metadata = new grpc.Metadata();
      const authContext = {
        permissions: ['chat', 'session:read'],
        authenticated: true,
        authMethod: 'api_key' as const
      };
      
      metadata.set('auth-context', JSON.stringify(authContext));

      expect(authManager.hasPermission(metadata, 'chat')).toBe(true);
      expect(authManager.hasPermission(metadata, 'session:read')).toBe(true);
      expect(authManager.hasPermission(metadata, 'file:write')).toBe(false);
    });

    it('should grant permission for wildcard', () => {
      const metadata = new grpc.Metadata();
      const authContext = {
        permissions: ['*'],
        authenticated: true,
        authMethod: 'api_key' as const
      };
      
      metadata.set('auth-context', JSON.stringify(authContext));

      expect(authManager.hasPermission(metadata, 'any-permission')).toBe(true);
    });

    it('should return false for missing auth context', () => {
      const metadata = new grpc.Metadata();
      expect(authManager.hasPermission(metadata, 'chat')).toBe(false);
    });

    it('should return false for invalid auth context', () => {
      const metadata = new grpc.Metadata();
      metadata.set('auth-context', 'invalid-json');
      expect(authManager.hasPermission(metadata, 'chat')).toBe(false);
    });
  });

  describe('auth context retrieval', () => {
    it('should get auth context from metadata', () => {
      const metadata = new grpc.Metadata();
      const authContext = {
        permissions: ['chat'],
        authenticated: true,
        authMethod: 'api_key' as const
      };
      
      metadata.set('auth-context', JSON.stringify(authContext));

      const retrieved = authManager.getAuthContext(metadata);
      expect(retrieved).toEqual(authContext);
    });

    it('should return null for missing context', () => {
      const metadata = new grpc.Metadata();
      const retrieved = authManager.getAuthContext(metadata);
      expect(retrieved).toBeNull();
    });

    it('should return null for invalid context', () => {
      const metadata = new grpc.Metadata();
      metadata.set('auth-context', 'invalid-json');
      const retrieved = authManager.getAuthContext(metadata);
      expect(retrieved).toBeNull();
    });
  });

  describe('cleanup', () => {
    it('should disable expired API keys', () => {
      const expiresAt = new Date('2023-12-31T23:59:59Z'); // Past date
      const apiKey = authManager.createApiKey('test-key', 'Test Key', undefined, expiresAt);
      
      const eventSpy = vi.fn();
      authManager.on('apiKeyExpired', eventSpy);

      expect(apiKey.enabled).toBe(true);

      authManager.cleanup();

      expect(apiKey.enabled).toBe(false);
      expect(eventSpy).toHaveBeenCalledWith({ id: apiKey.id });
    });

    it('should not affect non-expired keys', () => {
      const expiresAt = new Date('2025-12-31T23:59:59Z'); // Future date
      const apiKey = authManager.createApiKey('test-key', 'Test Key', undefined, expiresAt);

      authManager.cleanup();

      expect(apiKey.enabled).toBe(true);
    });
  });

  describe('gRPC interceptor', () => {
    it('should create interceptor', () => {
      const interceptor = authManager.createAuthInterceptor();
      expect(typeof interceptor).toBe('function');
    });

    // Note: Full interceptor testing would require mocking gRPC internals
    // which is complex. In a real implementation, integration tests would
    // cover the interceptor functionality end-to-end.
  });
});