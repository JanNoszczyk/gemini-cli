import { vi } from 'vitest';

const mockChatSession = {
  sendMessage: vi.fn().mockResolvedValue({
    response: {
      text: () => 'Mocked response',
      candidates: [{ content: { parts: [{ text: 'Mocked response' }] } }],
    },
  }),
  sendMessageStream: vi.fn().mockImplementation(async function*() {
    yield { 
      response: { 
        text: () => 'Mocked stream chunk',
        candidates: [{ content: { parts: [{ text: 'Mocked stream chunk' }] } }],
      },
      chat_content: { content: 'Mocked stream chunk' },
    };
  }),
};

const mockGenerativeModel = {
  startChat: vi.fn(() => mockChatSession),
  generateContent: vi.fn(),
};

class MockGoogleGenerativeAI {
  constructor() {
    this.getGenerativeModel = vi.fn(() => mockGenerativeModel);
  }
  getGenerativeModel: ReturnType<typeof vi.fn>;
}

vi.mock('@google/genai', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    GoogleGenerativeAI: MockGoogleGenerativeAI,
    HarmCategory: {
      HARM_CATEGORY_UNSPECIFIED: 'HARM_CATEGORY_UNSPECIFIED',
      HARM_CATEGORY_HARASSMENT: 'HARM_CATEGORY_HARASSMENT',
      HARM_CATEGORY_HATE_SPEECH: 'HARM_CATEGORY_HATE_SPEECH',
      HARM_CATEGORY_SEXUALLY_EXPLICIT: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      HARM_CATEGORY_DANGEROUS_CONTENT: 'HARM_CATEGORY_DANGEROUS_CONTENT',
    },
    HarmBlockThreshold: {
      BLOCK_NONE: 'BLOCK_NONE',
    },
    Type: {
      GENERATE_CONTENT: 'GENERATE_CONTENT',
    },
  };
});