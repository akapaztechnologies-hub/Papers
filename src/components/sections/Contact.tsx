import { ArrowRight, ArrowUpRight, ChevronDown, ExternalLink, Mail, MapPin, MessageCircle, Phone, User } from 'lucide-react'
import {
  useId,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import {
  brandPillars,
  company,
  contactGallery,
  formatPhone,
  mapsQuery,
  mapsUrl,
  phoneHref,
  sectionPhotos,
  whatsappHref,
} from '../../data/site'
import { cn } from '../../lib/cn'
import { fadeEdges } from '../../lib/mask'
import { Container } from '../ui/Container'
import { EmailText } from '../ui/EmailText'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal } from '../ui/motion'
import { PillarRow } from '../ui/PillarRow'
import { headingClass } from '../ui/SectionHeading'

const productOptions = [
  'Tea, coffee & powders',
  'Bakery items & cookies',
  'Spices & masala powders',
  'Fried & baked snacks',
  'Dry fruits & nuts',
  'Chocolates & confectioneries',
  'Premium export (watches, bottles, garments, gifts)',
  'Other',
]

/** FormSubmit emails every enquiry to the business inbox (activated once from that inbox). */
const ENQUIRY_ENDPOINT = `https://formsubmit.co/ajax/${company.email}`

const cardClass =
  'group flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.03] p-4 transition-colors duration-500 hover:border-gold-400/40 hover:bg-white/[0.05] sm:gap-4 sm:p-5'
/** The decorative icon steps aside on the narrowest phones so names and numbers keep their room. */
const iconCircle =
  'grid size-10 shrink-0 place-items-center rounded-full text-gold-300 ring-1 ring-gold-400/40 max-[359px]:hidden sm:size-12'
const actionCircle =
  'grid size-11 shrink-0 place-items-center rounded-full bg-gold-400 text-ink-950 transition-transform duration-500 ease-premium group-hover:scale-110'

