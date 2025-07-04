import { Server } from 'socket.io';
import { monitoringService } from '../../services/MonitoringService';

interface MonitoringSocket {
  userId?: string;
  user?: { role: string };
  emit: (event: string, data: any) => void;
  on: (event: string, handler: (...args: any[]) => void) => void;
  join: (room: string) => void;
  leave: (room: string) => void;
}

export function setupMonitoringHandlers(socket: MonitoringSocket, io: Server): void {
  // Only admins can access monitoring features
  if (socket.user?.role !== 'admin') {
    return;
  }
  
  // Subscribe to monitoring events
  socket.on('monitoring:subscribe', async () => {
    socket.join('monitoring:live');
    
    // Send initial stats
    const stats = await monitoringService.getEventStats();
    socket.emit('monitoring:stats', stats);
    
    // Set up live event forwarding
    const eventHandler = (event: any) => {
      io.to('monitoring:live').emit('monitoring:event', event);
    };
    
    monitoringService.on('event', eventHandler);
    
    // Clean up on disconnect
    socket.on('disconnect', () => {
      monitoringService.off('event', eventHandler);
    });
  });
  
  // Unsubscribe from monitoring
  socket.on('monitoring:unsubscribe', () => {
    socket.leave('monitoring:live');
  });
  
  // Get historical events
  socket.on('monitoring:get-events', async (data: {
    userId?: string;
    sessionId?: string;
    limit?: number;
  }) => {
    try {
      let events;
      
      if (data.sessionId) {
        events = await monitoringService.getSessionEvents(data.sessionId);
      } else if (data.userId) {
        events = await monitoringService.getUserEvents(data.userId);
      } else {
        events = await monitoringService.getRecentEvents(data.limit || 100);
      }
      
      socket.emit('monitoring:events', { events });
      
    } catch (error: any) {
      console.error('Get monitoring events error:', error);
      socket.emit('error', { 
        message: error.message || 'Failed to get events' 
      });
    }
  });
  
  // Get statistics
  socket.on('monitoring:get-stats', async (data: { userId?: string }) => {
    try {
      const stats = await monitoringService.getEventStats(data.userId);
      socket.emit('monitoring:stats', stats);
      
    } catch (error: any) {
      console.error('Get monitoring stats error:', error);
      socket.emit('error', { 
        message: error.message || 'Failed to get stats' 
      });
    }
  });
  
  // Broadcast to all engineers (for announcements, etc.)
  socket.on('monitoring:broadcast', async (data: {
    message: string;
    type: 'info' | 'warning' | 'error';
  }) => {
    io.to('role:engineer').emit('system:broadcast', {
      message: data.message,
      type: data.type,
      timestamp: new Date().toISOString(),
      from: socket.userId
    });
    
    // Log the broadcast
    await monitoringService.logEvent({
      sessionId: 'system',
      userId: socket.userId!,
      type: 'system',
      event: 'broadcast',
      data: {
        message: data.message,
        type: data.type
      }
    });
  });
}