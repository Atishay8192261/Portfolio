"use client"

import { Navbar } from "./Navbar"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Profile } from "./Profile"
import { EnhancedExperience } from "./EnhancedExperience"
import { Projects } from "./Projects"
import { GitHubWidget } from "./widgets/GitHubWidget"
import { LinkedInWidget } from "./widgets/LinkedInWidget"
import { InstagramWidget } from "./widgets/InstagramWidget"
import { MapWidget } from "./widgets/MapWidget"
import { ChatGPTWidget } from "./widgets/ChatGPTWidget"
import { FeedbackWidget } from "./widgets/FeedbackWidget"
import { SpotlightWrapper } from "./SpotlightWrapper"


export default function PortfolioPage() {
  const [isDark, setIsDark] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 600)
  }, [isDark])

  const neonColors = {
    github: { dark: "rgba(38, 166, 65, 0.7)", light: "rgba(64, 196, 99, 0.9)" },
    linkedin: { dark: "rgba(0, 119, 181, 0.7)", light: "rgba(0, 119, 181, 0.9)" },
    instagram: { dark: "rgba(225, 48, 108, 0.7)", light: "rgba(225, 48, 108, 0.9)" },
    map: { dark: "rgba(0, 128, 0, 0.7)", light: "rgba(0, 128, 0, 0.9)" },
    chatgpt: { dark: "rgba(16, 163, 127, 0.7)", light: "rgba(16, 163, 127, 0.9)" },
    feedback: { dark: "rgba(255, 165, 0, 0.7)", light: "rgba(255, 165, 0, 0.9)" },
  }

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <motion.div
          className="flex flex-col items-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border-4 border-transparent border-t-pink-500 border-r-blue-500 border-b-purple-500 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Welcome to atie.dev
            </h2>
            <p className="text-muted-foreground font-mono">Loading portfolio...</p>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
      style={{ fontFamily: "IBM Plex Mono, monospace" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <div className="max-w-7xl mx-auto px-4 pt-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Column - Profile, Experience, and Projects */}
          <motion.div
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Profile />
            <EnhancedExperience isDark={isDark} />
            <Projects isDark={isDark} />
          </motion.div>

          {/* Right Columns - Widgets */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Widgets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
              {/* GitHub Widget - Full width */}
              <motion.div
                className="sm:col-span-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.github[isDark ? "dark" : "light"]}>
                  <GitHubWidget isDark={isDark} />
                </SpotlightWrapper>
              </motion.div>

              {/* Map Widget - 4 columns */}
              <motion.div
                className="sm:col-span-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.map[isDark ? "dark" : "light"]}>
                  <MapWidget isDark={isDark} />
                </SpotlightWrapper>
              </motion.div>

              {/* LinkedIn Widget - 2 columns */}
              <motion.div
                className="sm:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.linkedin[isDark ? "dark" : "light"]}>
                  <LinkedInWidget isDark={isDark} />
                </SpotlightWrapper>
              </motion.div>

              {/* ChatGPT Widget - 3 columns */}
              <motion.div
                className="sm:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.chatgpt[isDark ? "dark" : "light"]}>
                  <ChatGPTWidget isDark={isDark} />
                </SpotlightWrapper>
              </motion.div>

              {/* Feedback Widget - 3 columns */}
              <motion.div
                className="sm:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.feedback[isDark ? "dark" : "light"]}>
                  <FeedbackWidget isDark={isDark} />
                </SpotlightWrapper>
              </motion.div>

              {/* Instagram Widget - Full width */}
              <motion.div
                className="sm:col-span-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.instagram[isDark ? "dark" : "light"]}>
                  <InstagramWidget isDark={isDark} />
                </SpotlightWrapper>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
