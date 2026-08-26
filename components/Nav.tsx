'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/stream', label: 'The Stream' },
  { href: '/about',  label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="bg-white sticky top-0 z-10">
      <div className="mx-auto max-w-3xl px-6 flex items-center justify-between h-14">
        <Link href="/" className="font-mono text-sm font-bold text-gray-900 hover:text-[#7C7BFF] transition-colors">
          karthikbi.dev
        </Link>
        <nav className="flex items-center gap-6">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  isActive ? 'text-[#7C7BFF]' : 'text-gray-500 hover:text-gray-900'
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
