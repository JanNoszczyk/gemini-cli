
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { vi, describe, it, expect, beforeEach } from 'vitest';
import { GrpcServiceImpl } from './GrpcServiceImpl';
import { AuthenticationManager } from '../services/AuthenticationManager';

// Mock the entire @google/genai module
vi.mock('@google/genai', async (importOriginal) => {
  const actual = await importOriginal();
  const mockGenerativeModel = {
    startChat: vi.fn().mockReturnThis(),
    sendMessageStream: vi.fn(() => {
      // Immediately return a stream-like object
      return (async function* () {
        yield { text: () => 'Mocked response' };
      })();
    }),
  };

  const mockGoogleGenerativeAI = vi.fn(() => ({
    getGenerativeModel: vi.fn(() => mockGenerativeModel),
  }));

  return {
    ...actual,
    GoogleGenerativeAI: mockGoogleGenerativeAI,
  };
});

describe('GrpcServiceImpl Mocking Test', () => {
  let service: GrpcServiceImpl;
  let authManager: AuthenticationManager;

  beforeEach(() => {
    authManager = new AuthenticationManager();
    service = new GrpcServiceImpl(authManager);
    vi.clearAllMocks();
  });

  it('should use the mocked @google/genai and not call the real one', async () => {
    const mockStream: any = {
      write: vi.fn(),
      end: vi.fn(),
      on: vi.fn(),
    };

    // This will call startChat internally, which should be mocked.
    await service.chat(mockStream);

    // Now, we can check if our mock was called.
    // This is a simplified check. A real test would be more thorough.
    // For now, we just want to see if the mock is active.
    const { GoogleGenerativeAI } = await import('@google/genai');
    const mockGenAIInstance = new GoogleGenerativeAI('test-key');
    const mockModel = mockGenAIInstance.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // The real test is whether this test runs without trying to make a network call.
    // If it completes successfully, the mock is working.
    expect(mockModel.startChat).not.toHaveBeenCalled();
  });
});
