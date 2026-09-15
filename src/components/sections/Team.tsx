import { Maximize2 } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { team, teamPhoto } from '../../data/site'
import { Container } from '../ui/Container'
import { Lightbox } from '../ui/Lightbox'
import { Reveal } from '../ui/motion'
import { SectionHeading } from '../ui/SectionHeading'

const teamPhotos = [teamPhoto]

export function Team() {
  const [photoOpen, setPhotoOpen] = useState(false)

  return (
    <section id="team" className="relative overflow-hidden bg-paper-50 py-28 sm:py-36">
      <svg
        aria-hidden
        className="pointer-events-none absolute -top-10 -left-10 size-[380px] text-gold-400/60"
        viewBox="0 0 380 380"
        fill="none"
      >
        <path d="M-10 330C70 240 160 140 330 -10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-30 300C50 210 130 110 300 -30" stroke="currentColor" strokeOpacity="0.35" />
      </svg>

      <Container className="relative">
        <SectionHeading
          align="center"
          eyebrow="Our People"
          title={
            <>
              Meet our <em className="text-gold-600">Team</em>
            </>
          }
          description="Experienced leadership driving innovation in paper packaging."
        />

        <div className="mt-16 grid gap-6 xl:grid-cols-2">
          {team.map((member, i) => (
            <Reveal
              key={member.name}
              delay={i * 0.1}
              className="grid gap-3 rounded-[28px] bg-[#fcfaf6] p-3 shadow-[0_30px_70px_-45px_rgba(17,17,40,0.45)] ring-1 ring-gold-400/30 sm:grid-cols-2"
            >
              {/* The wrapper carries the shape: Safari mis-sizes a percentage-height image inside an auto grid row. */}
              <div className="relative overflow-hidden rounded-[22px]">
                <img
                  src={member.photo}
                  alt={`Portrait of ${member.name}`}
                  width={400}
                  height={520}
                  loading="lazy"
                  decoding="async"
                  className="block w-full object-cover object-top sm:absolute sm:inset-0 sm:size-full"
                />
              </div>
              <div className="flex flex-col px-4 pt-6 pb-5 sm:px-5 sm:pt-7">
                <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] text-gold-700 uppercase">
                  <span aria-hidden className="h-px w-8 bg-gold-500/70" />
                  Founder
                </p>
                <h3 className="mt-5 font-serif text-[2rem] leading-tight font-medium text-ink-900">{member.name}</h3>
                <p className="mt-2 text-[16px] leading-snug font-medium text-ink-900/80">{member.credentials}</p>
                <span aria-hidden className="mt-5 h-px w-10 bg-gold-500/60" />
                <p className="mt-5 text-[12px] font-bold tracking-[0.2em] text-gold-700 uppercase">{member.role}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-900/65">{member.bio}</p>
                <img src={member.signature} alt="" loading="lazy" decoding="async" className="mt-5 h-12 w-auto self-start" />
                <p className="mt-auto pt-6 text-center text-[10px] leading-relaxed font-semibold tracking-[0.3em] text-gold-700/90 uppercase">
                  {member.motto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-6 max-w-5xl">
          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            aria-label={`Open image: ${teamPhoto.title}`}
            className="group relative block w-full overflow-hidden rounded-[28px] bg-ink-900 ring-1 ring-ink-900/10"
          >
            <img
              src={teamPhoto.thumb}
              srcSet={`${teamPhoto.thumb} 800w, ${teamPhoto.full} ${teamPhoto.width}w`}
              sizes="(min-width: 1024px) 1024px, 100vw"
              alt={teamPhoto.alt}
              width={teamPhoto.width}
              height={teamPhoto.height}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.02]"
            />
            <span
              aria-hidden
              className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-ink-950/55 text-white opacity-0 ring-1 ring-white/15 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100"
            >
              <Maximize2 className="size-4" />
            </span>
          </button>
        </Reveal>

        <Reveal className="mt-12 flex items-center justify-center gap-4 text-center">
          <span aria-hidden className="hidden h-px w-16 bg-gold-500/50 sm:block" />
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-semibold tracking-[0.32em] text-gold-700 uppercase">
            <span>People</span>
            <span aria-hidden className="text-gold-500/60">|</span>
            <span>Innovation</span>
            <span aria-hidden className="hidden text-gold-500/60 md:inline">|</span>
            <span className="basis-full md:basis-auto">Sustainable packaging</span>
          </p>
          <span aria-hidden className="hidden h-px w-16 bg-gold-500/50 sm:block" />
        </Reveal>
      </Container>

      <AnimatePresence>
        {photoOpen && (
          <Lightbox
            items={teamPhotos}
            index={0}
            label="Team photo"
            onNavigate={() => undefined}
            onClose={() => setPhotoOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
