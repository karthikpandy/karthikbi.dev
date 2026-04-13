'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',            label: 'Home' },
  { href: '/blueprints',  label: 'Blueprints' },
  { href: '/stream',      label: 'The Stream' },
  { href: '/experience',  label: 'Experience' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="font-mono text-sm font-semibold text-text hover:text-blue transition-colors">
          <span className="text-blue">~/</span>karthikbi.dev
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors font-mono ${
                  isActive
                    ? 'text-blue bg-blue/10'
                    : 'text-muted hover:text-text hover:bg-surface'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
