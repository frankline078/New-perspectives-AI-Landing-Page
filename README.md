# New Perspectives AI Landing Page

The one-page marketing site for New Perspectives AI. Built with Next.js 16, React 19 and Tailwind CSS 4.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where things are

- `app/content.ts`: all page copy and data. The steps, the run card's step labels, the sources, the plans, the FAQ, the nav and the footer are all here. Facts that appear in more than one place (the step count, minutes per draft, plan prices and limits) are written once, and every sentence that mentions them is built from them. Change copy here, not in the components.
- `app/site.ts`: site-wide facts: the URL, name, title and description used by the metadata and structured data, `LAST_MODIFIED` for the sitemap, `APP_HREF` (Log in) and `DEMO_HREF` (every "Book a demo").
- `app/page.tsx`: puts the sections in order.
- `app/components/sections/`: one component per section: `site-header`, `hero`, `section-tabs`, `what-it-does`, `sources`, `works-with`, `pricing`, `faq`, `closing`, `site-footer`.
- `app/components/`: the pieces the sections share:
  - `run-card.tsx`: the hero's draft card, which steps through a run while it is on screen
  - `nav-pills.tsx`: the desktop nav with the sliding white pill
  - `mobile-menu.tsx`: the drawer below 900px
  - `art.tsx`: the drawn stand-ins on the "What it does" and "Sources" cards
  - `play-on-view.tsx`: starts each card's CSS sequence the first time it is on screen
  - `shot.tsx`: the browser-window frame and `next/image` wrapper for app captures
  - `json-ld.tsx`: structured data (organisation and plans, built from `PLANS`)
  - `icons.tsx`: the logo and line icons
- `app/screens.ts`: the real app captures, by the slot they fill.
- `app/globals.css`: all styles. Tailwind's base reset is on; colours, fonts and easings are `@theme` tokens at the top, and layout numbers shared with scripts (`--header-h`, `--scroll-offset`) are on `:root`.
- `app/layout.tsx`: fonts and metadata. Bricolage Grotesque carries the headings and large numbers, Instrument Sans everything else (both via `next/font/google`).
- `public/screens/`: the images the page shows.
- `docs/design/`: the design files the page was built from.

Tailwind runs through PostCSS (`postcss.config.mjs`).

Placeholders: `DEMO_HREF` in `app/site.ts` is still `mailto:[YOUR EMAIL]`. Set it before launch.

## App captures

The hero window shows a real screen of the app (`public/screens/app-new-article.png`). The "What it does" and "Sources" cards are drawn in `app/components/art.tsx` instead, because a full capture shrunk to card size can't be read.

To replace or add a capture:

1. Capture the screen with `scripts/capture-app.mjs` (see the comment at the top for sign-in and options). Full screens go to `captures/` at the repo root. That folder is gitignored and kept out of `public/` because the full screens can show client data.
2. Crop to the part the slot needs. Leave out the sidebar (it shows the signed-in email), client or test labels, cost figures and any real article.
3. Save the crop under `public/screens/` with a new file name, and list it in `app/screens.ts` with its pixel size and alt text. Use a new name: the image optimizer caches by address, so an overwritten file can keep showing the old picture for hours (or delete `.next/cache/images`).

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run start`: serve the production build
- `npm run lint`: run ESLint
- `npm run typecheck`: run the TypeScript compiler without emitting
