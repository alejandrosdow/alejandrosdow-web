'use client';

import React, { useState, useEffect, useRef } from 'react';

// =============================================
// alejandrosdow.com — v0.5
// retro-futurismo minimalista · brand director
// =============================================

// ============ I18N DICTIONARY ============
const I18N = {
  es: {
    nav: { home: 'Home', cv: 'Trayectoria', blog: 'Blog', library: 'Biblioteca', contact: 'Contacto' },
    home: {
      kicker: 'Chief Brand Officer — Team Heretics',
      title1: 'Construir',
      title2: 'marcas culturales',
      title3: 'en internet',
      leadDesc:
        'Trabajo en la intersección entre entretenimiento, tecnología y cultura digital.',
      sub: 'Aquí te dejo dos regalos:',
      subA: 'mi libro',
      subAnd: 'y',
      subB: 'una pequeña biblioteca',
      pills: [
        { label: 'Ver trayectoria', target: 'cv' },
        { label: 'Contactar', target: 'contact' },
        { label: 'Leer el blog', target: 'blog' },
      ],
      photoLabel: 'alejandro — madrid, 2026',
      stmtA: 'Soy Alejandro Marcos, ',
      stmtB: 'Chief Brand Officer',
      stmtC: ' de Team Heretics. Construyo marcas que viven en la ',
      stmtD: 'cultura',
      stmtE: ', no solo en el feed.',
      manifesto:
        '"Una marca cultural trasciende a su producto. Refleja el zeitgeist, una forma de ser y estar en el mundo, y por eso la gente se identifica, la defiende y la convierte en parte de su identidad."',
      bookLabel: '01 — Libro',
      bookTitle1: 'Internet Surfer',
      bookTitle2: 'el arte de crear comunidades en la era digital.',
      bookBullets: [
        'Cómo construir comunidades que sobreviven al algoritmo',
        'Narrativa, posicionamiento y zeitgeist',
        'Los 10 mandamientos para construir marca y comunidad',
        'Casos reales de Team Heretics y proyectos en los que he trabajado',
      ],
      bookCTA: 'Descargar gratis',
      libLabel: '02 — Biblioteca personal',
      libTitle1: 'Para crear y pensar',
      libTitle2: 'mejor.',
      libDesc:
        'Una pequeña biblioteca de libros, recursos y referencias que han formado mi manera de pensar sobre marcas, comunidades e internet. Se actualiza constantemente.',
      libSeeAll: 'Ver biblioteca completa',
      ctaLabel: '¿Seguimos hablando?',
      ctaTitle1: 'Hablemos',
      ctaTitle2: '30 minutos.',
      ctaBtn: 'Reservar sesión gratuita',
    },
    cv: {
      kicker: '/cv — the long version',
      title: 'Trayectoria.',
      lead: 'Construyendo en internet desde 2008.',
      docencia: 'Docencia',
      docenciaDesc:
        'Marketing digital, construcción de comunidades, estrategia de marca y cultura de internet en algunas de las escuelas más importantes de España.',
      contactTitle: '¿Hablamos?',
      contactDesc:
        'Si has llegado hasta aquí, probablemente tengamos cosas que hablar.',
      contactBtn: 'Reservar 30 min',
      sections: [
        { num: '01', title: 'Ahora', items: [
          { date: '2018—', role: 'Chief Brand Officer', org: 'Team Heretics', logo: '/assets/logo-heretics.png', desc: 'Lidero la marca y comunidad global de Team Heretics. De marca de nicho en esports a referencia global de entretenimiento en internet. Posición transversal dentro del Holding de Heretics, trabajando con las empresas del grupo: PHTP, Nativo y MakeItHappen.' },
          { date: '2025—', role: 'Brand Advisor', org: 'GenLayer', logo: '/assets/logo-genlayer.png', desc: 'Infrastructura de confianza humana para la era de la IA. Intersección de blockchain + IA. Advisor estratégico de marca y comunidad internacional.' },
          { date: '2018—', role: 'Freelance', org: 'Creadores y empresas', logo: '/assets/logo-freelance.png', desc: 'Narrativa, estrategia, construcción de marca, comunidad y monetización de audiencias.' },
        ]},
        { num: '02', title: 'Empresa', items: [
          { date: '2017—19', role: 'CMO', org: 'Cooler Master Iberia', desc: 'Estrategia, plan y ejecución de marca en España y Portugal para una marca icónica en hardware. Escalamos la facturación un 50% yoy.' },
          { date: '2016—17', role: 'Productor & Presentador', org: 'Movistar / GAME TV', desc: 'Producción especializada, contenidos y cara del primer canal de gaming y esports en televisión para Movistar.' },
          { date: '2015—16', role: 'Head of Publishers, Talents & Esports', org: 'GAME Stores', desc: 'Relaciones con publishers internacionales, creadores de contenido y equipos de esports. Estuve liderando las activaciones y contenidos de Madrid Gaming Experience (+120K asistentes), Barcelona Games World y Fun & Serious Bilbao.' },
          { date: '2013—15', role: 'Marketing Manager', org: 'SocialNAT', desc: 'Gestión de campañas y comunidades digitales. Narrador y host de la competición.' },
          { date: '2008—13', role: 'Creador de contenido', org: 'Machinima · LVP · ESL', desc: 'Todo empieza aquí. Uno de los primeros contratos de Machinima en España y colaborador habitual de LVPes y ESL.' },
          { date: '2008—13', role: 'Jugador profesional', org: 'Call of Duty · Pain Gaming', desc: 'Campeón nacional. 9º en el Mundial de Los Ángeles 2011. Uno de los primeros contratos firmados en España como jugador profesional.' },
        ]},
        { num: '03', title: 'Fundador / Inversor', items: [
          { date: '2025', role: 'JULIO', org: '', desc: 'Primera memebrand hispanohablante. Filosofía mediterránea, sold out en 30 minutos del único drop lanzado.' },
          { date: '2024', role: 'SCALELAB', org: '', desc: 'Empresa de infoproductos. Hacía el ciclo completo para creadores: producto, plataforma, marketing y equipos de ventas.' },
          { date: '2020—23', role: 'Zhander App', org: '', desc: 'App de ocio nocturno para digitalizar el rol del PR. Lanzamos nuestro evento propio "Algodón" con Antídoto. La pandemia anuló nuestros contratos y tratamos de pivotar el modelo sin éxito.' },
          { date: '2020', role: 'OLAGG', org: '', desc: 'Inversor minoritario. Apuesta early en blockchain, gaming y esports.' },
          { date: '2015—16', role: 'XYON Agency', org: '', desc: 'Una de las primeras agencias especializadas en gaming de creadores de contenido cuando aún estaba muy poco profesionalizado, hicimos campañas y acuerdos con grandes marcas de gaming, pero no supimos escalarlo.' },
        ]},
      ],
    },
    blog: {
      kicker: '/blog — pensamientos sueltos',
      title: 'Blog.',
      lead: 'Notas, ensayos cortos y observaciones sobre marca, comunidad e internet. Sincronizado con mi Substack.',
      readMin: 'min lectura',
      readMore: 'Leer en Substack',
      subLabel: 'Suscríbete',
      subTitle: 'Si te interesa, suscríbete.',
      subDesc: 'Sin spam, sin secuencias, sin venta agresiva. Solo cuando tengo algo que decir.',
      subBtn: 'Suscribirse en Substack',
      loading: 'Cargando desde Substack',
      emptyTitle: 'Todavía sin publicar.',
      emptyDesc: 'El blog vive en mi Substack y se sincroniza automáticamente con esta página. Cuando publique el primer artículo, aparecerá aquí.',
      emptyFollow: 'Seguirme en Substack',
      errorDesc: 'No he podido cargar el feed del Substack ahora mismo. Mientras tanto, puedes leerlo directamente allí.',
      errorOpen: 'Abrir en Substack',
    },
    library: [
      { title: 'El Acto de Crear', author: 'Rick Rubin', note: 'Sobre creatividad como manera de estar en el mundo. Te recoloca lo importante: la atención, la curiosidad, escuchar lo que el trabajo te pide.', tag: 'Creatividad · 2023', cover: '/assets/thumbs/book-acto-de-crear.jpg' },
      { title: 'Hitmakers', author: 'Ana Andjelic', note: 'Cómo las marcas influyen en la cultura y por qué los hits no son accidentes. Lectura obligatoria si construyes marca hoy.', tag: 'Branding · 2024', cover: '/assets/thumbs/book-hitmakers.jpg' },
      { title: 'Buena Estrategia, Mala Estrategia', author: 'Richard P. Rumelt', note: 'El libro que más me ha cambiado la forma de pensar en negocio. Distingue entre estrategia real y palabras vacías con autoridad.', tag: 'Estrategia · 2011', cover: '/assets/thumbs/book-buena-mala-estrategia.jpg' },
      { title: 'El Problema de los Tres Cuerpos', author: 'Cixin Liu', note: 'Ciencia ficción china que te explota la cabeza. Cuando construyes marcas necesitas ficción para imaginar futuros, y este libro entrena ese músculo.', tag: 'Ficción · 2008', cover: '/assets/thumbs/book-tres-cuerpos.jpg' },
      { title: 'The Sovereign Individual', author: 'J. D. Davidson & W. Rees-Mogg', note: 'Escrito en 1997, predijo el mundo en el que vivimos: dinero digital, soberanía individual y el poder pasando de las instituciones a las personas. Cada año que pasa se lee más como un manual.', tag: 'Futuro · 1997', cover: '/assets/thumbs/book-sovereign-individual.jpg' },
      { title: 'Made in Japan', author: 'Akio Morita', note: 'La autobiografía del fundador de Sony. Cómo se construye una empresa desde cero con visión cultural a largo plazo. Atemporal.', tag: 'Negocio · 1986', cover: '/assets/thumbs/book-made-in-japan.jpg' },
    ],
    contact: {
      kicker: '/contacto — ¿charlamos?',
      title: 'Contacto.',
      lead: 'Construir marcas culturales implica trascender la venta de productos para crear iconos que reflejan valores, ideologías y contextos sociales. Conectar > Llegar.',
      workLabel: 'En qué trabajo',
      workIntro:
        'La mayoría de las marcas no fallan por falta de producto o contenido. Fallan por falta de narrativa clara. Confunden seguidores con comunidad y recurren al paid media para compensar lo que no logran construir de forma orgánica. Creen que el problema es llegar. Pero el problema no es la visibilidad.',
      workIntroHighlight:
        'El problema es construir algo que la gente entienda, recuerde y quiera hacer suyo.',
      pillars: [
        { title: 'Narrativa', desc: 'Tu posición en el mundo y cómo articularla. Sin narrativa, todo lo demás es ruido.' },
        { title: 'Comunidad', desc: 'Pertenencia, no seguidores. Audiencia que entiende, comparte y defiende tu proyecto.' },
        { title: 'Sistemas', desc: 'Dirección creativa, distribución y crecimiento con estructura para escalar con criterio sin perder el alma.' },
      ],
      workNote:
        'Podemos colaborar de tres formas: sesiones individuales, integrándome part-time en tu proyecto o formando un equipo a medida. Por mi rol como Chief Brand Officer en Team Heretics, cojo muy pocos proyectos al año, pero puedo ponerte en contacto con personas que admiro y pueden ayudarte.',
      sessionLabel: 'Sesión gratuita',
      sessionTitle: 'Hablemos 30 minutos.',
      sessionLead:
        'En este tiempo vamos a charlar, conocernos y tratar de entender qué no está funcionando y cuáles pueden ser los siguientes pasos.',
      sessionBtn: 'Agendar sesión gratuita',
    },
    footer: { copy: '© 2008–2026' },
  },
  en: {
    nav: { home: 'Home', cv: 'Career', blog: 'Blog', library: 'Library', contact: 'Contact' },
    home: {
      kicker: 'Chief Brand Officer — Team Heretics',
      title1: 'Building',
      title2: 'cultural brands',
      title3: 'on the internet',
      leadDesc:
        'I work at the intersection of entertainment, technology and digital culture.',
      sub: 'Here are two gifts for you:',
      subA: 'my book',
      subAnd: 'and',
      subB: 'a small library',
      pills: [
        { label: 'See career', target: 'cv' },
        { label: 'Get in touch', target: 'contact' },
        { label: 'Read the blog', target: 'blog' },
      ],
      photoLabel: 'alejandro — madrid, 2026',
      stmtA: "I'm Alejandro Marcos, ",
      stmtB: 'Chief Brand Officer',
      stmtC: ' at Team Heretics. I build brands that live in ',
      stmtD: 'culture',
      stmtE: ', not just in the feed.',
      manifesto:
        '"A cultural brand transcends its product. It reflects the zeitgeist, a way of being in the world, and that\'s why people identify with it, defend it and make it part of their identity."',
      bookLabel: '01 — Book',
      bookTitle1: 'Internet Surfer',
      bookTitle2: 'the art of building communities in the digital era.',
      bookBullets: [
        'How to build communities that survive the algorithm',
        'Narrative, positioning and zeitgeist',
        'The 10 commandments for building brand and community',
        "Real cases from Team Heretics and projects I've worked on",
      ],
      bookCTA: 'Download free',
      libLabel: '02 — Personal library',
      libTitle1: 'To create and think',
      libTitle2: 'better.',
      libDesc:
        'A small library of books, resources and references that shaped the way I think about brands, communities and the internet. Updated constantly.',
      libSeeAll: 'See full library',
      ctaLabel: 'Shall we keep talking?',
      ctaTitle1: "Let's talk for",
      ctaTitle2: '30 minutes.',
      ctaBtn: 'Book a free session',
    },
    cv: {
      kicker: '/cv — the long version',
      title: 'Career.',
      lead: 'Building on the internet since 2008.',
      docencia: 'Teaching',
      docenciaDesc:
        "Digital marketing, community building, brand strategy and internet culture at some of Spain's most respected schools.",
      contactTitle: 'Shall we talk?',
      contactDesc: 'If you made it this far, we probably have things to talk about.',
      contactBtn: 'Book 30 min',
      sections: [
        { num: '01', title: 'Now', items: [
          { date: '2018—', role: 'Chief Brand Officer', org: 'Team Heretics', logo: '/assets/logo-heretics.png', desc: "I lead the global brand and community of Team Heretics. From a niche brand in esports to a global entertainment reference on the internet. A cross-functional role within the Heretics Holding, working with the group's companies: PHTP, Nativo and MakeItHappen." },
          { date: '2025—', role: 'Brand Advisor', org: 'GenLayer', logo: '/assets/logo-genlayer.png', desc: 'Human trust infrastructure for the AI era. Intersection of blockchain + AI. Strategic brand and international community advisor.' },
          { date: '2018—', role: 'Freelance', org: 'Creators and companies', logo: '/assets/logo-freelance.png', desc: 'Narrative, strategy, brand building, community and audience monetization.' },
        ]},
        { num: '02', title: 'Companies', items: [
          { date: '2017—19', role: 'CMO', org: 'Cooler Master Iberia', desc: 'Strategy, plan and brand execution in Spain and Portugal for an iconic hardware brand. We scaled revenue 50% yoy.' },
          { date: '2016—17', role: 'Producer & Host', org: 'Movistar / GAME TV', desc: 'Specialized production, content and on-camera for the first gaming and esports channel on television for Movistar.' },
          { date: '2015—16', role: 'Head of Publishers, Talents & Esports', org: 'GAME Stores', desc: 'Relationships with international publishers, content creators and esports teams. I led the activations and content for Madrid Gaming Experience (+120K attendees), Barcelona Games World and Fun & Serious Bilbao.' },
          { date: '2013—15', role: 'Marketing Manager', org: 'SocialNAT', desc: 'Campaign and digital community management. Narrator and host of the competition.' },
          { date: '2008—13', role: 'Content creator', org: 'Machinima · LVP · ESL', desc: 'Where it all began. One of the first Machinima contracts in Spain and regular collaborator with LVPes and ESL.' },
          { date: '2008—13', role: 'Pro player', org: 'Call of Duty · Pain Gaming', desc: 'National champion. 9th at the Los Angeles 2011 World Championship. One of the first professional player contracts signed in Spain.' },
        ]},
        { num: '03', title: 'Founder / Investor', items: [
          { date: '2025', role: 'JULIO', org: '', desc: 'First Spanish-speaking memebrand. Mediterranean philosophy, sold out in 30 minutes of its only drop.' },
          { date: '2024', role: 'SCALELAB', org: '', desc: 'Info-products company. Full cycle for creators: product, platform, marketing and sales teams.' },
          { date: '2020—23', role: 'Zhander App', org: '', desc: 'Nightlife app to digitize the role of the PR. We launched our own event "Algodón" with Antídoto. The pandemic cancelled our contracts and we tried to pivot the model without success.' },
          { date: '2020', role: 'OLAGG', org: '', desc: 'Minority investor. Early bet on blockchain, gaming and esports.' },
          { date: '2015—16', role: 'XYON Agency', org: '', desc: "One of the first agencies specialized in creator gaming content when it was still very unprofessionalized. We ran campaigns and deals with major gaming brands, but we couldn't scale it." },
        ]},
      ],
    },
    blog: {
      kicker: '/blog — loose thoughts',
      title: 'Blog.',
      lead: 'Notes, short essays and observations on brand, community and the internet. Synced with my Substack.',
      readMin: 'min read',
      readMore: 'Read on Substack',
      subLabel: 'Subscribe',
      subTitle: 'If you like it, subscribe.',
      subDesc: 'No spam, no sequences, no aggressive selling. Only when I have something to say.',
      subBtn: 'Subscribe on Substack',
      loading: 'Loading from Substack',
      emptyTitle: 'Nothing published yet.',
      emptyDesc: 'The blog lives on my Substack and syncs automatically with this page. When the first article is published, it will appear here.',
      emptyFollow: 'Follow me on Substack',
      errorDesc: "Couldn't load the Substack feed right now. In the meantime, you can read it there directly.",
      errorOpen: 'Open on Substack',
    },
    library: [
      { title: 'The Creative Act', author: 'Rick Rubin', note: 'On creativity as a way of being in the world. It re-centers what matters: attention, curiosity, listening to what the work is asking of you.', tag: 'Creativity · 2023', cover: '/assets/thumbs/book-acto-de-crear.jpg' },
      { title: 'Hitmakers', author: 'Ana Andjelic', note: "How brands influence culture and why hits aren't accidents. Mandatory reading if you build brand today.", tag: 'Branding · 2024', cover: '/assets/thumbs/book-hitmakers.jpg' },
      { title: 'Good Strategy, Bad Strategy', author: 'Richard P. Rumelt', note: 'The book that changed the way I think about business most. Distinguishes real strategy from authoritative-sounding empty words.', tag: 'Strategy · 2011', cover: '/assets/thumbs/book-buena-mala-estrategia.jpg' },
      { title: 'The Three-Body Problem', author: 'Cixin Liu', note: 'Chinese sci-fi that blows your mind. When you build brands you need fiction to imagine futures, and this book trains that muscle.', tag: 'Fiction · 2008', cover: '/assets/thumbs/book-tres-cuerpos.jpg' },
      { title: 'The Sovereign Individual', author: 'J. D. Davidson & W. Rees-Mogg', note: 'Written in 1997, it predicted the world we live in: digital money, individual sovereignty and power shifting from institutions to people. Every year it reads more like a manual.', tag: 'Future · 1997', cover: '/assets/thumbs/book-sovereign-individual.jpg' },
      { title: 'Made in Japan', author: 'Akio Morita', note: "The autobiography of Sony's founder. How you build a company from scratch with long-term cultural vision. Timeless.", tag: 'Business · 1986', cover: '/assets/thumbs/book-made-in-japan.jpg' },
    ],
    contact: {
      kicker: '/contact — shall we chat?',
      title: 'Contact.',
      lead: 'Building cultural brands means going beyond selling products to become icons that reflect values, ideologies and social contexts. Connect > Reach.',
      workLabel: 'What I work on',
      workIntro:
        "Most brands don't fail because of a product or content problem. They fail because of a clarity problem. They confuse followers with community and lean on paid media to make up for what they can't build organically. They think the problem is reach. But the problem isn't visibility.",
      workIntroHighlight:
        'The problem is building something people understand, remember, and want to make their own.',
      pillars: [
        { title: 'Narrative', desc: 'Your position in the world and how to articulate it. Without narrative, everything else is noise.' },
        { title: 'Community', desc: 'Belonging, not followers. An audience that understands, shares and defends your project.' },
        { title: 'Systems', desc: 'Creative direction, distribution and growth with structure to scale with judgment without losing the soul.' },
      ],
      workNote:
        'We can collaborate in three ways: individual sessions, integrating part-time into your project, or building a custom team. Due to my role as Chief Brand Officer at Team Heretics, I only take on a few projects per year, but I can put you in touch with people I admire and who can help you.',
      sessionLabel: 'Free session',
      sessionTitle: "Let's talk for 30 minutes.",
      sessionLead:
        "In this time we'll chat, get to know each other and try to understand what's not working and what the next steps might be.",
      sessionBtn: 'Book free session',
    },
    footer: { copy: '© 2008–2026' },
  },
};

