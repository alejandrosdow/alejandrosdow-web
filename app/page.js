'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Spark } from './components/Dock';
import { THREADS } from './data/threads';

// =============================================
// alejandrosdow.com — v2.0 portada
// una columna centrada · titular con palabra que rota · píldora con tres secciones
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
    principles: [
      ['Dar sin esperar nada a cambio.', 'Es el principio universal para construir mi vida y relaciones de verdad.'],
      ['Ver el mundo siempre desde el optimismo,', 'no concibo otra forma de verlo.'],
      ['Familia y amistades,', 'siempre son prioridad.'],
      ['Quiero comerme el mundo.', 'Y repetir.'],
      ['El miedo se quita haciéndolo.'],
      ['Sé admirable,', 'eres tu mejor ejemplo al mundo.'],
      ['La curiosidad mueve el mundo.'],
      ['Si haces cosas, pasan cosas.'],
    ],
    now: [
      ['Team Heretics', 'Chief Brand Officer · 2018–'],
      ['GenLayer', 'Brand Advisor · 2025–'],
      ['Freelance', 'Creadores y empresas · 2018–'],
    ],
    cvBtn: 'Trayectoria completa',
    cv: [
      ['Team Heretics', 'Chief Brand Officer', '2018–'],
      ['GenLayer', 'Brand Advisor', '2025–'],
      ['JULIO', 'Co-fundador', '2025'],
      ['Club113 × 113 Sessions', 'Co-creador', '2022–23'],
      ['Producto Team Heretics', '', '2021–'],
      ['HereticsHUB', '', '2021'],
      ['Zhander × Algodón', 'Co-fundador', '2020–23'],
      ['Cooler Master', 'Brand Manager Iberia', '2017–19'],
      ['Movistar', 'Productor y presentador', '2017'],
      ['GAME', 'Head of Publishers, Talents & Esports', '2015–16'],
      ['XYON Agency', 'Co-fundador', '2015–16'],
      ['SocialNAT', 'Marketing Manager', '2013–15'],
      ['Machinima / Pain Gaming', 'Creador y jugador profesional', '2008–13'],
    ],
    library: 'Una pequeña biblioteca.',
    enter: 'Entrar',
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
    principles: [
      ['Give without expecting anything in return.', 'It is the universal principle for building my life and real relationships.'],
      ['Always see the world through optimism,', 'I can’t conceive of any other way to see it.'],
      ['Family and friends,', 'always the priority.'],
      ['I want to take on the world.', 'And then do it again.'],
      ['Fear goes away by doing it.'],
      ['Be admirable,', 'you are your best example to the world.'],
      ['Curiosity moves the world.'],
      ['If you do things, things happen.'],
    ],
    now: [
      ['Team Heretics', 'Chief Brand Officer · 2018–'],
      ['GenLayer', 'Brand Advisor · 2025–'],
      ['Freelance', 'Creators and companies · 2018–'],
    ],
    cvBtn: 'Full career',
    cv: [
      ['Team Heretics', 'Chief Brand Officer', '2018–'],
      ['GenLayer', 'Brand Advisor', '2025–'],
      ['JULIO', 'Co-founder', '2025'],
      ['Club113 × 113 Sessions', 'Co-creator', '2022–23'],
      ['Team Heretics Product', '', '2021–'],
      ['HereticsHUB', '', '2021'],
      ['Zhander × Algodón', 'Co-founder', '2020–23'],
      ['Cooler Master', 'Brand Manager Iberia', '2017–19'],
      ['Movistar', 'Producer and host', '2017'],
      ['GAME', 'Head of Publishers, Talents & Esports', '2015–16'],
      ['XYON Agency', 'Co-founder', '2015–16'],
      ['SocialNAT', 'Marketing Manager', '2013–15'],
      ['Machinima / Pain Gaming', 'Creator and pro player', '2008–13'],
    ],
    library: 'A small library.',
    enter: 'Enter',
    talk: 'Let’s talk',
    langLabel: 'Language',
  },
};

// sección abierta -> hilo de threads.js (y su #ideas/<slug>)
const THREAD_OF = { origen: 'origenes', heretics: 'heretics' };
const SECTION_OF = { origenes: 'origen', heretics: 'heretics' };

// Párrafos de threads.js: texto + { b } negrita + { k, label } enlace.
function Para({ parts, onCv }) {
  return parts.map((p, i) => {
    if (typeof p === 'string') return <React.Fragment key={i}>{p}</React.Fragment>;
    if (p.b) return <strong key={i}>{p.b}</strong>;
    if (p.k === 'cv') {
      return (
        <button key={i} type="button" className="home-ulink home-ulink-muted" onClick={onCv}>
          {p.label}
        </button>
      );
    }
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
  const [open, setOpen] = useState(null); // null | heretics | origen | cosmo | hago | biblio
  const [cv, setCv] = useState(false);
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
    if (go === 'cv') { setOpen('hago'); setCv(true); }
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
  const goCv = () => {
    setOpen('hago');
    setCv(true);
    window.history.replaceState({}, '', window.location.pathname);
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
            {['cosmo', 'hago', 'biblio'].map((k) => (
              <button key={k} type="button" className={`home-tab ${open === k ? 'is-active' : ''}`} aria-expanded={open === k} onClick={() => toggle(k)}>
                {u.tabs[k]}
              </button>
            ))}
          </div>
        </nav>

        {thread && (
          <Section key={`${open}-${lang}`} innerRef={sectionRef} title={`${thread.title}.`}>
            <div className="home-prose">
              {thread.body.map((parts, n) => (
                <p key={n}><Para parts={parts} onCv={goCv} /></p>
              ))}
              {open === 'origen' && thread.close && <p><Para parts={thread.close} onCv={goCv} /></p>}
            </div>
          </Section>
        )}

        {open === 'cosmo' && (
          <Section key={`cosmo-${lang}`} innerRef={sectionRef} title={`${u.tabs.cosmo}.`}>
            <ol className="home-list">
              {u.principles.map(([a, b], n) => (
                <li key={n}>{a}{b && <> <span className="muted">{b}</span></>}</li>
              ))}
            </ol>
          </Section>
        )}

        {open === 'hago' && (
          <Section key={`hago-${lang}`} innerRef={sectionRef} title={`${u.tabs.hago}.`}>
            <div className="home-now">
              {u.now.map(([a, b]) => (
                <p key={a}>{a} <span className="muted">· {b}</span></p>
              ))}
              <div style={{ marginTop: 8 }}>
                <button type="button" className="home-cvbtn" aria-expanded={cv} onClick={() => setCv(!cv)}>
                  <span>{u.cvBtn}</span>
                  <span aria-hidden="true">{cv ? '−' : '+'}</span>
                </button>
                {cv && (
                  <ul className="home-cv route-in">
                    {u.cv.map(([org, role, date]) => (
                      <li key={org}>
                        <span>{org}{role && <> <span className="muted">· {role}</span></>}</span>
                        <span className="muted tnum" style={{ whiteSpace: 'nowrap' }}>{date}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Section>
        )}

        {open === 'biblio' && (
          <Section key={`biblio-${lang}`} innerRef={sectionRef} title={`${u.tabs.biblio}.`}>
            <p className="home-prose" style={{ margin: 0 }}>
              {u.library} <Link href="/biblioteca" className="home-link">{u.enter} ↗</Link>
            </p>
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
