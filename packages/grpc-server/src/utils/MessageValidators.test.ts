/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { MessageValidators } from './MessageValidators';
import { gemini } from '../proto/generated/gemini';

describe('MessageValidators', () => {
  describe('validateStartRequest', () => {
    it('should validate valid start request', () => {
      const request = new gemini.StartRequest({
        initial_prompt: 'Hello',
        model: 'gemini-1.5-pro-latest',
        approval_mode: gemini.ApprovalMode.DEFAULT,
      });

      const result = MessageValidators.validateStartRequest(request);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should require initial prompt when not resuming', () => {
      const request = new gemini.StartRequest({
        model: 'gemini-1.5-pro-latest',
      });

      const result = MessageValidators.validateStartRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Initial prompt is required when not resuming from checkpoint');
    });

    it('should allow missing prompt when resuming from checkpoint', () => {
      const request = new gemini.StartRequest({
        resume_from_checkpoint: true,
        checkpoint_tag: 'test-checkpoint',
      });

      const result = MessageValidators.validateStartRequest(request);
      expect(result.isValid).toBe(true);
    });

    it('should validate model name', () => {
      const request = new gemini.StartRequest({
        initial_prompt: 'Hello',
        model: 'invalid-model',
      });

      const result = MessageValidators.validateStartRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid model: invalid-model');
    });

    it('should validate core tools', () => {
      const request = new gemini.StartRequest({
        initial_prompt: 'Hello',
        core_tools: ['ls', 'invalid-tool', 'read_file'],
      });

      const result = MessageValidators.validateStartRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid core tools: invalid-tool');
    });

    it('should validate MCP servers', () => {
      const request = new gemini.StartRequest({
        initial_prompt: 'Hello',
        mcp_servers: [
          new gemini.McpServerConfig({
            name: 'test-server',
            command: 'test-cmd',
          }),
          new gemini.McpServerConfig({
            // Missing name
            command: 'another-cmd',
          }),
        ],
      });

      const result = MessageValidators.validateStartRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('MCP server at index 1 missing name');
    });

    it('should validate theme', () => {
      const request = new gemini.StartRequest({
        initial_prompt: 'Hello',
        theme: 'invalid-theme',
      });

      const result = MessageValidators.validateStartRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid theme: invalid-theme');
    });
  });

  describe('validateChatMessage', () => {
    it('should validate valid chat message', () => {
      const message = new gemini.ChatMessage({
        content: 'Hello, world!',
        is_shell_command: false,
      });

      const result = MessageValidators.validateChatMessage(message);
      expect(result.isValid).toBe(true);
    });

    it('should require content', () => {
      const message = new gemini.ChatMessage({});

      const result = MessageValidators.validateChatMessage(message);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Chat message content is required');
    });

    it('should validate content length', () => {
      const message = new gemini.ChatMessage({
        content: 'x'.repeat(100001),
      });

      const result = MessageValidators.validateChatMessage(message);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Chat message content exceeds maximum length (100000 characters)');
    });
  });

  describe('validateToolConfirmationResponse', () => {
    it('should validate valid confirmation response', () => {
      const response = new gemini.ToolConfirmationResponse({
        confirmation_id: 'confirm-123',
        selected_option: gemini.ConfirmationOption.OptionType.ALLOW_ONCE,
      });

      const result = MessageValidators.validateToolConfirmationResponse(response);
      expect(result.isValid).toBe(true);
    });

    it('should require confirmation ID', () => {
      const response = new gemini.ToolConfirmationResponse({
        selected_option: gemini.ConfirmationOption.OptionType.ALLOW_ONCE,
      });

      const result = MessageValidators.validateToolConfirmationResponse(response);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Confirmation ID is required');
    });

    it('should require modified content for MODIFY_WITH_EDITOR', () => {
      const response = new gemini.ToolConfirmationResponse({
        confirmation_id: 'confirm-123',
        selected_option: gemini.ConfirmationOption.OptionType.MODIFY_WITH_EDITOR,
      });

      const result = MessageValidators.validateToolConfirmationResponse(response);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Modified content is required when using MODIFY_WITH_EDITOR option');
    });

    it('should accept modified content for MODIFY_WITH_EDITOR', () => {
      const response = new gemini.ToolConfirmationResponse({
        confirmation_id: 'confirm-123',
        selected_option: gemini.ConfirmationOption.OptionType.MODIFY_WITH_EDITOR,
        modified_content: 'new content',
      });

      const result = MessageValidators.validateToolConfirmationResponse(response);
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateConfigUpdateRequest', () => {
    it('should validate theme update', () => {
      const request = new gemini.ConfigUpdateRequest({
        theme: 'dracula',
      });

      const result = MessageValidators.validateConfigUpdateRequest(request);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid theme', () => {
      const request = new gemini.ConfigUpdateRequest({
        theme: 'invalid-theme',
      });

      const result = MessageValidators.validateConfigUpdateRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid theme: invalid-theme');
    });

    it('should validate auth config', () => {
      const request = new gemini.ConfigUpdateRequest({
        auth_config: new gemini.AuthConfig({
          type: gemini.AuthConfig.AuthType.API_KEY,
          api_key: 'test-key',
        }),
      });

      const result = MessageValidators.validateConfigUpdateRequest(request);
      expect(result.isValid).toBe(true);
    });

    it('should validate Vertex AI auth config', () => {
      const request = new gemini.ConfigUpdateRequest({
        auth_config: new gemini.AuthConfig({
          type: gemini.AuthConfig.AuthType.VERTEX_AI,
          // Missing required fields
        }),
      });

      const result = MessageValidators.validateConfigUpdateRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Project ID is required for VERTEX_AI auth type');
      expect(result.errors).toContain('Location is required for VERTEX_AI auth type');
    });
  });

  describe('validateAutoCompleteRequest', () => {
    it('should validate valid auto-complete request', () => {
      const request = new gemini.AutoCompleteRequest({
        input: 'read_f',
        cursor_position: 6,
        context: gemini.AutoCompleteContext.CONTEXT_CHAT_INPUT,
      });

      const result = MessageValidators.validateAutoCompleteRequest(request);
      expect(result.isValid).toBe(true);
    });

    it('should require input', () => {
      const request = new gemini.AutoCompleteRequest({
        cursor_position: 0,
        context: gemini.AutoCompleteContext.CONTEXT_CHAT_INPUT,
      });

      const result = MessageValidators.validateAutoCompleteRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Input is required for auto-complete');
    });

    it('should validate cursor position', () => {
      const request = new gemini.AutoCompleteRequest({
        input: 'test',
        cursor_position: 10, // Beyond input length
        context: gemini.AutoCompleteContext.CONTEXT_CHAT_INPUT,
      });

      const result = MessageValidators.validateAutoCompleteRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Cursor position exceeds input length');
    });
  });

  describe('validateToolParameters', () => {
    it('should validate read_file parameters', () => {
      const result = MessageValidators.validateToolParameters('read_file', { path: 'test.txt' });
      expect(result.isValid).toBe(true);
    });

    it('should require path for file tools', () => {
      const result = MessageValidators.validateToolParameters('write_file', { content: 'test' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Tool write_file requires 'path' parameter");
    });

    it('should validate shell parameters', () => {
      const result = MessageValidators.validateToolParameters('shell', { command: 'ls -la' });
      expect(result.isValid).toBe(true);
    });

    it('should require command for shell', () => {
      const result = MessageValidators.validateToolParameters('shell', {});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Shell tool requires 'command' parameter");
    });

    it('should validate web_fetch parameters', () => {
      const result = MessageValidators.validateToolParameters('web_fetch', { url: 'https://example.com' });
      expect(result.isValid).toBe(true);
    });

    it('should validate grep parameters', () => {
      const result = MessageValidators.validateToolParameters('grep', { pattern: 'test' });
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateSessionState', () => {
    it('should validate valid session', () => {
      const session = {
        geminiChat: {},
        isTerminated: false,
      };

      const result = MessageValidators.validateSessionState(session);
      expect(result.isValid).toBe(true);
    });

    it('should reject null session', () => {
      const result = MessageValidators.validateSessionState(null);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Session not found');
    });

    it('should reject uninitialized session', () => {
      const session = {
        geminiChat: null,
        isTerminated: false,
      };

      const result = MessageValidators.validateSessionState(session);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Session is not properly initialized');
    });

    it('should reject terminated session', () => {
      const session = {
        geminiChat: {},
        isTerminated: true,
      };

      const result = MessageValidators.validateSessionState(session);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Session has been terminated');
    });
  });
});