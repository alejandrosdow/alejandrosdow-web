'use client';

import React, { useState, useEffect, useRef } from 'react';
import Dock, { Spark } from './components/Dock';
import { PROJECTS } from './data/projects';
import { THREADS, THREADS_INTRO } from './data/threads';

// The work column is still being designed: visible in `npm run dev`, hidden in production.
const WORK_PREVIEW = process.env.NODE_ENV !== 'production';

// =============================================
// alejandrosdow.com — v1.0 "quiet system"
// three columns · small type · bottom dock · lime accent
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
      ctaA: 'Ayudo a personas, creadores y empresas a construir algo que la gente ',
      ctaB: 'entienda, recuerde y quiera hacer suyo',
      ctaC: '.',
      ctaRole: 'Mi rol podría definirse como alguien que construye marca, cultura y comunidad desde la estrategia creativa. Lo he hecho liderando la marca de Team Heretics, asesorando a empresas y creadores, y fundando mis propios proyectos.',
      ctaSub: '¿Charlamos 30 minutos?',
      ctaBtn: 'Reserva una sesión',
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
      lead: 'Construir marcas culturales implica trascender la venta de productos para crear iconos que reflejan valores, ideologías y contextos sociales.',
      leadEmph: 'Conectar > Llegar.',
      workLabel: 'En qué trabajo',
      roleA: 'Mi rol podría definirse como alguien que construye marca, cultura y comunidad desde la ',
      roleB: 'estrategia creativa',
      roleC: '. Lo he hecho liderando la marca de Team Heretics, asesorando a empresas y creadores, y fundando mis propios proyectos.',
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
      ctaA: 'I help people, creators and companies build something people ',
      ctaB: 'understand, remember and want to make their own',
      ctaC: '.',
      ctaRole: "My role could be defined as someone who builds brand, culture and community through creative strategy. I've done it leading the Team Heretics brand, advising companies and creators, and founding my own projects.",
      ctaSub: 'Shall we talk for 30 minutes?',
      ctaBtn: 'Book a session',
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
      lead: 'Building cultural brands means going beyond selling products to become icons that reflect values, ideologies and social contexts.',
      leadEmph: 'Connect > Reach.',
      workLabel: 'What I work on',
      roleA: 'My role could be defined as someone who builds brand, culture and community through ',
      roleB: 'creative strategy',
      roleC: ". I've done it leading the Team Heretics brand, advising companies and creators, and founding my own projects.",
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

