import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
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
      {/* --- 1. Entrance hero ------------------------------------------------ */}
      <Hero />

      {/* --- 2. Brand statement -------------------------------------------- */}
      <section className="section section--espresso">
        <div className="shell editorial">
          <Reveal>
            <span className="eyebrow">خانهی آناهیتا</span>
            <p className="editorial__statement">
              بوتیکی ساختهشده حول یک ویترین شیشهای — جایی که شکلاتها با دست ساخته، بر پایهی طعم
              چیده و دانهدانه انتخاب میشوند.
            </p>
          </Reveal>
          <Reveal delay={120} className="editorial__aside">
            <hr className="hairline" />
            <p className="lede">
              چوب گردوی تیره، سنگ مرمر سیاهقهوهای و خطی آرام از طلای شامپاینی: اتاق طوری طراحی شده
              که توجه روی شکلات بماند. هر چه در ویترین میبینید، همان روزی که آماده شده عرضه میشود.
            </p>
            <p className="lede">
              فرقی نمیکند یک پرالین انتخاب کنید یا هدیهای برای چهل نفر بچینید؛ آیین همان است —
              نوری گرم، سینی عاجیرنگ و روبانی که با دست گره میخورد.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --- 3. Signature collection --------------------------------------- */}
      <section className="section section--dark" id="signature">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">هنر شکلات</span>
              <h2 className="section-head__title">مجموعهی امضای آناهیتا</h2>
            </div>
            <p className="lede" style={{ maxWidth: '38ch' }}>
              هشت راه برای شروع: پرالین، ترافل، مجموعههای تلخ و شیری، پسته و فندق، تختهشکلاتهای
              امضای ما و جعبهی کامل ترکیبی.
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
              دیدن کل ویترین شکلات
            </Link>
          </div>
        </div>
      </section>

      {/* --- 4. Gift boxes -------------------------------------------------- */}
      <section className="section section--marble" id="gift-boxes">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">هدیه</span>
              <h2 className="section-head__title" style={{ maxWidth: '26ch' }}>
                زیبا ساختهشده، سنجیده هدیه دادهشده.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '38ch' }}>
              <p className="lede">
                مقوای قهوهای تیره، نشان طلایی شامپاینی، روبان ساتن تیره و جای عاجیرنگ. هر جعبه پیش
                از ترک بوتیک، پر و گره میشود.
              </p>
              <Link to="/gift-boxes" className="btn btn--sm" style={{ alignSelf: 'flex-start' }}>
                دیدن جعبههای هدیه
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
              <span className="eyebrow">محبوب در بوتیک</span>
              <h2 className="section-head__title">محبوبهای آناهیتا</h2>
            </div>
            <p className="lede" style={{ maxWidth: '36ch' }}>
              فهرست کوتاهی که دستچین شده از قطعههایی که مشتریان برایشان برمیگردند. برای دیدن ادامهی
              ردیف، بکشید یا از فلشها استفاده کنید.
            </p>
          </div>

          <ProductRail products={bestsellers} label="شکلاتهای محبوب" />
        </div>
      </section>

      {/* --- 6. Craft -------------------------------------------------------- */}
      <section className="section section--ivory" id="craft">
        <div className="shell craft">
          <Reveal className="craft__media">
            <FramedImage
              image={{ src: '/images/boutique-interior.jpg', focus: '32% 62%', zoom: 4.2 }}
              alt="شکلاتهای دستساز که با دست در بوتیک آناهیتا چیده میشوند"
              ratio="frame--wide"
            />
            <FramedImage
              image={{ src: '/images/boutique-interior.jpg', focus: '60% 62%', zoom: 4.6 }}
              alt="نمای نزدیک از پرالینها و ترافلهای آماده در ویترین"
              ratio="frame--square"
            />
            <FramedImage
              image={{ src: '/images/boutique-exterior.jpg', focus: '26% 62%', zoom: 3 }}
              alt="جعبههای شکلات در ویترین بوتیک"
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
              خواندن داستان ما
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
              <span className="info-block__heading">ما را ببینید</span>
              {site.boutique.addressLines.length > 0 ? (
                <ul>
                  {site.boutique.addressLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="to-be-confirmed" style={{ margin: 0 }}>
                  نشانی بوتیک بهزودی همینجا منتشر میشود.
                </p>
              )}
            </div>
            <div className="info-block">
              <span className="info-block__heading">ساعات کاری</span>
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
                  ساعات کاری بهزودی همینجا منتشر میشود.
                </p>
              )}
            </div>
            <div className="info-block">
              <span className="info-block__heading">در بوتیک</span>
              <ul>
                {site.boutique.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/boutique" className="btn btn--gold">
              دیدن بوتیک
            </Link>
          </div>
        </div>
      </section>

      {/* --- 8. Values ------------------------------------------------------ */}
      <section className="section section--dark">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">اصول ما</span>
              <h2 className="section-head__title">چهار چیزی که بر سرشان معامله نمیکنیم</h2>
            </div>
          </div>
          <div className="values">
            {site.values.map((value, index) => (
              <Reveal key={value.title} delay={index * 80} className="value">
                <span className="value__index">۰{index + 1}</span>
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
            <span className="eyebrow">سازمانی و رویدادها</span>
            <h2 style={{ maxWidth: '24ch' }}>هدیهای سنجیده برای هر مناسبت</h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              شکلات برای مناسبتهایی کار میکند که یک یادداشت اداری هرگز به آنها نمیرسد: قدردانی از
              مشتری، رویدادهای کارکنان، ازدواج و همایشها. شکل رویداد خود را بگویید تا جعبه، روبان و
              کارت پیام را پیشنهاد بدهیم.
            </p>
            <ul className="numbered-notes" style={{ marginTop: '2rem' }}>
              <li>از جعبههای هدیهای که هر روز میسازیم انتخاب کنید، یا ترکیبی اختصاصی بخواهید.</li>
              <li>کارت پیام میتواند نوشتهی خودتان را داشته باشد که با فویل طلایی چاپ میشود.</li>
              <li>سفارشها دستهای آماده میشوند، پس برای تاریخ تحویل مشخص کمی زمان بگذارید.</li>
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
              <span className="eyebrow">اینستاگرام</span>
              <h2 className="section-head__title">از بوتیک، تقریباً هر روز</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
              <p className="lede" style={{ maxWidth: '34ch' }}>
                جعبههای تازه، سینیهای آماده و آزمونهای روبان — همانطور که کار میکنیم، در مغازه
                عکس میگیریم.
              </p>
              {site.boutique.instagramUrl ? (
                <a
                  className="link-arrow"
                  href={site.boutique.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  دنبال کردن در اینستاگرام <ArrowRight width={16} height={16} />
                </a>
              ) : (
                <span className="form-note" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <InstagramIcon width={18} height={18} /> لینک اینستاگرام بهزودی اضافه میشود
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
