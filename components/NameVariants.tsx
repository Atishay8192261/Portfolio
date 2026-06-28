"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { grotesk, serif, inter } from "@/lib/fonts"

const W = "#fafafa"
const V = "#bd03f7" // Micron violet (page accent)
const I = "#6d5efc" // indigo neighbour — name only
const P = "#f5499c" // magenta neighbour — name only
const G = "#9ca3af"
const mono: React.CSSProperties = { fontFamily: "var(--font-geist-mono)" }

/* ── 'i' rebuilt as a bar + a violet "bit" dot. Click the dot to flip the bit. ── */
function IDot() {
  const [bit, setBit] = useState<0 | 1 | null>(null)
  return (
    <span
      role="button"
      aria-label="toggle bit"
      onClick={() => setBit((b) => (b === null ? 1 : b === 1 ? 0 : null))}
      className="relative inline-block cursor-pointer"
      style={{ width: "0.24em" }}
    >
      <span className="invisible">i</span>
      <span
        className="absolute bottom-0 left-1/2 block -translate-x-1/2 rounded-[1px]"
        style={{ width: "0.15em", height: "0.58em", background: W }}
      />
      {bit === null ? (
        <span
          className="absolute left-1/2 top-0 block -translate-x-1/2 rounded-full"
          style={{ width: "0.2em", height: "0.2em", background: V }}
        />
      ) : (
        <span
          className="absolute left-1/2 -translate-x-1/2 font-mono leading-none"
          style={{ top: "-0.04em", color: V, fontSize: "0.32em" }}
        >
          {bit}
        </span>
      )}
    </span>
  )
}

/* ── 2. Geometric — shapes for letters + a Devanagari य, every glyph textured ── */
type Glyph = { c: React.ReactNode; cls?: string; style?: React.CSSProperties; r?: number; y?: number }

export function NameGeometric() {
  const glyphs: Glyph[] = [
    // ▲ = A, magenta → violet gradient triangle
    { c: "▲", cls: "bg-gradient-to-b from-[#f5499c] to-[#bd03f7] bg-clip-text text-transparent", r: -3, y: -2 },
    // t — serif bold italic, white
    { c: "t", cls: `${serif.className} font-bold italic`, style: { color: W }, r: 4, y: 3 },
    // i — bar + violet bit-dot
    { c: <IDot />, y: -3 },
    // s — indigo striped texture fill
    { c: "s", cls: `${inter.className} font-extrabold bg-[repeating-linear-gradient(45deg,#6d5efc_0_3px,transparent_3px_6px)] bg-clip-text text-transparent`, r: -2 },
    // h — outlined white
    { c: "h", cls: `${serif.className} font-light`, style: { color: "transparent", WebkitTextStroke: `1.4px ${W}` }, y: 1 },
    // a — solid indigo grotesk
    { c: "a", cls: `${grotesk.className} font-bold`, style: { color: I }, r: 3, y: -2 },
    // य (ya) — the Devanagari jewel: violet → magenta gradient + glow
    { c: "य", cls: "bg-gradient-to-br from-[#bd03f7] to-[#f5499c] bg-clip-text text-transparent", style: { filter: "drop-shadow(0 0 16px rgba(189,3,247,0.4))" }, y: 0 },
    // space
    { c: <span className="inline-block w-3 sm:w-5" /> },
    // J — violet → indigo gradient, black grotesk
    { c: "J", cls: `${grotesk.className} font-black bg-gradient-to-br from-[#bd03f7] to-[#6d5efc] bg-clip-text text-transparent`, r: -5, y: -2 },
    // a — dotted halftone texture
    { c: "a", cls: "bg-[radial-gradient(#cfcfcf_1px,transparent_1.6px)] bg-[length:4px_4px] bg-clip-text text-transparent", style: mono, y: 1 },
    // i — bar + violet bit-dot
    { c: <IDot /> },
    // ∩ = n, solid magenta
    { c: "∩", style: { color: P }, r: 0 },
  ]

  return (
    <h1
      aria-label="Atishay Jain (अतिशय जैन)"
      className="flex flex-wrap items-baseline gap-[0.03em] text-[2.7rem] font-bold leading-none tracking-tight sm:text-6xl"
    >
      {glyphs.map((g, i) => (
        <motion.span
          key={i}
          className={`inline-block will-change-transform ${g.cls ?? ""}`}
          style={g.style}
          initial={{ opacity: 0, y: 16, rotate: 0 }}
          animate={{ opacity: 1, y: g.y ?? 0, rotate: g.r ?? 0 }}
          transition={{ delay: 0.05 * i, type: "spring", stiffness: 260, damping: 16 }}
          whileHover={{ y: (g.y ?? 0) - 7, rotate: (g.r ?? 0) * -1, transition: { type: "spring", stiffness: 400, damping: 12 } }}
        >
          {g.c}
        </motion.span>
      ))}
    </h1>
  )
}

