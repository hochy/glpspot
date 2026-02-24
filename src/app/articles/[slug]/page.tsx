import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { notFound } from 'next/navigation'
import ArticleEnhancements from '@/components/ArticleEnhancements'

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
      title: 'Article - GLPGrub',
    }
  }

  return {
    title: `${article.title} - GLPGrub`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} - GLPGrub`,
      description: article.excerpt,
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
    'first-week-ozempic': '/images/ozempic.jpg',
    'high-protein-recipes': '/images/protein.jpg',
    'hydration-habit': '/images/hydration.jpg',
    'grocery-shopping-101': '/images/grocery.jpg',
  }
  return images[slug] || '/images/hero.jpg'
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

  return (
    <main className="min-h-screen bg-slate-50">
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
      <article className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <ArticleEnhancements contentSelector="#article-content" />

          <div
            id="article-content"
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
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

      {/* Related/CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-glp-cream rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-glp-dark mb-4">
            Want More GLP-1 Nutrition Tips?
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Get weekly recipes and nutrition advice delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-glp-teal"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-glp-coral text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
