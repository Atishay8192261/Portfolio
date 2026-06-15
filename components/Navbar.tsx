"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const items = [
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
]

export function Navbar() {
  const pathname = usePathname() ?? "/"
  const isHome = pathname === "/"

  // Real Apple-style refraction (SVG feDisplacementMap in backdrop-filter) only
  // renders in Chromium; elsewhere we fall back to the Tailwind frosted blur.
  const [lensing, setLensing] = useState(false)
  useEffect(() => {
    setLensing(typeof window !== "undefined" && "chrome" in window)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Shared liquid-glass refraction filter */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <filter
            id="liquid-glass"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves={2} seed={7} result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2.4" result="soft" />
            <feDisplacementMap in="SourceGraphic" in2="soft" scale={26} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="relative mx-auto flex max-w-2xl items-center justify-center px-6 py-5">
        {!isHome && (
          <Link href="/" className="absolute left-6" aria-label="Home">
            <Image
              src="/profile.jpg"
              alt="Atishay Jain"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10"
            />
          </Link>
        )}

        {/* Liquid glass pill: transparent, frosted + refracted, specular rim */}
        <nav
          className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150"
          style={
            lensing
              ? {
                  WebkitBackdropFilter: "blur(14px) saturate(1.6) url(#liquid-glass)",
                  backdropFilter: "blur(14px) saturate(1.6) url(#liquid-glass)",
                }
              : undefined
          }
        >
          {items.map((it) => {
            const active = pathname.startsWith(it.href)
            return (
              <Link
                key={it.name}
                href={it.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active ? "text-[#bd03f7]" : "text-neutral-300 hover:text-white"
                }`}
              >
                {it.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
