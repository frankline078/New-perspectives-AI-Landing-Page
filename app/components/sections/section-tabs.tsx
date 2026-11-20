import { SOURCES, STEPS } from "../../content";

export function SectionTabs() {
  return (
    <div className="tabs-bar">
      <nav className="tabs" aria-label="Page sections">
        <a href="#what">
          What it does
          <span className="count">{STEPS.length}</span>
        </a>
        <a href="#sources">
          Sources
          <span className="count">{SOURCES.length}</span>
        </a>
      </nav>
    </div>
  );
}
