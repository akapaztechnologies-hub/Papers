import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, type MouseEvent, type PointerEvent } from 'react'
import { cn } from '../../lib/cn'
import { useLenis } from '../../lib/smooth-scroll'
import { EASE } from './motion'

export type LightboxItem = {
  id: string
  full: string
  alt: string
  title: string
  category: string
  width: number
  height: number
}

interface LightboxProps {
  items: LightboxItem[]
  index: number
  /** Accessible name for the dialog. */
  label: string
  onNavigate: (index: number) => void
  onClose: () => void
}

/** Full-screen image viewer with button, keyboard and swipe navigation. Render inside `AnimatePresence`. */
export function Lightbox({ items, index, label, onNavigate, onClose }: LightboxProps) {
  const lenis = useLenis()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const swipeStart = useRef<number | null>(null)
  const swiped = useRef(false)
  const total = items.length
  const item = items[index]
  const go = (delta: number) => onNavigate((index + delta + total) % total)

  useEffect(() => {
    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      returnFocus?.focus({ preventScroll: true })
    }
  }, [lenis])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowRight') onNavigate((index + 1) % total)
      else if (event.key === 'ArrowLeft') onNavigate((index - 1 + total) % total)
      else if (event.key === 'Tab' && dialogRef.current) {
        // Keep keyboard focus inside the viewer.
        const buttons = dialogRef.current.querySelectorAll<HTMLElement>('button')
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, total, onNavigate, onClose])

  // Warm the cache for the neighbouring images so paging feels instant.
  useEffect(() => {
    for (const offset of [1, -1]) {
      const image = new Image()
      image.src = items[(index + offset + total) % total].full
    }
  }, [items, index, total])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeStart.current = event.clientX
    swiped.current = false
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return
    const distance = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(distance) < 50) return
    swiped.current = true
    go(distance < 0 ? 1 : -1)
  }

  const onStageClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !swiped.current) onClose()
  }

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      data-lenis-prevent
      className="fixed inset-0 z-[70] flex flex-col bg-ink-950/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {/* On phones held sideways the bars slim down so the photo keeps most of the height. */}
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6 short:py-2">
        <p aria-live="polite" className="text-xs font-semibold tracking-[0.25em] text-white/50 tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="grid size-11 place-items-center rounded-full text-white ring-1 ring-white/20 transition hover:bg-white/10"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-4 sm:px-24"
        onClick={onStageClick}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={item.id}
            src={item.full}
            alt={item.alt}
            width={item.width}
            height={item.height}
            draggable={false}
            className="h-auto max-h-full w-auto max-w-full rounded-2xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] select-none"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
          />
        </AnimatePresence>
        {total > 1 && (
          <>
            <NavButton direction="previous" onClick={() => go(-1)} className="left-3 sm:left-8" />
            <NavButton direction="next" onClick={() => go(1)} className="right-3 sm:right-8" />
          </>
        )}
      </div>

      <div className="px-5 pt-5 pb-7 text-center sm:pb-9 short:pt-2 short:pb-3">
        <p className="text-[10px] font-semibold tracking-[0.3em] text-gold-300 uppercase short:hidden">{item.category}</p>
        <p className="mt-2 font-serif text-2xl text-paper-50 sm:text-3xl short:mt-0 short:text-xl">{item.title}</p>
      </div>
    </motion.div>
  )
}

function NavButton({
  direction,
  onClick,
  className,
}: {
  direction: 'previous' | 'next'
  onClick: () => void
  className: string
}) {
  const Icon = direction === 'next' ? ChevronRight : ChevronLeft
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'next' ? 'Next image' : 'Previous image'}
      className={cn(
        'absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-ink-950/60 text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15 sm:size-12',
        className,
      )}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  )
}
