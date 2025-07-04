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
const auth_1 = __importDefault(require("../../src/api/auth"));
const sessions_1 = __importDefault(require("../../src/api/sessions"));
const chat_1 = __importDefault(require("../../src/api/chat"));
const settings_1 = __importDefault(require("../../src/api/settings"));
const checkpoints_1 = __importDefault(require("../../src/api/checkpoints"));
const tools_1 = __importDefault(require("../../src/api/tools"));
const monitoring_1 = __importDefault(require("../../src/api/monitoring"));
const handlers_1 = require("../../src/websocket/handlers");
const errorHandler_1 = require("../../src/middleware/errorHandler");
describe('Simple End-to-End Integration Test', () => {
    let app;
    let server;
    let io;
    let clientSocket;
    let authToken;
    let sessionId;
    let serverPort;
    beforeAll(async () => {
        // Create Express app
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
            console.log('User registered and token obtained');
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
                        expect(responseData).toContain('Hello from mocked Gemini!');
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
    describe('Health and Error Handling', () => {
        it('should respond to health check', async () => {
            const response = await (0, supertest_1.default)(app)
                .get('/health');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('status', 'ok');
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
});
//# sourceMappingURL=simple-e2e.test.js.map