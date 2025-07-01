package main

import (
	"context"
	"flag"
	"fmt"
	"io"
	"log"
	"time"

	pb "github.com/gemini-cli/backend/proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var (
	serverAddr = flag.String("server", "localhost:50051", "The server address")
	userID     = flag.String("user", "test-user", "User ID")
	workspace  = flag.String("workspace", "/tmp/gemini-workspace", "Workspace path")
	apiKey     = flag.String("api-key", "", "Gemini API key")
)

func main() {
	flag.Parse()

	if *apiKey == "" {
		log.Fatal("API key is required")
	}

	// Connect to server
	conn, err := grpc.Dial(*serverAddr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	client := pb.NewGeminiServiceClient(conn)

	// Create session
	ctx := context.Background()
	createResp, err := client.CreateSession(ctx, &pb.CreateSessionRequest{
		UserId:        *userID,
		WorkspacePath: *workspace,
		ApiKey:        *apiKey,
	})
	if err != nil {
		log.Fatalf("Failed to create session: %v", err)
	}

	if !createResp.Success {
		log.Fatalf("Failed to create session: %s", createResp.Error)
	}

	sessionID := createResp.SessionId
	fmt.Printf("Created session: %s\n", sessionID)

	// Start chat stream
	stream, err := client.Chat(ctx)
	if err != nil {
		log.Fatalf("Failed to create chat stream: %v", err)
	}

	// Start goroutine to receive messages
	go func() {
		for {
			resp, err := stream.Recv()
			if err == io.EOF {
				return
			}
			if err != nil {
				log.Printf("Error receiving: %v", err)
				return
			}

			switch content := resp.Content.(type) {
			case *pb.ChatResponse_Text:
				fmt.Printf("Gemini: %s\n", content.Text.Text)
			case *pb.ChatResponse_ToolCall:
				fmt.Printf("Tool Call: %s(%s)\n", content.ToolCall.ToolName, content.ToolCall.Arguments)
			case *pb.ChatResponse_ToolResult:
				fmt.Printf("Tool Result [%s]: %s\n", content.ToolResult.ToolName, content.ToolResult.Result)
			case *pb.ChatResponse_Error:
				fmt.Printf("Error: %s (%s)\n", content.Error.Message, content.Error.Code)
			case *pb.ChatResponse_Thought:
				fmt.Printf("Thought: %s\n", content.Thought.Thought)
			}
		}
	}()

	// Send initial prompt
	prompt := "Hello! Can you list the files in my workspace?"
	fmt.Printf("You: %s\n", prompt)

	if err := stream.Send(&pb.ChatRequest{
		SessionId: sessionID,
		Prompt:    prompt,
	}); err != nil {
		log.Fatalf("Failed to send prompt: %v", err)
	}

	// Wait for response
	time.Sleep(10 * time.Second)

	// Close stream
	stream.CloseSend()

	// End session
	endResp, err := client.EndSession(ctx, &pb.EndSessionRequest{
		SessionId: sessionID,
	})
	if err != nil {
		log.Printf("Failed to end session: %v", err)
	} else if endResp.Success {
		fmt.Println("Session ended successfully")
	}
}
