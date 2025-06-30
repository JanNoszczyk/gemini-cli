/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { vi } from 'vitest';

const mockSendMessage = vi.fn().mockResolvedValue({
  response: {
    text: () => 'mocked response',
  },
});

const mockStartChat = vi.fn(() => ({
  sendMessage: mockSendMessage,
}));

const mockGetGenerativeModel = vi.fn(() => ({
  startChat: mockStartChat,
}));

vi.mock('@google/genai', () => ({
  GoogleGenerativeAI: class {
    constructor() {}
    getGenerativeModel = mockGetGenerativeModel;
  },
  Type: {},
}));