// =============================================
// Hilos — textos cortos que se abren en la columna central
// (como los "threads" de dsaltaren.com). URL: /#ideas/<slug>
//
// Cada párrafo es un array: texto normal + enlaces { k, label }.
//   k: 'x:<slug>' abre otro hilo · 'cv' | 'blog' | 'contact' | 'library'
//   k: null → texto en gris sin enlace
// Todos los datos salen de tu trayectoria y portfolio: revísalos y
// reescríbelos con tu voz cuando quieras.
// =============================================

export const THREADS = {
  'como-trabajo': {
    es: {
      title: 'Cómo trabajo',
      body: [
        ['Escucho, busco la narrativa y la convierto en algo que la gente ', { k: null, label: 'entienda, recuerde y quiera hacer suyo' }, '.'],
        ['Trabajo en tres capas: narrativa, tu posición en el mundo; comunidad, pertenencia y no seguidores; y sistemas, estructura para crecer con criterio sin perder el alma.'],
        ['Lo aplico en ', { k: 'x:heretics', label: 'Team Heretics' }, ', en ', { k: 'x:proyectos', label: 'mis propios proyectos' }, ' y con empresas y creadores.'],
        ['Colaboro de tres formas: sesiones individuales, integrándome part-time en tu proyecto o formando un equipo a medida.'],
      ],
      close: ['Si encaja, ', { k: 'contact', label: 'hablemos' }, '.'],
    },
    en: {
      title: 'How I work',
      body: [
        ['I listen, find the narrative and turn it into something people ', { k: null, label: 'understand, remember and want to make their own' }, '.'],
        ['I work across three layers: narrative, your position in the world; community, belonging rather than followers; and systems, structure to grow with judgment without losing the soul.'],
        ['I apply it at ', { k: 'x:heretics', label: 'Team Heretics' }, ', in ', { k: 'x:proyectos', label: 'my own projects' }, ' and with companies and creators.'],
        ['I collaborate in three ways: one-off sessions, joining your project part-time, or building a custom team.'],
      ],
      close: ['If it fits, ', { k: 'contact', label: "let's talk" }, '.'],
    },
  },

  heretics: {
    image: '/assets/fan/08-gamergy.jpg',
    es: {
      title: 'Team Heretics',
      caption: 'La comunidad de Heretics.',
      body: [
        ['Desde 2018 lidero la marca y la comunidad global de Team Heretics: de marca de nicho en esports a referencia de entretenimiento en internet.'],
        ['Ahí nacieron Los Niños, de un vlog a skin oficial de Valorant; La Mansión, la primera gran casa de creadores en España; HereticsXP, con más de 2.000 personas por edición; y dos HereticsHUB en Madrid.'],
        ['Es un rol transversal dentro del Holding de Heretics, junto a PHTP, Nativo y MakeItHappen.'],
      ],
      close: ['Así es ', { k: 'x:como-trabajo', label: 'cómo trabajo' }, '.'],
    },
    en: {
      title: 'Team Heretics',
      caption: 'The Heretics community.',
      body: [
        ['Since 2018 I have led the global brand and community of Team Heretics: from a niche esports brand to an entertainment reference on the internet.'],
        ['That is where Los Niños was born, from a vlog to an official Valorant skin; La Mansión, Spain’s first major creator house; HereticsXP, with over 2,000 people per edition; and two HereticsHUB spaces in Madrid.'],
        ['It is a cross-functional role within the Heretics Holding, alongside PHTP, Nativo and MakeItHappen.'],
      ],
      close: ['This is ', { k: 'x:como-trabajo', label: 'how I work' }, '.'],
    },
  },

  proyectos: {
    image: '/assets/fan/03-julio.jpg',
    es: {
      title: 'Lo que construyo',
      caption: 'JULIO, la primera memebrand hispanohablante.',
      body: [
        ['Creé y lideré Club113 sus dos primeros años: +579M de impresiones y 645k seguidores en 11 meses.'],
        ['En 2025 lancé JULIO, una memebrand con filosofía mediterránea. Su único drop se agotó en 30 minutos.'],
        ['Antes vinieron XYON, una de las primeras agencias de creadores de gaming; Zhander, una app de ocio nocturno que la pandemia nos obligó a pivotar; y SCALELAB.'],
        ['No todos salieron bien, y de todos aprendí algo.'],
      ],
      close: ['Lo que sigue: ', { k: 'x:lo-que-viene', label: 'lo que viene' }, '.'],
    },
    en: {
      title: 'What I’m building',
      caption: 'JULIO, the first Spanish-speaking memebrand.',
      body: [
        ['I created and led Club113 for its first two years: +579M impressions and 645k followers in 11 months.'],
        ['In 2025 I launched JULIO, a memebrand with a Mediterranean philosophy. Its only drop sold out in 30 minutes.'],
        ['Before that came XYON, one of the first gaming-creator agencies; Zhander, a nightlife app the pandemic forced us to pivot; and SCALELAB.'],
        ['Not all of them worked out, and every one taught me something.'],
      ],
      close: ['Next: ', { k: 'x:lo-que-viene', label: 'what’s next' }, '.'],
    },
  },

  'lo-que-viene': {
    es: {
      title: 'Lo que viene',
      body: [
        ['Desde 2025 asesoro a GenLayer, infraestructura de confianza humana para la era de la IA, en la intersección entre blockchain e IA.'],
        ['Con Rally hago lo mismo en clave B2C: narrativa, equipo y campañas.'],
        ['El reto común es traducir productos complejos a un idioma que la gente entienda.'],
      ],
      close: ['Todo empezó ', { k: 'x:origenes', label: 'aquí' }, '.'],
    },
    en: {
      title: 'What’s next',
      body: [
        ['Since 2025 I have advised GenLayer, human trust infrastructure for the AI era, at the intersection of blockchain and AI.'],
        ['With Rally I do the same in a B2C key: narrative, team and campaigns.'],
        ['The shared challenge is translating complex products into a language people understand.'],
      ],
      close: ['It all began ', { k: 'x:origenes', label: 'here' }, '.'],
    },
  },

  origenes: {
    image: '/assets/fan/06-machinima.jpg',
    es: {
      title: 'Dónde empezó',
      caption: 'Mi contrato con Machinima.',
      body: [
        ['Todo empieza en 2008 con Call of Duty. Fui campeón nacional con Pain Gaming y quedé 9º en el Mundial de Los Ángeles 2011.'],
        ['A la vez hacía contenido: firmé uno de los primeros contratos de Machinima en España y colaboré con LVP y ESL.'],
        ['Después llegaron GAME, donde con 24 años llevé los contenidos de Madrid Gaming Experience, Movistar GAME TV y Cooler Master.'],
      ],
      close: ['La historia completa, en ', { k: 'cv', label: 'mi trayectoria' }, '.'],
    },
    en: {
      title: 'Where it began',
      caption: 'My Machinima contract.',
      body: [
        ['It all starts in 2008 with Call of Duty. I was national champion with Pain Gaming and finished 9th at the 2011 Los Angeles World Championship.'],
        ['At the same time I made content: I signed one of the first Machinima contracts in Spain and worked with LVP and ESL.'],
        ['Then came GAME, where at 24 I ran the content for Madrid Gaming Experience, Movistar GAME TV and Cooler Master.'],
      ],
      close: ['The full story is in ', { k: 'cv', label: 'my career' }, '.'],
    },
  },

  libro: {
    book: true,
    es: {
      title: 'Internet Surfer',
      body: [
        ['Mi libro sobre el arte de crear comunidades en la era digital. Es gratis.'],
      ],
      close: ['Y si te quedas con ganas, ', { k: 'library', label: 'mi biblioteca' }, '.'],
    },
    en: {
      title: 'Internet Surfer',
      body: [
        ['My book on the art of building communities in the digital era. It’s free.'],
      ],
      close: ['If you want more, ', { k: 'library', label: 'my library' }, '.'],
    },
  },
};

