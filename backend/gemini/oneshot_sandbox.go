package gemini

import (
	"bufio"
	"context"
	"fmt"
	"os/exec"
	"strings"
)

// RunOneShotGemini runs a single Gemini command and returns the response
func RunOneShotGemini(ctx context.Context, prompt, workspace, apiKey, imageName string) (string, error) {
	args := []string{
		"run",
		"--rm",
		"-i",
		"--workdir", "/workspace",
		"--volume", fmt.Sprintf("%s:/workspace:rw", workspace),
		"--env", fmt.Sprintf("GEMINI_API_KEY=%s", apiKey),
		"--memory", "2g",
		"--cpus", "1.0",
		imageName,
		"gemini", "--prompt", prompt,
	}

	cmd := exec.CommandContext(ctx, detectDockerCommand(), args...)
	
	// Capture output
	var output strings.Builder
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return "", err
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		return "", err
	}

	if err := cmd.Start(); err != nil {
		return "", err
	}

	// Read stdout
	scanner := bufio.NewScanner(stdout)
	for scanner.Scan() {
		line := scanner.Text()
		// Skip warning messages
		if !strings.Contains(line, "WARNING:") && !strings.Contains(line, "Warning:") {
			output.WriteString(line + "\n")
		}
	}

	// Read stderr for debugging
	go func() {
		scanner := bufio.NewScanner(stderr)
		for scanner.Scan() {
			// Log but don't return stderr
			fmt.Printf("[OneShot stderr]: %s\n", scanner.Text())
		}
	}()

	if err := cmd.Wait(); err != nil {
		return "", err
	}

	return strings.TrimSpace(output.String()), nil
}