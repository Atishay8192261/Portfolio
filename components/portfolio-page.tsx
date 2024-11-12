"use client";

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Twitter, Instagram, Mail, FileText, Sun, Moon} from 'lucide-react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Experience data
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

export default function Portfolio(){
  const [isDark, setIsDark] = useState(true)
  const [githubData, setGithubData] = useState<{contributions: number[]} | null>(null)
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null)
  const widgetsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: widgetsRef,
    offset: ["start end", "end start"]
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    setGithubData({
      contributions: Array(52).fill(null).map(() => Math.floor(Math.random() * 5))
    })
  }, [isDark])

  const applyOverlayMask = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = widgetsRef.current
    if (!container) return

    const x = e.clientX - container.getBoundingClientRect().left
    const y = e.clientY - container.getBoundingClientRect().top

    container.style.setProperty('--x', `${x}px`)
    container.style.setProperty('--y', `${y}px`)
    container.style.setProperty('--opacity', '1')
  }

  const removeOverlayMask = () => {
    const container = widgetsRef.current
    if (!container) return

    container.style.setProperty('--opacity', '0')
  }

  const neonColors = {
    github: { dark: 'rgba(88, 166, 255, 0.7)', light: 'rgba(36, 41, 47, 0.7)' },
    twitter: { dark: 'rgba(29, 161, 242, 0.7)', light: 'rgba(0, 172, 238, 0.7)' },
    youtube: { dark: 'rgba(255, 0, 0, 0.7)', light: 'rgba(255, 0, 0, 0.5)' },
    coffee: { dark: 'rgba(255, 221, 0, 0.7)', light: 'rgba(255, 221, 0, 0.5)' },
    map: { dark: 'rgba(0, 128, 0, 0.7)', light: 'rgba(0, 128, 0, 0.5)' },
    linkedin: { dark: 'rgba(0, 119, 181, 0.7)', light: 'rgba(0, 119, 181, 0.5)' },
    instagram: { dark: 'rgba(225, 48, 108, 0.7)', light: 'rgba(225, 48, 108, 0.5)' },
  }

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
      style={{ fontFamily: 'IBM Plex Mono, monospace' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 backdrop-blur-sm border-b transition-colors duration-300 ${
        isDark ? 'bg-black/50 border-white/10' : 'bg-white/50 border-black/10'
      }`}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-xl font-bold">Portfolio</span>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/resume.pdf">
                <FileText className="w-4 h-4 mr-2" />
                Resume
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="mailto:your.email@example.com">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Profile and Experience */}
          <div className="space-y-8">
            {/* Profile Section */}
            <div className="flex flex-col items-start gap-6">
              <Avatar className="w-32 h-32 rounded-full">
                <AvatarImage src="/profile.jpg" alt="Profile" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl font-bold mb-2">Atishay Jain</h1>
                <p className="text-xl text-muted-foreground">
                 Eat | Sleep | Code | Repeat. Sharing my journey as a developer.
                </p>
              </div>
            </div>

            {/* Experience Section */}
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
          </div>

          {/* Right Column - Widgets Grid */}
          <div 
            className="grid grid-cols-2 gap-4 content-start relative" 
            ref={widgetsRef}
            onPointerMove={applyOverlayMask}
            onPointerLeave={removeOverlayMask}
          >
            {/* Spotlight overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: "var(--opacity, 0)",
                mask: `radial-gradient(25rem 25rem at var(--x) var(--y), #000 1%, transparent 50%)`,
                WebkitMask: `radial-gradient(25rem 25rem at var(--x) var(--y), #000 1%, transparent 50%)`,
              }}
            >
              {/* Twin cards for spotlight effect */}
              {/* GitHub Widget */}
              <motion.div
                className="absolute top-0 left-0 w-[calc(50%-0.5rem)] h-[calc(50%-0.5rem)]"
                custom={{ glowColor: isDark ? neonColors.github.dark : neonColors.github.light }}
              >
                <Card className={`h-full overflow-hidden backdrop-blur-sm transition-colors duration-300 rounded-3xl ${
                  isDark ? 'bg-[#24292e]/80 border-[#3cffce]' : 'bg-[#f6f8fa]/80 border-[#3cffce]'
                }`}>
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Github className="w-5 h-5" />
                        <span className="font-medium">GitHub</span>
                      </div>
                      <Button variant="secondary" size="sm" className="rounded-full">
                        Follow
                      </Button>
                    </div>
                    <div className="flex-grow grid grid-cols-52 gap-1">
                      {githubData?.contributions.map((count: number, i: number) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-sm ${
                            count === 0 ? 'bg-white/10' :
                            count === 1 ? 'bg-green-900' :
                            count === 2 ? 'bg-green-700' :
                            count === 3 ? 'bg-green-500' :
                            'bg-green-300'
                          }`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Twitter Widget */}
              <motion.div
                className="absolute top-0 right-0 w-[calc(50%-0.5rem)] h-[calc(50%-0.5rem)]"
                custom={{ glowColor: isDark ? neonColors.twitter.dark : neonColors.twitter.light }}
              >
                <Card className={`h-full overflow-hidden backdrop-blur-sm transition-colors duration-300 rounded-3xl ${
                  isDark ? 'bg-[#1DA1F2]/80 border-[#3cffce]' : 'bg-[#E8F5FE]/80 border-[#3cffce]'
                }`}>
                  <CardContent className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                        <span className="font-medium">Twitter</span>
                      </div>
                      <Button variant="secondary" size="sm" className="rounded-full">
                        Follow
                      </Button>
                    </div>
                    <p className="text-sm mt-4">Check out my latest tweets!</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* LinkedIn Widget */}
              <motion.div
                className="absolute bottom-0 left-0 w-[calc(50%-0.5rem)] h-[calc(50%-0.5rem)]"
                custom={{ glowColor: isDark ? neonColors.linkedin.dark : neonColors.linkedin.light }}
              >
                <Card className={`h-full overflow-hidden backdrop-blur-sm transition-colors duration-300 rounded-3xl ${
                  isDark ? 'bg-[#0077B5]/80 border-[#3cffce]' : 'bg-[#E8F5FE]/80 border-[#3cffce]'
                }`}>
                  <CardContent className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Linkedin className="w-5 h-5 text-[#0077B5]" />
                        <span className="font-medium">LinkedIn</span>
                      </div>
                      <Button variant="secondary" size="sm" className="rounded-full">
                        Connect
                      </Button>
                    </div>
                    <p className="text-sm mt-4">View my professional profile</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Instagram Widget */}
              <motion.div
                className="absolute bottom-0 right-0 w-[calc(50%-0.5rem)] h-[calc(50%-0.5rem)]"
                custom={{ glowColor: isDark ? neonColors.instagram.dark : neonColors.instagram.light }}
              >
                <Card className={`h-full overflow-hidden backdrop-blur-sm transition-colors duration-300 rounded-3xl ${
                  isDark ? 'bg-gradient-to-br from-[#405DE6] via-[#5851DB] to-[#833AB4]/80 border-[#3cffce]' : 'bg-gradient-to-br from-[#405DE6] via-[#5851DB] to-[#833AB4]/50 border-[#3cffce]'
                }`}>
                  <CardContent className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Instagram className="w-5 h-5 text-white" />
                        <span className="font-medium text-white">Instagram</span>
                      </div>
                      <Button variant="secondary" size="sm" className="rounded-full">
                        Follow
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-white/20 rounded-md" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* GitHub Widget */}
            <motion.div
              variants={{
                initial: {
                  scale: 1,
                  y: 0,
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                  filter: "brightness(1)"
                },
                hover: {
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 0 20px rgba(0,0,0,0.2)", 
                  filter: "brightness(1.1)",
                  transition: {
                    duration: 0.2
                  }
                }
              }}
              initial="initial"
              whileHover="hover"
              custom={{ glowColor: isDark ? neonColors.github.dark : neonColors.github.light }}
              style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]) }}
              className="col-span-2"
            >
              <Card className={`overflow-hidden backdrop-blur-sm transition-colors duration-300 rounded-3xl ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5" />
                      <span className="font-medium">GitHub</span>
                    </div>
                    <Button variant="secondary" size="sm" className="rounded-full">
                      Follow
                    </Button>
                  </div>
                  <div className="grid grid-cols-52 gap-1">
                    {githubData?.contributions.map((count: number, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.01 }}
                        className={`w-2 h-2 rounded-sm ${
                          count === 0 ? 'bg-white/10' :
                          count === 1 ? 'bg-green-900' :
                          count === 2 ? 'bg-green-700' :
                          count === 3 ? 'bg-green-500' :
                          'bg-green-300'
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Twitter Widget */}
            <motion.div
              variants={{
                initial: {
                  scale: 1,
                  y: 0,
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                  filter: "brightness(1)"
                },
                hover: {
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                  filter: "brightness(1.1)",
                  transition: {
                    duration: 0.2
                  }
                }
              }}
              initial="initial"
              whileHover="hover"
              custom={{ glowColor: isDark ? neonColors.twitter.dark : neonColors.twitter.light }}
              style={{ opacity: useTransform(scrollYProgress, [0.1, 0.4], [0, 1]) }}
            >
              <Card className={`backdrop-blur-sm h-full transition-colors duration-300 rounded-3xl ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                      <span className="font-medium">Twitter</span>
                    </div>
                    <Button variant="secondary" size="sm" className="rounded-full">
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* LinkedIn Widget */}
            <motion.div
              variants={{
                initial: {
                  scale: 1,
                  y: 0,
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                  filter: "brightness(1)"
                },
                hover: {
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 0 20px rgba(0,0,0,0.2)", 
                  filter: "brightness(1.1)",
                  transition: {
                    duration: 0.2
                  }
                }
              }}
              initial="initial"
              whileHover="hover"
              custom={{ glowColor: isDark ? neonColors.linkedin.dark : neonColors.linkedin.light }}
              style={{ opacity: useTransform(scrollYProgress, [0.2, 0.5], [0, 1]) }}
            >
              <Card className={`backdrop-blur-sm h-full transition-colors duration-300 rounded-3xl ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-5 h-5 text-[#0077B5]" />
                      <span className="font-medium">LinkedIn</span>
                    </div>
                    <Button variant="secondary" size="sm" className="rounded-full">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instagram Widget */}
            <motion.div
              variants={{
                initial: {
                  scale: 1,
                  y: 0,
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                  filter: "brightness(1)"
                },
                hover: {
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                  filter: "brightness(1.1)", 
                  transition: {
                    duration: 0.2
                  }
                }
              }}
              initial="initial"
              whileHover="hover"
              custom={{ glowColor: isDark ? neonColors.instagram.dark : neonColors.instagram.light }}
              style={{ opacity: useTransform(scrollYProgress, [0.3, 0.6], [0, 1]) }}
              className="col-span-2"
            >
              <Card className={`backdrop-blur-sm transition-colors duration-300 rounded-3xl ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Instagram className="w-5 h-5" />
                      <span className="font-medium">Instagram</span>
                    </div>
                    <Button variant="secondary" size="sm" className="rounded-full">
                      Follow
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Image
                          src={`/placeholder.svg?text=Post${i}`}
                          alt={`Instagram Post ${i}`}
                          width={150}
                          height={150}
                          className="rounded-md aspect-square object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

