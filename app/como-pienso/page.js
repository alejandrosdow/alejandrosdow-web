'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dock from '../components/Dock';
import { BlogFeed } from '../components/Work';

// "Cómo pienso": los ocho principios + los artículos del blog (Substack).

const T = {
  es: {
    title: 'Cómo pienso',
    blog: 'Blog',
    home: '← Inicio',
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
  },
  en: {
    title: 'How I think',
    blog: 'Blog',
    home: '← Home',
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
  },
};

export default function ComoPiensoPage() {
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const bl = (typeof navigator !== 'undefined' && navigator.language) || 'es';
    setLang(bl.toLowerCase().startsWith('es') ? 'es' : 'en');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = T[lang];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full page">
        <header className="page-head">
          <Link href="/" className="ilink">Alejandro Marcos</Link>
          <Link href="/" className="ilink">{t.home}</Link>
        </header>

        <div className="page-title-row rise">
          <h1 className="t-title">{t.title}.</h1>
        </div>
        <ol className="home-list rise" style={{ animationDelay: '80ms' }}>
          {t.principles.map(([a, b], n) => (
            <li key={n}>{a}{b && <> <span className="muted">{b}</span></>}</li>
          ))}
        </ol>

        <section id="blog" style={{ marginTop: 96, scrollMarginTop: 72 }}>
          <h2 className="t-title rule-b" style={{ paddingBottom: 8, marginBottom: 24 }}>{t.blog}.</h2>
          <BlogFeed key={lang} lang={lang} />
        </section>
      </main>

      <Dock lang={lang} setLang={setLang} />
    </div>
  );
}
