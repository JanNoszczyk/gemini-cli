# Go Backend Integration Guide

## Overview

This guide provides detailed implementation patterns for integrating Gemini CLI into a Go backend service. It covers container management, stream processing, API design, and production-ready patterns.

## Core Components

### 1. Gemini Sandbox Manager

```go
package gemini

import (
    "bufio"
    "bytes"
    "context"
    "encoding/json"
    "fmt"
    "io"
    "os/exec"
    "sync"
    "time"
)

// SandboxManager handles Docker container lifecycle for Gemini CLI
type SandboxManager struct {
    dockerCommand string
    imageName     string
    poolSize      int
    containerPool chan *Container
    mu            sync.RWMutex
    activeContainers map[string]*Container
}

// Container represents a running Gemini CLI container
type Container struct {
    ID        string
    Name      string
    UserID    string
    Workspace string
    cmd       *exec.Cmd
    stdin     io.WriteCloser
    stdout    io.ReadCloser
    stderr    io.ReadCloser
    created   time.Time
}

// NewSandboxManager creates a new sandbox manager
func NewSandboxManager(imageName string, poolSize int) *SandboxManager {
    return &SandboxManager{
        dockerCommand:    detectDockerCommand(),
        imageName:        imageName,
        poolSize:         poolSize,
        containerPool:    make(chan *Container, poolSize),
        activeContainers: make(map[string]*Container),
    }
}

func detectDockerCommand() string {
    if _, err := exec.LookPath("docker"); err == nil {
        return "docker"
    }
    if _, err := exec.LookPath("podman"); err == nil {
        return "podman"
    }
    panic("Neither docker nor podman found in PATH")
}
```

### 2. Container Lifecycle Management

```go
// CreateContainer spawns a new Gemini CLI container for a user
func (sm *SandboxManager) CreateContainer(ctx context.Context, userID, workspace, apiKey string) (*Container, error) {
    containerName := fmt.Sprintf("gemini-user-%s-%d", userID, time.Now().Unix())
    
    args := []string{
        "run",
        "--rm",                    // Auto-remove on exit
        "-i",                      // Interactive (stdin)
        "--name", containerName,
        "--workdir", "/workspace",
        "--volume", fmt.Sprintf("%s:/workspace:rw", workspace),
        "--env", fmt.Sprintf("GEMINI_API_KEY=%s", apiKey),
        "--memory", "2g",          // Memory limit
        "--cpus", "1.0",          // CPU limit
        "--pids-limit", "100",    // Process limit
        "--network", "none",      // Network isolation (optional)
        sm.imageName,
        "gemini", "--non-interactive",
    }
    
    cmd := exec.CommandContext(ctx, sm.dockerCommand, args...)
    
    // Set up pipes
    stdin, err := cmd.StdinPipe()
    if err != nil {
        return nil, fmt.Errorf("stdin pipe: %w", err)
    }
    
    stdout, err := cmd.StdoutPipe()
    if err != nil {
        return nil, fmt.Errorf("stdout pipe: %w", err)
    }
    
    stderr, err := cmd.StderrPipe()
    if err != nil {
        return nil, fmt.Errorf("stderr pipe: %w", err)
    }
    
    // Start container
    if err := cmd.Start(); err != nil {
        return nil, fmt.Errorf("start container: %w", err)
    }
    
    container := &Container{
        ID:        containerName,
        Name:      containerName,
        UserID:    userID,
        Workspace: workspace,
        cmd:       cmd,
        stdin:     stdin,
        stdout:    stdout,
        stderr:    stderr,
        created:   time.Now(),
    }
    
    // Track active container
    sm.mu.Lock()
    sm.activeContainers[containerName] = container
    sm.mu.Unlock()
    
    // Monitor container lifecycle
    go sm.monitorContainer(container)
    
    return container, nil
}

// monitorContainer watches for container exit and cleanup
func (sm *SandboxManager) monitorContainer(container *Container) {
    container.cmd.Wait()
    
    sm.mu.Lock()
    delete(sm.activeContainers, container.Name)
    sm.mu.Unlock()
    
    // Log container exit
    log.Printf("Container %s exited for user %s", container.Name, container.UserID)
}

// StopContainer gracefully stops a container
func (sm *SandboxManager) StopContainer(containerID string) error {
    sm.mu.RLock()
    container, exists := sm.activeContainers[containerID]
    sm.mu.RUnlock()
    
    if !exists {
        return fmt.Errorf("container %s not found", containerID)
    }
    
    // Close stdin to signal EOF
    container.stdin.Close()
    
    // Give container time to exit gracefully
    done := make(chan error, 1)
    go func() {
        done <- container.cmd.Wait()
    }()
    
    select {
    case <-done:
        return nil
    case <-time.After(5 * time.Second):
        // Force kill if not exited
        return container.cmd.Process.Kill()
    }
}
```

