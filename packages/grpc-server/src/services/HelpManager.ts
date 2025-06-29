/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { gemini } from '../proto/generated/gemini';
import { MessageBuilders } from '../utils/MessageBuilders';
import * as grpc from '@grpc/grpc-js';

interface HelpTopic {
  name: string;
  title: string;
  content: string;
  commands?: gemini.Command[];
  examples?: string[];
  seeAlso?: string[];
}

interface CommandHelp {
  name: string;
  description: string;
  usage: string;
  options?: Array<{
    name: string;
    description: string;
    required: boolean;
  }>;
  examples?: string[];
}

/**
 * Manages help content and contextual assistance
 */
export class HelpManager {
  private topics: Map<string, HelpTopic> = new Map();
  private commands: Map<string, CommandHelp> = new Map();

  constructor() {
    this.initializeHelpContent();
    this.initializeCommands();
  }

  /**
   * Initialize help topics
   */
  private initializeHelpContent() {
    // Getting Started
    this.topics.set('getting-started', {
      name: 'getting-started',
      title: 'Getting Started with Gemini gRPC',
      content: `Welcome to Gemini gRPC Server!

This server provides AI-powered assistance through a gRPC interface. You can:
- Chat with AI models
- Execute tools with confirmations
- Configure settings on the fly
- Get real-time progress updates

Start by sending a chat message or use /help to see available commands.`,
      commands: [
        new gemini.Command({ name: "/help", description: "Show this help message" }),
        new gemini.Command({ name: "/model", description: "Switch AI models" }),
        new gemini.Command({ name: "/config", description: "View configuration" }),
      ],
      examples: [
        'Send a message: "Hello, can you help me write a Python script?"',
        'Execute a command: "!ls -la"',
        'Change model: "/model gemini-1.5-flash-latest"',
      ],
    });

    // Tools
    this.topics.set('tools', {
      name: 'tools',
      title: 'Working with Tools',
      content: `Tools extend Gemini's capabilities to interact with your system.

Available tool categories:
- File System: ls, read_file, write_file, edit
- Shell: Execute shell commands
- Search: grep, glob, web_search
- Development: Code analysis and generation

Tool execution requires confirmation based on your approval mode.`,
      commands: [
        new gemini.Command({ name: "/tools", description: "List all available tools" }),
        new gemini.Command({ name: "/approval", description: "Change approval mode" }),
      ],
      examples: [
        'List files: The AI will use the ls tool',
        'Edit a file: The AI will use the edit tool',
        'Run command: !npm install',
      ],
      seeAlso: ['approval-modes', 'tool-confirmations'],
    });

    // Approval Modes
    this.topics.set('approval-modes', {
      name: 'approval-modes',
      title: 'Understanding Approval Modes',
      content: `Approval modes control how tool executions are confirmed:

**DEFAULT**: Ask for confirmation on most tools
- Safe for general use
- Confirms destructive operations

**AUTO_EDIT**: Auto-approve file edits
- Speeds up coding tasks
- Still confirms shell commands

**YOLO**: Auto-approve everything
- Maximum speed
- Use with caution!`,
      commands: [
        new gemini.Command({ name: "/approval", description: "Change approval mode" }),
        new gemini.Command({ name: "/approval default", description: "Switch to DEFAULT mode" }),
        new gemini.Command({ name: "/approval auto_edit", description: "Switch to AUTO_EDIT mode" }),
        new gemini.Command({ name: "/approval yolo", description: "Switch to YOLO mode" }),
      ],
    });

    // Configuration
    this.topics.set('configuration', {
      name: 'configuration',
      title: 'Configuration Options',
      content: `Customize your Gemini experience:

**Models**: Choose from various Gemini models
**Themes**: Change the output theme
**Editor**: Set your preferred text editor
**Display**: Toggle tool descriptions and error details

Configuration changes take effect immediately.`,
      commands: [
        new gemini.Command({ name: "/config", description: "Show current configuration" }),
        new gemini.Command({ name: "/model", description: "Change AI model" }),
        new gemini.Command({ name: "/theme", description: "Change color theme" }),
        new gemini.Command({ name: "/editor", description: "Set text editor" }),
      ],
      examples: [
        '/model gemini-1.5-pro-latest',
        '/theme dracula',
        '/editor code',
      ],
    });

    // Shell Commands
    this.topics.set('shell-commands', {
      name: 'shell-commands',
      title: 'Using Shell Commands',
      content: `Execute shell commands directly by prefixing with !

**Safety**: Commands require confirmation unless in YOLO mode
**Output**: Real-time streaming of stdout/stderr
**Context**: Commands run in your current directory

Be cautious with destructive commands!`,
      examples: [
        '!ls -la',
        '!git status',
        '!npm test',
        '!echo "Hello, World!"',
      ],
      seeAlso: ['approval-modes', 'tools'],
    });

    // Slash Commands
    this.topics.set('slash-commands', {
      name: 'slash-commands',
      title: 'Slash Commands Reference',
      content: `Slash commands provide quick access to features:

**/help [topic]** - Show help
**/model [name]** - Switch models
**/theme [name]** - Change theme
**/editor [name]** - Set editor
**/config** - Show configuration
**/stats** - Session statistics
**/approval [mode]** - Set approval mode
**/tools** - List available tools
**/clear** - Clear conversation
**/retry** - Retry last operation`,
      examples: [
        '/help tools',
        '/model gemini-1.5-flash-latest',
        '/approval yolo',
        '/stats',
      ],
    });

    // Troubleshooting
    this.topics.set('troubleshooting', {
      name: 'troubleshooting',
      title: 'Troubleshooting Common Issues',
      content: `Common issues and solutions:

**Authentication Errors**:
- Check GEMINI_API_KEY environment variable
- Verify API key is valid

**Network Errors**:
- Check internet connection
- Verify server is running on correct port

**Tool Failures**:
- Check file permissions
- Verify paths are correct
- Review error messages

**Rate Limiting**:
- Wait a few minutes
- Reduce request frequency`,
      commands: [
        new gemini.Command({ name: "/retry", description: "Retry failed operation" }),
        new gemini.Command({ name: "/clear", description: "Clear error state" }),
      ],
      seeAlso: ['getting-started', 'configuration'],
    });

    // MCP Servers
    this.topics.set('mcp-servers', {
      name: 'mcp-servers',
      title: 'MCP Server Integration',
      content: `Model Context Protocol (MCP) servers extend functionality:

**What are MCP servers?**
External processes that provide additional tools and capabilities

**Configuration**:
MCP servers are configured at session start

**Available Tools**:
Use /tools to see all tools including MCP-provided ones`,
      seeAlso: ['tools', 'configuration'],
    });
  }

