/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { gemini } from '../proto/generated/gemini';
import {
  createContentGenerator,
  executeToolCall,
  GeminiChat,
  Config,
  AuthType,
  ApprovalMode,
  ConfigParameters,
  ToolCallRequestInfo,
  ToolCallResponseInfo,
  ContentGeneratorConfig,
} from '@google/gemini-cli-core';
import { v4 as uuidv4 } from 'uuid';
import * as grpc from '@grpc/grpc-js';
import { ConfirmationManager } from '../services/ConfirmationManager';
import { StreamingManager } from '../services/StreamingManager';
import { ConfigurationManager } from '../services/ConfigurationManager';
import { SlashCommandHandler } from '../services/SlashCommandHandler';
import { ErrorHandler, ErrorCategory } from '../services/ErrorHandler';
import { HelpManager } from '../services/HelpManager';
import { SessionMonitor } from '../services/SessionMonitor';
import { MetricsCollector } from '../services/MetricsCollector';
import { FileManager } from '../services/FileManager';
import { MessageBuilders } from '../utils/MessageBuilders';
import { MessageValidators } from '../utils/MessageValidators';

interface SessionState {
  id: string;
  geminiChat: GeminiChat | null;
  confirmationManager: ConfirmationManager;
  streamingManager: StreamingManager;
  configurationManager: ConfigurationManager;
  errorHandler: ErrorHandler;
  fileManager: FileManager;
  config: Config;
  stats: {
    turnCount: number;
    toolsExecuted: number;
    filesModified: number;
    startTime: Date;
    totalApiTime: number;
    totalTokens: {
      input: number;
      output: number;
      cached: number;
      reasoning: number;
    };
  };
  isTerminated: boolean;
}

export class SessionManager {
  private sessions = new Map<string, SessionState>();
  private helpManager = new HelpManager();
  private sessionMonitor = new SessionMonitor();
  private metricsCollector = new MetricsCollector();
  private slashCommandHandler = new SlashCommandHandler(this.helpManager);

  createSession(startRequest: gemini.StartRequest): string {
    const sessionId = startRequest.session_id || uuidv4();
    const confirmationManager = new ConfirmationManager();
    const streamingManager = new StreamingManager();
    const errorHandler = new ErrorHandler(false); // Will be updated based on config

    // Create config parameters
    const configParams: ConfigParameters = {
      sessionId: sessionId,
      model: startRequest.model || 'gemini-1.5-pro-latest',
      embeddingModel: 'text-embedding-004',
      targetDir: process.cwd(),
      cwd: process.cwd(),
      debugMode: false,
      fullContext: false,
      approvalMode: this.mapApprovalMode(startRequest.approval_mode),
      coreTools: startRequest.core_tools || [],
      checkpointing: false,
      fileFiltering: {
        respectGitIgnore: true,
        enableRecursiveFileSearch: true,
      },
      extensionContextFilePaths: [],
    };

    // Set MCP servers if provided
    if (startRequest.mcp_servers && startRequest.mcp_servers.length > 0) {
      configParams.mcpServers = {};
      startRequest.mcp_servers.forEach(server => {
        if (configParams.mcpServers) {
          configParams.mcpServers[server.name] = {
            command: server.command,
            args: server.args || [],
            env: Object.fromEntries(Object.entries(server.env || {})),
          };
        }
      });
    }

    // Create config
    const config = new Config(configParams);
    
    // Create configuration manager
    const configurationManager = new ConfigurationManager(config);

    // Create file manager
    const fileManager = new FileManager();

    // Set approval mode
    const approvalMode = this.mapApprovalMode(startRequest.approval_mode);
    confirmationManager.setApprovalMode(approvalMode);
    
    // Apply initial configuration from request
    if (startRequest.theme) {
      configurationManager.updateTheme(startRequest.theme);
    }
    if (startRequest.editor_type) {
      configurationManager.updateEditorType(startRequest.editor_type);
    }

    const session: SessionState = {
      id: sessionId,
      geminiChat: null,
      confirmationManager,
      streamingManager,
      configurationManager,
      errorHandler,
      fileManager,
      config,
      stats: {
        turnCount: 0,
        toolsExecuted: 0,
        filesModified: 0,
        startTime: new Date(),
        totalApiTime: 0,
        totalTokens: { input: 0, output: 0, cached: 0, reasoning: 0 },
      },
      isTerminated: false,
    };

    this.sessions.set(sessionId, session);
    
    // Initialize session tracking for analytics
    this.sessionMonitor.initializeSession(sessionId);
    
    return sessionId;
  }

