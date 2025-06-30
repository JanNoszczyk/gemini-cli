/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as grpc from '@grpc/grpc-js';
import { gemini } from '../proto/generated/gemini';
import { SessionManager } from './SessionManager';
import { MessageBuilders } from '../utils/MessageBuilders';
import { MessageValidators } from '../utils/MessageValidators';
import { HelpManager } from '../services/HelpManager';
import { ErrorHandler, ErrorCategory } from '../services/ErrorHandler';
import { AuthenticationManager } from '../services/AuthenticationManager';

/**
 * Implementation of the Gemini gRPC service
 */
export class GrpcServiceImpl {
  private sessionManager: SessionManager;
  private helpManager: HelpManager;
  private globalErrorHandler: ErrorHandler;
  private authManager: AuthenticationManager;

  constructor() {
    this.sessionManager = new SessionManager();
    this.helpManager = new HelpManager();
    this.globalErrorHandler = new ErrorHandler(false);
    this.authManager = new AuthenticationManager();
  }

  /**
   * Main Chat RPC - bidirectional streaming
   */
  chat(
    call: grpc.ServerDuplexStream<gemini.ClientRequest, gemini.ServerResponse>
  ): void {
    let sessionId: string | undefined;
    let isInitialized = false;

    call.on('data', async (request: gemini.ClientRequest) => {
      try {
        // Check authentication for sensitive operations if not in development
        const requireAuth = process.env.NODE_ENV !== 'development' && process.env.REQUIRE_AUTH === 'true';
        if (requireAuth && !(await this.checkPermission(call, 'chat'))) {
          call.write(MessageBuilders.errorMessage(
            'Authentication required',
            'This operation requires valid authentication credentials'
          ));
          return;
        }

        // Handle StartRequest
        if (request.start_request) {
          const validation = MessageValidators.validateStartRequest(request.start_request);
          if (!validation.isValid) {
            call.write(MessageBuilders.errorMessage(
              'Invalid start request',
              validation.errors.join('; ')
            ));
            return;
          }

          sessionId = this.sessionManager.createSession(request.start_request);
          
          // Send session started response
          call.write(MessageBuilders.sessionStarted(
            sessionId,
            request.start_request.model || 'gemini-1.5-pro-latest'
          ));

          // Initialize the chat
          await this.sessionManager.initializeChat(sessionId, call);
          isInitialized = true;

          // If initial prompt provided, process it
          if (request.start_request.initial_prompt) {
            const chatMessage = new gemini.ChatMessage({
              content: request.start_request.initial_prompt,
              is_shell_command: false,
            });
            await this.sessionManager.handleChatMessage(sessionId, chatMessage, call);
          }
        }

        // Handle ChatMessage
        else if (request.chat_message && sessionId && isInitialized) {
          const validation = MessageValidators.validateChatMessage(request.chat_message);
          if (!validation.isValid) {
            call.write(MessageBuilders.errorMessage(
              'Invalid chat message',
              validation.errors.join('; ')
            ));
            return;
          }

          await this.sessionManager.handleChatMessage(
            sessionId,
            request.chat_message,
            call
          );
        }

        // Handle ToolConfirmationResponse
        else if (request.tool_confirmation && sessionId) {
          const validation = MessageValidators.validateToolConfirmationResponse(
            request.tool_confirmation
          );
          if (!validation.isValid) {
            call.write(MessageBuilders.errorMessage(
              'Invalid confirmation response',
              validation.errors.join('; ')
            ));
            return;
          }

          const handled = await this.sessionManager.handleToolConfirmation(
            sessionId,
            request.tool_confirmation
          );
          
          if (!handled) {
            call.write(MessageBuilders.warningMessage(
              'Unknown confirmation ID',
              'The confirmation request may have expired'
            ));
          }
        }

        // Handle ConfigUpdate
        else if (request.config_update && sessionId) {
          const validation = MessageValidators.validateConfigUpdateRequest(
            request.config_update
          );
          if (!validation.isValid) {
            call.write(MessageBuilders.errorMessage(
              'Invalid config update',
              validation.errors.join('; ')
            ));
            return;
          }

          await this.sessionManager.updateConfig(
            sessionId,
            request.config_update,
            call
          );
        }

        // Handle RefreshContext
        else if (request.refresh_context && sessionId) {
          try {
            const contextSummary = await this.sessionManager.refreshContext(
              sessionId,
              request.refresh_context.force || false
            );
            
            call.write(MessageBuilders.contextSummary(contextSummary));
            call.write(MessageBuilders.infoMessage(
              'Context refreshed successfully',
              'Updated loaded files, MCP servers, and memory information'
            ));
          } catch (error) {
            call.write(MessageBuilders.errorMessage(
              'Context refresh failed',
              error instanceof Error ? error.message : 'Unknown error'
            ));
          }
        }

        // Handle CancelOperation
        else if (request.cancel_operation && sessionId) {
          const session = this.sessionManager.getSession(sessionId);
          if (session) {
            session.confirmationManager.cancelAllConfirmations();
            call.write(MessageBuilders.infoMessage(
              'All pending operations cancelled'
            ));
          }
        }

        // Handle GetHelp
        else if (request.get_help) {
          const helpResponse = this.helpManager.getHelp(request.get_help.command);
          call.write(helpResponse);
        }

        // Handle AutoComplete
        else if (request.auto_complete) {
          const validation = MessageValidators.validateAutoCompleteRequest(
            request.auto_complete
          );
          if (!validation.isValid) {
            call.write(MessageBuilders.errorMessage(
              'Invalid auto-complete request',
              validation.errors.join('; ')
            ));
            return;
          }

          const completions = this.getAutoCompletions(request.auto_complete);
          call.write(MessageBuilders.autoCompleteResult(completions));
        }

        // Invalid request
        else {
          call.write(MessageBuilders.errorMessage(
            'Invalid request',
            'Request must contain one of: start_request, chat_message, tool_confirmation, etc.'
          ));
        }
      } catch (error) {
        console.error('Error handling request:', error);
        
        // Get session error handler if available
        const session = sessionId ? this.sessionManager.getSession(sessionId) : undefined;
        const errorHandler = session?.errorHandler || this.globalErrorHandler;
        
        // Send comprehensive error response
        errorHandler.sendError(call, error, {
          category: ErrorCategory.INTERNAL,
          code: 'REQUEST_PROCESSING_ERROR',
          recoverable: true,
          suggestions: [
            'Check your request format',
            'Ensure the session is properly initialized',
            'Try the request again',
          ],
        });
      }
    });

    call.on('end', () => {
      console.log('Client disconnected');
      if (sessionId) {
        this.sessionManager.terminateSession(sessionId);
      }
    });

    call.on('error', (err) => {
      console.error('Stream error:', err);
      if (sessionId) {
        this.sessionManager.terminateSession(sessionId);
      }
    });
  }

