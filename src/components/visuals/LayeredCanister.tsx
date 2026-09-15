import { motion, useTransform, type MotionValue } from 'motion/react'
import { useId } from 'react'
import { layers, type LayerKey } from '../../data/site'
import { bandPath, frontArc, metalStops, safeId, shadeStops, silhouettePath } from '../../lib/cylinder'

/* Geometry in viewBox units. The canister sits left of centre to leave room for the callouts. */
const P = 0.24
const CX = 250
const R = 116
const RY = R * P
const T0 = 330
const H = 300
const BOTTOM = T0 + H

const LID_R = R + 5
const LID_RY = LID_R * P
const LID_H = 20
const LID_TOP = T0 - 12
const LID_SHIFT = -250

const BASE_R = R + 4
const BASE_RY = BASE_R * P
const BASE_DEPTH = 26
const BASE_TOP = BOTTOM - 18
const BASE_SHIFT = 110

const LABEL_Y = T0 + 122
const TAGLINE_Y = LABEL_Y + 24
const ORNAMENT_Y = TAGLINE_Y + RY + 16
const BADGE_X = CX + R + 100

type TubeKey = Exclude<LayerKey, 'lid' | 'base'>
type Tube = { key: TubeKey; r: number; shift: number; rim: string }

/** Concentric walls, outermost first. Inner walls telescope upward as the canister explodes. */
const TUBES: Tube[] = [
  { key: 'print', r: R, shift: 0, rim: '#1a2150' },
  { key: 'silver', r: R - 2.5, shift: -24, rim: '#dfe2e6' },
  { key: 'board', r: R - 7, shift: -70, rim: '#d9bf95' },
  { key: 'coating', r: R - 13, shift: -140, rim: '#f5f1e9' },
]

const numberOf = (key: LayerKey) => layers.findIndex((layer) => layer.key === key)

type Callout = { key: LayerKey; edgeX: number; anchor: (v: number) => number; offset: number }

/** Each callout is anchored to the visible edge of its layer; `offset` nudges badges apart. */
const CALLOUTS: Callout[] = [
  { key: 'lid', edgeX: CX + LID_R, anchor: (v) => LID_TOP + LID_H / 2 + v * LID_SHIFT, offset: 0 },
  { key: 'print', edgeX: CX + R, anchor: () => T0 + H * 0.62, offset: 0 },
  { key: 'silver', edgeX: CX + R - 2.5, anchor: (v) => T0 - 12 * v, offset: 18 },
  { key: 'board', edgeX: CX + R - 7, anchor: (v) => T0 - 47 * v, offset: -6 },
  { key: 'coating', edgeX: CX + R - 13, anchor: (v) => T0 - 105 * v, offset: -12 },
  { key: 'base', edgeX: CX + BASE_R, anchor: (v) => BASE_TOP + BASE_DEPTH / 2 + v * BASE_SHIFT, offset: 0 },
]

/* Gold-foil botanical print: leaves grown procedurally along bezier stems. */
type Point = readonly [number, number]
type Branch = { points: readonly [Point, Point, Point, Point]; leaves: number; scale: number }
type Leaf = { x: number; y: number; angle: number; scale: number; solid: boolean }

const LEAF = 'M0 0C8-9 26-11 40 0C26 11 8 9 0 0Z'
const VEINS = 'M1 0Q20-1.4 39 0M11 0l5-4.5M19 0l5-5.5M27 0l4.5-4.5M11 0l5 4.5M19 0l5 5.5M27 0l4.5 4.5'

const BRANCHES: Branch[] = [
  { points: [[112, 648], [140, 578], [116, 505], [156, 404]], leaves: 7, scale: 1.2 },
  { points: [[384, 316], [352, 366], [386, 440], [340, 546]], leaves: 7, scale: 1.2 },
  { points: [[128, 336], [160, 356], [190, 346], [214, 384]], leaves: 4, scale: 0.95 },
  { points: [[384, 652], [352, 628], [340, 596], [300, 580]], leaves: 5, scale: 1.08 },
  { points: [[214, 664], [228, 628], [252, 612], [266, 572]], leaves: 4, scale: 0.86 },
  { points: [[304, 322], [288, 344], [296, 366], [282, 390]], leaves: 3, scale: 0.8 },
]

