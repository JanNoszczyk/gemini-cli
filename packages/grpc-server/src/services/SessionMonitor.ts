/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { gemini } from '../proto/generated/gemini';
import { EventEmitter } from 'events';

export interface PerformanceMetrics {
  totalRequests: number;
  averageResponseTime: number;
  totalResponseTime: number;
  requestsPerMinute: number;
  errorRate: number;
  successRate: number;
  concurrentSessions: number;
  peakConcurrentSessions: number;
}

export interface ToolUsageStats {
  toolName: string;
  executionCount: number;
  totalExecutionTime: number;
  averageExecutionTime: number;
  successRate: number;
  lastUsed: Date;
}

export interface ModelUsageStats {
  modelName: string;
  requestCount: number;
  totalTokens: {
    input: number;
    output: number;
    cached: number;
    reasoning: number;
  };
  totalCost: number;
  averageLatency: number;
  lastUsed: Date;
}

export interface SessionActivity {
  timestamp: Date;
  sessionId: string;
  action: 'created' | 'message_sent' | 'tool_executed' | 'error_occurred' | 'terminated';
  details: string;
  duration?: number;
  success?: boolean;
}

export interface SessionAnalytics {
  sessionId: string;
  duration: number;
  messageCount: number;
  toolExecutions: number;
  errorCount: number;
  totalTokensUsed: number;
  averageResponseTime: number;
  modelSwitches: number;
  configChanges: number;
  peakMemoryUsage: number;
  activeTime: number; // Time user was actively interacting
  idleTime: number;   // Time session was idle
}

/**
 * Monitors session statistics and provides analytics
 */
export class SessionMonitor extends EventEmitter {
  private sessionStats = new Map<string, SessionAnalytics>();
  private performanceMetrics: PerformanceMetrics;
  private toolUsage = new Map<string, ToolUsageStats>();
  private modelUsage = new Map<string, ModelUsageStats>();
  private activityLog: SessionActivity[] = [];
  private requestTimings: Array<{ timestamp: Date; duration: number; success: boolean }> = [];
  
  private readonly maxActivityLogSize = 1000;
  private readonly maxRequestTimingsSize = 500;
  private readonly windowSizeMinutes = 60; // For calculating rates

  constructor() {
    super();
    this.performanceMetrics = {
      totalRequests: 0,
      averageResponseTime: 0,
      totalResponseTime: 0,
      requestsPerMinute: 0,
      errorRate: 0,
      successRate: 100,
      concurrentSessions: 0,
      peakConcurrentSessions: 0,
    };
    
    // Clean up old data periodically
    setInterval(() => this.cleanupOldData(), 5 * 60 * 1000); // Every 5 minutes
  }

  /**
   * Initialize session monitoring
   */
  initializeSession(sessionId: string): void {
    this.sessionStats.set(sessionId, {
      sessionId,
      duration: 0,
      messageCount: 0,
      toolExecutions: 0,
      errorCount: 0,
      totalTokensUsed: 0,
      averageResponseTime: 0,
      modelSwitches: 0,
      configChanges: 0,
      peakMemoryUsage: 0,
      activeTime: 0,
      idleTime: 0,
    });

    this.performanceMetrics.concurrentSessions++;
    if (this.performanceMetrics.concurrentSessions > this.performanceMetrics.peakConcurrentSessions) {
      this.performanceMetrics.peakConcurrentSessions = this.performanceMetrics.concurrentSessions;
    }

    this.logActivity({
      timestamp: new Date(),
      sessionId,
      action: 'created',
      details: 'Session initialized',
      success: true,
    });

    this.emit('sessionCreated', sessionId);
  }

  /**
   * Track message processing
   */
  trackMessage(sessionId: string, messageLength: number, responseTime: number, success: boolean = true): void {
    const stats = this.sessionStats.get(sessionId);
    if (!stats) return;

    stats.messageCount++;
    
    // Update response time metrics
    const totalResponseTime = stats.averageResponseTime * (stats.messageCount - 1) + responseTime;
    stats.averageResponseTime = totalResponseTime / stats.messageCount;

    // Track request timing
    this.requestTimings.push({
      timestamp: new Date(),
      duration: responseTime,
      success,
    });

    // Update global metrics
    this.performanceMetrics.totalRequests++;
    this.performanceMetrics.totalResponseTime += responseTime;
    this.performanceMetrics.averageResponseTime = 
      this.performanceMetrics.totalResponseTime / this.performanceMetrics.totalRequests;

    if (!success) {
      stats.errorCount++;
    }

    this.updateRates();

    this.logActivity({
      timestamp: new Date(),
      sessionId,
      action: 'message_sent',
      details: `Message processed (${messageLength} chars)`,
      duration: responseTime,
      success,
    });

    this.emit('messageProcessed', { sessionId, responseTime, success });
  }

