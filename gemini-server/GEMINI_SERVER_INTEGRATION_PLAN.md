# Gemini-Server Integration Implementation Plan

## Overview
This document provides a complete implementation plan for integrating gemini-server into your main application repository. The gemini-server will be copied from the gemini-cli repository and modified to work with your Go backend.

## Prerequisites
- Gemini-server source code from: `/Users/jannoszczyk/Documents/Github/gemini-cli-jan/gemini-server/`
- Your main application with Go backend
- Docker and Docker Compose installed
- Gemini API key

## Phase 1: Initial Setup

### Step 1.1: Copy Gemini-Server to Main App
```bash
# From your main application root directory
cp -r /Users/jannoszczyk/Documents/Github/gemini-cli-jan/gemini-server ./gemini-server

# Verify the copy
ls -la ./gemini-server/
```

### Step 1.2: Expected Directory Structure
After copying, your main app should have:
```
your-main-app/
├── backend/            # Your existing Go backend
├── frontend/           # Your existing frontend (if any)
├── gemini-server/      # Newly copied directory
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
└── docker-compose.yml  # Will be created/updated
```

## Phase 2: Gemini-Server Modifications

### Step 2.1: Create Go Backend Integration Module
Create a new file: `gemini-server/src/integrations/go-backend.ts`

```typescript
import { EventEmitter } from 'events';

export interface ActivityEvent {
  type: string;
  userId?: string;
  sessionId?: string;
  data?: any;
  timestamp?: string;
  metadata?: Record<string, any>;
}

export class GoBackendIntegration extends EventEmitter {
  private backendUrl: string;
  private apiKey: string;
  
  constructor() {
    super();
    this.backendUrl = process.env.GO_BACKEND_URL || 'http://localhost:8080';
    this.apiKey = process.env.GO_BACKEND_API_KEY || '';
  }
  
  async logActivity(event: ActivityEvent): Promise<void> {
    try {
      const response = await fetch(`${this.backendUrl}/api/gemini/activity`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({
          ...event,
          timestamp: event.timestamp || new Date().toISOString(),
          serviceId: 'gemini-server',
          containerId: process.env.HOSTNAME
        })
      });
      
      if (!response.ok) {
        console.error(`Failed to log activity: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to log to Go backend:', error);
      // Don't throw - logging failures shouldn't break the service
    }
  }
  
  async verifyToken(token: string): Promise<{ valid: boolean; userId?: string }> {
    try {
      const response = await fetch(`${this.backendUrl}/api/auth/verify`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({ token })
      });
      
      if (response.ok) {
        const data = await response.json();
        return { valid: true, userId: data.userId };
      }
      
      return { valid: false };
    } catch (error) {
      console.error('Token verification failed:', error);
      return { valid: false };
    }
  }
}

export const goBackend = new GoBackendIntegration();
```

### Step 2.2: Update Authentication Middleware
Modify `gemini-server/src/middleware/auth.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';
import { goBackend } from '../integrations/go-backend.js';

// Add this interface at the top
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
      };
    }
  }
}

