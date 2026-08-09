# Vanta Forma

Vanta Forma is an architectural portfolio for Eugene Sasu Appiah, presenting selected residential, religious, and interior work through a responsive editorial experience.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- CSS Modules
- `next/image` and `next/font`

## Local development

Install the dependencies:

```bash
npm install
```

Start the development server at [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

## Production checks

Run these before a release:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Start the production build locally:

```bash
npm start
```

## Routes

- `/` — studio landing page
- `/projects` — project index
- `/projects/[slug]` — individual project case studies
- `/robots.txt` — crawler policy
- `/sitemap.xml` — public route sitemap

## Site URL

Set `NEXT_PUBLIC_SITE_URL` to the final production origin, including `https://`, so canonical, social, robots, and sitemap URLs use the public domain. Vercel deployment URLs are used automatically when the variable is not configured.

## Deployment

The project is ready for a standard Vercel deployment after the lint, type-check, and production-build commands pass.
