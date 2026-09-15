import { Leaf, MapPin, Maximize2, Package } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { aboutHighlights, aboutStatement, company, sectionPhotos, signatures } from '../../data/site'
import { cn } from '../../lib/cn'
import { fadeEdges } from '../../lib/mask'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { Lightbox } from '../ui/Lightbox'
import { Reveal, ScrollRevealText } from '../ui/motion'

const photos = signatures.map((signature) => signature.photo)
const divider = <span aria-hidden className="mx-auto block h-px w-12 bg-gold-500/40 sm:mx-0" />

export function About() {
  const { address } = company
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="about" className="relative overflow-hidden bg-paper-50 py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-0">
          {/* Tablets lay the details and the map side by side; desktop stacks them in the left rail. */}
          <aside className="order-3 grid gap-x-10 text-center sm:grid-cols-2 sm:text-left lg:order-1 lg:col-span-3 lg:block lg:border-r lg:border-ink-900/10 lg:pr-8">
            <div>
              <Reveal>
                <Eyebrow className="justify-center sm:justify-start">About Us</Eyebrow>
              </Reveal>
              <Reveal delay={0.08} className="mt-8 space-y-6 text-[14px] leading-relaxed text-ink-900/75">
                <p className="flex justify-center gap-3 sm:justify-start">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-gold-600" strokeWidth={1.4} aria-hidden />
                  <span>
                    {address.street},
                    <br />
                    {address.locality},
                    <br />
                    {address.city} – {address.postalCode}
                    <br />
                    <span className="text-ink-900/55">
                      {address.region}, {address.country}
                    </span>
                  </span>
                </p>
                {divider}
                <p className="flex justify-center gap-3 sm:justify-start">
                  <Package className="mt-0.5 size-5 shrink-0 text-gold-600" strokeWidth={1.4} aria-hidden />
                  {company.product}
                </p>
                {divider}
                {/* Phones read it as one line sized to the screen; the half-width tablet column keeps the stack. */}
                <p className="text-[clamp(7.5px,2.8vw,0.6875rem)] leading-[2.2] font-semibold tracking-[0.2em] whitespace-nowrap text-gold-700 uppercase sm:text-[11px] sm:tracking-[0.34em] sm:whitespace-normal">
                  <span className="sm:hidden">People Packaging A brighter Tomorrow</span>
                  <span className="hidden sm:inline">
                    People
                    <br />
                    Packaging
                    <br />A brighter
                    <br />
                    Tomorrow
                  </span>
                </p>
                {divider}
              </Reveal>
            </div>
            <div className="sm:pt-12 lg:pt-0">
              <Reveal delay={0.16} className="relative mx-auto mt-8 w-full max-w-[15rem] sm:mx-0 sm:mt-0 lg:mt-8">
                <img
                  src={sectionPhotos.indiaMap}
                  alt="Map of India with Sivakasi marked in Tamil Nadu"
                  width={240}
                  height={250}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
                <MapPin
                  className="absolute size-6 -translate-x-1/2 -translate-y-full fill-paper-50 text-gold-600"
                  style={{ left: '32%', top: '86%' }}
                  strokeWidth={1.8}
                  aria-hidden
                />
                <p
                  className="absolute text-left text-[10px] leading-relaxed font-semibold tracking-[0.3em] text-ink-900/80 uppercase"
                  style={{ left: '46%', top: '76%' }}
                >
                  Sivakasi
                  <br />
                  Tamil Nadu
                </p>
              </Reveal>
              <Reveal delay={0.2} className="mt-8 flex justify-center gap-4 sm:justify-start">
                <Leaf className="size-9 shrink-0 text-gold-600" strokeWidth={1.1} aria-hidden />
                <p className="text-[10px] leading-[1.9] font-semibold tracking-[0.26em] text-ink-900/60 uppercase">
                  <span className="text-[11px] tracking-[0.3em] text-gold-700">India to the world</span>
                  <br />
                  Sustainable packaging
                  <br />
                  Global impact
                </p>
              </Reveal>
            </div>
          </aside>

          <div className="order-1 lg:order-2 lg:col-span-5 lg:px-10">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.32em] text-gold-700 uppercase">
                <span aria-hidden className="h-px w-8 bg-gold-500/70" />
                Sustainable packaging solutions
              </p>
            </Reveal>
            <ScrollRevealText
              text={aboutStatement}
              className="mt-8 font-serif text-[clamp(2rem,3vw,3.05rem)] leading-[1.12] tracking-[-0.01em] text-ink-900"
              emphasisClassName="text-gold-600"
            />
            {/* Four across where there is room; two by two in the narrow desktop column of small laptops. */}
            <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-y-7 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {aboutHighlights.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className={cn(
                    'flex flex-col items-center gap-3 px-2 text-center',
                    i > 0 && 'sm:max-lg:border-l sm:max-lg:border-ink-900/10 xl:border-l xl:border-ink-900/10',
                  )}
                >
                  <span className="grid size-14 place-items-center rounded-full text-gold-700 ring-1 ring-gold-500/50">
                    <Icon className="size-6" strokeWidth={1.3} aria-hidden />
                  </span>
                  <span className="text-[10px] leading-relaxed font-semibold tracking-[0.2em] text-ink-900/75 uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex justify-center sm:block">
              <Button href="#canister" variant="bronze" size="lg">
                Learn More
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="order-2 lg:order-3 lg:col-span-4">
            <img
              src={sectionPhotos.about}
              alt="Printed paper canisters with gold lids on a stone plinth among leaves, with the words From Sivakasi to the World"
              width={734}
              height={757}
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full max-w-lg"
              style={fadeEdges('linear-gradient(to right, transparent, #000 16%)', 'linear-gradient(to bottom, transparent, #000 12%, #000 86%, transparent)')}
            />
          </Reveal>
        </div>

        <div className="mt-24 grid gap-6 sm:mt-28 md:grid-cols-3">
          {signatures.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.1}
              className="group flex flex-col rounded-[28px] bg-white p-3 shadow-[0_30px_60px_-45px_rgba(17,17,40,0.45)] ring-1 ring-ink-900/[0.06] transition-shadow duration-700 ease-premium hover:shadow-[0_40px_80px_-40px_rgba(17,17,40,0.45)]"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Open image: ${item.title}`}
                className="relative block overflow-hidden rounded-[20px] bg-paper-100"
              >
                <img
                  src={item.photo.thumb}
                  srcSet={`${item.photo.thumb} 800w, ${item.photo.full} ${item.photo.width}w`}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  alt={item.photo.alt}
                  width={item.photo.width}
                  height={item.photo.height}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden
                  className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-ink-950/55 text-white opacity-0 ring-1 ring-white/15 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100"
                >
                  <Maximize2 className="size-4" />
                </span>
              </button>
              <div className="flex flex-1 flex-col px-5 pt-7 pb-6">
                <span className="text-xs font-semibold tracking-[0.25em] text-gold-700">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-[1.9rem] leading-tight font-medium text-ink-900">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-900/60">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            items={photos}
            index={openIndex}
            label="Signature features"
            onNavigate={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
