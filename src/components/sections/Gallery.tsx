import { ArrowRight } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { galleryCategories, galleryItems, type GalleryItem } from '../../data/gallery'
import { cn } from '../../lib/cn'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { Lightbox } from '../ui/Lightbox'
import { Reveal } from '../ui/motion'
import { headingClass } from '../ui/SectionHeading'

type Viewer = { items: GalleryItem[]; index: number }

export function Gallery() {
  const [viewer, setViewer] = useState<Viewer | null>(null)
  const open = (items: GalleryItem[]) => setViewer({ items, index: 0 })

  return (
    <section id="gallery" className="relative overflow-hidden bg-[#0e0d0c] py-24 text-white sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_75%_0%,rgba(205,176,121,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(35%_35%_at_0%_100%,rgba(31,95,91,0.18),transparent_70%)]" />
        <div className="grain absolute inset-0 opacity-[0.05]" />
      </div>

      <Container className="relative">
        <div className="flex items-center justify-between gap-6">
          <Reveal>
            <Eyebrow onDark>Gallery</Eyebrow>
          </Reveal>
          <p className="hidden items-center gap-4 text-[11px] font-semibold tracking-[0.32em] text-white/50 uppercase sm:flex">
            United Paper Products
            <span aria-hidden className="h-px w-10 bg-white/25" />
          </p>
        </div>

        <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className={cn(headingClass, 'text-balance text-paper-50')}>
              Printed for brands that love <em className="text-gold-gradient">presentation.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="text-[16px] leading-relaxed text-white/65">
              Cake tins, cookie canisters, health mix packs and dry fruit canisters — a selection of printed paper board
              packaging from our portfolio.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="flex justify-center sm:justify-start lg:col-span-2 lg:justify-self-end">
            <button
              type="button"
              onClick={() => open(galleryItems)}
              className="group flex items-center gap-4 text-left lg:max-xl:flex-col lg:max-xl:items-start"
            >
              <span className="grid size-16 shrink-0 place-items-center rounded-full text-gold-300 ring-1 ring-gold-400/60 transition-colors duration-500 group-hover:bg-gold-400 group-hover:text-ink-950">
                <ArrowRight className="size-5" aria-hidden />
              </span>
              <span className="text-[11px] leading-relaxed font-semibold tracking-[0.3em] text-gold-300 uppercase">
                Explore our
                <br />
                full collection
              </span>
            </button>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {galleryCategories.map((category, i) => (
            <li key={category.id}>
              <Reveal delay={(i % 4) * 0.06}>
                <button
                  type="button"
                  onClick={() => open(category.photos)}
                  aria-label={`View ${category.title}`}
                  className="group relative block w-full overflow-hidden rounded-2xl bg-ink-900 text-left ring-1 ring-white/10 transition-shadow duration-500 hover:ring-gold-400/50"
                >
                  <img
                    src={category.image}
                    alt=""
                    width={400}
                    height={260}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[20/13] h-auto w-full object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.05]"
                  />
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-4 text-[11px] font-semibold tracking-[0.26em] text-paper-50 uppercase">
                    {category.title}
                    <ArrowRight
                      className="size-4 text-white/70 transition-transform duration-500 ease-premium group-hover:translate-x-1 group-hover:text-gold-300"
                      aria-hidden
                    />
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 text-[10px] font-semibold tracking-[0.34em] text-white/45 uppercase sm:flex-row">
          <p className="flex items-center gap-4">
            <span aria-hidden className="h-px w-10 bg-white/25" />
            Packaging a brighter tomorrow
          </p>
          <p>Sustainable · Creative · Global</p>
        </div>
      </Container>

      <AnimatePresence>
        {viewer && (
          <Lightbox
            items={viewer.items}
            index={viewer.index}
            label="Gallery"
            onNavigate={(index) => setViewer((current) => (current ? { ...current, index } : current))}
            onClose={() => setViewer(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
