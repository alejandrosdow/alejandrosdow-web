import ImageWithFallback from "@/components/ImageWithFallback";

const schools = [
  { name: "ISDI",                     logo: "/logo-isdi.png" },
  { name: "ESADE",                    logo: "/logo-esade.png" },
  { name: "Nebrija",                  logo: "/logo-nebrija.png" },
  { name: "The Core",                 logo: "/logo-thecore.png" },
  { name: "Unie",                     logo: "/logo-unie.png" },
  { name: "Mondragon Unibertsitatea", logo: "/logo-mondragon.png" },
];

export default function Teaching() {
  return (
    <section className="px-6 md:px-8 py-14 md:py-20 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xs text-neutral-400 uppercase tracking-widest mb-10">
          Docencia
        </h2>

        <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-12 max-w-xl">
          Llevo años trasladando al aula todo lo que aprendo en la calle y en
          internet. He impartido formación sobre marketing digital, construcción
          de comunidades, estrategia de marca y cultura de internet en algunas
          de las escuelas más importantes de España, tanto como
          profesor como a través de masterclasses y ponencias.
        </p>

        <div className="flex flex-wrap items-center gap-8 md:gap-12">
          {schools.map((school) => (
            <div key={school.name} className="flex items-center">
              <ImageWithFallback
                src={school.logo}
                alt={school.name}
                fallbackText={school.name}
                className="h-[40px] w-auto object-contain grayscale opacity-50 hover:opacity-80 transition-opacity"
                fallbackClassName="text-sm text-neutral-400 font-medium"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
