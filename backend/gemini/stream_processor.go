package gemini

import (
	"bufio"
	"encoding/json"
	"fmt"
)

// GeminiEvent represents an event from the Gemini CLI
type GeminiEvent struct {
	Type    string          `json:"type"`
	Content json.RawMessage `json:"content"`
}

// StreamProcessor handles bidirectional communication with Gemini CLI
type StreamProcessor struct {
	container *Container
	events    chan GeminiEvent
	errors    chan error
	done      chan struct{}
}

// NewStreamProcessor creates a processor for container I/O
func NewStreamProcessor(container *Container) *StreamProcessor {
	sp := &StreamProcessor{
		container: container,
		events:    make(chan GeminiEvent, 100),
		errors:    make(chan error, 10),
		done:      make(chan struct{}),
	}

	// Start processing stdout
	go sp.processStdout()

	// Start processing stderr
	go sp.processStderr()

	return sp
}

// processStdout reads and parses output from Gemini CLI
func (sp *StreamProcessor) processStdout() {
	scanner := bufio.NewScanner(sp.container.stdout)
	scanner.Buffer(make([]byte, 1024*1024), 1024*1024) // 1MB buffer

	for scanner.Scan() {
		line := scanner.Text()
		// Log stdout for debugging
		fmt.Printf("[Container %s stdout]: %s\n", sp.container.ID, line)

		// Try to parse as JSON event
		var event GeminiEvent
		if err := json.Unmarshal([]byte(line), &event); err == nil {
			select {
			case sp.events <- event:
			case <-sp.done:
				return
			}
		} else {
			// Plain text output
			select {
			case sp.events <- GeminiEvent{
				Type:    "content",
				Content: json.RawMessage(fmt.Sprintf(`{"text":%q}`, line)),
			}:
			case <-sp.done:
				return
			}
		}
	}

	if err := scanner.Err(); err != nil {
		select {
		case sp.errors <- fmt.Errorf("stdout scan: %w", err):
		case <-sp.done:
		}
	}
}

// processStderr captures error output
func (sp *StreamProcessor) processStderr() {
	scanner := bufio.NewScanner(sp.container.stderr)

	for scanner.Scan() {
		line := scanner.Text()
		// Log stderr for debugging
		fmt.Printf("[Container %s stderr]: %s\n", sp.container.ID, line)
		select {
		case sp.errors <- fmt.Errorf("stderr: %s", line):
		case <-sp.done:
			return
		}
	}
}

// SendPrompt sends a user prompt to Gemini CLI
func (sp *StreamProcessor) SendPrompt(prompt string) error {
	if sp.container.stdin == nil {
		return fmt.Errorf("stdin is nil")
	}
	_, err := fmt.Fprintf(sp.container.stdin, "%s\n", prompt)
	if err != nil {
		return fmt.Errorf("failed to write prompt: %w", err)
	}
	return nil
}

// Events returns the events channel
func (sp *StreamProcessor) Events() <-chan GeminiEvent {
	return sp.events
}

// Errors returns the errors channel
func (sp *StreamProcessor) Errors() <-chan error {
	return sp.errors
}

// Close stops the stream processor
func (sp *StreamProcessor) Close() {
	close(sp.done)
	sp.container.stdin.Close()
}
