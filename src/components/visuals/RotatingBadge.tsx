import { useId, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { safeId } from '../../lib/cylinder'

/** Circular text that slowly rotates around a centred element. */
export function RotatingBadge({ text, className, children }: { text: string; className?: string; children?: ReactNode }) {
  const id = safeId(useId())
  return (
    <div className={cn('relative grid place-items-center', className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
        <defs>
          <path id={`${id}-circle`} d="M100 100m-80 0a80 80 0 1 1 160 0a80 80 0 1 1-160 0" />
        </defs>
        <text className="fill-current" fontSize="13" fontWeight="600" style={{ fontFamily: 'var(--font-sans)' }}>
          <textPath href={`#${id}-circle`} textLength="500" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="relative">{children}</div>
    </div>
  )
}
