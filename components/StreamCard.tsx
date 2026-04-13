interface StreamPost {
  title: string
  date: string
  url: string
}

interface StreamCardProps {
  post: StreamPost
}

export default function StreamCard({ post }: StreamCardProps) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block card p-5 hover:border-blue/30 transition-all group"
    >
      <div className="flex items-start gap-4">
        {/* Date column */}
        <div className="flex-shrink-0 w-24">
          <span className="font-mono text-xs text-muted">{post.date}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-text text-sm leading-relaxed group-hover:text-blue transition-colors line-clamp-2">
            {post.title}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-blue mt-0.5">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </a>
  )
}
