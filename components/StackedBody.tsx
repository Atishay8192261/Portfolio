import { Hero } from "@/components/Profile"
import { Experience } from "@/components/Experience"
import { Projects } from "@/components/Projects"
import { AskAI } from "@/components/AskAI"
import { Footer } from "@/components/Footer"

/** 2.0 stacked layout body — intro, work, then Ask at the bottom. */
export function StackedBody() {
  return (
    <>
      <Hero />

      <div className="mt-14 space-y-12">
        <Experience />
        <Projects />
      </div>

      <div className="mt-14 border-t border-white/10 pt-12">
        <AskAI />
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </>
  )
}
