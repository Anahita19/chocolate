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
    if (!values.name.trim()) nextErrors.name = 'لطفاً نام خود را بنویسید.';
    if (!values.contact.trim()) nextErrors.contact = 'لطفاً یک شمارهی تماس یا ایمیل بگذارید.';
    if (values.quantity && !/^\d+$/.test(values.quantity.trim())) {
      nextErrors.quantity = 'تعداد تقریبی باید عدد باشد.';
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
      <span className="eyebrow">استعلام سازمانی و رویدادها</span>
      <div className="form-grid">
        <div className={`field ${errors.name ? 'field--invalid' : ''}`}>
          <label className="field__label" htmlFor="corp-name">
            نام
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
            تلفن یا ایمیل
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
            نوع رویداد
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
            تعداد تقریبی
          </label>
          <input
            id="corp-quantity"
            className="field__input"
            inputMode="numeric"
            placeholder="مثلاً ۴۰ جعبهی هدیه"
            value={values.quantity}
            onChange={set('quantity')}
            aria-invalid={Boolean(errors.quantity)}
          />
          {errors.quantity && <span className="field__error">{errors.quantity}</span>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="corp-date">
            تاریخ تحویل مورد نظر
          </label>
          <input id="corp-date" className="field__input" type="date" value={values.date} onChange={set('date')} />
        </div>

        <div className="field form-grid--wide">
          <label className="field__label" htmlFor="corp-notes">
            توضیحات بیشتر
          </label>
          <textarea
            id="corp-notes"
            className="field__textarea"
            value={values.notes}
            onChange={set('notes')}
            placeholder="رنگ روبان، نشان روی کارت، نشانی تحویل…"
          />
        </div>
      </div>

      <div style={{ marginTop: '1.35rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <button type="submit" className="btn btn--gold" disabled={status === 'sending'}>
          {status === 'sending' ? 'در حال ارسال…' : 'درخواست سفارش اختصاصی'}
        </button>
        <p className="form-note" style={{ margin: 0 }}>
          به استعلامها به ترتیب رسیدن پاسخ میدهیم.
        </p>
      </div>

      {status === 'delivered' && (
        <p className="form-status" style={{ marginTop: '1.25rem' }} role="status">
          <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
          سپاس — استعلام شما به بوتیک رسید و با شما در تماس خواهیم بود.
        </p>
      )}
      {status === 'held' && (
        <p className="form-status" style={{ marginTop: '1.25rem' }} role="status">
          <CheckIcon style={{ color: 'var(--gold)', marginTop: 3, flex: 'none' }} />
          سپاس — استعلام شما روی همین دستگاه ذخیره شد. ارسال استعلامها هنوز متصل نیست؛ لطفاً در این
          فاصله با تلفن یا اینستاگرام با بوتیک در تماس باشید.
        </p>
      )}
    </form>
  );
}
