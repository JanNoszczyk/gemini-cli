# gRPC Server: Comprehensive Implementation Plan for User-Facing Functionality

## Executive Summary

This plan outlines the implementation of all missing user-facing functionality in the gRPC server, focusing on the features users actually interact with in the CLI. The plan prioritizes interactive features, real-time feedback, and session management capabilities that are essential for a complete gRPC API.

## Core Requirements from User-Facing Analysis

### 1. Interactive Components (Priority: Critical)
- Multi-line input handling with cursor navigation
- Tool confirmation dialogs with multiple options
- Real-time progress indicators and status updates
- Auto-completion support for file paths and commands

### 2. Configuration Management (Priority: High)
- Runtime theme switching
- Authentication method changes
- Editor preferences
- Approval mode updates
- Memory/context refresh

### 3. Error and Help System (Priority: High)
- Structured error messages with visual indicators
- Expandable error details
- Comprehensive help system
- Warning displays for configuration issues

### 4. Chat Interface (Priority: Critical)
- Multiple message types (User, Gemini, Error, Info, Tool, Thought)
- Markdown rendering support
- Code syntax highlighting
- Diff display for file edits
- Real-time streaming with thought bubbles

### 5. Tool Execution Feedback (Priority: Critical)
- Visual state indicators (pending, executing, success, error, etc.)
- Real-time output streaming
- Result summaries with truncation
- Tool descriptions toggle

### 6. Session Management (Priority: High)
- Token usage tracking and display
- API timing metrics
- Session statistics
- Context summary (loaded files, MCP servers)

## Updated Proto Definition

