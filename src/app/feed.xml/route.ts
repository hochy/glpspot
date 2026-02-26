import { getAllArticles } from '@/lib/articles'

export async function GET() {
  const articles = await getAllArticles()
  const baseUrl = 'https://glpgrub.com'

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GLPGrub - GLP-1 Nutrition Guide</title>
    <description>Practical nutrition guidance, protein-forward recipes, and real-world tips for people taking GLP-1 medications.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    ${articles
      .map(
        (article) => `    <item>
      <title>${article.title}</title>
      <description>${article.excerpt}</description>
      <link>${baseUrl}/articles/${article.slug}</link>
      <pubDate>${article.date ? new Date(article.date).toUTCString() : new Date().toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/articles/${article.slug}</guid>
      <category>${article.category}</category>
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
