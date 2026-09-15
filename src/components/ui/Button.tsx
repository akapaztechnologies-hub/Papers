import { ArrowUpRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { SmoothLink } from './SmoothLink'

type Variant = 'gold' | 'bronze' | 'ink' | 'outlineLight' | 'outlineDark'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  gold: 'bg-gold-400 text-ink-950 shadow-[0_18px_40px_-18px_rgba(205,176,121,0.8)] hover:bg-gold-300',
  bronze:
    'bg-linear-to-r from-gold-700 via-gold-600 to-gold-500 text-paper-50 shadow-[0_18px_40px_-18px_rgba(117,89,44,0.8)] hover:from-gold-600 hover:to-gold-400',
  ink: 'bg-ink-900 text-paper-50 shadow-[0_18px_40px_-20px_rgba(17,17,40,0.8)] hover:bg-ink-700',
  outlineLight: 'text-white ring-1 ring-inset ring-white/25 hover:bg-white/[0.06] hover:ring-white/50',
  outlineDark: 'text-ink-900 ring-1 ring-inset ring-ink-900/20 hover:bg-ink-900/[0.04] hover:ring-ink-900/45',
}

/** Minimum heights (not fixed ones) let a label wrap cleanly on the narrowest screens. */
const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-5 py-2 text-[13px]',
  md: 'min-h-12 px-6 py-2.5 text-sm',
  lg: 'min-h-14 px-5 py-3 text-[14px] sm:px-8 sm:text-[15px]',
}

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
  icon?: boolean
  children: ReactNode
}

export function Button({ variant = 'gold', size = 'md', icon = true, className, children, ...rest }: ButtonProps) {
  return (
    <SmoothLink
      {...rest}
      className={cn(
        'group relative inline-flex max-w-full shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-full text-center leading-snug font-semibold tracking-[0.02em] transition-all duration-500 ease-premium',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent_20%,rgba(255,255,255,0.35)_50%,transparent_80%)] transition-transform duration-1000 ease-premium group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden
          className="relative size-4 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </SmoothLink>
  )
}
