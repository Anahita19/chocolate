import { useMemo, useState } from 'react';
import { useCart } from '../lib/cart.jsx';
import { formatToman, toPersianDigits } from '../lib/format.js';
import { boxPricing } from '../lib/pricing.js';
import { MinusIcon, PlusIcon, TrashIcon } from './Icons.jsx';

/* ---------------------------------------------------------------------------
   «جعبه را خودت بچین» — the customer arranges the box on the product page.

   The tray holds exactly as many pieces as the box does (`capacity`), and every
   one of them is a chocolate of this boutique (`pieces`). A piece goes in from
   the picker and comes back out with a tap on the tray, so nothing is ever
   half-committed. The price is the box's own price plus every piece that went
   into it (see `boxPricing` in `lib/pricing.js` — a piece with no price yet
   simply adds nothing), and the arrangement travels with the order as the line's
   composition (see `addBuiltBox` in `lib/cart.jsx`).
   --------------------------------------------------------------------------- */

export default function BoxBuilder({ product, pieces, capacity }) {
  const { addBuiltBox } = useCart();
  const [counts, setCounts] = useState({});

  const chosen = useMemo(
    () =>
      pieces
        .filter((piece) => counts[piece.id] > 0)
        .map((piece) => ({
          id: piece.id,
          name: piece.name,
          image: piece.image,
          piecePrice: piece.piecePrice,
          count: counts[piece.id],
        })),
    [counts, pieces],
  );

  const filled = chosen.reduce((sum, piece) => sum + piece.count, 0);
  const remaining = capacity - filled;
  const full = remaining === 0;
  const pricing = boxPricing(product, chosen);

  const addPiece = (piece) =>
    setCounts((current) => {
      const used = Object.values(current).reduce((sum, count) => sum + count, 0);
      if (used >= capacity) return current;
      return { ...current, [piece.id]: (current[piece.id] || 0) + 1 };
    });

  const takePiece = (piece) =>
    setCounts((current) => ({
      ...current,
      [piece.id]: Math.max(0, (current[piece.id] || 0) - 1),
    }));

  /* One entry per slot, in the order the pieces went in. */
  const tray = chosen.flatMap((piece) => Array.from({ length: piece.count }, () => piece));

  return (
    <section className="section section--marble builder" id="build-box">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">چیدمان دلخواه</span>
            <h2 className="section-head__title">جعبه را خودت بچین</h2>
          </div>
          <p className="lede" style={{ maxWidth: '46ch' }}>
            {toPersianDigits(capacity)} جای خالی در این جعبه هست و پر کردنشان با شماست. از فهرست
            شکلات‌ها انتخاب کنید و اگر پشیمان شدید، روی همان قطعه در سینی بزنید تا برداشته شود. قیمت
            جعبه پایه است و قیمت قطعه‌هایی که انتخاب می‌کنید روی آن حساب می‌شود؛ همین چیدمان همراه سفارش به
            بوتیک می‌رسد.
          </p>
        </div>

        <div className="builder__grid">
          <div className="builder__tray">
            <div className="builder__tray-head">
              <span className="builder__tray-title">{product.boxSize}</span>
              <span className="builder__count">
                {toPersianDigits(filled)} از {toPersianDigits(capacity)}
              </span>
            </div>

            <div className="builder__slots" aria-label="سینی جعبه">
              {Array.from({ length: capacity }, (unused, index) => {
                const piece = tray[index];
                return piece ? (
                  <button
                    type="button"
                    key={`${piece.id}-${index}`}
                    className="slot slot--filled"
                    onClick={() => takePiece(piece)}
                    aria-label={`برداشتن ${piece.name} از جعبه`}
                  >
                    <img
                      src={piece.image.src}
                      alt=""
                      style={{
                        objectPosition: piece.image.focus,
                        transform: `scale(${piece.image.zoom || 1})`,
                      }}
                    />
                  </button>
                ) : (
                  <span className="slot" key={`empty-${index}`} aria-hidden="true" />
                );
              })}
            </div>

            <div className="gift-progress__track" aria-hidden="true">
              <div className="gift-progress__bar" style={{ width: `${(filled / capacity) * 100}%` }} />
            </div>

            <div className="builder__price" aria-live="polite">
              <span className="builder__price-line">
                <span>قیمت جعبه</span>
                <span>{formatToman(pricing.base)}</span>
              </span>
              <span className="builder__price-line">
                <span>قطعه‌های انتخابی</span>
                <span>{formatToman(pricing.pieces)}</span>
              </span>
              <span className="builder__price-line builder__price-line--total">
                <span>جمع جعبه</span>
                <span>{formatToman(pricing.total)}</span>
              </span>
            </div>

            <p className="builder__hint" aria-live="polite">
              {full
                ? 'جعبه کامل شد؛ آماده‌ی افزودن به سبد است.'
                : `${toPersianDigits(remaining)} جای دیگر در جعبه خالی است.`}
            </p>

            <div className="builder__actions">
              <button
                type="button"
                className="remove-btn"
                onClick={() => setCounts({})}
                disabled={filled === 0}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <TrashIcon width={14} height={14} /> پاک کردن جعبه
              </button>
              <button
                type="button"
                className="btn btn--gold"
                disabled={!full}
                onClick={() => addBuiltBox(product, chosen)}
              >
                افزودن جعبه‌ی چیده‌شده · {formatToman(pricing.total)}
              </button>
            </div>
          </div>

          <div className="builder__picker">
            <div className="builder__picker-head">
              <span className="builder__picker-title">شکلات‌های آناهیتا</span>
              {/* On a phone the tray has scrolled away by the time the customer
                  reaches the list, so the count travels with the list. */}
              <span className="builder__count builder__count--inline">
                {toPersianDigits(filled)} از {toPersianDigits(capacity)}
              </span>
            </div>
            <ul className="builder__list">
              {pieces.map((piece) => {
                const count = counts[piece.id] || 0;
                return (
                  <li
                    className={`builder__piece ${count > 0 ? 'builder__piece--chosen' : ''}`}
                    key={piece.id}
                  >
                    <span className="builder__piece-media">
                      <img
                        src={piece.image.src}
                        alt=""
                        style={{
                          objectPosition: piece.image.focus,
                          transform: `scale(${piece.image.zoom || 1})`,
                        }}
                      />
                    </span>
                    <span className="builder__piece-name">{piece.name}</span>
                    <span className="stepper">
                      <button
                        type="button"
                        onClick={() => takePiece(piece)}
                        disabled={count === 0}
                        aria-label={`برداشتن ${piece.name} از جعبه`}
                      >
                        <MinusIcon width={14} height={14} />
                      </button>
                      <span className="stepper__value" aria-label={`${piece.name}: ${toPersianDigits(count)}`}>
                        {toPersianDigits(count)}
                      </span>
                      <button
                        type="button"
                        onClick={() => addPiece(piece)}
                        disabled={full}
                        aria-label={`افزودن ${piece.name} به جعبه`}
                      >
                        <PlusIcon width={14} height={14} />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
