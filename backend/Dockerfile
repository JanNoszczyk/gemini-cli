# Build stage
FROM golang:1.21-alpine AS builder

# Install build dependencies
RUN apk add --no-cache git make protoc protobuf-dev

# Set working directory
WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Install protoc-gen-go plugins
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# Copy source code
COPY . .

# Generate proto files
RUN make proto

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o bin/gemini-backend cmd/api/main.go

# Runtime stage
FROM alpine:latest

# Install Docker CLI (for container management)
RUN apk add --no-cache docker-cli ca-certificates

# Create non-root user
RUN adduser -D -u 1000 gemini

# Copy binary from builder
COPY --from=builder /app/bin/gemini-backend /usr/local/bin/gemini-backend

# Create workspaces directory
RUN mkdir -p /workspaces && chown gemini:gemini /workspaces

# Switch to non-root user
USER gemini

# Expose gRPC port
EXPOSE 50051

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD nc -z localhost 50051 || exit 1

# Run the server
ENTRYPOINT ["gemini-backend"]