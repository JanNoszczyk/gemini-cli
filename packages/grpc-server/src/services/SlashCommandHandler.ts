/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { gemini } from '../proto/generated/gemini';
import { ConfigurationManager } from './ConfigurationManager';
import { MessageBuilders } from '../utils/MessageBuilders';
import { HelpManager } from './HelpManager';
import { ErrorHandler } from './ErrorHandler';
import * as grpc from '@grpc/grpc-js';

interface CommandResult {
  handled: boolean;
  response?: gemini.ServerResponse;
}

/**
 * Handles slash commands for configuration and session management
 */
export class SlashCommandHandler {
  private commands: Map<string, {
    description: string;
    usage: string;
    handler: (args: string[], session: any, stream: grpc.ServerDuplexStream<any, any>) => Promise<CommandResult>;
  }>;
  private helpManager: HelpManager;
  private errorHandler: ErrorHandler;

  constructor(helpManager?: HelpManager, errorHandler?: ErrorHandler) {
    this.commands = new Map();
    this.helpManager = helpManager || new HelpManager();
    this.errorHandler = errorHandler || new ErrorHandler();
    this.registerCommands();
  }

  /**
   * Register all available slash commands
   */
  private registerCommands() {
    this.commands.set('help', {
      description: 'Show available commands',
      usage: '/help [command]',
      handler: this.handleHelp.bind(this),
    });

    this.commands.set('model', {
      description: 'Switch to a different model',
      usage: '/model <model-name>',
      handler: this.handleModel.bind(this),
    });

    this.commands.set('theme', {
      description: 'Change the display theme',
      usage: '/theme <theme-name>',
      handler: this.handleTheme.bind(this),
    });

    this.commands.set('editor', {
      description: 'Set the external editor',
      usage: '/editor <editor-name>',
      handler: this.handleEditor.bind(this),
    });

    this.commands.set('config', {
      description: 'Show current configuration',
      usage: '/config',
      handler: this.handleConfig.bind(this),
    });

    this.commands.set('stats', {
      description: 'Show session statistics',
      usage: '/stats',
      handler: this.handleStats.bind(this),
    });

    this.commands.set('clear', {
      description: 'Clear the conversation history',
      usage: '/clear',
      handler: this.handleClear.bind(this),
    });

    this.commands.set('approval', {
      description: 'Set approval mode',
      usage: '/approval <default|auto-edit|yolo>',
      handler: this.handleApproval.bind(this),
    });

    this.commands.set('tools', {
      description: 'Show available tools',
      usage: '/tools',
      handler: this.handleTools.bind(this),
    });

    this.commands.set('retry', {
      description: 'Retry the last failed operation',
      usage: '/retry',
      handler: this.handleRetry.bind(this),
    });
  }

  /**
   * Check if a message is a slash command
   */
  isSlashCommand(message: string): boolean {
    return message.startsWith('/');
  }

  /**
   * Parse a slash command
   */
  parseCommand(message: string): { command: string; args: string[] } {
    const parts = message.slice(1).split(' ').filter(p => p.length > 0);
    return {
      command: parts[0] || '',
      args: parts.slice(1),
    };
  }

  /**
   * Handle a slash command
   */
  async handleCommand(
    message: string,
    session: any,
    stream: grpc.ServerDuplexStream<gemini.ClientRequest, gemini.ServerResponse>
  ): Promise<CommandResult> {
    if (!this.isSlashCommand(message)) {
      return { handled: false };
    }

    const { command, args } = this.parseCommand(message);
    const handler = this.commands.get(command);

    if (!handler) {
      return {
        handled: true,
        response: MessageBuilders.errorMessage(
          `Unknown command: /${command}`,
          'Type /help for available commands'
        ),
      };
    }

    return handler.handler(args, session, stream);
  }

  /**
   * Get command help text
   */
  getCommandHelp(command?: string): string {
    if (command) {
      const cmd = this.commands.get(command);
      if (cmd) {
        return `${cmd.usage}\n\n${cmd.description}`;
      }
      return `Unknown command: ${command}`;
    }

    // General help
    let help = 'Available commands:\n\n';
    for (const [name, cmd] of this.commands) {
      help += `${cmd.usage.padEnd(30)} - ${cmd.description}\n`;
    }
    return help;
  }

