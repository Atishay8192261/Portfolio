import { Navbar } from "@/components/Navbar"
import { Projects } from "@/components/Projects"

export const metadata = {
  title: "Projects | Atishay Jain",
}

export default function ProjectsRoute() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 pb-32 pt-28 sm:pt-36">
        <Projects />
      </main>
    </>
  )
}
