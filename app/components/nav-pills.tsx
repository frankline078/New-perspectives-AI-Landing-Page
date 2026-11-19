"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV_LINKS as LINKS } from "./nav-links";

/**
 * Vertical offset that counts a section as "reached". The page scrolls a
 * target to 140px (header plus tabs bar); a little slack covers subpixels.
 */
const OFFSET = 150;

/**
 * The main nav. The pill for the section on screen is white; a click moves
 * the white pill at once instead of waiting for the scroll to land.
 *
 * The white pill is one element that slides from link to link, so the eye
 * follows where it went. It appears in place (no slide in from the left).
 */
export function NavPills() {
  const [active, setActive] = useState<string | null>(null);
  // A clicked pill stays white while the page scrolls to it, so sections
  // passing by do not steal the highlight.
  const pinned = useRef<{ href: string; until: number } | null>(null);
  const nav = useRef<HTMLElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number; slide: boolean; off?: boolean } | null>(null);

  useLayoutEffect(() => {
    const root = nav.current;
    if (!root) return;
    const place = (slide: boolean) => {
      const a = active ? root.querySelector<HTMLElement>(`a[href="${active}"]`) : null;
      // With no section reached, the pill fades where it is instead of jumping.
      setPill((prev) =>
        a
          ? { x: a.offsetLeft, w: a.offsetWidth, slide: slide && prev !== null && !prev.off }
          : prev && { ...prev, off: true },
      );
    };
    place(true);
    // Web fonts and resizes change the link widths under the pill.
    // The observer also fires once on start; that call must not cancel the slide.
    let first = true;
    const ro = new ResizeObserver(() => {
      if (first) first = false;
      else place(false);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [active]);

  useEffect(() => {
    // In document order, so the last reached target wins whatever the menu order.
    const targets = LINKS.map((l) => ({ href: l.href, el: document.querySelector<HTMLElement>(l.href) }))
      .filter((t): t is { href: string; el: HTMLElement } => t.el !== null)
      .sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    let raf = 0;
    const update = () => {
      raf = 0;
      let current: string | null = null;
      for (const t of targets) {
        if (t.el.getBoundingClientRect().top - OFFSET <= 0) current = t.href;
      }
      const pin = pinned.current;
      if (pin && (pin.href === current || performance.now() > pin.until)) pinned.current = null;
      setActive(pinned.current ? pinned.current.href : current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav ref={nav} className="pills" aria-label="Main">
      <span
        className="pills-on"
        aria-hidden="true"
        data-slide={pill?.slide || undefined}
        style={pill ? { transform: `translateX(${pill.x}px)`, width: pill.w, opacity: pill.off ? 0 : 1 } : { opacity: 0 }}
      />
      {LINKS.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className={active === l.href ? "is-on" : undefined}
          aria-current={active === l.href ? "location" : undefined}
          onClick={() => {
            pinned.current = { href: l.href, until: performance.now() + 2000 };
            setActive(l.href);
          }}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}
