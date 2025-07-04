"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const socket_io_client_1 = require("socket.io-client");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
describe('End-to-End Integration Test', () => {
    let serverProcess;
    let clientSocket;
    let authToken;
    let sessionId;
    const serverPort = 3001; // Fixed port for testing
    beforeAll(async () => {
        // Start the server in a separate process
        const serverPath = path_1.default.join(__dirname, '../../src/server.ts');
        console.log('Starting server process...');
        serverProcess = (0, child_process_1.spawn)('npx', ['ts-node', serverPath], {
            env: {
                ...process.env,
                PORT: serverPort.toString(),
                NODE_ENV: 'test',
                JWT_SECRET: 'test-jwt-secret',
                CORS_ORIGIN: '*'
            },
            stdio: ['pipe', 'pipe', 'pipe']
        });
        // Wait for server to start
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Server failed to start within timeout'));
            }, 30000);
            serverProcess.stdout?.on('data', (data) => {
                const output = data.toString();
                console.log('Server output:', output);
                if (output.includes('running on port')) {
                    clearTimeout(timeout);
                    resolve();
                }
            });
            serverProcess.stderr?.on('data', (data) => {
                console.error('Server error:', data.toString());
            });
            serverProcess.on('error', (error) => {
                clearTimeout(timeout);
                reject(error);
            });
        });
        console.log('Server started successfully');
    }, 45000);
    afterAll(async () => {
        if (clientSocket && clientSocket.connected) {
            clientSocket.close();
        }
        if (serverProcess) {
            serverProcess.kill('SIGTERM');
            // Wait a bit for graceful shutdown
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    });
    describe('API Health Check', () => {
        it('should respond to health check', async () => {
            const response = await (0, supertest_1.default)(`http://localhost:${serverPort}`)
                .get('/health')
                .timeout(10000);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('status', 'ok');
            console.log('Health check passed');
        });
    });
    describe('Authentication', () => {
        it('should register a new user', async () => {
            const response = await (0, supertest_1.default)(`http://localhost:${serverPort}`)
                .post('/api/v1/auth/register')
                .send({
                email: 'test@example.com',
                password: 'testpassword123',
                name: 'Test User',
                role: 'engineer'
            })
                .timeout(10000);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('user');
            expect(response.body.user.email).toBe('test@example.com');
            authToken = response.body.token;
            console.log('User registered successfully');
        });
    });
    describe('Session Management', () => {
        it('should create a new session', async () => {
            const response = await (0, supertest_1.default)(`http://localhost:${serverPort}`)
                .post('/api/v1/sessions')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                config: {
                    model: 'gemini-2.0-flash-exp'
                }
            })
                .timeout(15000);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('sessionId');
            sessionId = response.body.sessionId;
            console.log(`Session created: ${sessionId}`);
        });
    });
    describe('WebSocket Integration', () => {
        it('should connect via WebSocket with authentication', (done) => {
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
        it('should join a session', (done) => {
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
        it('should send a chat message and receive response', (done) => {
            let responseReceived = false;
            let fullResponse = '';
            clientSocket.on('gemini:content', (data) => {
                console.log('Received content:', data.text);
                fullResponse += data.text || '';
                responseReceived = true;
            });
            clientSocket.on('gemini:done', () => {
                console.log('Chat response completed:', fullResponse);
                expect(responseReceived).toBe(true);
                expect(fullResponse.length).toBeGreaterThan(0);
                done();
            });
            clientSocket.on('gemini:error', (error) => {
                console.error('Gemini error:', error);
                done(new Error(error.error || 'Gemini error'));
            });
            // Send test message
            const testMessage = 'Hello! Please respond with just "Hello from Gemini!" and nothing else.';
            console.log(`Sending message: ${testMessage}`);
            clientSocket.emit('chat:message', {
                content: testMessage
            });
        }, 30000); // 30 second timeout for this test
    });
    describe('REST Chat Endpoint', () => {
        it('should send message via REST and receive SSE stream', (done) => {
            const testMessage = 'Hello via REST! Please respond briefly.';
            let responseData = '';
            const req = (0, supertest_1.default)(`http://localhost:${serverPort}`)
                .post('/api/v1/chat/message')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                sessionId,
                message: testMessage
            })
                .timeout(30000);
            req.on('response', (res) => {
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
            req.catch((error) => {
                done(error);
            });
        });
    });
    describe('Cleanup', () => {
        it('should destroy the session', async () => {
            const response = await (0, supertest_1.default)(`http://localhost:${serverPort}`)
                .delete(`/api/v1/sessions/${sessionId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .timeout(10000);
            expect(response.status).toBe(200);
            expect(response.body.message).toContain('destroyed successfully');
            console.log('Session destroyed successfully');
        });
    });
});
//# sourceMappingURL=e2e.test.js.map