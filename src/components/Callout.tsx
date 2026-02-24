import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react'

const styles = {
  info: {
    wrap: 'border-glp-teal/30 bg-glp-teal/5',
    icon: 'text-glp-teal',
    title: 'text-glp-dark',
  },
  warn: {
    wrap: 'border-amber-300 bg-amber-50',
    icon: 'text-amber-600',
    title: 'text-amber-900',
  },
  success: {
    wrap: 'border-emerald-300 bg-emerald-50',
    icon: 'text-emerald-600',
    title: 'text-emerald-900',
  },
} as const

type Kind = keyof typeof styles

export default function Callout({
  kind = 'info',
  title,
  children,
}: {
  kind?: Kind
  title: string
  children: React.ReactNode
}) {
  const s = styles[kind]
  const Icon = kind === 'warn' ? AlertTriangle : kind === 'success' ? CheckCircle2 : Info

  return (
    <div className={`my-6 rounded-2xl border p-5 ${s.wrap}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${s.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className={`font-bold ${s.title}`}>{title}</div>
          <div className="mt-2 text-sm text-slate-700 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
