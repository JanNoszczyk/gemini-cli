/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { gemini } from '../proto/generated/gemini';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';

/**
 * Message builders for creating properly formatted gRPC messages
 */
export class MessageBuilders {
  // ============ Session Messages ============
  
  static sessionStarted(sessionId: string, model: string, context?: gemini.ContextSummary): gemini.ServerResponse {
    return new gemini.ServerResponse({
      session_started: new gemini.SessionStarted({
        session_id: sessionId,
        model: model,
        initial_context: context,
      }),
    });
  }

  static sessionStats(stats: gemini.SessionStats): gemini.ServerResponse {
    return new gemini.ServerResponse({
      session_stats: stats,
    });
  }

  // ============ Chat Messages ============

  static chatContent(
    content: string,
    type: gemini.ChatContent.ContentType = gemini.ChatContent.ContentType.GEMINI,
    isStreaming = false,
    isMarkdown = true
  ): gemini.ServerResponse {
    return new gemini.ServerResponse({
      chat_content: new gemini.ChatContent({
        type: type,
        content: content,
        is_markdown: isMarkdown,
        is_streaming: isStreaming,
      }),
    });
  }

  static thoughtBubble(subject: string, thought: string): gemini.ServerResponse {
    return new gemini.ServerResponse({
      thought_bubble: new gemini.ThoughtBubble({
        subject: subject,
        thought: thought,
      }),
    });
  }

  // ============ Tool Messages ============

  static toolConfirmationRequest(
    confirmationId: string,
    toolName: string,
    args: any,
    type: gemini.ToolConfirmationRequest.ConfirmationType,
    description?: string,
    diffPreview?: gemini.DiffPreview,
    mcpServer?: string
  ): gemini.ServerResponse {
    const options = this.getConfirmationOptions(type, mcpServer);
    
    // Convert args to protobuf Struct
    const argsStruct = Struct.fromJavaScript(args);
    
    return new gemini.ServerResponse({
      tool_confirmation: new gemini.ToolConfirmationRequest({
        confirmation_id: confirmationId,
        tool_name: toolName,
        args: argsStruct as any,
        type: type,
        options: options,
        description: description,
        diff_preview: diffPreview,
        mcp_server: mcpServer,
      }),
    });
  }

  static toolStatusUpdate(
    toolId: string,
    toolName: string,
    status: gemini.ToolStatusUpdate.Status,
    description?: string,
    result?: any,
    errorMessage?: string,
    durationMs?: number
  ): gemini.ServerResponse {
    // Convert result to protobuf Struct if provided
    const resultStruct = result ? Struct.fromJavaScript(result) : undefined;
    
    return new gemini.ServerResponse({
      tool_status: new gemini.ToolStatusUpdate({
        tool_id: toolId,
        tool_name: toolName,
        status: status,
        description: description,
        result: resultStruct as any,
        error_message: errorMessage,
        duration_ms: durationMs,
      }),
    });
  }

  static toolOutputStream(
    toolId: string,
    toolName: string,
    output: string,
    isError = false
  ): gemini.ServerResponse {
    return new gemini.ServerResponse({
      tool_output: new gemini.ToolOutputStream({
        tool_id: toolId,
        tool_name: toolName,
        output: output,
        is_error: isError,
      }),
    });
  }

  // ============ Error and Info Messages ============

  static errorMessage(
    message: string,
    details?: string,
    code?: number,
    isRetryable = false,
    suggestions?: string[]
  ): gemini.ServerResponse {
    return new gemini.ServerResponse({
      error_message: new gemini.ErrorMessage({
        message: message,
        details: details,
        code: code,
        is_retryable: isRetryable,
        suggestions: suggestions || [],
      }),
    });
  }

  static infoMessage(message: string, details?: string): gemini.ServerResponse {
    return new gemini.ServerResponse({
      info_message: new gemini.InfoMessage({
        message: message,
        details: details,
      }),
    });
  }

  static warningMessage(
    message: string,
    details?: string,
    showBorder = true
  ): gemini.ServerResponse {
    return new gemini.ServerResponse({
      warning_message: new gemini.WarningMessage({
        message: message,
        details: details,
        show_border: showBorder,
      }),
    });
  }

  // ============ Progress Messages ============

  static progressUpdate(
    operationId: string,
    operation: string,
    status: string,
    progress: number = -1,
    loadingPhrase?: string,
    elapsedMs?: number
  ): gemini.ServerResponse {
    return new gemini.ServerResponse({
      progress_update: new gemini.ProgressUpdate({
        operation_id: operationId,
        operation: operation,
        status: status,
        progress: progress,
        loading_phrase: loadingPhrase,
        elapsed_ms: elapsedMs,
      }),
    });
  }

  // ============ UI Messages ============

  static helpContent(content: string, commands?: gemini.Command[]): gemini.ServerResponse {
    return new gemini.ServerResponse({
      help_content: new gemini.HelpContent({
        content: content,
        available_commands: commands || [],
      }),
    });
  }

  static autoCompleteResult(completions: gemini.Completion[]): gemini.ServerResponse {
    return new gemini.ServerResponse({
      auto_complete_result: new gemini.AutoCompleteResult({
        completions: completions,
      }),
    });
  }

  // ============ File Operations ============

  static fileEditPreview(
    filePath: string,
    diff: gemini.DiffPreview,
    requiresConfirmation = true
  ): gemini.ServerResponse {
    return new gemini.ServerResponse({
      file_edit_preview: new gemini.FileEditPreview({
        file_path: filePath,
        diff: diff,
        requires_confirmation: requiresConfirmation,
      }),
    });
  }

