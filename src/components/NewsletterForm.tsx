'use client'

import { useState } from 'react'
import ArrowRight from 'lucide-react'

type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<NewsletterStatus>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Check your inbox to confirm your subscription!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-glp-cream rounded-2xl p-8 text-center w-full max-w-md mx-auto my-8">
      <h3 className="text-2xl font-bold text-glp-dark mb-4">
        Want More GLP-1 Nutrition Tips?
      </h3>
      <p className="text-gray-600 mb-6 text-base">
        Get weekly recipes and nutrition advice delivered straight to your inbox. No spam, ever.
      </p>

      {status === 'success' ? (
        <div className="bg-green-50 text-green-800 p-4 rounded-xl">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === 'loading'}
              className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-glp-teal disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading' || !email}
              className="px-8 py-3 bg-glp-coral text-white font-semibold rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {status === 'loading' ? 'Subscribing...' : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          {status === 'error' && (
            <p className="text-red-600 text-sm mt-3">{message}</p>
          )}
        </form>
      )}

      <p className="text-xs text-gray-500 mt-4">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  )
}
