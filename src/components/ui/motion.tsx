import { motion, useReducedMotion, useScroll, useTransform, type HTMLMotionProps, type MotionValue } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
  y?: number
}

/** Fades and lifts its children into view once. */
export function Reveal({ delay = 0, y = 32, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

interface MaskLinesProps {
  lines: ReactNode[]
  className?: string
  delay?: number
  /** Animate immediately instead of when scrolled into view. */
  onMount?: boolean
}

/** Reveals each line by sliding it up from behind a mask. */
export function MaskLines({ lines, className, delay = 0, onMount }: MaskLinesProps) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.16em] block overflow-hidden pr-[0.14em] pb-[0.16em]">
          <motion.span
            className={cn('block', className)}
            initial={{ y: '115%' }}
            {...(onMount
              ? { animate: { y: '0%' } }
              : { whileInView: { y: '0%' }, viewport: { once: true, margin: '0px 0px -8% 0px' } })}
            transition={{ duration: 1.25, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  )
}

interface ScrollRevealTextProps {
  text: string
  className?: string
  emphasisClassName?: string
}

/** A paragraph whose words brighten one by one as it scrolls through the viewport. */
export function ScrollRevealText({ text, className, emphasisClassName }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={cn('relative', className)}>
      {words.map((raw, i) => {
        const emphasised = raw.startsWith('*')
        const word = raw.replace(/\*/g, '')
        const content = emphasised ? <em className={emphasisClassName}>{word}</em> : word
        return reduceMotion ? (
          <span key={i}>{content} </span>
        ) : (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {content}
          </Word>
        )
      })}
    </p>
  )
}

function Word({ children, progress, range }: { children: ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}