  static fileOperationResult(
    filePath: string,
    operation: gemini.FileOperation,
    success: boolean,
    errorMessage?: string
  ): gemini.ServerResponse {
    return new gemini.ServerResponse({
      file_operation_result: new gemini.FileOperationResult({
        file_path: filePath,
        operation: operation,
        success: success,
        error_message: errorMessage,
      }),
    });
  }

  // ============ File Operation Helpers ============

  static convertFileDiffToProto(diff: any): gemini.DiffPreview {
    return new gemini.DiffPreview({
      file_path: diff.filePath,
      additions: diff.summary.linesAdded,
      deletions: diff.summary.linesRemoved,
      hunks: diff.chunks.map((chunk: any) => new gemini.DiffHunk({
        old_start: chunk.oldLineStart,
        old_count: chunk.oldLineCount,
        new_start: chunk.newLineStart,
        new_count: chunk.newLineCount,
        lines: chunk.lines.map((line: any) => new gemini.DiffLine({
          type: line.type === 'add' ? gemini.DiffLine.LineType.ADDITION :
                line.type === 'remove' ? gemini.DiffLine.LineType.DELETION :
                gemini.DiffLine.LineType.CONTEXT,
          content: line.content,
        })),
      })),
    });
  }

  static convertFileOperationToProto(operation: any): gemini.FileOperation {
    switch (operation.type) {
      case 'write':
        return operation.preview ? gemini.FileOperation.EDIT : gemini.FileOperation.CREATE;
      case 'edit':
        return gemini.FileOperation.EDIT;
      case 'delete':
        return gemini.FileOperation.DELETE;
      case 'move':
        return gemini.FileOperation.RENAME;
      default:
        return gemini.FileOperation.CREATE;
    }
  }

  // ============ Context Messages ============

  static contextSummary(context: gemini.ContextSummary): gemini.ServerResponse {
    return new gemini.ServerResponse({
      context_summary: context,
    });
  }

  static usageMetadata(
    tokenUsage: gemini.TokenUsage,
    apiTimeMs: number,
    modelUsed: string,
    usedFallback = false
  ): gemini.ServerResponse {
    return new gemini.ServerResponse({
      usage_metadata: new gemini.UsageMetadata({
        token_usage: tokenUsage,
        api_time_ms: apiTimeMs,
        model_used: modelUsed,
        used_fallback: usedFallback,
      }),
    });
  }

  // ============ Configuration Messages ============

  static configChanged(field: string, oldValue: string, newValue: string): gemini.ServerResponse {
    return new gemini.ServerResponse({
      config_changed: new gemini.ConfigChanged({
        field: field,
        old_value: oldValue,
        new_value: newValue,
      }),
    });
  }

  // ============ Helper Methods ============

  private static getConfirmationOptions(
    type: gemini.ToolConfirmationRequest.ConfirmationType,
    mcpServer?: string
  ): gemini.ConfirmationOption[] {
    const options: gemini.ConfirmationOption[] = [];

    // Always include "Allow once"
    options.push(new gemini.ConfirmationOption({
      type: gemini.ConfirmationOption.OptionType.ALLOW_ONCE,
      label: 'Yes, allow once',
      hotkey: 'y',
    }));

    // For file edits, include modify option
    if (type === gemini.ToolConfirmationRequest.ConfirmationType.EDIT_FILE) {
      options.push(new gemini.ConfirmationOption({
        type: gemini.ConfirmationOption.OptionType.MODIFY_WITH_EDITOR,
        label: 'Modify with external editor',
        hotkey: 'm',
      }));
    }

    // Add appropriate "always" options
    if (type === gemini.ToolConfirmationRequest.ConfirmationType.MCP_TOOL && mcpServer) {
      options.push(new gemini.ConfirmationOption({
        type: gemini.ConfirmationOption.OptionType.ALLOW_ALWAYS_SERVER,
        label: `Yes, allow always for ${mcpServer}`,
        hotkey: 's',
      }));
    } else {
      options.push(new gemini.ConfirmationOption({
        type: gemini.ConfirmationOption.OptionType.ALLOW_ALWAYS_TOOL,
        label: 'Yes, allow always for this tool',
        hotkey: 'a',
      }));
    }

    // Always include cancel
    options.push(new gemini.ConfirmationOption({
      type: gemini.ConfirmationOption.OptionType.CANCEL,
      label: 'No (esc)',
      hotkey: 'n',
    }));

    return options;
  }

  /**
   * Create a diff preview from file changes
   */
  static createDiffPreview(
    filePath: string,
    hunks: Array<{
      oldStart: number;
      oldCount: number;
      newStart: number;
      newCount: number;
      lines: Array<{ type: 'context' | 'addition' | 'deletion'; content: string }>;
    }>
  ): gemini.DiffPreview {
    let additions = 0;
    let deletions = 0;

    const diffHunks = hunks.map(hunk => {
      const diffLines = hunk.lines.map(line => {
        let lineType: gemini.DiffLine.LineType;
        switch (line.type) {
          case 'addition':
            lineType = gemini.DiffLine.LineType.ADDITION;
            additions++;
            break;
          case 'deletion':
            lineType = gemini.DiffLine.LineType.DELETION;
            deletions++;
            break;
          default:
            lineType = gemini.DiffLine.LineType.CONTEXT;
        }

        return new gemini.DiffLine({
          type: lineType,
          content: line.content,
        });
      });

      return new gemini.DiffHunk({
        old_start: hunk.oldStart,
        old_count: hunk.oldCount,
        new_start: hunk.newStart,
        new_count: hunk.newCount,
        lines: diffLines,
      });
    });

    return new gemini.DiffPreview({
      file_path: filePath,
      hunks: diffHunks,
      additions: additions,
      deletions: deletions,
    });
  }
}