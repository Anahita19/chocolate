import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import Newsletter from './Newsletter.jsx';
import { site } from '../data/site.js';
import { InstagramIcon, TelegramIcon, WhatsAppIcon } from './Icons.jsx';

const shopLinks = [
  { label: 'All chocolates', to: '/chocolates' },
  { label: 'Pralines & truffles', to: '/chocolates?category=pralines' },
  { label: 'Signature bars', to: '/chocolates?category=bars' },
  { label: 'Personalised gifts', to: '/personalise' },
];

const giftLinks = [
  { label: 'Gift boxes', to: '/gift-boxes' },
  { label: 'Collections', to: '/collections' },
  { label: 'Corporate & events', to: '/#corporate' },
  { label: 'Gift atelier', to: '/personalise' },
];

const houseLinks = [
  { label: 'Our story', to: '/our-story' },
  { label: 'The boutique', to: '/boutique' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  const { boutique } = site;
  const socials = [
    { url: boutique.instagramUrl, label: 'Instagram', Icon: InstagramIcon },
    { url: boutique.whatsappUrl, label: 'WhatsApp', Icon: WhatsAppIcon },
    { url: boutique.telegramUrl, label: 'Telegram', Icon: TelegramIcon },
  ];

  return (
    <footer className="site-footer">
      <div className="shell" style={{ paddingTop: 'clamp(3.5rem, 7vw, 6rem)' }}>
        <Newsletter />
      </div>

      <div className="shell footer__top">
        <div>
          <Logo asLink />
          <p className="lede" style={{ marginTop: '1.25rem', maxWidth: '30ch' }}>
            Handmade pralines, truffles and chocolate gift boxes, made and packed in our boutique.
          </p>
          <div className="social-row">
            {socials.map(({ url, label, Icon }) =>
              url ? (
                <a key={label} href={url} target="_blank" rel="noreferrer noopener" aria-label={label}>
                  <Icon />
                </a>
              ) : (
                <span key={label} title={`${label} link to be added`} aria-label={`${label} — link to be added`}>
                  <Icon />
                </span>
              ),
            )}
          </div>
        </div>

        <div>
          <h3 className="footer__heading">Shop</h3>
          <ul className="footer__links">
            {shopLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer__heading">Gifting & House</h3>
          <ul className="footer__links">
            {[...giftLinks, ...houseLinks].map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer__heading">The Boutique</h3>
          <ul className="footer__links">
            {boutique.addressLines.length > 0 ? (
              boutique.addressLines.map((line) => <li key={line}>{line}</li>)
            ) : (
              <li>
                <span className="to-be-confirmed">Address to be confirmed</span>
              </li>
            )}
            {boutique.hours.length > 0 ? (
              boutique.hours.map((slot) => (
                <li key={slot.days}>
                  {slot.days} · {slot.hours}
                </li>
              ))
            ) : (
              <li>
                <span className="to-be-confirmed">Opening hours to be confirmed</span>
              </li>
            )}
            <li>
              {boutique.phone ? (
                <a href={`tel:${boutique.phone.replace(/\s+/g, '')}`}>{boutique.phone}</a>
              ) : (
                <span className="to-be-confirmed">Phone number to be confirmed</span>
              )}
            </li>
            <li>
              {boutique.email ? (
                <a href={`mailto:${boutique.email}`}>{boutique.email}</a>
              ) : (
                <span className="to-be-confirmed">Email to be confirmed</span>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="shell footer__bottom">
        <span>© {new Date().getFullYear()} ANAHITA Fine Chocolates. All rights reserved.</span>
        <div className="footer__legal">
          <Link to="/shipping-and-returns">Shipping & returns</Link>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms & conditions</Link>
        </div>
      </div>
    </footer>
  );
}