  /**
   * Initialize command help
   */
  private initializeCommands() {
    this.commands.set('/help', {
      name: '/help',
      description: 'Show help information',
      usage: '/help [topic]',
      options: [
        {
          name: 'topic',
          description: 'Optional help topic',
          required: false,
        },
      ],
      examples: [
        '/help',
        '/help tools',
        '/help getting-started',
      ],
    });

    this.commands.set('/model', {
      name: '/model',
      description: 'Switch between AI models',
      usage: '/model [model-name]',
      options: [
        {
          name: 'model-name',
          description: 'Name of the model to switch to',
          required: false,
        },
      ],
      examples: [
        '/model',
        '/model gemini-1.5-pro-latest',
        '/model gemini-1.5-flash-latest',
      ],
    });

    this.commands.set('/theme', {
      name: '/theme',
      description: 'Change the output color theme',
      usage: '/theme [theme-name]',
      options: [
        {
          name: 'theme-name',
          description: 'Name of the theme',
          required: false,
        },
      ],
      examples: [
        '/theme',
        '/theme dracula',
        '/theme github-light',
      ],
    });

    this.commands.set('/approval', {
      name: '/approval',
      description: 'Change tool approval mode',
      usage: '/approval [mode]',
      options: [
        {
          name: 'mode',
          description: 'Approval mode: default, auto_edit, or yolo',
          required: false,
        },
      ],
      examples: [
        '/approval',
        '/approval default',
        '/approval auto_edit',
        '/approval yolo',
      ],
    });

    this.commands.set('/config', {
      name: '/config',
      description: 'Show current configuration',
      usage: '/config',
      examples: ['/config'],
    });

    this.commands.set('/stats', {
      name: '/stats',
      description: 'Show session statistics',
      usage: '/stats',
      examples: ['/stats'],
    });

    this.commands.set('/tools', {
      name: '/tools',
      description: 'List available tools',
      usage: '/tools',
      examples: ['/tools'],
    });

    this.commands.set('/editor', {
      name: '/editor',
      description: 'Set preferred text editor',
      usage: '/editor [editor-name]',
      options: [
        {
          name: 'editor-name',
          description: 'Editor: vim, emacs, nano, code, etc.',
          required: false,
        },
      ],
      examples: [
        '/editor',
        '/editor vim',
        '/editor code',
      ],
    });

    this.commands.set('/clear', {
      name: '/clear',
      description: 'Clear conversation or error history',
      usage: '/clear',
      examples: ['/clear'],
    });

    this.commands.set('/retry', {
      name: '/retry',
      description: 'Retry the last failed operation',
      usage: '/retry',
      examples: ['/retry'],
    });
  }

