import request from 'supertest';
import { Server } from 'http';
import { io as Client, Socket } from 'socket.io-client';
import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

// Mock the gemini-cli-core imports to avoid ES module issues
jest.mock('@google/gemini-cli-core', () => ({
  sessionId: 'mock-session-id',
  Config: jest.fn().mockImplementation(() => ({
    getGeminiClient: jest.fn().mockReturnValue({
      getChat: jest.fn().mockResolvedValue({
        sendMessageStream: jest.fn().mockImplementation(async function* () {
          yield { type: 'content', text: 'Hello from mocked Gemini!' };
          yield { type: 'done' };
        }),
        getHistory: jest.fn().mockReturnValue([])
      })
    }),
    getLogger: jest.fn().mockReturnValue({
      saveCheckpoint: jest.fn(),
      loadCheckpoint: jest.fn().mockResolvedValue([])
    }),
    getToolRegistry: jest.fn().mockResolvedValue({
      getFunctionDeclarations: jest.fn().mockReturnValue([])
    })
  })),
  executeToolCall: jest.fn().mockResolvedValue({
    responseParts: 'Mock tool result',
    resultDisplay: 'Tool executed successfully'
  })
}));

// Import our server components after mocking
import authRouter from '../../src/api/auth';
import sessionsRouter from '../../src/api/sessions';
import chatRouter from '../../src/api/chat';
import settingsRouter from '../../src/api/settings';
import checkpointsRouter from '../../src/api/checkpoints';
import toolsRouter from '../../src/api/tools';
import monitoringRouter from '../../src/api/monitoring';
import { setupWebSocketHandlers } from '../../src/websocket/handlers';
import { errorHandler } from '../../src/middleware/errorHandler';
import { requestLogger } from '../../src/middleware/requestLogger';

