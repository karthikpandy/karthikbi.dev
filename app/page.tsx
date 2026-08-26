import Image from 'next/image'
import Link from 'next/link'
import posts from '@/data/posts-blog.json'

export const metadata = {
  title: 'karthikbi.dev',
  description: 'Writing about BI engineering, data architecture, and the modern data stack.',
}

function Categories({ tags }: { tags: string[] }) {
  return (
    <p className="text-[13px] text-gray-400">
      {tags.map((tag, i) => (
        <span key={tag}>
          {i > 0 && ', '}
          <span className="tag-link">{tag}</span>
        </span>
      ))}
    </p>
  )
}

export default function Home() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">

      {/* Bio header — editorial */}
      <div className="mb-10 pb-8 border-b border-gray-100">
        <div className="flex items-start justify-between gap-5 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Karthik BI</h1>
            <p className="text-gray-500 text-sm mt-1.5">Senior BI Engineer · LinkedIn</p>
          </div>
          <Image
            src="/hero.png"
            alt="Karthik BI"
            width={72}
            height={72}
            className="rounded-full object-cover flex-shrink-0"
          />
        </div>
        <p className="text-sm text-gray-500 leading-relaxed max-w-md">
          18 years turning data into decisions across manufacturing, finance, and tech.
          Here I share what I learn.
        </p>
      </div>

      {/* Section label */}
      <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-5">
        Writing
      </p>

      {/* Article cards */}
      <div className="space-y-3">
        {sorted.map((post) => {
          const isLive = post.status === 'live'

          const inner = (
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group">

              {/* Title */}
              <h2 className="text-base font-semibold text-gray-900 group-hover:text-[#7C7BFF] transition-colors leading-snug mb-1">
                {post.title}
              </h2>

              {/* Date + status */}
              <div className="flex items-center gap-2 mb-1.5">
                <time className="font-mono text-[11px] text-gray-400">{post.date}</time>
                {!isLive && (
                  <span className="font-mono text-[11px] text-gray-400 italic">coming soon</span>
                )}
              </div>

              {/* Categories — plain text byline, no badges */}
              {post.tags.length > 0 && (
                <div className="mb-2">
                  <Categories tags={post.tags} />
                </div>
              )}

              {/* Description — max-w-prose caps line length at ~65ch regardless of card width */}
              <p className="text-sm text-gray-500 leading-relaxed max-w-prose">{post.description}</p>

              {isLive && (
                <p className="mt-3 text-xs font-mono text-[#7C7BFF] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read →
                </p>
              )}
            </div>
          )

          const isInternal = post.url?.startsWith('/')
          return isLive && post.url ? (
            isInternal ? (
              <Link key={post.slug} href={post.url} className="block">{inner}</Link>
            ) : (
              <a key={post.slug} href={post.url} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
            )
          ) : (
            <div key={post.slug}>{inner}</div>
          )
        })}
      </div>

      {sorted.length === 0 && (
        <p className="font-mono text-xs text-gray-400 py-16 text-center">// no posts yet</p>
      )}
    </div>
  )
}
