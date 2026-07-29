'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// =============================================
// /biblioteca — la biblioteca viva
// Para añadir un libro: añade una línea al array
// `books` de su categoría. `url` puede ser null.
// El tag de afiliado de Amazon se añade solo.
// =============================================

const AMZN_TAG = 'alejandrosdow-21';
function withTag(url) {
  if (!url || !/amazon\.|amzn\./.test(url)) return url;
  return url + (url.includes('?') ? '&' : '?') + 'tag=' + AMZN_TAG;
}

const CATS = [
  {
    id: 'marca',
    es: {
      title: 'Estrategia de marca y cultura de empresa',
      desc: 'Cómo se construyen las marcas como movimientos culturales, comunidades y símbolos de identidad.',
    },
    en: {
      title: 'Brand strategy & company culture',
      desc: 'How brands are built as cultural movements, communities and symbols of identity.',
    },
    books: [
      { t: 'The Culting of Brands', a: 'Douglas Atkin', url: 'https://www.amazon.es/dp/1591840961', es: 'Cómo las marcas se convierten en comunidades con un propósito casi religioso.', en: 'How brands become communities with an almost religious sense of purpose.' },
      { t: 'The Brand Flip', a: 'Marty Neumeier', url: 'https://www.amazon.es/dp/0134172817', es: 'El poder ha pasado de las marcas a los consumidores; aquí aprendes a adaptarte.', en: 'Power has shifted from brands to consumers; this teaches you how to adapt.' },
      { t: 'ZAG', a: 'Marty Neumeier', url: 'https://www.amazon.es/dp/0321426770', es: 'Guía práctica para diferenciar tu marca en mercados saturados.', en: 'A practical guide to differentiating your brand in saturated markets.' },
      { t: 'The Brand Gap', a: 'Marty Neumeier', url: 'https://www.amazon.es/dp/0321348109', es: 'La brecha entre estrategia y creatividad, y cómo cerrarla.', en: 'The gap between strategy and creativity, and how to close it.' },
      { t: 'The Business of Aspiration', a: 'Ana Andjelic', url: 'https://www.amazon.es/s?k=the+business+of+aspiration+ana+andjelic', es: 'Cómo el capital simbólico redefine el valor de las marcas.', en: 'How symbolic capital redefines the value of brands.' },
      { t: 'Status and Culture', a: 'W. David Marx', url: 'https://www.amazon.es/dp/0593296702', es: 'Cómo el estatus moldea gustos, identidad y tendencias culturales.', en: 'How status shapes taste, identity and cultural trends.' },
      { t: 'I Love It. What Is It?', a: 'Turner Duckworth & Gyles Lingwood', url: 'https://www.amazon.es/dp/1838666060', es: 'La intuición y la emoción como ejes del diseño y la marca.', en: 'Instinct and emotion as the core of design and branding.' },
      { t: 'The Business of Belonging', a: 'David Spinks', url: 'https://www.amazon.es/dp/1119766125', es: 'Cómo construir comunidades que fortalezcan la ventaja competitiva.', en: 'How to build communities that strengthen competitive advantage.' },
      { t: 'Get Together', a: 'Richardson, Huynh & Elmer Sotto', url: 'https://www.amazon.es/dp/1732265194', es: 'Manual para crear comunidades de marca auténticas y sostenibles.', en: 'A manual for building authentic, sustainable brand communities.' },
      { t: 'Obsessed', a: 'Emily Heyward', url: 'https://www.amazon.es/dp/0593084314', es: 'Cómo crear marcas queridas desde el día uno.', en: 'How to build brands people love from day one.' },
      { t: 'El libro rojo de las marcas', a: 'Luis Bassat', url: 'https://www.amazon.es/dp/8483460386', es: 'Principios esenciales para construir marcas icónicas.', en: 'Essential principles for building iconic brands.' },
      { t: 'House of Errors — Brand Book', url: 'https://www.houseoferrors.org/product', es: 'La marca como arte, imperfección y cultura alternativa.', en: 'Brand as art, imperfection and alternative culture.' },
      { t: 'Point of Purpose', a: 'Bård Annweiler', url: 'https://www.point-of-purpose.com', es: 'Cómo construir marcas guiadas por propósito y significado.', en: 'How to build brands guided by purpose and meaning.' },
      { t: 'Comprender los medios de comunicación', a: 'Marshall McLuhan', url: 'https://www.amazon.es/dp/8449322030', es: 'Obra clave sobre cómo los medios moldean la percepción y la cultura.', en: 'A key work on how media shape perception and culture.' },
      { t: 'La ciudad del hombre', a: 'Adriano Olivetti', url: 'https://www.amazon.es/dp/8832005492', es: 'Ensayo sobre humanismo empresarial y responsabilidad social.', en: 'An essay on corporate humanism and social responsibility.' },
      { t: 'Just Doing It: A History of Advertising', url: 'https://www.amazon.es/dp/B00S1YMW4E', es: 'La historia de la publicidad y sus figuras clave.', en: 'The history of advertising and its key figures.' },
      { t: 'Ugly Is Only Skin-Deep', a: 'Dominik Imseng', url: 'https://www.amazon.es/dp/B077KY21YG', es: 'Las campañas que transformaron la comunicación comercial (Think Small).', en: 'The campaigns that transformed commercial communication (Think Small).' },
      { t: "Bill Bernbach's Book", a: 'Bob Levenson', url: 'https://www.amazon.es/dp/0394549201', es: 'Homenaje al pionero de la creatividad publicitaria moderna.', en: 'A tribute to the pioneer of modern advertising creativity.' },
      { t: 'The Book of Gossage', a: 'Howard Luck Gossage', url: 'https://www.amazon.es/Book-Gossage-Howard-Luck/dp/1887229280', es: 'Retrato del outsider que anticipó el marketing participativo.', en: 'A portrait of the outsider who anticipated participatory marketing.' },
      { t: 'Ogilvy en la Publicidad', a: 'David Ogilvy', url: 'https://www.amazon.es/dp/8485902807', es: 'Manual esencial para construir mensajes y relaciones con consumidores.', en: 'The essential manual for building messages and consumer relationships.' },
      { t: 'Confessions of an Advertising Man', a: 'David Ogilvy', url: 'https://www.amazon.es/dp/190491537X', es: 'Autobiografía con lecciones de liderazgo, cultura y estrategia de marca.', en: 'An autobiography full of lessons on leadership, culture and brand strategy.' },
      { t: 'Life: The Movie', a: 'Neal Gabler', url: 'https://www.amazon.es/s?k=life+the+movie+neal+gabler', es: 'Cómo el entretenimiento conquistó la realidad y lo convirtió todo en espectáculo.', en: 'How entertainment conquered reality and turned everything into a show.' },
    ],
  },
  {
    id: 'liderazgo',
    es: {
      title: 'Liderazgo, gestión y cultura organizacional',
      desc: 'Cómo construir equipos, liderazgo auténtico y culturas de alto rendimiento.',
    },
    en: {
      title: 'Leadership, management & organizational culture',
      desc: 'How to build teams, authentic leadership and high-performance cultures.',
    },
    books: [
      { t: 'The Making of a Manager', a: 'Julie Zhuo', url: 'https://www.amazon.es/dp/0735219567', es: 'Qué hacer cuando todos te miran a ti y lideras por primera vez.', en: 'What to do when everyone looks to you and you lead for the first time.' },
      { t: 'Scaling People', a: 'Claire Hughes Johnson', url: 'https://www.amazon.es/dp/1953953212', es: 'Manual práctico para escalar equipos y construir organizaciones fuertes.', en: 'A practical manual for scaling teams and building strong organizations.' },
      { t: 'Good Authority', a: 'Jonathan Raymond', url: 'https://www.amazon.es/dp/1940858771', es: 'Cómo ejercer una autoridad sana basada en la confianza y la responsabilidad compartida.', en: 'How to exercise healthy authority based on trust and shared responsibility.' },
      { t: 'Powerful', a: 'Patty McCord', url: 'https://www.amazon.es/dp/1939714206', es: 'Los principios culturales que hicieron de Netflix una organización libre y de alto rendimiento.', en: 'The cultural principles that made Netflix a free, high-performance organization.' },
      { t: 'ReCulturing', a: 'Melissa Daimler', url: 'https://www.amazon.es/dp/1264278608', es: 'Rediseñar la cultura de empresa para alinearla con estrategia y propósito.', en: 'Redesigning company culture to align it with strategy and purpose.' },
      { t: 'What You Do Is Who You Are', a: 'Ben Horowitz', url: 'https://www.amazon.es/dp/0062871331', es: 'Las acciones, no las palabras, definen la cultura real de una compañía.', en: 'Actions, not words, define the real culture of a company.' },
      { t: 'Cuando las arañas tejen juntas pueden atar a un león', a: 'Daniel Coyle', url: 'https://www.amazon.es/dp/8416883173', es: 'Manifiesto sobre la fuerza del trabajo colectivo como base del liderazgo.', en: 'A manifesto on the power of collective work as the basis of leadership.' },
      { t: 'Aquí no hay reglas', a: 'Reed Hastings & Erin Meyer', url: 'https://www.amazon.es/dp/8416883807', es: 'La filosofía radical de Netflix: libertad, honestidad y reinvención constante.', en: "Netflix's radical philosophy: freedom, honesty and constant reinvention." },
      { t: 'Becoming Trader Joe', a: 'Joe Coulombe', url: 'https://www.amazon.es/dp/1400225434', es: 'Las memorias del fundador de Trader Joe\'s y cómo su visión humana creó una marca única.', en: "The memoirs of Trader Joe's founder and how his human vision created a unique brand." },
      { t: 'Meaning at Work', a: 'Danny Gutknecht', url: 'https://www.amazon.es/dp/0996814337', es: 'Cómo el lenguaje simbólico y emocional da sentido al trabajo.', en: 'How symbolic and emotional language gives meaning to work.' },
      { t: 'Made in Japan', a: 'Akio Morita', url: null, es: 'La historia del fundador de Sony y su visión sobre liderazgo, innovación y excelencia japonesa.', en: "The story of Sony's founder and his vision of leadership, innovation and Japanese excellence." },
      { t: 'How to Castrate a Bull', a: 'Dave Hitz & Pat Walsh', url: 'https://www.amazon.es/s?k=how+to+castrate+a+bull+dave+hitz', es: 'Lecciones poco convencionales de la construcción de NetApp: decisiones difíciles y supervivencia.', en: 'Unconventional lessons from building NetApp: hard decisions and survival.' },
      { t: 'High Output Management', a: 'Andrew S. Grove', url: 'https://www.amazon.es/s?k=high+output+management+andrew+grove', es: 'El manual de management por excelencia, escrito por el mítico CEO de Intel.', en: "The definitive management manual, written by Intel's legendary CEO." },
      { t: 'The Maverick and His Machine', a: 'Kevin Maney', url: 'https://www.amazon.es/s?k=the+maverick+and+his+machine+kevin+maney', es: 'Thomas Watson y el nacimiento de IBM: cómo se construye una cultura corporativa desde cero.', en: 'Thomas Watson and the birth of IBM: how a corporate culture is built from scratch.' },
      { t: 'A Higher Loyalty', a: 'James Comey', url: 'https://www.amazon.es/s?k=a+higher+loyalty+james+comey', es: 'Sobre liderazgo ético y lealtad a los principios por encima de las personas.', en: 'On ethical leadership and loyalty to principles over people.' },
    ],
  },
  {
    id: 'creatividad',
    es: {
      title: 'Creatividad, diseño y pensamiento visual',
      desc: 'El pensamiento creativo y visual como herramienta de liderazgo, innovación y conexión humana.',
    },
    en: {
      title: 'Creativity, design & visual thinking',
      desc: 'Creative and visual thinking as a tool for leadership, innovation and human connection.',
    },
    books: [
      { t: 'Emotion by Design', a: 'Greg Hoffman', url: 'https://www.amazon.es/dp/1847943543', es: 'Cómo Nike convirtió la emoción y el diseño en el corazón de su liderazgo creativo.', en: 'How Nike put emotion and design at the heart of its creative leadership.' },
      { t: 'How Design Makes the World', a: 'Scott Berkun', url: 'https://www.amazon.es/dp/0983873186', es: 'Cómo el diseño moldea la manera en que vivimos, pensamos y nos relacionamos.', en: 'How design shapes the way we live, think and relate to the world.' },
      { t: 'Fantasia', a: 'Bruno Munari', url: 'https://www.amazon.es/dp/8425230616', es: 'La imaginación como motor esencial de la creatividad y la innovación.', en: 'Imagination as the essential engine of creativity and innovation.' },
      { t: 'El arte como oficio', a: 'Bruno Munari', url: 'https://www.amazon.es/dp/8425232384', es: 'El arte desde una perspectiva funcional, donde belleza y utilidad se entrelazan.', en: 'Art from a functional perspective, where beauty and utility intertwine.' },
      { t: 'Seeing: Making Room for Thought', url: 'https://www.amazon.es/dp/1941753531', es: 'Libro visual que invita a ver el proceso creativo como una forma de pensamiento.', en: 'A visual book that treats the creative process as a form of thinking in itself.' },
      { t: 'Like Art', a: "Glenn O'Brien", url: 'https://bookstore.karmakarma.org/prod', es: 'Cómo el arte, la moda y la cultura pop se cruzan en el lenguaje visual contemporáneo.', en: 'How art, fashion and pop culture intersect in contemporary visual language.' },
      { t: 'CAPS LOCK', a: 'Ruben Pater', url: 'https://www.amazon.es/dp/9492095815', es: 'Crítica al papel del diseño en el capitalismo y guía para recuperar su poder cultural.', en: "A critique of design's role in capitalism and a guide to reclaiming its cultural power." },
      { t: 'Atlas of Modern Clothing', url: 'https://www.amazon.es/dp/9887711098', es: 'Recorrido visual por la evolución del diseño textil y su impacto en la identidad moderna.', en: 'A visual journey through textile design and its impact on modern identity.' },
      { t: 'Textilepedia', a: 'Fashionary', url: null, es: 'Enciclopedia práctica sobre tejidos, materiales y técnicas para el diseño de moda.', en: 'A practical encyclopedia of fabrics, materials and techniques for fashion design.' },
      { t: 'Museum of Capitalism', a: 'FICTILIS (eds.)', url: 'https://www.inventorypress.com/product/museum-of-capitalism', es: 'Proyecto artístico que convierte el capitalismo en objeto museístico.', en: 'An art project that turns capitalism into a museum object, questioning its symbols.' },
      { t: 'Dimensions of Citizenship', url: 'https://www.amazon.es/dp/1941753191', es: 'Diseño y arquitectura como herramientas políticas que redefinen la ciudadanía moderna.', en: 'Design and architecture as political tools that redefine modern citizenship.' },
      { t: 'El acto de crear', a: 'Rick Rubin', url: 'https://www.amazon.es/dp/8411191060', es: 'Una visión filosófica sobre la creatividad como modo de vida.', en: 'A philosophical vision of creativity as a way of life.' },
      { t: 'Crea', a: 'Tony Fadell', url: 'https://www.amazon.es/dp/8417992316', es: 'Guía poco ortodoxa para hacer cosas que marquen la diferencia.', en: 'An unorthodox guide to making things that make a difference.' },
      { t: 'Aprender a Aprender', a: 'Barbara Oakley', url: 'https://www.amazon.es/dp/849111744X', es: 'Dominar el proceso de aprendizaje para potenciar creatividad y enfoque.', en: 'Mastering the learning process to boost creativity and focus.' },
    ],
  },
  {
    id: 'negocio',
    es: {
      title: 'Estrategia, negocios y crecimiento',
      desc: 'Estructuras, sistemas y marcos para escalar organizaciones, productos e ideas.',
    },
    en: {
      title: 'Strategy, business & growth',
      desc: 'Structures, systems and frameworks for scaling organizations, products and ideas.',
    },
    books: [
      { t: 'Buena Estrategia, Mala Estrategia', a: 'Richard P. Rumelt', url: 'https://www.amazon.es/dp/8419558443', es: 'Cómo definir y ejecutar estrategias efectivas.', en: 'How to define and execute effective strategy.' },
      { t: 'Exponential Organizations', a: 'Salim Ismail', url: 'https://www.amazon.es/dp/1626814236', es: 'Por qué algunas empresas crecen 10 veces más rápido.', en: 'Why some companies grow ten times faster.' },
      { t: 'Traction (EOS)', a: 'Gino Wickman', url: 'https://www.amazon.es/dp/1936661837', es: 'Sistema práctico para escalar negocios con estructura.', en: 'A practical system for scaling businesses with structure.' },
      { t: 'Made to Stick', a: 'Chip & Dan Heath', url: 'https://www.amazon.es/dp/1400064287', es: 'Qué hace que las ideas se queden en la mente de las personas.', en: "What makes ideas stick in people's minds." },
      { t: '$100M Offers', a: 'Alex Hormozi', url: 'https://www.amazon.es/dp/B099QVG1H8', es: 'Cómo crear ofertas tan buenas que los clientes se sientan obligados a comprar.', en: 'How to create offers so good customers feel compelled to buy.' },
      { t: 'Sponsor Magnet', a: 'Justin Moore', url: 'https://www.amazon.es/s?k=sponsor+magnet+justin+moore', es: 'Cómo convertirte en una marca irresistible para sponsors.', en: 'How to become an irresistible brand for sponsors.' },
      { t: 'Super Pumped: The Battle for Uber', a: 'Mike Isaac', url: 'https://www.amazon.es/dp/0393358615', es: 'El ascenso de Uber y su cultura de crecimiento extremo.', en: "Uber's rise and its culture of extreme growth." },
      { t: 'Powerhouse: The Untold Story of CAA', a: 'James Andrew Miller', url: 'https://www.amazon.es/dp/B01EB1TX60', es: 'La agencia que cambió para siempre el negocio del entretenimiento.', en: 'The agency that changed the entertainment business forever.' },
      { t: 'Those Guys Have All the Fun: Inside ESPN', a: 'J. A. Miller & Tom Shales', url: 'https://www.amazon.es/dp/0316043001', es: 'Crónica del imperio mediático de ESPN y su cultura interna.', en: "A chronicle of ESPN's media empire and its internal culture." },
      { t: 'El Punto Clave', a: 'Malcolm Gladwell', url: 'https://www.amazon.es/dp/8430606343', es: 'Cómo los pequeños cambios provocan grandes transformaciones.', en: 'How small changes spark big transformations.' },
      { t: 'Upgrade', a: 'David Alayón', url: 'https://www.amazon.es/dp/8411310213', es: 'Cómo evolucionar profesionalmente en la era digital.', en: 'How to evolve professionally in the digital era.' },
      { t: 'The Cold Start Problem', a: 'Andrew Chen', url: 'https://www.amazon.es/dp/1847942784', es: 'Cómo escalar productos y plataformas usando efectos de red.', en: 'How to scale products and platforms using network effects.' },
      { t: 'Only the Paranoid Survive', a: 'Andrew S. Grove', url: 'https://www.amazon.es/s?k=only+the+paranoid+survive+andrew+grove', es: 'Cómo detectar los puntos de inflexión estratégicos antes de que te destruyan.', en: 'How to spot strategic inflection points before they destroy you.' },
      { t: 'The Lean Startup', a: 'Eric Ries', url: 'https://www.amazon.es/s?k=the+lean+startup+eric+ries', es: 'El método que cambió cómo se construyen productos: iterar rápido, aprender antes.', en: 'The method that changed how products are built: iterate fast, learn sooner.' },
      { t: 'The Start-up of You', a: 'Reid Hoffman', url: 'https://www.amazon.es/s?k=the+startup+of+you+reid+hoffman', es: 'Gestionar tu carrera como una startup: adaptabilidad, red y apuestas inteligentes.', en: 'Managing your career like a startup: adaptability, network and smart bets.' },
      { t: 'When the Wolves Bite', a: 'Scott Wapner', url: 'https://www.amazon.es/s?k=when+the+wolves+bite+scott+wapner', es: 'Ackman contra Icahn por Herbalife: poder, ego y dinero en Wall Street.', en: 'Ackman vs. Icahn over Herbalife: power, ego and money on Wall Street.' },
    ],
  },
  {
    id: 'ficcion',
    es: {
      title: 'Ficción y narrativa inspiracional',
      desc: 'Obras literarias que expanden la imaginación estratégica y la comprensión humana.',
    },
    en: {
      title: 'Fiction & inspirational narrative',
      desc: 'Literary works that expand strategic imagination and human understanding.',
    },
    books: [
      { t: 'Fundación', a: 'Isaac Asimov', url: 'https://www.amazon.es/dp/8418037547', es: 'El auge y la caída de un imperio galáctico: el poder del conocimiento y la predicción social.', en: 'The rise and fall of a galactic empire: the power of knowledge and social prediction.' },
      { t: 'El Problema de los Tres Cuerpos', a: 'Cixin Liu', url: 'https://www.amazon.es/dp/8413146925', es: 'Ciencia, filosofía y geopolítica en una epopeya que redefine la ciencia ficción moderna.', en: 'Science, philosophy and geopolitics in an epic that redefines modern sci-fi.' },
      { t: 'Zeroville', a: 'Steve Erickson', url: 'https://www.amazon.es/dp/1933372397', es: 'Hollywood como un sueño febril de arte, obsesión y destrucción.', en: 'Hollywood as a fever dream of art, obsession and destruction.' },
      { t: 'Blood Meridian', a: 'Cormac McCarthy', url: 'https://www.amazon.es/dp/0679728759', es: 'Epopeya brutal sobre la violencia y la condición humana en el oeste americano.', en: 'A brutal epic on violence and the human condition in the American West.' },
      { t: "Fear and Loathing on the Campaign Trail '72", a: 'Hunter S. Thompson', url: 'https://www.amazon.es/dp/1451691572', es: 'La política americana desde el caos y el humor del periodismo gonzo.', en: 'American politics through the chaos and humor of gonzo journalism.' },
      { t: 'En la Tierra somos fugazmente grandiosos', a: 'Ocean Vuong', url: 'https://www.amazon.es/dp/8433980599', es: 'Novela epistolar y poética sobre identidad, amor, memoria y lenguaje.', en: 'A poetic epistolary novel on identity, love, memory and language.' },
      { t: 'Solaris', a: 'Stanisław Lem', url: 'https://www.amazon.es/s?k=solaris+stanislaw+lem', es: 'El clásico de la ciencia ficción sobre los límites de la comunicación con lo verdaderamente otro.', en: 'The sci-fi classic on the limits of communicating with the truly alien.' },
      { t: 'Nuestra parte de la noche', a: 'Mariana Enriquez', url: 'https://www.amazon.es/s?k=nuestra+parte+de+la+noche+mariana+enriquez', es: 'Terror, política y herencia en una de las grandes novelas en español de los últimos años.', en: 'Horror, politics and inheritance in one of the great Spanish-language novels of recent years.' },
      { t: 'La muerte de Iván Ilich', a: 'Lev Tolstói', url: 'https://www.amazon.es/s?k=la+muerte+de+ivan+ilich+tolstoi', es: 'Tolstói frente a la pregunta definitiva: qué significa haber vivido de verdad.', en: 'Tolstoy facing the ultimate question: what it means to have truly lived.' },
    ],
  },
  {
    id: 'filosofia',
    es: {
      title: 'Filosofía, psicología y sociedad',
      desc: 'Comprender la mente, el comportamiento humano y las dinámicas sociales y culturales que definen nuestra era.',
    },
    en: {
      title: 'Philosophy, psychology & society',
      desc: 'Understanding the mind, human behavior and the social and cultural dynamics that define our era.',
    },
    books: [
      { t: 'El valor de la atención', a: 'Johann Hari', url: 'https://www.amazon.es/dp/8411001296', es: 'Cómo la economía de la distracción captura nuestra mente y cómo recuperar el foco.', en: 'How the distraction economy captures our minds and how to reclaim focus.' },
      { t: 'Capitalismo para el siglo XXI', url: null, es: 'Cómo reformular el sistema económico hacia un modelo más sostenible, humano y ético.', en: 'Rethinking the economic system toward a more sustainable, human and ethical model.' },
      { t: 'El Individuo Soberano', a: 'Davidson & Rees-Mogg', url: 'https://www.amazon.es/dp/8468565679', es: 'Obra visionaria que anticipa la era digital y la independencia del individuo frente al Estado.', en: 'A visionary work anticipating the digital era and individual independence from the state.' },
      { t: 'Narrativas económicas', a: 'Robert J. Shiller', url: 'https://www.amazon.es/dp/8423432165', es: 'Cómo las historias que contamos sobre la economía moldean nuestras decisiones colectivas.', en: 'How the stories we tell about the economy shape our collective decisions.' },
      { t: 'La marca de Dios', a: 'Leopoldo Abadía & Toni Segarra', url: 'https://www.amazon.es/dp/8467064609', es: 'El cristianismo como la marca cultural más influyente de la historia.', en: 'Christianity as the most influential cultural brand in history.' },
      { t: 'La era del vacío', a: 'Gilles Lipovetsky', url: 'https://www.amazon.es/dp/843396755X', es: 'La sociedad posmoderna dominada por el individualismo y el hedonismo.', en: 'Postmodern society ruled by individualism and hedonism.' },
      { t: 'Vida líquida', a: 'Zygmunt Bauman', url: 'https://www.amazon.es/dp/8408040952', es: 'La fragilidad de las relaciones, la identidad y el sentido en la modernidad líquida.', en: 'The fragility of relationships, identity and meaning in liquid modernity.' },
      { t: 'El hombre unidimensional', a: 'Herbert Marcuse', url: 'https://www.amazon.es/dp/840815124X', es: 'Crítica a la sociedad industrial y su capacidad para domesticar el pensamiento crítico.', en: 'A critique of industrial society and its power to tame critical thinking.' },
      { t: 'La crisis de la narración', a: 'Byung-Chul Han', url: 'https://www.amazon.es/dp/8425450438', es: 'Cómo la pérdida de relatos colectivos afecta nuestra comprensión del mundo.', en: 'How the loss of collective stories affects our understanding of the world.' },
      { t: 'La vía de la narración', a: 'Alessandro Baricco', url: 'https://www.amazon.es/dp/8433901885', es: 'La narración como herramienta esencial de conocimiento, memoria e identidad.', en: 'Narrative as an essential tool for knowledge, memory and identity.' },
      { t: 'Buena economía para tiempos difíciles', a: 'Banerjee & Duflo', url: 'https://www.amazon.es/dp/8430619836', es: 'Los Nobel desmontan mitos sobre la pobreza y proponen soluciones realistas.', en: 'The Nobel laureates dismantle myths about poverty and propose realistic solutions.' },
      { t: 'The Road to Freedom', a: 'Joseph Stiglitz', url: 'https://www.amazon.es/dp/132407437X', es: 'La relación entre libertad económica, ética y bienestar social.', en: 'The relationship between economic freedom, ethics and social well-being.' },
      { t: 'The War of Art', a: 'Steven Pressfield', url: 'https://www.amazon.es/dp/1936891026', es: 'Una llamada a superar la resistencia interna y liberar el potencial creativo.', en: 'A call to overcome inner resistance and unlock creative potential.' },
      { t: 'Gates of Fire', a: 'Steven Pressfield', url: 'https://www.amazon.es/dp/B0078ZBUXG', es: 'Honor, disciplina y sacrificio en la batalla de las Termópilas.', en: 'Honor, discipline and sacrifice at the battle of Thermopylae.' },
      { t: 'The Obstacle Is the Way', a: 'Ryan Holiday', url: 'https://www.amazon.es/dp/0593719913', es: 'Estoicismo práctico para transformar los obstáculos en crecimiento.', en: 'Practical stoicism for turning obstacles into growth.' },
      { t: 'The Courage to Be Disliked', a: 'Kishimi & Koga', url: 'https://www.amazon.es/dp/1668065967', es: 'Psicología adleriana para liberarse de la necesidad de aprobación ajena.', en: 'Adlerian psychology for freeing yourself from the need for approval.' },
      { t: 'Rompe la barrera del no', a: 'Chris Voss', url: 'https://www.amazon.es/dp/8416029741', es: 'Técnicas de negociación de alto nivel inspiradas en la experiencia del FBI.', en: 'High-level negotiation techniques drawn from FBI experience.' },
      { t: 'Respira', a: 'James Nestor', url: 'https://www.amazon.es/dp/8408237225', es: 'El poder transformador de la respiración consciente en la salud y el bienestar.', en: 'The transformative power of conscious breathing for health and well-being.' },
      { t: 'Dopamina', a: 'Daniel Z. Lieberman', url: 'https://www.amazon.es/dp/8411000109', es: 'Cómo una molécula condiciona la motivación, el deseo y la conducta humana.', en: 'How one molecule conditions motivation, desire and human behavior.' },
      { t: 'Story 10x', a: 'Michael Margolis', url: 'https://www.amazon.es/dp/1989025587', es: 'Usar la narrativa para convertir visiones ambiciosas en realidades alcanzables.', en: 'Using narrative to turn ambitious visions into achievable realities.' },
      { t: 'The 4-Hour Workweek', a: 'Tim Ferriss', url: 'https://www.amazon.es/dp/0307465357', es: 'Redefine el éxito laboral y enseña a diseñar una vida libre y eficiente.', en: 'Redefines work success and teaches you to design a free, efficient life.' },
      { t: 'Antropología Filosófica', a: 'Ernst Cassirer', url: 'https://www.amazon.es/dp/607163735X', es: 'La naturaleza simbólica del ser humano y su capacidad de crear significado.', en: 'The symbolic nature of human beings and our capacity to create meaning.' },
      { t: 'La rebelión de las masas', a: 'Ortega y Gasset', url: 'https://www.amazon.es/dp/8467031786', es: 'El ascenso de las masas y la pérdida de liderazgo cultural.', en: 'The rise of the masses and the loss of cultural leadership.' },
      { t: 'Homo Videns', a: 'Giovanni Sartori', url: 'https://www.amazon.es/dp/8430600795', es: 'Crítica al dominio de la imagen y su impacto en la democracia y el pensamiento.', en: "A critique of the image's dominance and its impact on democracy and thought." },
      { t: 'El mundo patas arriba', a: 'Eduardo Galeano', url: 'https://www.amazon.es/dp/B0CH1NHY7Y', es: 'Reflexión crítica y poética sobre la desigualdad y el poder en un mundo al revés.', en: 'A critical, poetic reflection on inequality and power in an upside-down world.' },
      { t: 'Hipercomplejidad', a: 'Sergio Parra', url: 'https://www.amazon.es/s?k=hipercomplejidad+libro', es: 'Cómo pensar y decidir en un mundo de sistemas cada vez más complejos.', en: 'How to think and decide in a world of ever more complex systems.' },
      { t: 'Thinking, Fast and Slow', a: 'Daniel Kahneman', url: 'https://www.amazon.es/s?k=thinking+fast+and+slow+kahneman', es: 'Los dos sistemas de la mente y los sesgos que gobiernan nuestras decisiones. Fundamental.', en: 'The two systems of the mind and the biases that rule our decisions. Essential.' },
      { t: 'Thinking in Bets', a: 'Annie Duke', url: 'https://www.amazon.es/s?k=thinking+in+bets+annie+duke', es: 'Decidir como un jugador de póker: en apuestas, no en certezas.', en: 'Deciding like a poker player: in bets, not certainties.' },
      { t: 'Antifragile', a: 'Nassim Nicholas Taleb', url: 'https://www.amazon.es/s?k=antifragile+nassim+taleb', es: 'Sistemas que no solo resisten el caos, sino que mejoran con él.', en: 'Systems that not only withstand chaos but improve because of it.' },
      { t: '12 Rules for Life', a: 'Jordan B. Peterson', url: 'https://www.amazon.es/s?k=12+rules+for+life+jordan+peterson', es: 'Un antídoto al caos: responsabilidad individual como base del sentido.', en: 'An antidote to chaos: individual responsibility as the basis of meaning.' },
      { t: 'The Rational Optimist', a: 'Matt Ridley', url: 'https://www.amazon.es/s?k=the+rational+optimist+matt+ridley', es: 'Por qué el intercambio y las ideas hacen que el mundo mejore, contra todo pesimismo.', en: 'Why exchange and ideas keep making the world better, against all pessimism.' },
      { t: 'The Inevitable', a: 'Kevin Kelly', url: 'https://www.amazon.es/s?k=the+inevitable+kevin+kelly', es: 'Las 12 fuerzas tecnológicas que van a moldear las próximas décadas.', en: 'The 12 technological forces that will shape the coming decades.' },
      { t: 'Last Call', a: 'Daniel Okrent', url: 'https://www.amazon.es/s?k=last+call+daniel+okrent+prohibition', es: 'La historia de la Ley Seca: cómo una sociedad entera intentó legislar la moral.', en: 'The story of Prohibition: how an entire society tried to legislate morality.' },
      { t: 'The Way We Never Were', a: 'Stephanie Coontz', url: 'https://www.amazon.es/s?k=the+way+we+never+were+stephanie+coontz', es: 'Desmonta la nostalgia: la familia tradicional americana nunca fue como la recordamos.', en: 'Dismantles nostalgia: the traditional American family was never what we remember.' },
      { t: 'And the Money Kept Rolling In (and Out)', a: 'Paul Blustein', url: 'https://www.amazon.es/s?k=and+the+money+kept+rolling+in+paul+blustein', es: 'La crisis argentina y el FMI: anatomía de un colapso económico anunciado.', en: "Argentina's crisis and the IMF: anatomy of a foretold economic collapse." },
      { t: 'Confessions of an Economic Hit Man', a: 'John Perkins', url: 'https://www.amazon.es/s?k=confessions+of+an+economic+hit+man+john+perkins', es: 'La cara oculta del poder económico global, contada desde dentro.', en: 'The hidden face of global economic power, told from the inside.' },
      { t: "The Myth of America's Decline", a: 'Josef Joffe', url: 'https://www.amazon.es/s?k=the+myth+of+americas+decline+josef+joffe', es: 'Contra el declive anunciado: por qué las profecías sobre la caída de América fallan.', en: "Against foretold decline: why prophecies of America's fall keep failing." },
      { t: 'Infamous Scribblers', a: 'Eric Burns', url: 'https://www.amazon.es/s?k=infamous+scribblers+eric+burns', es: 'El periodismo salvaje de los padres fundadores: las fake news no son nuevas.', en: "The founding fathers' savage journalism: fake news is nothing new." },
      { t: 'How to Live', a: 'Sarah Bakewell', url: 'https://www.amazon.es/s?k=how+to+live+sarah+bakewell+montaigne', es: 'La vida de Montaigne como respuesta a la pregunta de cómo vivir.', en: "Montaigne's life as an answer to the question of how to live." },
      { t: 'A Guide to the Good Life', a: 'William B. Irvine', url: 'https://www.amazon.es/s?k=a+guide+to+the+good+life+william+irvine', es: 'El estoicismo como sistema práctico para una vida serena y con propósito.', en: 'Stoicism as a practical system for a calm, purposeful life.' },
    ],
  },
];

