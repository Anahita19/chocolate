/* ---------------------------------------------------------------------------
   Central product data for ANAHITA Fine Chocolates.
   Prices are integers in Iranian toman. Categories drive the shop filters.

   Imagery: every visual below is a framing (object-position + zoom) of the two
   boutique photographs, so colour grade and lighting stay consistent. Each
   `image` object accepts any `src`, so real product photography can be dropped
   in later without touching a single component — point `src` at the new file and
   set `focus`/`zoom` to 1.
   --------------------------------------------------------------------------- */

const INTERIOR = '/images/boutique-interior.jpg';
const EXTERIOR = '/images/boutique-exterior.jpg';

export const categories = [
  { id: 'all', label: 'All Chocolates' },
  { id: 'pralines', label: 'Pralines' },
  { id: 'truffles', label: 'Truffles' },
  { id: 'dark', label: 'Dark Chocolate' },
  { id: 'milk', label: 'Milk Chocolate' },
  { id: 'pistachio', label: 'Pistachio' },
  { id: 'hazelnut', label: 'Hazelnut' },
  { id: 'bars', label: 'Signature Bars' },
  { id: 'assortments', label: 'Assortments' },
];

/* Framings read against the two boutique photographs (10 % = one tenth of the
   frame, in object co-ordinates). The display case with the handmade chocolates
   occupies roughly 55–66 % vertically, the illuminated product shelves sit at
   about 30–46 %, and the storefront signage is the top of the exterior shot. */
const showcase = (x, y, zoom) => ({ src: INTERIOR, focus: `${x}% ${y}%`, zoom });

const counter = showcase(50, 60, 1.6);
const giftWall = { src: INTERIOR, focus: '84% 31%', zoom: 2.6 };
const craftMacro = showcase(40, 62, 5);

/** Each product gets a four-frame gallery: its own close-up, then the boutique
 *  context it is photographed in. */
const gallery = (primary) => [primary, counter, giftWall, craftMacro];

