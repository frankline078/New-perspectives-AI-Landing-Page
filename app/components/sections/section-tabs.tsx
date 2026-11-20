import { STEPS } from "./what-it-does";
import { SOURCES } from "./sources";

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
          <span className="count">{SOURCES.length - 1}</span>
        </a>
      </nav>
    </div>
  );
}
