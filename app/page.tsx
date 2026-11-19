import type { ReactNode } from "react";
import {
  ArrowIcon,
  CheckIcon,
  ChevronIcon,
  ExternalIcon,
  LogoMark,
} from "./components/icons";
import { Frame } from "./components/shot";
import { NavPills } from "./components/nav-pills";
import { MobileMenu } from "./components/mobile-menu";
import { RunCard } from "./components/run-card";
import { PlayOnView } from "./components/play-on-view";
import { DraftArt, ImagesArt, ReportArt, SourceArt } from "./components/art";
import { screens } from "./screens";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

/*
 * Copy comes from the design file. The only real things shown are the app
 * captures, which contain no client article. Bracketed text is a placeholder
 * for the owner to fill in.
 */

/** Where every "Book a demo" goes. */
const DEMO_HREF = "mailto:[YOUR EMAIL]";

/** The product itself: "Log in" and any link that opens the app. */
const APP_HREF = "https://app.newperspectives.ai/login";

/** The seven stations an article passes through, in order. */
const STEPS: { name: string; line: string }[] = [
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

const SOURCES = ["PubMed Central", "ASAM guidelines", "SAMHSA", "Government health agencies", "Peer-reviewed journals", "Research report"];

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

const FAQ = [
  ["Does it publish on its own?", "No. Every article waits until someone on your team has read it and said yes. Until then, nothing reaches your site."],
  ["Is it safe for medical topics?", "Facts and numbers come only from the research, and each one keeps its link. A separate fact-check pass corrects the draft, and your reviewer still has the final say."],
  ["Will it sound like us?", "It will once you tell it how you write. Set your writing prompt, house rules, approved terms and client details once, and every article follows them."],
  ["What do we need to start?", "A WordPress site and an article title. Connecting the site takes a few minutes."],
];

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

/**
 * Structured data for search engines: who makes it and what it costs.
 * The plans must match the Pricing section below; update both together.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/np-logo-512.png`,
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      publisher: { "@id": `${SITE_URL}/#org` },
      offers: [
        { "@type": "Offer", name: "Starter", price: "399", priceCurrency: "USD", description: "60 articles a month, 1 WordPress site" },
        { "@type": "Offer", name: "Team", price: "799", priceCurrency: "USD", description: "200 articles a month, 5 WordPress sites" },
      ],
    },
  ],
};

export default function Home() {
  return (
    <div id="top" className="np">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
      />
      <header className="site-header">
        <div className="wrap header-row">
          <a href="#top" className="logo">
            <LogoMark size={28} />
            New Perspectives AI
          </a>

          <div className="header-mid">
            <NavPills />
          </div>

          <div className="header-end">
            <a className="btn btn-light header-login" href={APP_HREF}>
              Log in
            </a>
            <a className="btn header-demo" href={DEMO_HREF}>
              Book a demo
            </a>
            <MobileMenu demoHref={DEMO_HREF} appHref={APP_HREF} />
          </div>
        </div>
      </header>

      <main>
        <div className="hero-band">
          <section className="wrap hero">
            <div>
              <nav className="crumbs" aria-label="Breadcrumb">
                <a href="#top">Home</a>
                <ChevronIcon size={12} style={{ transform: "rotate(-90deg)" }} />
                <a href="#what">Content tools</a>
                <ChevronIcon size={12} style={{ transform: "rotate(-90deg)" }} />
                <b>New Perspectives AI</b>
              </nav>

              <div className="ident">
                <span className="ident-tile">
                  <LogoMark size={36} />
                </span>
                <div>
                  <h1>New Perspectives AI</h1>
                  <a className="ident-link" href={APP_HREF}>
                    app.newperspectives.ai
                    <ExternalIcon size={12} />
                  </a>
                </div>
              </div>

              <p className="lede">
                Give it a title. It reads the guidelines and studies on your topic first, writes from what it found, checks each claim against its source, and leaves a draft in WordPress for you to approve.
              </p>

              <div className="tags" aria-label="At a glance">
                <span className="is-gold">7 steps</span>
                <span>12 min per draft</span>
                <span>Every claim linked</span>
              </div>

              <div className="hero-actions">
                <a className="btn btn-lg" href={DEMO_HREF}>
                  Book a demo
                  <ArrowIcon size={16} />
                </a>
                <a className="btn btn-lg btn-light" href="#what">
                  See what it does
                </a>
              </div>
              <p className="hero-note">Made for treatment centers and mental health websites.</p>
            </div>

            <div className="hero-shot">
              <Frame screen={screens.home} label="app.newperspectives.ai" sizes="(max-width: 900px) 92vw, 460px" eager />
              <RunCard />
            </div>
          </section>
        </div>

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

        <section className="wrap section" aria-labelledby="stack-h">
          <div className="section-head">
            <h2 id="stack-h">Works with</h2>
          </div>
          <div className="stack">
            <span className="stack-item">
              <i aria-hidden="true">W</i>
              WordPress
            </span>
            <span className="stack-item stack-item-plain">Treatment and mental health websites</span>
          </div>
        </section>

        <section id="pricing" className="wrap section">
          <div className="section-head">
            <h2>
              Pricing
              <span className="count">2</span>
            </h2>
          </div>
          <div className="plans">
            <div className="plan">
              <h3>Starter</h3>
              <p className="plan-price">
                $399 <small>a month</small>
              </p>
              <ul>
                {["60 articles a month", "1 WordPress site", "Research, fact-check and SEO", "GEO score and images"].map((t) => (
                  <li key={t}>
                    <CheckIcon size={12} />
                    {t}
                  </li>
                ))}
              </ul>
              <a className="btn btn-light" href={DEMO_HREF}>
                Book a demo
              </a>
            </div>
            <div className="plan plan-ink">
              <h3>Team</h3>
              <p className="plan-price">
                $799 <small>a month</small>
              </p>
              <ul>
                {["200 articles a month", "5 WordPress sites", "Everything in Starter", "Your own prompts and house rules"].map((t) => (
                  <li key={t}>
                    <CheckIcon size={12} />
                    {t}
                  </li>
                ))}
              </ul>
              <a className="btn btn-gold" href={DEMO_HREF}>
                Book a demo
              </a>
            </div>
            <div className="plan plan-soft">
              <h3>Need more?</h3>
              <p>Writing more than 200 articles a month, or running more than 5 sites? Tell us your volume and we will build a plan around it.</p>
              <a href={DEMO_HREF}>
                Talk to us
                <ArrowIcon size={14} />
              </a>
            </div>
          </div>
        </section>

        <section id="faq" className="wrap section">
          <div className="section-head">
            <h2>Questions</h2>
          </div>
          <div className="faq">
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="demo" className="wrap closing">
          <h2>Bring a title you have been putting off.</h2>
          <p>We will run it live: the research, the draft and the fact-check, in about 12 minutes.</p>
          <a className="btn btn-lg btn-gold" href={DEMO_HREF}>
            Book a demo
          </a>
        </section>
      </main>

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
      <PlayOnView />
    </div>
  );
}