const productList = [
  {
    id: 'p-pralines',
    slug: 'handmade-chocolate-pralines',
    name: 'Handmade Chocolate Pralines',
    category: 'pralines',
    price: 1850000,
    weight: '220 g · box of 12',
    boxSize: '12 pralines',
    short: 'A dozen hand-finished pralines with contrasting ganache centres.',
    description:
      'Our signature praline box: twelve pieces, each moulded and finished by hand, arranged to move from the lightest cream ganache to the deepest cocoa. The shells are thin enough to crack cleanly and the centres are soft enough to melt slowly.',
    flavour: 'Cream ganache, toasted nut, a long cocoa finish.',
    ingredients:
      'Cocoa mass, cocoa butter, sugar, milk powder, cream, butter, almonds, hazelnuts, natural vanilla.',
    allergens: 'Contains milk, cream, butter, almonds and hazelnuts. May contain traces of pistachio and sesame.',
    storage: 'Store between 14–18 °C, away from direct light. Best enjoyed within three weeks.',
    image: showcase(30, 60, 4),
    featured: true,
  },
  {
    id: 'p-truffles',
    slug: 'artisan-chocolate-truffles',
    name: 'Artisan Chocolate Truffles',
    category: 'truffles',
    price: 1480000,
    weight: '180 g · box of 9',
    boxSize: '9 truffles',
    short: 'Dusted, hand-rolled truffles with a ganache heart.',
    description:
      'Rolled one at a time and finished with a fine dusting of cocoa. The ganache is whipped just enough to stay airy, so each truffle gives way immediately and dissolves rather than sits heavy.',
    flavour: 'Deep cocoa, warm cream, a whisper of vanilla.',
    ingredients: 'Cocoa mass, cocoa butter, cream, sugar, butter, cocoa powder, natural vanilla.',
    allergens: 'Contains milk, cream and butter. Made in a kitchen that handles nuts and sesame.',
    storage: 'Keep cool at 14–18 °C and serve at room temperature. Best within two weeks.',
    image: showcase(62, 62, 4),
    featured: true,
  },
  {
    id: 'p-dark',
    slug: 'dark-chocolate-collection',
    name: 'Dark Chocolate Collection',
    category: 'dark',
    price: 2240000,
    weight: '300 g · box of 16',
    boxSize: '16 pieces',
    short: 'Sixteen dark pieces, from 60% to a bitter, intense 78%.',
    description:
      'A box for those who like their chocolate dark. Sixteen pieces arranged by cocoa intensity, so you can taste your way up from rounded and fruity to a firm, almost savoury finish.',
    flavour: 'Dried fruit, roasted cocoa, a dry and lasting finish.',
    ingredients: 'Cocoa mass, cocoa butter, sugar, cocoa nibs, natural vanilla.',
    allergens: 'May contain traces of milk, nuts and sesame.',
    storage: 'Store between 14–18 °C, away from direct light. Best within four weeks.',
    image: showcase(44, 57, 3.4),
    featured: true,
  },
  {
    id: 'p-milk',
    slug: 'milk-chocolate-collection',
    name: 'Milk Chocolate Collection',
    category: 'milk',
    price: 2120000,
    weight: '300 g · box of 16',
    boxSize: '16 pieces',
    short: 'Soft, rounded milk chocolate with caramel and nut centres.',
    description:
      'Rounder and gentler than our dark box: sixteen milk chocolate pieces with caramel, praline and cream fillings, finished with a light gloss.',
    flavour: 'Caramel, warm milk, toasted hazelnut.',
    ingredients: 'Sugar, cocoa butter, cocoa mass, whole milk powder, cream, butter, hazelnuts, natural vanilla.',
    allergens: 'Contains milk, cream, butter and hazelnuts. May contain traces of pistachio.',
    storage: 'Store between 14–18 °C. Best enjoyed within three weeks.',
    image: showcase(74, 60, 3.6),
    featured: true,
  },
  {
    id: 'p-pistachio',
    slug: 'pistachio-pralines',
    name: 'Pistachio Pralines',
    category: 'pistachio',
    price: 2350000,
    weight: '240 g · box of 12',
    boxSize: '12 pralines',
    short: 'Pistachio praline under milk chocolate, topped with a whole nut.',
    description:
      'Ground pistachio worked into a smooth praline, set under milk chocolate and finished with a whole pistachio on top. One of the most requested pieces in the boutique.',
    flavour: 'Green pistachio, soft caramel sweetness, milk chocolate.',
    ingredients: 'Pistachios, sugar, cocoa butter, cocoa mass, whole milk powder, cream, butter, natural vanilla.',
    allergens: 'Contains pistachio, milk, cream and butter. May contain traces of other nuts and sesame.',
    storage: 'Store between 14–18 °C, away from direct light. Best within three weeks.',
    image: showcase(52, 63, 4.6),
    featured: true,
  },
  {
    id: 'p-hazelnut',
    slug: 'hazelnut-chocolate',
    name: 'Hazelnut Chocolate',
    category: 'hazelnut',
    price: 1980000,
    weight: '240 g · box of 12',
    boxSize: '12 pieces',
    short: 'Roasted hazelnut praline in dark and milk chocolate.',
    description:
      'Toasted hazelnuts, ground fine and folded into a dark praline, then paired with a milk chocolate shell. Nutty first, chocolate second, and never cloying.',
    flavour: 'Roasted hazelnut, caramelised sugar, cocoa.',
    ingredients: 'Hazelnuts, cocoa mass, cocoa butter, sugar, whole milk powder, cream, natural vanilla.',
    allergens: 'Contains hazelnuts and milk. May contain traces of pistachio, almond and sesame.',
    storage: 'Store between 14–18 °C. Best within three weeks.',
    image: showcase(20, 61, 4.2),
    featured: true,
  },
  {
    id: 'p-bars',
    slug: 'signature-chocolate-bars',
    name: 'Signature Chocolate Bars',
    category: 'bars',
    price: 1260000,
    weight: '240 g · set of 3',
    boxSize: '3 bars',
    short: 'Three tempered bars: dark, milk and pistachio.',
    description:
      'Three bars, tempered until they snap cleanly and shine. A dark bar, a milk bar, and a pistachio bar flecked with whole nuts — wrapped in deep espresso paper with gold foil.',
    flavour: 'Clean cocoa, sweet cream, toasted pistachio.',
    ingredients: 'Cocoa mass, cocoa butter, sugar, whole milk powder, pistachios, natural vanilla.',
    allergens: 'Contains milk and pistachio. May contain traces of other nuts and sesame.',
    storage: 'Store between 14–18 °C, away from direct light. Best within six weeks.',
    image: showcase(50, 45, 3.2),
    featured: true,
  },
  {
    id: 'p-assortment',
    slug: 'premium-chocolate-assortments',
    name: 'Premium Chocolate Assortments',
    category: 'assortments',
    price: 3480000,
    weight: '480 g · box of 24',
    boxSize: '24 pieces',
    short: 'Our widest box — twenty-four pieces across the whole range.',
    description:
      'The complete ANAHITA selection: twenty-four pieces drawn from every family we make, arranged in the boutique order so the box tells a story as it empties.',
    flavour: 'Cream ganache, pistachio, hazelnut, dark cocoa, caramel.',
    ingredients:
      'Cocoa mass, cocoa butter, sugar, whole milk powder, cream, butter, pistachios, hazelnuts, almonds, natural vanilla.',
    allergens: 'Contains milk, cream, butter, pistachio, hazelnut and almond. May contain traces of sesame.',
    storage: 'Store between 14–18 °C, away from direct light. Best within four weeks.',
    image: showcase(50, 61, 3),
    featured: true,
  },
  /* --- further catalogue, shown in the shop and in search ------------------ */
  {
    id: 'p-salted-caramel',
    slug: 'salted-caramel-truffles',
    name: 'Salted Caramel Truffles',
    category: 'truffles',
    price: 1620000,
    weight: '180 g · box of 9',
    boxSize: '9 truffles',
    short: 'Soft caramel centre in dark chocolate, finished with sea salt.',
    description:
      'Caramel cooked a shade darker than usual, set soft in a dark chocolate shell and finished with a few grains of sea salt.',
    flavour: 'Burnt caramel, salt, bitter cocoa.',
    ingredients: 'Sugar, cream, butter, cocoa mass, cocoa butter, sea salt, natural vanilla.',
    allergens: 'Contains milk, cream and butter. May contain traces of nuts and sesame.',
    storage: 'Keep cool at 14–18 °C. Best within two weeks.',
    image: showcase(38, 64, 4.8),
  },
  {
    id: 'p-rose-cardamom',
    slug: 'rose-and-cardamom-pralines',
    name: 'Rose & Cardamom Pralines',
    category: 'pralines',
    price: 1890000,
    weight: '220 g · box of 12',
    boxSize: '12 pralines',
    short: 'A perfumed praline of rose and green cardamom.',
    description:
      'Rose water and freshly ground green cardamom folded into a pale ganache, sealed in a thin dark shell. Floral, warm, and unmistakably Persian.',
    flavour: 'Rose, green cardamom, cream.',
    ingredients: 'Cocoa mass, cocoa butter, cream, sugar, rose water, cardamom, natural vanilla.',
    allergens: 'Contains milk, cream and butter. May contain traces of nuts and sesame.',
    storage: 'Store between 14–18 °C. Best within two weeks.',
    image: showcase(58, 57, 4.2),
  },
  {
    id: 'p-orange-cinnamon',
    slug: 'orange-and-cinnamon-dark',
    name: 'Orange & Cinnamon Dark',
    category: 'dark',
    price: 1540000,
    weight: '160 g · box of 8',
    boxSize: '8 pieces',
    short: 'Candied orange peel and cinnamon in dark chocolate.',
    description:
      'Dark chocolate with strips of candied orange peel and a warm cinnamon note — a winter box we keep on the counter all year.',
    flavour: 'Candied orange, cinnamon, dark cocoa.',
    ingredients: 'Cocoa mass, cocoa butter, sugar, orange peel, glucose, cinnamon, natural vanilla.',
    allergens: 'May contain traces of milk, nuts and sesame.',
    storage: 'Store between 14–18 °C, away from direct light. Best within three weeks.',
    image: showcase(68, 63, 4.4),
  },
  {
    id: 'p-white-pistachio',
    slug: 'white-chocolate-pistachio',
    name: 'White Chocolate & Pistachio',
    category: 'pistachio',
    price: 1760000,
    weight: '200 g · box of 10',
    boxSize: '10 pieces',
    short: 'Ivory chocolate with pistachio and a hint of rose.',
    description:
      'A pale, ivory chocolate with crushed pistachio and the faintest suggestion of rose — the lightest piece we make, and the one that disappears first.',
    flavour: 'Sweet cream, pistachio, rose.',
    ingredients: 'Sugar, cocoa butter, whole milk powder, pistachios, rose water, natural vanilla.',
    allergens: 'Contains milk and pistachio. May contain traces of other nuts and sesame.',
    storage: 'Keep cool at 14–18 °C. Best within two weeks.',
    image: showcase(46, 65, 4.8),
  },
];

