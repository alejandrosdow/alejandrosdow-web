'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// =============================================
// /portfolio — selected work
// Para añadir visuales: suelta imágenes/vídeos en
// public/assets/portfolio/<slug>/ y me avisas.
// media: null => placeholder editorial.
// =============================================

const PROJECTS = [
  {
    slug: 'los-ninos',
    featured: true,
    year: '2021—',
    org: 'Team Heretics × Valorant',
    type: { es: 'Marca', en: 'Brand' },
    title: 'Los Niños',
    metric: { n: 94, pre: '+', post: 'M' },
    metricText: { es: 'impresiones sociales en 2025 · ventas de la skin creciendo exponencialmente cada año', en: 'social impressions in 2025 · skin sales growing exponentially every year' },
    es: 'Un concepto que no nació en un brainstorming, sino en un vlog. Lo convertimos en personalidad, emoción y causa de la comunidad de Heretics — hasta hacerse skin oficial de Valorant y la marca más relevante del ecosistema VCT: 60 piezas longform en 2025 (solo PRX hizo más en el mundo), campañas localizadas de China a Turquía y una facturación que crece exponencialmente año tras año, fundamental para el club gracias al mix de rendimiento deportivo y profundidad de marca.',
    en: "A concept that wasn't born in a brainstorm but in a vlog. We turned it into the personality, emotion and cause of the Heretics community — all the way to an official Valorant skin and the most relevant brand in the VCT ecosystem: 60 longform pieces in 2025 (only PRX made more worldwide), localized campaigns from China to Turkey, and revenue growing exponentially year after year, fundamental to the club thanks to the mix of sporting performance and brand depth.",
    media: '/assets/portfolio/los-ninos/los-ninos-palacio.jpg',
    videos: [{ id: 'awLWOPpatI8', label: 'Los jugadores reaccionan a su skin — VCT Team Capsule' }],
  },
  {
    slug: 'club113',
    featured: true,
    year: '2021—23',
    org: 'Fundador · Dirección creativa',
    type: { es: 'Marca · Música', en: 'Brand · Music' },
    title: 'Club113 + 113 Sessions',
    titleImg: '/assets/portfolio/club113/club113-mascota.png',
    titleImgH: 96,
    metric: { n: 579, pre: '+', post: 'M' },
    metricText: { es: '+579M de impresiones y 645k seguidores en 11 meses', en: '+579M impressions and 645k followers in 11 months' },
    es: 'Creé y lideré Club113 sus dos primeros años: naming, identidad y gran parte de la ejecución. Un hito cultural mainstream en España — prensa, televisión, invitados como David Bisbal o Belén Esteban y cerca de 1M€ de facturación. Con las 113 Sessions apostamos por el talento musical emergente: BarryB, Midas Alonso, LuchoRK, John Pollón. Samsung entró como primer patrocinador y acabó comprando el proyecto entero.',
    en: 'I created and led Club113 through its first two years: naming, identity and much of the execution. A mainstream cultural milestone in Spain — press, television, guests like David Bisbal and Belén Esteban, and close to €1M in revenue. With 113 Sessions we bet on emerging musical talent: BarryB, Midas Alonso, LuchoRK, John Pollón. Samsung came in as first sponsor and ended up acquiring the whole project.',
    media: null,
    videos: [
      { id: 'yw4Wjv3advA', label: 'Club113 — Capítulo 15 con el Dudu' },
      { id: 'hIEoaWvZDZE', label: '113 Sessions × BarryB' },
    ],
    mediaExtra: '/assets/portfolio/club113/club113-prensa.jpg',
    mediaExtraLabel: 'Club113 en prensa y tendencias',
  },
  {
    slug: 'mansion',
    featured: true,
    year: '2020—22',
    org: 'Team Heretics',
    type: { es: 'Contenido · Cultura', en: 'Content · Culture' },
    title: 'La Mansión de Heretics',
    metricText: { es: 'Hito cultural mainstream en España', en: 'A mainstream cultural milestone in Spain' },
    es: 'La primera gran casa de creadores de contenido en España. Durante dos años, sus habitantes formaron parte de toda la conversación mainstream de internet.',
    en: "Spain's first major content-creator house. For two years, its residents were part of the entire mainstream conversation on the internet.",
    media: null,
  },
  {
    slug: 'originals',
    featured: true,
    year: '2019—',
    org: 'Team Heretics',
    type: { es: 'Contenido', en: 'Content' },
    title: 'Heretics Originals',
    metric: { n: 40, pre: '+', post: 'M' },
    metricText: { es: '+40M de visitas entre contenido principal y satélites', en: '+40M views across main and satellite content' },
    es: 'Contenidos originales entendiendo la fórmula de YouTube antes que nadie en el mercado hispanohablante. Más de 40 millones de visitas entre el contenido principal y los satélites. Especiales como el de San Valentín: +100M de impresiones, 29,7M de audiencia sumada y cinco días seguidos en tendencias nacionales de YouTube.',
    en: 'Original content built on an understanding of the YouTube formula before anyone else in the Spanish-speaking market. Over 40 million views across main and satellite content. Specials like San Valentín: +100M impressions, a combined audience of 29.7M and five straight days on national YouTube trending.',
    titleImg: '/assets/portfolio/originals/originals-logo.png',
    titleImgH: 64,
    media: null,
    videos: [{ id: 'DUmFVeMArXY', label: 'Adivina el: Calvo / Preso / Virgen — Heretics Originals' }],
  },
  {
    slug: 'hereticsxp',
    featured: true,
    year: '2023—24',
    org: 'Team Heretics × GGTech',
    type: { es: 'Evento', en: 'Event' },
    title: 'HereticsXP',
    metric: { n: 2000, pre: '+', post: '' },
    metricText: { es: '+2.000 asistentes por edición', en: '+2,000 attendees per edition' },
    es: 'El evento anual de comunidad de Heretics: la intersección entre una keynote de Apple y una celebración de la Champions. Más de 2.000 personas por edición en 2023 y 2024.',
    en: "Heretics' annual community event: the intersection of an Apple keynote and a Champions League celebration. Over 2,000 people per edition in 2023 and 2024.",
    media: null,
  },
  {
    slug: 'heretics-adidas',
    featured: true,
    year: '2020',
    org: 'Team Heretics × adidas',
    type: { es: 'Campaña', en: 'Campaign' },
    title: 'Lo que somos',
    metricText: { es: 'Spot de campaña — equipación 2020 con adidas', en: 'Campaign film — 2020 kit with adidas' },
    es: 'Campaña creativa junto a adidas alrededor del spot «Lo que somos»: la identidad de Heretics traducida al lenguaje de una de las marcas más grandes del mundo.',
    en: 'A creative campaign with adidas around the film "Lo que somos": the Heretics identity translated into the language of one of the biggest brands in the world.',
    media: null,
    video: '438elJJb2c0',
  },
  {
    slug: 'hereticshub',
    featured: true,
    year: '2021—',
    org: 'Team Heretics',
    type: { es: 'Espacios físicos', en: 'Physical spaces' },
    title: 'HereticsHUB',
    metricText: { es: 'Dos espacios físicos en Madrid', en: 'Two physical spaces in Madrid' },
    es: 'La marca convertida en espacio físico: apertura de dos hubs en Madrid, punto de encuentro entre Team Heretics y su comunidad.',
    en: 'The brand turned into physical space: two hubs opened in Madrid as a meeting point between Team Heretics and its community.',
    media: null,
    video: 's83_1YhmnQ4',
  },
  {
    slug: 'genlayer',
    featured: false,
    year: '2025—',
    org: 'Brand Advisor',
    type: { es: 'Narrativa · Go-to-market', en: 'Narrative · Go-to-market' },
    title: 'GenLayer',
    metricText: { es: 'De producto B2B complejo a idioma tangible', en: 'From complex B2B product to a tangible language' },
    es: 'Traducir un producto B2B muy complejo a un idioma tangible y entendible para las personas: narrativa, construcción del equipo de marketing y creatividad para llevarlo al mundo.',
    en: 'Translating a highly complex B2B product into a tangible, human language: narrative, building the marketing team and creative support for the go-to-market.',
    media: null,
  },
  {
    slug: 'rally',
    featured: false,
    year: '2025—',
    org: 'Advisor',
    type: { es: 'Narrativa · Campañas', en: 'Narrative · Campaigns' },
    title: 'Rally',
    metricText: { es: 'Narrativa, equipo y campañas en clave B2C', en: 'Narrative, team and campaigns in a B2C key' },
    es: 'El mismo reto que GenLayer en clave B2C: narrativa, construcción del equipo que lidera el proyecto y creatividad de campañas.',
    en: 'The same challenge as GenLayer in a B2C key: narrative, building the team that leads the project and campaign creativity.',
    media: null,
  },
  {
    slug: 'julio',
    featured: false,
    year: '2025',
    org: 'Fundador',
    type: { es: 'Memebrand', en: 'Memebrand' },
    title: 'JULIO',
    metric: { n: 30, pre: '', post: ' min' },
    metricText: { es: 'Sold out en 30 minutos', en: 'Sold out in 30 minutes' },
    es: 'Primera memebrand hispanohablante, con filosofía mediterránea. El drop del jamón y el vinilo en colaboración con VitaminaJota: sold out en 30 minutos.',
    en: 'The first Spanish-speaking memebrand, with a Mediterranean philosophy. The jamón drop and the vinyl collab with VitaminaJota: sold out in 30 minutes.',
    media: null,
  },
  {
    slug: 'cool-kids-machine',
    featured: true,
    year: '2025',
    org: 'Proyecto propio · Concepto',
    type: { es: 'Moda · Gaming', en: 'Fashion · Gaming' },
    title: 'Cool Kids Machine',
    titleImg: '/assets/portfolio/cool-kids-machine/ckm-logo.jpg',
    titleImgH: 110,
    titleImgBlend: true,
    metricText: { es: 'La marca que nunca salió', en: 'The brand that never launched' },
    es: 'Cool Kids Machine es internet, gaming y cultura: la marca de ropa para los nacidos a partir de los 90, la generación que ve el gaming como el elemento más influyente de la cultura popular del siglo XXI. Streetwear con los códigos de ese imaginario — packaging en forma de juego de PS2 o memory card, colaboraciones soñadas con Tuenti, Konami o Blackberry. Nunca llegó a salir: quedan la narrativa, los diseños y este moodboard.',
    en: 'Cool Kids Machine is internet, gaming and culture: the clothing brand for those born from the 90s on, the generation that sees gaming as the most influential force in 21st-century pop culture. Streetwear built on the codes of that imaginary — packaging shaped like a PS2 game or a memory card, dream collabs with Tuenti, Konami or Blackberry. It never launched: the narrative, the designs and this moodboard remain.',
    media: null,
    collage: [
      { src: '/assets/portfolio/cool-kids-machine/mood-referencias.jpg', span: 2 },
      { src: '/assets/portfolio/cool-kids-machine/mood-tee-roja.jpg' },
      { src: '/assets/portfolio/cool-kids-machine/mood-hoodie.jpg' },
      { src: '/assets/portfolio/cool-kids-machine/mood-disenos.jpg', span: 2 },
      { src: '/assets/portfolio/cool-kids-machine/mood-tee-graffiti.jpg' },
      { src: '/assets/portfolio/cool-kids-machine/mood-pantone.jpg' },
    ],
    collageLabel: { es: 'Moodboard — narrativa, producto y referencias', en: 'Moodboard — narrative, product and references' },
  },
  {
    slug: 'eventos-game',
    featured: false,
    year: '2015—16',
    org: 'GAME Stores',
    type: { es: 'Eventos', en: 'Events' },
    title: 'MGX · BGW · Fun & Serious',
    metric: { n: 120, pre: '+', post: 'K' },
    metricText: { es: '+120K asistentes · con 24 años', en: '+120K attendees · at age 24' },
    es: 'Con 24 años, responsable de las actividades y contenidos principales de Madrid Gaming Experience, Barcelona Games World y Fun & Serious Bilbao.',
    en: 'At 24, in charge of the main activities and content for Madrid Gaming Experience, Barcelona Games World and Fun & Serious Bilbao.',
    media: null,
  },
  {
    slug: 'cooler-master',
    featured: false,
    year: '2016—17',
    org: 'Cooler Master',
    type: { es: 'Embajadores', en: 'Ambassadors' },
    title: 'Team CoolerMaster',
    metric: { n: 50, pre: '+', post: '%' },
    metricText: { es: 'Crecimiento anual del 50%', en: '50% annual growth' },
    es: 'El primer equipo de embajadores de marca del mercado, antes de que nadie lo hiciera: Cristinini, BlackEspanolito y UnBoxMe. Crecimiento del 50% anual.',
    en: 'The first brand-ambassador team in the market, before anyone else did it: Cristinini, BlackEspanolito and UnBoxMe. 50% annual growth.',
    media: null,
  },
  {
    slug: 'algodon-zhander',
    featured: false,
    year: '2020—23',
    org: 'Fundador · con Antídoto',
    type: { es: 'Producto · Fiesta', en: 'Product · Party' },
    title: 'Algodón × Zhander',
    metricText: { es: 'De app de ocio nocturno a concepto de fiesta', en: 'From nightlife app to party concept' },
    es: 'Creamos una plataforma para sustituir al relaciones públicas. La pandemia nos obligó a pivotar y nació Algodón, un concepto de fiesta junto al colectivo Antídoto.',
    en: 'We built a platform to replace the nightlife PR. The pandemic forced a pivot and Algodón was born: a party concept together with the Antídoto collective.',
    media: null,
  },
];

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
    <div className="rounded-[18px] overflow-hidden relative aspect-video" style={{ border: '1px solid var(--hairline)', background: '#0b0a09' }}>
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
              <span className="mono text-[11px] uppercase tracking-[0.16em]" style={{ color: 'var(--dark-text)' }}>Play</span>
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
          <div className="mono text-[10px] uppercase tracking-[0.14em] mt-2" style={{ color: 'var(--ink-35)' }}>{project.collageLabel[lang] || ''}</div>
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
              <div className="mono text-[10px] uppercase tracking-[0.14em] mt-2" style={{ color: 'var(--ink-35)' }}>{project.mediaLabel}</div>
            )}
          </div>
        )}
        {project.video && <YTEmbed id={project.video} title={project.title} />}
        {(project.videos || []).map((v) => (
          <div key={v.id}>
            <YTEmbed id={v.id} title={v.label} />
            <div className="mono text-[10px] uppercase tracking-[0.14em] mt-2" style={{ color: 'var(--ink-35)' }}>{v.label}</div>
          </div>
        ))}
        {project.mediaExtra && (
          <div>
            <div className="img-clean" style={{ border: '1px solid var(--hairline)' }}>
              <img src={project.mediaExtra} alt={project.mediaExtraLabel || project.title} style={{ height: 'auto' }} />
            </div>
            {project.mediaExtraLabel && (
              <div className="mono text-[10px] uppercase tracking-[0.14em] mt-2" style={{ color: 'var(--ink-35)' }}>{project.mediaExtraLabel}</div>
            )}
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className={`rounded-[18px] ${aspect} relative overflow-hidden`}
      style={{
        background:
          'repeating-linear-gradient(-45deg, var(--bg-soft) 0px, var(--bg-soft) 14px, rgba(22,21,19,0.025) 14px, rgba(22,21,19,0.025) 15px)',
        border: '1px solid var(--hairline)',
      }}
    >
      <div className="absolute bottom-4 left-5 mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--ink-35)' }}>
        [ {t.soon} ]
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const bl = (typeof navigator !== 'undefined' && navigator.language) || 'es';
    setLang(bl.toLowerCase().startsWith('es') ? 'es' : 'en');
  }, []);

  const t = UI[lang];
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <div className="min-h-screen flex flex-col">
      {/* nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 hairline-b"
        style={{ background: 'rgba(230,229,225,0.85)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-0 md:h-16 flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 md:gap-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-baseline gap-0.5 shrink-0" style={{ textDecoration: 'none' }}>
              <span className="display text-[16px] md:text-[17px] tracking-tight" style={{ color: 'var(--ink)' }}>alejandrosdow</span>
              <sup className="mono text-[9px]" style={{ color: 'var(--green)', filter: 'brightness(0.75)' }}>®</sup>
            </Link>
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="mono text-[11px] md:hidden"
              style={{ background: 'none', border: '1px solid var(--hairline)', borderRadius: 999, padding: '4px 9px', cursor: 'pointer', color: 'var(--ink-50)' }}
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>
          <div className="flex items-center gap-4 md:gap-7">
            <Link href="/" className="nav-link hidden md:inline">{t.nav.home}</Link>
            <Link href="/?go=cv" className="nav-link">{t.nav.cv}</Link>
            <Link href="/?go=blog" className="nav-link">{t.nav.blog}</Link>
            <Link href="/biblioteca" className="nav-link">{t.nav.library}</Link>
            <Link href="/?go=contact" className="nav-link">{t.nav.contact}</Link>
            <div className="mono text-[11px] hidden md:flex items-center gap-1.5" style={{ color: 'var(--ink-35)' }}>
              <button onClick={() => setLang('es')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: lang === 'es' ? 'var(--ink)' : 'inherit' }}>ES</button>
              <span>/</span>
              <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: lang === 'en' ? 'var(--ink)' : 'inherit' }}>EN</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full px-5 md:px-8 pb-20" style={{ paddingTop: 120 }}>
        <div className="microlabel mb-8 rise">{t.kicker}</div>
        <h1 className="display text-[clamp(44px,7.5vw,96px)] rise" style={{ animationDelay: '100ms', color: 'var(--ink)' }}>{t.title}</h1>
        <p className="serif-i text-[clamp(20px,2.6vw,28px)] mt-4 mb-20 max-w-3xl rise" style={{ animationDelay: '200ms', color: 'var(--ink-50)' }}>
          {t.lead}
        </p>

        {/* ===== FEATURED — media + texto lado a lado, alternando ===== */}
        {featured.map((p, i) => (
          <section key={p.slug} className="mb-20 md:mb-28">
            <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
              <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <Reveal>
                  <Media project={p} aspect="aspect-[16/10]" t={t} lang={lang} />
                </Reveal>
              </div>
              <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <Reveal delay={100}>
                  <div className="mono text-[10px] uppercase tracking-[0.16em] mb-3 flex items-center gap-2 flex-wrap" style={{ color: 'var(--ink-35)' }}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span>·</span>
                    <span>{p.year}</span>
                    <span>·</span>
                    <span>{p.org}</span>
                  </div>
                  {p.titleImg ? (
                    <img src={p.titleImg} alt={p.title} style={{ height: p.titleImgH || 64, width: 'auto', maxWidth: '100%', ...(p.titleImgBlend ? { mixBlendMode: 'multiply' } : {}) }} />
                  ) : (
                    <h2 className="display text-[clamp(28px,3.4vw,38px)]" style={{ color: 'var(--ink)', letterSpacing: '-0.025em' }}>
                      {p.title}
                    </h2>
                  )}
                  <div className="serif-i text-[17px] mt-1 mb-5" style={{ color: 'var(--ink-50)' }}>{p.type[lang]}</div>
                  {p.metric ? (
                    <div className="mono text-[13px] uppercase tracking-[0.1em] mb-4" style={{ color: 'var(--ink)' }}>
                      <span className="text-[24px] md:text-[28px] block mb-1" style={{ letterSpacing: 0 }}>
                        <CountUp n={p.metric.n} pre={p.metric.pre} post={p.metric.post} lang={lang} />
                      </span>
                      <span className="text-[11px]" style={{ color: 'var(--ink-50)' }}>{p.metricText[lang]}</span>
                    </div>
                  ) : (
                    <div className="mono text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--ink-50)' }}>
                      {p.metricText[lang]}
                    </div>
                  )}
                  <p className="text-[15px] leading-relaxed" style={{ color: 'var(--ink-70)' }}>{p[lang]}</p>
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
                <div className="mono text-[10px] uppercase tracking-[0.16em] mt-5 mb-2 flex items-center gap-2 flex-wrap" style={{ color: 'var(--ink-35)' }}>
                  <span>{String(featured.length + i + 1).padStart(2, '0')}</span>
                  <span>·</span>
                  <span>{p.year}</span>
                  <span>·</span>
                  <span>{p.org}</span>
                </div>
                <h2 className="display text-[24px] md:text-[28px]" style={{ color: 'var(--ink)', letterSpacing: '-0.02em' }}>{p.title}</h2>
                <div className="mono text-[11px] uppercase tracking-[0.12em] mt-2 mb-3" style={{ color: 'var(--ink-50)' }}>
                  {p.metric ? (
                    <>
                      <CountUp n={p.metric.n} pre={p.metric.pre} post={p.metric.post} lang={lang} />{' '}
                      <span style={{ color: 'var(--ink-35)' }}>— {p.metricText[lang]}</span>
                    </>
                  ) : (
                    p.metricText[lang]
                  )}
                </div>
                <p className="text-[14.5px] leading-relaxed" style={{ color: 'var(--ink-70)' }}>{p[lang]}</p>
              </Reveal>
            </section>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="hairline-t pt-14 mt-14 text-center">
            <p className="serif-i text-[clamp(22px,3vw,32px)] mb-8" style={{ color: 'var(--ink)' }}>{t.ctaLabel}</p>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="pill-dark">
              {t.ctaBtn} <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </main>

      <footer className="hairline-t">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 flex flex-wrap items-center justify-between gap-4 mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--ink-35)' }}>
          <span>© 2008–2026 alejandro marcos</span>
        </div>
      </footer>
    </div>
  );
}
