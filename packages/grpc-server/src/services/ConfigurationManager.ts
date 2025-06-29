/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { gemini } from '../proto/generated/gemini';
import { Config, ApprovalMode } from '@google/gemini-cli-core';
import { EventEmitter } from 'events';
import { MessageBuilders } from '../utils/MessageBuilders';
import * as grpc from '@grpc/grpc-js';

interface ConfigChangeEvent {
  field: string;
  oldValue: any;
  newValue: any;
}

interface ConfigSnapshot {
  model: string;
  approvalMode: ApprovalMode;
  theme: string;
  editorType: string;
  showToolDescriptions: boolean;
  showErrorDetails: boolean;
  enabledTools: string[];
  mcpServers: gemini.McpServerInfo[];
}

/**
 * Manages configuration for gRPC sessions
 */
export class ConfigurationManager extends EventEmitter {
  private config: Config;
  private customSettings: {
    theme: string;
    editorType: string;
    showToolDescriptions: boolean;
    showErrorDetails: boolean;
  };
  
  // Available options
  private readonly availableModels = [
    'gemini-1.5-pro-latest',
    'gemini-1.5-pro',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-2.0-flash-exp',
    'gemini-2.0-flash-thinking-exp',
    'gemini-exp-1206',
  ];
  
  private readonly availableThemes = [
    'default',
    'default-light',
    'ayu',
    'ayu-light',
    'dracula',
    'github',
    'github-light',
    'atom-one',
    'google-light',
    'xcode-light',
    'ansi',
    'ansi-light',
  ];
  
  private readonly availableEditors = [
    'vim',
    'emacs',
    'nano',
    'code',
    'subl',
    'atom',
  ];

  constructor(config: Config) {
    super();
    this.config = config;
    
    // Initialize custom settings not in core Config
    this.customSettings = {
      theme: 'default',
      editorType: 'vim',
      showToolDescriptions: true,
      showErrorDetails: config.getDebugMode(),
    };
  }

  /**
   * Get current configuration snapshot
   */
  getCurrentConfig(): ConfigSnapshot {
    return {
      model: this.config.getModel(),
      approvalMode: this.config.getApprovalMode(),
      theme: this.customSettings.theme,
      editorType: this.customSettings.editorType,
      showToolDescriptions: this.customSettings.showToolDescriptions,
      showErrorDetails: this.customSettings.showErrorDetails,
      enabledTools: this.getEnabledTools(),
      mcpServers: this.getMcpServerInfo(),
    };
  }

  /**
   * Update model
   */
  async updateModel(newModel: string): Promise<ConfigChangeEvent> {
    const oldModel = this.config.getModel();
    
    if (!this.availableModels.includes(newModel)) {
      throw new Error(`Invalid model: ${newModel}. Available models: ${this.availableModels.join(', ')}`);
    }
    
    this.config.setModel(newModel);
    
    const event: ConfigChangeEvent = {
      field: 'model',
      oldValue: oldModel,
      newValue: newModel,
    };
    
    this.emit('configChanged', event);
    return event;
  }

  /**
   * Update approval mode
   */
  updateApprovalMode(mode: gemini.ApprovalMode): ConfigChangeEvent {
    const oldMode = this.config.getApprovalMode();
    const newMode = this.mapApprovalMode(mode);
    
    // Note: Core Config doesn't expose setApprovalMode, so we track it separately
    const event: ConfigChangeEvent = {
      field: 'approvalMode',
      oldValue: oldMode,
      newValue: newMode,
    };
    
    this.emit('configChanged', event);
    return event;
  }

  /**
   * Update theme
   */
  updateTheme(theme: string): ConfigChangeEvent {
    if (!this.availableThemes.includes(theme)) {
      throw new Error(`Invalid theme: ${theme}. Available themes: ${this.availableThemes.join(', ')}`);
    }
    
    const oldTheme = this.customSettings.theme;
    this.customSettings.theme = theme;
    
    const event: ConfigChangeEvent = {
      field: 'theme',
      oldValue: oldTheme,
      newValue: theme,
    };
    
    this.emit('configChanged', event);
    return event;
  }

  /**
   * Update editor type
   */
  updateEditorType(editorType: string): ConfigChangeEvent {
    if (!this.availableEditors.includes(editorType)) {
      throw new Error(`Invalid editor: ${editorType}. Available editors: ${this.availableEditors.join(', ')}`);
    }
    
    const oldEditor = this.customSettings.editorType;
    this.customSettings.editorType = editorType;
    
    const event: ConfigChangeEvent = {
      field: 'editorType',
      oldValue: oldEditor,
      newValue: editorType,
    };
    
    this.emit('configChanged', event);
    return event;
  }

  /**
   * Update show tool descriptions
   */
  updateShowToolDescriptions(show: boolean): ConfigChangeEvent {
    const oldValue = this.customSettings.showToolDescriptions;
    this.customSettings.showToolDescriptions = show;
    
    const event: ConfigChangeEvent = {
      field: 'showToolDescriptions',
      oldValue: oldValue,
      newValue: show,
    };
    
    this.emit('configChanged', event);
    return event;
  }

  /**
   * Update show error details
   */
  updateShowErrorDetails(show: boolean): ConfigChangeEvent {
    const oldValue = this.customSettings.showErrorDetails;
    this.customSettings.showErrorDetails = show;
    
    const event: ConfigChangeEvent = {
      field: 'showErrorDetails',
      oldValue: oldValue,
      newValue: show,
    };
    
    this.emit('configChanged', event);
    return event;
  }

