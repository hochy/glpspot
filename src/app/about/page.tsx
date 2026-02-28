import Link from 'next/link'
import { Beaker, Heart, Users, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About The GLPSpot - GLP-1 Nutrition Guidance',
  description: 'Learn about The GLPSpot and our mission to provide practical protein-forward nutrition advice for people taking GLP-1 medications like Ozempic, Wegovy, and Mounjaro.',
  alternates: {
    canonical: 'https://theglpspot.com/about',
  },
  openGraph: {
    title: 'About The GLPSpot',
    description: 'Practical GLP-1 nutrition guidance: protein-forward recipes, portion tips, and real-world habits.',
    url: 'https://theglpspot.com/about',
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative text-white py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Fresh, healthy food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-glp-teal/85" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-glp-teal-light hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold">About The GLPSpot</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          {/* Mission */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Beaker className="w-8 h-8 text-glp-teal" />
              <h2 className="text-2xl font-bold text-glp-dark">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              The GLPSpot was created for one simple reason: people taking GLP-1 medications like
              Ozempic, Wegovy, Mounjaro, and Zepbound need practical nutrition advice that
              actually works with their new appetite reality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The advice of "eat less, move more" doesn't cut it when you're suddenly eating
              60% fewer calories but need to maintain muscle, energy, and health. We bridge
              that gap.
            </p>
          </section>

          {/* What We Do */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-glp-teal" />
              <h2 className="text-2xl font-bold text-glp-dark">What We Do</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-glp-dark mb-2">Protein-Forward Recipes</h3>
                <p className="text-gray-600 text-sm">
                  Meals that pack 20-30g protein into manageable portions. No massive plates
                  required.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-glp-dark mb-2">Practical Guidance</h3>
                <p className="text-gray-600 text-sm">
                  Real talk on hydration, side effects, grocery shopping, and staying healthy
                  while eating less.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-glp-dark mb-2">Community Connection</h3>
                <p className="text-gray-600 text-sm">
                  Tips and insights from real people navigating the GLP-1 journey.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-glp-dark mb-2">No Judgment</h3>
                <p className="text-gray-600 text-sm">
                  Whether you're using GLP-1s for diabetes, weight loss, or staying healthy,
                  this is a judgment-free zone.
                </p>
              </div>
            </div>
          </section>

          {/* Who We Serve */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-glp-teal" />
              <h2 className="text-2xl font-bold text-glp-dark">Who This Is For</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-glp-teal font-bold">✓</span>
                <span>People taking or considering GLP-1 medications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-glp-teal font-bold">✓</span>
                <span>Anyone struggling to get enough protein while eating less</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-glp-teal font-bold">✓</span>
                <span>Those looking for practical, realistic nutrition advice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-glp-teal font-bold">✓</span>
                <span>People tired of generic "eat healthy" advice that doesn't address GLP-1 realities</span>
              </li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section className="bg-glp-cream p-6 rounded-xl mb-8">
            <h2 className="text-lg font-bold text-glp-dark mb-3">Medical Disclaimer</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              The GLPSpot provides general nutrition information and recipes. We are not medical
              professionals. Always consult your doctor before making dietary changes,
              especially when taking prescription medications. This site is not affiliated
              with or endorsed by any pharmaceutical company.
            </p>
          </section>

          {/* Contact */}
          <section className="text-center">
            <h2 className="text-xl font-bold text-glp-dark mb-3">Get In Touch</h2>
            <p className="text-gray-600 mb-4">
              Have questions or suggestions? We'd love to hear from you.
            </p>
            <a
              href="mailto:hello@theglpspot.com"
              className="inline-block bg-glp-teal text-white px-6 py-3 rounded-full font-medium hover:bg-glp-teal-dark transition-colors"
            >
              hello@theglpspot.com
            </a>
          </section>
        </div>
      </div>
    </main>
  )
}