import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'
import type { PointerEvent } from 'react'
import { company, heroHighlights, heroPhoto } from '../../data/site'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { LogoLockup } from '../ui/Logo'
import { EASE, MaskLines } from '../ui/motion'

const photoMask = 'radial-gradient(ellipse 70% 68% at 54% 50%, #000 60%, transparent 100%)'

export function Hero() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const sx = useSpring(pointerX, { stiffness: 50, damping: 18 })
  const sy = useSpring(pointerY, { stiffness: 50, damping: 18 })

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      id="top"
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-950 text-white"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_72%_45%,rgba(205,176,121,0.16),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_0%_100%,rgba(31,95,91,0.22),transparent_70%)]" />
        <svg
          className="absolute top-[46%] left-[72%] h-[140%] -translate-x-1/2 -translate-y-1/2 text-white/[0.045]"
          viewBox="0 0 800 800"
          fill="none"
        >
          {[390, 330, 270, 210, 150].map((r) => (
            <circle key={r} cx="400" cy="400" r={r} stroke="currentColor" />
          ))}
        </svg>
        <div className="grain absolute inset-0 opacity-[0.06]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-ink-950 to-transparent" />
      </div>

      <Container className="relative flex flex-1 flex-col pt-24 pb-10 lg:pt-10">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <LogoLockup className="mx-auto lg:mx-0" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="mt-10"
            >
              <Eyebrow onDark>{company.tagline}</Eyebrow>
            </motion.div>

            {/* Phones and tablets fit each sentence on one full-width line; desktop keeps the four-line stack. */}
            <h1 className="mt-6 font-serif text-[clamp(1.25rem,8.2vw,6rem)] leading-[0.95] font-medium tracking-[-0.02em] lg:text-[clamp(2.9rem,5.3vw,5.1rem)]">
              <span className="block lg:hidden">
                <MaskLines onMount delay={0.25} lines={['The look of a premium tin.']} />
                <MaskLines onMount delay={0.42} className="text-gold-gradient italic" lines={['The lightness of paper.']} />
              </span>
              <span className="hidden lg:block">
                <MaskLines onMount delay={0.25} lines={['The look of a', 'premium tin.']} />
                <MaskLines onMount delay={0.42} className="text-gold-gradient italic" lines={['The lightness', 'of paper.']} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.75 }}
              className="mt-6 max-w-md text-[16px] leading-relaxed text-white/65"
            >
              United Paper Products makes printed paper board canisters with metal lids — innovative, eco-friendly and
              cost-effective packaging for food and premium export products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
              className="mt-8 flex flex-wrap items-stretch gap-3 sm:items-center sm:gap-4"
            >
              {/* Equal halves keep both calls to action on a single row on phones. */}
              <Button href="#contact" size="lg" className="basis-0 grow sm:basis-auto sm:grow-0">
                Request a Quote
              </Button>
              <Button
                href="#collection"
                size="lg"
                variant="outlineLight"
                icon={false}
                className="basis-0 grow sm:basis-auto sm:grow-0"
              >
                Explore the Collection
              </Button>
            </motion.div>
          </div>

          <div className="relative lg:col-span-7">
            <HeroPhoto sx={sx} sy={sy} />
          </div>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.1 }}
          className="mt-10 grid grid-cols-2 gap-y-7 border-t border-white/10 pt-8 md:grid-cols-4 md:gap-y-0"
        >
          {heroHighlights.map(({ icon: Icon, label, value }, i) => (
            <li
              key={label}
              className={cn('flex items-center gap-4 md:px-6', i > 0 && 'md:border-l md:border-white/10', i === 0 && 'md:pl-0')}
            >
              <Icon className="size-8 shrink-0 text-gold-300" strokeWidth={1.1} aria-hidden />
              <p className="leading-tight">
                {value && <span className="block font-serif text-2xl text-paper-50">{value}</span>}
                <span
                  className={cn(
                    'block text-[11px] font-semibold tracking-[0.22em] uppercase',
                    value ? 'mt-0.5 text-white/55' : 'text-white/75',
                  )}
                >
                  {label}
                </span>
              </p>
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}

function HeroPhoto({ sx, sy }: { sx: MotionValue<number>; sy: MotionValue<number> }) {
  const x = useTransform(sx, (v) => v * -18)
  const y = useTransform(sy, (v) => v * -12)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, ease: EASE, delay: 0.25 }}
      className="relative mx-auto w-full max-w-[min(780px,120svh)]"
    >
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-gold-400/10 blur-3xl" />
      <motion.img
        src={heroPhoto.full}
        srcSet={`${heroPhoto.thumb} 640w, ${heroPhoto.full} ${heroPhoto.width}w`}
        sizes="(min-width: 1024px) 58vw, 100vw"
        alt="Printed paper board canisters with gold lids on dark marble, styled with cookies, nuts, chocolate and a gold ribbon"
        width={heroPhoto.width}
        height={heroPhoto.height}
        fetchPriority="high"
        decoding="async"
        draggable={false}
        style={{ x, y, maskImage: photoMask, WebkitMaskImage: photoMask }}
        className="relative block h-auto w-full scale-[1.04] select-none"
      />
    </motion.div>
  )
}