  /**
   * Get help for a specific topic or general help
   */
  getHelp(topic?: string): gemini.ServerResponse {
    if (!topic) {
      return this.getGeneralHelp();
    }

    // Check if it's a command
    if (topic.startsWith('/')) {
      const commandHelp = this.commands.get(topic);
      if (commandHelp) {
        return this.getCommandHelp(commandHelp);
      }
    }

    // Check if it's a topic
    const helpTopic = this.topics.get(topic);
    if (helpTopic) {
      return this.getTopicHelp(helpTopic);
    }

    // Topic not found
    return MessageBuilders.helpContent(
      `Help topic "${topic}" not found.\n\nAvailable topics:\n${this.getAvailableTopics()}`,
      this.getHelpCommands()
    );
  }

  /**
   * Get general help
   */
  private getGeneralHelp(): gemini.ServerResponse {
    const content = `# Gemini gRPC Help

Welcome to the Gemini gRPC server! Here's how to get started:

## Quick Start
- Send messages to chat with Gemini
- Use ! prefix for shell commands (e.g., !ls)
- Use / prefix for slash commands (e.g., /help)

## Available Topics
${this.getAvailableTopics()}

## Common Commands
${this.getCommonCommands()}

Use /help [topic] for detailed information on any topic.`;

    return MessageBuilders.helpContent(content, this.getHelpCommands());
  }

  /**
   * Get help for a specific topic
   */
  private getTopicHelp(topic: HelpTopic): gemini.ServerResponse {
    let content = `# ${topic.title}\n\n${topic.content}`;

    if (topic.examples && topic.examples.length > 0) {
      content += '\n\n## Examples\n';
      topic.examples.forEach(example => {
        content += `- ${example}\n`;
      });
    }

    if (topic.seeAlso && topic.seeAlso.length > 0) {
      content += '\n\n## See Also\n';
      topic.seeAlso.forEach(related => {
        const relatedTopic = this.topics.get(related);
        if (relatedTopic) {
          content += `- /help ${related} - ${relatedTopic.title}\n`;
        }
      });
    }

    return MessageBuilders.helpContent(
      content,
      topic.commands || this.getHelpCommands()
    );
  }

