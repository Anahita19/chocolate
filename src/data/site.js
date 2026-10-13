/* Central brand + boutique information. Everything the boutique team may want to
   edit lives here — including the fields that must be filled in before launch
   (address, hours, phone, social accounts). Empty fields render as an elegant
   "to be confirmed" state rather than invented details. */
export const site = {
  brand: 'ANAHITA',
  descriptor: 'FINE CHOCOLATES',
  tagline: 'Where Every Chocolate Becomes an Experience',
  heroIntro:
    'Discover exquisite handmade chocolates, carefully crafted flavours, and beautifully presented gifts in a world of warmth, elegance, and indulgence.',

  /* Prices are held in Iranian toman (integers, no decimals). */
  currency: {
    code: 'IRT',
    label: 'Toman',
    short: 'T',
  },

  /* Complimentary gift bag unlocked above this cart subtotal (toman).
     Set to 0 to switch the incentive off. */
  giftBagThreshold: 3000000,

  nav: [
    { label: 'Home', to: '/' },
    { label: 'Chocolates', to: '/chocolates' },
    { label: 'Gift Boxes', to: '/gift-boxes' },
    { label: 'Collections', to: '/collections' },
    { label: 'Our Story', to: '/our-story' },
    { label: 'The Boutique', to: '/boutique' },
    { label: 'Contact', to: '/contact' },
  ],

  boutique: {
    name: 'ANAHITA Fine Chocolates',
    /* --- fill these in (left empty on purpose: no invented details) --- */
    addressLines: [],
    hours: [],
    phone: '',
    email: '',
    mapUrl: '',
    instagramUrl: '',
    whatsappUrl: '',
    telegramUrl: '',
    /* ------------------------------------------------------------------ */
    services: [
      'Handmade pralines and truffles, made in small batches',
      'Chocolate gift boxes and seasonal assortments',
      'Personalised gifts with a hand-written message',
      'Corporate and celebration orders',
    ],
  },

  values: [
    {
      title: 'Crafted with Care',
      copy: 'Each piece is finished by hand, one at a time, in small batches.',
    },
    {
      title: 'Exceptional Flavours',
      copy: 'Balanced fillings, deep cocoa and a finish that lingers beautifully.',
    },
    {
      title: 'Beautiful Presentation',
      copy: 'Chocolate should arrive looking as considered as it tastes.',
    },
    {
      title: 'Thoughtful Gifting',
      copy: 'From the ribbon to the message card, the gift is the whole experience.',
    },
  ],
};

export const craft = {
  eyebrow: 'The Craft',
  title: 'Small Details. Extraordinary Chocolate.',
  body: 'Every detail matters, from the balance of flavours to the final presentation. Our approach celebrates the beauty of handcrafted chocolate and the pleasure of sharing something exceptional.',
  notes: [
    'Tempering chocolate by hand until it holds a clean, glossy snap.',
    'Filling and sealing each praline individually, the same day it is finished.',
    'Decorating by hand — a pistachio, a hazelnut, a thread of gold.',
    'Packing every order in the boutique, with the ribbon tied to order.',
  ],
};

export const boutiqueStory = {
  eyebrow: 'The Boutique',
  title: 'Step Into the World of ANAHITA',
  body: 'A welcoming chocolate boutique where exceptional flavours, beautiful presentation, and thoughtful service come together.',
};

/* Framings are read as `object-position` / zoom over the boutique photography.
   Each entry is a genuinely different view of the same location, so lighting and
   architecture stay consistent across the gallery. */
export const boutiqueGallery = [
  {
    src: '/images/boutique-exterior.jpg',
    focus: '50% 30%',
    zoom: 1.05,
    alt: 'ANAHITA storefront in the evening, warm light glowing through the glass',
    caption: 'The entrance',
    wide: true,
  },
  {
    src: '/images/boutique-interior.jpg',
    focus: '50% 45%',
    zoom: 1,
    alt: 'Wide view of the boutique interior with the curved illuminated chocolate counter',
    caption: 'The chocolate counter',
    wide: true,
  },
  {
    src: '/images/boutique-interior.jpg',
    focus: '24% 60%',
    zoom: 2.6,
    alt: 'The left end of the curved glass display where the case begins',
    caption: 'Choosing by the case',
  },
  {
    src: '/images/boutique-interior.jpg',
    focus: '52% 62%',
    zoom: 4.6,
    alt: 'Close view of the glass display filled with handmade pralines and truffles',
    caption: 'Handmade pralines',
  },
  {
    src: '/images/boutique-interior.jpg',
    focus: '84% 31%',
    zoom: 2.8,
    alt: 'Illuminated shelves in arched alcoves displaying ANAHITA gift boxes',
    caption: 'The gift wall',
  },
  {
    src: '/images/boutique-exterior.jpg',
    focus: '50% 12%',
    zoom: 2,
    alt: 'The ANAHITA wordmark in champagne gold on dark marble',
    caption: 'The wordmark',
  },
];

export const instagramGallery = [
  { src: '/images/boutique-interior.jpg', focus: '46% 62%', zoom: 4, alt: 'Assorted handmade chocolates in the display case' },
  { src: '/images/boutique-interior.jpg', focus: '84% 33%', zoom: 2.8, alt: 'Gift boxes arranged on illuminated shelves' },
  { src: '/images/boutique-exterior.jpg', focus: '26% 62%', zoom: 3, alt: 'Boxed chocolates displayed in the boutique window' },
  { src: '/images/boutique-interior.jpg', focus: '28% 62%', zoom: 4.4, alt: 'Close view of decorated pralines' },
  { src: '/images/boutique-exterior.jpg', focus: '50% 18%', zoom: 1.8, alt: 'The ANAHITA gold signage above the entrance' },
  { src: '/images/boutique-interior.jpg', focus: '20% 35%', zoom: 2.6, alt: 'Pendant lights above the marble counter' },
];
