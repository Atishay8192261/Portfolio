"use client"

import Link from "next/link"

/**
 * Minimal sticky top bar. The only "glass" on the site: transparent, blurs the
 * content scrolling beneath it. Just the wordmark + a single resume CTA.
 */
const RESUME_URL = "https://www.overleaf.com/read/psjcgjsythmg#d48c3e"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex max-w-[600px] items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-foreground/80 transition-colors hover:text-foreground"
        >
          atie.dev
        </Link>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-foreground/55 transition-colors hover:text-[var(--violet)]"
        >
          résumé ↗
        </a>
      </div>
    </header>
  )
}
