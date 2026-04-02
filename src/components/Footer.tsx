const socials = [
  { label: "X / Twitter", href: "https://x.com/alejandrosdow" },
  { label: "LinkedIn",    href: "https://www.linkedin.com/in/alejandromarcosmoraga/" },
  { label: "Instagram",   href: "https://www.instagram.com/alejandrosdow" },
  { label: "Substack",    href: "https://substack.com/@alejandrosdow" },
];

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="px-6 md:px-8 py-12 border-t border-neutral-100"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-black font-medium">
            Alejandro Marcos · Madrid, España
          </p>
          <p className="text-xs text-neutral-400 mt-1">© 2025 Alejandro Marcos</p>
        </div>

        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 hover:text-black transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
