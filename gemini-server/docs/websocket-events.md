# WebSocket Events Reference

Complete documentation for WebSocket events and communication patterns.

## Connection

### Establishing Connection

```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token'
  }
});
```

### Connection Events

#### `connect`
Emitted when successfully connected to the server.

```javascript
socket.on('connect', () => {
  console.log('Connected to server');
});
```

#### `connect_error`
Emitted when connection fails.

```javascript
socket.on('connect_error', (error) => {
  console.error('Connection failed:', error.message);
});
```

#### `disconnect`
Emitted when disconnected from server.

```javascript
socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});
```

## Session Management

### Client → Server Events

#### `join-session`
Join a specific session to receive events for that session.

**Payload:**
```javascript
socket.emit('join-session', {
  sessionId: 'session_123_456'
});
```

### Server → Client Events

#### `session-joined`
Confirmation that session was joined successfully.

**Payload:**
```javascript
socket.on('session-joined', (data) => {
  // data = { sessionId: 'session_123_456' }
});
```

#### `error`
Session-related error occurred.

**Payload:**
```javascript
socket.on('error', (error) => {
  // error = { message: 'Session not found' }
});
```

## Chat Operations

### Client → Server Events

#### `chat:message`
Send a message to Gemini.

**Payload:**
```javascript
socket.emit('chat:message', {
  content: 'Hello, Gemini! How can you help me today?'
});
```

#### `chat:cancel`
Cancel the current message generation.

**Payload:**
```javascript
socket.emit('chat:cancel');
```

#### `chat:clear`
Clear the conversation history.

**Payload:**
```javascript
socket.emit('chat:clear');
```

#### `chat:get-history`
Request the conversation history.

**Payload:**
```javascript
socket.emit('chat:get-history');
```

### Server → Client Events

#### `gemini:content`
Streaming text content from Gemini.

**Payload:**
```javascript
socket.on('gemini:content', (data) => {
  console.log('Received:', data.text);
  console.log('Accumulated:', data.accumulated);
});
```

**Data Structure:**
```typescript
{
  text: string;           // New text chunk
  accumulated: string;    // Full response so far
}
```

#### `gemini:thought`
Gemini's internal reasoning (Gemini 2.0+ models).

**Payload:**
```javascript
socket.on('gemini:thought', (data) => {
  console.log('Thought:', data.thought);
  console.log('Summary:', data.summary);
});
```

#### `gemini:tool-request`
Gemini is requesting to execute a tool.

**Payload:**
```javascript
socket.on('gemini:tool-request', (data) => {
  console.log('Tool requested:', data.tool);
  console.log('Arguments:', data.args);
  console.log('Call ID:', data.callId);
});
```

**Data Structure:**
```typescript
{
  callId: string;
  tool: string;
  args: Record<string, any>;
}
```

#### `gemini:tool-result`
Result of tool execution.

**Payload:**
```javascript
socket.on('gemini:tool-result', (data) => {
  console.log('Tool result:', data.result);
  console.log('Call ID:', data.callId);
});
```

#### `gemini:done`
Message generation completed.

**Payload:**
```javascript
socket.on('gemini:done', (data) => {
  console.log('Response completed');
  console.log('Full response:', data.fullResponse);
  console.log('Timestamp:', data.timestamp);
});
```

#### `gemini:cancelled`
Message generation was cancelled.

**Payload:**
```javascript
socket.on('gemini:cancelled', (data) => {
  console.log('Request cancelled:', data.message);
});
```

#### `gemini:error`
Error occurred during message generation.

**Payload:**
```javascript
socket.on('gemini:error', (data) => {
  console.error('Gemini error:', data.error);
});
```

#### `chat:typing`
Typing indicator for multi-user sessions.

**Payload:**
```javascript
socket.on('chat:typing', (data) => {
  console.log(`User ${data.userId} is typing: ${data.typing}`);
});
```

#### `chat:cleared`
Conversation was cleared.

**Payload:**
```javascript
socket.on('chat:cleared', (data) => {
  console.log('Conversation cleared at:', data.timestamp);
});
```

#### `chat:history`
Conversation history response.

**Payload:**
```javascript
socket.on('chat:history', (data) => {
  console.log('History:', data.history);
  console.log('Retrieved at:', data.timestamp);
});
```

## Tool Operations

### Client → Server Events

#### `tool:execute`
Execute a tool manually.

**Payload:**
```javascript
socket.emit('tool:execute', {
  name: 'readFile',
  args: {
    path: '/workspace/file.txt'
  },
  callId: 'optional-call-id'
});
```

#### `tool:approve`
Approve a tool execution request.

**Payload:**
```javascript
socket.emit('tool:approve', {
  callId: 'call_123_456'
});
```

#### `tool:reject`
Reject a tool execution request.

**Payload:**
```javascript
socket.emit('tool:reject', {
  callId: 'call_123_456',
  reason: 'Security concern'
});
```

#### `tool:list`
Request list of available tools.

**Payload:**
```javascript
socket.emit('tool:list');
```

### Server → Client Events

#### `tool:execution-start`
Tool execution started.

**Payload:**
```javascript
socket.on('tool:execution-start', (data) => {
  console.log('Executing tool:', data.name);
  console.log('Arguments:', data.args);
  console.log('Call ID:', data.callId);
});
```

#### `tool:execution-complete`
Tool execution completed successfully.

