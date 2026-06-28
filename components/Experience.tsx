import { SectionLabel, Row } from "@/components/SectionLabel"

const experience = [
  {
    org: "Micron Technology",
    url: "https://www.micron.com",
    roles: [{ title: "SSD Firmware Intern", date: "Summer 2026" }],
  },
  {
    org: "Veena Agencies",
    url: "https://veenaagencies.in",
    roles: [{ title: "Software Engineering Intern", date: "Jan – May 2025" }],
  },
  {
    org: "San José State University",
    url: "https://www.sjsu.edu",
    roles: [
      { title: "Research Assistant, Genomic Classification", date: "2024" },
      { title: "Teaching Assistant, CS-46B", date: "2023 – 24" },
    ],
  },
]

export function Experience() {
  return (
    <section>
      <SectionLabel>Experience</SectionLabel>
      <div className="space-y-5">
        {experience.map((org) => (
          <div key={org.org}>
            <div className="text-[15px] font-semibold text-foreground">{org.org}</div>
            <div className="mt-1">
              {org.roles.map((role) => (
                <Row key={role.title} title={role.title} meta={role.date} muted />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
