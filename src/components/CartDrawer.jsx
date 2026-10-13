import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../lib/cart.jsx';
import { formatToman } from '../lib/format.js';
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
        aria-label="Shopping bag"
        tabIndex={-1}
      >
        <header className="drawer__head">
          <span className="drawer__title">Your bag ({count})</span>
          <button type="button" className="icon-btn" onClick={closeCart} aria-label="Close bag">
            <CloseIcon />
          </button>
        </header>

        <div className="drawer__body">
          {items.length === 0 ? (
            <div className="empty-state">
              <p style={{ margin: 0 }}>Your bag is empty.</p>
              <Link to="/chocolates" className="btn" onClick={closeCart}>
                Browse the chocolate case
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
                      “{item.selection.message}”
                    </p>
                  )}
                  <div className="line-item__row">
                    <span className="stepper">
                      <button
                        type="button"
                        onClick={() => setQty(item.key, item.qty - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <MinusIcon width={14} height={14} />
                      </button>
                      <span className="stepper__value" aria-live="polite">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(item.key, item.qty + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
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
                    <TrashIcon width={14} height={14} /> Remove
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
                  ? 'Your complimentary gold-foil gift bag is included.'
                  : `Add ${formatToman(remainingForGift)} more to receive a complimentary gold-foil gift bag.`}
              </span>
            </div>
          )}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatToman(subtotal)}</span>
          </div>
          <p className="form-note" style={{ margin: 0 }}>
            Delivery is arranged with the boutique after your order request is reviewed.
          </p>
          <Link
            to="/checkout"
            className="btn btn--gold btn--block"
            onClick={closeCart}
            aria-disabled={items.length === 0}
            style={items.length === 0 ? { pointerEvents: 'none', opacity: 0.45 } : undefined}
          >
            Proceed to checkout
          </Link>
          <Link to="/personalise" className="link-arrow" onClick={closeCart} style={{ justifyContent: 'center' }}>
            Add a personalised gift
          </Link>
        </footer>
      </aside>
    </div>
  );
}