/* Every product carries a four-frame gallery: its own close-up, then the boutique
   context it is photographed in. */
export const products = productList.map((product) => ({
  ...product,
  gallery: gallery(product.image),
}));

export const giftBoxes = [
  {
    id: 'g-signature',
    slug: 'signature-gift-box',
    name: 'Signature Gift Box',
    price: 2850000,
    pieces: '16 pieces',
    short: 'Rigid espresso-brown box, gold wordmark, satin ribbon.',
    description:
      'Our house gift box in deep espresso board, stamped with the ANAHITA wordmark in champagne gold and tied with a dark satin ribbon. Sixteen pieces in an ivory insert.',
    image: { src: EXTERIOR, focus: '25% 62%', zoom: 3 },
  },
  {
    id: 'g-grand',
    slug: 'grand-chocolate-collection',
    name: 'Grand Chocolate Collection',
    price: 5900000,
    pieces: '32 pieces',
    short: 'Our largest presentation box, in two layers.',
    description:
      'The grand box: thirty-two pieces across two ivory trays, with a gold-foiled card and a ribbon finished by hand. The one we make most often for celebrations.',
    image: { src: INTERIOR, focus: '84% 31%', zoom: 2.6 },
  },
  {
    id: 'g-praline',
    slug: 'artisan-praline-box',
    name: 'Artisan Praline Box',
    price: 3240000,
    pieces: '20 pralines',
    short: 'Twenty hand-finished pralines, arranged in rows.',
    description:
      'Twenty pralines, each one finished by hand and packed in a single ivory tray so the decoration stays visible when the lid comes off.',
    image: showcase(52, 62, 4.2),
  },
  {
    id: 'g-celebration',
    slug: 'celebration-collection',
    name: 'Celebration Collection',
    price: 4150000,
    pieces: '24 pieces + candles',
    short: 'Chocolate, candles and a message card.',
    description:
      'Made for birthdays and anniversaries: twenty-four pieces, two slim candles and a gold message card printed with your words.',
    image: { src: EXTERIOR, focus: '78% 68%', zoom: 3 },
  },
  {
    id: 'g-personal',
    slug: 'personalised-chocolate-gifts',
    name: 'Personalised Chocolate Gifts',
    price: 3600000,
    pieces: 'Your selection',
    short: 'Choose the box, the chocolates, the ribbon and the message.',
    description:
      'Build the gift yourself: box size, assortment, ribbon and a hand-written message, assembled and tied in the boutique before it leaves us.',
    image: { src: INTERIOR, focus: '76% 60%', zoom: 3.6 },
    studio: true,
  },
];

