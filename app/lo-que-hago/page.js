'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dock from '../components/Dock';
import { WorkSection, Trayectoria } from '../components/Work';
import useLang from '../components/useLang';

// "Lo que hago": la antigua "Una mirada al trabajo".
// Arriba a la derecha, el botón que abre la trayectoria completa (/lo-que-hago#trayectoria).

const T = {
  es: { title: 'Lo que hago', cv: 'Trayectoria', cvBtn: 'Trayectoria completa', home: '← Inicio' },
  en: { title: 'What I do', cv: 'Career', cvBtn: 'Full career', home: '← Home' },
};

export default function LoQueHagoPage() {
  const [lang, setLang] = useLang();
  const [cv, setCv] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const read = () => setCv(window.location.hash === '#trayectoria');
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  const show = (on) => {
    setCv(on);
    window.history.replaceState({}, '', on ? '#trayectoria' : window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const t = T[lang];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full page">
        <header className="page-head">
          <Link href="/" className="ilink">Alejandro Marcos</Link>
          <Link href="/" className="ilink">{t.home}</Link>
        </header>

        <div className="page-title-row rise">
          <h1 className="t-title">{cv ? t.cv : t.title}.</h1>
          <button type="button" className="home-cvbtn" aria-pressed={cv} onClick={() => show(!cv)}>
            {cv ? `← ${t.title}` : t.cvBtn}
          </button>
        </div>

        <div key={`${cv ? 'cv' : 'work'}-${lang}`} className="route-in">
          {cv ? <Trayectoria lang={lang} /> : <WorkSection lang={lang} onCv={() => show(true)} />}
        </div>
      </main>

      <Dock lang={lang} setLang={setLang} active="work" />
    </div>
  );
}
