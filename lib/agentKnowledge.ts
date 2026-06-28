import { projects } from "@/lib/projectsData"

/**
 * Single source of truth the LangGraph agent reads from via the `lookup` tool.
 * Edit this file to change what the "Ask me anything" bot knows.
 */
export const profile = {
  identity:
    "Atishay Jain is a software engineer based in the Bay Area. He is currently an SSD Firmware Intern at Micron (2026), working on simulation and analysis deep in the storage stack (specifics under NDA) — not writing firmware directly. He cares about low-level systems, performance, AI, and shipping things that compound.",
  experience: [
    "Micron Technology — SSD Firmware Intern (2026, current): working on simulation and analysis deep in the SSD/storage stack (specifics under NDA); not writing firmware directly.",
    "Veena Agencies — Software Engineering Intern (Jan–May 2025): built distributed inventory microservices in Java / Spring Boot handling ~500K daily requests with p99 ~80ms; thread-safe Kafka event pipelines; OAuth2-secured REST & gRPC endpoints; Docker/Kubernetes (EKS); CI/CD via GitHub Actions & Terraform; ~85% test coverage.",
    "San José State University — Research Assistant, Genomic Classification (2024): scaled ULMFiT / AWD-LSTM models to 100GB+ genomic data for open-label classification and reproducibility benchmarks using PyTorch, Fastai, and Biopython.",
    "San José State University — Teaching Assistant, CS-46B Advanced Java (2023–24): led 13+ weekly labs and mentored 45+ students in OOP and Java.",
  ],
  education:
    "Pursuing an MS in Computer Science at Santa Clara University (SCU); BS in Computer Science from San José State University (SJSU).",
  skills:
    "Java, Python, TypeScript, C / low-level systems, Spring Boot, React, Next.js, PyTorch, Apache Kafka, Docker, Kubernetes, PostgreSQL, MySQL, Redis, gRPC, OAuth2, CI/CD, and machine learning.",
  interests:
    "SSD and storage systems, firmware and low-level performance, agentic AI side-projects, and genomics ML. Off the clock he tinkers with agentic projects, experiments with new models, drinks a lot of coffee, and explores the city.",
  contact:
    "Email: atishayjain@atie.dev. GitHub: github.com/Atishay8192261. LinkedIn: linkedin.com/in/atishayjain19. Site: atie.dev.",
}

export const projectFacts = projects
  .map((p) => `${p.title}: ${p.description}. Tech: ${p.technologies.join(", ")}. ${p.liveUrl || p.githubUrl || ""}`)
  .join("\n")

export type Category =
  | "identity"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "interests"
  | "contact"

export function lookup(category: Category): string {
  switch (category) {
    case "identity":
      return profile.identity
    case "experience":
      return profile.experience.join("\n")
    case "projects":
      return projectFacts
    case "skills":
      return profile.skills
    case "education":
      return profile.education
    case "interests":
      return profile.interests
    case "contact":
      return profile.contact
    default:
      return profile.identity
  }
}