  /**
   * Track tool execution
   */
  trackToolExecution(
    sessionId: string,
    toolName: string,
    executionTime: number,
    success: boolean = true
  ): void {
    const stats = this.sessionStats.get(sessionId);
    if (stats) {
      stats.toolExecutions++;
      if (!success) {
        stats.errorCount++;
      }
    }

    // Update tool-specific statistics
    let toolStats = this.toolUsage.get(toolName);
    if (!toolStats) {
      toolStats = {
        toolName,
        executionCount: 0,
        totalExecutionTime: 0,
        averageExecutionTime: 0,
        successRate: 100,
        lastUsed: new Date(),
      };
      this.toolUsage.set(toolName, toolStats);
    }

    toolStats.executionCount++;
    toolStats.totalExecutionTime += executionTime;
    toolStats.averageExecutionTime = toolStats.totalExecutionTime / toolStats.executionCount;
    toolStats.lastUsed = new Date();
    
    // Calculate success rate
    const previousSuccessCount = Math.round((toolStats.successRate / 100) * (toolStats.executionCount - 1));
    const newSuccessCount = success ? previousSuccessCount + 1 : previousSuccessCount;
    toolStats.successRate = (newSuccessCount / toolStats.executionCount) * 100;

    this.logActivity({
      timestamp: new Date(),
      sessionId,
      action: 'tool_executed',
      details: `${toolName} executed`,
      duration: executionTime,
      success,
    });

    this.emit('toolExecuted', { sessionId, toolName, executionTime, success });
  }

  /**
   * Track model usage and token consumption
   */
  trackModelUsage(
    sessionId: string,
    modelName: string,
    tokens: { input: number; output: number; cached?: number; reasoning?: number },
    latency: number,
    estimatedCost: number = 0
  ): void {
    const stats = this.sessionStats.get(sessionId);
    if (stats) {
      stats.totalTokensUsed += tokens.input + tokens.output + (tokens.cached || 0) + (tokens.reasoning || 0);
    }

    // Update model-specific statistics
    let modelStats = this.modelUsage.get(modelName);
    if (!modelStats) {
      modelStats = {
        modelName,
        requestCount: 0,
        totalTokens: { input: 0, output: 0, cached: 0, reasoning: 0 },
        totalCost: 0,
        averageLatency: 0,
        lastUsed: new Date(),
      };
      this.modelUsage.set(modelName, modelStats);
    }

    modelStats.requestCount++;
    modelStats.totalTokens.input += tokens.input;
    modelStats.totalTokens.output += tokens.output;
    modelStats.totalTokens.cached += tokens.cached || 0;
    modelStats.totalTokens.reasoning += tokens.reasoning || 0;
    modelStats.totalCost += estimatedCost;
    modelStats.averageLatency = 
      (modelStats.averageLatency * (modelStats.requestCount - 1) + latency) / modelStats.requestCount;
    modelStats.lastUsed = new Date();

    this.emit('modelUsed', { sessionId, modelName, tokens, latency, estimatedCost });
  }

  /**
   * Track configuration changes
   */
  trackConfigChange(sessionId: string, field: string, oldValue: any, newValue: any): void {
    const stats = this.sessionStats.get(sessionId);
    if (stats) {
      stats.configChanges++;
      if (field === 'model') {
        stats.modelSwitches++;
      }
    }

    this.logActivity({
      timestamp: new Date(),
      sessionId,
      action: 'message_sent',
      details: `Config changed: ${field} = ${newValue}`,
      success: true,
    });

    this.emit('configChanged', { sessionId, field, oldValue, newValue });
  }

