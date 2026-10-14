import { useState } from 'react';
import { submitNewsletter } from '../lib/integrations.js';
import { CheckIcon } from './Icons.jsx';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  const onSubmit = async (event) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setStatus('sending');
    const result = await submitNewsletter({ email: value });
    setStatus(result.delivered ? 'delivered' : 'held');
    setEmail('');
  };

  return (
    <div className="newsletter">
      <div>
        <span className="eyebrow">Newsletter</span>
        <h2 style={{ color: 'var(--ivory)', maxWidth: '20ch' }}>
          A Little More Chocolate in Your World
        </h2>
        <p className="lede" style={{ marginTop: '1rem' }}>
          Discover our latest collections, thoughtful gifting ideas, and new creations from ANAHITA.
        </p>
      </div>

      <div>
        <form className="newsletter__form" onSubmit={onSubmit} noValidate>
          <div className={`field ${error ? 'field--invalid' : ''}`}>
            <label className="field__label" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              className="field__input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'newsletter-error' : undefined}
              required
            />
            {error && (
              <span className="field__error" id="newsletter-error" role="alert">
                {error}
              </span>
            )}
          </div>
          <button type="submit" className="btn btn--gold" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Subscribe'}
          </button>
        </form>

        {status === 'delivered' && (
          <p className="form-status" style={{ marginTop: '1rem' }} role="status">
            <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
            Thank you — your address is on the ANAHITA list.
          </p>
        )}
        {status === 'held' && (
          <p className="form-status" style={{ marginTop: '1rem' }} role="status">
            <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
            Thank you. Newsletter delivery is not connected yet, so your address has only been noted
            on this device — we will write as soon as our mailing list goes live.
          </p>
        )}

        <p className="form-note" style={{ marginTop: '1rem' }}>
          We only use your address to send ANAHITA letters. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
