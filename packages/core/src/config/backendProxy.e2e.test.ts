/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { Config } from './config.js';
import { AuthType } from '../core/contentGenerator.js';
import { createServer, Server } from 'http';
import { URL } from 'url';

// Mock backend server for Config E2E testing
let mockServer: Server;
let serverUrl: string;

// Request tracking
let lastRequest: {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: any;
} | null = null;

describe('Config Backend Proxy E2E Tests', () => {
  beforeAll(async () => {
    // Start mock backend server
    mockServer = createServer((req, res) => {
      const url = new URL(req.url!, `http://localhost`);
      const method = req.method!;
      const headers: Record<string, string> = {};
      
      Object.entries(req.headers).forEach(([key, value]) => {
        headers[key] = Array.isArray(value) ? value[0] : value || '';
      });

      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        let parsedBody;
        try {
          parsedBody = body ? JSON.parse(body) : {};
        } catch {
          parsedBody = body;
        }

        lastRequest = {
          url: url.pathname,
          method,
          headers,
          body: parsedBody
        };

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Session-ID, X-Request-ID, X-Client-Version');

        if (method === 'OPTIONS') {
          res.writeHead(200);
          res.end();
          return;
        }

        res.setHeader('Content-Type', 'application/json');

        if (url.pathname === '/api/ai/generate') {
          const response = {
            candidates: [
              {
                content: {
                  parts: [{ text: `Response from ${parsedBody.model || 'unknown model'}` }],
                  role: 'model'
                }
              }
            ]
          };
          res.writeHead(200);
          res.end(JSON.stringify(response));
        } else {
          res.writeHead(404);
          res.end('Not Found');
        }
      });
    });

    // Start server on random port
    await new Promise<void>((resolve) => {
      mockServer.listen(0, () => {
        const address = mockServer.address();
        if (address && typeof address !== 'string') {
          serverUrl = `http://localhost:${address.port}`;
        }
        resolve();
      });
    });
  });

  afterAll(async () => {
    if (mockServer) {
      await new Promise<void>((resolve) => {
        mockServer.close(() => resolve());
      });
    }
  });

  beforeEach(() => {
    lastRequest = null;
  });

  describe('Config Integration with Backend Proxy', () => {
    it('should create Config with backend proxy settings and make real requests', async () => {
      const config = new Config({
        sessionId: 'test-session-e2e',
        targetDir: '/tmp',
        debugMode: false,
        cwd: '/tmp',
        model: 'gemini-2.5-pro',
        authType: AuthType.USE_BACKEND_PROXY,
        backendProxyUrl: serverUrl,
        userAuthToken: 'e2e-test-token',
        provider: 'gemini',
      });

      await config.initialize();

      // Verify config settings
      expect(config.getAuthType()).toBe(AuthType.USE_BACKEND_PROXY);
      expect(config.getBackendProxyUrl()).toBe(serverUrl);
      expect(config.getUserAuthToken()).toBe('e2e-test-token');
      expect(config.getProvider()).toBe('gemini');

      // Test actual request through the config
      await config.refreshAuth(AuthType.USE_BACKEND_PROXY);
      const geminiClient = config.getGeminiClient();
      
      // This should make a real HTTP request to our mock server
      const response = await geminiClient.generateContent({
        contents: [{ parts: [{ text: 'Test through Config' }] }],
        model: 'gemini-2.5-pro'
      });

      // Verify the response
      expect(response.candidates[0].content.parts[0].text).toBe('Response from gemini-2.5-pro');

      // Verify the request was made correctly
      expect(lastRequest).toBeTruthy();
      expect(lastRequest!.url).toBe('/api/ai/generate');
      expect(lastRequest!.method).toBe('POST');
      expect(lastRequest!.headers.authorization).toBe('Bearer e2e-test-token');
      expect(lastRequest!.headers['x-session-id']).toBe('test-session-e2e');
      expect(lastRequest!.body.model).toBe('gemini-2.5-pro');
      expect(lastRequest!.body.contents).toEqual([{ parts: [{ text: 'Test through Config' }] }]);
    });

    it('should handle Claude models through Config', async () => {
      const config = new Config({
        sessionId: 'test-session-claude',
        targetDir: '/tmp',
        debugMode: false,
        cwd: '/tmp',
        model: 'claude-3-5-sonnet',
        authType: AuthType.USE_BACKEND_PROXY,
        backendProxyUrl: serverUrl,
        userAuthToken: 'claude-test-token',
        provider: 'claude',
      });

      await config.initialize();
      await config.refreshAuth(AuthType.USE_BACKEND_PROXY);
      
      const geminiClient = config.getGeminiClient();
      
      const response = await geminiClient.generateContent({
        contents: [{ parts: [{ text: 'Test Claude through Config' }] }],
        model: 'claude-3-5-sonnet',
        systemInstruction: { parts: [{ text: 'You are helpful' }] } as any
      });

      // Verify response
      expect(response.candidates[0].content.parts[0].text).toBe('Response from claude-3-5-sonnet');

      // Verify Claude request normalization happened
      expect(lastRequest!.body.model).toBe('claude-3-5-sonnet');
      expect(lastRequest!.body.system).toBe('You are helpful');
      expect(lastRequest!.body.systemInstruction).toBeUndefined();
    });

    it('should use environment variables when config values are missing', async () => {
      // Set environment variables
      process.env.AI_PROXY_URL = serverUrl;
      process.env.USER_AUTH_TOKEN = 'env-token';
      process.env.DEFAULT_PROVIDER = 'auto';

      const config = new Config({
        sessionId: 'test-session-env',
        targetDir: '/tmp',
        debugMode: false,
        cwd: '/tmp',
        model: 'gemini-2.5-flash',
        authType: AuthType.USE_BACKEND_PROXY,
        // backendProxyUrl and userAuthToken should come from env vars
      });

      await config.initialize();
      await config.refreshAuth(AuthType.USE_BACKEND_PROXY);
      
      const geminiClient = config.getGeminiClient();
      
      const response = await geminiClient.generateContent({
        contents: [{ parts: [{ text: 'Test env vars' }] }],
        model: 'gemini-2.5-flash'
      });

      // Verify response
      expect(response.candidates[0].content.parts[0].text).toBe('Response from gemini-2.5-flash');

      // Verify env vars were used
      expect(lastRequest!.headers.authorization).toBe('Bearer env-token');

      // Clean up env vars
      delete process.env.AI_PROXY_URL;
      delete process.env.USER_AUTH_TOKEN;
      delete process.env.DEFAULT_PROVIDER;
    });

    it('should handle model switching during session', async () => {
      const config = new Config({
        sessionId: 'test-session-switch',
        targetDir: '/tmp',
        debugMode: false,
        cwd: '/tmp',
        model: 'gemini-2.5-pro',
        authType: AuthType.USE_BACKEND_PROXY,
        backendProxyUrl: serverUrl,
        userAuthToken: 'switch-test-token',
      });

      await config.initialize();
      await config.refreshAuth(AuthType.USE_BACKEND_PROXY);
      
      const geminiClient = config.getGeminiClient();
      
      // First request with initial model
      await geminiClient.generateContent({
        contents: [{ parts: [{ text: 'Initial model' }] }],
        model: 'gemini-2.5-pro'
      });

      expect(lastRequest!.body.model).toBe('gemini-2.5-pro');
      expect(config.getModel()).toBe('gemini-2.5-pro');

      // Switch to Claude model
      config.setModel('claude-3-5-sonnet');
      expect(config.getModel()).toBe('claude-3-5-sonnet');
      expect(config.isModelSwitchedDuringSession()).toBe(true);

      // Second request with switched model
      await geminiClient.generateContent({
        contents: [{ parts: [{ text: 'Switched model' }] }],
        model: 'claude-3-5-sonnet',
        systemInstruction: { parts: [{ text: 'System prompt' }] } as any
      });

      // Verify the model switch worked and request normalization happened
      expect(lastRequest!.body.model).toBe('claude-3-5-sonnet');
      expect(lastRequest!.body.system).toBe('System prompt');
      expect(lastRequest!.body.systemInstruction).toBeUndefined();
    });

    it('should handle errors and show them come from backend proxy', async () => {
      const config = new Config({
        sessionId: 'test-session-error',
        targetDir: '/tmp',
        debugMode: false,
        cwd: '/tmp',
        model: 'gemini-2.5-pro',
        authType: AuthType.USE_BACKEND_PROXY,
        backendProxyUrl: 'http://localhost:99999', // Invalid port
        userAuthToken: 'error-test-token',
      });

      await config.initialize();
      await config.refreshAuth(AuthType.USE_BACKEND_PROXY);
      
      const geminiClient = config.getGeminiClient();
      
      // This should fail with network error
      await expect(geminiClient.generateContent({
        contents: [{ parts: [{ text: 'This should fail' }] }],
        model: 'gemini-2.5-pro'
      })).rejects.toThrow();
    });
  });

  describe('Multi-Provider Support E2E', () => {
    it('should automatically detect provider from model name', async () => {
      const config = new Config({
        sessionId: 'test-provider-auto',
        targetDir: '/tmp',
        debugMode: false,
        cwd: '/tmp',
        model: 'claude-4-opus',
        authType: AuthType.USE_BACKEND_PROXY,
        backendProxyUrl: serverUrl,
        userAuthToken: 'auto-provider-token',
        provider: 'auto', // Should auto-detect Claude
      });

      await config.initialize();
      await config.refreshAuth(AuthType.USE_BACKEND_PROXY);
      
      const geminiClient = config.getGeminiClient();
      
      await geminiClient.generateContent({
        contents: [{ parts: [{ text: 'Auto-detect test' }] }],
        model: 'claude-4-opus',
        systemInstruction: { parts: [{ text: 'Auto-detect system' }] } as any
      });

      // Should have auto-detected Claude and normalized the request
      expect(lastRequest!.body.model).toBe('claude-4-opus');
      expect(lastRequest!.body.system).toBe('Auto-detect system');
      expect(lastRequest!.body.systemInstruction).toBeUndefined();
    });

    it('should handle mixed model usage in same session', async () => {
      const config = new Config({
        sessionId: 'test-mixed-models',
        targetDir: '/tmp',
        debugMode: false,
        cwd: '/tmp',
        model: 'gemini-2.5-pro',
        authType: AuthType.USE_BACKEND_PROXY,
        backendProxyUrl: serverUrl,
        userAuthToken: 'mixed-models-token',
        provider: 'auto',
      });

      await config.initialize();
      await config.refreshAuth(AuthType.USE_BACKEND_PROXY);
      
      const geminiClient = config.getGeminiClient();
      
      // First request with Gemini
      await geminiClient.generateContent({
        contents: [{ parts: [{ text: 'Gemini request' }] }],
        model: 'gemini-2.5-pro',
        systemInstruction: { parts: [{ text: 'Gemini system' }] } as any
      });

      expect(lastRequest!.body.model).toBe('gemini-2.5-pro');
      expect(lastRequest!.body.systemInstruction).toBeDefined();
      expect(lastRequest!.body.system).toBeUndefined();

      // Second request with Claude
      await geminiClient.generateContent({
        contents: [{ parts: [{ text: 'Claude request' }] }],
        model: 'claude-3-5-haiku',
        systemInstruction: { parts: [{ text: 'Claude system' }] } as any
      });

      expect(lastRequest!.body.model).toBe('claude-3-5-haiku');
      expect(lastRequest!.body.systemInstruction).toBeUndefined();
      expect(lastRequest!.body.system).toBe('Claude system');
    });
  });
});