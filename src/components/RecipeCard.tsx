import Link from 'next/link'
import { Clock, Users, Beef, Flame } from 'lucide-react'
import type { Article } from '@/lib/articles'

export default function RecipeCard({ recipe }: { recipe: Article }) {
  const r = recipe.recipe || {}

  return (
    <Link
      href={`/articles/${recipe.slug}`}
      className="group block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-glp-teal">Recipe</div>
          <div className="mt-1 text-xl font-bold text-slate-900 group-hover:text-glp-teal-dark">
            {recipe.title}
          </div>
          <div className="mt-2 text-sm text-slate-600 line-clamp-2">{recipe.excerpt}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <Meta icon={<Clock className="w-4 h-4" />} label="Prep" value={r.prepTime || '—'} />
        <Meta icon={<Users className="w-4 h-4" />} label="Serves" value={r.servings || '—'} />
        <Meta icon={<Beef className="w-4 h-4" />} label="Protein" value={r.protein || '—'} />
        <Meta icon={<Flame className="w-4 h-4" />} label="Calories" value={r.calories || '—'} />
      </div>
    </Link>
  )
}

function Meta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <div className="mt-1 font-bold text-slate-900">{value}</div>
    </div>
  )
}
