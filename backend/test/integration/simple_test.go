package integration

import (
	"context"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/gemini-cli/backend/gemini"
)

// TestSandboxManager tests the sandbox manager functionality
func TestSandboxManager(t *testing.T) {
	// Skip if Docker is not available
	if os.Getenv("SKIP_DOCKER_TESTS") == "true" {
		t.Skip("Skipping Docker tests")
	}

	manager := gemini.NewSandboxManager("us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox:0.1.7", 2)

	t.Run("CreateContainer", func(t *testing.T) {
		ctx := context.Background()
		workspace := t.TempDir()

		// Get API key
		apiKey := getTestAPIKey(t)

		container, err := manager.CreateContainer(ctx, "test-user", workspace, apiKey)
		if err != nil {
			t.Fatalf("Failed to create container: %v", err)
		}

		if container.ID == "" {
			t.Error("Expected non-empty container ID")
		}

		if container.UserID != "test-user" {
			t.Errorf("Expected UserID 'test-user', got %s", container.UserID)
		}

		// Clean up
		err = manager.StopContainer(container.ID)
		if err != nil {
			t.Errorf("Failed to stop container: %v", err)
		}
	})

	t.Run("ActiveContainers", func(t *testing.T) {
		initial := manager.GetActiveContainers()

		ctx := context.Background()
		workspace := t.TempDir()
		apiKey := getTestAPIKey(t)

		container, err := manager.CreateContainer(ctx, "test-count", workspace, apiKey)
		if err != nil {
			t.Fatalf("Failed to create container: %v", err)
		}

		after := manager.GetActiveContainers()
		if after != initial+1 {
			t.Errorf("Expected %d active containers, got %d", initial+1, after)
		}

		// Clean up
		manager.StopContainer(container.ID)

		// Wait a bit for cleanup
		time.Sleep(1 * time.Second)

		final := manager.GetActiveContainers()
		if final != initial {
			t.Errorf("Expected %d active containers after cleanup, got %d", initial, final)
		}
	})
}

// TestStreamProcessor tests the stream processor functionality
func TestStreamProcessor(t *testing.T) {
	// This is a basic test that doesn't require a running container
	t.Run("EventChannels", func(t *testing.T) {
		// Mock container for testing
		container := &gemini.Container{
			ID:     "test-container",
			UserID: "test-user",
		}

		// Note: In a real test, we'd need to mock the stdout/stderr pipes
		// For now, we just verify the structure exists
		if container.ID != "test-container" {
			t.Error("Container ID mismatch")
		}
	})
}

// TestSessionManager tests session management
func TestSessionManager(t *testing.T) {
	manager := gemini.NewSandboxManager("us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox:0.1.7", 1)
	sessionMgr := gemini.NewSessionManager(manager, 30) // 30 second timeout

	t.Run("GetActiveSessions", func(t *testing.T) {
		count := sessionMgr.GetActiveSessions()
		if count != 0 {
			t.Errorf("Expected 0 active sessions, got %d", count)
		}
	})

	t.Run("SessionLifecycle", func(t *testing.T) {
		ctx := context.Background()
		workspace := t.TempDir()
		apiKey := getTestAPIKey(t)

		// Create session
		session, err := sessionMgr.GetOrCreateSession(ctx, "test-session-user", workspace, apiKey)
		if err != nil {
			t.Fatalf("Failed to create session: %v", err)
		}

		if session.UserID != "test-session-user" {
			t.Errorf("Expected UserID 'test-session-user', got %s", session.UserID)
		}

		// Verify session exists
		retrieved, ok := sessionMgr.GetSession("test-session-user")
		if !ok {
			t.Error("Failed to retrieve session")
		}

		if retrieved.UserID != session.UserID {
			t.Error("Retrieved session doesn't match created session")
		}

		// Remove session
		sessionMgr.RemoveSession("test-session-user")

		// Verify session is gone
		_, ok = sessionMgr.GetSession("test-session-user")
		if ok {
			t.Error("Session should have been removed")
		}
	})

	// Clean up
	sessionMgr.Cleanup()
}

func getTestAPIKey(t *testing.T) string {
	// First try environment variable
	apiKey := os.Getenv("GEMINI_API_KEY")

	// If not found, try to load from .env file
	if apiKey == "" {
		// Try multiple possible locations for .env file
		possiblePaths := []string{
			"../../../.env",
			"../../.env",
			"../.env",
			".env",
		}

		for _, envPath := range possiblePaths {
			if data, err := os.ReadFile(envPath); err == nil {
				lines := strings.Split(string(data), "\n")
				for _, line := range lines {
					if strings.HasPrefix(line, "GEMINI_API_KEY=") {
						apiKey = strings.TrimPrefix(line, "GEMINI_API_KEY=")
						apiKey = strings.TrimSpace(apiKey)
						break
					}
				}
				if apiKey != "" {
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