### 3. Stream Processing

```go
// GeminiEvent represents an event from the Gemini CLI
type GeminiEvent struct {
    Type    string          `json:"type"`
    Content json.RawMessage `json:"content"`
}

// StreamProcessor handles bidirectional communication with Gemini CLI
type StreamProcessor struct {
    container *Container
    events    chan GeminiEvent
    errors    chan error
    done      chan struct{}
}

// NewStreamProcessor creates a processor for container I/O
func NewStreamProcessor(container *Container) *StreamProcessor {
    sp := &StreamProcessor{
        container: container,
        events:    make(chan GeminiEvent, 100),
        errors:    make(chan error, 10),
        done:      make(chan struct{}),
    }
    
    // Start processing stdout
    go sp.processStdout()
    
    // Start processing stderr
    go sp.processStderr()
    
    return sp
}

// processStdout reads and parses output from Gemini CLI
func (sp *StreamProcessor) processStdout() {
    scanner := bufio.NewScanner(sp.container.stdout)
    scanner.Buffer(make([]byte, 1024*1024), 1024*1024) // 1MB buffer
    
    for scanner.Scan() {
        line := scanner.Text()
        
        // Try to parse as JSON event
        var event GeminiEvent
        if err := json.Unmarshal([]byte(line), &event); err == nil {
            select {
            case sp.events <- event:
            case <-sp.done:
                return
            }
        } else {
            // Plain text output
            select {
            case sp.events <- GeminiEvent{
                Type:    "content",
                Content: json.RawMessage(fmt.Sprintf(`{"text":%q}`, line)),
            }:
            case <-sp.done:
                return
            }
        }
    }
    
    if err := scanner.Err(); err != nil {
        select {
        case sp.errors <- fmt.Errorf("stdout scan: %w", err):
        case <-sp.done:
        }
    }
}

// processStderr captures error output
func (sp *StreamProcessor) processStderr() {
    scanner := bufio.NewScanner(sp.container.stderr)
    
    for scanner.Scan() {
        line := scanner.Text()
        select {
        case sp.errors <- fmt.Errorf("stderr: %s", line):
        case <-sp.done:
            return
        }
    }
}

// SendPrompt sends a user prompt to Gemini CLI
func (sp *StreamProcessor) SendPrompt(prompt string) error {
    _, err := fmt.Fprintf(sp.container.stdin, "%s\n", prompt)
    return err
}

// Close stops the stream processor
func (sp *StreamProcessor) Close() {
    close(sp.done)
    sp.container.stdin.Close()
}
```

### 4. HTTP API Handler

```go
// GeminiHandler handles HTTP requests for Gemini interactions
type GeminiHandler struct {
    sandboxManager *SandboxManager
    sessions       sync.Map // userID -> *UserSession
}

// UserSession tracks a user's Gemini session
type UserSession struct {
    UserID    string
    Container *Container
    Processor *StreamProcessor
    LastUsed  time.Time
    mu        sync.Mutex
}

// HandleStreamRequest handles SSE streaming requests
func (h *GeminiHandler) HandleStreamRequest(w http.ResponseWriter, r *http.Request) {
    userID := getUserID(r) // Extract from auth token
    prompt := r.FormValue("prompt")
    
    if prompt == "" {
        http.Error(w, "prompt required", http.StatusBadRequest)
        return
    }
    
    // Set up SSE
    w.Header().Set("Content-Type", "text/event-stream")
    w.Header().Set("Cache-Control", "no-cache")
    w.Header().Set("Connection", "keep-alive")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    
    flusher, ok := w.(http.Flusher)
    if !ok {
        http.Error(w, "SSE not supported", http.StatusInternalServerError)
        return
    }
    
    // Get or create session
    session, err := h.getOrCreateSession(r.Context(), userID)
    if err != nil {
        fmt.Fprintf(w, "event: error\ndata: %s\n\n", err.Error())
        flusher.Flush()
        return
    }
    
    // Send prompt
    if err := session.Processor.SendPrompt(prompt); err != nil {
        fmt.Fprintf(w, "event: error\ndata: %s\n\n", err.Error())
        flusher.Flush()
        return
    }
    
    // Stream events
    ctx := r.Context()
    for {
        select {
        case event := <-session.Processor.events:
            data, _ := json.Marshal(event)
            fmt.Fprintf(w, "event: %s\ndata: %s\n\n", event.Type, data)
            flusher.Flush()
            
        case err := <-session.Processor.errors:
            fmt.Fprintf(w, "event: error\ndata: %s\n\n", err.Error())
            flusher.Flush()
            
        case <-ctx.Done():
            return
        }
    }
}

// getOrCreateSession retrieves existing session or creates new one
func (h *GeminiHandler) getOrCreateSession(ctx context.Context, userID string) (*UserSession, error) {
    // Try to get existing session
    if val, ok := h.sessions.Load(userID); ok {
        session := val.(*UserSession)
        session.LastUsed = time.Now()
        return session, nil
    }
    
    // Create new session
    workspace := fmt.Sprintf("/tmp/gemini-workspace-%s", userID)
    apiKey := getAPIKeyForUser(userID) // Implement based on your auth
    
    container, err := h.sandboxManager.CreateContainer(ctx, userID, workspace, apiKey)
    if err != nil {
        return nil, fmt.Errorf("create container: %w", err)
    }
    
    processor := NewStreamProcessor(container)
    
    session := &UserSession{
        UserID:    userID,
        Container: container,
        Processor: processor,
        LastUsed:  time.Now(),
    }
    
    h.sessions.Store(userID, session)
    
    // Start session cleanup timer
    go h.monitorSession(session)
    
    return session, nil
}
```

