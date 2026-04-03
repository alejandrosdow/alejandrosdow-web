export default function CtaFinal() {
  return (
    <section className="px-6 md:px-8 py-14 md:py-20 border-t border-neutral-100 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">
          ¿Empezamos?
        </p>
        <h2 className="text-2xl md:text-[2rem] font-bold tracking-tight text-black mb-8 leading-snug">
          Si quieres construir algo que de verdad conecte.
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#sesion"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#00e05a] text-black font-medium text-sm rounded-sm hover:bg-[#00c44e] transition-colors"
          >
            Reservar sesión de 30 min →
          </a>
          <a
            href="#libro"
            className="inline-flex items-center justify-center px-6 py-3 text-neutral-500 text-sm border border-neutral-200 rounded-sm hover:border-neutral-400 transition-colors"
          >
            O empieza con el libro →
          </a>
        </div>
      </div>
    </section>
  );
}
