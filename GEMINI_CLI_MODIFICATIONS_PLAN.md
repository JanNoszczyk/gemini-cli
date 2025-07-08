# Gemini CLI Modifications Plan

## Overview
This document outlines the modifications needed to the Gemini CLI (@google/gemini-cli-core) to support backend proxy authentication and multiple AI providers (Gemini + Claude).

## Current State Analysis
- **Package**: `@google/gemini-cli-core` v0.1.9
- **Architecture**: ContentGenerator interface with direct API implementations
- **Auth Types**: USE_GEMINI, USE_VERTEX_AI, LOGIN_WITH_GOOGLE, CLOUD_SHELL
- **Models**: Hardcoded to Gemini models only

## Modification Goals
1. Add backend proxy support as a new authentication type
2. Support Claude models through Vertex AI
3. Maintain backward compatibility
4. Enable per-container user authentication

## Phase 1: Add Backend Proxy Support

### 1.1 Create New Authentication Type
```typescript
// packages/core/src/core/contentGenerator.ts
export enum AuthType {
  USE_GEMINI = 'use_gemini',
  USE_VERTEX_AI = 'use_vertex_ai',
  LOGIN_WITH_GOOGLE = 'login_with_google',
  CLOUD_SHELL = 'cloud_shell',
  USE_BACKEND_PROXY = 'use_backend_proxy', // NEW
}
```

