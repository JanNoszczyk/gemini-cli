# API Reference

Complete REST API documentation for the Gemini Server.

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

All API endpoints (except authentication endpoints) require authentication via:

- **JWT Token**: `Authorization: Bearer <token>`
- **API Key**: `X-API-Key: <api-key>`

## Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "role": "engineer" // or "admin", "viewer"
}
```

**Response:**
```json
{
  "token": "jwt-token-string",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "User Name",
    "role": "engineer"
  }
}
```

**Status Codes:**
- `201` - User created successfully
- `400` - Invalid request data
- `409` - User already exists

### POST /auth/login

Authenticate with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-string",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "User Name",
    "role": "engineer"
  }
}
```

### POST /auth/api-key

Generate an API key for programmatic access.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "apiKey": "gsk_user123_randomstring",
  "userId": "user_123"
}
```

### POST /auth/refresh

Refresh an existing JWT token.

**Request Body:**
```json
{
  "token": "existing-jwt-token"
}
```

**Response:**
```json
{
  "token": "new-jwt-token"
}
```

## Session Management

### POST /sessions

Create a new Gemini session.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "config": {
    "model": "gemini-2.0-flash-exp",
    "debugMode": false
  }
}
```

**Response:**
```json
{
  "sessionId": "session_123_456",
  "session": {
    "id": "session_123_456",
    "userId": "user_123",
    "config": {
      "model": "gemini-2.0-flash-exp"
    },
    "workspaceDir": "/path/to/workspace",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "expiresAt": "2024-01-02T00:00:00.000Z"
  }
}
```

### GET /sessions

List all sessions for the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "sessions": [
    {
      "id": "session_123_456",
      "userId": "user_123",
      "config": {
        "model": "gemini-2.0-flash-exp"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "lastAccessedAt": "2024-01-01T12:00:00.000Z",
      "expiresAt": "2024-01-02T00:00:00.000Z"
    }
  ]
}
```

### GET /sessions/:sessionId

Get details for a specific session.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "session": {
    "id": "session_123_456",
    "userId": "user_123",
    "config": {
      "model": "gemini-2.0-flash-exp"
    },
    "workspaceDir": "/path/to/workspace",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "lastAccessedAt": "2024-01-01T12:00:00.000Z",
    "expiresAt": "2024-01-02T00:00:00.000Z"
  }
}
```

### PUT /sessions/:sessionId/extend

Extend a session's expiration time.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "hours": 24
}
```

**Response:**
```json
{
  "message": "Session extended successfully"
}
```

### DELETE /sessions/:sessionId

Destroy a session and clean up resources.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Session destroyed successfully"
}
```

## Chat Operations

### POST /chat/message

Send a message to Gemini (Server-Sent Events stream).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "sessionId": "session_123_456",
  "message": "Hello, Gemini!"
}
```

**Response:** Server-Sent Events stream

```
Content-Type: text/event-stream

data: {"type":"content","data":{"text":"Hello! How can I help you today?"}}
data: {"type":"tool_call_request","data":{"callId":"call_123","tool":"readFile","args":{"path":"file.txt"}}}
data: {"type":"tool_call_response","data":{"callId":"call_123","result":"File contents..."}}
data: {"type":"done"}
```

### GET /chat/history

Get conversation history for a session.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `sessionId` (required): Session ID

**Response:**
```json
{
  "history": [
    {
      "role": "user",
      "parts": [{"text": "Hello, Gemini!"}]
    },
    {
      "role": "model",
      "parts": [{"text": "Hello! How can I help you today?"}]
    }
  ]
}
```

### DELETE /chat/clear

Clear conversation history for a session.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "sessionId": "session_123_456"
}
```

**Response:**
```json
{
  "message": "Conversation cleared"
}
```

### POST /chat/save

Save conversation as a checkpoint.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "sessionId": "session_123_456",
  "tag": "checkpoint-1",
  "description": "Important conversation"
}
```

**Response:**
```json
{
  "message": "Checkpoint saved",
  "tag": "checkpoint-1"
}
```

### POST /chat/load

Load conversation from a checkpoint.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "sessionId": "session_123_456",
  "tag": "checkpoint-1"
}
```

**Response:**
```json
{
  "message": "Checkpoint loaded",
  "tag": "checkpoint-1"
}
```

## Monitoring Endpoints

### GET /monitoring/events

Get activity events (admin only or own events for users).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `limit` (optional): Number of events to return (default: 100)
- `userId` (optional): Filter by user ID (admin only)
- `sessionId` (optional): Filter by session ID

**Response:**
```json
{
  "events": [
    {
      "id": "event_123",
      "sessionId": "session_123_456",
      "userId": "user_123",
      "type": "chat",
      "event": "message",
      "data": {
        "userMessage": "Hello",
        "assistantResponse": "Hi there!",
        "messageLength": 5,
        "responseLength": 9
      },
      "timestamp": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

### GET /monitoring/stats

Get activity statistics.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `userId` (optional): Filter by user ID (admin only)

**Response:**
```json
{
  "stats": {
    "totalEvents": 150,
    "byType": {
      "chat": 100,
      "tool": 30,
      "session": 15,
      "error": 5
    },
    "byUser": {
      "user_123": 80,
      "user_456": 70
    },
    "recentErrors": [
      {
        "id": "event_error_1",
        "message": "Tool execution failed",
        "timestamp": "2024-01-01T12:00:00.000Z"
      }
    ],
    "toolUsage": {
      "readFile": 25,
      "shell": 10,
      "writeFile": 5
    }
  }
}
```

### GET /monitoring/stream

Real-time activity stream (admin only, Server-Sent Events).

**Headers:** `Authorization: Bearer <token>`

**Response:** Server-Sent Events stream

```
Content-Type: text/event-stream

data: {"type":"connected"}
data: {"id":"event_123","type":"chat","event":"message","userId":"user_123","timestamp":"2024-01-01T12:00:00.000Z"}
data: {"id":"event_124","type":"tool","event":"execution","userId":"user_123","timestamp":"2024-01-01T12:01:00.000Z"}
```

## Error Responses

All endpoints may return the following error format:

```json
{
  "error": true,
  "message": "Error description",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Common Status Codes:**
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid or missing authentication)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## Rate Limiting

API endpoints are rate limited per user:
- Default: 100 requests per 15-minute window
- Configurable via `RATE_LIMIT_MAX_REQUESTS` environment variable

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```