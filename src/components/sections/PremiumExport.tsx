import { Check, Maximize2 } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { exportQualities, exportUses, type ExportUse } from '../../data/site'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Lightbox } from '../ui/Lightbox'
import { Reveal } from '../ui/motion'
import { SectionHeading } from '../ui/SectionHeading'

const photos = exportUses.map((use) => use.photo)

export function PremiumExport() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="export" className="relative overflow-hidden bg-ink-950 py-28 text-white sm:py-36">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(40%_50%_at_15%_20%,rgba(205,176,121,0.13),transparent_70%)]" />
        <svg className="absolute -right-64 -bottom-64 size-[900px] text-white/[0.05]" viewBox="0 0 800 800" fill="none">
          {[390, 320, 250, 180].map((r) => (
            <circle key={r} cx="400" cy="400" r={r} stroke="currentColor" />
          ))}
        </svg>
        <div className="grain absolute inset-0 opacity-[0.05]" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            onDark
            className="lg:col-span-7"
            eyebrow="Premium Export"
            title={
              <>
                Export-ready. <em className="text-gold-gradient">Unmistakably</em> premium.
              </>
            }
          />
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="text-[17px] leading-relaxed text-white/60">
              Lightweight, eco-friendly and recyclable premium packaging, best suited for packaging and exporting a wide
              range of products.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 min-[320px]:grid-cols-2">
              {exportQualities.map((quality) => (
                <li key={quality} className="flex items-center gap-3 text-[15px] text-white/80">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold-400/15 text-gold-300">
                    <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                  </span>
                  {quality}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center sm:justify-start">
              <Button href="#contact">Discuss Export Packaging</Button>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-10 sm:mt-20 md:grid-cols-2">
          {exportUses.map((use, i) => (
            <li key={use.title}>
              <Reveal delay={(i % 2) * 0.1}>
                <ExportCard use={use} index={i} onOpen={() => setOpenIndex(i)} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <p className="mt-10 text-sm text-white/45">…and a wide range of other premium products.</p>
        </Reveal>
      </Container>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            items={photos}
            index={openIndex}
            label="Export packaging"
            onNavigate={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function ExportCard({ use, index, onOpen }: { use: ExportUse; index: number; onOpen: () => void }) {
  const { icon: Icon, title, photo } = use

  return (
    <figure>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open image: ${title} packaging`}
        className="group relative block w-full overflow-hidden rounded-[24px] bg-ink-900 ring-1 ring-white/10 transition-shadow duration-500 hover:ring-gold-400/40 sm:rounded-[28px]"
      >
        <img
          src={photo.full}
          srcSet={`${photo.thumb} 800w, ${photo.full} ${photo.width}w`}
          sizes="(min-width: 768px) 50vw, 100vw"
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.03]"
        />
        <span
          aria-hidden
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-ink-950/55 text-white opacity-0 ring-1 ring-white/15 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100"
        >
          <Maximize2 className="size-4" />
        </span>
      </button>
      <figcaption className="mt-5 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
        <span className="flex items-baseline gap-4">
          <span className="text-xs font-semibold tracking-[0.25em] text-white/35">0{index + 1}</span>
          <span className="font-serif text-[1.9rem] leading-none font-medium text-paper-50">{title}</span>
        </span>
        <Icon className="size-6 text-gold-300" strokeWidth={1.2} aria-hidden />
      </figcaption>
    </figure>
  )
}
