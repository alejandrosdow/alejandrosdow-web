import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alejandro Marcos — Internet Surfer",
  icons: { icon: "/favicon.jpg" },
  description: "Construyo marcas y comunidades en internet desde hace 15 años.",
  openGraph: {
    title: "Alejandro Marcos — Internet Surfer",
    description:
      "Construyo marcas y comunidades en internet desde hace 15 años.",
    url: "https://alejandrosdow.com",
    siteName: "Alejandro Marcos",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://alejandrosdow.com/og",
        width: 1200,
        height: 630,
        alt: "Alejandro Marcos — Internet Surfer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejandro Marcos — Internet Surfer",
    description:
      "Construyo marcas y comunidades en internet desde hace 15 años.",
    images: ["https://alejandrosdow.com/og"],
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
