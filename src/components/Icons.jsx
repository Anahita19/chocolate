/* Minimal line icons drawn in the boutique's brass-and-gold language. */
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export const SearchIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);

export const UserIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="8.5" r="3.6" />
    <path d="M4.8 20c1-3.6 3.8-5.4 7.2-5.4s6.2 1.8 7.2 5.4" />
  </svg>
);

export const BagIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5.5 8h13l-1 12.5h-11z" />
    <path d="M9 8V6.6a3 3 0 0 1 6 0V8" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const MenuIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </svg>
);

export const ChevronLeft = (props) => (
  <svg {...base} {...props}>
    <path d="M14.5 5.5L8 12l6.5 6.5" />
  </svg>
);

export const ChevronRight = (props) => (
  <svg {...base} {...props}>
    <path d="M9.5 5.5L16 12l-6.5 6.5" />
  </svg>
);

export const PlusIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 5.5v13M5.5 12h13" />
  </svg>
);

export const MinusIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5.5 12h13" />
  </svg>
);

export const TrashIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5 7.5h14M9.5 7.5V5.8h5v1.7M7.5 7.5l.8 11.2h7.4l.8-11.2" />
  </svg>
);

export const ArrowRight = (props) => (
  <svg {...base} {...props}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = (props) => (
  <svg {...base} width={16} height={16} {...props}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export const InstagramIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const PhoneIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6.5 4.5h3l1.4 3.6-2 1.4a11.5 11.5 0 0 0 5.6 5.6l1.4-2 3.6 1.4v3c0 .8-.7 1.6-1.6 1.5A15.4 15.4 0 0 1 5 6.1c0-.9.7-1.6 1.5-1.6z" />
  </svg>
);

export const MailIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

export const PinIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 21s6.5-6.2 6.5-11a6.5 6.5 0 1 0-13 0C5.5 14.8 12 21 12 21z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

export const ClockIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.6V12l3 1.8" />
  </svg>
);

export const ZoomIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M11 8.6v4.8M8.6 11h4.8M16 16l4.5 4.5" />
  </svg>
);

export const WhatsAppIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M20 11.6A8 8 0 1 1 16.3 4.6" />
    <path d="M4.4 19.6l1.2-3.6A7.9 7.9 0 0 0 12 20" />
    <path d="M15.6 14.4c-.6.9-1.9 1-2.9.5a8 8 0 0 1-3.2-3c-.5-1-.4-2.2.4-2.9l.9 1.3 1-.3.5 1.3 1.3.5-.3 1z" />
  </svg>
);

export const TelegramIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M20.4 5.4L3.9 11.2c-.6.2-.6.8 0 1l4 1.3 1.5 4.4c.2.6.8.7 1.2.2l2-2.2 3.8 2.8c.5.3 1 .1 1.1-.5l2.4-12c.1-.7-.4-1-1.5-.8z" />
    <path d="M7.9 13.5l9.6-6.2-6 7" />
  </svg>
);
