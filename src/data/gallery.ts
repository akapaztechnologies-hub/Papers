/**
 * Product photography for the gallery. Each photo lives in src/assets/gallery
 * as `<id>.webp` (full size, used in the viewer) and `<id>-sm.webp` (grid thumbnail).
 */

const images = import.meta.glob<string>('../assets/gallery/*.webp', { eager: true, import: 'default' })

function asset(name: string) {
  const url = images[`../assets/gallery/${name}.webp`]
  if (!url) throw new Error(`Missing gallery image: ${name}.webp`)
  return url
}

export type GalleryItem = {
  id: string
  title: string
  category: string
  alt: string
  width: number
  height: number
  thumb: string
  full: string
}

function photo(id: string, title: string, category: string, alt: string, width: number, height: number): GalleryItem {
  return { id, title, category, alt, width, height, thumb: asset(`${id}-sm`), full: asset(id) }
}

/**
 * Order matters: the masonry grid fills whichever column is shortest, and this
 * sequence keeps look-alike shots apart in both the two- and three-column layouts.
 */
export const galleryItems: GalleryItem[] = [
  photo(
    'cake-tins-150mm',
    '150 mm Diameter Canister Tins',
    'Cake Tins',
    'Printed 150 mm diameter cake tins stacked in a bakery setting',
    1254,
    1254,
  ),
  photo('cookie-canisters', 'Cookie Canisters', 'Bakery', 'Five pink printed cookie canisters stacked in a pyramid', 1280, 1280),
  photo(
    'cake-biscuit-collection',
    'Cake & Biscuit Collection',
    'Collection',
    'Printed cake and biscuit tins stacked under purple lighting',
    1536,
    1024,
  ),
  photo(
    'health-mix-canisters',
    'Health Mix Canisters',
    'Health Foods',
    'Pyramid of printed health mix canisters beside a food grade stamp',
    1600,
    900,
  ),
  photo(
    'format-range',
    'A Range of Formats',
    'Collection',
    'Printed canisters and tins of different heights and diameters arranged in an arched display',
    1170,
    1170,
  ),
  photo(
    'powder-canisters-tall',
    'Tall Powder Canisters',
    'Health Foods',
    'Two tall printed banana flower mix canisters in a banana plantation setting',
    1536,
    1024,
  ),
  photo(
    'cake-canisters',
    'Premium Cake Canisters',
    'Cake Tins',
    'Printed cake canisters stacked in pairs under the line: fresh, stylish and sealed with care',
    1148,
    1148,
  ),
  photo(
    'dry-fruit-canisters',
    'Dry Fruit Canisters',
    'Dry Fruits & Nuts',
    'Five printed dry fruit and nut canisters on a round pedestal',
    1170,
    1170,
  ),
  photo(
    'powder-canisters-short',
    'Short Powder Canisters',
    'Health Foods',
    'Two short printed banana flower mix canisters on a bed of powder',
    1536,
    1024,
  ),
  photo(
    'plum-cake-tins',
    'Plum Cake Tins',
    'Cake Tins',
    'Stack of printed plum cake and biscuit tins against a white brick wall',
    1280,
    965,
  ),
  photo(
    'printed-lids',
    'Printed Lids & Stacks',
    'Collection',
    'Printed canister lids and stacked tins displayed on a round pedestal',
    1170,
    1170,
  ),
  photo(
    'bakery-display-tins',
    'Bakery Display Tins',
    'Cake Tins',
    'Printed cake tins arranged on a bakery counter beside a plum cake',
    1254,
    1254,
  ),
  photo(
    'cookie-canister-stack',
    'Cookie Canister Stack',
    'Bakery',
    'Pink printed cookie canisters stacked two over three',
    1528,
    1528,
  ),
]

const categoryImages = import.meta.glob<string>('../assets/categories/*.webp', { eager: true, import: 'default' })

export type GalleryCategory = { id: string; title: string; image: string; photos: GalleryItem[] }

/**
 * Gallery categories. Each opens the portfolio photos listed for it; categories
 * without portfolio photos yet open their own concept render instead.
 */
function category(id: string, title: string, photoIds: string[]): GalleryCategory {
  const image = categoryImages[`../assets/categories/${id}.webp`]
  if (!image) throw new Error(`Missing category image: ${id}.webp`)
  const photos = photoIds
    .map((photoId) => galleryItems.find((item) => item.id === photoId))
    .filter((item): item is GalleryItem => item !== undefined)
  const render: GalleryItem = {
    id: `category-${id}`,
    title,
    category: 'Concept render',
    alt: `${title}: printed canisters styled with their products`,
    width: 400,
    height: 260,
    thumb: image,
    full: image,
  }
  return { id, title, image, photos: photos.length > 0 ? photos : [render] }
}

export const galleryCategories: GalleryCategory[] = [
  category('cake-tins', 'Cake Tins', ['cake-tins-150mm', 'bakery-display-tins', 'cake-canisters', 'plum-cake-tins']),
  category('cookie-canisters', 'Cookie Canisters', ['cookie-canisters', 'cookie-canister-stack']),
  category('health-mix', 'Health Mix Packs', ['health-mix-canisters', 'powder-canisters-tall', 'powder-canisters-short']),
  category('dry-fruits', 'Dry Fruit Canisters', ['dry-fruit-canisters']),
  category('spices', 'Spice Packaging', []),
  category('tea-coffee', 'Tea & Coffee Tins', []),
  category('gift-hampers', 'Gift Hampers', []),
  category('custom-branding', 'Custom Branding', ['format-range', 'printed-lids']),
]
