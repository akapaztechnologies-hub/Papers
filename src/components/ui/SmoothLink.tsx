import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { useScrollTo } from '../../lib/smooth-scroll'

/** An anchor that smooth-scrolls to in-page `#section` targets. */
export function SmoothLink({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const scrollTo = useScrollTo()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || !href?.startsWith('#')) return
    event.preventDefault()
    scrollTo(href)
  }

  return <a href={href} onClick={handleClick} {...rest} />
}
