import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../lib/cart.jsx';
import { formatToman, orderReference, toPersianDigits } from '../lib/format.js';
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
    if (!values.fullName.trim()) next.fullName = 'لطفاً نامی برای این سفارش بنویسید.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = 'لطفاً یک نشانی ایمیل معتبر وارد کنید.';
    }
    if (!values.phone.trim()) next.phone = 'لطفاً یک شمارهی تماس برای ارسال بگذارید.';
    if (!values.address.trim()) next.address = 'لطفاً نشانی تحویل را بنویسید.';
    if (!values.city.trim()) next.city = 'لطفاً شهر را بنویسید.';
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
            <span className="eyebrow">تکمیل سفارش</span>
            <h1>سبد شما خالی است</h1>
          </div>
        </section>
        <section className="section section--dark">
          <div className="shell empty-cart">
            <p className="lede">یک جعبه شکلات اضافه کنید تا همینجا، آمادهی تکمیل سفارش، ظاهر شود.</p>
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/chocolates" className="btn btn--gold">
                دیدن شکلاتها
              </Link>
              <Link to="/gift-boxes" className="btn">
                دیدن جعبههای هدیه
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
          <nav className="breadcrumb" aria-label="مسیر صفحه">
            <Link to="/chocolates">شکلاتها</Link>
            <span aria-hidden="true">/</span>
            <span>تکمیل سفارش</span>
          </nav>
          <span className="eyebrow">تکمیل سفارش</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.1rem)' }}>سفارش خود را نهایی کنید</h1>
          <p className="lede" style={{ marginTop: '1rem' }}>
            هنوز پرداختی در سایت انجام نمیشود: سفارش شما به بوتیک میرسد، موجودی و زمان ارسال را
            تأیید میکنیم و پرداخت را مستقیم با شما هماهنگ میکنیم.
          </p>
        </div>
      </section>

      <section className="section section--dark" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell checkout">
          <form onSubmit={onSubmit} noValidate>
            <fieldset className="checkout__block" style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="checkout__legend">
                اطلاعات تماس <small>الزامی</small>
              </legend>
              <div className="form-grid">
                <div className={`field ${errors.fullName ? 'field--invalid' : ''}`}>
                  <label className="field__label" htmlFor="checkout-fullName">
                    نام و نام خانوادگی
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
                    ایمیل
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
                    تلفن
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
                نشانی تحویل <small>الزامی</small>
              </legend>
              <div className="form-grid">
                <div className={`field form-grid--wide ${errors.address ? 'field--invalid' : ''}`}>
                  <label className="field__label" htmlFor="checkout-address">
                    نشانی
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
                    شهر
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
                    کد پستی
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
                    توضیحات ارسال
                  </label>
                  <textarea
                    id="checkout-notes"
                    className="field__textarea"
                    value={values.notes}
                    onChange={set('notes')}
                    placeholder="تاریخ دلخواه، گیرندهی هدیه، هر نکتهی دیگری…"
                  />
                </div>
              </div>
            </fieldset>

            <button type="submit" className="btn btn--gold btn--block" disabled={submitting}>
              {submitting ? 'در حال ارسال سفارش…' : 'ثبت سفارش'}
            </button>
            <p className="form-note" style={{ marginTop: '1rem' }}>
              همین حالا کد پیگیری میگیرید. پرداخت با بوتیک هماهنگ میشود — هیچ اطلاعات کارتی اینجا
              گرفته نمیشود.
            </p>
          </form>

          <aside className="checkout__summary">
            <span className="eyebrow">خلاصهی سفارش</span>

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
                          aria-label={`کم کردن تعداد ${item.name}`}
                        >
                          −
                        </button>
                        <span className="stepper__value">{toPersianDigits(item.qty)}</span>
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty + 1)}
                          aria-label={`افزودن تعداد ${item.name}`}
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
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <hr className="hairline" style={{ margin: '1.5rem 0 1rem' }} />

            <div className="summary-row">
              <span>جمع جزء</span>
              <span>{formatToman(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>ارسال</span>
              <span>با بوتیک هماهنگ میشود</span>
            </div>
            <div className="summary-row summary-row--total">
              <span>مجموع</span>
              <span>{formatToman(subtotal)}</span>
            </div>
            <p className="form-note" style={{ marginTop: '1rem' }}>
              قیمتها به تومان است. اطلاعات آلرژن و مواد اولیه در صفحهی هر محصول آمده است.
            </p>
            <p className="form-status" style={{ marginTop: '1rem' }}>
              <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
              هزینهی ارسال با سفارش شما و توسط بوتیک تأیید میشود، پس هیچ مبلغی آنلاین پرداخت نمیشود.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
