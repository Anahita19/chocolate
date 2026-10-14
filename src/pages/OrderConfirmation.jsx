import { Link, useLocation } from 'react-router-dom';
import { formatToman, toPersianDigits } from '../lib/format.js';
import { site } from '../data/site.js';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <>
        <section className="page-hero" style={{ paddingTop: 'clamp(6.5rem, 12vw, 9rem)' }}>
          <div className="shell">
            <span className="eyebrow">سفارش</span>
            <h1>سفارشی برای نمایش نیست</h1>
          </div>
        </section>
        <section className="section section--dark">
          <div className="shell empty-cart">
            <p className="lede">
              این صفحه خلاصهی سفارشی را نشان میدهد که همین حالا ثبت کردهاید. از ویترین شکلاتها شروع
              کنید تا کد پیگیری شما اینجا بیاید.
            </p>
            <Link to="/chocolates" className="btn btn--gold">
              دیدن شکلاتها
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-hero" style={{ paddingTop: 'clamp(6.5rem, 12vw, 9rem)' }}>
        <div className="shell">
          <span className="eyebrow">سفارش شما ثبت شد</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.1rem)' }}>
            سپاس، {order.contact.fullName}.
          </h1>
          <p className="lede" style={{ marginTop: '1rem' }}>
            سفارش شما بهعنوان درخواست به بوتیک رسید. موجودی، زمان ارسال و پرداخت را با شما تأیید
            میکنیم — هیچ مبلغی دریافت نشده است.
          </p>
        </div>
      </section>

      <section className="section section--dark" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell">
          <div className="confirm">
            <span className="confirm__reference">کد پیگیری · {order.reference}</span>
            <p className="to-be-confirmed" style={{ margin: 0 }}>
              این کد را برای هر پیگیری تلفنی یا ایمیلی نگه دارید.
            </p>
          </div>

          <div className="checkout" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            <div className="checkout__block">
              <h2 className="checkout__legend">
                شکلاتهای شما <small>{toPersianDigits(order.items.length)} ردیف</small>
              </h2>
              <ul className="summary-list" style={{ gap: '0.85rem' }}>
                {order.items.map((item) => (
                  <li key={`${item.name}-${item.qty}`}>
                    {toPersianDigits(item.qty)} × {item.name}
                    {item.selection?.message ? ` — «${item.selection.message}»` : ''}{' '}
                    <span style={{ float: 'left' }}>{formatToman(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
              <hr className="hairline" style={{ margin: '1.25rem 0 1rem' }} />
              <div className="summary-row summary-row--total">
                <span>مجموع</span>
                <span>{formatToman(order.subtotal)}</span>
              </div>
            </div>

            <div className="checkout__summary">
              <span className="eyebrow">تحویل به</span>
              <ul className="summary-list" style={{ marginTop: '1rem' }}>
                <li>
                  <span>{order.contact.fullName}</span>
                </li>
                <li>{order.contact.address}</li>
                <li>
                  {order.contact.city}
                  {order.contact.postcode ? `، ${order.contact.postcode}` : ''}
                </li>
                <li>
                  <span>{order.contact.email}</span>
                </li>
                <li>
                  <span>{order.contact.phone}</span>
                </li>
              </ul>
              {order.contact.notes && (
                <>
                  <hr className="hairline" style={{ margin: '1.25rem 0' }} />
                  <span className="eyebrow">یادداشت شما</span>
                  <p className="lede" style={{ margin: '0.5rem 0 0' }}>
                    {order.contact.notes}
                  </p>
                </>
              )}

              <hr className="hairline" style={{ margin: '1.25rem 0' }} />
              <span className="eyebrow">بعد از این چه میشود</span>
              <ol className="numbered-notes" style={{ marginTop: '0.75rem' }}>
                <li>ویترین را بررسی میکنیم و میگوییم چه چیزی برای تاریخ شما آماده میشود.</li>
                <li>برای هزینهی ارسال و روش پرداخت با شما تماس میگیریم.</li>
                <li>شکلاتهای شما بستهبندی میشود و روبان همان روزی که از ما بیرون میرود گره میخورد.</li>
              </ol>

              <p className="form-note" style={{ marginTop: '1rem' }}>
                هیچ پرداخت آنلاینی انجام نشده است. ذخیرهی سفارش و ایمیل تأیید، هنگامی که سیستمهای
                بوتیک راهاندازی شوند متصل میشوند — تا آن زمان این خلاصه فقط در مرورگر شماست.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.25rem' }}>
                <Link to="/chocolates" className="btn btn--gold">
                  ادامهی خرید
                </Link>
                <Link to="/contact" className="btn">
                  تماس با بوتیک
                </Link>
              </div>
              {site.boutique.phone && (
                <p className="form-note" style={{ marginTop: '1rem' }}>
                  ترجیح میدهید تلفنی صحبت کنید؟ با {site.boutique.phone} تماس بگیرید.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
