import { foodBenefits, foodPhotos, foodUses } from '../../data/site'
import { fadeEdges } from '../../lib/mask'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal } from '../ui/motion'
import { SectionHeading } from '../ui/SectionHeading'

export function Food() {
  return (
    <section id="food" className="relative overflow-hidden bg-paper-100 py-28 sm:py-36">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Food Packaging"
            title={
              <>
                Fresh inside. <em className="text-gold-600">Beautiful</em> outside.
              </>
            }
            description="Air-tight construction, a food-grade inner coating and an insulating silver lamination work together to keep food fresh, dry and edible without additional packaging."
          />
          <Reveal delay={0.12} className="lg:col-span-7">
            <img
              src={foodPhotos.hero}
              alt="Printed paper board canisters with gold lids beside loose tea, cookies and dry fruits"
              width={912}
              height={422}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
              style={fadeEdges(
                'linear-gradient(to right, transparent, #000 7%, #000 86%, transparent)',
                'linear-gradient(to bottom, #000 84%, transparent)',
              )}
            />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {foodBenefits.map(({ icon: Icon, title, text, tag, photo }, i) => (
            <Reveal
              key={title}
              delay={i * 0.1}
              className="group @container relative isolate min-h-[21rem] overflow-hidden rounded-[24px] bg-[#faf5ee] shadow-[0_30px_60px_-45px_rgba(17,17,40,0.4)] ring-1 ring-ink-900/[0.06]"
            >
              <span aria-hidden className="absolute top-5 right-6 font-serif text-5xl text-ink-900/10 italic">
                0{i + 1}
              </span>
              {/* Narrow cards stack the photo under the text; wide cards tuck it into the corner beside the text. */}
              <div className="flex h-full flex-col p-6 @min-[380px]:max-w-[56%] @min-[380px]:p-7">
                <span className="grid size-12 place-items-center rounded-full bg-white text-gold-700 shadow-[0_8px_24px_-12px_rgba(17,17,40,0.35)]">
                  <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-7 font-serif text-[1.75rem] leading-[1.1] font-medium text-ink-900">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-900/60">{text}</p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                  <p className="flex items-center gap-3 pb-1 text-[10px] font-semibold tracking-[0.26em] text-gold-700 uppercase @min-[380px]:pb-0">
                    <span aria-hidden className="h-px w-7 shrink-0 bg-gold-500/60" />
                    {tag}
                  </p>
                  <img
                    src={photo.src}
                    alt=""
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                    className="pointer-events-none relative -z-10 -mr-6 -mb-6 h-auto w-[46%] max-w-[180px] shrink-0 origin-bottom-right transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.04] @min-[380px]:absolute @min-[380px]:right-0 @min-[380px]:bottom-0 @min-[380px]:m-0 @min-[380px]:w-[44%] @min-[380px]:max-w-[240px]"
                    style={fadeEdges('linear-gradient(to right, transparent, #000 14%)', 'linear-gradient(to bottom, transparent, #000 12%)')}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex items-center justify-center gap-5 text-center">
          <span aria-hidden className="hidden h-px w-16 bg-gold-500/50 sm:block" />
          <p className="text-[11px] font-semibold tracking-[0.32em] text-gold-700 uppercase">
            Thoughtful packaging for a brighter tomorrow
          </p>
          <span aria-hidden className="hidden h-px w-16 bg-gold-500/50 sm:block" />
        </Reveal>

        <Reveal
          data-ideal
          className="relative mt-16 overflow-hidden rounded-[32px] bg-[#0c111e] text-white shadow-[0_40px_90px_-50px_rgba(11,11,26,0.8)]"
        >
          <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.04]" />
          <div className="relative grid lg:grid-cols-12">
            <div className="relative p-6 sm:p-12 lg:col-span-5 lg:min-h-[40rem]">
              <Eyebrow onDark>Ideal for Packing</Eyebrow>
              <h3 className="mt-6 max-w-sm font-serif text-[clamp(2.3rem,3.6vw,3.3rem)] leading-[1.02] font-medium text-paper-50">
                From pantry staples to <em className="text-gold-gradient">indulgent treats.</em>
              </h3>
              <p className="mt-6 max-w-[21rem] text-[15px] leading-relaxed text-white/60">
                Our premium paper canisters keep your food products fresh, safe and beautifully presented, perfect for
                retail and export.
              </p>
              <div className="mt-8 flex justify-center sm:justify-start">
                <Button href="#contact" variant="outlineLight">
                  Discuss Your Product
                </Button>
              </div>
              <img
                src={foodPhotos.composition}
                alt="Printed canisters with gold lids beside loose tea, cookies and spices"
                width={308}
                height={495}
                loading="lazy"
                decoding="async"
                className="mx-auto mt-10 block h-auto w-full max-w-[15rem] lg:hidden xl:absolute xl:right-0 xl:bottom-0 xl:mt-0 xl:block xl:h-[40%] xl:w-auto xl:max-w-none"
                style={fadeEdges('linear-gradient(to bottom, transparent, #000 20%)', 'linear-gradient(to right, transparent, #000 22%)')}
              />
            </div>

            <ul className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3 lg:border-t-0 lg:border-l">
              {foodUses.map(({ icon: Icon, title, photo }, i) => (
                <li key={title} className="group relative flex flex-col overflow-hidden bg-[#0c111e]">
                  <div className="flex items-start justify-between px-6 pt-6 sm:px-7 sm:pt-7">
                    <Icon
                      className="size-8 text-gold-300 transition-transform duration-700 ease-premium group-hover:-translate-y-1"
                      strokeWidth={1.2}
                      aria-hidden
                    />
                    <span className="text-xs font-semibold tracking-[0.2em] text-white/35">0{i + 1}</span>
                  </div>
                  <p className="mt-5 px-6 font-serif text-[1.55rem] leading-[1.15] text-paper-50 sm:px-7 lg:text-[1.4rem] xl:text-[1.55rem]">
                    {title}
                  </p>
                  <div className="mt-auto overflow-hidden pt-6">
                    <img
                      src={photo}
                      alt=""
                      width={326}
                      height={200}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.05]"
                      style={fadeEdges('linear-gradient(to bottom, transparent, #000 6%)')}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
