import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai'; // Ensure the correct OpenAI SDK version is installed

// Initialize OpenAI with the correct API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', // Ensure the environment variable is set
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract the prompt from the request body
  const { prompt }: { prompt?: string } = req.body;

  // Validate the prompt
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Make the API call to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Ensure the model is correct and available
      messages: [
        { role: 'system', content: 'You are a helpful assistant. Answer questions about Atishay Jain professionally.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7, // Adjust for desired response variability
    });
    // Extract and return the AI's response
    const aiResponse = response.choices[0].message?.content?.trim();
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error('Error fetching ChatGPT response:', error);
    res.status(500).json({ error: 'Failed to fetch response from ChatGPT' });
  }
}
