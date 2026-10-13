import { Link } from 'react-router-dom';
import HeroCinematic from '../components/HeroCinematic.jsx';
import FramedImage from '../components/FramedImage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductRail from '../components/ProductRail.jsx';
import GiftBoxCard from '../components/GiftBoxCard.jsx';
import Reveal from '../components/Reveal.jsx';
import CorporateForm from '../components/CorporateForm.jsx';
import { ArrowRight, CheckIcon, InstagramIcon } from '../components/Icons.jsx';
import { boutiqueGallery, boutiqueStory, craft, instagramGallery, site } from '../data/site.js';
import { bestsellerIds, giftBoxes, products } from '../data/products.js';

export default function Home() {
  const signature = products.filter((product) => product.featured);
  const bestsellers = bestsellerIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  return (
    <>
      {/* --- 1. Cinematic scroll-driven hero -------------------------------- */}
      <HeroCinematic />

      {/* --- 2. Brand statement -------------------------------------------- */}
      <section className="section section--espresso">
        <div className="shell editorial">
          <Reveal>
            <span className="eyebrow">The house of ANAHITA</span>
            <p className="editorial__statement">
              A boutique built around a single glass case — where the chocolates are made by hand,
              arranged by flavour, and chosen one piece at a time.
            </p>
          </Reveal>
          <Reveal delay={120} className="editorial__aside">
            <hr className="hairline" />
            <p className="lede">
              Dark walnut, black-brown marble and a quiet line of champagne gold: the room is designed
              to keep the attention on the chocolate. Everything you see in the case is finished the
              same day it is offered.
            </p>
            <p className="lede">
              Whether you are choosing a single praline or assembling a gift for forty, the ritual is
              the same — warm light, an ivory tray, and a ribbon tied by hand.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --- 3. Signature collection --------------------------------------- */}
      <section className="section section--dark" id="signature">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">The art of chocolate</span>
              <h2 className="section-head__title">Our Signature Collection</h2>
            </div>
            <p className="lede" style={{ maxWidth: '38ch' }}>
              Eight ways to begin: pralines, truffles, dark and milk collections, pistachio and
              hazelnut, our signature bars, and the full assortment box.
            </p>
          </div>

          <div className="grid grid--4">
            {signature.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 90}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
            <Link to="/chocolates" className="btn">
              View the whole chocolate case
            </Link>
          </div>
        </div>
      </section>

      {/* --- 4. Gift boxes -------------------------------------------------- */}
      <section className="section section--marble" id="gift-boxes">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">Gifting</span>
              <h2 className="section-head__title" style={{ maxWidth: '26ch' }}>
                Beautifully Crafted. Thoughtfully Gifted.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '38ch' }}>
              <p className="lede">
                Deep espresso board, a champagne-gold wordmark, dark satin ribbon and an ivory insert.
                Each box is filled and tied in the boutique before it leaves us.
              </p>
              <Link to="/gift-boxes" className="btn btn--sm" style={{ alignSelf: 'flex-start' }}>
                Explore gift boxes
              </Link>
            </div>
          </div>

          <div className="grid grid--3">
            {giftBoxes.slice(0, 3).map((box, index) => (
              <Reveal key={box.id} delay={(index % 3) * 90}>
                <GiftBoxCard box={box} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. Bestsellers ------------------------------------------------- */}
      <section className="section section--dark" id="favourites">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">Loved in the boutique</span>
              <h2 className="section-head__title">Favourites from ANAHITA</h2>
            </div>
            <p className="lede" style={{ maxWidth: '36ch' }}>
              A hand-picked shortlist of the pieces our customers return for. Swipe or use the arrows
              to move along the row.
            </p>
          </div>

          <ProductRail products={bestsellers} label="Favourite chocolates" />
        </div>
      </section>

      {/* --- 6. Craft -------------------------------------------------------- */}
      <section className="section section--ivory" id="craft">
        <div className="shell craft">
          <Reveal className="craft__media">
            <FramedImage
              image={{ src: '/images/boutique-interior.jpg', focus: '32% 62%', zoom: 4.2 }}
              alt="Handmade chocolates being arranged by hand in the ANAHITA boutique"
              ratio="frame--wide"
            />
            <FramedImage
              image={{ src: '/images/boutique-interior.jpg', focus: '60% 62%', zoom: 4.6 }}
              alt="Close view of finished pralines and truffles in the display case"
              ratio="frame--square"
            />
            <FramedImage
              image={{ src: '/images/boutique-exterior.jpg', focus: '26% 62%', zoom: 3 }}
              alt="Boxed chocolates displayed in the boutique window"
              ratio="frame--square"
            />
          </Reveal>

          <Reveal delay={100}>
            <span className="eyebrow">{craft.eyebrow}</span>
            <h2>{craft.title}</h2>
            <p className="lede" style={{ marginTop: '1.1rem' }}>
              {craft.body}
            </p>
            <ul className="craft__list">
              {craft.notes.map((note) => (
                <li key={note}>
                  <CheckIcon />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
            <Link to="/our-story" className="btn btn--ink" style={{ marginTop: '1.75rem' }}>
              Read our story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* --- 7. The boutique ------------------------------------------------ */}
      <section className="section section--espresso" id="boutique">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">{boutiqueStory.eyebrow}</span>
              <h2 className="section-head__title">{boutiqueStory.title}</h2>
            </div>
            <p className="lede" style={{ maxWidth: '40ch' }}>
              {boutiqueStory.body}
            </p>
          </div>

          <div className="gallery">
            {boutiqueGallery.map((shot, index) => (
              <Reveal
                key={shot.caption}
                delay={(index % 4) * 70}
                className={`gallery__item ${shot.wide ? 'gallery__item--wide' : ''}`}
              >
                <FramedImage
                  image={shot}
                  alt={shot.alt}
                  ratio={shot.wide ? 'frame--wide' : 'frame--square'}
                />
                <span className="gallery__caption">{shot.caption}</span>
              </Reveal>
            ))}
          </div>

          <div className="boutique-info" style={{ marginTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            <div className="info-block">
              <span className="info-block__heading">Visit us</span>
              {site.boutique.addressLines.length > 0 ? (
                <ul>
                  {site.boutique.addressLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="to-be-confirmed" style={{ margin: 0 }}>
                  The boutique address will be published here shortly.
                </p>
              )}
            </div>
            <div className="info-block">
              <span className="info-block__heading">Opening hours</span>
              {site.boutique.hours.length > 0 ? (
                <ul>
                  {site.boutique.hours.map((slot) => (
                    <li key={slot.days}>
                      {slot.days} · {slot.hours}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="to-be-confirmed" style={{ margin: 0 }}>
                  Opening hours will be published here shortly.
                </p>
              )}
            </div>
            <div className="info-block">
              <span className="info-block__heading">In the boutique</span>
              <ul>
                {site.boutique.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/boutique" className="btn btn--gold">
              Visit our boutique
            </Link>
          </div>
        </div>
      </section>

      {/* --- 8. Values ------------------------------------------------------ */}
      <section className="section section--dark">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">What we hold to</span>
              <h2 className="section-head__title">Four things we do not compromise on</h2>
            </div>
          </div>
          <div className="values">
            {site.values.map((value, index) => (
              <Reveal key={value.title} delay={index * 80} className="value">
                <span className="value__index">0{index + 1}</span>
                <h3 className="value__title">{value.title}</h3>
                <p className="value__copy">{value.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- 9. Corporate & events ------------------------------------------ */}
      <section className="section section--marble" id="corporate">
        <div className="shell corporate">
          <Reveal>
            <span className="eyebrow">Corporate & events</span>
            <h2 style={{ maxWidth: '24ch' }}>A Refined Gift for Every Occasion</h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              Chocolate works for the occasions a memo cannot reach: client thanks, staff milestones,
              weddings and conferences. Tell us the shape of your event and we will propose a box,
              a ribbon and a message card.
            </p>
            <ul className="numbered-notes" style={{ marginTop: '2rem' }}>
              <li>Choose from the gift boxes we make every day, or a bespoke selection.</li>
              <li>Message cards can carry your own wording, printed in gold foil.</li>
              <li>
                Orders are assembled in batches, so please allow time before a fixed delivery date.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <CorporateForm />
          </Reveal>
        </div>
      </section>

      {/* --- 10. Instagram -------------------------------------------------- */}
      <section className="section section--espresso">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">@anahita</span>
              <h2 className="section-head__title">From the boutique, most days</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
              <p className="lede" style={{ maxWidth: '34ch' }}>
                New boxes, finished trays and the odd ribbon test — photographed in the shop as we work.
              </p>
              {site.boutique.instagramUrl ? (
                <a
                  className="link-arrow"
                  href={site.boutique.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Follow on Instagram <ArrowRight width={16} height={16} />
                </a>
              ) : (
                <span className="form-note" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <InstagramIcon width={18} height={18} /> Instagram link to be added
                </span>
              )}
            </div>
          </div>

          <div className="ig-grid">
            {instagramGallery.map((shot) => (
              <div
                className="ig-item"
                key={shot.alt}
                style={{ '--focus': shot.focus, '--zoom': shot.zoom }}
              >
                <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
