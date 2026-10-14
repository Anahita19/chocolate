import { Link } from 'react-router-dom';
import FramedImage from '../components/FramedImage.jsx';
import Reveal from '../components/Reveal.jsx';
import { boutiqueGallery, boutiqueStory, site } from '../data/site.js';
import { ClockIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from '../components/Icons.jsx';

export default function Boutique() {
  const { boutique } = site;
  const hasAddress = boutique.addressLines.length > 0;

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">{boutiqueStory.eyebrow}</span>
          <h1 style={{ maxWidth: '22ch' }}>{boutiqueStory.title}</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            {boutiqueStory.body}
          </p>
        </div>
      </section>

      <section className="section section--dark" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell">
          <div className="gallery">
            {boutiqueGallery.map((shot, index) => (
              <Reveal
                key={shot.caption}
                delay={(index % 4) * 70}
                className={`gallery__item ${shot.wide ? 'gallery__item--wide' : ''}`}
              >
                <FramedImage image={shot} alt={shot.alt} ratio={shot.wide ? 'frame--wide' : 'frame--square'} />
                <span className="gallery__caption">{shot.caption}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--espresso">
        <div className="shell boutique-info">
          <div className="info-block">
            <span className="info-block__heading">
              <PinIcon width={15} height={15} style={{ verticalAlign: '-2px', marginInlineEnd: 8 }} />
              نشانی
            </span>
            {hasAddress ? (
              <ul>
                {boutique.addressLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="to-be-confirmed" style={{ margin: 0 }}>
                نشانی بوتیک هنوز منتشر نشده است.
              </p>
            )}
            {boutique.mapUrl ? (
              <a className="link-arrow" href={boutique.mapUrl} target="_blank" rel="noreferrer noopener" style={{ marginTop: '1rem' }}>
                دیدن روی نقشه ←
              </a>
            ) : null}
          </div>

          <div className="info-block">
            <span className="info-block__heading">
              <ClockIcon width={15} height={15} style={{ verticalAlign: '-2px', marginInlineEnd: 8 }} />
              ساعات کاری
            </span>
            {boutique.hours.length > 0 ? (
              <ul>
                {boutique.hours.map((slot) => (
                  <li key={slot.days}>
                    {slot.days} · {slot.hours}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="to-be-confirmed" style={{ margin: 0 }}>
                ساعات کاری هنوز منتشر نشده است.
              </p>
            )}
          </div>

          <div className="info-block">
            <span className="info-block__heading">با ما حرف بزنید</span>
            <ul>
              <li>
                {boutique.phone ? (
                  <a href={`tel:${boutique.phone.replace(/\s+/g, '')}`} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                    <PhoneIcon width={15} height={15} /> {boutique.phone}
                  </a>
                ) : (
                  <span className="to-be-confirmed">
                    <PhoneIcon width={15} height={15} style={{ verticalAlign: '-2px', marginInlineEnd: 8 }} />
                    شمارهی تماس بهزودی اعلام میشود
                  </span>
                )}
              </li>
              <li>
                {boutique.email ? (
                  <a href={`mailto:${boutique.email}`} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                    <MailIcon width={15} height={15} /> {boutique.email}
                  </a>
                ) : (
                  <span className="to-be-confirmed">
                    <MailIcon width={15} height={15} style={{ verticalAlign: '-2px', marginInlineEnd: 8 }} />
                    نشانی ایمیل بهزودی اعلام میشود
                  </span>
                )}
              </li>
              <li>
                {boutique.instagramUrl ? (
                  <a href={boutique.instagramUrl} target="_blank" rel="noreferrer noopener" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                    <InstagramIcon width={15} height={15} /> Instagram
                  </a>
                ) : (
                  <span className="to-be-confirmed">
                    <InstagramIcon width={15} height={15} style={{ verticalAlign: '-2px', marginInlineEnd: 8 }} />
                    لینک اینستاگرام بهزودی اضافه میشود
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--marble">
        <div className="shell split-story">
          <Reveal>
            <span className="eyebrow">پشت میز</span>
            <h2 style={{ maxWidth: '22ch' }}>یک بازدید چگونه میگذرد</h2>
            <ul className="numbered-notes" style={{ marginTop: '1.5rem' }}>
              <li>یک جعبه انتخاب کنید، یا با یک قطعهی تنها برای چشیدن در مغازه شروع کنید.</li>
              <li>شکلاتها را با یک چنگال کوچک از ویترین برمیداریم و روی جای عاجیرنگ میچینیم.</li>
              <li>
                مناسبت را بگویید؛ ترتیب را پیشنهاد میدهیم — سبک و خامهای اول، تلخ و پرقدرت آخر.
              </li>
              <li>روبان همانجا که منتظرید گره میخورد، با کارت پیام شما در داخل.</li>
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">خدمات</span>
            <h2 style={{ maxWidth: '22ch' }}>چه چیزهایی را ترتیب میدهیم</h2>
            <ul className="numbered-notes" style={{ marginTop: '1.5rem' }}>
              {boutique.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
              <Link to="/contact" className="btn btn--gold">
                تماس با بوتیک
              </Link>
              <Link to="/gift-boxes" className="btn">
                دیدن جعبههای هدیه
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
