import type { ReactNode } from "react";
import { ArrowIcon } from "../icons";
import { DraftArt, ImagesArt, ReportArt } from "../art";
import { DEMO_HREF } from "../../site";

/** The seven stations an article passes through, in order. */
export const STEPS: { name: string; line: string }[] = [
  { name: "Research", line: "Reads clinical guidelines, studies and government pages on your topic, and keeps every link." },
  { name: "Writing", line: "Writes the article from that research. The model, prompts and settings are already set up." },
  { name: "Fact-check", line: "A second pass reads the draft against the research and fixes what does not hold up." },
  { name: "Images", line: "Three images for each article, alt text included." },
  { name: "SEO", line: "Title, description and slug, plus a GEO score for AI search." },
  { name: "Your review", line: "Every article waits for a person. Nothing goes live until you approve it." },
  { name: "WordPress", line: "Lands on your site as a draft, ready to publish." },
];

/**
 * The three steps shown as designed cards (see components/art.tsx). `note`
 * says what the art shows; `step` is the card's place among the seven, shown
 * in its tile instead of a pictogram.
 */
const SHOWN: { title: string; note: string; art: ReactNode; step: number; href: string }[] = [
  { title: "Research report", note: "12 sources cited, every link kept", art: <ReportArt />, step: 1, href: "#sources" },
  { title: "Fact-checked draft", note: "The wrong timeline, caught and fixed", art: <DraftArt />, step: 3, href: "#sources" },
  { title: "Images with alt text", note: "The alt text comes written", art: <ImagesArt />, step: 4, href: "#sources" },
];

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
              {s.art}
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
          <p>Pick a topic and watch it research, write and check the article. It takes about 12 minutes to get from a title to a finished draft.</p>
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