  getSession(sessionId: string): SessionState | undefined {
    return this.sessions.get(sessionId);
  }

  async initializeChat(
    sessionId: string,
    stream: grpc.ServerDuplexStream<gemini.ClientRequest, gemini.ServerResponse>
  ): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    // Set the stream for the streaming manager
    session.streamingManager.setStream(stream);

    // Create the UI interface
    const ui = {
      error: (message: string) => {
        // Use ErrorHandler for comprehensive error handling
        session.errorHandler.sendError(stream, new Error(message));
      },
      info: (message: string) => {
        stream.write(MessageBuilders.infoMessage(message));
      },
      warning: (message: string) => {
        stream.write(MessageBuilders.warningMessage(message));
      },
      chatContent: (content: string, type: 'user' | 'gemini', isStreaming: boolean) => {
        const contentType = type === 'user' 
          ? gemini.ChatContent.ContentType.USER 
          : gemini.ChatContent.ContentType.GEMINI;
        
        if (isStreaming) {
          if (!session.streamingManager.isStreaming()) {
            session.streamingManager.startStreaming(contentType);
          }
          // For streaming, we need to send only the new content
          const currentContent = session.streamingManager.getCurrentStreamContent();
          const newContent = content.substring(currentContent.length);
          if (newContent) {
            session.streamingManager.appendStreamContent(newContent);
          }
        } else {
          // For non-streaming, just send the final content
          if (session.streamingManager.isStreaming()) {
            session.streamingManager.endStreaming();
          } else {
            stream.write(MessageBuilders.chatContent(content, contentType, false));
          }
        }
      },
      thoughtBubble: (thought: string) => {
        session.streamingManager.sendThoughtWithProgress('Thinking', thought, 3000);
      },
      toolStatus: (toolName: string, status: string) => {
        stream.write(MessageBuilders.toolStatusUpdate(
          uuidv4(),
          toolName,
          gemini.ToolStatusUpdate.Status.EXECUTING,
          status
        ));
      },
      toolOutput: (toolName: string, output: string) => {
        session.streamingManager.streamToolOutput(
          uuidv4(),
          toolName,
          output,
          false
        );
      },
      spinner: (message: string) => {
        const operationId = uuidv4();
        session.streamingManager.startProgress(
          operationId,
          'Processing',
          message,
          undefined,
          1500
        );
        // Auto-end after 30 seconds if not ended
        setTimeout(() => {
          session.streamingManager.endProgress(operationId);
        }, 30000);
      },
      // Additional UI methods required by the interface
      table: () => {}, // Not supported in gRPC
      link: () => {}, // Not supported in gRPC
      codeBlock: (code: string, language?: string) => {
        stream.write(MessageBuilders.chatContent(`\`\`\`${language || ''}\n${code}\n\`\`\``, gemini.ChatContent.ContentType.GEMINI));
      },
      confirm: async () => true, // Handled by ConfirmationManager
      selectFromList: async () => 0, // Not supported in gRPC
      askOpenAiApiKey: async () => '', // Not supported in gRPC
      askIfUserWantsToRetry: async () => false, // Not supported in gRPC
      promptInput: async () => '', // Not supported in gRPC
      keypress: async () => ({ name: '' }), // Not supported in gRPC
    };
    
    // Create content generator config
    const contentGeneratorConfig: ContentGeneratorConfig = {
      model: session.config.getModel(),
      apiKey: process.env.GEMINI_API_KEY || '',
      authType: AuthType.USE_GEMINI,
    };
    
    // Get content generator
    const contentGenerator = await createContentGenerator(contentGeneratorConfig);
    
    // Create GeminiChat instance
    session.geminiChat = new GeminiChat(session.config, contentGenerator);