export const collections = [
  {
    id: 'c-signature',
    slug: 'signature-collection',
    title: 'The Signature Collection',
    copy: 'The pieces we are known for: pralines, truffles and the boxes they arrive in.',
    image: showcase(50, 62, 2.6),
    items: ['p-pralines', 'p-truffles', 'p-pistachio', 'p-assortment'],
  },
  {
    id: 'c-dark',
    slug: 'dark-and-intense',
    title: 'Dark & Intense',
    copy: 'For those who take their chocolate dark, dry and long-finishing.',
    image: showcase(34, 62, 4.2),
    items: ['p-dark', 'p-orange-cinnamon', 'p-salted-caramel', 'p-bars'],
  },
  {
    id: 'c-gifting',
    slug: 'the-gifting-collection',
    title: 'The Gifting Collection',
    copy: 'Boxed, ribboned and ready — the gifts we wrap most often in the boutique.',
    image: { src: EXTERIOR, focus: '26% 62%', zoom: 3 },
    items: ['g-signature', 'g-grand', 'g-celebration', 'g-personal'],
    gift: true,
  },
  {
    id: 'c-pistachio',
    slug: 'pistachio-and-nut',
    title: 'Pistachio & Nut',
    copy: 'Pistachio, hazelnut and almond, worked into soft pralines.',
    image: showcase(70, 61, 4),
    items: ['p-pistachio', 'p-hazelnut', 'p-white-pistachio', 'p-pralines'],
  },
];

/* Bestsellers are a hand-picked, editable list — not a claim about sales data. */
export const bestsellerIds = [
  'p-pistachio',
  'p-truffles',
  'p-pralines',
  'p-hazelnut',
  'p-dark',
  'p-assortment',
];

export const findProduct = (slug) => products.find((p) => p.slug === slug);
export const findGiftBox = (slug) => giftBoxes.find((g) => g.slug === slug);
export const findCollection = (slug) => collections.find((c) => c.slug === slug);
