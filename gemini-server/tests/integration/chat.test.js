"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const socket_io_client_1 = require("socket.io-client");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
// Import our server components
const auth_1 = __importDefault(require("../../src/api/auth"));
const sessions_1 = __importDefault(require("../../src/api/sessions"));
const chat_1 = __importDefault(require("../../src/api/chat"));
const settings_1 = __importDefault(require("../../src/api/settings"));
const checkpoints_1 = __importDefault(require("../../src/api/checkpoints"));
const tools_1 = __importDefault(require("../../src/api/tools"));
const monitoring_1 = __importDefault(require("../../src/api/monitoring"));
const handlers_1 = require("../../src/websocket/handlers");
const errorHandler_1 = require("../../src/middleware/errorHandler");
const requestLogger_1 = require("../../src/middleware/requestLogger");
describe('End-to-End Chat Integration Test', () => {
    let app;
    let server;
    let io;
    let clientSocket;
    let authToken;
    let sessionId;
    let serverPort;
    beforeAll(async () => {
        // Create Express app with same configuration as main server
        app = (0, express_1.default)();
        const httpServer = (0, http_1.createServer)(app);
        io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: '*',
                credentials: true
            }
        });
        // Apply middleware
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)({
            origin: '*',
            credentials: true
        }));
        app.use((0, compression_1.default)());
        app.use(express_1.default.json({ limit: '10mb' }));
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, morgan_1.default)('combined'));
        app.use(requestLogger_1.requestLogger);
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
        app.use('/api/v1/auth', auth_1.default);
        app.use('/api/v1/sessions', sessions_1.default);
        app.use('/api/v1/chat', chat_1.default);
        app.use('/api/v1/settings', settings_1.default);
        app.use('/api/v1/checkpoints', checkpoints_1.default);
        app.use('/api/v1/tools', tools_1.default);
        app.use('/api/v1/monitoring', monitoring_1.default);
        // WebSocket setup
        (0, handlers_1.setupWebSocketHandlers)(io);
        // Error handling
        app.use(errorHandler_1.errorHandler);
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
            const response = await (0, supertest_1.default)(app)
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
            const response = await (0, supertest_1.default)(app)
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
            const response = await (0, supertest_1.default)(app)
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
            const response = await (0, supertest_1.default)(app)
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
            clientSocket = (0, socket_io_client_1.io)(`http://localhost:${serverPort}`, {
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
            let responses = [];
            const sendMessage = (message, messageIndex) => {
                return new Promise((resolve, reject) => {
                    let fullResponse = '';
                    const contentHandler = (data) => {
                        fullResponse += data.text || '';
                    };
                    const doneHandler = () => {
                        clientSocket.off('gemini:content', contentHandler);
                        clientSocket.off('gemini:done', doneHandler);
                        clientSocket.off('gemini:error', errorHandler);
                        resolve(fullResponse);
                    };
                    const errorHandler = (error) => {
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
                }
                catch (error) {
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
            const response = (0, supertest_1.default)(app)
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
            const invalidSessionSocket = (0, socket_io_client_1.io)(`http://localhost:${serverPort}`, {
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
            const unauthenticatedSocket = (0, socket_io_client_1.io)(`http://localhost:${serverPort}`, {
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
            const response = await (0, supertest_1.default)(app)
                .get(`/api/v1/sessions/${sessionId}`)
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('session');
            expect(response.body.session.id).toBe(sessionId);
        });
        it('should destroy session', async () => {
            const response = await (0, supertest_1.default)(app)
                .delete(`/api/v1/sessions/${sessionId}`)
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toContain('destroyed successfully');
        });
    });
});
//# sourceMappingURL=chat.test.js.map