const CALENDLY = 'https://calendly.com/alejandro-marcos-teamheretics/30min';
const SUBSTACK = 'https://substack.com/@alejandrosdow';

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
    <div
      ref={ref}
      className={`reveal ${vis ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ============ HERO PHOTO — 3D tilt + inner parallax ============
function HeroPhoto({ label }) {
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hover, setHover] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const onMove = (e) => {
    if (reduced.current || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 9, ry: px * 9 });
  };
  const onLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setHover(false);
  };

  return (
    <div>
      <div
        ref={wrapRef}
        style={{ perspective: '900px' }}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
      >
        <div
          className="img-clean aspect-square max-w-[240px] md:max-w-none mx-auto"
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hover ? 1.015 : 1})`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease',
            boxShadow: hover
              ? '0 34px 70px -34px rgba(22,21,19,0.4)'
              : '0 16px 44px -28px rgba(22,21,19,0.28)',
            willChange: 'transform',
          }}
        >
          <img
            src="/assets/foto-alejandro.jpg"
            alt="Alejandro Marcos"
            style={{
              transform: `scale(1.08) translateX(${tilt.ry * 1.4}px) translateY(${-tilt.rx * 1.4}px)`,
              transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </div>
      </div>
      <div className="mono text-[10px] uppercase tracking-[0.16em] mt-4 text-center" style={{ color: 'var(--ink-35)' }}>
        {label}
      </div>
    </div>
  );
}

