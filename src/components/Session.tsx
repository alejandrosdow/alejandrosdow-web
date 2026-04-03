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
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
          Hablemos 30 minutos.
        </h2>

        <div className="flex flex-col md:flex-row md:items-start gap-12">
          <div className="flex-1">
            <p className="text-base text-neutral-700 leading-relaxed mb-4">
              No es una llamada genérica. Es una sesión de trabajo.
            </p>
            <p className="text-base text-neutral-700 leading-relaxed mb-8">
              En 30 minutos identificamos dónde estás, qué no está funcionando y cuáles son los primeros pasos concretos para avanzar.
            </p>

            <div className="space-y-2">
              {[
                "Para creadores que quieren escalar y monetizar su comunidad.",
                "Para empresas que necesitan mejorar su marca en internet.",
                "Para profesionales que quieren construir marca personal.",
                "Para proyectos que buscan estrategia antes de escalar.",
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