export const authenticateToken = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  // Skip auth for health check
  if (req.path === '/health') {
    return next();
  }
  
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }
  
  // Single user mode - simple token check
  if (process.env.SINGLE_USER_MODE === 'true' && token === process.env.API_TOKEN) {
    req.user = { 
      id: 'single-user', 
      email: process.env.DEFAULT_USER_EMAIL 
    };
    return next();
  }
  
  // Verify with Go backend
  const verification = await goBackend.verifyToken(token);
  
  if (verification.valid) {
    req.user = { id: verification.userId || 'unknown' };
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Step 2.3: Add Activity Logging to Key Handlers
Update `gemini-server/src/api/chat/index.ts` to add logging:

```typescript
// Add import at the top
import { goBackend } from '../../integrations/go-backend.js';

// In the POST /message endpoint, after receiving the message:
router.post('/message', authenticateToken, async (req, res) => {
  const { sessionId, message } = req.body;
  const userId = req.user?.id;
  
  // Log the incoming message
  await goBackend.logActivity({
    type: 'chat_message_received',
    userId,
    sessionId,
    data: { message }
  });
  
  // ... rest of the handler code ...
  
  // When sending response chunks, log them:
  for await (const chunk of responseStream) {
    if (chunk.text) {
      await goBackend.logActivity({
        type: 'chat_response_chunk',
        userId,
        sessionId,
        data: { text: chunk.text }
      });
    }
    // ... send to client ...
  }
});
```

Update `gemini-server/src/websocket/handlers/chatHandlers.ts`:

```typescript
// Add import
import { goBackend } from '../../integrations/go-backend.js';

// In the chat:message handler:
socket.on('chat:message', async (data) => {
  const { content } = data;
  const userId = socket.data.userId;
  const sessionId = socket.data.sessionId;
  
  // Log activity
  await goBackend.logActivity({
    type: 'websocket_chat_message',
    userId,
    sessionId,
    data: { content }
  });
  
  // ... rest of handler ...
});
```

### Step 2.4: Update Server Startup
Modify `gemini-server/src/server.ts` to add startup logging:

```typescript
// Add import
import { goBackend } from './integrations/go-backend.js';

// After server starts successfully:
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Notify Go backend that service is up
  goBackend.logActivity({
    type: 'service_started',
    data: {
      port: PORT,
      environment: process.env.NODE_ENV,
      singleUserMode: process.env.SINGLE_USER_MODE === 'true'
    }
  });
});
```

## Phase 3: Docker Configuration

### Step 3.1: Create Production Dockerfile
Create `gemini-server/Dockerfile.production`:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

# Install dumb-init for signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Create necessary directories
RUN mkdir -p workspaces logs && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); });"

# Use dumb-init to handle signals
ENTRYPOINT ["dumb-init", "--"]

# Start the server
CMD ["node", "dist/server.js"]
```

### Step 3.2: Create Docker Compose Configuration
Create/update `docker-compose.yml` in your main app root:

```yaml
version: '3.8'

