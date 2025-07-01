.PHONY: proto build run clean

# Generate Go code from proto files
proto:
	protoc --go_out=. --go_opt=paths=source_relative \
		--go-grpc_out=. --go-grpc_opt=paths=source_relative \
		proto/gemini.proto

# Build the backend
build:
	go build -o bin/gemini-backend cmd/api/main.go

# Run the backend
run:
	go run cmd/api/main.go

# Clean build artifacts
clean:
	rm -rf bin/

# Install dependencies
deps:
	go mod download
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# Run tests
test:
	go test ./...

# Run integration tests
test-integration:
	./run_tests.sh

# Run specific test
test-hello:
	go test ./test/integration -run "TestChatIntegration/SendHelloMessage" -v

# Format code
fmt:
	go fmt ./...