import {
  Candy,
  CookingPot,
  Coffee,
  Cookie,
  Gem,
  Gift,
  Globe,
  Headset,
  Leaf,
  LockKeyhole,
  Nut,
  Popcorn,
  Recycle,
  ShieldCheck,
  Shirt,
  Sparkles,
  Thermometer,
  Users,
  Watch,
  Wine,
  type LucideIcon,
} from 'lucide-react'
import aboutIndiaMap from '../assets/about/india-map.png'
import aboutPhoto from '../assets/about/photo.webp'
import contactPhoto from '../assets/contact/photo.webp'
import bottlesThumb from '../assets/export/bottles-sm.webp'
import bottlesPhoto from '../assets/export/bottles.webp'
import garmentsThumb from '../assets/export/garments-sm.webp'
import garmentsPhoto from '../assets/export/garments.webp'
import luxuryGiftsThumb from '../assets/export/luxury-gifts-sm.webp'
import luxuryGiftsPhoto from '../assets/export/luxury-gifts.webp'
import watchesThumb from '../assets/export/watches-sm.webp'
import watchesPhoto from '../assets/export/watches.webp'
import faqPhoto from '../assets/faq/photo.webp'
import lidOptionsThumb from '../assets/features/lid-base-options-sm.webp'
import lidOptionsPhoto from '../assets/features/lid-base-options.webp'
import lightweightEcoThumb from '../assets/features/lightweight-eco-sm.webp'
import lightweightEcoPhoto from '../assets/features/lightweight-eco.webp'
import uvPrintingThumb from '../assets/features/uv-printing-sm.webp'
import uvPrintingPhoto from '../assets/features/uv-printing.webp'
import benefitAirtightPhoto from '../assets/food/benefit-airtight.webp'
import benefitInteriorPhoto from '../assets/food/benefit-interior.webp'
import benefitLaminationPhoto from '../assets/food/benefit-lamination.webp'
import foodHeroPhoto from '../assets/food/food-hero.webp'
import idealCompositionPhoto from '../assets/food/ideal-composition.webp'
import chocolatesPhoto from '../assets/food/use-chocolates.webp'
import cookiesPhoto from '../assets/food/use-cookies.webp'
import nutsPhoto from '../assets/food/use-nuts.webp'
import snacksPhoto from '../assets/food/use-snacks.webp'
import spicesPhoto from '../assets/food/use-spices.webp'
import teaPhoto from '../assets/food/use-tea.webp'
import footerPhoto from '../assets/footer/photo.webp'
import heroThumb from '../assets/hero/composition-sm.webp'
import heroFull from '../assets/hero/composition.webp'
import sustainabilityPhoto from '../assets/sustainability/photo.webp'
import shiftPlasticImage from '../assets/sustainability/shift-plastic.webp'
import shiftRecycleImage from '../assets/sustainability/shift-recycle.webp'
import shiftTrendImage from '../assets/sustainability/shift-trend.webp'
import kalidossSignature from '../assets/team/kalidos-signature.webp'
import kalidossPhoto from '../assets/team/kalidos.webp'
import officeThumb from '../assets/team/office-sm.webp'
import officePhoto from '../assets/team/office.webp'
import raghuvaranSignature from '../assets/team/raghuvaran-signature.webp'
import raghuvaranPhoto from '../assets/team/raghuvaran.webp'
import type { GalleryItem } from './gallery'

/**
 * All company content lives here: the United Paper Products brochure plus the
 * details supplied with the site imagery. Edit this file to update the site.
 */

export const company = {
  name: 'United Paper Products',
  tagline: 'Premium Eco-Friendly Packaging',
  product: 'Printed Paper Board Canisters with Metal Lids',
  email: 'paperproducts.united@gmail.com',
  /** WhatsApp number that receives website enquiries. */
  whatsapp: '9080126426',
  address: {
    street: '6/741, Kamarajarpuram Colony',
    locality: 'Satchiyapuram',
    city: 'Sivakasi',
    postalCode: '626124',
    region: 'Tamil Nadu',
    country: 'India',
  },
  contacts: [
    { name: 'Er. P. Kalidoss', credentials: 'B.E., FIE, C.Eng (Mech)', phone: '9840442130' },
    { name: 'Er. A. Raghuvaran', credentials: 'B.E. (Mech)', phone: '9952893690' },
  ],
} as const

const { address } = company

