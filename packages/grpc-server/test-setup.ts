import { vi } from 'vitest';
import { Readable } from 'stream';

vi.mock('@google/genai', async () => {
  const original = await vi.importActual('@google/genai');
  return {
    ...original,
    GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
      getGenerativeModel: vi.fn().mockReturnValue({
        generateContentStream: vi.fn().mockImplementation(async function* () {
          yield { text: 'mocked stream chunk' };
        }),
      }),
    })),
  };
});

