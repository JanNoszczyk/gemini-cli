/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BackendProxyContentGenerator } from './backendProxyContentGenerator.js';
import { ContentGeneratorConfig } from './contentGenerator.js';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock TokenManager
vi.mock('../auth/tokenManager.js', () => ({
  TokenManager: vi.fn().mockImplementation((token) => ({
    getValidToken: vi.fn().mockResolvedValue(token),
  })),
}));

describe('BackendProxyContentGenerator', () => {
  let generator: BackendProxyContentGenerator;
  let mockConfig: ContentGeneratorConfig & {
    backendProxyUrl?: string;
    userAuthToken?: string;
    sessionId?: string;
  };

  beforeEach(() => {
    mockConfig = {
      model: 'gemini-2.5-pro',
      backendProxyUrl: 'http://backend-proxy',
      userAuthToken: 'test-token',
      sessionId: 'test-session',
    };
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create generator with valid config', () => {
      expect(() => new BackendProxyContentGenerator(mockConfig)).not.toThrow();
    });

    it('should throw error if backend URL is missing', () => {
      const invalidConfig = { ...mockConfig, backendProxyUrl: undefined };
      delete invalidConfig.backendProxyUrl;
      
      expect(() => new BackendProxyContentGenerator(invalidConfig))
        .toThrow('Backend proxy URL is required for USE_BACKEND_PROXY auth type');
    });

    it('should use environment variables as fallbacks', () => {
      process.env.AI_PROXY_URL = 'http://env-proxy';
      process.env.USER_AUTH_TOKEN = 'env-token';
      
      const configWithoutUrls = { model: 'gemini-2.5-pro' };
      expect(() => new BackendProxyContentGenerator(configWithoutUrls)).not.toThrow();
      
      delete process.env.AI_PROXY_URL;
      delete process.env.USER_AUTH_TOKEN;
    });
  });

  describe('generateContent', () => {
    beforeEach(() => {
      generator = new BackendProxyContentGenerator(mockConfig);
    });

    it('should make request to backend proxy for Gemini model', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ candidates: [{ content: { parts: [{ text: 'response' }] } }] }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const request = {
        model: 'gemini-2.5-pro',
        contents: [{ parts: [{ text: 'Hello' }] }],
      };

      await generator.generateContent(request);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://backend-proxy/api/ai/generate',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
            'X-Session-ID': 'test-session',
            'X-Client-Version': '@google/gemini-cli-core@0.1.9',
          }),
          body: JSON.stringify({
            model: 'gemini-2.5-pro',
            contents: [{ parts: [{ text: 'Hello' }] }],
            config: undefined,
            systemInstruction: undefined,
            tools: undefined,
          }),
        })
      );
    });

    it('should normalize request for Claude model', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ candidates: [{ content: { parts: [{ text: 'response' }] } }] }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const request = {
        model: 'claude-3-5-sonnet',
        contents: [{ parts: [{ text: 'Hello' }] }],
        systemInstruction: { parts: [{ text: 'You are helpful' }] },
      };

      await generator.generateContent(request);

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(requestBody.system).toBe('You are helpful');
      expect(requestBody.systemInstruction).toBeUndefined();
    });

    it('should handle HTTP errors', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        text: vi.fn().mockResolvedValue('Bad Request'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const request = {
        model: 'gemini-2.5-pro',
        contents: [{ parts: [{ text: 'Hello' }] }],
      };

      await expect(generator.generateContent(request))
        .rejects.toThrow('Backend proxy error: 400 - Bad Request');
    });

    it('should add request tracing headers', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ candidates: [{ content: { parts: [{ text: 'response' }] } }] }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const request = {
        model: 'gemini-2.5-pro',
        contents: [{ parts: [{ text: 'Hello' }] }],
      };

      await generator.generateContent(request);

      const headers = mockFetch.mock.calls[0][1].headers;
      expect(headers['X-Request-ID']).toMatch(/^req_\d+_[a-z0-9]+$/);
      expect(headers['X-Client-Version']).toBe('@google/gemini-cli-core@0.1.9');
    });
  });

  describe('generateContentStream', () => {
    beforeEach(() => {
      generator = new BackendProxyContentGenerator(mockConfig);
    });

    it('should handle streaming responses', async () => {
      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('data: {"text":"Hello"}\n\n') })
          .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('data: [DONE]\n\n') })
          .mockResolvedValueOnce({ done: true }),
        releaseLock: vi.fn(),
      };

      const mockResponse = {
        ok: true,
        body: {
          getReader: vi.fn().mockReturnValue(mockReader),
        },
      };
      mockFetch.mockResolvedValue(mockResponse);

      const request = {
        model: 'gemini-2.5-pro',
        contents: [{ parts: [{ text: 'Hello' }] }],
      };

      const generator_stream = await generator.generateContentStream(request);
      const results = [];
      
      for await (const result of generator_stream) {
        results.push(result);
      }

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual({ text: 'Hello' });
      expect(mockReader.releaseLock).toHaveBeenCalled();
    });

    it('should handle streaming errors', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
      };
      // Mock fetch to consistently return error for retry attempts
      mockFetch.mockRejectedValue(new Error('Network error'));

      const request = {
        model: 'gemini-2.5-pro',
        contents: [{ parts: [{ text: 'Hello' }] }],
      };

      await expect(generator.generateContentStream(request)).rejects.toThrow('Network error');
    });
  });

  describe('countTokens', () => {
    beforeEach(() => {
      generator = new BackendProxyContentGenerator(mockConfig);
    });

    it('should count tokens via backend proxy', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ totalTokens: 10 }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const request = {
        model: 'gemini-2.5-pro',
        contents: [{ parts: [{ text: 'Hello world' }] }],
      };

      const result = await generator.countTokens(request);

      expect(result.totalTokens).toBe(10);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://backend-proxy/api/ai/count-tokens',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(request),
        })
      );
    });
  });

  describe('embedContent', () => {
    beforeEach(() => {
      generator = new BackendProxyContentGenerator(mockConfig);
    });

    it('should embed content via backend proxy', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ embeddings: [{ values: [0.1, 0.2, 0.3] }] }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const request = {
        model: 'text-embedding-004',
        contents: [{ parts: [{ text: 'Hello world' }] }],
      };

      const result = await generator.embedContent(request);

      expect(result.embeddings?.[0]?.values).toEqual([0.1, 0.2, 0.3]);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://backend-proxy/api/ai/embed',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(request),
        })
      );
    });
  });
});