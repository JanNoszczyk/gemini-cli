import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'engineer' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
  session?: GeminiSession;
}

export interface JwtTokenPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export interface GeminiSession {
  id: string;
  userId: string;
  config: any; // Will be properly typed with @google/gemini-cli-core Config
  workspaceDir: string;
  createdAt: Date;
  lastAccessedAt: Date;
  expiresAt: Date;
}

export interface MonitoringEvent {
  id: string;
  sessionId: string;
  userId: string;
  type: 'chat' | 'tool' | 'error' | 'session' | 'system';
  event: string;
  data: any;
  timestamp: Date;
}