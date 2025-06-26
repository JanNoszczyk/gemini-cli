// SessionManager.ts

import { Config, ConfigParameters, GeminiChat, ApprovalMode, createContentGenerator, ContentGeneratorConfig, AuthType, executeToolCall, ToolRegistry, ToolCallRequestInfo } from '@google/gemini-cli-core';
import { v4 as uuidv4 } from 'uuid';
import process from 'node:process';
import { gemini } from './proto/gemini.v1';
import * as grpc from '@grpc/grpc-js';

export class SessionManager {
  private sessions: Map<string, GeminiSession> = new Map();

  private mapApprovalMode(mode: gemini.v1.ApprovalMode): ApprovalMode {
    switch (mode) {
      case gemini.v1.ApprovalMode.AUTO_APPROVE:
        return ApprovalMode.YOLO;
      case gemini.v1.ApprovalMode.REJECT_DANGEROUS_TOOLS:
        return ApprovalMode.DEFAULT;
      case gemini.v1.ApprovalMode.APPROVAL_MODE_UNSPECIFIED:
      default:
        return ApprovalMode.DEFAULT;
    }
  }

  public createSession(startRequest: gemini.v1.StartRequest): { sessionId: string; session: GeminiSession } {
    const sessionId = startRequest.session_id || uuidv4();

    const configParams: ConfigParameters = {
      sessionId: sessionId,
      // Enforce production-safe defaults
      approvalMode: this.mapApprovalMode(gemini.v1.ApprovalMode.REJECT_DANGEROUS_TOOLS),
      sandbox: undefined, // Sandbox will be handled by the core library
      targetDir: '', // Will be a temporary directory, handled by GeminiChat
      debugMode: false,
      cwd: process.cwd(),
      model: startRequest.model || 'gemini-1.5-pro-latest', // Provide a default model
      // Override with client-provided values
      ...(startRequest.core_tools && { coreTools: startRequest.core_tools }),
      ...(startRequest.exclude_tools && { excludeTools: startRequest.exclude_tools }),
      // Advanced config from client
      ...(startRequest.advanced_config && { advancedConfig: (startRequest.advanced_config as any).toJavaScript() }),
    };

    // Client overrides approvalMode if explicitly set
    if (startRequest.approval_mode !== gemini.v1.ApprovalMode.APPROVAL_MODE_UNSPECIFIED) {
      configParams.approvalMode = this.mapApprovalMode(startRequest.approval_mode);
    }

    const config = new Config(configParams);
    const session = new GeminiSession(config);
    this.sessions.set(sessionId, session);
    return { sessionId, session };
  }

  public getSession(sessionId: string): GeminiSession | undefined {
    return this.sessions.get(sessionId);
  }
}

export class GeminiSession {
  private geminiChat: GeminiChat | undefined;
  private readonly config: Config;

  constructor(config: Config) {
    this.config = config;
    this.initializeGeminiChat(config);
  }

  private async initializeGeminiChat(config: Config) {
    // Initialize the config object, especially its auth method
    await config.refreshAuth(AuthType.USE_GEMINI);

    const contentGeneratorConfig: ContentGeneratorConfig = {
      model: config.getModel(),
      apiKey: process.env.GEMINI_API_KEY || '',
      authType: AuthType.USE_GEMINI,
    };

    const contentGenerator = await createContentGenerator(contentGeneratorConfig);
    this.geminiChat = new GeminiChat(config, contentGenerator);
  }

  public async handlePrompt(prompt: string, stream: grpc.ServerDuplexStream<gemini.v1.ClientRequest, gemini.v1.ServerResponse>): Promise<void> {
    if (!this.geminiChat) {
      console.error('GeminiChat not initialized.');
      stream.write(new gemini.v1.ServerResponse({ error: new gemini.v1.ErrorResponse({ message: 'GeminiChat not initialized.' }) }));
      return;
    }

    const sendMessageParams = { message: prompt };

    try {
      const streamResponse = await this.geminiChat.sendMessageStream(sendMessageParams);

      for await (const chunk of streamResponse) {
        if (chunk.candidates && chunk.candidates.length > 0) {
          const candidate = chunk.candidates[0];
          if (candidate.content && candidate.content.parts) {
            for (const part of candidate.content.parts) {
              if (part.text) {
                stream.write(new gemini.v1.ServerResponse({ text_response: new gemini.v1.TextResponse({ content: part.text }) }));
              } else if (part.functionCall) {
                stream.write(new gemini.v1.ServerResponse({ tool_started: new gemini.v1.ToolStartedResponse({ name: part.functionCall.name, args: part.functionCall.args as any }) }));
                const toolRegistry = await this.config.getToolRegistry();
                const toolCallRequest: ToolCallRequestInfo = {
                  name: part.functionCall.name ?? '',
                  args: part.functionCall.args as any,
                  callId: '1', // TODO: Generate unique callId
                  isClientInitiated: false,
                };
                const toolResult = await executeToolCall(this.config, toolCallRequest, toolRegistry);
                stream.write(new gemini.v1.ServerResponse({ tool_ended: new gemini.v1.ToolEndedResponse({ name: part.functionCall.name, result_summary: JSON.stringify(toolResult.resultDisplay ?? '') }) }));
              } else if (part.functionResponse) {
                // This case should ideally not be hit as the model should not return function responses directly
                stream.write(new gemini.v1.ServerResponse({ thought_response: new gemini.v1.ThoughtResponse({ thought: `Tool response: ${part.functionResponse.name}(${JSON.stringify(part.functionResponse.response)})` }) }));
              } else if ((part as any).thought) {
                stream.write(new gemini.v1.ServerResponse({ thought_response: new gemini.v1.ThoughtResponse({ thought: (part as any).thought }) }));
              }
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Error during chat stream:', error);
      stream.write(new gemini.v1.ServerResponse({ error: new gemini.v1.ErrorResponse({ message: error.message || 'Unknown error during chat stream.' }) }));
    }
  }
}