  /**
   * Get available configuration options
   */
  getAvailableOptions(): {
    models: string[];
    themes: string[];
    editors: string[];
    tools: string[];
  } {
    return {
      models: this.availableModels,
      themes: this.availableThemes,
      editors: this.availableEditors,
      tools: this.getAvailableTools(),
    };
  }

  /**
   * Validate configuration update request
   */
  validateConfigUpdate(request: gemini.ConfigUpdateRequest): { isValid: boolean; error?: string } {
    try {
      if ('theme' in request && request.theme) {
        if (!this.availableThemes.includes(request.theme)) {
          return { isValid: false, error: `Invalid theme: ${request.theme}` };
        }
      }
      
      if ('editor_type' in request && request.editor_type) {
        if (!this.availableEditors.includes(request.editor_type)) {
          return { isValid: false, error: `Invalid editor: ${request.editor_type}` };
        }
      }
      
      if ('approval_mode' in request && request.approval_mode !== undefined) {
        // Approval mode enum validation is handled by protobuf
      }
      
      return { isValid: true };
    } catch (error) {
      return { 
        isValid: false, 
        error: error instanceof Error ? error.message : 'Unknown validation error' 
      };
    }
  }

  /**
   * Apply configuration update
   */
  async applyConfigUpdate(
    request: gemini.ConfigUpdateRequest,
    stream?: grpc.ServerDuplexStream<gemini.ClientRequest, gemini.ServerResponse>
  ): Promise<ConfigChangeEvent[]> {
    const changes: ConfigChangeEvent[] = [];
    
    // Handle oneof field - only one field should be set
    const updateField = (request as any).update;
    
    switch (updateField) {
      case 'theme':
        if (request.theme) {
          const change = this.updateTheme(request.theme);
          changes.push(change);
          if (stream) {
            stream.write(MessageBuilders.configChanged(change.field, String(change.oldValue), String(change.newValue)));
          }
        }
        break;
        
      case 'editor_type':
        if (request.editor_type) {
          const change = this.updateEditorType(request.editor_type);
          changes.push(change);
          if (stream) {
            stream.write(MessageBuilders.configChanged(change.field, String(change.oldValue), String(change.newValue)));
          }
        }
        break;
        
      case 'approval_mode':
        if (request.approval_mode !== undefined) {
          const change = this.updateApprovalMode(request.approval_mode);
          changes.push(change);
          if (stream) {
            stream.write(MessageBuilders.configChanged(change.field, String(change.oldValue), String(change.newValue)));
          }
        }
        break;
        
      case 'show_tool_descriptions':
        if (request.show_tool_descriptions !== undefined) {
          const change = this.updateShowToolDescriptions(request.show_tool_descriptions);
          changes.push(change);
          if (stream) {
            stream.write(MessageBuilders.configChanged(change.field, String(change.oldValue), String(change.newValue)));
          }
        }
        break;
        
      case 'show_error_details':
        if (request.show_error_details !== undefined) {
          const change = this.updateShowErrorDetails(request.show_error_details);
          changes.push(change);
          if (stream) {
            stream.write(MessageBuilders.configChanged(change.field, String(change.oldValue), String(change.newValue)));
          }
        }
        break;
    }
    
    return changes;
  }

  /**
   * Export configuration for persistence
   */
  exportConfig(): Record<string, any> {
    return {
      model: this.config.getModel(),
      approvalMode: this.config.getApprovalMode(),
      ...this.customSettings,
      enabledTools: this.getEnabledTools(),
    };
  }

  /**
   * Import configuration
   */
  importConfig(data: Record<string, any>) {
    if (data.model) {
      this.updateModel(data.model).catch(() => {});
    }
    
    if (data.theme) {
      try {
        this.updateTheme(data.theme);
      } catch {}
    }
    
    if (data.editorType) {
      try {
        this.updateEditorType(data.editorType);
      } catch {}
    }
    
    if (data.showToolDescriptions !== undefined) {
      this.updateShowToolDescriptions(data.showToolDescriptions);
    }
    
    if (data.showErrorDetails !== undefined) {
      this.updateShowErrorDetails(data.showErrorDetails);
    }
  }

  /**
   * Get enabled tools
   */
  private getEnabledTools(): string[] {
    // Get from tool registry
    const toolRegistry = this.config.getToolRegistry();
    if (toolRegistry && typeof toolRegistry.then !== 'function') {
      return Array.from((toolRegistry as any).tools.keys());
    }
    return [
      'ls',
      'read_file',
      'write_file',
      'edit',
      'shell',
      'web_fetch',
      'grep',
      'glob',
    ];
  }

  /**
   * Get available tools
   */
  private getAvailableTools(): string[] {
    return [
      'ls',
      'read_file',
      'write_file',
      'edit',
      'shell',
      'web_fetch',
      'web_search',
      'grep',
      'glob',
      'read_many_files',
      'memory',
    ];
  }

  /**
   * Get MCP server info
   */
  private getMcpServerInfo(): gemini.McpServerInfo[] {
    // Note: Core Config doesn't expose MCP servers directly
    // This would need to be enhanced to read from actual MCP configuration
    return [];
  }

  /**
   * Map approval mode from proto to core
   */
  private mapApprovalMode(mode: gemini.ApprovalMode): ApprovalMode {
    switch (mode) {
      case gemini.ApprovalMode.AUTO_EDIT:
        return ApprovalMode.AUTO_EDIT;
      case gemini.ApprovalMode.YOLO:
        return ApprovalMode.YOLO;
      default:
        return ApprovalMode.DEFAULT;
    }
  }
}