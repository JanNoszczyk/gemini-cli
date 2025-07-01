/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { setSimulate429 } from './src/utils/testUtils.js';
import { vi } from 'vitest';

// Disable 429 simulation globally for all tests
setSimulate429(false);

const mockChatSession = vi.hoisted(() => ({
  sendMessage: vi.fn().mockResolvedValue({
    response: {
      text: () => 'Mocked response',
      candidates: [{ content: { parts: [{ text: 'Mocked response' }] } }],
    },
  }),
  sendMessageStream: vi.fn(async function* () {
    yield {
      response: {
        text: () => 'Mocked stream chunk',
        candidates: [{ content: { parts: [{ text: 'Mocked stream chunk' }] } }],
      },
    };
  }),
}));

const mockGenerativeModel = vi.hoisted(() => ({
  startChat: vi.fn(() => mockChatSession),
  generateContent: vi.fn().mockResolvedValue({
    response: {
      text: () => 'Mocked response',
      candidates: [{ content: { parts: [{ text: 'Mocked response' }] } }],
    },
  }),
}));

const MockGoogleGenerativeAI = vi.hoisted(() => vi.fn().mockImplementation(() => ({
  getGenerativeModel: vi.fn(() => mockGenerativeModel),
})));

vi.mock('@google/genai', () => ({
  GoogleGenerativeAI: MockGoogleGenerativeAI,
  HarmCategory: {
    HARM_CATEGORY_UNSPECIFIED: 'HARM_CATEGORY_UNSPECIFIED',
    HARM_CATEGORY_HARASSMENT: 'HARM_CATEGORY_HARASSMENT',
    HARM_CATEGORY_HATE_SPEECH: 'HARM_CATEGORY_HATE_SPEECH',
    HARM_CATEGORY_SEXUALLY_EXPLICIT: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    HARM_CATEGORY_DANGEROUS_CONTENT: 'HARM_CATEGORY_DANGEROUS_CONTENT',
  },
  HarmBlockThreshold: {
    BLOCK_NONE: 'BLOCK_NONE'
  },
  Type: { GENERATE_CONTENT: 'GENERATE_CONTENT' },
}));