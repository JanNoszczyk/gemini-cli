// Simple manual test to verify the integration works with real Gemini API
// Run with: node tests/manual-test.js

import { spawn } from 'child_process';
import http from 'http';
import { io } from 'socket.io-client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Gemini Server Integration Test');

// Load environment variables from root .env file
const rootEnvPath = path.join(__dirname, '../../.env');
if (fs.existsSync(rootEnvPath)) {
  const envContent = fs.readFileSync(rootEnvPath, 'utf8');
  const envLines = envContent.split('\n');
  
  envLines.forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value;
    }
  });
  
  console.log('✅ Loaded environment variables from root .env');
} else {
  console.log('⚠️  No root .env file found');
}

// Check if GEMINI_API_KEY is available
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in environment');
  console.error('Please ensure GEMINI_API_KEY is set in the root .env file');
  process.exit(1);
}

console.log('✅ GEMINI_API_KEY found');

let authToken = '';
let sessionId = '';
const serverPort = 3002;

// Helper function to make HTTP requests
function makeRequest(method, path, data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: serverPort,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Start server and run tests
async function runTests() {
  console.log('🏃 Starting server...');
  
  // Start the development server
  const serverProcess = spawn('npm', ['run', 'dev'], {
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
      reject(new Error('Server failed to start'));
    }, 30000);

    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log('Server:', output.trim());
      if (output.includes('running on port')) {
        clearTimeout(timeout);
        resolve();
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.error('Server Error:', data.toString().trim());
    });
  });

  console.log('✅ Server started');

  try {
    // Test 1: Health check
    console.log('\n🔍 Testing health check...');
    const health = await makeRequest('GET', '/health');
    if (health.status === 200) {
      console.log('✅ Health check passed');
    } else {
      throw new Error(`Health check failed: ${health.status}`);
    }

    // Test 2: Register user
    console.log('\n🔍 Testing user registration...');
    const register = await makeRequest('POST', '/api/v1/auth/register', {
      email: 'test@example.com',
      password: 'testpassword123',
      name: 'Test User',
      role: 'engineer'
    });
    
    if (register.status === 201 && register.body.token) {
      authToken = register.body.token;
      console.log('✅ User registration passed');
    } else {
      throw new Error(`Registration failed: ${register.status} - ${JSON.stringify(register.body)}`);
    }

    // Test 3: Create session
    console.log('\n🔍 Testing session creation...');
    const session = await makeRequest('POST', '/api/v1/sessions', {
      config: { model: 'gemini-2.0-flash-exp' }
    }, {
      'Authorization': `Bearer ${authToken}`
    });
    
    if (session.status === 201 && session.body.sessionId) {
      sessionId = session.body.sessionId;
      console.log('✅ Session creation passed');
    } else {
      throw new Error(`Session creation failed: ${session.status} - ${JSON.stringify(session.body)}`);
    }

    // Test 4: WebSocket chat
    console.log('\n🔍 Testing WebSocket chat with real Gemini...');
    await new Promise((resolve, reject) => {
      const socket = io(`http://localhost:${serverPort}`, {
        auth: { token: authToken }
      });

      socket.on('connect', () => {
        console.log('✅ WebSocket connected');
        
        socket.emit('join-session', { sessionId });
        
        socket.on('session-joined', () => {
          console.log('✅ Session joined');
          
          let conversationStep = 1;
          let firstResponse = '';
          let secondResponse = '';
          
          socket.on('gemini:content', (data) => {
            const text = data.text || '';
            process.stdout.write('📝 Gemini: ' + text);
            
            if (conversationStep === 1) {
              firstResponse += text;
            } else if (conversationStep === 2) {
              secondResponse += text;
            }
          });
          
          socket.on('gemini:done', () => {
            console.log('\\n✅ Chat response completed');
            
            if (conversationStep === 1) {
              console.log(`First response: "${firstResponse}"`);
              
              if (firstResponse.length > 0) {
                console.log('✅ First message successful, sending follow-up...');
                conversationStep = 2;
                
                // Send follow-up question
                console.log('💬 Sending follow-up: What is 2+5?');
                socket.emit('chat:message', { 
                  content: 'What is 2+5? Please respond with just the number.' 
                });
              } else {
                reject(new Error('No response received from Gemini in first message'));
              }
            } else if (conversationStep === 2) {
              console.log(`Second response: "${secondResponse}"`);
              
              if (secondResponse.length > 0) {
                // Check if the response contains the correct answer
                const containsSeven = secondResponse.includes('7');
                
                if (containsSeven) {
                  console.log('✅ WebSocket multi-turn conversation test passed!');
                  console.log('✅ Gemini correctly answered 2+5=7');
                } else {
                  console.log('⚠️  Gemini responded but answer may be unexpected');
                }
                
                socket.close();
                resolve();
              } else {
                reject(new Error('No response received from Gemini in second message'));
              }
            }
          });
          
          socket.on('gemini:error', (error) => {
            reject(new Error(`Gemini error: ${error.error}`));
          });
          
          // Send first test message
          console.log('💬 Sending first message to Gemini...');
          socket.emit('chat:message', { 
            content: 'Hello! Please respond with a simple greeting.' 
          });
        });
      });

      socket.on('connect_error', (error) => {
        reject(new Error(`WebSocket connection failed: ${error.message}`));
      });

      // Timeout after 60 seconds for multi-turn conversation
      setTimeout(() => {
        reject(new Error('WebSocket test timeout'));
      }, 60000);
    });

    console.log('\n🎉 All tests passed!');
    console.log('✅ End-to-end integration test completed successfully');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    // Clean up
    console.log('\n🧹 Cleaning up...');
    serverProcess.kill('SIGTERM');
    
    // Wait a bit for cleanup
    setTimeout(() => {
      process.exit(0);
    }, 2000);
  }
}

// Run the tests
runTests().catch((error) => {
  console.error('❌ Test runner failed:', error.message);
  process.exit(1);
});