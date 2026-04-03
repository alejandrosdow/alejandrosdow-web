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
              <span className="text-[#00e05a]">Conectar</span>{" "}&gt; Llegar
            </h1>

            <p className="text-base md:text-[17px] text-neutral-600 leading-relaxed mb-4 max-w-lg">
              Ayudo a marcas y creadores a construir, escalar y monetizar su audiencia en internet. Entendeder el zeitgeist para crear comunidades y negocios que conectan de verdad.
            </p>

            <p className="text-[13px] text-neutral-400 leading-relaxed mb-9">
              CMO en Team Heretics. +15 años en la industria. Lo que comparto sale de ejecución real, no de teoría.
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
