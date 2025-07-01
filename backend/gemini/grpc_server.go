package gemini

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"sync"

	pb "github.com/gemini-cli/backend/proto"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// GRPCServer implements the Gemini gRPC service
type GRPCServer struct {
	pb.UnimplementedGeminiServiceServer
	sessionManager *SessionManager
	mu             sync.RWMutex
	streams        map[string]pb.GeminiService_ChatServer
}

// NewGRPCServer creates a new gRPC server
func NewGRPCServer(sandboxManager *SandboxManager) *GRPCServer {
	return &GRPCServer{
		sessionManager: NewSessionManager(sandboxManager, 30*60), // 30 minute timeout
		streams:        make(map[string]pb.GeminiService_ChatServer),
	}
}

// CreateSession creates a new chat session
func (s *GRPCServer) CreateSession(ctx context.Context, req *pb.CreateSessionRequest) (*pb.CreateSessionResponse, error) {
	if req.UserId == "" {
		return &pb.CreateSessionResponse{
			Success: false,
			Error:   "user_id is required",
		}, nil
	}

	if req.WorkspacePath == "" {
		return &pb.CreateSessionResponse{
			Success: false,
			Error:   "workspace_path is required",
		}, nil
	}

	if req.ApiKey == "" {
		return &pb.CreateSessionResponse{
			Success: false,
			Error:   "api_key is required",
		}, nil
	}

	// Create or get session
	session, err := s.sessionManager.GetOrCreateSession(ctx, req.UserId, req.WorkspacePath, req.ApiKey)
	if err != nil {
		return &pb.CreateSessionResponse{
			Success: false,
			Error:   fmt.Sprintf("failed to create session: %v", err),
		}, nil
	}

	return &pb.CreateSessionResponse{
		SessionId: session.UserID, // Using UserID as session ID for simplicity
		Success:   true,
	}, nil
}

// Chat handles streaming chat communication
func (s *GRPCServer) Chat(stream pb.GeminiService_ChatServer) error {
	// First message should contain session ID
	firstReq, err := stream.Recv()
	if err != nil {
		return status.Errorf(codes.InvalidArgument, "failed to receive first message: %v", err)
	}

	sessionID := firstReq.SessionId
	if sessionID == "" {
		return status.Errorf(codes.InvalidArgument, "session_id is required")
	}

	// Get session
	session, ok := s.sessionManager.GetSession(sessionID)
	if !ok {
		return status.Errorf(codes.NotFound, "session not found")
	}

	// Store stream for this session
	s.mu.Lock()
	s.streams[sessionID] = stream
	s.mu.Unlock()

	defer func() {
		s.mu.Lock()
		delete(s.streams, sessionID)
		s.mu.Unlock()
	}()

	// Handle first prompt if provided
	if firstReq.Prompt != "" {
		if err := s.handlePrompt(session, stream, firstReq.Prompt); err != nil {
			return err
		}
	}

	// Process incoming messages
	for {
		req, err := stream.Recv()
		if err == io.EOF {
			return nil
		}
		if err != nil {
			return err
		}

		if req.Prompt != "" {
			if err := s.handlePrompt(session, stream, req.Prompt); err != nil {
				return err
			}
		}
	}
}

