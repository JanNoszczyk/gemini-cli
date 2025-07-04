# Monitoring Integration Guide

Comprehensive guide to monitoring engineer activity and system performance in the Gemini Server.

## Overview

The Gemini Server provides extensive monitoring capabilities designed to track all engineer interactions with the system, from chat conversations to tool executions. This enables:

- **Real-time Activity Tracking**: Monitor engineer interactions as they happen
- **Audit Trails**: Complete history of all actions for compliance
- **Performance Metrics**: System usage and performance analytics
- **Security Monitoring**: Detect unusual patterns or security issues

## Monitoring Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│    Engineers    │────▶│  Gemini Server   │────▶│ Monitoring DB   │
│   (Activity)    │     │  (Event Capture) │     │  (Storage)      │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │ Real-time Stream │
                        │   (WebSocket)    │
                        └──────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │ Monitoring       │
                        │ Dashboard        │
                        └──────────────────┘
```

## Event Types

### Chat Events

Capture all chat interactions between engineers and Gemini.

**Event Structure:**
```json
{
  "id": "event_123456",
  "sessionId": "session_abc123",
  "userId": "user_eng001",
  "type": "chat",
  "event": "message",
  "data": {
    "userMessage": "How do I implement authentication?",
    "assistantResponse": "Here's how to implement authentication...",
    "messageLength": 37,
    "responseLength": 245,
    "tokensUsed": 156,
    "model": "gemini-2.0-flash-exp",
    "duration": 2340
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Tool Execution Events

Track all tool usage for security and audit purposes.

**Event Structure:**
```json
{
  "id": "event_789012",
  "sessionId": "session_abc123",
  "userId": "user_eng001",
  "type": "tool",
  "event": "execution",
  "data": {
    "toolName": "shell",
    "args": {
      "command": "ls -la /workspace"
    },
    "result": "success",
    "output": "total 8\ndrwxr-xr-x 3 user user...",
    "executionTime": 89,
    "exitCode": 0
  },
  "timestamp": "2024-01-01T12:01:00.000Z"
}
```

### Session Events

Monitor session lifecycle and resource usage.

**Event Structure:**
```json
{
  "id": "event_345678",
  "sessionId": "session_abc123",
  "userId": "user_eng001",
  "type": "session",
  "event": "created",
  "data": {
    "config": {
      "model": "gemini-2.0-flash-exp",
      "debugMode": false
    },
    "workspaceSize": 0,
    "expiresAt": "2024-01-02T12:00:00.000Z"
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Error Events

Capture all errors for debugging and security analysis.

**Event Structure:**
```json
{
  "id": "event_901234",
  "sessionId": "session_abc123",
  "userId": "user_eng001",
  "type": "error",
  "event": "error",
  "data": {
    "errorType": "ToolExecutionError",
    "message": "Permission denied: cannot access /etc/passwd",
    "stack": "Error: Permission denied...",
    "context": {
      "toolName": "readFile",
      "args": { "path": "/etc/passwd" }
    }
  },
  "timestamp": "2024-01-01T12:02:00.000Z"
}
```

## Real-time Monitoring

### WebSocket Event Stream

Connect to the real-time monitoring stream to receive all events as they occur.

**Connection (Admin Only):**
```javascript
const monitoringSocket = io('http://localhost:3000', {
  auth: { token: adminJwtToken }
});

// Subscribe to monitoring events
monitoringSocket.emit('monitoring:subscribe');

// Receive all events in real-time
monitoringSocket.on('monitoring:event', (event) => {
  console.log('New activity:', event);
  
  switch (event.type) {
    case 'chat':
      handleChatEvent(event);
      break;
    case 'tool':
      handleToolEvent(event);
      break;
    case 'session':
      handleSessionEvent(event);
      break;
    case 'error':
      handleErrorEvent(event);
      break;
  }
});
```

### Server-Sent Events (REST)

Alternative to WebSocket for monitoring integration.

```bash
# Stream all events
curl -N -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:3000/api/v1/monitoring/stream
```

```
data: {"type":"connected"}
data: {"id":"event_123","type":"chat","userId":"user_eng001","event":"message","timestamp":"2024-01-01T12:00:00.000Z"}
data: {"id":"event_124","type":"tool","userId":"user_eng001","event":"execution","timestamp":"2024-01-01T12:01:00.000Z"}
```

## Historical Data Access

### REST API Endpoints

**Get Recent Events:**
```bash
# All events (admin only)
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  "http://localhost:3000/api/v1/monitoring/events?limit=100"

# Events for specific user
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  "http://localhost:3000/api/v1/monitoring/events?userId=user_eng001&limit=50"

# Events for specific session
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/v1/monitoring/events?sessionId=session_abc123"
```

**Get Activity Statistics:**
```bash
# Overall statistics (admin only)
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:3000/api/v1/monitoring/stats

# User-specific statistics
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  "http://localhost:3000/api/v1/monitoring/stats?userId=user_eng001"
```

**Example Statistics Response:**
```json
{
  "stats": {
    "totalEvents": 1547,
    "timeRange": {
      "start": "2024-01-01T00:00:00.000Z",
      "end": "2024-01-01T23:59:59.000Z"
    },
    "byType": {
      "chat": 1200,
      "tool": 287,
      "session": 45,
      "error": 15
    },
    "byUser": {
      "user_eng001": 456,
      "user_eng002": 398,
      "user_eng003": 693
    },
    "topTools": {
      "readFile": 89,
      "shell": 67,
      "writeFile": 45,
      "grep": 38,
      "edit": 32
    },
    "errorRate": 0.97,
    "averageSessionDuration": 1847,
    "tokensUsed": 234567
  }
}
```

## External Integration

### Webhook Integration

Configure the server to send events to external monitoring systems.

**Environment Configuration:**
```bash
MONITORING_ENABLED=true
MONITORING_ENDPOINT=https://your-monitoring-system.com/api/events
MONITORING_API_KEY=your-monitoring-api-key
```

**Event Payload:**
```json
{
  "source": "gemini-server",
  "version": "1.0.0",
  "event": {
    "id": "event_123456",
    "sessionId": "session_abc123",
    "userId": "user_eng001",
    "type": "chat",
    "event": "message",
    "data": { /* event data */ },
    "timestamp": "2024-01-01T12:00:00.000Z"
  },
  "metadata": {
    "serverInstance": "gemini-server-01",
    "environment": "production"
  }
}
```

### Database Integration

For high-volume environments, integrate with dedicated monitoring databases.

**PostgreSQL Schema:**
```sql
CREATE TABLE monitoring_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id VARCHAR(255) NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  event_name VARCHAR(100) NOT NULL,
  event_data JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_monitoring_events_user_id ON monitoring_events(user_id);
CREATE INDEX idx_monitoring_events_session_id ON monitoring_events(session_id);
CREATE INDEX idx_monitoring_events_timestamp ON monitoring_events(timestamp);
CREATE INDEX idx_monitoring_events_type ON monitoring_events(event_type);
```

**Integration Code:**
```javascript
const { Pool } = require('pg');

class DatabaseMonitoringIntegration {
  constructor(connectionString) {
    this.pool = new Pool({ connectionString });
  }

  async saveEvent(event) {
    const query = `
      INSERT INTO monitoring_events 
      (event_id, session_id, user_id, event_type, event_name, event_data, timestamp)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    
    await this.pool.query(query, [
      event.id,
      event.sessionId,
      event.userId,
      event.type,
      event.event,
      JSON.stringify(event.data),
      event.timestamp
    ]);
  }

  async getEventStats(userId, startDate, endDate) {
    const query = `
      SELECT 
        event_type,
        COUNT(*) as count,
        AVG(CASE WHEN event_data->>'duration' IS NOT NULL 
            THEN (event_data->>'duration')::numeric END) as avg_duration
      FROM monitoring_events 
      WHERE user_id = $1 
        AND timestamp BETWEEN $2 AND $3
      GROUP BY event_type
    `;
    
    return await this.pool.query(query, [userId, startDate, endDate]);
  }
}
```

## Monitoring Dashboard Examples

### Real-time Activity Dashboard

```javascript
class ActivityDashboard {
  constructor(container) {
    this.container = container;
    this.socket = io('/monitoring', { auth: { token: adminToken } });
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.socket.emit('monitoring:subscribe');
    
    this.socket.on('monitoring:event', (event) => {
      this.displayEvent(event);
      this.updateMetrics(event);
    });
  }

  displayEvent(event) {
    const eventElement = document.createElement('div');
    eventElement.className = `event event-${event.type}`;
    eventElement.innerHTML = `
      <div class="event-header">
        <span class="user">${event.userId}</span>
        <span class="type">${event.type}</span>
        <span class="time">${new Date(event.timestamp).toLocaleTimeString()}</span>
      </div>
      <div class="event-details">
        ${this.formatEventData(event)}
      </div>
    `;
    
    this.container.prepend(eventElement);
    
    // Keep only last 100 events
    while (this.container.children.length > 100) {
      this.container.removeChild(this.container.lastChild);
    }
  }

  formatEventData(event) {
    switch (event.type) {
      case 'chat':
        return `<strong>Message:</strong> ${event.data.userMessage}`;
      case 'tool':
        return `<strong>Tool:</strong> ${event.data.toolName} - ${event.data.result}`;
      case 'session':
        return `<strong>Session:</strong> ${event.event}`;
      case 'error':
        return `<strong>Error:</strong> ${event.data.message}`;
      default:
        return JSON.stringify(event.data);
    }
  }
}
```

### Activity Analytics

```python
import requests
import pandas as pd
import matplotlib.pyplot as plt

class GeminiAnalytics:
    def __init__(self, base_url, admin_token):
        self.base_url = base_url
        self.headers = {'Authorization': f'Bearer {admin_token}'}

    def get_user_activity(self, user_id, days=7):
        """Get user activity for the last N days"""
        response = requests.get(
            f"{self.base_url}/api/v1/monitoring/events",
            headers=self.headers,
            params={'userId': user_id, 'limit': 1000}
        )
        return response.json()['events']

    def analyze_tool_usage(self, events):
        """Analyze tool usage patterns"""
        tool_events = [e for e in events if e['type'] == 'tool']
        
        # Create DataFrame
        df = pd.DataFrame([
            {
                'tool': e['data']['toolName'],
                'success': e['data']['result'] == 'success',
                'execution_time': e['data'].get('executionTime', 0),
                'timestamp': pd.to_datetime(e['timestamp'])
            }
            for e in tool_events
        ])

        # Analysis
        tool_usage = df.groupby('tool').agg({
            'tool': 'count',
            'success': 'mean',
            'execution_time': 'mean'
        }).round(2)

        return tool_usage

    def plot_activity_timeline(self, events):
        """Plot activity over time"""
        df = pd.DataFrame(events)
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        df['hour'] = df['timestamp'].dt.hour
        
        hourly_activity = df.groupby(['hour', 'type']).size().unstack(fill_value=0)
        
        hourly_activity.plot(kind='bar', stacked=True, figsize=(12, 6))
        plt.title('Activity by Hour and Type')
        plt.xlabel('Hour of Day')
        plt.ylabel('Number of Events')
        plt.legend(title='Event Type')
        plt.show()
```

## Security and Privacy

### Data Protection

**PII Handling:**
- User messages are logged for monitoring but can be configured to exclude sensitive data
- API keys and tokens are never logged
- File contents are not logged unless specifically enabled

**Access Controls:**
- Monitoring data access requires admin role
- Users can only view their own activity data
- API endpoints enforce strict authorization

**Data Retention:**
```bash
# Configure data retention policies
MONITORING_RETENTION_DAYS=30
MONITORING_CLEANUP_INTERVAL=24h
```

### Compliance Features

**GDPR Compliance:**
- Data export capabilities for user requests
- Data deletion on user account removal
- Consent tracking for monitoring

**SOX/Audit Compliance:**
- Immutable event logs
- Complete audit trails
- Administrative action logging

## Performance Considerations

### High-Volume Deployments

**Event Batching:**
```javascript
class BatchedMonitoringService {
  constructor() {
    this.eventBuffer = [];
    this.batchSize = 100;
    this.flushInterval = 5000; // 5 seconds
    
    setInterval(() => this.flush(), this.flushInterval);
  }

  logEvent(event) {
    this.eventBuffer.push(event);
    
    if (this.eventBuffer.length >= this.batchSize) {
      this.flush();
    }
  }

  async flush() {
    if (this.eventBuffer.length === 0) return;
    
    const events = this.eventBuffer.splice(0);
    await this.sendEventsToDatabase(events);
  }
}
```

**Database Optimization:**
- Partition tables by date for efficient queries
- Use appropriate indexes for common query patterns
- Consider time-series databases for high-volume scenarios

**Memory Management:**
```javascript
// Limit in-memory event storage
const MAX_EVENTS_IN_MEMORY = 10000;

if (this.events.length > MAX_EVENTS_IN_MEMORY) {
  this.events = this.events.slice(-MAX_EVENTS_IN_MEMORY);
}
```

## Alerting and Notifications

### Error Rate Monitoring

```javascript
class AlertingService {
  constructor() {
    this.errorThreshold = 0.05; // 5% error rate
    this.checkInterval = 60000; // 1 minute
    
    setInterval(() => this.checkErrorRate(), this.checkInterval);
  }

  async checkErrorRate() {
    const stats = await monitoringService.getRecentStats(60000); // Last minute
    const errorRate = stats.errors / stats.total;
    
    if (errorRate > this.errorThreshold) {
      await this.sendAlert({
        type: 'error_rate',
        message: `Error rate exceeded threshold: ${errorRate.toFixed(2)}%`,
        threshold: this.errorThreshold,
        actual: errorRate
      });
    }
  }

  async sendAlert(alert) {
    // Send to monitoring system
    await fetch(process.env.ALERT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert)
    });
  }
}
```

### Unusual Activity Detection

```javascript
class AnomalyDetector {
  detectUnusualActivity(userId, recentEvents) {
    const alerts = [];
    
    // Check for unusual tool usage
    const toolUsage = this.getToolUsagePattern(recentEvents);
    if (this.isUnusualToolPattern(toolUsage)) {
      alerts.push({
        type: 'unusual_tools',
        message: 'Unusual tool usage pattern detected',
        userId,
        data: toolUsage
      });
    }
    
    // Check for high error rate
    const errorRate = this.calculateErrorRate(recentEvents);
    if (errorRate > 0.1) { // 10% error rate
      alerts.push({
        type: 'high_errors',
        message: 'High error rate detected',
        userId,
        errorRate
      });
    }
    
    return alerts;
  }
}
```