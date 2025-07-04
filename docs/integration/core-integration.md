# Core Package Integration Guide

## Overview

This guide explains how to directly use the `@google/gemini-cli-core` package in your application, bypassing the terminal UI entirely. This approach gives you maximum flexibility while leveraging all the business logic from Gemini CLI.

## Package Structure

The core package provides:

```
@google/gemini-cli-core/
├── Config              # Configuration management
├── GeminiClient        # Main API client
├── ToolRegistry        # Tool management
├── Authentication      # API key and OAuth
├── Tools/              # Built-in tools
│   ├── EditTool
│   ├── ShellTool
│   ├── FileSystemTools
│   └── WebTools
└── Utils/              # Helper functions
```

## Installation

```bash
# Install the core package
npm install @google/gemini-cli-core

# Or with yarn
yarn add @google/gemini-cli-core
```

## Basic Setup

### 1. Initialize Configuration

```typescript
import { Config } from '@google/gemini-cli-core';

// Basic configuration
const config = new Config({
  apiKey: process.env.GEMINI_API_KEY,
  model: 'gemini-1.5-pro',
  targetDir: '/workspace', // Working directory for file operations
});

// Advanced configuration
const advancedConfig = new Config({
  apiKey: process.env.GEMINI_API_KEY,
  model: 'gemini-1.5-pro',
  targetDir: '/workspace',
  temperature: 0.7,
  maxTokens: 8192,
  tools: {
    enabled: ['edit', 'read_file', 'write_file', 'shell'],
    disabled: ['google_web_search'], // Explicitly disable tools
  },
  sandbox: {
    enabled: true,
    type: 'docker',
  },
});
```

### 2. Create Gemini Client

```typescript
import { GeminiClient, ContentGeneratorConfig } from '@google/gemini-cli-core';

class GeminiService {
  private client: GeminiClient;
  private config: Config;

  constructor(config: Config) {
    this.config = config;
    this.client = new GeminiClient(config);
  }

  async initialize() {
    const generatorConfig: ContentGeneratorConfig = {
      authType: 'api-key',
      apiKey: this.config.getApiKey(),
      // Or use OAuth
      // authType: 'oauth',
      // oauthConfig: { ... }
    };

    await this.client.initialize(generatorConfig);
  }

  async getChat() {
    return this.client.getChat();
  }
}
```

## Core Components Usage

### 1. Chat Interface

```typescript
// Simple chat implementation
async function chatWithGemini(service: GeminiService, prompt: string) {
  const chat = await service.getChat();
  
  // Send message and get streaming response
  const response = await chat.sendMessageStream({
    message: [{ text: prompt }],
    config: {
      tools: [{ 
        functionDeclarations: await getToolDeclarations(service) 
      }],
    },
  });

  // Process streaming response
  for await (const chunk of response) {
    if (chunk.text) {
      console.log('Assistant:', chunk.text);
    }
    
    if (chunk.functionCalls) {
      // Handle tool calls
      for (const call of chunk.functionCalls) {
        await handleToolCall(service, call);
      }
    }
  }
}
```

### 2. Tool Registry

```typescript
import { ToolRegistry } from '@google/gemini-cli-core';

async function setupTools(config: Config): Promise<ToolRegistry> {
  const toolRegistry = await config.getToolRegistry();
  
  // Get available tools
  const tools = toolRegistry.getTools();
  console.log('Available tools:', tools.map(t => t.name));
  
  // Get function declarations for Gemini
  const declarations = toolRegistry.getFunctionDeclarations();
  
  return toolRegistry;
}

// Tool execution
async function executeToolCall(
  config: Config,
  toolCall: { name: string; args: any }
) {
  const toolRegistry = await config.getToolRegistry();
  const tool = toolRegistry.getTool(toolCall.name);
  
  if (!tool) {
    throw new Error(`Tool ${toolCall.name} not found`);
  }
  
  // Execute tool
  const result = await tool.execute(
    toolCall.args,
    new AbortController().signal
  );
  
  return result;
}
```

### 3. Direct Tool Usage

```typescript
import { 
  EditTool, 
  ReadFileTool, 
  WriteFileTool,
  ShellTool 
} from '@google/gemini-cli-core';

// File operations
async function fileOperations(config: Config) {
  const readTool = new ReadFileTool(config);
  const writeTool = new WriteFileTool(config);
  const editTool = new EditTool(config);
  
  // Read file
  const content = await readTool.execute({
    path: 'src/index.ts'
  });
  
  // Write file
  await writeTool.execute({
    path: 'output.txt',
    content: 'Hello from Gemini CLI Core!'
  });
  
  // Edit file
  await editTool.execute({
    path: 'src/index.ts',
    original: 'const old = true;',
    replacement: 'const new = false;'
  });
}

// Shell commands
async function shellOperations(config: Config) {
  const shellTool = new ShellTool(config);
  
  // Execute command
  const result = await shellTool.execute({
    command: 'ls -la',
    directory: 'src'
  });
  
  console.log(result.resultDisplay);
}
```

