import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA measurement_ID || ''

export const metadata: Metadata = {
  metadataBase: new URL('https://glpgrub.com'),
  title: 'GLPGrub - Your GLP-1 Journey Companion',
  description: 'Nutrition advice, meal plans, and resources for people taking GLP-1 medications',
  openGraph: {
    title: 'GLPGrub - Your GLP-1 Journey Companion',
    description: 'Protein-forward recipes and practical nutrition guidance for your GLP-1 journey.',
    url: 'https://glpgrub.com',
    siteName: 'GLPGrub',
    images: ['/images/hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/hero.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        {GA_MEASUREMENT_ID && <Analytics measurementId={GA_MEASUREMENT_ID} />}
      </body>
    </html>
  )
}