```protobuf
syntax = "proto3";

package gemini.v1;

import "google/protobuf/struct.proto";

service GeminiService {
  // Main chat interface with bidirectional streaming
  rpc Chat(stream ClientRequest) returns (stream ServerResponse);
  
  // Session management
  rpc GetSessionInfo(SessionInfoRequest) returns (SessionInfoResponse);
  rpc GetSessionStats(SessionStatsRequest) returns (SessionStatsResponse);
  
  // Configuration management
  rpc UpdateConfig(ConfigUpdateRequest) returns (ConfigUpdateResponse);
  rpc GetConfig(GetConfigRequest) returns (GetConfigResponse);
}

// Client to Server Messages
message ClientRequest {
  oneof request {
    StartRequest start_request = 1;
    ChatMessage chat_message = 2;
    ToolConfirmationResponse tool_confirmation = 3;
    ConfigUpdateRequest config_update = 4;
    RefreshContextRequest refresh_context = 5;
    CancelOperationRequest cancel_operation = 6;
    GetHelpRequest get_help = 7;
    AutoCompleteRequest auto_complete = 8;
  }
}

// Server to Client Messages
message ServerResponse {
  oneof response {
    // Session management
    SessionStarted session_started = 1;
    SessionStats session_stats = 2;
    
    // Chat messages
    ChatContent chat_content = 3;
    ThoughtBubble thought_bubble = 4;
    
    // Tool execution
    ToolConfirmationRequest tool_confirmation = 5;
    ToolStatusUpdate tool_status = 6;
    ToolOutputStream tool_output = 7;
    
    // Errors and info
    ErrorMessage error_message = 8;
    InfoMessage info_message = 9;
    WarningMessage warning_message = 10;
    
    // UI updates
    ProgressUpdate progress_update = 11;
    ConfigChanged config_changed = 12;
    HelpContent help_content = 13;
    AutoCompleteResult auto_complete_result = 14;
    
    // File operations
    FileEditPreview file_edit_preview = 15;
    FileOperationResult file_operation_result = 16;
    
    // Session updates
    ContextSummary context_summary = 17;
    UsageMetadata usage_metadata = 18;
  }
}

// Enhanced StartRequest with all config options
message StartRequest {
  string session_id = 1;
  string initial_prompt = 2;
  
  // Model configuration
  string model = 3;
  string embedding_model = 4;
  
  // Tool configuration
  ApprovalMode approval_mode = 5;
  repeated string core_tools = 6;
  repeated string exclude_tools = 7;
  repeated McpServerConfig mcp_servers = 8;
  
  // UI preferences
  string theme = 9;
  string editor_type = 10;
  bool show_tool_descriptions = 11;
  bool show_error_details = 12;
  
  // Session options
  bool resume_from_checkpoint = 13;
  string checkpoint_tag = 14;
  
  // Advanced options
  google.protobuf.Struct advanced_config = 15;
}

// Tool confirmation with all options
message ToolConfirmationRequest {
  string confirmation_id = 1;
  string tool_name = 2;
  google.protobuf.Struct args = 3;
  
  enum ConfirmationType {
    EXECUTE = 0;
    EDIT_FILE = 1;
    SHELL_COMMAND = 2;
    MCP_TOOL = 3;
  }
  ConfirmationType type = 4;
  
  repeated ConfirmationOption options = 5;
  string description = 6;
  
  // For file edits, include diff preview
  DiffPreview diff_preview = 7;
}

message ConfirmationOption {
  enum OptionType {
    ALLOW_ONCE = 0;
    ALLOW_ALWAYS = 1;
    ALLOW_ALWAYS_TOOL = 2;
    ALLOW_ALWAYS_SERVER = 3;
    MODIFY_WITH_EDITOR = 4;
    CANCEL = 5;
  }
  OptionType type = 1;
  string label = 2;
  string hotkey = 3;
}

// Tool execution status
message ToolStatusUpdate {
  string tool_id = 1;
  string tool_name = 2;
  
  enum Status {
    PENDING = 0;
    VALIDATING = 1;
    SCHEDULED = 2;
    AWAITING_CONFIRMATION = 3;
    EXECUTING = 4;
    SUCCESS = 5;
    ERROR = 6;
    CANCELLED = 7;
  }
  Status status = 3;
  
  string description = 4;
  google.protobuf.Struct result = 5;
  string error_message = 6;
}

// Real-time tool output streaming
message ToolOutputStream {
  string tool_id = 1;
  string output = 2;
  bool is_error = 3;
}

// Chat content with formatting
message ChatContent {
  enum ContentType {
    USER = 0;
    GEMINI = 1;
    ERROR = 2;
    INFO = 3;
    TOOL = 4;
    THOUGHT = 5;
  }
  ContentType type = 1;
  
  string content = 2;
  bool is_markdown = 3;
  bool is_streaming = 4;
  
  // For code blocks
  CodeBlock code_block = 5;
}

message CodeBlock {
  string language = 1;
  string code = 2;
  bool should_highlight = 3;
}

// Progress indicators
message ProgressUpdate {
  string operation = 1;
  string status = 2;
  float progress = 3; // 0-1
  string loading_phrase = 4;
  int64 elapsed_ms = 5;
}

// Configuration updates
message ConfigUpdateRequest {
  oneof update {
    string theme = 1;
    string editor_type = 2;
    ApprovalMode approval_mode = 3;
    bool show_tool_descriptions = 4;
    bool show_error_details = 5;
    AuthConfig auth_config = 6;
  }
}

// Session statistics
message SessionStats {
  int32 turn_count = 1;
  TokenUsage total_tokens = 2;
  int64 total_api_time_ms = 3;
  int32 tools_executed = 4;
  int32 files_modified = 5;
  string session_duration = 6;
}

message TokenUsage {
  int32 input_tokens = 1;
  int32 output_tokens = 2;
  int32 cached_tokens = 3;
  int32 reasoning_tokens = 4;
  int32 total_tokens = 5;
}

// Context information
message ContextSummary {
  repeated LoadedFile loaded_files = 1;
  repeated McpServerInfo mcp_servers = 2;
  string git_branch = 3;
  string working_directory = 4;
  MemoryInfo memory_info = 5;
}

// Error handling
message ErrorMessage {
  string message = 1;
  string details = 2;
  string stack_trace = 3;
  int32 code = 4;
  bool is_retryable = 5;
}
```

## Implementation Phases

### Phase 1: Enhanced Proto and Message Infrastructure (3 days)

**Objectives:**
- Complete proto definition with all user-facing message types
- Generate TypeScript bindings
- Create message builders and validators

