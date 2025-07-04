import { Config, GeminiClient, ConfigParameters, sessionId } from '@google/gemini-cli-core';

describe('Gemini API Verification', () => {
  it('should verify GEMINI_API_KEY is working', async () => {
    // This test verifies that the Gemini API key from root .env works
    console.log('GEMINI_API_KEY present:', !!process.env.GEMINI_API_KEY);
    console.log('GEMINI_API_KEY starts with:', process.env.GEMINI_API_KEY?.substring(0, 10) + '...');
    
    expect(process.env.GEMINI_API_KEY).toBeDefined();
    expect(process.env.GEMINI_API_KEY).toMatch(/^AIza/); // Gemini API keys start with AIza
    
    // Create a basic config and test the client
    const configParams: ConfigParameters = {
      sessionId: 'test-session-' + Date.now(),
      targetDir: process.cwd(),
      cwd: process.cwd(),
      debugMode: false,
      model: 'gemini-2.0-flash-exp'
    };

    try {
      const config = new Config(configParams);
      const client = config.getGeminiClient();
      
      expect(client).toBeDefined();
      console.log('Gemini client created successfully');
      
      // Test a simple API call
      const chat = await client.getChat();
      expect(chat).toBeDefined();
      console.log('Gemini chat instance created successfully');
      
    } catch (error) {
      console.error('Error creating Gemini client:', error);
      throw error;
    }
  }, 15000); // 15 second timeout
});