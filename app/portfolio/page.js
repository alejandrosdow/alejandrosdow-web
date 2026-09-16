'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Dock from '../components/Dock';
import { PROJECTS } from '../data/projects';

// =============================================
// /portfolio — selected work
// Para añadir visuales: suelta imágenes/vídeos en
// public/assets/portfolio/<slug>/ y me avisas.
// media: null => placeholder editorial.
// =============================================


const UI = {
  es: {
    nav: { home: 'Home', cv: 'Trayectoria', blog: 'Blog', library: 'Biblioteca', contact: 'Contacto' },
    kicker: '/portfolio — selected work',
    title: 'Portfolio.',
    lead: 'Una selección de lo construido: marca, cultura y comunidad. 2015—2026.',
    soon: 'visual en camino',
    ctaLabel: '¿Construimos algo juntos?',
    ctaBtn: 'Reservar sesión gratuita',
  },
  en: {
    nav: { home: 'Home', cv: 'Career', blog: 'Blog', library: 'Library', contact: 'Contact' },
    kicker: '/portfolio — selected work',
    title: 'Portfolio.',
    lead: 'A selection of what has been built: brand, culture and community. 2015—2026.',
    soon: 'visual coming soon',
    ctaLabel: 'Shall we build something together?',
    ctaBtn: 'Book a free session',
  },
};

const CALENDLY = 'https://calendly.com/alejandro-marcos-teamheretics/30min';

