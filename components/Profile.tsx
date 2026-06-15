"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42S14.2 15.54 14.2 12s1.51-6.42 3.38-6.42S20.96 8.46 20.96 12zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  )
}

const links = [
  { label: "GitHub", href: "https://github.com/Atishay8192261", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/atishayjain19", Icon: Linkedin },
  { label: "Medium", href: "#", Icon: MediumIcon }, // TODO: real Medium URL
  { label: "Email", href: "mailto:atishayjain@atie.dev", Icon: Mail },
]

export function Hero() {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src="/profile.jpg"
        alt="Atishay Jain"
        width={88}
        height={88}
        priority
        className="h-[88px] w-[88px] rounded-full object-cover ring-1 ring-white/10"
      />

      <h1 className="mt-5 text-2xl font-semibold tracking-tight">Atishay Jain</h1>
      <p className="mt-1.5 text-sm text-foreground/55">
        SSD Firmware Intern at{" "}
        <a
          href="https://www.micron.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/75 underline-offset-4 hover:text-[var(--violet)] hover:underline"
        >
          Micron
        </a>{" "}
        · Summer 2026
      </p>

      {/* Icon links */}
      <nav className="mt-4 flex items-center gap-5">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") || href.startsWith("#") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            className="text-foreground/45 transition-colors hover:text-foreground"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        ))}
      </nav>

      {/* Bio */}
      <p className="mt-7 max-w-[440px] text-[15px] leading-relaxed text-foreground/70">
        Hey, I&apos;m Atishay. I write firmware for SSDs at Micron and like living close to the
        metal — storage, performance, the parts most people never see. I study CS at SCU, build the
        occasional AI thing on the side, and ship more than I sleep.
      </p>
    </header>
  )
}
