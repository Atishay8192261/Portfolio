"use client"

import { useState, type FormEvent } from "react"
import { SectionLabel } from "@/components/SectionLabel"

interface Exchange {
  q: string
  a: string
}

export function AskAI() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [exchanges, setExchanges] = useState<Exchange[]>([])
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const q = input.trim()
    if (!q || loading) return

    setInput("")
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/chatgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: q }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Something went wrong.")
      } else {
        setExchanges((prev) => [...prev, { q, a: data.response ?? "" }])
      }
    } catch {
      setError("Network error. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <SectionLabel>Ask</SectionLabel>

      <form onSubmit={submit} className="flex items-center gap-2 border-b border-white/12 pb-2">
        <span className="text-foreground/30">›</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          disabled={loading}
          placeholder="ask me anything about my work…"
          className="w-full bg-transparent text-[15px] text-foreground placeholder:text-foreground/35 focus:outline-none"
        />
      </form>

      {(exchanges.length > 0 || loading || error) && (
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed">
          {exchanges.map((ex, i) => (
            <div key={i} className="space-y-1">
              <p className="text-foreground/45">{ex.q}</p>
              <p className="text-foreground/80">{ex.a}</p>
            </div>
          ))}
          {loading && <p className="text-foreground/35">thinking…</p>}
          {error && <p className="text-[var(--violet)]">{error}</p>}
        </div>
      )}
    </section>
  )
}
