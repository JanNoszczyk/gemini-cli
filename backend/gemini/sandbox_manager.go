package gemini

import (
	"context"
	"fmt"
	"io"
	"os/exec"
	"sync"
	"time"
)

// SandboxManager handles Docker container lifecycle for Gemini CLI
type SandboxManager struct {
	dockerCommand    string
	imageName        string
	poolSize         int
	containerPool    chan *Container
	mu               sync.RWMutex
	activeContainers map[string]*Container
}

// Container represents a running Gemini CLI container
type Container struct {
	ID        string
	Name      string
	UserID    string
	Workspace string
	cmd       *exec.Cmd
	stdin     io.WriteCloser
	stdout    io.ReadCloser
	stderr    io.ReadCloser
	created   time.Time
}

// NewSandboxManager creates a new sandbox manager
func NewSandboxManager(imageName string, poolSize int) *SandboxManager {
	return &SandboxManager{
		dockerCommand:    detectDockerCommand(),
		imageName:        imageName,
		poolSize:         poolSize,
		containerPool:    make(chan *Container, poolSize),
		activeContainers: make(map[string]*Container),
	}
}

func detectDockerCommand() string {
	if _, err := exec.LookPath("docker"); err == nil {
		return "docker"
	}
	if _, err := exec.LookPath("podman"); err == nil {
		return "podman"
	}
	panic("Neither docker nor podman found in PATH")
}

// CreateContainer spawns a new Gemini CLI container for a user
func (sm *SandboxManager) CreateContainer(ctx context.Context, userID, workspace, apiKey string) (*Container, error) {
	containerName := fmt.Sprintf("gemini-user-%s-%d", userID, time.Now().Unix())

	args := []string{
		"run",
		"--rm", // Auto-remove on exit
		"-i",   // Interactive (stdin)
		"--name", containerName,
		"--workdir", "/workspace",
		"--volume", fmt.Sprintf("%s:/workspace:rw", workspace),
		"--env", fmt.Sprintf("GEMINI_API_KEY=%s", apiKey),
		"--memory", "2g", // Memory limit
		"--cpus", "1.0", // CPU limit
		"--pids-limit", "100", // Process limit
		sm.imageName,
		"gemini",
	}

	cmd := exec.CommandContext(ctx, sm.dockerCommand, args...)

	// Set up pipes
	stdin, err := cmd.StdinPipe()
	if err != nil {
		return nil, fmt.Errorf("stdin pipe: %w", err)
	}

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return nil, fmt.Errorf("stdout pipe: %w", err)
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		return nil, fmt.Errorf("stderr pipe: %w", err)
	}

	// Start container
	if err := cmd.Start(); err != nil {
		return nil, fmt.Errorf("start container: %w", err)
	}

	container := &Container{
		ID:        containerName,
		Name:      containerName,
		UserID:    userID,
		Workspace: workspace,
		cmd:       cmd,
		stdin:     stdin,
		stdout:    stdout,
		stderr:    stderr,
		created:   time.Now(),
	}

	// Track active container
	sm.mu.Lock()
	sm.activeContainers[containerName] = container
	sm.mu.Unlock()

	// Monitor container lifecycle
	go sm.monitorContainer(container)

	// Give container a moment to start and initialize
	time.Sleep(1 * time.Second)

	return container, nil
}

// monitorContainer watches for container exit and cleanup
func (sm *SandboxManager) monitorContainer(container *Container) {
	container.cmd.Wait()

	sm.mu.Lock()
	delete(sm.activeContainers, container.Name)
	sm.mu.Unlock()

	// Log container exit
	fmt.Printf("Container %s exited for user %s\n", container.Name, container.UserID)
}

// StopContainer gracefully stops a container
func (sm *SandboxManager) StopContainer(containerID string) error {
	sm.mu.RLock()
	container, exists := sm.activeContainers[containerID]
	sm.mu.RUnlock()

	if !exists {
		return fmt.Errorf("container %s not found", containerID)
	}

	// Close stdin to signal EOF
	container.stdin.Close()

	// Give container time to exit gracefully
	done := make(chan error, 1)
	go func() {
		done <- container.cmd.Wait()
	}()

	select {
	case <-done:
		return nil
	case <-time.After(5 * time.Second):
		// Force kill if not exited
		return container.cmd.Process.Kill()
	}
}

// GetActiveContainers returns the number of active containers
func (sm *SandboxManager) GetActiveContainers() int {
	sm.mu.RLock()
	defer sm.mu.RUnlock()
	return len(sm.activeContainers)
}

// Cleanup stops all active containers
func (sm *SandboxManager) Cleanup() {
	sm.mu.RLock()
	containers := make([]*Container, 0, len(sm.activeContainers))
	for _, c := range sm.activeContainers {
		containers = append(containers, c)
	}
	sm.mu.RUnlock()

	for _, container := range containers {
		sm.StopContainer(container.ID)
	}
}
