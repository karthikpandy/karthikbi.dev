'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { readTime } from '@/lib/readTime'

type Post = {
  slug: string
  title: string
  description: string
  tags: string[]
  url: string
}

export default function FindingsList({ posts }: { posts: Post[] }) {
  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  }, [posts])

  const [active, setActive] = useState<string>('All')

  const visible =
    active === 'All' ? posts : posts.filter((p) => p.tags.includes(active))

  const pills: { label: string; count: number }[] = [
    { label: 'All', count: posts.length },
    ...tagCounts.map(([label, count]) => ({ label, count })),
  ]

  return (
    <section>
      {/* filter pills */}
      <div className="flex flex-wrap gap-2 pb-6">
        {pills.map((p) => {
          const isActive = active === p.label
          return (
            <button
              key={p.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(p.label)}
              className={`font-mono text-[0.63rem] uppercase tracking-label px-3 py-1.5 rounded-[100px] border transition-colors ${
                isActive
                  ? 'bg-ink text-ground border-ink'
                  : 'border-rule-2 text-ink-3 hover:text-ink hover:border-ink-3'
              }`}
            >
              {p.label}
              <span className={isActive ? 'text-ground/70' : 'text-ink-3/70'}> {p.count}</span>
            </button>
          )
        })}
      </div>

      {/* findings — title, dek, tags (no left metric column, no dates) */}
      <div className="border-t border-rule">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={post.url}
            className="finding-row group block px-3 sm:px-4 py-6 border-b border-rule hover:bg-panel-sunk transition-colors"
          >
            <h2
              className="font-display font-semibold text-ink leading-snug group-hover:text-signal transition-colors"
              style={{ fontSize: '1.3rem', maxWidth: '46ch', textWrap: 'balance' }}
            >
              {post.title}
            </h2>
            <p
              className="mt-1.5 font-serif text-ink-2 leading-relaxed"
              style={{ maxWidth: '62ch', fontSize: '1rem' }}
            >
              {post.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[0.63rem] uppercase tracking-label text-ink-3 border border-rule-2 px-2 py-[3px] leading-none"
                >
                  {t}
                </span>
              ))}
              {readTime[post.slug] && (
                <span className="font-mono text-[0.63rem] uppercase tracking-label text-ink-3">
                  {readTime[post.slug]} read
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="font-mono text-[0.7rem] uppercase tracking-label text-ink-3 py-16 text-center">
          no findings for this filter
        </p>
      )}
    </section>
  )
}
