import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

interface PillarRowProps {
  items: { icon: LucideIcon; label: string }[]
  onDark?: boolean
  className?: string
}

/** A row of line icons with small-caps labels, separated by hairlines. */
export function PillarRow({ items, onDark, className }: PillarRowProps) {
  return (
    <ul className={cn('grid grid-cols-2 gap-y-7 sm:grid-cols-4', className)}>
      {items.map(({ icon: Icon, label }, i) => (
        <li
          key={label}
          className={cn(
            'flex flex-col items-center gap-3 px-3 text-center',
            i > 0 && (onDark ? 'sm:border-l sm:border-white/10' : 'sm:border-l sm:border-ink-900/10'),
          )}
        >
          <Icon className={cn('size-7', onDark ? 'text-gold-300' : 'text-gold-700')} strokeWidth={1.2} aria-hidden />
          <span
            className={cn(
              'text-[10px] leading-relaxed font-semibold tracking-[0.24em] uppercase',
              onDark ? 'text-white/60' : 'text-ink-900/65',
            )}
          >
            {label}
          </span>
        </li>
      ))}
    </ul>
  )
}
