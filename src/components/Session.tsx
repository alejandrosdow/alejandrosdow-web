"use client";

import { useEffect } from "react";

export default function Session() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <section
      id="sesion"
      className="px-6 md:px-8 py-14 md:py-20 border-t border-neutral-100"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          Hablemos 30 minutos
        </h2>
        <p className="text-neutral-500 text-sm mb-10">
          Gratis. Sin compromiso. Con foco.
        </p>

        <div className="flex flex-col md:flex-row md:items-start gap-12">
          <div className="flex-1">
            <p className="text-base text-neutral-700 leading-relaxed mb-4">
              Si estás construyendo una marca, un negocio o intentando encontrar
              tu posición en internet y no sabes por dónde empezar, esto es para
              ti.
            </p>
            <p className="text-base text-neutral-700 leading-relaxed mb-8">
              En 30 minutos hablaremos para identificar dónde estás en el mapa y
              darte los primeros pasos concretos para construir y poder ejecutar
              tu visión en algo que conecte de verdad.
            </p>

            <div className="space-y-2">
              {[
                "Creadores que quieren escalar y monetizar su comunidad.",
                "Empresas que necesitan mejorar su marca en internet.",
                "Profesionales que quieren construir marca personal.",
                "Proyectos que buscan estrategia antes de escalar.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-neutral-400 text-sm mt-0.5">→</span>
                  <span className="text-sm text-neutral-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/alejandro-marcos-teamheretics/30min?hide_gdpr_banner=1&primary_color=00e05a"
              style={{ width: "100%", height: "700px", overflow: "visible" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
