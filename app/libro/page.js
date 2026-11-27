'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dock from '../components/Dock';
import { THREADS } from '../data/threads';

// Mi libro: Internet Surfer. Antes vivía dentro de la portada (/#ideas/libro);
// el contenido es el mismo, ahora en su propia página.

const BULLETS = {
  es: [
    'Cómo construir comunidades que sobreviven al algoritmo',
    'Narrativa, posicionamiento y zeitgeist',
    'Los 10 mandamientos para construir marca y comunidad',
    'Casos reales de Team Heretics y proyectos en los que he trabajado',
  ],
  en: [
    'How to build communities that outlive the algorithm',
    'Narrative, positioning and zeitgeist',
    'The 10 commandments for building brand and community',
    'Real cases from Team Heretics and projects I have worked on',
  ],
};

export default function LibroPage() {
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const bl = (typeof navigator !== 'undefined' && navigator.language) || 'es';
    setLang(bl.toLowerCase().startsWith('es') ? 'es' : 'en');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const c = THREADS.libro[lang];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full page">
        <header className="page-head">
          <Link href="/" className="ilink">Alejandro Marcos</Link>
          <Link href="/" className="ilink">{lang === 'es' ? '← Inicio' : '← Home'}</Link>
        </header>
        <h1 className="t-title rise mt-10" style={{ animationDelay: '100ms', color: 'var(--ink)' }}>{c.title}.</h1>

        <div className="media rise" style={{ aspectRatio: '4 / 3', margin: '24px 0 16px', animationDelay: '160ms' }}>
          <img src="/assets/hilos/internet-surfer-cover-43.jpg" alt="Internet Surfer" width="1200" height="900" />
        </div>

        <div className="flow rise" style={{ animationDelay: '220ms' }}>
          {c.body.map((parts, i) => (
            <p key={i}>{parts.map((p) => (typeof p === 'string' ? p : p.label || p.b)).join('')}</p>
          ))}
          <ol className="t-small" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 4 }}>
            {BULLETS[lang].map((b, i) => (
              <li key={i} className="muted" style={{ display: 'flex', gap: 12 }}>
                <span className="faint tnum meta">{String(i + 1).padStart(2, '0')}</span>{b}
              </li>
            ))}
          </ol>
          <p>
            {lang === 'es' ? 'Y si te quedas con ganas, ' : 'If you want more, '}
            <Link href="/biblioteca" className="ilink">{lang === 'es' ? 'mi biblioteca' : 'my library'}</Link>.
          </p>
        </div>
      </main>

      <Dock lang={lang} setLang={setLang} active="book" />
    </div>
  );
}
