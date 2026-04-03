const bloques = [
  {
    titulo: "Narrativa",
    desc: "Tu posición en el mundo, tu cosmovisión y cómo la articulas. Sin una narrativa clara, todo lo demás es ruido.",
  },
  {
    titulo: "Comunidad",
    desc: "Convertir audiencia en gente que quiere formar parte de lo que construyes. No seguidores. Personas comprometidas con tu visión.",
  },
  {
    titulo: "Sistemas",
    desc: "Contenido, distribución y crecimiento con estructura. No publicar por publicar. Una lógica que escala.",
  },
];

export default function Solucion() {
  return (
    <section className="px-6 md:px-8 py-14 md:py-20 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xs text-neutral-400 uppercase tracking-widest mb-10">
          En qué trabajo
        </h2>

        <p className="text-lg md:text-xl font-medium text-[#0a0a0a] mb-10 leading-snug">
          Eso es exactamente en lo que trabajo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {bloques.map((b) => (
            <div key={b.titulo}>
              <p className="text-sm font-semibold text-black mb-2">{b.titulo}</p>
              <p className="text-sm text-neutral-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-sm md:text-[15px] text-neutral-500 leading-relaxed mt-10 pt-8 border-t border-neutral-100">
          Podemos trabajar de varias formas: te ayudo en sesiones individuales, como un part-time CMO o CBO, o formando un equipo de trabajo con profesionales para darte la ayuda específica que necesitas.
        </p>
      </div>
    </section>
  );
}