### 1.2 Create Backend Proxy Content Generator
```typescript
// packages/core/src/core/backendProxyContentGenerator.ts
import { ContentGenerator } from './contentGenerator.js';
import { Config } from '../config/config.js';

export class BackendProxyContentGenerator implements ContentGenerator {
  private backendUrl: string;
  private authToken: string;
  private sessionId: string;
  
  constructor(config: Config) {
    this.backendUrl = config.backendProxyUrl || process.env.AI_PROXY_URL || '';
    this.authToken = config.userAuthToken || process.env.USER_AUTH_TOKEN || '';
    this.sessionId = config.sessionId || '';
  }

  async generateContent(request: GenerateContentRequest): Promise<GenerateContentResponse> {
    const response = await fetch(`${this.backendUrl}/api/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`,
        'X-Session-ID': this.sessionId,
      },
      body: JSON.stringify({
        model: request.model,
        contents: request.contents,
        config: request.config,
        systemInstruction: request.systemInstruction,
        tools: request.tools,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Backend proxy error: ${response.status} - ${error}`);
    }

    return await response.json();
  }

  async *generateContentStream(request: GenerateContentStreamRequest): AsyncGenerator<GenerateContentResponse> {
    const response = await fetch(`${this.backendUrl}/api/ai/generate-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`,
        'X-Session-ID': this.sessionId,
      },
      body: JSON.stringify({
        model: request.model,
        contents: request.contents,
        config: request.config,
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend proxy stream error: ${response.status}`);
    }

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
  }

  async countTokens(request: CountTokensRequest): Promise<CountTokensResponse> {
    const response = await fetch(`${this.backendUrl}/api/ai/count-tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Backend proxy count tokens error: ${response.status}`);
    }

    return await response.json();
  }

  async embedContent(request: EmbedContentRequest): Promise<EmbedContentResponse> {
    const response = await fetch(`${this.backendUrl}/api/ai/embed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Backend proxy embed error: ${response.status}`);
    }

    return await response.json();
  }
}
```

### 1.3 Update ContentGenerator Factory
```typescript
// packages/core/src/core/contentGenerator.ts
import { BackendProxyContentGenerator } from './backendProxyContentGenerator.js';

export function createContentGenerator(
  config: Config,
  httpOptions: HttpOptions,
  sessionId: string,
): ContentGenerator {
  switch (config.authType) {
    case AuthType.USE_BACKEND_PROXY:
      return new BackendProxyContentGenerator(config);
    
    case AuthType.LOGIN_WITH_GOOGLE:
    case AuthType.CLOUD_SHELL:
      return createCodeAssistContentGenerator(httpOptions, config.authType, sessionId);
    
    default:
      // Existing direct API implementation
      const googleGenAI = new GoogleGenAI({
        apiKey: config.apiKey === '' ? undefined : config.apiKey,
        vertexai: config.vertexai,
        httpOptions,
      });
      return googleGenAI.models;
  }
}
```

## Phase 2: Add Multi-Provider Support

### 2.1 Extend Model Configuration
```typescript
// packages/core/src/config/models.ts
export const CLAUDE_MODELS = {
  'claude-3-5-sonnet': 'claude-3-5-sonnet-20241022',
  'claude-3-5-haiku': 'claude-3-5-haiku-20241022',
  'claude-4-opus': 'claude-4-opus-20250514',
  'claude-4-sonnet': 'claude-4-sonnet-20250514',
};

export const ALL_MODELS = {
  ...GEMINI_MODELS,
  ...CLAUDE_MODELS,
};

export function isClaudeModel(model: string): boolean {
  return model.startsWith('claude-');
}

export function getProviderForModel(model: string): 'gemini' | 'claude' {
  return isClaudeModel(model) ? 'claude' : 'gemini';
}
```

### 2.2 Update Config Interface
```typescript
// packages/core/src/config/config.ts
export interface ConfigOptions {
  // Existing fields...
  
  // Backend proxy fields
  authType?: AuthType;
  backendProxyUrl?: string;
  userAuthToken?: string;
  
  // Multi-provider support
  provider?: 'gemini' | 'claude' | 'auto';
  modelMappings?: Record<string, string>;
}
```

### 2.3 Add Token Refresh Support
```typescript
// packages/core/src/auth/tokenManager.ts
export class TokenManager {
  private token: string;
  private expiresAt: Date;
  private refreshCallback?: () => Promise<string>;

  constructor(initialToken: string, refreshCallback?: () => Promise<string>) {
    this.token = initialToken;
    this.expiresAt = this.parseTokenExpiry(initialToken);
    this.refreshCallback = refreshCallback;
  }

  async getValidToken(): Promise<string> {
    if (this.isTokenExpiring() && this.refreshCallback) {
      this.token = await this.refreshCallback();
      this.expiresAt = this.parseTokenExpiry(this.token);
    }
    return this.token;
  }

  private isTokenExpiring(): boolean {
    const bufferMinutes = 5;
    return new Date() >= new Date(this.expiresAt.getTime() - bufferMinutes * 60000);
  }

  private parseTokenExpiry(token: string): Date {
    // Parse JWT to get expiry
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch {
      // Default to 1 hour if parsing fails
      return new Date(Date.now() + 3600000);
    }
  }
}
```

## Phase 3: Gemini Server Integration

### 3.1 Update SessionManager
```typescript
// gemini-server/src/services/SessionManager.ts
private async createGeminiConfig(
  workspaceDir: string,
  sessionId: string,
  overrides?: any
): Promise<any> {
  const { Config, AuthType } = await import('@google/gemini-cli-core');
  
  // Check if backend proxy mode is enabled
  const useBackendProxy = process.env.AI_PROXY_MODE === 'true';
  
  const config = new Config({
    sessionId,
    targetDir: workspaceDir,
    cwd: workspaceDir,
    debugMode: overrides?.debugMode || false,
    model: overrides?.model || 'gemini-2.0-flash-exp',
    
    // Backend proxy configuration
    authType: useBackendProxy ? AuthType.USE_BACKEND_PROXY : AuthType.USE_GEMINI,
    backendProxyUrl: process.env.AI_PROXY_URL,
    userAuthToken: overrides?.userAuthToken || process.env.USER_AUTH_TOKEN,
    
    // Multi-provider support
    provider: overrides?.provider || 'auto',
    
    ...overrides
  });
  
  // Only refresh auth if not using backend proxy
  if (!useBackendProxy) {
    await config.refreshAuth(AuthType.USE_GEMINI);
  }
  
  return config;
}
```

### 3.2 Add Model Selection to API
```typescript
// gemini-server/src/api/sessions/index.ts
router.post('/create', async (req: AuthenticatedRequest, res: Response) => {
  const { 
    model = 'gemini-2.0-flash-exp',
    provider = 'auto',
    ...otherConfig 
  } = req.body;
  
  // Validate model is supported
  const supportedModels = await getSupportedModels();
  if (!supportedModels.includes(model)) {
    return res.status(400).json({ 
      error: `Unsupported model: ${model}. Supported models: ${supportedModels.join(', ')}` 
    });
  }
  
  const sessionId = await sessionManager.createSession(req.user!.id, {
    model,
    provider,
    userAuthToken: req.headers.authorization?.replace('Bearer ', ''),
    ...otherConfig
  });
  
  res.json({ sessionId, model, provider });
});
```

### 3.3 Handle Model-Specific Features
```typescript
// packages/core/src/core/backendProxyContentGenerator.ts
private normalizeRequestForProvider(request: any, provider: string): any {
  if (provider === 'claude') {
    // Claude doesn't support certain Gemini-specific features
    const { cachedContent, ...claudeCompatible } = request;
    
    // Convert system instruction format
    if (request.systemInstruction) {
      claudeCompatible.system = request.systemInstruction.parts?.[0]?.text || '';
      delete claudeCompatible.systemInstruction;
    }
    
    return claudeCompatible;
  }
  
  return request;
}
```

## Phase 4: Error Handling & Monitoring

### 4.1 Add Retry Logic
```typescript
// packages/core/src/utils/retry.ts
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    shouldRetry?: (error: Error) => boolean;
    onRetry?: (attempt: number, error: Error) => void;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    shouldRetry = (error) => error.message.includes('429') || error.message.includes('503'),
    onRetry = () => {},
  } = options;

  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (!shouldRetry(lastError) || attempt === maxRetries - 1) {
        throw lastError;
      }
      
      const delay = Math.min(initialDelay * Math.pow(2, attempt), maxDelay);
      onRetry(attempt + 1, lastError);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}
```

### 4.2 Add Request Interceptors
```typescript
// packages/core/src/core/backendProxyContentGenerator.ts
private async makeRequest(url: string, options: RequestInit): Promise<Response> {
  // Add request ID for tracing
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const enhancedOptions = {
    ...options,
    headers: {
      ...options.headers,
      'X-Request-ID': requestId,
      'X-Client-Version': '@google/gemini-cli-core@0.1.9',
    },
  };
  
  const startTime = Date.now();
  
  try {
    const response = await retryWithBackoff(
      () => fetch(url, enhancedOptions),
      {
        shouldRetry: (error) => {
          // Retry on network errors or specific status codes
          return error.message.includes('fetch failed') ||
                 error.message.includes('429') ||
                 error.message.includes('503');
        },
        onRetry: (attempt, error) => {
          console.log(`Retry attempt ${attempt} for ${requestId}: ${error.message}`);
        },
      }
    );
    
    const duration = Date.now() - startTime;
    console.log(`Request ${requestId} completed in ${duration}ms`);
    
    return response;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`Request ${requestId} failed after ${duration}ms:`, error);
    throw error;
  }
}
```

## Environment Variables

### For Gemini Server Container
```bash
# Backend proxy configuration
AI_PROXY_MODE=true
AI_PROXY_URL=http://ai-proxy-service:8080
USER_AUTH_TOKEN=<firebase-token-injected-per-container>

# Optional overrides
DEFAULT_MODEL=gemini-2.0-flash-exp
DEFAULT_PROVIDER=auto
ENABLE_CLAUDE_MODELS=true
```

### For Development/Testing
```bash
# Direct mode (existing behavior)
GEMINI_API_KEY=your-api-key
AUTH_TYPE=use_gemini

# Backend proxy mode
AUTH_TYPE=use_backend_proxy
AI_PROXY_URL=http://localhost:8080
USER_AUTH_TOKEN=test-token
```

## Testing Strategy

### 1. Unit Tests
```typescript
// packages/core/src/core/backendProxyContentGenerator.test.ts
describe('BackendProxyContentGenerator', () => {
  it('should route requests to backend proxy', async () => {
    const generator = new BackendProxyContentGenerator(mockConfig);
    const response = await generator.generateContent(mockRequest);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://backend/api/ai/generate',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Bearer test-token'
        })
      })
    );
  });

  it('should handle Claude model normalization', async () => {
    const generator = new BackendProxyContentGenerator(mockConfig);
    const response = await generator.generateContent({
      model: 'claude-3-5-sonnet',
      systemInstruction: { parts: [{ text: 'You are helpful' }] },
      contents: []
    });
    
    const requestBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(requestBody.system).toBe('You are helpful');
    expect(requestBody.systemInstruction).toBeUndefined();
  });
});
```

### 2. Integration Tests
- Test Gemini models through proxy
- Test Claude models through proxy
- Test streaming responses
- Test error handling and retries
- Test token refresh

## Migration Path

### Step 1: Release with Backend Proxy Support (Backward Compatible)
- Add new authentication type
- Keep existing auth methods working
- Feature flag for backend proxy mode

### Step 2: Deploy to Test Environment
- Enable backend proxy for specific containers
- Monitor performance and errors
- Validate all features work

### Step 3: Gradual Rollout
- Enable for 10% of users
- Monitor and fix issues
- Increase to 50%, then 100%

### Step 4: Deprecate Direct Mode
- Mark direct auth types as deprecated
- Plan removal in future version
- Update documentation

## Success Criteria

1. ✅ Backend proxy auth type implemented
2. ✅ Claude models supported through proxy
3. ✅ Backward compatibility maintained
4. ✅ Token refresh mechanism working
5. ✅ Error handling and retries implemented
6. ✅ All existing tests pass
7. ✅ New tests for proxy mode pass
8. ✅ Performance impact < 100ms

## Security Considerations

1. **Token Validation**: Always validate tokens before forwarding requests
2. **Request Sanitization**: Sanitize all inputs before sending to backend
3. **Error Messages**: Don't leak sensitive information in errors
4. **HTTPS Only**: Ensure all proxy communication is over HTTPS
5. **Request Signing**: Consider adding request signing for additional security