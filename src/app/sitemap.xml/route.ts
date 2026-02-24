import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const { getAllArticles } = await import('@/lib/articles')
  const articles = await getAllArticles()

  const siteUrl = 'https://glpgrub.com'
  const urls = [
    { loc: `${siteUrl}/`, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/about`, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/articles`, lastmod: new Date().toISOString() },
    ...articles.map((a) => ({
      loc: `${siteUrl}/articles/${a.slug}`,
      lastmod: new Date(a.date).toISOString(),
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`
  )
  .join('\n')}
</urlset>
`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
