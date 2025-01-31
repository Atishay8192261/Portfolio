"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface ChatGPTWidgetProps {
  isDark: boolean;
}

export function ChatGPTWidget({ isDark }: ChatGPTWidgetProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hello! Ask me anything about Atishay Jain." },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data.response || "I'm not sure, can you rephrase?",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className={`backdrop-blur-sm h-full transition-colors duration-300 rounded-3xl ${
        isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Image src="/chatgpt.png" alt="ChatGPT Logo" width={24} height={24} className="rounded-full" />
          <span className="font-medium">AI Assistant</span>
        </div>
        <div className="h-[200px] overflow-y-auto mb-4 space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-2xl ${
                message.role === "user"
                  ? "bg-primary/20 ml-auto max-w-[80%] rounded-tr-sm"
                  : "bg-muted max-w-[80%] rounded-tl-sm"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
          {loading && (
            <div className="p-2 bg-muted max-w-[80%] rounded-2xl rounded-tl-sm">
              <p className="text-sm">Thinking...</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-full px-4"
            disabled={loading}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full w-10 h-10 p-0"
            disabled={loading}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