const UI = {
  es: {
    nav: { home: 'Home', cv: 'Trayectoria', blog: 'Blog', library: 'Biblioteca', contact: 'Contacto' },
    kicker: '/biblioteca — para crear y pensar mejor',
    title: 'Biblioteca.',
    lead: 'Un espacio donde se cruzan ideas para aprender, imaginar y estar siempre listo ante los desafíos que vienen. A surfear las olas.',
    intro:
      'Libros que inspiran a pensar distinto, construir mejor y ver las cosas con más profundidad (y a veces, con más calma). Recogidos desde la necesidad, la curiosidad y de las personas que más admiro. Se actualiza constantemente.',
    booksLabel: 'libros',
    updated: 'biblioteca viva — en constante actualización',
    get: 'Conseguir',
  },
  en: {
    nav: { home: 'Home', cv: 'Career', blog: 'Blog', library: 'Library', contact: 'Contact' },
    kicker: '/library — to create and think better',
    title: 'Library.',
    lead: 'A space where ideas cross paths to learn, imagine and stay ready for whatever comes next. Surf the waves.',
    intro:
      'Books that inspire you to think differently, build better and see things with more depth (and sometimes, more calm). Collected out of necessity, curiosity and from the people I admire most. Updated constantly.',
    booksLabel: 'books',
    updated: 'a living library — constantly updated',
    get: 'Get it',
  },
};