describe('Simple End-to-End Integration Test', () => {
  let app: express.Application;
  let server: Server;
  let io: SocketIOServer;
  let clientSocket: Socket;
  let authToken: string;
  let sessionId: string;
  let serverPort: number;

  beforeAll(async () => {
    // Create Express app
    app = express();
    const httpServer = createServer(app);
    io = new SocketIOServer(httpServer, {
      cors: {
        origin: '*',
        credentials: true
      }
    });

    // Apply middleware
    app.use(helmet());
    app.use(cors({
      origin: '*',
      credentials: true
    }));
    app.use(compression());
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));

    // Simplified request logger for tests
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });

    // Health check
    app.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV
      });
    });

    // API routes
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/sessions', sessionsRouter);
    app.use('/api/v1/chat', chatRouter);
    app.use('/api/v1/settings', settingsRouter);
    app.use('/api/v1/checkpoints', checkpointsRouter);
    app.use('/api/v1/tools', toolsRouter);
    app.use('/api/v1/monitoring', monitoringRouter);

    // WebSocket setup
    setupWebSocketHandlers(io);

    // Error handling
    app.use(errorHandler);

    // Start server
    server = httpServer.listen(0);
    const address = server.address();
    serverPort = typeof address === 'object' && address ? address.port : 3000;

    console.log(`Test server started on port ${serverPort}`);
  });

  afterAll(async () => {
    if (clientSocket) {
      clientSocket.close();
    }
    if (server) {
      server.close();
    }
  });

  afterEach(() => {
    if (clientSocket && clientSocket.connected) {
      clientSocket.close();
    }
  });

  describe('Authentication Flow', () => {
    it('should register a new user and get auth token', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'testpassword123',
          name: 'Test User',
          role: 'engineer'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('test@example.com');
      expect(response.body.user.role).toBe('engineer');

      authToken = response.body.token;
      console.log('User registered and token obtained');
    });

    it('should login with existing user', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'testpassword123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
    });
  });

  describe('Session Management', () => {
    it('should create a new session', async () => {
      const response = await request(app)
        .post('/api/v1/sessions')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          config: {
            model: 'gemini-2.0-flash-exp'
          }
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('sessionId');
      expect(response.body).toHaveProperty('session');

      sessionId = response.body.sessionId;
      console.log(`Created session: ${sessionId}`);
    });

    it('should list user sessions', async () => {
      const response = await request(app)
        .get('/api/v1/sessions')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('sessions');
      expect(Array.isArray(response.body.sessions)).toBe(true);
      expect(response.body.sessions.length).toBeGreaterThan(0);
    });
  });

  describe('WebSocket Chat Integration', () => {
    it('should connect to WebSocket with authentication', (done) => {
      clientSocket = Client(`http://localhost:${serverPort}`, {
        auth: {
          token: authToken
        }
      });

      clientSocket.on('connect', () => {
        console.log('WebSocket connected successfully');
        expect(clientSocket.connected).toBe(true);
        done();
      });

      clientSocket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
        done(error);
      });
    });

    it('should join a session via WebSocket', (done) => {
      clientSocket.emit('join-session', { sessionId });

      clientSocket.on('session-joined', (data) => {
        expect(data.sessionId).toBe(sessionId);
        console.log(`Joined session: ${data.sessionId}`);
        done();
      });

      clientSocket.on('error', (error) => {
        console.error('Session join error:', error);
        done(new Error(error.message));
      });
    });

    it('should send a chat message and receive mocked response via WebSocket', (done) => {
      let responseReceived = false;
      let fullResponse = '';

      clientSocket.on('gemini:content', (data) => {
        console.log('Received content:', data.text);
        fullResponse += data.text || '';
        responseReceived = true;
      });

      clientSocket.on('gemini:done', () => {
        console.log('Response complete. Full response:', fullResponse);
        expect(responseReceived).toBe(true);
        expect(fullResponse).toBe('Hello from mocked Gemini!');
        done();
      });

      clientSocket.on('gemini:error', (error) => {
        console.error('Gemini error:', error);
        done(new Error(error.error || 'Gemini error'));
      });

      clientSocket.on('error', (error) => {
        console.error('Socket error:', error);
        done(new Error(error.message || 'Socket error'));
      });

      // Send test message
      const testMessage = 'Hello! This is a test message.';
      console.log(`Sending message: ${testMessage}`);
      
      clientSocket.emit('chat:message', { 
        content: testMessage 
      });
    });
  });

  describe('REST Chat Endpoint', () => {
    it('should send message via REST endpoint and receive SSE stream', (done) => {
      const testMessage = 'Hello via REST! This is a test.';
      let responseData = '';

      const response = request(app)
        .post('/api/v1/chat/message')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          sessionId,
          message: testMessage
        });

      response.on('response', (res: any) => {
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toContain('text/event-stream');

        res.on('data', (chunk: any) => {
          const data = chunk.toString();
          responseData += data;
          
          if (data.includes('"type":"done"')) {
            console.log('REST SSE response completed');
            expect(responseData.length).toBeGreaterThan(0);
            expect(responseData).toContain('data:');
            expect(responseData).toContain('Hello from mocked Gemini!');
            done();
          }
        });

        res.on('error', (error: any) => {
          done(error);
        });
      });

      response.catch((error: any) => {
        done(error);
      });
    });
  });

  describe('Session Cleanup', () => {
    it('should get session details', async () => {
      const response = await request(app)
        .get(`/api/v1/sessions/${sessionId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('session');
      expect(response.body.session.id).toBe(sessionId);
    });

    it('should destroy session', async () => {
      const response = await request(app)
        .delete(`/api/v1/sessions/${sessionId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('destroyed successfully');
    });
  });

  describe('Health and Error Handling', () => {
    it('should respond to health check', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
    });

    it('should handle authentication errors', (done) => {
      const unauthenticatedSocket = Client(`http://localhost:${serverPort}`, {
        auth: {
          token: 'invalid-token'
        }
      });

      unauthenticatedSocket.on('connect_error', (error) => {
        expect(error.message).toContain('Authentication failed');
        console.log('Correctly handled authentication error:', error.message);
        done();
      });
    });
  });
});