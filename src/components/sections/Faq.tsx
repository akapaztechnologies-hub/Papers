import { Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { brandPillars, faqHighlights, faqs, sectionPhotos } from '../../data/site'
import { cn } from '../../lib/cn'
import { fadeEdges } from '../../lib/mask'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { EASE, Reveal } from '../ui/motion'
import { PillarRow } from '../ui/PillarRow'
import { SectionHeading } from '../ui/SectionHeading'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-[#fcf9f4] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_30%_20%,rgba(255,255,255,0.9),transparent_70%)]" />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  Questions, <em className="text-gold-600">answered.</em>
                </>
              }
              description="Everything you need to know about our canisters. For anything else, our team is a call or an email away."
            />
            <Reveal delay={0.2} className="mt-8 flex justify-center sm:block">
              <Button href="#contact" variant="ink">
                Ask a Question
              </Button>
            </Reveal>

            <div className="mt-10 grid items-center gap-8 sm:grid-cols-[auto_1fr]">
              <Reveal delay={0.25}>
                <ul className="space-y-7">
                  {faqHighlights.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-4">
                      <Icon className="size-9 shrink-0 text-gold-700" strokeWidth={1.1} aria-hidden />
                      <span className="max-w-[7rem] text-[10px] leading-relaxed font-semibold tracking-[0.28em] text-ink-900/70 uppercase">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.15}>
                <img
                  src={sectionPhotos.faq}
                  alt="Printed canisters with gold lids on stone blocks with green leaves"
                  width={600}
                  height={607}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto block h-auto w-full max-w-sm"
                  style={fadeEdges(
                    'linear-gradient(to right, transparent, #000 12%, #000 90%, transparent)',
                    'linear-gradient(to bottom, transparent, #000 26%, #000 88%, transparent)',
                  )}
                />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-5 flex items-center justify-end gap-4 text-[11px] font-semibold tracking-[0.34em] text-gold-700 uppercase">
                United Paper Products
                <span aria-hidden className="h-px w-10 bg-gold-500/60" />
              </p>
            </Reveal>
            <Reveal>
              <ul className="space-y-3">
                {faqs.map((item, i) => {
                  const isOpen = open === i
                  return (
                    <li
                      key={item.q}
                      className={cn(
                        'overflow-hidden rounded-2xl border transition-colors duration-500',
                        isOpen ? 'border-gold-400/50 bg-white' : 'border-ink-900/10 bg-white/60',
                      )}
                    >
                      <h3>
                        <button
                          id={`faq-button-${i}`}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${i}`}
                          onClick={() => setOpen(isOpen ? null : i)}
                          className={cn(
                            'group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-500 sm:gap-6 sm:px-6 sm:py-5',
                            isOpen && 'bg-paper-100',
                          )}
                        >
                          <span className="font-serif text-[1.2rem] leading-snug font-medium text-ink-900 transition-colors duration-300 group-hover:text-gold-700 sm:text-[1.35rem]">
                            {item.q}
                          </span>
                          <span
                            className={cn(
                              'grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-500',
                              isOpen ? 'bg-gold-600 text-paper-50' : 'text-ink-900 ring-1 ring-ink-900/15 group-hover:ring-ink-900/40',
                            )}
                          >
                            {isOpen ? <Minus className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
                          </span>
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-panel-${i}`}
                            role="region"
                            aria-labelledby={`faq-button-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pt-4 pb-6 text-[15px] leading-relaxed text-ink-900/65 sm:px-6">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}
              </ul>
            </Reveal>

            {/* Side by side only where the column is wide enough for four readable labels. */}
            <Reveal className="mt-10 flex flex-col gap-8 md:max-lg:flex-row md:max-lg:items-center md:max-lg:justify-between xl:flex-row xl:items-center xl:justify-between">
              <PillarRow items={brandPillars} className="md:max-lg:flex-1 xl:flex-1" />
              <p className="flex items-center gap-4 text-[10px] leading-loose font-semibold tracking-[0.3em] text-gold-700 uppercase">
                <span aria-hidden className="h-px w-8 bg-gold-500/60" />
                Sustainable packaging
                <br />
                for a brighter tomorrow
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
