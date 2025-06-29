/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { gemini } from '../proto/generated/gemini';
import { EventEmitter } from 'events';

export interface MetricPoint {
  timestamp: Date;
  value: number;
  labels?: Record<string, string>;
}

export interface TimeSeriesMetric {
  name: string;
  description: string;
  unit: string;
  points: MetricPoint[];
  aggregationType: 'sum' | 'average' | 'max' | 'min' | 'count';
}

export interface AlertRule {
  id: string;
  metricName: string;
  condition: 'greater_than' | 'less_than' | 'equals' | 'not_equals';
  threshold: number;
  duration: number; // Duration in ms to trigger alert
  enabled: boolean;
  lastTriggered?: Date;
  description: string;
}

export interface Alert {
  id: string;
  ruleId: string;
  metricName: string;
  currentValue: number;
  threshold: number;
  condition: string;
  triggeredAt: Date;
  resolved?: Date;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Collects and aggregates real-time metrics
 */
export class MetricsCollector extends EventEmitter {
  private metrics = new Map<string, TimeSeriesMetric>();
  private alertRules = new Map<string, AlertRule>();
  private activeAlerts = new Map<string, Alert>();
  private resolvedAlerts: Alert[] = [];
  
  private readonly maxPointsPerMetric = 1000;
  private readonly maxResolvedAlerts = 100;
  private readonly defaultRetentionMs = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    super();
    this.initializeStandardMetrics();
    this.initializeDefaultAlerts();
    
    // Clean up old data periodically
    setInterval(() => this.cleanupOldData(), 10 * 60 * 1000); // Every 10 minutes
    
    // Check alerts periodically
    setInterval(() => this.checkAlerts(), 30 * 1000); // Every 30 seconds
  }

  /**
   * Record a metric point
   */
  recordMetric(
    name: string,
    value: number,
    labels?: Record<string, string>,
    timestamp: Date = new Date()
  ): void {
    let metric = this.metrics.get(name);
    if (!metric) {
      throw new Error(`Metric ${name} not found. Register it first.`);
    }

    const point: MetricPoint = { timestamp, value, labels };
    metric.points.push(point);

    // Keep points within limit
    if (metric.points.length > this.maxPointsPerMetric) {
      metric.points.shift();
    }

    this.emit('metricRecorded', { name, value, labels, timestamp });
  }

  /**
   * Register a new metric
   */
  registerMetric(
    name: string,
    description: string,
    unit: string,
    aggregationType: 'sum' | 'average' | 'max' | 'min' | 'count' = 'average'
  ): void {
    this.metrics.set(name, {
      name,
      description,
      unit,
      points: [],
      aggregationType,
    });
  }

  /**
   * Get metric by name
   */
  getMetric(name: string): TimeSeriesMetric | undefined {
    return this.metrics.get(name);
  }

