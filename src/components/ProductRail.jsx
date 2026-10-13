import { useCallback, useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import { ChevronLeft, ChevronRight } from './Icons.jsx';

/* Horizontal product rail. Native scrolling gives touch gestures and swipe for
   free; the arrow controls and arrow keys scroll the same track. */
export default function ProductRail({ products, label = 'Chocolates' }) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 8);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 8);
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
    track.scrollBy({ left: direction * Math.max(260, track.clientWidth * 0.75), behavior: 'smooth' });
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nudge(1);
    }
    if (event.key === 'ArrowLeft') {
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
        aria-label={`${label}, scrollable list`}
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
          aria-label="Previous chocolates"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          className="rail__btn"
          onClick={() => nudge(1)}
          disabled={atEnd}
          aria-label="Next chocolates"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
