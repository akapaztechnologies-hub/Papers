import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Eyebrow({ children, onDark, className }: { children: ReactNode; onDark?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em]',
        onDark ? 'text-gold-300' : 'text-gold-700',
        className,
      )}
    >
      <span aria-hidden className={cn('h-px w-8', onDark ? 'bg-gold-400/70' : 'bg-gold-500/80')} />
      {children}
    </p>
  )
}
