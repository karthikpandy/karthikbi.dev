import BlogCard from '@/components/BlogCard'
import posts from '@/data/posts-blog.json'

export const metadata = {
  title: 'Blueprints — karthikbi.dev',
  description: 'Technical write-ups on BI engineering, data architecture, and the tools that actually work.',
}

export default function BlueprintsPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Header */}
      <div className="mb-14">
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-3">
          // technical writing
        </p>
        <h1 className="font-mono text-4xl font-bold text-text mb-4">Blueprints</h1>
        <p className="text-muted text-lg max-w-2xl">
          Deep dives into BI engineering, data architecture, and the tools that actually work in production.
        </p>
      </div>

      {/* Posts grid */}
      <div className="grid gap-5">
        {sorted.map((post) => (
          <BlogCard key={post.slug} post={post as Parameters<typeof BlogCard>[0]['post']} />
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="card p-12 text-center">
          <p className="font-mono text-muted text-sm">// no posts yet</p>
        </div>
      )}
    </div>
  )
}
