"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from "./Navbar"
import { Profile } from './Profile'
import { Experience } from './Experience'
import { GitHubWidget } from './widgets/GitHubWidget'
import { TwitterWidget } from './widgets/TwitterWidget'
import { LinkedInWidget } from './widgets/LinkedInWidget'
import { InstagramWidget } from './widgets/InstagramWidget'
import { MapWidget } from './widgets/MapWidget'
import { ChatGPTWidget } from './widgets/ChatGPTWidget'
import { SpotlightWrapper } from './SpotlightWrapper'

export default function PortfolioPage() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const neonColors = {
    experience: { dark: 'rgba(255, 0, 255, 0.7)', light: 'rgba(255, 0, 255, 0.9)' },
    github: { dark: 'rgba(88, 166, 255, 0.7)', light: 'rgba(88, 166, 255, 0.9)' },
    twitter: { dark: 'rgba(29, 161, 242, 0.7)', light: 'rgba(29, 161, 242, 0.9)' },
    linkedin: { dark: 'rgba(0, 119, 181, 0.7)', light: 'rgba(0, 119, 181, 0.9)' },
    instagram: { dark: 'rgba(225, 48, 108, 0.7)', light: 'rgba(225, 48, 108, 0.9)' },
    map: { dark: 'rgba(0, 128, 0, 0.7)', light: 'rgba(0, 128, 0, 0.9)' },
    chatgpt: { dark: 'rgba(16, 163, 127, 0.7)', light: 'rgba(16, 163, 127, 0.9)' },
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
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <div className="max-w-7xl mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile and Experience */}
          <div className="lg:col-span-1 space-y-8">
            <Profile />
            <SpotlightWrapper isDark={isDark} neonColor={neonColors.experience[isDark ? 'dark' : 'light']}>
              <Experience isDark={isDark} />
            </SpotlightWrapper>
          </div>

          {/* Right Columns - Widgets Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SpotlightWrapper isDark={isDark} neonColor={neonColors.github[isDark ? 'dark' : 'light']}>
              <GitHubWidget isDark={isDark} />
            </SpotlightWrapper>
            <SpotlightWrapper isDark={isDark} neonColor={neonColors.twitter[isDark ? 'dark' : 'light']}>
              <TwitterWidget isDark={isDark} />
            </SpotlightWrapper>
            <SpotlightWrapper isDark={isDark} neonColor={neonColors.linkedin[isDark ? 'dark' : 'light']}>
              <LinkedInWidget isDark={isDark} />
            </SpotlightWrapper>
            <SpotlightWrapper isDark={isDark} neonColor={neonColors.instagram[isDark ? 'dark' : 'light']}>
              <InstagramWidget isDark={isDark} />
            </SpotlightWrapper>
            <SpotlightWrapper isDark={isDark} neonColor={neonColors.map[isDark ? 'dark' : 'light']}>
              <MapWidget isDark={isDark} />
            </SpotlightWrapper>
            <SpotlightWrapper isDark={isDark} neonColor={neonColors.chatgpt[isDark ? 'dark' : 'light']}>
              <ChatGPTWidget isDark={isDark} />
            </SpotlightWrapper>
          </div>
        </div>
      </div>
    </motion.div>
  )
}