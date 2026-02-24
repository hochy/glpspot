'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Beaker } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Articles' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/about', label: 'About' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href))

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-black text-xl text-glp-dark">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-glp-teal text-white shadow-sm">
              <Beaker className="w-5 h-5" />
            </span>
            <span>GLPGrub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#newsletter"
              className="ml-2 bg-glp-coral text-white px-4 py-2 rounded-full text-sm font-black hover:bg-orange-600 transition-colors shadow-sm"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#newsletter"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-glp-coral text-white px-4 py-3 rounded-xl font-black hover:bg-orange-600 transition-colors text-center shadow-sm"
              >
                Subscribe
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
