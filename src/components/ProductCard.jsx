import { Link } from 'react-router-dom';
import FramedImage from './FramedImage.jsx';
import { useCart } from '../lib/cart.jsx';
import { formatToman } from '../lib/format.js';

export default function ProductCard({ product, showWeight = true }) {
  const { addProduct } = useCart();
  const to = `/product/${product.slug}`;

  return (
    <article className="pcard">
      <div className="pcard__media">
        <FramedImage
          image={product.image}
          alt={`${product.name} — شکلات دستساز بوتیک آناهیتا`}
          ratio=""
        />
        <div className="pcard__quick">
          <button
            type="button"
            className="btn btn--gold btn--block btn--sm"
            onClick={() => addProduct(product)}
          >
            افزودن به سبد
          </button>
        </div>
      </div>

      <div className="pcard__body">
        <h3 className="pcard__name">
          <Link to={to}>{product.name}</Link>
        </h3>
        <p className="pcard__short">{product.short}</p>
        <div className="pcard__meta">
          <span className="pcard__price">{formatToman(product.price)}</span>
          {showWeight && <span className="pcard__weight">{product.weight}</span>}
        </div>
        <Link to={to} className="pcard__link">
          جزئیات محصول ←
        </Link>
      </div>
    </article>
  );
}
