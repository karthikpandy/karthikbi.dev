interface BlogPost {
  slug: string
  title: string
  description: string
  tags: string[]
  status: 'live' | 'coming-soon'
  date: string
  url?: string
  codeSnippet?: string
}

interface BlogCardProps {
  post: BlogPost
}

const tagColor: Record<string, string> = {
  'Power BI':       'bg-amber/10 text-amber border border-amber/25',
  'Databricks':     'bg-orange-500/10 text-orange-400 border border-orange-500/25',
  'Microsoft Fabric': 'bg-blue/10 text-blue border border-blue/25',
  'Fabric':         'bg-blue/10 text-blue border border-blue/25',
  'CI/CD':          'bg-purple/10 text-purple border border-purple/25',
  'Azure DevOps':   'bg-blue/10 text-blue border border-blue/25',
  'Architecture':   'bg-green/10 text-green border border-green/25',
}

function getTagColor(tag: string) {
  return tagColor[tag] ?? 'bg-surface text-muted border border-border'
}

export default function BlogCard({ post }: BlogCardProps) {
  const isLive = post.status === 'live'
  const cardContent = (
    <div className="card p-6 hover:border-blue/30 transition-all group">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className={`font-mono text-xs px-2 py-0.5 rounded ${getTagColor(tag)}`}>
              {tag}
            </span>
          ))}
        </div>
        <span
          className={`font-mono text-xs px-2 py-0.5 rounded whitespace-nowrap border ${
            isLive
              ? 'text-green bg-green/10 border-green/30'
              : 'text-amber bg-amber/10 border-amber/30'
          }`}
        >
          {isLive ? 'live' : 'coming soon'}
        </span>
      </div>

      {/* Title */}
      <h2 className={`text-lg font-semibold text-text mb-2 ${isLive ? 'group-hover:text-blue transition-colors' : ''}`}>
        {post.title}
      </h2>

      {/* Description */}
      <p className="text-muted text-sm leading-relaxed mb-4">{post.description}</p>

      {/* Code snippet */}
      {post.codeSnippet && (
        <pre className="bg-bg border border-border rounded p-3 text-xs font-mono text-green overflow-x-auto mb-4">
          <code>{post.codeSnippet}</code>
        </pre>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted">{post.date}</span>
        {isLive && (
          <span className="font-mono text-xs text-blue opacity-0 group-hover:opacity-100 transition-opacity">
            read →
          </span>
        )}
      </div>
    </div>
  )

  if (isLive && post.url) {
    return (
      <a href={post.url} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    )
  }

  return <div>{cardContent}</div>
}
