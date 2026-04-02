import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alejandro Marcos — Internet Surfer",
  description:
    "CMO, builder y fundador. 15 años construyendo comunidades en internet. Reserva una sesión de 30 minutos.",
  openGraph: {
    title: "Alejandro Marcos — Internet Surfer",
    description:
      "CMO, builder y fundador. 15 años construyendo comunidades en internet.",
    url: "https://alejandromarcos.com",
    siteName: "Alejandro Marcos",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fafafa] text-black">
        {children}
      </body>
    </html>
  );
}
