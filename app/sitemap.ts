import type { MetadataRoute } from 'next'
import posts from '@/data/posts-blog.json'

export const dynamic = 'force-static'

const SITE = 'https://karthikbi.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const live = posts.filter((p) => p.status === 'live')
  const latest = live.map((p) => p.date).sort().at(-1)

  return [
    { url: `${SITE}/`, lastModified: latest },
    ...live.map((p) => ({ url: `${SITE}/${p.slug}/`, lastModified: p.date })),
  ]
}
