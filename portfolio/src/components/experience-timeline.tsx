'use client'

import { motion } from 'framer-motion';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from '@/contexts/theme-context';
import type { Experience } from '@/types';

const experiences: Experience[] = [
  {
    year: "Aug 2023 - Dec 2023",
    title: "Software Engineering Intern",
    company: "Veena Agencies",
    description: "Revamped inventory system, enhanced Java app performance, developed scalable RESTful APIs with Spring Boot, adopted microservices with Docker and Kubernetes, improving system efficiency by 25% and reducing order processing time by 15%."
  },
  {
    year: "Jun 2024 - Present",
    title: "Research Assistant - Genomic Classification with ULMFiT",
    company: "San Jose State University",
    description: "Configured libraries (PyTorch, Fastai) on Tailscale, scaled model for 100GB genomic datasets, implemented data pre-processing, and fine-tuned using ULMFiT with AWD-LSTM for genomic classification."
  },
  {
    year: "Aug 2023 - Dec 2023",
    title: "Teaching Assistant - CS-46B (Advanced Java Programming)",
    company: "San Jose State University",
    description: "Taught and supported 45+ students in Advanced Java, conducted weekly problem-solving review sessions, and facilitated whiteboard interviews."
  },
  {
    year: "Jan 2024 - May 2024",
    title: "Developer",
    company: "Plutus Project",
    description: "Developed a scalable web app with Spring Boot, reduced server response time by 25%, automated build with Maven, and optimized MySQL database performance, speeding data retrieval by 35%."
  }
];

const cardVariants = {
  initial: { 
    scale: 1,
    boxShadow: '0 0 0 rgba(var(--glow-color), 0.3)'
  },
  hover: { 
    scale: 1.02,
    boxShadow: '0 0 30px rgba(var(--glow-color), 0.6)',
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

export function ExperienceTimeline() {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold font-mono">Experience</h2>
      <Timeline position="alternate">
        {experiences.map((experience, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <motion.div
                initial="initial"
                whileHover="hover"
                variants={cardVariants}
                style={{
                  '--glow-color': isDark ? '255, 255, 255' : '0, 0, 0'
                } as React.CSSProperties}
                className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}  // Adjust text color based on theme
              >
                {experience.year}
              </motion.div>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot 
                className={isDark ? 'bg-primary' : 'bg-primary-foreground'}
                variant="outlined"
              />
              {index < experiences.length - 1 && (
                <TimelineConnector 
                  className={isDark ? 'bg-white/10' : 'bg-black/10'}
                  style={{ minHeight: '50px' }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <motion.div
                initial="initial"
                whileHover="hover"
                variants={cardVariants}
                style={{
                  '--glow-color': isDark ? '255, 255, 255' : '0, 0, 0'
                } as React.CSSProperties}
              >
                <Card className={`w-full transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                  <CardContent className="p-4">
                    <div className="text-sm text-primary font-medium dark:text-primary-foreground">
                      {experience.year}
                    </div>
                    <h3 className="text-lg font-semibold mt-1 dark:text-white">
                      {experience.title}
                    </h3>
                    <div className="text-sm text-muted-foreground mt-1 dark:text-muted">
                      {experience.company}
                    </div>
                    <p className="text-sm mt-2 leading-relaxed dark:text-gray-300">
                      {experience.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
