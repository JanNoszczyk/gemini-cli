# Next.js Frontend Integration Guide

## Overview

This guide explains how to integrate Gemini CLI functionality into your Next.js application by using the `@google/gemini-cli-core` package directly and adapting UI patterns from the terminal implementation.

## Integration Approach

### Why Not Port the Ink UI?

The Gemini CLI uses Ink, a React renderer for **terminal interfaces**. These components cannot run in web browsers. Instead, we'll:

1. **Use the core package directly** - All business logic is in `@google/gemini-cli-core`
2. **Adapt UI patterns** - Learn from the terminal UI but build for web
3. **Connect via your backend** - Your Go backend manages Docker containers

### Architecture

```
┌──────────────────┐     HTTP/WS      ┌─────────────────┐     stdin/stdout    ┌──────────────────┐
│   Next.js App    │─────────────────▶│   Go Backend    │───────────────────▶│ Docker Container │
│                  │◀─────────────────│                 │◀───────────────────│ (Headless CLI)   │
└──────────────────┘     Streaming    └─────────────────┘                    └──────────────────┘
         │                                                                             │
         │                                                                             │
         └─────────────────────────── Uses ──────────────────────────────────────────┘
                                        │
                                        ▼
                              @google/gemini-cli-core
                               (Direct integration)
```

## Quick Start

### 1. Install Core Package

```bash
npm install @google/gemini-cli-core
```

### 2. Create Gemini Service

```typescript
// lib/gemini/service.ts
import { Config, GeminiClient, ToolRegistry } from '@google/gemini-cli-core';

export class GeminiService {
  private config: Config;
  private client: GeminiClient;
  private toolRegistry: ToolRegistry;

  constructor(apiKey: string) {
    this.config = new Config({
      apiKey,
      model: 'gemini-1.5-pro',
      // Additional configuration
    });
    
    this.client = new GeminiClient(this.config);
  }

  async initialize() {
    await this.client.initialize({
      authType: 'api-key',
      apiKey: this.config.getApiKey()
    });
    
    this.toolRegistry = await this.config.getToolRegistry();
  }

  async sendMessage(prompt: string) {
    const chat = await this.client.getChat();
    return chat.sendMessageStream({
      message: [{ text: prompt }]
    });
  }
}
```

### 3. Create Minimal Chat UI

```typescript
// components/GeminiChat.tsx
'use client';

import { useState } from 'react';
import { Message } from './Message';
import { ChatInput } from './ChatInput';

export function GeminiChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async (prompt: string) => {
    // Add user message
    setMessages(prev => [...prev, { 
      id: Date.now().toString(),
      type: 'user', 
      content: prompt 
    }]);

    setIsStreaming(true);

    try {
      // Connect to your backend
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let assistantMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: ''
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'content') {
                assistantMessage.content += data.text;
                setMessages(prev => [...prev.slice(0, -1), {...assistantMessage}]);
              } else if (data.type === 'tool_call') {
                // Handle tool execution display
                setMessages(prev => [...prev, {
                  id: data.callId,
                  type: 'tool',
                  name: data.name,
                  status: data.status,
                  result: data.result
                }]);
              }
            } catch (e) {
              console.error('Failed to parse SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'error',
        content: 'Failed to send message'
      }]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <Message key={message.id} {...message} />
        ))}
      </div>
      
      <ChatInput 
        onSubmit={sendMessage} 
        disabled={isStreaming}
      />
    </div>
  );
}
```

## Component Adaptation Guide

### Message Components

#### From Ink to Web

```typescript
// Terminal (Ink)
import { Box, Text } from 'ink';

export const GeminiMessage = ({ text }) => (
  <Box flexDirection="row">
    <Text color="purple">✦ </Text>
    <Text>{text}</Text>
  </Box>
);

// Web (Next.js)
export const GeminiMessage = ({ content }) => (
  <div className="flex gap-2">
    <span className="text-purple-600">✦</span>
    <div className="prose">{content}</div>
  </div>
);
```

### Tool Execution Display

```typescript
// Adapted from ToolMessage.tsx
export function ToolMessage({ name, status, description, result }) {
  const statusConfig = {
    pending: { icon: '○', color: 'text-gray-400' },
    executing: { icon: '⊷', color: 'text-blue-500 animate-pulse' },
    success: { icon: '✔', color: 'text-green-500' },
    error: { icon: '✗', color: 'text-red-500' }
  };

  const { icon, color } = statusConfig[status] || statusConfig.pending;

  return (
    <div className="border-l-2 border-gray-300 pl-4 my-2">
      <div className="flex items-center gap-2">
        <span className={color}>{icon}</span>
        <strong>{name}</strong>
        <span className="text-gray-500 text-sm">{description}</span>
      </div>
      
      {result && (
        <pre className="mt-2 p-2 bg-gray-50 rounded text-sm overflow-x-auto">
          {result}
        </pre>
      )}
    </div>
  );
}
```

### Input Component

