import { LogoMark } from "../icons";
import { FOOTER } from "../../content";
import { DEMO_HREF } from "../../site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="logo">
              <LogoMark size={26} />
              New Perspectives AI
            </a>
            <p>
              New Perspectives AI researches your topic, writes the article, checks every claim, and hands you a draft ready for WordPress. <a href="#research">Every statistic links to its source</a>, a second pass fact-checks the draft, and <a href="#faq">nothing goes live until you approve it</a>.
            </p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.head} className="footer-col">
              <h3>{col.head}</h3>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-row">
          <span>© 2026 New Perspectives AI</span>
          <span>
            <a href="#faq">Questions</a>
            <a href={DEMO_HREF}>Contact</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
