import type { ReactNode } from "react";
import { ArrowIcon } from "../icons";
import { SourceArt } from "../art";
import { DEMO_HREF } from "../../site";

/** Everything it reads from. The last entry is the report itself, not a source. */
export const SOURCES = ["PubMed Central", "ASAM guidelines", "SAMHSA", "Government health agencies", "Peer-reviewed journals", "Research report"];

/** The first three sources, shown as cards with what each one backs in the draft. */
const SOURCE_CARDS: { name: string; note: string; domain: string; kind: string; title: string; backs: ReactNode }[] = [
  {
    name: "PubMed Central",
    note: "Behind the taper comparison",
    domain: "pmc.ncbi.nlm.nih.gov",
    kind: "Study",
    title: "Meta-analysis of three benzodiazepine taper trials",
    backs: "Backs the section on how gradual dose reduction compares with stopping at once.",
  },
  {
    name: "ASAM guidelines",
    note: "Where the timeline comes from",
    domain: "asam.org",
    kind: "Guideline",
    title: "Joint clinical practice guideline on benzodiazepine tapering, 2025",
    backs: (
      <>
        A full taper can take <mark>months to years</mark>, especially after high doses taken for a long time.
      </>
    ),
  },
  {
    name: "SAMHSA",
    note: "Where readers are sent for help",
    domain: "samhsa.gov",
    kind: "Government",
    title: "Substance Abuse and Mental Health Services Administration",
    backs: "Backs the closing section on where readers can find support and treatment.",
  },
];

export function Sources() {
  return (
    <section id="sources" className="wrap section band">
      <div id="research" className="section-head">
        <h2>
          Sources
          <span className="count">{SOURCES.length - 1}</span>
        </h2>
        <a className="btn btn-light btn-sm" href={DEMO_HREF}>
          See a full report
        </a>
      </div>

      <div className="facts">
        <div className="fact">
          <b>9,000+</b>
          <p>words of research behind a single article</p>
        </div>
        <div className="fact">
          <b>Every number</b>
          <p>links back to the page it came from</p>
        </div>
        <div className="fact">
          <b>Left out</b>
          <p>any figure it could not find a source for</p>
        </div>
      </div>

      <div className="cards">
        {SOURCE_CARDS.map((s) => (
          <article key={s.name} className="card">
            <div className="thumb">
              <SourceArt domain={s.domain} kind={s.kind} title={s.title} backs={s.backs} />
            </div>
            <div className="card-meta">
              <div>
                <h3>{s.name}</h3>
                <p>{s.note}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="research-band">
        <div className="research-band-copy">
          <h3>The research is the slow part, so it goes first.</h3>
          <p>Before it writes a word, it reads clinical guidelines, studies and government pages on your topic, and keeps every link.</p>
          <ul className="research-band-also" aria-label="Also reads">
            {SOURCES.slice(3, -1).map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
        <div className="hero-actions">
          <a className="btn" href={DEMO_HREF}>
            Book a demo
            <ArrowIcon size={14} />
          </a>
          <a className="btn btn-light" href="#pricing">
            See pricing
          </a>
        </div>
      </div>
    </section>
  );
}