```typescript
// Simplified from InputPrompt.tsx
import { useState, KeyboardEvent } from 'react';

export function ChatInput({ onSubmit, disabled, placeholder }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Type your message..."}
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none outline-none p-2 border rounded"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </form>
  );
}
```

## API Route Integration

### SSE Endpoint

```typescript
// app/api/gemini/chat/route.ts
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();
  const userId = getUserFromSession(request);

  // Forward to your Go backend
  const backendResponse = await fetch(`${process.env.GO_BACKEND_URL}/api/gemini/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-ID': userId,
    },
    body: JSON.stringify({ prompt }),
  });

  // Stream the response
  return new Response(backendResponse.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

### Direct Core Usage (Alternative)

```typescript
// app/api/gemini/direct/route.ts
import { GeminiService } from '@/lib/gemini/service';

const geminiService = new GeminiService(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();
  
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await geminiService.sendMessage(prompt);
        
        for await (const chunk of response) {
          const data = `data: ${JSON.stringify({
            type: 'content',
            text: chunk.text || ''
          })}\n\n`;
          
          controller.enqueue(encoder.encode(data));
        }
      } catch (error) {
        const errorData = `data: ${JSON.stringify({
          type: 'error',
          message: error.message
        })}\n\n`;
        
        controller.enqueue(encoder.encode(errorData));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  });
}
```

## Adapting CLI Features

### File References (@-mentions)

```typescript
// Extract pattern from CLI
const FILE_REFERENCE_REGEX = /@([^\s]+)/g;

export function parseFileReferences(text: string): string[] {
  const matches = text.match(FILE_REFERENCE_REGEX);
  return matches ? matches.map(m => m.slice(1)) : [];
}

// In your chat component
const handleFileReference = async (filepath: string) => {
  const response = await fetch(`/api/files/${encodeURIComponent(filepath)}`);
  const content = await response.text();
  // Include file content in context
};
```

### Slash Commands

```typescript
// Adapt from slashCommandProcessor.ts
const slashCommands = [
  { name: 'help', description: 'Show help' },
  { name: 'clear', description: 'Clear chat' },
  { name: 'model', description: 'Change model' },
  // Add your commands
];

export function parseSlashCommand(text: string) {
  if (!text.startsWith('/')) return null;
  
  const [command, ...args] = text.slice(1).split(' ');
  return { command, args: args.join(' ') };
}
```

## State Management

### Adapt useGeminiStream Hook

```typescript
// hooks/useGeminiChat.ts
import { useState, useCallback, useRef } from 'react';

export function useGeminiChat() {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController>();

  const sendMessage = useCallback(async (prompt: string) => {
    // Abort previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsStreaming(true);

    try {
      // Implementation as shown above
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Chat error:', error);
      }
    } finally {
      setIsStreaming(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isStreaming,
    sendMessage,
    clearChat,
  };
}
```

## Styling Approach

### Terminal to Web Color Mapping

```typescript
// Adapt from colors.ts
export const colors = {
  accent: {
    purple: 'text-purple-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
  },
  gray: 'text-gray-500',
  foreground: 'text-gray-900',
  background: 'bg-white',
};
```

### Theme Support

```typescript
// Similar to CLI themes but for web
export const themes = {
  light: {
    background: 'bg-white',
    foreground: 'text-gray-900',
    accent: 'text-purple-600',
  },
  dark: {
    background: 'bg-gray-900',
    foreground: 'text-gray-100',
    accent: 'text-purple-400',
  },
};
```

## Best Practices

### 1. Keep It Simple
- Don't try to replicate every terminal feature
- Focus on core chat functionality
- Add web-specific enhancements

### 2. Use Web Strengths
- Rich text editing
- Drag-and-drop file uploads
- Better syntax highlighting
- Responsive design

### 3. Maintain Compatibility
- Use the same event types
- Keep message formats consistent
- Follow the same tool execution flow

### 4. Security
- Always validate user input
- Sanitize file paths
- Use proper authentication
- Rate limit API calls

## Next Steps

1. Review [UI Components Guide](./ui-components-guide.md) for detailed component mappings
2. See [Core Integration Guide](./core-integration.md) for direct package usage
3. Check [Backend Integration](./backend-go.md) for Go server setup
4. Read [Multi-User Sandbox](./multi-user-sandbox.md) for scaling

## Example Repository Structure

```
your-nextjs-app/
├── app/
│   ├── api/
│   │   └── gemini/
│   │       ├── chat/route.ts
│   │       └── tools/route.ts
│   └── chat/
│       └── page.tsx
├── components/
│   └── gemini/
│       ├── Chat.tsx
│       ├── Message.tsx
│       ├── ToolMessage.tsx
│       └── Input.tsx
├── lib/
│   └── gemini/
│       ├── service.ts
│       └── types.ts
└── hooks/
    ├── useGeminiChat.ts
    └── useToolExecution.ts
```

This approach gives you a clean, maintainable integration that leverages the power of the Gemini CLI core while providing a modern web experience.