services:
  # Your Go Backend
  go-backend:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - GEMINI_SERVER_URL=http://gemini-server:3000
      - GEMINI_SERVER_INTERNAL_API_KEY=${GEMINI_SERVER_INTERNAL_API_KEY}
    volumes:
      - ./backend/logs:/app/logs
    networks:
      - app-network
    restart: unless-stopped

  # Gemini Server
  gemini-server:
    build:
      context: ./gemini-server
      dockerfile: Dockerfile.production
    ports:
      - "3000:3000"
    environment:
      # Core settings
      - NODE_ENV=production
      - PORT=3000
      
      # Gemini API
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      
      # Go Backend Integration
      - GO_BACKEND_URL=http://go-backend:8080
      - GO_BACKEND_API_KEY=${GEMINI_SERVER_INTERNAL_API_KEY}
      
      # Authentication
      - SINGLE_USER_MODE=true
      - API_TOKEN=${GEMINI_API_TOKEN}
      - DEFAULT_USER_EMAIL=${DEFAULT_USER_EMAIL}
      
      # Security
      - CORS_ORIGIN=${FRONTEND_URL:-http://localhost:3001}
      
    volumes:
      - gemini-workspaces:/app/workspaces
      - gemini-logs:/app/logs
    depends_on:
      - go-backend
    networks:
      - app-network
    restart: unless-stopped

  # Your Frontend (if applicable)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - REACT_APP_API_URL=http://localhost:8080
      - REACT_APP_GEMINI_URL=http://localhost:3000
      - REACT_APP_GEMINI_TOKEN=${GEMINI_API_TOKEN}
    depends_on:
      - go-backend
      - gemini-server
    networks:
      - app-network
    restart: unless-stopped

volumes:
  gemini-workspaces:
    driver: local
  gemini-logs:
    driver: local

networks:
  app-network:
    driver: bridge
```

### Step 3.3: Create Environment Configuration
Create `.env.example` in your main app root:

```bash
# Gemini Configuration
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_API_TOKEN=your-secure-token-for-single-user

# Go Backend Configuration
DATABASE_URL=postgresql://user:pass@localhost/dbname
GEMINI_SERVER_INTERNAL_API_KEY=internal-api-key-for-service-communication

# User Configuration
DEFAULT_USER_EMAIL=user@example.com

# Frontend Configuration
FRONTEND_URL=http://localhost:3001
```

## Phase 4: Go Backend Integration Endpoints

### Step 4.1: Required Go Backend Endpoints
Your Go backend needs to implement these endpoints:

```go
// 1. Activity Logging Endpoint
POST /api/gemini/activity
Headers:
  - X-API-Key: {GEMINI_SERVER_INTERNAL_API_KEY}
Body:
{
  "type": "string",
  "userId": "string",
  "sessionId": "string",
  "data": {},
  "timestamp": "2024-01-01T00:00:00Z",
  "serviceId": "gemini-server",
  "containerId": "container-id"
}

// 2. Token Verification Endpoint
POST /api/auth/verify
Headers:
  - X-API-Key: {GEMINI_SERVER_INTERNAL_API_KEY}
Body:
{
  "token": "user-token"
}
Response:
{
  "userId": "user-123"
}
```

## Phase 5: Testing Plan

### Step 5.1: Build and Start Services
```bash
# Copy environment file
cp .env.example .env
# Edit .env with your actual values

# Build all services
docker-compose build

# Start services
docker-compose up -d

# Check logs
docker-compose logs -f gemini-server
```

### Step 5.2: Test Checklist
- [ ] Gemini-server starts without errors
- [ ] Health check passes: `curl http://localhost:3000/health`
- [ ] Authentication works with API token
- [ ] Can create a session via API
- [ ] WebSocket connection establishes
- [ ] Messages are processed and responses returned
- [ ] Activity logs appear in Go backend
- [ ] Errors are handled gracefully

### Step 5.3: Test Commands
```bash
# Test health endpoint
curl http://localhost:3000/health

# Test authentication and session creation
curl -X POST http://localhost:3000/api/v1/sessions \
  -H "Authorization: Bearer your-api-token" \
  -H "Content-Type: application/json" \
  -d '{"config": {"model": "gemini-2.0-flash-exp"}}'

# Test chat message (replace session-id)
curl -X POST http://localhost:3000/api/v1/chat/message \
  -H "Authorization: Bearer your-api-token" \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "session-id", "message": "Hello"}'
```

## Phase 6: Production Deployment

### Step 6.1: Security Checklist
- [ ] Generate strong API tokens
- [ ] Set secure CORS origins
- [ ] Enable HTTPS in production
- [ ] Review firewall rules
- [ ] Set up monitoring alerts

### Step 6.2: Monitoring Setup
- [ ] Configure log aggregation
- [ ] Set up health check monitoring
- [ ] Create dashboards for activity metrics
- [ ] Set up error alerts

## Troubleshooting Guide

### Common Issues and Solutions

1. **Gemini-server won't start**
   - Check logs: `docker-compose logs gemini-server`
   - Verify environment variables are set
   - Ensure port 3000 is not in use

2. **Authentication failures**
   - Verify API_TOKEN matches in requests
   - Check Go backend is running and accessible
   - Verify network connectivity between services

3. **No activity logs in Go backend**
   - Check GO_BACKEND_URL is correct
   - Verify API key is set and matches
   - Check Go backend logs for errors

4. **WebSocket connection fails**
   - Check CORS settings
   - Verify authentication token
   - Check browser console for errors

## Implementation Checklist for AI Agent

When implementing this plan:

1. [ ] Copy gemini-server directory to main app
2. [ ] Create go-backend.ts integration file
3. [ ] Update auth.ts middleware
4. [ ] Add logging to chat handlers
5. [ ] Add logging to websocket handlers
6. [ ] Create Dockerfile.production
7. [ ] Create/update docker-compose.yml
8. [ ] Create .env.example
9. [ ] Build and test the integration
10. [ ] Document any custom modifications

## Notes for Implementation

- Start with the simplest configuration and add features incrementally
- Test each integration point separately before testing the full system
- Keep the original gemini-server functionality intact where possible
- Document any deviations from this plan

This plan provides a complete roadmap for integrating gemini-server into your main application with full Go backend integration, activity logging, and authentication.