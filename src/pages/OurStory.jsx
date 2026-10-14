import { Link } from 'react-router-dom';
import FramedImage from '../components/FramedImage.jsx';
import Reveal from '../components/Reveal.jsx';
import { Emblem } from '../components/Logo.jsx';
import { craft, site } from '../data/site.js';

export default function OurStory() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">داستان ما</span>
          <h1 style={{ maxWidth: '24ch' }}>خانهای شکلاتی که بر پایهی یک ویترین کوچک شیشهای ساخته شد</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            آناهیتا با یک آرزوی ساده آغاز شد: ساختن شکلاتی که شایستهی اتاقی باشد که در آن سرو میشود —
            و سرو کردنش در اتاقی که شایستهی آن شکلات باشد.
          </p>
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell split-story">
          <Reveal>
            <span className="eyebrow">ایده</span>
            <h2 style={{ maxWidth: '22ch' }}>همهچیز به سمت میز اشاره میکند</h2>
            <p className="lede" style={{ marginTop: '1.1rem' }}>
              وارد میشوید و اتاق خود را حول یک چیز میچیند: یک ویترین شیشهای منحنی، روشنشده از
              پایین، پر از شکلات دستساز. پانلهای چوب گردو نور را میبلعند، دیوار سنگی نشانهی برند را
              نگه میدارد و طاقچههای هلالی جعبههای هدیه را در خود جای میدهند.
            </p>
            <p className="lede">
              این طراحی عمداً آرام است. شکلات روشنترین چیز این اتاق است و ما ترجیح میدهیم همینطور
              بماند.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <FramedImage
              image={{ src: '/images/boutique-interior.jpg', focus: '50% 50%', zoom: 1.05 }}
              alt="نمای کلی از داخل بوتیک آناهیتا با کابینتهای چوب گردوی تیره و میز منحنی شکلات"
              ratio="frame--portrait"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="shell editorial">
          <Reveal>
            <span className="eyebrow">{craft.eyebrow}</span>
            <p className="editorial__statement">{craft.title}</p>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              {craft.body}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ol className="numbered-notes">
              {craft.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section section--espresso">
        <div className="shell" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', textAlign: 'center' }}>
          <Emblem className="brand__emblem" style={{ width: 44, height: 26 }} />
          <h2 style={{ maxWidth: '28ch' }}>در دستههای کوچک ساخته میشود، دانهدانه انتخاب میشود</h2>
          <p className="lede" style={{ maxWidth: '54ch' }}>
            بیایید و پشت میز بچشید، یا از هر جا که هستید جعبهتان را بچینید. در هر حال، همان روزی که
            از ما خارج میشود بستهبندی میشود.
          </p>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/boutique" className="btn btn--gold">
              دیدن بوتیک
            </Link>
            <Link to="/chocolates" className="btn">
              دیدن شکلاتها
            </Link>
          </div>
          <p className="form-note">
            {site.boutique.addressLines.length === 0
              ? 'نشانی بوتیک، ساعات کاری و شمارهی تماس پس از تأیید همینجا منتشر میشود.'
              : null}
          </p>
        </div>
      </section>
    </>
  );
}