function pointOn([p0, p1, p2, p3]: Branch['points'], t: number): Point {
  const u = 1 - t
  const a = u * u * u
  const b = 3 * u * u * t
  const c = 3 * u * t * t
  const d = t * t * t
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]]
}

function angleAt([p0, p1, p2, p3]: Branch['points'], t: number) {
  const u = 1 - t
  const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0])
  const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1])
  return (Math.atan2(dy, dx) * 180) / Math.PI
}

function grow({ points, leaves, scale }: Branch): Leaf[] {
  const grown: Leaf[] = []
  for (let i = 0; i < leaves; i++) {
    const t = 0.14 + (i / leaves) * 0.8
    const [x, y] = pointOn(points, t)
    grown.push({
      x,
      y,
      angle: angleAt(points, t) + (i % 2 === 0 ? 48 : -48),
      scale: scale * (1 - t * 0.3),
      solid: i % 3 === 1,
    })
  }
  const [x, y] = pointOn(points, 1)
  grown.push({ x, y, angle: angleAt(points, 1), scale: scale * 0.8, solid: true })
  return grown
}

const STEMS = BRANCHES.map(({ points: [p0, p1, p2, p3] }) => `M${p0.join(' ')}C${p1.join(' ')} ${p2.join(' ')} ${p3.join(' ')}`)
const LEAVES = BRANCHES.flatMap(grow)

interface LayeredCanisterProps {
  /** 0 = assembled, 1 = fully exploded. */
  explode: MotionValue<number>
  /** Index into `layers` of the highlighted layer. */
  active: number
}

