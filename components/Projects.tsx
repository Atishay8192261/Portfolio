import { Sparkles, Globe, FlaskConical, Code, Link2 } from "lucide-react"
import { projects } from "@/lib/projectsData"

function iconFor(category: string) {
  switch (category) {
    case "ai/ml":
      return Sparkles
    case "research":
      return FlaskConical
    case "web":
      return Globe
    default:
      return Code
  }
}

// Short label — full github paths overflowed and overlapped the next column.
function linkLabel(url: string) {
  try {
    const u = new URL(url)
    if (u.hostname.includes("github.com")) return "GitHub"
    return u.hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

export function Projects() {
  return (
    <section>
      <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-neutral-50 sm:text-5xl">
        Things I&apos;ve built.
      </h1>
      <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-400">
        A handful of projects I&apos;m proud of — across systems, AI, and the web. Most are
        open-source, so dig into the code if something catches your eye.
      </p>

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {projects.map((p) => {
          const Icon = iconFor(p.category)
          const url = p.liveUrl || p.githubUrl
          return (
            <div key={p.id} className="min-w-0">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#bd03f7]/15 text-[#bd03f7]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-neutral-100">
                {p.title.split(/\s[–—]\s/)[0].trim()}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{p.description}</p>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-[#bd03f7]"
                >
                  <Link2 className="h-3.5 w-3.5" />
                  {linkLabel(url)}
                </a>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
