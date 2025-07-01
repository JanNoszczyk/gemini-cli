# Gemini CLI Backend

A gRPC-based backend service for multi-user Gemini CLI integration. This service manages Docker containers running Gemini CLI instances and provides a streaming gRPC API for chat interactions.

## Architecture

The backend consists of:

- **gRPC Server**: Handles client connections and streaming chat
- **Sandbox Manager**: Manages Docker container lifecycle
- **Stream Processor**: Handles bidirectional communication with Gemini CLI
- **Session Manager**: Manages user sessions with automatic cleanup

## Prerequisites

- Go 1.21+
- Docker or Podman
- Protocol Buffers compiler (`protoc`)
- Gemini API key

## Quick Start

### 1. Build the Gemini CLI sandbox image

From the repository root:

```bash
npm run build:sandbox
```

### 2. Install dependencies

```bash
cd backend
make deps
```

### 3. Generate protobuf files

```bash
make proto
```

### 4. Run the server

```bash
# Set your Gemini API key
export GEMINI_API_KEY="your-api-key"

# Run the server
make run
```

Or with custom options:

```bash
go run cmd/api/main.go -port 50051 -image gemini-cli-sandbox:latest -pool-size 10
```

## Docker Deployment

### Build and run with Docker Compose

From the repository root:

```bash
# Build sandbox image
npm run build:sandbox

# Start services
docker-compose up -d
```

### Build backend image only

```bash
cd backend
docker build -t gemini-backend:latest .
```

## API Usage

### Create a session

```go
client := pb.NewGeminiServiceClient(conn)
resp, err := client.CreateSession(ctx, &pb.CreateSessionRequest{
    UserId:        "user123",
    WorkspacePath: "/workspaces/user123",
    ApiKey:        "your-api-key",
})
```

### Start streaming chat

```go
stream, err := client.Chat(ctx)

// Send initial message with session ID
err = stream.Send(&pb.ChatRequest{
    SessionId: sessionId,
    Prompt:    "Hello, Gemini!",
})

// Receive streaming responses
for {
    resp, err := stream.Recv()
    if err == io.EOF {
        break
    }
    // Handle response based on content type
}
```

### End session

```go
resp, err := client.EndSession(ctx, &pb.EndSessionRequest{
    SessionId: sessionId,
})
```

## Configuration

### Environment Variables

- `GEMINI_API_KEY`: Default API key (can be overridden per session)
- `DOCKER_HOST`: Docker daemon socket (default: `/var/run/docker.sock`)

### Command Line Flags

- `-port`: gRPC server port (default: 50051)
- `-image`: Docker image for Gemini CLI (default: `gemini-cli-sandbox:latest`)
- `-pool-size`: Container pool size (default: 10)

## Security

### Container Isolation

Each user session runs in an isolated Docker container with:
- Memory limit: 2GB
- CPU limit: 1 core
- Process limit: 100
- Network isolation (optional)
- Read-write volume mount to user workspace only

### Authentication

Currently, authentication is handled at the application level by requiring an API key. Future enhancements:
- JWT token support
- OAuth integration
- Rate limiting per user

## Development

### Run tests

```bash
make test
```

### Format code

```bash
make fmt
```

### Clean build artifacts

```bash
make clean
```

### Example client

```bash
go run cmd/client/main.go \
  -server localhost:50051 \
  -user test-user \
  -workspace /tmp/test-workspace \
  -api-key "your-api-key"
```

## Monitoring

The server provides:
- Active container count
- Session metrics
- Container lifecycle logging

Future enhancements:
- Prometheus metrics endpoint
- OpenTelemetry tracing
- Structured logging

## Troubleshooting

### Container fails to start

1. Check Docker daemon is running
2. Verify sandbox image exists: `docker images | grep gemini-cli-sandbox`
3. Check server logs for detailed error messages

### Permission denied errors

1. Ensure Docker socket is accessible
2. Check workspace directory permissions
3. Verify user has access to mount volumes

### High memory usage

1. Reduce pool size with `-pool-size` flag
2. Implement container resource limits
3. Enable session timeout for idle cleanup

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Run `make fmt` and `make test`
5. Submit a pull request

## License

This project follows the same license as the Gemini CLI project.