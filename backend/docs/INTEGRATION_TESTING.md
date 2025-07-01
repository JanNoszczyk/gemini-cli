# Integration Testing Guide

This guide explains how to run integration tests for the Gemini CLI backend.

## Prerequisites

1. **API Key**: You need a valid Gemini API key
2. **Docker/Podman**: Container runtime must be installed
3. **Sandbox Image**: The Gemini CLI sandbox image must be built

## Setup

### 1. Set up API Key

Create a `.env` file in the repository root:

```bash
GEMINI_API_KEY=your-api-key-here
```

Or export it as an environment variable:

```bash
export GEMINI_API_KEY="your-api-key-here"
```

### 2. Build Sandbox Image

From the repository root:

```bash
npm install
npm run build:sandbox
```

### 3. Generate Proto Files

```bash
cd backend
make proto
```

## Running Tests

### Run All Tests

```bash
cd backend
make test-integration
```

### Run Specific Test

To run only the "hello" message test:

```bash
make test-hello
```

### Run with Verbose Output

```bash
go test ./test/integration -v
```

## Test Structure

### 1. Chat Integration Test (`TestChatIntegration`)

Tests the full chat flow:
- Creates a session
- Sends a "hello" message
- Verifies response is received
- Tests multiple messages in sequence

### 2. Session Management Test (`TestSessionManagement`)

Tests session lifecycle:
- Session creation
- Status retrieval
- Session termination
- Cleanup verification

### 3. Unit Tests

- `TestSandboxManager`: Container management
- `TestStreamProcessor`: Stream handling
- `TestSessionManager`: Session operations

## Expected Behavior

### Hello Message Test

When sending "hello", the test expects:
- A response containing greeting-like content
- Response may include words like "hello", "hi", "greet", or "welcome"
- The response is streamed back via gRPC

### Example Output

```
=== RUN   TestChatIntegration
=== RUN   TestChatIntegration/SendHelloMessage
    chat_test.go:89: Created session: test-hello-user
    chat_test.go:134: Received text response: Hello! How can I help you today?
--- PASS: TestChatIntegration/SendHelloMessage (5.23s)
```

## Troubleshooting

### Test Failures

1. **API Key Issues**
   ```
   SKIP: GEMINI_API_KEY not found in environment or .env file
   ```
   Solution: Ensure API key is properly set

2. **Docker Not Found**
   ```
   ERROR: Neither docker nor podman found in PATH
   ```
   Solution: Install Docker or Podman

3. **Sandbox Image Missing**
   ```
   ⚠️  Sandbox image not found. Building it...
   ```
   The test script will attempt to build it automatically

4. **Timeout Errors**
   ```
   Timeout waiting for response
   ```
   Solution: Increase timeout in test or check network connectivity

### Debugging

Enable debug logging:

```bash
DEBUG=true go test ./test/integration -v
```

Check container logs:

```bash
docker logs gemini-user-test-hello-user-<timestamp>
```

## CI/CD Integration

The tests are automatically run in GitHub Actions when:
- Pushing to main branch
- Creating pull requests
- Changes are made to backend code

See `.github/workflows/backend-tests.yml` for CI configuration.

## Writing New Tests

### Test Template

```go
func TestNewFeature(t *testing.T) {
    // Setup
    apiKey := getAPIKey(t)
    server, port := startTestServer(t)
    defer server.Cleanup()
    
    // Connect to server
    conn, err := grpc.Dial(...)
    client := pb.NewGeminiServiceClient(conn)
    
    // Test logic
    t.Run("SubTest", func(t *testing.T) {
        // Your test here
    })
}
```

### Best Practices

1. Always clean up resources (containers, sessions)
2. Use subtests for better organization
3. Check both success and error cases
4. Use meaningful test names
5. Add appropriate timeouts

## Performance Considerations

- Tests create real Docker containers
- Each test may take 5-30 seconds
- Run tests in parallel when possible
- Use container pooling in production