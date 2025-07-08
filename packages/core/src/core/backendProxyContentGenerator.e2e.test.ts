/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { BackendProxyContentGenerator } from './backendProxyContentGenerator.js';
import { createServer, Server } from 'http';
import { URL } from 'url';

// Mock backend server for E2E testing
let mockServer: Server;
let serverUrl: string;

// Mock responses
const mockGeminiResponse = {
  candidates: [
    {
      content: {
        parts: [{ text: 'Hello from Gemini!' }],
        role: 'model'
      }
    }
  ]
};

const mockClaudeResponse = {
  candidates: [
    {
      content: {
        parts: [{ text: 'Hello from Claude!' }],
        role: 'model'
      }
    }
  ]
};

const mockTokenResponse = {
  totalTokens: 15
};

const mockEmbeddingResponse = {
  embeddings: [
    {
      values: [0.1, 0.2, 0.3, 0.4, 0.5]
    }
  ]
};

// Request tracking
let lastRequest: {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: any;
} | null = null;

describe('BackendProxyContentGenerator E2E Tests', () => {
  beforeAll(async () => {
    // Start mock backend server
    mockServer = createServer((req, res) => {
      // Parse request
      const url = new URL(req.url!, `http://localhost`);
      const method = req.method!;
      const headers: Record<string, string> = {};
      
      // Capture headers
      Object.entries(req.headers).forEach(([key, value]) => {
        headers[key] = Array.isArray(value) ? value[0] : value || '';
      });

      // Capture body
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

        // Store request for verification
        lastRequest = {
          url: url.pathname,
          method,
          headers,
          body: parsedBody
        };

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Session-ID, X-Request-ID, X-Client-Version');

        // Handle preflight requests
        if (method === 'OPTIONS') {
          res.writeHead(200);
          res.end();
          return;
        }

        // Route requests
        res.setHeader('Content-Type', 'application/json');

        if (url.pathname === '/api/ai/generate') {
          // Check if it's a Claude model request
          if (parsedBody.model && parsedBody.model.startsWith('claude-')) {
            res.writeHead(200);
            res.end(JSON.stringify(mockClaudeResponse));
          } else {
            res.writeHead(200);
            res.end(JSON.stringify(mockGeminiResponse));
          }
        } else if (url.pathname === '/api/ai/generate-stream') {
          // SSE streaming response
          res.setHeader('Content-Type', 'text/event-stream');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Connection', 'keep-alive');
          
          res.writeHead(200);
          res.write('data: {"text": "Streaming"}\n\n');
          res.write('data: {"text": " response"}\n\n');
          res.write('data: {"text": " works!"}\n\n');
          res.write('data: [DONE]\n\n');
          res.end();
        } else if (url.pathname === '/api/ai/count-tokens') {
          res.writeHead(200);
          res.end(JSON.stringify(mockTokenResponse));
        } else if (url.pathname === '/api/ai/embed') {
          res.writeHead(200);
          res.end(JSON.stringify(mockEmbeddingResponse));
        } else if (url.pathname === '/api/auth/error') {
          // Test error handling
          res.writeHead(500);
          res.end('Internal Server Error');
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

  describe('End-to-End Content Generation', () => {
    it('should make actual HTTP request to backend proxy for Gemini model', async () => {
      const generator = new BackendProxyContentGenerator({
        model: 'gemini-2.5-pro',
        backendProxyUrl: serverUrl,
        userAuthToken: 'test-token',
        sessionId: 'test-session-123'
      });

      const request = {
        model: 'gemini-2.5-pro',
        contents: [{ parts: [{ text: 'Hello world' }] }]
      };

      const response = await generator.generateContent(request);

      // Verify response
      expect(response.candidates[0].content.parts[0].text).toBe('Hello from Gemini!');

      // Verify request was made correctly
      expect(lastRequest).toBeTruthy();
      expect(lastRequest!.url).toBe('/api/ai/generate');
      expect(lastRequest!.method).toBe('POST');
      expect(lastRequest!.headers.authorization).toBe('Bearer test-token');
      expect(lastRequest!.headers['x-session-id']).toBe('test-session-123');
      expect(lastRequest!.headers['x-client-version']).toBe('@google/gemini-cli-core@0.1.9');
      expect(lastRequest!.headers['content-type']).toBe('application/json');
      
      // Verify request body
      expect(lastRequest!.body.model).toBe('gemini-2.5-pro');
      expect(lastRequest!.body.contents).toEqual([{ parts: [{ text: 'Hello world' }] }]);
    });

    it('should normalize Claude model requests correctly', async () => {
      const generator = new BackendProxyContentGenerator({
        model: 'claude-3-5-sonnet',
        backendProxyUrl: serverUrl,
        userAuthToken: 'test-token',
        sessionId: 'test-session-123'
      });

      const request = {
        model: 'claude-3-5-sonnet',
        contents: [{ parts: [{ text: 'Hello Claude' }] }],
        systemInstruction: { parts: [{ text: 'You are a helpful assistant' }] } as any
      };

      const response = await generator.generateContent(request);

      // Verify response
      expect(response.candidates[0].content.parts[0].text).toBe('Hello from Claude!');

      // Verify request normalization
      expect(lastRequest!.body.model).toBe('claude-3-5-sonnet');
      expect(lastRequest!.body.system).toBe('You are a helpful assistant');
      expect(lastRequest!.body.systemInstruction).toBeUndefined();
    });

    it('should handle streaming responses end-to-end', async () => {
      const generator = new BackendProxyContentGenerator({
        model: 'gemini-2.5-pro',
        backendProxyUrl: serverUrl,
        userAuthToken: 'test-token',
        sessionId: 'test-session-123'
      });

      const request = {
        model: 'gemini-2.5-pro',
        contents: [{ parts: [{ text: 'Stream test' }] }]
      };

      const stream = await generator.generateContentStream(request);
      const results = [];

      for await (const chunk of stream) {
        results.push(chunk);
      }

      // Verify streaming worked
      expect(results).toHaveLength(3);
      expect(results[0]).toEqual({ text: 'Streaming' });
      expect(results[1]).toEqual({ text: ' response' });
      expect(results[2]).toEqual({ text: ' works!' });

      // Verify request
      expect(lastRequest!.url).toBe('/api/ai/generate-stream');
      expect(lastRequest!.method).toBe('POST');
    });

    it('should handle token counting end-to-end', async () => {
      const generator = new BackendProxyContentGenerator({
        model: 'gemini-2.5-pro',
        backendProxyUrl: serverUrl,
        userAuthToken: 'test-token',
        sessionId: 'test-session-123'
      });

      const request = {
        model: 'gemini-2.5-pro',
        contents: [{ parts: [{ text: 'Count these tokens' }] }]
      };

      const response = await generator.countTokens(request);

      expect(response.totalTokens).toBe(15);
      expect(lastRequest!.url).toBe('/api/ai/count-tokens');
    });

    it('should handle embedding end-to-end', async () => {
      const generator = new BackendProxyContentGenerator({
        model: 'text-embedding-004',
        backendProxyUrl: serverUrl,
        userAuthToken: 'test-token',
        sessionId: 'test-session-123'
      });

      const request = {
        model: 'text-embedding-004',
        contents: [{ parts: [{ text: 'Embed this text' }] }]
      };

      const response = await generator.embedContent(request);

      expect(response.embeddings[0].values).toEqual([0.1, 0.2, 0.3, 0.4, 0.5]);
      expect(lastRequest!.url).toBe('/api/ai/embed');
    });
  });

  describe('End-to-End Error Handling', () => {
    it.skip('should handle HTTP errors from backend proxy', async () => {
      const generator = new BackendProxyContentGenerator({
        model: 'gemini-2.5-pro',
        backendProxyUrl: serverUrl,
        userAuthToken: 'test-token',
        sessionId: 'test-session-123'
      });

      // Override makeRequest to hit error endpoint
      const originalMakeRequest = (generator as any).makeRequest;
      (generator as any).makeRequest = async (path: string, options: any) => {
        const response = await fetch(`${serverUrl}/api/auth/error`, options);
        return response;
      };

      const request = {
        model: 'gemini-2.5-pro',
        contents: [{ parts: [{ text: 'This should fail' }] }]
      };

      await expect(generator.generateContent(request)).rejects.toThrow('Backend proxy error: 500');
    });

    it('should handle network errors with retry', async () => {
      const generator = new BackendProxyContentGenerator({
        model: 'gemini-2.5-pro',
        backendProxyUrl: 'http://localhost:99999', // Invalid port
        userAuthToken: 'test-token',
        sessionId: 'test-session-123'
      });

      const request = {
        model: 'gemini-2.5-pro',
        contents: [{ parts: [{ text: 'This should fail' }] }]
      };

      // This should fail with network error after retries
      await expect(generator.generateContent(request)).rejects.toThrow();
    });
  });

  describe('End-to-End Authentication', () => {
    it('should include proper authentication headers', async () => {
      const generator = new BackendProxyContentGenerator({
        model: 'gemini-2.5-pro',
        backendProxyUrl: serverUrl,
        userAuthToken: 'test-jwt-token',
        sessionId: 'session-456'
      });

      const request = {
        model: 'gemini-2.5-pro',
        contents: [{ parts: [{ text: 'Auth test' }] }]
      };

      await generator.generateContent(request);

      expect(lastRequest!.headers.authorization).toBe('Bearer test-jwt-token');
      expect(lastRequest!.headers['x-session-id']).toBe('session-456');
      expect(lastRequest!.headers['x-request-id']).toMatch(/^req_\d+_[a-z0-9]+$/);
    });
  });

  describe('End-to-End Provider Detection', () => {
    it('should detect and handle Gemini models correctly', async () => {
      const generator = new BackendProxyContentGenerator({
        model: 'gemini-2.5-flash',
        backendProxyUrl: serverUrl,
        userAuthToken: 'test-token',
        sessionId: 'test-session'
      });

      const request = {
        model: 'gemini-2.5-flash',
        contents: [{ parts: [{ text: 'Gemini test' }] }],
        systemInstruction: { parts: [{ text: 'System prompt' }] } as any
      };

      await generator.generateContent(request);

      // Gemini requests should preserve systemInstruction
      expect(lastRequest!.body.systemInstruction).toBeDefined();
      expect(lastRequest!.body.system).toBeUndefined();
    });

    it('should detect and handle Claude models correctly', async () => {
      const generator = new BackendProxyContentGenerator({
        model: 'claude-4-opus',
        backendProxyUrl: serverUrl,
        userAuthToken: 'test-token',
        sessionId: 'test-session'
      });

      const request = {
        model: 'claude-4-opus',
        contents: [{ parts: [{ text: 'Claude test' }] }],
        systemInstruction: { parts: [{ text: 'System prompt' }] } as any
      };

      await generator.generateContent(request);

      // Claude requests should convert systemInstruction to system
      expect(lastRequest!.body.systemInstruction).toBeUndefined();
      expect(lastRequest!.body.system).toBe('System prompt');
    });
  });
});