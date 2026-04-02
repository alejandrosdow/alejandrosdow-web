import ImageWithFallback from "@/components/ImageWithFallback";

const ahora = [
  {
    role: "CMO",
    company: "Team Heretics",
    period: "2018–presente",
    description:
      "Lidero la marca y comunidad global de Team Heretics y trabajo de forma transversal con el Holding. Monetización de audiencias en internet a través del B2B o B2C.",
    logo: "/logo-heretics.png",
    logoFallback: "TH",
  },
  {
    role: "Brand & Marketing Advisor",
    company: "GenLayer",
    period: "2025–presente",
    description: "IA + Blockchain. Estrategia de marca y go-to-market.",
    logo: "/logo-genlayer.png",
    logoFallback: "GL",
  },
  {
    role: "Freelance",
    company: "para creadores, empresas o particulares",
    period: "2018–presente",
    description:
      "Narrativa, estrategia, construcción de marca, comunidad y monetización de audiencias.",
    logo: "/logo-freelance.png",
    logoFallback: "FL",
  },
];

const empresa = [
  {
    role: "CMO",
    company: "Cooler Master Iberia",
    period: "2017–2019",
    description:
      "Estrategia, plan y ejecución de marca en España y Portugal para una de las marcas de hardware más reconocidas del sector gaming.",
  },
  {
    role: "Productor & Presentador",
    company: "Movistar / GAME TV",
    period: "2016–2017",
    description:
      "Producción, guión y cara del primer canal de gaming/esports en televisión.",
  },
  {
    role: "Head of Publishers, Talents & Esports",
    company: "GAME Stores",
    period: "2015–2016",
    description:
      "Gestioné las relaciones con publishers internacionales, creadores de contenido y ayudé a construir el área de esports de la cadena de tiendas más importante de videojuegos en España y UK. Parte del equipo responsable de Madrid Gaming Experience (+120K asistentes), Barcelona Games World y Fun'n'Serious Bilbao.",
  },
  {
    role: "Marketing Manager",
    company: "SocialNAT",
    period: "2013–2015",
    description:
      "Primeros años gestionando campañas y comunidades digitales. También como narrador y cara de la compañía.",
  },
  {
    role: "Creador de contenido",
    company: "Machinima / LVP / ESL",
    period: "2008–2013",
    description:
      "Todo empieza aquí. Una webcam, un micrófono y un portátil. Uno de los primeros contratos de Machinima en España y colaborador habitual de LVP y ESL.",
  },
  {
    role: "Jugador profesional",
    company: "Call of Duty · Pain Gaming",
    period: "2011",
    description: "Campeón nacional. 9º en el Mundial de Los Ángeles en 2011.",
  },
];

const fundador = [
  {
    name: "JULIO",
    period: "2025",
    description:
      "Lanzamos la primera memebrand hispanohablante. Un proyecto que desarrolló un estilo de vida y filosofía basada en el Mediterráneo a través de la imagen de JULIO, monetizando con productos, servicios y la construcción de una comunidad.",
  },
  {
    name: "SCALELAB",
    period: "2024",
    description:
      "Ayudé al equipo fundador en el boom de las formaciones online e infoproductos para creadores de contenido. Construimos el ciclo completo: producto, plataforma, marketing y equipos de ventas.",
  },
  {
    name: "Zhander App",
    period: "2020–2023",
    description:
      "Aplicación para ocio nocturno para digitalizar el rol del PR tradicional. Lanzamos la plataforma y creamos nuestro propio evento 'Algodón' de la mano de Antídoto.",
  },
  {
    name: "OLAGG",
    period: "2020",
    description:
      "Inversor minoritario. Apuesta early en la intersección de blockchain, gaming y esports.",
  },
  {
    name: "XYON Agency",
    period: "2015–2016",
    description:
      "Lanzamos una agencia en España especializada en marcas gaming y management de creadores. Antes de que fuera un negocio evidente.",
  },
];

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">
      {label}
    </p>
  );
}

function ItemRow({
  role,
  company,
  period,
  description,
  logo,
  logoFallback,
}: {
  role: string;
  company: string;
  period: string;
  description?: string;
  logo?: string | null;
  logoFallback?: string | null;
}) {
  return (
    <div className="py-5 border-b border-neutral-100">
      <div className="flex items-start gap-4">
        {logo !== undefined && (
          <div className="shrink-0 w-8 h-8 flex items-center justify-center">
            {logo ? (
              <ImageWithFallback
                src={logo}
                alt={company}
                fallbackText={logoFallback ?? ""}
                className="w-8 h-8 object-contain"
                fallbackClassName="text-xs font-semibold text-neutral-400"
              />
            ) : logoFallback ? (
              <span className="text-xs font-semibold text-neutral-300">
                {logoFallback}
              </span>
            ) : null}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <div>
              <span className="font-semibold text-black text-sm">{role}</span>
              <span className="text-neutral-500 text-sm"> — {company}</span>
            </div>
            <span className="text-xs text-neutral-400 shrink-0">{period}</span>
          </div>
          {description && (
            <p className="text-sm text-neutral-500 leading-relaxed mt-1.5">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectRow({
  name,
  period,
  description,
}: {
  name: string;
  period: string;
  description: string;
}) {
  return (
    <div className="py-5 border-b border-neutral-100">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-1.5">
        <span className="font-semibold text-black text-sm">{name}</span>
        <span className="text-xs text-neutral-400">{period}</span>
      </div>
      <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
    </div>
  );
}

export default function Experience() {
  return (
    <section className="px-6 md:px-8 py-14 md:py-20 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xs text-neutral-400 uppercase tracking-widest mb-12">
          Trayectoria
        </h2>

        {/* AHORA */}
        <div className="mb-10">
          <SectionLabel label="Ahora" />
          <div className="border-t border-neutral-100">
            {ahora.map((item) => (
              <ItemRow key={item.company} {...item} />
            ))}
          </div>
        </div>

        {/* EMPRESA */}
        <div className="mb-10">
          <SectionLabel label="Empresa" />
          <div className="border-t border-neutral-100">
            {empresa.map((item) => (
              <ItemRow key={`${item.role}-${item.company}`} {...item} logo={undefined} logoFallback={undefined} />
            ))}
          </div>
        </div>

        {/* FUNDADOR & INVERSOR */}
        <div>
          <SectionLabel label="Fundador & Inversor" />
          <div className="border-t border-neutral-100">
            {fundador.map((item) => (
              <ProjectRow key={item.name} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
