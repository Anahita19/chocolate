import { useEffect, useRef, useState } from 'react';

/* Fades a section in as it enters the viewport. Falls back to visible
   immediately when IntersectionObserver is unavailable or the visitor asks for
   reduced motion. */
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', style }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ ...(delay ? { transitionDelay: `${delay}ms` } : null), ...style }}
    >
      {children}
    </Tag>
  );
}
