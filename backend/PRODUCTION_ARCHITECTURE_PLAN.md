# Production-Ready Kubernetes-Based Sandbox Architecture Plan

## Overview
This plan outlines the complete implementation of persistent, scalable sandbox containers for freelancers using Gemini CLI on a multi-user platform. The architecture uses Kubernetes for orchestration and integrates with the main platform's Go backend.

## 1. Kubernetes Architecture

### 1.1 Core Components
- **Namespace per Client**: Isolation between different client organizations
- **StatefulSet per Freelancer**: Persistent pod identity and storage
- **Persistent Volumes**: For workspace and home directory persistence
- **Custom Resource Definitions (CRDs)**: For sandbox configuration

### 1.2 Pod Structure
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: sandbox-{freelancer-id}
  namespace: client-{client-id}
spec:
  containers:
  - name: gemini-cli
    image: registry.platform.com/gemini-cli-user-{user-id}:latest
    resources:
      limits:
        cpu: "2"
        memory: "4Gi"
      requests:
        cpu: "1"
        memory: "2Gi"
  - name: code-server
    image: codercom/code-server:latest
    ports:
    - containerPort: 8080
  volumes:
  - name: workspace
    persistentVolumeClaim:
      claimName: workspace-{freelancer-id}
  - name: home
    persistentVolumeClaim:
      claimName: home-{freelancer-id}
```

## 2. Container Persistence Strategy

### 2.1 Image Layering with Kubernetes
- **Base Image**: Official Gemini CLI sandbox
- **BuildKit Integration**: For efficient layer caching
- **Kaniko**: For in-cluster image building
- **Harbor Registry**: For enterprise image management

### 2.2 Persistent Volumes
```yaml
# Workspace PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: workspace-{freelancer-id}
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 50Gi
  storageClassName: fast-ssd

# Home Directory PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: home-{freelancer-id}
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard
```

## 3. State Management

### 3.1 Database Schema (PostgreSQL)
```sql
-- Core tables for sandbox management
CREATE SCHEMA IF NOT EXISTS sandbox;

CREATE TABLE sandbox.freelancers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    kubernetes_namespace VARCHAR(63),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sandbox.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    kubernetes_namespace VARCHAR(63) UNIQUE,
    resource_quota JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sandbox.sandbox_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    freelancer_id UUID REFERENCES sandbox.freelancers(id),
    client_id UUID REFERENCES sandbox.clients(id),
    resource_tier VARCHAR(50) NOT NULL,
    custom_image_tag VARCHAR(255),
    pvc_workspace VARCHAR(255),
    pvc_home VARCHAR(255),
    max_storage_gb INTEGER DEFAULT 50,
    kubernetes_manifest JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sandbox.sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    freelancer_id UUID REFERENCES sandbox.freelancers(id),
    client_id UUID REFERENCES sandbox.clients(id),
    pod_name VARCHAR(255),
    namespace VARCHAR(63),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    api_key_secret_ref VARCHAR(255), -- K8s secret reference
    resource_usage JSONB,
    status VARCHAR(50) DEFAULT 'active'
);

CREATE TABLE sandbox.usage_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sandbox.sessions(id),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    event_type VARCHAR(50),
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    command TEXT,
    metadata JSONB
);

CREATE TABLE sandbox.package_installations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    freelancer_id UUID REFERENCES sandbox.freelancers(id),
    package_manager VARCHAR(50), -- npm, pip, apt, etc
    package_name VARCHAR(255),
    version VARCHAR(50),
    installed_at TIMESTAMPTZ DEFAULT NOW(),
    committed_to_image BOOLEAN DEFAULT FALSE
);

-- Indexes
CREATE INDEX idx_sessions_freelancer ON sandbox.sessions(freelancer_id);
CREATE INDEX idx_sessions_client ON sandbox.sessions(client_id);
CREATE INDEX idx_usage_session ON sandbox.usage_tracking(session_id);
CREATE INDEX idx_usage_timestamp ON sandbox.usage_tracking(timestamp);
```

### 3.2 Kubernetes Resources
```yaml
# Custom Resource Definition for Sandbox
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: sandboxes.platform.com
spec:
  group: platform.com
  versions:
  - name: v1
    served: true
    storage: true
    schema:
      openAPIV3Schema:
        type: object
        properties:
          spec:
            type: object
            properties:
              freelancerId:
                type: string
              clientId:
                type: string
              resourceTier:
                type: string
                enum: ["basic", "standard", "premium", "custom"]
              customImage:
                type: string
              persistence:
                type: object
                properties:
                  workspaceSize:
                    type: string
                  homeSize:
                    type: string
```

## 4. Resource Tiers in Kubernetes

### 4.1 Resource Classes
```yaml
# Basic Tier
apiVersion: v1
kind: ResourceQuota
metadata:
  name: basic-tier
spec:
  hard:
    requests.cpu: "1"
    requests.memory: 2Gi
    limits.cpu: "2"
    limits.memory: 4Gi
    persistentvolumeclaims: "2"

# Standard Tier
apiVersion: v1
kind: ResourceQuota
metadata:
  name: standard-tier
spec:
  hard:
    requests.cpu: "2"
    requests.memory: 4Gi
    limits.cpu: "4"
    limits.memory: 8Gi
    persistentvolumeclaims: "3"

# Premium Tier
apiVersion: v1
kind: ResourceQuota
metadata:
  name: premium-tier
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    persistentvolumeclaims: "5"
    nvidia.com/gpu: "1"  # Optional GPU
