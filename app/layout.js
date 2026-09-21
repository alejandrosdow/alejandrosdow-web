import './globals.css';

export const metadata = {
  title: 'Alejandro Marcos · Creative strategy',
  description: 'Soy Alejandro Marcos, Chief Brand Officer de Team Heretics. Trabajo en la intersección entre entretenimiento, tecnología y cultura digital.',
  metadataBase: new URL('https://alejandrosdow.com'),
  openGraph: {
    title: 'Alejandro Marcos · Creative strategy',
    description: 'Soy Alejandro Marcos, Chief Brand Officer de Team Heretics. Trabajo en la intersección entre entretenimiento, tecnología y cultura digital.',
    url: 'https://alejandrosdow.com',
    siteName: 'alejandrosdow',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alejandro Marcos · Creative strategy',
    description: 'Soy Alejandro Marcos, Chief Brand Officer de Team Heretics. Trabajo en la intersección entre entretenimiento, tecnología y cultura digital.',
    creator: '@alejandrosdow',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                { '@type': 'WebSite', name: 'Alejandro Marcos', alternateName: 'alejandrosdow', url: 'https://alejandrosdow.com' },
                {
                  '@type': 'Person',
                  name: 'Alejandro Marcos',
                  url: 'https://alejandrosdow.com',
                  image: 'https://alejandrosdow.com/assets/foto-alejandro.jpg',
                  jobTitle: 'Chief Brand Officer',
                  worksFor: { '@type': 'Organization', name: 'Team Heretics' },
                  sameAs: ['https://x.com/alejandrosdow', 'https://instagram.com/alejandrosdow', 'https://linkedin.com/in/alejandromarcosmoraga', 'https://substack.com/@alejandrosdow'],
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