  /**
   * Get session info RPC
   */
  getSessionInfo(
    call: grpc.ServerUnaryCall<gemini.SessionInfoRequest, gemini.SessionInfoResponse>,
    callback: grpc.sendUnaryData<gemini.SessionInfoResponse>
  ): void {
    try {
      const session = this.sessionManager.getSession(call.request.session_id);
      if (!session) {
        callback({
          code: grpc.status.NOT_FOUND,
          details: 'Session not found',
        });
        return;
      }

      const response = new gemini.SessionInfoResponse({
        session_id: session.id,
        model: session.config.getModel() || 'gemini-1.5-pro-latest',
        turn_count: session.stats.turnCount,
        created_at: session.stats.startTime.getTime(),
      });

      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get session stats RPC
   */
  getSessionStats(
    call: grpc.ServerUnaryCall<gemini.SessionStatsRequest, gemini.SessionStatsResponse>,
    callback: grpc.sendUnaryData<gemini.SessionStatsResponse>
  ): void {
    try {
      const stats = this.sessionManager.getSessionStats(call.request.session_id);
      const response = new gemini.SessionStatsResponse({
        stats: stats,
      });

      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: error instanceof Error ? error.message : 'Session not found',
      });
    }
  }

  /**
   * Update config RPC
   */
  updateConfig(
    call: grpc.ServerUnaryCall<gemini.ConfigUpdateRequest, gemini.ConfigUpdateResponse>,
    callback: grpc.sendUnaryData<gemini.ConfigUpdateResponse>
  ): void {
    // This RPC is for global config updates, not session-specific
    // For now, return success
    callback(null, new gemini.ConfigUpdateResponse({
      success: true,
    }));
  }

