'use client';

import React, { useState, useEffect, useRef } from 'react';

// =============================================
// alejandrosdow.com — v0.4
// editorial + terminal + memepunk + i18n
// =============================================

// ============ I18N DICTIONARY ============
const I18N = {
  es: {
    nav: { home: 'Home', cv: 'Trayectoria', blog: 'Blog', contact: 'Contacto' },
    facts: [
      "el 9º puesto en el mundial de cod los ángeles 2011 cambió mi vida",
      "llevo 18 años trabajando profesionalmente en internet",
      "fui uno de los primeros contratos de machinima en españa",
      "team heretics pasó de marca de nicho a top global en 8 años",
      "doy clase en isdi, esade, nebrija, the core, unie y mondragon",
      "julio (memebrand) hizo sold out en 30 minutos",
      "el concepto \"los niños\" no nació en un brainstorming, nació en un vlog",
      "viví el boom de los esports en españa desde dentro",
      "creo que la diferencia entre audiencia y comunidad es quién habla cuando tú callas",
      "esta web está hecha a mano, sin templates, sin tracking, sin cookies"
    ],
    factPrefix: "dato",
    statusLeft: "escribiendo desde madrid",
    weatherLine: "madrid · 19°c · cielos despejados",
    marqueeTop: [
      'now → construyendo team heretics como marca global',
      'reading → status & culture, w. david marx',
      'listening → arca, KICK i',
      'eating → pulpo a la gallega en barriada',
      'last drop → julio sold out en 30 min',
      'mood → cautiously optimistic',
      'currently building → esta web que estás leyendo',
    ],
    marqueeBottom: ['◆◆◆ internet surfer since 2008 ◆◆◆', '◆◆◆ marca · comunidad · narrativa ◆◆◆', '◆◆◆ hand-coded with love en madrid ◆◆◆'],
    home: {
      kicker: 'file://home/index.html — cargando',
      title1: 'Construyo',
      title2: 'marcas',
      title3: 'culturales',
      title4: 'en internet',
      lead: 'Soy',
      leadName: 'Alejandro Marcos,',
      leadDesc: 'CMO de Team Heretics. Trabajo en la intersección entre entretenimiento, tecnología y cultura digital.',
      sub: 'Aquí te dejo dos regalos:',
      subA: 'mi libro',
      subAnd: 'y',
      subB: 'una pequeña biblioteca',
      hintCV: '▸ para la trayectoria completa, pulsa Trayectoria arriba',
      hintBlog: '▸ para artículos sin filtro, blog',
      photoLabel: 'alejandro · 2026',
      stickerNew: '! nuevo libro disponible',
      stickerFree: '★ gratis',
      stickerLib: '★ updated weekly',
      stickerSlots: '! pocos slots/año',
      bookSection: '▸ 01 / libro',
      bookTitle1: 'Internet Surfer',
      bookTitle2: 'el arte de crear',
      bookTitle3: 'comunidades',
      bookTitle4: 'en la',
      bookTitle5: 'era digital',
      bookBullets: [
        '↳ cómo construir comunidades que sobreviven al algoritmo',
        '↳ narrativa, posicionamiento y zeitgeist',
        '↳ los 10 mandamientos para construir marca y comunidad',
        '↳ casos reales de team heretics y proyectos en los que he trabajado',
      ],
      bookCTA: 'descargar gratis [pdf, 2.4mb]',
      bookMeta: '2,841 descargas · sin email gate',
      libSection: '▸ 02 / biblioteca personal',
      libTitle1: 'para crear y pensar',
      libTitle2: 'mejor',
      libSide: ['▸ una biblioteca viva.', '▸ cada libro, una nota de por qué importa.'],
      libDesc: 'Una pequeña biblioteca de libros, recursos y referencias que han formado mi manera de pensar sobre marcas, comunidades e internet. Se actualiza constantemente.',
      libSeeAll: 'ver biblioteca completa →',
      ctaKicker: '▸ end of page · ¿seguimos hablando?',
      ctaTitle1: 'si quieres trabajar conmigo,',
      ctaTitle2: 'hablemos',
      ctaTitle3: '30 minutos',
      ctaBtn: 'reservar sesión gratuita →',
      ctaNote: 'no es una llamada genérica. por mi rol en team heretics, cojo muy pocos proyectos al año.',
    },
    cv: {
      sticker: '★ la versión larga',
      kicker: '▸ /cv · the long version',
      title: 'Trayectoria.',
      lead1: '18 años en internet, esports, marca y comunidad.',
      lead2: 'aquí está todo, sin maquillar.',
      stats: [
        ['18 años', 'en internet profesional'],
        ['8 años', 'como cmo de team heretics'],
        ['9º', 'mundial cod · LA 2011'],
        ['6 escuelas', 'docencia (isdi, esade…)'],
      ],
      docencia: 'Docencia',
      docenciaDesc: 'Marketing digital, construcción de comunidades, estrategia de marca y cultura de internet en algunas de las escuelas más importantes de España.',
      contactTitle: '¿Hablamos?',
      contactSticker: '! disponible',
      contactKicker: '▸ contact',
      contactDesc: 'Si has llegado hasta aquí, probablemente tengamos cosas que hablar.',
      contactBtn: 'reservar 30 min →',
      sections: [
        { num: '01', title: 'Ahora', items: [
          { date: '2018—', role: 'CMO', org: 'Team Heretics', desc: 'Lidero la marca y comunidad global de Team Heretics. De marca de nicho a referencia global del esports, con presencia en Madrid, Berlín y operaciones internacionales.' },
          { date: '2025—', role: 'Brand Advisor', org: 'GenLayer', desc: 'IA + Blockchain. Estrategia de marca para uno de los proyectos más ambiciosos en la intersección de ambas verticales.' },
          { date: '2018—', role: 'Freelance', org: 'Creadores y empresas', desc: 'Narrativa, estrategia, construcción de marca, comunidad y monetización de audiencias. Por mi rol en Heretics, cojo muy pocos proyectos al año.' },
        ]},
        { num: '02', title: 'Empresa', items: [
          { date: '2017—19', role: 'CMO', org: 'Cooler Master Iberia', desc: 'Estrategia, plan y ejecución de marca en España y Portugal para una de las marcas de hardware más reconocidas del sector gaming.' },
          { date: '2016—17', role: 'Productor & Presentador', org: 'Movistar / GAME TV', desc: 'Producción, guion y cara del primer canal de gaming y esports en televisión española.' },
          { date: '2015—16', role: 'Head of Publishers, Talents & Esports', org: 'GAME Stores', desc: 'Gestioné relaciones con publishers internacionales, creadores y equipos. Parte del equipo de Madrid Gaming Experience (+120K asistentes), Barcelona Games World y Fun & Serious Bilbao.' },
          { date: '2013—15', role: 'Marketing Manager', org: 'SocialNAT', desc: 'Gestión de campañas y comunidades digitales. Narrador y cara de la compañía.' },
          { date: '2008—13', role: 'Creador de contenido', org: 'Machinima · LVP · ESL', desc: 'Todo empieza aquí. Uno de los primeros contratos de Machinima en España y colaborador habitual de LVPes y ESL.' },
          { date: '2008—13', role: 'Jugador profesional', org: 'Call of Duty · Pain Gaming', desc: 'Campeón nacional. 9º en el Mundial de Los Ángeles 2011. Uno de los primeros contratos firmados en España como jugador profesional.' },
        ]},
        { num: '03', title: 'Fundador & Inversor', items: [
          { date: '2025', role: 'JULIO', org: 'Memebrand', desc: 'Primera memebrand hispanohablante. Filosofía mediterránea, sold out en 30 minutos del único drop lanzado.' },
          { date: '2024', role: 'SCALELAB', org: 'Fundador', desc: 'Ciclo completo para creadores: producto, plataforma, marketing y equipos de ventas.' },
          { date: '2020—23', role: 'Zhander App', org: 'Fundador', desc: 'App de ocio nocturno para digitalizar el rol del PR. Evento propio "Algodón" con Antídoto.' },
          { date: '2020', role: 'OLAGG', org: 'Inversor', desc: 'Inversor minoritario. Apuesta early en blockchain, gaming y esports.' },
          { date: '2015—16', role: 'XYON Agency', org: 'Fundador', desc: 'Agencia de gaming y management de creadores en España.' },
        ]},
      ],
    },
    blog: {
      sticker: '★ nuevo cada semana',
      kicker: '▸ /blog · pensamientos sueltos',
      title: 'Blog.',
      lead1: 'Notas, ensayos cortos y observaciones sobre marca, comunidad e internet.',
      lead2: 'sincronizado con mi substack.',
      readMin: 'min lectura',
      reads: 'lecturas',
      readMore: 'leer en substack →',
      subKicker: '▸ subscribe',
      subTitle1: 'si te interesa,',
      subTitle2: 'suscríbete.',
      subDesc: 'sin spam, sin secuencias, sin venta agresiva. solo cuando tengo algo que decir.',
      subBtn: 'suscribirse en substack →',
      subStat: '~2,400 suscriptores',
      subGrowth: '▲ +47 esta semana',
    },
    posts: [
      { date: '2026.05.18', read: 6, tag: 'Comunidad', views: '4.2k', title: 'la diferencia entre audiencia y comunidad es quién habla cuando tú callas.', excerpt: 'Pasamos demasiado tiempo midiendo seguidores y muy poco preguntándonos qué pasa en los grupos de WhatsApp, los discords y las DMs cuando la cuenta oficial no publica nada...' },
      { date: '2026.04.30', read: 4, tag: 'Marca', views: '2.8k', title: 'por qué el pink se convirtió en activo cultural para heretics.', excerpt: 'En 2024 hicimos una semana entera vestida de rosa. Lo que parecía una broma terminó siendo un mecanismo de recall asociado a nuestro skin de team capsule. Cómo funcionó y por qué...' },
      { date: '2026.03.12', read: 9, tag: 'Esports', views: '7.1k', title: 'los niños: anatomía de un concepto que se convirtió en marca.', excerpt: 'No nació en un brainstorming. Nació en un vlog. Y de ahí saltó a TikTok, a memes, a vídeos virales en China. Cómo identificas qué frase pegará y cuál no...' },
      { date: '2026.02.04', read: 5, tag: 'Internet', views: '3.5k', title: 'las memebrands no son una moda. son la forma natural del consumer ahora.', excerpt: 'JULIO se agotó en 30 minutos. No es magia, es producto + narrativa + timing. Cómo construir una memebrand sin parecer ridículo intentándolo...' },
    ],
    library: [
      { title: 'El Acto de Crear', author: 'Rick Rubin', note: 'Sobre creatividad como manera de estar en el mundo. Te recoloca lo importante: la atención, la curiosidad, escuchar lo que el trabajo te pide.', tag: 'Creatividad · 2023', rating: '★★★★★', cover: '/assets/book-acto-de-crear.webp' },
      { title: 'Hitmakers', author: 'Ana Andjelic', note: 'Cómo las marcas influyen en la cultura y por qué los hits no son accidentes. Lectura obligatoria si construyes marca hoy.', tag: 'Branding · 2024', rating: '★★★★★', cover: '/assets/book-hitmakers.webp' },
      { title: 'Buena Estrategia, Mala Estrategia', author: 'Richard P. Rumelt', note: 'El libro que más me ha cambiado la forma de pensar en negocio. Distingue entre estrategia real y palabras vacías con autoridad.', tag: 'Estrategia · 2011', rating: '★★★★★', cover: '/assets/book-buena-mala-estrategia.webp' },
      { title: 'El Problema de los Tres Cuerpos', author: 'Cixin Liu', note: 'Ciencia ficción china que te explota la cabeza. Cuando construyes marcas necesitas ficción para imaginar futuros, y este libro entrena ese músculo.', tag: 'Ficción · 2008', rating: '★★★★★', cover: '/assets/book-tres-cuerpos.webp' },
      { title: 'El Punto Clave', author: 'Malcolm Gladwell', note: 'El libro que en su día explicó por qué las cosas se vuelven virales. Sigue siendo la base para entender cómo se propagan ideas y marcas.', tag: 'Cultura · 2000', rating: '★★★★', cover: '/assets/book-punto-clave.webp' },
      { title: 'Made in Japan', author: 'Akio Morita', note: 'La autobiografía del fundador de Sony. Cómo se construye una empresa desde cero con visión cultural a largo plazo. Atemporal.', tag: 'Negocio · 1986', rating: '★★★★★', cover: '/assets/book-made-in-japan.webp' },
    ],
    contact: {
      sticker: '★ disponible',
      kicker: '▸ /contacto · trabajemos juntos',
      title: 'Contacto.',
      lead1: 'Construimos marca, comunidad y narrativa para proyectos que quieren ir más allá del paid media.',
      lead2: 'aquí abajo: cómo trabajo y para quién.',
      workKicker: '// en qué trabajo',
      workIntro1: 'La mayoría de las marcas no fallan por falta de producto o contenido. Fallan por falta de narrativa clara. Confunden seguidores con comunidad y recurren al paid media para compensar lo que no logran construir de forma orgánica.',
      workIntro2: 'Creen que el problema es llegar. Pero el problema no es la visibilidad.',
      workIntroHighlight: 'El problema es construir algo que la gente entienda, recuerde y quiera hacer suyo.',
      pillars: [
        { title: 'Narrativa', desc: 'Tu posición en el mundo y cómo articularla. Sin narrativa, todo lo demás es ruido.' },
        { title: 'Comunidad', desc: 'Pertenencia, no seguidores. Audiencia que entiende, comparte y defiende tu proyecto.' },
        { title: 'Sistemas', desc: 'Dirección creativa, distribución y crecimiento con estructura para escalar con criterio sin perder el alma.' },
      ],
      workNote: 'Podemos trabajar de tres formas: sesiones individuales, integrándome part-time en tu proyecto o formando un equipo a medida. Por mi rol como CMO en Team Heretics, cojo muy pocos proyectos al año.',
      sessionKicker: '// sesión gratuita',
      sessionTitle: 'Hablemos 30 minutos.',
      sessionLead1: 'No es una llamada genérica. Es una sesión de trabajo real.',
      sessionLead2: 'En 30 minutos identificamos dónde estás, qué no está funcionando y cuáles son los primeros pasos concretos.',
      sessionFor: [
        'Para creadores que quieren escalar y monetizar su comunidad.',
        'Para empresas que necesitan construir relevancia en internet.',
        'Para profesionales que quieren construir marca personal.',
        'Para founders que necesitan convertir su visión en narrativa y estructura.',
        'Para proyectos que buscan estrategia antes de escalar.',
      ],
      sessionBtn: 'agendar sesión gratuita →',
    },
    footer: { copy: '© 2008–2026', made: 'hand-coded en madrid' },
  },
  en: {
    nav: { home: 'Home', cv: 'Career', blog: 'Blog', contact: 'Contact' },
    facts: [
      "9th place at the cod world championship in la 2011 changed my life",
      "i've been working professionally on the internet for 18 years",
      "i was one of the first machinima contracts in spain",
      "team heretics went from niche brand to global top in 8 years",
      "i teach at isdi, esade, nebrija, the core, unie and mondragon",
      "julio (memebrand) sold out in 30 minutes",
      "the \"los niños\" concept wasn't born in a brainstorm — it was born in a vlog",
      "i lived the esports boom in spain from the inside",
      "the difference between an audience and a community is who speaks when you go silent",
      "this site is hand-coded, no templates, no tracking, no cookies"
    ],
    factPrefix: "fact",
    statusLeft: "writing from madrid",
    weatherLine: "madrid · 19°c · clear skies",
    marqueeTop: [
      'now → building team heretics into a global brand',
      'reading → status & culture, w. david marx',
      'listening → arca, KICK i',
      'eating → pulpo a la gallega in barriada',
      'last drop → julio sold out in 30 min',
      'mood → cautiously optimistic',
      'currently building → this website you are reading',
    ],
    marqueeBottom: ['◆◆◆ internet surfer since 2008 ◆◆◆', '◆◆◆ brand · community · narrative ◆◆◆', '◆◆◆ hand-coded with love in madrid ◆◆◆'],
    home: {
      kicker: 'file://home/index.html — loading',
      title1: 'I build',
      title2: 'cultural',
      title3: 'brands',
      title4: 'on the internet',
      lead: "I'm",
      leadName: 'Alejandro Marcos,',
      leadDesc: 'CMO at Team Heretics. I work at the intersection of entertainment, technology and digital culture.',
      sub: 'Here are two gifts for you:',
      subA: 'my book',
      subAnd: 'and',
      subB: 'a small library',
      hintCV: '▸ for the full career, hit Career above',
      hintBlog: '▸ for unfiltered essays, blog',
      photoLabel: 'alejandro · 2026',
      stickerNew: '! new book available',
      stickerFree: '★ free',
      stickerLib: '★ updated weekly',
      stickerSlots: '! few slots/year',
      bookSection: '▸ 01 / book',
      bookTitle1: 'Internet Surfer',
      bookTitle2: 'the art of building',
      bookTitle3: 'communities',
      bookTitle4: 'in the',
      bookTitle5: 'digital era',
      bookBullets: [
        '↳ how to build communities that survive the algorithm',
        '↳ narrative, positioning and zeitgeist',
        '↳ the 10 commandments for building brand and community',
        '↳ real cases from team heretics and projects I\'ve worked on',
      ],
      bookCTA: 'download free [pdf, 2.4mb]',
      bookMeta: '2,841 downloads · no email gate',
      libSection: '▸ 02 / personal library',
      libTitle1: 'to create and think',
      libTitle2: 'better',
      libSide: ['▸ a living library.', '▸ each book, a note on why it matters.'],
      libDesc: 'A small library of books, resources and references that shaped the way I think about brands, communities and the internet. Updated constantly.',
      libSeeAll: 'see full library →',
      ctaKicker: '▸ end of page · shall we keep talking?',
      ctaTitle1: 'if you want to work with me,',
      ctaTitle2: 'let\'s chat for',
      ctaTitle3: '30 minutes',
      ctaBtn: 'book a free session →',
      ctaNote: 'not a generic call. given my role at team heretics, i only take a few projects per year.',
    },
    cv: {
      sticker: '★ the long version',
      kicker: '▸ /cv · the long version',
      title: 'Career.',
      lead1: '18 years in internet, esports, brand and community.',
      lead2: 'it\'s all here, unfiltered.',
      stats: [
        ['18 yrs', 'in professional internet'],
        ['8 yrs', 'as cmo of team heretics'],
        ['9th', 'cod worlds · LA 2011'],
        ['6 schools', 'teaching (isdi, esade…)'],
      ],
      docencia: 'Teaching',
      docenciaDesc: 'Digital marketing, community building, brand strategy and internet culture at some of Spain\'s most respected schools.',
      contactTitle: 'Shall we talk?',
      contactSticker: '! available',
      contactKicker: '▸ contact',
      contactDesc: 'If you made it this far, we probably have things to talk about.',
      contactBtn: 'book 30 min →',
      sections: [
        { num: '01', title: 'Now', items: [
          { date: '2018—', role: 'CMO', org: 'Team Heretics', desc: 'I lead the global brand and community of Team Heretics. From niche brand to global esports reference, with operations in Madrid, Berlin and international.' },
          { date: '2025—', role: 'Brand Advisor', org: 'GenLayer', desc: 'AI + Blockchain. Brand strategy for one of the most ambitious projects at the intersection of both verticals.' },
          { date: '2018—', role: 'Freelance', org: 'Creators and companies', desc: 'Narrative, strategy, brand building, community and audience monetization. Due to my role at Heretics, I take very few projects per year.' },
        ]},
        { num: '02', title: 'Companies', items: [
          { date: '2017—19', role: 'CMO', org: 'Cooler Master Iberia', desc: 'Strategy, plan and execution of brand in Spain and Portugal for one of the most recognized hardware brands in gaming.' },
          { date: '2016—17', role: 'Producer & Host', org: 'Movistar / GAME TV', desc: 'Production, scripting and on-camera for the first gaming and esports channel on Spanish television.' },
          { date: '2015—16', role: 'Head of Publishers, Talents & Esports', org: 'GAME Stores', desc: 'Managed relationships with international publishers, creators and teams. Part of Madrid Gaming Experience team (+120K attendees), Barcelona Games World and Fun & Serious Bilbao.' },
          { date: '2013—15', role: 'Marketing Manager', org: 'SocialNAT', desc: 'Campaign and digital community management. Narrator and face of the company.' },
          { date: '2008—13', role: 'Content creator', org: 'Machinima · LVP · ESL', desc: 'Where it all began. One of the first Machinima contracts in Spain and regular collaborator with LVPes and ESL.' },
          { date: '2008—13', role: 'Pro player', org: 'Call of Duty · Pain Gaming', desc: 'National champion. 9th at the Los Angeles 2011 World Championship. One of the first professional player contracts signed in Spain.' },
        ]},
        { num: '03', title: 'Founder & Investor', items: [
          { date: '2025', role: 'JULIO', org: 'Memebrand', desc: 'First Spanish-speaking memebrand. Mediterranean philosophy, sold out in 30 minutes of its only drop.' },
          { date: '2024', role: 'SCALELAB', org: 'Founder', desc: 'Full cycle for creators: product, platform, marketing and sales teams.' },
          { date: '2020—23', role: 'Zhander App', org: 'Founder', desc: 'Nightlife app digitizing the role of the PR. Own event "Algodón" with Antídoto.' },
          { date: '2020', role: 'OLAGG', org: 'Investor', desc: 'Minority investor. Early bet on blockchain, gaming and esports.' },
          { date: '2015—16', role: 'XYON Agency', org: 'Founder', desc: 'Gaming agency and creator management in Spain.' },
        ]},
      ],
    },
    blog: {
      sticker: '★ new every week',
      kicker: '▸ /blog · loose thoughts',
      title: 'Blog.',
      lead1: 'Notes, short essays and observations on brand, community and the internet.',
      lead2: 'synced with my substack.',
      readMin: 'min read',
      reads: 'reads',
      readMore: 'read on substack →',
      subKicker: '▸ subscribe',
      subTitle1: 'if you like it,',
      subTitle2: 'subscribe.',
      subDesc: 'no spam, no sequences, no aggressive selling. only when i have something to say.',
      subBtn: 'subscribe on substack →',
      subStat: '~2,400 subscribers',
      subGrowth: '▲ +47 this week',
    },
    posts: [
      { date: '2026.05.18', read: 6, tag: 'Community', views: '4.2k', title: 'the difference between an audience and a community is who speaks when you go silent.', excerpt: 'We spend too much time measuring followers and too little asking what happens in the WhatsApp groups, the discords and the DMs when the official account posts nothing...' },
      { date: '2026.04.30', read: 4, tag: 'Brand', views: '2.8k', title: 'why pink became a cultural asset for heretics.', excerpt: 'In 2024 we did a whole week dressed in pink. What looked like a joke ended up being a recall mechanism tied to our team capsule skin. How it worked and why...' },
      { date: '2026.03.12', read: 9, tag: 'Esports', views: '7.1k', title: 'los niños: anatomy of a concept that became a brand.', excerpt: 'It wasn\'t born in a brainstorm. It was born in a vlog. From there it jumped to TikTok, to memes, to viral videos in China. How you spot which phrase will stick and which won\'t...' },
      { date: '2026.02.04', read: 5, tag: 'Internet', views: '3.5k', title: 'memebrands aren\'t a trend. they are the natural shape of consumer now.', excerpt: 'JULIO sold out in 30 minutes. It\'s not magic, it\'s product + narrative + timing. How to build a memebrand without looking ridiculous trying...' },
    ],
    library: [
      { title: 'The Creative Act', author: 'Rick Rubin', note: 'On creativity as a way of being in the world. It re-centers what matters: attention, curiosity, listening to what the work is asking of you.', tag: 'Creativity · 2023', rating: '★★★★★', cover: '/assets/book-acto-de-crear.webp' },
      { title: 'Hitmakers', author: 'Ana Andjelic', note: 'How brands influence culture and why hits aren\'t accidents. Mandatory reading if you build brand today.', tag: 'Branding · 2024', rating: '★★★★★', cover: '/assets/book-hitmakers.webp' },
      { title: 'Good Strategy, Bad Strategy', author: 'Richard P. Rumelt', note: 'The book that changed the way I think about business most. Distinguishes real strategy from authoritative-sounding empty words.', tag: 'Strategy · 2011', rating: '★★★★★', cover: '/assets/book-buena-mala-estrategia.webp' },
      { title: 'The Three-Body Problem', author: 'Cixin Liu', note: 'Chinese sci-fi that blows your mind. When you build brands you need fiction to imagine futures, and this book trains that muscle.', tag: 'Fiction · 2008', rating: '★★★★★', cover: '/assets/book-tres-cuerpos.webp' },
      { title: 'The Tipping Point', author: 'Malcolm Gladwell', note: 'The book that originally explained why things go viral. Still the foundation for understanding how ideas and brands spread.', tag: 'Culture · 2000', rating: '★★★★', cover: '/assets/book-punto-clave.webp' },
      { title: 'Made in Japan', author: 'Akio Morita', note: 'The autobiography of Sony\'s founder. How you build a company from scratch with long-term cultural vision. Timeless.', tag: 'Business · 1986', rating: '★★★★★', cover: '/assets/book-made-in-japan.webp' },
    ],
    contact: {
      sticker: '★ available',
      kicker: '▸ /contact · let\'s work together',
      title: 'Contact.',
      lead1: 'We build brand, community and narrative for projects that want to go beyond paid media.',
      lead2: 'below: how I work and who for.',
      workKicker: '// what I work on',
      workIntro1: 'Most brands don\'t fail because of a product or content problem. They fail because of a clarity problem. They confuse followers with community and lean on paid media to make up for what they can\'t build organically.',
      workIntro2: 'They think the problem is reach. But the problem isn\'t visibility.',
      workIntroHighlight: 'The problem is building something people understand, remember, and want to make their own.',
      pillars: [
        { title: 'Narrative', desc: 'Your position in the world and how to articulate it. Without narrative, everything else is noise.' },
        { title: 'Community', desc: 'Belonging, not followers. An audience that understands, shares and defends your project.' },
        { title: 'Systems', desc: 'Creative direction, distribution and growth with structure to scale with judgment without losing the soul.' },
      ],
      workNote: 'We can work three ways: individual sessions, part-time embedded into your project, or building a team tailored to you. Due to my role as CMO at Team Heretics, I only take a few projects per year.',
      sessionKicker: '// free session',
      sessionTitle: 'Let\'s talk for 30 minutes.',
      sessionLead1: 'Not a generic call. A real working session.',
      sessionLead2: 'In 30 minutes we identify where you are, what\'s not working and the concrete first steps.',
      sessionFor: [
        'For creators who want to scale and monetize their community.',
        'For companies that need to build relevance on the internet.',
        'For professionals who want to build a personal brand.',
        'For founders who need to turn their vision into narrative and structure.',
        'For projects looking for strategy before scale.',
      ],
      sessionBtn: 'book free session →',
    },
    footer: { copy: '© 2008–2026', made: 'hand-coded in madrid' },
  },
};

