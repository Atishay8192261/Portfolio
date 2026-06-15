export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-foreground/35">
      {children}
    </h2>
  )
}

/** A title-left / meta-right row, the core unit of the experience & project lists. */
export function Row({
  title,
  meta,
  href,
  muted = false,
}: {
  title: string
  meta: string
  href?: string
  muted?: boolean
}) {
  const titleEl = (
    <span
      className={
        muted
          ? "text-foreground/65"
          : "text-foreground/90 group-hover:text-[var(--violet)] transition-colors"
      }
    >
      {title}
      {href && !muted && <span className="text-foreground/30 group-hover:text-[var(--violet)]"> ↗</span>}
    </span>
  )

  return (
    <div className="flex items-baseline justify-between gap-4 py-1 text-[15px]">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group">
          {titleEl}
        </a>
      ) : (
        titleEl
      )}
      <span className="shrink-0 tabular-nums text-sm text-foreground/35">{meta}</span>
    </div>
  )
}
