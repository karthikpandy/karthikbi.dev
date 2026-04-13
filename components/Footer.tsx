export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          © 2026 karthikbi.dev · built with{' '}
          <span className="text-blue">Next.js</span> · hosted on{' '}
          <span className="text-blue">Azure</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/karthikbi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-blue transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-border">·</span>
          <a
            href="https://github.com/karthikbi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-blue transition-colors"
          >
            GitHub
          </a>
          <span className="text-border">·</span>
          <a
            href="/feed.xml"
            className="font-mono text-xs text-muted hover:text-amber transition-colors"
          >
            RSS
          </a>
        </div>
      </div>
    </footer>
  )
}
