'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/', label: 'The Stream', exact: true },
  { href: '/about', label: 'About', exact: false },
  { href: 'https://www.linkedin.com/in/karthikpandy', label: 'LinkedIn', external: true },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-20 bg-ground/90 backdrop-blur-sm border-b border-rule">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 flex items-center justify-between gap-3 h-[58px] overflow-hidden">
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-[0.78rem] sm:text-[0.82rem] font-medium text-ink hover:text-signal transition-colors shrink-0"
        >
          <span
            aria-hidden
            className="w-[7px] h-[7px] rounded-full bg-signal shrink-0"
          />
          karthikbi.dev
        </Link>

        <nav className="flex items-center gap-3 sm:gap-5 shrink-0">
          {links.map((l) => {
            const isActive =
              !l.external &&
              (l.exact ? pathname === l.href : pathname.startsWith(l.href))

            const cls = `font-mono text-[0.63rem] uppercase tracking-label transition-colors border-b ${
              l.external ? 'hidden sm:inline-block ' : ''
            }${
              isActive
                ? 'text-ink border-signal'
                : 'text-ink-3 border-transparent hover:text-ink hover:border-signal'
            }`

            return l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {l.label}
              </a>
            ) : (
              <Link key={l.label} href={l.href} className={cls}>
                {l.label}
              </Link>
            )
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
