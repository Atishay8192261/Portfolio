"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { SectionLabel } from "@/components/SectionLabel"

interface Exchange {
  q: string
  a: string
}

// Easter egg: a few shell-ish commands answered locally, terminal-style.
const COMMANDS: Record<string, string> = {
  whoami: "atishay — ssd firmware intern @ micron, coffee-driven. (try a real question above ☕)",
  ls: "nandsight  med-bot  top-drl-gpu-scheduler  sevridy  ai-product-review",
  "ls projects": "nandsight  med-bot  top-drl-gpu-scheduler  sevridy  ai-product-review",
  help: 'i know Atishay\'s work — try "what did he build at Veena?". for fun: whoami, ls, sudo, resume, clear.',
  pwd: "/atie.dev/you-are-here",
  resume: "→ overleaf.com/read/psjcgjsythmg  (also 'résumé ↗' up in the nav)",
  "cat resume": "→ overleaf.com/read/psjcgjsythmg  (also 'résumé ↗' up in the nav)",
  coffee: "brewing… ☕ status: always low. fuel for the firmware.",
}

function runCommand(raw: string): string | "CLEAR" | null {
  const cmd = raw.trim().toLowerCase()
  if (cmd === "clear") return "CLEAR"
  if (cmd.startsWith("sudo")) return "nice try — you don't have sudo here 😄"
  return COMMANDS[cmd] ?? null
}

export function AskAI() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [exchanges, setExchanges] = useState<Exchange[]>([])
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Keep the conversation pinned to the latest reply (scrolls inside the box,
  // so the page itself never grows).
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [exchanges, loading])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const q = input.trim()
    if (!q || loading) return

    // Intercept terminal-style easter-egg commands before hitting the agent.
    const cmd = runCommand(q)
    if (cmd === "CLEAR") {
      setInput("")
      setError(null)
      setExchanges([])
      return
    }
    if (cmd) {
      setInput("")
      setError(null)
      setExchanges((prev) => [...prev, { q, a: cmd }])
      return
    }

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

      {exchanges.length === 0 && !loading && !error && (
        <p className="mt-2 text-xs text-foreground/25">
          psst — i also speak a little shell. try{" "}
          <span className="font-mono text-foreground/40">whoami</span> or{" "}
          <span className="font-mono text-foreground/40">help</span>
        </p>
      )}

      {(exchanges.length > 0 || loading || error) && (
        <div
          ref={scrollRef}
          className="chat-scroll mt-4 max-h-72 space-y-4 overflow-y-auto pr-1 text-[15px] leading-relaxed"
        >
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