**Key Tasks:**
1. Define all message types in proto file
2. Add enums for all states and types
3. Generate and test TypeScript code
4. Create message factory utilities
5. Add proto validation layer

**Deliverables:**
- Complete `gemini.v1.proto` with all messages
- Generated TypeScript with proper types
- Message validation utilities
- Unit tests for all message types

### Phase 2: Interactive Confirmation System (5 days)

**Objectives:**
- Implement full tool confirmation flow
- Support all confirmation options
- Handle file edit previews with diffs
- Enable external editor integration

**Key Components:**
```typescript
interface ConfirmationManager {
  requestConfirmation(tool: ToolCall): Promise<ConfirmationResult>;
  handleUserResponse(response: ToolConfirmationResponse): void;
  supportedOptions(toolType: ToolType): ConfirmationOption[];
}
```

**Key Tasks:**
1. Create confirmation request/response handlers
2. Implement diff generation for file edits
3. Add external editor support hooks
4. Create MCP-specific confirmation logic
5. Add timeout handling for confirmations
6. Test all confirmation flows

**Deliverables:**
- Complete confirmation system
- Diff preview generation
- Editor integration hooks
- Comprehensive tests

### Phase 3: Real-time Streaming and Progress (4 days)

**Objectives:**
- Implement real-time tool output streaming
- Add progress indicators for long operations
- Support streaming chat responses
- Handle thought bubbles for supported models

**Key Components:**
```typescript
interface StreamManager {
  streamToolOutput(toolId: string, output: string): void;
  updateProgress(operation: string, progress: number): void;
  streamChatContent(content: string, type: ContentType): void;
  emitThought(thought: string): void;
}
```

**Key Tasks:**
1. Create streaming infrastructure
2. Implement backpressure handling
3. Add progress tracking for operations
4. Create loading phrase rotation
5. Implement thought bubble support
6. Test streaming performance

**Deliverables:**
- Complete streaming system
- Progress tracking
- Performance benchmarks
- Stream management tests

### Phase 4: Configuration Management System (3 days)

**Objectives:**
- Enable runtime configuration updates
- Support all user preferences
- Implement theme switching
- Handle authentication changes

**Key Components:**
```typescript
interface ConfigManager {
  updateConfig(update: ConfigUpdateRequest): Promise<void>;
  getConfig(): CurrentConfig;
  validateUpdate(update: ConfigUpdate): ValidationResult;
  notifyConfigChange(change: ConfigChange): void;
}
```

**Key Tasks:**
1. Create config update handlers
2. Implement validation for each config type
3. Add theme switching support
4. Handle auth method changes
5. Create config persistence layer
6. Test all config scenarios

**Deliverables:**
- Complete config management
- Runtime update support
- Config validation
- Integration tests

### Phase 5: Enhanced Error and Help System (2 days)

**Objectives:**
- Implement structured error messages
- Add expandable error details
- Create comprehensive help system
- Support warning displays

**Key Components:**
```typescript
interface ErrorManager {
  formatError(error: Error): ErrorMessage;
  getErrorDetails(error: Error): string;
  shouldShowDetails(): boolean;
}

interface HelpSystem {
  getHelp(command?: string): HelpContent;
  getAvailableCommands(): Command[];
}
```

**Key Tasks:**
1. Create error formatting system
2. Implement error detail extraction
3. Build help content generator
4. Add warning message support
5. Create error recovery suggestions
6. Test error scenarios

**Deliverables:**
- Error formatting system
- Help content generator
- Warning system
- Error handling tests

### Phase 6: Session Statistics and Monitoring (3 days)

**Objectives:**
- Track all session metrics
- Provide real-time usage data
- Generate session summaries
- Monitor performance metrics

**Key Components:**
```typescript
interface SessionMonitor {
  trackTokenUsage(usage: TokenUsage): void;
  trackToolExecution(tool: string, duration: number): void;
  trackApiCall(duration: number): void;
  getSessionStats(): SessionStats;
  generateSummary(): SessionSummary;
}
```

