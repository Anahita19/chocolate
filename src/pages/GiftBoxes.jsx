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
          <span className="eyebrow">هدیه</span>
          <h1>جعبههای هدیهی شکلات</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            زیبا ساختهشده، سنجیده هدیه دادهشده. جعبههای سخت قهوهای با نشان طلایی شامپاینی، روبان
            ساتن تیره و جای عاجیرنگ — پر و گرهخورده با دست.
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
              alt="قفسههای هلالی روشن با جعبههای هدیهی شکلات آناهیتا"
              ratio="frame--portrait"
            />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">بستهبندی</span>
            <h2 style={{ maxWidth: '22ch' }}>به همان استحکام مغازهای که از آن میآید</h2>
            <p className="lede" style={{ marginTop: '1.1rem' }}>
              جعبهها از مقوای سخت قهوهای تیرهاند، با نشان آناهیتا به رنگ طلای شامپاینی و فویل روی
              درِ داخلی. داخل، سینی عاجیرنگ هر قطعه را در جای خود نگه میدارد تا در راه چیزی جابهجا
              نشود.
            </p>
            <ul className="numbered-notes" style={{ marginTop: '1.75rem' }}>
              <li>مقوای قهوهای، نشان طلایی، با روکش همسان.</li>
              <li>فویل طلای شامپاینی روی درِ داخلی و کارت پیام.</li>
              <li>روبان ساتن تیره که در بوتیک و به رنگ انتخابی شما گره میخورد.</li>
              <li>جای عاجیرنگ، به همان ترتیبی که در ویترین چیده شده.</li>
            </ul>
            <p className="form-note" style={{ marginTop: '1.5rem' }}>
              عکاسی بستهبندی در برنامه است؛ تصاویری که اینجا میبینید از خود بوتیک است.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--marble">
        <div className="shell" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
          <span className="eyebrow">آن را مال خود کنید</span>
          <h2 style={{ maxWidth: '26ch' }}>جعبه، شکلات، روبان و پیام را انتخاب کنید</h2>
          <p className="lede" style={{ maxWidth: '52ch' }}>
            آتلیهی هدیهی ما شما را در هر انتخاب همراهی میکند و همزمان مبلغ کل را نشان میدهد — بعد آن
            را با دست بستهبندی میکنیم.
          </p>
          <Link to="/personalise" className="btn btn--gold">
            رفتن به آتلیهی هدیه
          </Link>
        </div>
      </section>
    </>
  );
}
