import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this key is set in your environment
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Call OpenAI API with your fine-tuned model
    const response = await openai.chat.completions.create({
      model: "ft:gpt-4o-mini-2024-07-18:portfolio:mychatbot:AvSIww4z", // Use your fine-tuned model
      messages: [
        { role: "system", content: "You are an AI assistant trained to answer questions about Atishay Jain from SJSU." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    const assistantMessage = response.choices[0]?.message?.content;
    res.status(200).json({ response: assistantMessage });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
