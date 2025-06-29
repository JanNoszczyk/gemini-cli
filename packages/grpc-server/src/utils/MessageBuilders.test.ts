/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { MessageBuilders } from './MessageBuilders';
import { gemini } from '../proto/generated/gemini';

describe('MessageBuilders', () => {
  describe('Session Messages', () => {
    it('should build sessionStarted message', () => {
      const response = MessageBuilders.sessionStarted('test-session', 'gemini-1.5-pro');
      
      expect(response.session_started).toBeDefined();
      expect(response.session_started?.session_id).toBe('test-session');
      expect(response.session_started?.model).toBe('gemini-1.5-pro');
    });

    it('should build sessionStats message', () => {
      const stats = new gemini.SessionStats({
        turn_count: 5,
        tools_executed: 3,
        total_api_time_ms: 1500,
      });
      
      const response = MessageBuilders.sessionStats(stats);
      expect(response.session_stats).toBeDefined();
      expect(response.session_stats?.turn_count).toBe(5);
    });
  });

  describe('Chat Messages', () => {
    it('should build chatContent message with defaults', () => {
      const response = MessageBuilders.chatContent('Hello world');
      
      expect(response.chat_content).toBeDefined();
      expect(response.chat_content?.content).toBe('Hello world');
      expect(response.chat_content?.type).toBe(gemini.ChatContent.ContentType.GEMINI);
      expect(response.chat_content?.is_markdown).toBe(true);
      expect(response.chat_content?.is_streaming).toBe(false);
    });

    it('should build chatContent message with custom type', () => {
      const response = MessageBuilders.chatContent(
        'User message',
        gemini.ChatContent.ContentType.USER,
        true,
        false
      );
      
      expect(response.chat_content?.type).toBe(gemini.ChatContent.ContentType.USER);
      expect(response.chat_content?.is_streaming).toBe(true);
      expect(response.chat_content?.is_markdown).toBe(false);
    });

    it('should build thoughtBubble message', () => {
      const response = MessageBuilders.thoughtBubble('Planning', 'Let me think about this...');
      
      expect(response.thought_bubble).toBeDefined();
      expect(response.thought_bubble?.subject).toBe('Planning');
      expect(response.thought_bubble?.thought).toBe('Let me think about this...');
    });
  });

  describe('Tool Messages', () => {
    it('should build toolConfirmationRequest for file edit', () => {
      const response = MessageBuilders.toolConfirmationRequest(
        'confirm-123',
        'edit',
        { path: 'test.js', content: 'new content' },
        gemini.ToolConfirmationRequest.ConfirmationType.EDIT_FILE,
        'Edit file test.js'
      );
      
      expect(response.tool_confirmation).toBeDefined();
      expect(response.tool_confirmation?.confirmation_id).toBe('confirm-123');
      expect(response.tool_confirmation?.tool_name).toBe('edit');
      expect(response.tool_confirmation?.type).toBe(
        gemini.ToolConfirmationRequest.ConfirmationType.EDIT_FILE
      );
      
      // Check options include modify with editor
      const options = response.tool_confirmation?.options || [];
      const hasModifyOption = options.some(
        opt => opt.type === gemini.ConfirmationOption.OptionType.MODIFY_WITH_EDITOR
      );
      expect(hasModifyOption).toBe(true);
    });

    it('should build toolStatusUpdate message', () => {
      const response = MessageBuilders.toolStatusUpdate(
        'tool-123',
        'ls',
        gemini.ToolStatusUpdate.Status.EXECUTING,
        'Listing directory contents'
      );
      
      expect(response.tool_status).toBeDefined();
      expect(response.tool_status?.tool_id).toBe('tool-123');
      expect(response.tool_status?.status).toBe(gemini.ToolStatusUpdate.Status.EXECUTING);
    });

    it('should build toolOutputStream message', () => {
      const response = MessageBuilders.toolOutputStream(
        'tool-123',
        'shell',
        'Command output here',
        false
      );
      
      expect(response.tool_output).toBeDefined();
      expect(response.tool_output?.output).toBe('Command output here');
      expect(response.tool_output?.is_error).toBe(false);
    });
  });

  describe('Error and Info Messages', () => {
    it('should build errorMessage with all fields', () => {
      const response = MessageBuilders.errorMessage(
        'Something went wrong',
        'Detailed error information',
        500,
        true,
        ['Try again', 'Check your connection']
      );
      
      expect(response.error_message).toBeDefined();
      expect(response.error_message?.message).toBe('Something went wrong');
      expect(response.error_message?.is_retryable).toBe(true);
      expect(response.error_message?.suggestions).toHaveLength(2);
    });

    it('should build infoMessage', () => {
      const response = MessageBuilders.infoMessage('Information', 'Additional details');
      
      expect(response.info_message).toBeDefined();
      expect(response.info_message?.message).toBe('Information');
      expect(response.info_message?.details).toBe('Additional details');
    });

    it('should build warningMessage', () => {
      const response = MessageBuilders.warningMessage('Warning', 'Be careful', false);
      
      expect(response.warning_message).toBeDefined();
      expect(response.warning_message?.message).toBe('Warning');
      expect(response.warning_message?.show_border).toBe(false);
    });
  });

  describe('Progress Messages', () => {
    it('should build progressUpdate with determinate progress', () => {
      const response = MessageBuilders.progressUpdate(
        'op-123',
        'Processing files',
        'Processing...',
        0.5,
        'Analyzing code',
        1000
      );
      
      expect(response.progress_update).toBeDefined();
      expect(response.progress_update?.operation_id).toBe('op-123');
      expect(response.progress_update?.progress).toBe(0.5);
      expect(response.progress_update?.loading_phrase).toBe('Analyzing code');
    });

    it('should build progressUpdate with indeterminate progress', () => {
      const response = MessageBuilders.progressUpdate(
        'op-456',
        'Loading',
        'Please wait'
      );
      
      expect(response.progress_update?.progress).toBe(-1);
    });
  });

  describe('Diff Preview', () => {
    it('should create diff preview from hunks', () => {
      const hunks = [{
        oldStart: 10,
        oldCount: 3,
        newStart: 10,
        newCount: 4,
        lines: [
          { type: 'context' as const, content: '  function test() {' },
          { type: 'deletion' as const, content: '-   console.log("old");' },
          { type: 'addition' as const, content: '+   console.log("new");' },
          { type: 'addition' as const, content: '+   console.log("extra");' },
          { type: 'context' as const, content: '  }' },
        ],
      }];
      
      const diff = MessageBuilders.createDiffPreview('test.js', hunks);
      
      expect(diff.file_path).toBe('test.js');
      expect(diff.hunks).toHaveLength(1);
      expect(diff.additions).toBe(2);
      expect(diff.deletions).toBe(1);
      
      const hunk = diff.hunks[0];
      expect(hunk.lines).toHaveLength(5);
      expect(hunk.lines[1].type).toBe(gemini.DiffLine.LineType.DELETION);
      expect(hunk.lines[2].type).toBe(gemini.DiffLine.LineType.ADDITION);
    });
  });

  describe('Configuration Messages', () => {
    it('should build configChanged message', () => {
      const response = MessageBuilders.configChanged('theme', 'default', 'dracula');
      
      expect(response.config_changed).toBeDefined();
      expect(response.config_changed?.field).toBe('theme');
      expect(response.config_changed?.old_value).toBe('default');
      expect(response.config_changed?.new_value).toBe('dracula');
    });
  });

  describe('Usage Metadata', () => {
    it('should build usageMetadata message', () => {
      const tokenUsage = new gemini.TokenUsage({
        input_tokens: 100,
        output_tokens: 200,
        total_tokens: 300,
      });
      
      const response = MessageBuilders.usageMetadata(
        tokenUsage,
        1500,
        'gemini-1.5-pro',
        false
      );
      
      expect(response.usage_metadata).toBeDefined();
      expect(response.usage_metadata?.api_time_ms).toBe(1500);
      expect(response.usage_metadata?.model_used).toBe('gemini-1.5-pro');
      expect(response.usage_metadata?.used_fallback).toBe(false);
    });
  });
});