const experience = [
  {
    date: "Summer 2026",
    org: "Micron Technology",
    url: "https://www.micron.com",
    role: "SSD Firmware Intern",
    blurb:
      "Writing firmware for next-generation SSDs — low-level systems work, performance, and the parts of the stack most people never see.",
  },
  {
    date: "Jan – May 2025",
    org: "Veena Agencies",
    url: "https://veenaagencies.in",
    role: "Software Engineering Intern",
    blurb:
      "Built distributed inventory microservices in Java / Spring Boot handling 500K daily requests, with thread-safe Kafka event pipelines and OAuth2-secured REST & gRPC endpoints.",
  },
  {
    date: "2024",
    org: "San José State University",
    url: "https://www.sjsu.edu",
    role: "Research Assistant — Genomic Classification",
    blurb:
      "Scaled ULMFiT / AWD-LSTM models to 100GB+ genomic sequence data on remote Linux systems for open-label classification and reproducibility benchmarks.",
  },
  {
    date: "2023 – 24",
    org: "San José State University",
    url: "https://www.sjsu.edu",
    role: "Teaching Assistant — CS-46B",
    blurb:
      "Led 13+ weekly labs and mentored 45+ students in advanced Java and object-oriented design, with whiteboard interviews and problem-solving sessions.",
  },
]

export function Experience() {
  return (
    <section>
      <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-neutral-50 sm:text-5xl">
        Where I&apos;ve worked.
      </h1>
      <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-400">
        My path so far — firmware and distributed systems, with detours through genomics research
        and teaching.
      </p>

      <div className="mt-12 border-l border-white/10">
        {experience.map((e, i) => (
          <div
            key={i}
            className="grid grid-cols-1 gap-2 pb-10 pl-6 sm:grid-cols-[130px_1fr] sm:gap-6"
          >
            <div className="pt-0.5 text-sm text-neutral-500">{e.date}</div>
            <div>
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-neutral-100 transition-colors hover:text-[#bd03f7]"
              >
                {e.org}
              </a>
              <div className="text-sm text-neutral-500">{e.role}</div>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-400">{e.blurb}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
