# Multi-User Sandbox Configuration Guide

## Overview

This guide focuses on configuring Gemini CLI sandboxes for multi-user environments where each user needs isolated, secure access to Gemini capabilities through your platform.

## Architecture for Multi-User Scenarios

### Container Naming Strategy

Each user gets a uniquely named container to prevent conflicts:

```go
// Container naming pattern
containerName := fmt.Sprintf("gemini-%s-%s-%d", 
    environment,  // "prod", "dev", "staging"
    userID,       // Unique user identifier
    timestamp,    // Unix timestamp for uniqueness
)
// Example: gemini-prod-user123-1704061200
```

### User Isolation Model

```
┌─────────────────────────────────────────────┐
│              Host System                     │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────┐  ┌─────────────┐         │
│  │  User A     │  │  User B     │  ...    │
│  │  Container  │  │  Container  │         │
│  │             │  │             │         │
│  │ /workspace  │  │ /workspace  │         │
│  │   └─ A/    │  │   └─ B/    │         │
│  └─────────────┘  └─────────────┘         │
│                                             │
└─────────────────────────────────────────────┘
```

## Container Lifecycle Management

### 1. Per-User Container Creation

```bash
#!/bin/bash
# create-user-container.sh

USER_ID="$1"
API_KEY="$2"
WORKSPACE="/data/users/$USER_ID/workspace"

# Create user workspace
mkdir -p "$WORKSPACE"
chown -R 1001:1001 "$WORKSPACE"

# Launch container with user-specific configuration
# Option 1: Interactive mode for multiple prompts via stdin
docker run -d \
  --name "gemini-user-${USER_ID}" \
  --rm \
  -i \  # Interactive flag - CLI auto-detects non-interactive mode
  -m 2g \
  --cpus="1.0" \
  --pids-limit 100 \
  -v "${WORKSPACE}:/workspace:rw" \
  -v "/data/shared/templates:/templates:ro" \
  -e "GEMINI_API_KEY=${API_KEY}" \
  -e "USER_ID=${USER_ID}" \
  -e "SANDBOX=gemini-user-${USER_ID}" \
  --network none \
  gemini-cli-sandbox:latest

# Option 2: Single prompt execution
docker run \
  --name "gemini-user-${USER_ID}" \
  --rm \
  -m 2g \
  --cpus="1.0" \
  --pids-limit 100 \
  -v "${WORKSPACE}:/workspace:rw" \
  -e "GEMINI_API_KEY=${API_KEY}" \
  --network none \
  gemini-cli-sandbox:latest \
  gemini --prompt "Analyze this code"
```

### 2. Container Pool Management

```go
// ContainerPool manages a pool of pre-warmed containers
type ContainerPool struct {
    mu sync.Mutex
    available map[string][]*Container  // key: configuration hash
    inUse map[string]*Container        // key: userID
    maxPoolSize int
}

func (p *ContainerPool) GetContainer(userID, apiKey string) (*Container, error) {
    p.mu.Lock()
    defer p.mu.Unlock()
    
    // Check if user already has a container
    if container, exists := p.inUse[userID]; exists {
        return container, nil
    }
    
    // Get from pool or create new
    configHash := hashConfig(apiKey)
    if containers, ok := p.available[configHash]; ok && len(containers) > 0 {
        container := containers[0]
        p.available[configHash] = containers[1:]
        
        // Reconfigure for specific user
        container.UserID = userID
        p.inUse[userID] = container
        
        return container, nil
    }
    
    // Create new container
    container, err := createUserContainer(userID, apiKey)
    if err != nil {
        return nil, err
    }
    
    p.inUse[userID] = container
    return container, nil
}

func (p *ContainerPool) ReleaseContainer(userID string) {
    p.mu.Lock()
    defer p.mu.Unlock()
    
    container, exists := p.inUse[userID]
    if !exists {
        return
    }
    
    delete(p.inUse, userID)
    
    // Clean and return to pool
    if err := container.Reset(); err == nil {
        configHash := hashConfig(container.APIKey)
        p.available[configHash] = append(p.available[configHash], container)
        
        // Trim pool if too large
        if len(p.available[configHash]) > p.maxPoolSize {
            excess := p.available[configHash][p.maxPoolSize:]
            p.available[configHash] = p.available[configHash][:p.maxPoolSize]
            
            // Stop excess containers
            for _, c := range excess {
                c.Stop()
            }
        }
    } else {
        // Container corrupted, destroy it
        container.Stop()
    }
}
```

### 3. Session Management