**Key Tasks:**
1. Create metrics collection system
2. Implement token counting
3. Add timing measurements
4. Create summary generation
5. Add memory usage tracking
6. Test metric accuracy

**Deliverables:**
- Metrics collection system
- Session statistics
- Summary generation
- Performance tests

### Phase 7: File Operations and Diff Display (3 days)

**Objectives:**
- Implement file edit previews
- Generate readable diffs
- Track file operation results
- Support external editor integration

**Key Components:**
```typescript
interface FileOperationManager {
  previewEdit(file: string, changes: Edit[]): DiffPreview;
  applyEdit(file: string, changes: Edit[]): FileOperationResult;
  openInEditor(file: string, content: string): Promise<string>;
}
```

**Key Tasks:**
1. Create diff generation system
2. Implement file operation tracking
3. Add editor integration
4. Create operation result formatting
5. Handle file conflicts
6. Test file operations

**Deliverables:**
- Diff generation system
- File operation tracking
- Editor integration
- File operation tests

### Phase 8: Chat Interface Enhancement (3 days)

**Objectives:**
- Support all message types
- Implement markdown rendering hints
- Add code highlighting support
- Handle message grouping

**Key Components:**
```typescript
interface ChatManager {
  formatMessage(content: string, type: MessageType): ChatContent;
  groupToolMessages(messages: Message[]): MessageGroup[];
  highlightCode(code: string, language: string): HighlightedCode;
}
```

**Key Tasks:**
1. Create message formatting system
2. Implement markdown detection
3. Add code block extraction
4. Create message grouping logic
5. Add syntax highlighting hints
6. Test message formatting

**Deliverables:**
- Message formatting system
- Markdown support
- Code highlighting
- Message tests

### Phase 9: Auto-completion Support (2 days)

**Objectives:**
- Implement file path completion
- Add command completion
- Support context-aware suggestions

**Key Components:**
```typescript
interface AutoCompleteProvider {
  getCompletions(input: string, cursor: number): Completion[];
  getFileCompletions(partial: string): string[];
  getCommandCompletions(partial: string): Command[];
}
```

**Key Tasks:**
1. Create completion engine
2. Implement file path matching
3. Add command matching
4. Create context analysis
5. Test completion accuracy

**Deliverables:**
- Completion engine
- File/command matching
- Completion tests

### Phase 10: Integration and Testing (3 days)

**Objectives:**
- Full integration testing
- Performance optimization
- Documentation
- Example implementations

**Key Tasks:**
1. Create integration test suite
2. Performance benchmarking
3. Write API documentation
4. Create example clients
5. Load testing
6. Security review

**Deliverables:**
- Complete test suite
- Performance report
- API documentation
- Example clients

## Timeline Summary

Total estimated time: **32 days**

- Phase 1: Proto Definition (3 days)
- Phase 2: Confirmation System (5 days)
- Phase 3: Streaming & Progress (4 days)
- Phase 4: Configuration (3 days)
- Phase 5: Error & Help (2 days)
- Phase 6: Statistics (3 days)
- Phase 7: File Operations (3 days)
- Phase 8: Chat Interface (3 days)
- Phase 9: Auto-completion (2 days)
- Phase 10: Integration (3 days)

## Success Metrics

1. **Feature Coverage**: 100% of identified user-facing features implemented
2. **Response Time**: <50ms for non-streaming operations
3. **Streaming Latency**: <10ms per chunk
4. **Confirmation Response**: <30s timeout with graceful handling
5. **Error Recovery**: All errors properly formatted and recoverable
6. **Test Coverage**: >85% code coverage with integration tests

## Implementation Priority

**Critical (Must Have)**:
1. Interactive confirmations
2. Real-time streaming
3. Tool execution feedback
4. Basic chat interface

**High Priority (Should Have)**:
5. Configuration management
6. Error handling system
7. Session statistics
8. File operation previews

**Medium Priority (Nice to Have)**:
9. Auto-completion
10. Advanced help system
11. Theme support
12. External editor integration

## Next Steps

1. Review and approve this plan
2. Set up development milestones
3. Begin with Phase 1 (Proto definition)
4. Establish testing framework
5. Create progress tracking system