  /**
   * Track error occurrence
   */
  trackError(sessionId: string, errorType: string, errorMessage: string): void {
    const stats = this.sessionStats.get(sessionId);
    if (stats) {
      stats.errorCount++;
    }

    this.logActivity({
      timestamp: new Date(),
      sessionId,
      action: 'error_occurred',
      details: `${errorType}: ${errorMessage}`,
      success: false,
    });

    this.emit('errorOccurred', { sessionId, errorType, errorMessage });
  }

  /**
   * Finalize session statistics
   */
  finalizeSession(sessionId: string, totalDuration: number): SessionAnalytics | undefined {
    const stats = this.sessionStats.get(sessionId);
    if (!stats) return undefined;

    stats.duration = totalDuration;
    
    // Calculate active vs idle time based on activity log
    const sessionActivities = this.activityLog.filter(a => a.sessionId === sessionId);
    let activeTime = 0;
    let lastActivityTime = sessionActivities[0]?.timestamp;

    for (const activity of sessionActivities) {
      if (lastActivityTime) {
        const timeDiff = activity.timestamp.getTime() - lastActivityTime.getTime();
        // Consider gaps > 5 minutes as idle time
        if (timeDiff <= 5 * 60 * 1000) {
          activeTime += timeDiff;
        }
      }
      lastActivityTime = activity.timestamp;
    }

    stats.activeTime = activeTime;
    stats.idleTime = totalDuration - activeTime;

    this.performanceMetrics.concurrentSessions--;

    this.logActivity({
      timestamp: new Date(),
      sessionId,
      action: 'terminated',
      details: `Session ended (duration: ${Math.round(totalDuration / 1000)}s)`,
      success: true,
    });

    this.emit('sessionFinalized', { sessionId, stats });
    return stats;
  }

  /**
   * Get current performance metrics
   */
  getPerformanceMetrics(): PerformanceMetrics {
    this.updateRates();
    return { ...this.performanceMetrics };
  }

  /**
   * Get tool usage statistics
   */
  getToolUsageStats(): ToolUsageStats[] {
    return Array.from(this.toolUsage.values()).sort((a, b) => b.executionCount - a.executionCount);
  }

  /**
   * Get model usage statistics
   */
  getModelUsageStats(): ModelUsageStats[] {
    return Array.from(this.modelUsage.values()).sort((a, b) => b.requestCount - a.requestCount);
  }

  /**
   * Get session analytics
   */
  getSessionAnalytics(sessionId: string): SessionAnalytics | undefined {
    return this.sessionStats.get(sessionId);
  }

  /**
   * Get all sessions analytics
   */
  getAllSessionsAnalytics(): SessionAnalytics[] {
    return Array.from(this.sessionStats.values());
  }

  /**
   * Get recent activity log
   */
  getActivityLog(limit: number = 100): SessionActivity[] {
    return this.activityLog.slice(-limit);
  }

  /**
   * Get activity log for specific session
   */
  getSessionActivity(sessionId: string, limit: number = 50): SessionActivity[] {
    return this.activityLog
      .filter(activity => activity.sessionId === sessionId)
      .slice(-limit);
  }

