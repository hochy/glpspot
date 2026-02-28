import Link from 'next/link'
import { ArrowRight, ChefHat, Heart, Scale } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The GLPSpot - Your GLP-1 Journey Companion',
  description: 'Practical GLP-1 nutrition guidance, protein-forward recipes, and real-world tips for people taking Ozempic, Wegovy, and Mounjaro. Expert advice for smaller appetites.',
  alternates: {
    canonical: 'https://theglpspot.com',
  },
  openGraph: {
    title: 'The GLPSpot - Your GLP-1 Journey Companion',
    description: 'Expert nutrition guidance, protein-rich recipes, and practical tips for people taking GLP-1 medications like Ozempic, Wegovy, and Mounjaro.',
    url: 'https://theglpspot.com',
    siteName: 'The GLPSpot',
  },
}

async function getArticles() {
  const { getAllArticles } = await import('@/lib/articles')
  return getAllArticles()
}

function getRecipes(articles: any[]) {
  return articles.filter((a) => a.type === 'recipe')
}

export default async function Home() {
  const articles = await getArticles()
  const recipes = getRecipes(articles)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-24 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/images/hero.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-glp-teal/90 to-glp-teal-dark/90" />
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your GLP-1 Journey Companion
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-glp-teal-light max-w-3xl mx-auto">
            Expert nutrition guidance, protein-rich recipes, and practical tips 
            for people taking GLP-1 medications like Ozempic, Wegovy, and Mounjaro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#articles"
              className="inline-flex items-center justify-center px-8 py-4 bg-glp-coral text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
            >
              Browse Recipes
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 px-4 bg-glp-cream overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-glp-teal/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-glp-coral/10 blur-3xl" />
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-glp-dark mb-12">
            Why The GLPSpot?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ChefHat className="w-8 h-8" />}
              title="Protein-Forward Recipes"
              description="Meals designed to meet your protein goals even when appetite is reduced."
            />
            <FeatureCard
              icon={<Scale className="w-8 h-8" />}
              title="Portion Guidance"
              description="Smart serving sizes that work with your changing relationship with food."
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Community Support"
              description="Tips and insights from real people on their GLP-1 journey."
            />
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-glp-dark">Start Strong</h2>
              <p className="mt-2 text-slate-600 max-w-2xl">
                Hand-picked guides for the first 30 days: protein, hydration, groceries, and what to expect.
              </p>
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center text-glp-teal font-semibold hover:text-glp-teal-dark"
            >
              See all articles <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <FeaturedTile
              href="/articles/first-week-ozempic"
              title="Your First Week on GLP-1s"
              subtitle="What changes, what’s normal, and how to eat when appetite drops"
              imageUrl="/images/ozempic.jpg"
            />
            <FeaturedTile
              href="/articles/high-protein-recipes"
              title="Protein-Rich Meals That Go Down Easy"
              subtitle="Small portions, big protein—no giant plates required"
              imageUrl="/images/protein.jpg"
            />
            <FeaturedTile
              href="/articles/grocery-shopping-101"
              title="Grocery Shopping 101"
              subtitle="A simple list that makes hitting protein goals way easier"
              imageUrl="/images/grocery.jpg"
            />
          </div>
        </div>
      </section>

      {/* Recipes (if any) */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-glp-dark">Recipes</h2>
              <p className="mt-2 text-slate-600 max-w-2xl">
                Fast, protein-forward meals built for low appetite days.
              </p>
            </div>
            <Link
              href="/recipes"
              className="inline-flex items-center text-glp-teal font-semibold hover:text-glp-teal-dark"
            >
              View recipes <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {recipes.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-8 text-slate-700">
              No recipes yet — once we add <code>type: recipe</code> to any article’s frontmatter, it’ll show up here.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {recipes.slice(0, 2).map((r) => (
                <RecipeCardMini key={r.slug} recipe={r} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-glp-dark">Real-World, No-Shame Help</h2>
          <p className="mt-3 text-center text-slate-600 max-w-3xl mx-auto">
            The goal is simple: keep you nourished, hydrated, and feeling good—without fighting your new appetite.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <QuoteCard
              quote="I stopped forcing huge meals and started focusing on protein first. My energy came back fast."
              by="Protein-first approach"
            />
            <QuoteCard
              quote="The grocery list idea was a game-changer. I finally had ‘easy options’ for low-appetite days."
              by="Simpler shopping"
            />
            <QuoteCard
              quote="The hydration reminders + electrolytes tips saved me. I didn’t realize how much that affected nausea."
              by="Hydration wins"
            />
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section id="articles" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-glp-dark">Latest Articles</h2>
            <Link
              href="/articles"
              className="text-glp-teal hover:text-glp-teal-dark font-medium inline-flex items-center"
            >
              View All
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 6).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="newsletter" className="bg-glp-teal text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Starting Your GLP-1 Journey?</h2>
          <p className="text-lg text-glp-teal-light mb-8">
            Get practical nutrition advice delivered to your inbox. 
            No spam, just helpful tips for your success.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-glp-coral"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-glp-coral text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
      <div className="text-glp-teal mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-glp-dark mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}

function FeaturedTile({
  href,
  title,
  subtitle,
  imageUrl,
}: {
  href: string
  title: string
  subtitle: string
  imageUrl: string
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-900 shadow-sm hover:shadow-lg transition-shadow"
    >
      <img
        src={imageUrl}
        alt={title}
        className="h-64 w-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
      <div className="absolute bottom-0 p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/85 max-w-sm">{subtitle}</p>
        <span className="mt-4 inline-flex items-center text-sm font-semibold text-glp-teal-light">
          Read guide <ArrowRight className="ml-1 w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}

function RecipeCardMini({ recipe }: { recipe: any }) {
  return (
    <Link
      href={`/articles/${recipe.slug}`}
      className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="text-xs font-semibold text-glp-teal">Recipe</div>
      <div className="mt-1 text-xl font-bold text-slate-900 group-hover:text-glp-teal-dark">
        {recipe.title}
      </div>
      <div className="mt-2 text-sm text-slate-600 line-clamp-2">{recipe.excerpt}</div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <div className="text-xs font-semibold text-slate-500">Prep</div>
          <div className="font-bold text-slate-900">{recipe.recipe?.prepTime || '—'}</div>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <div className="text-xs font-semibold text-slate-500">Protein</div>
          <div className="font-bold text-slate-900">{recipe.recipe?.protein || '—'}</div>
        </div>
      </div>
    </Link>
  )
}

function QuoteCard({
  quote,
  by,
}: {
  quote: string
  by: string
}) {
  return (
    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm">
      <p className="text-slate-700 leading-relaxed">“{quote}”</p>
      <p className="mt-4 text-sm font-semibold text-glp-dark">{by}</p>
    </div>
  )
}

interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
}

// Get appropriate image for article category
function getArticleImage(category: string, slug: string): string {
  const images: Record<string, string> = {
    'first-week-ozempic': '/images/ozempic.jpg',
    'high-protein-recipes': '/images/protein.jpg',
    'hydration-habit': '/images/hydration.jpg',
    'grocery-shopping-101': '/images/grocery.jpg',
  }
  return images[slug] || '/images/hero.jpg'
}

function ArticleCard({ article }: { article: Article }) {
  const imageUrl = getArticleImage(article.category, article.slug)

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-glp-teal mb-3">
          <span className="font-medium">{article.category}</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500">{article.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-glp-dark mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
        <Link
          href={`/articles/${article.slug}`}
          className="text-glp-coral font-medium hover:text-orange-600 inline-flex items-center"
        >
          Read More
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </article>
  )
}
