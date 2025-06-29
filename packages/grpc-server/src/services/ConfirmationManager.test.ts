/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConfirmationManager } from './ConfirmationManager';
import { gemini } from '../proto/generated/gemini';
import { ApprovalMode } from '@google/gemini-cli-core';

interface PendingConfirmation {
  id: string;
  toolCall: {
    name: string;
    args: any;
  };
  type: gemini.ToolConfirmationRequest.ConfirmationType;
  mcpServer?: string;
  resolve: (response: gemini.ToolConfirmationResponse) => void;
  reject: (error: Error) => void;
  timeout?: NodeJS.Timeout;
}

describe('ConfirmationManager', () => {
  let manager: ConfirmationManager;

  beforeEach(() => {
    manager = new ConfirmationManager();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    manager.reset();
  });

  describe('requestConfirmation', () => {
    it('should auto-approve in YOLO mode', async () => {
      manager.setApprovalMode(ApprovalMode.YOLO);
      
      const response = await manager.requestConfirmation(
        { name: 'shell', args: { command: 'ls' } },
        gemini.ToolConfirmationRequest.ConfirmationType.SHELL_COMMAND
      );
      
      expect(response.confirmation_id).toBe('auto-approved');
      expect(response.selected_option).toBe(gemini.ConfirmationOption.OptionType.ALLOW_ONCE);
    });

    it('should emit confirmation request in DEFAULT mode', async () => {
      const confirmationHandler = vi.fn();
      manager.on('confirmationRequest', confirmationHandler);
      
      const confirmationPromise = manager.requestConfirmation(
        { name: 'edit', args: { path: 'test.txt', content: 'new content' } },
        gemini.ToolConfirmationRequest.ConfirmationType.EDIT_FILE,
        'Edit file test.txt'
      );
      
      expect(confirmationHandler).toHaveBeenCalledOnce();
      expect(manager.getPendingCount()).toBe(1);
      
      // Don't await to avoid hanging the test
      confirmationPromise.catch(() => {}); // Ignore rejection
    });

    it('should timeout after 5 minutes', async () => {
      const confirmationPromise = manager.requestConfirmation(
        { name: 'shell', args: { command: 'rm -rf /' } },
        gemini.ToolConfirmationRequest.ConfirmationType.SHELL_COMMAND
      );
      
      expect(manager.getPendingCount()).toBe(1);
      
      // Fast-forward 5 minutes
      vi.advanceTimersByTime(300000);
      
      await expect(confirmationPromise).rejects.toThrow('Confirmation timeout');
      expect(manager.getPendingCount()).toBe(0);
    });

    it('should auto-approve always-allowed tools', async () => {
      // First request with "always allow"
      const confirmationPromise = manager.requestConfirmation(
        { name: 'ls', args: {} },
        gemini.ToolConfirmationRequest.ConfirmationType.EXECUTE
      );
      
      // Simulate user selecting "always allow"
      const confirmations = Array.from((manager as any).pendingConfirmations.values()) as PendingConfirmation[];
      const response = new gemini.ToolConfirmationResponse({
        confirmation_id: confirmations[0].id,
        selected_option: gemini.ConfirmationOption.OptionType.ALLOW_ALWAYS_TOOL,
      });
      
      manager.handleConfirmationResponse(response);
      await confirmationPromise;
      
      // Second request should auto-approve
      const response2 = await manager.requestConfirmation(
        { name: 'ls', args: {} },
        gemini.ToolConfirmationRequest.ConfirmationType.EXECUTE
      );
      
      expect(response2.confirmation_id).toBe('always-allowed');
    });

    it('should auto-approve always-allowed MCP servers', async () => {
      // First request with "always allow server"
      const confirmationPromise = manager.requestConfirmation(
        { name: 'fetch_data', args: {} },
        gemini.ToolConfirmationRequest.ConfirmationType.MCP_TOOL,
        'Fetch data from API',
        undefined,
        'example-server'
      );
      
      // Simulate user selecting "always allow server"
      const confirmations = Array.from((manager as any).pendingConfirmations.values()) as PendingConfirmation[];
      const response = new gemini.ToolConfirmationResponse({
        confirmation_id: confirmations[0].id,
        selected_option: gemini.ConfirmationOption.OptionType.ALLOW_ALWAYS_SERVER,
      });
      
      manager.handleConfirmationResponse(response);
      await confirmationPromise;
      
      // Second request from same server should auto-approve
      const response2 = await manager.requestConfirmation(
        { name: 'another_tool', args: {} },
        gemini.ToolConfirmationRequest.ConfirmationType.MCP_TOOL,
        'Another tool from same server',
        undefined,
        'example-server'
      );
      
      expect(response2.confirmation_id).toBe('server-allowed');
    });
  });

  describe('handleConfirmationResponse', () => {
    it('should resolve pending confirmation', async () => {
      const confirmationPromise = manager.requestConfirmation(
        { name: 'edit', args: { path: 'test.txt' } },
        gemini.ToolConfirmationRequest.ConfirmationType.EDIT_FILE
      );
      
      const confirmations = Array.from((manager as any).pendingConfirmations.values()) as PendingConfirmation[];
      const response = new gemini.ToolConfirmationResponse({
        confirmation_id: confirmations[0].id,
        selected_option: gemini.ConfirmationOption.OptionType.ALLOW_ONCE,
      });
      
      const handled = manager.handleConfirmationResponse(response);
      expect(handled).toBe(true);
      
      const result = await confirmationPromise;
      expect(result).toEqual(response);
      expect(manager.getPendingCount()).toBe(0);
    });

    it('should handle modified content for MODIFY_WITH_EDITOR', async () => {
      const confirmationPromise = manager.requestConfirmation(
        { name: 'edit', args: { path: 'test.txt', content: 'original' } },
        gemini.ToolConfirmationRequest.ConfirmationType.EDIT_FILE
      );
      
      const confirmations = Array.from((manager as any).pendingConfirmations.values()) as PendingConfirmation[];
      const response = new gemini.ToolConfirmationResponse({
        confirmation_id: confirmations[0].id,
        selected_option: gemini.ConfirmationOption.OptionType.MODIFY_WITH_EDITOR,
        modified_content: 'edited content',
      });
      
      manager.handleConfirmationResponse(response);
      const result = await confirmationPromise;
      expect(result.modified_content).toBe('edited content');
    });

    it('should return false for unknown confirmation ID', () => {
      const response = new gemini.ToolConfirmationResponse({
        confirmation_id: 'unknown-id',
        selected_option: gemini.ConfirmationOption.OptionType.ALLOW_ONCE,
      });
      
      const handled = manager.handleConfirmationResponse(response);
      expect(handled).toBe(false);
    });

    it('should handle CANCEL option', async () => {
      const confirmationPromise = manager.requestConfirmation(
        { name: 'shell', args: { command: 'rm file.txt' } },
        gemini.ToolConfirmationRequest.ConfirmationType.SHELL_COMMAND
      );
      
      const confirmations = Array.from((manager as any).pendingConfirmations.values()) as PendingConfirmation[];
      const response = new gemini.ToolConfirmationResponse({
        confirmation_id: confirmations[0].id,
        selected_option: gemini.ConfirmationOption.OptionType.CANCEL,
      });
      
      manager.handleConfirmationResponse(response);
      const result = await confirmationPromise;
      expect(result.selected_option).toBe(gemini.ConfirmationOption.OptionType.CANCEL);
    });
  });

  describe('cancelConfirmation', () => {
    it('should cancel a specific confirmation', async () => {
      const confirmationPromise = manager.requestConfirmation(
        { name: 'shell', args: { command: 'ls' } },
        gemini.ToolConfirmationRequest.ConfirmationType.SHELL_COMMAND
      );
      
      const confirmations = Array.from((manager as any).pendingConfirmations.values()) as PendingConfirmation[];
      const cancelled = manager.cancelConfirmation(confirmations[0].id);
      
      expect(cancelled).toBe(true);
      await expect(confirmationPromise).rejects.toThrow('Confirmation cancelled');
      expect(manager.getPendingCount()).toBe(0);
    });

    it('should return false for unknown confirmation ID', () => {
      const cancelled = manager.cancelConfirmation('unknown-id');
      expect(cancelled).toBe(false);
    });
  });

  describe('cancelAllConfirmations', () => {
    it('should cancel all pending confirmations', async () => {
      const promise1 = manager.requestConfirmation(
        { name: 'tool1', args: {} },
        gemini.ToolConfirmationRequest.ConfirmationType.EXECUTE
      );
      
      const promise2 = manager.requestConfirmation(
        { name: 'tool2', args: {} },
        gemini.ToolConfirmationRequest.ConfirmationType.EXECUTE
      );
      
      expect(manager.getPendingCount()).toBe(2);
      
      manager.cancelAllConfirmations();
      
      await expect(promise1).rejects.toThrow('All confirmations cancelled');
      await expect(promise2).rejects.toThrow('All confirmations cancelled');
      expect(manager.getPendingCount()).toBe(0);
    });
  });

  describe('reset', () => {
    it('should reset all state', async () => {
      // First, add some always-allowed tools in DEFAULT mode
      manager.setApprovalMode(ApprovalMode.DEFAULT);
      
      const promise = manager.requestConfirmation(
        { name: 'ls', args: {} },
        gemini.ToolConfirmationRequest.ConfirmationType.EXECUTE
      );
      
      const confirmations = Array.from((manager as any).pendingConfirmations.values()) as PendingConfirmation[];
      manager.handleConfirmationResponse(new gemini.ToolConfirmationResponse({
        confirmation_id: confirmations[0].id,
        selected_option: gemini.ConfirmationOption.OptionType.ALLOW_ALWAYS_TOOL,
      }));
      
      await promise;
      
      // Now test that the tool is auto-approved
      const autoApproved = await manager.requestConfirmation(
        { name: 'ls', args: {} },
        gemini.ToolConfirmationRequest.ConfirmationType.EXECUTE
      );
      expect(autoApproved.confirmation_id).toBe('always-allowed');
      
      // Add pending confirmation
      const pendingPromise = manager.requestConfirmation(
        { name: 'rm', args: {} },
        gemini.ToolConfirmationRequest.ConfirmationType.EXECUTE
      );
      
      expect(manager.getPendingCount()).toBe(1);
      
      // Reset
      manager.reset();
      
      // Check everything is cleared
      expect(manager.getPendingCount()).toBe(0);
      await expect(pendingPromise).rejects.toThrow('All confirmations cancelled');
      
      // Always-allowed tools should be cleared
      const newPromise = manager.requestConfirmation(
        { name: 'ls', args: {} },
        gemini.ToolConfirmationRequest.ConfirmationType.EXECUTE
      );
      
      // Should not auto-approve anymore
      expect(manager.getPendingCount()).toBe(1);
      newPromise.catch(() => {}); // Ignore rejection
    });
  });

  describe('isConfirmationPending', () => {
    it('should return true for pending confirmation', () => {
      const promise = manager.requestConfirmation(
        { name: 'tool', args: {} },
        gemini.ToolConfirmationRequest.ConfirmationType.EXECUTE
      );
      
      const confirmations = Array.from((manager as any).pendingConfirmations.values()) as PendingConfirmation[];
      expect(manager.isConfirmationPending(confirmations[0].id)).toBe(true);
      
      promise.catch(() => {}); // Ignore rejection
    });

    it('should return false for unknown confirmation', () => {
      expect(manager.isConfirmationPending('unknown-id')).toBe(false);
    });
  });
});