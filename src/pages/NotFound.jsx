import { Link } from 'react-router-dom';
import { Emblem } from '../components/Logo.jsx';

export default function NotFound() {
  return (
    <section className="section section--dark" style={{ paddingTop: 'clamp(8rem, 16vw, 12rem)' }}>
      <div className="shell empty-cart">
        <Emblem className="brand__emblem" style={{ width: 40, height: 24 }} />
        <span className="eyebrow">صفحه پیدا نشد</span>
        <h1 style={{ fontSize: 'clamp(1.9rem, 4.2vw, 2.9rem)', maxWidth: '24ch' }}>
          این قفسه خالی است
        </h1>
        <p className="lede" style={{ maxWidth: '46ch' }}>
          صفحهای که خواستید در بوتیک نیست. ویترین شکلاتها بهترین نقطه برای شروع است.
        </p>
        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/chocolates" className="btn btn--gold">
            دیدن شکلاتها
          </Link>
          <Link to="/" className="btn">
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </section>
  );
}
