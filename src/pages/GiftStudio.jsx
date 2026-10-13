import { useState } from 'react';
import { Link } from 'react-router-dom';
import FramedImage from '../components/FramedImage.jsx';
import { useCart } from '../lib/cart.jsx';
import { formatToman } from '../lib/format.js';
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
          <span className="eyebrow">The gift atelier</span>
          <h1>Personalise a Chocolate Gift</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Choose the box, the chocolates, the ribbon and the message. We assemble it by hand and tie
            it in the boutique.
          </p>
        </div>
      </section>

      <section className="section section--dark" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell studio">
          <div>
            <div className="studio__step">
              <div className="studio__step-head">
                <span className="studio__step-index">01</span>
                <h2 className="studio__step-title">Box size</h2>
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
                <span className="studio__step-index">02</span>
                <h2 className="studio__step-title">Chocolate assortment</h2>
              </div>
              <div className="choice-grid">
                {giftAssortments.map((option) => (
                  <Choice
                    key={option.id}
                    selected={selection.assortment === option.id}
                    onClick={() => set('assortment')(option.id)}
                    label={option.label}
                    detail={option.extra ? `+${formatToman(option.extra)}` : 'Included'}
                  />
                ))}
              </div>
            </div>

            <div className="studio__step">
              <div className="studio__step-head">
                <span className="studio__step-index">03</span>
                <h2 className="studio__step-title">Ribbon</h2>
              </div>
              <div className="choice-grid">
                {giftRibbons.map((option) => (
                  <Choice
                    key={option.id}
                    selected={selection.ribbon === option.id}
                    onClick={() => set('ribbon')(option.id)}
                    label={option.label}
                    detail={option.extra ? `+${formatToman(option.extra)}` : 'Included'}
                  />
                ))}
              </div>
            </div>

            <div className="studio__step">
              <div className="studio__step-head">
                <span className="studio__step-index">04</span>
                <h2 className="studio__step-title">Occasion, recipient & message</h2>
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
                    Recipient name
                  </label>
                  <input
                    id="gift-recipient"
                    className="field__input"
                    value={selection.recipient}
                    onChange={(event) => set('recipient')(event.target.value)}
                    placeholder="Who is it for?"
                    maxLength={40}
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="gift-occasion-read">
                    Occasion
                  </label>
                  <input id="gift-occasion-read" className="field__input" value={selection.occasion} readOnly />
                </div>
                <div className="field form-grid--wide">
                  <label className="field__label" htmlFor="gift-message">
                    Gift message
                  </label>
                  <textarea
                    id="gift-message"
                    className="field__textarea"
                    value={selection.message}
                    onChange={(event) => set('message')(event.target.value)}
                    placeholder="Your words, written on the card by hand"
                    maxLength={200}
                  />
                  <span className="field__hint">{selection.message.length}/200 characters</span>
                </div>
              </div>
            </div>
          </div>

          <div className="studio__summary">
            <span className="eyebrow">Your gift</span>
            <FramedImage
              image={{ src: '/images/boutique-exterior.jpg', focus: '26% 62%', zoom: 2.6 }}
              alt="An ANAHITA gift box, tied with ribbon"
              ratio="frame--wide"
            />

            <ul className="summary-list">
              <li>
                Box size: <span>{size?.label} · {size?.detail}</span>
              </li>
              <li>
                Chocolates: <span>{assortment?.label}</span>
              </li>
              <li>
                Ribbon: <span>{ribbon?.label}</span>
              </li>
              <li>
                Occasion: <span>{selection.occasion}</span>
              </li>
              {selection.recipient.trim() && (
                <li>
                  For: <span>{selection.recipient.trim()}</span>
                </li>
              )}
              {selection.message.trim() && (
                <li>
                  Message: <span>“{selection.message.trim()}”</span>
                </li>
              )}
            </ul>

            <div>
              <div className="summary-row">
                <span>Gift box</span>
                <span>{formatToman(giftingBasePrice)}</span>
              </div>
              <div className="summary-row">
                <span>Box size</span>
                <span>{size?.extra ? `+${formatToman(size.extra)}` : 'Included'}</span>
              </div>
              <div className="summary-row">
                <span>Assortment</span>
                <span>{assortment?.extra ? `+${formatToman(assortment.extra)}` : 'Included'}</span>
              </div>
              <div className="summary-row">
                <span>Ribbon</span>
                <span>{ribbon?.extra ? `+${formatToman(ribbon.extra)}` : 'Included'}</span>
              </div>
              <div className="summary-row">
                <span>Hand-written card</span>
                <span>Included</span>
              </div>
              <div className="summary-row summary-row--total">
                <span>Total</span>
                <span>{formatToman(total)}</span>
              </div>
            </div>

            <button type="button" className="btn btn--gold btn--block" onClick={() => addPersonalised(selection)}>
              Add this gift to the bag
            </button>
            <p className="form-note" style={{ margin: 0 }}>
              Assembled in the boutique, usually within a day. If you need it sooner, leave a note at
              checkout or{' '}
              <Link to="/contact" style={{ color: 'var(--gold)' }}>
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