// ============ LAYOUT COPY (new in v1.0) ============
const UI = {
  es: {
    name: 'Alejandro Marcos',
    bio: [
      'Construyo marca, comunidad y cultura desde la estrategia creativa. Chief Brand Officer en ',
      { k: 'x:heretics', label: 'Team Heretics' },
      ' y colaboro en varios ',
      { k: 'x:proyectos', label: 'proyectos' },
      ' como freelance.',
    ],
    explore: [
      'Explora ',
      { k: 'x:como-trabajo', label: 'cómo trabajo' },
      ', ',
      { k: 'work', label: 'lo que construyo' },
      ', ',
      { k: 'x:lo-que-viene', label: 'lo que viene' },
      ' y ',
      { k: 'x:origenes', label: 'dónde empezó' },
      '.',
    ],
    place: 'BASED IN MADRID / SPAIN',
    threadsHead: 'Algunas ideas detrás del trabajo.',
    threads: [
      ['Una marca cultural ', { k: null, label: 'trasciende a su producto' }, '. Refleja el zeitgeist, una forma de ser y estar en el mundo.'],
      ['Por eso la gente se identifica con ella, la defiende y ', { k: null, label: 'la convierte en parte de su identidad' }, '.'],
      ['La mayoría de marcas no fallan por falta de producto, sino de ', { k: 'contact', label: 'narrativa clara' }, '. Confunden seguidores con ', { k: 'contact', label: 'comunidad' }, '.'],
      ['Trabajo en tres capas: ', { k: 'contact', label: 'narrativa, comunidad y sistemas' }, '.'],
      ['Dos regalos: ', { k: 'book', label: 'mi libro' }, ' y ', { k: 'library', label: 'una pequeña biblioteca' }, '.'],
      ['Para historias más largas, ', { k: 'blog', label: 'lee mi blog' }, '.'],
    ],
    workHead: 'Una mirada al trabajo.',
    workAll: 'Ver todo',
    heads: { cv: 'Trayectoria.', blog: 'Blog.', contact: 'Hablemos.' },
    back: 'Trabajo',
    video: 'Ver vídeo',
    download: 'Descargar gratis',
    bookCaption: 'Libro · Gratis · PDF',
    bookDesc: 'El arte de crear comunidades en la era digital.',
    libCaption: 'Biblioteca personal · se actualiza constantemente',
    libTitle: 'Para crear y pensar mejor',
    heretics: {
      caption: 'Team Heretics · 2018—',
      title: 'Team Heretics',
      desc: 'De marca de nicho en esports a referencia global de entretenimiento en internet.',
      btn: 'Ver trayectoria',
    },
    moreLabel: 'Más proyectos',
    testing: 'En pruebas',
    soon: {
      caption: 'Chief Brand Officer: Team Heretics · 2018—',
      title: 'Team Heretics',
      desc: 'Team Heretics forma parte de Heretics Holdings, donde trabajo como Chief Brand Officer del grupo. Uno de los clubs de esports más importantes del mundo, con gran presencia internacional, especialmente en Europa y Asia.',
      play: 'Reproducir',
      pause: 'Pausa',
      soundOn: 'Activar sonido',
      soundOff: 'Silenciar',
      expand: 'Ampliar',
      pro: {
        caption: 'Creador de contenido y jugador profesional: Machinima · Pain Gaming · 2008—13',
        body: [
          'Todo empieza en 2008 con Call of Duty y YouTube. Campeón nacional y 9º en el Mundial de Los Ángeles 2011. Subía a YouTube partidas, viajes y series de contenido.',
          'Firmé uno de los primeros contratos de Machinima en España para monetizar mis vídeos y colaboraba con empresas emergentes de la industria del entretenimiento digital.',
        ],
      },
      socialnat: {
        caption: 'Marketing Manager: SocialNAT · 2013—15',
        body: [
          'Durante mis años de universidad trabajé en SocialNAT, una red social de esports que organizaba competiciones online y eventos presenciales. Me encargaba de crear comunidad y de las campañas con creadores de contenido, y era comentarista y presentador en sus eventos. En 2015 fue adquirida por GAME.',
        ],
      },
      xyon: {
        caption: 'Co-fundador: XYON Agency · 2015—16',
        body: [
          'Una de las primeras agencias especializadas en creadores de contenido de gaming, cuando el sector aún estaba muy poco profesionalizado. Hicimos campañas y acuerdos con grandes marcas, pero no supimos escalarlo.',
        ],
      },
      game: {
        caption: 'Head of Publishers, Talents & Esports: GAME · 2015—16',
        body: [
          'En GAME lideraba las relaciones con publishers internacionales, creadores de contenido y equipos de esports. Con 24 años llevaba las activaciones y los contenidos de Madrid Gaming Experience (+120K asistentes), Barcelona Games World y Fun & Serious Bilbao, lo que incluía producir eventos como «El Gran Desafío» o incluso presentarlos delante de miles de personas.',
        ],
      },
      cm: {
        caption: 'Brand Manager Iberia: Cooler Master · 2017—19',
        body: [
          'Durante un año y medio trabajé como Brand Manager de Iberia para Cooler Master, una de las marcas más prestigiosas y reconocidas del mundo en hardware para PC.',
          'Fue la primera marca de gaming en España con un equipo de embajadores formado por creadores de contenido: IamCristinini, BlackEspanolito y UnBoxMe. Logramos hacer crecer la facturación de la marca un 50% YoY.',
        ],
      },
      mv: {
        caption: 'Productor y presentador: Movistar · 2017',
        body: [
          'Estuve trabajando como productor y presentador en el primer canal de gaming y esports en televisión para Movistar. En el plató más caro de la cadena, produciendo piezas de alta calidad cada semana, viajando y cubriendo toda la industria. La experiencia en cámara, divertida, pero no la repetiría.',
        ],
      },
      zh: {
        caption: 'Co-fundador: Zhander App × Algodón · 2020—23',
        body: [
          'Zhander nació para digitalizar el papel del relaciones públicas: una app para descubrir las mejores discotecas, pubs y bares de copas, comparar precios y promociones y comprar la entrada con beneficios. En el equipo de fundadores contábamos con Nil Ojeda, Paula Gonu, byCalitos, Hamza, Werlyb, Goorgo, Zulu o Alex Chiner.',
          'Lanzamos nuestra propia fiesta, Algodón, junto al colectivo Antídoto. Lamentablemente, la pandemia anuló nuestros contratos y tratamos de pivotar el modelo, sin éxito.',
        ],
      },
      julio: {
        caption: 'Co-fundador: JULIO · Meme Corp · 2025',
        body: [
          'JULIO es la filosofía y la marca de la plenitud: la primera memebrand hispanohablante. Nace en 2025 del meme de Julio Iglesias para celebrar la buena vida y una masculinidad más luminosa, divertida y cuidadora.',
          'El primer lanzamiento fue sold out en 30 minutos: lo hicimos junto a MITO, la plataforma de vídeo con IA, para el contenido, y con Maxi para el producto.',
          'A día de hoy es una cuenta de Twitter donde ponemos en práctica una visión del mundo, sin pensar en monetizar. Teníamos previsto seguir lanzando producto y un token en el futuro.',
        ],
      },
      prod: {
        caption: 'Producto: Team Heretics · 2021—',
        body: [
          'Me encanta la moda. En Team Heretics hice mucho foco en crecer a través de ella, con productos que transmitan la cultura de los videojuegos y se puedan llevar al espacio físico. Con la visión de que en España estaban naciendo marcas icónicas, apostamos por colaborar con ellas y mirar juntos al mundo: Two Jeys (2021), Scrapworld (2021), Belaguer (2022), EME Studios (2023), Kaotico (2023), Warburton (2024) y Esenzia (2026). Gracias a ello aprendimos cómo se crea un producto y un proceso de trabajo para hacer prácticamente cualquier cosa.',
        ],
      },
      hub: {
        caption: 'Team Heretics: HereticsHUB · 2021',
        body: [
          'La experiencia de abrir dos espacios físicos fue muy bestia. Abrimos una tienda en X Madrid y otra en Isla Azul: espacios para juntar a la comunidad, hacer eventos y activaciones, y desvirtualizar la marca. Todo acompañado de una campaña digital, con el apoyo de todos nuestros creadores de contenido, y otra física con soportes en metro, autobuses y espacios por todo Madrid.',
        ],
      },
      c113: {
        caption: 'Co-creador y dirección: Club113 × 113 Sessions · 2022—23',
        body: [
          'Club113 nació desayunando en la cafetería de debajo de la casa de Werlyb, Goorgo y Nil Ojeda. Un podcast de colegas para colegas que durante años fue uno de los más importantes de habla hispana, con frases que acabaron siendo cultura de internet. Lo sacamos adelante in house y con cuatro palos, pero con mucha sensibilidad por el ecosistema: estrategia de clippers desde el minuto uno y buscando esos momentos sin perder la naturalidad.',
          'Creamos 113 Sessions, un espacio musical para artistas emergentes que terminó comprando Samsung y donde pude traer a gente que admiraba.',
        ],
      },
      gl: {
        caption: 'Brand Advisor: GenLayer · 2025—',
        body: [
          'GenLayer quiere ser la corte de internet: una infraestructura de confianza para la era de la IA, en la intersección entre blockchain e inteligencia artificial.',
          'Mi trabajo como advisor es aterrizar la narrativa y traducir un producto complejo a un idioma que la gente entienda y sienta como propio. Campañas para las testnets, hackatones, comunidad internacional y el go-to-market del token.',
        ],
      },
      btn: 'Ver en YouTube',
    },
    allWork: 'Ver portfolio completo',
    socials: 'Sígueme',
    booking: 'Reserva una sesión',
  },
  en: {
    name: 'Alejandro Marcos',
    bio: [
      'I build brand, community and culture through creative strategy. Chief Brand Officer at ',
      { k: 'x:heretics', label: 'Team Heretics' },
      ', and I collaborate on several ',
      { k: 'x:proyectos', label: 'projects' },
      ' as a freelancer.',
    ],
    explore: [
      'Explore ',
      { k: 'x:como-trabajo', label: 'how I work' },
      ', ',
      { k: 'work', label: 'what I’m building' },
      ', ',
      { k: 'x:lo-que-viene', label: 'what’s next' },
      ' and ',
      { k: 'x:origenes', label: 'where it began' },
      '.',
    ],
    place: 'BASED IN MADRID / SPAIN',
    threadsHead: 'A few ideas behind the work.',
    threads: [
      ['A cultural brand ', { k: null, label: 'transcends its product' }, '. It reflects the zeitgeist, a way of being in the world.'],
      ["That's why people identify with it, defend it and ", { k: null, label: 'make it part of who they are' }, '.'],
      ["Most brands don't fail for lack of product, but for lack of ", { k: 'contact', label: 'a clear narrative' }, '. They confuse followers with ', { k: 'contact', label: 'community' }, '.'],
      ['I work across three layers: ', { k: 'contact', label: 'narrative, community and systems' }, '.'],
      ['Two gifts: ', { k: 'book', label: 'my book' }, ' and ', { k: 'library', label: 'a small library' }, '.'],
      ['For longer stories, ', { k: 'blog', label: 'read my blog' }, '.'],
    ],
    workHead: 'A closer look at the work.',
    workAll: 'See all',
    heads: { cv: 'Career.', blog: 'Blog.', contact: "Let's talk." },
    back: 'Work',
    video: 'Watch video',
    download: 'Download free',
    bookCaption: 'Book · Free · PDF',
    bookDesc: 'The art of building communities in the digital era.',
    libCaption: 'Personal library · updated constantly',
    libTitle: 'To create and think better',
    heretics: {
      caption: 'Team Heretics · 2018—',
      title: 'Team Heretics',
      desc: 'From a niche esports brand to a global entertainment reference on the internet.',
      btn: 'See career',
    },
    moreLabel: 'More projects',
    testing: 'In progress',
    soon: {
      caption: 'Chief Brand Officer: Team Heretics · 2018—',
      title: 'Team Heretics',
      desc: 'Team Heretics is part of Heretics Holdings, where I work as Chief Brand Officer of the group. One of the most important esports clubs in the world, with a strong international presence, especially in Europe and Asia.',
      play: 'Play',
      pause: 'Pause',
      soundOn: 'Sound on',
      soundOff: 'Sound off',
      expand: 'Expand',
      pro: {
        caption: 'Content creator and pro player: Machinima · Pain Gaming · 2008—13',
        body: [
          'It all starts in 2008 with Call of Duty and YouTube. National champion and 9th at the 2011 Los Angeles World Championship. I uploaded matches, trips and content series to YouTube.',
          'I signed one of the first Machinima contracts in Spain to monetise my videos, and worked with emerging companies in the digital entertainment industry.',
        ],
      },
      socialnat: {
        caption: 'Marketing Manager: SocialNAT · 2013—15',
        body: [
          'During my university years I worked at SocialNAT, an esports social network that ran online competitions and live events. I handled community building and campaigns with content creators, and was a commentator and host at its events. It was acquired by GAME in 2015.',
        ],
      },
      xyon: {
        caption: 'Co-founder: XYON Agency · 2015—16',
        body: [
          'One of the first agencies specialised in gaming content creators, back when the industry was barely professionalised. We ran campaigns and deals with major brands, but we didn’t manage to scale it.',
        ],
      },
      game: {
        caption: 'Head of Publishers, Talents & Esports: GAME · 2015—16',
        body: [
          'At GAME I led relationships with international publishers, content creators and esports teams. At 24 I ran the activations and content for Madrid Gaming Experience (+120K attendees), Barcelona Games World and Fun & Serious Bilbao, which included producing events like «El Gran Desafío» and even hosting them in front of thousands of people.',
        ],
      },
      cm: {
        caption: 'Brand Manager Iberia: Cooler Master · 2017—19',
        body: [
          'For a year and a half I worked as Brand Manager for Iberia at Cooler Master, one of the most prestigious and recognised PC hardware brands in the world.',
          'It was the first gaming brand in Spain with an ambassador team made up of content creators: IamCristinini, BlackEspanolito and UnBoxMe. We grew the brand’s revenue 50% YoY.',
        ],
      },
      mv: {
        caption: 'Producer and host: Movistar · 2017',
        body: [
          'I worked as a producer and host on Movistar’s first gaming and esports TV channel. On the network’s most expensive set, producing high-quality pieces every week, travelling and covering the whole industry. Being on camera was fun, but I wouldn’t do it again.',
        ],
      },
      zh: {
        caption: 'Co-founder: Zhander App × Algodón · 2020—23',
        body: [
          'Zhander was born to digitise the role of the nightlife promoter: an app to discover the best clubs, pubs and bars, compare prices and promotions, and buy tickets with perks. The founding team included Nil Ojeda, Paula Gonu, byCalitos, Hamza, Werlyb, Goorgo, Zulu and Alex Chiner.',
          'We launched our own party, Algodón, with the Antídoto collective. Unfortunately, the pandemic cancelled our contracts and we tried to pivot the model, without success.',
        ],
      },
      julio: {
        caption: 'Co-founder: JULIO · Meme Corp · 2025',
        body: [
          'JULIO is the philosophy and brand of living fully: the first Spanish-speaking memebrand. Born in 2025 from the Julio Iglesias meme to celebrate the good life and a brighter, funnier, more caring masculinity.',
          'The first drop sold out in 30 minutes: we made it with MITO, the AI video platform, for the content, and with Maxi for the product.',
          'Today it is a Twitter account where we put a worldview into practice, without thinking about monetising. We planned to keep launching products and a token in the future.',
        ],
      },
      prod: {
        caption: 'Product: Team Heretics · 2021—',
        body: [
          'I love fashion. At Team Heretics I put a lot of focus on growing through it, with products that carry gaming culture and can be taken into the physical world. Seeing that iconic brands were being born in Spain, we chose to collaborate with them and look at the world together: Two Jeys (2021), Scrapworld (2021), Belaguer (2022), EME Studios (2023), Kaotico (2023), Warburton (2024) and Esenzia (2026). Thanks to this we learned how a product is made, and a working process to build practically anything.',
        ],
      },
      hub: {
        caption: 'Team Heretics: HereticsHUB · 2021',
        body: [
          'Opening two physical spaces was a wild experience. We opened stores in X Madrid and Isla Azul: places to bring the community together, host events and activations, and take the brand offline. All backed by a digital campaign, supported by all our content creators, and an outdoor one with ads on the metro, buses and spaces across Madrid.',
        ],
      },
      c113: {
        caption: 'Co-creator and direction: Club113 × 113 Sessions · 2022—23',
        body: [
          'Club113 was born over breakfast at the café below the flat Werlyb, Goorgo and Nil Ojeda shared. A podcast by friends, for friends, that for years was one of the biggest in the Spanish-speaking world, with lines that became internet culture. We built it in-house on a shoestring, but with a real feel for the ecosystem: a clipper strategy from day one, chasing those moments without losing the naturalness.',
          'We created 113 Sessions, a music space for emerging artists that Samsung ended up buying, and where I got to bring in people I admired.',
        ],
      },
      gl: {
        caption: 'Brand Advisor: GenLayer · 2025—',
        body: [
          'GenLayer wants to be the court of the internet: trust infrastructure for the AI era, at the intersection of blockchain and artificial intelligence.',
          'My work as an advisor is to ground the narrative and translate a complex product into a language people understand and feel is their own. Campaigns for the testnets, hackathons, international community and the token go-to-market.',
        ],
      },
      btn: 'Watch on YouTube',
    },
    allWork: 'See full portfolio',
    socials: 'Follow',
    booking: 'Book a session',
  },
};

