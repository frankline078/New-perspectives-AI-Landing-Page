import { DEMO_HREF } from "./site";

/**
 * All page copy and data in one place. The section components only lay it
 * out. Facts that appear more than once (the step count, the time per draft,
 * the plans) are written here once and every sentence that mentions them is
 * built from them.
 */

/* ---------- Repeated facts ---------- */

/** Minutes from a title to a finished draft. */
export const DRAFT_MINUTES = 12;

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

/** A small count as a word, for prose ("Seven steps"). Falls back to digits. */
function spell(n: number, capital = false) {
  const word = NUMBER_WORDS[n] ?? String(n);
  return capital ? word[0].toUpperCase() + word.slice(1) : word;
}

/* ---------- What it does ---------- */

/**
 * The stations an article passes through, in order. `run` is the same step
 * as the hero's run card says it while it happens: worded differently on
 * purpose, but kept on the same row so the two can never disagree on count.
 */
export const STEPS: { name: string; line: string; run: { label: string; ms: number } }[] = [
  {
    name: "Research",
    line: "Reads clinical guidelines, studies and government pages on your topic, and keeps every link.",
    run: { label: "Reading the research", ms: 1700 },
  },
  {
    name: "Writing",
    line: "Writes the article from that research. The model, prompts and settings are already set up.",
    run: { label: "Writing the draft", ms: 1400 },
  },
  {
    name: "Fact-check",
    line: "A second pass reads the draft against the research and fixes what does not hold up.",
    run: { label: "Checking every claim", ms: 1700 },
  },
  {
    name: "Images",
    line: "Three images for each article, alt text included.",
    run: { label: "Making three images", ms: 1200 },
  },
  {
    name: "SEO",
    line: "Title, description and slug, plus a GEO score for AI search.",
    run: { label: "Title, slug and GEO score", ms: 1200 },
  },
  {
    name: "Your review",
    line: "Every article waits for a person. Nothing goes live until you approve it.",
    run: { label: "Waiting for your OK", ms: 2200 },
  },
  {
    name: "WordPress",
    line: "Lands on your site as a draft, ready to publish.",
    run: { label: "Sending to WordPress", ms: 1100 },
  },
];

/** The run card's steps (components/run-card.tsx), one per entry in STEPS. */
export const RUN = STEPS.map((s) => s.run);

/** Which drawing a "What it does" card shows (components/art.tsx). */
export type ShownArt = "report" | "draft" | "images";

/**
 * The steps shown as designed cards. `note` says what the art shows; `step`
 * is the card's place among STEPS, shown in its tile instead of a pictogram.
 */
export const SHOWN: { title: string; note: string; art: ShownArt; step: number; href: string }[] = [
  { title: "Research report", note: "12 sources cited, every link kept", art: "report", step: 1, href: "#sources" },
  { title: "Fact-checked draft", note: "The wrong timeline, caught and fixed", art: "draft", step: 3, href: "#sources" },
  { title: "Images with alt text", note: "The alt text comes written", art: "images", step: 4, href: "#sources" },
];

export const HERO_TAGS = [`${STEPS.length} steps`, `${DRAFT_MINUTES} min per draft`, "Every claim linked"];

export const DEMO_BANNER_LINE = `Pick a topic and watch it research, write and check the article. It takes about ${DRAFT_MINUTES} minutes to get from a title to a finished draft.`;

export const CLOSING_LINE = `We will run it live: the research, the draft and the fact-check, in about ${DRAFT_MINUTES} minutes.`;

/* ---------- Sources ---------- */

/** Everything it reads from. */
export const SOURCES = ["PubMed Central", "ASAM guidelines", "SAMHSA", "Government health agencies", "Peer-reviewed journals"];

/**
 * Sources shown as cards, with what each one backs in the draft. `mark`, if
 * set, is the part of `backs` drawn highlighted.
 */
export const SOURCE_CARDS: { name: string; note: string; domain: string; kind: string; title: string; backs: string; mark?: string }[] = [
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
    backs: "A full taper can take months to years, especially after high doses taken for a long time.",
    mark: "months to years",
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

/** The sources without a card, listed under the research band. */
export const SOURCES_NOT_CARDED = SOURCES.filter((name) => !SOURCE_CARDS.some((c) => c.name === name));

/* ---------- Pricing ---------- */

/**
 * The plans. The Pricing section, the structured data (components/json-ld.tsx),
 * the nav note and the footer are all built from this list.
 */
export const PLANS: { name: string; price: number; articles: number; sites: number; extras: string[]; featured?: boolean }[] = [
  { name: "Starter", price: 399, articles: 60, sites: 1, extras: ["Research, fact-check and SEO", "GEO score and images"] },
  { name: "Team", price: 799, articles: 200, sites: 5, extras: ["Everything in Starter", "Your own prompts and house rules"], featured: true },
];

const articlesLine = (n: number) => `${n} articles a month`;
const sitesLine = (n: number) => `${n} WordPress site${n === 1 ? "" : "s"}`;

/** What a plan includes, in the order shown on its card. */
export const planFeatures = (p: (typeof PLANS)[number]) => [articlesLine(p.articles), sitesLine(p.sites), ...p.extras];

/** The plan's limits in one line, for the structured data. */
export const planSummary = (p: (typeof PLANS)[number]) => `${articlesLine(p.articles)}, ${sitesLine(p.sites)}`;

const LARGEST = PLANS[PLANS.length - 1];
const LOWEST_PRICE = Math.min(...PLANS.map((p) => p.price));

export const NEED_MORE = {
  title: "Need more?",
  line: `Writing more than ${LARGEST.articles} articles a month, or running more than ${LARGEST.sites} sites? Tell us your volume and we will build a plan around it.`,
};

/* ---------- Questions ---------- */

export const FAQ: [question: string, answer: string][] = [
  ["Does it publish on its own?", "No. Every article waits until someone on your team has read it and said yes. Until then, nothing reaches your site."],
  ["Is it safe for medical topics?", "Facts and numbers come only from the research, and each one keeps its link. A separate fact-check pass corrects the draft, and your reviewer still has the final say."],
  ["Will it sound like us?", "It will once you tell it how you write. Set your writing prompt, house rules, approved terms and client details once, and every article follows them."],
  ["What do we need to start?", "A WordPress site and an article title. Connecting the site takes a few minutes."],
];

/* ---------- Navigation ---------- */

/**
 * The main nav, shared by the desktop pill nav and the mobile menu so the
 * two always carry the same sections and wording. The note only shows in
 * the mobile menu, under the label.
 */
export const NAV_LINKS: { href: string; label: string; note: string }[] = [
  { href: "#what", label: "What it does", note: `${spell(STEPS.length, true)} steps from a title to a draft` },
  { href: "#sources", label: "Sources", note: "What it reads before it writes" },
  { href: "#pricing", label: "Pricing", note: `From $${LOWEST_PRICE} a month` },
  { href: "#faq", label: "Questions", note: "Publishing, safety and your voice" },
];

/* ---------- Footer ---------- */

export const FOOTER: { head: string; links: [label: string, href: string][] }[] = [
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
    links: SOURCES.map((name): [string, string] => [name, "#sources"]),
  },
  {
    head: "Plans",
    links: [...PLANS.map((p): [string, string] => [p.name, "#pricing"]), [NEED_MORE.title, "#pricing"], ["Book a demo", DEMO_HREF]],
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
