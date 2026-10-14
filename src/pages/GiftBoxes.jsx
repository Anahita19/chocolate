import { Link } from 'react-router-dom';
import GiftBoxCard from '../components/GiftBoxCard.jsx';
import FramedImage from '../components/FramedImage.jsx';
import Reveal from '../components/Reveal.jsx';
import { giftBoxes } from '../data/products.js';

export default function GiftBoxes() {
  const gifts = giftBoxes.filter((box) => !box.studio);
  const studio = giftBoxes.find((box) => box.studio);

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Gifting</span>
          <h1>Chocolate Gift Boxes</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Beautifully crafted, thoughtfully gifted. Rigid espresso-brown boxes with a champagne-gold
            wordmark, dark satin ribbon and an ivory insert — filled and tied by hand.
          </p>
        </div>
      </section>

      <section className="section section--dark" style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
        <div className="shell">
          <div className="grid grid--3">
            {gifts.map((box, index) => (
              <Reveal key={box.id} delay={(index % 3) * 90}>
                <GiftBoxCard box={box} detailed />
              </Reveal>
            ))}

            {studio && (
              <Reveal delay={120}>
                <GiftBoxCard box={studio} detailed />
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="section section--espresso">
        <div className="shell split-story">
          <Reveal>
            <FramedImage
              image={{ src: '/images/boutique-interior.jpg', focus: '84% 31%', zoom: 2.8 }}
              alt="Illuminated arched shelves displaying ANAHITA chocolate gift boxes"
              ratio="frame--portrait"
            />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">The packaging</span>
            <h2 style={{ maxWidth: '22ch' }}>Built like the shop it comes from</h2>
            <p className="lede" style={{ marginTop: '1.1rem' }}>
              The boxes are rigid board in deep espresso, stamped with the ANAHITA wordmark in
              champagne gold and foiled on the inner lid. Inside, an ivory tray holds each piece in its
              own place so nothing shifts on the way.
            </p>
            <ul className="numbered-notes" style={{ marginTop: '1.75rem' }}>
              <li>Espresso board, gold-stamped, with a matching sleeve.</li>
              <li>Champagne-gold foil on the lid interior and the message card.</li>
              <li>Dark satin ribbon tied in the boutique, in the colour you choose.</li>
              <li>Ivory insert, arranged in the same order as the display case.</li>
            </ul>
            <p className="form-note" style={{ marginTop: '1.5rem' }}>
              Packaging photography is planned; the views shown here are of the boutique itself.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--marble">
        <div className="shell" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
          <span className="eyebrow">Make it yours</span>
          <h2 style={{ maxWidth: '26ch' }}>Choose the box, the chocolates, the ribbon and the message</h2>
          <p className="lede" style={{ maxWidth: '52ch' }}>
            Our gift atelier walks you through each choice and shows the total as you build it — then
            packs it by hand.
          </p>
          <Link to="/personalise" className="btn btn--gold">
            Open the gift atelier
          </Link>
        </div>
      </section>
    </>
  );
}
