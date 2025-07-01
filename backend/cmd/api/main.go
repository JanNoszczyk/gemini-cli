package main

import (
	"flag"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"

	"github.com/gemini-cli/backend/gemini"
	pb "github.com/gemini-cli/backend/proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

var (
	port      = flag.Int("port", 50051, "The server port")
	imageName = flag.String("image", "us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox:0.1.7", "Docker image name for Gemini CLI")
	poolSize  = flag.Int("pool-size", 10, "Container pool size")
)

func main() {
	flag.Parse()

	// Create sandbox manager
	sandboxManager := gemini.NewSandboxManager(*imageName, *poolSize)

	// Create gRPC server
	geminiServer := gemini.NewGRPCServer(sandboxManager)

	// Create gRPC server instance
	grpcServer := grpc.NewServer()

	// Register service
	pb.RegisterGeminiServiceServer(grpcServer, geminiServer)

	// Register reflection service for debugging
	reflection.Register(grpcServer)

	// Create listener
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	// Handle graceful shutdown
	go func() {
		sigCh := make(chan os.Signal, 1)
		signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)
		<-sigCh

		log.Println("Shutting down server...")
		grpcServer.GracefulStop()
		geminiServer.Cleanup()
		sandboxManager.Cleanup()
	}()

	log.Printf("Starting gRPC server on port %d...", *port)
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
