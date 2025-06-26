import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { gemini } from './proto/gemini.v1';
import { SessionManager } from './SessionManager';

// Basic logger for demonstration. In a production environment, consider a dedicated logging library.
const logger = {
  info: (...args: any[]) => console.log(`[INFO] ${new Date().toISOString()}`, ...args),
  error: (...args: any[]) => console.error(`[ERROR] ${new Date().toISOString()}`, ...args),
};

const PROTO_PATH = __dirname + '/../gemini.v1.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const geminiProto = (grpc.loadPackageDefinition(packageDefinition) as unknown) as { gemini: { v1: typeof gemini.v1 } };

const sessionManager = new SessionManager();

function chat(call: grpc.ServerDuplexStream<gemini.v1.ClientRequest, gemini.v1.ServerResponse>) {
  let sessionId: string | undefined;
  let session: any;

  call.on('data', async (request) => {
    if (request.start_request) {
      const { sessionId: newSessionId, session: newSession } = sessionManager.createSession(request.start_request);
      sessionId = newSessionId;
      session = newSession;
      call.write(new gemini.v1.ServerResponse({ session_info: new gemini.v1.SessionInfo({ session_id: sessionId }) }));
    } else if (request.prompt) {
      if (!session) {
        call.write(new gemini.v1.ServerResponse({ error: new gemini.v1.ErrorResponse({ message: 'No active session. Please send a StartRequest first.' }) }));
        return;
      }
      await session.handlePrompt(request.prompt, call);
    }
  });

  call.on('end', () => {
    logger.info('Client disconnected');
  });

  call.on('error', (err) => {
    logger.error('Stream error:', err);
  });
}

function main() {
  const server = new grpc.Server();
  server.addService(geminiProto.gemini.v1.UnimplementedGeminiServiceService.definition, {
    Chat: chat,
  });

  // TODO: Implement authentication via gRPC interceptors.
  // Example: server.use(authInterceptor);

  // TODO: Implement TLS for secure communication.
  // Example: grpc.ServerCredentials.createSsl(private_key, certificate_chain);

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      logger.error('Server bind failed:', err);
      return;
    }
    logger.info(`Server running at http://0.0.0.0:${port}`);
    server.start();
  });
}

main();