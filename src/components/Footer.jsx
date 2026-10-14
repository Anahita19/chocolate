import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import Newsletter from './Newsletter.jsx';
import { site } from '../data/site.js';
import { persianYear } from '../lib/format.js';
import { InstagramIcon, TelegramIcon, WhatsAppIcon } from './Icons.jsx';

const shopLinks = [
  { label: 'همهی شکلاتها', to: '/chocolates' },
  { label: 'پرالین و ترافل', to: '/chocolates?category=pralines' },
  { label: 'تختهشکلاتهای امضا', to: '/chocolates?category=bars' },
  { label: 'هدیههای شخصیسازیشده', to: '/personalise' },
];

const giftLinks = [
  { label: 'جعبههای هدیه', to: '/gift-boxes' },
  { label: 'مجموعهها', to: '/collections' },
  { label: 'سازمانی و رویدادها', to: '/#corporate' },
  { label: 'آتلیهی هدیه', to: '/personalise' },
];

const houseLinks = [
  { label: 'داستان ما', to: '/our-story' },
  { label: 'بوتیک', to: '/boutique' },
  { label: 'تماس', to: '/contact' },
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
            پرالین، ترافل و جعبههای هدیهی شکلات، دستساز و بستهبندیشده در بوتیک ما.
          </p>
          <div className="social-row">
            {socials.map(({ url, label, Icon }) =>
              url ? (
                <a key={label} href={url} target="_blank" rel="noreferrer noopener" aria-label={label}>
                  <Icon />
                </a>
              ) : (
                <span key={label} title={`لینک ${label} بهزودی اضافه میشود`} aria-label={`${label} — لینک بهزودی اضافه میشود`}>
                  <Icon />
                </span>
              ),
            )}
          </div>
        </div>

        <div>
          <h3 className="footer__heading">خرید</h3>
          <ul className="footer__links">
            {shopLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer__heading">هدیه و خانهی آناهیتا</h3>
          <ul className="footer__links">
            {[...giftLinks, ...houseLinks].map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer__heading">بوتیک</h3>
          <ul className="footer__links">
            {boutique.addressLines.length > 0 ? (
              boutique.addressLines.map((line) => <li key={line}>{line}</li>)
            ) : (
              <li>
                <span className="to-be-confirmed">نشانی بهزودی اعلام میشود</span>
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
                <span className="to-be-confirmed">ساعات کاری بهزودی اعلام میشود</span>
              </li>
            )}
            <li>
              {boutique.phone ? (
                <a href={`tel:${boutique.phone.replace(/\s+/g, '')}`}>{boutique.phone}</a>
              ) : (
                <span className="to-be-confirmed">شمارهی تماس بهزودی اعلام میشود</span>
              )}
            </li>
            <li>
              {boutique.email ? (
                <a href={`mailto:${boutique.email}`}>{boutique.email}</a>
              ) : (
                <span className="to-be-confirmed">ایمیل بهزودی اعلام میشود</span>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="shell footer__bottom">
        <span>© {persianYear()} بوتیک شکلات آناهیتا. همهی حقوق محفوظ است.</span>
        <div className="footer__legal">
          <Link to="/shipping-and-returns">ارسال و بازگشت</Link>
          <Link to="/privacy">حریم خصوصی</Link>
          <Link to="/terms">شرایط و قوانین</Link>
        </div>
      </div>
    </footer>
  );
}