const SOCIALS = [
  { label: 'X', href: 'https://x.com/alejandrosdow' },
  { label: 'Instagram', href: 'https://instagram.com/alejandrosdow' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/alejandromarcosmoraga' },
  { label: 'Substack', href: SUBSTACK },
];

const TINTS = ['tint-lilac', 'tint-sky', 'tint-peach', 'tint-mint', 'tint-rose', 'tint-lime'];
const yt = (id) => `https://www.youtube.com/watch?v=${id}`;
const firstSentence = (s = '') => {
  const m = s.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : s).trim();
};

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
      { threshold: 0.08 }
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

// Console-style loading ring (lime, spinning) above the portrait.
function Loader() {
  return <span className="loader" role="img" aria-label="loading" />;
}

// Renders ['text', {k, label}, ...] — keyed parts become grey inline links.
function Rich({ parts, act }) {
  return parts.map((p, i) => {
    if (typeof p === 'string') return <React.Fragment key={i}>{p}</React.Fragment>;
    if (p.b) return <strong key={i} style={{ fontWeight: 600, color: 'var(--ink)' }}>{p.b}</strong>;
    if (!p.k) return <span key={i} className="muted">{p.label}</span>;
    if (p.k === 'library') return <a key={i} href="/biblioteca" className="ilink">{p.label}</a>;
    const href = p.k.startsWith('x:') ? `#ideas/${p.k.slice(2)}` : p.k === 'work' ? '#work-top' : `/?go=${p.k}`;
    return (
      <a
        key={i}
        href={href}
        className="ilink"
        onClick={(e) => {
          e.preventDefault();
          act(p.k);
        }}
      >
        {p.label}
      </a>
    );
  });
}

