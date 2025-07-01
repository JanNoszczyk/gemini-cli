# Docker Sandbox Configuration Guide

## Overview

This guide provides comprehensive instructions for configuring and securing Docker containers for multi-user Gemini CLI deployments. It covers custom image building, security hardening, resource management, and production-ready configurations.

## Base Image Configuration

### 1. Production Dockerfile

```dockerfile
# Multi-stage build for optimal image size
FROM node:20-slim AS base

# Install essential packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    make \
    g++ \
    git \
    curl \
    jq \
    ripgrep \
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -u 1001 -s /bin/bash gemini

# Stage 2: Build Gemini CLI
FROM base AS builder

WORKDIR /build

# Copy package files
COPY packages/cli/package*.json ./packages/cli/
COPY packages/core/package*.json ./packages/core/
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build packages
RUN npm run build --workspaces

# Stage 3: Production image
FROM base AS production

# Set up npm global directory for non-root user
ENV NPM_CONFIG_PREFIX=/home/gemini/.npm-global
ENV PATH=$PATH:/home/gemini/.npm-global/bin

# Copy built packages
COPY --from=builder /build/packages/cli/dist /tmp/cli-dist
COPY --from=builder /build/packages/core/dist /tmp/core-dist

# Switch to non-root user
USER gemini
WORKDIR /home/gemini

# Install Gemini CLI globally
RUN npm install -g /tmp/cli-dist/google-gemini-cli-*.tgz /tmp/core-dist/google-gemini-cli-core-*.tgz

# Clean up
USER root
RUN rm -rf /tmp/cli-dist /tmp/core-dist

# Security hardening
RUN chmod 700 /home/gemini

# Switch back to non-root user
USER gemini

# Set working directory
WORKDIR /workspace

# Default entrypoint
ENTRYPOINT ["gemini"]
CMD ["--help"]
```

### 2. Development Dockerfile

```dockerfile
# Development image with additional tools
FROM gemini-cli-sandbox:production AS development

USER root

# Install development tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    vim \
    less \
    htop \
    strace \
    tcpdump \
    net-tools \
    procps \
    lsof \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js debugging tools
RUN npm install -g node-inspector

USER gemini

# Enable Node.js debugging
ENV NODE_OPTIONS="--inspect=0.0.0.0:9229"

EXPOSE 9229
```

## Security Configuration

### 1. Minimal Runtime Image

```dockerfile
# Ultra-minimal production image using distroless
FROM node:20-slim AS builder
# ... build steps ...

FROM gcr.io/distroless/nodejs20-debian12
COPY --from=builder /app/dist /app
COPY --from=builder /app/node_modules /app/node_modules
WORKDIR /app
USER nonroot
ENTRYPOINT ["node", "index.js"]
```

### 2. Security Scanning

```yaml
# .github/workflows/security-scan.yml
name: Security Scan

on:
  push:
    paths:
      - 'Dockerfile*'
      - '.dockerignore'

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build image
        run: docker build -t gemini-cli-sandbox:test .
      
      - name: Run Trivy scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: gemini-cli-sandbox:test
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
```

### 3. Runtime Security

```dockerfile
# Add security layers
FROM production AS hardened

USER root

# Remove unnecessary binaries
RUN find / -type f -perm /4000 -exec rm -f {} \; 2>/dev/null || true

# Set read-only root filesystem
RUN chmod -R 555 /usr /lib /bin /sbin

# Create writable directories
RUN mkdir -p /tmp /workspace && \
    chown -R gemini:gemini /tmp /workspace && \
    chmod 1777 /tmp

# Drop all capabilities
USER gemini

# Add security labels
LABEL security.capabilities="none" \
      security.read-only-root="true" \
      security.no-new-privileges="true"
```

## Resource Management

### 1. Container Resource Limits

```yaml
# docker-compose.yml
version: '3.8'

services:
  gemini-sandbox:
    image: gemini-cli-sandbox:latest
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 2G
          pids: 100
        reservations:
          cpus: '0.5'
          memory: 512M
    ulimits:
      nproc: 100
      nofile:
        soft: 1024
        hard: 2048
    security_opt:
      - no-new-privileges:true
      - seccomp:unconfined
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETUID
      - SETGID
```

### 2. Kubernetes Resource Configuration

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: gemini-sandbox-quota
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    persistentvolumeclaims: "10"

---
apiVersion: v1
kind: LimitRange
metadata:
  name: gemini-sandbox-limits
