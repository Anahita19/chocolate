import { Link } from 'react-router-dom';
import FramedImage from '../components/FramedImage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import GiftBoxCard from '../components/GiftBoxCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { collections, giftBoxes, products } from '../data/products.js';

export default function Collections() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Curated in the boutique</span>
          <h1>Collections</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            The case is arranged in groups, so a box can be built around one idea: our signature
            pieces, dark and intense, nuts and pistachio, or gifting.
          </p>
        </div>
      </section>

      {collections.map((collection, index) => (
        <section
          key={collection.id}
          className={`section ${index % 2 === 0 ? 'section--dark' : 'section--espresso'}`}
          id={collection.slug}
        >
          <div className="shell">
            <div className="split-story">
              <Reveal style={index % 2 === 1 ? { order: 2 } : undefined}>
                <FramedImage image={collection.image} alt={collection.title} ratio="frame--wide" />
              </Reveal>
              <Reveal delay={100}>
                <span className="eyebrow">Collection {String(index + 1).padStart(2, '0')}</span>
                <h2>{collection.title}</h2>
                <p className="lede" style={{ marginTop: '1rem' }}>
                  {collection.copy}
                </p>
                <Link
                  to={collection.gift ? '/gift-boxes' : '/chocolates'}
                  className="link-arrow"
                  style={{ marginTop: '1.5rem' }}
                >
                  {collection.gift ? 'Explore gift boxes' : 'Browse the chocolate case'} →
                </Link>
              </Reveal>
            </div>

            <div className="grid grid--4" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
              {collection.items.map((id, itemIndex) => {
                const product = products.find((item) => item.id === id);
                const box = giftBoxes.find((item) => item.id === id);
                const card = product ? (
                  <ProductCard product={product} />
                ) : box ? (
                  <GiftBoxCard box={box} />
                ) : null;
                if (!card) return null;
                return (
                  <Reveal key={id} delay={(itemIndex % 4) * 80}>
                    {card}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
