import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { company, footerPillars, formatPhone, navItems, phoneHref, sectionPhotos } from '../../data/site'
import { fadeEdges } from '../../lib/mask'
import { Container } from '../ui/Container'
import { EmailText } from '../ui/EmailText'
import { LogoMark } from '../ui/Logo'
import { SmoothLink } from '../ui/SmoothLink'

export function Footer() {
  const { address } = company
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-[#0d0c0b] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(40%_50%_at_85%_25%,rgba(205,176,121,0.1),transparent_70%)]" />
        <div className="grain absolute inset-0 opacity-[0.05]" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 border-t border-white/10 pt-20 pb-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="@container lg:col-span-4">
            <div className="flex items-center gap-4">
              <LogoMark className="h-14" />
              <div className="leading-none">
                <p className="font-serif text-[2rem] font-semibold tracking-[0.16em] text-paper-50">UNITED</p>
                <p className="mt-1.5 text-[12px] font-bold tracking-[0.34em] text-gold-300 uppercase">Paper Products</p>
              </div>
            </div>
            <p className="mt-6 flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] text-gold-300 uppercase">
              <span aria-hidden className="h-px w-10 bg-gold-400" />
              Packaging a brighter tomorrow
            </p>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
              {company.tagline}: printed paper board canisters with metal lids, crafted in {address.city}.
            </p>
            <ul className="mt-8 grid max-w-md grid-cols-2 gap-x-3 gap-y-6 min-[340px]:grid-cols-4">
              {footerPillars.map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-2.5 text-center">
                  <span className="grid size-12 place-items-center rounded-full text-gold-300 ring-1 ring-gold-400/60 min-[400px]:size-14">
                    <Icon className="size-6" strokeWidth={1.3} aria-hidden />
                  </span>
                  <span className="text-[9px] leading-relaxed font-semibold tracking-[0.18em] text-white/60 uppercase">{label}</span>
                </li>
              ))}
            </ul>
            {/* Sized from the column width so the script always sits on two lines. */}
            <p className="mt-9 origin-left -rotate-6 font-script text-[length:clamp(1.35rem,10.4cqi,2.3rem)] leading-[1.1] text-gold-300">
              Sustainable Packaging
              <br />
              <span className="pl-[1.1em]">for a Brighter Tomorrow</span>
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[12px] font-bold tracking-[0.3em] text-gold-300 uppercase">Explore</h3>
            <span aria-hidden className="mt-3 block h-0.5 w-10 bg-gold-400" />
            {/* Links carry their own padding so each one is a comfortable tap target. */}
            <ul className="mt-4.5 grid grid-cols-2 gap-x-6 text-[15px] text-white/75 lg:grid-cols-1">
              {[...navItems, { id: 'contact', label: 'Contact' }].map((item) => (
                <li key={item.id}>
                  <SmoothLink href={`#${item.id}`} className="block py-1.5 transition-colors hover:text-gold-200">
                    {item.label}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[12px] font-bold tracking-[0.3em] text-gold-300 uppercase">Get in touch</h3>
            <span aria-hidden className="mt-3 block h-0.5 w-10 bg-gold-400" />
            <p className="mt-6 text-[15px] text-white/85">{company.name}</p>
            <ul className="mt-3 space-y-2 text-[14px] text-white/75">
              <li className="flex gap-3 py-1">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold-300" strokeWidth={1.4} aria-hidden />
                <address className="leading-relaxed not-italic">
                  {address.street},
                  <br />
                  {address.locality}, {address.city} – {address.postalCode},
                  <br />
                  {address.region}, {address.country}
                </address>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-center gap-3 py-1 transition-colors hover:text-gold-200">
                  <Mail className="size-5 shrink-0 text-gold-300" strokeWidth={1.4} aria-hidden />
                  <span className="min-w-0 break-words">
                    <EmailText email={company.email} />
                  </span>
                </a>
              </li>
              {company.contacts.map((contact) => (
                <li key={contact.phone}>
                  <a
                    href={phoneHref(contact.phone)}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 py-1 transition-colors hover:text-gold-200"
                  >
                    <Phone className="size-5 shrink-0 text-gold-300" strokeWidth={1.4} aria-hidden />
                    <span className="tabular-nums">{formatPhone(contact.phone)}</span>
                    <span className="text-gold-300">{contact.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:col-span-3 lg:block">
            <img
              src={sectionPhotos.footer}
              alt=""
              width={506}
              height={535}
              loading="lazy"
              decoding="async"
              className="ml-auto block h-auto w-full max-w-sm"
              style={fadeEdges('linear-gradient(to right, transparent, #000 22%)', 'linear-gradient(to bottom, transparent, #000 10%, #000 85%, transparent)')}
            />
          </div>
        </div>

        <div aria-hidden className="pt-4 pb-12 text-center select-none">
          <p className="text-gold-gradient pl-[0.04em] font-serif text-[clamp(3rem,21vw,4.5rem)] leading-[0.9] font-semibold tracking-[0.04em] sm:text-[clamp(4.5rem,15vw,12rem)]">
            UNITED
          </p>
          <p className="mt-4 flex items-center justify-center gap-6 pl-[0.5em] font-serif text-[clamp(1rem,2.4vw,2rem)] tracking-[0.5em] text-gold-400/80 uppercase">
            <span className="hidden h-px w-24 bg-gold-400/50 sm:block" />
            Paper Products
            <span className="hidden h-px w-24 bg-gold-400/50 sm:block" />
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-gold-400/40 py-8 text-center text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p>
            {address.city}, {address.region}, {address.country}
          </p>
          <SmoothLink href="#top" className="group inline-flex items-center gap-3 text-white/75 transition-colors hover:text-white">
            Back to top
            <span className="grid size-10 place-items-center rounded-full ring-1 ring-gold-400/60 transition-colors duration-500 group-hover:bg-gold-400 group-hover:text-ink-950">
              <ArrowUp className="size-4" aria-hidden />
            </span>
          </SmoothLink>
        </div>
        <p className="border-t border-white/5 pt-5 pb-7 text-center text-[12px] tracking-[0.08em] text-white/45">
          Powered By <span className="font-semibold tracking-[0.18em] text-gold-300">AKAPAZ TECHNOLOGIES</span>
        </p>
      </Container>
    </footer>
  )
}
