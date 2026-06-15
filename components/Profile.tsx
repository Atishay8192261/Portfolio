"use client"

import { Github, Linkedin, Mail, FileText } from "lucide-react"
import Image from "next/image"

const RESUME_URL = "https://www.overleaf.com/read/psjcgjsythmg#d48c3e"

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42S14.2 15.54 14.2 12s1.51-6.42 3.38-6.42S20.96 8.46 20.96 12zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  )
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-neutral-100 underline decoration-neutral-600 decoration-1 underline-offset-2 transition-colors hover:text-[#bd03f7] hover:decoration-[#bd03f7]"
    >
      {children}
    </a>
  )
}

const socials = [
  { label: "GitHub", href: "https://github.com/Atishay8192261", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/atishayjain19", Icon: Linkedin },
  { label: "Medium", href: "#", Icon: MediumIcon }, // TODO: real Medium URL
  { label: "Email", href: "mailto:atishayjain@atie.dev", Icon: Mail },
  { label: "Résumé", href: RESUME_URL, Icon: FileText },
]

export function Hero() {
  return (
    <header>
      <Image
        src="/profile.jpg"
        alt="Atishay Jain"
        width={56}
        height={56}
        priority
        className="h-14 w-14 rounded-full object-cover ring-1 ring-white/10"
      />

      <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-neutral-50 sm:text-5xl">
        Firmware<span className="text-[#bd03f7]">.</span> Systems
        <span className="text-[#bd03f7]">.</span> Caffeine
        <span className="text-[#bd03f7]">.</span>
      </h1>

      <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-neutral-400">
        <p>
          Hey, I&apos;m Atishay. I write SSD firmware at <A href="https://www.micron.com">Micron</A> —
          low-level systems, performance, and the parts most people never see.
        </p>
        <p>
          Previously I built distributed microservices at{" "}
          <A href="https://veenaagencies.in">Veena Agencies</A>, and did genomics research and TA&apos;d
          advanced Java at <A href="https://www.sjsu.edu">SJSU</A>. I study CS at{" "}
          <A href="https://www.scu.edu">Santa Clara University</A> and ship more than I sleep.
        </p>
      </div>

      <div className="mt-6 flex items-center gap-5">
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") || href.startsWith("#") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            className="text-neutral-200 transition-colors hover:text-[#bd03f7]"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </header>
  )
}
