'use client';

import Link from 'next/link';

// Floating bottom navigation shared by every page.
// On the home SPA pass `onNavigate` so routes switch without a reload;
// on standalone pages it falls back to plain links (/?go=...).

export const DOCK_LABELS = {
  es: { home: 'Inicio', cv: 'Trayectoria', book: 'Mi libro: Internet Surfer', bookShort: 'Mi libro', blog: 'Blog', library: 'Biblioteca', contact: 'Hablemos' },
  en: { home: 'Home', cv: 'Career', book: 'My book: Internet Surfer', bookShort: 'My book', blog: 'Blog', library: 'Library', contact: "Let's talk" },
};

const ITEMS = [
  { id: 'home', href: '/', hideSm: true },
  { id: 'book', href: '/#ideas/libro' },
  { id: 'blog', href: '/?go=blog', hideSm: true },
  { id: 'library', href: '/biblioteca' },
  { id: 'cv', href: '/?go=cv' },
];

export default function Dock({ lang = 'es', setLang, active, onNavigate }) {
  const L = DOCK_LABELS[lang] || DOCK_LABELS.es;

  const item = ({ id, href, hideSm }) => {
    const cls = `dock-item ${active === id ? 'is-active' : ''} ${hideSm ? 'dock-hide-sm' : ''}`;
    const text =
      id === 'book' ? (
        <>
          <span className="dock-long">{L.book}</span>
          <span className="dock-short">{L.bookShort}</span>
        </>
      ) : (
        L[id]
      );
    const internal = onNavigate && id !== 'library';
    if (internal) {
      return (
        <button key={id} type="button" className={cls} aria-current={active === id ? 'page' : undefined} onClick={() => onNavigate(id)}>
          {text}
        </button>
      );
    }
    return (
      <Link key={id} href={href} className={cls} aria-current={active === id ? 'page' : undefined}>
        {text}
      </Link>
    );
  };

  const ctaCls = `dock-cta ${active === 'contact' ? 'is-active' : ''}`;

  return (
    <>
      <div className="dock-fade" aria-hidden="true" />
      <nav className="dock" aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}>
        <div className="dock-group">
          {ITEMS.map(item)}
          {setLang && (
            <button
              type="button"
              className="dock-item dock-lang"
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          )}
        </div>
        {onNavigate ? (
          <button type="button" className={ctaCls} onClick={() => onNavigate('contact')}>
            <Spark small /> {L.contact}
          </button>
        ) : (
          <Link href="/?go=contact" className={ctaCls}>
            <Spark small /> {L.contact}
          </Link>
        )}
      </nav>
    </>
  );
}

// Eight-point asterisk — the site's mark. Echoes the old "*" in the hero.
export function Spark({ small = false, className = '' }) {
  return (
    <svg
      className={`${small ? '' : 'spark'} ${className}`}
      width={small ? 11 : 28}
      height={small ? 11 : 28}
      viewBox="0 0 32 32"
      aria-hidden="true"
      style={small ? { display: 'inline-block', flexShrink: 0 } : undefined}
    >
      <g fill="currentColor">
        {[0, 45, 90, 135].map((r) => (
          <rect key={r} x="13.5" y="1" width="5" height="30" rx="2.5" transform={`rotate(${r} 16 16)`} />
        ))}
      </g>
    </svg>
  );
}
