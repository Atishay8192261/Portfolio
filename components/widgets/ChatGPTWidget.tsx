'use client'

import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ChatGPTWidgetProps {
  isDark: boolean
}

export function ChatGPTWidget({ isDark }: ChatGPTWidgetProps) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, `You: ${input}`])
      // Here you would typically call an API to get a response from ChatGPT
      setMessages(prev => [...prev, "ChatGPT: Thanks for your message! I'm a placeholder response."])
      setInput('')
    }
  }

  return (
    <Card className={`backdrop-blur-sm h-full transition-colors duration-300 rounded-3xl ${
      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-primary" />
          <span className="font-medium">ChatGPT</span>
        </div>
        <div className="h-40 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <p key={index} className="mb-2">{message}</p>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  )
}