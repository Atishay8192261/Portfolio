import { notFound } from "next/navigation"
import { Background } from "@/components/Background"
import { Navbar } from "@/components/Navbar"
import { BlogPost } from "@/components/BlogPost"
import { posts, getPost } from "@/lib/blogData"

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  return { title: post ? `${post.title} | Atishay Jain` : "Writing | Atishay Jain" }
}

export default function PostRoute({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <main className="mx-auto max-w-[600px] px-5 pb-28 pt-8">
        <BlogPost post={post} />
      </main>
    </div>
  )
}
