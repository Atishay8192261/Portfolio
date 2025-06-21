import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Security configuration
const SECURITY_CONFIG = {
  MAX_REQUESTS_PER_HOUR: 10, // Limit requests per IP per hour
  MAX_PROMPT_LENGTH: 500, // Maximum characters in prompt
  BLOCKED_KEYWORDS: [
    "hack",
    "exploit",
    "bypass",
    "jailbreak",
    "ignore instructions",
    "system prompt",
    "pretend",
    "roleplay",
  ],
  ALLOWED_TOPICS: [
    "atishay",
    "jain",
    "portfolio",
    "experience",
    "projects",
    "skills",
    "education",
    "sjsu",
    "software",
    "engineering",
    "internship",
    "research",
  ],
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const hourInMs = 60 * 60 * 1000
  const key = ip

  const existing = rateLimitStore.get(key)

  if (!existing || now > existing.resetTime) {
    // Reset or create new entry
    rateLimitStore.set(key, { count: 1, resetTime: now + hourInMs })
    return true
  }

  if (existing.count >= SECURITY_CONFIG.MAX_REQUESTS_PER_HOUR) {
    return false
  }

  existing.count++
  return true
}

// Content validation function
function validatePrompt(prompt: string): { isValid: boolean; reason?: string } {
  // Length check
  if (prompt.length > SECURITY_CONFIG.MAX_PROMPT_LENGTH) {
    return { isValid: false, reason: "Prompt too long" }
  }

  // Empty check
  if (!prompt.trim()) {
    return { isValid: false, reason: "Prompt cannot be empty" }
  }

  // Blocked keywords check
  const lowerPrompt = prompt.toLowerCase()
  for (const keyword of SECURITY_CONFIG.BLOCKED_KEYWORDS) {
    if (lowerPrompt.includes(keyword)) {
      return { isValid: false, reason: "Inappropriate content detected" }
    }
  }

  // Topic relevance check (optional - can be made less strict)
  const hasRelevantTopic = SECURITY_CONFIG.ALLOWED_TOPICS.some((topic) => lowerPrompt.includes(topic))

  if (!hasRelevantTopic) {
    // Allow general questions but add a warning in the system prompt
    return { isValid: true, reason: "off-topic" }
  }

  return { isValid: true }
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfIP = request.headers.get("cf-connecting-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfIP) {
    return cfIP
  }

  return "unknown"
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)

    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please try again later.",
          retryAfter: 3600, // 1 hour in seconds
        },
        { status: 429 },
      )
    }

    // Parse request body
    const body = await request.json()
    const { prompt } = body

    // Validate prompt
    const validation = validatePrompt(prompt)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: validation.reason || "Invalid prompt",
        },
        { status: 400 },
      )
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key not configured")
      return NextResponse.json(
        {
          error: "Service temporarily unavailable",
        },
        { status: 503 },
      )
    }

    // Prepare system prompt with additional security
    let systemPrompt = `You are an AI assistant trained to answer questions about Atishay Jain, a Computer Science student at SJSU and Software Engineering intern.

IMPORTANT RULES:
1. Only answer questions related to Atishay Jain's professional background, education, projects, and skills
2. If asked about unrelated topics, politely redirect to Atishay's portfolio information
3. Do not provide personal information beyond what's publicly available in his portfolio
4. Keep responses professional and concise
5. If you don't know something about Atishay, say so honestly

Key information about Atishay:
- Computer Science student at San Jose State University (SJSU)
- Software Engineering Intern at Veena Agencies
- Research Assistant working on Genomic Classification with ULMFiT
- Teaching Assistant for CS-46B (Advanced Java Programming)
- Experience with Java, Python, JavaScript, TypeScript, React, Next.js, Spring Boot
- Projects include AI Product Review System, SevRidy platform, Personal Finance Tracker, and Plutus`

    // Add warning for off-topic questions
    if (validation.reason === "off-topic") {
      systemPrompt += `\n\nNOTE: This question seems unrelated to Atishay Jain. Please redirect the conversation to his professional background.`
    }

    // Call OpenAI API with enhanced security
    const response = await openai.chat.completions.create({
      model: "ft:gpt-4o-mini-2024-07-18:portfolio:mychatbot:AvSIww4z",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 300, // Limit response length to control costs
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    })

    const assistantMessage = response.choices[0]?.message?.content

    if (!assistantMessage) {
      return NextResponse.json(
        {
          error: "No response generated",
        },
        { status: 500 },
      )
    }

    // Log usage for monitoring (optional)
    console.log(`ChatGPT API used by IP: ${clientIP}, tokens: ${response.usage?.total_tokens || 0}`)

    return NextResponse.json({
      response: assistantMessage,
      usage: {
        tokens: response.usage?.total_tokens || 0,
      },
    })
  } catch (error: unknown) {
    console.error("OpenAI API Error:", error)

    // Handle specific OpenAI errors
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as { status: number }
      
      if (apiError.status === 429) {
        return NextResponse.json(
          {
            error: "Service is busy. Please try again in a moment.",
          },
          { status: 429 },
        )
      }

      if (apiError.status === 401) {
        return NextResponse.json(
          {
            error: "Service configuration error",
          },
          { status: 503 },
        )
      }
    }

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      error: "Method not allowed. Use POST to send messages.",
    },
    { status: 405 },
  )
}
