"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import { NameGeometric } from "@/components/NameVariants"

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42S14.2 15.54 14.2 12s1.51-6.42 3.38-6.42S20.96 8.46 20.96 12zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  )
}

function B({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-foreground">{children}</span>
}

const links = [
  { label: "GitHub", href: "https://github.com/Atishay8192261", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/atishayjain19", Icon: Linkedin },
  { label: "Medium", href: "https://medium.com/@atishayjain8192261", Icon: MediumIcon },
  { label: "Email", href: "mailto:atishayjain@atie.dev", Icon: Mail },
]

export function Hero({ align = "left" }: { align?: "center" | "left" }) {
  return (
    <header
      className={
        align === "left"
          ? "flex flex-col items-start text-left"
          : "flex flex-col items-center text-center"
      }
    >
      <Image
        src="/profile.jpg"
        alt="Atishay Jain"
        width={256}
        height={320}
        priority
        className="h-40 w-32 rounded-none object-cover ring-1 ring-white/10"
      />

      <div className="mt-6">
        <NameGeometric />
      </div>

      {/* Icon links */}
      <nav className="mt-5 flex items-center gap-5">
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

      {/* Intro — full column width, aligned with the Experience section */}
      <div className="mt-6 space-y-4 text-[15px] font-medium leading-relaxed text-foreground/80">
        <p>
          Hey, I&apos;m <B>Atishay Jain</B> (people also call me atie). I&apos;m currently an SSD
          Firmware Intern at <B>Micron</B>, working on simulation and analysis deep in the storage
          stack. Before that I shipped distributed systems at <B>Veena Agencies</B> and ran dense,
          reproducible genomic machine-learning research at <B>SJSU</B>. These days I&apos;m also
          studying computer science at <B>SCU</B>.
        </p>
        <p>
          Outside of work, I&apos;m usually tinkering with agentic side-projects, frolicking with
          whatever model just shipped, and chasing the thrill of taking an idea from zero to one,
          often over way too much coffee. I care a little too much about craft, taste, and building
          things that actually compound, so when I&apos;m not heads-down you&apos;ll probably find me
          exploring the city or falling down some rabbit hole.
        </p>
      </div>
    </header>
  )
}