export const mapsQuery = `${address.street}, ${address.locality}, ${address.city} ${address.postalCode}`
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`

export const formatPhone = (phone: string) => `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`
export const phoneHref = (phone: string) => `tel:+91${phone}`
export const whatsappHref = (text: string) => `https://wa.me/91${company.whatsapp}?text=${encodeURIComponent(text)}`

/** A 1536 × 1024 marketing image and its grid thumbnail, shaped for the image viewer. */
function photo(id: string, title: string, category: string, alt: string, full: string, thumb: string): GalleryItem {
  return { id, title, category, alt, full, thumb, width: 1536, height: 1024 }
}

type Pillar = { icon: LucideIcon; label: string }

export type NavItem = { id: string; label: string }

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'canister', label: 'The Canister' },
  { id: 'food', label: 'Food' },
  { id: 'export', label: 'Export' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'team', label: 'Team' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'faq', label: 'FAQ' },
]

export const sectionPhotos = {
  about: aboutPhoto,
  indiaMap: aboutIndiaMap,
  sustainability: sustainabilityPhoto,
  faq: faqPhoto,
  contact: contactPhoto,
  footer: footerPhoto,
}

export const heroPhoto = { full: heroFull, thumb: heroThumb, width: 900, height: 600 }

export const heroHighlights: { icon: LucideIcon; label: string; value?: string }[] = [
  { icon: Leaf, value: '100%', label: 'Eco-friendly' },
  { icon: Gem, label: 'Premium finish' },
  { icon: Globe, label: 'Global export' },
  { icon: ShieldCheck, label: 'Food safe packaging' },
]

/** Icon rows used across the lower sections of the page. */
export const brandPillars: Pillar[] = [
  { icon: Leaf, label: 'Eco-friendly materials' },
  { icon: Gem, label: 'Premium quality' },
  { icon: Globe, label: 'Global supply' },
  { icon: Users, label: 'Dedicated support' },
]

export const footerPillars: Pillar[] = [
  { icon: Leaf, label: 'Eco-friendly materials' },
  { icon: ShieldCheck, label: 'Premium quality' },
  { icon: Globe, label: 'Global supply' },
  { icon: Users, label: 'People focused' },
]

export const applications = [
  'Tea & Coffee',
  'Bakery & Cookies',
  'Spices & Masala',
  'Fried & Baked Snacks',
  'Dry Fruits & Nuts',
  'Chocolates & Confectionery',
  'Watches',
  'Bottles',
  'Garments',
  'Luxury Gifts',
]

/** Words wrapped in *asterisks* are emphasised. */
export const aboutStatement =
  'We make innovative, eco-friendly, cost-effective packaging solutions that resemble *premium* *tin* *cans* — crafted from food-grade printed paper board, and ideal for food and premium export products.'

export const aboutHighlights: Pillar[] = [
  { icon: Leaf, label: 'Eco-friendly materials' },
  { icon: ShieldCheck, label: 'Food safe packaging' },
  { icon: Gem, label: 'Premium appeal' },
  { icon: Globe, label: 'Ideal for global export' },
]

export const signatures: { title: string; text: string; photo: GalleryItem }[] = [
  {
    title: 'Gorgeous UV Printing',
    text: 'Rich UV printing gives every canister a premium finish that presents your brand beautifully.',
    photo: photo(
      'uv-printing',
      'Gorgeous UV Printing',
      'Signature Features',
      'Canisters with floral and leaf UV-printed designs and gold rims on dark marble',
      uvPrintingPhoto,
      uvPrintingThumb,
    ),
  },
  {
    title: 'Multiple Lid & Base Options',
    text: 'Choose from multiple lid and base options, selected to suit the purpose of your packaging.',
    photo: photo(
      'lid-base-options',
      'Multiple Lid & Base Options',
      'Signature Features',
      'Printed canisters above a chart of lid and base styles',
      lidOptionsPhoto,
      lidOptionsThumb,
    ),
  },
  {
    title: 'Lightweight & Eco-Friendly',
    text: 'Light on weight and kind to the planet, making our canisters an ideal choice for export.',
    photo: photo(
      'lightweight-eco',
      'Lightweight & Eco-Friendly',
      'Signature Features',
      'Leaf-printed paper canisters with gold rims balanced on a wooden board in a forest setting',
      lightweightEcoPhoto,
      lightweightEcoThumb,
    ),
  },
]

