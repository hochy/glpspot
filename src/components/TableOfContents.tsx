'use client'

import { useEffect, useState } from 'react'
import { List, Menu } from 'lucide-react'

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    // Extract H2 and H3 headings from content
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headingElements = doc.querySelectorAll('h2, h3')

    const extractedHeadings: Array<{ id: string; text: string; level: number }> = []

    // Keep track of section counters for unique IDs
    const sectionCounters: Record<string, number> = { h2: 0, h3: 0 }

    headingElements.forEach((heading) => {
      const text = heading.textContent || ''
      const level = heading.tagName === 'H2' ? 2 : 3
      const tagKey = heading.tagName.toLowerCase()

      // Skip if text is empty
      if (!text.trim()) return

      // Skip headings that are too short (section markers, etc)
      if (text.trim().length < 5) return

      // Skip certain headings we don't want in TOC
      const skipPatterns = ['related', 'newsletter', 'cta']
      if (skipPatterns.some((pattern) => text.toLowerCase().includes(pattern))) return

      // Generate a clean ID from the heading text
      const sectionNum = ++sectionCounters[tagKey]
      const cleanId = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .substring(0, 50) + `-${sectionNum}`

      extractedHeadings.push({
        id: cleanId,
        text: text.trim(),
        level,
      })
    })

    setHeadings(extractedHeadings)

    // Add IDs to headings in the DOM and track active heading
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    })

    // Add IDs to headings and set up observers
    const articleContent = document.getElementById('article-content')
    if (articleContent) {
      const articleHeadings = articleContent.querySelectorAll('h2, h3')
      articleHeadings.forEach((heading, index) => {
        if (extractedHeadings[index]) {
          heading.id = extractedHeadings[index].id
          observer.observe(heading)
        }
      })
    }

    return () => observer.disconnect()
  }, [content])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  if (headings.length < 3) {
    return null
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-base font-semibold text-slate-900 mb-3">
        <List className="w-5 h-5 text-glp-teal" />
        Table of Contents
      </div>
      <nav className="bg-slate-50 rounded-xl border border-slate-100 p-4">
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`block py-1.5 px-3 text-sm rounded-lg transition-all ${
                  activeId === heading.id
                    ? 'bg-glp-teal text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                } ${heading.level === 3 ? 'ml-4' : ''}`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
