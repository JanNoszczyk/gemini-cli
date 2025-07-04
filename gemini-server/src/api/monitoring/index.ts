import { Router, Response, NextFunction } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import { monitoringService } from '../../services/MonitoringService';
import { AuthenticatedRequest } from '../../types';

const router = Router();

// All monitoring routes require authentication
router.use(authenticate);

// Get recent events (admin or own events for engineers)
router.get('/events', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { limit = 100, userId, sessionId } = req.query;
    const requestingUser = req.user!;
    
    let events;
    
    if (sessionId) {
      events = await monitoringService.getSessionEvents(sessionId as string);
    } else if (userId) {
      // Only admins can view other users' events
      if (userId !== requestingUser.id && requestingUser.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
      }
      events = await monitoringService.getUserEvents(userId as string);
    } else if (requestingUser.role === 'admin') {
      // Admins can see all events
      events = await monitoringService.getRecentEvents(Number(limit));
    } else {
      // Engineers can only see their own events
      events = await monitoringService.getUserEvents(requestingUser.id);
    }
    
    res.json({ events });
  } catch (error) {
    next(error);
  }
});

// Get event statistics
router.get('/stats', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;
    const requestingUser = req.user!;
    
    // Only admins can view other users' stats
    if (userId && userId !== requestingUser.id && requestingUser.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const stats = await monitoringService.getEventStats(
      userId as string || (requestingUser.role !== 'admin' ? requestingUser.id : undefined)
    );
    
    res.json({ stats });
  } catch (error) {
    next(error);
  }
});

// Real-time event stream (SSE)
router.get('/stream', authorize('admin'), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Set up SSE headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    });
    
    // Send initial connection event
    res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);
    
    // Create event listener
    const eventListener = (event: any) => {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    };
    
    // Subscribe to monitoring events
    monitoringService.on('event', eventListener);
    
    // Clean up on client disconnect
    req.on('close', () => {
      monitoringService.off('event', eventListener);
    });
    
    // Keep connection alive
    const keepAlive = setInterval(() => {
      res.write(': keepalive\n\n');
    }, 30000);
    
    req.on('close', () => {
      clearInterval(keepAlive);
    });
    
  } catch (error) {
    next(error);
  }
});

// Get all active sessions (admin only)
router.get('/sessions', authorize('admin'), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // This would need to be implemented in SessionManager
    res.json({ message: 'Active sessions endpoint - to be implemented' });
  } catch (error) {
    next(error);
  }
});

export default router;