  /**
   * Get all metrics
   */
  getAllMetrics(): TimeSeriesMetric[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Get metric data for a time range
   */
  getMetricData(
    name: string,
    startTime: Date,
    endTime: Date,
    labels?: Record<string, string>
  ): MetricPoint[] {
    const metric = this.metrics.get(name);
    if (!metric) return [];

    return metric.points.filter(point => {
      const inTimeRange = point.timestamp >= startTime && point.timestamp <= endTime;
      if (!inTimeRange) return false;

      if (labels) {
        return Object.entries(labels).every(([key, value]) => 
          point.labels?.[key] === value
        );
      }

      return true;
    });
  }

  /**
   * Aggregate metric data over a time window
   */
  aggregateMetric(
    name: string,
    startTime: Date,
    endTime: Date,
    windowSizeMs: number,
    labels?: Record<string, string>
  ): Array<{ timestamp: Date; value: number }> {
    const points = this.getMetricData(name, startTime, endTime, labels);
    const metric = this.metrics.get(name);
    if (!metric || points.length === 0) return [];

    const windows: Array<{ timestamp: Date; value: number }> = [];
    const startTimeMs = startTime.getTime();
    const endTimeMs = endTime.getTime();

    for (let windowStart = startTimeMs; windowStart < endTimeMs; windowStart += windowSizeMs) {
      const windowEnd = Math.min(windowStart + windowSizeMs, endTimeMs);
      const windowPoints = points.filter(p => 
        p.timestamp.getTime() >= windowStart && p.timestamp.getTime() < windowEnd
      );

      if (windowPoints.length === 0) continue;

      let aggregatedValue: number;
      switch (metric.aggregationType) {
        case 'sum':
          aggregatedValue = windowPoints.reduce((sum, p) => sum + p.value, 0);
          break;
        case 'average':
          aggregatedValue = windowPoints.reduce((sum, p) => sum + p.value, 0) / windowPoints.length;
          break;
        case 'max':
          aggregatedValue = Math.max(...windowPoints.map(p => p.value));
          break;
        case 'min':
          aggregatedValue = Math.min(...windowPoints.map(p => p.value));
          break;
        case 'count':
          aggregatedValue = windowPoints.length;
          break;
      }

      windows.push({
        timestamp: new Date(windowStart),
        value: aggregatedValue,
      });
    }

    return windows;
  }

  /**
   * Get current value for a metric
   */
  getCurrentValue(name: string, labels?: Record<string, string>): number | undefined {
    const metric = this.metrics.get(name);
    if (!metric || metric.points.length === 0) return undefined;

    // Filter by labels if provided
    let relevantPoints = metric.points;
    if (labels) {
      relevantPoints = metric.points.filter(point =>
        Object.entries(labels).every(([key, value]) => point.labels?.[key] === value)
      );
    }

    if (relevantPoints.length === 0) return undefined;

    // Get the most recent point
    return relevantPoints[relevantPoints.length - 1].value;
  }

  /**
   * Add an alert rule
   */
  addAlertRule(rule: AlertRule): void {
    this.alertRules.set(rule.id, rule);
  }

  /**
   * Remove an alert rule
   */
  removeAlertRule(ruleId: string): boolean {
    return this.alertRules.delete(ruleId);
  }

  /**
   * Get all alert rules
   */
  getAlertRules(): AlertRule[] {
    return Array.from(this.alertRules.values());
  }

  /**
   * Get active alerts
   */
  getActiveAlerts(): Alert[] {
    return Array.from(this.activeAlerts.values());
  }

  /**
   * Get resolved alerts
   */
  getResolvedAlerts(): Alert[] {
    return this.resolvedAlerts;
  }

  /**
   * Resolve an alert manually
   */
  resolveAlert(alertId: string): boolean {
    const alert = this.activeAlerts.get(alertId);
    if (!alert) return false;

    alert.resolved = new Date();
    this.activeAlerts.delete(alertId);
    this.resolvedAlerts.push(alert);

    // Keep resolved alerts list manageable
    if (this.resolvedAlerts.length > this.maxResolvedAlerts) {
      this.resolvedAlerts.shift();
    }

    this.emit('alertResolved', alert);
    return true;
  }

  /**
   * Generate metrics summary
   */
  generateMetricsSummary(timeRangeMs: number = 60 * 60 * 1000): gemini.MetricsSummary {
    const now = new Date();
    const startTime = new Date(now.getTime() - timeRangeMs);

    const metricSummaries = Array.from(this.metrics.entries()).map(([name, metric]) => {
      const recentPoints = this.getMetricData(name, startTime, now);
      
      let currentValue = 0;
      let minValue = 0;
      let maxValue = 0;
      let avgValue = 0;

      if (recentPoints.length > 0) {
        currentValue = recentPoints[recentPoints.length - 1].value;
        minValue = Math.min(...recentPoints.map(p => p.value));
        maxValue = Math.max(...recentPoints.map(p => p.value));
        avgValue = recentPoints.reduce((sum, p) => sum + p.value, 0) / recentPoints.length;
      }

      return new gemini.MetricSummary({
        name: metric.name,
        description: metric.description,
        unit: metric.unit,
        current_value: currentValue,
        min_value: minValue,
        max_value: maxValue,
        average_value: avgValue,
        data_points: recentPoints.length,
        aggregation_type: metric.aggregationType,
      });
    });

    return new gemini.MetricsSummary({
      timestamp: now.getTime(),
      time_range_ms: timeRangeMs,
      metrics: metricSummaries,
      active_alerts: this.getActiveAlerts().map(alert => new gemini.AlertInfo({
        id: alert.id,
        metric_name: alert.metricName,
        current_value: alert.currentValue,
        threshold: alert.threshold,
        condition: alert.condition,
        triggered_at: alert.triggeredAt.getTime(),
        severity: alert.severity,
        description: alert.description,
      })),
    });
  }

  /**
   * Initialize standard metrics that all sessions should track
   */
  private initializeStandardMetrics(): void {
    // Performance metrics
    this.registerMetric('response_time_ms', 'Response time in milliseconds', 'ms', 'average');
    this.registerMetric('requests_per_second', 'Requests processed per second', 'req/s', 'average');
    this.registerMetric('error_rate', 'Error rate percentage', '%', 'average');
    this.registerMetric('concurrent_sessions', 'Number of concurrent sessions', 'sessions', 'max');
    
    // Resource metrics
    this.registerMetric('memory_usage_mb', 'Memory usage in megabytes', 'MB', 'max');
    this.registerMetric('cpu_usage_percent', 'CPU usage percentage', '%', 'average');
    this.registerMetric('active_connections', 'Number of active gRPC connections', 'connections', 'max');
    
    // Business metrics
    this.registerMetric('messages_per_minute', 'Messages processed per minute', 'messages/min', 'sum');
    this.registerMetric('tool_executions_per_minute', 'Tool executions per minute', 'executions/min', 'sum');
    this.registerMetric('token_usage_per_minute', 'Token usage per minute', 'tokens/min', 'sum');
    this.registerMetric('session_duration_seconds', 'Average session duration', 'seconds', 'average');
    this.registerMetric('file_operations_per_minute', 'File operations per minute', 'operations/min', 'sum');
    this.registerMetric('context_refreshes_per_minute', 'Context refreshes per minute', 'refreshes/min', 'sum');
    this.registerMetric('files_modified_per_session', 'Files modified per session', 'files', 'sum');
    
    // Quality metrics
    this.registerMetric('tool_success_rate', 'Tool execution success rate', '%', 'average');
    this.registerMetric('user_satisfaction_score', 'User satisfaction score', 'score', 'average');
    this.registerMetric('retry_rate', 'Rate of retried operations', '%', 'average');
  }

  /**
   * Initialize default alert rules
   */
  private initializeDefaultAlerts(): void {
    this.addAlertRule({
      id: 'high_response_time',
      metricName: 'response_time_ms',
      condition: 'greater_than',
      threshold: 5000, // 5 seconds
      duration: 2 * 60 * 1000, // 2 minutes
      enabled: true,
      description: 'Response time is consistently high',
    });

    this.addAlertRule({
      id: 'high_error_rate',
      metricName: 'error_rate',
      condition: 'greater_than',
      threshold: 10, // 10%
      duration: 5 * 60 * 1000, // 5 minutes
      enabled: true,
      description: 'Error rate is above acceptable threshold',
    });

    this.addAlertRule({
      id: 'high_memory_usage',
      metricName: 'memory_usage_mb',
      condition: 'greater_than',
      threshold: 1024, // 1GB
      duration: 10 * 60 * 1000, // 10 minutes
      enabled: true,
      description: 'Memory usage is critically high',
    });

    this.addAlertRule({
      id: 'low_tool_success_rate',
      metricName: 'tool_success_rate',
      condition: 'less_than',
      threshold: 80, // 80%
      duration: 15 * 60 * 1000, // 15 minutes
      enabled: true,
      description: 'Tool execution success rate is low',
    });
  }

  /**
   * Check alert conditions
   */
  private checkAlerts(): void {
    const now = new Date();

    for (const rule of this.alertRules.values()) {
      if (!rule.enabled) continue;

      const currentValue = this.getCurrentValue(rule.metricName);
      if (currentValue === undefined) continue;

      const isConditionMet = this.evaluateCondition(currentValue, rule.condition, rule.threshold);
      
      if (isConditionMet) {
        // Check if we should trigger an alert
        const durationStart = new Date(now.getTime() - rule.duration);
        const recentPoints = this.getMetricData(rule.metricName, durationStart, now);
        
        // Check if condition has been met for the required duration
        const conditionMetForDuration = recentPoints.every(point =>
          this.evaluateCondition(point.value, rule.condition, rule.threshold)
        );

        if (conditionMetForDuration && !this.activeAlerts.has(rule.id)) {
          this.triggerAlert(rule, currentValue);
        }
      } else {
        // Condition not met, resolve alert if active
        if (this.activeAlerts.has(rule.id)) {
          this.resolveAlert(rule.id);
        }
      }
    }
  }

  /**
   * Evaluate alert condition
   */
  private evaluateCondition(value: number, condition: string, threshold: number): boolean {
    switch (condition) {
      case 'greater_than':
        return value > threshold;
      case 'less_than':
        return value < threshold;
      case 'equals':
        return value === threshold;
      case 'not_equals':
        return value !== threshold;
      default:
        return false;
    }
  }

  /**
   * Trigger an alert
   */
  private triggerAlert(rule: AlertRule, currentValue: number): void {
    const severity = this.determineSeverity(rule.metricName, currentValue, rule.threshold);
    
    const alert: Alert = {
      id: rule.id,
      ruleId: rule.id,
      metricName: rule.metricName,
      currentValue,
      threshold: rule.threshold,
      condition: rule.condition,
      triggeredAt: new Date(),
      description: rule.description,
      severity,
    };

    this.activeAlerts.set(alert.id, alert);
    rule.lastTriggered = new Date();

    this.emit('alertTriggered', alert);
  }

  /**
   * Determine alert severity based on how far the value exceeds the threshold
   */
  private determineSeverity(metricName: string, currentValue: number, threshold: number): 'low' | 'medium' | 'high' | 'critical' {
    const ratio = Math.abs(currentValue - threshold) / threshold;

    // Critical system metrics
    if (metricName.includes('memory') || metricName.includes('cpu')) {
      if (ratio > 0.5) return 'critical';
      if (ratio > 0.3) return 'high';
      if (ratio > 0.1) return 'medium';
      return 'low';
    }

    // Performance metrics
    if (metricName.includes('response_time') || metricName.includes('error_rate')) {
      if (ratio > 2.0) return 'critical';
      if (ratio > 1.0) return 'high';
      if (ratio > 0.5) return 'medium';
      return 'low';
    }

    // Default severity determination
    if (ratio > 1.0) return 'high';
    if (ratio > 0.5) return 'medium';
    return 'low';
  }

  /**
   * Clean up old data
   */
  private cleanupOldData(): void {
    const cutoff = new Date(Date.now() - this.defaultRetentionMs);

    // Clean up old metric points
    for (const metric of this.metrics.values()) {
      metric.points = metric.points.filter(point => point.timestamp > cutoff);
    }

    // Clean up old resolved alerts
    this.resolvedAlerts = this.resolvedAlerts.filter(alert => 
      (alert.resolved || alert.triggeredAt) > cutoff
    );
  }
}