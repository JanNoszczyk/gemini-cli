package integration

import (
	"context"
	"strings"
	"testing"
	"time"

	"github.com/gemini-cli/backend/gemini"
)

// TestOneShotGemini tests single-shot Gemini execution
func TestOneShotGemini(t *testing.T) {
	ctx := context.Background()
	workspace := t.TempDir()
	apiKey := getTestAPIKey(t)
	imageName := "us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox:0.1.7"

	// Test 1: Simple hello
	t.Run("HelloResponse", func(t *testing.T) {
		ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
		defer cancel()

		response, err := gemini.RunOneShotGemini(ctx, "Say hello", workspace, apiKey, imageName)
		if err != nil {
			t.Fatalf("Failed to run gemini: %v", err)
		}

		t.Logf("Response: %s", response)

		// Check if response contains greeting
		lower := strings.ToLower(response)
		if !strings.Contains(lower, "hello") && !strings.Contains(lower, "hi") && 
		   !strings.Contains(lower, "greet") && !strings.Contains(lower, "hey") {
			t.Errorf("Expected greeting in response, got: %s", response)
		}
	})

	// Test 2: Math question
	t.Run("MathQuestion", func(t *testing.T) {
		ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
		defer cancel()

		response, err := gemini.RunOneShotGemini(ctx, "What is 2 + 2?", workspace, apiKey, imageName)
		if err != nil {
			t.Fatalf("Failed to run gemini: %v", err)
		}

		t.Logf("Response: %s", response)

		// Check if response contains "4"
		if !strings.Contains(response, "4") {
			t.Errorf("Expected '4' in response, got: %s", response)
		}
	})
}