```go
// UserSession tracks active user sessions
type UserSession struct {
    UserID       string
    Container    *Container
    LastActivity time.Time
    Timeout      time.Duration
}

type SessionManager struct {
    sessions sync.Map
    pool     *ContainerPool
}

func (sm *SessionManager) GetOrCreateSession(userID, apiKey string) (*UserSession, error) {
    // Try to get existing session
    if val, ok := sm.sessions.Load(userID); ok {
        session := val.(*UserSession)
        session.LastActivity = time.Now()
        return session, nil
    }
    
    // Create new session
    container, err := sm.pool.GetContainer(userID, apiKey)
    if err != nil {
        return nil, err
    }
    
    session := &UserSession{
        UserID:       userID,
        Container:    container,
        LastActivity: time.Now(),
        Timeout:      30 * time.Minute,
    }
    
    sm.sessions.Store(userID, session)
    
    // Start timeout monitor
    go sm.monitorSession(session)
    
    return session, nil
}

func (sm *SessionManager) monitorSession(session *UserSession) {
    ticker := time.NewTicker(1 * time.Minute)
    defer ticker.Stop()
    
    for range ticker.C {
        if time.Since(session.LastActivity) > session.Timeout {
            sm.EndSession(session.UserID)
            return
        }
    }
}
```

## Security Hardening for Multi-User

### 1. Network Isolation

```yaml
# docker-compose.yml for isolated networks
version: '3.8'

networks:
  # Each user gets their own network
  user_${USER_ID}_net:
    driver: bridge
    internal: true
    ipam:
      config:
        - subnet: "172.20.${USER_SUBNET}.0/24"

services:
  gemini_user_${USER_ID}:
    image: gemini-cli-sandbox:latest
    container_name: gemini-user-${USER_ID}
    networks:
      - user_${USER_ID}_net
    sysctls:
      - net.ipv4.ip_unprivileged_port_start=0
    security_opt:
      - no-new-privileges:true
      - apparmor:docker-default
      - seccomp:default.json
```

### 2. File System Isolation

```dockerfile
# Multi-user Dockerfile additions
FROM gemini-cli-sandbox:base AS multiuser

# Create isolated user directories
RUN for i in $(seq 1 100); do \
      useradd -m -u $((1000 + $i)) -s /bin/false user$i; \
    done

# Set up quotas
RUN apt-get update && apt-get install -y quota quotatool

# Configure user namespaces
RUN echo "user.max_user_namespaces=1000" >> /etc/sysctl.conf
```

### 3. Resource Quotas

```go
// ResourceManager enforces per-user limits
type ResourceManager struct {
    limits map[string]ResourceLimits
}

type ResourceLimits struct {
    MaxContainers   int
    MaxCPU         float64
    MaxMemory      int64
    MaxStorage     int64
    MaxBandwidth   int64
}

func (rm *ResourceManager) CheckUserLimits(userID string, requested Resources) error {
    limits := rm.getUserLimits(userID)
    current := rm.getCurrentUsage(userID)
    
    if current.Containers + 1 > limits.MaxContainers {
        return fmt.Errorf("container limit exceeded for user %s", userID)
    }
    
    if current.CPU + requested.CPU > limits.MaxCPU {
        return fmt.Errorf("CPU limit exceeded for user %s", userID)
    }
    
    if current.Memory + requested.Memory > limits.MaxMemory {
        return fmt.Errorf("memory limit exceeded for user %s", userID)
    }
    
    return nil
}
```

## API Key Management

### 1. Per-User API Keys

```go
// APIKeyManager handles secure key storage and rotation
type APIKeyManager struct {
    vault VaultClient
}

func (akm *APIKeyManager) GetUserAPIKey(userID string) (string, error) {
    // Retrieve from secure vault
    path := fmt.Sprintf("secret/gemini/users/%s/api-key", userID)
    secret, err := akm.vault.Read(path)
    if err != nil {
        return "", err
    }
    
    apiKey := secret.Data["key"].(string)
    
    // Check if rotation needed
    if akm.shouldRotate(secret) {
        newKey, err := akm.rotateKey(userID)
        if err != nil {
            return apiKey, nil // Use old key if rotation fails
        }
        return newKey, nil
    }
    
    return apiKey, nil
}

func (akm *APIKeyManager) InjectAPIKey(container *Container, apiKey string) error {
    // Inject as environment variable
    return container.SetEnv("GEMINI_API_KEY", apiKey)
}
```

### 2. Key Isolation

```bash
# Never share API keys between users
docker run \
  --env GEMINI_API_KEY_USER_${USER_ID}="${API_KEY}" \
  --env GEMINI_API_KEY="${API_KEY}" \
  gemini-cli-sandbox:latest
```

## Scaling Strategies

### 1. Horizontal Scaling

```yaml
# Kubernetes StatefulSet for user containers
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: gemini-user-containers
spec:
  serviceName: gemini-users
  replicas: 100
  selector:
    matchLabels:
      app: gemini-user
  template:
    metadata:
      labels:
        app: gemini-user
    spec:
      containers:
      - name: gemini
        image: gemini-cli-sandbox:latest
        env:
        - name: USER_ID
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        volumeMounts:
        - name: workspace
          mountPath: /workspace
  volumeClaimTemplates:
  - metadata:
      name: workspace
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
```

### 2. Dynamic Scaling

```go
// AutoScaler manages container lifecycle based on demand
type AutoScaler struct {
    minContainers int
    maxContainers int
    scaleUpThreshold float64
    scaleDownThreshold float64
}

func (as *AutoScaler) evaluateScaling(metrics Metrics) ScaleAction {
    utilization := metrics.ActiveContainers / float64(metrics.TotalContainers)
    
    if utilization > as.scaleUpThreshold {
        return ScaleUp{
            Count: int(math.Ceil(metrics.ActiveContainers * 0.2)),
        }
    }
    
    if utilization < as.scaleDownThreshold {
        return ScaleDown{
            Count: int(math.Floor(metrics.TotalContainers * 0.1)),
        }
    }
    
    return NoScale{}
}
```