export type LayerKey = 'lid' | 'print' | 'silver' | 'board' | 'coating' | 'base'

export const layers: { key: LayerKey; title: string; text: string }[] = [
  {
    key: 'lid',
    title: 'Metal Lid',
    text: 'A metal lid completes the premium tin-can look, with multiple lid options to suit your product.',
  },
  {
    key: 'print',
    title: 'UV-Printed Exterior',
    text: 'Gorgeous UV printing delivers a rich, premium finish for your brand artwork.',
  },
  {
    key: 'silver',
    title: 'Silver Lamination',
    text: 'An outer silver lamination acts as thermal insulation and helps avoid moisture absorption.',
  },
  {
    key: 'board',
    title: 'Food-Grade Paper Board',
    text: 'Lightweight, eco-friendly and recyclable printed paper board forms the body of the canister.',
  },
  {
    key: 'coating',
    title: 'Inner Poly Coating',
    text: 'A food-grade, fibre-based poly coating on the inside keeps food edible without an additional package.',
  },
  {
    key: 'base',
    title: 'Air-Tight Base',
    text: 'Air-tight construction acts like a hermetic seal to keep food fresh and dry, with multiple base options.',
  },
]

export const layerHighlights: Pillar[] = [
  { icon: Sparkles, label: 'Premium finish' },
  { icon: ShieldCheck, label: 'Food-grade materials' },
  { icon: Recycle, label: 'Recyclable' },
]

export const foodPhotos = { hero: foodHeroPhoto, composition: idealCompositionPhoto }

export const foodBenefits: {
  icon: LucideIcon
  title: string
  text: string
  tag: string
  photo: { src: string; width: number; height: number }
}[] = [
  {
    icon: LockKeyhole,
    title: 'Air-tight freshness',
    text: 'Air-tight containers act like hermetically sealed packs, helping keep food fresh and dry.',
    tag: 'Locks in freshness',
    photo: { src: benefitAirtightPhoto, width: 244, height: 244 },
  },
  {
    icon: ShieldCheck,
    title: 'Food-grade interior',
    text: 'A food-grade, fibre-based poly coating keeps food edible without an additional package.',
    tag: 'Safe for food',
    photo: { src: benefitInteriorPhoto, width: 248, height: 251 },
  },
  {
    icon: Thermometer,
    title: 'Insulating lamination',
    text: 'Outer silver lamination acts as thermal insulation and helps avoid moisture absorption.',
    tag: 'Keeps quality intact',
    photo: { src: benefitLaminationPhoto, width: 198, height: 254 },
  },
]

export const foodUses: { icon: LucideIcon; title: string; photo: string }[] = [
  { icon: Coffee, title: 'Tea, Coffee & Powders', photo: teaPhoto },
  { icon: Cookie, title: 'Bakery Items & Cookies', photo: cookiesPhoto },
  { icon: CookingPot, title: 'Spices & Masala Powders', photo: spicesPhoto },
  { icon: Popcorn, title: 'Fried & Baked Snacks', photo: snacksPhoto },
  { icon: Nut, title: 'Dry Fruits & Nuts', photo: nutsPhoto },
  { icon: Candy, title: 'Chocolates & Confectioneries', photo: chocolatesPhoto },
]

export type ExportUse = { icon: LucideIcon; title: string; photo: GalleryItem }

export const exportUses: ExportUse[] = [
  {
    icon: Watch,
    title: 'Watches',
    photo: photo(
      'export-watches',
      'Watches',
      'Premium Export',
      'Black paper canister with gold rims holding a wristwatch, with its lid resting beside it',
      watchesPhoto,
      watchesThumb,
    ),
  },
  {
    icon: Wine,
    title: 'Bottles',
    photo: photo(
      'export-bottles',
      'Bottles',
      'Premium Export',
      'Wine bottle between an ivory printed bottle canister and a black canister with gold rims',
      bottlesPhoto,
      bottlesThumb,
    ),
  },
  {
    icon: Shirt,
    title: 'Garments',
    photo: photo(
      'export-garments',
      'Garments',
      'Premium Export',
      'Folded shirts packed in ivory and black paper canisters with gold rims',
      garmentsPhoto,
      garmentsThumb,
    ),
  },
  {
    icon: Gift,
    title: 'Luxury Gifts',
    photo: photo(
      'export-luxury-gifts',
      'Luxury Gifts',
      'Premium Export',
      'Gift set of black and ivory printed canisters, jars and ribbon-tied boxes',
      luxuryGiftsPhoto,
      luxuryGiftsThumb,
    ),
  },
]

