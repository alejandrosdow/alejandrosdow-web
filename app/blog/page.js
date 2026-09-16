'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dock from '../components/Dock';

const T = {
  es: {
    nav: { home: 'Home', cv: 'Trayectoria', blog: 'Blog', library: 'Biblioteca', contact: 'Contacto' },
    kicker: '/blog — pensamientos sueltos',
    title: 'Blog.',
    lead: 'Notas, ensayos cortos y observaciones sobre marca, comunidad e internet. Sincronizado con mi Substack.',
    loading: 'Cargando desde Substack',
    readMin: 'min lectura',
    readMore: 'Leer en Substack',
    emptyTitle: 'Todavía sin publicar.',
    emptyDesc: 'El blog vive en mi Substack y se sincroniza automáticamente con esta página. Cuando publique el primer artículo, aparecerá aquí.',
    emptyFollow: 'Seguirme en Substack',
    errorDesc: 'No he podido cargar el feed del Substack ahora mismo. Mientras tanto, puedes leerlo directamente allí.',
    errorOpen: 'Abrir en Substack',
    subLabel: 'Suscríbete',
    subTitle: 'Si te interesa, suscríbete.',
    subDesc: 'Sin spam, sin secuencias, sin venta agresiva. Solo cuando tengo algo que decir.',
    subBtn: 'Suscribirse en Substack',
  },
  en: {
    nav: { home: 'Home', cv: 'Career', blog: 'Blog', library: 'Library', contact: 'Contact' },
    kicker: '/blog — loose thoughts',
    title: 'Blog.',
    lead: 'Notes, short essays and observations on brand, community and the internet. Synced with my Substack.',
    loading: 'Loading from Substack',
    readMin: 'min read',
    readMore: 'Read on Substack',
    emptyTitle: 'Nothing published yet.',
    emptyDesc: 'The blog lives on my Substack and syncs automatically with this page. When the first article is published, it will appear here.',
    emptyFollow: 'Follow me on Substack',
    errorDesc: "Couldn't load the Substack feed right now. In the meantime, you can read it there directly.",
    errorOpen: 'Open on Substack',
    subLabel: 'Subscribe',
    subTitle: 'If you like it, subscribe.',
    subDesc: 'No spam, no sequences, no aggressive selling. Only when I have something to say.',
    subBtn: 'Subscribe on Substack',
  },
};

const SUBSTACK = 'https://substack.com/@alejandrosdow';

export default function BlogPage() {
  const [lang, setLang] = useState('es');
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | empty | error

  useEffect(() => {
    const bl = (typeof navigator !== 'undefined' && navigator.language) || 'es';
    setLang(bl.toLowerCase().startsWith('es') ? 'es' : 'en');
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/substack')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error || !Array.isArray(data.items)) { setStatus('error'); return; }
        if (data.items.length === 0) { setStatus('empty'); return; }
        setPosts(data.items);
        setStatus('ready');
      })
      .catch(() => { if (!cancelled) setStatus('error'); });
    return () => { cancelled = true; };
  }, []);

  const t = T[lang];

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 w-full page">
        <header className="page-head">
          <Link href="/" className="ilink">Alejandro Marcos</Link>
          <Link href="/" className="ilink">{lang === 'es' ? '← Inicio' : '← Home'}</Link>
        </header>
        <h1 className="t-title rise mt-10" style={{ animationDelay: '100ms', color: 'var(--ink)' }}>{t.title}</h1>
        <p className="serif-i text-[16px] leading-6 mt-4 mb-20 max-w-3xl rise" style={{ animationDelay: '200ms', color: 'var(--ink-50)' }}>
          {t.lead}
        </p>

        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            {status === 'loading' && (
              <div className="text-[12px] leading-[18px] py-16 text-center" style={{ color: 'var(--ink-35)' }}>
                {t.loading}…
              </div>
            )}

            {status === 'empty' && (
              <div className="card p-8">
                <h3 className="serif-i text-[18px] mb-3" style={{ color: 'var(--ink)' }}>{t.emptyTitle}</h3>
                <p className="text-[16px] leading-relaxed mb-6" style={{ color: 'var(--ink-70)' }}>{t.emptyDesc}</p>
                <a href={SUBSTACK} target="_blank" rel="noreferrer" className="pill">{t.emptyFollow} <span aria-hidden>→</span></a>
              </div>
            )}

            {status === 'error' && (
              <div className="card p-8">
                <p className="text-[16px] leading-relaxed mb-6" style={{ color: 'var(--ink-70)' }}>{t.errorDesc}</p>
                <a href={SUBSTACK} target="_blank" rel="noreferrer" className="pill">{t.errorOpen} <span aria-hidden>→</span></a>
              </div>
            )}

            {status === 'ready' && posts.map((p, i) => (
              <article key={i} className="py-8 hairline-b group">
                <div className="flex items-center gap-3 text-[12px] leading-[18px] mb-4 flex-wrap" style={{ color: 'var(--ink-35)' }}>
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.read} {t.readMin}</span>
                  {p.tag && (
                    <>
                      <span>·</span>
                      <span className="px-2 py-0.5 rounded-full" style={{ border: '1px solid var(--hairline)', color: 'var(--ink-50)' }}>{p.tag}</span>
                    </>
                  )}
                </div>
                <a href={p.link} target="_blank" rel="noreferrer" className="block">
                  <h2 className="serif-i text-[18px] leading-tight mb-3 transition-opacity group-hover:opacity-70" style={{ color: 'var(--ink)' }}>
                    {p.title}
                  </h2>
                </a>
                <p className="text-[16px] leading-relaxed mb-4 max-w-2xl" style={{ color: 'var(--ink-70)' }}>{p.excerpt}…</p>
                <a href={p.link} target="_blank" rel="noreferrer" className="text-[12px] leading-[18px] link-u" style={{ color: 'var(--ink-50)' }}>{t.readMore} →</a>
              </article>
            ))}
          </div>

          <aside className="md:col-span-4">
            <div className="rounded-[2px] p-8 sticky top-24" style={{ background: 'var(--dark)' }}>
              <div className="microlabel mb-5" style={{ color: 'var(--dark-muted)' }}>{t.subLabel}</div>
              <h3 className="serif-i text-[18px] mb-4" style={{ color: 'var(--dark-text)' }}>{t.subTitle}</h3>
              <p className="text-[14px] leading-relaxed mb-7" style={{ color: 'var(--dark-muted)' }}>{t.subDesc}</p>
              <a href={SUBSTACK} target="_blank" rel="noreferrer" className="pill-invert w-full justify-center">
                {t.subBtn}
              </a>
            </div>
          </aside>
        </div>
      </main>

      <Dock lang={lang} setLang={setLang} active={"blog"} />
    </div>
  );
}
