/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { vi } from 'vitest';

export class GoogleGenerativeAI {
  constructor() {}
  getGenerativeModel: vi.Mock = vi.fn(() => ({
    startChat: vi.fn(() => ({
      sendMessage: vi.fn().mockResolvedValue({
        response: {
          text: () => 'mocked response',
        },
      }),
    })),
  }));
}

export const Type = {};