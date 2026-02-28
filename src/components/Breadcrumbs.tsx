import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbsProps {
  items: Array<{ label: string; href?: string }>
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="max-w-5xl mx-auto px-4 py-4">
      <ol className="flex items-center gap-2 text-sm text-slate-600 flex-wrap">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-glp-teal transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-glp-teal transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