  /**
   * Get config RPC
   */
  getConfig(
    call: grpc.ServerUnaryCall<gemini.GetConfigRequest, gemini.GetConfigResponse>,
    callback: grpc.sendUnaryData<gemini.GetConfigResponse>
  ): void {
    try {
      if (call.request.session_id) {
        const session = this.sessionManager.getSession(call.request.session_id);
        if (!session) {
          callback({
            code: grpc.status.NOT_FOUND,
            details: 'Session not found',
          });
          return;
        }

        const currentConfig = session.configurationManager.getCurrentConfig();
        const response = new gemini.GetConfigResponse({
          config: new gemini.CurrentConfig({
            model: currentConfig.model,
            approval_mode: this.mapApprovalModeToProto(currentConfig.approvalMode),
            theme: currentConfig.theme,
            editor_type: currentConfig.editorType,
            show_tool_descriptions: currentConfig.showToolDescriptions,
            show_error_details: currentConfig.showErrorDetails,
            enabled_tools: currentConfig.enabledTools,
            mcp_servers: currentConfig.mcpServers,
          }),
        });

        callback(null, response);
      } else {
        // Return global config
        const response = new gemini.GetConfigResponse({
          config: new gemini.CurrentConfig({
            model: 'gemini-1.5-pro-latest',
            approval_mode: gemini.ApprovalMode.DEFAULT,
            theme: 'default',
            editor_type: 'vim',
            show_tool_descriptions: true,
            show_error_details: false,
            enabled_tools: [
              'ls',
              'read_file',
              'write_file',
              'edit',
              'shell',
              'web_fetch',
              'grep',
              'glob',
            ],
            mcp_servers: [],
          }),
        });
        callback(null, response);
      }
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // ============ File Operation Endpoints ============

  

  /**
   * Read file endpoint
   */
  async readFile(
    call: grpc.ServerUnaryCall<gemini.FileReadRequest, gemini.FileReadResponse>,
    callback: grpc.sendUnaryData<gemini.FileReadResponse>
  ): Promise<void> {
    try {
      // Check authentication if required
      const requireAuth = process.env.NODE_ENV === 'production' || process.env.REQUIRE_AUTH === 'true';
      if (requireAuth && !(await this.checkPermission(call, 'read'))) {
        callback(null, new gemini.FileReadResponse({
          success: false,
          error_message: 'Permission denied: Authentication required'
        }));
        return;
      }
      
      const request = call.request;
      
      if (!request.session_id || !request.file_path) {
        callback(null, new gemini.FileReadResponse({
          success: false,
          error_message: 'session_id and file_path are required'
        }));
        return;
      }

      const result = await this.sessionManager.readFile(
        request.session_id,
        request.file_path,
        request.encoding || 'utf8'
      );

      callback(null, new gemini.FileReadResponse({
        success: true,
        content: result.content,
        metadata: new gemini.FileMetadata({
          path: result.metadata.path,
          size: result.metadata.size,
          mtime: result.metadata.mtime.getTime(),
          type: result.metadata.type,
          permissions: result.metadata.permissions,
          checksum: result.metadata.checksum,
          encoding: result.metadata.encoding
        })
      }));
    } catch (error) {
      callback(null, new gemini.FileReadResponse({
        success: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }

  /**
   * Write file endpoint
   */
  async writeFile(
    call: grpc.ServerUnaryCall<gemini.FileWriteRequest, gemini.FileOperationResponse>,
    callback: grpc.sendUnaryData<gemini.FileOperationResponse>
  ): Promise<void> {
    try {
      // Check authentication if required
      const requireAuth = process.env.NODE_ENV === 'production' || process.env.REQUIRE_AUTH === 'true';
      if (requireAuth && !(await this.checkPermission(call, 'write'))) {
        callback(null, new gemini.FileOperationResponse({
          success: false,
          error_message: 'Permission denied: Authentication required'
        }));
        return;
      }
      
      const request = call.request;
      
      if (!request.session_id || !request.file_path || !request.content) {
        callback(null, new gemini.FileOperationResponse({
          success: false,
          error_message: 'session_id, file_path, and content are required'
        }));
        return;
      }

      const operation = await this.sessionManager.writeFile(
        request.session_id,
        request.file_path,
        request.content,
        {
          encoding: request.encoding || 'utf8',
          backup: request.backup,
          createDirectories: request.create_directories,
          confirmOverwrite: request.confirm_overwrite
        }
      );

      callback(null, new gemini.FileOperationResponse({
        success: true,
        operation_id: operation.id,
        preview: operation.preview ? MessageBuilders.convertFileDiffToProto(operation.preview) : undefined
      }));
    } catch (error) {
      callback(null, new gemini.FileOperationResponse({
        success: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }

  /**
   * Edit file endpoint
   */
  async editFile(
    call: grpc.ServerUnaryCall<gemini.FileEditRequest, gemini.FileOperationResponse>,
    callback: grpc.sendUnaryData<gemini.FileOperationResponse>
  ): Promise<void> {
    try {
      // Check authentication if required
      const requireAuth = process.env.NODE_ENV === 'production' || process.env.REQUIRE_AUTH === 'true';
      if (requireAuth && !(await this.checkPermission(call, 'write'))) {
        callback(null, new gemini.FileOperationResponse({
          success: false,
          error_message: 'Permission denied: Authentication required'
        }));
        return;
      }
      
      const request = call.request;
      
      if (!request.session_id || !request.file_path || !request.patches.length) {
        callback(null, new gemini.FileOperationResponse({
          success: false,
          error_message: 'session_id, file_path, and patches are required'
        }));
        return;
      }

      const patches = request.patches.map(patch => ({
        startLine: patch.start_line,
        endLine: patch.end_line,
        newContent: patch.new_content
      }));

      const operation = await this.sessionManager.editFile(
        request.session_id,
        request.file_path,
        patches,
        { backup: request.backup }
      );

      callback(null, new gemini.FileOperationResponse({
        success: true,
        operation_id: operation.id,
        preview: operation.preview ? MessageBuilders.convertFileDiffToProto(operation.preview) : undefined
      }));
    } catch (error) {
      callback(null, new gemini.FileOperationResponse({
        success: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }

  /**
   * Delete file endpoint
   */
  async deleteFile(
    call: grpc.ServerUnaryCall<gemini.FileDeleteRequest, gemini.FileOperationResponse>,
    callback: grpc.sendUnaryData<gemini.FileOperationResponse>
  ): Promise<void> {
    try {
      // Check authentication if required
      const requireAuth = process.env.NODE_ENV === 'production' || process.env.REQUIRE_AUTH === 'true';
      if (requireAuth && !(await this.checkPermission(call, 'write'))) {
        callback(null, new gemini.FileOperationResponse({
          success: false,
          error_message: 'Permission denied: Authentication required'
        }));
        return;
      }
      
      const request = call.request;
      
      if (!request.session_id || !request.file_path) {
        callback(null, new gemini.FileOperationResponse({
          success: false,
          error_message: 'session_id and file_path are required'
        }));
        return;
      }

      const session = this.sessionManager.getSession(request.session_id);
      if (!session) {
        callback(null, new gemini.FileOperationResponse({
          success: false,
          error_message: 'Session not found'
        }));
        return;
      }

      const operation = await session.fileManager.deleteFile(
        request.file_path,
        { recursive: request.recursive, backup: request.backup }
      );

      callback(null, new gemini.FileOperationResponse({
        success: true,
        operation_id: operation.id
      }));
    } catch (error) {
      callback(null, new gemini.FileOperationResponse({
        success: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }

  /**
   * Move file endpoint
   */
  async moveFile(
    call: grpc.ServerUnaryCall<gemini.FileMoveRequest, gemini.FileOperationResponse>,
    callback: grpc.sendUnaryData<gemini.FileOperationResponse>
  ): Promise<void> {
    try {
      const request = call.request;
      
      if (!request.session_id || !request.source_path || !request.target_path) {
        callback(null, new gemini.FileOperationResponse({
          success: false,
          error_message: 'session_id, source_path, and target_path are required'
        }));
        return;
      }

      const session = this.sessionManager.getSession(request.session_id);
      if (!session) {
        callback(null, new gemini.FileOperationResponse({
          success: false,
          error_message: 'Session not found'
        }));
        return;
      }

      const operation = await session.fileManager.moveFile(
        request.source_path,
        request.target_path
      );

      callback(null, new gemini.FileOperationResponse({
        success: true,
        operation_id: operation.id
      }));
    } catch (error) {
      callback(null, new gemini.FileOperationResponse({
        success: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }

  /**
   * List directory endpoint
   */
  async listDirectory(
    call: grpc.ServerUnaryCall<gemini.DirectoryListRequest, gemini.DirectoryListResponse>,
    callback: grpc.sendUnaryData<gemini.DirectoryListResponse>
  ): Promise<void> {
    try {
      // Check authentication if required
      const requireAuth = process.env.NODE_ENV === 'production' || process.env.REQUIRE_AUTH === 'true';
      if (requireAuth && !(await this.checkPermission(call, 'read'))) {
        callback(null, new gemini.DirectoryListResponse({
          success: false,
          error_message: 'Permission denied: Authentication required'
        }));
        return;
      }
      
      const request = call.request;
      
      if (!request.session_id || !request.directory_path) {
        callback(null, new gemini.DirectoryListResponse({
          success: false,
          error_message: 'session_id and directory_path are required'
        }));
        return;
      }

      const options: any = {
        recursive: request.recursive,
        includeHidden: request.include_hidden
      };

      if (request.pattern) {
        try {
          options.pattern = new RegExp(request.pattern);
        } catch (error) {
          callback(null, new gemini.DirectoryListResponse({
            success: false,
            error_message: 'Invalid regex pattern'
          }));
          return;
        }
      }

      const results = await this.sessionManager.listDirectory(
        request.session_id,
        request.directory_path,
        options
      );

      const files = results.map(file => new gemini.FileMetadata({
        path: file.path,
        size: file.size,
        mtime: file.mtime.getTime(),
        type: file.type,
        permissions: file.permissions,
        checksum: file.checksum,
        encoding: file.encoding
      }));

      callback(null, new gemini.DirectoryListResponse({
        success: true,
        files: files
      }));
    } catch (error) {
      callback(null, new gemini.DirectoryListResponse({
        success: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }

  /**
   * Generate diff endpoint
   */
  async generateDiff(
    call: grpc.ServerUnaryCall<gemini.DiffGenerationRequest, gemini.DiffGenerationResponse>,
    callback: grpc.sendUnaryData<gemini.DiffGenerationResponse>
  ): Promise<void> {
    try {
      // Check authentication if required
      const requireAuth = process.env.NODE_ENV === 'production' || process.env.REQUIRE_AUTH === 'true';
      if (requireAuth && !(await this.checkPermission(call, 'read'))) {
        callback(null, new gemini.DiffGenerationResponse({
          success: false,
          error_message: 'Permission denied: Authentication required'
        }));
        return;
      }
      
      const request = call.request;
      
      if (!request.session_id || !request.file_path || !request.old_content || !request.new_content) {
        callback(null, new gemini.DiffGenerationResponse({
          success: false,
          error_message: 'session_id, file_path, old_content, and new_content are required'
        }));
        return;
      }

      const diff = this.sessionManager.generateFileDiff(
        request.session_id,
        request.file_path,
        request.old_content,
        request.new_content
      );

      callback(null, new gemini.DiffGenerationResponse({
        success: true,
        diff: MessageBuilders.convertFileDiffToProto(diff)
      }));
    } catch (error) {
      callback(null, new gemini.DiffGenerationResponse({
        success: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }

  /**
   * Map ApprovalMode from core to proto
   */
  private mapApprovalModeToProto(mode: string): gemini.ApprovalMode {
    switch (mode) {
      case 'autoEdit':
        return gemini.ApprovalMode.AUTO_EDIT;
      case 'yolo':
        return gemini.ApprovalMode.YOLO;
      default:
        return gemini.ApprovalMode.DEFAULT;
    }
  }

  /**
   * Get auto-completions
   */
  private getAutoCompletions(
    request: gemini.AutoCompleteRequest
  ): gemini.Completion[] {
    const completions: gemini.Completion[] = [];
    const input = request.input.slice(0, request.cursor_position);

    // Command completions
    if (input.startsWith('/')) {
      const commands = ['help', 'model', 'config', 'stats', 'clear', 'exit'];
      const prefix = input.slice(1);
      
      commands
        .filter(cmd => cmd.startsWith(prefix))
        .forEach(cmd => {
          completions.push(new gemini.Completion({
            value: `/${cmd}`,
            display: cmd,
            type: gemini.CompletionType.COMPLETION_COMMAND,
            description: `Execute ${cmd} command`,
          }));
        });
    }

    // Tool name completions
    else if (input.includes(' ')) {
      const tools = ['ls', 'read_file', 'write_file', 'edit', 'shell'];
      const lastWord = input.split(' ').pop() || '';
      
      tools
        .filter(tool => tool.startsWith(lastWord))
        .forEach(tool => {
          completions.push(new gemini.Completion({
            value: tool,
            display: tool,
            type: gemini.CompletionType.COMPLETION_TOOL_NAME,
            description: `Use ${tool} tool`,
          }));
        });
    }

    return completions;
  }

  /**
   * Check if the call has permission for the requested operation
   */
  private async checkPermission(call: grpc.ServerWritableStream<any, any>, permission: string): Promise<boolean> {
    const metadata = call.metadata;
    const authHeader = metadata.get('authorization')[0];
    
    if (!authHeader) {
      return false;
    }
    
    const token = authHeader.toString().replace('Bearer ', '');
    const context = await this.authManager.validateApiKey(token);
    
    if (!context || !context.authenticated) {
      return false;
    }
    
    // Check if the user has the required permission or wildcard permission
    return context.permissions.includes(permission) || context.permissions.includes('*');
  }
}