/** Exploded view of a canister, drawn in the brand's navy-and-gold-foil print. */
export function LayeredCanister({ explode, active }: LayeredCanisterProps) {
  const id = safeId(useId())
  const url = (name: string) => `url(#${id}-${name})`
  const lidY = useTransform(explode, (v) => v * LID_SHIFT)
  const baseY = useTransform(explode, (v) => v * BASE_SHIFT)
  const calloutOpacity = useTransform(explode, [0.55, 0.95], [0, 1])
  const isActive = (key: LayerKey) => active === numberOf(key)

  return (
    <svg
      viewBox="100 20 400 790"
      className="mx-auto h-auto max-h-[78svh] w-full"
      role="img"
      aria-label="Exploded view of a canister: metal lid, UV-printed exterior, silver lamination, paper board, inner coating and base"
    >
      <defs>
        <linearGradient id={`${id}-navy`} x1="0" x2="1">
          <stop offset="0" stopColor="#060a1c" />
          <stop offset="0.22" stopColor="#141b45" />
          <stop offset="0.38" stopColor="#1d2659" />
          <stop offset="0.62" stopColor="#111841" />
          <stop offset="1" stopColor="#05081a" />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" x2="1">
          {shadeStops.map(([offset, color, opacity]) => (
            <stop key={offset} offset={offset} stopColor={color} stopOpacity={opacity} />
          ))}
        </linearGradient>
        <linearGradient id={`${id}-vignette`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.2" />
          <stop offset="0.22" stopColor="#000" stopOpacity="0" />
          <stop offset="0.8" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="0" x2="1">
          {metalStops.gold.map(([offset, color]) => (
            <stop key={offset} offset={offset} stopColor={color} />
          ))}
        </linearGradient>
        <linearGradient id={`${id}-silver`} x1="0" x2="1">
          {metalStops.silver.map(([offset, color]) => (
            <stop key={offset} offset={offset} stopColor={color} />
          ))}
        </linearGradient>
        <radialGradient id={`${id}-lidFace`} cx="0.42" cy="0.38" r="0.75">
          <stop offset="0" stopColor="#fbf0cd" />
          <stop offset="0.35" stopColor="#e3c688" />
          <stop offset="0.72" stopColor="#b89150" />
          <stop offset="1" stopColor="#846430" />
        </radialGradient>
        <radialGradient id={`${id}-specular`}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-trayWall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0d89c" />
          <stop offset="0.55" stopColor="#b8914f" />
          <stop offset="1" stopColor="#7a5c2b" />
        </linearGradient>
        <radialGradient id={`${id}-trayFloor`} cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#ecd394" />
          <stop offset="0.6" stopColor="#c09a57" />
          <stop offset="1" stopColor="#8e6d37" />
        </radialGradient>
        <linearGradient id={`${id}-inside`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ebe5d8" />
          <stop offset="1" stopColor="#8b8475" />
        </linearGradient>
        <linearGradient id={`${id}-foil`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e4b2" />
          <stop offset="0.5" stopColor="#d4b06a" />
          <stop offset="1" stopColor="#a8823f" />
        </linearGradient>
        <linearGradient id={`${id}-foilText`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7e9c2" />
          <stop offset="0.55" stopColor="#dcb970" />
          <stop offset="1" stopColor="#b48b47" />
        </linearGradient>
        <radialGradient id={`${id}-clearing`}>
          <stop offset="0" stopColor="#161d4a" stopOpacity="0.97" />
          <stop offset="0.62" stopColor="#161d4a" stopOpacity="0.88" />
          <stop offset="1" stopColor="#161d4a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#cdb079" stopOpacity="0.14" />
          <stop offset="1" stopColor="#cdb079" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="0.055" />
          <stop offset="0.75" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-floor`}>
          <stop offset="0" stopColor="#000" stopOpacity="0.6" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-fibre`} width="23" height="17" patternUnits="userSpaceOnUse">
          <path d="M1 3h5M10 8h6M3 13h4M14 2h3M18 14h3" stroke="#7a5a30" strokeOpacity="0.16" strokeWidth="0.6" />
          <path d="M7 5h3M1 10h3M15 12h4M19 6h2" stroke="#f3dfb8" strokeOpacity="0.2" strokeWidth="0.6" />
        </pattern>
        <g id={`${id}-leafSolid`}>
          <path d={LEAF} fill={url('foil')} fillOpacity="0.55" stroke={url('foil')} strokeWidth="0.9" />
          <path d={VEINS} fill="none" stroke="#f3e2b4" strokeOpacity="0.7" strokeWidth="0.55" />
        </g>
        <g id={`${id}-leafLine`}>
          <path d={LEAF} fill={url('foil')} fillOpacity="0.1" stroke={url('foil')} strokeWidth="1" />
          <path d={VEINS} fill="none" stroke={url('foil')} strokeOpacity="0.85" strokeWidth="0.6" />
        </g>
        <clipPath id={`${id}-sleeve`}>
          <path d={bandPath(CX, T0, BOTTOM, R, RY)} />
        </clipPath>
        <path id={`${id}-labelArc`} d={frontArc(CX, LABEL_Y, R * 0.97, RY)} />
        <path id={`${id}-taglineArc`} d={frontArc(CX, TAGLINE_Y, R * 0.97, RY)} />
      </defs>

      <ellipse cx={CX} cy={400} rx={200} ry={340} fill={url('glow')} />
      <path d="M500 20L340 20L150 810L380 810Z" fill={url('beam')} />
      <ellipse cx={CX} cy={790} rx={170} ry={16} fill={url('floor')} />

      {/* Base tray: the inside, behind the canister walls */}
      <motion.g style={{ y: baseY }}>
        <ellipse cx={CX} cy={BASE_TOP} rx={BASE_R} ry={BASE_RY} fill={url('trayWall')} />
        <ellipse cx={CX} cy={BASE_TOP + BASE_DEPTH * 0.72} rx={BASE_R * 0.9} ry={BASE_RY * 0.9} fill={url('trayFloor')} />
        {[0.72, 0.5].map((k) => (
          <ellipse
            key={k}
            cx={CX}
            cy={BASE_TOP + BASE_DEPTH * 0.72}
            rx={BASE_R * k}
            ry={BASE_RY * k}
            fill="none"
            stroke="#fff4d6"
            strokeOpacity="0.28"
            strokeWidth="0.8"
          />
        ))}
        <ellipse cx={CX} cy={BASE_TOP} rx={BASE_R} ry={BASE_RY} fill="none" stroke="#f6e3ad" strokeOpacity="0.35" />
      </motion.g>

      {TUBES.map((tube, i) => (
        <TubeRim key={tube.key} tube={tube} explode={explode} fill={i === TUBES.length - 1 ? url('inside') : tube.rim} />
      ))}
      {[...TUBES].reverse().map((tube) => (
        <TubeWall key={tube.key} tube={tube} explode={explode} id={id} active={isActive(tube.key)} />
      ))}

      {/* Base tray: the front wall */}
      <motion.g style={{ y: baseY }}>
        <path d={bandPath(CX, BASE_TOP, BASE_TOP + BASE_DEPTH, BASE_R, BASE_RY)} fill={url('gold')} />
        <path d={frontArc(CX, BASE_TOP, BASE_R, BASE_RY)} fill="none" stroke="#fff3cf" strokeOpacity="0.75" strokeWidth="1.2" />
        <path d={frontArc(CX, BASE_TOP + BASE_DEPTH, BASE_R, BASE_RY)} fill="none" stroke="#000" strokeOpacity="0.35" />
        <Highlight active={isActive('base')} d={silhouettePath(CX, BASE_TOP, BASE_TOP + BASE_DEPTH, BASE_R, BASE_RY)} />
      </motion.g>

      <motion.g style={{ y: lidY }}>
        <path d={bandPath(CX, LID_TOP, LID_TOP + LID_H, LID_R, LID_RY)} fill={url('gold')} />
        <path d={frontArc(CX, LID_TOP + LID_H, LID_R, LID_RY)} fill="none" stroke="#000" strokeOpacity="0.4" />
        <ellipse cx={CX} cy={LID_TOP} rx={LID_R} ry={LID_RY} fill={url('lidFace')} />
        {[0.9, 0.74, 0.5].map((k, i) => (
          <ellipse
            key={k}
            cx={CX}
            cy={LID_TOP}
            rx={LID_R * k}
            ry={LID_RY * k}
            fill="none"
            stroke={i === 1 ? '#000' : '#fff'}
            strokeOpacity={i === 1 ? 0.1 : 0.24}
            strokeWidth="0.8"
          />
        ))}
        <ellipse cx={CX - 26} cy={LID_TOP - 5} rx={LID_R * 0.55} ry={LID_RY * 0.42} fill={url('specular')} />
        <ellipse cx={CX} cy={LID_TOP} rx={LID_R} ry={LID_RY} fill="none" stroke="#fff6d8" strokeOpacity="0.7" strokeWidth="1.2" />
        <Highlight active={isActive('lid')} d={silhouettePath(CX, LID_TOP, LID_TOP + LID_H, LID_R, LID_RY)} />
      </motion.g>

      <motion.g style={{ opacity: calloutOpacity }}>
        {CALLOUTS.map((callout) => (
          <CalloutMark key={callout.key} callout={callout} explode={explode} active={isActive(callout.key)} />
        ))}
      </motion.g>
    </svg>
  )
}

function TubeRim({ tube, explode, fill }: { tube: Tube; explode: MotionValue<number>; fill: string }) {
  const y = useTransform(explode, (v) => v * tube.shift)
  const ry = tube.r * P
  return (
    <motion.g style={{ y }}>
      <ellipse cx={CX} cy={T0} rx={tube.r} ry={ry} fill={fill} />
      <ellipse cx={CX} cy={T0} rx={tube.r} ry={ry} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="0.8" />
    </motion.g>
  )
}

function TubeWall({ tube, explode, id, active }: { tube: Tube; explode: MotionValue<number>; id: string; active: boolean }) {
  const y = useTransform(explode, (v) => v * tube.shift)
  const ry = tube.r * P
  const wall = bandPath(CX, T0, BOTTOM, tube.r, ry)
  const url = (name: string) => `url(#${id}-${name})`

  return (
    <motion.g style={{ y }}>
      {tube.key === 'print' && <PrintedSleeve id={id} wall={wall} />}
      {tube.key === 'silver' && <path d={wall} fill={url('silver')} />}
      {tube.key === 'board' && (
        <>
          <path d={wall} fill="#c9a676" />
          <path d={wall} fill={url('fibre')} />
          <path d={wall} fill={url('shade')} />
        </>
      )}
      {tube.key === 'coating' && (
        <>
          <path d={wall} fill="#f3efe7" />
          <path d={wall} fill={url('shade')} opacity={0.45} />
        </>
      )}
      <path d={frontArc(CX, T0, tube.r, ry)} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.8" />
      <Highlight active={active} d={wall} />
    </motion.g>
  )
}

function PrintedSleeve({ id, wall }: { id: string; wall: string }) {
  const url = (name: string) => `url(#${id}-${name})`
  return (
    <>
      <path d={wall} fill={url('navy')} />
      <g clipPath={url('sleeve')}>
        {STEMS.map((d) => (
          <path key={d} d={d} fill="none" stroke={url('foil')} strokeWidth="1.1" strokeLinecap="round" />
        ))}
        {LEAVES.map((leaf, i) => (
          <use
            key={i}
            href={`#${id}-${leaf.solid ? 'leafSolid' : 'leafLine'}`}
            transform={`translate(${leaf.x.toFixed(1)} ${leaf.y.toFixed(1)}) rotate(${leaf.angle.toFixed(1)}) scale(${leaf.scale.toFixed(2)})`}
          />
        ))}
        <ellipse cx={CX} cy={LABEL_Y + RY + 8} rx={120} ry={68} fill={url('clearing')} />
      </g>
      <text fill={url('foilText')} fontSize="46" fontWeight={500} letterSpacing="0.5" style={{ fontFamily: 'var(--font-serif)' }}>
        <textPath href={`#${id}-labelArc`} startOffset="50%" textAnchor="middle">
          United
        </textPath>
      </text>
      <text fill="#dcc088" fontSize="9.5" fontWeight={600} letterSpacing="3.2" style={{ fontFamily: 'var(--font-sans)' }}>
        <textPath href={`#${id}-taglineArc`} startOffset="50%" textAnchor="middle">
          PREMIUM PACKAGING
        </textPath>
      </text>
      <path d={`M${CX - 22} ${ORNAMENT_Y}H${CX - 7}M${CX + 7} ${ORNAMENT_Y}H${CX + 22}`} stroke="#cdb079" strokeWidth="0.8" />
      <path d={`M${CX} ${ORNAMENT_Y - 3}l3 3l-3 3l-3-3z`} fill="#cdb079" />
      <path d={bandPath(CX, BOTTOM - 7, BOTTOM, R, RY)} fill={url('gold')} />
      <path d={wall} fill={url('shade')} />
      <path d={wall} fill={url('vignette')} />
    </>
  )
}

function Highlight({ active, d }: { active: boolean; d: string }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#f0dca8"
      strokeWidth={1.6}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ filter: 'drop-shadow(0 0 8px rgba(227,204,152,0.8))' }}
    />
  )
}

