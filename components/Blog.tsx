import Link from "next/link"
import { SectionLabel } from "@/components/SectionLabel"
import { posts } from "@/lib/blogData"

export function Blog() {
  return (
    <section>
      <SectionLabel>Writing</SectionLabel>
      <div className="space-y-7">
        {posts.map((p) => (
          <div key={p.slug}>
            <div className="flex items-baseline justify-between gap-4">
              <Link
                href={`/blog/${p.slug}`}
                className="text-[15px] font-medium text-foreground transition-colors hover:text-[var(--violet)]"
              >
                {p.title}
              </Link>
              <span className="shrink-0 text-sm text-foreground/35">{p.date}</span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/55">{p.excerpt}</p>
            <Link
              href={`/blog/${p.slug}`}
              className="mt-2 inline-block text-sm text-[var(--violet)] hover:underline"
            >
              Read →
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
