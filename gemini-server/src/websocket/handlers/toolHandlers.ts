import { Server } from 'socket.io';
import { sessionManager } from '../../services/SessionManager';
import { monitoringService } from '../../services/MonitoringService';
// Dynamic import for executeToolCall will be used inline

interface ToolSocket {
  userId?: string;
  sessionId?: string;
  emit: (event: string, data: any) => void;
  on: (event: string, handler: (...args: any[]) => void) => void;
}

export function setupToolHandlers(socket: ToolSocket, io: Server): void {
  // Handle tool execution
  socket.on('tool:execute', async (data: { 
    name: string; 
    args: Record<string, any>;
    callId?: string;
  }) => {
    if (!socket.sessionId) {
      socket.emit('error', { message: 'No session joined' });
      return;
    }
    
    try {
      const session = await sessionManager.getSession(socket.sessionId);
      
      if (!session || !session.config) {
        socket.emit('error', { message: 'Session not ready' });
        return;
      }
      
      const toolRegistry = await session.config.getToolRegistry();
      const callId = data.callId || `${data.name}-${Date.now()}`;
      
      // Emit tool execution start
      socket.emit('tool:execution-start', {
        callId,
        name: data.name,
        args: data.args
      });
      
      const startTime = Date.now();
      
      try {
        // Execute tool with dynamic import
        const { executeToolCall } = await import('@google/gemini-cli-core');
        const result = await executeToolCall(
          session.config,
          {
            callId,
            name: data.name,
            args: data.args,
            isClientInitiated: true
          },
          toolRegistry,
          new AbortController().signal
        );
        
        const executionTime = Date.now() - startTime;
        
        // Emit result
        socket.emit('tool:execution-complete', {
          callId,
          name: data.name,
          result: result.responseParts,
          resultDisplay: result.resultDisplay,
          executionTime
        });
        
        // Log tool execution
        await monitoringService.logToolExecution(
          socket.sessionId,
          socket.userId!,
          data.name,
          data.args,
          result.responseParts
        );
        
      } catch (toolError: any) {
        const executionTime = Date.now() - startTime;
        
        socket.emit('tool:execution-error', {
          callId,
          name: data.name,
          error: toolError.message,
          executionTime
        });
        
        // Log tool error
        await monitoringService.logToolExecution(
          socket.sessionId,
          socket.userId!,
          data.name,
          data.args,
          null,
          toolError
        );
      }
      
    } catch (error: any) {
      console.error('Tool execution error:', error);
      socket.emit('error', { 
        message: error.message || 'Failed to execute tool' 
      });
    }
  });
  
  // Handle tool approval (for tools requiring approval)
  socket.on('tool:approve', async (data: { callId: string }) => {
    if (!socket.sessionId) {
      socket.emit('error', { message: 'No session joined' });
      return;
    }
    
    // Broadcast approval to session
    io.to(`session:${socket.sessionId}`).emit('tool:approved', {
      callId: data.callId,
      approvedBy: socket.userId,
      timestamp: new Date().toISOString()
    });
  });
  
  // Handle tool rejection
  socket.on('tool:reject', async (data: { callId: string; reason?: string }) => {
    if (!socket.sessionId) {
      socket.emit('error', { message: 'No session joined' });
      return;
    }
    
    // Broadcast rejection to session
    io.to(`session:${socket.sessionId}`).emit('tool:rejected', {
      callId: data.callId,
      rejectedBy: socket.userId,
      reason: data.reason,
      timestamp: new Date().toISOString()
    });
  });
  
  // Get available tools
  socket.on('tool:list', async () => {
    if (!socket.sessionId) {
      socket.emit('error', { message: 'No session joined' });
      return;
    }
    
    try {
      const session = await sessionManager.getSession(socket.sessionId);
      
      if (!session || !session.config) {
        socket.emit('error', { message: 'Session not ready' });
        return;
      }
      
      const toolRegistry = await session.config.getToolRegistry();
      const tools = toolRegistry.getFunctionDeclarations();
      
      socket.emit('tool:list-response', {
        tools: tools.map((tool: any) => ({
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters
        }))
      });
      
    } catch (error: any) {
      console.error('List tools error:', error);
      socket.emit('error', { 
        message: error.message || 'Failed to list tools' 
      });
    }
  });
}