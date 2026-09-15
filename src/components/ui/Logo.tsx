import markUrl from '../../assets/brand/united-mark.webp'
import { cn } from '../../lib/cn'

/** The United monogram: a gold "U" that grows into a leaf. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={markUrl}
      alt=""
      aria-hidden
      draggable={false}
      className={cn('h-10 w-auto object-contain select-none', className)}
    />
  )
}

export function Logo({ className, onLight }: { className?: string; onLight?: boolean }) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <LogoMark className="shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn('font-serif text-[23px] font-semibold tracking-[0.2em]', onLight ? 'text-ink-900' : 'text-paper-50')}
        >
          UNITED
        </span>
        <span
          className={cn(
            'mt-1 text-[8.5px] font-semibold uppercase tracking-[0.36em]',
            onLight ? 'text-gold-700' : 'text-gold-300',
          )}
        >
          Paper Products
        </span>
      </span>
    </span>
  )
}

/** Centred brand lockup: monogram, wordmark and tagline. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <div className={cn('flex w-fit flex-col items-center text-center', className)}>
      <LogoMark className="h-16 sm:h-[4.5rem]" />
      <p className="text-gold-gradient mt-3 pl-[0.14em] font-serif text-[2.35rem] leading-none font-semibold tracking-[0.14em] sm:text-[2.75rem]">
        UNITED
      </p>
      <p className="mt-2 pl-[0.42em] font-serif text-[13px] font-semibold tracking-[0.42em] text-gold-200 uppercase sm:text-[15px]">
        Paper Products
      </p>
      <p className="mt-3 pl-[0.36em] text-[8.5px] font-semibold tracking-[0.36em] text-white/50 uppercase sm:text-[9.5px]">
        Packaging a brighter tomorrow
      </p>
    </div>
  )
}
