'use client'

import { motion } from 'framer-motion'
//import Image from 'next/image'
//import Link from 'next/link'
//import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from '@/contexts/theme-context'
//import type { SocialLink } from '@/types'

const cardVariants = {
  initial: { 
    scale: 1,
    boxShadow: '0 0 20px rgba(var(--card-glow-color), 0.3)'
  },
  hover: { 
    scale: 1.02,
    y: -5,
    boxShadow: '0 0 40px rgba(var(--card-glow-color), 0.6)',
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

const neonColors = {
  github: '88, 166, 255',
  linkedin: '10, 102, 194',
  twitter: '29, 161, 242',
  instagram: '225, 48, 108',
}

export function SocialCards() {
  const { isDark } = useTheme()

  return (
    <div className="grid grid-cols-2 gap-4 content-start">
      {/* GitHub Card */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        className="col-span-2"
        style={{ '--card-glow-color': neonColors.github } as React.CSSProperties}
      >
        <Card className={`overflow-hidden backdrop-blur-sm transition-all duration-300 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
        }`}>
          <CardContent className="p-6">
            {/* GitHub content */}
          </CardContent>
        </Card>
      </motion.div>

      {/* Other social cards with similar structure */}
    </div>
  )
}