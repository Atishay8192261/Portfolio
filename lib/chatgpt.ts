import { NextApiRequest, NextApiResponse } from 'next';
import Configuration from 'openai';
import OpenAI from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt }: { prompt?: string } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: "You are a helpful assistant. Answer questions about Atishay Jain professionally." },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const aiResponse = response.data.choices[0].message?.content.trim();
    res.status(200).json({ response: aiResponse });
  } catch (error: unknown) {
    console.error('Error fetching ChatGPT response:', error);
    res.status(500).json({ error: 'Failed to fetch response from ChatGPT' });
  }
}
