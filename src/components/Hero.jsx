import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Emblem } from './Logo.jsx';
import { site } from '../data/site.js';

/* ---------------------------------------------------------------------------
   The entrance — the boutique walk-in, driven by the visitor's scroll.

   `.chero` is `--chero-scroll` (300vh) tall and `.chero__sticky` pins one
   viewport of the film inside it, so the first two thirds of that height walk
   the timeline from the first frame to the last and the sticky viewport releases
   exactly as the final frame lands, straight into the next section.

   The clip never plays, never loops and never autoplays: a passive scroll
   listener records the target progress in a ref and a single
   requestAnimationFrame loop eases `video.currentTime` toward it. Nothing
   renders on scroll, and a seek is only issued once the previous one has landed,
   so the browser is never asked to thrash.

   Reduced motion gets the still boutique photograph, one viewport tall; so does
   anyone whose video fails or never becomes ready. The photograph also stays
   underneath the film while it loads, so the hero is never a black rectangle.
   The master itself (480×864, 24 fps) is served untouched from `public/videos/`.
   --------------------------------------------------------------------------- */

const VIDEO_SRC = '/videos/anahita-hero.mp4';
const POSTER_SRC = '/images/boutique-interior.jpg';

const FRAME = 1 / 24; // the master runs at 24 fps
const SETTLE = 0.0004; // progress: close enough to stop chasing
const EPSILON = FRAME / 2; // time: half a frame is not worth a seek
const FOLLOW = 0.3; // share of the remaining gap closed per displayed frame
const SEEK_WATCHDOG = 400; // ms: seek regardless if a seek never reports back
const TEXT_FADE = 0.34; // by here the wordmark and the controls are gone
const VEIL_FLOOR = 0.42; // how much of the scrim survives the copy
const READY_TIMEOUT = 15000; // ms before we give up on the film and fall back
const REDUCED = '(prefers-reduced-motion: reduce)';

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(REDUCED).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(REDUCED);
    const sync = (event) => setReduced(event.matches);
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return reduced;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const filmRef = useRef(null);
  const veilRef = useRef(null);
  const overlayRef = useRef(null);
  const progressRef = useRef(0); // the target, written by the scroll listener
  const shownRef = useRef(0); // the eased progress, written by the frame loop
  const durationRef = useRef(0);

  const [status, setStatus] = useState('loading'); // loading | ready | failed
  const [timedOut, setTimedOut] = useState(false);
  const reduced = useReducedMotion();

  const cinematic = !reduced && !timedOut && status !== 'failed';

  // A film that never becomes ready falls back to the photograph rather than
  // leaving a long dead scroll in front of the visitor.
  useEffect(() => {
    if (!cinematic || status !== 'loading') return undefined;
    const timer = setTimeout(() => setTimedOut(true), READY_TIMEOUT);
    return () => clearTimeout(timer);
  }, [cinematic, status]);

  // Scroll position → film timeline. Everything here happens outside React.
  useEffect(() => {
    if (!cinematic) return undefined;

    const section = sectionRef.current;
    const stage = stageRef.current;
    const video = filmRef.current;
    if (!section || !stage || !video) return undefined;

    const overlay = overlayRef.current;
    const veil = veilRef.current;
    let raf = 0;
    let lastSeek = 0;
    let lastFade = 1;
    let top = 0;
    let travel = 1;

    const read = () => {
      const raw = (window.scrollY - top) / travel;
      progressRef.current = raw <= 0 ? 0 : raw >= 1 ? 1 : raw;
    };

    const measure = () => {
      const rect = section.getBoundingClientRect();
      top = rect.top + window.scrollY;
      // Matches the browser's own sticky release point: the section bottom
      // meeting the pinned stage's bottom.
      travel = Math.max(1, rect.height - stage.offsetHeight);
      read();
    };

    const draw = (now) => {
      raf = requestAnimationFrame(draw);

      const target = progressRef.current;
      let shown = shownRef.current;
      const gap = target - shown;
      shown = Math.abs(gap) < SETTLE ? target : shown + gap * FOLLOW;
      shownRef.current = shown;

      const fade = shown >= TEXT_FADE ? 0 : 1 - shown / TEXT_FADE;
      // Eased in between, but written exactly at both ends, so the copy is
      // fully back when the visitor returns to the top of the page.
      const ends = fade === 0 || fade === 1;
      if (ends ? fade !== lastFade : Math.abs(fade - lastFade) > 0.005) {
        lastFade = fade;
        if (overlay) {
          overlay.style.opacity = fade.toFixed(3);
          overlay.style.transform = `translate3d(0, ${(-3 * (1 - fade)).toFixed(2)}rem, 0)`;
          overlay.style.visibility = fade === 0 ? 'hidden' : '';
          overlay.setAttribute('aria-hidden', fade === 0 ? 'true' : 'false');
        }
        // The scrim eases off with the copy, so the chocolates are never veiled.
        if (veil) veil.style.opacity = (VEIL_FLOOR + (1 - VEIL_FLOOR) * fade).toFixed(3);
      }

      const duration = durationRef.current;
      if (duration <= 0 || video.readyState < 2) return;

      const time = Math.min(shown * duration, duration - 0.001);
      const stuckSeek = video.seeking && now - lastSeek > SEEK_WATCHDOG;
      if (Math.abs(time - video.currentTime) > EPSILON && (!video.seeking || stuckSeek)) {
        lastSeek = now;
        video.currentTime = time;
      }
    };

    measure();
    raf = requestAnimationFrame(draw);
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
    };
  }, [cinematic]);

  const handleMetadata = () => {
    const duration = filmRef.current?.duration;
    if (Number.isFinite(duration) && duration > 0) durationRef.current = duration;
  };

  const handleReady = () => {
    const video = filmRef.current;
    setStatus('ready');
    // A paused film that has never played keeps painting nothing in some
    // browsers; one nudge to the very start paints the first frame.
    if (video && video.currentTime === 0) video.currentTime = FRAME / 4;
  };

  return (
    <section className={`chero${cinematic ? ' chero--film' : ''}`} ref={sectionRef}>
      <div className="chero__sticky" ref={stageRef}>
        <img
          className="chero__poster"
          src={POSTER_SRC}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          decoding="async"
        />

        {cinematic && (
          <video
            ref={filmRef}
            className="chero__film"
            data-state={status}
            src={VIDEO_SRC}
            preload="auto"
            muted
            playsInline
            disablePictureInPicture
            tabIndex={-1}
            aria-hidden="true"
            onLoadedMetadata={handleMetadata}
            onLoadedData={handleReady}
            onError={() => setStatus('failed')}
          />
        )}

        <span className="chero__scrim" ref={veilRef} aria-hidden="true" />

        {cinematic && status === 'loading' && (
          <div className="chero__loading" role="status">
            <span className="chero__loading-bar" aria-hidden="true" />
            <span className="chero__loading-label">در حال آماده‌سازی بوتیک</span>
          </div>
        )}

        <div className="chero__content" ref={overlayRef}>
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
