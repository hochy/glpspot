import Link from 'next/link'
import { Beaker, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl text-glp-dark">
              <Beaker className="w-6 h-6 text-glp-teal" />
              <span>GLPGrub</span>
            </div>
            <p className="mt-3 text-slate-600 max-w-md">
              Practical GLP-1 nutrition guidance: protein-forward recipes, portion tips, and
              real-world habits that work when your appetite changes.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Medical disclaimer: informational only. Not medical advice.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/articles" className="text-slate-600 hover:text-glp-teal">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-glp-teal">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#newsletter" className="text-slate-600 hover:text-glp-teal">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Credits</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-slate-600">
                Photos: Unsplash
              </li>
              <li>
                <a
                  href="https://unsplash.com/license"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-glp-teal"
                >
                  Unsplash License <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} GLPGrub</span>
          <span>Built with Next.js + Tailwind</span>
        </div>
      </div>
    </footer>
  )
}
