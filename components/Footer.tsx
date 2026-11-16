export function Footer() {
  return (
    <footer className="flex items-center justify-between gap-4 pt-4 text-sm text-foreground/30">
      <span>© {new Date().getFullYear()} Atishay Jain</span>
      <a
        href="/v1/"
        className="transition-colors hover:text-foreground/70"
        title="See the previous version of this portfolio"
      >
        Old version ↗
      </a>
    </footer>
  )
}
