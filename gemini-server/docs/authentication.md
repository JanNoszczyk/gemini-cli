# Authentication Guide

Comprehensive guide to authentication and authorization in the Gemini Server.

## Overview

The Gemini Server supports multiple authentication methods designed for different use cases:

- **JWT Tokens**: For interactive user sessions (web apps, mobile apps)
- **API Keys**: For programmatic access (scripts, integrations)
- **Role-Based Access**: Admin, Engineer, and Viewer roles with different permissions

## Authentication Methods

### JWT Token Authentication

JWT tokens are the primary authentication method for interactive sessions.

#### Obtaining a JWT Token

**Via Registration:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe",
    "role": "engineer"
  }'
```

**Via Login:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

Both endpoints return:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "engineer"
  }
}
```

#### Using JWT Tokens

**REST API:**
```bash
curl -X GET http://localhost:3000/api/v1/sessions \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**WebSocket:**
```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
});
```

### API Key Authentication

API keys are ideal for server-to-server communication and automated scripts.

#### Generating API Keys

```bash
curl -X POST http://localhost:3000/api/v1/auth/api-key \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

Response:
```json
{
  "apiKey": "gsk_user123_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "userId": "user_123"
}
```

#### Using API Keys

**REST API:**
```bash
curl -X GET http://localhost:3000/api/v1/sessions \
  -H "X-API-Key: gsk_user123_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
```

**WebSocket:**
```javascript
const socket = io('http://localhost:3000', {
  auth: {
    apiKey: 'gsk_user123_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
  }
});
```

## User Roles and Permissions

### Role Definitions

#### Engineer
- **Purpose**: Primary users who interact with Gemini for development tasks
- **Permissions**:
  - Create and manage own sessions
  - Send messages to Gemini
  - Execute tools within their workspace
  - View own activity history
  - Save and load conversation checkpoints

#### Admin
- **Purpose**: System administrators and monitoring personnel
- **Permissions**:
  - All Engineer permissions
  - View all user sessions and activity
  - Access real-time monitoring streams
  - Broadcast messages to all users
  - Manage user accounts (future feature)
  - Access system metrics and logs

#### Viewer
- **Purpose**: Read-only access for stakeholders and auditors
- **Permissions**:
  - View own activity history
  - Read-only access to assigned sessions (future feature)
  - No Gemini interaction capabilities

### Permission Matrix

| Operation | Engineer | Admin | Viewer |
|-----------|----------|-------|--------|
| Create Session | ✓ | ✓ | ✗ |
| Chat with Gemini | ✓ | ✓ | ✗ |
| Execute Tools | ✓ | ✓ | ✗ |
| View Own Activity | ✓ | ✓ | ✓ |
| View All Activity | ✗ | ✓ | ✗ |
| Real-time Monitoring | ✗ | ✓ | ✗ |
| System Broadcast | ✗ | ✓ | ✗ |
| Manage Users | ✗ | ✓ | ✗ |

## Security Considerations

### Token Security

#### JWT Token Best Practices
- **Expiration**: Tokens expire after 7 days by default (configurable)
- **Refresh**: Use refresh endpoint to get new tokens
- **Storage**: Store tokens securely (httpOnly cookies, secure storage)
- **Transmission**: Always use HTTPS in production

```javascript
// Example: Secure token storage in browser
const secureStorage = {
  setToken(token) {
    // Use httpOnly cookie or secure localStorage
    document.cookie = `auth_token=${token}; Secure; HttpOnly; SameSite=Strict`;
  },
  getToken() {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];
  }
};
```

#### API Key Security
- **Format**: Prefixed with `gsk_` for identification
- **Storage**: Store securely on the client side
- **Rotation**: Regenerate keys periodically
- **Scope**: Keys inherit user role permissions

### Input Validation

All authentication endpoints validate:
- **Email format**: Valid email addresses only
- **Password strength**: Minimum 8 characters (configurable)
- **Role values**: Must be valid role enum
- **Request size**: Limited to prevent DoS attacks

### Rate Limiting

Authentication endpoints have strict rate limits:
- **Login attempts**: 5 attempts per 15 minutes per IP
- **Registration**: 3 registrations per hour per IP
- **API key generation**: 1 key per hour per user

## Integration Examples

### Frontend Web Application

