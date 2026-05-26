import './globals.css';

export const metadata = {
  title: 'Alejandro Marcos — Internet Surfer',
  description: 'Construyo marcas culturales en internet. CMO de Team Heretics. Aquí: un libro y una pequeña biblioteca.',
  metadataBase: new URL('https://alejandrosdow.com'),
  openGraph: {
    title: 'Alejandro Marcos — Internet Surfer',
    description: 'Construyo marcas culturales en internet.',
    url: 'https://alejandrosdow.com',
    siteName: 'alejandrosdow',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alejandro Marcos — Internet Surfer',
    description: 'Construyo marcas culturales en internet.',
    creator: '@alejandrosdow',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
