/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { gemini } from '../proto/generated/gemini';
import { MessageBuilders } from '../utils/MessageBuilders';
import * as grpc from '@grpc/grpc-js';
import { EventEmitter } from 'events';

interface StreamingState {
  isStreaming: boolean;
  currentContent: string;
  contentType: gemini.ChatContent.ContentType;
  streamStartTime?: number;
}

interface ProgressOperation {
  id: string;
  operation: string;
  startTime: number;
  loadingPhrases?: string[];
  currentPhraseIndex: number;
  updateInterval?: NodeJS.Timeout;
}

/**
 * Manages real-time streaming and progress updates for gRPC responses
 */
export class StreamingManager extends EventEmitter {
  private streamingState: StreamingState = {
    isStreaming: false,
    currentContent: '',
    contentType: gemini.ChatContent.ContentType.GEMINI,
  };

  private progressOperations = new Map<string, ProgressOperation>();
  private stream: grpc.ServerDuplexStream<gemini.ClientRequest, gemini.ServerResponse> | null = null;

  // Loading phrases for progress indicators
  private defaultLoadingPhrases = [
    'Processing...',
    'Working on it...',
    'Almost there...',
    'Just a moment...',
    'Analyzing...',
    'Computing...',
    'Calculating...',
    'Preparing...',
  ];

  constructor() {
    super();
  }

  /**
   * Set the gRPC stream for sending updates
   */
  setStream(stream: grpc.ServerDuplexStream<gemini.ClientRequest, gemini.ServerResponse>) {
    this.stream = stream;
  }

  /**
   * Start streaming content
   */
  startStreaming(contentType: gemini.ChatContent.ContentType = gemini.ChatContent.ContentType.GEMINI) {
    this.streamingState = {
      isStreaming: true,
      currentContent: '',
      contentType,
      streamStartTime: Date.now(),
    };
  }

  /**
   * Append content to the current stream
   */
  appendStreamContent(content: string) {
    if (!this.streamingState.isStreaming) {
      throw new Error('Not currently streaming');
    }

    this.streamingState.currentContent += content;
    
    if (this.stream) {
      this.stream.write(MessageBuilders.chatContent(
        this.streamingState.currentContent,
        this.streamingState.contentType,
        true, // isStreaming
        true  // isMarkdown
      ));
    }

    this.emit('contentStreamed', content);
  }

  /**
   * End the current stream
   */
  endStreaming(): string {
    if (!this.streamingState.isStreaming) {
      throw new Error('Not currently streaming');
    }

    const finalContent = this.streamingState.currentContent;
    const duration = Date.now() - (this.streamingState.streamStartTime || Date.now());

    // Send final non-streaming message
    if (this.stream && finalContent) {
      this.stream.write(MessageBuilders.chatContent(
        finalContent,
        this.streamingState.contentType,
        false, // isStreaming
        true   // isMarkdown
      ));
    }

    // Reset state
    this.streamingState = {
      isStreaming: false,
      currentContent: '',
      contentType: gemini.ChatContent.ContentType.GEMINI,
    };

    this.emit('streamEnded', { content: finalContent, duration });
    return finalContent;
  }

  /**
   * Start a progress operation
   */
  startProgress(
    operationId: string,
    operation: string,
    status: string,
    loadingPhrases?: string[],
    updateIntervalMs: number = 1000
  ) {
    // End any existing operation with the same ID
    this.endProgress(operationId);

    const phrases = loadingPhrases || this.defaultLoadingPhrases;
    const progressOp: ProgressOperation = {
      id: operationId,
      operation,
      startTime: Date.now(),
      loadingPhrases: phrases,
      currentPhraseIndex: 0,
    };

    // Send initial progress update
    if (this.stream) {
      this.stream.write(MessageBuilders.progressUpdate(
        operationId,
        operation,
        status,
        -1, // Indeterminate progress
        phrases[0],
        0
      ));
    }

    // Set up interval for rotating loading phrases
    progressOp.updateInterval = setInterval(() => {
      progressOp.currentPhraseIndex = (progressOp.currentPhraseIndex + 1) % phrases.length;
      const elapsedMs = Date.now() - progressOp.startTime;

      if (this.stream) {
        this.stream.write(MessageBuilders.progressUpdate(
          operationId,
          operation,
          status,
          -1, // Still indeterminate
          phrases[progressOp.currentPhraseIndex],
          elapsedMs
        ));
      }
    }, updateIntervalMs);

    this.progressOperations.set(operationId, progressOp);
    this.emit('progressStarted', { operationId, operation });
  }

