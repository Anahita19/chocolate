/* Gift atelier options. Prices are integer toman additions on top of the base
   gift box, so the team can re-price without touching a component. */
export const giftingBasePrice = 1800000;

export const giftBoxSizes = [
  { id: 'petite', label: 'Petite', detail: '9 pieces', extra: 0 },
  { id: 'signature', label: 'Signature', detail: '16 pieces', extra: 900000 },
  { id: 'grand', label: 'Grand', detail: '24 pieces', extra: 1900000 },
];

export const giftAssortments = [
  { id: 'signature', label: 'Signature selection', extra: 0 },
  { id: 'dark', label: 'Dark & intense', extra: 250000 },
  { id: 'pistachio', label: 'Pistachio & nut', extra: 350000 },
  { id: 'milk', label: 'Milk & caramel', extra: 150000 },
  { id: 'mixed', label: 'Mixed house selection', extra: 300000 },
];

export const giftRibbons = [
  { id: 'espresso', label: 'Deep espresso satin', extra: 0 },
  { id: 'gold', label: 'Champagne gold silk', extra: 120000 },
  { id: 'black', label: 'Matte black', extra: 120000 },
  { id: 'ivory', label: 'Warm ivory silk', extra: 120000 },
];

export const giftOccasions = [
  'Birthday',
  'Anniversary',
  'Wedding',
  'Celebration',
  'Corporate gifting',
  'A quiet thank you',
];

export const eventTypes = [
  'Corporate gifting',
  'Client appreciation',
  'Staff celebration',
  'Wedding',
  'Conference or event',
  'Other',
];

/** Total price for one personalised gift box. */
export function giftPrice(selection) {
  const size = giftBoxSizes.find((s) => s.id === selection.size);
  const assortment = giftAssortments.find((a) => a.id === selection.assortment);
  const ribbon = giftRibbons.find((r) => r.id === selection.ribbon);
  return (
    giftingBasePrice + (size?.extra || 0) + (assortment?.extra || 0) + (ribbon?.extra || 0)
  );
}

/** Human-readable summary of a gift configuration, used in the cart. */
export function giftSummary(selection) {
  const size = giftBoxSizes.find((s) => s.id === selection.size);
  const assortment = giftAssortments.find((a) => a.id === selection.assortment);
  const ribbon = giftRibbons.find((r) => r.id === selection.ribbon);
  const parts = [size?.label, assortment?.label, ribbon?.label].filter(Boolean);
  return parts.join(' · ');
}
