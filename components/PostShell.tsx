import Link from 'next/link'
import posts from '@/data/posts-blog.json'
import { readTime } from '@/lib/readTime'

type Props = {
  slug: string
  video?: string
  children: React.ReactNode
}

function TagChip({ label }: { label: string }) {
  return (
    <span className="font-mono text-[0.63rem] uppercase tracking-label text-ink-3 border border-rule-2 px-2 py-[3px] leading-none">
      {label}
    </span>
  )
}

export default function PostShell({ slug, video, children }: Props) {
  const post = posts.find((p) => p.slug === slug)
  const title = post?.title ?? slug
  const tags = post?.tags ?? []
  const rt = readTime[slug]

  return (
    <article className="post mx-auto max-w-2xl px-6 py-12 sm:py-16">
      <Link
        href="/"
        className="font-mono text-[0.63rem] uppercase tracking-label text-ink-3 hover:text-signal transition-colors"
      >
        ← The Stream
      </Link>

      <header className="mt-8 mb-10">
        <p className="mono-label mb-3">Finding</p>
        <h1
          className="font-display font-semibold text-ink tracking-snug2 leading-[1.12]"
          style={{ fontSize: 'clamp(1.85rem, 4.2vw, 2.7rem)', textWrap: 'balance' }}
        >
          {title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <TagChip key={t} label={t} />
          ))}
          {rt && (
            <span className="font-mono text-[0.63rem] uppercase tracking-label text-ink-3">
              {rt} read
            </span>
          )}
        </div>
      </header>

      {video && (
        <div className="my-8 border border-rule bg-panel-sunk">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video}`}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {children}

      <div className="mt-16 pt-8 border-t border-rule">
        <Link
          href="/"
          className="font-mono text-[0.63rem] uppercase tracking-label text-ink-3 hover:text-signal transition-colors"
        >
          ← Back to the Stream
        </Link>
      </div>
    </article>
  )
}
