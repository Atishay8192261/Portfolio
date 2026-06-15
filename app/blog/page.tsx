import { Background } from "@/components/Background"
import { Navbar } from "@/components/Navbar"
import { Blog } from "@/components/Blog"

export const metadata = {
  title: "Writing | Atishay Jain",
}

export default function BlogRoute() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <main className="mx-auto max-w-[600px] px-5 pb-28 pt-8">
        <Blog />
      </main>
    </div>
  )
}
