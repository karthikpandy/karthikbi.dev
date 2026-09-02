'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function systemPrefersDark() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function readStored(): Theme | null {
  try {
    const t = localStorage.getItem('theme')
    return t === 'light' || t === 'dark' ? t : null
  } catch {
    return null
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = readStored()
    setTheme(stored ?? (systemPrefersDark() ? 'dark' : 'light'))
    setMounted(true)
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {}
    document.documentElement.setAttribute('data-theme', next)
  }

  // Label names the theme it switches TO.
  const target = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${target} theme`}
      className="font-mono text-[0.63rem] uppercase tracking-label text-ink-3 hover:text-signal transition-colors border border-rule-2 px-2 py-1 leading-none"
    >
      {mounted ? target : '     '}
    </button>
  )
}
