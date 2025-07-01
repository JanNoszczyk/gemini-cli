#!/bin/bash

# Integration test runner for Gemini CLI backend

set -e

echo "Running Gemini CLI Backend Integration Tests"
echo "==========================================="

# Load environment variables from .env file if it exists
if [ -f "../.env" ]; then
    echo "Loading environment from ../.env"
    export $(cat ../.env | grep -v '^#' | xargs)
elif [ -f ".env" ]; then
    echo "Loading environment from .env"
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if API key is available
if [ -z "$GEMINI_API_KEY" ]; then
    echo "ERROR: GEMINI_API_KEY is not set"
    echo "Please set GEMINI_API_KEY environment variable or create .env file"
    exit 1
fi

# Check if Docker is available
if ! command -v docker &> /dev/null && ! command -v podman &> /dev/null; then
    echo "ERROR: Neither docker nor podman found in PATH"
    exit 1
fi

# Check if sandbox image exists
if docker images | grep -q "gemini-cli-sandbox"; then
    echo "✓ Sandbox image found"
else
    echo "⚠️  Sandbox image not found. Building it..."
    cd ..
    npm run build:sandbox
    cd backend
fi

# Generate proto files if needed
if [ ! -f "proto/gemini.pb.go" ]; then
    echo "Generating proto files..."
    make proto
fi

# Run tests
echo ""
echo "Running tests..."
echo ""

# Run simple unit tests first
echo "1. Running unit tests..."
go test ./test/integration -run "^Test(SandboxManager|StreamProcessor|SessionManager)$" -v

echo ""
echo "2. Running integration tests..."
# Run full integration tests
go test ./test/integration -run "^TestChatIntegration$" -v -timeout 5m

echo ""
echo "3. Running session management tests..."
go test ./test/integration -run "^TestSessionManagement$" -v

echo ""
echo "Test Summary:"
echo "============="
go test ./test/integration -json | jq -r 'select(.Action=="pass" or .Action=="fail") | "\(.Action): \(.Test)"' | sort | uniq -c

echo ""
echo "All tests completed!"