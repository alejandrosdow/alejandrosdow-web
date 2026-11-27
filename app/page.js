'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Spark } from './components/Dock';
import { THREADS } from './data/threads';

// =============================================
// alejandrosdow.com — v2.0 portada
// una columna centrada · titular con palabra que rota · píldora que lleva a tres páginas
// Los textos largos ("Dónde empezó", "Team Heretics") salen de app/data/threads.js.
// =============================================

const CALENDLY = 'https://calendly.com/alejandro-marcos-teamheretics/30min';
const ROTATE_MS = 1800;

const SOCIALS = [
  { label: 'X', href: 'https://x.com/alejandrosdow' },
  { label: 'Instagram', href: 'https://instagram.com/alejandrosdow' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/alejandromarcosmoraga' },
  { label: 'Substack', href: 'https://substack.com/@alejandrosdow' },
];

// ============ COPY ============
const UI = {
  es: {
    name: 'Alejandro Marcos',
    intro: [
      'Hacía vídeos en YouTube, ',
      { open: 'origen', label: 'me clasifiqué para el primer mundial de Call of Duty' },
      ' y ahora soy ',
      { open: 'heretics', label: 'Chief Brand Officer en Team Heretics' },
      '.',
    ],
    lead: 'Construyo',
    words: ['marca.', 'comunidad.', 'cultura.'],
    full: 'Construyo marca, comunidad y cultura.',
    tabs: { cosmo: 'Cómo pienso', hago: 'Lo que hago', biblio: 'Biblioteca' },
    talk: 'Hablemos',
    langLabel: 'Idioma',
  },
  en: {
    name: 'Alejandro Marcos',
    intro: [
      'I used to make YouTube videos, ',
      { open: 'origen', label: 'qualified for the first Call of Duty world championship' },
      ' and now I’m ',
      { open: 'heretics', label: 'Chief Brand Officer at Team Heretics' },
      '.',
    ],
    lead: 'I build',
    words: ['brand.', 'community.', 'culture.'],
    full: 'I build brand, community and culture.',
    tabs: { cosmo: 'How I think', hago: 'What I do', biblio: 'Library' },
    talk: 'Let’s talk',
    langLabel: 'Language',
  },
};

// sección abierta -> hilo de threads.js (y su #ideas/<slug>)
const TABS = [
  ['cosmo', '/como-pienso'],
  ['hago', '/lo-que-hago'],
  ['biblio', '/biblioteca'],
];
const CV_URL = '/lo-que-hago#trayectoria';

const THREAD_OF = { origen: 'origenes', heretics: 'heretics' };
const SECTION_OF = { origenes: 'origen', heretics: 'heretics' };

// Párrafos de threads.js: texto + { b } negrita + { k, label } enlace.
function Para({ parts }) {
  return parts.map((p, i) => {
    if (typeof p === 'string') return <React.Fragment key={i}>{p}</React.Fragment>;
    if (p.b) return <strong key={i}>{p.b}</strong>;
    if (p.k === 'cv') return <Link key={i} href={CV_URL} className="home-ulink home-ulink-muted">{p.label}</Link>;
    if (p.k === 'library') return <Link key={i} href="/biblioteca" className="home-ulink home-ulink-muted">{p.label}</Link>;
    if (p.k === 'blog') return <Link key={i} href="/blog" className="home-ulink home-ulink-muted">{p.label}</Link>;
    return <React.Fragment key={i}>{p.label}</React.Fragment>;
  });
}

function Section({ title, children, innerRef }) {
  return (
    <section ref={innerRef} className="home-section route-in">
      <h2 className="home-h2">{title}</h2>
      {children}
    </section>
  );
}

export default function Page() {
  const [lang, setLang] = useState('es');
  const [open, setOpen] = useState(null); // null | heretics | origen
  const [i, setI] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const bl = (typeof navigator !== 'undefined' && navigator.language) || 'es';
    setLang(bl.toLowerCase().startsWith('es') ? 'es' : 'en');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // palabra que rota
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % 3), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  // Enlaces heredados: /?go=cv|blog|contact y /#ideas/<slug>
  useEffect(() => {
    const go = new URLSearchParams(window.location.search).get('go');
    if (go === 'blog') { window.location.replace('/blog'); return; }
    if (go === 'cv') { window.location.replace(CV_URL); return; }
    if (go) window.history.replaceState({}, '', '/');

    const read = () => {
      const m = window.location.hash.match(/^#ideas\/([\w-]+)/);
      if (!m) return;
      if (m[1] === 'libro') { window.location.replace('/libro'); return; }
      if (SECTION_OF[m[1]]) setOpen(SECTION_OF[m[1]]);
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  // al abrir una sección, acercarla si queda fuera de la pantalla
  useEffect(() => {
    if (!open) return;
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight - 160) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [open]);

  const u = UI[lang];

  const toggle = (k) => {
    const next = open === k ? null : k;
    setOpen(next);
    const slug = next && THREAD_OF[next];
    window.history.replaceState({}, '', slug ? `#ideas/${slug}` : window.location.pathname);
  };
  const thread = open && THREAD_OF[open] ? THREADS[THREAD_OF[open]][lang] : null;

  return (
    <div className="home">
      <header className="home-top" aria-label={u.langLabel}>
        {['es', 'en'].map((l, n) => (
          <React.Fragment key={l}>
            {n > 0 && <span className="muted" aria-hidden="true">/</span>}
            {lang === l ? (
              <span className="home-lang is-current" aria-current="true">{l.toUpperCase()}</span>
            ) : (
              <button type="button" className="home-lang" onClick={() => setLang(l)} aria-label={l === 'en' ? 'Switch to English' : 'Cambiar a español'}>
                {l.toUpperCase()}
              </button>
            )}
          </React.Fragment>
        ))}
      </header>

      <main className="home-main">
        <p className="home-intro rise">
          <span className="home-name">{u.name}</span> ·{' '}
          {u.intro.map((p, n) =>
            typeof p === 'string' ? (
              <React.Fragment key={n}>{p}</React.Fragment>
            ) : (
              <button key={n} type="button" className="home-ulink" aria-expanded={open === p.open} onClick={() => toggle(p.open)}>
                {p.label}
              </button>
            )
          )}
        </p>

        <h1 className="home-h1 rise" style={{ animationDelay: '80ms' }} aria-label={u.full}>
          <span className="home-h1-lead" aria-hidden="true">{u.lead}</span>
          <span className="home-h1-word" aria-hidden="true">{u.words[i]}</span>
        </h1>

        <nav className="home-nav rise" style={{ animationDelay: '140ms' }}>
          <div className="home-pill">
            {TABS.map(([k, href]) => (
              <Link key={k} href={href} className="home-tab">
                {u.tabs[k]}
              </Link>
            ))}
          </div>
        </nav>

        {thread && (
          <Section key={`${open}-${lang}`} innerRef={sectionRef} title={`${thread.title}.`}>
            <div className="home-prose">
              {thread.body.map((parts, n) => (
                <p key={n}><Para parts={parts} /></p>
              ))}
              {open === 'origen' && thread.close && <p><Para parts={thread.close} /></p>}
            </div>
          </Section>
        )}

        <div className="home-foot rise" style={{ animationDelay: '200ms' }}>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="home-link home-social">{s.label}</a>
          ))}
          <a href={CALENDLY} target="_blank" rel="noreferrer" className="home-talk">
            <Spark small /> {u.talk}
          </a>
        </div>
      </main>
    </div>
  );
}