spec:
  limits:
  - max:
      cpu: "2"
      memory: "4Gi"
    min:
      cpu: "100m"
      memory: "128Mi"
    default:
      cpu: "1"
      memory: "2Gi"
    defaultRequest:
      cpu: "500m"
      memory: "1Gi"
    type: Container
```

## Volume Mount Strategies

### 1. User Workspace Isolation

```bash
#!/bin/bash
# create-user-workspace.sh

USER_ID=$1
WORKSPACE_ROOT="/data/gemini-workspaces"
USER_WORKSPACE="${WORKSPACE_ROOT}/${USER_ID}"

# Create user workspace with proper permissions
mkdir -p "${USER_WORKSPACE}"
chown 1001:1001 "${USER_WORKSPACE}"
chmod 700 "${USER_WORKSPACE}"

# Create subdirectories
mkdir -p "${USER_WORKSPACE}"/{projects,tmp,cache}

# Set quota (requires quota tools installed)
setquota -u 1001 1048576 2097152 10000 20000 "${WORKSPACE_ROOT}"
```

### 2. Read-Only System Mounts

```yaml
version: '3.8'

services:
  gemini-sandbox:
    image: gemini-cli-sandbox:latest
    volumes:
      # User workspace (read-write)
      - type: bind
        source: ./workspaces/${USER_ID}
        target: /workspace
        read_only: false
      
      # Shared resources (read-only)
      - type: bind
        source: ./shared/templates
        target: /templates
        read_only: true
      
      # Temporary directory (tmpfs)
      - type: tmpfs
        target: /tmp
        tmpfs:
          size: 100M
      
      # Cache directory with size limit
      - type: volume
        source: user-cache-${USER_ID}
        target: /cache
        volume:
          driver: local
          driver_opts:
            type: tmpfs
            device: tmpfs
            o: size=500M,uid=1001
```

### 3. Named Volumes with Drivers

```yaml
volumes:
  user-workspace:
    driver: local
    driver_opts:
      type: nfs
      o: addr=nfs-server.local,rw,vers=4,hard,intr,rsize=32768,wsize=32768
      device: ":/exports/gemini/${USER_ID}"
  
  user-cache:
    driver: local
    driver_opts:
      type: tmpfs
      device: tmpfs
      o: size=500m,uid=1001,gid=1001
```

## Network Isolation

### 1. User Network Namespaces

```yaml
# docker-compose.yml
version: '3.8'

networks:
  user_network:
    driver: bridge
    driver_opts:
      com.docker.network.bridge.name: br-${USER_ID}
    ipam:
      config:
        - subnet: "172.20.${USER_SUBNET}.0/24"
    internal: true

services:
  gemini-sandbox:
    networks:
      - user_network
    dns:
      - 8.8.8.8
      - 8.8.4.4
```

### 2. Network Policies

```yaml
# kubernetes-network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: gemini-sandbox-netpol
spec:
  podSelector:
    matchLabels:
      app: gemini-sandbox
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: gemini-api
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
    ports:
    - protocol: TCP
      port: 53  # DNS
  - to:
    - ipBlock:
        cidr: 0.0.0.0/0
        except:
        - 10.0.0.0/8
        - 192.168.0.0/16
        - 172.16.0.0/12
    ports:
    - protocol: TCP
      port: 443  # HTTPS only
```

### 3. Proxy Configuration

```dockerfile
# Add proxy support
ENV HTTP_PROXY=http://proxy.internal:3128
ENV HTTPS_PROXY=http://proxy.internal:3128
ENV NO_PROXY=localhost,127.0.0.1,10.0.0.0/8

# Configure npm to use proxy
RUN npm config set proxy $HTTP_PROXY && \
    npm config set https-proxy $HTTPS_PROXY
```

## Container Lifecycle Management

### 1. Health Checks

```dockerfile
# Add health check to Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD gemini --version || exit 1
```

### 2. Graceful Shutdown

```typescript
// shutdown-handler.js
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  
  // Close active connections
  await closeAllConnections();
  
  // Save state if needed
  await saveSessionState();
  
  // Exit cleanly
  process.exit(0);
});

// Dockerfile addition
STOPSIGNAL SIGTERM
```

### 3. Auto-restart Policies

```yaml
# docker-compose.yml
services:
  gemini-sandbox:
    restart: unless-stopped
    deploy:
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
```

## Monitoring and Logging

### 1. Structured Logging

```dockerfile
# Configure logging
ENV LOG_LEVEL=info
ENV LOG_FORMAT=json

