import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../lib/cart.jsx';
import { formatToman, orderReference } from '../lib/format.js';
import { startPayment, submitOrder } from '../lib/integrations.js';
import { CheckIcon } from '../components/Icons.jsx';

const empty = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postcode: '',
  notes: '',
};

export default function Checkout() {
  const { items, subtotal, setQty, removeItem, clear } = useCart();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const set = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    const next = {};
    if (!values.fullName.trim()) next.fullName = 'Please add the name for the order.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = 'Please add a valid email address.';
    }
    if (!values.phone.trim()) next.phone = 'Please add a phone number for delivery.';
    if (!values.address.trim()) next.address = 'Please add the delivery address.';
    if (!values.city.trim()) next.city = 'Please add the city.';
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstField = document.getElementById(`checkout-${Object.keys(next)[0]}`);
      if (firstField) firstField.focus();
      return;
    }

    setSubmitting(true);
    const reference = orderReference();
    const order = {
      reference,
      items: items.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        weight: item.weight,
        selection: item.selection || null,
      })),
      subtotal,
      contact: { ...values },
      placedAt: new Date().toISOString(),
    };

    const [result] = await Promise.all([submitOrder(order), startPayment()]);
    clear();
    setValues(empty);
    setSubmitting(false);
    navigate('/order-confirmation', { state: { order, result } });
  };

  if (items.length === 0) {
    return (
      <>
        <section className="page-hero" style={{ paddingTop: 'clamp(6.5rem, 12vw, 9rem)' }}>
          <div className="shell">
            <span className="eyebrow">Checkout</span>
            <h1>Your bag is empty</h1>
          </div>
        </section>
        <section className="section section--dark">
          <div className="shell empty-cart">
            <p className="lede">Add a box of chocolates and it will appear here, ready for checkout.</p>
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/chocolates" className="btn btn--gold">
                Explore our chocolates
              </Link>
              <Link to="/gift-boxes" className="btn">
                Explore gift boxes
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-hero" style={{ paddingTop: 'clamp(6.5rem, 12vw, 9rem)' }}>
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/chocolates">Chocolates</Link>
            <span aria-hidden="true">/</span>
            <span>Checkout</span>
          </nav>
          <span className="eyebrow">Checkout</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.1rem)' }}>Complete your order request</h1>
          <p className="lede" style={{ marginTop: '1rem' }}>
            No payment is taken on the website yet: your order arrives with the boutique, we confirm
            availability and delivery, and arrange payment with you directly.
          </p>
        </div>
      </section>

      <section className="section section--dark" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell checkout">
          <form onSubmit={onSubmit} noValidate>
            <fieldset className="checkout__block" style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="checkout__legend">
                Contact <small>Required</small>
              </legend>
              <div className="form-grid">
                <div className={`field ${errors.fullName ? 'field--invalid' : ''}`}>
                  <label className="field__label" htmlFor="checkout-fullName">
                    Full name
                  </label>
                  <input
                    id="checkout-fullName"
                    className="field__input"
                    value={values.fullName}
                    onChange={set('fullName')}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName && <span className="field__error">{errors.fullName}</span>}
                </div>
                <div className={`field ${errors.email ? 'field--invalid' : ''}`}>
                  <label className="field__label" htmlFor="checkout-email">
                    Email
                  </label>
                  <input
                    id="checkout-email"
                    className="field__input"
                    type="email"
                    value={values.email}
                    onChange={set('email')}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <span className="field__error">{errors.email}</span>}
                </div>
                <div className={`field ${errors.phone ? 'field--invalid' : ''}`}>
                  <label className="field__label" htmlFor="checkout-phone">
                    Phone
                  </label>
                  <input
                    id="checkout-phone"
                    className="field__input"
                    value={values.phone}
                    onChange={set('phone')}
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && <span className="field__error">{errors.phone}</span>}
                </div>
              </div>
            </fieldset>

            <fieldset className="checkout__block" style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="checkout__legend">
                Delivery address <small>Required</small>
              </legend>
              <div className="form-grid">
                <div className={`field form-grid--wide ${errors.address ? 'field--invalid' : ''}`}>
                  <label className="field__label" htmlFor="checkout-address">
                    Address
                  </label>
                  <input
                    id="checkout-address"
                    className="field__input"
                    value={values.address}
                    onChange={set('address')}
                    autoComplete="street-address"
                    aria-invalid={Boolean(errors.address)}
                  />
                  {errors.address && <span className="field__error">{errors.address}</span>}
                </div>
                <div className={`field ${errors.city ? 'field--invalid' : ''}`}>
                  <label className="field__label" htmlFor="checkout-city">
                    City
                  </label>
                  <input
                    id="checkout-city"
                    className="field__input"
                    value={values.city}
                    onChange={set('city')}
                    autoComplete="address-level2"
                    aria-invalid={Boolean(errors.city)}
                  />
                  {errors.city && <span className="field__error">{errors.city}</span>}
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="checkout-postcode">
                    Postal code
                  </label>
                  <input
                    id="checkout-postcode"
                    className="field__input"
                    value={values.postcode}
                    onChange={set('postcode')}
                    autoComplete="postal-code"
                  />
                </div>
                <div className="field form-grid--wide">
                  <label className="field__label" htmlFor="checkout-notes">
                    Delivery notes
                  </label>
                  <textarea
                    id="checkout-notes"
                    className="field__textarea"
                    value={values.notes}
                    onChange={set('notes')}
                    placeholder="Preferred date, gift recipient, anything we should know…"
                  />
                </div>
              </div>
            </fieldset>

            <button type="submit" className="btn btn--gold btn--block" disabled={submitting}>
              {submitting ? 'Sending your order…' : 'Send order request'}
            </button>
            <p className="form-note" style={{ marginTop: '1rem' }}>
              You will receive a reference number immediately. Payment is arranged with the boutique —
              no card details are collected here.
            </p>
          </form>

          <aside className="checkout__summary">
            <span className="eyebrow">Order summary</span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.25rem' }}>
              {items.map((item) => (
                <div className="line-item" key={item.key}>
                  <div className="line-item__media">
                    <img
                      src={item.image.src}
                      alt=""
                      style={{ objectPosition: item.image.focus, transform: `scale(${item.image.zoom || 1})` }}
                    />
                  </div>
                  <div>
                    <h3 className="line-item__name">{item.name}</h3>
                    <p className="line-item__meta">{item.weight}</p>
                    <div className="line-item__row">
                      <span className="stepper">
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="stepper__value">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </span>
                      <span className="line-item__price">{formatToman(item.price * item.qty)}</span>
                    </div>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeItem(item.key)}
                      style={{ marginTop: '0.5rem' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <hr className="hairline" style={{ margin: '1.5rem 0 1rem' }} />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatToman(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>Arranged with the boutique</span>
            </div>
            <div className="summary-row summary-row--total">
              <span>Total</span>
              <span>{formatToman(subtotal)}</span>
            </div>
            <p className="form-note" style={{ marginTop: '1rem' }}>
              Prices are in Iranian toman. Allergen and ingredient details are listed on each product
              page.
            </p>
            <p className="form-status" style={{ marginTop: '1rem' }}>
              <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
              Delivery cost is confirmed by the boutique with your order, so nothing is charged online.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
