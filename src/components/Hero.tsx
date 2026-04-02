"use client";

import { useState } from "react";

export default function Hero() {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section className="min-h-screen pt-14 px-6 md:px-8 flex flex-col justify-center">
      <div className="w-full pt-12 pb-12 md:pt-20 md:pb-16">
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
            <p className="text-sm text-neutral-400 mb-6 tracking-wide">
              CMO · Builder · Internet Surfer
            </p>

            <h1 className="text-[clamp(3rem,8vw,6rem)] leading-[1.0] font-black tracking-tight text-black mb-10">
              Alejandro Marcos
            </h1>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#sesion"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#00e05a] text-black font-medium text-sm rounded-sm hover:bg-[#00c44e] transition-colors w-full sm:w-auto"
              >
                Reservar sesión de 30 min →
              </a>
              <a
                href="#libro"
                className="inline-flex items-center justify-center px-6 py-3 text-neutral-500 text-sm border border-neutral-200 rounded-sm hover:border-neutral-400 transition-colors w-full sm:w-auto"
              >
                Descarga manual para surfear internet gratis
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
