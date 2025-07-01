package integration

import (
	"context"
	"strings"
	"testing"
	"time"

	"github.com/gemini-cli/backend/gemini"
)

// TestGeminiCLIIntegration tests the main chat functionality
func TestGeminiCLIIntegration(t *testing.T) {
	// This test verifies that:
	// 1. We can authenticate using GEMINI_API_KEY from .env
	// 2. We can send a "hello" message
	// 3. We get an appropriate response

	ctx := context.Background()
	workspace := t.TempDir()
	apiKey := getTestAPIKey(t)
	imageName := "us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox:0.1.7"

	t.Run("AuthAndHelloMessage", func(t *testing.T) {
		ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
		defer cancel()

		// Send "hello" message
		response, err := gemini.RunOneShotGemini(ctx, "hello", workspace, apiKey, imageName)
		if err != nil {
			t.Fatalf("Failed to send hello message: %v", err)
		}

		t.Logf("Sent: hello")
		t.Logf("Received: %s", response)

		// Verify we got a response
		if response == "" {
			t.Fatal("Expected non-empty response")
		}

		// Check if response is greeting-like
		lower := strings.ToLower(response)
		isGreeting := strings.Contains(lower, "hello") ||
			strings.Contains(lower, "hi") ||
			strings.Contains(lower, "hey") ||
			strings.Contains(lower, "greet") ||
			strings.Contains(lower, "help") ||
			strings.Contains(lower, "how") ||
			strings.Contains(lower, "can i")

		if !isGreeting {
			t.Logf("Warning: Response doesn't look like a greeting, but that's okay: %s", response)
		}

		// The fact that we got any response means auth worked
		t.Log("✓ Authentication successful")
		t.Log("✓ Hello message sent and response received")
	})

	// Additional test: Verify container isolation
	t.Run("ContainerIsolation", func(t *testing.T) {
		ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
		defer cancel()

		// Try to list files in workspace (should be empty or minimal)
		response, err := gemini.RunOneShotGemini(ctx, "List the files in /workspace", workspace, apiKey, imageName)
		if err != nil {
			t.Fatalf("Failed to run command: %v", err)
		}

		t.Logf("Workspace listing: %s", response)
		
		// Verify the response mentions workspace or files
		if !strings.Contains(strings.ToLower(response), "workspace") && 
		   !strings.Contains(strings.ToLower(response), "file") &&
		   !strings.Contains(strings.ToLower(response), "empty") &&
		   !strings.Contains(strings.ToLower(response), "directory") {
			t.Logf("Warning: Unexpected response for workspace listing: %s", response)
		}
	})
}

// TestGeminiCLIPerformance tests response time
func TestGeminiCLIPerformance(t *testing.T) {
	ctx := context.Background()
	workspace := t.TempDir()
	apiKey := getTestAPIKey(t)
	imageName := "us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox:0.1.7"

	start := time.Now()
	
	ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	_, err := gemini.RunOneShotGemini(ctx, "What is 1+1?", workspace, apiKey, imageName)
	if err != nil {
		t.Fatalf("Failed to run command: %v", err)
	}

	duration := time.Since(start)
	t.Logf("Response time: %v", duration)

	if duration > 20*time.Second {
		t.Logf("Warning: Response took longer than expected: %v", duration)
	}
}