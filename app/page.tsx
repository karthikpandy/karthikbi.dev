import posts from '@/data/posts-blog.json'
import FindingsList from '@/components/FindingsList'

export const metadata = {
  title: 'karthikbi.dev',
  description: 'Writing about BI engineering, data architecture, and the modern data stack.',
}

export default function Home() {
  const items = posts
    .filter((p) => p.status === 'live')
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ slug, title, description, tags, url }) => ({ slug, title, description, tags, url }))

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      {/* Hero */}
      <section className="max-w-2xl">
        <p className="mono-label">Karthik BI · Senior BI Engineer</p>
        <h1
          className="mt-4 font-display font-semibold text-ink tracking-snug2 leading-[1.1]"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.9rem)', maxWidth: '20ch' }}
        >
          Beyond the <span className="text-signal">Dashboard</span>
        </h1>
        <p className="mt-4 font-serif text-ink-2" style={{ fontSize: '1.075rem', lineHeight: 1.6 }}>
          18 years turning data into decisions across manufacturing, finance, and tech.
          Here I share what I learn.
        </p>
      </section>

      {/* Findings */}
      <div className="mt-12">
        <FindingsList posts={items} />
      </div>
    </div>
  )
}