  /**
   * Get help for a specific command
   */
  private getCommandHelp(command: CommandHelp): gemini.ServerResponse {
    let content = `# Command: ${command.name}\n\n${command.description}\n\n`;
    content += `**Usage:** \`${command.usage}\`\n`;

    if (command.options && command.options.length > 0) {
      content += '\n## Options\n';
      command.options.forEach(option => {
        const required = option.required ? ' (required)' : ' (optional)';
        content += `- **${option.name}**${required}: ${option.description}\n`;
      });
    }

    if (command.examples && command.examples.length > 0) {
      content += '\n## Examples\n```\n';
      content += command.examples.join('\n');
      content += '\n```';
    }

    return MessageBuilders.helpContent(content, [
      new gemini.Command({ name: command.name, description: command.description }),
    ]);
  }

  /**
   * Get available topics formatted
   */
  private getAvailableTopics(): string {
    const topics: string[] = [];
    this.topics.forEach((topic, key) => {
      topics.push(`- **${key}**: ${topic.title}`);
    });
    return topics.join('\n');
  }

  /**
   * Get common commands formatted
   */
  private getCommonCommands(): string {
    const commonCommands = ['/help', '/model', '/config', '/tools', '/approval'];
    return commonCommands
      .map(cmd => {
        const command = this.commands.get(cmd);
        return command ? `- **${cmd}**: ${command.description}` : '';
      })
      .filter(Boolean)
      .join('\n');
  }

  /**
   * Get help commands for the response
   */
  private getHelpCommands(): gemini.Command[] {
    return [
      new gemini.Command({ name: "/help", description: "Show help" }),
      new gemini.Command({ name: "/help getting-started", description: "Getting started guide" }),
      new gemini.Command({ name: "/help tools", description: "Learn about tools" }),
      new gemini.Command({ name: "/help slash-commands", description: "All slash commands" }),
    ];
  }

  /**
   * Get contextual help based on error or situation
   */
  getContextualHelp(context: string): gemini.ServerResponse | null {
    // Map contexts to relevant help topics
    const contextMap: Record<string, string> = {
      'authentication': 'troubleshooting',
      'network': 'troubleshooting',
      'tool-not-found': 'tools',
      'invalid-model': 'configuration',
      'permission-denied': 'troubleshooting',
      'approval-required': 'approval-modes',
      'mcp-error': 'mcp-servers',
    };

    const topic = contextMap[context];
    if (topic) {
      return this.getHelp(topic);
    }

    return null;
  }

  /**
   * Search help content
   */
  searchHelp(query: string): gemini.ServerResponse {
    const lowerQuery = query.toLowerCase();
    const results: Array<{ topic: string; title: string; relevance: number }> = [];

    // Search topics
    this.topics.forEach((topic, key) => {
      let relevance = 0;
      if (topic.title.toLowerCase().includes(lowerQuery)) relevance += 3;
      if (topic.content.toLowerCase().includes(lowerQuery)) relevance += 1;
      if (topic.examples?.some(ex => ex.toLowerCase().includes(lowerQuery))) relevance += 2;
      
      if (relevance > 0) {
        results.push({ topic: key, title: topic.title, relevance });
      }
    });

    // Search commands
    this.commands.forEach((command, key) => {
      let relevance = 0;
      if (command.name.toLowerCase().includes(lowerQuery)) relevance += 3;
      if (command.description.toLowerCase().includes(lowerQuery)) relevance += 2;
      
      if (relevance > 0) {
        results.push({ topic: key, title: `Command: ${command.name}`, relevance });
      }
    });

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);

    if (results.length === 0) {
      return MessageBuilders.helpContent(
        `No help found for "${query}".\n\nTry /help to see all topics.`,
        this.getHelpCommands()
      );
    }

    let content = `# Search Results for "${query}"\n\n`;
    results.slice(0, 10).forEach(result => {
      content += `- **/help ${result.topic}** - ${result.title}\n`;
    });

    return MessageBuilders.helpContent(content);
  }
}