export default function Page() {
  const [route, setRoute] = useState('home');
  const [lang, setLang] = useState('es');
  const [konami, setKonami] = useState([]);
  const [secretMode, setSecretMode] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [glitchTitle, setGlitchTitle] = useState(false);

  // Auto-detect language on first render
  useEffect(() => {
    const browserLang = (typeof navigator !== 'undefined' && navigator.language) || 'es';
    setLang(browserLang.toLowerCase().startsWith('es') ? 'es' : 'en');
  }, []);

  const t = I18N[lang];

  // Konami easter egg
  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    const handler = (e) => {
      const next = [...konami, e.key].slice(-10);
      setKonami(next);
      if (next.join(',') === seq.join(',')) setSecretMode(s => !s);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [konami]);

  // Mouse trail
  useEffect(() => {
    const handler = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Random glitch
  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.6) {
        setGlitchTitle(true);
        setTimeout(() => setGlitchTitle(false), 120);
      }
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`min-h-screen relative ${secretMode ? 'rotate-180' : ''}`}
      style={{
        background: '#ebe7d9',
        color: '#0a0a0a',
        fontFamily: "'EB Garamond', 'Times New Roman', serif",
        transition: 'transform 0.6s cubic-bezier(.7,0,.3,1)',
        cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><circle cx='10' cy='10' r='2' fill='%23c5f04a' stroke='%230a0a0a' stroke-width='1'/></svg>") 10 10, crosshair`,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@300;400;500;700&family=Instrument+Serif:ital@0;1&display=swap');

        * { -webkit-font-smoothing: antialiased; }

        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .blink { animation: blink 1s infinite; }

        @keyframes scroll-marquee {
          from { transform: translateX(0) }
          to { transform: translateX(-50%) }
        }
        .marquee-track { animation: scroll-marquee 35s linear infinite; }
        .marquee-track-rev { animation: scroll-marquee 50s linear infinite reverse; }

        @keyframes flicker {
          0%, 100% { opacity: 1 }
          45% { opacity: 1 }
          50% { opacity: 0.3 }
          55% { opacity: 1 }
        }
        .flicker { animation: flicker 3s ease-in-out infinite; }

        @keyframes fact-in {
          0% { opacity: 0; transform: translateY(4px) }
          100% { opacity: 1; transform: translateY(0) }
        }
        .fact-in { animation: fact-in 0.5s ease-out; }

        @keyframes glitch-anim {
          0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 1px) }
          20% { clip-path: inset(92% 0 1% 0); transform: translate(1px, -1px) }
          40% { clip-path: inset(43% 0 1% 0); transform: translate(-1px, 1px) }
          60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, -2px) }
          80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, 1px) }
          100% { clip-path: inset(58% 0 43% 0); transform: translate(0) }
        }
        .glitch { position: relative; display: inline-block; }
        .glitch::before, .glitch::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
        }
        .glitch::before { color: #ff0064; animation: glitch-anim 0.3s steps(2) infinite; z-index: -1; }
        .glitch::after { color: #00ffd5; animation: glitch-anim 0.3s steps(2) reverse infinite; z-index: -2; }
        .glitch-active::before, .glitch-active::after { animation-duration: 0.15s !important; }

        @keyframes wobble { 0%,100%{transform:rotate(-0.5deg)} 50%{transform:rotate(0.5deg)} }
        .wobble { animation: wobble 4s ease-in-out infinite; transform-origin: center; }

        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 #c5f04a }
          50% { box-shadow: 0 0 0 4px transparent }
        }
        .pulse-green { animation: pulse-green 1.5s ease-in-out infinite; }

        .scanlines::before {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 3px);
          pointer-events: none;
          z-index: 2;
        }

        .grain::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
          pointer-events: none; opacity: 0.7; z-index: 9998; mix-blend-mode: multiply;
        }

        .ascii-tiny { font-family: 'JetBrains Mono', monospace; font-size: 9px; line-height: 1; color: #999; white-space: pre; }
        .ascii-art { font-family: 'JetBrains Mono', monospace; white-space: pre; line-height: 1; font-size: 8px; letter-spacing: 0; }

        .underline-grow { position: relative; display: inline-block; }
        .underline-grow::after {
          content: ''; position: absolute; left: 0; bottom: -2px;
          width: 0; height: 1px; background: currentColor;
          transition: width 0.4s cubic-bezier(.7,0,.3,1);
        }
        .underline-grow:hover::after { width: 100%; }

        .tab-btn {
          padding: 5px 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid #0a0a0a; background: transparent; color: #0a0a0a;
          transition: all 0.2s;
        }
        @media (min-width: 768px) {
          .tab-btn { padding: 6px 14px; font-size: 11px; }
        }
        .tab-btn:hover { background: #0a0a0a; color: #ebe7d9; transform: rotate(-1deg); }
        .tab-btn.active { background: #c5f04a; color: #0a0a0a; }

        .lang-btn {
          padding: 3px 7px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid #0a0a0a; background: transparent; color: #0a0a0a;
          transition: all 0.15s;
        }
        .lang-btn:hover { background: #0a0a0a; color: #ebe7d9; }
        .lang-btn.active { background: #0a0a0a; color: #c5f04a; }

        .hero-display { font-family: 'Instrument Serif', serif; font-weight: 400; line-height: 0.82; letter-spacing: -0.04em; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .display { font-family: 'Instrument Serif', serif; }

        .card-skewed:hover { transform: rotate(-1.2deg) translateY(-4px) scale(1.01); transition: transform 0.4s cubic-bezier(.7,0,.3,1); }
        .card-tilt { transition: transform 0.4s cubic-bezier(.7,0,.3,1); }
        .card-tilt:hover { transform: rotate(-1deg) translateY(-3px); }

        .number-style { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #ebe7d9; }
        ::-webkit-scrollbar-thumb { background: #0a0a0a; border-radius: 0; }
        ::-webkit-scrollbar-thumb:hover { background: #c5f04a; }

        .sticker {
          position: absolute;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.1em;
          padding: 3px 8px;
          background: #c5f04a; color: #0a0a0a;
          border: 1px solid #0a0a0a;
          box-shadow: 3px 3px 0 #0a0a0a;
          z-index: 10;
        }
        @media (min-width: 768px) {
          .sticker { font-size: 10px; padding: 4px 10px; }
        }

        .selection::selection { background: #c5f04a; color: #0a0a0a; }

        a, button { cursor: inherit; }
        a:hover, button:hover {
          cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><polygon points='0,0 24,12 12,14 8,24' fill='%23c5f04a' stroke='%230a0a0a' stroke-width='1.5'/></svg>") 2 2, pointer;
        }
      `}</style>

      <div className="grain" />

      {/* tiny cursor follower (desktop only) */}
      <div className="fixed pointer-events-none z-[9999] mono text-[9px] uppercase tracking-widest hidden md:block"
        style={{ left: mouse.x + 14, top: mouse.y + 14, opacity: 0.55, color: '#0a0a0a' }}>
        {mouse.x.toString().padStart(4,'0')},{mouse.y.toString().padStart(4,'0')}
      </div>

      {/* ============ TOP BAR — only lang toggle ============ */}
      <header className="border-b-2 border-black" style={{ background: '#ebe7d9' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-end">
          <div className="flex items-center gap-1">
            <button onClick={() => setLang('es')} className={`lang-btn ${lang === 'es' ? 'active' : ''}`}>ES</button>
            <button onClick={() => setLang('en')} className={`lang-btn ${lang === 'en' ? 'active' : ''}`}>EN</button>
          </div>
        </div>
      </header>

      {/* ============ TOP MARQUEE ============ */}
      <div className="border-b-2 border-black overflow-hidden bg-[#0a0a0a] text-[#ebe7d9] relative scanlines">
        <div className="flex marquee-track mono text-[10px] uppercase tracking-[0.25em] py-2 whitespace-nowrap">
          {Array(2).fill(null).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {t.marqueeTop.map((s, i) => (
                <span key={`${k}-${i}`} className="mx-8 flex items-center gap-3">
                  <span className="text-[#c5f04a]">▪</span> {s}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ NAV ============ */}
      <nav className="border-b-2 border-black sticky top-0 z-50 selection" style={{ background: '#ebe7d9' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-2">
          <button onClick={() => setRoute('home')}
            className={`display text-xl md:text-2xl tracking-tight glitch ${glitchTitle ? 'glitch-active' : ''} shrink-0`}
            data-text="alejandrosdow">
            alejandro<span style={{ background: '#c5f04a', padding: '0 4px' }}>sdow</span>
          </button>
          <div className="flex gap-1 md:gap-2 flex-wrap justify-end">
            <button className={`tab-btn ${route==='home'?'active':''}`} onClick={() => setRoute('home')}>{t.nav.home}</button>
            <button className={`tab-btn ${route==='cv'?'active':''}`} onClick={() => setRoute('cv')}>{t.nav.cv}</button>
            <button className={`tab-btn ${route==='blog'?'active':''}`} onClick={() => setRoute('blog')}>{t.nav.blog}</button>
            <button className={`tab-btn ${route==='contact'?'active':''}`} onClick={() => setRoute('contact')}>{t.nav.contact}</button>
          </div>
        </div>
      </nav>

      {route === 'home' && <Home t={t} glitchTitle={glitchTitle} />}
      {route === 'cv' && <CV t={t} />}
      {route === 'blog' && <Blog t={t} />}
      {route === 'contact' && <Contact t={t} />}

      {/* ============ BOTTOM MARQUEE ============ */}
      <div className="border-y-2 border-black overflow-hidden bg-[#c5f04a] text-[#0a0a0a]">
        <div className="flex marquee-track-rev mono text-[11px] font-bold uppercase tracking-[0.2em] py-3 whitespace-nowrap">
          {Array(3).fill(null).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {t.marqueeBottom.map((s, i) => (
                <span key={`m2-${k}-${i}`} className="mx-6">{s}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ FOOTER (compact) ============ */}
      <footer className="bg-[#0a0a0a] text-[#ebe7d9]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-wrap items-center justify-between gap-4 mono text-[10px] uppercase tracking-widest">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[#c5f04a]">@alejandrosdow</span>
            <span className="text-white/30">·</span>
            <a href="https://x.com/alejandrosdow" target="_blank" rel="noreferrer" className="underline-grow">x</a>
            <a href="https://instagram.com/alejandrosdow" target="_blank" rel="noreferrer" className="underline-grow">ig</a>
            <a href="https://linkedin.com/in/alejandromarcosmoraga" target="_blank" rel="noreferrer" className="underline-grow">in</a>
            <a href="https://substack.com/@alejandrosdow" target="_blank" rel="noreferrer" className="underline-grow">substack</a>
          </div>
          <div className="flex items-center gap-3 text-white/40">
            <span>{t.footer.copy}</span>
            <span>·</span>
            <span className="hidden md:inline">{t.footer.made}</span>
            <span className="hidden md:inline">·</span>
            <span className="text-[#c5f04a]"><span className="blink">▮</span> ↑↑↓↓←→←→BA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// =============================================
// HOME
// =============================================
function Home({ t, glitchTitle }) {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-10 md:pb-16 relative">
      <div className="sticker wobble hidden md:block" style={{ top: 90, right: 30, transform: 'rotate(8deg)' }}>{t.home.stickerNew}</div>

      <section className="grid md:grid-cols-12 gap-6 mb-20 md:mb-32 pt-8 md:pt-12">
        <div className="md:col-span-8">
          <div className="mono text-[11px] uppercase tracking-widest text-black/60 mb-6 flex items-center gap-3">
            <span className="text-[#c5f04a]">▸</span> {t.home.kicker}<span className="blink">_</span>
          </div>
          <h1 className={`hero-display text-[clamp(44px,11vw,180px)] mb-8`}>
            <span className={`glitch ${glitchTitle ? 'glitch-active' : ''}`} data-text={t.home.title1}>{t.home.title1}</span><br/>
            <em style={{ color: '#0a0a0a', background: '#c5f04a', padding: '0 16px', fontStyle: 'italic', display: 'inline-block', transform: 'rotate(-1deg)' }}>{t.home.title2}</em><br/>
            {t.home.title3}<br/>
            <span className="mono text-[0.28em] align-top text-black/60">&lt;</span><span style={{ textDecoration: 'underline wavy #c5f04a', textUnderlineOffset: '10px' }}>{t.home.title4}</span><span className="mono text-[0.28em] align-top text-black/60">/&gt;</span>.
          </h1>
          <p className="text-xl md:text-2xl leading-snug max-w-2xl mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
            {t.home.lead} <strong>{t.home.leadName}</strong> {t.home.leadDesc}
          </p>
          <p className="text-lg md:text-xl leading-snug max-w-2xl text-black/70 italic mb-8" style={{ fontFamily: "'EB Garamond', serif" }}>
            {t.home.sub} <span style={{ background: '#c5f04a', padding: '0 4px' }}>{t.home.subA}</span> {t.home.subAnd} <span style={{ background: '#c5f04a', padding: '0 4px' }}>{t.home.subB}</span>.
          </p>
          <p className="mono text-xs text-black/60 max-w-md">
            {t.home.hintCV}<br/>{t.home.hintBlog}
          </p>
        </div>
        <div className="md:col-span-4 relative flex justify-center md:justify-end items-start">
          <div className="bg-white card-skewed relative w-full max-w-[180px] md:max-w-[220px]" style={{ transform: 'rotate(2deg)', marginTop: '20px', padding: '8px 8px 36px 8px', boxShadow: '0 4px 18px rgba(0,0,0,0.12), 0 1px 0 rgba(0,0,0,0.08)' }}>
            <div className="aspect-square bg-[#0a0a0a] relative overflow-hidden scanlines">
              <img
                src="/assets/alejandro-foto.jpg"
                alt="Alejandro Marcos"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'contrast(1.05) saturate(0.95)' }}
              />
              <div className="absolute top-2 left-2 text-[#c5f04a] mono text-[8px] flicker z-10">REC ●</div>
              <div className="absolute bottom-2 right-2 text-[#c5f04a] mono text-[8px] number-style z-10">00:42:13</div>
              <div className="absolute bottom-2 left-2 text-[#c5f04a] mono text-[8px] z-10">ch. 01</div>
            </div>
            <div className="mono text-[9px] uppercase tracking-widest text-black/60 text-center absolute left-0 right-0" style={{ bottom: '12px' }}>
              {t.home.photoLabel}
            </div>
          </div>
        </div>
      </section>

      <AsciiDivider />

      <section className="grid md:grid-cols-12 gap-8 my-16 md:my-32 relative pt-12">
        <div className="sticker" style={{ top: -30, right: 0, transform: 'rotate(-6deg)' }}>{t.home.stickerFree}</div>

        <div className="md:col-span-5">
          <div className="mono text-[11px] uppercase tracking-widest text-black/60 mb-3">{t.home.bookSection}</div>
          <div className="border-2 border-black p-3 bg-white card-skewed max-w-[240px] md:max-w-[340px] mx-auto md:mx-0 relative" style={{ transform: 'rotate(-2deg)' }}>
            <div className="aspect-[3/4] relative overflow-hidden scanlines bg-white">
              <img
                src="/assets/internet-surfer-cover.png"
                alt="Internet Surfer — book cover by Miguel CM"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 w-4 h-4 rounded-full pulse-green z-10" style={{ background: '#c5f04a' }} />
              <div className="absolute bottom-2 left-2 text-[#0a0a0a] mono text-[8px] z-10 bg-[#c5f04a] px-1">2024 · pdf</div>
            </div>
          </div>
        </div>
        <div className="md:col-span-7 flex flex-col justify-center">
          <h2 className="display text-4xl md:text-7xl mb-6 leading-[0.88]">
            <em>{t.home.bookTitle1}</em><br/>
            {t.home.bookTitle2}<br/>
            {t.home.bookTitle3}<br/>
            {t.home.bookTitle4} <span style={{ background: '#c5f04a', padding: '0 8px' }}>{t.home.bookTitle5}</span>.
          </h2>
          <ul className="space-y-1 mb-8 mono text-sm text-black/70">
            {t.home.bookBullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          <div className="flex flex-wrap gap-3 items-center">
            <a href="/assets/internet-surfer.pdf" download="Internet-Surfer-Alejandro-Marcos.pdf" className="inline-flex items-center gap-3 px-6 py-4 bg-[#0a0a0a] text-[#c5f04a] mono text-xs uppercase tracking-widest hover:bg-[#c5f04a] hover:text-[#0a0a0a] transition-colors border-2 border-black">
              {t.home.bookCTA}
              <span className="text-lg">↓</span>
            </a>
            <span className="mono text-[10px] text-black/50">{t.home.bookMeta}</span>
          </div>
        </div>
      </section>

      <AsciiDivider />

      <section className="my-16 md:my-32 relative pt-12">
        <div className="sticker" style={{ top: -30, right: 20, transform: 'rotate(4deg)' }}>{t.home.stickerLib}</div>

        <div className="flex items-end justify-between mb-8 flex-wrap gap-6">
          <div>
            <div className="mono text-[11px] uppercase tracking-widest text-black/60 mb-3">{t.home.libSection}</div>
            <h2 className="display text-4xl md:text-7xl leading-none">
              {t.home.libTitle1}<br/><em style={{ textDecoration: 'underline wavy #c5f04a', textUnderlineOffset: '14px' }}>{t.home.libTitle2}</em>.
            </h2>
          </div>
          <div className="mono text-xs text-black/50 max-w-xs">
            {t.home.libSide.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>

        <p className="text-lg leading-snug max-w-3xl mb-12 text-black/75" style={{ fontFamily: "'EB Garamond', serif" }}>
          {t.home.libDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {t.library.map((b, i) => (
            <article key={i} className="border-2 border-black p-5 bg-white card-skewed relative flex flex-col" style={{ transform: `rotate(${[-0.8, 0.6, -0.5, 0.4, -0.7, 0.5][i]}deg)` }}>
              <div className="flex items-start gap-4 mb-4">
                {b.cover && (
                  <div className="w-[70px] shrink-0 aspect-[2/3] relative overflow-hidden border border-black/20 bg-[#f4f1ea]">
                    <img
                      src={b.cover}
                      alt={`${b.title} — book cover`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="mono text-[10px] text-black/40 number-style border border-black/30 px-2 py-1 inline-block mb-2">{String(i+1).padStart(2,'0')}</div>
                  <h3 className="display text-2xl leading-tight italic mb-1">{b.title}</h3>
                  <div className="mono text-[10px] uppercase tracking-widest text-black/60">{b.author}</div>
                </div>
              </div>
              <p className="text-sm leading-snug text-black/80 flex-1" style={{ fontFamily: "'EB Garamond', serif" }}>{b.note}</p>
              <div className="mono text-[10px] text-black/40 mt-4 uppercase tracking-widest border-t border-black/10 pt-3 flex justify-between">
                <span>{b.tag}</span>
                <span className="text-[#0a0a0a]" style={{ background: '#c5f04a', padding: '0 4px' }}>{b.rating}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="mono text-xs uppercase tracking-widest underline-grow inline-block px-4 py-2 border border-black hover:bg-[#c5f04a]">
            {t.home.libSeeAll}
          </a>
        </div>
      </section>

      <AsciiDivider />

      <section className="my-16 md:my-32 text-center relative pt-12">
        <div className="sticker wobble" style={{ top: -20, left: '50%', transform: 'translateX(-50%) rotate(-8deg)' }}>{t.home.stickerSlots}</div>

        <div className="mono text-[11px] uppercase tracking-widest text-black/60 mb-6">{t.home.ctaKicker}</div>
        <h2 className="display text-4xl md:text-7xl leading-[0.9] max-w-3xl mx-auto mb-8">
          {t.home.ctaTitle1}<br/>
          <em>{t.home.ctaTitle2} <span style={{ background: '#c5f04a', padding: '0 8px' }}>{t.home.ctaTitle3}</span>.</em>
        </h2>
        <a href="https://calendly.com/alejandro-marcos-teamheretics/30min" target="_blank" rel="noreferrer" className="inline-block px-8 py-4 bg-[#0a0a0a] text-[#c5f04a] mono text-xs uppercase tracking-widest hover:bg-[#c5f04a] hover:text-[#0a0a0a] transition-colors border-2 border-black">
          {t.home.ctaBtn}
        </a>
        <div className="mono text-[10px] text-black/40 mt-6 max-w-md mx-auto">{t.home.ctaNote}</div>
      </section>
    </main>
  );
}

// =============================================
// CV
// =============================================
function CV({ t }) {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-10 md:pb-16 relative">
      <div className="sticker" style={{ top: 30, right: 0, transform: 'rotate(6deg)' }}>{t.cv.sticker}</div>

      <div className="mono text-[11px] uppercase tracking-widest text-black/60 mb-6 mt-8">{t.cv.kicker}</div>
      <h1 className="display text-5xl md:text-8xl leading-[0.85] mb-3">{t.cv.title}</h1>
      <p className="display text-2xl italic text-black/60 mb-16 max-w-2xl">
        {t.cv.lead1}<br/>{t.cv.lead2}
      </p>

      {t.cv.sections.map(sec => (
        <section key={sec.title} className="mb-16">
          <div className="flex items-baseline gap-4 mb-6 border-b-2 border-black pb-2">
            <div className="mono text-xs text-black/40 number-style">{sec.num}</div>
            <h2 className="display text-3xl italic">{sec.title}</h2>
            <div className="flex-1 ascii-tiny text-right overflow-hidden">{'·'.repeat(80)}</div>
          </div>
          <div className="space-y-6">
            {sec.items.map((it, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-4 group hover:bg-[#c5f04a]/20 -mx-3 px-3 py-3 transition-colors">
                <div className="md:col-span-2 mono text-xs text-black/50 number-style pt-1">{it.date}</div>
                <div className="md:col-span-3">
                  <div className="font-medium"><span className="display italic text-lg">{it.role}</span></div>
                  <div className="mono text-[10px] uppercase tracking-widest text-black/60">{it.org}</div>
                </div>
                <div className="md:col-span-7 text-sm text-black/80 leading-relaxed" style={{ fontFamily: "'EB Garamond', serif" }}>{it.desc}</div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mb-16">
        <div className="flex items-baseline gap-4 mb-6 border-b-2 border-black pb-2">
          <div className="mono text-xs text-black/40 number-style">06</div>
          <h2 className="display text-3xl italic">{t.cv.docencia}</h2>
          <div className="flex-1 ascii-tiny text-right overflow-hidden">{'·'.repeat(80)}</div>
        </div>
        <p className="text-base mb-6 max-w-2xl" style={{ fontFamily: "'EB Garamond', serif" }}>{t.cv.docenciaDesc}</p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {['ISDI', 'ESADE', 'Nebrija', 'The Core', 'UNIE', 'Mondragon'].map((n, i) => (
            <div key={n} className="border-2 border-black p-4 text-center mono text-xs uppercase tracking-widest hover:bg-[#c5f04a] transition-colors card-tilt bg-white" style={{ transform: `rotate(${[-0.5, 0.3, -0.4, 0.4, -0.3, 0.5][i]}deg)` }}>
              {n}
            </div>
          ))}
        </div>
      </section>

      <div className="border-2 border-black p-8 bg-white relative" style={{ transform: 'rotate(-0.4deg)' }}>
        <div className="sticker" style={{ top: -18, right: -10, transform: 'rotate(10deg)' }}>{t.cv.contactSticker}</div>
        <div className="mono text-[11px] uppercase tracking-widest text-black/60 mb-3">{t.cv.contactKicker}</div>
        <p className="display text-3xl italic mb-4">{t.cv.contactTitle}</p>
        <p className="text-base mb-6 max-w-xl" style={{ fontFamily: "'EB Garamond', serif" }}>{t.cv.contactDesc}</p>
        <div className="flex flex-wrap gap-3">
          <a href="https://calendly.com/alejandro-marcos-teamheretics/30min" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-[#0a0a0a] text-[#c5f04a] mono text-xs uppercase tracking-widest border-2 border-black">
            {t.cv.contactBtn}
          </a>
          <a href="https://linkedin.com/in/alejandromarcosmoraga" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 border-2 border-black mono text-xs uppercase tracking-widest hover:bg-[#0a0a0a] hover:text-[#c5f04a] transition-colors">
            linkedin →
          </a>
        </div>
      </div>
    </main>
  );
}

// =============================================
// BLOG
// =============================================
function Blog({ t }) {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-10 md:pb-16 relative">
      <div className="sticker wobble" style={{ top: 30, right: 0, transform: 'rotate(6deg)' }}>{t.blog.sticker}</div>

      <div className="mono text-[11px] uppercase tracking-widest text-black/60 mb-6 mt-8">{t.blog.kicker}</div>
      <h1 className="display text-5xl md:text-8xl leading-[0.85] mb-3">{t.blog.title}</h1>
      <p className="display text-2xl italic text-black/60 mb-16 max-w-3xl">
        {t.blog.lead1}<br/>{t.blog.lead2}
      </p>

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-8">
          {t.posts.map((p, i) => (
            <article key={i} className="border-b-2 border-black pb-8 group">
              <div className="flex items-center gap-3 mono text-[10px] uppercase tracking-widest text-black/50 mb-3 flex-wrap">
                <span className="number-style">{p.date}</span>
                <span>·</span>
                <span>{p.read} {t.blog.readMin}</span>
                <span>·</span>
                <span style={{ color: '#0a0a0a', background: '#c5f04a', padding: '1px 6px', border: '1px solid #0a0a0a' }}>{p.tag}</span>
                <span>·</span>
                <span className="text-black/30">{p.views} {t.blog.reads}</span>
              </div>
              <h2 className="display text-4xl italic leading-tight mb-3 group-hover:underline decoration-1 group-hover:decoration-[#c5f04a] decoration-2">
                {p.title}
              </h2>
              <p className="text-base leading-snug text-black/80 mb-3 max-w-2xl" style={{ fontFamily: "'EB Garamond', serif" }}>{p.excerpt}</p>
              <a href="#" className="mono text-xs uppercase tracking-widest underline-grow">{t.blog.readMore}</a>
            </article>
          ))}
        </div>

        <aside className="md:col-span-4">
          <div className="border-2 border-black p-6 bg-[#0a0a0a] text-[#ebe7d9] sticky top-24 card-skewed" style={{ transform: 'rotate(1deg)' }}>
            <div className="mono text-[10px] uppercase tracking-widest text-[#c5f04a] mb-3">{t.blog.subKicker}</div>
            <h3 className="display text-3xl italic mb-3">{t.blog.subTitle1}<br/>{t.blog.subTitle2}</h3>
            <p className="text-sm mb-5 text-white/70" style={{ fontFamily: "'EB Garamond', serif" }}>{t.blog.subDesc}</p>
            <a href="https://substack.com/@alejandrosdow" target="_blank" rel="noreferrer" className="block text-center px-5 py-3 bg-[#c5f04a] text-[#0a0a0a] mono text-xs uppercase tracking-widest hover:bg-[#ebe7d9] transition-colors border-2 border-[#c5f04a]">
              {t.blog.subBtn}
            </a>
            <div className="mono text-[10px] text-white/40 mt-4 flex justify-between">
              <span>{t.blog.subStat}</span>
              <span className="text-[#c5f04a]">{t.blog.subGrowth}</span>
            </div>
          </div>
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
    <main className="max-w-5xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-10 md:pb-16 relative">
      <div className="sticker wobble" style={{ top: 30, right: 0, transform: 'rotate(6deg)' }}>{t.contact.sticker}</div>

      <div className="mono text-[11px] uppercase tracking-widest text-black/60 mb-6 mt-8">{t.contact.kicker}</div>
      <h1 className="display text-5xl md:text-8xl leading-[0.85] mb-3">{t.contact.title}</h1>
      <p className="display text-xl md:text-2xl italic text-black/60 mb-16 max-w-2xl">
        {t.contact.lead1}<br/>{t.contact.lead2}
      </p>

      {/* === SECTION: WORK === */}
      <section className="mb-20">
        <div className="mono text-[12px] md:text-sm uppercase tracking-widest mb-6" style={{ color: '#5a8c2e' }}>
          {t.contact.workKicker}
        </div>

        <p className="text-base md:text-lg leading-snug max-w-3xl mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>
          {t.contact.workIntro1}
        </p>
        <p className="text-base md:text-lg leading-snug max-w-3xl mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>
          {t.contact.workIntro2}
        </p>
        <p className="text-base md:text-lg leading-snug max-w-3xl mb-10" style={{ fontFamily: "'EB Garamond', serif" }}>
          <span style={{ background: '#c5f04a', padding: '0 4px', fontWeight: 600 }}>{t.contact.workIntroHighlight}</span>
        </p>

        {/* 3 pillars */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {t.contact.pillars.map((p, i) => (
            <article key={i} className="border-2 border-black p-5 bg-white card-skewed flex flex-col" style={{ transform: `rotate(${[-0.5, 0.4, -0.3][i]}deg)` }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="mono text-[10px] text-black/40 number-style border border-black/30 px-2 py-1">{String(i+1).padStart(2,'0')}</div>
                <h3 className="display text-2xl italic flex-1">{p.title}</h3>
              </div>
              <p className="text-sm leading-snug text-black/80" style={{ fontFamily: "'EB Garamond', serif" }}>
                {p.desc}
              </p>
            </article>
          ))}
        </div>

        {/* Work note — left border accent */}
        <div className="relative p-5 bg-[#0a0a0a]/[0.04]" style={{ borderLeft: '3px solid #c5f04a' }}>
          <p className="text-sm md:text-base leading-relaxed text-black/85" style={{ fontFamily: "'EB Garamond', serif" }}>
            {t.contact.workNote}
          </p>
        </div>
      </section>

      <AsciiDivider />

      {/* === SECTION: FREE SESSION === */}
      <section className="my-12 md:my-20">
        <div className="mono text-[12px] md:text-sm uppercase tracking-widest mb-6" style={{ color: '#5a8c2e' }}>
          {t.contact.sessionKicker}
        </div>
        <h2 className="display text-4xl md:text-6xl italic mb-6 leading-tight">
          {t.contact.sessionTitle}
        </h2>
        <p className="text-base md:text-lg leading-snug max-w-3xl mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>
          {t.contact.sessionLead1}
        </p>
        <p className="text-base md:text-lg leading-snug max-w-3xl mb-10" style={{ fontFamily: "'EB Garamond', serif" }}>
          {t.contact.sessionLead2}
        </p>

        <ul className="space-y-0 mb-10 max-w-3xl">
          {t.contact.sessionFor.map((item, i) => (
            <li key={i} className="flex items-start gap-4 border-b border-black/15 py-3 text-sm md:text-base group hover:bg-[#c5f04a]/10 transition-colors -mx-3 px-3" style={{ fontFamily: "'EB Garamond', serif" }}>
              <span className="mono text-[#5a8c2e] shrink-0 mt-0.5">→</span>
              <span className="text-black/85">{item}</span>
            </li>
          ))}
        </ul>

        <a
          href="https://calendly.com/alejandro-marcos-teamheretics/30min"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 px-6 py-4 mono text-xs uppercase tracking-widest border-2 border-black transition-colors"
          style={{ background: '#c5f04a', color: '#0a0a0a' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#c5f04a'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#c5f04a'; e.currentTarget.style.color = '#0a0a0a'; }}
        >
          {t.contact.sessionBtn}
        </a>
      </section>
    </main>
  );
}

function AsciiDivider() {
  const patterns = [
    "·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·─·",
    "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
    "★ · ◆ · ▲ · ● · ★ · ◆ · ▲ · ● · ★ · ◆ · ▲ · ● · ★ · ◆ · ▲ · ● · ★ · ◆ · ▲ · ● · ★ · ◆ · ▲ · ● · ★",
  ];
  const p = patterns[Math.floor(Math.random() * patterns.length)];
  return <div className="ascii-tiny my-8 overflow-hidden whitespace-pre">{p}</div>;
}
