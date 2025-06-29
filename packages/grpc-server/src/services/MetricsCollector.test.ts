/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MetricsCollector, AlertRule } from './MetricsCollector';

describe('MetricsCollector', () => {
  let collector: MetricsCollector;
  let mockDate: Date;

  beforeEach(() => {
    vi.useFakeTimers();
    collector = new MetricsCollector();
    mockDate = new Date('2024-01-01T12:00:00Z');
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('metric registration and recording', () => {
    it('should register and record metrics', () => {
      collector.registerMetric('test_metric', 'Test metric description', 'units', 'average');

      const eventSpy = vi.fn();
      collector.on('metricRecorded', eventSpy);

      collector.recordMetric('test_metric', 42.5, { label1: 'value1' });

      const metric = collector.getMetric('test_metric');
      expect(metric).toBeDefined();
      expect(metric!.name).toBe('test_metric');
      expect(metric!.description).toBe('Test metric description');
      expect(metric!.unit).toBe('units');
      expect(metric!.aggregationType).toBe('average');
      expect(metric!.points).toHaveLength(1);
      expect(metric!.points[0].value).toBe(42.5);
      expect(metric!.points[0].labels).toEqual({ label1: 'value1' });

      expect(eventSpy).toHaveBeenCalledWith({
        name: 'test_metric',
        value: 42.5,
        labels: { label1: 'value1' },
        timestamp: mockDate,
      });
    });

    it('should throw error for unregistered metric', () => {
      expect(() => {
        collector.recordMetric('unknown_metric', 123);
      }).toThrow('Metric unknown_metric not found');
    });

    it('should limit metric points', () => {
      collector.registerMetric('test_metric', 'Test metric', 'units');

      // Record more than max points
      for (let i = 0; i < 1100; i++) {
        collector.recordMetric('test_metric', i);
      }

      const metric = collector.getMetric('test_metric');
      expect(metric!.points.length).toBeLessThanOrEqual(1000);
      // Should keep the most recent points
      expect(metric!.points[metric!.points.length - 1].value).toBe(1099);
    });
  });

  describe('standard metrics initialization', () => {
    it('should initialize standard metrics', () => {
      const allMetrics = collector.getAllMetrics();
      expect(allMetrics.length).toBeGreaterThan(0);

      // Check some key metrics exist
      expect(collector.getMetric('response_time_ms')).toBeDefined();
      expect(collector.getMetric('error_rate')).toBeDefined();
      expect(collector.getMetric('concurrent_sessions')).toBeDefined();
      expect(collector.getMetric('memory_usage_mb')).toBeDefined();
    });
  });

  describe('metric data retrieval', () => {
    beforeEach(() => {
      collector.registerMetric('test_metric', 'Test metric', 'units');
    });

    it('should filter metric data by time range', () => {
      const baseTime = new Date('2024-01-01T12:00:00Z');
      
      collector.recordMetric('test_metric', 10, undefined, new Date(baseTime.getTime()));
      collector.recordMetric('test_metric', 20, undefined, new Date(baseTime.getTime() + 60000));
      collector.recordMetric('test_metric', 30, undefined, new Date(baseTime.getTime() + 120000));

      const startTime = new Date(baseTime.getTime() + 30000);
      const endTime = new Date(baseTime.getTime() + 90000);

      const filteredData = collector.getMetricData('test_metric', startTime, endTime);
      expect(filteredData).toHaveLength(1);
      expect(filteredData[0].value).toBe(20);
    });

    it('should filter metric data by labels', () => {
      collector.recordMetric('test_metric', 10, { env: 'prod' });
      collector.recordMetric('test_metric', 20, { env: 'dev' });
      collector.recordMetric('test_metric', 30, { env: 'prod' });

      const startTime = new Date(mockDate.getTime() - 60000);
      const endTime = new Date(mockDate.getTime() + 60000);

      const prodData = collector.getMetricData('test_metric', startTime, endTime, { env: 'prod' });
      expect(prodData).toHaveLength(2);
      expect(prodData.map(p => p.value)).toEqual([10, 30]);
    });

    it('should get current value', () => {
      collector.recordMetric('test_metric', 10);
      collector.recordMetric('test_metric', 20);
      collector.recordMetric('test_metric', 30);

      expect(collector.getCurrentValue('test_metric')).toBe(30);
    });

    it('should get current value with labels', () => {
      collector.recordMetric('test_metric', 10, { env: 'prod' });
      collector.recordMetric('test_metric', 20, { env: 'dev' });
      collector.recordMetric('test_metric', 30, { env: 'prod' });

      expect(collector.getCurrentValue('test_metric', { env: 'prod' })).toBe(30);
      expect(collector.getCurrentValue('test_metric', { env: 'dev' })).toBe(20);
    });
  });

  describe('metric aggregation', () => {
    beforeEach(() => {
      collector.registerMetric('sum_metric', 'Sum metric', 'units', 'sum');
      collector.registerMetric('avg_metric', 'Average metric', 'units', 'average');
      collector.registerMetric('max_metric', 'Max metric', 'units', 'max');
      collector.registerMetric('min_metric', 'Min metric', 'units', 'min');
      collector.registerMetric('count_metric', 'Count metric', 'units', 'count');
    });

    it('should aggregate metrics with sum', () => {
      const baseTime = new Date('2024-01-01T12:00:00Z');
      
      collector.recordMetric('sum_metric', 10, undefined, new Date(baseTime.getTime()));
      collector.recordMetric('sum_metric', 20, undefined, new Date(baseTime.getTime() + 30000));
      collector.recordMetric('sum_metric', 30, undefined, new Date(baseTime.getTime() + 90000));

      const startTime = baseTime;
      const endTime = new Date(baseTime.getTime() + 120000);
      const windowSize = 60000; // 1 minute windows

      const aggregated = collector.aggregateMetric('sum_metric', startTime, endTime, windowSize);
      expect(aggregated).toHaveLength(2);
      expect(aggregated[0].value).toBe(30); // 10 + 20 in first window
      expect(aggregated[1].value).toBe(30); // 30 in second window
    });

    it('should aggregate metrics with average', () => {
      const baseTime = new Date('2024-01-01T12:00:00Z');
      
      collector.recordMetric('avg_metric', 10, undefined, new Date(baseTime.getTime()));
      collector.recordMetric('avg_metric', 20, undefined, new Date(baseTime.getTime() + 30000));

      const startTime = baseTime;
      const endTime = new Date(baseTime.getTime() + 60000);
      const windowSize = 60000;

      const aggregated = collector.aggregateMetric('avg_metric', startTime, endTime, windowSize);
      expect(aggregated).toHaveLength(1);
      expect(aggregated[0].value).toBe(15); // (10 + 20) / 2
    });

    it('should aggregate metrics with max', () => {
      const baseTime = new Date('2024-01-01T12:00:00Z');
      
      collector.recordMetric('max_metric', 10, undefined, new Date(baseTime.getTime()));
      collector.recordMetric('max_metric', 30, undefined, new Date(baseTime.getTime() + 30000));
      collector.recordMetric('max_metric', 20, undefined, new Date(baseTime.getTime() + 45000));

      const startTime = baseTime;
      const endTime = new Date(baseTime.getTime() + 60000);
      const windowSize = 60000;

      const aggregated = collector.aggregateMetric('max_metric', startTime, endTime, windowSize);
      expect(aggregated).toHaveLength(1);
      expect(aggregated[0].value).toBe(30);
    });
  });

  describe('alert management', () => {
    beforeEach(() => {
      collector.registerMetric('alert_metric', 'Alert metric', 'units');
    });

    it('should add and manage alert rules', () => {
      const rule: AlertRule = {
        id: 'test_alert',
        metricName: 'alert_metric',
        condition: 'greater_than',
        threshold: 100,
        duration: 60000,
        enabled: true,
        description: 'Test alert rule',
      };

      collector.addAlertRule(rule);

      const rules = collector.getAlertRules();
      expect(rules).toHaveLength(5); // 4 default + 1 added
      expect(rules.find(r => r.id === 'test_alert')).toEqual(rule);
    });

    it('should remove alert rules', () => {
      const rule: AlertRule = {
        id: 'test_alert',
        metricName: 'alert_metric',
        condition: 'greater_than',
        threshold: 100,
        duration: 60000,
        enabled: true,
        description: 'Test alert rule',
      };

      collector.addAlertRule(rule);
      expect(collector.getAlertRules().find(r => r.id === 'test_alert')).toBeDefined();

      const removed = collector.removeAlertRule('test_alert');
      expect(removed).toBe(true);
      expect(collector.getAlertRules().find(r => r.id === 'test_alert')).toBeUndefined();
    });

    it('should trigger alerts when conditions are met', async () => {
      const alertSpy = vi.fn();
      collector.on('alertTriggered', alertSpy);

      const rule: AlertRule = {
        id: 'test_alert',
        metricName: 'alert_metric',
        condition: 'greater_than',
        threshold: 50,
        duration: 1000, // 1 second
        enabled: true,
        description: 'Test alert',
      };

      collector.addAlertRule(rule);

      // Record values that exceed threshold over time
      collector.recordMetric('alert_metric', 60);
      vi.advanceTimersByTime(500);
      collector.recordMetric('alert_metric', 70);
      vi.advanceTimersByTime(500);
      collector.recordMetric('alert_metric', 65);

      // Wait for alert check interval (30s) plus duration
      vi.advanceTimersByTime(35000);

      expect(alertSpy).toHaveBeenCalled();
      
      const activeAlerts = collector.getActiveAlerts();
      expect(activeAlerts).toHaveLength(1);
      expect(activeAlerts[0].id).toBe('test_alert');
      expect(activeAlerts[0].currentValue).toBe(65);
    });

    it('should resolve alerts when conditions are no longer met', async () => {
      const alertSpy = vi.fn();
      const resolveSpy = vi.fn();
      collector.on('alertTriggered', alertSpy);
      collector.on('alertResolved', resolveSpy);

      const rule: AlertRule = {
        id: 'test_alert',
        metricName: 'alert_metric',
        condition: 'greater_than',
        threshold: 50,
        duration: 1000,
        enabled: true,
        description: 'Test alert',
      };

      collector.addAlertRule(rule);

      // Trigger alert
      collector.recordMetric('alert_metric', 60);
      vi.advanceTimersByTime(500);
      collector.recordMetric('alert_metric', 65);
      vi.advanceTimersByTime(35000);

      expect(collector.getActiveAlerts()).toHaveLength(1);

      // Record value below threshold
      collector.recordMetric('alert_metric', 30);
      vi.advanceTimersByTime(35000);

      expect(resolveSpy).toHaveBeenCalled();
      expect(collector.getActiveAlerts()).toHaveLength(0);
      expect(collector.getResolvedAlerts()).toHaveLength(1);
    });

    it('should manually resolve alerts', () => {
      const rule: AlertRule = {
        id: 'test_alert',
        metricName: 'alert_metric',
        condition: 'greater_than',
        threshold: 50,
        duration: 1000,
        enabled: true,
        description: 'Test alert',
      };

      collector.addAlertRule(rule);

      // Trigger alert
      collector.recordMetric('alert_metric', 60);
      vi.advanceTimersByTime(500);
      collector.recordMetric('alert_metric', 65);
      vi.advanceTimersByTime(35000);

      expect(collector.getActiveAlerts()).toHaveLength(1);

      const resolved = collector.resolveAlert('test_alert');
      expect(resolved).toBe(true);
      expect(collector.getActiveAlerts()).toHaveLength(0);
      expect(collector.getResolvedAlerts()).toHaveLength(1);
    });
  });

  describe('metrics summary generation', () => {
    beforeEach(() => {
      collector.registerMetric('summary_metric', 'Summary test metric', 'units');
    });

    it('should generate metrics summary', () => {
      collector.recordMetric('summary_metric', 10);
      collector.recordMetric('summary_metric', 20);
      collector.recordMetric('summary_metric', 30);
      collector.recordMetric('summary_metric', 5);

      const summary = collector.generateMetricsSummary();

      expect(summary.timestamp).toBeDefined();
      expect(summary.time_range_ms).toBe(60 * 60 * 1000); // Default 1 hour

      const summaryMetric = summary.metrics!.find((m: any) => m.name === 'summary_metric');
      expect(summaryMetric).toBeDefined();
      expect(summaryMetric!.current_value).toBe(5); // Last recorded value
      expect(summaryMetric!.min_value).toBe(5);
      expect(summaryMetric!.max_value).toBe(30);
      expect(summaryMetric!.average_value).toBe(16.25); // (10+20+30+5)/4
      expect(summaryMetric!.data_points).toBe(4);
    });

    it('should include active alerts in summary', () => {
      const rule: AlertRule = {
        id: 'summary_alert',
        metricName: 'summary_metric',
        condition: 'greater_than',
        threshold: 50,
        duration: 1000,
        enabled: true,
        description: 'Summary alert',
      };

      collector.addAlertRule(rule);

      // Trigger alert
      collector.recordMetric('summary_metric', 60);
      vi.advanceTimersByTime(500);
      collector.recordMetric('summary_metric', 65);
      vi.advanceTimersByTime(35000);

      const summary = collector.generateMetricsSummary();
      expect(summary.active_alerts).toHaveLength(1);
      expect(summary.active_alerts![0].id).toBe('summary_alert');
      expect(summary.active_alerts![0].current_value).toBe(65);
    });
  });

  describe('data cleanup', () => {
    beforeEach(() => {
      collector.registerMetric('cleanup_metric', 'Cleanup test metric', 'units');
    });

    it('should clean up old metric points', () => {
      const oldTime = new Date(mockDate.getTime() - 25 * 60 * 60 * 1000); // 25 hours ago
      const recentTime = new Date(mockDate.getTime() - 1 * 60 * 60 * 1000); // 1 hour ago

      collector.recordMetric('cleanup_metric', 10, undefined, oldTime);
      collector.recordMetric('cleanup_metric', 20, undefined, recentTime);

      // Trigger cleanup
      vi.advanceTimersByTime(11 * 60 * 1000); // Advance past cleanup interval

      const metric = collector.getMetric('cleanup_metric');
      expect(metric!.points).toHaveLength(1);
      expect(metric!.points[0].value).toBe(20); // Only recent point should remain
    });
  });
});