  /**
   * Update progress with a specific percentage
   */
  updateProgress(
    operationId: string,
    status: string,
    progress: number,
    loadingPhrase?: string
  ) {
    const progressOp = this.progressOperations.get(operationId);
    if (!progressOp) {
      return;
    }

    const elapsedMs = Date.now() - progressOp.startTime;
    const phrase = loadingPhrase || 
      (progressOp.loadingPhrases ? progressOp.loadingPhrases[progressOp.currentPhraseIndex] : '');

    if (this.stream) {
      this.stream.write(MessageBuilders.progressUpdate(
        operationId,
        progressOp.operation,
        status,
        progress,
        phrase,
        elapsedMs
      ));
    }

    this.emit('progressUpdated', { operationId, status, progress });
  }

  /**
   * End a progress operation
   */
  endProgress(operationId: string, finalStatus?: string) {
    const progressOp = this.progressOperations.get(operationId);
    if (!progressOp) {
      return;
    }

    // Clear the update interval
    if (progressOp.updateInterval) {
      clearInterval(progressOp.updateInterval);
    }

    const elapsedMs = Date.now() - progressOp.startTime;

    // Send final progress update if requested
    if (finalStatus && this.stream) {
      this.stream.write(MessageBuilders.progressUpdate(
        operationId,
        progressOp.operation,
        finalStatus,
        1.0, // 100% complete
        'Complete',
        elapsedMs
      ));
    }

    this.progressOperations.delete(operationId);
    this.emit('progressEnded', { operationId, elapsedMs });
  }

  /**
   * End all progress operations
   */
  endAllProgress() {
    for (const operationId of this.progressOperations.keys()) {
      this.endProgress(operationId);
    }
  }

  /**
   * Create a thought bubble with progress
   */
  sendThoughtWithProgress(subject: string, thought: string, durationMs: number = 2000) {
    if (this.stream) {
      this.stream.write(MessageBuilders.thoughtBubble(subject, thought));
    }

    // Automatically clear the thought after duration
    setTimeout(() => {
      if (this.stream) {
        // Send empty thought to clear it
        this.stream.write(MessageBuilders.thoughtBubble(subject, ''));
      }
    }, durationMs);
  }

  /**
   * Send a tool execution stream
   */
  streamToolOutput(toolId: string, toolName: string, output: string, isError: boolean = false) {
    if (this.stream) {
      this.stream.write(MessageBuilders.toolOutputStream(
        toolId,
        toolName,
        output,
        isError
      ));
    }

    this.emit('toolOutputStreamed', { toolId, toolName, output, isError });
  }

  /**
   * Check if currently streaming
   */
  isStreaming(): boolean {
    return this.streamingState.isStreaming;
  }

  /**
   * Get current streaming content
   */
  getCurrentStreamContent(): string {
    return this.streamingState.currentContent;
  }

  /**
   * Get active progress operations count
   */
  getActiveProgressCount(): number {
    return this.progressOperations.size;
  }

  /**
   * Clean up resources
   */
  cleanup() {
    this.endAllProgress();
    if (this.streamingState.isStreaming) {
      this.endStreaming();
    }
    this.stream = null;
    this.removeAllListeners();
  }
}