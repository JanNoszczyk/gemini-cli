import { EventEmitter } from 'events';
import { MonitoringEvent } from '../types/index.js';

export class MonitoringService extends EventEmitter {
  private events: MonitoringEvent[] = [];
  private maxEventsInMemory: number = 10000;

  constructor() {
    super();
    this.setMaxListeners(100); // Allow many listeners for monitoring
  }

  async logEvent(event: Omit<MonitoringEvent, 'id' | 'timestamp'>): Promise<void> {
    const monitoringEvent: MonitoringEvent = {
      ...event,
      id: this.generateEventId(),
      timestamp: new Date()
    };

    // Store in memory (in production, use a database)
    this.events.push(monitoringEvent);
    
    // Keep only recent events in memory
    if (this.events.length > this.maxEventsInMemory) {
      this.events = this.events.slice(-this.maxEventsInMemory);
    }

    // Emit for real-time monitoring
    this.emit('event', monitoringEvent);

    // Send to external monitoring endpoint if configured
    if (process.env.MONITORING_ENABLED === 'true' && process.env.MONITORING_ENDPOINT) {
      this.sendToExternalMonitoring(monitoringEvent);
    }
  }

  async logChatMessage(
    sessionId: string,
    userId: string,
    message: string,
    response?: string
  ): Promise<void> {
    await this.logEvent({
      sessionId,
      userId,
      type: 'chat',
      event: 'message',
      data: {
        userMessage: message,
        assistantResponse: response,
        messageLength: message.length,
        responseLength: response?.length || 0
      }
    });
  }

  async logToolExecution(
    sessionId: string,
    userId: string,
    toolName: string,
    args: any,
    result?: any,
    error?: any
  ): Promise<void> {
    await this.logEvent({
      sessionId,
      userId,
      type: 'tool',
      event: 'execution',
      data: {
        toolName,
        args,
        result: result ? 'success' : 'failure',
        error: error?.message,
        executionTime: Date.now()
      }
    });
  }

  async logSessionEvent(
    sessionId: string,
    userId: string,
    event: 'created' | 'destroyed' | 'extended',
    data?: any
  ): Promise<void> {
    await this.logEvent({
      sessionId,
      userId,
      type: 'session',
      event,
      data
    });
  }

  async logError(
    sessionId: string,
    userId: string,
    error: Error,
    context?: any
  ): Promise<void> {
    await this.logEvent({
      sessionId,
      userId,
      type: 'error',
      event: 'error',
      data: {
        message: error.message,
        stack: error.stack,
        context
      }
    });
  }

  async getSessionEvents(sessionId: string): Promise<MonitoringEvent[]> {
    return this.events.filter(event => event.sessionId === sessionId);
  }

  async getUserEvents(userId: string): Promise<MonitoringEvent[]> {
    return this.events.filter(event => event.userId === userId);
  }

  async getRecentEvents(limit: number = 100): Promise<MonitoringEvent[]> {
    return this.events.slice(-limit);
  }

  async getEventStats(userId?: string): Promise<any> {
    const relevantEvents = userId
      ? this.events.filter(e => e.userId === userId)
      : this.events;

    const stats = {
      totalEvents: relevantEvents.length,
      byType: {} as Record<string, number>,
      byUser: {} as Record<string, number>,
      recentErrors: [] as any[],
      toolUsage: {} as Record<string, number>
    };

    for (const event of relevantEvents) {
      // Count by type
      stats.byType[event.type] = (stats.byType[event.type] || 0) + 1;
      
      // Count by user
      stats.byUser[event.userId] = (stats.byUser[event.userId] || 0) + 1;
      
      // Track errors
      if (event.type === 'error' && stats.recentErrors.length < 10) {
        stats.recentErrors.push(event);
      }
      
      // Track tool usage
      if (event.type === 'tool' && event.data?.toolName) {
        stats.toolUsage[event.data.toolName] = 
          (stats.toolUsage[event.data.toolName] || 0) + 1;
      }
    }

    return stats;
  }

  private async sendToExternalMonitoring(event: MonitoringEvent): Promise<void> {
    try {
      const response = await fetch(process.env.MONITORING_ENDPOINT!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MONITORING_API_KEY}`
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        console.error('Failed to send monitoring event:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending monitoring event:', error);
    }
  }

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Create a stream for real-time monitoring
  createEventStream(): NodeJS.ReadableStream {
    const { Readable } = require('stream');
    const stream = new Readable({
      read() {}
    });

    const listener = (event: MonitoringEvent) => {
      stream.push(`data: ${JSON.stringify(event)}\n\n`);
    };

    this.on('event', listener);

    stream.on('close', () => {
      this.off('event', listener);
    });

    return stream;
  }
}

// Export singleton instance
export const monitoringService = new MonitoringService();