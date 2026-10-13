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
    if (!values.name.trim()) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!values.message.trim()) next.message = 'Please add a short message.';
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
          <span className="eyebrow">Contact</span>
          <h1>Talk to ANAHITA</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Questions about a box, an ingredient list or a delivery date — write to us and we will
            answer in person.
          </p>
        </div>
      </section>

      <section className="section section--dark" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell corporate">
          <Reveal>
            <div className="info-block">
              <span className="info-block__heading">
                <PinIcon width={15} height={15} style={{ verticalAlign: '-2px', marginRight: 8 }} />
                The boutique
              </span>
              {boutique.addressLines.length > 0 ? (
                <ul>
                  {boutique.addressLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="to-be-confirmed" style={{ margin: 0 }}>
                  Address to be confirmed.
                </p>
              )}
            </div>

            <div className="info-block" style={{ marginTop: '1.25rem' }}>
              <span className="info-block__heading">Direct</span>
              <ul>
                <li>
                  {boutique.phone ? (
                    <a href={`tel:${boutique.phone.replace(/\s+/g, '')}`} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                      <PhoneIcon width={15} height={15} /> {boutique.phone}
                    </a>
                  ) : (
                    <span className="to-be-confirmed">Phone number to be confirmed</span>
                  )}
                </li>
                <li>
                  {boutique.email ? (
                    <a href={`mailto:${boutique.email}`} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                      <MailIcon width={15} height={15} /> {boutique.email}
                    </a>
                  ) : (
                    <span className="to-be-confirmed">Email address to be confirmed</span>
                  )}
                </li>
                <li>
                  {boutique.instagramUrl ? (
                    <a href={boutique.instagramUrl} target="_blank" rel="noreferrer noopener" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                      <InstagramIcon width={15} height={15} /> Instagram
                    </a>
                  ) : (
                    <span className="to-be-confirmed">Instagram link to be added</span>
                  )}
                </li>
              </ul>
            </div>

            <div className="info-block" style={{ marginTop: '1.25rem' }}>
              <span className="info-block__heading">Corporate & events</span>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                For gifting at scale — client boxes, staff milestones, weddings and conferences — use
                the enquiry form on the{' '}
                <a href="/#corporate" style={{ color: 'var(--gold)' }}>
                  home page
                </a>
                , or mention it in your message here.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form className="corporate__panel" onSubmit={onSubmit} noValidate>
              <span className="eyebrow">Send a message</span>
              <div className="form-grid">
                <div className={`field ${errors.name ? 'field--invalid' : ''}`}>
                  <label className="field__label" htmlFor="contact-name">
                    Name
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
                    Email
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
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="field__textarea"
                    value={values.message}
                    onChange={set('message')}
                    aria-invalid={Boolean(errors.message)}
                    placeholder="How can we help?"
                  />
                  {errors.message && <span className="field__error">{errors.message}</span>}
                </div>
              </div>

              <div style={{ marginTop: '1.35rem' }}>
                <button type="submit" className="btn btn--gold" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </div>

              {status === 'delivered' && (
                <p className="form-status" style={{ marginTop: '1.25rem' }} role="status">
                  <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
                  Thank you — your message has reached the boutique.
                </p>
              )}
              {status === 'held' && (
                <p className="form-status" style={{ marginTop: '1.25rem' }} role="status">
                  <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
                  Thank you — your message is saved on this device. Message delivery is not connected
                  yet, so please reach the boutique directly in the meantime.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
