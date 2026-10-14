import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Emblem } from './Logo.jsx';
import { site } from '../data/site.js';

/* ---------------------------------------------------------------------------
   The cinematic entrance.

   The supplied film is never played: it stays paused for its whole life and only
   its `currentTime` is written, from the visitor's scroll position inside the
   tall `.chero` section. Scrolling down walks the camera forward, scrolling up
   walks it back, and letting go leaves the film resting on that frame.

   Deliberately outside React: the scroll handler only records the target
   position and one animation frame applies it, so scrolling never re-renders the
   tree. A frame is only re-seeked when the target has moved by more than half a
   frame, and a seek that is already in flight is simply superseded — so fast
   scrolling cannot queue work up behind the decoder.

   Reduced-motion visitors, a film that fails to load, and a decoder that refuses
   to seek all fall back to the still boutique photograph: same headline, same
   supporting text, same controls.
   --------------------------------------------------------------------------- */

const VIDEO_SRC = '/videos/anahita-hero.mp4';
const POSTER_SRC = '/images/boutique-interior.jpg';

const SCROLL_TRAVEL = 300; // vh the hero occupies; the pinning happens inside it
const HOLD = 0.12; // share of that travel spent resting on the final frame
const SEEK_EPSILON = 0.02; // s — half a frame at 24 fps

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function HeroCinematic() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);
  const target = useRef(0);
  const textHidden = useRef(false);

  const [reduced, setReduced] = useState(prefersReducedMotion);
  const [broken, setBroken] = useState(false);
  const [ready, setReady] = useState(false);

  const scrubbing = !reduced && !broken;

  /* Follow the preference so a visitor who changes it mid-session is not left
     inside the animation. */
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!scrubbing) return undefined;
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return 0;
      const value = -rect.top / (travel * (1 - HOLD));
      return value < 0 ? 0 : value > 1 ? 1 : value;
    };

    let raf = 0;

    const apply = () => {
      raf = 0;
      const progress = target.current;
      if (stickyRef.current) stickyRef.current.style.setProperty('--p', progress.toFixed(4));

      const content = contentRef.current;
      if (content) {
        /* Faded-out copy must not keep an invisible tap target over the film. */
        const hidden = progress > 0.5;
        if (hidden !== textHidden.current) {
          textHidden.current = hidden;
          content.style.pointerEvents = hidden ? 'none' : '';
        }
      }

      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const wanted = progress * duration;
      if (Math.abs(wanted - video.currentTime) > SEEK_EPSILON) video.currentTime = wanted;
      /* Keep the loop alive until the shown frame has caught up with the scroll. */
      if (video.seeking || Math.abs(wanted - video.currentTime) > SEEK_EPSILON) {
        raf = window.requestAnimationFrame(apply);
      }
    };

    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(apply);
    };

    const onScroll = () => {
      target.current = measure();
      schedule();
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    video.addEventListener('loadedmetadata', onScroll);
    video.addEventListener('loadeddata', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      video.removeEventListener('loadedmetadata', onScroll);
      video.removeEventListener('loadeddata', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [scrubbing]);

  return (
    <section
      ref={sectionRef}
      className={`chero ${scrubbing ? 'chero--cinematic' : 'chero--still'}${
        ready ? ' chero--ready' : ''
      }`}
      style={scrubbing ? { height: `${SCROLL_TRAVEL}vh` } : undefined}
    >
      <div className="chero__sticky" ref={stickyRef}>
        <img
          className="chero__poster"
          src={POSTER_SRC}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          decoding="async"
        />

        {scrubbing && (
          <video
            ref={videoRef}
            className="chero__video"
            src={VIDEO_SRC}
            preload="auto"
            muted
            playsInline
            aria-hidden="true"
            tabIndex={-1}
            onLoadedData={() => setReady(true)}
            onError={() => setBroken(true)}
          />
        )}

        <span className="chero__scrim" aria-hidden="true" />

        <div className="chero__content" ref={contentRef}>
          <div className="hero__inner">
            <Emblem className="brand__emblem" />
            <h1 className="hero__title" style={{ marginTop: '1.1rem' }}>
              Anahita
            </h1>
            <span className="hero__descriptor">Fine Chocolates</span>
            <p className="hero__tagline">“{site.tagline}”</p>
            <p className="hero__lede">{site.heroIntro}</p>
            <div className="hero__actions">
              <Link to="/chocolates" className="btn btn--gold">
                Explore our chocolates
              </Link>
              <Link to="/boutique" className="btn">
                Discover our boutique
              </Link>
            </div>
            <div className="hero__assurances">
              <span>Handmade in small batches</span>
              <span>Packed in the boutique</span>
              <span>Personalised gifts</span>
            </div>
          </div>

          {scrubbing && (
            <span className="chero__cue" aria-hidden="true">
              <span className="chero__cue-label">Scroll to explore</span>
              <span className="chero__cue-rule" />
            </span>
          )}
        </div>

        {scrubbing && (
          <div
            className={`chero__loading${ready ? ' chero__loading--done' : ''}`}
            role="status"
            aria-live="polite"
            aria-hidden={ready}
          >
            <span className="chero__loading-word">Anahita</span>
            <span className="chero__loading-rule" aria-hidden="true" />
            <span className="chero__loading-note">Preparing the film</span>
          </div>
        )}
      </div>
    </section>
  );
}
