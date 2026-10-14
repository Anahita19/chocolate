import { Link, useLocation } from 'react-router-dom';
import { formatToman } from '../lib/format.js';
import { site } from '../data/site.js';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <>
        <section className="page-hero" style={{ paddingTop: 'clamp(6.5rem, 12vw, 9rem)' }}>
          <div className="shell">
            <span className="eyebrow">Order</span>
            <h1>No order to show</h1>
          </div>
        </section>
        <section className="section section--dark">
          <div className="shell empty-cart">
            <p className="lede">
              This page shows the summary of an order you have just placed. Start from the chocolate
              case and your reference number will appear here.
            </p>
            <Link to="/chocolates" className="btn btn--gold">
              Explore our chocolates
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
          <span className="eyebrow">Order request received</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.1rem)' }}>Thank you, {order.contact.fullName}.</h1>
          <p className="lede" style={{ marginTop: '1rem' }}>
            Your order has reached the boutique as a request. We will confirm availability, delivery
            and payment with you — nothing has been charged.
          </p>
        </div>
      </section>

      <section className="section section--dark" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell">
          <div className="confirm">
            <span className="confirm__reference">Reference · {order.reference}</span>
            <p className="to-be-confirmed" style={{ margin: 0 }}>
              Keep this reference for any follow-up by phone or email.
            </p>
          </div>

          <div className="checkout" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            <div className="checkout__block">
              <h2 className="checkout__legend">
                Your chocolates <small>{order.items.length} lines</small>
              </h2>
              <ul className="summary-list" style={{ gap: '0.85rem' }}>
                {order.items.map((item) => (
                  <li key={`${item.name}-${item.qty}`}>
                    {item.qty} × {item.name}
                    {item.selection?.message ? ` — “${item.selection.message}”` : ''}{' '}
                    <span style={{ float: 'right' }}>{formatToman(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
              <hr className="hairline" style={{ margin: '1.25rem 0 1rem' }} />
              <div className="summary-row summary-row--total">
                <span>Total</span>
                <span>{formatToman(order.subtotal)}</span>
              </div>
            </div>

            <div className="checkout__summary">
              <span className="eyebrow">Delivering to</span>
              <ul className="summary-list" style={{ marginTop: '1rem' }}>
                <li>
                  <span>{order.contact.fullName}</span>
                </li>
                <li>{order.contact.address}</li>
                <li>
                  {order.contact.city}
                  {order.contact.postcode ? `, ${order.contact.postcode}` : ''}
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
                  <span className="eyebrow">Your note</span>
                  <p className="lede" style={{ margin: '0.5rem 0 0' }}>
                    {order.contact.notes}
                  </p>
                </>
              )}

              <hr className="hairline" style={{ margin: '1.25rem 0' }} />
              <span className="eyebrow">What happens next</span>
              <ol className="numbered-notes" style={{ marginTop: '0.75rem' }}>
                <li>We check the case and confirm what can be prepared for your date.</li>
                <li>We contact you with the delivery cost and a payment method.</li>
                <li>Your chocolates are packed and the ribbon tied on the day they leave us.</li>
              </ol>

              <p className="form-note" style={{ marginTop: '1rem' }}>
                No online payment has been taken. Order storage and email confirmations are connected
                once the boutique's systems are live — until then this summary lives in your browser
                only.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.25rem' }}>
                <Link to="/chocolates" className="btn btn--gold">
                  Continue shopping
                </Link>
                <Link to="/contact" className="btn">
                  Contact the boutique
                </Link>
              </div>
              {site.boutique.phone && (
                <p className="form-note" style={{ marginTop: '1rem' }}>
                  Prefer to speak to us? Call {site.boutique.phone}.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
