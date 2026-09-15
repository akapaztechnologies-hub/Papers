import Lenis from 'lenis'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

const LenisContext = createContext<Lenis | null>(null)

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const instance = new Lenis({ autoRaf: true, lerp: 0.09 })
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}

/** Smoothly scrolls to a `#id` selector or an absolute offset. */
export function useScrollTo() {
  const lenis = useLenis()

  return useCallback(
    (target: string | number) => {
      if (typeof target === 'number') {
        if (lenis) lenis.scrollTo(target, { duration: 1.4 })
        else window.scrollTo({ top: target })
        return
      }
      const el = document.querySelector<HTMLElement>(target)
      if (!el) return
      if (lenis) lenis.scrollTo(el, { duration: 1.4 })
      else el.scrollIntoView()
      if (target.startsWith('#')) history.replaceState(null, '', target === '#top' ? location.pathname + location.search : target)
    },
    [lenis],
  )
}
