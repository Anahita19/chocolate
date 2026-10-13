import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FramedImage from '../components/FramedImage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';
import { useCart } from '../lib/cart.jsx';
import { formatToman } from '../lib/format.js';
import { findProduct, products } from '../data/products.js';
import { ChevronLeft, ChevronRight, CloseIcon, MinusIcon, PlusIcon, ZoomIcon } from '../components/Icons.jsx';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = findProduct(slug);
  const { addProduct } = useCart();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [qty, setQty] = useState(1);
  const stageRef = useRef(null);

  useEffect(() => {
    setActive(0);
    setQty(1);
    setLightbox(false);
  }, [slug]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setLightbox(false);
      if (event.key === 'ArrowRight') setActive((index) => (index + 1) % product.gallery.length);
      if (event.key === 'ArrowLeft')
        setActive((index) => (index - 1 + product.gallery.length) % product.gallery.length);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [lightbox, product]);

  if (!product) return <NotFound />;

  const gallery = product.gallery?.length ? product.gallery : [product.image];

  /* Hover zoom: the focal point follows the cursor across the frame. */
  const onStageMove = (event) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty('--zx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    stage.style.setProperty('--zy', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const related = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .concat(products.filter((item) => item.id !== product.id && item.category !== product.category))
    .slice(0, 4);

  return (
    <>
      <section className="page-hero" style={{ paddingTop: 'clamp(6.5rem, 12vw, 9rem)' }}>
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/chocolates">Chocolates</Link>
            <span aria-hidden="true">/</span>
            <span>{product.name}</span>
          </nav>
          <span className="eyebrow">{product.category}</span>
          <h1 style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.4rem)' }}>{product.name}</h1>
        </div>
      </section>

      <section className="section section--ivory" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell pdp">
          <div className="pdp__stage">
            <div
              className="pdp__main"
              ref={stageRef}
              onPointerMove={onStageMove}
              onClick={() => setLightbox(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setLightbox(true);
                }
              }}
              aria-label="Open the full-size image"
            >
              <FramedImage
                image={gallery[active]}
                alt={`${product.name} — ${active === 0 ? 'photographed in the ANAHITA boutique' : 'boutique view'}`}
                ratio="frame--square"
                eager
                className="pdp__frame"
                key={`${product.id}-${active}`}
              />
              <span className="badge" style={{ position: 'absolute', right: '0.85rem', bottom: '0.85rem' }}>
                <ZoomIcon width={14} height={14} /> Click to enlarge
              </span>
            </div>

            <div className="pdp__thumbs">
              {gallery.map((image, index) => (
                <button
                  type="button"
                  key={`${image.src}-${index}`}
                  className={`pdp__thumb ${index === active ? 'pdp__thumb--active' : ''}`}
                  onClick={() => setActive(index)}
                  aria-label={`View image ${index + 1} of ${gallery.length}`}
                  aria-current={index === active}
                >
                  <img
                    src={image.src}
                    alt=""
                    style={{ objectPosition: image.focus, transform: `scale(${image.zoom || 1})` }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="pdp__info">
            <p className="lede" style={{ margin: 0 }}>{product.short}</p>
            <div className="pdp__price">{formatToman(product.price)}</div>
            <span className="pdp__weight">
              {product.weight} · {product.boxSize}
            </span>

            <div className="pdp__buy">
              <span className="stepper-step">
                <span className="field__label">Quantity</span>
                <span className="stepper">
                  <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
                    <MinusIcon width={14} height={14} />
                  </button>
                  <span className="stepper__value" aria-live="polite">
                    {qty}
                  </span>
                  <button type="button" onClick={() => setQty((value) => value + 1)} aria-label="Increase quantity">
                    <PlusIcon width={14} height={14} />
                  </button>
                </span>
              </span>
              <button type="button" className="btn btn--ink" onClick={() => addProduct(product, qty)}>
                Add to bag · {formatToman(product.price * qty)}
              </button>
              <Link to="/personalise" className="link-arrow">
                Personalise a gift
              </Link>
            </div>

            <div className="pdp__block">
              <h3>Description</h3>
              <p style={{ margin: 0 }}>{product.description}</p>
            </div>

            <div className="pdp__block">
              <h3>Flavour profile</h3>
              <p style={{ margin: 0 }}>{product.flavour}</p>
            </div>

            <div className="pdp__block">
              <h3>Ingredients & allergens</h3>
              <ul className="spec-list">
                <li>
                  <span>Ingredients</span>
                  <span>{product.ingredients}</span>
                </li>
                <li>
                  <span>Allergens</span>
                  <span>{product.allergens}</span>
                </li>
              </ul>
            </div>

            <div className="pdp__block">
              <h3>Details</h3>
              <ul className="spec-list">
                <li>
                  <span>Box size</span>
                  <span>{product.boxSize}</span>
                </li>
                <li>
                  <span>Weight</span>
                  <span>{product.weight}</span>
                </li>
                <li>
                  <span>Storage</span>
                  <span>{product.storage}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">From the same shelf</span>
              <h2 className="section-head__title">You may also like</h2>
            </div>
          </div>
          <div className="grid grid--4">
            {related.map((item, index) => (
              <Reveal key={item.id} delay={(index % 4) * 80}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${product.name} gallery`}>
          <div className="lightbox__figure">
            <div
              className="lightbox__stage"
              style={{ '--focus': gallery[active].focus, '--zoom': gallery[active].zoom || 1 }}
            >
              <img
                src={gallery[active].src}
                alt={`${product.name} — full size view ${active + 1} of ${gallery.length}`}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <button
                type="button"
                className="rail__btn"
                onClick={() => setActive((index) => (index - 1 + gallery.length) % gallery.length)}
                aria-label="Previous image"
              >
                <ChevronLeft />
              </button>
              <span className="lightbox__caption">
                {product.name} · {active + 1} / {gallery.length}
              </span>
              <button
                type="button"
                className="rail__btn"
                onClick={() => setActive((index) => (index + 1) % gallery.length)}
                aria-label="Next image"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <button
            type="button"
            className="icon-btn"
            style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}
            onClick={() => setLightbox(false)}
            aria-label="Close gallery"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </>
  );
}
