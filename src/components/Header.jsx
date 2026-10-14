import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import { site } from '../data/site.js';
import { giftBoxes, products } from '../data/products.js';
import { useCart } from '../lib/cart.jsx';
import { formatToman, toPersianDigits } from '../lib/format.js';
import {
  BagIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from './Icons.jsx';

/* Pages whose top section is dark enough for a transparent header. */
const DARK_TOP_PATHS = new Set([
  '/',
  '/chocolates',
  '/gift-boxes',
  '/collections',
  '/our-story',
  '/boutique',
  '/contact',
]);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInput = useRef(null);
  const { count, openCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const overDarkTop = DARK_TOP_PATHS.has(location.pathname) && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  const overlayOpen = menuOpen || searchOpen;

  useEffect(() => {
    if (!overlayOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [overlayOpen]);

  useEffect(() => {
    if (searchOpen && searchInput.current) searchInput.current.focus();
  }, [searchOpen]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    const inProducts = products
      .filter((p) =>
        [p.name, p.short, p.category, p.flavour].join(' ').toLowerCase().includes(term),
      )
      .map((p) => ({
        key: p.id,
        name: p.name,
        meta: `${p.weight} · ${formatToman(p.price)}`,
        image: p.image,
        to: `/product/${p.slug}`,
      }));
    const inGifts = giftBoxes
      .filter((g) => [g.name, g.short, g.pieces].join(' ').toLowerCase().includes(term))
      .map((g) => ({
        key: g.id,
        name: g.name,
        meta: `جعبه هدیه · ${formatToman(g.price)}`,
        image: g.image,
        to: `/gift-boxes#${g.slug}`,
      }));
    return [...inProducts, ...inGifts].slice(0, 6);
  }, [query]);

  const submitSearch = (event) => {
    event.preventDefault();
    const term = query.trim();
    setSearchOpen(false);
    navigate(term ? `/chocolates?q=${encodeURIComponent(term)}` : '/chocolates');
  };

  return (
    <>
      <header
        className={`site-header ${overDarkTop ? '' : 'site-header--solid'}`}
        data-solid={!overDarkTop}
      >
        <div className="shell site-header__inner">
          <Logo />

          <nav className="site-header__nav" aria-label="فهرست اصلی">
            <div className="nav">
              {site.nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="site-header__actions">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="جستوجوی شکلات"
            >
              <SearchIcon />
            </button>
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setAccountOpen((open) => !open)}
                aria-label="حساب کاربری"
                aria-expanded={accountOpen}
              >
                <UserIcon />
              </button>
            </div>
            <button
              type="button"
              className="icon-btn"
              onClick={openCart}
              aria-label={`سبد خرید، ${toPersianDigits(count)} کالا`}
            >
              <BagIcon />
              {count > 0 && <span className="icon-btn__count">{toPersianDigits(count)}</span>}
            </button>
            <button
              type="button"
              className="icon-btn site-header__menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منو"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {accountOpen && (
          <div className="account-popover" role="dialog" aria-label="حساب کاربری">
            <span className="eyebrow">حساب کاربری</span>
            <p>
              حسابهای کاربری هنوز فعال نشدهاند. سفارش را بهعنوان مهمان ثبت کنید و کد پیگیری را
              نگه دارید، یا مستقیم با بوتیک در تماس باشید.
            </p>
            <Link to="/contact" className="link-arrow" onClick={() => setAccountOpen(false)}>
              تماس با بوتیک ←
            </Link>
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="منو">
          <div className="mobile-menu__head">
            <Logo asLink={false} />
            <button
              type="button"
              className="icon-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="بستن منو"
            >
              <CloseIcon />
            </button>
          </div>
          <nav className="mobile-menu__links" aria-label="منوی موبایل">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-menu__foot">
            <Link to="/personalise" className="btn btn--gold" onClick={() => setMenuOpen(false)}>
              شخصیسازی یک هدیه
            </Link>
            <button type="button" className="btn" onClick={() => { setMenuOpen(false); setSearchOpen(true); }}>
              جستوجوی شکلات
            </button>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-label="جستوجو">
          <div className="search-overlay__form">
            <form onSubmit={submitSearch} style={{ display: 'contents' }}>
              <label className="visually-hidden" htmlFor="site-search">
                جستوجو در شکلاتها و جعبههای هدیه
              </label>
              <input
                id="site-search"
                ref={searchInput}
                className="search-overlay__input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="پرالین، ترافل، جعبهی هدیه…"
              />
              <button type="submit" className="btn btn--sm">
                جستوجو
              </button>
            </form>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setSearchOpen(false)}
              aria-label="بستن جستوجو"
            >
              <CloseIcon />
            </button>
          </div>

          {query.trim() && (
            <div className="search-overlay__results">
              {results.length === 0 && (
                <p className="lede">
                  چیزی با «{query.trim()}» پیدا نشد. «پسته»، «ترافل» یا «جعبه هدیه» را امتحان کنید.
                </p>
              )}
              {results.map((result) => (
                <Link
                  key={result.key}
                  to={result.to}
                  className="search-result"
                  onClick={() => setSearchOpen(false)}
                >
                  <span className="search-result__media">
                    <img
                      src={result.image.src}
                      alt=""
                      style={{
                        objectPosition: result.image.focus,
                        transform: `scale(${result.image.zoom || 1})`,
                      }}
                    />
                  </span>
                  <span>
                    <span className="search-result__name">{result.name}</span>
                    <span className="search-result__meta" style={{ display: 'block' }}>
                      {result.meta}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
