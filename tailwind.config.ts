import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'glp-teal': '#0D9488',
        'glp-teal-light': '#5EEAD4',
        'glp-teal-dark': '#0F766E',
        'glp-coral': '#F97316',
        'glp-cream': '#FEF3C7',
        'glp-sage': '#A7F3D0',
        'glp-dark': '#134E4A',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#334155',
            a: {
              color: '#0D9488',
              textDecoration: 'none',
              fontWeight: '600',
            },
            'a:hover': {
              color: '#0F766E',
              textDecoration: 'underline',
            },
            h2: { color: '#134E4A' },
            h3: { color: '#134E4A' },
            strong: { color: '#0f172a' },
            blockquote: {
              borderLeftColor: '#0D9488',
              color: '#0f172a',
              fontStyle: 'normal',
            },
            code: {
              color: '#0f172a',
              backgroundColor: '#f1f5f9',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.15rem',
              paddingBottom: '0.15rem',
              borderRadius: '0.375rem',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      },
    },
  },
  plugins: [typography],
}
export default config
