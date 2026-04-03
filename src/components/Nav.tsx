"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { href: "#libro", label: "Libro", accent: false },
  { href: "#sesion", label: "Agendar sesión", accent: true },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-[#fafafa] shadow-[0_1px_0_0_#e8e8e8]" : "bg-transparent"
      }`}
    >
      <nav className="w-full px-6 md:px-8 h-14 flex items-center justify-between">
        <a href="#" className="font-semibold text-black text-sm tracking-tight">
          Alejandro Marcos
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                link.accent
                  ? "text-[#00e05a] font-medium hover:text-[#00c44e]"
                  : "text-neutral-500 hover:text-[#00e05a]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-6">
          <a href="#libro" className="text-sm text-neutral-500 hover:text-[#00e05a] transition-colors">
            Libro
          </a>
          <a href="#sesion" className="text-sm font-medium text-[#00e05a] hover:text-[#00c44e] transition-colors">
            Agendar sesión
          </a>
        </div>
      </nav>
    </header>
  );
}