// ============ SCROLL REVEAL ============
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${vis ? 'reveal-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ============ ANIMATED METRIC COUNTER ============
function CountUp({ n, pre = '', post = '', lang }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1400;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(n * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [n]);
  const fmt = lang === 'es' ? val.toLocaleString('de-DE') : val.toLocaleString('en-US');
  return (
    <span ref={ref} className="mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
      {pre}{fmt}{post}
    </span>
  );
}

// ============ YOUTUBE EMBED (click-to-play) ============
function YTEmbed({ id, title }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="rounded-[2px] overflow-hidden relative aspect-video" style={{ border: '1px solid var(--hairline)', background: '#0b0a09' }}>
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
        />
      ) : (
        <button
          onClick={() => setPlay(true)}
          className="absolute inset-0 w-full h-full group"
          style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          aria-label={`Play — ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className="flex items-center gap-2.5 rounded-full px-6 py-3.5 transition-transform duration-300 group-hover:scale-105"
              style={{ background: 'rgba(19,18,16,0.88)', backdropFilter: 'blur(6px)' }}
            >
              <span style={{ color: 'var(--green)', fontSize: 13 }} aria-hidden>▶</span>
              <span className="text-[12px] leading-[18px]" style={{ color: 'var(--dark-text)' }}>Play</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

// ============ MEDIA BLOCK (placeholder-aware) ============
function Media({ project, aspect, t, lang }) {
  if (project.collage) {
    return (
      <div>
        <div className="grid grid-cols-2 gap-3">
          {project.collage.map((c, i) => (
            <div key={i} className={`img-clean ${c.span === 2 ? 'col-span-2' : ''}`} style={{ border: '1px solid var(--hairline)' }}>
              <img src={c.src} alt={project.title} style={{ height: 'auto' }} />
            </div>
          ))}
        </div>
        {project.collageLabel && (
          <div className="text-[12px] leading-[18px] mt-2" style={{ color: 'var(--ink-35)' }}>{project.collageLabel[lang] || ''}</div>
        )}
      </div>
    );
  }
  if (project.videos || project.media || project.video) {
    return (
      <div className="flex flex-col gap-4">
        {project.media && (
          <div>
            <div className={`img-clean ${aspect}`} style={{ border: '1px solid var(--hairline)' }}>
              <img src={project.media} alt={project.mediaLabel || project.title} />
            </div>
            {project.mediaLabel && (
              <div className="text-[12px] leading-[18px] mt-2" style={{ color: 'var(--ink-35)' }}>{project.mediaLabel}</div>
            )}
          </div>
        )}
        {project.video && <YTEmbed id={project.video} title={project.title} />}
        {(project.videos || []).map((v) => (
          <div key={v.id}>
            <YTEmbed id={v.id} title={v.label} />
            <div className="text-[12px] leading-[18px] mt-2" style={{ color: 'var(--ink-35)' }}>{v.label}</div>
          </div>
        ))}
        {project.mediaExtra && (
          <div>
            <div className="img-clean" style={{ border: '1px solid var(--hairline)' }}>
              <img src={project.mediaExtra} alt={project.mediaExtraLabel || project.title} style={{ height: 'auto' }} />
            </div>
            {project.mediaExtraLabel && (
              <div className="text-[12px] leading-[18px] mt-2" style={{ color: 'var(--ink-35)' }}>{project.mediaExtraLabel}</div>
            )}
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className={`rounded-[2px] ${aspect} relative overflow-hidden`}
      style={{
        background:
          'var(--tint-lilac)',
              }}
    >
      <div className="absolute bottom-4 left-5 text-[12px] leading-[18px]" style={{ color: 'var(--ink-35)' }}>
        [ {t.soon} ]
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [lang, setLang] = useState('es');
  const hidden = process.env.NODE_ENV === 'production'; // en pruebas: solo visible en `npm run dev`

  useEffect(() => {
    const bl = (typeof navigator !== 'undefined' && navigator.language) || 'es';
    setLang(bl.toLowerCase().startsWith('es') ? 'es' : 'en');
  }, []);

  const t = UI[lang];
  if (hidden) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 w-full page">
          <header className="page-head">
            <Link href="/" className="ilink">Alejandro Marcos</Link>
            <Link href="/" className="ilink">{lang === 'es' ? '← Inicio' : '← Home'}</Link>
          </header>
          <h1 className="t-title mt-10">{lang === 'es' ? 'En pruebas.' : 'In progress.'}</h1>
          <p className="muted mt-2">{lang === 'es' ? 'Esta sección aún no está lista.' : 'This section is not ready yet.'}</p>
        </main>
        <Dock lang={lang} setLang={setLang} />
      </div>
    );
  }
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

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

        {/* ===== FEATURED — media + texto lado a lado, alternando ===== */}
        {featured.map((p, i) => (
          <section key={p.slug} className="mb-16">
            <div className="grid gap-5 items-start">
              <div className="">
                <Reveal>
                  <Media project={p} aspect="aspect-[16/10]" t={t} lang={lang} />
                </Reveal>
              </div>
              <div className="">
                <Reveal delay={100}>
                  <div className="text-[12px] leading-[18px] mb-3 flex items-center gap-2 flex-wrap" style={{ color: 'var(--ink-35)' }}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span>·</span>
                    <span>{p.year}</span>
                    <span>·</span>
                    <span>{p.org}</span>
                  </div>
                  {p.titleImg ? (
                    <img src={p.titleImg} alt={p.title} style={{ height: p.titleImgH || 64, width: 'auto', maxWidth: '100%', ...(p.titleImgBlend ? { mixBlendMode: 'multiply' } : {}) }} />
                  ) : (
                    <h2 className="display text-[18px]" style={{ color: 'var(--ink)', letterSpacing: '-0.025em' }}>
                      {p.title}
                    </h2>
                  )}
                  <div className="serif-i text-[17px] mt-1 mb-5" style={{ color: 'var(--ink-50)' }}>{p.type[lang]}</div>
                  {p.metric ? (
                    <div className="mono text-[13px] mb-4" style={{ color: 'var(--ink)' }}>
                      <span className="text-[18px] block mb-1" style={{ letterSpacing: 0 }}>
                        <CountUp n={p.metric.n} pre={p.metric.pre} post={p.metric.post} lang={lang} />
                      </span>
                      <span className="text-[11px]" style={{ color: 'var(--ink-50)' }}>{p.metricText[lang]}</span>
                    </div>
                  ) : (
                    <div className="text-[12px] leading-[18px] mb-4" style={{ color: 'var(--ink-50)' }}>
                      {p.metricText[lang]}
                    </div>
                  )}
                  <p className="text-[16px] leading-relaxed" style={{ color: 'var(--ink-70)' }}>{p[lang]}</p>
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        {/* ===== REST — grid ===== */}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-14 md:gap-y-16 mb-8">
          {rest.map((p, i) => (
            <section key={p.slug}>
              <Reveal delay={(i % 2) * 90}>
                <Media project={p} aspect="aspect-[4/3]" t={t} />
                <div className="text-[12px] leading-[18px] mt-5 mb-2 flex items-center gap-2 flex-wrap" style={{ color: 'var(--ink-35)' }}>
                  <span>{String(featured.length + i + 1).padStart(2, '0')}</span>
                  <span>·</span>
                  <span>{p.year}</span>
                  <span>·</span>
                  <span>{p.org}</span>
                </div>
                <h2 className="display text-[18px]" style={{ color: 'var(--ink)', letterSpacing: '-0.02em' }}>{p.title}</h2>
                <div className="text-[12px] leading-[18px] mt-2 mb-3" style={{ color: 'var(--ink-50)' }}>
                  {p.metric ? (
                    <>
                      <CountUp n={p.metric.n} pre={p.metric.pre} post={p.metric.post} lang={lang} />{' '}
                      <span style={{ color: 'var(--ink-35)' }}>— {p.metricText[lang]}</span>
                    </>
                  ) : (
                    p.metricText[lang]
                  )}
                </div>
                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--ink-70)' }}>{p[lang]}</p>
              </Reveal>
            </section>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="hairline-t pt-10 mt-14">
            <p className="serif-i text-[18px] mb-8" style={{ color: 'var(--ink)' }}>{t.ctaLabel}</p>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="pill-dark">
              {t.ctaBtn} <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </main>

      <Dock lang={lang} setLang={setLang} active={undefined} />
    </div>
  );
}
