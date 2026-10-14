import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BoxBuilder from '../components/BoxBuilder.jsx';
import FramedImage from '../components/FramedImage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';
import { useCart } from '../lib/cart.jsx';
import { formatToman, pieceCount, toPersianDigits } from '../lib/format.js';
import { categories, findProduct, products } from '../data/products.js';
import { ChevronLeft, ChevronRight, CloseIcon, MinusIcon, PlusIcon, ZoomIcon } from '../components/Icons.jsx';

/* ---------------------------------------------------------------------------
   The product page.

   The photographs on one side (cursor-following zoom, thumbnails, lightbox) and
   a reading card on the other: price and controls first, then the tasting
   profile as a pull-quote, the maker's note, and the whole specification as
   cards. Every line comes from `products.js` — nothing is written here.

   Boxed chocolates then hand over to the box builder below, where the customer
   fills the box with the chocolate they actually want. Bars are not pieces, so
   they go straight to the related shelf instead.
   --------------------------------------------------------------------------- */

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
  const categoryLabel = categories.find((option) => option.id === product.category)?.label;

  /* The box builder needs a box (the piece count comes from `boxSize`) and the
     boutique's own chocolates to fill it with: bars and the ready-made whole-box
     assortment are not single pieces. */
  const capacity = pieceCount(product.boxSize);
  const buildable = product.category !== 'bars' && capacity >= 6;
  const boxPieces = buildable
    ? products.filter(
        (item) =>
          item.id !== product.id && item.category !== 'bars' && item.category !== 'assortments',
      )
    : [];

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
          <nav className="breadcrumb" aria-label="مسیر صفحه">
            <Link to="/">خانه</Link>
            <span aria-hidden="true">/</span>
            <Link to="/chocolates">شکلات‌ها</Link>
            <span aria-hidden="true">/</span>
            <span>{product.name}</span>
          </nav>
          <span className="eyebrow">{categoryLabel}</span>
          <h1 style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.4rem)' }}>{product.name}</h1>
          <p className="lede" style={{ marginTop: '1.1rem', maxWidth: '52ch' }}>
            {product.short}
          </p>
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
              aria-label="باز کردن تصویر در اندازه‌ی بزرگ"
            >
              <FramedImage
                image={gallery[active]}
                alt={`${product.name} — ${active === 0 ? 'عکاسی‌شده در بوتیک آناهیتا' : 'نمای بوتیک'}`}
                ratio="frame--square"
                eager
                className="pdp__frame"
                key={`${product.id}-${active}`}
              />
              <span className="badge" style={{ position: 'absolute', right: '0.85rem', bottom: '0.85rem' }}>
                <ZoomIcon width={14} height={14} /> برای بزرگنمایی کلیک کنید
              </span>
            </div>

            <div className="pdp__thumbs">
              {gallery.map((image, index) => (
                <button
                  type="button"
                  key={`${image.src}-${index}`}
                  className={`pdp__thumb ${index === active ? 'pdp__thumb--active' : ''}`}
                  onClick={() => setActive(index)}
                  aria-label={`دیدن تصویر ${toPersianDigits(index + 1)} از ${toPersianDigits(gallery.length)}`}
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

            <p className="pdp__caption">
              پرداخت با دست، چیده‌شده روی سینی عاجی‌رنگ و عکاسی‌شده در بوتیک آناهیتا.
            </p>
          </div>

          <div className="pdp__info">
            <div className="pdp__price-row">
              <span className="pdp__price">{formatToman(product.price)}</span>
              <span className="pdp__meta">
                {product.weight} · {product.boxSize}
              </span>
            </div>

            <div className="pdp__buy">
              <span className="stepper-step">
                <span className="field__label">تعداد</span>
                <span className="stepper">
                  <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="کم کردن تعداد">
                    <MinusIcon width={14} height={14} />
                  </button>
                  <span className="stepper__value" aria-live="polite">
                    {toPersianDigits(qty)}
                  </span>
                  <button type="button" onClick={() => setQty((value) => value + 1)} aria-label="افزودن تعداد">
                    <PlusIcon width={14} height={14} />
                  </button>
                </span>
              </span>
              <button type="button" className="btn btn--ink" onClick={() => addProduct(product, qty)}>
                افزودن به سبد · {formatToman(product.price * qty)}
              </button>
            </div>

            {buildable ? (
              <Link to="#build-box" className="pdp__aside">
                <span className="pdp__aside-title">جعبه را خودت بچین</span>
                <span className="pdp__aside-copy">
                  {toPersianDigits(capacity)} جای خالی؛ هر کدام را با شکلاتی که دوست دارید پر کنید.
                </span>
              </Link>
            ) : (
              <Link to="/personalise" className="pdp__aside">
                <span className="pdp__aside-title">شخصی‌سازی یک هدیه</span>
                <span className="pdp__aside-copy">
                  در آتلیه‌ی هدیه، جعبه، روبان و پیام دست‌نویس را خودتان انتخاب کنید.
                </span>
              </Link>
            )}

            <figure className="pdp__quote">
              <span className="eyebrow">پروفایل طعم</span>
              <blockquote>{product.flavour}</blockquote>
            </figure>

            <div className="pdp__block">
              <h3>درباره‌ی این جعبه</h3>
              <p style={{ margin: 0 }}>{product.description}</p>
            </div>

            <div className="pdp__specs">
              <div className="spec-card">
                <span className="spec-card__label">اندازه‌ی جعبه</span>
                <span className="spec-card__value">{product.boxSize}</span>
              </div>
              <div className="spec-card">
                <span className="spec-card__label">وزن</span>
                <span className="spec-card__value">{product.weight}</span>
              </div>
              <div className="spec-card spec-card--wide">
                <span className="spec-card__label">نگهداری</span>
                <span className="spec-card__value">{product.storage}</span>
              </div>
              <div className="spec-card spec-card--wide">
                <span className="spec-card__label">مواد اولیه</span>
                <span className="spec-card__value">{product.ingredients}</span>
              </div>
              <div className="spec-card spec-card--wide">
                <span className="spec-card__label">آلرژن‌ها</span>
                <span className="spec-card__value">{product.allergens}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {buildable && <BoxBuilder product={product} pieces={boxPieces} capacity={capacity} />}

      <section className="section section--dark">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">از همان قفسه</span>
              <h2 className="section-head__title">این‌ها را هم دوست دارید</h2>
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
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`گالری ${product.name}`}>
          <div className="lightbox__figure">
            <div
              className="lightbox__stage"
              style={{ '--focus': gallery[active].focus, '--zoom': gallery[active].zoom || 1 }}
            >
              <img
                src={gallery[active].src}
                alt={`${product.name} — نمای کامل تصویر ${toPersianDigits(active + 1)} از ${toPersianDigits(gallery.length)}`}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <button
                type="button"
                className="rail__btn"
                onClick={() => setActive((index) => (index - 1 + gallery.length) % gallery.length)}
                aria-label="تصویر قبلی"
              >
                <ChevronLeft />
              </button>
              <span className="lightbox__caption">
                {product.name} · {toPersianDigits(active + 1)} / {toPersianDigits(gallery.length)}
              </span>
              <button
                type="button"
                className="rail__btn"
                onClick={() => setActive((index) => (index + 1) % gallery.length)}
                aria-label="تصویر بعدی"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <button
            type="button"
            className="icon-btn"
            style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}
            onClick={() => setLightbox(false)}
            aria-label="بستن گالری"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </>
  );
}
