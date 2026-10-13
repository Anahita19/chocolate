import { useCart } from '../lib/cart.jsx';
import { CheckIcon } from './Icons.jsx';

/* Announces cart changes for sighted users; screen readers get the live region. */
export default function Toast() {
  const { notice } = useCart();
  return (
    <div aria-live="polite">
      {notice && (
        <div className="toast">
          <CheckIcon style={{ color: 'var(--gold)', flex: 'none' }} />
          {notice}
        </div>
      )}
    </div>
  );
}
