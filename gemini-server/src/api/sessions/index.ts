import { Router, Response, NextFunction } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import { sessionManager } from '../../services/SessionManager';
import { monitoringService } from '../../services/MonitoringService';
import { AuthenticatedRequest } from '../../types';

const router = Router();

// All session routes require authentication
router.use(authenticate);

// Create new session
router.post('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { config } = req.body;
    const userId = req.user!.id;
    
    const sessionId = await sessionManager.createSession(userId, config);
    
    // Log session creation
    await monitoringService.logSessionEvent(sessionId, userId, 'created', { config });
    
    const session = await sessionManager.getSession(sessionId);
    
    // Return safe session data without circular references
    const safeSession = {
      id: session?.id,
      userId: session?.userId,
      config: sessionManager.getPublicConfig(session?.config),
      workspaceDir: session?.workspaceDir,
      createdAt: session?.createdAt,
      lastAccessedAt: session?.lastAccessedAt,
      expiresAt: session?.expiresAt
    };
    
    res.status(201).json({
      sessionId,
      session: safeSession
    });
  } catch (error) {
    next(error);
  }
});

// List user sessions
router.get('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const sessions = await sessionManager.listUserSessions(userId);
    
    res.json({ sessions });
  } catch (error) {
    next(error);
  }
});

// Get session details
router.get('/:sessionId', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user!.id;
    
    const session = await sessionManager.getSession(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Verify session ownership
    if (session.userId !== userId && req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json({ session });
  } catch (error) {
    next(error);
  }
});

// Extend session
router.put('/:sessionId/extend', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params;
    const { hours = 24 } = req.body;
    const userId = req.user!.id;
    
    const session = await sessionManager.getSession(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Verify session ownership
    if (session.userId !== userId && req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await sessionManager.extendSession(sessionId, hours);
    
    // Log session extension
    await monitoringService.logSessionEvent(sessionId, userId, 'extended', { hours });
    
    res.json({ message: 'Session extended successfully' });
  } catch (error) {
    next(error);
  }
});

// Destroy session
router.delete('/:sessionId', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user!.id;
    
    const session = await sessionManager.getSession(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Verify session ownership
    if (session.userId !== userId && req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await sessionManager.destroySession(sessionId);
    
    // Log session destruction
    await monitoringService.logSessionEvent(sessionId, userId, 'destroyed');
    
    res.json({ message: 'Session destroyed successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;