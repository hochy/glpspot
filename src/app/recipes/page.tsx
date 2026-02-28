import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import RecipeCard from '@/components/RecipeCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recipes - The GLPSpot',
  description: 'Protein-forward recipes designed for GLP-1 appetite reality. Small portions with 20-30g protein for Ozempic, Wegovy, and Mounjaro users.',
  alternates: {
    canonical: 'https://theglpspot.com/recipes',
  },
  openGraph: {
    title: 'Recipes - The GLPSpot',
    description: 'Protein-forward, small-portion meals designed for GLP-1 appetite reality.',
    url: 'https://theglpspot.com/recipes',
  },
}

async function getRecipes() {
  const { getAllArticles } = await import('@/lib/articles')
  const all = await getAllArticles()
  return all.filter((a) => a.type === 'recipe')
}

export default async function RecipesPage() {
  const recipes = await getRecipes()

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-glp-teal text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-glp-teal-light hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold">Recipes</h1>
          <p className="text-glp-teal-light mt-2 text-lg">
            Protein-forward, small-portion meals designed for GLP-1 appetite reality.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-10 px-4">
        {recipes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-slate-700">
            No recipes yet. Add frontmatter <code>type: recipe</code> to an article in
            <code>content/articles</code> and it will show up here.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {recipes.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
