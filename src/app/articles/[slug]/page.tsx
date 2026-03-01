import Link from 'next/link'
import Script from 'next/script'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { notFound } from 'next/navigation'
import ArticleEnhancements from '@/components/ArticleEnhancements'
import NewsletterForm from '@/components/NewsletterForm'
import TableOfContents from '@/components/TableOfContents'
import Breadcrumbs from '@/components/Breadcrumbs'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  const { getArticleBySlug } = await import('@/lib/articles')
  return getArticleBySlug(slug)
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'Article - The GLPSpot',
    }
  }

  const canonicalUrl = `https://theglpspot.com/articles/${slug}`

  return {
    title: `${article.title} - The GLPSpot`,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} - The GLPSpot`,
      description: article.excerpt,
      url: canonicalUrl,
      images: [getHeroImage(slug)],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      images: [getHeroImage(slug)],
    },
  }
}

export async function generateStaticParams() {
  const { getAllArticles } = await import('@/lib/articles')
  const articles = await getAllArticles()

  return articles.map((article) => ({
    slug: article.slug,
  }))
}

// Get hero image based on article slug
function getHeroImage(slug: string): string {
  const images: Record<string, string> = {
    // Getting Started
    'first-week-ozempic': '/images/ozempic.webp',
    'weeks-2-4-progression': '/images/ozempic.webp',
    'tirzepatide-mounjaro-guide': '/images/ozempic.webp',
    // Health Tips
    'hydration-habit': '/images/hydration.webp',
    'fatigue-energy-glp1': '/images/hydration.webp',
    'nausea-triggers-management': '/images/hydration.webp',
    'constipation-solutions-glp1': '/images/hydration.webp',
    'vitamins-supplements-glp1': '/images/white-bowl-vegetables.webp',
    'protein-deficit-muscle-loss': '/images/protein.webp',
    'hair-loss-glp1': '/images/hydration.webp',
    'exercise-glp1': '/images/protein.webp',
    'sleep-issues-glp1': '/images/hydration.webp',
    'gallbladder-glp1': '/images/hydration.webp',
    'alcohol-glp1': '/images/hydration.webp',
    'mental-health-body-image': '/images/hydration.webp',
    'transitioning-off-glp1': '/images/protein.webp',
    // Practical Tips
    'grocery-shopping-101': '/images/sliced-vegetables-bowl.webp',
    'high-protein-recipes': '/images/colorful-smoothie-bowls.webp',
    'meal-prep-smaller-appetites': '/images/meal-prep.webp',
    'navigating-weight-loss-plateaus': '/images/protein.webp',
    'social-situations-glp1': '/images/cooked-food-tray.webp',
    'dining-out-glp1-restaurants': '/images/cooked-food-tray.webp',
    'social-eating-restaurants-parties': '/images/cooked-food-tray.webp',
    'protein-snacks-low-appetite': '/images/protein.webp',
    'protein-supplements-guide': '/images/protein.webp',
    // Recipes - Smoothies & Drinks
    'electrolyte-lemonade': '/images/hydration.webp',
    'protein-smoothie': '/images/protein-smoothie.webp',
    'protein-breakfast-scramble': '/images/vegetable-bowl-rice.webp',
    // Recipes - Breakfast
    'protein-oatmeal': '/images/vegetable-bowl-rice.webp',
    'egg-muffins': '/images/vegetable-bowl-rice.webp',
    'protein-pancakes': '/images/colorful-smoothie-bowls.webp',
    'protein-waffles': '/images/colorful-smoothie-bowls.webp',
    'protein-oatmeal-cookies': '/images/colorful-smoothie-bowls.webp',
    // Recipes - Cold Dishes & Salads
    'greek-yogurt-protein-bowl': '/images/protein-smoothie.webp',
    'turkey-cheese-rollups': '/images/white-bowl-vegetables.webp',
    'tuna-salad': '/images/green-purple-salad.webp',
    'cottage-cheese-bowl': '/images/white-bowl-vegetables.webp',
    'chicken-salad': '/images/green-purple-salad.webp',
    // Recipes - Cooked Meals
    'bone-broth': '/images/vegetable-bowl-rice.webp',
    'turkey-burger': '/images/cooked-food-tray.webp',
    'protein-pudding': '/images/protein-smoothie.webp',
    'protein-energy-bites': '/images/white-bowl-vegetables.webp',
    'baked-salmon': '/images/cooked-food-tray.webp',
    'shrimp-skewers': '/images/cooked-food-tray.webp',
    'lentil-soup': '/images/vegetable-bowl-rice.webp',
    'chicken-parmesan': '/images/cooked-food-tray.webp',
    'fish-tacos': '/images/cooked-food-tray.webp',
    'edamame': '/images/vegetable-bowl-rice.webp',
  }
  return images[slug] || '/images/hero.webp'
}

async function getAllArticles() {
  const { getAllArticles } = await import('@/lib/articles')
  return getAllArticles()
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)
  const heroImage = getHeroImage(slug)

  if (!article) {
    notFound()
  }

  const allArticles = await getAllArticles()
  const related = allArticles
    .filter((a) => a.slug !== slug)
    .filter((a) => (article.category ? a.category === article.category : true))
    .slice(0, 3)

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: `https://theglpspot.com${heroImage}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: 'The GLPSpot',
      url: 'https://theglpspot.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The GLPSpot',
      url: 'https://theglpspot.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://theglpspot.com/images/hero.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://theglpspot.com/articles/${slug}`,
    },
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Articles', href: '/articles' },
          { label: article.category || 'Article' },
          { label: article.title },
        ]}
      />

      {/* JSON-LD Structured Data */}
      <Script
        id="article-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Header with Hero Image */}
      <div className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-glp-teal/80" />
        </div>
        <div className="relative py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/articles"
              className="inline-flex items-center text-glp-teal-light hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
            <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-glp-teal-light">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar: Table of Contents (desktop) */}
          <aside className="hidden lg:block lg:sticky lg:top-20 lg:self-start">
            <TableOfContents content={article.content} />
          </aside>

          {/* Main Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            {/* Mobile TOC */}
            <div className="mb-8 lg:hidden">
              <TableOfContents content={article.content} />
            </div>

            <ArticleEnhancements contentSelector="#article-content" />

            <div
              id="article-content"
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 pb-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-glp-dark">Related articles</h3>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="rounded-xl border border-slate-100 p-4 hover:border-glp-teal/40 hover:bg-slate-50 transition-colors"
                >
                  <div className="text-xs font-semibold text-glp-teal">{a.category}</div>
                  <div className="mt-1 font-bold text-slate-900 line-clamp-2">{a.title}</div>
                  <div className="mt-2 text-sm text-slate-600 line-clamp-2">{a.excerpt}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <NewsletterForm />
      </div>
    </main>
  )
}
