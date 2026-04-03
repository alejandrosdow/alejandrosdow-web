"use client";

import { useState } from "react";

const EMAIL_ENDPOINT = "https://formspree.io/f/xaqldllk";

const bookFeatures = [
  "Zeitgeist: cómo leer el espíritu del tiempo",
  "Los 10 mandamientos para construir comunidad",
  "El funnel de Beyoncé aplicado a cualquier marca",
  "De audiencia a comunidad: la pirámide",
  "Casos reales: Team Heretics, Patagonia, memebrands",
  "Cómo surfear internet sin perder tu esencia",
];

export default function Book() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [coverError, setCoverError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="libro" className="px-6 md:px-8 py-14 md:py-20 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#f5f5f5] rounded-sm p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">

            {/* Imagen portada — arriba en móvil, derecha en desktop */}
            <div className="order-first md:order-last md:w-[38%] shrink-0 flex items-start justify-center">
              {!coverError ? (
                <img
                  src="/libro-cover.jpg"
                  alt="Internet Surfer — El libro"
                  onError={() => setCoverError(true)}
                  className="w-full max-w-[200px] md:max-w-full object-cover rounded-sm shadow-md"
                />
              ) : (
                <div className="w-full aspect-[2/3] max-w-[200px] md:max-w-full bg-neutral-200 rounded-sm flex items-center justify-center">
                  <span className="text-xs text-neutral-400 text-center px-4">
                    Internet Surfer<br />El libro
                  </span>
                </div>
              )}
            </div>

            {/* Contenido — columna izquierda */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Internet Surfer — El libro
              </h2>
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-2">
                Internet es un océano lleno de olas. Algunas se ven venir de lejos y otras te pillan por sorpresa. La pregunta no es si vas a surfear, sino cómo vas a hacerlo. Internet Surfer recoge mi forma de entender y construir en internet: un manual con 10 mandamientos nacidos de la experiencia y la ejecución real en Team Heretics, memebrands, creator economy, Web3 y cultura de internet.
              </p>
              <p className="text-xs text-neutral-400 mb-7">
              
              </p>

              <div className="space-y-1.5 mb-8">
                {bookFeatures.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-neutral-400 text-sm mt-0.5">→</span>
                    <span className="text-sm text-neutral-600">{item}</span>
                  </div>
                ))}
              </div>

              {status === "ok" ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00e05a] flex items-center justify-center shrink-0">
                    <span className="text-black text-xs font-bold">✓</span>
                  </div>
                  <p className="text-sm text-neutral-700">
                    ¡Perfecto! Te enviamos el libro a tu email ahora mismo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#fafafa] border border-[#e8e8e8] rounded-sm px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="book-submit bg-[#00e05a] text-black font-medium text-sm px-6 py-2.5 rounded-sm hover:bg-[#00c44e] transition-colors disabled:opacity-60 whitespace-nowrap"
                  >
                    {status === "sending" ? "Enviando…" : "Descargar gratis →"}
                  </button>
                </form>
              )}
              {status === "error" && (
                <p className="text-xs text-red-500 mt-2">
                  Algo ha ido mal, inténtalo de nuevo.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
