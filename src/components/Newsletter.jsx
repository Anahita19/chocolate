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
      setError('لطفاً یک نشانی ایمیل معتبر وارد کنید.');
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
        <span className="eyebrow">خبرنامه</span>
        <h2 style={{ color: 'var(--ivory)', maxWidth: '20ch' }}>
          کمی شکلات بیشتر در دنیای شما
        </h2>
        <p className="lede" style={{ marginTop: '1rem' }}>
          تازهترین مجموعهها، ایدههای هدیه و ساختههای جدید آناهیتا را ببینید.
        </p>
      </div>

      <div>
        <form className="newsletter__form" onSubmit={onSubmit} noValidate>
          <div className={`field ${error ? 'field--invalid' : ''}`}>
            <label className="field__label" htmlFor="newsletter-email">
              نشانی ایمیل
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
            {status === 'sending' ? 'در حال ارسال…' : 'عضویت'}
          </button>
        </form>

        {status === 'delivered' && (
          <p className="form-status" style={{ marginTop: '1rem' }} role="status">
            <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
            سپاس — نشانی شما در فهرست آناهیتا ثبت شد.
          </p>
        )}
        {status === 'held' && (
          <p className="form-status" style={{ marginTop: '1rem' }} role="status">
            <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
            سپاس. ارسال خبرنامه هنوز متصل نیست، بنابراین نشانی شما فقط روی همین دستگاه ثبت شده است —
            بهمحض راهاندازی فهرست پستی برایتان مینویسیم.
          </p>
        )}

        <p className="form-note" style={{ marginTop: '1rem' }}>
          از نشانی شما فقط برای فرستادن نامههای آناهیتا استفاده میکنیم. هر زمان بخواهید میتوانید لغو کنید.
        </p>
      </div>
    </div>
  );
}
