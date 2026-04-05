export default function About() {
  return (
    <section className="px-6 md:px-8 py-14 md:py-20 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xs text-neutral-400 uppercase tracking-widest mb-10">
          Sobre mí
        </h2>

        <div className="space-y-5">
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-muted)', fontWeight: 300, marginBottom: 14 }}>
            Nací en Colmenarejo, Madrid, entre el campo e internet. Mi carrera comenzó en los primeros años de la cultura digital, como jugador profesional de Call of Duty y creador de contenido.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-muted)', fontWeight: 300, marginBottom: 14 }}>
            Hoy construyo y escalo marcas y proyectos en internet, en la <span style={{ color: 'var(--green)', fontWeight: 500 }}>intersección entre entretenimiento, tecnología y cultura digital</span>. Desde 2018 soy CMO de Team Heretics, donde he ayudado a transformar una marca de nicho en una referencia global.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-muted)', fontWeight: 300, marginBottom: 16 }}>
            Creo en las marcas capaces de generar pertenencia, convertir comunidad en distribución y distribución en negocio.
          </p>
        </div>
      </div>
    </section>
  );
}