    // Set up confirmation handling
    session.confirmationManager.on('confirmationRequest', (request: gemini.ServerResponse) => {
      stream.write(request);
    });
  }

  async handleChatMessage(
    sessionId: string,
    message: gemini.ChatMessage,
    stream: grpc.ServerDuplexStream<gemini.ClientRequest, gemini.ServerResponse>
  ): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session || !session.geminiChat) {
      throw new Error('Session not initialized');
    }

    const startTime = Date.now();
    let success = true;

    try {
      // Update stats
      session.stats.turnCount++;

      // Check for slash commands first
      if (this.slashCommandHandler.isSlashCommand(message.content)) {
        const result = await this.slashCommandHandler.handleCommand(
          message.content,
          session,
          stream
        );
        
        if (result.handled) {
          if (result.response) {
            stream.write(result.response);
          }
          // Track successful slash command processing
          const responseTime = Date.now() - startTime;
          this.sessionMonitor.trackMessage(sessionId, message.content.length, responseTime, true);
          this.metricsCollector.recordMetric('response_time_ms', responseTime);
          this.metricsCollector.recordMetric('messages_per_minute', 1);
          return;
        }
      }

    // Handle shell command differently
    if (message.is_shell_command) {
      // Execute as shell command
      const toolCall = {
        name: 'shell',
        args: { command: message.content },
      };

      // Request confirmation if needed
      const confirmation = await session.confirmationManager.requestConfirmation(
        toolCall,
        gemini.ToolConfirmationRequest.ConfirmationType.SHELL_COMMAND,
        `Execute command: ${message.content}`
      );

      if (confirmation.selected_option !== gemini.ConfirmationOption.OptionType.CANCEL) {
        // Execute the tool
        const startTime = Date.now();
        const toolRegistry = await session.config.getToolRegistry();
        const toolId = uuidv4();
        
        // Start progress for tool execution
        session.streamingManager.startProgress(
          toolId,
          'Executing shell command',
          'Starting...',
          ['Executing...', 'Processing output...', 'Almost done...'],
          1000
        );
        
        // Send tool status update
        stream.write(MessageBuilders.toolStatusUpdate(
          toolId,
          'shell',
          gemini.ToolStatusUpdate.Status.EXECUTING,
          'Executing command'
        ));
        
        const toolCallRequest: ToolCallRequestInfo = {
          callId: toolId,
          name: toolCall.name,
          args: toolCall.args,
          isClientInitiated: true,
        };
        
        try {
          const result = await executeToolCall(
            session.config,
            toolCallRequest,
            toolRegistry
          );
          
          const toolExecutionTime = Date.now() - startTime;
          session.stats.toolsExecuted++;
          session.stats.totalApiTime += toolExecutionTime;
          
          // Track tool execution
          this.sessionMonitor.trackToolExecution(sessionId, 'shell', toolExecutionTime, true);
          this.metricsCollector.recordMetric('tool_executions_per_minute', 1);
          this.metricsCollector.recordMetric('tool_success_rate', 100);

          // End progress
          session.streamingManager.endProgress(toolId, 'Complete');

          // Send final result
          stream.write(MessageBuilders.toolStatusUpdate(
            toolId,
            'shell',
            gemini.ToolStatusUpdate.Status.SUCCESS,
            'Command executed successfully',
            result.responseParts,
            result.error?.message,
            Date.now() - startTime
          ));
          
          // Stream the output if available
          if (result.responseParts && typeof result.responseParts === 'string') {
            session.streamingManager.streamToolOutput(
              toolId,
              'shell',
              result.responseParts,
              false
            );
          }
        } catch (error) {
          // End progress with error
          session.streamingManager.endProgress(toolId);
          
          // Send error status
          stream.write(MessageBuilders.toolStatusUpdate(
            toolId,
            'shell',
            gemini.ToolStatusUpdate.Status.ERROR,
            'Command failed',
            undefined,
            error instanceof Error ? error.message : 'Unknown error',
            Date.now() - startTime
          ));
          
          // Stream error output
          session.streamingManager.streamToolOutput(
            toolId,
            'shell',
            error instanceof Error ? error.message : 'Unknown error',
            true
          );
          
          // Track failed tool execution
          const toolExecutionTime = Date.now() - startTime;
          this.sessionMonitor.trackToolExecution(sessionId, 'shell', toolExecutionTime, false);
          this.sessionMonitor.trackError(sessionId, 'TOOL_EXECUTION_ERROR', error instanceof Error ? error.message : 'Unknown error');
          this.metricsCollector.recordMetric('tool_success_rate', 0);
          
          // Also handle with ErrorHandler for suggestions
          session.errorHandler.handleError(error, {
            category: ErrorCategory.TOOL_EXECUTION,
            code: 'SHELL_COMMAND_FAILED',
            suggestions: [
              'Check the command syntax',
              'Verify the command exists',
              'Check file/directory permissions',
            ],
          });
        }
      }
    } else {
      // Process as regular chat message
      await session.geminiChat.sendMessage({
        message: message.content,
      });
      
      // Track successful message processing
      const responseTime = Date.now() - startTime;
      this.sessionMonitor.trackMessage(sessionId, message.content.length, responseTime, true);
      this.metricsCollector.recordMetric('response_time_ms', responseTime);
      this.metricsCollector.recordMetric('messages_per_minute', 1);
    }
    } catch (error) {
      success = false;
      const responseTime = Date.now() - startTime;
      
      // Track failed message processing
      this.sessionMonitor.trackMessage(sessionId, message.content.length, responseTime, false);
      this.sessionMonitor.trackError(sessionId, 'MESSAGE_PROCESSING_ERROR', error instanceof Error ? error.message : 'Unknown error');
      this.metricsCollector.recordMetric('error_rate', 1);
      
      throw error; // Re-throw to maintain original error handling
    }
  }

  async handleToolConfirmation(
    sessionId: string,
    response: gemini.ToolConfirmationResponse
  ): Promise<boolean> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return false;
    }

    return session.confirmationManager.handleConfirmationResponse(response);
  }

  async updateConfig(
    sessionId: string,
    request: gemini.ConfigUpdateRequest,
    stream: grpc.ServerDuplexStream<gemini.ClientRequest, gemini.ServerResponse>
  ): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    // Validate the configuration update
    const validation = session.configurationManager.validateConfigUpdate(request);
    if (!validation.isValid) {
      stream.write(MessageBuilders.errorMessage(
        'Invalid configuration update',
        validation.error
      ));
      return;
    }

    // Apply the configuration update
    const changes = await session.configurationManager.applyConfigUpdate(request, stream);
    
    // Track configuration changes
    for (const change of changes) {
      this.sessionMonitor.trackConfigChange(sessionId, change.field, change.oldValue, change.newValue);
    }
    
    // Handle approval mode changes specifically for the confirmation manager
    if ('approval_mode' in request && request.approval_mode !== undefined) {
      const newMode = this.mapApprovalMode(request.approval_mode);
      session.confirmationManager.setApprovalMode(newMode);
    }
    
    // Send success message if changes were applied
    if (changes.length > 0) {
      stream.write(MessageBuilders.infoMessage(
        `Configuration updated: ${changes.map(c => c.field).join(', ')}`
      ));
    }
  }

  getSessionStats(sessionId: string): gemini.SessionStats {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const duration = new Date().getTime() - session.stats.startTime.getTime();
    
    return new gemini.SessionStats({
      turn_count: session.stats.turnCount,
      total_tokens: new gemini.TokenUsage({
        input_tokens: session.stats.totalTokens.input,
        output_tokens: session.stats.totalTokens.output,
        cached_tokens: session.stats.totalTokens.cached,
        reasoning_tokens: session.stats.totalTokens.reasoning,
        total_tokens: session.stats.totalTokens.input + session.stats.totalTokens.output,
      }),
      total_api_time_ms: session.stats.totalApiTime,
      tools_executed: session.stats.toolsExecuted,
      files_modified: session.stats.filesModified,
      session_duration: `${Math.floor(duration / 1000)}s`,
    });
  }

  /**
   * Get analytics report for all sessions
   */
  getAnalyticsReport(): gemini.AnalyticsReport {
    return this.sessionMonitor.generateAnalyticsReport();
  }

  /**
   * Read file with caching and metadata
   */
  async readFile(sessionId: string, filePath: string, encoding: string = 'utf8'): Promise<{ content: string; metadata: any }> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      const result = await session.fileManager.readFile(filePath, encoding);
      
      // Track file operation for monitoring
      this.sessionMonitor.trackMessage(sessionId, filePath.length, 0, true);
      this.metricsCollector.recordMetric('file_operations_per_minute', 1);
      
      return result;
    } catch (error) {
      session.errorHandler.handleError(error, {
        category: ErrorCategory.FILE_SYSTEM,
        code: 'FILE_READ_ERROR',
        message: `Failed to read file: ${filePath}`,
        recoverable: true,
        suggestions: ['Check file permissions', 'Verify file exists', 'Try a different encoding']
      });
      throw error;
    }
  }

  /**
   * Write file with confirmation and backup
   */
  async writeFile(
    sessionId: string, 
    filePath: string, 
    content: string,
    options: {
      encoding?: string;
      backup?: boolean;
      createDirectories?: boolean;
      confirmOverwrite?: boolean;
    } = {}
  ): Promise<any> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      const operation = await session.fileManager.writeFile(filePath, content, options);
      
      // Track file modification
      session.stats.filesModified++;
      this.sessionMonitor.trackMessage(sessionId, content.length, 0, true);
      this.metricsCollector.recordMetric('file_operations_per_minute', 1);
      this.metricsCollector.recordMetric('files_modified_per_session', 1);
      
      return operation;
    } catch (error) {
      session.errorHandler.handleError(error, {
        category: ErrorCategory.FILE_SYSTEM,
        code: 'FILE_WRITE_ERROR',
        message: `Failed to write file: ${filePath}`,
        recoverable: true,
        suggestions: ['Check file permissions', 'Ensure directory exists', 'Check disk space']
      });
      throw error;
    }
  }

  /**
   * Edit file with patches
   */
  async editFile(
    sessionId: string,
    filePath: string,
    patches: Array<{
      startLine: number;
      endLine: number;
      newContent: string;
    }>,
    options: { backup?: boolean } = {}
  ): Promise<any> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      const operation = await session.fileManager.editFile(filePath, patches, options);
      
      // Track file modification
      session.stats.filesModified++;
      this.sessionMonitor.trackMessage(sessionId, filePath.length, 0, true);
      this.metricsCollector.recordMetric('file_operations_per_minute', 1);
      this.metricsCollector.recordMetric('files_modified_per_session', 1);
      
      return operation;
    } catch (error) {
      session.errorHandler.handleError(error, {
        category: ErrorCategory.FILE_SYSTEM,
        code: 'FILE_EDIT_ERROR',
        message: `Failed to edit file: ${filePath}`,
        recoverable: true,
        suggestions: ['Check file permissions', 'Verify file exists', 'Check patch format']
      });
      throw error;
    }
  }

  /**
   * Generate diff between file contents
   */
  generateFileDiff(sessionId: string, filePath: string, oldContent: string, newContent: string): any {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      return session.fileManager.generateDiff(filePath, oldContent, newContent);
    } catch (error) {
      session.errorHandler.handleError(error, {
        category: ErrorCategory.FILE_SYSTEM,
        code: 'FILE_DIFF_ERROR',
        message: `Failed to generate diff for file: ${filePath}`,
        recoverable: true,
        suggestions: ['Check file content format', 'Verify file encoding']
      });
      throw error;
    }
  }

  /**
   * List directory contents
   */
  async listDirectory(
    sessionId: string,
    dirPath: string,
    options: {
      recursive?: boolean;
      includeHidden?: boolean;
      pattern?: RegExp;
    } = {}
  ): Promise<any[]> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      const results = await session.fileManager.listDirectory(dirPath, options);
      
      // Track directory listing operation
      this.sessionMonitor.trackMessage(sessionId, dirPath.length, 0, true);
      this.metricsCollector.recordMetric('file_operations_per_minute', 1);
      
      return results;
    } catch (error) {
      session.errorHandler.handleError(error, {
        category: ErrorCategory.FILE_SYSTEM,
        code: 'DIRECTORY_LIST_ERROR',
        message: `Failed to list directory: ${dirPath}`,
        recoverable: true,
        suggestions: ['Check directory permissions', 'Verify directory exists', 'Check pattern syntax']
      });
      throw error;
    }
  }

  /**
   * Get file operations for a session
   */
  getFileOperations(sessionId: string): any[] {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    return session.fileManager.getAllOperations();
  }

  /**
   * Cancel file operation
   */
  cancelFileOperation(sessionId: string, operationId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    return session.fileManager.cancelOperation(operationId);
  }

  /**
   * Refresh context for a session
   */
  async refreshContext(sessionId: string, force: boolean = false): Promise<gemini.ContextSummary> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      // Track context refresh operation
      this.sessionMonitor.trackMessage(sessionId, 0, 0, true);
      this.metricsCollector.recordMetric('context_refreshes_per_minute', 1);

      // Get current working directory
      const workingDirectory = process.cwd();
      
      // Get git branch if in a git repository
      let gitBranch = 'N/A';
      try {
        const { exec } = require('child_process');
        const { promisify } = require('util');
        const execAsync = promisify(exec);
        const { stdout } = await execAsync('git branch --show-current 2>/dev/null || echo "none"');
        gitBranch = stdout.trim() || 'N/A';
      } catch {
        // Git not available or not in a git repo
      }

      // Scan for context files (GEMINI.md, etc.)
      const loadedFiles: gemini.LoadedFile[] = [];
      const contextFilesToCheck = [
        'GEMINI.md',
        'README.md',
        'package.json',
        'tsconfig.json',
        '.gitignore'
      ];

      for (const fileName of contextFilesToCheck) {
        try {
          const filePath = `${workingDirectory}/${fileName}`;
          const { metadata } = await session.fileManager.readFile(filePath);
          
          loadedFiles.push(new gemini.LoadedFile({
            path: metadata.path,
            type: fileName === 'GEMINI.md' ? 'GEMINI.md' : 
                  fileName === 'README.md' ? 'documentation' : 
                  fileName === 'package.json' ? 'configuration' : 'context',
            size: metadata.size
          }));
        } catch {
          // File doesn't exist, skip
        }
      }

      // Get MCP server information from configuration
      const mcpServers: gemini.McpServerInfo[] = [];
      // Simplified implementation - in real version would check actual MCP server registry
      // For now, return empty array since MCP server details are not accessible

      // Create memory info
      const memoryInfo = new gemini.MemoryInfo({
        has_user_memory: false, // Simplified - would check actual memory
        memory_size: 0,
        last_updated: new Date().toISOString()
      });

      // Create context summary
      const contextSummary = new gemini.ContextSummary({
        loaded_files: loadedFiles,
        mcp_servers: mcpServers,
        git_branch: gitBranch,
        working_directory: workingDirectory,
        memory_info: memoryInfo
      });

      // Track successful context refresh
      this.sessionMonitor.trackMessage(sessionId, 0, Date.now() - Date.now(), true);
      
      return contextSummary;
    } catch (error) {
      session.errorHandler.handleError(error, {
        category: ErrorCategory.INTERNAL,
        code: 'CONTEXT_REFRESH_ERROR',
        message: 'Failed to refresh context',
        recoverable: true,
        suggestions: ['Check file permissions', 'Verify working directory', 'Try force refresh']
      });
      throw error;
    }
  }

  /**
   * Get metrics summary
   */
  getMetricsSummary(timeRangeMs?: number): gemini.MetricsSummary {
    return this.metricsCollector.generateMetricsSummary(timeRangeMs);
  }

  /**
   * Get session monitor instance for direct access
   */
  getSessionMonitor(): SessionMonitor {
    return this.sessionMonitor;
  }

  /**
   * Get metrics collector instance for direct access
   */
  getMetricsCollector(): MetricsCollector {
    return this.metricsCollector;
  }

  terminateSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isTerminated = true;
      session.confirmationManager.cancelAllConfirmations();
      session.streamingManager.cleanup();
      
      // Finalize session monitoring
      const sessionDuration = Date.now() - session.stats.startTime.getTime();
      this.sessionMonitor.finalizeSession(sessionId, sessionDuration);
      this.metricsCollector.recordMetric('session_duration_seconds', sessionDuration / 1000);
      this.metricsCollector.recordMetric('concurrent_sessions', this.sessions.size - 1);
      
      this.sessions.delete(sessionId);
    }
  }

  private mapApprovalMode(mode: gemini.ApprovalMode): ApprovalMode {
    switch (mode) {
      case gemini.ApprovalMode.AUTO_EDIT:
        return ApprovalMode.AUTO_EDIT;
      case gemini.ApprovalMode.YOLO:
        return ApprovalMode.YOLO;
      default:
        return ApprovalMode.DEFAULT;
    }
  }
}