export default function BibliotecaPage() {
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const bl = (typeof navigator !== 'undefined' && navigator.language) || 'es';
    setLang(bl.toLowerCase().startsWith('es') ? 'es' : 'en');
  }, []);

  const t = UI[lang];
  const total = CATS.reduce((n, c) => n + c.books.length, 0);

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
            <span className="nav-link active">{t.nav.library}</span>
            <Link href="/?go=contact" className="nav-link">{t.nav.contact}</Link>
            <div className="mono text-[11px] hidden md:flex items-center gap-1.5" style={{ color: 'var(--ink-35)' }}>
              <button onClick={() => setLang('es')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: lang === 'es' ? 'var(--ink)' : 'inherit' }}>ES</button>
              <span>/</span>
              <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: lang === 'en' ? 'var(--ink)' : 'inherit' }}>EN</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 md:px-8 pb-20" style={{ paddingTop: 120 }}>
        <div className="microlabel mb-8 rise">{t.kicker}</div>
        <h1 className="display text-[clamp(44px,7.5vw,96px)] rise" style={{ animationDelay: '100ms', color: 'var(--ink)' }}>{t.title}</h1>
        <p className="serif-i text-[clamp(20px,2.6vw,28px)] mt-4 max-w-3xl rise" style={{ animationDelay: '200ms', color: 'var(--ink-50)' }}>
          {t.lead}
        </p>
        <p className="text-[15px] md:text-[16px] leading-relaxed max-w-2xl mt-8 mb-6 rise" style={{ animationDelay: '300ms', color: 'var(--ink-70)' }}>
          {t.intro}
        </p>
        <div className="mono text-[11px] uppercase tracking-[0.16em] mb-20 rise flex items-center gap-2.5" style={{ animationDelay: '380ms', color: 'var(--ink-35)' }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--green)', filter: 'brightness(0.85)' }} />
          {total} {t.booksLabel} · {t.updated}
        </div>

        {CATS.map((cat, ci) => (
          <section key={cat.id} className="mb-16 md:mb-20">
            <div className="hairline-b pb-5 mb-2">
              <div className="flex items-baseline gap-4">
                <span className="mono text-[11px]" style={{ color: 'var(--ink-35)' }}>{String(ci + 1).padStart(2, '0')}</span>
                <h2 className="display text-[22px] md:text-[28px]" style={{ color: 'var(--ink)', fontWeight: 600 }}>{cat[lang].title}</h2>
              </div>
              <p className="text-[14px] leading-relaxed mt-2 max-w-2xl md:pl-10" style={{ color: 'var(--ink-50)' }}>{cat[lang].desc}</p>
            </div>
            <div>
              {cat.books.map((b, i) => (
                <div key={i} className="py-5 hairline-b grid md:grid-cols-12 gap-2 md:gap-6" style={{ borderColor: 'rgba(22,21,19,0.08)' }}>
                  <div className="md:col-span-5">
                    {b.url ? (
                      <a href={withTag(b.url)} target="_blank" rel="noreferrer" className="link-u serif-i text-[19px] md:text-[21px] leading-snug" style={{ color: 'var(--ink)' }}>
                        {b.t}
                      </a>
                    ) : (
                      <span className="serif-i text-[19px] md:text-[21px] leading-snug" style={{ color: 'var(--ink)' }}>{b.t}</span>
                    )}
                    {b.a && <div className="mono text-[10px] uppercase tracking-[0.14em] mt-1.5" style={{ color: 'var(--ink-50)' }}>{b.a}</div>}
                  </div>
                  <div className="md:col-span-7 flex items-start justify-between gap-4">
                    <p className="text-[14px] md:text-[14.5px] leading-relaxed" style={{ color: 'var(--ink-70)' }}>{b[lang]}</p>
                    {b.url && (
                      <a href={withTag(b.url)} target="_blank" rel="noreferrer" className="mono text-[10px] uppercase tracking-[0.14em] link-u shrink-0 hidden md:inline" style={{ color: 'var(--ink-35)' }}>
                        {t.get} →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="hairline-t">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 flex flex-wrap items-center justify-between gap-4 mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--ink-35)' }}>
          <span>© 2008–2026 alejandro marcos</span>
        </div>
      </footer>
    </div>
  );
}
