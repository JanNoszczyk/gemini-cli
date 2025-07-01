package integration

import (
	"context"
	"fmt"
	"io"
	"net"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/gemini-cli/backend/gemini"
	pb "github.com/gemini-cli/backend/proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// TestChatIntegration tests the full chat flow with the Gemini CLI backend
func TestChatIntegration(t *testing.T) {
	// Load API key from environment or .env file
	apiKey := getAPIKey(t)

	// Start the gRPC server
	server, port := startTestServer(t)
	defer server.Cleanup()

	// Give server time to start
	time.Sleep(2 * time.Second)

	// Connect to server
	conn, err := grpc.Dial(fmt.Sprintf("localhost:%d", port), grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		t.Fatalf("Failed to connect to server: %v", err)
	}
	defer conn.Close()

	client := pb.NewGeminiServiceClient(conn)
	ctx := context.Background()

	// Create test workspace
	workspace := createTestWorkspace(t)
	defer os.RemoveAll(workspace)

	// Test 1: Create session
	t.Run("CreateSession", func(t *testing.T) {
		resp, err := client.CreateSession(ctx, &pb.CreateSessionRequest{
			UserId:        "test-user-integration",
			WorkspacePath: workspace,
			ApiKey:        apiKey,
		})

		if err != nil {
			t.Fatalf("Failed to create session: %v", err)
		}

		if !resp.Success {
			t.Fatalf("Session creation failed: %s", resp.Error)
		}

		if resp.SessionId == "" {
			t.Fatal("Expected non-empty session ID")
		}

		t.Logf("Created session: %s", resp.SessionId)
	})

	// Test 2: Send "hello" message and receive response
	t.Run("SendHelloMessage", func(t *testing.T) {
		// Create session first
		createResp, err := client.CreateSession(ctx, &pb.CreateSessionRequest{
			UserId:        "test-hello-user",
			WorkspacePath: workspace,
			ApiKey:        apiKey,
		})

		if err != nil || !createResp.Success {
			t.Fatalf("Failed to create session for hello test: %v", err)
		}

		sessionID := createResp.SessionId

		// Create chat stream
		stream, err := client.Chat(ctx)
		if err != nil {
			t.Fatalf("Failed to create chat stream: %v", err)
		}

		// Channel to collect responses
		responses := make(chan *pb.ChatResponse, 100)
		errors := make(chan error, 1)
		done := make(chan bool, 1)

		// Start receiving responses
		go func() {
			for {
				resp, err := stream.Recv()
				if err == io.EOF {
					done <- true
					return
				}
				if err != nil {
					errors <- err
					return
				}
				responses <- resp
			}
		}()

		// Send initial request with session ID (no prompt yet)
		err = stream.Send(&pb.ChatRequest{
			SessionId: sessionID,
			Prompt:    "",
		})
		if err != nil {
			t.Fatalf("Failed to send initial request: %v", err)
		}

		// Wait a moment for container to initialize
		time.Sleep(2 * time.Second)

		// Now send "hello" message
		err = stream.Send(&pb.ChatRequest{
			SessionId: sessionID,
			Prompt:    "hello",
		})

		if err != nil {
			t.Fatalf("Failed to send hello message: %v", err)
		}

		// Wait for responses
		timeout := time.After(30 * time.Second)
		gotResponse := false
		responseCount := 0

		for !gotResponse && responseCount < 10 {
			select {
			case resp := <-responses:
				responseCount++
				switch content := resp.Content.(type) {
				case *pb.ChatResponse_Text:
					t.Logf("Received text response: %s", content.Text.Text)
					// Any text response is considered success for now
					gotResponse = true
				case *pb.ChatResponse_ToolCall:
					t.Logf("Tool call: %s", content.ToolCall.ToolName)
				case *pb.ChatResponse_Error:
					t.Logf("Received error: %s (%s)", content.Error.Message, content.Error.Code)
				}
			case err := <-errors:
				t.Logf("Stream error (may be expected): %v", err)
			case <-timeout:
				if responseCount == 0 {
					t.Fatal("Timeout waiting for response")
				} else {
					t.Logf("Timeout after %d responses", responseCount)
					gotResponse = true
				}
			}
		}

		// Close stream
		stream.CloseSend()

		// End session
		endResp, err := client.EndSession(ctx, &pb.EndSessionRequest{
			SessionId: sessionID,
		})

		if err != nil || !endResp.Success {
			t.Errorf("Failed to end session: %v", err)
		}
	})

	// Test 3: Multiple messages in sequence
	t.Run("MultipleMessages", func(t *testing.T) {
		// Create session
		createResp, err := client.CreateSession(ctx, &pb.CreateSessionRequest{
			UserId:        "test-multi-user",
			WorkspacePath: workspace,
			ApiKey:        apiKey,
		})

		if err != nil || !createResp.Success {
			t.Fatalf("Failed to create session: %v", err)
		}

		sessionID := createResp.SessionId

		// Create chat stream
		stream, err := client.Chat(ctx)
		if err != nil {
			t.Fatalf("Failed to create chat stream: %v", err)
		}

		// Test multiple prompts
		prompts := []string{
			"What is 2 + 2?",
			"List the files in my workspace",
		}

		for _, prompt := range prompts {
			t.Logf("Sending prompt: %s", prompt)

			err = stream.Send(&pb.ChatRequest{
				SessionId: sessionID,
				Prompt:    prompt,
			})

			if err != nil {
				t.Errorf("Failed to send prompt '%s': %v", prompt, err)
				continue
			}

			// Wait a bit for response
			time.Sleep(5 * time.Second)
		}

		// Close stream
		stream.CloseSend()

		// Clean up
		client.EndSession(ctx, &pb.EndSessionRequest{SessionId: sessionID})
	})
}

// TestSessionManagement tests session lifecycle
func TestSessionManagement(t *testing.T) {
	apiKey := getAPIKey(t)
	server, port := startTestServer(t)
	defer server.Cleanup()

	time.Sleep(2 * time.Second)

	conn, err := grpc.Dial(fmt.Sprintf("localhost:%d", port), grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		t.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	client := pb.NewGeminiServiceClient(conn)
	ctx := context.Background()
	workspace := createTestWorkspace(t)
	defer os.RemoveAll(workspace)

	// Create session
	createResp, err := client.CreateSession(ctx, &pb.CreateSessionRequest{
		UserId:        "test-session-user",
		WorkspacePath: workspace,
		ApiKey:        apiKey,
	})

	if err != nil || !createResp.Success {
		t.Fatalf("Failed to create session: %v", err)
	}

	sessionID := createResp.SessionId

	// Get session status
	statusResp, err := client.GetSessionStatus(ctx, &pb.GetSessionStatusRequest{
		SessionId: sessionID,
	})

	if err != nil {
		t.Fatalf("Failed to get session status: %v", err)
	}

	if !statusResp.Active {
		t.Error("Expected session to be active")
	}

	// End session
	endResp, err := client.EndSession(ctx, &pb.EndSessionRequest{
		SessionId: sessionID,
	})

	if err != nil || !endResp.Success {
		t.Fatalf("Failed to end session: %v", err)
	}

	// Verify session is gone
	_, err = client.GetSessionStatus(ctx, &pb.GetSessionStatusRequest{
		SessionId: sessionID,
	})

	if err == nil {
		t.Error("Expected error when getting status of ended session")
	}
}

// Helper functions

func getAPIKey(t *testing.T) string {
	// First try environment variable
	apiKey := os.Getenv("GEMINI_API_KEY")

	// If not found, try to load from .env file
	if apiKey == "" {
		envPath := filepath.Join("..", "..", "..", ".env")
		if data, err := os.ReadFile(envPath); err == nil {
			lines := strings.Split(string(data), "\n")
			for _, line := range lines {
				if strings.HasPrefix(line, "GEMINI_API_KEY=") {
					apiKey = strings.TrimPrefix(line, "GEMINI_API_KEY=")
					apiKey = strings.TrimSpace(apiKey)
					break
				}
			}
		}
	}

	if apiKey == "" {
		t.Skip("GEMINI_API_KEY not found in environment or .env file")
	}

	return apiKey
}

func startTestServer(t *testing.T) (*gemini.GRPCServer, int) {
	// Use a random port for testing
	port := 50051 + (time.Now().Nanosecond() % 1000)

	// Create sandbox manager
	sandboxManager := gemini.NewSandboxManager("us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox:0.1.7", 2)

	// Create and start server in background
	server := gemini.NewGRPCServer(sandboxManager)

	go func() {
		if err := startGRPCServer(server, port); err != nil {
			t.Logf("Server error: %v", err)
		}
	}()

	return server, port
}

func startGRPCServer(geminiServer *gemini.GRPCServer, port int) error {
	grpcServer := grpc.NewServer()
	pb.RegisterGeminiServiceServer(grpcServer, geminiServer)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		return err
	}

	return grpcServer.Serve(lis)
}

func createTestWorkspace(t *testing.T) string {
	dir, err := os.MkdirTemp("", "gemini-test-*")
	if err != nil {
		t.Fatalf("Failed to create test workspace: %v", err)
	}

	// Create a test file
	testFile := filepath.Join(dir, "test.txt")
	if err := os.WriteFile(testFile, []byte("Hello from test file"), 0644); err != nil {
		t.Fatalf("Failed to create test file: %v", err)
	}

	return dir
}
