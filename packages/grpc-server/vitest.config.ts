/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/mocks/google-genai.ts'],
  },
  resolve: {
    alias: {
      '@google/gemini-cli-core': '@google/gemini-cli-core/dist/index.js',
    },
  },
});
