import { Router, Response, NextFunction } from 'express';
import { authenticate } from '../../middleware/auth';
import { sessionManager } from '../../services/SessionManager';
import { monitoringService } from '../../services/MonitoringService';
import { AuthenticatedRequest } from '../../types';

const router = Router();

// All chat routes require authentication
router.use(authenticate);

// Send message (streaming response)
router.post('/message', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { sessionId, message } = req.body;
    const userId = req.user!.id;
    
    if (!sessionId || !message) {
      return res.status(400).json({ error: 'Session ID and message required' });
    }
    
    const session = await sessionManager.getSession(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Verify session ownership
    if (session.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Set up SSE headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no' // Disable Nginx buffering
    });
    
    try {
      // Send message to Gemini
      const toolRegistry = session.config ? await session.config.getToolRegistry() : null;
      const stream = await session.chat.sendMessageStream({
        message: [{ text: message }],
        config: {
          tools: toolRegistry ? [{ 
            functionDeclarations: toolRegistry.getFunctionDeclarations() 
          }] : []
        }
      });
      
      let fullResponse = '';
      
      // Stream events to client
      for await (const event of stream) {
        // Send event to client
        res.write(`data: ${JSON.stringify({
          type: event.type,
          data: event
        })}\n\n`);
        
        // Collect response for logging
        if (event.type === 'content' && event.text) {
          fullResponse += event.text;
        }
      }
      
      // Log the complete interaction
      await monitoringService.logChatMessage(sessionId, userId, message, fullResponse);
      
      // Send completion event
      res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
      res.end();
      
    } catch (streamError) {
      console.error('Stream error:', streamError);
      
      // Log error
      await monitoringService.logError(sessionId, userId, streamError as Error, { message });
      
      res.write(`data: ${JSON.stringify({
        type: 'error',
        error: streamError instanceof Error ? streamError.message : 'Stream error'
      })}\n\n`);
      res.end();
    }
  } catch (error) {
    next(error);
  }
});

// Get conversation history
router.get('/history', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.query;
    const userId = req.user!.id;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }
    
    const session = await sessionManager.getSession(sessionId as string);
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Verify session ownership
    if (session.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Get conversation history from the chat instance
    const history = session.chat?.getHistory() || [];
    
    res.json({ history });
  } catch (error) {
    next(error);
  }
});

// Clear conversation
router.delete('/clear', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.body;
    const userId = req.user!.id;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }
    
    const session = await sessionManager.getSession(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Verify session ownership
    if (session.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Create new chat instance
    if (session.client) {
      session.chat = await session.client.getChat();
    }
    
    res.json({ message: 'Conversation cleared' });
  } catch (error) {
    next(error);
  }
});

// Save conversation checkpoint
router.post('/save', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { sessionId, tag, description } = req.body;
    const userId = req.user!.id;
    
    if (!sessionId || !tag) {
      return res.status(400).json({ error: 'Session ID and tag required' });
    }
    
    const session = await sessionManager.getSession(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Verify session ownership
    if (session.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Save checkpoint using the logger from config
    if (session.config) {
      const logger = session.config.getLogger();
      const conversation = session.chat?.getHistory() || [];
      await logger.saveCheckpoint(conversation, tag);
    }
    
    res.json({ message: 'Checkpoint saved', tag });
  } catch (error) {
    next(error);
  }
});

// Load conversation checkpoint
router.post('/load', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { sessionId, tag } = req.body;
    const userId = req.user!.id;
    
    if (!sessionId || !tag) {
      return res.status(400).json({ error: 'Session ID and tag required' });
    }
    
    const session = await sessionManager.getSession(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Verify session ownership
    if (session.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Load checkpoint
    if (session.config && session.client) {
      const logger = session.config.getLogger();
      const conversation = await logger.loadCheckpoint(tag);
      
      // Create new chat with loaded history
      session.chat = await session.client.getChat(conversation);
    }
    
    res.json({ message: 'Checkpoint loaded', tag });
  } catch (error) {
    next(error);
  }
});

export default router;