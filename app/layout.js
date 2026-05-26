import './globals.css';

export const metadata = {
  title: 'Alejandro Marcos — Internet Surfer',
  description: 'I build cultural brands on the internet. CMO at Team Heretics. Here: a book and a small library.',
  metadataBase: new URL('https://alejandrosdow.com'),
  openGraph: {
    title: 'Alejandro Marcos — Internet Surfer',
    description: 'I build cultural brands on the internet.',
    url: 'https://alejandrosdow.com',
    siteName: 'alejandrosdow',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alejandro Marcos — Internet Surfer',
    description: 'I build cultural brands on the internet.',
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