**Payload:**
```javascript
socket.on('tool:execution-complete', (data) => {
  console.log('Tool completed:', data.name);
  console.log('Result:', data.result);
  console.log('Display:', data.resultDisplay);
  console.log('Execution time:', data.executionTime + 'ms');
});
```

#### `tool:execution-error`
Tool execution failed.

**Payload:**
```javascript
socket.on('tool:execution-error', (data) => {
  console.error('Tool failed:', data.name);
  console.error('Error:', data.error);
  console.log('Execution time:', data.executionTime + 'ms');
});
```

#### `tool:approved`
Tool execution was approved.

**Payload:**
```javascript
socket.on('tool:approved', (data) => {
  console.log('Tool approved by:', data.approvedBy);
  console.log('Call ID:', data.callId);
  console.log('Timestamp:', data.timestamp);
});
```

#### `tool:rejected`
Tool execution was rejected.

**Payload:**
```javascript
socket.on('tool:rejected', (data) => {
  console.log('Tool rejected by:', data.rejectedBy);
  console.log('Reason:', data.reason);
  console.log('Call ID:', data.callId);
});
```

#### `tool:list-response`
Available tools list.

**Payload:**
```javascript
socket.on('tool:list-response', (data) => {
  data.tools.forEach(tool => {
    console.log('Tool:', tool.name);
    console.log('Description:', tool.description);
    console.log('Parameters:', tool.parameters);
  });
});
```

## Monitoring Events (Admin Only)

### Client → Server Events

#### `monitoring:subscribe`
Subscribe to real-time monitoring events.

**Payload:**
```javascript
socket.emit('monitoring:subscribe');
```

#### `monitoring:unsubscribe`
Unsubscribe from monitoring events.

**Payload:**
```javascript
socket.emit('monitoring:unsubscribe');
```

#### `monitoring:get-events`
Request historical events.

**Payload:**
```javascript
socket.emit('monitoring:get-events', {
  userId: 'user_123',      // optional
  sessionId: 'session_456', // optional
  limit: 100               // optional
});
```

#### `monitoring:get-stats`
Request activity statistics.

**Payload:**
```javascript
socket.emit('monitoring:get-stats', {
  userId: 'user_123' // optional
});
```

#### `monitoring:broadcast`
Broadcast message to all engineers.

**Payload:**
```javascript
socket.emit('monitoring:broadcast', {
  message: 'System maintenance in 10 minutes',
  type: 'warning' // 'info', 'warning', 'error'
});
```

### Server → Client Events

#### `monitoring:event`
Real-time activity event.

**Payload:**
```javascript
socket.on('monitoring:event', (event) => {
  console.log('Activity:', event.type);
  console.log('User:', event.userId);
  console.log('Data:', event.data);
  console.log('Timestamp:', event.timestamp);
});
```

#### `monitoring:events`
Historical events response.

**Payload:**
```javascript
socket.on('monitoring:events', (data) => {
  data.events.forEach(event => {
    console.log('Event:', event);
  });
});
```

#### `monitoring:stats`
Activity statistics response.

**Payload:**
```javascript
socket.on('monitoring:stats', (stats) => {
  console.log('Total events:', stats.totalEvents);
  console.log('By type:', stats.byType);
  console.log('By user:', stats.byUser);
  console.log('Tool usage:', stats.toolUsage);
});
```

## System Events

#### `system:broadcast`
System broadcast message (received by engineers).

**Payload:**
```javascript
socket.on('system:broadcast', (data) => {
  console.log('System message:', data.message);
  console.log('Type:', data.type);
  console.log('From:', data.from);
  console.log('Timestamp:', data.timestamp);
});
```

## Error Handling

All WebSocket operations can emit error events:

```javascript
socket.on('error', (error) => {
  console.error('WebSocket error:', error.message);
});
```

**Common Error Types:**
- Authentication failed
- Session not found
- Access denied
- Tool execution failed
- Invalid message format

## Example Usage Patterns

### Basic Chat Flow

```javascript
// Connect and authenticate
const socket = io('http://localhost:3000', {
  auth: { token: jwtToken }
});

// Join session
socket.on('connect', () => {
  socket.emit('join-session', { sessionId });
});

// Handle session join
socket.on('session-joined', () => {
  // Send message
  socket.emit('chat:message', {
    content: 'Hello, Gemini!'
  });
});

// Handle response
let fullResponse = '';
socket.on('gemini:content', (data) => {
  fullResponse += data.text;
  console.log('Partial response:', data.text);
});

socket.on('gemini:done', () => {
  console.log('Full response:', fullResponse);
});
```

### Tool Execution Flow

```javascript
// Listen for tool requests
socket.on('gemini:tool-request', (data) => {
  console.log(`Gemini wants to use ${data.tool}`);
  
  // Approve the tool
  socket.emit('tool:approve', { callId: data.callId });
});

// Monitor tool execution
socket.on('tool:execution-start', (data) => {
  console.log('Tool starting:', data.name);
});

socket.on('tool:execution-complete', (data) => {
  console.log('Tool completed:', data.result);
});
```

### Monitoring Flow (Admin)

```javascript
// Subscribe to monitoring
socket.emit('monitoring:subscribe');

// Receive all activity
socket.on('monitoring:event', (event) => {
  if (event.type === 'chat') {
    console.log(`User ${event.userId} sent: ${event.data.userMessage}`);
  }
});

// Get statistics
socket.emit('monitoring:get-stats');
socket.on('monitoring:stats', (stats) => {
  console.log('Activity summary:', stats);
});
```