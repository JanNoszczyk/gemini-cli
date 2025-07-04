# Migration Guide: Moving Sandbox Backend to Main Platform

## Overview
This guide outlines the steps to migrate the Gemini CLI sandbox backend from this standalone repository to your main platform repository.

## Files to Migrate

### 1. Core Go Packages
```bash
# From gemini-cli-jan/backend/
gemini/sandbox_manager.go      → main-platform/internal/sandbox/manager/sandbox_manager.go
gemini/stream_processor.go     → main-platform/internal/sandbox/stream/stream_processor.go
gemini/session_manager.go      → main-platform/internal/sandbox/session/session_manager.go
gemini/grpc_server.go          → main-platform/internal/sandbox/grpc/server.go
gemini/oneshot_sandbox.go      → main-platform/internal/sandbox/oneshot/executor.go
```

### 2. Protocol Buffers
```bash
proto/gemini.proto            → main-platform/api/proto/sandbox/v1/sandbox.proto
```

### 3. Integration Tests
```bash
test/integration/*_test.go    → main-platform/internal/sandbox/integration/*_test.go
```

## Code Modifications Required

### 1. Package Names
Change all package declarations:
```go
// Old
package gemini

// New
package manager // or stream, session, etc.
```

### 2. Import Paths
Update all imports:
```go
// Old
import "github.com/gemini-cli/backend/gemini"

// New
import "github.com/yourcompany/platform/internal/sandbox/manager"
```

### 3. Docker to Kubernetes
Replace Docker client with Kubernetes client:
```go
// Old
cmd := exec.CommandContext(ctx, "docker", args...)

// New
clientset.CoreV1().Pods(namespace).Create(ctx, pod, metav1.CreateOptions{})
```

### 4. Configuration
Integrate with main platform config:
```go
// Add to main platform config
type SandboxConfig struct {
    KubernetesNamespace string
    ImageRegistry       string
    DefaultImage        string
    ResourceTiers       map[string]ResourceTier
    StorageClass        string
}
```

## Integration Points

### 1. Authentication
- Remove standalone auth
- Use platform's existing auth middleware
- Map platform users to sandbox configs

### 2. Database
- Migrate schema to main database
- Use platform's database connection pool
- Update models to match platform conventions

### 3. gRPC Services
- Merge with existing gRPC server
- Add sandbox endpoints to main API
- Update service discovery

### 4. Monitoring
- Integrate with platform's Prometheus
- Add sandbox-specific dashboards
- Use existing alerting channels

## Migration Steps

### Step 1: Prepare Target Structure
```bash
cd main-platform
mkdir -p internal/sandbox/{manager,stream,session,k8s,monitor}
mkdir -p pkg/apis/sandbox/v1
mkdir -p deploy/k8s/sandbox
```

### Step 2: Copy and Modify Files
```bash
# Copy core files
cp gemini-cli-jan/backend/gemini/*.go main-platform/internal/sandbox/

# Update package names and imports
find internal/sandbox -name "*.go" -exec sed -i 's/package gemini/package sandbox/g' {} \;
```

### Step 3: Add Dependencies
```bash
go get k8s.io/client-go@latest
go get k8s.io/apimachinery@latest
go get k8s.io/api@latest
go get sigs.k8s.io/controller-runtime@latest
```

### Step 4: Create Kubernetes Resources
Create CRDs, RBAC, and other K8s resources in `deploy/k8s/sandbox/`

### Step 5: Update Main API
Add sandbox endpoints to main API server

### Step 6: Run Tests
Ensure all tests pass in the new environment

## Rollback Plan

1. Keep original code in this repo as reference
2. Use feature flags to toggle between old/new implementation
3. Maintain backwards compatibility during transition
4. Have database migration rollback scripts ready

## Timeline

- Week 1: File migration and basic integration
- Week 2: Kubernetes client implementation
- Week 3: Testing and debugging
- Week 4: Staging deployment
- Week 5-6: Production rollout

## Support

Keep this repository as reference during migration. Document any issues or changes made during the process.