import Link from "next/link"
import type { Post } from "@/lib/blogData"

export function BlogPost({ post }: { post: Post }) {
  return (
    <article>
      <Link href="/blog" className="text-sm text-foreground/40 transition-colors hover:text-foreground/70">
        ← Writing
      </Link>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-2 text-sm text-foreground/40">{post.date}</p>

      <div className="mt-7 space-y-5 text-[15px] leading-[1.75] text-foreground/75">
        {post.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  )
}
