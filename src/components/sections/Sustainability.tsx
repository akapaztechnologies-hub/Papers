import { Leaf } from 'lucide-react'
import { sectionPhotos, shifts, sustainabilityHighlights } from '../../data/site'
import { cn } from '../../lib/cn'
import { fadeEdges } from '../../lib/mask'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/motion'
import { PillarRow } from '../ui/PillarRow'
import { SectionHeading } from '../ui/SectionHeading'
import { RotatingBadge } from '../visuals/RotatingBadge'

export function Sustainability() {
  return (
    <section id="sustainability" className="relative overflow-hidden bg-[#0d231a] py-24 text-white sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(40%_50%_at_45%_45%,rgba(205,176,121,0.1),transparent_70%)]" />
        <div className="absolute -bottom-72 -left-48 size-[680px] rounded-full bg-lagoon-700/25 blur-3xl" />
        <div className="grain absolute inset-0 opacity-[0.05]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              onDark
              eyebrow="Sustainability"
              title={
                <>
                  The shift to <em className="text-gold-gradient">sustainable</em> packaging.
                </>
              }
              description="Lightweight, eco-friendly and recyclable, our paper board canisters give brands a premium, responsible alternative to traditional plastic pouches."
            />
            <Reveal delay={0.25} className="mt-12 flex items-center gap-4 sm:gap-6">
              <RotatingBadge
                text="RECYCLABLE · LIGHTWEIGHT · ECO-FRIENDLY · "
                className="size-28 shrink-0 text-gold-300/80 min-[340px]:size-36"
              >
                <Leaf className="size-8 text-gold-300" strokeWidth={1.2} aria-hidden />
              </RotatingBadge>
              <p className="text-[11px] leading-loose font-semibold tracking-[0.3em] text-white/55 uppercase">
                Small change
                <br />A brighter
                <br />
                tomorrow
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-4">
            <img
              src={sectionPhotos.sustainability}
              alt="Leaf-printed paper canisters with gold lids on stone blocks among green leaves"
              width={720}
              height={798}
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full max-w-md"
              style={fadeEdges('radial-gradient(ellipse 72% 70% at 55% 48%, #000 58%, transparent 100%)')}
            />
          </Reveal>

          {/* In a narrow column the number moves above the title to leave the text room to breathe. */}
          <ol className="@container lg:col-span-4">
            {shifts.map((shift, i) => (
              <li key={shift.title}>
                <Reveal
                  delay={i * 0.1}
                  className={cn(
                    'grid grid-cols-[3.5rem_1fr] items-start gap-4 py-7 @min-[360px]:grid-cols-[2.5rem_4.5rem_1fr]',
                    i > 0 && 'border-t border-white/10',
                  )}
                >
                  <span className="hidden pt-1 font-serif text-3xl text-gold-300 italic @min-[360px]:block">0{i + 1}</span>
                  <img
                    src={shift.image}
                    alt=""
                    width={132}
                    height={132}
                    loading="lazy"
                    decoding="async"
                    className="size-14 rounded-full object-cover @min-[360px]:size-[4.5rem]"
                  />
                  <div>
                    <span className="mb-1 block font-serif text-xl text-gold-300 italic @min-[360px]:hidden">0{i + 1}</span>
                    <h3 className="font-serif text-[1.5rem] leading-[1.15] font-medium text-paper-50">{shift.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-white/60">{shift.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-14 flex flex-col gap-8 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <PillarRow items={sustainabilityHighlights} onDark className="lg:w-[62%]" />
          <p className="flex items-center justify-center gap-4 text-[10px] leading-loose font-semibold tracking-[0.32em] text-gold-300/80 uppercase">
            <span aria-hidden className="h-px w-10 bg-gold-400/50" />
            People · Products · A greener planet
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
