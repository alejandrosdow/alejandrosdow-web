'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dock from '../components/Dock';
import { BlogFeed } from '../components/Work';

// "Cómo pienso": texto en bloques cortos + los artículos del blog (Substack).

const T = {
  es: {
    title: 'Cómo pienso',
    blog: 'Blog',
    home: '← Inicio',
    paras: [
      "Internet es lo mejor y lo peor que nos ha pasado, vamos a hacer que sea lo primero.",
      "No veo el mundo por países, sino por comunidades. Internet es el medio que nos une.",
      "En ese mundo, el gaming es lo que más influye en la cultura popular del siglo XXI, y los memes son su código.",
      "Hay oscuridad, pero también hay luz. No concibo una forma de ver el mundo que no sea desde el optimismo. Quiero cambiarlo, ayúdame, vamos a hacer que sea mucho mejor.",
      "No quiero poder o status, quiero llegar lo suficientemente arriba como para poder ayudar a cambiar las cosas, a hacerlas mejor, a que haya mejores ejemplos.",
      "Nada de lo que he hecho empezó como un plan. Empezó como curiosidad, la curiosidad se convirtió en fuego y el propósito llegó después. La curiosidad nos mueve a nosotros y al mundo.",
      "Si te pierdes en algún momento, mira lo que hacías de niño, lo que te daba luz sin que hubiera nada detrás. Lo vas a encontrar.",
      "El ego es un arma de doble filo. El suficiente hace que las cosas te importen, demasiado te impide reconocer la realidad o tus errores. Un disfraz siempre se acaba rompiendo.",
      "Pagar las facturas es parte del camino, pero no hay que confundirlo con lo que estás construyendo. Tenemos que vivir con nuestras propias incongruencias.",
      "Dime con quién andas y te diré cómo eres. Tus relaciones te definen igual que tus actos.",
      "Familia y amistades son siempre la prioridad. Y cuidar de los tuyos no es olvidarte del resto.",
      "Dar sin esperar nada a cambio. Es el principio universal para construir mi vida y relaciones de verdad.",
      "Los mejores proyectos empiezan juntando a buenas personas. No trabajo o me junto con quien no creo o admiro.",
      "Con las marcas pasa lo mismo: seguidores no es comunidad, comunidad es pertenencia.",
      "Ahora que casi todo está a un clic, vale más lo que cuesta conseguir. Conectar > Llegar. No le tengas miedo a la fricción.",
      "Lo que no se puede grabar también cuenta. Estar presente.",
      "Quiero comerme el mundo. Y repetir.",
      "Si haces cosas, pasan cosas.",
      "El miedo se quita haciéndolo. No todo sale bien, y de todo se aprende.",
      "Sé admirable, eres tu mejor ejemplo al mundo.",
    ],
  },
  en: {
    title: 'How I think',
    blog: 'Blog',
    home: '← Home',
    paras: [
      "The internet is the best and the worst thing that has happened to us. Let’s make it the former.",
      "I don’t see the world as countries, but as communities. The internet is what connects us.",
      "In that world, gaming is the biggest influence on 21st-century popular culture, and memes are its code.",
      "There is darkness, but there is also light. I can’t conceive of any way of seeing the world other than through optimism. I want to change it, help me, let’s make it much better.",
      "I don’t want power or status. I want to get high enough to help change things, to make them better, to set better examples.",
      "Nothing I’ve done started as a plan. It started as curiosity, curiosity turned into fire, and purpose came later. Curiosity moves us, and it moves the world.",
      "If you ever get lost, look at what you did as a kid, what lit you up with nothing behind it. You’ll find it.",
      "Ego is a double-edged sword. Enough of it makes things matter to you; too much stops you from seeing reality or your own mistakes. A disguise always ends up breaking.",
      "Paying the bills is part of the journey, but don’t confuse it with what you are building. We have to live with our own contradictions.",
      "Tell me who you spend time with and I’ll tell you who you are. Your relationships define you as much as your actions.",
      "Family and friends always come first. And looking after your own doesn’t mean forgetting everyone else.",
      "Give without expecting anything in return. It is the universal principle for building my life and real relationships.",
      "The best projects start by bringing good people together. I don’t work or spend time with people I don’t believe in or admire.",
      "The same goes for brands: followers are not community, community is belonging.",
      "Now that almost everything is one click away, what is hard to get is worth more. Connecting > Reaching. Don’t be afraid of friction.",
      "What can’t be recorded counts too. Be present.",
      "I want to take on the world. And then do it again.",
      "If you do things, things happen.",
      "Fear goes away by doing it. Not everything works out, and you learn from all of it.",
      "Be admirable, you are your best example to the world.",
    ],
  },
};

export default function ComoPiensoPage() {
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const bl = (typeof navigator !== 'undefined' && navigator.language) || 'es';
    setLang(bl.toLowerCase().startsWith('es') ? 'es' : 'en');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = T[lang];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full page page-wide">
        <header className="page-head">
          <Link href="/" className="ilink">Alejandro Marcos</Link>
          <Link href="/" className="ilink">{t.home}</Link>
        </header>

        <div className="page-title-row rise">
          <h1 className="t-title">{t.title}.</h1>
        </div>

        <div className="think-grid">
          <div className="think-photo rise">
            <div className="media" style={{ aspectRatio: '1 / 1' }}>
              <img src="/assets/foto-alejandro.jpg" alt="Alejandro Marcos" />
            </div>
            <div className="t-caption" style={{ marginTop: 8 }}>BASED IN MADRID / SPAIN</div>
          </div>

          <div>
            <div className="home-prose rise" style={{ animationDelay: '80ms', maxWidth: '62ch' }}>
              {t.paras.map((x, n) => (
                <p key={n}>{x}</p>
              ))}
            </div>

            <section id="blog" style={{ marginTop: 96, scrollMarginTop: 72 }}>
              <h2 className="t-title" style={{ marginBottom: 16 }}>{t.blog}.</h2>
              <BlogFeed key={lang} lang={lang} />
            </section>
          </div>
        </div>
      </main>

      <Dock lang={lang} setLang={setLang} active="think" />
    </div>
  );
}
