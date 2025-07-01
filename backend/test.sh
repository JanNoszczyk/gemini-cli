#!/bin/bash

# Test script for Gemini CLI backend

echo "Building backend..."
go build -o bin/gemini-backend cmd/api/main.go

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo "Build successful!"

echo ""
echo "To run the server:"
echo "  ./bin/gemini-backend -port 50051 -image gemini-cli-sandbox:latest"
echo ""
echo "To test with the client:"
echo "  go run cmd/client/main.go -api-key YOUR_API_KEY"