  /**
   * Generate analytics report
   */
  generateAnalyticsReport(): gemini.AnalyticsReport {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const recentSessions = Array.from(this.sessionStats.values())
      .filter(s => new Date(s.sessionId) > oneDayAgo); // Assuming sessionId contains timestamp

    const recentActivity = this.activityLog.filter(a => a.timestamp > oneHourAgo);

    return new gemini.AnalyticsReport({
      timestamp: now.getTime(),
      performance_metrics: new gemini.PerformanceMetrics({
        total_requests: this.performanceMetrics.totalRequests,
        average_response_time_ms: this.performanceMetrics.averageResponseTime,
        requests_per_minute: this.performanceMetrics.requestsPerMinute,
        error_rate: this.performanceMetrics.errorRate,
        success_rate: this.performanceMetrics.successRate,
        concurrent_sessions: this.performanceMetrics.concurrentSessions,
        peak_concurrent_sessions: this.performanceMetrics.peakConcurrentSessions,
      }),
      tool_usage: this.getToolUsageStats().map(tool => new gemini.ToolUsageStats({
        tool_name: tool.toolName,
        execution_count: tool.executionCount,
        total_execution_time_ms: tool.totalExecutionTime,
        average_execution_time_ms: tool.averageExecutionTime,
        success_rate: tool.successRate,
        last_used: tool.lastUsed.getTime(),
      })),
      model_usage: this.getModelUsageStats().map(model => new gemini.ModelUsageStats({
        model_name: model.modelName,
        request_count: model.requestCount,
        total_tokens: new gemini.TokenUsage({
          input_tokens: model.totalTokens.input,
          output_tokens: model.totalTokens.output,
          cached_tokens: model.totalTokens.cached,
          reasoning_tokens: model.totalTokens.reasoning,
          total_tokens: model.totalTokens.input + model.totalTokens.output,
        }),
        total_cost: model.totalCost,
        average_latency_ms: model.averageLatency,
        last_used: model.lastUsed.getTime(),
      })),
      session_summary: new gemini.SessionSummary({
        total_sessions: this.sessionStats.size,
        active_sessions: this.performanceMetrics.concurrentSessions,
        average_session_duration_ms: this.calculateAverageSessionDuration(),
        total_messages: recentSessions.reduce((sum, s) => sum + s.messageCount, 0),
        total_tool_executions: recentSessions.reduce((sum, s) => sum + s.toolExecutions, 0),
        total_errors: recentSessions.reduce((sum, s) => sum + s.errorCount, 0),
      }),
      recent_activity: recentActivity.slice(-20).map(activity => new gemini.ActivityEntry({
        timestamp: activity.timestamp.getTime(),
        session_id: activity.sessionId,
        action: activity.action,
        details: activity.details,
        duration_ms: activity.duration || 0,
        success: activity.success || false,
      })),
    });
  }

  /**
   * Clear all statistics (for testing or reset)
   */
  clearAllStats(): void {
    this.sessionStats.clear();
    this.toolUsage.clear();
    this.modelUsage.clear();
    this.activityLog.length = 0;
    this.requestTimings.length = 0;
    
    this.performanceMetrics = {
      totalRequests: 0,
      averageResponseTime: 0,
      totalResponseTime: 0,
      requestsPerMinute: 0,
      errorRate: 0,
      successRate: 100,
      concurrentSessions: 0,
      peakConcurrentSessions: 0,
    };
  }

  /**
   * Update calculated rates and percentages
   */
  private updateRates(): void {
    // Calculate requests per minute from recent activity
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    const recentRequests = this.requestTimings.filter(r => r.timestamp > oneMinuteAgo);
    this.performanceMetrics.requestsPerMinute = recentRequests.length;

    // Calculate error and success rates
    const windowStart = new Date(now.getTime() - this.windowSizeMinutes * 60 * 1000);
    const windowRequests = this.requestTimings.filter(r => r.timestamp > windowStart);
    
    if (windowRequests.length > 0) {
      const errors = windowRequests.filter(r => !r.success).length;
      this.performanceMetrics.errorRate = (errors / windowRequests.length) * 100;
      this.performanceMetrics.successRate = 100 - this.performanceMetrics.errorRate;
    }
  }

  /**
   * Calculate average session duration
   */
  private calculateAverageSessionDuration(): number {
    const completedSessions = Array.from(this.sessionStats.values()).filter(s => s.duration > 0);
    if (completedSessions.length === 0) return 0;
    
    const totalDuration = completedSessions.reduce((sum, s) => sum + s.duration, 0);
    return totalDuration / completedSessions.length;
  }

  /**
   * Log activity with size management
   */
  private logActivity(activity: SessionActivity): void {
    this.activityLog.push(activity);
    
    // Keep log size manageable
    if (this.activityLog.length > this.maxActivityLogSize) {
      this.activityLog.splice(0, this.activityLog.length - this.maxActivityLogSize);
    }
  }

  /**
   * Clean up old data periodically
   */
  private cleanupOldData(): void {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    
    // Clean up old request timings
    this.requestTimings = this.requestTimings.filter(r => r.timestamp > cutoff);
    
    // Keep request timings size manageable
    if (this.requestTimings.length > this.maxRequestTimingsSize) {
      this.requestTimings.splice(0, this.requestTimings.length - this.maxRequestTimingsSize);
    }
    
    // Clean up old activity log entries
    this.activityLog = this.activityLog.filter(a => a.timestamp > cutoff);
  }
}