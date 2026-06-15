"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Profile"
import { Experience } from "@/components/Experience"
import { Projects } from "@/components/Projects"
import { AskAI } from "@/components/AskAI"
import { Footer } from "@/components/Footer"
import { Background } from "@/components/Background"

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />

      <motion.main
        className="mx-auto max-w-[600px] px-5 pb-28 pt-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Hero />

        <div className="mt-16 space-y-12">
          <Experience />
          <Projects />
          <AskAI />
        </div>

        <div className="mt-16">
          <Footer />
        </div>
      </motion.main>
    </div>
  )
}
