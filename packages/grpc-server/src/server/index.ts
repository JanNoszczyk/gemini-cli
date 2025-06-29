/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { GrpcServiceImpl } from './GrpcServiceImpl';
import { AuthenticationManager } from '../services/AuthenticationManager';
import path from 'path';
import * as fs from 'fs';

// Logger
const logger = {
  info: (...args: any[]) =>
    console.log(`[INFO] ${new Date().toISOString()}`, ...args),
  error: (...args: any[]) =>
    console.error(`[ERROR] ${new Date().toISOString()}`, ...args),
};

const PROTO_PATH = path.join(__dirname, '../../gemini.proto');

function main() {
  // Load proto definition
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const proto = grpc.loadPackageDefinition(packageDefinition) as any;
  
  // Create authentication manager
  const authManager = new AuthenticationManager();
  authManager.startCleanup();

  // Create service implementation with authentication
  const serviceImpl = new GrpcServiceImpl(authManager);

  // Create server
  const server = new grpc.Server();

  // Log authentication status
  if (process.env.NODE_ENV !== 'development' || process.env.REQUIRE_AUTH === 'true') {
    logger.info('Authentication enabled');
  } else {
    logger.info('Authentication disabled (development mode)');
  }

  // Add service
  server.addService(proto.gemini.GeminiService.service, {
    Chat: serviceImpl.chat.bind(serviceImpl),
    GetSessionInfo: serviceImpl.getSessionInfo.bind(serviceImpl),
    GetSessionStats: serviceImpl.getSessionStats.bind(serviceImpl),
    UpdateConfig: serviceImpl.updateConfig.bind(serviceImpl),
    GetConfig: serviceImpl.getConfig.bind(serviceImpl),
    // File operation endpoints
    ReadFile: serviceImpl.readFile.bind(serviceImpl),
    WriteFile: serviceImpl.writeFile.bind(serviceImpl),
    EditFile: serviceImpl.editFile.bind(serviceImpl),
    DeleteFile: serviceImpl.deleteFile.bind(serviceImpl),
    MoveFile: serviceImpl.moveFile.bind(serviceImpl),
    ListDirectory: serviceImpl.listDirectory.bind(serviceImpl),
    GenerateDiff: serviceImpl.generateDiff.bind(serviceImpl),
  });

  // Create server credentials (TLS or insecure)
  let credentials: grpc.ServerCredentials;
  
  if (process.env.TLS_CERT_PATH && process.env.TLS_KEY_PATH) {
    try {
      const cert = fs.readFileSync(process.env.TLS_CERT_PATH);
      const key = fs.readFileSync(process.env.TLS_KEY_PATH);
      
      credentials = grpc.ServerCredentials.createSsl(null, [{
        cert_chain: cert,
        private_key: key
      }]);
      
      logger.info('TLS enabled with provided certificates');
    } catch (error) {
      logger.error('Failed to load TLS certificates, falling back to insecure:', error);
      credentials = grpc.ServerCredentials.createInsecure();
    }
  } else {
    credentials = grpc.ServerCredentials.createInsecure();
    if (process.env.NODE_ENV === 'production') {
      logger.info('⚠️  Running in production without TLS! Set TLS_CERT_PATH and TLS_KEY_PATH environment variables');
    }
  }

  // Bind and start server
  const port = process.env.PORT || '50052'; // Different port from v1
  server.bindAsync(
    `0.0.0.0:${port}`,
    credentials,
    (err, boundPort) => {
      if (err) {
        logger.error('Server bind failed:', err);
        process.exit(1);
      }
      logger.info(`Gemini gRPC server running on port ${boundPort}`);
      logger.info('Available services:');
      logger.info('  - Chat (bidirectional streaming)');
      logger.info('  - GetSessionInfo');
      logger.info('  - GetSessionStats');
      logger.info('  - UpdateConfig');
      logger.info('  - GetConfig');
      logger.info('  - ReadFile');
      logger.info('  - WriteFile');
      logger.info('  - EditFile');
      logger.info('  - DeleteFile');
      logger.info('  - MoveFile');
      logger.info('  - ListDirectory');
      logger.info('  - GenerateDiff');
    }
  );
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  logger.info('Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Shutting down server...');
  process.exit(0);
});

// Start server if run directly
if (require.main === module) {
  main();
}

export { main };