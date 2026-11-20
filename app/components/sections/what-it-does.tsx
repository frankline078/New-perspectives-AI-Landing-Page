import type { ReactNode } from "react";
import { ArrowIcon } from "../icons";
import { DraftArt, ImagesArt, ReportArt } from "../art";
import { DEMO_BANNER_LINE, SHOWN, STEPS, type ShownArt } from "../../content";
import { DEMO_HREF } from "../../site";

const ART: Record<ShownArt, ReactNode> = {
  report: <ReportArt />,
  draft: <DraftArt />,
  images: <ImagesArt />,
};

export function WhatItDoes() {
  return (
    <section id="what" className="wrap section">
      <div className="section-head">
        <h2>
          What it does
          <span className="count">{STEPS.length}</span>
        </h2>
        <a className="btn btn-light btn-sm" href="#index">
          All steps
        </a>
      </div>

      <div className="cards">
        {SHOWN.map((s) => (
          <article key={s.title} className="card">
            <div className="thumb">
              {ART[s.art]}
              <div className="thumb-top">
                <a className="btn btn-sm" href={s.href}>
                  Open
                  <ArrowIcon size={13} />
                </a>
              </div>
            </div>
            <div className="card-meta">
              <span className="card-icon card-step" aria-label={`Step ${s.step} of ${STEPS.length}`}>
                {String(s.step).padStart(2, "0")}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.note}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="banner">
        <span className="banner-badge">Demo</span>
        <div>
          <b>{STEPS.length - SHOWN.length} more steps in a live demo</b>
          <p>{DEMO_BANNER_LINE}</p>
        </div>
        <a className="btn btn-sm" href={DEMO_HREF}>
          Book a demo
        </a>
      </div>

      <details id="index" className="index" open>
        <summary>Index of all {STEPS.length} steps an article goes through</summary>
        <ol>
          {STEPS.map((s) => (
            <li key={s.name}>
              <b>{s.name}.</b> {s.line}
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