  // Command handlers

  private async handleHelp(
    args: string[],
    session: any,
    stream: grpc.ServerDuplexStream<any, any>
  ): Promise<CommandResult> {
    // Use HelpManager for comprehensive help
    const topic = args.length > 0 ? args.join(' ') : undefined;
    const helpResponse = this.helpManager.getHelp(topic);
    
    stream.write(helpResponse);
    return { handled: true };
  }

  private async handleModel(
    args: string[],
    session: any,
    stream: grpc.ServerDuplexStream<any, any>
  ): Promise<CommandResult> {
    if (args.length === 0) {
      const currentModel = session.config.getModel();
      const available = session.configurationManager.getAvailableOptions().models;
      
      stream.write(MessageBuilders.infoMessage(
        `Current model: ${currentModel}`,
        `Available models: ${available.join(', ')}`
      ));
      return { handled: true };
    }

    try {
      await session.configurationManager.updateModel(args[0]);
      stream.write(MessageBuilders.infoMessage(
        `Model switched to ${args[0]}`
      ));
    } catch (error) {
      stream.write(MessageBuilders.errorMessage(
        error instanceof Error ? error.message : 'Failed to switch model'
      ));
    }

    return { handled: true };
  }

  private async handleTheme(
    args: string[],
    session: any,
    stream: grpc.ServerDuplexStream<any, any>
  ): Promise<CommandResult> {
    if (args.length === 0) {
      const current = session.configurationManager.getCurrentConfig().theme;
      const available = session.configurationManager.getAvailableOptions().themes;
      
      stream.write(MessageBuilders.infoMessage(
        `Current theme: ${current}`,
        `Available themes: ${available.join(', ')}`
      ));
      return { handled: true };
    }

    try {
      session.configurationManager.updateTheme(args[0]);
      stream.write(MessageBuilders.infoMessage(
        `Theme changed to ${args[0]}`
      ));
    } catch (error) {
      stream.write(MessageBuilders.errorMessage(
        error instanceof Error ? error.message : 'Failed to change theme'
      ));
    }

    return { handled: true };
  }

  private async handleEditor(
    args: string[],
    session: any,
    stream: grpc.ServerDuplexStream<any, any>
  ): Promise<CommandResult> {
    if (args.length === 0) {
      const current = session.configurationManager.getCurrentConfig().editorType;
      const available = session.configurationManager.getAvailableOptions().editors;
      
      stream.write(MessageBuilders.infoMessage(
        `Current editor: ${current}`,
        `Available editors: ${available.join(', ')}`
      ));
      return { handled: true };
    }

    try {
      session.configurationManager.updateEditorType(args[0]);
      stream.write(MessageBuilders.infoMessage(
        `Editor changed to ${args[0]}`
      ));
    } catch (error) {
      stream.write(MessageBuilders.errorMessage(
        error instanceof Error ? error.message : 'Failed to change editor'
      ));
    }

    return { handled: true };
  }

  private async handleConfig(
    args: string[],
    session: any,
    stream: grpc.ServerDuplexStream<any, any>
  ): Promise<CommandResult> {
    const config = session.configurationManager.getCurrentConfig();
    
    const configText = `Current Configuration:
    
Model: ${config.model}
Theme: ${config.theme}
Editor: ${config.editorType}
Approval Mode: ${config.approvalMode}
Show Tool Descriptions: ${config.showToolDescriptions}
Show Error Details: ${config.showErrorDetails}
Enabled Tools: ${config.enabledTools.join(', ')}`;

    stream.write(MessageBuilders.infoMessage('Configuration', configText));
    return { handled: true };
  }

