'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { Card, CardContent } from "@/components/ui/card"

const experiences = [
  {
    year: "Jul 2023 – Present",
    title: "Teaching Assistant",
    company: "Advanced Java Programming",
    description: "I teach and supported 45+ students in Java Programming while conducting weekly whiteboard interviews and problem-solving review sessions.",
  },
  {
    year: "Jun 2024 – Dec 2024",
    title: "Research Assistant",
    company: "Genomic Classification with ULMFiT",
    description: "Configured PyTorch, Fastai, and Biopython on Tailscale. Scaling model to handle 100GB of genomic datasets. Implementing data pre-processing and tokenization strategies. Fine-tuning ULMFiT project with AWD-LSTM for genomic data analysis.",
  },
  {
    year: "Aug 2023 – Dec 2023",
    title: "Software Engineering Intern",
    company: "Veena Agencies",
    description: "Revamped inventory system, enhanced Java app performance. Developed thread-safe real-time data sync module. Created scalable RESTful APIs with Spring Boot. Implemented microservices with Docker and Kubernetes. Boosted system efficiency by 25% and cut order processing times by 15%.",
  },

  {
    year: "May 2023 – Jul 2023",
    title: "Research Assistant",
    company: "Modernizing Deeplasmid: Py3 Migration & GPU Optimization",
    description: "Reduced DNA sequence reading time by 50%. Boosted GC content calculation efficiency by 80%. Accelerated pentamer identification by 40%. Applied Agile methodologies with Professor William Andreopoulos.",
  },
  {
    year: "Jul 2022 — Jan 2023",
    title: "Teaching Assistant",
    company: "Calculus-I,II,III, Data Structures, Physics",
    description: "Tutored peers in Calculus, Java, Data Structures, and Physics. Gained teaching experience and learned about students' perspectives.",
  },
]

interface ExperienceProps {
  isDark: boolean
}

export function Experience({ isDark }: ExperienceProps) {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Experience</h2>
      <Timeline position="left">
        {experiences.map((experience, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot 
                className={`transition-all duration-300 cursor-pointer ${isDark ? 'bg-primary hover:bg-primary-light' : 'bg-primary-foreground hover:bg-primary-dark'}`}
                onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}
              />
              {index < experiences.length - 1 && (
                <TimelineConnector className={isDark ? 'bg-white/10' : 'bg-black/10'} />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`w-full transition-colors duration-300 ${
                    isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'
                  }`}
                  style={{
                    boxShadow: isDark ? '0 0 10px rgba(255, 255, 255, 0.1)' : '0 0 10px rgba(0, 0, 0, 0.1)',
                  }}>
                    <CardContent className="p-4">
                      <div className="text-sm text-primary font-medium font-mono">
                        {experience.year}
                      </div>
                      <h3 className="text-lg font-semibold mt-1 font-mono">
                        {experience.title}
                      </h3>
                      <div className="text-sm text-muted-foreground mt-1 font-mono">
                        {experience.company}
                      </div>
                      <AnimatePresence>
                        {expandedExperience === index && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm mt-2 leading-relaxed font-mono"
                          >
                            {experience.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}