import posts from '@/data/posts.json'

export const metadata = {
  title: 'The Stream — karthikbi.dev',
  description: 'LinkedIn posts on BI engineering, data architecture, and the modern data stack.',
}

type Post = { title: string; date: string; url: string }

// Group posts by year
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
    <div className="mx-auto max-w-3xl px-6 py-12">

      {/* Header — editorial */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">The Stream</h1>
        <p className="text-sm text-gray-500 leading-relaxed max-w-md">
          Things I've shared on LinkedIn — tips, observations, and lessons from the data trenches.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center">
          <p className="font-mono text-xs text-gray-400 mb-4">// no posts loaded yet</p>
          <pre className="font-mono text-xs text-gray-400 text-left inline-block leading-relaxed">
{`# Convert your LinkedIn export:
python scripts/shares_to_json.py`}
          </pre>
        </div>
      ) : (
        <div className="space-y-10">
          {years.map((year) => (
            <div key={year}>
              {/* Year header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-semibold text-violet-500 bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-full">
                  {year}
                </span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              {/* Posts for this year */}
              <div className="divide-y divide-gray-100">
                {grouped[year].map((post, i) => (
                  <a
                    key={`${post.date}-${i}`}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-5 py-3.5 group"
                  >
                    <time className="font-mono text-[11px] text-gray-400 pt-0.5 w-20 flex-shrink-0">
                      {post.date.slice(5)}
                    </time>
                    <p className="text-sm text-gray-600 group-hover:text-violet-600 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}

          <p className="font-mono text-xs text-gray-300 text-center pt-4">
            {posts.length} posts total
          </p>
        </div>
      )}
    </div>
  )
}