function CalloutMark({ callout, explode, active }: { callout: Callout; explode: MotionValue<number>; active: boolean }) {
  const y = useTransform(explode, callout.anchor)
  const gold = '#e3cc98'
  const { edgeX, offset } = callout

  return (
    <motion.g style={{ y }}>
      <polyline
        points={`${edgeX + 6},0 ${BADGE_X - 46},0 ${BADGE_X - 19},${offset}`}
        fill="none"
        stroke={active ? gold : '#fff'}
        strokeOpacity={active ? 1 : 0.4}
        strokeWidth="0.8"
      />
      <circle cx={edgeX + 3} cy={0} r={2.2} fill={active ? gold : '#fff'} fillOpacity={active ? 1 : 0.7} />
      <circle
        cx={BADGE_X}
        cy={offset}
        r={15}
        fill={active ? '#cdb079' : '#0b0b1a'}
        fillOpacity={active ? 1 : 0.55}
        stroke={active ? '#f1dfae' : '#fff'}
        strokeOpacity={active ? 1 : 0.7}
      />
      <text
        x={BADGE_X}
        y={offset + 4}
        textAnchor="middle"
        fontSize="11.5"
        fontWeight={600}
        fill={active ? '#0b0b1a' : '#fff'}
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {numberOf(callout.key) + 1}
      </text>
    </motion.g>
  )
}
