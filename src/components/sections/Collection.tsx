import type { CSSProperties } from 'react'
import shelfThumb from '../../assets/collection/shelf-sm.webp'
import shelfPhoto from '../../assets/collection/shelf.webp'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/motion'
import { SectionHeading } from '../ui/SectionHeading'
import { SmoothLink } from '../ui/SmoothLink'

/** Formats in shelf order; `x` is each canister's centre as a percentage of the shelf photo's width. */
const formats = [
  { name: 'Slim Canister', use: 'Spices & masala powders', x: 10 },
  { name: 'Wide Tin', use: 'Bakery items & cookies', x: 25.9 },
  { name: 'Tall Canister', use: 'Tea, coffee & powders', x: 42.8 },
  { name: 'Classic Canister', use: 'Dry fruits & nuts', x: 57 },
  { name: 'Low Tin', use: 'Chocolates & confectioneries', x: 73.6 },
  { name: 'Snack Canister', use: 'Fried & baked snacks', x: 89.6 },
]

const shelfMask =
  'linear-gradient(to right, transparent, #000 4.5%, #000 95.5%, transparent), linear-gradient(to bottom, transparent, #000 5%, #000 95%, transparent)'
const shelfFade: CSSProperties = { maskImage: shelfMask, WebkitMaskImage: shelfMask, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }

export function Collection() {
  return (
    <section id="collection" className="relative overflow-hidden bg-paper-50 py-28 sm:py-36">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="The Collection"
          title={
            <>
              Formats shaped by <em className="text-gold-600">purpose.</em>
            </>
          }
          description="From tall canisters to wide tins, each pack is finished with gorgeous UV printing and paired with lid and base options chosen for its purpose."
        />
      </Container>

      <Reveal delay={0.1} className="mt-12">
        <p className="mb-6 text-center text-[11px] font-semibold tracking-[0.28em] text-ink-900/40 uppercase lg:hidden">
          Swipe to explore formats →
        </p>
        <div className="overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:px-8 lg:px-12">
          <figure className="mx-auto w-full max-w-[1320px] min-w-[860px]">
            <img
              src={shelfPhoto}
              srcSet={`${shelfThumb} 900w, ${shelfPhoto} 1774w`}
              sizes="(min-width: 1416px) 1320px, (min-width: 1024px) calc(100vw - 96px), 860px"
              alt="Six printed canister formats in a row: slim, wide tin, tall, classic, low tin and snack canister, each styled with its food"
              width={1774}
              height={471}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
              style={shelfFade}
            />
            <figcaption className="relative h-20">
              {formats.map((format) => (
                <div
                  key={format.name}
                  className="absolute top-3 w-[15%] -translate-x-1/2 text-center"
                  style={{ left: `${format.x}%` }}
                >
                  <p className="font-serif text-lg leading-tight font-medium text-ink-900 xl:text-xl">{format.name}</p>
                  <p className="mt-1 text-[12px] leading-snug text-ink-900/55 xl:text-[13px]">{format.use}</p>
                </div>
              ))}
            </figcaption>
          </figure>
        </div>
      </Reveal>

      <Container>
        <Reveal className="mt-10 flex flex-col items-center gap-5 text-center">
          <div className="flex items-center gap-5">
            <span aria-hidden className="hidden h-px w-20 bg-gold-500/50 sm:block" />
            <p className="text-[11px] font-semibold tracking-[0.34em] text-gold-700 uppercase">
              Packaging for a brighter tomorrow
            </p>
            <span aria-hidden className="hidden h-px w-20 bg-gold-500/50 sm:block" />
          </div>
          <p className="text-sm text-ink-900/55">
            Illustrative renders. Sizes, capacities and minimum order quantities:{' '}
            <SmoothLink
              href="#contact"
              className="font-semibold text-ink-900 underline decoration-gold-500 decoration-1 underline-offset-4 transition-colors hover:text-gold-700"
            >
              available on request
            </SmoothLink>
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
