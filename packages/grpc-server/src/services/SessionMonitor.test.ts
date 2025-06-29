/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SessionMonitor } from './SessionMonitor';

describe('SessionMonitor', () => {
  let monitor: SessionMonitor;
  let mockDate: Date;

  beforeEach(() => {
    vi.useFakeTimers();
    monitor = new SessionMonitor();
    mockDate = new Date('2024-01-01T12:00:00Z');
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('session lifecycle', () => {
    it('should initialize session and track creation', () => {
      const sessionId = 'test-session-1';
      const eventSpy = vi.fn();
      monitor.on('sessionCreated', eventSpy);

      monitor.initializeSession(sessionId);

      const analytics = monitor.getSessionAnalytics(sessionId);
      expect(analytics).toBeDefined();
      expect(analytics!.sessionId).toBe(sessionId);
      expect(analytics!.messageCount).toBe(0);
      expect(analytics!.toolExecutions).toBe(0);
      expect(analytics!.errorCount).toBe(0);

      expect(eventSpy).toHaveBeenCalledWith(sessionId);

      const metrics = monitor.getPerformanceMetrics();
      expect(metrics.concurrentSessions).toBe(1);
      expect(metrics.peakConcurrentSessions).toBe(1);
    });

    it('should finalize session and calculate duration', () => {
      const sessionId = 'test-session-1';
      const eventSpy = vi.fn();
      monitor.on('sessionFinalized', eventSpy);

      monitor.initializeSession(sessionId);
      
      // Advance time by 5 minutes
      const sessionDuration = 5 * 60 * 1000;
      vi.advanceTimersByTime(sessionDuration);

      const finalStats = monitor.finalizeSession(sessionId, sessionDuration);

      expect(finalStats).toBeDefined();
      expect(finalStats!.duration).toBe(sessionDuration);
      expect(eventSpy).toHaveBeenCalledWith({ sessionId, stats: finalStats });

      const metrics = monitor.getPerformanceMetrics();
      expect(metrics.concurrentSessions).toBe(0);
    });

    it('should track multiple concurrent sessions', () => {
      monitor.initializeSession('session-1');
      monitor.initializeSession('session-2');
      monitor.initializeSession('session-3');

      const metrics = monitor.getPerformanceMetrics();
      expect(metrics.concurrentSessions).toBe(3);
      expect(metrics.peakConcurrentSessions).toBe(3);

      monitor.finalizeSession('session-1', 1000);
      monitor.finalizeSession('session-2', 2000);

      const updatedMetrics = monitor.getPerformanceMetrics();
      expect(updatedMetrics.concurrentSessions).toBe(1);
      expect(updatedMetrics.peakConcurrentSessions).toBe(3); // Peak should remain
    });
  });

  describe('message tracking', () => {
    beforeEach(() => {
      monitor.initializeSession('test-session');
    });

    it('should track message processing', () => {
      const eventSpy = vi.fn();
      monitor.on('messageProcessed', eventSpy);

      monitor.trackMessage('test-session', 100, 500, true);
      monitor.trackMessage('test-session', 150, 750, true);

      const analytics = monitor.getSessionAnalytics('test-session');
      expect(analytics!.messageCount).toBe(2);
      expect(analytics!.averageResponseTime).toBe(625); // (500 + 750) / 2

      const metrics = monitor.getPerformanceMetrics();
      expect(metrics.totalRequests).toBe(2);
      expect(metrics.averageResponseTime).toBe(625);

      expect(eventSpy).toHaveBeenCalledTimes(2);
    });

    it('should track failed messages', () => {
      monitor.trackMessage('test-session', 100, 500, false);

      const analytics = monitor.getSessionAnalytics('test-session');
      expect(analytics!.messageCount).toBe(1);
      expect(analytics!.errorCount).toBe(1);
    });

    it('should calculate requests per minute', () => {
      // Track several requests
      monitor.trackMessage('test-session', 100, 500);
      monitor.trackMessage('test-session', 100, 600);
      monitor.trackMessage('test-session', 100, 700);

      const metrics = monitor.getPerformanceMetrics();
      expect(metrics.requestsPerMinute).toBe(3);
    });
  });

  describe('tool tracking', () => {
    beforeEach(() => {
      monitor.initializeSession('test-session');
    });

    it('should track tool execution', () => {
      const eventSpy = vi.fn();
      monitor.on('toolExecuted', eventSpy);

      monitor.trackToolExecution('test-session', 'ls', 100, true);
      monitor.trackToolExecution('test-session', 'grep', 200, true);
      monitor.trackToolExecution('test-session', 'ls', 150, false);

      const analytics = monitor.getSessionAnalytics('test-session');
      expect(analytics!.toolExecutions).toBe(3);
      expect(analytics!.errorCount).toBe(1); // One failed execution

      const toolStats = monitor.getToolUsageStats();
      expect(toolStats).toHaveLength(2);

      const lsStats = toolStats.find(t => t.toolName === 'ls');
      expect(lsStats!.executionCount).toBe(2);
      expect(lsStats!.averageExecutionTime).toBe(125); // (100 + 150) / 2
      expect(lsStats!.successRate).toBe(50); // 1 success out of 2

      const grepStats = toolStats.find(t => t.toolName === 'grep');
      expect(grepStats!.executionCount).toBe(1);
      expect(grepStats!.successRate).toBe(100);

      expect(eventSpy).toHaveBeenCalledTimes(3);
    });

    it('should sort tools by execution count', () => {
      monitor.trackToolExecution('test-session', 'ls', 100);
      monitor.trackToolExecution('test-session', 'ls', 100);
      monitor.trackToolExecution('test-session', 'grep', 100);
      monitor.trackToolExecution('test-session', 'ls', 100);

      const toolStats = monitor.getToolUsageStats();
      expect(toolStats[0].toolName).toBe('ls');
      expect(toolStats[0].executionCount).toBe(3);
      expect(toolStats[1].toolName).toBe('grep');
      expect(toolStats[1].executionCount).toBe(1);
    });
  });

  describe('model tracking', () => {
    beforeEach(() => {
      monitor.initializeSession('test-session');
    });

    it('should track model usage and tokens', () => {
      const eventSpy = vi.fn();
      monitor.on('modelUsed', eventSpy);

      const tokens1 = { input: 100, output: 50, cached: 10, reasoning: 20 };
      const tokens2 = { input: 200, output: 75 };

      monitor.trackModelUsage('test-session', 'gemini-1.5-pro', tokens1, 1000, 0.05);
      monitor.trackModelUsage('test-session', 'gemini-1.5-pro', tokens2, 1200, 0.03);
      monitor.trackModelUsage('test-session', 'gemini-1.5-flash', tokens2, 800, 0.02);

      const analytics = monitor.getSessionAnalytics('test-session');
      // tokens1: 100+50+10+20 = 180, tokens2: 200+75 = 275, tokens2 again: 200+75 = 275
      // Total: 180 + 275 + 275 = 730
      expect(analytics!.totalTokensUsed).toBe(730);

      const modelStats = monitor.getModelUsageStats();
      expect(modelStats).toHaveLength(2);

      const proStats = modelStats.find(m => m.modelName === 'gemini-1.5-pro');
      expect(proStats!.requestCount).toBe(2);
      expect(proStats!.totalTokens.input).toBe(300);
      expect(proStats!.totalTokens.output).toBe(125);
      expect(proStats!.totalCost).toBe(0.08);
      expect(proStats!.averageLatency).toBe(1100); // (1000 + 1200) / 2

      expect(eventSpy).toHaveBeenCalledTimes(3);
    });

    it('should sort models by request count', () => {
      const tokens = { input: 100, output: 50 };

      monitor.trackModelUsage('test-session', 'gemini-1.5-flash', tokens, 800);
      monitor.trackModelUsage('test-session', 'gemini-1.5-pro', tokens, 1000);
      monitor.trackModelUsage('test-session', 'gemini-1.5-pro', tokens, 1000);

      const modelStats = monitor.getModelUsageStats();
      expect(modelStats[0].modelName).toBe('gemini-1.5-pro');
      expect(modelStats[0].requestCount).toBe(2);
      expect(modelStats[1].modelName).toBe('gemini-1.5-flash');
      expect(modelStats[1].requestCount).toBe(1);
    });
  });

  describe('configuration tracking', () => {
    beforeEach(() => {
      monitor.initializeSession('test-session');
    });

    it('should track configuration changes', () => {
      const eventSpy = vi.fn();
      monitor.on('configChanged', eventSpy);

      monitor.trackConfigChange('test-session', 'theme', 'default', 'dark');
      monitor.trackConfigChange('test-session', 'model', 'gpt-3.5', 'gpt-4');

      const analytics = monitor.getSessionAnalytics('test-session');
      expect(analytics!.configChanges).toBe(2);
      expect(analytics!.modelSwitches).toBe(1);

      expect(eventSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('error tracking', () => {
    beforeEach(() => {
      monitor.initializeSession('test-session');
    });

    it('should track errors', () => {
      const eventSpy = vi.fn();
      monitor.on('errorOccurred', eventSpy);

      monitor.trackError('test-session', 'NetworkError', 'Connection failed');
      monitor.trackError('test-session', 'ValidationError', 'Invalid input');

      const analytics = monitor.getSessionAnalytics('test-session');
      expect(analytics!.errorCount).toBe(2);

      expect(eventSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('activity logging', () => {
    beforeEach(() => {
      monitor.initializeSession('test-session');
    });

    it('should log all activities', () => {
      monitor.trackMessage('test-session', 100, 500);
      monitor.trackToolExecution('test-session', 'ls', 100);
      monitor.trackError('test-session', 'TestError', 'Test error message');

      const allActivity = monitor.getActivityLog();
      expect(allActivity.length).toBeGreaterThanOrEqual(4); // session creation + 3 activities

      const sessionActivity = monitor.getSessionActivity('test-session');
      expect(sessionActivity.length).toBeGreaterThanOrEqual(4);
    });

    it('should limit activity log size', () => {
      // Create many activities to test size limit
      for (let i = 0; i < 1100; i++) {
        monitor.trackMessage('test-session', 100, 500);
      }

      const allActivity = monitor.getActivityLog();
      expect(allActivity.length).toBeLessThanOrEqual(1000);
    });
  });

  describe('analytics report generation', () => {
    beforeEach(() => {
      monitor.initializeSession('test-session-1');
      monitor.initializeSession('test-session-2');
    });

    it('should generate comprehensive analytics report', () => {
      // Generate some activity
      monitor.trackMessage('test-session-1', 100, 500);
      monitor.trackMessage('test-session-2', 150, 600);
      monitor.trackToolExecution('test-session-1', 'ls', 100);
      monitor.trackModelUsage('test-session-1', 'gemini-1.5-pro', { input: 100, output: 50 }, 1000);

      const report = monitor.generateAnalyticsReport();

      expect(report.timestamp).toBeDefined();
      expect(report.performance_metrics).toBeDefined();
      expect(report.performance_metrics!.total_requests).toBe(2);
      expect(report.performance_metrics!.concurrent_sessions).toBe(2);

      expect(report.tool_usage).toBeDefined();
      expect(report.tool_usage!.length).toBe(1);
      expect(report.tool_usage![0].tool_name).toBe('ls');

      expect(report.model_usage).toBeDefined();
      expect(report.model_usage!.length).toBe(1);
      expect(report.model_usage![0].model_name).toBe('gemini-1.5-pro');

      expect(report.session_summary).toBeDefined();
      expect(report.session_summary!.total_sessions).toBe(2);
      expect(report.session_summary!.active_sessions).toBe(2);

      expect(report.recent_activity).toBeDefined();
    });
  });

  describe('statistics management', () => {
    it('should clear all statistics', () => {
      monitor.initializeSession('test-session');
      monitor.trackMessage('test-session', 100, 500);
      monitor.trackToolExecution('test-session', 'ls', 100);

      expect(monitor.getAllSessionsAnalytics()).toHaveLength(1);
      expect(monitor.getToolUsageStats()).toHaveLength(1);
      expect(monitor.getActivityLog().length).toBeGreaterThanOrEqual(2); // session creation + other activities

      monitor.clearAllStats();

      expect(monitor.getAllSessionsAnalytics()).toHaveLength(0);
      expect(monitor.getToolUsageStats()).toHaveLength(0);
      expect(monitor.getActivityLog()).toHaveLength(0);

      const metrics = monitor.getPerformanceMetrics();
      expect(metrics.totalRequests).toBe(0);
      expect(metrics.concurrentSessions).toBe(0);
    });
  });

  describe('performance calculations', () => {
    beforeEach(() => {
      monitor.initializeSession('test-session');
    });

    it('should calculate error and success rates', () => {
      // Track mix of successful and failed requests
      monitor.trackMessage('test-session', 100, 500, true);
      monitor.trackMessage('test-session', 100, 600, true);
      monitor.trackMessage('test-session', 100, 700, false);
      monitor.trackMessage('test-session', 100, 800, false);
      monitor.trackMessage('test-session', 100, 900, true);

      const metrics = monitor.getPerformanceMetrics();
      expect(metrics.errorRate).toBe(40); // 2 errors out of 5 requests
      expect(metrics.successRate).toBe(60); // 3 successes out of 5 requests
    });
  });
});