"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CheckIcon } from "./icons";
import { RUN } from "../content";

/**
 * The draft card on the hero capture: what comes out the other end of the
 * form behind it. The same title, in WordPress, with one claim highlighted
 * and footnoted to the guideline it came from.
 *
 * Its header walks through the steps a run takes (RUN in content.ts: the
 * same steps as STEPS, said as they happen). When the run lands, the highlighter passes over the
 * cited claim. It only runs while on screen and the tab is visible; with
 * reduced motion or no JavaScript it shows the finished draft.
 */
const DONE = RUN.length;
const DONE_MS = 4200;

export function RunCard() {
  const [step, setStep] = useState(DONE);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = box.current;
    if (!el) return;

    let visible = false;
    let timer = 0;
    let current = 0;

    const tick = () => {
      if (!visible || document.hidden) return;
      setStep(current);
      const wait = current === DONE ? DONE_MS : RUN[current].ms;
      timer = window.setTimeout(() => {
        current = current === DONE ? 0 : current + 1;
        tick();
      }, wait);
    };
    const pause = () => {
      window.clearTimeout(timer);
      timer = 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      pause();
      if (visible) tick();
    });
    // Starts from the first step after the hero entrance has settled.
    const start = window.setTimeout(() => {
      current = 0;
      io.observe(el);
    }, 1600);

    const onVis = () => {
      pause();
      if (!document.hidden) tick();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearTimeout(start);
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const done = step === DONE;

  return (
    <div ref={box} className="built run" data-done={done || undefined}>
      <p className="sr-only">
        The finished draft in WordPress, with each claim footnoted to its source.
      </p>
      <div aria-hidden="true">
        <div className="run-bar">
          {RUN.map((s, i) => (
            <i
              key={s.label}
              className={i < step || done ? "is-full" : i === step ? "is-now" : undefined}
              style={i === step ? ({ "--ms": `${s.ms}ms` } as CSSProperties) : undefined}
            />
          ))}
        </div>

        <div className="run-head">
          <span className="run-wp" aria-hidden="true">
            W
          </span>
          {done ? (
            <span key="done" className="run-label run-swap">
              Draft in WordPress
              <CheckIcon size={12} />
            </span>
          ) : (
            <span key={step} className="run-label run-swap">
              {RUN[step].label}
            </span>
          )}
          <span className="run-count">{`${done ? RUN.length : step + 1}/${RUN.length}`}</span>
        </div>

        <div className="run-doc">
          <p className="run-title">How a Benzodiazepine Taper Works and How Long It Takes</p>
          <p className="run-body">
            A full taper can take <mark>months to years</mark>, especially after high doses taken for a long{" "}
            <span className="run-nowrap">
              time.<sup>2</sup>
            </span>
          </p>
          <p className="run-cite">
            <b>2</b>
            <span>asam.org</span>
            <em>Benzodiazepine tapering guideline, 2025</em>
          </p>
        </div>
      </div>
    </div>
  );
}