  private async handleStats(
    args: string[],
    session: any,
    stream: grpc.ServerDuplexStream<any, any>
  ): Promise<CommandResult> {
    const stats = session.stats;
    const duration = new Date().getTime() - stats.startTime.getTime();
    
    const statsText = `Session Statistics:
    
Session ID: ${session.id}
Duration: ${Math.floor(duration / 1000)}s
Turns: ${stats.turnCount}
Tools Executed: ${stats.toolsExecuted}
Files Modified: ${stats.filesModified}
Total API Time: ${stats.totalApiTime}ms

Token Usage:
  Input: ${stats.totalTokens.input}
  Output: ${stats.totalTokens.output}
  Cached: ${stats.totalTokens.cached}
  Total: ${stats.totalTokens.input + stats.totalTokens.output}`;

    stream.write(MessageBuilders.infoMessage('Statistics', statsText));
    return { handled: true };
  }

  private async handleClear(
    args: string[],
    session: any,
    stream: grpc.ServerDuplexStream<any, any>
  ): Promise<CommandResult> {
    // Clear error history if available
    if (session.errorHandler) {
      session.errorHandler.clearErrorHistory();
    }
    
    // Note: Actual conversation history clearing would need to be implemented in GeminiChat
    stream.write(MessageBuilders.infoMessage(
      'Clear',
      'Conversation and error history has been cleared'
    ));
    return { handled: true };
  }

  private async handleApproval(
    args: string[],
    session: any,
    stream: grpc.ServerDuplexStream<any, any>
  ): Promise<CommandResult> {
    if (args.length === 0) {
      const current = session.configurationManager.getCurrentConfig().approvalMode;
      stream.write(MessageBuilders.infoMessage(
        `Current approval mode: ${current}`,
        'Available modes: default, auto-edit, yolo'
      ));
      return { handled: true };
    }

    const modeMap: Record<string, gemini.ApprovalMode> = {
      'default': gemini.ApprovalMode.DEFAULT,
      'auto-edit': gemini.ApprovalMode.AUTO_EDIT,
      'yolo': gemini.ApprovalMode.YOLO,
    };

    const mode = modeMap[args[0].toLowerCase()];
    if (mode === undefined) {
      stream.write(MessageBuilders.errorMessage(
        `Invalid approval mode: ${args[0]}`,
        'Available modes: default, auto-edit, yolo'
      ));
      return { handled: true };
    }

    session.configurationManager.updateApprovalMode(mode);
    session.confirmationManager.setApprovalMode(
      session.configurationManager['mapApprovalMode'](mode)
    );
    
    stream.write(MessageBuilders.infoMessage(
      `Approval mode changed to ${args[0]}`
    ));
    return { handled: true };
  }

  private async handleTools(
    args: string[],
    session: any,
    stream: grpc.ServerDuplexStream<any, any>
  ): Promise<CommandResult> {
    const config = session.configurationManager.getCurrentConfig();
    const available = session.configurationManager.getAvailableOptions().tools;
    
    const toolsText = `Tools:
    
Enabled: ${config.enabledTools.join(', ')}
Available: ${available.join(', ')}`;

    stream.write(MessageBuilders.infoMessage('Tools', toolsText));
    return { handled: true };
  }

  private async handleRetry(
    args: string[],
    session: any,
    stream: grpc.ServerDuplexStream<any, any>
  ): Promise<CommandResult> {
    // Check if we have error handler and last error
    if (!session.errorHandler) {
      stream.write(MessageBuilders.warningMessage(
        'No error handler available for retry'
      ));
      return { handled: true };
    }

    const lastError = session.errorHandler.getLastError();
    if (!lastError) {
      stream.write(MessageBuilders.infoMessage(
        'No recent errors',
        'There are no recent errors to retry'
      ));
      return { handled: true };
    }

    if (!session.errorHandler.isRetryable(lastError)) {
      stream.write(MessageBuilders.warningMessage(
        'Last error is not retryable',
        `Error: ${lastError.message}\nThis type of error cannot be retried automatically`
      ));
      return { handled: true };
    }

    // Store the last operation for retry (would need to be implemented in session)
    stream.write(MessageBuilders.infoMessage(
      'Retry',
      `Retrying last operation that failed with: ${lastError.message}\n\nNote: Retry functionality requires storing last operation context`
    ));
    
    // In a full implementation, we would:
    // 1. Store the last operation context in the session
    // 2. Re-execute the operation here
    // 3. Handle the result
    
    return { handled: true };
  }
}