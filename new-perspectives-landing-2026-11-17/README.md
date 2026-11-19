# New Perspectives AI landing page

One scrolling page. Open `index.html` in a browser to see it.

## What is here

- `index.html`: the whole page as plain HTML and CSS. No JavaScript, no build step, no dependencies.
- `screenshots/desktop-1440.png` and `screenshots/phone-390.png`: full-page renders.
- `source/Main.dc.html`: the design canvas source the page was exported from. Not needed to ship.

## Notes for building it in

- Fonts come from Google Fonts: Bricolage Grotesque (headings) and Instrument Sans (body).
- Colors: ink `#23254A`, paper `#F6F5FB`, lilac `#E7E5F8`, gold `#E5A93A` (the `--gold` variable on the root element).
- All illustrations are inline SVG, so there are no image files.
- Layout switches to one column at 900px and tightens again at 520px. It was checked at 1440, 390 and 360px wide with no sideways overflow.
- The only motion is the small page moving along the pipeline strip. It is off under `prefers-reduced-motion` and on phones.

## Still to fill in before it goes live

- Four `[CLIENT LOGO]` slots and the `[CUSTOMER QUOTE]` block with name, role and company.
- The demo button address, currently `mailto:[YOUR EMAIL]`. The other "Book a demo" buttons scroll to that section.
- Pricing shows Starter $399 (60 articles, 1 site) and Team $799 (200 articles, 5 sites). The limits are a proposal, not final.
- The "It reads from" source names should be confirmed before publishing.
