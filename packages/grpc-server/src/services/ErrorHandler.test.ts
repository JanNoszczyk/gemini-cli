/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorHandler, ErrorCategory } from './ErrorHandler';
import { MessageBuilders } from '../utils/MessageBuilders';

describe('ErrorHandler', () => {
  let errorHandler: ErrorHandler;
  let mockStream: any;

  beforeEach(() => {
    errorHandler = new ErrorHandler(false);
    // Prevent unhandled error events in tests
    errorHandler.on('error', () => {});
    mockStream = {
      write: vi.fn(),
    };
  });

  describe('handleError', () => {
    it('should categorize network errors correctly', () => {
      const error = new Error('ECONNREFUSED: Connection refused');
      const context = errorHandler.handleError(error);

      expect(context.category).toBe(ErrorCategory.NETWORK);
      expect(context.code).toBe('NETWORK_ERROR');
      expect(context.recoverable).toBe(true);
      expect(context.suggestions).toContain('Check your internet connection');
    });

    it('should categorize authentication errors', () => {
      const error = new Error('401 Unauthorized: Invalid API key');
      const context = errorHandler.handleError(error);

      expect(context.category).toBe(ErrorCategory.AUTHENTICATION);
      expect(context.code).toBe('AUTH_ERROR');
      expect(context.recoverable).toBe(false);
      expect(context.suggestions).toContain('Check your API key is set correctly');
      expect(context.documentationUrl).toBe('https://ai.google.dev/gemini-api/docs/api-key');
    });

    it('should categorize rate limit errors', () => {
      const error = new Error('429 Too Many Requests: Rate limit exceeded');
      const context = errorHandler.handleError(error);

      expect(context.category).toBe(ErrorCategory.RATE_LIMIT);
      expect(context.code).toBe('RATE_LIMIT_ERROR');
      expect(context.recoverable).toBe(true);
      expect(context.suggestions).toContain('Wait a few minutes before trying again');
    });

    it('should categorize tool execution errors', () => {
      const error = new Error('Tool not found: unknown_tool');
      const context = errorHandler.handleError(error);

      expect(context.category).toBe(ErrorCategory.TOOL_EXECUTION);
      expect(context.code).toBe('TOOL_NOT_FOUND');
      expect(context.recoverable).toBe(true);
      expect(context.suggestions).toContain('Use /tools to see available tools');
    });

    it('should categorize permission errors', () => {
      const error = new Error('EACCES: Permission denied');
      const context = errorHandler.handleError(error);

      expect(context.category).toBe(ErrorCategory.PERMISSION);
      expect(context.code).toBe('PERMISSION_DENIED');
      expect(context.recoverable).toBe(false);
      expect(context.suggestions).toContain('Check file/directory permissions');
    });

    it('should categorize file system errors', () => {
      const error = new Error('ENOENT: No such file or directory');
      const context = errorHandler.handleError(error);

      expect(context.category).toBe(ErrorCategory.FILE_SYSTEM);
      expect(context.code).toBe('FILE_NOT_FOUND');
      expect(context.recoverable).toBe(true);
      expect(context.suggestions).toContain('Verify the file or directory path');
    });

    it('should default to internal error for unknown patterns', () => {
      const error = new Error('Something went wrong');
      const context = errorHandler.handleError(error);

      expect(context.category).toBe(ErrorCategory.INTERNAL);
      expect(context.code).toBe('INTERNAL_ERROR');
      expect(context.recoverable).toBe(false);
      expect(context.suggestions).toContain('This appears to be an internal error');
    });

    it('should preserve custom context', () => {
      const error = new Error('Custom error');
      const customContext = {
        code: 'CUSTOM_CODE',
        suggestions: ['Custom suggestion'],
      };
      const context = errorHandler.handleError(error, customContext);

      expect(context.code).toBe('CUSTOM_CODE');
      expect(context.suggestions).toContain('Custom suggestion');
    });

    it('should add errors to history', () => {
      errorHandler.handleError(new Error('Error 1'));
      errorHandler.handleError(new Error('Error 2'));
      
      const history = errorHandler.getErrorHistory();
      expect(history).toHaveLength(2);
      expect(history[0].message).toBe('Error 1');
      expect(history[1].message).toBe('Error 2');
    });

    it('should limit error history size', () => {
      // Add more than max history size (50)
      for (let i = 0; i < 60; i++) {
        errorHandler.handleError(new Error(`Error ${i}`));
      }
      
      const history = errorHandler.getErrorHistory();
      expect(history).toHaveLength(50);
      expect(history[0].message).toBe('Error 10'); // First 10 should be removed
    });

  });

  describe('sendError', () => {
    it('should send basic error message', () => {
      const error = new Error('Test error');
      errorHandler.sendError(mockStream, error);

      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          error_message: expect.objectContaining({
            message: 'Test error',
          }),
        })
      );
    });

    it('should include error details when enabled', () => {
      errorHandler.setShowErrorDetails(true);
      const error = new Error('Test error');
      error.stack = 'Error: Test error\n    at test.js:10';
      
      errorHandler.sendError(mockStream, error);

      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          error_message: expect.objectContaining({
            details: expect.stringContaining('Category: INTERNAL'),
          }),
        })
      );
    });

    it('should send help content for errors with related commands', () => {
      const error = new Error('Tool not found: missing_tool');
      errorHandler.sendError(mockStream, error);

      // Should send error message
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          error_message: expect.any(Object),
        })
      );
      
      // Note: Related commands would be sent if we enhance the error patterns
    });
  });

  describe('sanitizeErrorMessage', () => {
    it('should remove API keys from error messages', () => {
      const error = new Error('Failed with api_key="sk-1234567890abcdef"');
      const context = errorHandler.handleError(error);
      
      expect(context.message).toBe('Failed with API_KEY=***');
    });

    it('should remove Bearer tokens', () => {
      const error = new Error('Authorization failed: Bearer abc123def456');
      const context = errorHandler.handleError(error);
      
      expect(context.message).toBe('Authorization failed: Bearer ***');
    });

    it('should extract first line of multi-line errors', () => {
      const error = new Error('First line\nSecond line\nThird line');
      const context = errorHandler.handleError(error);
      
      expect(context.message).toBe('First line');
    });
  });

  describe('isRetryable', () => {
    it('should identify retryable network errors', () => {
      const error = new Error('ETIMEDOUT');
      const context = errorHandler.handleError(error);
      
      expect(errorHandler.isRetryable(context)).toBe(true);
    });

    it('should identify retryable rate limit errors', () => {
      const error = new Error('Rate limit exceeded');
      const context = errorHandler.handleError(error);
      
      expect(errorHandler.isRetryable(context)).toBe(true);
    });

    it('should not retry authentication errors', () => {
      const error = new Error('401 Unauthorized');
      const context = errorHandler.handleError(error);
      
      expect(errorHandler.isRetryable(context)).toBe(false);
    });

    it('should not retry permission errors', () => {
      const error = new Error('Permission denied');
      const context = errorHandler.handleError(error);
      
      expect(errorHandler.isRetryable(context)).toBe(false);
    });
  });

  describe('getLastError', () => {
    it('should return undefined when no errors', () => {
      expect(errorHandler.getLastError()).toBeUndefined();
    });

    it('should return the last error', () => {
      errorHandler.handleError(new Error('First error'));
      errorHandler.handleError(new Error('Last error'));
      
      const lastError = errorHandler.getLastError();
      expect(lastError?.message).toBe('Last error');
    });
  });

  describe('clearErrorHistory', () => {
    it('should clear all errors', () => {
      errorHandler.handleError(new Error('Error 1'));
      errorHandler.handleError(new Error('Error 2'));
      
      errorHandler.clearErrorHistory();
      
      expect(errorHandler.getErrorHistory()).toHaveLength(0);
      expect(errorHandler.getLastError()).toBeUndefined();
    });
  });

  describe('addErrorPattern', () => {
    it('should add and use custom error pattern', () => {
      errorHandler.addErrorPattern({
        pattern: /CUSTOM_ERROR_CODE/,
        category: ErrorCategory.VALIDATION,
        code: 'CUSTOM_ERROR',
        recoverable: true,
        suggestions: ['Custom suggestion'],
        documentationUrl: 'https://example.com/help',
      });
      
      const error = new Error('Failed with CUSTOM_ERROR_CODE');
      const context = errorHandler.handleError(error);
      
      expect(context.category).toBe(ErrorCategory.VALIDATION);
      expect(context.code).toBe('CUSTOM_ERROR');
      expect(context.suggestions).toContain('Custom suggestion');
      expect(context.documentationUrl).toBe('https://example.com/help');
    });
  });

  describe('formatStackTrace', () => {
    it('should filter out node internals from stack trace', () => {
      errorHandler.setShowErrorDetails(true);
      
      const error = new Error('Test error');
      error.stack = `Error: Test error
    at Object.<anonymous> (/app/test.js:10:15)
    at Module._compile (node:internal/modules/cjs/loader:1218:14)
    at node:internal/modules/cjs/loader:1309:10
    at /app/node_modules/some-lib/index.js:20:5
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`;
      
      errorHandler.sendError(mockStream, error);
      
      const call = mockStream.write.mock.calls[0][0];
      const details = call.error_message.details;
      
      expect(details).toContain('/app/test.js:10:15');
      expect(details).not.toContain('node:internal');
      expect(details).not.toContain('node_modules');
      expect(details).not.toContain('processTicksAndRejections');
    });
  });
});