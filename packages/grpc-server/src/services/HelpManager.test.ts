/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { HelpManager } from './HelpManager';

describe('HelpManager', () => {
  let helpManager: HelpManager;

  beforeEach(() => {
    helpManager = new HelpManager();
  });

  describe('getHelp', () => {
    it('should return general help when no topic specified', () => {
      const response = helpManager.getHelp();
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('Gemini gRPC Help');
      expect(response.help_content!.content).toContain('Quick Start');
      expect(response.help_content!.content).toContain('Available Topics');
      expect(response.help_content!.available_commands).toBeDefined();
      expect(response.help_content!.available_commands!.length).toBeGreaterThan(0);
    });

    it('should return help for specific topic', () => {
      const response = helpManager.getHelp('getting-started');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('Getting Started with Gemini gRPC');
      expect(response.help_content!.content).toContain('Welcome to Gemini gRPC Server');
    });

    it('should return help for tools topic', () => {
      const response = helpManager.getHelp('tools');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('Working with Tools');
      expect(response.help_content!.content).toContain('File System');
      expect(response.help_content!.content).toContain('Shell');
    });

    it('should return help for approval modes', () => {
      const response = helpManager.getHelp('approval-modes');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('Understanding Approval Modes');
      expect(response.help_content!.content).toContain('DEFAULT');
      expect(response.help_content!.content).toContain('AUTO_EDIT');
      expect(response.help_content!.content).toContain('YOLO');
    });

    it('should return help for slash commands', () => {
      const response = helpManager.getHelp('slash-commands');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('Slash Commands Reference');
      expect(response.help_content!.content).toContain('/help');
      expect(response.help_content!.content).toContain('/model');
      expect(response.help_content!.content).toContain('/config');
    });

    it('should return help for specific command', () => {
      const response = helpManager.getHelp('/model');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('Command: /model');
      expect(response.help_content!.content).toContain('Switch between AI models');
      expect(response.help_content!.content).toContain('Usage:');
      expect(response.help_content!.content).toContain('Examples');
    });

    it('should return help for /approval command', () => {
      const response = helpManager.getHelp('/approval');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('Change tool approval mode');
      expect(response.help_content!.content).toContain('default, auto_edit, or yolo');
    });

    it('should handle unknown topic', () => {
      const response = helpManager.getHelp('unknown-topic');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('Help topic "unknown-topic" not found');
      expect(response.help_content!.content).toContain('Available topics');
    });

    it('should handle unknown command', () => {
      const response = helpManager.getHelp('/unknown');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('Help topic "/unknown" not found');
    });
  });

  describe('getContextualHelp', () => {
    it('should return troubleshooting help for authentication context', () => {
      const response = helpManager.getContextualHelp('authentication');
      
      expect(response).not.toBeNull();
      expect(response!.help_content!.content).toContain('Troubleshooting');
      expect(response!.help_content!.content).toContain('Authentication Errors');
    });

    it('should return tools help for tool-not-found context', () => {
      const response = helpManager.getContextualHelp('tool-not-found');
      
      expect(response).not.toBeNull();
      expect(response!.help_content!.content).toContain('Working with Tools');
    });

    it('should return approval modes help for approval-required context', () => {
      const response = helpManager.getContextualHelp('approval-required');
      
      expect(response).not.toBeNull();
      expect(response!.help_content!.content).toContain('Understanding Approval Modes');
    });

    it('should return null for unknown context', () => {
      const response = helpManager.getContextualHelp('unknown-context');
      
      expect(response).toBeNull();
    });
  });

  describe('searchHelp', () => {
    it('should find topics by title', () => {
      const response = helpManager.searchHelp('getting started');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('Search Results');
      expect(response.help_content!.content).toContain('getting-started');
    });

    it('should find topics by content', () => {
      const response = helpManager.searchHelp('shell commands');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('shell-commands');
    });

    it('should find commands by name', () => {
      const response = helpManager.searchHelp('model');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('/model');
    });

    it('should find commands by description', () => {
      const response = helpManager.searchHelp('approval mode');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('/approval');
    });

    it('should return no results message for non-matching query', () => {
      const response = helpManager.searchHelp('xyzabc123');
      
      expect(response.help_content).toBeDefined();
      expect(response.help_content!.content).toContain('No help found for "xyzabc123"');
    });

    it('should rank results by relevance', () => {
      const response = helpManager.searchHelp('tools');
      
      expect(response.help_content).toBeDefined();
      const content = response.help_content!.content;
      
      // Both should be in the results
      expect(content).toContain('/help tools');
      expect(content).toContain('/tools');
      
      // The search should have found both the topic and the command
      const lines = content.split('\n');
      const resultLines = lines.filter(line => line.includes('/help') || line.includes('/tools'));
      expect(resultLines.length).toBeGreaterThanOrEqual(2);
    });

    it('should limit search results', () => {
      const response = helpManager.searchHelp('a'); // Should match many items
      
      expect(response.help_content).toBeDefined();
      const matches = response.help_content!.content.match(/\/help/g);
      
      // Should limit to 10 results or less
      expect(matches).toBeDefined();
      expect(matches!.length).toBeLessThanOrEqual(10);
    });
  });

  describe('help content structure', () => {
    it('should include examples in topic help when available', () => {
      const response = helpManager.getHelp('shell-commands');
      
      expect(response.help_content!.content).toContain('!ls -la');
      expect(response.help_content!.content).toContain('!git status');
    });

    it('should include see also links when available', () => {
      const response = helpManager.getHelp('tools');
      
      expect(response.help_content!.content).toContain('See Also');
      expect(response.help_content!.content).toContain('approval-modes');
    });

    it('should include command options in command help', () => {
      const response = helpManager.getHelp('/model');
      
      expect(response.help_content!.content).toContain('Options');
      expect(response.help_content!.content).toContain('model-name');
      expect(response.help_content!.content).toContain('optional');
    });

    it('should include usage examples in command help', () => {
      const response = helpManager.getHelp('/theme');
      
      expect(response.help_content!.content).toContain('/theme dracula');
      expect(response.help_content!.content).toContain('/theme github-light');
    });
  });

  describe('available commands', () => {
    it('should provide relevant commands for general help', () => {
      const response = helpManager.getHelp();
      
      const commands = response.help_content!.available_commands!;
      expect(commands).toBeDefined();
      expect(commands.some(c => c.name === '/help')).toBe(true);
      expect(commands.some(c => c.name === '/help getting-started')).toBe(true);
    });

    it('should provide topic-specific commands', () => {
      const response = helpManager.getHelp('approval-modes');
      
      const commands = response.help_content!.available_commands!;
      expect(commands).toBeDefined();
      expect(commands.some(c => c.name === '/approval')).toBe(true);
      expect(commands.some(c => c.name === '/approval default')).toBe(true);
    });

    it('should provide single command for command help', () => {
      const response = helpManager.getHelp('/config');
      
      const commands = response.help_content!.available_commands!;
      expect(commands).toBeDefined();
      expect(commands).toHaveLength(1);
      expect(commands[0].name).toBe('/config');
    });
  });
});