### 4. Session Management

```typescript
import { sessionId, getSessionStats } from '@google/gemini-cli-core';

class SessionManager {
  private sessions: Map<string, GeminiChat> = new Map();
  
  async createSession(userId: string, config: Config): Promise<string> {
    const client = new GeminiClient(config);
    await client.initialize({
      authType: 'api-key',
      apiKey: config.getApiKey()
    });
    
    const chat = await client.getChat();
    const id = sessionId(); // Generate unique session ID
    
    this.sessions.set(id, chat);
    
    return id;
  }
  
  getSession(sessionId: string): GeminiChat | undefined {
    return this.sessions.get(sessionId);
  }
  
  async endSession(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (session) {
      // Get final stats
      const stats = getSessionStats();
      console.log('Session stats:', stats);
      
      this.sessions.delete(sessionId);
    }
  }
}
```

## Advanced Patterns

### 1. Custom Tool Implementation

```typescript
import { BaseTool, ToolResult } from '@google/gemini-cli-core';

interface CustomToolParams {
  query: string;
  limit?: number;
}

class DatabaseQueryTool extends BaseTool<CustomToolParams, ToolResult> {
  constructor() {
    super(
      'database_query',
      'Database Query',
      'Execute SQL queries safely',
      {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'SQL query' },
          limit: { type: 'number', description: 'Result limit' }
        },
        required: ['query']
      }
    );
  }
  
  async execute(params: CustomToolParams): Promise<ToolResult> {
    // Validate query
    if (!this.isSafeQuery(params.query)) {
      return {
        resultDisplay: 'Query rejected for safety reasons',
        llmContent: 'The query was not executed due to safety restrictions'
      };
    }
    
    // Execute query (example)
    const results = await this.runQuery(params.query, params.limit);
    
    return {
      resultDisplay: this.formatResults(results),
      llmContent: JSON.stringify(results)
    };
  }
  
  private isSafeQuery(query: string): boolean {
    // Implement safety checks
    const forbidden = ['DELETE', 'DROP', 'TRUNCATE'];
    return !forbidden.some(keyword => 
      query.toUpperCase().includes(keyword)
    );
  }
  
  private async runQuery(query: string, limit?: number) {
    // Your database logic here
    return [];
  }
  
  private formatResults(results: any[]): string {
    return results.map(r => JSON.stringify(r)).join('\n');
  }
}

// Register custom tool
async function registerCustomTool(config: Config) {
  const toolRegistry = await config.getToolRegistry();
  const customTool = new DatabaseQueryTool();
  
  // Add to registry (Note: This may require extending the registry)
  // toolRegistry.registerTool(customTool);
}
```

### 2. Stream Processing

```typescript
import { ServerGeminiStreamEvent, GeminiEventType } from '@google/gemini-cli-core';

class StreamProcessor {
  async processStream(
    chat: GeminiChat,
    prompt: string,
    onEvent: (event: ServerGeminiStreamEvent) => void
  ) {
    const response = await chat.sendMessageStream({
      message: [{ text: prompt }]
    });
    
    let fullContent = '';
    const toolCalls = [];
    
    for await (const chunk of response) {
      // Content events
      if (chunk.text) {
        fullContent += chunk.text;
        onEvent({
          type: GeminiEventType.Content,
          value: chunk.text
        });
      }
      
      // Tool calls
      if (chunk.functionCalls) {
        for (const call of chunk.functionCalls) {
          toolCalls.push(call);
          onEvent({
            type: GeminiEventType.ToolCallRequest,
            value: {
              callId: call.id || `${call.name}-${Date.now()}`,
              name: call.name,
              args: call.args,
              isClientInitiated: false
            }
          });
        }
      }
      
      // Usage metadata
      if (chunk.usageMetadata) {
        onEvent({
          type: GeminiEventType.UsageMetadata,
          value: chunk.usageMetadata
        });
      }
    }
    
    return { fullContent, toolCalls };
  }
}
```

### 3. Error Handling

