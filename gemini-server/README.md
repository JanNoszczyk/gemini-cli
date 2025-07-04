# Gemini Server - REST+WebSocket API for Gemini CLI

A production-ready server that wraps the `@google/gemini-cli-core` functionality, providing REST APIs and WebSocket connections for multi-user access with comprehensive monitoring capabilities.

## Features

- 🔐 **Authentication**: JWT tokens and API key support
- 🚀 **Real-time Communication**: WebSocket support via Socket.io
- 📊 **Monitoring**: Comprehensive activity tracking for all users
- 🔧 **Session Management**: Isolated workspaces for each user
- 🛡️ **Security**: Role-based access control, rate limiting
- 🐳 **Docker Ready**: Production-ready containerization
- 📝 **TypeScript**: Full type safety

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
npm start
```

## API Documentation

### Authentication

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Create API Key
```http
POST /api/v1/auth/api-key
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Sessions

#### Create Session
```http
POST /api/v1/sessions
Authorization: Bearer <token>
Content-Type: application/json

{
  "config": {
    "model": "gemini-2.0-flash-exp"
  }
}
```

#### List Sessions
```http
GET /api/v1/sessions
Authorization: Bearer <token>
```

### Chat

#### Send Message (SSE Stream)
```http
POST /api/v1/chat/message
Authorization: Bearer <token>
Content-Type: application/json

{
  "sessionId": "session_123",
  "message": "Hello, Gemini!"
}
```

Response is a Server-Sent Event stream:
```
data: {"type":"content","data":{"text":"Hello! How can I help you today?"}}
data: {"type":"done"}
```

### Monitoring (Admin Only)

#### Get Events
```http
GET /api/v1/monitoring/events?limit=100
Authorization: Bearer <admin-token>
```

#### Real-time Event Stream
```http
GET /api/v1/monitoring/stream
Authorization: Bearer <admin-token>
```

## WebSocket API

### Connection
```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token'
  }
});
```

### Join Session
```javascript
socket.emit('join-session', { sessionId: 'session_123' });
```

### Send Message
```javascript
socket.emit('chat:message', { content: 'Hello, Gemini!' });

// Listen for responses
socket.on('gemini:content', (data) => {
  console.log('Response:', data.text);
});

socket.on('gemini:done', () => {
  console.log('Response complete');
});
```

### Execute Tool
```javascript
socket.emit('tool:execute', {
  name: 'readFile',
  args: { path: '/workspace/file.txt' }
});

socket.on('tool:execution-complete', (data) => {
  console.log('Tool result:', data.result);
});
```

## Monitoring Integration

The server provides comprehensive monitoring for tracking engineer activity:

### Real-time Monitoring
```javascript
// Admin clients can subscribe to all events
socket.emit('monitoring:subscribe');

socket.on('monitoring:event', (event) => {
  console.log('Activity:', event);
});
```

### Event Types
- `chat`: User messages and AI responses
- `tool`: Tool executions
- `session`: Session lifecycle events
- `error`: Error occurrences

## Docker Deployment

### Using Docker Compose
```bash
docker-compose up -d
```

### Building Image
```bash
docker build -t gemini-server .
```

### Running Container
```bash
docker run -p 3000:3000 \
  -e JWT_SECRET=your-secret \
  -e GEMINI_API_KEY=your-key \
  -v $(pwd)/workspaces:/app/workspaces \
  gemini-server
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | Token expiration | 7d |
| `GEMINI_API_KEY` | Gemini API key | - |
| `CORS_ORIGIN` | CORS allowed origin | http://localhost:3001 |
| `MONITORING_ENABLED` | Enable monitoring | true |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## Security Considerations

1. **Authentication**: All endpoints except `/health` and `/api/v1/auth/*` require authentication
2. **Session Isolation**: Each user's workspace is isolated
3. **Rate Limiting**: Configurable per-user rate limits
4. **CORS**: Configurable CORS policies
5. **Input Validation**: All inputs are validated
6. **Error Handling**: Sensitive information is not leaked in errors

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────┐
│   REST Client   │────▶│                  │────▶│  SessionManager│
└─────────────────┘     │                  │     └────────────────┘
                        │  Express Server  │              │
┌─────────────────┐     │   + Socket.io   │              ▼
│ WebSocket Client│────▶│                  │     ┌────────────────┐
└─────────────────┘     │                  │────▶│ @gemini-cli-core│
                        └──────────────────┘     └────────────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │MonitoringService │
                        └──────────────────┘
```

## Development

### Project Structure
```
gemini-server/
├── src/
│   ├── api/              # REST API endpoints
│   ├── websocket/        # WebSocket handlers
│   ├── services/         # Core services
│   ├── middleware/       # Express middleware
│   └── types/            # TypeScript types
├── docker/               # Docker configurations
└── tests/                # Test files
```

### Adding New Endpoints
1. Create route file in `src/api/<resource>/`
2. Add router to `src/server.ts`
3. Update types in `src/types/`
4. Add tests

### Testing
```bash
npm test  # Not implemented yet
```

## License

This project is licensed under the ISC License.

## Support

For issues or questions, please file an issue in the repository.