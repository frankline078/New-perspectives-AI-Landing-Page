import type { Screen } from "./components/shot";

/**
 * Real captures of the app, by the slot they fill on the page.
 *
 * Taken from the desktop app at 2x with scripts/capture-app.mjs, then cropped
 * to the slot (public/screens/app/ holds the full screens). Test-only labels,
 * staff emails and cost figures are replaced in the DOM before capture; the
 * layout, data and copy are the app's own. The "What it does" cards are drawn
 * in components/art.tsx instead: a capture shrunk to card size is unreadable.
 */
export const screens = {
  /** Hero: the screen a user sees when they open the app to start an article. */
  home: {
    src: "/screens/app-new-article.png",
    width: 1540,
    height: 1004,
    alt: "The New article form: General Article selected, a title and keywords typed in, and The Summit Wellness Group chosen as the WordPress site",
  },
} satisfies Record<string, Screen>;
