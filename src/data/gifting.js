/* گزینههای آتلیهی هدیه. قیمتها به تومان و بهصورت مبلغ افزوده بر قیمت پایهی
   جعبه هستند، تا تیم بتواند بدون دست زدن به کامپوننتها قیمتگذاری را تغییر دهد. */
export const giftingBasePrice = 1800000;

export const giftBoxSizes = [
  { id: 'petite', label: 'کوچک', detail: '۹ قطعه', extra: 0 },
  { id: 'signature', label: 'امضای آناهیتا', detail: '۱۶ قطعه', extra: 900000 },
  { id: 'grand', label: 'بزرگ', detail: '۲۴ قطعه', extra: 1900000 },
];

export const giftAssortments = [
  { id: 'signature', label: 'انتخاب امضای آناهیتا', extra: 0 },
  { id: 'dark', label: 'تلخ و پرقدرت', extra: 250000 },
  { id: 'pistachio', label: 'پسته و مغزها', extra: 350000 },
  { id: 'milk', label: 'شیری و کارامل', extra: 150000 },
  { id: 'mixed', label: 'ترکیب خانه', extra: 300000 },
];

export const giftRibbons = [
  { id: 'espresso', label: 'ساتن قهوهای تیره', extra: 0 },
  { id: 'gold', label: 'ابریشم طلایی شامپاینی', extra: 120000 },
  { id: 'black', label: 'مشکی مات', extra: 120000 },
  { id: 'ivory', label: 'ابریشم عاجیرنگ', extra: 120000 },
];

export const giftOccasions = [
  'تولد',
  'سالگرد',
  'ازدواج',
  'جشن و مناسبت',
  'هدیهی سازمانی',
  'یک سپاس بیصدا',
];

export const eventTypes = [
  'هدیهی سازمانی',
  'قدردانی از مشتریان',
  'جشن کارکنان',
  'ازدواج',
  'کنفرانس یا رویداد',
  'سایر',
];

/** قیمت کل یک جعبهی هدیهی شخصیسازیشده. */
export function giftPrice(selection) {
  const size = giftBoxSizes.find((s) => s.id === selection.size);
  const assortment = giftAssortments.find((a) => a.id === selection.assortment);
  const ribbon = giftRibbons.find((r) => r.id === selection.ribbon);
  return (
    giftingBasePrice + (size?.extra || 0) + (assortment?.extra || 0) + (ribbon?.extra || 0)
  );
}

/** خلاصهی خوانا از یک ترکیب هدیه، برای نمایش در سبد خرید. */
export function giftSummary(selection) {
  const size = giftBoxSizes.find((s) => s.id === selection.size);
  const assortment = giftAssortments.find((a) => a.id === selection.assortment);
  const ribbon = giftRibbons.find((r) => r.id === selection.ribbon);
  const parts = [size?.label, assortment?.label, ribbon?.label].filter(Boolean);
  return parts.join(' · ');
}