## Monitoring Multi-User Environments

### 1. Per-User Metrics

```go
// UserMetrics tracks individual user usage
type UserMetrics struct {
    UserID           string
    ContainersUsed   int
    CPUSeconds       float64
    MemoryGBSeconds  float64
    StorageGBHours   float64
    APICallsCount    int64
    TokensUsed       int64
}

func (m *MetricsCollector) CollectUserMetrics(userID string) UserMetrics {
    containers := m.getUserContainers(userID)
    
    metrics := UserMetrics{UserID: userID}
    
    for _, container := range containers {
        stats := container.GetStats()
        metrics.CPUSeconds += stats.CPUUsage
        metrics.MemoryGBSeconds += stats.MemoryUsage * stats.Duration
        metrics.ContainersUsed++
    }
    
    return metrics
}
```

### 2. Aggregate Monitoring

```yaml
# Prometheus rules for multi-user monitoring
groups:
  - name: gemini_multiuser
    rules:
    - alert: HighUserContainerCount
      expr: count by (user_id) (up{job="gemini-container"}) > 5
      for: 5m
      annotations:
        summary: "User {{ $labels.user_id }} has too many containers"
    
    - alert: UserResourceQuotaExceeded
      expr: sum by (user_id) (container_memory_usage_bytes) > 10737418240
      for: 1m
      annotations:
        summary: "User {{ $labels.user_id }} exceeding memory quota"
```

## Best Practices for Multi-User Deployments

### 1. Container Naming Conventions

```go
// Consistent naming for easier management
func GenerateContainerName(env, userID string, purpose string) string {
    return fmt.Sprintf("gemini-%s-%s-%s-%d",
        env,                          // Environment: prod, dev, staging
        userID,                       // User identifier
        purpose,                      // Purpose: chat, analysis, etc
        time.Now().Unix() % 10000,    // Rotation suffix
    )
}
```

### 2. Cleanup Policies

```go
// CleanupManager removes idle containers
func (cm *CleanupManager) CleanupIdleContainers() {
    containers := cm.docker.ListContainers()
    
    for _, container := range containers {
        if cm.isGeminiContainer(container) {
            idleTime := time.Since(container.LastActivity)
            
            if idleTime > cm.maxIdleTime {
                log.Printf("Removing idle container: %s (idle: %v)", 
                    container.Name, idleTime)
                cm.docker.RemoveContainer(container.ID)
            }
        }
    }
}
```

### 3. Rate Limiting

```go
// RateLimiter prevents abuse
type UserRateLimiter struct {
    limits map[string]*rate.Limiter
    mu     sync.RWMutex
}

func (rl *UserRateLimiter) Allow(userID string) bool {
    rl.mu.Lock()
    limiter, exists := rl.limits[userID]
    if !exists {
        // 10 requests per minute per user
        limiter = rate.NewLimiter(rate.Every(6*time.Second), 10)
        rl.limits[userID] = limiter
    }
    rl.mu.Unlock()
    
    return limiter.Allow()
}
```

## Troubleshooting Multi-User Issues

### 1. Container Conflicts

```bash
# Find containers for specific user
docker ps -a --filter "name=gemini-.*-user123-.*"

# Clean up stale containers
docker rm $(docker ps -a -q --filter "name=gemini-.*-user123-.*")
```

### 2. Resource Exhaustion

```bash
# Check per-user resource usage
docker stats --filter "name=gemini-"

# Find resource hogs
docker ps --format "table {{.Names}}\t{{.CPUPerc}}\t{{.MemUsage}}" \
  --filter "name=gemini-" | sort -k2 -hr
```

### 3. Debugging User Sessions

```go
// SessionDebugger provides insights into user sessions
func (sd *SessionDebugger) GetUserSessionInfo(userID string) SessionInfo {
    session := sd.sessionManager.GetSession(userID)
    
    return SessionInfo{
        UserID:        userID,
        ContainerID:   session.Container.ID,
        Created:       session.Created,
        LastActivity:  session.LastActivity,
        State:         session.State,
        ResourceUsage: session.Container.GetResourceUsage(),
        Errors:        session.GetRecentErrors(),
    }
}
```

## Security Audit Checklist

- [ ] Each user has isolated workspace
- [ ] API keys are unique per user
- [ ] Network isolation between users
- [ ] Resource limits enforced
- [ ] Container names include user ID
- [ ] Audit logs capture user actions
- [ ] Regular cleanup of idle containers
- [ ] Monitoring alerts configured
- [ ] Rate limiting implemented
- [ ] Backup strategy for user data

## Next Steps

1. Review [Backend Integration Guide](./backend-go.md) for implementation details
2. See [Docker Sandbox Configuration](./docker-sandbox.md) for base setup
3. Implement monitoring using provided metrics
4. Set up automated testing for multi-user scenarios
5. Configure backup and disaster recovery