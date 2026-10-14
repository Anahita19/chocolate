import { useState } from 'react';
import { Link } from 'react-router-dom';
import FramedImage from '../components/FramedImage.jsx';
import { useCart } from '../lib/cart.jsx';
import { formatToman, toPersianDigits } from '../lib/format.js';
import {
  giftingBasePrice,
  giftAssortments,
  giftBoxSizes,
  giftOccasions,
  giftPrice,
  giftRibbons,
} from '../data/gifting.js';

function Choice({ selected, onClick, label, detail }) {
  return (
    <button
      type="button"
      className={`choice ${selected ? 'choice--selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="choice__label">{label}</span>
      {detail && <span className="choice__detail">{detail}</span>}
    </button>
  );
}

export default function GiftStudio() {
  const { addPersonalised } = useCart();
  const [selection, setSelection] = useState({
    size: giftBoxSizes[1].id,
    assortment: giftAssortments[0].id,
    ribbon: giftRibbons[1].id,
    occasion: giftOccasions[0],
    recipient: '',
    message: '',
  });

  const set = (key) => (value) => setSelection((current) => ({ ...current, [key]: value }));

  const size = giftBoxSizes.find((option) => option.id === selection.size);
  const assortment = giftAssortments.find((option) => option.id === selection.assortment);
  const ribbon = giftRibbons.find((option) => option.id === selection.ribbon);
  const total = giftPrice(selection);

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">آتلیهی هدیه</span>
          <h1>شخصیسازی یک هدیهی شکلات</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            جعبه، شکلات، روبان و پیام را انتخاب کنید. ما آن را با دست میچینیم و در بوتیک گره میزنیم.
          </p>
        </div>
      </section>

      <section className="section section--dark" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell studio">
          <div>
            <div className="studio__step">
              <div className="studio__step-head">
                <span className="studio__step-index">۰۱</span>
                <h2 className="studio__step-title">اندازهی جعبه</h2>
              </div>
              <div className="choice-grid">
                {giftBoxSizes.map((option) => (
                  <Choice
                    key={option.id}
                    selected={selection.size === option.id}
                    onClick={() => set('size')(option.id)}
                    label={option.label}
                    detail={`${option.detail}${option.extra ? ` · +${formatToman(option.extra)}` : ''}`}
                  />
                ))}
              </div>
            </div>

            <div className="studio__step">
              <div className="studio__step-head">
                <span className="studio__step-index">۰۲</span>
                <h2 className="studio__step-title">ترکیب شکلات</h2>
              </div>
              <div className="choice-grid">
                {giftAssortments.map((option) => (
                  <Choice
                    key={option.id}
                    selected={selection.assortment === option.id}
                    onClick={() => set('assortment')(option.id)}
                    label={option.label}
                    detail={option.extra ? `+${formatToman(option.extra)}` : 'شامل'}
                  />
                ))}
              </div>
            </div>

            <div className="studio__step">
              <div className="studio__step-head">
                <span className="studio__step-index">۰۳</span>
                <h2 className="studio__step-title">روبان</h2>
              </div>
              <div className="choice-grid">
                {giftRibbons.map((option) => (
                  <Choice
                    key={option.id}
                    selected={selection.ribbon === option.id}
                    onClick={() => set('ribbon')(option.id)}
                    label={option.label}
                    detail={option.extra ? `+${formatToman(option.extra)}` : 'شامل'}
                  />
                ))}
              </div>
            </div>

            <div className="studio__step">
              <div className="studio__step-head">
                <span className="studio__step-index">۰۴</span>
                <h2 className="studio__step-title">مناسبت، گیرنده و پیام</h2>
              </div>
              <div className="choice-grid" style={{ marginBottom: '1.25rem' }}>
                {giftOccasions.map((option) => (
                  <Choice
                    key={option}
                    selected={selection.occasion === option}
                    onClick={() => set('occasion')(option)}
                    label={option}
                  />
                ))}
              </div>
              <div className="form-grid">
                <div className="field">
                  <label className="field__label" htmlFor="gift-recipient">
                    نام گیرنده
                  </label>
                  <input
                    id="gift-recipient"
                    className="field__input"
                    value={selection.recipient}
                    onChange={(event) => set('recipient')(event.target.value)}
                    placeholder="برای چه کسی است؟"
                    maxLength={40}
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="gift-occasion-read">
                    مناسبت
                  </label>
                  <input id="gift-occasion-read" className="field__input" value={selection.occasion} readOnly />
                </div>
                <div className="field form-grid--wide">
                  <label className="field__label" htmlFor="gift-message">
                    پیام هدیه
                  </label>
                  <textarea
                    id="gift-message"
                    className="field__textarea"
                    value={selection.message}
                    onChange={(event) => set('message')(event.target.value)}
                    placeholder="نوشتهی شما، که با دست روی کارت نوشته میشود"
                    maxLength={200}
                  />
                  <span className="field__hint">
                    {toPersianDigits(selection.message.length)} از ۲۰۰ نویسه
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="studio__summary">
            <span className="eyebrow">هدیهی شما</span>
            <FramedImage
              image={{ src: '/images/boutique-exterior.jpg', focus: '26% 62%', zoom: 2.6 }}
              alt="جعبهی هدیهی آناهیتا، گرهخورده با روبان"
              ratio="frame--wide"
            />

            <ul className="summary-list">
              <li>
                اندازهی جعبه: <span>{size?.label} · {size?.detail}</span>
              </li>
              <li>
                شکلاتها: <span>{assortment?.label}</span>
              </li>
              <li>
                روبان: <span>{ribbon?.label}</span>
              </li>
              <li>
                مناسبت: <span>{selection.occasion}</span>
              </li>
              {selection.recipient.trim() && (
                <li>
                  برای: <span>{selection.recipient.trim()}</span>
                </li>
              )}
              {selection.message.trim() && (
                <li>
                  پیام: <span>«{selection.message.trim()}»</span>
                </li>
              )}
            </ul>

            <div>
              <div className="summary-row">
                <span>جعبهی هدیه</span>
                <span>{formatToman(giftingBasePrice)}</span>
              </div>
              <div className="summary-row">
                <span>اندازهی جعبه</span>
                <span>{size?.extra ? `+${formatToman(size.extra)}` : 'شامل'}</span>
              </div>
              <div className="summary-row">
                <span>ترکیب شکلات</span>
                <span>{assortment?.extra ? `+${formatToman(assortment.extra)}` : 'شامل'}</span>
              </div>
              <div className="summary-row">
                <span>روبان</span>
                <span>{ribbon?.extra ? `+${formatToman(ribbon.extra)}` : 'شامل'}</span>
              </div>
              <div className="summary-row">
                <span>کارت دستنویس</span>
                <span>شامل</span>
              </div>
              <div className="summary-row summary-row--total">
                <span>مجموع</span>
                <span>{formatToman(total)}</span>
              </div>
            </div>

            <button type="button" className="btn btn--gold btn--block" onClick={() => addPersonalised(selection)}>
              افزودن این هدیه به سبد
            </button>
            <p className="form-note" style={{ margin: 0 }}>
              در بوتیک و معمولاً تا یک روز آماده میشود. اگر زودتر لازم دارید، در تکمیل سفارش یادداشت
              بگذارید یا{' '}
              <Link to="/contact" style={{ color: 'var(--gold)' }}>
                با ما تماس بگیرید
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
