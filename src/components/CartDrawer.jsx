import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../lib/cart.jsx';
import { formatToman, toPersianDigits } from '../lib/format.js';
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons.jsx';

export default function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    isOpen,
    closeCart,
    setQty,
    removeItem,
    threshold,
    remainingForGift,
    giftUnlocked,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, closeCart]);

  const progress = threshold > 0 ? Math.min(100, (subtotal / threshold) * 100) : 0;

  return (
    <div className={`drawer ${isOpen ? 'drawer--open' : ''}`} aria-hidden={!isOpen}>
      <div className="drawer__scrim" onClick={closeCart} />
      <aside
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
        tabIndex={-1}
      >
        <header className="drawer__head">
          <span className="drawer__title">سبد شما ({toPersianDigits(count)})</span>
          <button type="button" className="icon-btn" onClick={closeCart} aria-label="بستن سبد">
            <CloseIcon />
          </button>
        </header>

        <div className="drawer__body">
          {items.length === 0 ? (
            <div className="empty-state">
              <p style={{ margin: 0 }}>سبد شما خالی است.</p>
              <Link to="/chocolates" className="btn" onClick={closeCart}>
                دیدن ویترین شکلاتها
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <article className="line-item" key={item.key}>
                <div className="line-item__media">
                  <img
                    src={item.image.src}
                    alt=""
                    style={{
                      objectPosition: item.image.focus,
                      transform: `scale(${item.image.zoom || 1})`,
                    }}
                  />
                </div>
                <div>
                  <h3 className="line-item__name">
                    {item.kind === 'custom' ? (
                      item.name
                    ) : (
                      <Link to={item.kind === 'product' ? `/product/${item.slug}` : '/gift-boxes'} onClick={closeCart}>
                        {item.name}
                      </Link>
                    )}
                  </h3>
                  <p className="line-item__meta">{item.weight}</p>
                  {item.selection?.message && (
                    <p className="line-item__meta" style={{ textTransform: 'none', letterSpacing: 0 }}>
                      «{item.selection.message}»
                    </p>
                  )}
                  <div className="line-item__row">
                    <span className="stepper">
                      <button
                        type="button"
                        onClick={() => setQty(item.key, item.qty - 1)}
                        aria-label={`کم کردن تعداد ${item.name}`}
                      >
                        <MinusIcon width={14} height={14} />
                      </button>
                      <span className="stepper__value" aria-live="polite">
                        {toPersianDigits(item.qty)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(item.key, item.qty + 1)}
                        aria-label={`افزودن تعداد ${item.name}`}
                      >
                        <PlusIcon width={14} height={14} />
                      </button>
                    </span>
                    <span className="line-item__price">{formatToman(item.price * item.qty)}</span>
                  </div>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeItem(item.key)}
                    style={{ marginTop: '0.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <TrashIcon width={14} height={14} /> حذف
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <footer className="drawer__foot">
          {threshold > 0 && (
            <div className="gift-progress">
              <div className="gift-progress__track">
                <div className="gift-progress__bar" style={{ width: `${progress}%` }} />
              </div>
              <span>
                {giftUnlocked
                  ? 'کیسهی هدیهی رایگان فویل طلایی برای شما در نظر گرفته شد.'
                  : `${formatToman(remainingForGift)} دیگر اضافه کنید تا کیسهی هدیهی فویل طلایی رایگان بگیرید.`}
              </span>
            </div>
          )}

          <div className="summary-row">
            <span>جمع جزء</span>
            <span>{formatToman(subtotal)}</span>
          </div>
          <p className="form-note" style={{ margin: 0 }}>
            زمان و هزینهی ارسال پس از بررسی سفارش، با شما هماهنگ میشود.
          </p>
          <Link
            to="/checkout"
            className="btn btn--gold btn--block"
            onClick={closeCart}
            aria-disabled={items.length === 0}
            style={items.length === 0 ? { pointerEvents: 'none', opacity: 0.45 } : undefined}
          >
            تکمیل سفارش
          </Link>
          <Link to="/personalise" className="link-arrow" onClick={closeCart} style={{ justifyContent: 'center' }}>
            افزودن یک هدیهی شخصیسازیشده
          </Link>
        </footer>
      </aside>
    </div>
  );
}
