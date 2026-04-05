"use client";

import { useState } from "react";

export default function Hero() {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section className="pt-14 px-6 md:px-8">
      <div className="max-w-4xl mx-auto w-full pt-12 pb-12 md:pt-20 md:pb-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-10">

          {/* Avatar — centered above text on mobile, right column on desktop */}
          <div className="order-first self-center md:order-last md:self-start md:shrink-0 md:pt-1">
            {!photoError ? (
              <img
                src="/foto-alejandro.jpg"
                alt="Alejandro Marcos"
                onError={() => setPhotoError(true)}
                className="w-20 h-20 md:w-[120px] md:h-[120px] rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 md:w-[120px] md:h-[120px] rounded-full bg-neutral-200" />
            )}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <h1 className="text-[clamp(2.75rem,9vw,5.5rem)] leading-[1.0] font-black tracking-tight text-black mb-6">
              <span className="text-[#00e05a]">Conectar</span>{" "}para llegar
            </h1>

            <p style={{ fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: 480, marginBottom: 8, fontWeight: 300 }}>
              Construyo marcas culturales en internet.<br />
              Convierto narrativa en comunidad, comunidad en distribución y distribución en negocio.
            </p>
            <p style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.7, color: 'var(--text-dim)', maxWidth: 480, marginBottom: 32, fontWeight: 300 }}>
              Entendiendo el zeitgeist para crear proyectos que conectan de verdad.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
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
                Descarga el libro para construir en internet gratis
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
