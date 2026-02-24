import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ArticlesClient from '@/components/ArticlesClient'

async function getArticles() {
  const { getAllArticles } = await import('@/lib/articles')
  return getAllArticles()
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-glp-teal text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-glp-teal-light hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold">All Articles</h1>
          <p className="text-glp-teal-light mt-2 text-lg">
            Nutrition tips, recipes, and guides for your GLP-1 journey
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-10 px-4">
        <ArticlesClient articles={articles} />
      </div>
    </main>
  )
}
