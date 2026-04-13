import StreamCard from '@/components/StreamCard'
import posts from '@/data/posts.json'

export const metadata = {
  title: 'The Stream — karthikbi.dev',
  description: 'LinkedIn posts and thoughts on data engineering, BI, and the modern data stack.',
}

export default function StreamPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Header */}
      <div className="mb-14">
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-3">
          // linkedin activity
        </p>
        <h1 className="font-mono text-4xl font-bold text-text mb-4">The Stream</h1>
        <p className="text-muted text-lg max-w-2xl">
          Thoughts on data engineering, BI tooling, and lessons from 18 years in the trenches. Originally posted on LinkedIn.
        </p>
      </div>

      {posts.length === 0 ? (
        /* Empty state */
        <div className="card p-12 text-center space-y-4">
          <p className="font-mono text-muted text-sm">// no posts loaded yet</p>
          <div className="max-w-md mx-auto text-left bg-bg border border-border rounded p-4">
            <p className="font-mono text-xs text-muted mb-3">Generate posts from LinkedIn data:</p>
            <pre className="font-mono text-xs text-green leading-relaxed">
{`# 1. Export your LinkedIn shares as Shares.xlsx
# 2. Save it to the project root
# 3. Convert to CSV (Excel → Save As → CSV)
# 4. Run:
python scripts/shares_to_json.py`}
            </pre>
          </div>
        </div>
      ) : (
        /* Posts list */
        <div className="space-y-2">
          <div className="flex items-center gap-4 px-5 mb-4">
            <span className="font-mono text-xs text-muted w-24">date</span>
            <span className="font-mono text-xs text-muted">post</span>
          </div>
          {(posts as { title: string; date: string; url: string }[]).map((post, i) => (
            <StreamCard key={`${post.date}-${i}`} post={post} />
          ))}
          <p className="font-mono text-xs text-muted text-center pt-6">
            — {posts.length} posts total —
          </p>
        </div>
      )}
    </div>
  )
}
