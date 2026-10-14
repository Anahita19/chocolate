import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { site } from '../data/site.js';
import { submitEnquiry } from '../lib/integrations.js';
import { CheckIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from '../components/Icons.jsx';

export default function Contact() {
  const { boutique } = site;
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const set = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = 'لطفاً نام خود را بنویسید.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = 'لطفاً یک نشانی ایمیل معتبر وارد کنید.';
    }
    if (!values.message.trim()) next.message = 'لطفاً پیام کوتاهی بنویسید.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('sending');
    const result = await submitEnquiry({ ...values, eventType: 'General enquiry', quantity: '', date: '', notes: '' });
    setStatus(result.delivered ? 'delivered' : 'held');
    setValues({ name: '', email: '', message: '' });
  };

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">تماس</span>
          <h1>با آناهیتا حرف بزنید</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            پرسشی دربارهی یک جعبه، فهرست مواد اولیه یا تاریخ تحویل دارید؟ برای ما بنویسید؛ خودمان
            پاسخ میدهیم.
          </p>
        </div>
      </section>

      <section className="section section--dark" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell corporate">
          <Reveal>
            <div className="info-block">
              <span className="info-block__heading">
                <PinIcon width={15} height={15} style={{ verticalAlign: '-2px', marginInlineEnd: 8 }} />
                بوتیک
              </span>
              {boutique.addressLines.length > 0 ? (
                <ul>
                  {boutique.addressLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="to-be-confirmed" style={{ margin: 0 }}>
                  نشانی بهزودی اعلام میشود.
                </p>
              )}
            </div>

            <div className="info-block" style={{ marginTop: '1.25rem' }}>
              <span className="info-block__heading">تماس مستقیم</span>
              <ul>
                <li>
                  {boutique.phone ? (
                    <a href={`tel:${boutique.phone.replace(/\s+/g, '')}`} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                      <PhoneIcon width={15} height={15} /> {boutique.phone}
                    </a>
                  ) : (
                    <span className="to-be-confirmed">شمارهی تماس بهزودی اعلام میشود</span>
                  )}
                </li>
                <li>
                  {boutique.email ? (
                    <a href={`mailto:${boutique.email}`} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                      <MailIcon width={15} height={15} /> {boutique.email}
                    </a>
                  ) : (
                    <span className="to-be-confirmed">نشانی ایمیل بهزودی اعلام میشود</span>
                  )}
                </li>
                <li>
                  {boutique.instagramUrl ? (
                    <a href={boutique.instagramUrl} target="_blank" rel="noreferrer noopener" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                      <InstagramIcon width={15} height={15} /> Instagram
                    </a>
                  ) : (
                    <span className="to-be-confirmed">لینک اینستاگرام بهزودی اضافه میشود</span>
                  )}
                </li>
              </ul>
            </div>

            <div className="info-block" style={{ marginTop: '1.25rem' }}>
              <span className="info-block__heading">سازمانی و رویدادها</span>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                برای هدیه دادن در مقیاس بزرگ — جعبههای مشتریان، رویدادهای کارکنان، ازدواج و همایشها —
                از فرم استعلام در{' '}
                <a href="/#corporate" style={{ color: 'var(--gold)' }}>
                  صفحهی اصلی
                </a>{' '}
                استفاده کنید، یا همینجا در پیامتان بنویسید.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form className="corporate__panel" onSubmit={onSubmit} noValidate>
              <span className="eyebrow">ارسال پیام</span>
              <div className="form-grid">
                <div className={`field ${errors.name ? 'field--invalid' : ''}`}>
                  <label className="field__label" htmlFor="contact-name">
                    نام
                  </label>
                  <input
                    id="contact-name"
                    className="field__input"
                    value={values.name}
                    onChange={set('name')}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <span className="field__error">{errors.name}</span>}
                </div>
                <div className={`field ${errors.email ? 'field--invalid' : ''}`}>
                  <label className="field__label" htmlFor="contact-email">
                    ایمیل
                  </label>
                  <input
                    id="contact-email"
                    className="field__input"
                    type="email"
                    value={values.email}
                    onChange={set('email')}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <span className="field__error">{errors.email}</span>}
                </div>
                <div className={`field form-grid--wide ${errors.message ? 'field--invalid' : ''}`}>
                  <label className="field__label" htmlFor="contact-message">
                    پیام
                  </label>
                  <textarea
                    id="contact-message"
                    className="field__textarea"
                    value={values.message}
                    onChange={set('message')}
                    aria-invalid={Boolean(errors.message)}
                    placeholder="چطور میتوانیم کمک کنیم؟"
                  />
                  {errors.message && <span className="field__error">{errors.message}</span>}
                </div>
              </div>

              <div style={{ marginTop: '1.35rem' }}>
                <button type="submit" className="btn btn--gold" disabled={status === 'sending'}>
                  {status === 'sending' ? 'در حال ارسال…' : 'ارسال پیام'}
                </button>
              </div>

              {status === 'delivered' && (
                <p className="form-status" style={{ marginTop: '1.25rem' }} role="status">
                  <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
                  سپاس — پیام شما به بوتیک رسید.
                </p>
              )}
              {status === 'held' && (
                <p className="form-status" style={{ marginTop: '1.25rem' }} role="status">
                  <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
                  سپاس — پیام شما روی همین دستگاه ذخیره شد. ارسال پیامها هنوز متصل نیست؛ لطفاً در این
                  فاصله مستقیم با بوتیک در تماس باشید.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
