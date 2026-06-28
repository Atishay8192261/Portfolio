import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/lib/blogData"

function renderPara(text: string, highlight?: string): React.ReactNode {
  if (!highlight || !text.includes(highlight)) return text
  const parts = text.split(highlight)
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [part, <span key={i} className="font-semibold text-[var(--violet)]">{highlight}</span>]
      : [part],
  )
}

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
          <p key={i}>{renderPara(para, post.highlight)}</p>
        ))}
      </div>

      {post.image && (
        <figure className="mt-10">
          <Image
            src={post.image}
            alt={post.imageCaption ?? "Photo"}
            width={1200}
            height={1600}
            className="w-full rounded-lg object-cover ring-1 ring-white/10"
          />
          {post.imageCaption && (
            <figcaption className="mt-2 text-xs italic text-foreground/40">{post.imageCaption}</figcaption>
          )}
        </figure>
      )}
    </article>
  )
}