export default function Page() {
  const [route, setRoute] = useState('home');
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const browserLang = (typeof navigator !== 'undefined' && navigator.language) || 'es';
    setLang(browserLang.toLowerCase().startsWith('es') ? 'es' : 'en');
  }, []);

  // scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  const t = I18N[lang];
  const go = (r) => setRoute(r);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ============ NAV ============ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 hairline-b"
        style={{ background: 'rgba(230,229,225,0.85)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-0 md:h-16 flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 md:gap-2">
          <div className="flex items-center justify-between">
            <button onClick={() => go('home')} className="flex items-baseline gap-0.5 shrink-0" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              <span className="display text-[16px] md:text-[17px] tracking-tight" style={{ color: 'var(--ink)' }}>alejandrosdow</span>
              <sup className="mono text-[9px]" style={{ color: 'var(--green)', filter: 'brightness(0.75)' }}>®</sup>
            </button>
            {/* mobile: single toggle to the other language */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="mono text-[11px] md:hidden"
              style={{ background: 'none', border: '1px solid var(--hairline)', borderRadius: 999, padding: '4px 9px', cursor: 'pointer', color: 'var(--ink-50)' }}
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>
          <div className="flex items-center gap-4 md:gap-7">
            {['home', 'cv', 'blog'].map((r) => (
              <button key={r} onClick={() => go(r)} className={`nav-link ${route === r ? 'active' : ''} ${r === 'home' ? 'hidden md:inline' : ''}`}>
                {t.nav[r]}
              </button>
            ))}
            <a href="/biblioteca" className="nav-link">{t.nav.library}</a>
            <button onClick={() => go('contact')} className={`nav-link ${route === 'contact' ? 'active' : ''}`}>
              {t.nav.contact}
            </button>
            {/* desktop: ES / EN pair */}
            <div className="mono text-[11px] hidden md:flex items-center gap-1.5" style={{ color: 'var(--ink-35)' }}>
              <button onClick={() => setLang('es')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: lang === 'es' ? 'var(--ink)' : 'inherit' }}>ES</button>
              <span>/</span>
              <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: lang === 'en' ? 'var(--ink)' : 'inherit' }}>EN</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ============ ROUTES ============ */}
      <div key={`${route}-${lang}`} className="route-in flex-1 pt-[92px] md:pt-16">
        {route === 'home' && <Home t={t} go={go} />}
        {route === 'cv' && <CV t={t} />}
        {route === 'blog' && <Blog t={t} />}
        {route === 'contact' && <Contact t={t} />}
      </div>

      {/* ============ FOOTER ============ */}
      <footer className="hairline-t">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-5 mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--ink-50)' }}>
            <a href="https://x.com/alejandrosdow" target="_blank" rel="noreferrer" className="link-u">X</a>
            <a href="https://instagram.com/alejandrosdow" target="_blank" rel="noreferrer" className="link-u">IG</a>
            <a href="https://linkedin.com/in/alejandromarcosmoraga" target="_blank" rel="noreferrer" className="link-u">IN</a>
            <a href={SUBSTACK} target="_blank" rel="noreferrer" className="link-u">Substack</a>
          </div>
          <div className="mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--ink-35)' }}>
            {t.footer.copy}
          </div>
        </div>
      </footer>
    </div>
  );
}

