# Edi Kuliqi — Graphic Designer Portfolio

Personal portfolio for Edi Kuliqi, a graphic designer in Pristina, Kosovo (branding, packaging, print and digital).

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · [Motion](https://motion.dev) · Lenis smooth scroll

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content

All copy lives in [`lib/site.ts`](lib/site.ts) — profile, projects, services, experience, tools.

Project images live in `public/work/`. Each project in `projects` lists its images (the first is the card cover);
clicking a card opens a gallery. A project with a `url` links out to the live site instead.

## SEO

- Metadata, Open Graph & Twitter cards — `app/layout.tsx`
- JSON-LD (`Person`, `WebSite`, `ProfilePage`) — `app/layout.tsx`
- Generated OG image — `app/opengraph-image.tsx`
- `sitemap.xml`, `robots.txt`, web manifest — `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`

Set the production domain with `NEXT_PUBLIC_SITE_URL` (defaults to `https://edikuliqi.vercel.app`).

## Deploy

Push to GitHub and import into Vercel — no extra config needed.
