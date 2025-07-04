import { Server } from 'socket.io';
import { sessionManager } from '../../services/SessionManager';
import { monitoringService } from '../../services/MonitoringService';

interface ChatSocket {
  userId?: string;
  sessionId?: string;
  emit: (event: string, data: any) => void;
  on: (event: string, handler: (...args: any[]) => void) => void;
}

export function setupChatHandlers(socket: ChatSocket, io: Server): void {
  // Handle chat messages
  socket.on('chat:message', async (data: { content: string }) => {
    console.log(`📩 Chat message from ${socket.userId}: "${data.content}"`);
    
    if (!socket.sessionId) {
      socket.emit('error', { message: 'No session joined' });
      return;
    }
    
    try {
      const session = await sessionManager.getSession(socket.sessionId);
      
      if (!session || !session.chat) {
        socket.emit('error', { message: 'Session not ready' });
        return;
      }
      
      console.log(`🚀 Sending message to Gemini for session ${socket.sessionId}`);
      
      // Send typing indicator to other users in session
      io.to(`session:${socket.sessionId}`).emit('chat:typing', {
        userId: socket.userId,
        typing: true
      });
      
      // Create abort controller for cancellation
      const abortController = new AbortController();
      
      // Store abort controller for potential cancellation
      (socket as any).currentAbortController = abortController;
      
      try {
        // Get tool registry
        const toolRegistry = session.config ? await session.config.getToolRegistry() : null;
        
        // Send message to Gemini
        const stream = await session.chat.sendMessageStream({
          message: [{ text: data.content }],
          config: {
            abortSignal: abortController.signal,
            tools: toolRegistry ? [{ 
              functionDeclarations: toolRegistry.getFunctionDeclarations() 
            }] : []
          }
        });
        
        let fullResponse = '';
        let eventCount = 0;
        
        console.log(`🌊 Processing stream for "${data.content}"...`);
        
        // Stream events to client
        for await (const event of stream) {
          eventCount++;
          
          // Check if cancelled
          if (abortController.signal.aborted) {
            console.log('⏹️ Stream cancelled');
            break;
          }
          
          // Handle GenerateContentResponse objects
          if (event.candidates && event.candidates.length > 0) {
            const candidate = event.candidates[0];
            const content = candidate.content;
            
            if (content && content.parts) {
              for (const part of content.parts) {
                if (part.text) {
                  const text = part.text;
                  fullResponse += text;
                  
                  socket.emit('gemini:content', {
                    text: text,
                    accumulated: fullResponse
                  });
                }
              }
            }
            
            // Check if this is the final response
            if (candidate.finishReason) {
              console.log(`✅ Gemini completed response: "${fullResponse.trim()}" (${eventCount} events)`);
              
              socket.emit('gemini:done', {
                fullResponse: fullResponse,
                timestamp: new Date().toISOString()
              });
            }
            continue;
          }
          
          // Fallback to original switch for other event types
          switch (event.type) {
            case 'content':
              socket.emit('gemini:content', {
                text: event.text,
                accumulated: fullResponse + (event.text || '')
              });
              if (event.text) {
                fullResponse += event.text;
              }
              break;
              
            case 'thought':
              socket.emit('gemini:thought', {
                thought: event.thought,
                summary: event.summary
              });
              break;
              
            case 'tool_call_request':
              socket.emit('gemini:tool-request', {
                callId: event.callId,
                tool: event.name,
                args: event.args
              });
              break;
              
            case 'tool_call_response':
              socket.emit('gemini:tool-result', {
                callId: event.callId,
                result: event.result,
                error: event.error
              });
              break;
              
            case 'error':
              socket.emit('gemini:error', {
                error: event.error
              });
              break;
          }
        }
        
        // Stop typing indicator
        io.to(`session:${socket.sessionId}`).emit('chat:typing', {
          userId: socket.userId,
          typing: false
        });
        
        // Log the interaction
        await monitoringService.logChatMessage(
          socket.sessionId,
          socket.userId!,
          data.content,
          fullResponse
        );
        
      } catch (streamError: any) {
        console.error('❌ Stream error:', streamError);
        
        if (streamError.name === 'AbortError') {
          socket.emit('gemini:cancelled', {
            message: 'Request cancelled'
          });
        } else {
          socket.emit('gemini:error', {
            error: streamError.message || 'Stream error'
          });
          
          // Log error
          await monitoringService.logError(
            socket.sessionId,
            socket.userId!,
            streamError,
            { message: data.content }
          );
        }
      } finally {
        // Clean up abort controller
        delete (socket as any).currentAbortController;
        
        // Stop typing indicator
        io.to(`session:${socket.sessionId}`).emit('chat:typing', {
          userId: socket.userId,
          typing: false
        });
      }
      
    } catch (error: any) {
      console.error('❌ Chat error:', error);
      socket.emit('error', { 
        message: error.message || 'Failed to send message' 
      });
    }
  });
  
  // Handle chat cancellation
  socket.on('chat:cancel', async () => {
    const abortController = (socket as any).currentAbortController;
    if (abortController) {
      abortController.abort();
      socket.emit('gemini:cancelled', {
        message: 'Request cancelled by user'
      });
    }
  });
  
  // Handle clear conversation
  socket.on('chat:clear', async () => {
    if (!socket.sessionId) {
      socket.emit('error', { message: 'No session joined' });
      return;
    }
    
    try {
      const session = await sessionManager.getSession(socket.sessionId);
      
      if (!session) {
        socket.emit('error', { message: 'Session not found' });
        return;
      }
      
      // Create new chat instance to clear history
      if (session.client) {
        session.chat = await session.client.getChat();
      }
      
      socket.emit('chat:cleared', {
        timestamp: new Date().toISOString()
      });
      
      // Log clear event
      await monitoringService.logEvent({
        sessionId: socket.sessionId,
        userId: socket.userId!,
        type: 'chat',
        event: 'cleared',
        data: {}
      });
      
    } catch (error: any) {
      console.error('Error clearing chat:', error);
      socket.emit('error', { message: 'Failed to clear conversation' });
    }
  });
  
  // Handle get history
  socket.on('chat:get-history', async () => {
    if (!socket.sessionId) {
      socket.emit('error', { message: 'No session joined' });
      return;
    }
    
    try {
      const session = await sessionManager.getSession(socket.sessionId);
      
      if (!session) {
        socket.emit('error', { message: 'Session not found' });
        return;
      }
      
      // Get conversation history from the chat instance
      const history = session.chat?.getHistory() || [];
      
      socket.emit('chat:history', {
        history,
        timestamp: new Date().toISOString()
      });
      
    } catch (error: any) {
      console.error('Error getting chat history:', error);
      socket.emit('error', { message: 'Failed to get conversation history' });
    }
  });
}