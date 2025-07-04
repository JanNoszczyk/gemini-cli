import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { authService } from '../../services/AuthService';
import { sessionManager } from '../../services/SessionManager';
import { monitoringService } from '../../services/MonitoringService';
import { setupChatHandlers } from './chatHandlers';
import { setupToolHandlers } from './toolHandlers';
import { setupMonitoringHandlers } from './monitoringHandlers';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  user?: any;
  sessionId?: string;
}

export function setupWebSocketHandlers(io: Server): void {
  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('No token provided'));
      }
      
      const decoded = authService.verifyToken(token);
      const user = await authService.getUserById(decoded.userId);
      
      if (!user) {
        return next(new Error('User not found'));
      }
      
      socket.userId = user.id;
      socket.user = user;
      
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`User ${socket.userId} connected via WebSocket`);
    
    // Join user-specific room
    socket.join(`user:${socket.userId}`);
    
    // Join role-specific room
    if (socket.user?.role) {
      socket.join(`role:${socket.user.role}`);
    }
    
    // Handle session joining
    socket.on('join-session', async (data: { sessionId: string }) => {
      try {
        const session = await sessionManager.getSession(data.sessionId);
        
        if (!session) {
          socket.emit('error', { message: 'Session not found' });
          return;
        }
        
        // Verify ownership
        if (session.userId !== socket.userId && socket.user?.role !== 'admin') {
          socket.emit('error', { message: 'Access denied' });
          return;
        }
        
        // Leave previous session room if any
        if (socket.sessionId) {
          socket.leave(`session:${socket.sessionId}`);
        }
        
        // Join new session room
        socket.sessionId = data.sessionId;
        socket.join(`session:${data.sessionId}`);
        
        socket.emit('session-joined', { sessionId: data.sessionId });
        
        // Log monitoring event
        await monitoringService.logEvent({
          sessionId: data.sessionId,
          userId: socket.userId!,
          type: 'session',
          event: 'websocket-joined',
          data: { socketId: socket.id }
        });
        
      } catch (error) {
        console.error('Error joining session:', error);
        socket.emit('error', { message: 'Failed to join session' });
      }
    });
    
    // Set up specific handlers
    setupChatHandlers(socket, io);
    setupToolHandlers(socket, io);
    setupMonitoringHandlers(socket, io);
    
    // Handle disconnection
    socket.on('disconnect', async () => {
      console.log(`User ${socket.userId} disconnected`);
      
      if (socket.sessionId) {
        await monitoringService.logEvent({
          sessionId: socket.sessionId,
          userId: socket.userId!,
          type: 'session',
          event: 'websocket-disconnected',
          data: { socketId: socket.id }
        });
      }
    });
    
    // Handle errors
    socket.on('error', (error) => {
      console.error(`WebSocket error for user ${socket.userId}:`, error);
    });
  });
}