### 5. WebSocket Implementation (Alternative to SSE)

```go
// HandleWebSocket handles WebSocket connections for real-time interaction
func (h *GeminiHandler) HandleWebSocket(w http.ResponseWriter, r *http.Request) {
    upgrader := websocket.Upgrader{
        CheckOrigin: func(r *http.Request) bool {
            return true // Configure appropriately for production
        },
    }
    
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Printf("WebSocket upgrade failed: %v", err)
        return
    }
    defer conn.Close()
    
    userID := getUserID(r)
    session, err := h.getOrCreateSession(r.Context(), userID)
    if err != nil {
        conn.WriteJSON(map[string]string{
            "type":  "error",
            "error": err.Error(),
        })
        return
    }
    
    // Handle incoming messages
    go func() {
        for {
            var msg struct {
                Type   string `json:"type"`
                Prompt string `json:"prompt"`
            }
            
            if err := conn.ReadJSON(&msg); err != nil {
                if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
                    log.Printf("WebSocket error: %v", err)
                }
                break
            }
            
            if msg.Type == "prompt" {
                if err := session.Processor.SendPrompt(msg.Prompt); err != nil {
                    conn.WriteJSON(map[string]string{
                        "type":  "error",
                        "error": err.Error(),
                    })
                }
            }
        }
    }()
    
    // Stream events to WebSocket
    for {
        select {
        case event := <-session.Processor.events:
            if err := conn.WriteJSON(event); err != nil {
                return
            }
            
        case err := <-session.Processor.errors:
            conn.WriteJSON(map[string]string{
                "type":  "error",
                "error": err.Error(),
            })
        }
    }
}
```

### 6. Production Considerations

```go
// SessionCleanup periodically cleans up idle sessions
func (h *GeminiHandler) SessionCleanup() {
    ticker := time.NewTicker(5 * time.Minute)
    defer ticker.Stop()
    
    for range ticker.C {
        var toDelete []string
        
        h.sessions.Range(func(key, value interface{}) bool {
            session := value.(*UserSession)
            if time.Since(session.LastUsed) > 30*time.Minute {
                toDelete = append(toDelete, key.(string))
            }
            return true
        })
        
        for _, userID := range toDelete {
            if val, ok := h.sessions.LoadAndDelete(userID); ok {
                session := val.(*UserSession)
                h.sandboxManager.StopContainer(session.Container.ID)
                session.Processor.Close()
            }
        }
    }
}

// HealthCheck verifies Docker daemon is accessible
func (h *GeminiHandler) HealthCheck() error {
    cmd := exec.Command(h.sandboxManager.dockerCommand, "version")
    return cmd.Run()
}

// Metrics tracks usage statistics
type Metrics struct {
    ActiveContainers  int64
    TotalRequests     int64
    AverageLatency    time.Duration
    ContainerStartups int64
}

// CollectMetrics gathers runtime statistics
func (h *GeminiHandler) CollectMetrics() Metrics {
    var activeContainers int64
    h.sessions.Range(func(_, _ interface{}) bool {
        activeContainers++
        return true
    })
    
    return Metrics{
        ActiveContainers: activeContainers,
        // Add other metrics collection
    }
}
```

### 7. Error Handling Patterns

```go
// GeminiError represents a structured error response
type GeminiError struct {
    Code    string `json:"code"`
    Message string `json:"message"`
    Details string `json:"details,omitempty"`
}

// Common error scenarios
var (
    ErrContainerStartFailed = &GeminiError{
        Code:    "CONTAINER_START_FAILED",
        Message: "Failed to start Gemini container",
    }
    
    ErrAPIKeyInvalid = &GeminiError{
        Code:    "API_KEY_INVALID",
        Message: "Invalid or missing Gemini API key",
    }
    
    ErrResourceLimit = &GeminiError{
        Code:    "RESOURCE_LIMIT",
        Message: "Resource limit exceeded",
    }
)

// HandleError sends appropriate error response
func HandleError(w http.ResponseWriter, err error) {
    var geminiErr *GeminiError
    if errors.As(err, &geminiErr) {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(geminiErr)
        return
    }
    
    // Generic error
    w.WriteHeader(http.StatusInternalServerError)
    json.NewEncoder(w).Encode(&GeminiError{
        Code:    "INTERNAL_ERROR",
        Message: "An unexpected error occurred",
        Details: err.Error(),
    })
}
```

