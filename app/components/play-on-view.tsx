"use client";

import { useEffect } from "react";

/**
 * Marks each `[data-play]` element `data-play="on"` the first time most of it
 * is on screen, which starts its CSS sequence (the fact-check strike and the
 * highlighter in globals.css).
 *
 * The waiting state is only applied under `html.can-play`, which this sets.
 * Without JavaScript nothing waits: the finished state shows from the start.
 */
export function PlayOnView() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-play]");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.play = "on";
          io.unobserve(e.target);
        }
      },
      { threshold: 0.6 },
    );
    els.forEach((el) => io.observe(el));
    document.documentElement.classList.add("can-play");
    return () => io.disconnect();
  }, []);
  return null;
}
