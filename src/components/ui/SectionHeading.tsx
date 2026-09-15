import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './motion'

export const headingClass = 'font-serif text-[clamp(2.6rem,5.4vw,4.9rem)] font-medium leading-[0.98] tracking-[-0.015em]'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  onDark?: boolean
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, onDark, align = 'left', className }: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={cn(centered && 'mx-auto text-center', className)}>
      <Reveal>
        <Eyebrow onDark={onDark} className={cn(centered && 'justify-center')}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={cn(headingClass, 'mt-6 text-balance', onDark ? 'text-paper-50' : 'text-ink-900')}>{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              'mt-7 max-w-xl text-[17px] leading-relaxed text-pretty',
              centered && 'mx-auto',
              onDark ? 'text-white/60' : 'text-ink-900/65',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
