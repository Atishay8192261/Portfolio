export interface Experience {
  id: string
  year: string
  title: string
  company: string
  location: string
  type: "Research" | "Internship" | "Academic" | "Full-time"
  description: string
  achievements: string[]
  skills: string[]
  companyUrl?: string
  companyLogo?: string
}

export const experiences: Experience[] = [
  {
    id: "1",
    year: "Jan 2025 – May 2025",
    title: "Software Engineering Intern",
    company: "Veena Agencies",
    location: "Remote",
    type: "Internship",
    description:
      "Developing distributed inventory microservices in Java (Spring Boot) handling 500K daily requests with p99 latency of 80ms. Building thread-safe, non-blocking event pipelines using Apache Kafka and implementing comprehensive testing and monitoring solutions.",
    achievements: [
      "Developed distributed Inventory Microservice handling 500K daily requests with p99 latency 80ms",
      "Built thread-safe, non-blocking event pipeline using Apache Kafka, reducing inter-service lag by 20%",
      "Developed REST and gRPC endpoints secured with OAuth2, cutting partner integration time by 25%",
      "Integrated microservices into Docker containers and supported Kubernetes (EKS) deployment",
      "Set up CI/CD pipelines with GitHub Actions and Terraform, accelerating build-deploy cycles by 40%",
      "Achieved 85% test coverage using JUnit and Mockito",
      "Implemented OpenTelemetry and Grafana dashboards, reducing MTTR by 40%",
      "Contributed to 15% improvement in end-to-end throughput",
    ],
    skills: [
      "Java",
      "Spring Boot",
      "Apache Kafka",
      "Docker",
      "Kubernetes",
      "OAuth2",
      "gRPC",
      "REST APIs",
      "GitHub Actions",
      "Terraform",
      "JUnit",
      "Mockito",
      "OpenTelemetry",
      "Grafana",
      "EKS",
    ],
    companyUrl: "https://veenaagencies.com",
  },
  {
    id: "2",
    year: "Jan 2024 – Dec 2024",
    title: "Research Assistant",
    company: "Genomic Classification with ULMFiT — SJSU",
    location: "San Jose, CA",
    type: "Research",
    description:
      "Leading genomic classification research using ULMFiT architecture on remote Linux systems. Scaling models to handle 100GB+ genomic datasets with advanced preprocessing and tokenization strategies for open-label classification and collaborative open-source reproducibility benchmarks.",
    achievements: [
      "Configured PyTorch, Fastai, and Biopython on remote Linux systems",
      "Scaled model to handle 100GB+ genomic data for open-label classification",
      "Engaged in collaborative open-source reproducibility benchmarks",
      "Implemented advanced data pre-processing and tokenization strategies",
      "Fine-tuned ULMFiT and AWD-LSTM models for genomic machine learning pipelines",
      "Advanced genomic sequence analysis through deep learning techniques",
    ],
    skills: [
      "Python",
      "PyTorch",
      "Fastai",
      "Biopython",
      "Linux",
      "ULMFiT",
      "AWD-LSTM",
      "Deep Learning",
      "Genomics",
      "Machine Learning",
    ],
    companyUrl: "https://www.sjsu.edu",
  },
  {
    id: "3",
    year: "Aug 2023 – May 2024",
    title: "Teaching Assistant",
    company: "CS-46B (Advanced Java Programming) — SJSU",
    location: "San Jose, CA",
    type: "Academic",
    description:
      "Supporting 45+ students in Advanced Java Programming with comprehensive instruction and mentorship. Leading weekly labs focused on Object-Oriented Programming with whiteboard interviews and problem-solving sessions.",
    achievements: [
      "Taught and supported 45+ students in Advanced Java Programming",
      "Led 13+ weekly labs focused on OOP concepts and best practices",
      "Conducted whiteboard interviews and technical problem-solving sessions",
      "Improved student understanding of advanced Java concepts",
      "Mentored students in software development best practices",
      "Facilitated hands-on learning through practical coding exercises",
    ],
    skills: ["Java", "Object-Oriented Programming", "Teaching", "Mentoring", "Technical Interviews", "Problem Solving"],
    companyUrl: "https://www.sjsu.edu",
  },
]
