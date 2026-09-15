import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useRef, useState } from 'react'
import { layerHighlights, layers } from '../../data/site'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'
import { useScrollTo } from '../../lib/smooth-scroll'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { EASE, Reveal } from '../ui/motion'
import { LayeredCanister } from '../visuals/LayeredCanister'

export function Anatomy() {
  const trackRef = useRef<HTMLDivElement>(null)
  // The pinned, scroll-driven stage needs a tall screen; shorter ones get the static exploded view instead.
  const hasStageRoom = useMediaQuery('(min-width: 1024px) and (min-height: 740px)')
  const reduceMotion = useReducedMotion()
  const scrollDriven = hasStageRoom && !reduceMotion
  const [active, setActive] = useState(0)
  const scrollTo = useScrollTo()

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const scrollExplode = useTransform(smoothProgress, [0.04, 0.3], [0, 1])
  const fullyExploded = useMotionValue(1)
  const explode = scrollDriven ? scrollExplode : fullyExploded

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!scrollDriven) return
    const index = Math.floor(((v - 0.3) / 0.68) * layers.length)
    setActive(Math.min(layers.length - 1, Math.max(0, index)))
  })

  const selectLayer = (index: number) => {
    setActive(index)
    const track = trackRef.current
    if (!scrollDriven || !track) return
    const start = window.scrollY + track.getBoundingClientRect().top
    const distance = track.offsetHeight - window.innerHeight
    scrollTo(start + (0.3 + ((index + 0.5) / layers.length) * 0.68) * distance)
  }

  return (
    <section id="canister" className="relative bg-ink-900 text-white">
      <div ref={trackRef} className={cn('relative', scrollDriven && 'h-[360vh]')}>
        <div
          className={cn(
            'relative overflow-hidden',
            scrollDriven ? 'sticky top-0 flex h-svh items-center pt-14' : 'py-28 sm:py-36',
          )}
        >
          <div aria-hidden className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(45%_55%_at_30%_50%,rgba(205,176,121,0.1),transparent_70%)]" />
            <div className="grain absolute inset-0 opacity-[0.05]" />
          </div>

          <Container className="relative">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:order-2 lg:col-span-5">
                <Reveal>
                  <Eyebrow onDark>Anatomy of a Canister</Eyebrow>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 className="mt-6 font-serif text-[clamp(2.5rem,4.2vw,3.9rem)] leading-[1] font-medium tracking-[-0.015em] text-balance text-paper-50">
                    Built in layers. <em className="text-gold-gradient">Made to protect.</em>
                  </h2>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/60">
                    Each canister brings together food-grade paper board, an insulating silver lamination and a metal lid to
                    keep contents fresh, dry and beautifully presented.
                  </p>
                </Reveal>

                <ol className="mt-9 border-t border-white/10">
                  {layers.map((layer, i) => {
                    const isActive = active === i
                    return (
                      <li key={layer.key} className="border-b border-white/10">
                        <button
                          type="button"
                          onClick={() => selectLayer(i)}
                          aria-expanded={isActive}
                          className="group flex w-full items-start gap-5 py-3.5 text-left"
                        >
                          <span
                            className={cn(
                              'mt-2 text-xs font-semibold tracking-[0.2em] tabular-nums transition-colors duration-500',
                              isActive ? 'text-gold-300' : 'text-white/35',
                            )}
                          >
                            0{i + 1}
                          </span>
                          <span className="flex-1">
                            <span
                              className={cn(
                                'block font-serif text-[1.55rem] leading-snug transition-colors duration-500',
                                isActive ? 'text-paper-50' : 'text-white/45 group-hover:text-white/75',
                              )}
                            >
                              {layer.title}
                            </span>
                            <motion.span
                              initial={false}
                              animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                              transition={{ duration: 0.6, ease: EASE }}
                              className="block overflow-hidden"
                            >
                              <span className="block pt-1.5 pb-1 text-[15px] leading-relaxed text-white/60">{layer.text}</span>
                            </motion.span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </div>

              <div className="relative lg:order-1 lg:col-span-7">
                <div className="mx-auto w-full max-w-[520px] lg:max-w-none">
                  <LayeredCanister explode={explode} active={active} />
                </div>
                <ul className="absolute top-1/2 left-0 hidden -translate-y-1/2 space-y-10 xl:block">
                  {layerHighlights.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex max-w-[9rem] flex-col items-start gap-3">
                      <span className="grid size-11 place-items-center rounded-full text-gold-300 ring-1 ring-gold-400/35">
                        <Icon className="size-[18px]" strokeWidth={1.3} aria-hidden />
                      </span>
                      <span className="text-[10px] leading-relaxed font-semibold tracking-[0.26em] text-white/55 uppercase">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
