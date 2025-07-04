# AI Agent Implementation Prompt

## Context
You are implementing a Kubernetes-based sandbox system for freelancers using Gemini CLI in a multi-user platform. The sandbox system needs to provide persistent development environments with package installation capabilities, resource management, and comprehensive usage tracking.

## Current State
The basic backend implementation exists in the `gemini-cli-jan` repository with:
- Docker-based container management
- gRPC streaming API
- Session management
- Basic integration tests

## Your Task
Migrate and enhance this implementation in the main platform repository to create a production-ready Kubernetes-based sandbox system.

## Requirements

### 1. Kubernetes Integration
- Replace Docker commands with Kubernetes API calls
- Implement StatefulSets for persistent freelancer environments
- Create Custom Resource Definitions (CRDs) for sandbox configuration
- Set up proper namespacing for client isolation

### 2. Persistence Implementation
- **Package Persistence**: When freelancers install packages (npm, pip, apt, etc.), commit the container state to a custom image tagged as `gemini-cli-user-{userID}:latest`
- **Home Directory**: Mount persistent volume at `/home/gemini` for config files and caches
- **Workspace**: Mount persistent volume at `/workspace` for project files
- **Database**: Implement PostgreSQL schema for tracking configurations, sessions, and usage

### 3. Resource Management
Implement three resource tiers:
- **Basic**: 1 CPU, 2GB RAM, 10GB storage
- **Standard**: 2 CPU, 4GB RAM, 50GB storage  
- **Premium**: 4 CPU, 8GB RAM, 100GB storage, optional GPU

### 4. Container Lifecycle
- Implement pause/resume functionality using Kubernetes pod lifecycle
- Auto-hibernation after 15 minutes idle, stop after 1 hour, terminate after 24 hours
- Image commit functionality when packages are installed
- Graceful shutdown and cleanup

### 5. Security
- API keys stored as Kubernetes secrets, never visible to freelancers
- Network policies for pod isolation
- RBAC for access control
- Audit logging for all operations

### 6. Monitoring & Tracking
- Track all Gemini CLI usage (prompts, responses, tokens)
- Resource usage metrics (CPU, memory, disk, network)
- Package installation tracking
- Real-time monitoring with Prometheus/Grafana

### 7. Integration Features
- VS Code Server sidecar container for IDE access
- WebSocket-based terminal access
- Session recording and playback
- Multi-user collaboration support

## Implementation Steps

### Phase 1: Core Migration
1. Copy the following files from `gemini-cli-jan/backend/gemini/`:
   - `sandbox_manager.go` → Transform to use Kubernetes client
   - `stream_processor.go` → Keep stream handling logic
   - `session_manager.go` → Add persistence to PostgreSQL
   - `grpc_server.go` → Integrate with main platform's gRPC server

2. Create Kubernetes client wrapper:
```go
type KubernetesManager struct {
    clientset kubernetes.Interface
    namespace string
}

func (k *KubernetesManager) CreateSandboxPod(freelancerID, clientID, imageTag string, tier ResourceTier) (*v1.Pod, error) {
    // Create pod with appropriate resource limits and volumes
}
```

### Phase 2: Persistence Layer
1. Implement database models using your existing ORM/database layer
2. Create image commit functionality:
```go
func CommitContainerImage(podName, namespace, newTag string) error {
    // 1. Create a job that runs kaniko
    // 2. Build new image from running container
    // 3. Push to registry
    // 4. Update freelancer's custom image tag in database
}
```

### Phase 3: Lifecycle Management
1. Implement Kubernetes operator for sandbox lifecycle
2. Add cronjob for auto-hibernation checks
3. Create cleanup routines for abandoned resources

### Phase 4: Monitoring Integration
1. Add Prometheus metrics for Gemini usage
2. Create custom exporter for tracking prompts/tokens
3. Implement usage aggregation for billing

## Code Structure
```
internal/
├── sandbox/
│   ├── manager/
│   │   ├── kubernetes.go      # K8s client wrapper
│   │   ├── lifecycle.go       # Pod lifecycle management
│   │   └── resources.go       # Resource tier definitions
│   ├── persistence/
│   │   ├── image.go          # Image commit/management
│   │   ├── volumes.go        # PVC management
│   │   └── database.go       # Session/config storage
│   ├── stream/
│   │   ├── processor.go      # Gemini CLI I/O handling
│   │   └── events.go         # Event parsing
│   ├── monitor/
│   │   ├── metrics.go        # Prometheus metrics
│   │   ├── usage.go          # Usage tracking
│   │   └── audit.go          # Audit logging
│   └── api/
│       ├── grpc.go           # gRPC service implementation
│       └── websocket.go      # Terminal WebSocket handler
```

## Key Considerations

1. **State Recovery**: Implement proper state recovery when pods restart
2. **Image Size**: Monitor and limit custom image sizes, implement cleanup
3. **Network Security**: Ensure proper network isolation between freelancers
4. **Cost Optimization**: Implement resource pooling and efficient scheduling
5. **Backup Strategy**: Regular backups of PVCs and custom images

## Testing Requirements

1. **Unit Tests**: For all core components
2. **Integration Tests**: For K8s operations
3. **Load Tests**: Simulate 100+ concurrent freelancers
4. **Chaos Tests**: Test failure scenarios and recovery

## Success Criteria

- Freelancers can install packages that persist across sessions
- Zero data loss during pod restarts
- Sub-5 second container startup time
- 99.9% uptime for active sessions
- Complete audit trail of all operations
- Real-time usage tracking and billing data

## Additional Resources

- Kubernetes client-go documentation
- Prometheus operator documentation  
- Harbor registry API documentation
- Istio service mesh documentation

Remember to maintain backwards compatibility during migration and implement feature flags for gradual rollout.