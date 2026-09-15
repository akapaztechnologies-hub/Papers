/**
 * Path builders for drawing cylinders in a slightly-from-above perspective.
 * All shapes share the same convention: `cx` is the axis, `rx`/`ry` are the
 * radii of the elliptical cross-section, and y grows downward.
 */

/** Visible silhouette of a cylinder, including the back half of its top ellipse. */
export function silhouettePath(cx: number, top: number, bottom: number, rx: number, ry: number) {
  return `M${cx - rx} ${top}L${cx - rx} ${bottom}A${rx} ${ry} 0 0 0 ${cx + rx} ${bottom}L${cx + rx} ${top}A${rx} ${ry} 0 0 0 ${cx - rx} ${top}Z`
}

/** A curved band on the front face of a cylinder, between two heights. */
export function bandPath(cx: number, y1: number, y2: number, rx: number, ry: number) {
  return `M${cx - rx} ${y1}L${cx - rx} ${y2}A${rx} ${ry} 0 0 0 ${cx + rx} ${y2}L${cx + rx} ${y1}A${rx} ${ry} 0 0 1 ${cx - rx} ${y1}Z`
}

/** The front (lower) arc of an ellipse, drawn left to right. */
export function frontArc(cx: number, y: number, rx: number, ry: number) {
  return `M${cx - rx} ${y}A${rx} ${ry} 0 0 0 ${cx + rx} ${y}`
}

export const PERSPECTIVE = 0.28

export type MetalFinish = 'gold' | 'silver' | 'copper'

/** Stops for a horizontal brushed-metal gradient across a cylinder. */
export const metalStops: Record<MetalFinish, [number, string][]> = {
  gold: [
    [0, '#4f3d1a'],
    [0.16, '#a3844b'],
    [0.33, '#f3e5bd'],
    [0.45, '#caa96a'],
    [0.63, '#876a36'],
    [0.82, '#dcc28c'],
    [1, '#4a3817'],
  ],
  silver: [
    [0, '#3d4046'],
    [0.16, '#979ba3'],
    [0.33, '#f5f6f8'],
    [0.45, '#c3c6cc'],
    [0.63, '#7b7f87'],
    [0.82, '#d6d9dd'],
    [1, '#3a3d43'],
  ],
  copper: [
    [0, '#3d2214'],
    [0.16, '#95593a'],
    [0.33, '#f1c6a6'],
    [0.45, '#c1825f'],
    [0.63, '#7a472d'],
    [0.82, '#d9a07c'],
    [1, '#3a2013'],
  ],
}

/** Stops for the flat top face of a metal lid. */
export const metalFaceStops: Record<MetalFinish, [number, string][]> = {
  gold: [
    [0, '#f7ebc9'],
    [0.45, '#d2b47a'],
    [1, '#8c6d36'],
  ],
  silver: [
    [0, '#fbfbfc'],
    [0.45, '#c9ccd1'],
    [1, '#83878e'],
  ],
  copper: [
    [0, '#f6d3b8'],
    [0.45, '#c98b66'],
    [1, '#83502f'],
  ],
}

/** Cylindrical light-and-shadow overlay stops (colour, opacity). */
export const shadeStops: [number, string, number][] = [
  [0, '#000', 0.55],
  [0.08, '#000', 0.3],
  [0.24, '#fff', 0.08],
  [0.33, '#fff', 0.2],
  [0.43, '#fff', 0.05],
  [0.62, '#000', 0.06],
  [0.86, '#000', 0.3],
  [1, '#000', 0.6],
]

export const safeId = (id: string) => `u${id.replace(/[^a-zA-Z0-9]/g, '')}`