```typescript
import { 
  UnauthorizedError, 
  isNodeError,
  getErrorMessage 
} from '@google/gemini-cli-core';

async function robustChat(service: GeminiService, prompt: string) {
  try {
    const chat = await service.getChat();
    const response = await chat.sendMessageStream({
      message: [{ text: prompt }]
    });
    
    // Process response...
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      console.error('Authentication failed:', error.message);
      // Re-authenticate
    } else if (isNodeError(error)) {
      console.error('System error:', getErrorMessage(error));
      // Handle system errors
    } else {
      console.error('Unknown error:', error);
    }
  }
}
```

### 4. Memory Management

```typescript
import { 
  loadHierarchicalGeminiMemory,
  saveMemory,
  MemoryTool
} from '@google/gemini-cli-core';

async function setupMemory(config: Config) {
  // Load existing memory
  const memory = await loadHierarchicalGeminiMemory(
    config.getProjectRoot()
  );
  
  // Create memory tool
  const memoryTool = new MemoryTool(config);
  
  // Save memory
  await memoryTool.execute({
    text: 'User prefers TypeScript over JavaScript'
  });
  
  // Retrieve memories
  const memories = await memoryTool.getRelevantMemories(
    'What language should I use?'
  );
  
  return memories;
}
```

## Integration Examples

### 1. Express.js Backend

```typescript
import express from 'express';
import { Config, GeminiClient } from '@google/gemini-cli-core';

const app = express();
app.use(express.json());

const config = new Config({
  apiKey: process.env.GEMINI_API_KEY,
  model: 'gemini-1.5-pro'
});

const geminiService = new GeminiService(config);
await geminiService.initialize();

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  
  const chat = await geminiService.getChat();
  const response = await chat.sendMessageStream({
    message: [{ text: prompt }]
  });
  
  for await (const chunk of response) {
    res.write(`data: ${JSON.stringify(chunk)}\n\n`);
  }
  
  res.end();
});
```

### 2. Next.js API Route

```typescript
// app/api/gemini/core/route.ts
import { NextRequest } from 'next/server';
import { Config, GeminiClient } from '@google/gemini-cli-core';

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();
  
  const config = new Config({
    apiKey: process.env.GEMINI_API_KEY!,
    model: 'gemini-1.5-pro',
    targetDir: `/tmp/workspaces/${request.headers.get('x-user-id')}`
  });
  
  const client = new GeminiClient(config);
  await client.initialize({
    authType: 'api-key',
    apiKey: config.getApiKey()
  });
  
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const chat = await client.getChat();
      const response = await chat.sendMessageStream({
        message: [{ text: prompt }]
      });
      
      for await (const chunk of response) {
        const data = encoder.encode(
          `data: ${JSON.stringify(chunk)}\n\n`
        );
        controller.enqueue(data);
      }
      
      controller.close();
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    }
  });
}
```

## Testing

```typescript
import { Config, GeminiClient } from '@google/gemini-cli-core';
import { jest } from '@jest/globals';

describe('Gemini Core Integration', () => {
  let config: Config;
  let client: GeminiClient;
  
  beforeEach(() => {
    config = new Config({
      apiKey: 'test-key',
      model: 'gemini-1.5-pro'
    });
    
    client = new GeminiClient(config);
  });
  
  test('should initialize client', async () => {
    await expect(client.initialize({
      authType: 'api-key',
      apiKey: 'test-key'
    })).resolves.not.toThrow();
  });
  
  test('should get chat instance', async () => {
    await client.initialize({
      authType: 'api-key',
      apiKey: 'test-key'
    });
    
    const chat = await client.getChat();
    expect(chat).toBeDefined();
  });
});
```

## Best Practices

1. **Initialize Once**: Create client instances once and reuse them
2. **Handle Errors**: Always wrap API calls in try-catch blocks
3. **Use AbortController**: Allow cancellation of long-running operations
4. **Validate Tools**: Check tool availability before execution
5. **Monitor Usage**: Track token usage with metadata events
6. **Secure API Keys**: Never expose keys in client-side code

## Troubleshooting

### Common Issues

1. **Import Errors**
   ```typescript
   // Correct import
   import { Config } from '@google/gemini-cli-core';
   
   // Not this
   import Config from '@google/gemini-cli-core/Config';
   ```

2. **Authentication Failures**
   - Verify API key is valid
   - Check network connectivity
   - Ensure proper environment variables

3. **Tool Execution Errors**
   - Verify targetDir exists and is writable
   - Check tool permissions in config
   - Ensure proper sandboxing setup

## Next Steps

1. Review [Frontend Integration](./frontend-nextjs.md) for UI implementation
2. Check [Backend Integration](./backend-go.md) for server setup
3. See [Multi-User Guide](./multi-user-sandbox.md) for scaling
4. Explore the [source code](https://github.com/google/gemini-cli) for advanced usage