// OpenAI integration - requires 'openai' package
// Install: npm install openai
// Get API key: https://platform.openai.com

let openai: any = null;

try {
  const OpenAI = require('openai');
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });
} catch (e) {
  console.warn('OpenAI package not installed. AI features disabled.');
}

export async function generateCompletion(
  prompt: string,
  systemPrompt: string = 'You are a helpful crypto market analyst.',
  options: { temperature?: number; maxTokens?: number; json?: boolean } = {}
) {
  if (!openai) return 'AI features are currently unavailable. Please configure OpenAI API key.';
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2000,
      response_format: options.json ? { type: 'json_object' } : undefined,
    });
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API error:', error);
    return 'Error generating AI response.';
  }
}

export async function generateImage(prompt: string): Promise<string> {
  return '';
}

export { openai };
