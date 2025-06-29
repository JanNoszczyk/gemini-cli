# gRPC Server for Remote `gemini-cli` Access (v4 - Final & Corrected)

## 1. Overview

This document provides the final, comprehensive design for a production-ready gRPC server that exposes the functionality of the `gemini-cli` to remote clients. This plan is the result of multiple iterations of deep codebase analysis and is designed to be non-invasive, secure, and feature-complete.

The server will be a self-contained component that builds upon the `@google/gemini-cli-core` package, requiring no modifications to the core libraries.

## 2. Architecture

The architecture is a client-server model:

- **gRPC Server**: A persistent application in a Docker container, managing `gemini-cli` sessions.
- **gRPC Client**: A lightweight client communicating over a bi-directional stream.

## 3. gRPC Service Definition (`gemini.v1.proto`)

This definition is finalized to provide rich feedback and secure configuration.

```protobuf
syntax = "proto3";

package gemini.v1;

import "google/protobuf/struct.proto";

// The primary service for interacting with the remote Gemini CLI.
service GeminiService {
  // Chat starts a bi-directional stream for a conversation.
  rpc Chat(stream ClientRequest) returns (stream ServerResponse);
}

// ClientRequest is a message sent from the client to the server.
message ClientRequest {
  oneof request {
    StartRequest start_request = 1;
    string prompt = 2;
  }
}

// ServerResponse is a message sent from the server to the client.
message ServerResponse {
  oneof response {
    SessionInfo session_info = 1;
    TextResponse text_response = 2;
    ThoughtResponse thought_response = 3;
    ToolStartedResponse tool_started = 4;
    ToolEndedResponse tool_ended = 5;
    ErrorResponse error = 6;
  }
}

// Matches the structure of `ConfigParameters` for initializing a session.
message StartRequest {
  // Optional: User-provided session ID to resume a previous session.
  string session_id = 1;
  // The initial user prompt.
  string prompt = 2;
  // The model to use for the session (e.g., "gemini-1.5-pro-latest").
  string model = 4;
  // The approval mode for dangerous tools. Defaults to REJECT_DANGEROUS_TOOLS.
  ApprovalMode approval_mode = 5;
  // Optional: List of core tools to enable.
  repeated string core_tools = 6;
  // Optional: List of tools to explicitly disable.
  repeated string exclude_tools = 7;
  // Optional: Advanced configuration options.
  google.protobuf.Struct advanced_config = 8;
}

enum ApprovalMode {
  APPROVAL_MODE_UNSPECIFIED = 0;
  // The server will reject any tool that requires user confirmation.
  REJECT_DANGEROUS_TOOLS = 1;
  // The server will automatically approve all tool executions.
  // Use with extreme caution.
  AUTO_APPROVE = 2;
}

// SessionInfo provides the client with the session ID.
message SessionInfo {
  string session_id = 1;
}

// TextResponse contains a chunk of a text response from the model.
message TextResponse {
  string content = 1;
}

// ThoughtResponse contains the model's reasoning for its next action.
message ThoughtResponse {
    string thought = 1;
}

// ToolStartedResponse informs the client that a tool call has begun.
message ToolStartedResponse {
    string name = 1;
    google.protobuf.Struct args = 2;
}

// ToolEndedResponse informs the client that a tool call has finished.
message ToolEndedResponse {
    string name = 1;
    string result_summary = 2; // A brief summary of the result
}

// ErrorResponse contains details about an error that occurred on the server.
message ErrorResponse {
  string message = 1;
  int32 code = 2; // Optional: An internal error code.
}
```

## 4. Server Implementation

The server will be implemented in a new `packages/grpc-server` directory, with a dependency on `@google/gemini-cli-core`.

### 4.1. Session Management (`SessionManager.ts`)

- A `SessionManager` class will manage a `Map<string, GeminiSession>`.
- On receiving a `StartRequest`, it will:
  1.  Generate a new `session_id` if one is not provided.
  2.  Create a `ConfigParameters` object by mapping the fields from the `StartRequest` message, enforcing secure defaults (see 4.3).
  3.  Instantiate a `Config` object from these parameters.
  4.  Create a new `GeminiSession` instance, passing the `Config` object to it.
  5.  Store the session and return the `session_id` to the client in a `SessionInfo` message.

### 4.2. Chat Session Logic (`GeminiSession.ts`)

This class will **compose, not reimplement**, the core logic.

- **Constructor**:
  - Accepts a fully initialized `Config` object.
  - Uses the `Config` object to get an instance of `GeminiClient` and then a `GeminiChat` instance.
- **`handlePrompt(prompt: string, stream: ServerStream)` method**:
  - This method will call `this.geminiChat.sendMessageStream()` and orchestrate the conversation.
  - It will listen for `Thought` events and send `ThoughtResponse` messages.
  - It will use the existing `executeToolCall` function from `@google/gemini-cli-core`.
  - **ApprovalMode Enforcement**: Before calling `executeToolCall`, it will check if the tool requires confirmation. If it does and the session's `ApprovalMode` is `REJECT_DANGEROUS_TOOLS`, it will intercept the call, not execute it, and instead return an error to the model.

### 4.3. Configuration and Security

- **Server-Side Defaults**: The server will establish a baseline `ConfigParameters` object with production-safe defaults:
  - **ApprovalMode**: The default will be `REJECT_DANGEROUS_TOOLS`.
  - **Sandboxing**: Enforced by default.
  - **File System**: The default `targetDir` will be a temporary, isolated directory created for each session.
- **Client Overrides**: The client's `StartRequest` will be used to override these defaults. The server will validate all overrides.
- **Authentication & TLS**: The server will use interceptors for token-based auth and require TLS for all connections.

## 5. Implementation Plan

The phased implementation plan is now finalized:

1.  **Phase 1: Project Setup**
    - Create the `packages/grpc-server` directory.
    - Define the final `gemini.v1.proto`.
    - Generate the TypeScript code from the proto file.
2.  **Phase 2: Core Integration**
    - Implement `SessionManager` to correctly create `Config` objects, enforcing the default `ApprovalMode`.
    - Implement `GeminiSession` to use the `GeminiChat` object.
    - Create a basic client to test the end-to-end flow.
3.  **Phase 3: Tool Execution and Security**
    - Extend `GeminiSession` to handle the full tool-call loop, including the critical `ApprovalMode` check.
    - Implement the `ToolStartedResponse`, `ToolEndedResponse`, and `ThoughtResponse` messages.
4.  **Phase 4: Production Hardening**
    - Create the `Dockerfile` for the server.
    - Implement and enforce server-side sandboxing, auth, and TLS.
    - Add comprehensive logging, error handling, and tests.
