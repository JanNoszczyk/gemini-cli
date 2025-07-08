/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export const DEFAULT_GEMINI_MODEL = 'gemini-2.5-pro';
export const DEFAULT_GEMINI_FLASH_MODEL = 'gemini-2.5-flash';
export const DEFAULT_GEMINI_EMBEDDING_MODEL = 'gemini-embedding-001';

export const GEMINI_MODELS = {
  'gemini-2.5-pro': 'gemini-2.5-pro',
  'gemini-2.5-flash': 'gemini-2.5-flash',
  'gemini-embedding-001': 'gemini-embedding-001',
  'gemini-2.0-flash-exp': 'gemini-2.0-flash-exp',
};

export const CLAUDE_MODELS = {
  'claude-3-5-sonnet': 'claude-3-5-sonnet-20241022',
  'claude-3-5-haiku': 'claude-3-5-haiku-20241022',
  'claude-4-opus': 'claude-4-opus-20250514',
  'claude-4-sonnet': 'claude-4-sonnet-20250514',
};

export const ALL_MODELS = {
  ...GEMINI_MODELS,
  ...CLAUDE_MODELS,
};

export function isClaudeModel(model: string): boolean {
  return model.startsWith('claude-');
}

export function getProviderForModel(model: string): 'gemini' | 'claude' {
  return isClaudeModel(model) ? 'claude' : 'gemini';
}