# Add logging configuration
RUN echo '{ \
  "log": { \
    "level": "info", \
    "format": "json", \
    "output": "stdout" \
  } \
}' > /home/gemini/.gemini/config.json
```

### 2. Metrics Collection

```yaml
# docker-compose.yml with Prometheus metrics
services:
  gemini-sandbox:
    image: gemini-cli-sandbox:latest
    environment:
      - METRICS_ENABLED=true
      - METRICS_PORT=9090
    ports:
      - "9090:9090"
    labels:
      - "prometheus.io/scrape=true"
      - "prometheus.io/port=9090"
      - "prometheus.io/path=/metrics"
```

### 3. Log Aggregation

```yaml
# Fluentd configuration
<source>
  @type forward
  port 24224
</source>

<filter gemini.**>
  @type parser
  key_name log
  <parse>
    @type json
  </parse>
</filter>

<match gemini.**>
  @type elasticsearch
  host elasticsearch
  port 9200
  index_name gemini-sandbox
  type_name container_log
  <buffer>
    @type memory
    flush_interval 10s
  </buffer>
</match>
```

## Production Deployment

### 1. Multi-Architecture Build

```yaml
# .github/workflows/build.yml
name: Build Multi-Arch Image

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up QEMU
        uses: docker/setup-qemu-action@v2
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            user/gemini-cli-sandbox:latest
            user/gemini-cli-sandbox:${{ github.ref_name }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

### 2. Container Registry

```bash
# Tag and push to private registry
docker tag gemini-cli-sandbox:latest registry.company.com/gemini/sandbox:v1.0.0
docker push registry.company.com/gemini/sandbox:v1.0.0

# Pull policy in production
docker pull registry.company.com/gemini/sandbox:v1.0.0 --pull always
```

### 3. Orchestration

```yaml
# kubernetes-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gemini-sandbox-pool
spec:
  replicas: 10
  selector:
    matchLabels:
      app: gemini-sandbox
  template:
    metadata:
      labels:
        app: gemini-sandbox
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        fsGroup: 1001
        seccompProfile:
          type: RuntimeDefault
      containers:
      - name: gemini
        image: registry.company.com/gemini/sandbox:v1.0.0
        imagePullPolicy: Always
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop:
              - ALL
        resources:
          limits:
            memory: "2Gi"
            cpu: "1000m"
            ephemeral-storage: "1Gi"
          requests:
            memory: "512Mi"
            cpu: "250m"
            ephemeral-storage: "100Mi"
        volumeMounts:
        - name: workspace
          mountPath: /workspace
        - name: tmp
          mountPath: /tmp
        env:
        - name: GEMINI_API_KEY
          valueFrom:
            secretKeyRef:
              name: gemini-secrets
              key: api-key
      volumes:
      - name: workspace
        emptyDir:
          sizeLimit: 1Gi
      - name: tmp
        emptyDir:
          sizeLimit: 100Mi
```

## Troubleshooting

### Common Issues

1. **Container fails to start**
   ```bash
   # Check logs
   docker logs gemini-sandbox-xxxxx
   
   # Inspect container
   docker inspect gemini-sandbox-xxxxx
   
   # Debug with shell
   docker run -it --entrypoint /bin/bash gemini-cli-sandbox:latest
   ```

2. **Permission denied errors**
   ```bash
   # Verify user ID
   docker exec gemini-sandbox-xxxxx id
   
   # Check volume permissions
   ls -la /data/workspaces/user-id/
   ```

3. **Resource exhaustion**
   ```bash
   # Monitor resource usage
   docker stats gemini-sandbox-xxxxx
   
   # Check limits
   docker inspect gemini-sandbox-xxxxx | jq '.[0].HostConfig.Resources'
   ```

### Performance Tuning

```bash
# Optimize image size
docker image history gemini-cli-sandbox:latest
docker image prune -a

# Cache optimization
docker build --build-arg BUILDKIT_INLINE_CACHE=1 .

# Layer caching
docker build --cache-from=gemini-cli-sandbox:latest .
```

## Best Practices

1. **Always use specific image tags** in production
2. **Implement image signing** for security
3. **Regular security scanning** of images
4. **Monitor container metrics** continuously
5. **Implement proper backup** strategies
6. **Use init systems** for proper signal handling
7. **Implement rate limiting** at container level
8. **Regular cleanup** of unused containers/volumes

## Next Steps

1. Review [Multi-User Integration Guide](../multi-user-integration.md) for architecture overview
2. Implement [Backend Integration](./backend-go.md) for container orchestration
3. Set up monitoring and alerting systems
4. Configure automated security scanning
5. Implement disaster recovery procedures