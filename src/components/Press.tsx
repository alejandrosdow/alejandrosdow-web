const pressItems = [
  {
    outlet: "Podcast",
    title: "Cómo construir comunidades en internet",
    href: "#",
  },
  {
    outlet: "Entrevista",
    title: "El futuro del marketing de comunidad",
    href: "#",
  },
  {
    outlet: "Artículo",
    title: "Team Heretics: la marca detrás del equipo",
    href: "#",
  },
  {
    outlet: "Masterclass",
    title: "Internet Surfer: leyendo el zeitgeist digital",
    href: "#",
  },
];

export default function Press() {
  return (
    <section className="px-6 md:px-8 py-14 md:py-20 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-sm text-neutral-400 uppercase tracking-widest mb-12">
          Prensa & apariciones
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-100">
          {pressItems.map((item, i) => (
            <div key={i} className="bg-[#fafafa] p-6">
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">
                {item.outlet}
              </p>
              <p className="text-sm font-medium text-black leading-snug mb-4">
                {item.title}
              </p>
              <a
                href={item.href}
                className="text-xs text-neutral-400 hover:text-black transition-colors"
              >
                Leer →
              </a>
            </div>
          ))}
        </div>

        <p className="text-xs text-neutral-300 mt-6 text-center">
          Próximamente más menciones y apariciones
        </p>
      </div>
    </section>
  );
}
