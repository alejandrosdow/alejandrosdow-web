# alejandrosdow.com

Personal website of Alejandro Marcos — CMO at Team Heretics.

Built with Next.js 14 + Tailwind CSS. Hand-coded with editorial + terminal + memepunk aesthetics.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
.
├── app/
│   ├── globals.css     ← Tailwind base
│   ├── layout.js       ← SEO metadata
│   └── page.js         ← The whole site (Home / Trayectoria / Blog)
├── public/
│   └── assets/         ← Photos, book covers, PDF (drop your files here)
│       ├── alejandro-foto.jpg
│       ├── internet-surfer-cover.png
│       ├── internet-surfer.pdf      ← drop your book PDF here
│       └── book-*.webp
├── package.json
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

## Deploy to Vercel

1. Push this folder to GitHub (e.g. `alejandrosdow-com` repo).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Click **Deploy**. Done.
4. Add your custom domain `alejandrosdow.com` in Project Settings → Domains.

## Editing content

Almost everything that's text lives in the `I18N` object at the top of `app/page.js`:
- `I18N.es.*` — Spanish version
- `I18N.en.*` — English version (auto-detected from browser)

To add a new book to the library, edit `I18N.es.library` and `I18N.en.library`:

```js
{ title: 'Book Title', author: 'Author', note: 'Why it matters...', tag: 'Category · Year', rating: '★★★★★', cover: '/assets/book-slug.webp' },
```

And drop the cover file into `public/assets/`.

## Editing the PDF download

The Internet Surfer book downloads from `/assets/internet-surfer.pdf`. Just drop your PDF file there.
