"use client";

import { useState } from "react";

const ENDPOINT = "https://formspree.io/f/mlgowooy";

const covers = [
  "/book-cover-1.jpg",
  "/book-cover-2.jpg",
  "/book-cover-3.jpg",
  "/book-cover-4.jpg",
  "/book-cover-5.jpg",
  "/book-cover-6.jpg",
];

export default function Biblioteca() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "Biblioteca — nueva solicitud de descarga" }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="biblioteca" className="px-6 md:px-8 py-14 md:py-20 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
          Para crear y pensar mejor
        </h2>

        {/* Portadas */}
        <div className="flex flex-row flex-nowrap gap-3 mb-8 overflow-x-auto md:overflow-visible pb-1">
          {covers.map((src, i) => (
            <CoverImage key={i} src={src} />
          ))}
        </div>

        <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-8">
          Una pequeña biblioteca de libros, recursos y referencias que han formado mi manera de pensar
          sobre marcas, comunidades e internet. Se actualiza constantemente.
        
        </p>

        {status === "ok" ? (
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#00e05a] flex items-center justify-center shrink-0">
              <span className="text-black text-xs font-bold">✓</span>
            </div>
            <p className="text-sm text-neutral-700">
              ¡Perfecto! Te la enviamos ahora mismo.
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
              className="bg-[#00e05a] text-black font-medium text-sm px-6 py-2.5 rounded-sm hover:bg-[#00c44e] transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {status === "sending" ? "Enviando…" : "Recibir biblioteca →"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-xs text-red-500 mt-2">
            Algo ha ido mal, inténtalo de nuevo.
          </p>
        )}
      </div>
    </section>
  );
}

function CoverImage({ src }: { src: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div
        style={{
          width: 120,
          height: 180,
          borderRadius: 2,
          background: "#e8e8e8",
          flexShrink: 0,
        }}
      />
    );
  }
  return (
    <img
      src={src}
      alt=""
      onError={() => setError(true)}
      style={{
        width: 120,
        height: 180,
        objectFit: "cover",
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        flexShrink: 0,
      }}
    />
  );
}
