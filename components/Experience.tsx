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
    year: "2023",
    title: "Senior Developer",
    company: "Tech Corp",
    description: "Led development of core products, managed team of 5 developers, implemented CI/CD pipeline",
  },
  {
    year: "2022",
    title: "Full Stack Developer",
    company: "Digital Solutions",
    description: "Built scalable web applications, optimized database performance, reduced loading times by 40%",
  },
  {
    year: "2020",
    title: "Junior Developer",
    company: "StartUp Inc",
    description: "Developed user interfaces, implemented responsive designs, collaborated with design team",
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
      <Timeline position="right">
        {experiences.map((experience, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot 
                className={`transition-all duration-300 ${isDark ? 'bg-primary hover:bg-primary-light' : 'bg-primary-foreground hover:bg-primary-dark'}`}
                onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}
              />
              {index < experiences.length - 1 && (
                <TimelineConnector className={isDark ? 'bg-white/10' : 'bg-black/10'} />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`w-full transition-colors duration-300 ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                  }`}>
                    <CardContent className="p-4">
                      <div className="text-sm text-primary font-medium">
                        {experience.year}
                      </div>
                      <h3 className="text-lg font-semibold mt-1">
                        {experience.title}
                      </h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        {experience.company}
                      </div>
                      {expandedExperience === index && (
                        <p className="text-sm mt-2 leading-relaxed">
                          {experience.description}
                        </p>
                      )}
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