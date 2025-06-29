# Gemini gRPC Server

This is the Gemini gRPC server that provides all user-facing functionality from the CLI through gRPC endpoints.

## Features Implemented

### Phase 1: Enhanced Protocol Definition ✅
- Comprehensive proto definition with all user-facing message types
- TypeScript bindings generation
- Message builders and validators with full test coverage

### Phase 2: Interactive Confirmation System ✅
- Tool execution confirmations with multiple options (Allow once, Always allow, Cancel)
- Support for different approval modes (DEFAULT, AUTO_EDIT, YOLO)
- External editor integration for modifying tool inputs
- Confirmation timeout handling

### Phase 3: Real-time Streaming and Progress ✅
- Streaming chat responses with proper content buffering
- Progress indicators with rotating loading phrases
- Tool output streaming (stdout/stderr)
- Thought bubbles with auto-dismiss
- Operation progress tracking with percentages

### Phase 4: Configuration Management System ✅
- Runtime configuration updates (model, theme, editor, approval mode)
- Configuration validation and error handling
- Slash command support for configuration changes
- Configuration export/import for persistence
- Available options discovery (models, themes, editors, tools)

### Phase 5: Error and Help System ✅
- Comprehensive error categorization and handling
- Contextual error suggestions and recovery guidance
- Multi-topic help system with search functionality
- Command-specific help with examples
- Integration with slash commands for easy access
- Error history tracking and retry capabilities

### Phase 6: Session Statistics and Monitoring ✅
- Real-time session analytics and performance tracking
- Comprehensive metrics collection with time-series data
- Tool usage statistics and success rate monitoring
- Model usage tracking with token consumption analysis
- Automated alerting system with configurable thresholds
- Activity logging and session lifecycle management
- Performance metrics (response time, error rates, throughput)
- Resource usage monitoring and trend analysis

### Phase 7: File Operations and Diff Display ✅
- Comprehensive file system operations (read, write, edit, delete, move)
- Intelligent file caching with automatic cleanup and metadata management
- Advanced diff generation using Longest Common Subsequence (LCS) algorithm
- File operation tracking with backup management and cancellation support
- Directory listing with filtering and recursive options
- Binary file detection and handling
- File operation confirmations integrated with existing approval system
- Real-time file operation progress tracking and monitoring
- Event-driven architecture for file system events and notifications

## Running the Server

```bash
# Build the project
npm run build

# Start the server (runs on port 50052)
npm run start

# Or for development with auto-rebuild
npm run dev
```

## Example Usage

See `examples/client.js` for a complete example client that demonstrates:
- Starting a session with configuration
- Sending chat messages
- Handling streaming responses
- Responding to tool confirmations
- Viewing progress updates

See `examples/file-operations-client.js` for file operations demonstration:
- File reading with caching and metadata
- File writing with backup and confirmation
- Diff generation and preview
- File operation tracking and monitoring
- Directory listing and file management

Run the examples:
```bash
# In one terminal, start the server
npm run dev

# In another terminal, run the basic example client
node examples/client.js

# Or run the file operations example
node examples/file-operations-client.js
```

## API Endpoints

### Bidirectional Streaming
- `Chat(stream ClientRequest) returns (stream ServerResponse)` - Main chat interface

### Unary RPCs
- `GetSessionInfo(SessionInfoRequest) returns (SessionInfoResponse)`
- `GetSessionStats(SessionStatsRequest) returns (SessionStatsResponse)`
- `UpdateConfig(ConfigUpdateRequest) returns (ConfigUpdateResponse)`
- `GetConfig(GetConfigRequest) returns (GetConfigResponse)`

## Key Components

### SessionManager
Manages chat sessions with:
- Config initialization with all CLI parameters
- Content generator setup
- Tool registry integration
- Statistics tracking
- Slash command processing

### ConfirmationManager
Handles tool execution confirmations:
- Pending confirmation tracking
- Timeout management
- Always-allow lists for tools and servers
- Event-based confirmation flow

### StreamingManager
Manages real-time updates:
- Content streaming with buffering
- Progress operations with loading phrases
- Tool output streaming
- Thought bubble management
- Resource cleanup

### ConfigurationManager
Handles runtime configuration:
- Model switching
- Theme and editor preferences
- Tool descriptions and error detail toggles
- Configuration validation
- Export/import for persistence

### SlashCommandHandler
Processes slash commands:
- `/help` - Show available commands
- `/model` - Switch models
- `/theme` - Change themes
- `/editor` - Set external editor
- `/config` - Show current configuration
- `/stats` - Display session statistics
- `/approval` - Change approval mode
- `/tools` - List available tools

### FileManager
Handles file operations and diff generation:
- File reading/writing with caching and metadata
- Patch-based file editing with line-level precision
- Unified diff generation using LCS algorithm
- File operation tracking with backup management
- Directory listing with filtering and recursive options
- Binary file detection and proper handling
- Operation cancellation and cleanup management

## Message Types

### Client → Server
- `StartRequest` - Initialize a new session
- `ChatMessage` - Send a message or shell command
- `ToolConfirmationResponse` - Respond to tool confirmations
- `ConfigUpdateRequest` - Update session configuration
- `AutoCompleteRequest` - Request completions

### Server → Client
- `SessionStarted` - Session initialized
- `ChatContent` - Streaming or final chat content
- `ToolConfirmationRequest` - Request tool execution approval
- `ToolStatusUpdate` - Tool execution status
- `ToolOutputStream` - Streaming tool output
- `ProgressUpdate` - Progress indicators
- `ThoughtBubble` - Model's thinking process
- `ErrorMessage`, `InfoMessage`, `WarningMessage` - System messages

## Implementation Complete

All planned phases have been successfully implemented:
- ✅ Phase 1: Enhanced Protocol Definition 
- ✅ Phase 2: Interactive Confirmation System
- ✅ Phase 3: Real-time Streaming and Progress
- ✅ Phase 4: Configuration Management System
- ✅ Phase 5: Error and Help System
- ✅ Phase 6: Session Statistics and Monitoring
- ✅ Phase 7: File Operations and Diff Display

The gRPC server now provides comprehensive access to all CLI functionality through a robust, feature-complete API with real-time streaming, interactive confirmations, file operations, and comprehensive monitoring.

## Testing

Run tests with:
```bash
npm test
```

Key test files:
- `src/services/ConfirmationManager.test.ts` - Confirmation system tests
- `src/services/StreamingManager.test.ts` - Streaming functionality tests
- `src/services/ConfigurationManager.test.ts` - Configuration management tests
- `src/services/ErrorHandler.test.ts` - Error handling tests
- `src/services/HelpManager.test.ts` - Help system tests
- `src/services/SessionMonitor.test.ts` - Session monitoring tests
- `src/services/MetricsCollector.test.ts` - Metrics collection tests
- `src/services/FileManager.test.ts` - File operations and diff generation tests
- `src/utils/MessageBuilders.test.ts` - Message construction tests
- `src/utils/MessageValidators.test.ts` - Input validation tests

**Test Coverage**: 217 passing tests across all components with comprehensive coverage of file operations, streaming, confirmations, monitoring, and error handling.