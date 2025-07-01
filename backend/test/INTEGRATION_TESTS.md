# Integration Tests

This directory contains integration tests for the Gemini CLI backend.

## Test Coverage

### Main Integration Test (`final_test.go`)

The main integration test verifies:
1. **Authentication**: Uses `GEMINI_API_KEY` from `.env` file
2. **Hello Message**: Sends "hello" and verifies response
3. **Container Isolation**: Tests that containers have isolated workspaces

### One-Shot Tests (`oneshot_test.go`)

Tests single-prompt execution:
- Hello/greeting responses
- Math questions
- Basic functionality

### Session Tests (`simple_test.go`)

Tests backend components:
- Sandbox manager
- Session management
- Container lifecycle

### Chat Tests (`chat_test.go`)

Tests gRPC streaming chat (work in progress - requires interactive CLI support).

## Running Tests

### Prerequisites

1. Docker must be running
2. Set `GEMINI_API_KEY` in `.env` file or environment
3. Internet connection (for API calls)

### Run All Integration Tests

```bash
cd backend
make test-integration
```

### Run Specific Tests

```bash
# Main integration test
go test ./test/integration -run TestGeminiCLIIntegration -v

# One-shot tests
go test ./test/integration -run TestOneShotGemini -v

# Session management
go test ./test/integration -run TestSessionManager -v
```

## Test Results

When successful, you should see:
- ✓ Authentication successful
- ✓ Hello message sent and response received
- Response examples:
  - "Hello! How can I help you today?"
  - "Hi there! What can I help you with?"

## Known Issues

1. **Platform Warning**: You may see warnings about platform mismatch (linux/amd64 vs linux/arm64) - this is expected and doesn't affect functionality.

2. **Interactive Mode**: The current Gemini CLI sandbox image (0.1.7) operates in single-shot mode, processing input on EOF. Full interactive chat requires a different approach or updated CLI version.

3. **Network Access**: Containers need network access to reach the Gemini API. The `--network none` option has been removed to allow this.

## Architecture Notes

The integration tests revealed that the official Gemini CLI sandbox:
- Expects input via stdin
- Processes commands when stdin is closed (EOF)
- Returns output via stdout
- Works best in single-shot mode (one prompt, one response)

For multi-turn conversations, each turn currently requires a new container instance.