/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConfigurationManager } from './ConfigurationManager';
import { Config, ApprovalMode } from '@google/gemini-cli-core';
import { gemini } from '../proto/generated/gemini';

// Mock Config class
const mockConfig = {
  getModel: vi.fn().mockReturnValue('gemini-1.5-pro-latest'),
  setModel: vi.fn(),
  getApprovalMode: vi.fn().mockReturnValue(ApprovalMode.DEFAULT),
  getDebugMode: vi.fn().mockReturnValue(false),
  getToolRegistry: vi.fn().mockReturnValue({
    tools: new Map([
      ['ls', {}],
      ['read_file', {}],
      ['shell', {}],
    ]),
  }),
};

describe('ConfigurationManager', () => {
  let manager: ConfigurationManager;

  beforeEach(() => {
    vi.clearAllMocks();
    manager = new ConfigurationManager(mockConfig as any);
  });

  describe('getCurrentConfig', () => {
    it('should return current configuration snapshot', () => {
      const config = manager.getCurrentConfig();
      
      expect(config).toEqual({
        model: 'gemini-1.5-pro-latest',
        approvalMode: ApprovalMode.DEFAULT,
        theme: 'default',
        editorType: 'vim',
        showToolDescriptions: true,
        showErrorDetails: false,
        enabledTools: ['ls', 'read_file', 'shell'],
        mcpServers: [],
      });
    });
  });

  describe('updateModel', () => {
    it('should update model successfully', async () => {
      const changeHandler = vi.fn();
      manager.on('configChanged', changeHandler);
      
      const change = await manager.updateModel('gemini-1.5-flash-latest');
      
      expect(mockConfig.setModel).toHaveBeenCalledWith('gemini-1.5-flash-latest');
      expect(change).toEqual({
        field: 'model',
        oldValue: 'gemini-1.5-pro-latest',
        newValue: 'gemini-1.5-flash-latest',
      });
      expect(changeHandler).toHaveBeenCalledWith(change);
    });

    it('should reject invalid model', async () => {
      await expect(manager.updateModel('invalid-model')).rejects.toThrow('Invalid model: invalid-model');
      expect(mockConfig.setModel).not.toHaveBeenCalled();
    });
  });

  describe('updateTheme', () => {
    it('should update theme successfully', () => {
      const changeHandler = vi.fn();
      manager.on('configChanged', changeHandler);
      
      const change = manager.updateTheme('dracula');
      
      expect(change).toEqual({
        field: 'theme',
        oldValue: 'default',
        newValue: 'dracula',
      });
      expect(changeHandler).toHaveBeenCalledWith(change);
      
      // Verify theme was actually changed
      const config = manager.getCurrentConfig();
      expect(config.theme).toBe('dracula');
    });

    it('should reject invalid theme', () => {
      expect(() => manager.updateTheme('invalid-theme')).toThrow('Invalid theme: invalid-theme');
    });
  });

  describe('updateEditorType', () => {
    it('should update editor type successfully', () => {
      const changeHandler = vi.fn();
      manager.on('configChanged', changeHandler);
      
      const change = manager.updateEditorType('code');
      
      expect(change).toEqual({
        field: 'editorType',
        oldValue: 'vim',
        newValue: 'code',
      });
      expect(changeHandler).toHaveBeenCalledWith(change);
    });

    it('should reject invalid editor', () => {
      expect(() => manager.updateEditorType('invalid-editor')).toThrow('Invalid editor: invalid-editor');
    });
  });

  describe('updateShowToolDescriptions', () => {
    it('should toggle show tool descriptions', () => {
      const changeHandler = vi.fn();
      manager.on('configChanged', changeHandler);
      
      const change = manager.updateShowToolDescriptions(false);
      
      expect(change).toEqual({
        field: 'showToolDescriptions',
        oldValue: true,
        newValue: false,
      });
      expect(changeHandler).toHaveBeenCalledWith(change);
    });
  });

  describe('updateShowErrorDetails', () => {
    it('should toggle show error details', () => {
      const changeHandler = vi.fn();
      manager.on('configChanged', changeHandler);
      
      const change = manager.updateShowErrorDetails(true);
      
      expect(change).toEqual({
        field: 'showErrorDetails',
        oldValue: false,
        newValue: true,
      });
      expect(changeHandler).toHaveBeenCalledWith(change);
    });
  });

  describe('getAvailableOptions', () => {
    it('should return all available options', () => {
      const options = manager.getAvailableOptions();
      
      expect(options.models).toContain('gemini-1.5-pro-latest');
      expect(options.models).toContain('gemini-1.5-flash-latest');
      expect(options.themes).toContain('default');
      expect(options.themes).toContain('dracula');
      expect(options.editors).toContain('vim');
      expect(options.editors).toContain('code');
      expect(options.tools).toContain('ls');
      expect(options.tools).toContain('shell');
    });
  });

  describe('validateConfigUpdate', () => {
    it('should validate valid theme update', () => {
      const request = new gemini.ConfigUpdateRequest({
        theme: 'dracula',
      });
      
      const result = manager.validateConfigUpdate(request);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid theme', () => {
      const request = new gemini.ConfigUpdateRequest({
        theme: 'invalid-theme',
      });
      
      const result = manager.validateConfigUpdate(request);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid theme');
    });

    it('should validate valid editor update', () => {
      const request = new gemini.ConfigUpdateRequest({
        editor_type: 'code',
      });
      
      const result = manager.validateConfigUpdate(request);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid editor', () => {
      const request = new gemini.ConfigUpdateRequest({
        editor_type: 'invalid-editor',
      });
      
      const result = manager.validateConfigUpdate(request);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid editor');
    });

    it('should validate multiple update types', () => {
      // Test theme update
      let request = new gemini.ConfigUpdateRequest({
        theme: 'dracula',
      });
      let result = manager.validateConfigUpdate(request);
      expect(result.isValid).toBe(true);
      
      // Test editor update
      request = new gemini.ConfigUpdateRequest({
        editor_type: 'code',
      });
      result = manager.validateConfigUpdate(request);
      expect(result.isValid).toBe(true);
      
      // Test boolean update
      request = new gemini.ConfigUpdateRequest({
        show_tool_descriptions: false,
      });
      result = manager.validateConfigUpdate(request);
      expect(result.isValid).toBe(true);
    });
  });

  describe('applyConfigUpdate', () => {
    it('should apply single config update', async () => {
      const mockStream = {
        write: vi.fn(),
      };
      
      const request = new gemini.ConfigUpdateRequest({
        theme: 'dracula',
      });
      
      const changes = await manager.applyConfigUpdate(request, mockStream as any);
      
      expect(changes).toHaveLength(1);
      expect(changes[0]).toEqual({
        field: 'theme',
        oldValue: 'default',
        newValue: 'dracula',
      });
      expect(mockStream.write).toHaveBeenCalledOnce();
    });

    it('should apply multiple config updates sequentially', async () => {
      const mockStream = {
        write: vi.fn(),
      };
      
      // Apply updates one by one (since oneof only allows one field at a time)
      let request = new gemini.ConfigUpdateRequest({
        theme: 'dracula',
      });
      await manager.applyConfigUpdate(request, mockStream as any);
      
      request = new gemini.ConfigUpdateRequest({
        editor_type: 'code',
      });
      await manager.applyConfigUpdate(request, mockStream as any);
      
      request = new gemini.ConfigUpdateRequest({
        show_tool_descriptions: false,
      });
      await manager.applyConfigUpdate(request, mockStream as any);
      
      request = new gemini.ConfigUpdateRequest({
        show_error_details: true,
      });
      await manager.applyConfigUpdate(request, mockStream as any);
      
      expect(mockStream.write).toHaveBeenCalledTimes(4);
      
      // Verify all changes were applied
      const config = manager.getCurrentConfig();
      expect(config.theme).toBe('dracula');
      expect(config.editorType).toBe('code');
      expect(config.showToolDescriptions).toBe(false);
      expect(config.showErrorDetails).toBe(true);
    });

    it('should handle approval mode update', async () => {
      const request = new gemini.ConfigUpdateRequest({
        approval_mode: gemini.ApprovalMode.YOLO,
      });
      
      const changes = await manager.applyConfigUpdate(request);
      
      expect(changes).toHaveLength(1);
      expect(changes[0].field).toBe('approvalMode');
      expect(changes[0].newValue).toBe(ApprovalMode.YOLO);
    });
  });

  describe('exportConfig', () => {
    it('should export current configuration', () => {
      // Apply some changes first
      manager.updateTheme('dracula');
      manager.updateEditorType('code');
      
      const exported = manager.exportConfig();
      
      expect(exported).toEqual({
        model: 'gemini-1.5-pro-latest',
        approvalMode: ApprovalMode.DEFAULT,
        theme: 'dracula',
        editorType: 'code',
        showToolDescriptions: true,
        showErrorDetails: false,
        enabledTools: ['ls', 'read_file', 'shell'],
      });
    });
  });

  describe('importConfig', () => {
    it('should import valid configuration', () => {
      const data = {
        model: 'gemini-1.5-flash-latest',
        theme: 'dracula',
        editorType: 'code',
        showToolDescriptions: false,
        showErrorDetails: true,
      };
      
      manager.importConfig(data);
      
      // Model update is async, so check others
      const config = manager.getCurrentConfig();
      expect(config.theme).toBe('dracula');
      expect(config.editorType).toBe('code');
      expect(config.showToolDescriptions).toBe(false);
      expect(config.showErrorDetails).toBe(true);
    });

    it('should skip invalid values during import', () => {
      const data = {
        theme: 'invalid-theme',
        editorType: 'invalid-editor',
        showToolDescriptions: false,
      };
      
      manager.importConfig(data);
      
      // Invalid values should be skipped
      const config = manager.getCurrentConfig();
      expect(config.theme).toBe('default'); // Unchanged
      expect(config.editorType).toBe('vim'); // Unchanged
      expect(config.showToolDescriptions).toBe(false); // Changed
    });
  });

  describe('updateApprovalMode', () => {
    it('should update approval mode', () => {
      const changeHandler = vi.fn();
      manager.on('configChanged', changeHandler);
      
      const change = manager.updateApprovalMode(gemini.ApprovalMode.YOLO);
      
      expect(change).toEqual({
        field: 'approvalMode',
        oldValue: ApprovalMode.DEFAULT,
        newValue: ApprovalMode.YOLO,
      });
      expect(changeHandler).toHaveBeenCalledWith(change);
    });

    it('should map approval modes correctly', () => {
      manager.updateApprovalMode(gemini.ApprovalMode.AUTO_EDIT);
      let change = manager['mapApprovalMode'](gemini.ApprovalMode.AUTO_EDIT);
      expect(change).toBe(ApprovalMode.AUTO_EDIT);
      
      change = manager['mapApprovalMode'](gemini.ApprovalMode.YOLO);
      expect(change).toBe(ApprovalMode.YOLO);
      
      change = manager['mapApprovalMode'](gemini.ApprovalMode.DEFAULT);
      expect(change).toBe(ApprovalMode.DEFAULT);
      
      change = manager['mapApprovalMode'](gemini.ApprovalMode.APPROVAL_MODE_UNSPECIFIED);
      expect(change).toBe(ApprovalMode.DEFAULT);
    });
  });
});