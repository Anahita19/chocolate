import { useCallback, useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import { ChevronLeft, ChevronRight } from './Icons.jsx';

/* Horizontal product rail. Native scrolling gives touch gestures and swipe for
   free; the arrow controls and arrow keys scroll the same track.
   The document is RTL, so scrollLeft runs negative and "forward" is leftwards. */
export default function ProductRail({ products, label = 'شکلاتها' }) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const offset = Math.abs(track.scrollLeft);
    setAtStart(offset <= 8);
    setAtEnd(offset + track.clientWidth >= track.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    sync();
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      track.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const nudge = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(260, track.clientWidth * 0.75);
    const rtl = window.getComputedStyle(track).direction === 'rtl';
    track.scrollBy({ left: (rtl ? -1 : 1) * direction * amount, behavior: 'smooth' });
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      nudge(1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nudge(-1);
    }
  };

  return (
    <div className="rail">
      <div
        className="rail__track"
        ref={trackRef}
        role="group"
        aria-label={`${label}، فهرست قابل اسکرول`}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {products.map((product) => (
          <div className="rail__item" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="rail__nav" style={{ marginTop: '1.5rem', justifyContent: 'flex-end' }}>
        <button
          type="button"
          className="rail__btn"
          onClick={() => nudge(-1)}
          disabled={atStart}
          aria-label="شکلاتهای قبلی"
        >
          <ChevronRight />
        </button>
        <button
          type="button"
          className="rail__btn"
          onClick={() => nudge(1)}
          disabled={atEnd}
          aria-label="شکلاتهای بعدی"
        >
          <ChevronLeft />
        </button>
      </div>
    </div>
  );
}
