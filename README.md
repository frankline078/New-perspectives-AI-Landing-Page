# New Perspectives AI Landing Page

Built with Next.js, React, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where things are

The page is the landing page only. Every article, source, number and name on it is made-up sample data; do not add real client articles.

- `app/page.tsx` — the page, section by section (hero, how it works, human in the loop, trust, closing)
- `app/globals.css` — all styles (Tailwind's base reset is on; colours and fonts are theme tokens at the top)
- `app/layout.tsx` — fonts (Newsreader for headings, Inter for body) and metadata
- `app/components/pipeline.tsx` — the scroll-driven pipeline strip, the page's main animation
- `app/components/inview.tsx` — adds `is-in` when an element scrolls into view (starts the GEO dial)
- `app/components/shot.tsx` — the window frame and `next/image` wrapper for app captures
- `app/screens.ts` — real app captures, by the slot they fill
- `public/screens/` — the capture files

"Start an article" links to `START_HREF` at the top of `app/page.tsx`. Point it at the app's new-article screen.

### App captures

One slot shows a real screen of the app: the hero window (the start screen with the article-type choice and title field). The other files in `public/screens/` are no longer used.

To replace or add one:

1. Open the screen in the app at a narrow window width (440 to 540px), so its text stays readable when the capture is shown small. Capture at 3x device pixel ratio.
2. Crop to the part that matters. Leave out the sidebar (it shows the signed-in email), client or test labels, cost figures and any real article. Crop only; do not edit the capture.
3. Save it under `public/screens/` with a new file name, and list it in `app/screens.ts` with its pixel size and alt text. A new name matters: the image optimizer caches by address, so an overwritten file can keep showing the old picture for hours (or delete `.next/cache/images`).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
