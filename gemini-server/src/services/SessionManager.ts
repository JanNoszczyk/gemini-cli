import path from 'path';
import fs from 'fs/promises';
import { GeminiSession } from '../types/index.js';

export class SessionManager {
  private sessions: Map<string, SessionData> = new Map();
  private workspacesRoot: string;

  constructor() {
    this.workspacesRoot = process.env.WORKSPACES_ROOT || path.join(process.cwd(), 'workspaces');
    this.ensureWorkspacesRoot();
  }

  private async ensureWorkspacesRoot() {
    try {
      await fs.mkdir(this.workspacesRoot, { recursive: true });
    } catch (error) {
      console.error('Failed to create workspaces root:', error);
    }
  }

  async createSession(userId: string, configOverrides?: any): Promise<string> {
    const sessionId = this.generateSessionId();
    const workspaceDir = path.join(this.workspacesRoot, userId, sessionId);
    
    // Create workspace directory
    await fs.mkdir(workspaceDir, { recursive: true });
    
    // Create session data
    const sessionData: SessionData = {
      id: sessionId,
      userId,
      workspaceDir,
      config: null,
      client: null,
      chat: null,
      createdAt: new Date(),
      lastAccessedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    };
    
    try {
      // Initialize Gemini config and client
      const config = await this.createGeminiConfig(workspaceDir, sessionId, configOverrides);
      const client = config.getGeminiClient();
      const chat = await client.getChat();
      
      sessionData.config = config;
      sessionData.client = client;
      sessionData.chat = chat;
      
      this.sessions.set(sessionId, sessionData);
      
      // Schedule cleanup
      this.scheduleSessionCleanup(sessionId);
      
      return sessionId;
    } catch (error) {
      // Clean up on failure
      await this.cleanupWorkspace(workspaceDir);
      throw error;
    }
  }

  async getSession(sessionId: string): Promise<SessionData | null> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return null;
    }
    
    // Update last accessed time
    session.lastAccessedAt = new Date();
    
    // Check if session expired
    if (session.expiresAt < new Date()) {
      await this.destroySession(sessionId);
      return null;
    }
    
    return session;
  }

  async destroySession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return;
    }
    
    // Clean up workspace
    await this.cleanupWorkspace(session.workspaceDir);
    
    // Remove from map
    this.sessions.delete(sessionId);
  }

  async listUserSessions(userId: string): Promise<GeminiSession[]> {
    const userSessions: GeminiSession[] = [];
    
    for (const [sessionId, session] of this.sessions) {
      if (session.userId === userId) {
        userSessions.push({
          id: session.id,
          userId: session.userId,
          config: this.getPublicConfig(session.config),
          workspaceDir: session.workspaceDir,
          createdAt: session.createdAt,
          lastAccessedAt: session.lastAccessedAt,
          expiresAt: session.expiresAt
        });
      }
    }
    
    return userSessions;
  }

  async extendSession(sessionId: string, hours: number = 24): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }
    
    session.expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000);
  }

  private async createGeminiConfig(
    workspaceDir: string,
    sessionId: string,
    overrides?: any
  ): Promise<any> {
    // Dynamic import of ES module
    const { Config, AuthType } = await import('@google/gemini-cli-core');
    
    // Create Config instance directly with required parameters
    const config = new Config({
      sessionId,
      targetDir: workspaceDir,
      cwd: workspaceDir,
      debugMode: overrides?.debugMode || false,
      model: overrides?.model || 'gemini-2.0-flash-exp',
      ...overrides
    });
    
    // Initialize authentication - this is crucial for client creation
    await config.refreshAuth(AuthType.USE_GEMINI);
    
    return config;
  }

  private async cleanupWorkspace(workspaceDir: string): Promise<void> {
    try {
      await fs.rm(workspaceDir, { recursive: true, force: true });
    } catch (error) {
      console.error('Failed to cleanup workspace:', error);
    }
  }

  private scheduleSessionCleanup(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;
    
    const timeUntilExpiry = session.expiresAt.getTime() - Date.now();
    
    setTimeout(async () => {
      const currentSession = this.sessions.get(sessionId);
      if (currentSession && currentSession.expiresAt < new Date()) {
        await this.destroySession(sessionId);
      }
    }, timeUntilExpiry);
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getPublicConfig(config: any | null): any {
    if (!config) return null;
    
    // Return only safe config values
    return {
      model: config.getModel(),
      debugMode: config.getDebugMode(),
      // Add other safe config values as needed
    };
  }

  // Cleanup method for server shutdown
  async cleanup(): Promise<void> {
    const sessionIds = Array.from(this.sessions.keys());
    
    for (const sessionId of sessionIds) {
      await this.destroySession(sessionId);
    }
  }
}

interface SessionData extends GeminiSession {
  config: any | null;
  client: any | null;
  chat: any | null; // Chat type from Gemini
}

// Export singleton instance
export const sessionManager = new SessionManager();