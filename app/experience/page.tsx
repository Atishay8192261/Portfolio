import { Navbar } from "@/components/Navbar"
import { Experience } from "@/components/Experience"

export const metadata = {
  title: "Experience | Atishay Jain",
}

export default function ExperienceRoute() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 pb-32 pt-28 sm:pt-36">
        <Experience />
      </main>
    </>
  )
}
