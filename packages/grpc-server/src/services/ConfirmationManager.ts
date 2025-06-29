/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { gemini } from '../proto/generated/gemini';
import { v4 as uuidv4 } from 'uuid';
import { EventEmitter } from 'events';
import { MessageBuilders } from '../utils/MessageBuilders';
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

/**
 * Manages tool confirmation requests and responses
 */
export class ConfirmationManager extends EventEmitter {
  private pendingConfirmations = new Map<string, PendingConfirmation>();
  private alwaysAllowedTools = new Set<string>();
  private alwaysAllowedServers = new Set<string>();
  private approvalMode: ApprovalMode = ApprovalMode.DEFAULT;
  private confirmationTimeout = 300000; // 5 minutes

  constructor() {
    super();
  }

  /**
   * Set the approval mode for the session
   */
  setApprovalMode(mode: ApprovalMode) {
    this.approvalMode = mode;
  }

  /**
   * Request confirmation for a tool execution
   */
  async requestConfirmation(
    toolCall: { name: string; args: any },
    type: gemini.ToolConfirmationRequest.ConfirmationType,
    description?: string,
    diffPreview?: gemini.DiffPreview,
    mcpServer?: string
  ): Promise<gemini.ToolConfirmationResponse> {
    // In YOLO mode, auto-approve everything
    if (this.approvalMode === ApprovalMode.YOLO) {
      return new gemini.ToolConfirmationResponse({
        confirmation_id: 'auto-approved',
        selected_option: gemini.ConfirmationOption.OptionType.ALLOW_ONCE,
      });
    }

    // Check if tool is always allowed
    if (this.alwaysAllowedTools.has(toolCall.name)) {
      return new gemini.ToolConfirmationResponse({
        confirmation_id: 'always-allowed',
        selected_option: gemini.ConfirmationOption.OptionType.ALLOW_ONCE,
      });
    }

    // Check if MCP server is always allowed
    if (mcpServer && this.alwaysAllowedServers.has(mcpServer)) {
      return new gemini.ToolConfirmationResponse({
        confirmation_id: 'server-allowed',
        selected_option: gemini.ConfirmationOption.OptionType.ALLOW_ONCE,
      });
    }

    // Create confirmation request
    const confirmationId = uuidv4();
    
    return new Promise((resolve, reject) => {
      // Set timeout
      const timeout = setTimeout(() => {
        this.pendingConfirmations.delete(confirmationId);
        reject(new Error('Confirmation timeout'));
      }, this.confirmationTimeout);

      // Store pending confirmation
      this.pendingConfirmations.set(confirmationId, {
        id: confirmationId,
        toolCall,
        type,
        mcpServer,
        resolve,
        reject,
        timeout,
      });

      // Emit confirmation request
      const request = MessageBuilders.toolConfirmationRequest(
        confirmationId,
        toolCall.name,
        toolCall.args,
        type,
        description,
        diffPreview,
        mcpServer
      );

      this.emit('confirmationRequest', request);
    });
  }

  /**
   * Handle a confirmation response from the client
   */
  handleConfirmationResponse(response: gemini.ToolConfirmationResponse): boolean {
    const pending = this.pendingConfirmations.get(response.confirmation_id);
    if (!pending) {
      return false;
    }

    // Clear timeout
    if (pending.timeout) {
      clearTimeout(pending.timeout);
    }

    // Remove from pending
    this.pendingConfirmations.delete(response.confirmation_id);

    // Handle "always allow" options
    switch (response.selected_option) {
      case gemini.ConfirmationOption.OptionType.ALLOW_ALWAYS_TOOL:
        this.alwaysAllowedTools.add(pending.toolCall.name);
        break;
      case gemini.ConfirmationOption.OptionType.ALLOW_ALWAYS_SERVER:
        if (pending.mcpServer) {
          this.alwaysAllowedServers.add(pending.mcpServer);
        }
        break;
    }

    // Resolve the promise
    pending.resolve(response);
    return true;
  }

  /**
   * Cancel a pending confirmation
   */
  cancelConfirmation(confirmationId: string): boolean {
    const pending = this.pendingConfirmations.get(confirmationId);
    if (!pending) {
      return false;
    }

    if (pending.timeout) {
      clearTimeout(pending.timeout);
    }

    this.pendingConfirmations.delete(confirmationId);
    pending.reject(new Error('Confirmation cancelled'));
    return true;
  }

  /**
   * Cancel all pending confirmations
   */
  cancelAllConfirmations() {
    for (const [id, pending] of this.pendingConfirmations) {
      if (pending.timeout) {
        clearTimeout(pending.timeout);
      }
      pending.reject(new Error('All confirmations cancelled'));
    }
    this.pendingConfirmations.clear();
  }

  /**
   * Reset approval settings
   */
  reset() {
    this.cancelAllConfirmations();
    this.alwaysAllowedTools.clear();
    this.alwaysAllowedServers.clear();
    this.approvalMode = ApprovalMode.DEFAULT;
  }

  /**
   * Get the number of pending confirmations
   */
  getPendingCount(): number {
    return this.pendingConfirmations.size;
  }

  /**
   * Check if a specific confirmation is pending
   */
  isConfirmationPending(confirmationId: string): boolean {
    return this.pendingConfirmations.has(confirmationId);
  }
}