import { Mail, Menu, Phone, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type MouseEvent } from 'react'
import { company, formatPhone, navItems, phoneHref } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../lib/cn'
import { useLenis, useScrollTo } from '../../lib/smooth-scroll'
import { Button } from '../ui/Button'
import { EmailText } from '../ui/EmailText'
import { Logo } from '../ui/Logo'
import { EASE } from '../ui/motion'
import { SmoothLink } from '../ui/SmoothLink'

const sectionIds = ['top', 'about', 'canister', 'food', 'export', 'collection', 'gallery', 'team', 'sustainability', 'faq', 'contact']

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, lenis])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            'mx-auto transition-[max-width,padding,margin] duration-700 ease-premium',
            scrolled ? 'mt-3 max-w-[1240px] px-3 sm:px-5' : 'mt-0 max-w-[1320px] px-0',
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between gap-6 transition-all duration-700 ease-premium',
              scrolled
                ? 'rounded-full bg-ink-950/85 py-2 pr-2 pl-5 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-xl'
                : 'px-6 py-6 sm:px-8 lg:px-12',
            )}
          >
            {/* At the very top the hero shows the full logo lockup, so the header mark fades in on scroll. */}
            <SmoothLink
              href="#top"
              aria-label="United Paper Products, back to top"
              aria-hidden={scrolled ? undefined : true}
              tabIndex={scrolled ? undefined : -1}
              className={cn(
                'shrink-0 rounded-lg transition-opacity duration-500',
                !scrolled && 'pointer-events-none opacity-0',
              )}
            >
              <Logo
                className={cn('origin-left transition-transform duration-700 ease-premium', scrolled && 'scale-[0.86]')}
              />
            </SmoothLink>

            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = active === item.id
                  return (
                    <li key={item.id}>
                      <SmoothLink
                        href={`#${item.id}`}
                        aria-current={isActive ? 'location' : undefined}
                        className={cn(
                          'relative block rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300',
                          isActive ? 'text-gold-200' : 'text-white/70 hover:text-white',
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                            transition={{ duration: 0.6, ease: EASE }}
                          />
                        )}
                        <span className="relative">{item.label}</span>
                      </SmoothLink>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <Button href="#contact" size="sm">
                  Request a Quote
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="grid size-11 place-items-center rounded-full text-white ring-1 ring-white/15 transition hover:bg-white/10 xl:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>{open && <MobileMenu active={active} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  )
}

function MobileMenu({ active, onClose }: { active: string | null; onClose: () => void }) {
  const scrollTo = useScrollTo()
  const items = [...navItems, { id: 'contact', label: 'Contact' }]

  const go = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    onClose()
    // Wait for the menu to release the scroll lock before scrolling.
    window.setTimeout(() => scrollTo(href), 60)
  }

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-lenis-prevent
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-ink-950 xl:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="relative flex items-center justify-between px-6 py-6 sm:px-8 short:py-3">
        <a href="#top" onClick={(event) => go(event, '#top')}>
          <Logo />
        </a>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-11 place-items-center rounded-full text-white ring-1 ring-white/15 transition hover:bg-white/10"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Small phones get tighter links; phones held sideways split them into two columns. */}
      <nav aria-label="Mobile" className="relative flex-1 px-6 pt-8 sm:px-8 short:pt-1">
        <ul className="short:grid short:grid-cols-2 short:gap-x-10">
          {items.map((item, i) => (
            <li key={item.id} className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 + i * 0.05 }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(event) => go(event, `#${item.id}`)}
                  className={cn(
                    'flex items-baseline gap-4 py-2 font-serif text-[2.5rem] leading-tight short:py-1 short:text-[1.7rem] [@media(min-height:501px)_and_(max-height:700px)]:py-1.5 [@media(min-height:501px)_and_(max-height:700px)]:text-[2.1rem]',
                    active === item.id ? 'text-gold-300' : 'text-paper-50',
                  )}
                >
                  <span className="font-sans text-xs tracking-[0.2em] text-white/35">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative space-y-3 border-t border-white/10 px-6 py-8 text-sm text-white/65 sm:px-8 short:flex short:flex-wrap short:gap-x-8 short:gap-y-3 short:space-y-0 short:py-5">
        {company.contacts.map((contact) => (
          <a key={contact.phone} href={phoneHref(contact.phone)} className="flex items-center gap-3">
            <Phone className="size-4 text-gold-400" aria-hidden />
            {formatPhone(contact.phone)}
            <span className="text-white/35">{contact.name}</span>
          </a>
        ))}
        <a href={`mailto:${company.email}`} className="flex items-center gap-3">
          <Mail className="size-4 shrink-0 text-gold-400" aria-hidden />
          <span className="min-w-0 break-words">
            <EmailText email={company.email} />
          </span>
        </a>
      </div>
    </motion.div>
  )
}
