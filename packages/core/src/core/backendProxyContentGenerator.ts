/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CountTokensResponse,
  GenerateContentResponse,
  GenerateContentParameters,
  CountTokensParameters,
  EmbedContentResponse,
  EmbedContentParameters,
} from '@google/genai';
import { ContentGenerator, ContentGeneratorConfig } from './contentGenerator.js';
import { getProviderForModel } from '../config/models.js';
import { retryWithBackoff } from '../utils/retry.js';
import { TokenManager } from '../auth/tokenManager.js';

/**
 * BackendProxyContentGenerator implements the ContentGenerator interface
 * by forwarding all requests to a backend proxy service.
 */
export class BackendProxyContentGenerator implements ContentGenerator {
  private backendUrl: string;
  private sessionId: string;
  private tokenManager: TokenManager;

  constructor(config: ContentGeneratorConfig & { 
    backendProxyUrl?: string;
    userAuthToken?: string;
    sessionId?: string;
    tokenRefreshCallback?: () => Promise<string>;
  }) {
    this.backendUrl = config.backendProxyUrl || process.env.AI_PROXY_URL || '';
    const authToken = config.userAuthToken || process.env.USER_AUTH_TOKEN || '';
    this.sessionId = config.sessionId || '';

    if (!this.backendUrl) {
      throw new Error('Backend proxy URL is required for USE_BACKEND_PROXY auth type');
    }

    // Initialize token manager with optional refresh callback
    this.tokenManager = new TokenManager(authToken, config.tokenRefreshCallback);
  }

  async generateContent(
    request: GenerateContentParameters,
  ): Promise<GenerateContentResponse> {
    return retryWithBackoff(async () => {
      const provider = getProviderForModel(request.model || '');
      const normalizedRequest = this.normalizeRequestForProvider(request, provider);
      
      const response = await this.makeRequest('/api/ai/generate', {
        method: 'POST',
        body: JSON.stringify(normalizedRequest),
      });

      if (!response.ok) {
        const error = await response.text();
        const errorObj = new Error(`Backend proxy error: ${response.status} - ${error}`);
        (errorObj as any).status = response.status;
        throw errorObj;
      }

      return await response.json();
    });
  }

  async generateContentStream(
    request: GenerateContentParameters,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    const self = this;
    
    // Test the request first to ensure it will work
    const response = await retryWithBackoff(async () => {
      const provider = getProviderForModel(request.model || '');
      const normalizedRequest = self.normalizeRequestForProvider(request, provider);
      
      const resp = await self.makeRequest('/api/ai/generate-stream', {
        method: 'POST',
        body: JSON.stringify(normalizedRequest),
      });

      if (!resp.ok) {
        const errorObj = new Error(`Backend proxy stream error: ${resp.status}`);
        (errorObj as any).status = resp.status;
        throw errorObj;
      }
      
      return resp;
    });
    
    return (async function* () {
      // Parse SSE stream
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6).trim();
              if (jsonStr && jsonStr !== '[DONE]') {
                try {
                  const data = JSON.parse(jsonStr);
                  yield data;
                } catch (e) {
                  console.error('Failed to parse SSE data:', e);
                }
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    })();
  }

  async countTokens(request: CountTokensParameters): Promise<CountTokensResponse> {
    return retryWithBackoff(async () => {
      const response = await this.makeRequest('/api/ai/count-tokens', {
        method: 'POST',
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorObj = new Error(`Backend proxy count tokens error: ${response.status}`);
        (errorObj as any).status = response.status;
        throw errorObj;
      }

      return await response.json();
    });
  }

  async embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse> {
    return retryWithBackoff(async () => {
      const response = await this.makeRequest('/api/ai/embed', {
        method: 'POST',
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorObj = new Error(`Backend proxy embed error: ${response.status}`);
        (errorObj as any).status = response.status;
        throw errorObj;
      }

      return await response.json();
    });
  }

  /**
   * Normalizes the request format for different providers (e.g., Claude vs Gemini)
   */
  private normalizeRequestForProvider(request: GenerateContentParameters, provider: string): any {
    const baseRequest = {
      model: request.model,
      contents: request.contents,
      config: request.config,
      systemInstruction: (request as any).systemInstruction,
      tools: (request as any).tools,
    };
    
    if (provider === 'claude') {
      // Claude doesn't support certain Gemini-specific features
      const { systemInstruction, ...claudeCompatible } = baseRequest;
      
      // Convert system instruction format
      if (systemInstruction) {
        (claudeCompatible as any).system = systemInstruction.parts?.[0]?.text || '';
      }
      
      return claudeCompatible;
    }
    
    return baseRequest;
  }

  /**
   * Makes a request to the backend proxy with authentication and monitoring
   */
  private async makeRequest(path: string, options: RequestInit): Promise<Response> {
    // Add request ID for tracing
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Get valid token (will refresh if needed)
    const authToken = await this.tokenManager.getValidToken();
    
    const enhancedOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'X-Session-ID': this.sessionId,
        'X-Request-ID': requestId,
        'X-Client-Version': '@google/gemini-cli-core@0.1.9',
        ...(options.headers || {}),
      },
    };
    
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${this.backendUrl}${path}`, enhancedOptions);
      
      const duration = Date.now() - startTime;
      console.log(`Request ${requestId} completed in ${duration}ms`);
      
      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`Request ${requestId} failed after ${duration}ms:`, error);
      throw error;
    }
  }
}