export const THREADS_INTRO = {
  es: {
    head: 'Algunos hilos de mi trabajo.',
    crumb: 'Hilos',
    back: 'Todos los hilos',
    paras: [
      ['Narrativa, comunidad y sistemas dan forma a ', { k: 'x:como-trabajo', label: 'cómo trabajo' }, ', de ', { k: 'x:heretics', label: 'Team Heretics' }, ' a ', { k: 'x:proyectos', label: 'mis propios proyectos' }, '.'],
      [{ k: 'x:lo-que-viene', label: 'Lo que viene' }, ' cruza marca, IA y blockchain. ', { k: 'x:origenes', label: 'Dónde empezó' }, ' junta gaming, esports y contenido.'],
      ['Dos regalos: ', { k: 'x:libro', label: 'mi libro' }, ' y ', { k: 'library', label: 'una pequeña biblioteca' }, '.'],
      ['Para historias más largas, ', { k: 'blog', label: 'lee mi blog' }, '.'],
    ],
  },
  en: {
    head: 'A few threads through my work.',
    crumb: 'Threads',
    back: 'All threads',
    paras: [
      ['Narrative, community and systems shape ', { k: 'x:como-trabajo', label: 'how I work' }, ', from ', { k: 'x:heretics', label: 'Team Heretics' }, ' to ', { k: 'x:proyectos', label: 'my own projects' }, '.'],
      [{ k: 'x:lo-que-viene', label: 'What’s next' }, ' connects brand, AI and blockchain. ', { k: 'x:origenes', label: 'Where it began' }, ' brings together gaming, esports and content.'],
      ['Two gifts: ', { k: 'x:libro', label: 'my book' }, ' and ', { k: 'library', label: 'a small library' }, '.'],
      ['For longer stories, ', { k: 'blog', label: 'read my blog' }, '.'],
    ],
  },
};
