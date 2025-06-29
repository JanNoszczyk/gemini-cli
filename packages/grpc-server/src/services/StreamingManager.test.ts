/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { StreamingManager } from './StreamingManager';
import { gemini } from '../proto/generated/gemini';
import { MessageBuilders } from '../utils/MessageBuilders';

describe('StreamingManager', () => {
  let manager: StreamingManager;
  let mockStream: any;

  beforeEach(() => {
    manager = new StreamingManager();
    mockStream = {
      write: vi.fn(),
    };
    manager.setStream(mockStream);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    manager.cleanup();
  });

  describe('content streaming', () => {
    it('should start and end streaming', () => {
      const contentStreamedHandler = vi.fn();
      const streamEndedHandler = vi.fn();
      
      manager.on('contentStreamed', contentStreamedHandler);
      manager.on('streamEnded', streamEndedHandler);

      // Start streaming
      manager.startStreaming(gemini.ChatContent.ContentType.GEMINI);
      expect(manager.isStreaming()).toBe(true);

      // Append content
      manager.appendStreamContent('Hello ');
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          chat_content: expect.objectContaining({
            content: 'Hello ',
            is_streaming: true,
          }),
        })
      );
      expect(contentStreamedHandler).toHaveBeenCalledWith('Hello ');

      // Append more content
      manager.appendStreamContent('world!');
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          chat_content: expect.objectContaining({
            content: 'Hello world!',
            is_streaming: true,
          }),
        })
      );

      // End streaming
      const finalContent = manager.endStreaming();
      expect(finalContent).toBe('Hello world!');
      expect(manager.isStreaming()).toBe(false);
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          chat_content: expect.objectContaining({
            content: 'Hello world!',
            is_streaming: false,
          }),
        })
      );
      expect(streamEndedHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          content: 'Hello world!',
        })
      );
    });

    it('should throw error when appending without streaming', () => {
      expect(() => manager.appendStreamContent('test')).toThrow('Not currently streaming');
    });

    it('should throw error when ending without streaming', () => {
      expect(() => manager.endStreaming()).toThrow('Not currently streaming');
    });

    it('should handle different content types', () => {
      manager.startStreaming(gemini.ChatContent.ContentType.USER);
      manager.appendStreamContent('User input');
      
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          chat_content: expect.objectContaining({
            type: gemini.ChatContent.ContentType.USER,
            content: 'User input',
            is_streaming: true,
          }),
        })
      );
    });
  });

  describe('progress operations', () => {
    it('should start and end progress operation', () => {
      const progressStartedHandler = vi.fn();
      const progressEndedHandler = vi.fn();
      
      manager.on('progressStarted', progressStartedHandler);
      manager.on('progressEnded', progressEndedHandler);

      // Start progress
      manager.startProgress('op1', 'Loading', 'Initializing');
      
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          progress_update: expect.objectContaining({
            operation_id: 'op1',
            operation: 'Loading',
            status: 'Initializing',
            progress: -1,
          }),
        })
      );
      expect(progressStartedHandler).toHaveBeenCalledWith({
        operationId: 'op1',
        operation: 'Loading',
      });
      expect(manager.getActiveProgressCount()).toBe(1);

      // End progress
      manager.endProgress('op1', 'Complete');
      
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          progress_update: expect.objectContaining({
            operation_id: 'op1',
            status: 'Complete',
            progress: 1.0,
          }),
        })
      );
      expect(progressEndedHandler).toHaveBeenCalled();
      expect(manager.getActiveProgressCount()).toBe(0);
    });

    it('should rotate loading phrases', () => {
      const customPhrases = ['Loading...', 'Please wait...', 'Almost done...'];
      
      manager.startProgress('op2', 'Processing', 'Starting', customPhrases, 1000);
      
      // Initial phrase
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          progress_update: expect.objectContaining({
            loading_phrase: 'Loading...',
          }),
        })
      );

      // Advance timer and check phrase rotation
      vi.advanceTimersByTime(1000);
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          progress_update: expect.objectContaining({
            loading_phrase: 'Please wait...',
          }),
        })
      );

      vi.advanceTimersByTime(1000);
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          progress_update: expect.objectContaining({
            loading_phrase: 'Almost done...',
          }),
        })
      );

      // Should cycle back to first phrase
      vi.advanceTimersByTime(1000);
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          progress_update: expect.objectContaining({
            loading_phrase: 'Loading...',
          }),
        })
      );

      manager.endProgress('op2');
    });

    it('should update progress with percentage', () => {
      const progressUpdatedHandler = vi.fn();
      manager.on('progressUpdated', progressUpdatedHandler);

      manager.startProgress('op3', 'Downloading', 'Starting');
      
      // Update with 50% progress
      manager.updateProgress('op3', 'Downloading...', 0.5, 'Halfway there');
      
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          progress_update: expect.objectContaining({
            operation_id: 'op3',
            status: 'Downloading...',
            progress: 0.5,
            loading_phrase: 'Halfway there',
          }),
        })
      );
      expect(progressUpdatedHandler).toHaveBeenCalledWith({
        operationId: 'op3',
        status: 'Downloading...',
        progress: 0.5,
      });

      manager.endProgress('op3');
    });

    it('should handle multiple concurrent progress operations', () => {
      manager.startProgress('op4', 'Task 1', 'Running');
      manager.startProgress('op5', 'Task 2', 'Running');
      manager.startProgress('op6', 'Task 3', 'Running');
      
      expect(manager.getActiveProgressCount()).toBe(3);

      manager.endProgress('op5');
      expect(manager.getActiveProgressCount()).toBe(2);

      manager.endAllProgress();
      expect(manager.getActiveProgressCount()).toBe(0);
    });

    it('should replace existing progress operation with same ID', () => {
      manager.startProgress('op7', 'First operation', 'Running');
      const count1 = mockStream.write.mock.calls.length;
      
      manager.startProgress('op7', 'Second operation', 'Running');
      const count2 = mockStream.write.mock.calls.length;
      
      // Should have called write again for the new operation
      expect(count2).toBeGreaterThan(count1);
      expect(manager.getActiveProgressCount()).toBe(1);
      
      manager.endProgress('op7');
    });
  });

  describe('thought bubbles', () => {
    it('should send thought bubble and clear after duration', () => {
      manager.sendThoughtWithProgress('Planning', 'Let me think about this...', 1000);
      
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          thought_bubble: expect.objectContaining({
            subject: 'Planning',
            thought: 'Let me think about this...',
          }),
        })
      );

      // Advance timer to clear thought
      vi.advanceTimersByTime(1000);
      
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          thought_bubble: expect.objectContaining({
            subject: 'Planning',
            thought: '',
          }),
        })
      );
    });
  });

  describe('tool output streaming', () => {
    it('should stream tool output', () => {
      const toolOutputHandler = vi.fn();
      manager.on('toolOutputStreamed', toolOutputHandler);

      manager.streamToolOutput('tool1', 'shell', 'Command output line 1\n', false);
      
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          tool_output: expect.objectContaining({
            tool_id: 'tool1',
            tool_name: 'shell',
            output: 'Command output line 1\n',
            is_error: false,
          }),
        })
      );
      expect(toolOutputHandler).toHaveBeenCalledWith({
        toolId: 'tool1',
        toolName: 'shell',
        output: 'Command output line 1\n',
        isError: false,
      });
    });

    it('should stream tool error output', () => {
      manager.streamToolOutput('tool2', 'shell', 'Error: Command not found\n', true);
      
      expect(mockStream.write).toHaveBeenCalledWith(
        expect.objectContaining({
          tool_output: expect.objectContaining({
            tool_id: 'tool2',
            tool_name: 'shell',
            output: 'Error: Command not found\n',
            is_error: true,
          }),
        })
      );
    });
  });

  describe('cleanup', () => {
    it('should clean up all resources', () => {
      // Set up various operations
      manager.startStreaming();
      manager.appendStreamContent('test');
      manager.startProgress('op8', 'Test', 'Running');
      manager.startProgress('op9', 'Test2', 'Running');
      
      expect(manager.isStreaming()).toBe(true);
      expect(manager.getActiveProgressCount()).toBe(2);

      // Cleanup
      manager.cleanup();
      
      expect(manager.isStreaming()).toBe(false);
      expect(manager.getActiveProgressCount()).toBe(0);
      
      // Stream should be null after cleanup
      manager.setStream(mockStream);
      manager.cleanup();
      
      // Operations should not write after cleanup
      mockStream.write.mockClear();
      manager.startProgress('op10', 'Test', 'Running');
      expect(mockStream.write).not.toHaveBeenCalled();
    });
  });

  describe('without stream', () => {
    it('should handle operations without stream gracefully', () => {
      const manager2 = new StreamingManager();
      
      // These should not throw
      expect(() => {
        manager2.startStreaming();
        manager2.appendStreamContent('test');
        manager2.endStreaming();
        manager2.startProgress('op11', 'Test', 'Running');
        manager2.sendThoughtWithProgress('Think', 'Thinking...');
        manager2.streamToolOutput('tool3', 'test', 'output');
      }).not.toThrow();
    });
  });
});