// handlePrompt processes a user prompt and streams responses
func (s *GRPCServer) handlePrompt(session *UserSession, stream pb.GeminiService_ChatServer, prompt string) error {
	// Send prompt to Gemini CLI
	if err := session.Processor.SendPrompt(prompt); err != nil {
		return status.Errorf(codes.Internal, "failed to send prompt: %v", err)
	}

	// Create goroutines to handle events and errors
	ctx := stream.Context()
	errChan := make(chan error, 1)

	// Handle events
	go func() {
		for {
			select {
			case <-ctx.Done():
				return
			case event := <-session.Processor.Events():
				resp := &pb.ChatResponse{
					SessionId: session.UserID,
				}

				switch event.Type {
				case "content":
					var content struct {
						Text string `json:"text"`
					}
					if err := json.Unmarshal(event.Content, &content); err == nil {
						resp.Content = &pb.ChatResponse_Text{
							Text: &pb.TextContent{Text: content.Text},
						}
					}

				case "tool_call_request":
					var toolCall struct {
						Name      string          `json:"name"`
						Arguments json.RawMessage `json:"arguments"`
					}
					if err := json.Unmarshal(event.Content, &toolCall); err == nil {
						resp.Content = &pb.ChatResponse_ToolCall{
							ToolCall: &pb.ToolCallRequest{
								ToolName:  toolCall.Name,
								Arguments: string(toolCall.Arguments),
							},
						}
					}

				case "tool_call_response":
					var toolResult struct {
						Name    string `json:"name"`
						Result  string `json:"result"`
						Success bool   `json:"success"`
					}
					if err := json.Unmarshal(event.Content, &toolResult); err == nil {
						resp.Content = &pb.ChatResponse_ToolResult{
							ToolResult: &pb.ToolCallResponse{
								ToolName: toolResult.Name,
								Result:   toolResult.Result,
								Success:  toolResult.Success,
							},
						}
					}

				case "error":
					var errorContent struct {
						Message string `json:"message"`
						Code    string `json:"code"`
					}
					if err := json.Unmarshal(event.Content, &errorContent); err == nil {
						resp.Content = &pb.ChatResponse_Error{
							Error: &pb.ErrorContent{
								Message: errorContent.Message,
								Code:    errorContent.Code,
							},
						}
					}

				case "thought":
					var thought struct {
						Text string `json:"text"`
					}
					if err := json.Unmarshal(event.Content, &thought); err == nil {
						resp.Content = &pb.ChatResponse_Thought{
							Thought: &pb.ThoughtContent{
								Thought: thought.Text,
							},
						}
					}
				}

				if resp.Content != nil {
					if err := stream.Send(resp); err != nil {
						errChan <- err
						return
					}
				}
			}
		}
	}()

	// Handle errors
	go func() {
		for {
			select {
			case <-ctx.Done():
				return
			case err := <-session.Processor.Errors():
				resp := &pb.ChatResponse{
					SessionId: session.UserID,
					Content: &pb.ChatResponse_Error{
						Error: &pb.ErrorContent{
							Message: err.Error(),
							Code:    "STREAM_ERROR",
						},
					},
				}
				if err := stream.Send(resp); err != nil {
					errChan <- err
					return
				}
			}
		}
	}()

	// Wait for context cancellation or error
	select {
	case <-ctx.Done():
		return nil
	case err := <-errChan:
		return err
	}
}

// EndSession ends a chat session
func (s *GRPCServer) EndSession(ctx context.Context, req *pb.EndSessionRequest) (*pb.EndSessionResponse, error) {
	if req.SessionId == "" {
		return &pb.EndSessionResponse{
			Success: false,
			Error:   "session_id is required",
		}, nil
	}

	s.sessionManager.RemoveSession(req.SessionId)

	return &pb.EndSessionResponse{
		Success: true,
	}, nil
}

// GetSessionStatus gets the status of a session
func (s *GRPCServer) GetSessionStatus(ctx context.Context, req *pb.GetSessionStatusRequest) (*pb.GetSessionStatusResponse, error) {
	if req.SessionId == "" {
		return nil, status.Errorf(codes.InvalidArgument, "session_id is required")
	}

	session, ok := s.sessionManager.GetSession(req.SessionId)
	if !ok {
		return nil, status.Errorf(codes.NotFound, "session not found")
	}

	return &pb.GetSessionStatusResponse{
		SessionId:    session.UserID,
		UserId:       session.UserID,
		Active:       true,
		CreatedAt:    session.Container.created.Unix(),
		LastActivity: session.LastUsed.Unix(),
	}, nil
}

// Cleanup cleans up all resources
func (s *GRPCServer) Cleanup() {
	log.Println("Cleaning up gRPC server...")
	s.sessionManager.Cleanup()
}
