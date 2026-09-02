const links = [
  { href: 'https://www.linkedin.com/in/karthikpandy', label: 'LinkedIn' },
  { href: 'https://github.com/karthikpandy', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="border-t border-rule mt-24">
      <div className="mx-auto max-w-4xl px-6 py-8 flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-[0.63rem] uppercase tracking-label text-ink-3">
          © 2026 karthikbi.dev
        </span>
        <div className="flex items-center gap-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.63rem] uppercase tracking-label text-ink-3 hover:text-signal transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