export const exportQualities = ['Lightweight', 'Eco-friendly', 'Recyclable', 'Premium finish']

/** Photos stacked beside the enquiry form. */
export const contactGallery: GalleryItem[] = [exportUses[3].photo, exportUses[0].photo]

export const team: {
  name: string
  credentials: string
  role: string
  bio: string
  motto: string
  photo: string
  signature: string
}[] = [
  {
    name: 'Er. P. Kalidoss',
    credentials: 'B.E., FIE, C.Eng (Mech)',
    role: 'Chairman & Founder',
    bio: 'Over 41 years of experience in the machine designing, packaging and manufacturing industry.',
    motto: 'Experience builds stronger tomorrows',
    photo: kalidossPhoto,
    signature: kalidossSignature,
  },
  {
    name: 'Er. A. Raghuvaran',
    credentials: 'B.E. (Mech)',
    role: 'Director & Founder',
    bio: 'Over 10 years of experience in the machine designing and packaging industry.',
    motto: 'Innovation for a brighter tomorrow',
    photo: raghuvaranPhoto,
    signature: raghuvaranSignature,
  },
]

export const teamPhoto: GalleryItem = {
  id: 'team-office',
  title: 'Our Founders',
  category: 'Our People',
  alt: 'Er. P. Kalidoss and Er. A. Raghuvaran with printed canisters in an office styled with the United Paper Products logo',
  full: officePhoto,
  thumb: officeThumb,
  width: 1536,
  height: 1024,
}

export const shifts: { title: string; text: string; image: string }[] = [
  {
    title: 'Move away from traditional plastic pouches.',
    text: 'Replace plastic pouches with printed paper board canisters that resemble premium tin cans.',
    image: shiftPlasticImage,
  },
  {
    title: 'Go green with a sustainable, recyclable option.',
    text: 'An eco-friendly, recyclable choice that is also lightweight for shipping and export.',
    image: shiftRecycleImage,
  },
  {
    title: 'Adopt the latest packaging trend.',
    text: 'Give your products a modern, premium presentation with gorgeous UV-printed finishes.',
    image: shiftTrendImage,
  },
]

export const sustainabilityHighlights: Pillar[] = [
  { icon: Leaf, label: 'Sustainable materials' },
  { icon: ShieldCheck, label: 'Premium quality' },
  { icon: Globe, label: 'Global export' },
  { icon: Recycle, label: 'Recyclable packaging' },
]

export const faqHighlights: Pillar[] = [
  { icon: Headset, label: 'Expert support' },
  { icon: Leaf, label: 'Quick response' },
  { icon: ShieldCheck, label: 'Trusted partner' },
]

export const faqs = [
  {
    q: 'What are your canisters made of?',
    a: 'Our canisters are made from high-quality, food-grade printed paper board with durable metal lids, finished with UV printing and an outer silver lamination and lined with a food-grade, fibre-based poly coating. They are safe, sturdy and designed for food and premium export packaging.',
  },
  {
    q: 'Do I need an additional inner pack for food?',
    a: 'The food-grade, fibre-based poly coating on the inside keeps food edible without an additional package.',
  },
  {
    q: 'How do the canisters keep food fresh?',
    a: 'The containers are air-tight and act like hermetically sealed packs, helping keep food fresh and dry. The outer silver lamination acts as thermal insulation and helps avoid moisture absorption.',
  },
  {
    q: 'Which products are they suitable for?',
    a: 'Tea, coffee and powders; bakery items and cookies; spices and masala powders; fried and baked snacks; dry fruits and nuts; chocolates and confectioneries. They also suit premium export products such as watches, bottles, garments and luxury gifts.',
  },
  {
    q: 'Are different lid and base options available?',
    a: 'Yes. Multiple lid and base options are available, selected based on the purpose of your packaging.',
  },
  {
    q: 'Are the canisters recyclable?',
    a: 'Yes. Our packaging is lightweight, eco-friendly and recyclable, offering a sustainable alternative to traditional plastic pouches.',
  },
  {
    q: 'What sizes, minimum order quantities and lead times do you offer?',
    a: 'These depend on your requirement. Please call or email us with your product details and we will share specifications and a quotation.',
  },
]