// =============================================
// HOME
// =============================================
function Home({ t, go }) {
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-14 md:pt-24 pb-16 md:pb-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-center">
          <div className="md:col-span-8">
            <div className="microlabel mb-8 rise" style={{ animationDelay: '50ms' }}>
              {t.home.kicker}
            </div>
            <h1 className="display text-[clamp(48px,8.5vw,108px)]" style={{ color: 'var(--ink)' }}>
              <span className="block rise" style={{ animationDelay: '120ms' }}>{t.home.title1}</span>
              <span className="block serif-i rise" style={{ animationDelay: '220ms' }}>{t.home.title2}</span>
              <span className="block rise" style={{ animationDelay: '320ms' }}>
                {t.home.title3}
                <span style={{ color: 'var(--green)', filter: 'brightness(0.8)' }}>*</span>
              </span>
            </h1>
            <p className="rise text-[17px] md:text-[19px] leading-relaxed max-w-xl mt-8" style={{ animationDelay: '440ms', color: 'var(--ink-70)' }}>
              {t.home.leadDesc}{' '}
              {t.home.sub}{' '}
              <button onClick={() => scrollToId('book-section')} className="link-u" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ink)', font: 'inherit', fontWeight: 500 }}>
                {t.home.subA}
              </button>{' '}
              {t.home.subAnd}{' '}
              <button onClick={() => scrollToId('library-section')} className="link-u" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ink)', font: 'inherit', fontWeight: 500 }}>
                {t.home.subB}
              </button>.
            </p>
            <div className="flex flex-wrap gap-3 mt-10 rise" style={{ animationDelay: '560ms' }}>
              {t.home.pills.map((p) => (
                <button key={p.target} onClick={() => go(p.target)} className="pill">
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-4 rise" style={{ animationDelay: '400ms' }}>
            <HeroPhoto label={t.home.photoLabel} />
          </div>
        </div>
      </section>

      {/* ===== MANIFESTO (dark) ===== */}
      <section style={{ background: 'var(--dark)' }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-36 text-center">
          <Reveal>
            <p className="display text-[clamp(28px,4.6vw,52px)]" style={{ color: 'var(--dark-text)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              {t.home.stmtA}
              <span className="serif-i">{t.home.stmtB}</span>
              {t.home.stmtC}
              <span className="serif-i">{t.home.stmtD}</span>
              {t.home.stmtE}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[15px] md:text-[17px] leading-relaxed max-w-2xl mx-auto mt-12" style={{ color: 'var(--dark-muted)' }}>
              {t.home.manifesto}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== BOOK ===== */}
      <section id="book-section" className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-32 scroll-mt-16">
        <Reveal>
          <div className="microlabel mb-12 hairline-t pt-6">{t.home.bookLabel}</div>
        </Reveal>
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-4">
            <Reveal>
              <div className="img-clean max-w-[240px] md:max-w-none mx-auto md:mx-0" style={{ border: '1px solid var(--hairline)' }}>
                <img src="/assets/internet-surfer-cover.png" alt="Internet Surfer — portada del libro" style={{ height: 'auto' }} />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={100}>
              <h2 className="display text-[clamp(34px,4.8vw,58px)]" style={{ color: 'var(--ink)' }}>
                {t.home.bookTitle1}
                <span className="serif-i block mt-1" style={{ fontSize: '0.72em', color: 'var(--ink-70)' }}>{t.home.bookTitle2}</span>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <ul className="mt-8 space-y-3">
                {t.home.bookBullets.map((b, i) => (
                  <li key={i} className="flex items-baseline gap-4 text-[15px] md:text-[16px]" style={{ color: 'var(--ink-70)' }}>
                    <span className="mono text-[11px] shrink-0" style={{ color: 'var(--ink-35)' }}>{String(i + 1).padStart(2, '0')}</span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-10">
                <a href="/assets/internet-surfer.pdf" download="Internet-Surfer-Alejandro-Marcos.pdf" className="pill-dark">
                  {t.home.bookCTA} <span aria-hidden>↓</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== LIBRARY ===== */}
      <section id="library-section" className="max-w-6xl mx-auto px-5 md:px-8 pb-20 md:pb-32 scroll-mt-16">
        <Reveal>
          <div className="microlabel mb-12 hairline-t pt-6">{t.home.libLabel}</div>
        </Reveal>
        <div className="grid md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="display text-[clamp(34px,4.8vw,58px)]" style={{ color: 'var(--ink)' }}>
                {t.home.libTitle1} <span className="serif-i">{t.home.libTitle2}</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 flex items-end">
            <Reveal delay={120}>
              <p className="text-[15px] leading-relaxed" style={{ color: 'var(--ink-70)' }}>{t.home.libDesc}</p>
            </Reveal>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.library.map((b, i) => (
            <Reveal key={i} delay={(i % 3) * 90}>
              <article className="card p-6 h-full flex flex-col">
                <div className="flex items-start gap-5 mb-5">
                  {b.cover && (
                    <div className="w-[84px] shrink-0 aspect-[2/3] overflow-hidden rounded-md" style={{ border: '1px solid var(--hairline)' }}>
                      <img src={b.cover} alt={`${b.title} — portada`} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="mono text-[10px] mb-2" style={{ color: 'var(--ink-35)' }}>{String(i + 1).padStart(2, '0')}</div>
                    <h3 className="serif-i text-[22px] leading-tight" style={{ color: 'var(--ink)' }}>{b.title}</h3>
                    <div className="mono text-[10px] uppercase tracking-[0.14em] mt-1.5" style={{ color: 'var(--ink-50)' }}>{b.author}</div>
                  </div>
                </div>
                <p className="text-[14px] leading-relaxed flex-1" style={{ color: 'var(--ink-70)' }}>{b.note}</p>
                <div className="mono text-[10px] uppercase tracking-[0.14em] mt-5 pt-4 hairline-t" style={{ color: 'var(--ink-35)' }}>{b.tag}</div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-12 text-center">
            <a href="/biblioteca" className="pill">
              {t.home.libSeeAll} <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* ===== CTA ===== */}
      <section className="hairline-t">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-24 md:py-36 text-center">
          <Reveal>
            <div className="microlabel mb-8">{t.home.ctaLabel}</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display text-[clamp(40px,6.5vw,84px)] mb-10" style={{ color: 'var(--ink)' }}>
              {t.home.ctaTitle1} <span className="serif-i">{t.home.ctaTitle2}</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="pill-dark">
              {t.home.ctaBtn} <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

// =============================================
// CV
// =============================================
function CV({ t }) {
  return (
    <main className="max-w-5xl mx-auto px-5 md:px-8 pt-14 md:pt-24 pb-20 md:pb-28">
      <div className="microlabel mb-8 rise">{t.cv.kicker}</div>
      <h1 className="display text-[clamp(44px,7.5vw,96px)] rise" style={{ animationDelay: '100ms', color: 'var(--ink)' }}>{t.cv.title}</h1>
      <p className="serif-i text-[clamp(20px,2.6vw,28px)] mt-4 mb-20 rise" style={{ animationDelay: '200ms', color: 'var(--ink-50)' }}>
        {t.cv.lead}
      </p>

      {t.cv.sections.map((sec) => (
        <section key={sec.title} className="mb-16 md:mb-20">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-8 hairline-b pb-4">
              <span className="mono text-[11px]" style={{ color: 'var(--ink-35)' }}>{sec.num}</span>
              <h2 className="serif-i text-[26px] md:text-[30px]" style={{ color: 'var(--ink)' }}>{sec.title}</h2>
            </div>
          </Reveal>
          <div>
            {sec.items.map((it, i) => (
              <Reveal key={i} delay={Math.min(i * 60, 240)}>
                <div className="grid md:grid-cols-12 gap-3 md:gap-6 py-6 hairline-b" style={{ borderColor: 'rgba(22,21,19,0.08)' }}>
                  <div className="md:col-span-2 mono text-[12px] pt-1.5" style={{ color: 'var(--ink-35)' }}>{it.date}</div>
                  <div className="md:col-span-4 flex items-start gap-4">
                    {it.logo && (
                      <div className="w-11 h-11 shrink-0 flex items-center justify-center logo-quiet">
                        <img src={it.logo} alt={it.org} className="max-w-full max-h-full object-contain" onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="display text-[19px] md:text-[21px]" style={{ color: 'var(--ink)', letterSpacing: '-0.02em' }}>{it.role}</div>
                      {it.org && <div className="mono text-[10px] uppercase tracking-[0.14em] mt-1.5" style={{ color: 'var(--ink-50)' }}>{it.org}</div>}
                    </div>
                  </div>
                  <div className="md:col-span-6 text-[14.5px] md:text-[15px] leading-relaxed" style={{ color: 'var(--ink-70)' }}>{it.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {/* Docencia */}
      <section className="mb-16 md:mb-20">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-8 hairline-b pb-4">
            <span className="mono text-[11px]" style={{ color: 'var(--ink-35)' }}>04</span>
            <h2 className="serif-i text-[26px] md:text-[30px]" style={{ color: 'var(--ink)' }}>{t.cv.docencia}</h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: 'var(--ink-70)' }}>{t.cv.docenciaDesc}</p>
        </Reveal>
        <Reveal delay={180}>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {[
              { name: 'ISDI', logo: '/assets/logo-isdi.png' },
              { name: 'ESADE', logo: '/assets/logo-esade.png' },
              { name: 'Nebrija', logo: '/assets/logo-nebrija.png' },
              { name: 'The Core', logo: '/assets/logo-thecore.png' },
              { name: 'UNIE', logo: '/assets/logo-unie.png' },
              { name: 'Mondragon', logo: '/assets/logo-mondragon.png' },
            ].map((s) => (
              <div key={s.name} className="logo-quiet flex items-center justify-center h-16">
                <img
                  src={s.logo}
                  alt={s.name}
                  className="max-h-10 max-w-full w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const span = document.createElement('span');
                    span.textContent = s.name;
                    span.className = 'mono text-xs uppercase tracking-widest';
                    e.currentTarget.parentElement.appendChild(span);
                  }}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Contact card */}
      <Reveal>
        <div className="card p-8 md:p-10">
          <h3 className="serif-i text-[28px] md:text-[32px] mb-3" style={{ color: 'var(--ink)' }}>{t.cv.contactTitle}</h3>
          <p className="text-[15px] leading-relaxed max-w-xl mb-8" style={{ color: 'var(--ink-70)' }}>{t.cv.contactDesc}</p>
          <div className="flex flex-wrap gap-3">
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="pill-dark">{t.cv.contactBtn} <span aria-hidden>→</span></a>
            <a href="https://linkedin.com/in/alejandromarcosmoraga" target="_blank" rel="noreferrer" className="pill">LinkedIn <span aria-hidden>→</span></a>
          </div>
        </div>
      </Reveal>
    </main>
  );
}

// =============================================
// BLOG
// =============================================
function Blog({ t }) {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | empty | error

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

  return (
    <main className="max-w-6xl mx-auto px-5 md:px-8 pt-14 md:pt-24 pb-20 md:pb-28">
      <div className="microlabel mb-8 rise">{t.blog.kicker}</div>
      <h1 className="display text-[clamp(44px,7.5vw,96px)] rise" style={{ animationDelay: '100ms', color: 'var(--ink)' }}>{t.blog.title}</h1>
      <p className="serif-i text-[clamp(20px,2.6vw,28px)] mt-4 mb-20 max-w-3xl rise" style={{ animationDelay: '200ms', color: 'var(--ink-50)' }}>
        {t.blog.lead}
      </p>

      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-8">
          {status === 'loading' && (
            <div className="mono text-[11px] uppercase tracking-[0.16em] py-16 text-center" style={{ color: 'var(--ink-35)' }}>
              {t.blog.loading}…
            </div>
          )}

          {status === 'empty' && (
            <Reveal>
              <div className="card p-8">
                <h3 className="serif-i text-[26px] mb-3" style={{ color: 'var(--ink)' }}>{t.blog.emptyTitle}</h3>
                <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--ink-70)' }}>{t.blog.emptyDesc}</p>
                <a href={SUBSTACK} target="_blank" rel="noreferrer" className="pill">{t.blog.emptyFollow} <span aria-hidden>→</span></a>
              </div>
            </Reveal>
          )}

          {status === 'error' && (
            <Reveal>
              <div className="card p-8">
                <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--ink-70)' }}>{t.blog.errorDesc}</p>
                <a href={SUBSTACK} target="_blank" rel="noreferrer" className="pill">{t.blog.errorOpen} <span aria-hidden>→</span></a>
              </div>
            </Reveal>
          )}

          {status === 'ready' && posts.map((p, i) => (
            <Reveal key={i} delay={Math.min(i * 80, 240)}>
              <article className="py-8 hairline-b group">
                <div className="flex items-center gap-3 mono text-[10px] uppercase tracking-[0.14em] mb-4 flex-wrap" style={{ color: 'var(--ink-35)' }}>
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.read} {t.blog.readMin}</span>
                  {p.tag && (
                    <>
                      <span>·</span>
                      <span className="px-2 py-0.5 rounded-full" style={{ border: '1px solid var(--hairline)', color: 'var(--ink-50)' }}>{p.tag}</span>
                    </>
                  )}
                </div>
                <a href={p.link} target="_blank" rel="noreferrer" className="block">
                  <h2 className="serif-i text-[26px] md:text-[32px] leading-tight mb-3 transition-opacity group-hover:opacity-70" style={{ color: 'var(--ink)' }}>
                    {p.title}
                  </h2>
                </a>
                <p className="text-[15px] leading-relaxed mb-4 max-w-2xl" style={{ color: 'var(--ink-70)' }}>{p.excerpt}…</p>
                <a href={p.link} target="_blank" rel="noreferrer" className="mono text-[11px] uppercase tracking-[0.14em] link-u" style={{ color: 'var(--ink-50)' }}>{t.blog.readMore} →</a>
              </article>
            </Reveal>
          ))}
        </div>

        <aside className="md:col-span-4">
          <Reveal delay={150}>
            <div className="rounded-[18px] p-8 sticky top-24" style={{ background: 'var(--dark)' }}>
              <div className="microlabel mb-5" style={{ color: 'var(--dark-muted)' }}>{t.blog.subLabel}</div>
              <h3 className="serif-i text-[26px] mb-4" style={{ color: 'var(--dark-text)' }}>{t.blog.subTitle}</h3>
              <p className="text-[14px] leading-relaxed mb-7" style={{ color: 'var(--dark-muted)' }}>{t.blog.subDesc}</p>
              <a href={SUBSTACK} target="_blank" rel="noreferrer" className="pill-invert w-full justify-center">
                {t.blog.subBtn}
              </a>
            </div>
          </Reveal>
        </aside>
      </div>
    </main>
  );
}

// =============================================
// CONTACT
// =============================================
function Contact({ t }) {
  return (
    <main className="max-w-5xl mx-auto px-5 md:px-8 pt-14 md:pt-24 pb-20 md:pb-28">
      <div className="microlabel mb-8 rise">{t.contact.kicker}</div>
      <h1 className="display text-[clamp(44px,7.5vw,96px)] rise" style={{ animationDelay: '100ms', color: 'var(--ink)' }}>{t.contact.title}</h1>
      <p className="serif-i text-[clamp(20px,2.6vw,28px)] mt-4 mb-20 max-w-3xl rise" style={{ animationDelay: '200ms', color: 'var(--ink-50)' }}>
        {t.contact.lead}
      </p>

      {/* Work */}
      <section className="mb-20">
        <Reveal>
          <div className="microlabel mb-10 hairline-t pt-6">{t.contact.workLabel}</div>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-[16px] md:text-[17px] leading-relaxed max-w-3xl mb-6" style={{ color: 'var(--ink-70)' }}>
            {t.contact.workIntro}
          </p>
        </Reveal>
        <Reveal delay={140}>
          <p className="display text-[clamp(22px,3vw,32px)] max-w-3xl mb-16" style={{ color: 'var(--ink)', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            {t.contact.workIntroHighlight}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {t.contact.pillars.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <article className="card p-7 h-full">
                <div className="mono text-[11px] mb-6" style={{ color: 'var(--ink-35)' }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className="serif-i text-[26px] mb-3" style={{ color: 'var(--ink)' }}>{p.title}</h3>
                <p className="text-[14.5px] leading-relaxed" style={{ color: 'var(--ink-70)' }}>{p.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="text-[15px] leading-relaxed max-w-3xl pl-6" style={{ color: 'var(--ink-70)', borderLeft: '2px solid var(--green)' }}>
            {t.contact.workNote}
          </p>
        </Reveal>
      </section>

      {/* Session */}
      <section>
        <Reveal>
          <div className="microlabel mb-10 hairline-t pt-6">{t.contact.sessionLabel}</div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display text-[clamp(32px,5vw,56px)] mb-6" style={{ color: 'var(--ink)' }}>
            {t.contact.sessionTitle}
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-[16px] leading-relaxed max-w-2xl mb-10" style={{ color: 'var(--ink-70)' }}>
            {t.contact.sessionLead}
          </p>
        </Reveal>
        <Reveal delay={240}>
          <a href={CALENDLY} target="_blank" rel="noreferrer" className="pill-dark">
            {t.contact.sessionBtn} <span aria-hidden>→</span>
          </a>
        </Reveal>
      </section>
    </main>
  );
}
