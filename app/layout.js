import './globals.css';

export const metadata = {
  title: 'Alejandro Marcos — alejandrosdow.com',
  description: 'Soy Alejandro Marcos, CMO de Team Heretics. Trabajo en la intersección entre entretenimiento, tecnología y cultura digital.',
  metadataBase: new URL('https://alejandrosdow.com'),
  openGraph: {
    title: 'Alejandro Marcos — alejandrosdow.com',
    description: 'Soy Alejandro Marcos, CMO de Team Heretics. Trabajo en la intersección entre entretenimiento, tecnología y cultura digital.',
    url: 'https://alejandrosdow.com',
    siteName: 'alejandrosdow',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alejandro Marcos — alejandrosdow.com',
    description: 'Soy Alejandro Marcos, CMO de Team Heretics. Trabajo en la intersección entre entretenimiento, tecnología y cultura digital.',
    creator: '@alejandrosdow',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
