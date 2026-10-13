import { useState } from 'react';
import { eventTypes } from '../data/gifting.js';
import { submitEnquiry } from '../lib/integrations.js';
import { CheckIcon } from './Icons.jsx';

const empty = {
  name: '',
  contact: '',
  eventType: eventTypes[0],
  quantity: '',
  date: '',
  notes: '',
};

export default function CorporateForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const set = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Please tell us your name.';
    if (!values.contact.trim()) nextErrors.contact = 'Please add a phone number or email.';
    if (values.quantity && !/^\d+$/.test(values.quantity.trim())) {
      nextErrors.quantity = 'Estimated quantity should be a number.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    const result = await submitEnquiry({ ...values, reference: undefined });
    setStatus(result.delivered ? 'delivered' : 'held');
    setValues(empty);
  };

  return (
    <form className="corporate__panel" onSubmit={onSubmit} noValidate>
      <span className="eyebrow">Corporate & event enquiry</span>
      <div className="form-grid">
        <div className={`field ${errors.name ? 'field--invalid' : ''}`}>
          <label className="field__label" htmlFor="corp-name">
            Name
          </label>
          <input
            id="corp-name"
            className="field__input"
            value={values.name}
            onChange={set('name')}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span className="field__error">{errors.name}</span>}
        </div>

        <div className={`field ${errors.contact ? 'field--invalid' : ''}`}>
          <label className="field__label" htmlFor="corp-contact">
            Phone or email
          </label>
          <input
            id="corp-contact"
            className="field__input"
            value={values.contact}
            onChange={set('contact')}
            aria-invalid={Boolean(errors.contact)}
          />
          {errors.contact && <span className="field__error">{errors.contact}</span>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="corp-type">
            Event type
          </label>
          <select id="corp-type" className="field__select" value={values.eventType} onChange={set('eventType')}>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className={`field ${errors.quantity ? 'field--invalid' : ''}`}>
          <label className="field__label" htmlFor="corp-quantity">
            Estimated quantity
          </label>
          <input
            id="corp-quantity"
            className="field__input"
            inputMode="numeric"
            placeholder="e.g. 40 gift boxes"
            value={values.quantity}
            onChange={set('quantity')}
            aria-invalid={Boolean(errors.quantity)}
          />
          {errors.quantity && <span className="field__error">{errors.quantity}</span>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="corp-date">
            Desired delivery date
          </label>
          <input id="corp-date" className="field__input" type="date" value={values.date} onChange={set('date')} />
        </div>

        <div className="field form-grid--wide">
          <label className="field__label" htmlFor="corp-notes">
            Additional notes
          </label>
          <textarea
            id="corp-notes"
            className="field__textarea"
            value={values.notes}
            onChange={set('notes')}
            placeholder="Ribbon colours, logo on the card, delivery address…"
          />
        </div>
      </div>

      <div style={{ marginTop: '1.35rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <button type="submit" className="btn btn--gold" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Request a custom order'}
        </button>
        <p className="form-note" style={{ margin: 0 }}>
          We answer enquiries in the order they arrive.
        </p>
      </div>

      {status === 'delivered' && (
        <p className="form-status" style={{ marginTop: '1.25rem' }} role="status">
          <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
          Thank you — your enquiry has reached the boutique and we will be in touch.
        </p>
      )}
      {status === 'held' && (
        <p className="form-status" style={{ marginTop: '1.25rem' }} role="status">
          <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
          Thank you — your enquiry is saved on this device. Enquiry delivery is not connected yet, so
          please also reach the boutique by phone or Instagram in the meantime.
        </p>
      )}
    </form>
  );
}