function Btn({ href, onClick, children, variant = '', external }) {
  const cls = `btn ${variant}`;
  const arrow = (
    <svg className="arr" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      {external ? (
        <path d="M2.5 7.5 7.5 2.5M3.5 2.5h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M1.5 5h7M5.5 2 8.5 5 5.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {children} {arrow}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children} {arrow}
    </button>
  );
}

// =============================================
// PAGE
// =============================================
export default function Page() {
  const [route, setRoute] = useState('home');
  const [lang, setLang] = useState('es');
  const workRef = useRef(null);

  useEffect(() => {
    const browserLang = (typeof navigator !== 'undefined' && navigator.language) || 'es';
    setLang(browserLang.toLowerCase().startsWith('es') ? 'es' : 'en');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // /?go=cv|blog|contact deep links (used by the standalone pages)
  useEffect(() => {
    const go = new URLSearchParams(window.location.search).get('go');
    if (go && ['home', 'cv', 'blog', 'contact'].includes(go)) {
      setRoute(go);
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const [thread, setThread] = useState(null);
  const threadsRef = useRef(null);

  // #ideas/<slug> deep links
  useEffect(() => {
    const read = () => {
      const m = window.location.hash.match(/^#ideas\/([\w-]+)/);
      const slug = m && THREADS[m[1]] ? m[1] : null;
      setThread(slug);
      if (slug && !window.matchMedia('(min-width: 1024px)').matches) {
        setTimeout(() => threadsRef.current?.scrollIntoView({ block: 'start' }), 60);
      }
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  const t = I18N[lang];
  const u = UI[lang];
  const ti = THREADS_INTRO[lang];

  const openThread = (slug) => {
    setThread(slug);
    window.history.replaceState({}, '', slug ? `#ideas/${slug}` : window.location.pathname);
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) setRoute('home');
    if (!slug && !isDesktop) return; // closing a thread on mobile: let the caller decide the scroll
    requestAnimationFrame(() => {
      if (isDesktop) threadsRef.current?.scrollTo({ top: 0, behavior: 'instant' });
      else threadsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };


  const go = (r) => {
    setRoute(r);
    requestAnimationFrame(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      if (isDesktop) workRef.current?.scrollTo({ top: 0, behavior: 'instant' });
      else window.scrollTo({ top: r === 'home' ? 0 : (workRef.current?.offsetTop ?? 0), behavior: 'instant' });
    });
  };

  // inline-link actions
  const act = (k) => {
    if (k.startsWith('x:')) return openThread(k.slice(2));
    if (k === 'work') {
      setRoute('home');
      requestAnimationFrame(() => {
        const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
        if (isDesktop) workRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        else workRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }
    go(k);
  };

  const onHome = route === 'home';

  return (
    <>
      <div className="shell">
        {/* ============ COLUMN 1 — identity ============ */}
        <aside className="col col-identity">
          <header className="col-head">
            <a
              href="/"
              className="ilink"
              style={{ textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                openThread(null);
                go('home');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
            >
              {u.name}
            </a>
          </header>
          <div className="col-body" style={{ paddingTop: 8 }}>
            <div className="rise">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: -6, position: 'relative', zIndex: 1 }}>
                <Loader />
              </div>
              <div className="media" style={{ aspectRatio: '1 / 1' }}>
                <img src="/assets/foto-alejandro.jpg" alt="Alejandro Marcos" />
              </div>
              <div className="t-caption" style={{ marginTop: 8 }}>{u.place}</div>
            </div>
            <div className="flow rise" style={{ marginTop: 32, animationDelay: '80ms' }}>
              <p><Rich parts={u.bio} act={act} /></p>
              <p><Rich parts={u.explore} act={act} /></p>
            </div>
            <div className="t-small rise" style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: '4px 16px', animationDelay: '140ms' }}>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="ilink">{s.label}</a>
              ))}
            </div>
          </div>
        </aside>

        {/* ============ COLUMN 2 — threads (desktop always, mobile only on home) ============ */}
        <section ref={threadsRef} className={`col col-threads ${onHome ? '' : 'max-lg:hidden'}`}>
          <header className="col-head ruled">
            {thread ? (
              <h2 className="t-title" style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <button type="button" className="ilink" onClick={() => openThread(null)}>{ti.crumb}</button>
                <span className="faint" style={{ margin: '0 8px' }}>/</span>
                {THREADS[thread][lang].title}
              </h2>
            ) : (
              <h2 className="t-title">{ti.head}</h2>
            )}
          </header>
          {thread ? (
            <ThreadView key={`${thread}-${lang}`} slug={thread} lang={lang} t={t} act={act} back={ti.back} onBack={() => openThread(null)} />
          ) : (
            <div key={`intro-${lang}`} className="col-body flow route-in">
              {ti.paras.map((parts, i) => (
                <p key={i}><Rich parts={parts} act={act} /></p>
              ))}
              <div style={{ paddingTop: 8 }}>
                <Btn href={CALENDLY} external variant="btn-accent">{u.booking}</Btn>
              </div>
            </div>
          )}
        </section>

        {/* ============ COLUMN 3 — work / routes ============ */}
        <main ref={workRef} className="col col-work" id="work-top">
          <header className="col-head ruled">
            <h1 className="t-title">{onHome ? u.workHead : u.heads[route]}</h1>
            {onHome ? (
              WORK_PREVIEW ? <a href="/portfolio" className="ilink">{u.workAll}</a> : <span className="t-caption">{u.testing}</span>
            ) : (
              <button type="button" className="ilink" onClick={() => go('home')}>← {u.back}</button>
            )}
          </header>
          <div key={`${route}-${lang}`} className="col-body route-in">
            {route === 'home' && (WORK_PREVIEW ? <Work t={t} u={u} lang={lang} go={go} /> : <WorkSoon u={u} />)}
            {route === 'cv' && <CV t={t} />}
            {route === 'blog' && <Blog t={t} />}
            {route === 'contact' && <Contact t={t} u={u} />}
            <footer className="t-caption" style={{ marginTop: 96, paddingTop: 16, borderTop: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <span>alejandrosdow</span>
              <span className="tnum">{t.footer.copy}</span>
            </footer>
          </div>
        </main>
      </div>

      <Dock
        lang={lang}
        setLang={setLang}
        active={thread === 'libro' ? 'book' : route}
        onNavigate={(id) => (id === 'book' ? openThread('libro') : (openThread(null), go(id)))}
      />
    </>
  );
}

// =============================================
// THREAD (middle column essay)
// =============================================
function ThreadView({ slug, lang, t, act, back, onBack }) {
  const th = THREADS[slug];
  const c = th[lang];
  return (
    <div className="col-body route-in">
      {th.image && (
        <figure style={{ margin: '0 0 16px' }}>
          <div className="media" style={{ aspectRatio: th.aspect || '1 / 1' }}>
            <img src={th.image} alt={c.caption || c.title} />
          </div>
          {c.caption && <figcaption className="t-caption" style={{ marginTop: 8 }}>{c.caption}</figcaption>}
        </figure>
      )}
      {th.book && (
        <div className="media" style={{ aspectRatio: '4 / 3', marginBottom: 16 }}>
          <img src="/assets/hilos/internet-surfer-cover-43.jpg" alt="Internet Surfer" width="1200" height="900" />
        </div>
      )}
      <div className="flow">
        {c.body.map((parts, i) => (
          <p key={i}><Rich parts={parts} act={act} /></p>
        ))}
        {th.book && (
          <>
            <ol className="t-small" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 4 }}>
              {t.home.bookBullets.map((b, i) => (
                <li key={i} className="muted" style={{ display: 'flex', gap: 12 }}>
                  <span className="faint tnum meta">{String(i + 1).padStart(2, '0')}</span>{b}
                </li>
              ))}
            </ol>
            {/* Download button — restore when public/assets/internet-surfer.pdf exists:
            <div>
              <a href="/assets/internet-surfer.pdf" download="Internet-Surfer-Alejandro-Marcos.pdf" className="btn btn-accent">
                {t.home.bookCTA} <span className="arr" aria-hidden>↓</span>
              </a>
            </div> */}
          </>
        )}
        {c.close && <p><Rich parts={c.close} act={act} /></p>}
        <p className="t-small">
          <button type="button" className="ilink" onClick={onBack}>← {back}</button>
        </p>
      </div>
    </div>
  );
}

// Self-hosted video with minimal custom controls (no YouTube chrome).
function ClipPlayer({ src, poster, label, t, noAudio = false }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    const el = wrapRef.current;
    if (!v || !el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) userPaused.current = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) v.play().catch(() => {});
        else if (!entry.isIntersecting) v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };
  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) {
      document.querySelectorAll('.clip video').forEach((o) => {
        if (o !== v) o.muted = true;
      });
    }
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    }
  };
  const expand = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
  };

  return (
    <div ref={wrapRef} className="media clip" style={{ aspectRatio: '16 / 9', background: '#111' }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onClick={toggle}
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
      />
      <div className="clip-controls">
        <button type="button" className="clip-btn" onClick={toggle}>{playing ? t.pause : t.play}</button>
        {!noAudio && (
          <button type="button" className="clip-btn" onClick={toggleSound}>{muted ? t.soundOn : t.soundOff}</button>
        )}
        <button type="button" className="clip-btn" onClick={expand}>{t.expand}</button>
      </div>
    </div>
  );
}

// Placeholder for the work column while it is being designed.
function WorkSoon({ u }) {
  const s = u.soon;
  return (
    <div>
      <article>
        <ClipPlayer src="/assets/hilos/heretics-spot-2025.mp4" poster="/assets/hilos/heretics-spot-2025.jpg" label="Team Heretics Spot 2025" t={s} />
        <div className="t-caption" style={{ marginTop: 8 }}>{s.caption}</div>
        <p style={{ marginTop: 16, maxWidth: '62ch' }}>{s.desc}</p>
      </article>

      <article style={{ marginTop: 72 }}>
        <div className="clip-pair">
          <ClipPlayer src="/assets/hilos/genlayer-2.mp4" poster="/assets/hilos/genlayer-2.jpg" label="GenLayer" t={s} />
          <ClipPlayer src="/assets/hilos/genlayer-1.mp4" poster="/assets/hilos/genlayer-1.jpg" label="GenLayer — Agent Tank" t={s} />
        </div>
        <div className="t-caption" style={{ marginTop: 8 }}>{s.gl.caption}</div>
        <div className="flow" style={{ marginTop: 16, maxWidth: '62ch' }}>
          {s.gl.body.map((x, i) => <p key={i}>{x}</p>)}
        </div>
      </article>

      <article style={{ marginTop: 72 }}>
        <div className="media" style={{ aspectRatio: '1800 / 801' }}>
          <img src="/assets/hilos/julio.jpg" alt="JULIO — memebrand" loading="lazy" />
        </div>
        <div className="t-caption" style={{ marginTop: 8 }}>{s.julio.caption}</div>
        <div className="flow" style={{ marginTop: 16, maxWidth: '62ch' }}>
          {s.julio.body.map((x, i) => <p key={i}>{x}</p>)}
        </div>
      </article>

      <article style={{ marginTop: 72 }}>
        <div className="clip-pair">
          <ClipPlayer src="/assets/hilos/club113-1.mp4" poster="/assets/hilos/club113-1.jpg" label="Club113 — mejores momentos" t={s} />
          <ClipPlayer src="/assets/hilos/club113-2.mp4" poster="/assets/hilos/club113-2.jpg" label="113 Sessions powered by Samsung" t={s} />
        </div>
        <div className="t-caption" style={{ marginTop: 8 }}>{s.c113.caption}</div>
        <div className="flow" style={{ marginTop: 16, maxWidth: '62ch' }}>
          {s.c113.body.map((x, i) => <p key={i}>{x}</p>)}
        </div>
      </article>

      <article style={{ marginTop: 72 }}>
        <div className="clip-pair">
          <ClipPlayer src="/assets/hilos/heretics-belaguer.mp4" poster="/assets/hilos/heretics-belaguer.jpg" label="Heretics × Belaguer" t={s} />
          <ClipPlayer src="/assets/hilos/heretics-warburton.mp4" poster="/assets/hilos/heretics-warburton.jpg" label="Heretics × Warburton" t={s} />
        </div>
        <div className="clip-pair" style={{ marginTop: 4 }}>
          <div className="media" style={{ aspectRatio: '3 / 2' }}>
            <img src="/assets/hilos/heretics-anillo.jpg" alt="Anillo Team Heretics" loading="lazy" />
          </div>
          <div className="media" style={{ aspectRatio: '3 / 2' }}>
            <img src="/assets/hilos/heretics-chaqueta.jpg" alt="Ficha técnica chaqueta Team Heretics" loading="lazy" />
          </div>
        </div>
        <div className="t-caption" style={{ marginTop: 8 }}>{s.prod.caption}</div>
        <div className="flow" style={{ marginTop: 16, maxWidth: '62ch' }}>
          {s.prod.body.map((x, i) => <p key={i}>{x}</p>)}
        </div>
      </article>

      <article style={{ marginTop: 72 }}>
        <ClipPlayer src="/assets/hilos/hub.mp4" poster="/assets/hilos/hub.jpg" label="Heretics se hace real — HereticsHUB" t={s} />
        <div className="t-caption" style={{ marginTop: 8 }}>{s.hub.caption}</div>
        <div className="flow" style={{ marginTop: 16, maxWidth: '62ch' }}>
          {s.hub.body.map((x, i) => <p key={i}>{x}</p>)}
        </div>
      </article>

      <article style={{ marginTop: 72 }}>
        <div className="clip-pair">
          <div className="media" style={{ aspectRatio: '16 / 10' }}>
            <img src="/assets/hilos/zhander.jpg" alt="Zhander App" loading="lazy" />
          </div>
          <div className="media" style={{ aspectRatio: '16 / 10' }}>
            <img src="/assets/hilos/algodon.jpg" alt="Algodón" loading="lazy" />
          </div>
        </div>
        <div className="t-caption" style={{ marginTop: 8 }}>{s.zh.caption}</div>
        <div className="flow" style={{ marginTop: 16, maxWidth: '62ch' }}>
          {s.zh.body.map((x, i) => <p key={i}>{x}</p>)}
        </div>
      </article>

      <article style={{ marginTop: 72 }}>
        <ClipPlayer src="/assets/hilos/coolermaster.mp4" poster="/assets/hilos/coolermaster.jpg" label="Team Cooler Master" t={s} />
        <div className="t-caption" style={{ marginTop: 8 }}>{s.cm.caption}</div>
        <div className="flow" style={{ marginTop: 16, maxWidth: '62ch' }}>
          {s.cm.body.map((x, i) => <p key={i}>{x}</p>)}
        </div>
      </article>

      <article style={{ marginTop: 72 }}>
        <ClipPlayer src="/assets/hilos/movistar.mp4" poster="/assets/hilos/movistar.jpg" label="Actualidad eSports — Movistar" t={s} />
        <div className="t-caption" style={{ marginTop: 8 }}>{s.mv.caption}</div>
        <div className="flow" style={{ marginTop: 16, maxWidth: '62ch' }}>
          {s.mv.body.map((x, i) => <p key={i}>{x}</p>)}
        </div>
      </article>

      <article style={{ marginTop: 72 }}>
        <ClipPlayer src="/assets/hilos/game-mgx.mp4" poster="/assets/hilos/game-mgx.jpg" label="Madrid Gaming Experience 2016" t={s} />
        <div className="t-caption" style={{ marginTop: 8 }}>{s.game.caption}</div>
        <div className="flow" style={{ marginTop: 16, maxWidth: '62ch' }}>
          {s.game.body.map((x, i) => <p key={i}>{x}</p>)}
        </div>
      </article>

      <article style={{ marginTop: 72 }}>
        <div className="media" style={{ aspectRatio: '1600 / 932' }}>
          <img src="/assets/hilos/xyon.jpg" alt="Si te ríes pierdes — ZellenDust" loading="lazy" />
        </div>
        <div className="t-caption" style={{ marginTop: 8 }}>{s.xyon.caption}</div>
        <div className="flow" style={{ marginTop: 16, maxWidth: '62ch' }}>
          {s.xyon.body.map((x, i) => <p key={i}>{x}</p>)}
        </div>
      </article>

      <article style={{ marginTop: 72 }}>
        <div className="media" style={{ aspectRatio: '1666 / 944' }}>
          <img src="/assets/hilos/socialnat.jpg" alt="SocialNAT en SocialVAT, Bilbao 2015" loading="lazy" />
        </div>
        <div className="t-caption" style={{ marginTop: 8 }}>{s.socialnat.caption}</div>
        <div className="flow" style={{ marginTop: 16, maxWidth: '62ch' }}>
          {s.socialnat.body.map((x, i) => <p key={i}>{x}</p>)}
        </div>
      </article>

      <article style={{ marginTop: 72 }}>
        <div className="media" style={{ aspectRatio: '16 / 9' }}>
          <img src="/assets/hilos/machinima.jpg" alt="Contrato con Machinima, 2011" loading="lazy" />
        </div>
        <div className="t-caption" style={{ marginTop: 8 }}>{s.pro.caption}</div>
        <div className="flow" style={{ marginTop: 16, maxWidth: '62ch' }}>
          {s.pro.body.map((x, i) => <p key={i}>{x}</p>)}
        </div>
      </article>
    </div>
  );
}

// =============================================
// WORK FEED
// =============================================
function WorkItem({ id, caption, title, desc, stat, children, after, actions }) {
  return (
    <Reveal className="work-item">
      <article id={id} style={{ scrollMarginTop: 72 }}>
        {children}
        {caption && <div className="t-caption caption">{caption}</div>}
        <h3 className="t-title">{title}</h3>
        {stat && <div style={{ marginTop: 6 }}><span className="stat tnum">{stat}</span></div>}
        {desc && <p style={{ marginTop: 6 }}>{desc}</p>}
        {after}
        {actions && <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>{actions}</div>}
      </article>
    </Reveal>
  );
}

function statLabel(p, lang) {
  const text = p.metricText?.[lang] || '';
  if (!p.metric) return text || null;
  const n = p.metric.n.toLocaleString(lang === 'es' ? 'es-ES' : 'en-US');
  const num = `${p.metric.pre || ''}${n}${p.metric.post || ''}`;
  return text.includes(num.trim()) ? text : `${num} · ${text}`;
}

function Work({ t, u, lang, go }) {
  const by = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));
  const cap = (p) => `${p.org} · ${p.type[lang]} · ${p.year}`;
  const ninos = by['los-ninos'];
  const club = by['club113'];
  const ckm = by['cool-kids-machine'];
  const orig = by['originals'];
  const shown = new Set(['los-ninos', 'club113', 'cool-kids-machine', 'originals']);
  const more = PROJECTS.filter((p) => !shown.has(p.slug));

  return (
    <div>
      {ninos && (
        <WorkItem
          caption={cap(ninos)}
          title={ninos.title}
          stat={statLabel(ninos, lang)}
          desc={firstSentence(ninos[lang])}
          actions={ninos.videos?.[0] && <Btn href={yt(ninos.videos[0].id)} external>{u.video}</Btn>}
        >
          <div className="media" style={{ aspectRatio: '16 / 10' }}>
            <img src={ninos.media} alt={ninos.title} />
          </div>
        </WorkItem>
      )}

      <WorkItem
        id="book"
        after={
          <ol className="t-small" style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 2 }}>
          {t.home.bookBullets.map((b, i) => (
            <li key={i} className="muted" style={{ display: 'flex', gap: 12 }}>
              <span className="faint tnum meta">{String(i + 1).padStart(2, '0')}</span>{b}
            </li>
          ))}
        </ol>
        }
        caption={u.bookCaption}
        title={t.home.bookTitle1}
        desc={u.bookDesc}
        actions={
          <a href="/assets/internet-surfer.pdf" download="Internet-Surfer-Alejandro-Marcos.pdf" className="btn btn-accent">
            {u.download} <span className="arr" aria-hidden>↓</span>
          </a>
        }
      >
        <div className="media tint-lime" style={{ aspectRatio: '16 / 10', display: 'grid', placeItems: 'center' }}>
          <img
            src="/assets/internet-surfer-cover.png"
            alt={t.home.bookTitle1}
            style={{ width: 'auto', height: '82%', objectFit: 'contain', boxShadow: '0 20px 40px -20px rgba(40,60,0,.45)' }}
          />
        </div>
      </WorkItem>

      {club && (
        <WorkItem
          caption={cap(club)}
          title={club.title}
          stat={statLabel(club, lang)}
          desc={firstSentence(club[lang])}
          actions={club.videos?.map((v) => (
            <Btn key={v.id} href={yt(v.id)} external>{v.label.split('—')[0].trim()}</Btn>
          ))}
        >
          <div className="media" style={{ aspectRatio: '16 / 9' }}>
            <img src={club.mediaExtra} alt={club.mediaExtraLabel || club.title} />
          </div>
        </WorkItem>
      )}

      <WorkItem caption={u.heretics.caption} title={u.heretics.title} desc={u.heretics.desc} actions={<Btn onClick={() => go('cv')}>{u.heretics.btn}</Btn>}>
        <div className="media" style={{ aspectRatio: '3 / 2' }}>
          <img src="/assets/manifesto-bg.png" alt="Team Heretics" loading="lazy" />
        </div>
      </WorkItem>

      {ckm && (
        <WorkItem caption={cap(ckm)} title={ckm.title} desc={ckm.metricText[lang] + '. ' + firstSentence(ckm[lang])}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {ckm.collage.slice(0, 6).map((c, i) => (
              <div key={i} className="media" style={{ aspectRatio: '1 / 1' }}>
                <img src={c.src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </WorkItem>
      )}

      {orig && (
        <WorkItem
          caption={cap(orig)}
          title={orig.title}
          stat={statLabel(orig, lang)}
          desc={firstSentence(orig[lang])}
          actions={orig.videos?.[0] && <Btn href={yt(orig.videos[0].id)} external>{u.video}</Btn>}
        >
          <div className="media media-contain tint-lilac" style={{ aspectRatio: '16 / 9', display: 'grid', placeItems: 'center' }}>
            <img src={orig.titleImg} alt={orig.title} loading="lazy" style={{ width: '46%', height: 'auto' }} />
          </div>
        </WorkItem>
      )}

      <WorkItem
        caption={u.libCaption}
        title={u.libTitle}
        desc={t.home.libDesc}
        actions={<Btn href="/biblioteca">{t.home.libSeeAll}</Btn>}
      >
        <div className="media tint-peach" style={{ padding: '6% 5%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '3%' }}>
            {t.library.map((b) => (
              <a key={b.title} href="/biblioteca" title={`${b.title} — ${b.author}`} style={{ display: 'block', aspectRatio: '2 / 3', overflow: 'hidden', borderRadius: 2, boxShadow: '0 10px 20px -12px rgba(80,30,0,.45)' }}>
                <img src={b.cover} alt={b.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </a>
            ))}
          </div>
        </div>
      </WorkItem>

      {/* compact colour tiles for the rest */}
      <Reveal className="work-item">
        <div className="t-caption" style={{ marginBottom: 8 }}>{u.moreLabel}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 4 }}>
          {more.map((p, i) => {
            const vid = p.video || p.videos?.[0]?.id;
            const Tag = vid ? 'a' : 'div';
            return (
              <Tag
                key={p.slug}
                {...(vid ? { href: yt(vid), target: '_blank', rel: 'noreferrer' } : {})}
                className={`media ${TINTS[i % TINTS.length]}`}
                style={{ padding: 16, minHeight: 148, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}
              >
                <div className="t-caption" style={{ color: 'rgba(0,0,0,.55)' }}>{p.year} · {p.type[lang]}</div>
                <div>
                  <div className="t-title">{p.title} {vid && <span className="t-caption" aria-hidden>↗&#xFE0E;</span>}</div>
                  <div className="t-small" style={{ color: 'rgba(0,0,0,.6)', marginTop: 2 }}>{p.metricText[lang]}</div>
                </div>
              </Tag>
            );
          })}
        </div>
        <div style={{ marginTop: 16 }}>
          <Btn href="/portfolio">{u.allWork}</Btn>
        </div>
      </Reveal>
    </div>
  );
}

// =============================================
// CV
// =============================================
function CV({ t }) {
  return (
    <div>
      <p className="muted" style={{ marginBottom: 48 }}>{t.cv.lead}</p>

      {t.cv.sections.map((sec) => (
        <section key={sec.title} style={{ marginBottom: 56 }}>
          <h2 className="t-title rule-b" style={{ paddingBottom: 8 }}>{sec.title}</h2>
          {sec.items.map((it, i) => (
            <Reveal key={i} delay={Math.min(i * 40, 160)}>
              <div className="rule-b cv-row" style={{ padding: '16px 0', display: 'grid', gridTemplateColumns: '88px 1fr', gap: '4px 16px' }}>
                <div className="faint tnum meta" style={{ paddingTop: 3 }}>{it.date}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span>{it.role}</span>
                    {it.org && <span className="muted">{it.org}</span>}
                  </div>
                  <p className="t-small muted" style={{ marginTop: 4, maxWidth: '62ch' }}>{it.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </section>
      ))}

      <section>
        <h2 className="t-title rule-b" style={{ paddingBottom: 8 }}>{t.cv.docencia}</h2>
        <p className="t-small muted" style={{ margin: '16px 0 24px', maxWidth: '62ch' }}>{t.cv.docenciaDesc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 4 }}>
          {[
            { name: 'ISDI', logo: '/assets/logo-isdi.png' },
            { name: 'ESADE', logo: '/assets/logo-esade.png' },
            { name: 'Nebrija', logo: '/assets/logo-nebrija.png' },
            { name: 'The Core', logo: '/assets/logo-thecore.png' },
            { name: 'UNIE', logo: '/assets/logo-unie.png' },
            { name: 'Mondragon', logo: '/assets/logo-mondragon.png' },
          ].map((s) => (
            <div key={s.name} className="logo-quiet" style={{ height: 72, display: 'grid', placeItems: 'center', background: 'var(--surface-paper)', borderRadius: 2, padding: 16 }}>
              <img src={s.logo} alt={s.name} style={{ maxHeight: 28, maxWidth: '100%', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      </section>

    </div>
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
    <div>
      <p className="muted" style={{ marginBottom: 32, maxWidth: '62ch' }}>{t.blog.lead}</p>

      {status === 'loading' && (
        <div className="t-small faint" style={{ padding: '48px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: 9, background: 'var(--accent)' }} />
          {t.blog.loading}…
        </div>
      )}

      {(status === 'empty' || status === 'error') && (
        <div className="card" style={{ padding: 24 }}>
          {status === 'empty' && <h3 className="t-title">{t.blog.emptyTitle}</h3>}
          <p className="muted" style={{ margin: '4px 0 16px' }}>{status === 'empty' ? t.blog.emptyDesc : t.blog.errorDesc}</p>
          <Btn href={SUBSTACK} external>{status === 'empty' ? t.blog.emptyFollow : t.blog.errorOpen}</Btn>
        </div>
      )}

      {status === 'ready' && (
        <div style={{ borderTop: '1px solid var(--rule)' }}>
          {posts.map((p, i) => (
            <Reveal key={i} delay={Math.min(i * 40, 160)}>
              <a href={p.link} target="_blank" rel="noreferrer" className="rule-b post-row" style={{ display: 'block', padding: '20px 0' }}>
                <div className="t-caption tnum">
                  {p.date} · {p.read} {t.blog.readMin}{p.tag ? ` · ${p.tag}` : ''}
                </div>
                <h2 className="t-title" style={{ marginTop: 4 }}>
                  <span className="ilink" style={{ color: 'var(--ink)' }}>{p.title}</span>
                </h2>
                <p className="t-small muted" style={{ marginTop: 4, maxWidth: '62ch' }}>{p.excerpt}…</p>
              </a>
            </Reveal>
          ))}
        </div>
      )}

      <section className="card" style={{ padding: 24, marginTop: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Spark small className="" />
          <h3 className="t-title">{t.blog.subTitle}</h3>
        </div>
        <p className="muted" style={{ margin: '4px 0 16px' }}>{t.blog.subDesc}</p>
        <Btn href={SUBSTACK} external variant="btn-ink">{t.blog.subBtn}</Btn>
      </section>
    </div>
  );
}

// =============================================
// CONTACT
// =============================================
function Contact({ t, u }) {
  const c = t.contact;
  return (
    <div>
      <div className="flow">
        <p style={{ maxWidth: '62ch' }}>
          {c.lead} <span style={{ background: 'var(--tint-lime)', padding: '0 4px', borderRadius: 2 }}>{c.leadEmph}</span>
        </p>
        <p style={{ maxWidth: '62ch' }}>
          {c.roleA}<span className="muted">{c.roleB}</span>{c.roleC}
        </p>
        <p className="muted" style={{ maxWidth: '62ch' }}>{c.workIntro}</p>
        <p style={{ maxWidth: '62ch' }}>{c.workIntroHighlight}</p>
      </div>

      <div style={{ margin: '48px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 4 }}>
        {c.pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 60}>
            <div className={`media ${['tint-lime', 'tint-lilac', 'tint-sky'][i]}`} style={{ padding: 16, height: '100%' }}>
              <div className="t-caption tnum" style={{ color: 'rgba(0,0,0,.5)' }}>{String(i + 1).padStart(2, '0')}</div>
              <h3 className="t-title" style={{ marginTop: 24 }}>{p.title}</h3>
              <p className="t-small" style={{ color: 'rgba(0,0,0,.62)', marginTop: 4 }}>{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="t-small muted" style={{ maxWidth: '62ch', paddingLeft: 12, borderLeft: '2px solid var(--accent)' }}>{c.workNote}</p>

      <section style={{ marginTop: 56, padding: 24, borderRadius: 2, background: 'var(--ink)', color: '#f5f5f5' }}>
        <div className="t-caption" style={{ color: 'var(--accent)' }}>{c.sessionLabel}</div>
        <h2 className="t-title" style={{ marginTop: 4 }}>{c.sessionTitle}</h2>
        <p style={{ color: '#a8a8a8', margin: '4px 0 20px', maxWidth: '56ch' }}>{c.sessionLead}</p>
        <Btn href={CALENDLY} external variant="btn-accent">{c.sessionBtn}</Btn>
      </section>
    </div>
  );
}
