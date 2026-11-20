"use client";

import { useRef, type CSSProperties } from "react";
import { ArrowIcon, LogoMark } from "./icons";
import { NAV_LINKS as LINKS } from "../content";

/**
 * The menu below 900px, where the pill nav is hidden: a drawer that slides
 * in from the left over a dimmed overlay.
 *
 * A modal <dialog>: the browser traps focus, closes it on Escape, makes the
 * page behind it inert and hands focus back to the menu button on close.
 * The page behind stops scrolling while it is open (html:has(.menu[open])
 * in globals.css).
 */
export function MobileMenu({ demoHref, appHref }: { demoHref: string; appHref: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        className="menu-btn"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-controls="site-menu"
        onClick={() => dialog.current?.showModal()}
      >
        <span className="menu-lines" aria-hidden="true" />
      </button>

      <dialog
        ref={dialog}
        id="site-menu"
        className="menu"
        aria-label="Menu"
        // A tap on the overlay beside the drawer closes it.
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="menu-panel">
          <div className="wrap header-row">
            <a href="#top" className="logo" onClick={close}>
              <LogoMark size={26} />
              New Perspectives AI
            </a>
            <button type="button" className="menu-btn is-open" aria-label="Close menu" onClick={close} autoFocus>
              <span className="menu-lines" aria-hidden="true" />
            </button>
          </div>

          <nav className="wrap menu-links" aria-label="Main">
            <p className="menu-eyebrow" aria-hidden="true">
              Explore
            </p>
            {LINKS.map((l, i) => (
              <a key={l.href} href={l.href} onClick={close} style={{ "--i": i } as CSSProperties}>
                <span className="menu-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="menu-text">
                  <b>{l.label}</b>
                  <small>{l.note}</small>
                </span>
                <span className="menu-go" aria-hidden="true">
                  <ArrowIcon size={14} />
                </span>
              </a>
            ))}
          </nav>

          <div className="wrap menu-actions">
            <a className="btn btn-lg btn-light" href={appHref}>
              Log in
            </a>
            <a className="btn btn-lg" href={demoHref} onClick={close}>
              Book a demo
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