```

## 5. Security Architecture

### 5.1 Kubernetes Security
- **Network Policies**: Isolate freelancer pods
- **Pod Security Standards**: Enforce security baselines
- **RBAC**: Fine-grained access control
- **Secrets Management**: For API keys

### 5.2 API Key Management
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: gemini-api-key-{session-id}
  namespace: client-{client-id}
type: Opaque
data:
  api_key: <base64-encoded-key>
---
# Mounted as environment variable in pod
env:
- name: GEMINI_API_KEY
  valueFrom:
    secretKeyRef:
      name: gemini-api-key-{session-id}
      key: api_key
```

### 5.3 Network Policies
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: sandbox-isolation
spec:
  podSelector:
    matchLabels:
      app: sandbox
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: platform-system
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: platform-system
  - to:
    ports:
    - protocol: TCP
      port: 443  # HTTPS for package downloads
    - protocol: TCP
      port: 80   # HTTP for package downloads
```

## 6. Container Lifecycle with Kubernetes

### 6.1 Lifecycle Management
- **Pod Phases**: Pending → Running → Succeeded/Failed
- **Init Containers**: For setup and restoration
- **Sidecar Containers**: For monitoring and logging
- **Lifecycle Hooks**: PreStop for graceful shutdown

### 6.2 Auto-scaling and Hibernation
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: sandbox-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: StatefulSet
    name: sandbox-statefulset
  minReplicas: 0  # Allow scale to zero
  maxReplicas: 100
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
```

## 7. Monitoring & Observability

### 7.1 Metrics Stack
- **Prometheus**: For metrics collection
- **Grafana**: For visualization
- **Loki**: For log aggregation
- **Jaeger**: For distributed tracing

### 7.2 Custom Metrics
```go
// Prometheus metrics for Gemini usage
var (
    geminiPrompts = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "gemini_prompts_total",
            Help: "Total number of Gemini prompts",
        },
        []string{"freelancer_id", "client_id", "session_id"},
    )
    
    geminiTokensUsed = prometheus.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "gemini_tokens_used",
            Help: "Tokens used per request",
            Buckets: []float64{10, 50, 100, 500, 1000, 5000},
        },
        []string{"freelancer_id", "client_id", "type"},
    )
)
```

## 8. Integration Architecture

### 8.1 Service Mesh (Istio)
```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: sandbox-routing
spec:
  hosts:
  - sandbox.platform.internal
  http:
  - match:
    - headers:
        freelancer-id:
          exact: "{freelancer-id}"
    route:
    - destination:
        host: sandbox-{freelancer-id}
        port:
          number: 8080
```

### 8.2 gRPC Service Updates
```proto
service SandboxService {
  // Existing methods
  rpc CreateSession(CreateSessionRequest) returns (CreateSessionResponse);
  rpc Chat(stream ChatRequest) returns (stream ChatResponse);
  rpc EndSession(EndSessionRequest) returns (EndSessionResponse);
  
  // New methods for Kubernetes
  rpc CreateSandbox(CreateSandboxRequest) returns (CreateSandboxResponse);
  rpc GetSandboxStatus(GetSandboxStatusRequest) returns (SandboxStatus);
  rpc CommitSandboxImage(CommitImageRequest) returns (CommitImageResponse);
  rpc ListInstalledPackages(ListPackagesRequest) returns (ListPackagesResponse);
  rpc GetUsageMetrics(GetUsageRequest) returns (UsageMetrics);
  rpc AttachToTerminal(stream TerminalData) returns (stream TerminalData);
  rpc AttachToVSCode(VSCodeRequest) returns (VSCodeResponse);
}
```

## 9. Kubernetes Operators

### 9.1 Sandbox Operator
```go
// Operator to manage sandbox lifecycle
type SandboxReconciler struct {
    client.Client
    Scheme *runtime.Scheme
    Docker *dockerClient
    Registry *registryClient
}

func (r *SandboxReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    // 1. Check if sandbox should be running
    // 2. Create/update StatefulSet
    // 3. Manage PVCs
    // 4. Handle image commits
    // 5. Clean up idle resources
}
```

## 10. Migration Strategy

### 10.1 Code Organization in Main Repo
```
main-platform/
├── cmd/
│   ├── api/           # Main API server
│   └── sandbox/       # Sandbox controller
├── internal/
│   ├── sandbox/       # Migrated sandbox code
│   │   ├── manager/   # Container management
│   │   ├── stream/    # Stream processing
│   │   ├── k8s/       # Kubernetes integration
│   │   └── monitor/   # Usage tracking
│   └── ...
├── pkg/
│   └── apis/
│       └── sandbox/   # CRD definitions
└── deploy/
    └── k8s/           # Kubernetes manifests
```

### 10.2 Migration Steps
1. Copy core sandbox management code
2. Refactor for Kubernetes client instead of Docker
3. Integrate with existing authentication/authorization
4. Add Kubernetes operator logic
5. Update gRPC services
6. Implement monitoring integration

## Next Steps for Migration

1. **Prepare the codebase**:
   - Copy `gemini/` package to main repo
   - Update imports and dependencies
   - Add Kubernetes client libraries

2. **Update configuration**:
   - Add Kubernetes config to main settings
   - Update database schema
   - Add new environment variables

3. **Test in staging**:
   - Deploy to staging Kubernetes cluster
   - Test persistence and scaling
   - Validate monitoring and logging

4. **Production rollout**:
   - Gradual migration of users
   - Monitor performance and stability
   - Implement rollback plan