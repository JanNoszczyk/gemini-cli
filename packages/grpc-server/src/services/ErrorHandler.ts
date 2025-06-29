/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { gemini } from '../proto/generated/gemini';
import { EventEmitter } from 'events';
import { MessageBuilders } from '../utils/MessageBuilders';
import * as grpc from '@grpc/grpc-js';

export enum ErrorCategory {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  VALIDATION = 'VALIDATION',
  TOOL_EXECUTION = 'TOOL_EXECUTION',
  CONFIGURATION = 'CONFIGURATION',
  RATE_LIMIT = 'RATE_LIMIT',
  INTERNAL = 'INTERNAL',
  USER_INPUT = 'USER_INPUT',
  FILE_SYSTEM = 'FILE_SYSTEM',
  PERMISSION = 'PERMISSION',
}

export interface ErrorContext {
  category: ErrorCategory;
  code: string;
  message: string;
  details?: string;
  stack?: string;
  recoverable: boolean;
  suggestions: string[];
  relatedCommands?: string[];
  documentationUrl?: string;
}

interface ErrorPattern {
  pattern: RegExp;
  category: ErrorCategory;
  code: string;
  recoverable: boolean;
  suggestions: string[];
  documentationUrl?: string;
}

/**
 * Handles error categorization, formatting, and recovery suggestions
 */
export class ErrorHandler extends EventEmitter {
  private showErrorDetails: boolean;
  private errorPatterns: ErrorPattern[] = [
    {
      pattern: /ECONNREFUSED|ETIMEDOUT|ENETUNREACH/i,
      category: ErrorCategory.NETWORK,
      code: 'NETWORK_ERROR',
      recoverable: true,
      suggestions: [
        'Check your internet connection',
        'Verify the gRPC server is running on the correct port',
        'Try again in a few moments',
      ],
    },
    {
      pattern: /401|unauthorized|authentication failed/i,
      category: ErrorCategory.AUTHENTICATION,
      code: 'AUTH_ERROR',
      recoverable: false,
      suggestions: [
        'Check your API key is set correctly',
        'Verify your credentials are valid',
        'Run: export GEMINI_API_KEY="your-api-key"',
      ],
      documentationUrl: 'https://ai.google.dev/gemini-api/docs/api-key',
    },
    {
      pattern: /rate limit|quota exceeded|429/i,
      category: ErrorCategory.RATE_LIMIT,
      code: 'RATE_LIMIT_ERROR',
      recoverable: true,
      suggestions: [
        'Wait a few minutes before trying again',
        'Consider upgrading your API plan',
        'Reduce the frequency of your requests',
      ],
    },
    {
      pattern: /invalid.*model|model.*not found/i,
      category: ErrorCategory.CONFIGURATION,
      code: 'INVALID_MODEL',
      recoverable: true,
      suggestions: [
        'Use /model to see available models',
        'Try: /model gemini-1.5-pro-latest',
        'Check model availability in your region',
      ],
    },
    {
      pattern: /tool.*not found|unknown tool/i,
      category: ErrorCategory.TOOL_EXECUTION,
      code: 'TOOL_NOT_FOUND',
      recoverable: true,
      suggestions: [
        'Use /tools to see available tools',
        'Check the tool name spelling',
        'Ensure the tool is enabled in your configuration',
      ],
    },
    {
      pattern: /permission denied|access denied|EACCES/i,
      category: ErrorCategory.PERMISSION,
      code: 'PERMISSION_DENIED',
      recoverable: false,
      suggestions: [
        'Check file/directory permissions',
        'Run with appropriate user privileges',
        'Verify you have access to the requested resource',
      ],
    },
    {
      pattern: /ENOENT|file not found|directory not found/i,
      category: ErrorCategory.FILE_SYSTEM,
      code: 'FILE_NOT_FOUND',
      recoverable: true,
      suggestions: [
        'Verify the file or directory path',
        'Check for typos in the path',
        'Use absolute paths for clarity',
      ],
    },
    {
      pattern: /invalid.*request|malformed.*input/i,
      category: ErrorCategory.VALIDATION,
      code: 'VALIDATION_ERROR',
      recoverable: true,
      suggestions: [
        'Check your input format',
        'Refer to the documentation for correct syntax',
        'Use /help for command assistance',
      ],
    },
  ];

  private errorHistory: ErrorContext[] = [];
  private readonly maxHistorySize = 50;

  constructor(showErrorDetails = false) {
    super();
    this.showErrorDetails = showErrorDetails;
  }

  /**
   * Set whether to show detailed error information
   */
  setShowErrorDetails(show: boolean) {
    this.showErrorDetails = show;
  }

  /**
   * Categorize and format an error
   */
  handleError(error: Error | any, context?: Partial<ErrorContext>): ErrorContext {
    const errorContext = this.categorizeError(error, context);
    
    // Add to history
    this.errorHistory.push(errorContext);
    if (this.errorHistory.length > this.maxHistorySize) {
      this.errorHistory.shift();
    }

    // Emit error event
    this.emit('error', errorContext);
    
    return errorContext;
  }

