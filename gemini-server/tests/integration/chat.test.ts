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
import dotenv from 'dotenv';

// Import our server components
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

describe('End-to-End Chat Integration Test', () => {
  let app: express.Application;
  let server: Server;
  let io: SocketIOServer;
  let clientSocket: Socket;
  let authToken: string;
  let sessionId: string;
  let serverPort: number;

  beforeAll(async () => {
    // Create Express app with same configuration as main server
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
    app.use(morgan('combined'));
    app.use(requestLogger);

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

    // Start server on random port
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

  beforeEach(() => {
    jest.setTimeout(30000); // 30 seconds for each test
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

    it('should send a chat message and receive Gemini response via WebSocket', (done) => {
      let responseReceived = false;
      let fullResponse = '';

      // Set up event listeners
      clientSocket.on('gemini:content', (data) => {
        console.log('Received content:', data.text);
        fullResponse += data.text || '';
        responseReceived = true;
      });

      clientSocket.on('gemini:done', (data) => {
        console.log('Response complete. Full response:', fullResponse);
        expect(responseReceived).toBe(true);
        expect(fullResponse.length).toBeGreaterThan(0);
        expect(typeof fullResponse).toBe('string');
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
      const testMessage = 'Hello! Please respond with just "Hello from Gemini!" and nothing else.';
      console.log(`Sending message: ${testMessage}`);
      
      clientSocket.emit('chat:message', { 
        content: testMessage 
      });
    });

    it('should handle multiple message exchanges', (done) => {
      let messageCount = 0;
      const expectedMessages = 2;
      let responses: string[] = [];

      const sendMessage = (message: string, messageIndex: number) => {
        return new Promise<string>((resolve, reject) => {
          let fullResponse = '';

          const contentHandler = (data: any) => {
            fullResponse += data.text || '';
          };

          const doneHandler = () => {
            clientSocket.off('gemini:content', contentHandler);
            clientSocket.off('gemini:done', doneHandler);
            clientSocket.off('gemini:error', errorHandler);
            resolve(fullResponse);
          };

          const errorHandler = (error: any) => {
            clientSocket.off('gemini:content', contentHandler);
            clientSocket.off('gemini:done', doneHandler);
            clientSocket.off('gemini:error', errorHandler);
            reject(new Error(error.error || 'Gemini error'));
          };

          clientSocket.on('gemini:content', contentHandler);
          clientSocket.on('gemini:done', doneHandler);
          clientSocket.on('gemini:error', errorHandler);

          console.log(`Sending message ${messageIndex + 1}: ${message}`);
          clientSocket.emit('chat:message', { content: message });
        });
      };

      const runConversation = async () => {
        try {
          // First message
          const response1 = await sendMessage('What is 2+2?', 0);
          responses.push(response1);
          console.log(`Response 1: ${response1}`);

          // Second message
          const response2 = await sendMessage('What is 3+3?', 1);
          responses.push(response2);
          console.log(`Response 2: ${response2}`);

          // Verify responses
          expect(responses.length).toBe(expectedMessages);
          expect(responses[0].length).toBeGreaterThan(0);
          expect(responses[1].length).toBeGreaterThan(0);
          
          console.log('Multiple message exchange completed successfully');
          done();
        } catch (error) {
          done(error);
        }
      };

      runConversation();
    });
  });

  describe('REST Chat Endpoint', () => {
    it('should send message via REST endpoint and receive SSE stream', (done) => {
      const testMessage = 'Hello via REST! Please respond briefly.';
      let responseData = '';

      const response = request(app)
        .post('/api/v1/chat/message')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          sessionId,
          message: testMessage
        });

      response.on('response', (res) => {
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toContain('text/event-stream');

        res.on('data', (chunk) => {
          const data = chunk.toString();
          responseData += data;
          
          if (data.includes('"type":"done"')) {
            console.log('REST SSE response completed');
            expect(responseData.length).toBeGreaterThan(0);
            expect(responseData).toContain('data:');
            done();
          }
        });

        res.on('error', (error) => {
          done(error);
        });
      });

      response.catch((error) => {
        done(error);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid session ID gracefully', (done) => {
      const invalidSessionSocket = Client(`http://localhost:${serverPort}`, {
        auth: {
          token: authToken
        }
      });

      invalidSessionSocket.on('connect', () => {
        invalidSessionSocket.emit('join-session', { sessionId: 'invalid-session-id' });

        invalidSessionSocket.on('error', (error) => {
          expect(error).toHaveProperty('message');
          console.log('Correctly handled invalid session:', error.message);
          invalidSessionSocket.close();
          done();
        });
      });
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
});