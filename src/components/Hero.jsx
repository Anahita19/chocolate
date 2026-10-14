import { Link } from 'react-router-dom';
import { Emblem } from './Logo.jsx';
import { site } from '../data/site.js';

/* ---------------------------------------------------------------------------
   The entrance.

   One viewport of the boutique photograph with the wordmark, the tagline and the
   two controls over it. The boutique's scroll-scrubbed film was removed at their
   request, so there is nothing to load, seek or wait for: the section is exactly
   as tall as the viewport and releases straight into the next one.
   --------------------------------------------------------------------------- */

const POSTER_SRC = '/images/boutique-interior.jpg';

export default function Hero() {
  return (
    <section className="chero">
      <div className="chero__sticky">
        <img
          className="chero__poster"
          src={POSTER_SRC}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          decoding="async"
        />

        <span className="chero__scrim" aria-hidden="true" />

        <div className="chero__content">
          <div className="hero__inner">
            <Emblem className="brand__emblem" />
            <h1 className="hero__title" style={{ marginTop: '1.1rem' }}>
              آناهیتا
            </h1>
            <span className="hero__descriptor">شکلات دست‌ساز</span>
            <p className="hero__tagline">«{site.tagline}»</p>
            <p className="hero__lede">{site.heroIntro}</p>
            <div className="hero__actions">
              <Link to="/chocolates" className="btn btn--gold">
                دیدن شکلات‌ها
              </Link>
              <Link to="/boutique" className="btn">
                آشنایی با بوتیک
              </Link>
            </div>
            <div className="hero__assurances">
              <span>دست‌ساز در دسته‌های کوچک</span>
              <span>بسته‌بندی‌شده در بوتیک</span>
              <span>هدیه‌های شخصی‌سازی‌شده</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
