import posts from '@/data/posts.json'

export const metadata = {
  title: 'The Stream — karthikbi.dev',
  description: 'LinkedIn posts on BI engineering, data architecture, and the modern data stack.',
}

type Post = { title: string; date: string; url: string }

function groupByYear(posts: Post[]) {
  return posts.reduce<Record<string, Post[]>>((acc, post) => {
    const year = post.date.slice(0, 4)
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})
}

export default function StreamPage() {
  const grouped = groupByYear(posts as Post[])
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <header className="mb-12">
        <p className="mono-label mb-3">The Stream</p>
        <p className="font-serif text-ink-2" style={{ fontSize: '1.075rem', lineHeight: 1.65 }}>
          Things I&apos;ve shared on LinkedIn — tips, observations, and lessons from the data trenches.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="border border-rule bg-panel-sunk p-8 text-center">
          <p className="mono-label mb-4">// no posts loaded yet</p>
          <pre className="font-mono text-[0.75rem] text-ink-3 text-left inline-block leading-relaxed">
{`# Convert your LinkedIn export:
python scripts/shares_to_json.py`}
          </pre>
        </div>
      ) : (
        <div className="space-y-10">
          {years.map((year) => (
            <div key={year}>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[0.63rem] uppercase tracking-label text-signal">
                  {year}
                </span>
                <div className="h-px flex-1 bg-rule" />
              </div>

              <div className="border-t border-rule">
                {grouped[year].map((post, i) => (
                  <a
                    key={`${post.date}-${i}`}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[64px_1fr] gap-4 py-3.5 border-b border-rule hover:bg-panel-sunk transition-colors px-2"
                  >
                    <time className="font-mono text-[0.63rem] text-ink-3 tnum pt-0.5">
                      {post.date.slice(5)}
                    </time>
                    <p className="font-serif text-ink-2 group-hover:text-ink transition-colors leading-snug line-clamp-2" style={{ fontSize: '0.98rem' }}>
                      {post.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}

          <p className="font-mono text-[0.63rem] uppercase tracking-label text-ink-3 text-center pt-4">
            {posts.length} posts total
          </p>
        </div>
      )}
    </div>
  )
}
