import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

function esc(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export async function GET() {
  const { getAllArticles } = await import('@/lib/articles')
  const articles = await getAllArticles()

  const siteUrl = 'https://glpgrub.com'
  const now = new Date().toUTCString()

  const items = articles
    .map((a) => {
      const url = `${siteUrl}/articles/${a.slug}`
      return `\n<item>\n<title>${esc(a.title)}</title>\n<link>${url}</link>\n<guid>${url}</guid>\n<pubDate>${new Date(a.date).toUTCString()}</pubDate>\n<description>${esc(a.excerpt || '')}</description>\n</item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>GLPGrub</title>
<link>${siteUrl}</link>
<description>GLP-1 nutrition guidance, protein-forward recipes, and practical tips.</description>
<language>en-us</language>
<lastBuildDate>${now}</lastBuildDate>
${items}
</channel>
</rss>
`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