export function Contact() {
  const { address } = company

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0c0c10] pt-24 pb-20 text-white sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(40%_45%_at_90%_35%,rgba(205,176,121,0.12),transparent_70%)]" />
        <div className="grain absolute inset-0 opacity-[0.05]" />
      </div>

      <Container className="relative">
        <div className="flex items-center justify-between gap-6">
          <Reveal>
            <Eyebrow onDark>Contact Us</Eyebrow>
          </Reveal>
          <p className="hidden items-center gap-4 text-[11px] font-semibold tracking-[0.32em] text-white/50 uppercase sm:flex">
            United Paper Products
            <span aria-hidden className="h-px w-10 bg-white/25" />
          </p>
        </div>
        <Reveal delay={0.05}>
          <h2 className={cn(headingClass, 'mt-6 text-balance text-paper-50')}>
            Let’s package something <em className="text-gold-gradient">remarkable.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/60">
            Tell us about your product and packaging requirement. Our team will get back to you with the best solution — or
            call us directly.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="grid min-w-0 grid-cols-1 content-start gap-4 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1 xl:col-span-4">
            {company.contacts.map((contact, i) => (
              <Reveal key={contact.phone} delay={i * 0.06} className="min-w-0">
                <a href={phoneHref(contact.phone)} className={cardClass}>
                  <span className={iconCircle}>
                    <User className="size-5" strokeWidth={1.4} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-xl leading-tight font-medium text-paper-50">{contact.name}</span>
                    <span className="mt-0.5 block text-[12px] text-white/45">{contact.credentials}</span>
                    <span className="mt-1.5 block text-[16px] font-semibold tracking-wide whitespace-nowrap text-paper-50 tabular-nums">
                      {formatPhone(contact.phone)}
                    </span>
                  </span>
                  <span className={actionCircle}>
                    <Phone className="size-4" aria-hidden />
                    <span className="sr-only">Call {contact.name}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.12} className="min-w-0">
              <a href={`mailto:${company.email}`} className={cardClass}>
                <span className={iconCircle}>
                  <Mail className="size-5" strokeWidth={1.4} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold tracking-[0.24em] text-white/45 uppercase">Email</span>
                  <span className="mt-1 block text-[15px] font-semibold break-words text-paper-50">
                    <EmailText email={company.email} />
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.18} className="min-w-0">
              <div className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/[0.03] p-4 sm:gap-4 sm:p-5">
                <span className={iconCircle}>
                  <MapPin className="size-5" strokeWidth={1.4} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold tracking-[0.24em] text-white/45 uppercase">Visit Us</p>
                  <address className="mt-1 text-[14px] leading-relaxed text-white/80 not-italic">
                    {address.street},
                    <br />
                    {address.locality}, {address.city} – {address.postalCode}
                    <br />
                    {address.region}, {address.country}
                  </address>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-3 inline-flex items-center gap-1.5 border-b border-gold-400/50 pb-0.5 text-[14px] font-semibold text-gold-300 transition-colors hover:text-gold-200"
                  >
                    Get Directions
                    <ArrowUpRight
                      className="size-4 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="min-w-0 lg:col-span-7 xl:col-span-5">
            <EnquiryForm />
          </Reveal>

          <div className="hidden xl:col-span-3 xl:row-span-2 xl:flex xl:flex-col xl:gap-4">
            <Reveal delay={0.16}>
              <img
                src={sectionPhotos.contact}
                alt="Printed canisters with gold lids beside a plant, with the words From Sivakasi to the World"
                width={470}
                height={530}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
                style={fadeEdges('linear-gradient(to right, transparent, #000 18%)', 'linear-gradient(to bottom, #000 82%, transparent)')}
              />
            </Reveal>
            {contactGallery.map((photo, i) => (
              <Reveal
                key={photo.id}
                delay={0.22 + i * 0.08}
                className="group relative min-h-44 flex-1 overflow-hidden rounded-[20px] ring-1 ring-white/10"
              >
                <img
                  src={photo.thumb}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover object-right transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.05]"
                />
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/75 to-transparent" />
                <span className="absolute bottom-4 left-4 text-[10px] font-semibold tracking-[0.26em] text-paper-50 uppercase">
                  {photo.title}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal className="relative overflow-hidden rounded-[22px] border border-white/10 lg:col-span-12 xl:col-span-9">
            <iframe
              title="Map showing the location of United Paper Products in Sivakasi"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[260px] w-full contrast-[0.9] grayscale invert-[0.92] hue-rotate-180"
            />
            <div className="pointer-events-none absolute top-4 right-4 flex flex-wrap items-start justify-end gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto inline-flex items-center gap-2 rounded-lg border border-white/25 bg-ink-950/80 px-3 py-2 text-[12px] font-medium text-white backdrop-blur transition-colors hover:border-gold-400/60"
              >
                Open in Google Maps
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
              <span className="rounded-lg border border-gold-400/60 bg-ink-950/80 px-3 py-2 text-[12px] leading-tight text-paper-50 backdrop-blur">
                {company.name}
                <br />
                <span className="text-white/60">
                  {address.city} – {address.postalCode}
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <PillarRow items={brandPillars} onDark className="lg:w-[60%]" />
          <p className="text-center text-[10px] font-semibold tracking-[0.34em] text-white/55 uppercase">
            People · Packaging · A brighter tomorrow
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

type Status = 'idle' | 'sending' | 'sent' | 'failed'

function EnquiryForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [messageLength, setMessageLength] = useState(0)
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    // Bots fill the hidden field; people never see it.
    if (String(data.get('_honey') ?? '')) return

    const get = (key: string) => String(data.get(key) ?? '').trim()
    const details = (
      [
        ['Name', get('name')],
        ['Company', get('company')],
        ['Email', get('email')],
        ['Phone', get('phone')],
        ['Product', get('product')],
        ['Estimated quantity', get('quantity')],
        ['Message', get('message')],
      ] as const
    ).filter(([, value]) => value !== '')

    // Open WhatsApp first, while the click still counts as a user action (pop-up blockers).
    const link = whatsappHref(
      ['New packaging enquiry from the website', '', ...details.map(([label, value]) => `${label}: ${value}`)].join('\n'),
    )
    setWhatsappLink(link)
    window.open(link, '_blank', 'noopener,noreferrer')

    setStatus('sending')
    try {
      // A plain form post needs no CORS preflight, and keepalive lets it finish even if the visitor jumps to WhatsApp.
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new URLSearchParams({
          ...Object.fromEntries(details),
          _subject: `New packaging enquiry from ${get('name')}${get('company') ? ` (${get('company')})` : ''}`,
          _replyto: get('email'),
          _template: 'table',
          _captcha: 'false',
        }),
        keepalive: true,
      })
      const result = (await response.json().catch(() => ({}))) as { success?: string | boolean }
      if (!response.ok || String(result.success) !== 'true') throw new Error('Enquiry email was not accepted')
      setStatus('sent')
      form.reset()
      setMessageLength(0)
    } catch {
      setStatus('failed')
    }
  }

  return (
    <form onSubmit={onSubmit} className="h-full rounded-[22px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-serif text-[2rem] leading-none font-medium text-paper-50">Send an enquiry</h3>
        <span className="text-[11px] text-white/45">* Required fields</span>
      </div>

      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="mt-7 grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field label="Name *" name="name" required autoComplete="name" placeholder="Your name" />
        <Field label="Company" name="company" autoComplete="organization" placeholder="Company name" />
        <Field label="Email *" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 XXXXX XXXXX" />
        <SelectField label="Product *" name="product" required options={productOptions} />
        <Field label="Estimated quantity" name="quantity" placeholder="e.g. 1000 pcs" />
        <div className="sm:col-span-2">
          <TextAreaField
            label="Message *"
            name="message"
            required
            rows={4}
            maxLength={500}
            placeholder="Tell us about your requirement…"
            onChange={(event) => setMessageLength(event.currentTarget.value.length)}
          />
          <p className="mt-1.5 text-right text-[11px] text-white/40 tabular-nums">{messageLength}/500</p>
        </div>
      </div>

      {status === 'sent' && (
        <p role="status" className="mt-5 rounded-xl border border-gold-400/30 bg-gold-400/10 px-4 py-3 text-sm leading-relaxed text-paper-50">
          Thank you! Your enquiry has been emailed to our team. WhatsApp has also opened with your message; tap Send there to
          reach us on WhatsApp too.{' '}
          {whatsappLink && (
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="font-semibold text-gold-200 underline underline-offset-4">
              Open WhatsApp again
            </a>
          )}
        </p>
      )}
      {status === 'failed' && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm leading-relaxed break-words text-paper-50"
        >
          We couldn’t email your enquiry just now. Please send it on{' '}
          {whatsappLink && (
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="font-semibold text-gold-200 underline underline-offset-4">
              WhatsApp
            </a>
          )}{' '}
          or write to us at{' '}
          <a href={`mailto:${company.email}`} className="font-semibold text-gold-200 underline underline-offset-4">
            <EmailText email={company.email} />
          </a>
          .
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex gap-2.5 text-[11px] leading-relaxed text-white/45 sm:max-w-xs">
          <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold-300/80" aria-hidden />
          Your enquiry is emailed to our team, and WhatsApp opens with the details ready to send.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-gold-400 px-7 text-[14px] font-semibold text-ink-950 shadow-[0_18px_40px_-18px_rgba(205,176,121,0.8)] transition-colors duration-500 hover:bg-gold-300 disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
          <ArrowRight className="size-4 transition-transform duration-500 ease-premium group-hover:translate-x-1" aria-hidden />
        </button>
      </div>
    </form>
  )
}

const labelClass = 'text-[10px] font-semibold tracking-[0.24em] text-white/55 uppercase'
/** 16px text stops iPhones from zooming the page when a field is tapped. */
const controlClass =
  'mt-2 w-full rounded-lg border border-white/12 bg-white/[0.03] px-3.5 py-2.5 text-base text-paper-50 placeholder-white/30 transition-colors duration-300 focus:border-gold-400/70 focus:bg-white/[0.05] focus:outline-none'

function Field({ label, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} className={controlClass} {...props} />
    </div>
  )
}

function SelectField({
  label,
  options,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] }) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <select id={id} defaultValue="" className={cn(controlClass, 'appearance-none truncate pr-10')} {...props}>
          <option value="" disabled className="bg-ink-900 text-white/60">
            Select a category
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-ink-900 text-paper-50">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/4 text-white/50" aria-hidden />
      </div>
    </div>
  )
}

function TextAreaField({ label, className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <textarea id={id} className={cn(controlClass, 'resize-none')} {...props} />
    </div>
  )
}
