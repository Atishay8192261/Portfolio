import { SectionLabel, Row } from "@/components/SectionLabel"
import { projects } from "@/lib/projectsData"

export function Projects() {
  return (
    <section>
      <SectionLabel>Projects</SectionLabel>
      <div className="space-y-1">
        {projects.map((p) => (
          <Row
            key={p.id}
            title={p.title.split(/\s[–—]\s/)[0].trim()}
            meta={p.startDate.slice(0, 4)}
            href={p.liveUrl || p.githubUrl}
          />
        ))}
      </div>
    </section>
  )
}
