# Multi-User Gemini CLI Integration Guide

## Overview

This guide provides a comprehensive blueprint for integrating the Gemini CLI into a multi-user platform architecture. The solution leverages Docker containers for secure user isolation, communicates via stdin/stdout/stderr streams, and supports real-time interactions between a Go backend and Next.js frontend.

## Architecture Overview

### System Components

```
┌─────────────────┐     ┌─────────────────┐     ┌──────────────────┐
│   Next.js App   │────▶│   Go Backend    │────▶│ Docker Container │
│   (Frontend)    │◀────│   (API Server)  │◀────│  (Gemini CLI)    │
└─────────────────┘     └─────────────────┘     └──────────────────┘
        │                        │                         │
        │                        │                         │
     WebSocket              HTTP/gRPC               stdin/stdout
    or SSE for             for control              for streaming
    real-time                                       responses
```

### Communication Flow

1. **User Request**: Next.js frontend sends prompt to Go backend
2. **Container Spawn**: Go backend creates isolated Docker container
3. **Stream Processing**: Commands sent via stdin, responses via stdout
4. **Real-time Updates**: Responses streamed back to frontend via WebSocket/SSE

### Key Architecture Benefits

- **Isolation**: Each user gets a dedicated sandbox container
- **Security**: File system access restricted to user workspace
- **Scalability**: Stateless containers can be spawned on demand
- **Flexibility**: Core logic separated from UI layer

## Repository Structure

The Gemini CLI repository is organized into two main packages:

```
packages/
├── core/           # Business logic, API client, tools
│   ├── src/
│   │   ├── core/   # Gemini API integration
│   │   ├── tools/  # File operations, shell commands
│   │   └── utils/  # Helper functions
│   └── package.json
└── cli/            # Terminal UI (React + Ink)
    ├── src/
    │   ├── ui/     # React components (Ink-based, not web-compatible)
    │   └── utils/  # Including sandbox.ts
    └── package.json
```

**Important Note**: The CLI package uses Ink for terminal rendering and cannot be directly used in web browsers. Instead, use the `@google/gemini-cli-core` package directly or adapt the UI patterns. See the [Frontend Integration Guide](./integration/frontend-nextjs.md) for the recommended approach.

## Communication Protocol

### Input/Output Streams

The Gemini CLI in sandbox mode communicates entirely through standard streams:

- **stdin**: Receives user prompts and commands
- **stdout**: Outputs Gemini responses and tool results
- **stderr**: Error messages and debug information

### Event Types

When running in interactive mode, the CLI emits structured events:

```typescript
enum GeminiEventType {
  Content = 'content',           // Text responses
  ToolCallRequest = 'tool_call_request',   // Tool execution started
  ToolCallResponse = 'tool_call_response', // Tool execution completed
  Error = 'error',              // Error occurred
  Thought = 'thought',          // Model reasoning (Gemini 2.0+)
}
```

## Security Considerations

### Container Isolation

Each user's container is isolated with:
- Unique container names: `gemini-cli-user-{userId}-{timestamp}`
- Restricted volume mounts (only user workspace)
- Network isolation options
- Resource limits (CPU, memory)

### File System Access

```typescript
// Container volume mounts
args.push('--volume', `${userWorkspace}:/workspace`);
args.push('--workdir', '/workspace');
// User cannot access files outside their workspace
```

### API Key Management

- API keys passed as environment variables
- Never stored in container image
- Cleared after container stops

## Implementation Roadmap

### Phase 1: Basic Integration (Week 1)
- Set up Docker container orchestration in Go
- Implement basic stdin/stdout communication
- Create simple API endpoints
- Test with single user

### Phase 2: Stream Processing (Week 2)
- Implement real-time streaming
- Add WebSocket/SSE support
- Handle multi-turn conversations
- Process tool execution events

### Phase 3: Frontend Migration (Week 3-4)
- Port React hooks from Ink to Next.js
- Create UI component library
- Implement real-time updates
- Add user session management

### Phase 4: Production Hardening (Week 5-6)
- Add container lifecycle management
- Implement rate limiting
- Add monitoring and logging
- Performance optimization

## Quick Start Example

### 1. Build Sandbox Image

```bash
# From gemini-cli repository
npm run build:sandbox
```

### 2. Run Container (Go Backend)

```go
cmd := exec.Command("docker", "run",
    "--rm", "-i",
    "--name", fmt.Sprintf("gemini-user-%s", userID),
    "--volume", fmt.Sprintf("%s:/workspace", userDir),
    "--env", fmt.Sprintf("GEMINI_API_KEY=%s", apiKey),
    "gemini-cli-sandbox",
    "gemini", "--non-interactive",
)
```

### 3. Process Stream (Frontend)

```typescript
const eventSource = new EventSource('/api/gemini/stream');
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  handleGeminiEvent(data);
};
```

## Performance Optimization

### Container Pooling

Pre-warm containers to reduce startup latency:

```go
type ContainerPool struct {
    available chan *Container
    
    func (p *ContainerPool) Get() *Container {
        select {
        case container := <-p.available:
            return container
        default:
            return p.createNew()
        }
    }
}
```

### Resource Management

Set appropriate limits per user:

```bash
--memory="2g"      # Memory limit
--cpus="1.0"       # CPU limit
--pids-limit=100   # Process limit
```

## Monitoring and Observability

### Key Metrics

- Container startup time
- Response latency
- Resource usage per user
- Error rates
- Active containers

### Logging Strategy

```go
log.WithFields(log.Fields{
    "user_id": userID,
    "container_id": containerID,
    "duration": time.Since(start),
}).Info("Gemini request completed")
```

## Troubleshooting

### Common Issues

1. **Container startup failures**
   - Check Docker daemon status
   - Verify image exists
   - Check resource limits

2. **Stream processing errors**
   - Ensure proper error handling
   - Implement reconnection logic
   - Add timeout handling

3. **Performance issues**
   - Use container pooling
   - Optimize volume mounts
   - Monitor resource usage

## Integration Approaches

### Recommended: Direct Core Package Usage

Instead of trying to port the Ink UI, use the `@google/gemini-cli-core` package directly:

1. **Install Core Package**: `npm install @google/gemini-cli-core`
2. **Use Headless Mode**: Run containers with `gemini --non-interactive`
3. **Build Custom UI**: Create your own Next.js components

See the [Core Integration Guide](./integration/core-integration.md) for detailed instructions.

### UI Adaptation Strategy

The CLI's React components use Ink (terminal renderer) and cannot run in browsers. Instead:

- **Adapt Patterns**: Learn from the CLI's component structure
- **Extract Logic**: Reuse business logic from hooks
- **Build for Web**: Create browser-compatible components

See the [UI Components Guide](./integration/ui-components-guide.md) for component mapping.

## Next Steps

1. Review [Backend Integration Guide](./integration/backend-go.md) for Go implementation details
2. See [Frontend Integration Guide](./integration/frontend-nextjs.md) for the recommended approach
3. Check [Core Integration Guide](./integration/core-integration.md) for direct package usage
4. Study [UI Components Guide](./integration/ui-components-guide.md) for adaptation patterns
5. Check [Docker Sandbox Configuration](./integration/docker-sandbox.md) for container setup
6. Read [Multi-User Sandbox Guide](./integration/multi-user-sandbox.md) for scaling considerations

## Support

For questions or issues:
- GitHub Issues: [gemini-cli/issues](https://github.com/google/gemini-cli/issues)
- Documentation: [docs.gemini-cli.dev](https://docs.gemini-cli.dev)