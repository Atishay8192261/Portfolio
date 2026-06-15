"use client"

import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Profile"
import { AskAI } from "@/components/AskAI"

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 pb-20 pt-24">
        <Hero />
        <div className="mt-14">
          <AskAI />
        </div>
      </main>
    </>
  )
}
