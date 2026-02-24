'use client'

import { useEffect, useMemo, useState } from 'react'

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

type Heading = {
  id: string
  text: string
  level: number
}

export default function ArticleEnhancements({
  contentSelector,
}: {
  contentSelector: string
}) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const root = document.querySelector(contentSelector) as HTMLElement | null
    if (!root) return

    const nodes = Array.from(root.querySelectorAll('h2, h3')) as HTMLElement[]
    const seen = new Map<string, number>()

    const hs: Heading[] = nodes
      .map((el) => {
        const level = el.tagName === 'H2' ? 2 : 3
        const text = (el.textContent || '').trim()
        if (!text) return null

        let base = slugify(text)
        if (!base) base = 'section'

        const count = (seen.get(base) || 0) + 1
        seen.set(base, count)

        const id = count === 1 ? base : `${base}-${count}`
        el.id = el.id || id

        return { id: el.id, text, level }
      })
      .filter(Boolean) as Heading[]

    setHeadings(hs)

    const onScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      const pct = total > 0 ? Math.min(100, Math.max(0, (el.scrollTop / total) * 100)) : 0
      setProgress(pct)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [contentSelector])

  const hasToc = useMemo(() => headings.length >= 3, [headings.length])

  return (
    <>
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
        <div
          className="h-1 bg-glp-coral"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* TOC (only when helpful) */}
      {hasToc && (
        <aside className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="text-sm font-semibold text-slate-900">On this page</div>
          <ul className="mt-3 space-y-2 text-sm">
            {headings.map((h) => (
              <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                <a
                  href={`#${h.id}`}
                  className="text-slate-700 hover:text-glp-teal"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  )
}
