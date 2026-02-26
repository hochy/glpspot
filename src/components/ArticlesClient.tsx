'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Clock, Search } from 'lucide-react'
import type { Article } from '@/lib/articles'

function getArticleImage(slug: string): string {
  const images: Record<string, string> = {
    // Getting Started
    'first-week-ozempic': '/images/ozempic.jpg',
    'weeks-2-4-progression': '/images/ozempic.jpg',
    'tirzepatide-mounjaro-guide': '/images/ozempic.jpg',
    // Health Tips
    'hydration-habit': '/images/hydration.jpg',
    'fatigue-energy-glp1': '/images/hydration.jpg',
    'nausea-triggers-management': '/images/hydration.jpg',
    'constipation-solutions-glp1': '/images/hydration.jpg',
    'vitamins-supplements-glp1': '/images/hydration.jpg',
    'protein-deficit-muscle-loss': '/images/protein.jpg',
    'hair-loss-glp1': '/images/hydration.jpg',
    'exercise-glp1': '/images/protein.jpg',
    'sleep-issues-glp1': '/images/hydration.jpg',
    'gallbladder-glp1': '/images/hydration.jpg',
    'alcohol-glp1': '/images/hydration.jpg',
    'mental-health-body-image': '/images/hydration.jpg',
    'transitioning-off-glp1': '/images/protein.jpg',
    // Practical Tips
    'grocery-shopping-101': '/images/grocery.jpg',
    'high-protein-recipes': '/images/protein.jpg',
    'meal-prep-smaller-appetites': '/images/grocery.jpg',
    'navigating-weight-loss-plateaus': '/images/protein.jpg',
    'social-situations-glp1': '/images/grocery.jpg',
    'dining-out-glp1-restaurants': '/images/grocery.jpg',
    'protein-snacks-low-appetite': '/images/protein.jpg',
    'protein-supplements-guide': '/images/protein.jpg',
    // Recipes
    'greek-yogurt-protein-bowl': '/images/protein.jpg',
    'turkey-cheese-rollups': '/images/protein.jpg',
    'electrolyte-lemonade': '/images/hydration.jpg',
    'protein-smoothie': '/images/protein.jpg',
    'protein-oatmeal': '/images/protein.jpg',
    'egg-muffins': '/images/protein.jpg',
    'tuna-salad': '/images/protein.jpg',
    'cottage-cheese-bowl': '/images/protein.jpg',
    'protein-pancakes': '/images/protein.jpg',
    'bone-broth': '/images/hydration.jpg',
    'protein-pudding': '/images/protein.jpg',
    'chicken-salad': '/images/protein.jpg',
    'turkey-burger': '/images/protein.jpg',
    'protein-energy-bites': '/images/protein.jpg',
    'baked-salmon': '/images/protein.jpg',
  }
  return images[slug] || '/images/hero.jpg'
}

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('All')

  const categories = useMemo(() => {
    const set = new Set<string>()
    for (const a of articles) set.add(a.category || 'General')
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [articles])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((a) => {
      const catOk = category === 'All' ? true : a.category === category
      if (!catOk) return false
      if (!q) return true
      const hay = `${a.title} ${a.excerpt} ${a.category}`.toLowerCase()
      return hay.includes(q)
    })
  }, [articles, query, category])

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles (protein, hydration, grocery…)"
            className="w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-glp-teal"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-glp-teal"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => {
          const imageUrl = getArticleImage(article.slug)

          return (
            <article
              key={article.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm mb-3">
                  <span className="bg-glp-sage/60 text-glp-dark px-3 py-1 rounded-full font-medium">
                    {article.category}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-glp-dark mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-slate-600 mb-4 text-sm line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                  <span>{article.date}</span>
                </div>

                <Link
                  href={`/articles/${article.slug}`}
                  className="mt-5 inline-flex items-center text-glp-teal font-semibold hover:text-glp-teal-dark"
                >
                  Read article →
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 text-center text-slate-600">
          No matches. Try a different search term.
        </div>
      )}
    </div>
  )
}
