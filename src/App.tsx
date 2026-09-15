import { MotionConfig } from 'motion/react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Anatomy } from './components/sections/Anatomy'
import { Collection } from './components/sections/Collection'
import { Contact } from './components/sections/Contact'
import { Faq } from './components/sections/Faq'
import { Food } from './components/sections/Food'
import { Gallery } from './components/sections/Gallery'
import { Hero } from './components/sections/Hero'
import { Marquee } from './components/sections/Marquee'
import { PremiumExport } from './components/sections/PremiumExport'
import { Sustainability } from './components/sections/Sustainability'
import { Team } from './components/sections/Team'
import { SmoothScrollProvider } from './lib/smooth-scroll'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Hero />
          <Marquee />
          <About />
          <Anatomy />
          <Food />
          <PremiumExport />
          <Collection />
          <Gallery />
          <Team />
          <Sustainability />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </MotionConfig>
  )
}
