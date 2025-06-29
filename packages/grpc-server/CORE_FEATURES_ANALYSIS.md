# Gemini CLI Core Features Analysis

This document provides a comprehensive analysis of all features and functionality available in the gemini-cli-core package that should be exposed through the gRPC server.

## 1. GeminiChat Capabilities

### Core Chat Features
- **Message Streaming**: Send messages with streaming responses
- **Non-streaming Messages**: Send messages with complete responses
- **History Management**: 
  - Get history (curated or comprehensive)
  - Clear history
  - Add/set history entries
  - History compression when approaching token limits
- **Multi-turn Conversations**: Support for up to 100 turns by default
- **Automatic Function Calling**: Support for tool execution within conversations
- **Thinking Support**: For models that support it (gemini-2.5)
- **Flash Fallback**: Automatic fallback to Flash model on persistent 429 errors for OAuth users

### Advanced Features
- **Model Selection**: Dynamic model selection based on request complexity
- **Token Counting**: Track usage metadata including input/output/cached/thoughts/tool tokens
- **API Time Tracking**: Monitor API response times
- **Retry Logic**: Built-in retry with backoff for transient errors

## 2. Event Types and Streams

### Server Event Types (GeminiEventType)
1. **Content**: Text content from the model
2. **ToolCallRequest**: Request to execute a tool
3. **ToolCallResponse**: Response from tool execution
4. **ToolCallConfirmation**: Request for user confirmation
5. **UserCancelled**: User cancelled operation
6. **Error**: Error occurred with structured error info
7. **ChatCompressed**: Chat history was compressed
8. **UsageMetadata**: Token usage and API time metadata
9. **Thought**: Model's thinking process (for supported models)

### Event Structures
- Content events include text
- Tool call events include callId, name, args, and execution status
- Error events include message and optional status code
- Usage events include detailed token breakdowns
- Thought events include subject and description

## 3. Tool Execution Features

### Tool Registry
- **Core Tools Available**:
  - `ls`: List files and directories
  - `read_file`: Read file contents
  - `grep`: Search file contents with regex
  - `glob`: Find files by pattern
  - `edit`: Edit files with precise replacements
  - `write_file`: Write/create files
  - `web_fetch`: Fetch and process web content
  - `read_many_files`: Read multiple files efficiently
  - `shell`: Execute shell commands
  - `memory`: Remember user preferences
  - `web_search`: Search the web
  
- **MCP Tools**: Support for Model Context Protocol servers
- **Discovered Tools**: Project-specific tools via discovery commands

### Tool Execution Modes
1. **Interactive Mode** (CoreToolScheduler):
   - Confirmation prompts before execution
   - Live output streaming
   - Modification support (edit parameters)
   - Approval modes: default, autoEdit, yolo
   - Parallel execution management
   
2. **Non-Interactive Mode** (NonInteractiveToolExecutor):
   - Direct execution without confirmations
   - No live output streaming
   - Suitable for automation

### Tool Features
- **Validation**: Parameter validation before execution
- **Confirmation Details**: Different types (edit, exec, mcp, info)
- **Confirmation Outcomes**: 
  - ProceedOnce
  - ProceedAlways
  - ProceedAlwaysServer
  - ProceedAlwaysTool
  - ModifyWithEditor
  - Cancel
- **Live Output**: Streaming output updates for supported tools
- **Error Handling**: Structured error responses

## 4. Configuration Options

### Core Configuration
- **Models**: 
  - Primary model selection
  - Embedding model
  - Flash fallback support
- **Authentication**:
  - OAuth (Login with Google)
  - Gemini API key
  - Vertex AI
- **Project Settings**:
  - Target directory
  - Working directory
  - Sandbox configuration (docker/podman/sandbox-exec)
- **Tool Configuration**:
  - Core tools selection/exclusion
  - Tool discovery command
  - Tool call command
  - MCP server configurations

### Advanced Configuration
- **Memory Settings**:
  - User memory storage
  - Gemini.md file management
- **Approval Modes**:
  - Default (with confirmations)
  - AutoEdit (auto-approve edits)
  - YOLO (approve all)
- **File Filtering**:
  - Respect .gitignore
  - Recursive file search
- **Telemetry**:
  - Enable/disable
  - OTLP endpoint
  - Log prompts option
- **Accessibility**:
  - Disable loading phrases
- **Debug Mode**: Enhanced logging
- **Proxy Support**: HTTP proxy configuration
- **Checkpointing**: Save/load conversation state

## 5. Authentication Features

### OAuth2 Flow
- Browser-based authentication
- Credential caching in ~/.gemini/oauth_creds.json
- Token refresh support
- Scopes: Cloud Platform, UserInfo

### API Key Support
- Gemini API key via GEMINI_API_KEY env var
- Google API key for Vertex AI
- Automatic model selection based on availability

## 6. Interactive Features

### System Prompts
- Customizable system instructions
- User memory integration
- Environment-aware prompts (sandbox, git repo)
- Override via GEMINI_SYSTEM_MD

### Context Management
- Folder structure discovery
- Full file context loading
- Git service integration
- File discovery service

### Session Management
- Unique session IDs
- Message logging with timestamps
- Previous message retrieval
- Checkpoint save/load

## 7. Telemetry and Logging

### Event Logging
- Start/end session events
- User prompt events
- Tool call events with timing
- API request/response events
- Error events with details

### Metrics
- Token usage tracking
- API response times
- Tool execution durations
- Success/failure rates

### Clearcut Logger
- Usage statistics
- Session configuration logging

## 8. Error Handling

### Error Types
- UnauthorizedError
- API errors with status codes
- Tool execution errors
- Validation errors

### Error Reporting
- Structured error messages
- Context preservation
- Friendly error conversion

## 9. Advanced Features

### Content Generation
- JSON generation with schema validation
- Structured responses
- Multiple retry strategies
- Model-specific configurations

### Git Integration
- Repository detection
- Git service for operations
- Commit message style matching

### Web Capabilities
- Web fetch with AI processing
- Web search integration
- URL content extraction

### File Services
- File discovery with filtering
- Git ignore parsing
- BFS file search
- Memory discovery

## 10. Features Currently Missing in gRPC Server

Based on this analysis, the following features should be added to the gRPC server:

1. **Streaming Support**:
   - Tool output streaming
   - Thought events
   - Chat compression events

2. **Configuration Management**:
   - Dynamic configuration updates
   - Model switching during session
   - Flash fallback handling

3. **Tool Features**:
   - Tool discovery refresh
   - MCP server management
   - Tool parameter modification
   - Parallel tool execution

4. **Session Features**:
   - Checkpoint save/load
   - History compression
   - Multi-turn conversation management

5. **Interactive Features**:
   - Approval mode changes
   - Editor type preferences
   - Confirmation handling

6. **Advanced Features**:
   - JSON generation endpoint
   - Embedding generation
   - Web search/fetch
   - Git operations

7. **Monitoring**:
   - Telemetry event streaming
   - Usage metadata tracking
   - Error reporting

This comprehensive feature set should guide the implementation of missing functionality in the gRPC server to fully expose the capabilities of the gemini-cli-core library.