/** Formatting helpers. Prices are stored as integers in Iranian toman.
 *  The site is Persian, so every figure the visitor reads is written in
 *  Persian digits with the Persian thousands separator. */

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** 1850000 → «۱٬۸۵۰٬۰۰۰». Use for any number shown in the interface. */
export function toPersianDigits(value) {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

export function formatToman(value, { withLabel = true } = {}) {
  const n = Number(value) || 0;
  const digits = toPersianDigits(n.toLocaleString('en-US')).replace(/,/g, '٬');
  return withLabel ? `${digits} تومان` : digits;
}

export function formatCount(value) {
  return Number(value) || 0;
}

const PERSIAN_TO_LATIN = { '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9' };

/** «۱۲ پرالین» → 12. Reads the piece count out of a box description, so the box
 *  builder knows how many slots a box has. Returns 0 when the text carries no
 *  figure at all. */
export function pieceCount(text) {
  const latin = String(text ?? '').replace(/[۰-۹]/g, (digit) => PERSIAN_TO_LATIN[digit]);
  const match = latin.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

/** Current year in the Persian calendar, e.g. «۱۴۰۵». */
export function persianYear(date = new Date()) {
  return new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(date);
}

/* Order references stay in Latin characters: they are codes the boutique reads
   back over the phone. */
export function orderReference() {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
    now.getDate(),
  ).padStart(2, '0')}`;
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `ANH-${stamp}-${rand}`;
}
