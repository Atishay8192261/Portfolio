"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import { Background } from "@/components/Background"
import { StackedBody } from "@/components/StackedBody"
import { EasterEggs } from "@/components/EasterEggs"

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <EasterEggs />

      <motion.main
        className="mx-auto max-w-[600px] px-5 pb-28 pt-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <StackedBody />
      </motion.main>
    </div>
  )
}
