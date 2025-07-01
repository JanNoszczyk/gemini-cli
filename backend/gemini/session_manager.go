package gemini

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// UserSession tracks a user's Gemini session
type UserSession struct {
	UserID    string
	Container *Container
	Processor *StreamProcessor
	LastUsed  time.Time
	mu        sync.Mutex
}

// SessionManager manages user sessions
type SessionManager struct {
	sandboxManager *SandboxManager
	sessions       sync.Map // userID -> *UserSession
	sessionTimeout time.Duration
}

// NewSessionManager creates a new session manager
func NewSessionManager(sandboxManager *SandboxManager, sessionTimeoutSeconds int) *SessionManager {
	sm := &SessionManager{
		sandboxManager: sandboxManager,
		sessionTimeout: time.Duration(sessionTimeoutSeconds) * time.Second,
	}

	// Start cleanup routine
	go sm.cleanupRoutine()

	return sm
}

// GetOrCreateSession retrieves existing session or creates new one
func (sm *SessionManager) GetOrCreateSession(ctx context.Context, userID, workspace, apiKey string) (*UserSession, error) {
	// Try to get existing session
	if val, ok := sm.sessions.Load(userID); ok {
		session := val.(*UserSession)
		session.mu.Lock()
		session.LastUsed = time.Now()
		session.mu.Unlock()
		return session, nil
	}

	// Create new session
	container, err := sm.sandboxManager.CreateContainer(ctx, userID, workspace, apiKey)
	if err != nil {
		return nil, fmt.Errorf("create container: %w", err)
	}

	processor := NewStreamProcessor(container)

	session := &UserSession{
		UserID:    userID,
		Container: container,
		Processor: processor,
		LastUsed:  time.Now(),
	}

	sm.sessions.Store(userID, session)

	return session, nil
}

// GetSession retrieves an existing session
func (sm *SessionManager) GetSession(userID string) (*UserSession, bool) {
	if val, ok := sm.sessions.Load(userID); ok {
		session := val.(*UserSession)
		session.mu.Lock()
		session.LastUsed = time.Now()
		session.mu.Unlock()
		return session, true
	}
	return nil, false
}

// RemoveSession removes a user session
func (sm *SessionManager) RemoveSession(userID string) {
	if val, ok := sm.sessions.LoadAndDelete(userID); ok {
		session := val.(*UserSession)
		session.Processor.Close()
		sm.sandboxManager.StopContainer(session.Container.ID)
	}
}

// cleanupRoutine periodically cleans up idle sessions
func (sm *SessionManager) cleanupRoutine() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		var toDelete []string

		sm.sessions.Range(func(key, value interface{}) bool {
			session := value.(*UserSession)
			session.mu.Lock()
			idle := time.Since(session.LastUsed)
			session.mu.Unlock()

			if idle > sm.sessionTimeout {
				toDelete = append(toDelete, key.(string))
			}
			return true
		})

		for _, userID := range toDelete {
			sm.RemoveSession(userID)
			fmt.Printf("Cleaned up idle session for user %s\n", userID)
		}
	}
}

// GetActiveSessions returns the number of active sessions
func (sm *SessionManager) GetActiveSessions() int {
	count := 0
	sm.sessions.Range(func(_, _ interface{}) bool {
		count++
		return true
	})
	return count
}

// Cleanup stops all active sessions
func (sm *SessionManager) Cleanup() {
	sm.sessions.Range(func(key, _ interface{}) bool {
		sm.RemoveSession(key.(string))
		return true
	})
}
