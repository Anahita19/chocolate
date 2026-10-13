import { Link } from 'react-router-dom';
import { Emblem } from '../components/Logo.jsx';

export default function NotFound() {
  return (
    <section className="section section--dark" style={{ paddingTop: 'clamp(8rem, 16vw, 12rem)' }}>
      <div className="shell empty-cart">
        <Emblem className="brand__emblem" style={{ width: 40, height: 24 }} />
        <span className="eyebrow">Page not found</span>
        <h1 style={{ fontSize: 'clamp(1.9rem, 4.2vw, 2.9rem)', maxWidth: '24ch' }}>
          That shelf is empty
        </h1>
        <p className="lede" style={{ maxWidth: '46ch' }}>
          The page you asked for is not in the boutique. The chocolate case is the best place to
          start.
        </p>
        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/chocolates" className="btn btn--gold">
            Explore our chocolates
          </Link>
          <Link to="/" className="btn">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