## Testing

### Unit Tests

```go
func TestSandboxManager_CreateContainer(t *testing.T) {
    manager := NewSandboxManager("gemini-cli-sandbox:test", 5)
    
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    
    container, err := manager.CreateContainer(ctx, "test-user", "/tmp/test", "test-key")
    require.NoError(t, err)
    require.NotNil(t, container)
    
    // Verify container is running
    assert.NotEmpty(t, container.ID)
    assert.Equal(t, "test-user", container.UserID)
    
    // Cleanup
    err = manager.StopContainer(container.ID)
    assert.NoError(t, err)
}
```

### Integration Tests

```go
func TestGeminiIntegration(t *testing.T) {
    if testing.Short() {
        t.Skip("Skipping integration test")
    }
    
    // Start test server
    handler := &GeminiHandler{
        sandboxManager: NewSandboxManager("gemini-cli-sandbox:latest", 2),
    }
    
    server := httptest.NewServer(http.HandlerFunc(handler.HandleStreamRequest))
    defer server.Close()
    
    // Make request
    resp, err := http.Post(
        server.URL,
        "application/x-www-form-urlencoded",
        strings.NewReader("prompt=Hello, Gemini!"),
    )
    require.NoError(t, err)
    defer resp.Body.Close()
    
    // Verify SSE response
    assert.Equal(t, "text/event-stream", resp.Header.Get("Content-Type"))
}
```

## Performance Optimization

### Container Pool

```go
// ContainerPool maintains pre-warmed containers
type ContainerPool struct {
    manager   *SandboxManager
    available chan *Container
    mu        sync.Mutex
}

func NewContainerPool(manager *SandboxManager, size int) *ContainerPool {
    pool := &ContainerPool{
        manager:   manager,
        available: make(chan *Container, size),
    }
    
    // Pre-warm containers
    go pool.maintain(size)
    
    return pool
}

func (p *ContainerPool) Get(ctx context.Context, userID string) (*Container, error) {
    select {
    case container := <-p.available:
        // Reconfigure for user
        container.UserID = userID
        return container, nil
    default:
        // Create new if pool empty
        return p.manager.CreateContainer(ctx, userID, "/tmp/"+userID, "")
    }
}
```

## Security Best Practices

1. **API Key Management**
   - Store keys in secure vault (e.g., HashiCorp Vault)
   - Rotate keys regularly
   - Never log API keys

2. **Container Security**
   - Run containers as non-root user
   - Use read-only root filesystem where possible
   - Implement network policies

3. **Resource Limits**
   - Set memory, CPU, and process limits
   - Implement request rate limiting
   - Monitor resource usage

4. **Audit Logging**
   ```go
   log.WithFields(log.Fields{
       "user_id": userID,
       "container_id": containerID,
       "action": "prompt",
       "workspace": workspace,
   }).Info("Gemini request processed")
   ```

## Deployment

### Docker Compose Example

```yaml
version: '3.8'
services:
  gemini-api:
    build: .
    environment:
      - GEMINI_IMAGE=gemini-cli-sandbox:latest
      - POOL_SIZE=10
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./workspaces:/workspaces
    ports:
      - "8080:8080"
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: '2.0'
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gemini-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: gemini-backend
  template:
    metadata:
      labels:
        app: gemini-backend
    spec:
      containers:
      - name: gemini-api
        image: your-registry/gemini-backend:latest
        env:
        - name: DOCKER_HOST
          value: tcp://docker-proxy:2375
        resources:
          limits:
            memory: "4Gi"
            cpu: "2"
```

## Monitoring

### Prometheus Metrics

```go
var (
    containerStartDuration = prometheus.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "gemini_container_start_duration_seconds",
            Help: "Time taken to start a Gemini container",
        },
        []string{"user_id"},
    )
    
    activeContainers = prometheus.NewGauge(
        prometheus.GaugeOpts{
            Name: "gemini_active_containers",
            Help: "Number of active Gemini containers",
        },
    )
)
```

## Next Steps

1. Implement authentication middleware
2. Add request validation and sanitization
3. Set up monitoring and alerting
4. Configure auto-scaling policies
5. Implement backup and recovery procedures

For frontend integration, see [Frontend Migration Guide](./frontend-nextjs.md).