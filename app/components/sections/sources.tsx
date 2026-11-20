import { ArrowIcon } from "../icons";
import { SourceArt } from "../art";
import { SOURCE_CARDS, SOURCES, SOURCES_NOT_CARDED } from "../../content";
import { DEMO_HREF } from "../../site";

/** A card's `backs` line, with its `mark` part highlighted. */
function Backs({ text, mark }: { text: string; mark?: string }) {
  const at = mark ? text.indexOf(mark) : -1;
  if (!mark || at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark>{mark}</mark>
      {text.slice(at + mark.length)}
    </>
  );
}

export function Sources() {
  return (
    <section id="sources" className="wrap section band">
      <div id="research" className="section-head">
        <h2>
          Sources
          <span className="count">{SOURCES.length}</span>
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
              <SourceArt domain={s.domain} kind={s.kind} title={s.title} backs={<Backs text={s.backs} mark={s.mark} />} />
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
            {SOURCES_NOT_CARDED.map((name) => (
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
