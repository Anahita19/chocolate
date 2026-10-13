/** Formatting helpers. Prices are stored as integers in Iranian toman. */

export function formatToman(value, { withLabel = true } = {}) {
  const n = Number(value) || 0;
  const digits = n.toLocaleString('en-US');
  return withLabel ? `${digits} ${'Toman'}` : digits;
}

export function formatCount(value) {
  return Number(value) || 0;
}

export function orderReference() {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
    now.getDate(),
  ).padStart(2, '0')}`;
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `ANH-${stamp}-${rand}`;
}
