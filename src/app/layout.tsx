import type { Metadata } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alejandro Marcos — Internet Surfer',
  description: 'CMO, en la intersección entre entretenimiento, tecnología y cultura digital.',
  openGraph: {
    title: 'Alejandro Marcos — Internet Surfer',
    description: 'CMO, en la intersección entre entretenimiento, tecnología y cultura digital.',
    url: 'https://alejandrosdow.com',
    images: [{ url: 'https://alejandrosdow.com/og' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alejandro Marcos — Internet Surfer',
    description: 'CMO, en la intersección entre entretenimiento, tecnología y cultura digital.',
    images: ['https://alejandrosdow.com/og'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${syne.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
