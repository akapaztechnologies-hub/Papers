import { applications } from '../../data/site'

export function Marquee() {
  return (
    <section aria-label="Applications" className="relative overflow-hidden border-y border-white/10 bg-ink-950 py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-ink-950 to-transparent sm:w-56" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-ink-950 to-transparent sm:w-56" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center">
            {applications.map((item) => (
              <li key={item} className="flex items-center">
                <span className="px-9 font-serif text-[clamp(1.6rem,2.6vw,2.35rem)] whitespace-nowrap text-paper-50/85 italic">
                  {item}
                </span>
                <span aria-hidden className="text-sm text-gold-400">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
