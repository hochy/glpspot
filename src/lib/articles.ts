import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

function transformAdmonitions(md: string) {
  // Supports GitHub-style callouts written as blockquotes:
  // > [!TIP] Title
  // > Body line 1
  // > Body line 2
  //
  // Types: TIP, NOTE, WARNING
  const re = /^>\s*\[!(TIP|NOTE|WARNING)\]\s*(.*)\n((?:>.*\n)+)/gm

  return md.replace(re, (_m, kind, title, body) => {
    const k = String(kind).toUpperCase()
    const css = k === 'WARNING' ? 'glp-callout glp-callout-warn' : k === 'TIP' ? 'glp-callout glp-callout-success' : 'glp-callout glp-callout-info'

    const cleaned = String(body)
      .split('\n')
      .map((line) => line.replace(/^>\s?/, ''))
      .join('\n')
      .trim()

    const safeTitle = (title || (k === 'WARNING' ? 'Important' : k === 'TIP' ? 'Tip' : 'Note')).replaceAll('<', '&lt;').replaceAll('>', '&gt;')

    // Let remark handle the inner markdown for the body by leaving it as markdown inside a div.
    // We wrap it with a title line.
    return `\n<div class="${css}">\n<div class="glp-callout-title">${safeTitle}</div>\n\n${cleaned}\n</div>\n`
  })
}

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  content: string
  type?: 'article' | 'recipe'
  recipe?: {
    servings?: string
    prepTime?: string
    protein?: string
    calories?: string
  }
}

export async function getAllArticles(): Promise<Article[]> {
  // Ensure directory exists
  if (!fs.existsSync(articlesDirectory)) {
    fs.mkdirSync(articlesDirectory, { recursive: true })
  }

  const fileNames = fs.readdirSync(articlesDirectory)
  const mdxFiles = fileNames.filter(
    (fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx')
  )

  const allArticles = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const transformed = transformAdmonitions(content)
      const processedContent = await remark().use(html, { sanitize: false }).process(transformed)
      const htmlContent = processedContent.toString()

      return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || 'General',
        readTime: data.readTime || '5 min read',
        content: htmlContent,
        type: (data.type as 'article' | 'recipe') || 'article',
        recipe: data.type === 'recipe'
          ? {
              servings: data.servings,
              prepTime: data.prepTime,
              protein: data.protein,
              calories: data.calories,
            }
          : undefined,
      }
    })
  )

  // Sort by date (newest first)
  return allArticles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const transformed = transformAdmonitions(content)
    const processedContent = await remark().use(html, { sanitize: false }).process(transformed)
    const htmlContent = processedContent.toString()

    return {
      slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category || 'General',
      readTime: data.readTime || '5 min read',
      content: htmlContent,
      type: (data.type as 'article' | 'recipe') || 'article',
      recipe: data.type === 'recipe'
        ? {
            servings: data.servings,
            prepTime: data.prepTime,
            protein: data.protein,
            calories: data.calories,
          }
        : undefined,
    }
  } catch {
    return null
  }
}
