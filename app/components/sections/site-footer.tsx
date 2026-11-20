import { LogoMark } from "../icons";
import { DEMO_HREF } from "../../site";

const FOOTER: { head: string; links: [string, string][] }[] = [
  {
    head: "What it does",
    links: [
      ["Research", "#research"],
      ["Writing", "#what"],
      ["Fact-check", "#what"],
      ["Images", "#what"],
      ["SEO and GEO score", "#what"],
      ["WordPress draft", "#what"],
    ],
  },
  {
    head: "Reads from",
    links: [
      ["PubMed Central", "#sources"],
      ["ASAM guidelines", "#sources"],
      ["SAMHSA", "#sources"],
      ["Government health agencies", "#sources"],
      ["Peer-reviewed journals", "#sources"],
    ],
  },
  {
    head: "Plans",
    links: [
      ["Starter", "#pricing"],
      ["Team", "#pricing"],
      ["Need more?", "#pricing"],
      ["Book a demo", DEMO_HREF],
    ],
  },
  {
    head: "New Perspectives AI",
    links: [
      ["Pricing", "#pricing"],
      ["Questions", "#faq"],
      ["Built for treatment sites", "#top"],
      ["Contact", DEMO_HREF],
    ],
  },
];

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
