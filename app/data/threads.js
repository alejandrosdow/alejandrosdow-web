// =============================================
// Hilos — textos cortos que se abren en la columna central
// (como los "threads" de dsaltaren.com). URL: /#ideas/<slug>
//
// Cada párrafo es un array: texto normal + enlaces { k, label } + negritas { b: 'texto' }.
//   k: 'x:<slug>' abre otro hilo · 'cv' | 'blog' | 'contact' | 'library'
//   k: null → texto en gris sin enlace
// Fotos: public/assets/hilos/ → image: '/assets/hilos/<archivo>'. Cuadradas por
// defecto; para otro formato añade aspect: '3 / 2' (o el que sea).
// Todos los datos salen de tu trayectoria y portfolio: revísalos y
// reescríbelos con tu voz cuando quieras.
// =============================================

export const THREADS = {
  'como-trabajo': {
    es: {
      title: 'Cómo trabajo',
      body: [
        ['Escucho, busco la narrativa y la convierto en algo que la gente entienda, recuerde y quiera hacer suyo.'],
        ['Trabajo en tres capas: ', { b: 'narrativa' }, ', tu posición en el mundo; ', { b: 'comunidad' }, ', pertenencia y no seguidores; y ', { b: 'creatividad' }, ', estructuras creativas para crecer con criterio.'],
        ['Lo aplico en ', { k: 'x:heretics', label: 'Team Heretics' }, ' y ', { k: 'x:proyectos', label: 'proyectos donde ayudo' }, '.'],
        ['Colaboro de tres formas: sesiones individuales, integrándome part-time en tu proyecto o formando un equipo a medida.'],
      ],
      close: ['Si encaja, ', { k: 'contact', label: 'hablemos' }, '.'],
    },
    en: {
      title: 'How I work',
      body: [
        ['I listen, find the narrative and turn it into something people understand, remember and want to make their own.'],
        ['I work across three layers: ', { b: 'narrative' }, ', your position in the world; ', { b: 'community' }, ', belonging rather than followers; and ', { b: 'creativity' }, ', creative structures to grow with judgment.'],
        ['I apply it at ', { k: 'x:heretics', label: 'Team Heretics' }, ' and in ', { k: 'x:proyectos', label: 'projects I help with' }, '.'],
        ['I collaborate in three ways: one-off sessions, joining your project part-time, or building a custom team.'],
      ],
      close: ['If it fits, ', { k: 'contact', label: "let's talk" }, '.'],
    },
  },

  heretics: {
    image: '/assets/hilos/heretics-arena.jpg',
    aspect: '3 / 2',
    es: {
      title: 'Team Heretics',
      caption: 'Team Heretics en el escenario.',
      body: [
        ['Desde 2018 lidero la marca y la comunidad global de Team Heretics: de marca de nicho en esports a referencia de entretenimiento en internet.'],
        ['+7M de seguidores y 200.000.000 de visitas en YouTube; equipo top en ventas mundiales de skins en Valorant. Club113, uno de los podcasts más grandes de habla hispana; La Mansión, la primera gran casa de creadores en España; HereticsXP, un evento con más de 2.000 personas; y espacios físicos en Madrid como el HereticsHUB.'],
        ['Es un rol transversal dentro del Holding de Heretics, junto a PHTP, Nativo y MakeItHappen. Productos que van desde el MiniOpen de Tenis hasta ayudar en la carrera de algunos de los creadores más grandes de habla hispana o el programa Línea de Cal.'],
        ['Activaciones y propuestas creativas para Red Bull, el grupo Mahou San Miguel, Samsung, Hyundai, Nestlé, Logitech, Lenovo, Socios.com, Motorola y prácticamente cualquier marca de gran consumo.'],
      ],
      close: ['Así es ', { k: 'x:como-trabajo', label: 'cómo trabajo' }, '.'],
    },
    en: {
      title: 'Team Heretics',
      caption: 'Team Heretics on stage.',
      body: [
        ['Since 2018 I have led the global brand and community of Team Heretics: from a niche esports brand to an entertainment reference on the internet.'],
        ['+7M followers and 200,000,000 views on YouTube; a top team worldwide in Valorant skin sales. Club113, one of the biggest Spanish-language podcasts; La Mansión, Spain’s first major creator house; HereticsXP, an event with over 2,000 people; and physical spaces in Madrid like the HereticsHUB.'],
        ['It is a cross-functional role within the Heretics Holding, alongside PHTP, Nativo and MakeItHappen. Products ranging from the MiniOpen tennis tournament to helping grow the careers of some of the biggest Spanish-language creators, or the show Línea de Cal.'],
        ['Activations and creative proposals for Red Bull, the Mahou San Miguel group, Samsung, Hyundai, Nestlé, Logitech, Lenovo, Socios.com, Motorola and practically every major consumer brand.'],
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
        ['Tres hilos abiertos: entretenimiento, tecnología y cultura digital.'],
        ['El entretenimiento es nuestro campo de juego para la convergencia.'],
        ['También quiero ', { k: 'blog', label: 'escribir más y compartir lo que aprendo' }, '.'],
      ],
      close: ['Desde aquí puedes ver ', { k: 'x:origenes', label: 'dónde empezó' }, '.'],
    },
    en: {
      title: 'What’s next',
      body: [
        ['Three open threads: entertainment, technology and digital culture.'],
        ['Entertainment is our playing field for convergence.'],
        ['I also want to ', { k: 'blog', label: 'write more and share what I learn' }, '.'],
      ],
      close: ['From here, you can see ', { k: 'x:origenes', label: 'where it began' }, '.'],
    },
  },

  origenes: {
    image: '/assets/fan/06-machinima.jpg',
    es: {
      title: 'Dónde empezó',
      caption: 'Mi contrato con Machinima.',
      body: [
        ['Todo empieza en 2008 con Call of Duty y YouTube. Fui campeón nacional con Pain Gaming y quedé 9º en el Mundial de Los Ángeles 2011, y subía a YouTube: partidas, viajes y series de contenido.'],
        ['Firmé uno de los primeros contratos de Machinima en España y colaboraba con la Liga de Videojuegos Profesional, ESL y empresas emergentes de entretenimiento.'],
        ['Me formé en Publicidad y Relaciones Públicas, aunque no llegué a terminar la carrera: estuve trabajando sin parar en distintas empresas y lanzando proyectos personales.'],
        ['Con 23 años en GAME, lideraba las relaciones con publishers, creadores, y las activaciones en eventos masivos como Madrid Gaming Experience, Barcelona Games World o Fun & Serious. En un año vinieron empresas como Movistar o Cooler Master, donde seguí creciendo mientras me apuntaba a otras aventuras.'],
        ['Llegó Team Heretics y pasamos de ser tres personas en Google Campus a casi ochenta en 2026, surfeando la ola de los esports, el gaming y las tendencias digitales. Mientras, como siempre, he seguido lanzándome a trabajar y colaborar en proyectos de tecnología, creación de contenido y plataformas.'],
        ['Me encanta el entretenimiento, pero sobre todo me gustan las nuevas tendencias y los puntos de convergencia que genera el avance tecnológico y su impacto en la cultura. Inteligencia artificial, blockchain y cultura digital son tres madrigueras en las que llevo muchos años inmerso y de donde saco más referencias para seguir creciendo.'],
      ],
      close: ['La historia completa, en ', { k: 'cv', label: 'mi trayectoria' }, '.'],
    },
    en: {
      title: 'Where it began',
      caption: 'My Machinima contract.',
      body: [
        ['It all starts in 2008 with Call of Duty and YouTube. I was national champion with Pain Gaming and finished 9th at the 2011 Los Angeles World Championship, and I uploaded my matches, trips and content series to YouTube.'],
        ['I signed one of the first Machinima contracts in Spain and worked with the Liga de Videojuegos Profesional, ESL and emerging entertainment companies.'],
        ['I studied Advertising and Public Relations, though I never finished the degree: I was working non-stop at different companies and launching personal projects.'],
        ['At 23, at GAME, I led relationships with publishers and creators, and activations at major events like Madrid Gaming Experience, Barcelona Games World and Fun & Serious. Within a year came companies like Movistar and Cooler Master, where I kept growing while signing up for other adventures.'],
        ['Then Team Heretics arrived, and we went from three people at Google Campus to almost eighty in 2026, riding the wave of esports, gaming and digital trends. Meanwhile, as always, I kept jumping into work and collaborations in technology, content creation and platforms.'],
        ['I love entertainment, but above all I love new trends and the points of convergence that technological progress creates, and their impact on culture. Artificial intelligence, blockchain and digital culture are three rabbit holes I have been deep in for years, and where I find most of the references that keep me growing.'],
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
      ['Narrativa, comunidad y creatividad dan forma a ', { k: 'x:como-trabajo', label: 'cómo trabajo' }, '.'],
      [{ k: 'x:lo-que-viene', label: 'Lo que viene' }, ' cruza entretenimiento, tecnología y cultura digital.'],
      [{ k: 'x:origenes', label: 'Dónde empezó' }, ' junta gaming y contenido.'],
      ['Dos regalos: ', { k: 'x:libro', label: 'mi libro' }, ' y ', { k: 'library', label: 'una pequeña biblioteca' }, '.'],
      ['Para historias más largas, ', { k: 'blog', label: 'lee mi blog' }, '.'],
    ],
  },
  en: {
    head: 'A few threads through my work.',
    crumb: 'Threads',
    back: 'All threads',
    paras: [
      ['Narrative, community and creativity shape ', { k: 'x:como-trabajo', label: 'how I work' }, '.'],
      [{ k: 'x:lo-que-viene', label: 'What’s next' }, ' connects entertainment, technology and digital culture.'],
      [{ k: 'x:origenes', label: 'Where it began' }, ' brings together gaming and content.'],
      ['Two gifts: ', { k: 'x:libro', label: 'my book' }, ' and ', { k: 'library', label: 'a small library' }, '.'],
      ['For longer stories, ', { k: 'blog', label: 'read my blog' }, '.'],
    ],
  },
};
