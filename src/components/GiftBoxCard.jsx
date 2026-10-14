import { Link } from 'react-router-dom';
import FramedImage from './FramedImage.jsx';
import { useCart } from '../lib/cart.jsx';
import { formatToman } from '../lib/format.js';

export default function GiftBoxCard({ box, detailed = false }) {
  const { addGiftBox } = useCart();

  return (
    <article className="pcard" id={box.slug}>
      <div className="pcard__media">
        <FramedImage
          image={box.image}
          alt={`${box.name} — جعبهی هدیهی شکلات آناهیتا`}
          ratio="frame--square"
        />
        <div className="pcard__quick">
          <button type="button" className="btn btn--gold btn--block btn--sm" onClick={() => addGiftBox(box)}>
            افزودن به سبد
          </button>
        </div>
      </div>

      <div className="pcard__body">
        <span className="badge">{box.pieces}</span>
        <h3 className="pcard__name">{box.name}</h3>
        <p className="pcard__short">{box.short}</p>
        {detailed && <p className="pcard__short">{box.description}</p>}
        <div className="pcard__meta">
          <span className="pcard__price">{formatToman(box.price)}</span>
          <span className="pcard__weight">جعبه هدیه</span>
        </div>
        {box.studio && (
          <Link to="/personalise" className="pcard__link">
            این هدیه را شخصیسازی کنید ←
          </Link>
        )}
      </div>
    </article>
  );
}
