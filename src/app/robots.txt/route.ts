import { getAllArticles } from '@/lib/articles'

export async function GET() {
  const baseUrl = 'https://theglpspot.com'

  const robotsTxt = `# Allow all crawlers to access the site
User-agent: *
Allow: /

# Disallow any admin or private routes (if added later)
Disallow: /api/
Disallow: /_next/
Disallow: /admin

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay (optional, be polite to crawlers)
Crawl-delay: 1
`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
