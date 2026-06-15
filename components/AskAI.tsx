"use client"

import { useState, type FormEvent } from "react"

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
      if (!res.ok) setError(data.error || "Something went wrong.")
      else setExchanges((prev) => [...prev, { q, a: data.response ?? "" }])
    } catch {
      setError("Network error. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-neutral-50">Ask me anything.</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-neutral-400">
        A small AI that knows my work. Ask about my experience, projects, or stack.
      </p>

      <form
        onSubmit={submit}
        className="mt-5 flex items-center gap-2 border-b border-white/15 pb-2 focus-within:border-[#bd03f7]"
      >
        <span className="text-neutral-500">›</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          disabled={loading}
          placeholder="ask me anything about my work…"
          className="w-full bg-transparent text-[15px] text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
        />
      </form>

      {(exchanges.length > 0 || loading || error) && (
        <div className="mt-5 space-y-4 text-[15px] leading-relaxed">
          {exchanges.map((ex, i) => (
            <div key={i} className="space-y-1">
              <p className="text-neutral-500">{ex.q}</p>
              <p className="text-neutral-200">{ex.a}</p>
            </div>
          ))}
          {loading && <p className="text-neutral-500">thinking…</p>}
          {error && <p className="text-[#bd03f7]">{error}</p>}
        </div>
      )}
    </section>
  )
}
