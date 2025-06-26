// SessionManager.ts

import { Config, ConfigParameters, GeminiChat, ApprovalMode, createContentGenerator, ContentGeneratorConfig, AuthType } from '@google/gemini-cli-core';
import { v4 as uuidv4 } from 'uuid';
import process from 'node:process';
import { gemini } from './proto/gemini.v1';

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

  constructor(config: Config) {
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

  public async handlePrompt(prompt: string, stream: any): Promise<void> {
    if (!this.geminiChat) {
      console.error('GeminiChat not initialized.');
      stream.write(new gemini.v1.ServerResponse({ error: new gemini.v1.ErrorResponse({ message: 'GeminiChat not initialized.' }) }));
      return;
    }
    // TODO: Implement streaming and tool execution in Phase 3
    console.log(`Received prompt: ${prompt}`);
    stream.write({ textResponse: { content: `Echo: ${prompt}` } });
  }
}