  /**
   * Send error to stream with appropriate formatting
   */
  sendError(
    stream: grpc.ServerDuplexStream<gemini.ClientRequest, gemini.ServerResponse>,
    error: Error | any,
    context?: Partial<ErrorContext>
  ) {
    const errorContext = this.handleError(error, context);
    
    // Build error message
    let details: string | undefined;
    if (this.showErrorDetails) {
      details = this.formatErrorDetails(errorContext);
    }

    // Send error message
    stream.write(MessageBuilders.errorMessage(
      errorContext.message,
      details
    ));

    // Send help content if available
    if (errorContext.relatedCommands && errorContext.relatedCommands.length > 0) {
      const helpContent = this.generateErrorHelp(errorContext);
      stream.write(MessageBuilders.helpContent(
        helpContent,
        errorContext.relatedCommands.map(cmd => new gemini.Command({
          name: cmd,
          description: this.getCommandDescription(cmd),
        }))
      ));
    }
  }

  /**
   * Categorize error based on patterns
   */
  private categorizeError(error: Error | any, context?: Partial<ErrorContext>): ErrorContext {
    const errorMessage = error?.message || String(error);
    const errorStack = error?.stack;

    // Check against known patterns
    for (const pattern of this.errorPatterns) {
      if (pattern.pattern.test(errorMessage)) {
        return {
          category: pattern.category,
          code: pattern.code,
          message: this.sanitizeErrorMessage(errorMessage),
          details: errorStack,
          stack: errorStack,
          recoverable: pattern.recoverable,
          suggestions: pattern.suggestions,
          documentationUrl: pattern.documentationUrl,
          ...context,
        };
      }
    }

    // Default to internal error
    return {
      category: ErrorCategory.INTERNAL,
      code: 'INTERNAL_ERROR',
      message: this.sanitizeErrorMessage(errorMessage),
      details: errorStack,
      stack: errorStack,
      recoverable: false,
      suggestions: [
        'This appears to be an internal error',
        'Try restarting your session',
        'If the issue persists, please report it',
      ],
      ...context,
    };
  }

  /**
   * Sanitize error message for user display
   */
  private sanitizeErrorMessage(message: string): string {
    // Remove sensitive information
    message = message.replace(/api[_-]?key["\s:=]+["']?[\w-]+["']?/gi, 'API_KEY=***');
    message = message.replace(/Bearer\s+[\w-]+/gi, 'Bearer ***');
    
    // Remove internal stack traces
    const lines = message.split('\n');
    const userMessage = lines[0] || message;
    
    return userMessage.trim();
  }

  /**
   * Format detailed error information
   */
  private formatErrorDetails(context: ErrorContext): string {
    const parts: string[] = [];
    
    parts.push(`Category: ${context.category}`);
    parts.push(`Code: ${context.code}`);
    parts.push(`Recoverable: ${context.recoverable ? 'Yes' : 'No'}`);
    
    if (context.documentationUrl) {
      parts.push(`Documentation: ${context.documentationUrl}`);
    }
    
    if (context.stack && this.showErrorDetails) {
      parts.push('\nStack Trace:');
      parts.push(this.formatStackTrace(context.stack));
    }
    
    return parts.join('\n');
  }

  /**
   * Format stack trace for display
   */
  private formatStackTrace(stack: string): string {
    const lines = stack.split('\n');
    const relevantLines = lines.filter(line => {
      // Filter out node internals and common libraries
      return !line.includes('node_modules') &&
             !line.includes('node:internal') &&
             !line.includes('timers.js') &&
             !line.includes('process.processTicksAndRejections');
    });
    
    return relevantLines.slice(0, 10).join('\n');
  }

  /**
   * Generate help content for error
   */
  private generateErrorHelp(context: ErrorContext): string {
    const sections: string[] = [];
    
    sections.push(`## Error: ${context.message}`);
    sections.push('');
    
    if (context.suggestions.length > 0) {
      sections.push('### Suggestions:');
      context.suggestions.forEach(suggestion => {
        sections.push(`- ${suggestion}`);
      });
      sections.push('');
    }
    
    if (context.relatedCommands && context.relatedCommands.length > 0) {
      sections.push('### Related Commands:');
      context.relatedCommands.forEach(cmd => {
        sections.push(`- ${cmd} - ${this.getCommandDescription(cmd)}`);
      });
      sections.push('');
    }
    
    if (context.documentationUrl) {
      sections.push(`### Documentation:`);
      sections.push(context.documentationUrl);
    }
    
    return sections.join('\n');
  }

  /**
   * Get command description for help
   */
  private getCommandDescription(command: string): string {
    const descriptions: Record<string, string> = {
      '/help': 'Show available commands and general help',
      '/model': 'Switch between available AI models',
      '/tools': 'List available tools and their descriptions',
      '/config': 'Show current configuration',
      '/retry': 'Retry the last failed operation',
      '/clear': 'Clear the error history',
    };
    
    return descriptions[command] || 'Command help';
  }

  /**
   * Get error history
   */
  getErrorHistory(): ErrorContext[] {
    return [...this.errorHistory];
  }

  /**
   * Clear error history
   */
  clearErrorHistory() {
    this.errorHistory = [];
  }

  /**
   * Get last error
   */
  getLastError(): ErrorContext | undefined {
    return this.errorHistory[this.errorHistory.length - 1];
  }

  /**
   * Check if an error is retryable
   */
  isRetryable(error: ErrorContext): boolean {
    return error.recoverable && 
           (error.category === ErrorCategory.NETWORK ||
            error.category === ErrorCategory.RATE_LIMIT ||
            error.category === ErrorCategory.TOOL_EXECUTION);
  }

  /**
   * Add custom error pattern
   */
  addErrorPattern(pattern: ErrorPattern) {
    this.errorPatterns.push(pattern);
  }
}