import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import { site } from '../data/site.js';
import { giftBoxes, products } from '../data/products.js';
import { useCart } from '../lib/cart.jsx';
import { formatToman } from '../lib/format.js';
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
        meta: `Gift box · ${formatToman(g.price)}`,
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

          <nav className="site-header__nav" aria-label="Primary">
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
              aria-label="Search chocolates"
            >
              <SearchIcon />
            </button>
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setAccountOpen((open) => !open)}
                aria-label="Customer account"
                aria-expanded={accountOpen}
              >
                <UserIcon />
              </button>
            </div>
            <button type="button" className="icon-btn" onClick={openCart} aria-label={`Shopping bag, ${count} items`}>
              <BagIcon />
              {count > 0 && <span className="icon-btn__count">{count}</span>}
            </button>
            <button
              type="button"
              className="icon-btn site-header__menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {accountOpen && (
          <div className="account-popover" role="dialog" aria-label="Customer account">
            <span className="eyebrow">Account</span>
            <p>
              Customer accounts are not open yet. Place an order as a guest and keep your reference
              number, or speak to the boutique directly.
            </p>
            <Link to="/contact" className="link-arrow" onClick={() => setAccountOpen(false)}>
              Contact the boutique
            </Link>
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Menu">
          <div className="mobile-menu__head">
            <Logo asLink={false} />
            <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </button>
          </div>
          <nav className="mobile-menu__links" aria-label="Mobile">
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
              Personalise a gift
            </Link>
            <button type="button" className="btn" onClick={() => { setMenuOpen(false); setSearchOpen(true); }}>
              Search chocolates
            </button>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-label="Search">
          <div className="search-overlay__form">
            <form onSubmit={submitSearch} style={{ display: 'contents' }}>
              <label className="visually-hidden" htmlFor="site-search">
                Search chocolates and gift boxes
              </label>
              <input
                id="site-search"
                ref={searchInput}
                className="search-overlay__input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pralines, truffles, gift boxes…"
              />
              <button type="submit" className="btn btn--sm">
                Search
              </button>
            </form>
            <button type="button" className="icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <CloseIcon />
            </button>
          </div>

          {query.trim() && (
            <div className="search-overlay__results">
              {results.length === 0 && (
                <p className="lede">
                  Nothing matches “{query.trim()}”. Try “pistachio”, “truffle” or “gift box”.
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
