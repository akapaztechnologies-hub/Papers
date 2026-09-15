import type { CSSProperties } from 'react'

/** Fades an image's edges into its background; every gradient layer is intersected. */
export function fadeEdges(...gradients: string[]): CSSProperties {
  const mask = gradients.join(', ')
  return { maskImage: mask, WebkitMaskImage: mask, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }
}