/* ── 3. Stickers — ransom-note chips, alternating fills, jaunty rotations ── */
export function NameStickers() {
  const chars = "Atishay Jain".split("")
  return (
    <h1 aria-label="Atishay Jain" className="flex flex-wrap items-center gap-1.5 text-2xl font-bold sm:text-4xl">
      {chars.map((c, i) =>
        c === " " ? (
          <span key={i} className="w-2" />
        ) : (
          <motion.span
            key={i}
            className={`inline-flex h-[1.55em] w-[1.35em] items-center justify-center rounded-md ${
              i % 3 === 0
                ? "bg-[#bd03f7] text-white"
                : i % 3 === 1
                  ? "bg-white text-[#141414]"
                  : "border border-white/40 text-white"
            }`}
            initial={{ rotate: 0, scale: 0.6, opacity: 0 }}
            animate={{ rotate: (i % 2 ? 1 : -1) * (3 + (i % 3) * 2), scale: 1, opacity: 1 }}
            transition={{ delay: 0.04 * i, type: "spring", stiffness: 300, damping: 14 }}
            whileHover={{ rotate: 0, scale: 1.12 }}
          >
            {c}
          </motion.span>
        ),
      )}
    </h1>
  )
}

/* ── 4. Terminal — monospace handle with a blinking cursor ── */
export function NameTerminal() {
  return (
    <h1
      aria-label="Atishay Jain"
      className="flex items-baseline text-3xl font-medium tracking-tight sm:text-5xl"
      style={mono}
    >
      <span style={{ color: V }}>›</span>
      <span className="ml-2" style={{ color: W }}>atishay</span>
      <span style={{ color: G }}>.</span>
      <span style={{ color: V }}>jain</span>
      <motion.span
        className="ml-1 inline-block"
        style={{ width: "0.5ch", height: "1em", background: W, transform: "translateY(0.12em)" }}
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
      />
    </h1>
  )
}

/* ── 5. Outline — giant display, alternating fill/outline, violet swoosh ── */
export function NameOutline() {
  const chars = "Atishay Jain".split("")
  return (
    <div className="relative inline-block pb-3">
      <h1
        aria-label="Atishay Jain"
        className={`flex flex-wrap text-[2.8rem] font-black leading-none tracking-tighter sm:text-7xl ${grotesk.className}`}
      >
        {chars.map((c, i) =>
          c === " " ? (
            <span key={i} className="w-4" />
          ) : (
            <span
              key={i}
              style={i % 2 ? { color: "transparent", WebkitTextStroke: `1.5px ${W}` } : { color: W }}
            >
              {c}
            </span>
          ),
        )}
      </h1>
      <svg className="absolute -bottom-0 left-0 w-full" height="14" viewBox="0 0 320 14" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 9 C 90 2, 230 15, 317 5" stroke={V} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  )
}

/* ── 6. Italic editorial — serif italics + one violet swash letter ── */
export function NameEditorial() {
  return (
    <h1
      aria-label="Atishay Jain"
      className={`text-[2.9rem] font-medium italic leading-none tracking-tight sm:text-6xl ${serif.className}`}
      style={{ color: W }}
    >
      Atisha<span style={{ color: V }}>y</span>{" "}
      <span className={`${inter.className} not-italic font-extrabold`}>Jain</span>
    </h1>
  )
}
