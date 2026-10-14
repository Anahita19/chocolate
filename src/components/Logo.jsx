import { Link } from 'react-router-dom';

/* The ANAHITA wordmark: a botanical emblem of three petals over the lettering,
   with the FINE CHOCOLATES descriptor between two hairlines — as it appears on
   the boutique's marble wall. */
export function Emblem({ className = 'brand__emblem' }) {
  return (
    <svg className={className} viewBox="0 0 40 24" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M20 3.5c4 4.6 6 8.5 6 12.2S23.6 21 20 21" />
        <path d="M20 21c-3.6-1.4-6-4.1-7-7.8S12.4 6 15 3.8" />
        <path d="M20 21c3.6-1.4 6-4.1 7-7.8S27.6 6 25 3.8" />
      </g>
      <circle cx="20" cy="22.4" r="1.3" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ size = 'md', variant = 'gold', to = '/', asLink = true }) {
  const classes = ['brand'];
  if (size === 'lg') classes.push('brand--lg');
  if (variant === 'ink') classes.push('brand--ink');

  const inner = (
    <span className={classes.join(' ')}>
      <Emblem />
      <span className="brand__word">ANAHITA</span>
      <span className="brand__descriptor">Fine Chocolates</span>
    </span>
  );

  if (!asLink) return inner;

  return (
    <Link to={to} aria-label="آناهیتا، شکلات دستساز — صفحهی اصلی">
      {inner}
    </Link>
  );
}
