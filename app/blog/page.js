'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const T = {
  es: {
    back: '← home',
    kicker: '▸ /blog · pensamientos sueltos',
    sticker: '★ nuevo cada semana',
    title: 'Blog.',
    lead1: 'Notas, ensayos cortos y observaciones sobre marca, comunidad e internet.',
    lead2: 'sincronizado con mi substack.',
    loading: '▸ cargando desde substack',
    readMin: 'min lectura',
    readMore: 'leer en substack →',
    emptyTitle: 'Todavía sin publicar.',
    emptyDesc: 'El blog vive en mi Substack y se sincroniza automáticamente con esta página. Cuando publique el primer artículo, aparecerá aquí.',
    emptyFollow: 'seguirme en substack →',
    errorDesc: 'No he podido cargar el feed del Substack ahora mismo. Mientras tanto, puedes leerlo directamente allí.',
    errorOpen: 'abrir en substack →',
    subKicker: '▸ subscribe',
    subTitle1: 'si te interesa,',
    subTitle2: 'suscríbete.',
    subDesc: 'sin spam, sin secuencias, sin venta agresiva. solo cuando tengo algo que decir.',
    subBtn: 'suscribirse en substack →',
    subStat: '~2,400 suscriptores',
    subGrowth: '▲ creciendo',
  },
  en: {
    back: '← home',
    kicker: '▸ /blog · loose thoughts',
    sticker: '★ new every week',
    title: 'Blog.',
    lead1: 'Notes, short essays and observations on brand, community and the internet.',
    lead2: 'synced with my substack.',
    loading: '▸ loading from substack',
    readMin: 'min read',
    readMore: 'read on substack →',
    emptyTitle: 'Nothing published yet.',
    emptyDesc: 'The blog lives on my Substack and syncs automatically with this page. When the first article is published, it will appear here.',
    emptyFollow: 'follow me on substack →',
    errorDesc: "Couldn't load the Substack feed right now. In the meantime, you can read it there directly.",
    errorOpen: 'open on substack →',
    subKicker: '▸ subscribe',
    subTitle1: 'if you like it,',
    subTitle2: 'subscribe.',
    subDesc: 'no spam, no sequences, no aggressive selling. only when i have something to say.',
    subBtn: 'subscribe on substack →',
    subStat: '~2,400 subscribers',
    subGrowth: '▲ growing',
  },
};

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
      .then(r => r.json())
      .then(data => {
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
    <div
      style={{
        background: '#ebe7d9',
        color: '#0a0a0a',
        fontFamily: "'EB Garamond', 'Times New Roman', serif",
        minHeight: '100vh',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@300;400;500;700&family=Instrument+Serif:ital@0;1&display=swap');

        * { -webkit-font-smoothing: antialiased; box-sizing: border-box; }

        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .blink { animation: blink 1s infinite; }

        @keyframes wobble { 0%,100%{transform:rotate(-0.5deg)} 50%{transform:rotate(0.5deg)} }
        .wobble { animation: wobble 4s ease-in-out infinite; transform-origin: center; }

        .mono { font-family: 'JetBrains Mono', monospace; }
        .display { font-family: 'Instrument Serif', serif; }

        .sticker {
          position: absolute;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.1em;
          padding: 4px 10px;
          background: #c5f04a; color: #0a0a0a;
          border: 1px solid #0a0a0a;
          box-shadow: 3px 3px 0 #0a0a0a;
          z-index: 10;
        }

        .underline-grow { position: relative; display: inline-block; }
        .underline-grow::after {
          content: ''; position: absolute; left: 0; bottom: -2px;
          width: 0; height: 1px; background: currentColor;
          transition: width 0.4s cubic-bezier(.7,0,.3,1);
        }
        .underline-grow:hover::after { width: 100%; }

        .card-skewed { transition: transform 0.4s cubic-bezier(.7,0,.3,1); }
        .card-skewed:hover { transform: rotate(-1.2deg) translateY(-4px) scale(1.01); }

        .post-article { border-bottom: 2px solid #0a0a0a; padding-bottom: 2rem; }
        .post-article:last-child { border-bottom: none; }
        .post-title { transition: text-decoration 0.2s; }
        .post-article:hover .post-title { text-decoration: underline; text-decoration-color: #c5f04a; text-decoration-thickness: 2px; }

        .back-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;
          color: #0a0a0a; text-decoration: none;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 0;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .back-link:hover { border-bottom-color: #0a0a0a; }

        .lang-btn {
          padding: 3px 7px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid #0a0a0a; background: transparent; color: #0a0a0a;
          cursor: pointer; transition: all 0.15s;
        }
        .lang-btn:hover { background: #0a0a0a; color: #ebe7d9; }
        .lang-btn.active { background: #0a0a0a; color: #c5f04a; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #ebe7d9; }
        ::-webkit-scrollbar-thumb { background: #0a0a0a; border-radius: 0; }
        ::-webkit-scrollbar-thumb:hover { background: #c5f04a; }
      `}</style>

      {/* ── Top bar ── */}
      <header style={{ borderBottom: '2px solid #0a0a0a', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" className="back-link">{t.back}</Link>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className={`lang-btn${lang === 'es' ? ' active' : ''}`} onClick={() => setLang('es')}>ES</button>
          <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
        </div>
      </header>

      {/* ── Main ── */}
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Header block */}
        <div style={{ position: 'relative', marginBottom: '4rem' }}>
          <div className="sticker wobble" style={{ top: 0, right: 0, transform: 'rotate(6deg)' }}>{t.sticker}</div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(10,10,10,0.55)', marginBottom: 20 }}>
            {t.kicker}
          </div>
          <h1 className="display" style={{ fontSize: 'clamp(48px, 10vw, 96px)', lineHeight: 0.85, letterSpacing: '-0.03em', marginBottom: 12 }}>
            {t.title}
          </h1>
          <p className="display" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontStyle: 'italic', color: 'rgba(10,10,10,0.6)', maxWidth: 640 }}>
            {t.lead1}<br />{t.lead2}
          </p>
        </div>

        {/* Content grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: '2rem' }}>

          {/* Posts column */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '2rem', alignItems: 'start' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {status === 'loading' && (
                <div style={{ border: '2px dashed rgba(10,10,10,0.3)', padding: '2rem', textAlign: 'center' }}>
                  <span className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(10,10,10,0.5)' }}>
                    {t.loading}<span className="blink">_</span>
                  </span>
                </div>
              )}

              {status === 'empty' && (
                <div className="card-skewed" style={{ border: '2px solid #0a0a0a', padding: '2rem', background: '#fff', transform: 'rotate(-0.5deg)' }}>
                  <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#5a8c2e', marginBottom: 12 }}>▸ status</div>
                  <h3 className="display" style={{ fontSize: 28, fontStyle: 'italic', marginBottom: 12 }}>{t.emptyTitle}</h3>
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, lineHeight: 1.5, color: 'rgba(10,10,10,0.75)', marginBottom: 16 }}>
                    {t.emptyDesc}
                  </p>
                  <a href="https://substack.com/@alejandrosdow" target="_blank" rel="noreferrer" className="mono underline-grow" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {t.emptyFollow}
                  </a>
                </div>
              )}

              {status === 'error' && (
                <div style={{ border: '2px solid #0a0a0a', padding: '2rem', background: '#fff' }}>
                  <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#5a8c2e', marginBottom: 12 }}>▸ error</div>
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, lineHeight: 1.6, color: 'rgba(10,10,10,0.75)', marginBottom: 12 }}>
                    {t.errorDesc}
                  </p>
                  <a href="https://substack.com/@alejandrosdow" target="_blank" rel="noreferrer" className="mono underline-grow" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {t.errorOpen}
                  </a>
                </div>
              )}

              {status === 'ready' && posts.map((p, i) => (
                <article key={i} className="post-article">
                  <div className="mono" style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(10,10,10,0.5)', marginBottom: 12 }}>
                    <span>{p.date}</span>
                    <span>·</span>
                    <span>{p.read} {t.readMin}</span>
                    {p.tag && (
                      <>
                        <span>·</span>
                        <span style={{ background: '#c5f04a', color: '#0a0a0a', padding: '1px 6px', border: '1px solid #0a0a0a' }}>{p.tag}</span>
                      </>
                    )}
                  </div>

                  <a href={p.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <h2 className="display post-title" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontStyle: 'italic', lineHeight: 1.15, marginBottom: 12 }}>
                      {p.title}
                    </h2>
                  </a>

                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, lineHeight: 1.5, color: 'rgba(10,10,10,0.8)', maxWidth: 640, marginBottom: 12 }}>
                    {p.excerpt}…
                  </p>

                  <a href={p.link} target="_blank" rel="noreferrer" className="mono underline-grow" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0a0a0a', textDecoration: 'none' }}>
                    {t.readMore}
                  </a>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <aside>
              <div className="card-skewed" style={{ border: '2px solid #0a0a0a', padding: '1.5rem', background: '#0a0a0a', color: '#ebe7d9', transform: 'rotate(1deg)', position: 'sticky', top: 24 }}>
                <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c5f04a', marginBottom: 12 }}>
                  {t.subKicker}
                </div>
                <h3 className="display" style={{ fontSize: 28, fontStyle: 'italic', lineHeight: 1.1, marginBottom: 12 }}>
                  {t.subTitle1}<br />{t.subTitle2}
                </h3>
                <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 14, color: 'rgba(235,231,217,0.7)', lineHeight: 1.5, marginBottom: 20 }}>
                  {t.subDesc}
                </p>
                <a
                  href="https://substack.com/@alejandrosdow"
                  target="_blank"
                  rel="noreferrer"
                  className="mono"
                  style={{ display: 'block', textAlign: 'center', padding: '12px 20px', background: '#c5f04a', color: '#0a0a0a', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', border: '2px solid #c5f04a', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#ebe7d9'}
                  onMouseLeave={e => e.currentTarget.style.background = '#c5f04a'}
                >
                  {t.subBtn}
                </a>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(235,231,217,0.2)' }}>
                  <div className="mono" style={{ fontSize: 10, color: 'rgba(235,231,217,0.5)', letterSpacing: '0.08em' }}>{t.subStat}</div>
                  <div className="mono" style={{ fontSize: 10, color: '#c5f04a', marginTop: 4, letterSpacing: '0.08em' }}>{t.subGrowth}</div>
                </div>
              </div>
            </aside>

          </div>
        </div>

      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '2px solid #0a0a0a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(10,10,10,0.45)' }}>© 2008–2026 alejandro marcos</span>
        <span className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(10,10,10,0.45)' }}>hand-coded en madrid</span>
      </footer>
    </div>
  );
}
