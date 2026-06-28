export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  category: "web" | "mobile" | "ai/ml" | "research" | "open-source"
  status: "completed" | "in-progress" | "planned"
  startDate: string
  endDate?: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    id: "nandsight",
    title: "NANDSight",
    description:
      "A NAND / SSD firmware simulator with a C++ test pyramid and a Claude-powered debugging agent.",
    longDescription:
      "A simulator for NAND / SSD firmware behavior, built with a layered C++ test pyramid and an AI debugging agent (Claude) that helps trace and reason about failures in the storage stack.",
    image: "",
    technologies: ["C++", "Firmware", "Claude", "AI Agent", "Testing"],
    githubUrl: "https://github.com/Atishay8192261/nandsight",
    featured: true,
    category: "ai/ml",
    status: "in-progress",
    startDate: "2026-06",
    highlights: [],
  },
  {
    id: "med-bot",
    title: "Med-Bot",
    description:
      "A medical chatbot grounded in a curated corpus of trusted international medical sources to mitigate hallucination in the medical domain.",
    longDescription:
      "A retrieval-grounded medical assistant that answers from a curated knowledge base of trusted international medical sources, built to reduce hallucinated or unsafe answers in a high-stakes domain.",
    image: "",
    technologies: ["Python", "LangChain", "LangGraph", "RAG", "Knowledge Base"],
    githubUrl: "https://github.com/Atishay8192261/med-bot",
    featured: true,
    category: "ai/ml",
    status: "completed",
    startDate: "2026-05",
    highlights: [],
  },
  {
    id: "cloud-gpu-scheduler",
    title: "Top-DRL GPU Scheduler",
    description:
      "A take on Top-DRL: a simulator for topology-aware and congestion-aware GPU scheduling using deep reinforcement learning.",
    longDescription:
      "An exploration of Top-DRL — a deep-reinforcement-learning GPU scheduler that is aware of cluster topology and network congestion, with a simulator to evaluate scheduling decisions.",
    image: "",
    technologies: ["Python", "Deep RL", "GPU Scheduling", "Simulation", "Cloud"],
    githubUrl: "https://github.com/Atishay8192261/cloud_computing_project",
    featured: true,
    category: "research",
    status: "completed",
    startDate: "2026-05",
    highlights: [],
  },
  {
    id: "sevridy",
    title: "SevRidy",
    description: "A unified B2B/B2C service-procurement platform with responsive, accessible UX.",
    longDescription:
      "A comprehensive service platform for B2B and B2C markets featuring AI-powered service discovery, Elastic Search, and a responsive, accessible UI.",
    image: "",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "MongoDB", "Elastic Search", "TypeScript"],
    githubUrl: "https://github.com/Atishay8192261/SevRidy",
    liveUrl: "https://sevridy.vercel.app/",
    featured: true,
    category: "web",
    status: "completed",
    startDate: "2025-01",
    endDate: "2025-03",
    highlights: [],
  },
  {
    id: "ai-product-review",
    title: "AI Product Review System",
    description: "An emotion-aware product-feedback system using AI-driven real-time analysis.",
    longDescription:
      "An AI-powered product review system (started at Cal Hacks) with real-time WebSocket chat, emotional sentiment analysis via Hume EVI2, and a LoRA-fine-tuned Llama 3.1-8B for sub-500ms inference.",
    image: "",
    technologies: ["React.js", "WebSocket", "Apache Kafka", "Hume EVI2", "Llama 3.1-8B", "LoRA"],
    githubUrl: "https://github.com/Atishay8192261/ai-product-reviewer",
    featured: true,
    category: "ai/ml",
    status: "completed",
    startDate: "2024-10",
    highlights: [],
  },
]

export const getProjectsByCategory = (category: string) => {
  if (category === "all") return projects
  return projects.filter((project) => project.category === category)
}

export const getFeaturedProjects = () => projects.filter((project) => project.featured)
