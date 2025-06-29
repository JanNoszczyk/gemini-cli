/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { gemini } from '../proto/generated/gemini';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validators for incoming gRPC messages
 */
export class MessageValidators {
  // ============ Client Request Validators ============

  static validateStartRequest(request: gemini.StartRequest): ValidationResult {
    const errors: string[] = [];

    // Initial prompt is required if not resuming
    if (!request.initial_prompt && !request.resume_from_checkpoint) {
      errors.push('Initial prompt is required when not resuming from checkpoint');
    }

    // Model validation
    if (request.model && !this.isValidModel(request.model)) {
      errors.push(`Invalid model: ${request.model}`);
    }

    // Approval mode validation
    if (request.approval_mode === gemini.ApprovalMode.APPROVAL_MODE_UNSPECIFIED) {
      // This is OK - will use default
    }

    // Tools validation
    if (request.core_tools?.length) {
      const invalidTools = request.core_tools.filter(tool => !this.isValidCoreTool(tool));
      if (invalidTools.length > 0) {
        errors.push(`Invalid core tools: ${invalidTools.join(', ')}`);
      }
    }

    // MCP server validation
    if (request.mcp_servers?.length) {
      request.mcp_servers.forEach((server, index) => {
        if (!server.name) {
          errors.push(`MCP server at index ${index} missing name`);
        }
        if (!server.command) {
          errors.push(`MCP server ${server.name || index} missing command`);
        }
      });
    }

    // Theme validation
    if (request.theme && !this.isValidTheme(request.theme)) {
      errors.push(`Invalid theme: ${request.theme}`);
    }

    // Editor type validation
    if (request.editor_type && !this.isValidEditorType(request.editor_type)) {
      errors.push(`Invalid editor type: ${request.editor_type}`);
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  static validateChatMessage(message: gemini.ChatMessage): ValidationResult {
    const errors: string[] = [];

    if (!message.content) {
      errors.push('Chat message content is required');
    }

    if (message.content && message.content.length > 100000) {
      errors.push('Chat message content exceeds maximum length (100000 characters)');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  static validateToolConfirmationResponse(
    response: gemini.ToolConfirmationResponse
  ): ValidationResult {
    const errors: string[] = [];

    if (!response.confirmation_id) {
      errors.push('Confirmation ID is required');
    }

    if (response.selected_option === undefined) {
      errors.push('Selected option is required');
    }

    // If modify with editor, check for modified content
    if (
      response.selected_option === gemini.ConfirmationOption.OptionType.MODIFY_WITH_EDITOR &&
      !response.modified_content
    ) {
      errors.push('Modified content is required when using MODIFY_WITH_EDITOR option');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  static validateConfigUpdateRequest(
    request: gemini.ConfigUpdateRequest
  ): ValidationResult {
    const errors: string[] = [];

    const updateCase = request.update;
    if (!updateCase) {
      errors.push('Configuration update must specify a field to update');
      return { isValid: false, errors };
    }

    // Validate based on which field is being updated
    if ('theme' in request && request.theme) {
      if (!this.isValidTheme(request.theme)) {
        errors.push(`Invalid theme: ${request.theme}`);
      }
    }

    if ('editor_type' in request && request.editor_type) {
      if (!this.isValidEditorType(request.editor_type)) {
        errors.push(`Invalid editor type: ${request.editor_type}`);
      }
    }

    if ('auth_config' in request && request.auth_config) {
      const authErrors = this.validateAuthConfig(request.auth_config);
      errors.push(...authErrors);
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  static validateAutoCompleteRequest(
    request: gemini.AutoCompleteRequest
  ): ValidationResult {
    const errors: string[] = [];

    if (!request.input || request.input.length === 0) {
      errors.push('Input is required for auto-complete');
    }

    if (request.cursor_position < 0) {
      errors.push('Cursor position must be non-negative');
    }

    if (request.input && request.cursor_position > request.input.length) {
      errors.push('Cursor position exceeds input length');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  // ============ Helper Validators ============

  private static isValidModel(model: string): boolean {
    const validModels = [
      'gemini-1.5-pro-latest',
      'gemini-1.5-pro',
      'gemini-1.5-flash-latest',
      'gemini-1.5-flash',
      'gemini-2.0-flash-exp',
      'gemini-2.0-flash-thinking-exp',
      'gemini-exp-1206',
    ];
    return validModels.includes(model);
  }

  private static isValidCoreTool(tool: string): boolean {
    const validTools = [
      'ls',
      'read_file',
      'grep',
      'glob',
      'edit',
      'write_file',
      'web_fetch',
      'read_many_files',
      'shell',
      'memory',
      'web_search',
    ];
    return validTools.includes(tool);
  }

  private static isValidTheme(theme: string): boolean {
    const validThemes = [
      'default',
      'default-light',
      'ayu',
      'ayu-light',
      'dracula',
      'github',
      'github-light',
      'atom-one',
      'google-light',
      'xcode-light',
      'ansi',
      'ansi-light',
    ];
    return validThemes.includes(theme);
  }

  private static isValidEditorType(editorType: string): boolean {
    const validEditors = ['vim', 'emacs', 'nano', 'code', 'subl', 'atom'];
    return validEditors.includes(editorType);
  }

  private static validateAuthConfig(authConfig: gemini.AuthConfig): string[] {
    const errors: string[] = [];

    if (!authConfig.type) {
      errors.push('Auth type is required');
    }

    switch (authConfig.type) {
      case gemini.AuthConfig.AuthType.API_KEY:
        if (!authConfig.api_key) {
          errors.push('API key is required for API_KEY auth type');
        }
        break;
      case gemini.AuthConfig.AuthType.VERTEX_AI:
        if (!authConfig.project_id) {
          errors.push('Project ID is required for VERTEX_AI auth type');
        }
        if (!authConfig.location) {
          errors.push('Location is required for VERTEX_AI auth type');
        }
        break;
    }

    return errors;
  }

  // ============ Runtime Validators ============

  /**
   * Validate that a session exists and is in a valid state
   */
  static validateSessionState(session: any): ValidationResult {
    const errors: string[] = [];

    if (!session) {
      errors.push('Session not found');
      return { isValid: false, errors };
    }

    if (!session.geminiChat) {
      errors.push('Session is not properly initialized');
    }

    if (session.isTerminated) {
      errors.push('Session has been terminated');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Validate tool execution parameters
   */
  static validateToolParameters(toolName: string, args: any): ValidationResult {
    const errors: string[] = [];

    // Tool-specific validation
    switch (toolName) {
      case 'read_file':
      case 'write_file':
      case 'edit':
        if (!args.path) {
          errors.push(`Tool ${toolName} requires 'path' parameter`);
        }
        break;
      case 'shell':
        if (!args.command) {
          errors.push("Shell tool requires 'command' parameter");
        }
        break;
      case 'web_fetch':
        if (!args.url) {
          errors.push("Web fetch tool requires 'url' parameter");
        }
        break;
      case 'grep':
        if (!args.pattern) {
          errors.push("Grep tool requires 'pattern' parameter");
        }
        break;
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
}