```javascript
class GeminiAuthService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('auth_token');
  }

  async login(email, password) {
    const response = await fetch(`${this.baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      this.token = data.token;
      localStorage.setItem('auth_token', this.token);
      return data.user;
    }
    throw new Error('Login failed');
  }

  async refreshToken() {
    if (!this.token) return null;

    const response = await fetch(`${this.baseUrl}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: this.token })
    });

    if (response.ok) {
      const data = await response.json();
      this.token = data.token;
      localStorage.setItem('auth_token', this.token);
      return this.token;
    }
    return null;
  }

  getAuthHeaders() {
    return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
  }

  connectWebSocket() {
    return io(this.baseUrl, {
      auth: { token: this.token }
    });
  }
}
```

### Backend Service Integration

```python
import requests
import websocket
import json

class GeminiClient:
    def __init__(self, base_url, api_key):
        self.base_url = base_url
        self.api_key = api_key
        self.headers = {'X-API-Key': api_key}

    def create_session(self, config=None):
        response = requests.post(
            f"{self.base_url}/api/v1/sessions",
            headers=self.headers,
            json={'config': config or {}}
        )
        response.raise_for_status()
        return response.json()['sessionId']

    def send_message(self, session_id, message):
        response = requests.post(
            f"{self.base_url}/api/v1/chat/message",
            headers=self.headers,
            json={'sessionId': session_id, 'message': message},
            stream=True
        )
        
        for line in response.iter_lines():
            if line.startswith(b'data: '):
                data = json.loads(line[6:])
                if data.get('type') == 'done':
                    break
                yield data
```

### Command Line Tool

```bash
#!/bin/bash

# Configuration
GEMINI_SERVER="http://localhost:3000"
API_KEY="your-api-key-here"

# Create session
SESSION_ID=$(curl -s -X POST "$GEMINI_SERVER/api/v1/sessions" \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"config": {"model": "gemini-2.0-flash-exp"}}' \
  | jq -r '.sessionId')

echo "Created session: $SESSION_ID"

# Send message
curl -s -X POST "$GEMINI_SERVER/api/v1/chat/message" \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"sessionId\": \"$SESSION_ID\", \"message\": \"$1\"}" \
  | while IFS= read -r line; do
    if [[ $line == data:* ]]; then
      echo "$line" | sed 's/^data: //' | jq -r '.data.text // empty'
    fi
  done
```

## Environment Configuration

### Required Environment Variables

```bash
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# OAuth Configuration (optional)
OAUTH_CLIENT_ID=your-google-oauth-client-id
OAUTH_CLIENT_SECRET=your-google-oauth-client-secret
OAUTH_REDIRECT_URI=http://localhost:3000/api/v1/auth/callback
```

### Security Settings

```bash
# CORS Configuration
CORS_ORIGIN=https://your-frontend-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# Password Requirements
MIN_PASSWORD_LENGTH=8
REQUIRE_SPECIAL_CHARS=true
```

## Troubleshooting

### Common Authentication Issues

#### "Invalid token" Error
- **Cause**: Expired or malformed JWT token
- **Solution**: Refresh token or re-authenticate
- **Prevention**: Implement automatic token refresh

#### "Authentication failed" Error
- **Cause**: Invalid credentials or API key
- **Solution**: Verify credentials and key format
- **Check**: Ensure API key starts with `gsk_`

#### "Insufficient permissions" Error
- **Cause**: User role doesn't have required permissions
- **Solution**: Assign appropriate role or request access
- **Check**: Verify user role in JWT payload

#### WebSocket Connection Fails
- **Cause**: Missing or invalid auth token in connection
- **Solution**: Include valid token in auth object
- **Example**:
```javascript
// Correct
const socket = io(url, { auth: { token: validToken } });

// Incorrect
const socket = io(url);
socket.emit('auth', { token: validToken }); // Too late
```

### Debugging Authentication

Enable debug logging:
```bash
DEBUG=auth* npm run dev
```

Check token payload:
```javascript
// Decode JWT token (client-side debugging only)
function decodeJWT(token) {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
}

console.log(decodeJWT(yourToken));
```

Verify API key format:
```bash
# Valid API key format
gsk_user123_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

# Components
gsk_           # Prefix
user123_       # User identifier  
a1b2c3...      # Random string
```