import { Link } from 'react-router-dom';
import { site } from '../data/site.js';

function LegalPage({ eyebrow, title, intro, children }) {
  return (
    <>
      <section className="page-hero" style={{ paddingTop: 'clamp(6.5rem, 12vw, 9rem)' }}>
        <div className="shell">
          <span className="eyebrow">{eyebrow}</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.1rem)' }}>{title}</h1>
          <p className="lede" style={{ marginTop: '1rem' }}>
            {intro}
          </p>
        </div>
      </section>

      <section className="section section--dark" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell legal">
          <p className="form-status">
            This page describes how the boutique works today. Details marked as to be confirmed will be
            filled in before launch.
          </p>
          {children}
        </div>
      </section>
    </>
  );
}

export function ShippingAndReturns() {
  const { boutique } = site;
  return (
    <LegalPage
      eyebrow="Information"
      title="Shipping & Returns"
      intro="How your chocolates travel, and what to do if something is not right when they arrive."
    >
      <h2>Delivery</h2>
      <p>
        Orders are prepared in the boutique and delivered locally or collected in person. Delivery
        zones, timings and costs are confirmed with you when we review your order — the website does
        not calculate or charge a delivery fee.
      </p>
      <ul>
        <li>Local delivery: arranged with you when we confirm the order.</li>
        <li>Collection in the boutique: free, and always the quickest option.</li>
        <li>Nationwide courier: quoted per order, with the packaging we use for warm weather.</li>
      </ul>

      <h2>Chocolate is perishable</h2>
      <p>
        Chocolate dislikes heat and direct sunlight. We pack every order with a cool pack when the
        weather calls for it, and we will always tell you if a delivery date is risky.
      </p>

      <h2>If something is wrong</h2>
      <p>
        Please contact us as soon as you can after delivery — ideally within 48 hours — if a box
        arrives damaged, warm, or does not match your order. Send a photograph if you can; in most
        cases we replace the box or refund it. Because chocolate is a food item, we cannot accept
        returns of unsealed boxes for change of mind, but we will always try to make it right.
      </p>

      <h2>Talk to us</h2>
      <p>
        {boutique.phone || boutique.email ? (
          <>
            Reach the boutique on {boutique.phone || boutique.email}.
          </>
        ) : (
          <>
            The boutique's phone number and email address are to be confirmed; in the meantime, please
            use the{' '}
            <Link to="/contact" style={{ color: 'var(--gold)' }}>
              contact page
            </Link>
            .
          </>
        )}
      </p>
    </LegalPage>
  );
}

export function Privacy() {
  return (
    <LegalPage
      eyebrow="Information"
      title="Privacy Policy"
      intro="What we collect when you order or subscribe, why we hold it, and how to have it removed."
    >
      <h2>What we collect</h2>
      <ul>
        <li>Order details: your name, contact details, delivery address and the chocolates requested.</li>
        <li>Newsletter: the email address you give us, and nothing else.</li>
        <li>Enquiries: the details you choose to send us about a gifting brief or event.</li>
      </ul>

      <h2>Where it is held</h2>
      <p>
        Right now, order and enquiry details stay in the browser you used — this website's order and
        email connections are not live yet. Once they are connected, details will be stored by the
        boutique's own systems and used only to prepare, deliver and support your order. Newsletter
        addresses will be held by our mailing provider solely to send ANAHITA letters.
      </p>

      <h2>What we never do</h2>
      <ul>
        <li>We do not sell or rent your details.</li>
        <li>We do not store card details on this website — payment is arranged with the boutique.</li>
      </ul>

      <h2>Your choices</h2>
      <p>
        Write to us at any time to see, correct or delete what we hold, or to leave the newsletter
        list. Contact details for privacy requests are to be confirmed; until then please use the{' '}
        <Link to="/contact" style={{ color: 'var(--gold)' }}>
          contact page
        </Link>
        .
      </p>
    </LegalPage>
  );
}

export function Terms() {
  return (
    <LegalPage
      eyebrow="Information"
      title="Terms & Conditions"
      intro="The practical terms of ordering chocolate from ANAHITA."
    >
      <h2>Orders</h2>
      <p>
        An order placed on this website is a request. It becomes a confirmed order when the boutique
        accepts it and confirms availability, delivery and payment with you.
      </p>

      <h2>Prices</h2>
      <p>
        All prices are shown in Iranian toman and include the chocolates only. Delivery costs are
        confirmed separately with your order. We may change prices and box contents as the range
        changes.
      </p>

      <h2>Allergens</h2>
      <p>
        Our chocolates are made in a kitchen that handles milk, nuts, gluten-free ingredients and
        sesame. Ingredient and allergen information for each box is listed on its product page; please
        read it before ordering if you have an allergy.
      </p>

      <h2>Images</h2>
      <p>
        Photography on this website shows the boutique and its display cases. Individual pieces are
        handmade and may vary slightly in decoration from the images shown.
      </p>

      <h2>Using this website</h2>
      <p>
        The ANAHITA name, wordmark and photography belong to the boutique and may not be reused
        commercially without permission.
      </p>

      <h2>Questions</h2>
      <p>
        Anything unclear? Please{' '}
        <Link to="/contact" style={{ color: 'var(--gold)' }}>
          contact the boutique
        </Link>{' '}
        and we will explain in plain language.
      </p>
    </LegalPage>
  );
}
