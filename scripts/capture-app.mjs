/**
 * Capture high-resolution screenshots of the New Perspectives AI app
 * (Content-Tool-SRW, Vite dev server on http://localhost:5173).
 *
 * The Playwright MCP in .mcp.json is pinned to localhost:3000, and the
 * Playwright package wants a Chromium build that is not installed, so this
 * drives the installed chromium-1234 directly.
 *
 * Sign-in, pick one:
 *   CT_EMAIL=... CT_PASSWORD=...  node scripts/capture-app.mjs
 *   CT_TOKEN=<bearer token>       node scripts/capture-app.mjs
 *   node scripts/capture-app.mjs --login        (opens a visible browser; sign
 *                                                in by hand, then it continues)
 * The session is saved to .playwright-mcp/app-session.json (gitignored) and
 * reused on later runs, so credentials are needed once per 12 hours.
 *
 * Options:
 *   --out <dir>        where PNGs go (default public/screens/raw)
 *   --routes a,b,c     routes to capture instead of the default list
 *   --scale 2|3        device pixel ratio (default 2 -> 2880x1800 files)
 *   --width <px>       viewport width (default 1440; height stays 900)
 *   --base <url>       app origin (default http://localhost:5173)
 *   --dress            rewrite test-only text (tags like [UI TEST], fake-site
 *                      labels, staff emails, cost figures) before capturing
 *   --scenes a,b       named flows instead of plain routes: hero (filled-in
 *                      New article form), run-<step> (research, writing,
 *                      fact-check, images, seo), report, draft, home, review,
 *                      runs, published
 *   --task <id>        the run the scenes open (default: the benzodiazepine
 *                      taper test article)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APP_REPO = path.resolve(ROOT, "..", "Content-Tool-SRW");
const CHROME = path.join(
  process.env.LOCALAPPDATA || "",
  "ms-playwright",
  "chromium-1234",
  "chrome-win64",
  "chrome.exe",
);
const SESSION = path.join(ROOT, ".playwright-mcp", "app-session.json");

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const BASE = opt("--base", "http://localhost:5173").replace(/\/$/, "");
const OUT = path.resolve(ROOT, opt("--out", "public/screens/raw"));
const SCALE = Number(opt("--scale", "2"));
const WIDTH = Number(opt("--width", "1440"));
const HEADED_LOGIN = args.includes("--login");
const DRESS = args.includes("--dress");
const SCENES = opt("--scenes", "").split(",").map((r) => r.trim()).filter(Boolean);
const TASK = opt("--task", "becb0ed8-24af-49b2-b2cc-0dd382afac4f");
const ROUTES = opt(
  "--routes",
  [
    "/",
    "/tasks",
    "/research-lab",
    "/review",
    "/orchestrator",
    "/published-pages",
    "/ratings/results",
    "/integrations",
  ].join(","),
)
  .split(",")
  .map((r) => r.trim())
  .filter(Boolean);

/** The localStorage key the app keeps its bearer token under. */
function tokenKey() {
  try {
    const env = fs.readFileSync(path.join(APP_REPO, ".env"), "utf8");
    const m = env.match(/^VITE_TOKEN_KEY=(.+)$/m);
    if (m) return m[1].trim();
  } catch {}
  return "ct_access_token";
}

function fileName(route) {
  const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/[\/$]+/g, "-");
  return `${slug}.png`;
}

/**
 * Rewrite text that gives the test workspace away. Runs inside the page; only
 * text nodes change, so layout and styling stay as the app renders them.
 */
function dressPage() {
  const rules = [
    [/\[(UI TEST|TEST|HOTFIX TEST|QA)[^\]]*\]\s*/g, ""],
    [/^(?:B\d(?:-\d)?|B-1)(?: B\d-\d)?(?: Custom)?:?\s+(?=[A-Z])/g, ""],
    [/E2E Plugin Site \(fake, unreachable\)/g, "Summit Wellness Group MH"],
    [/E2E Test Client/g, "The Summit Wellness Group"],
    [/e2e-plugin\.exam\S*/g, "summitmentalhealth.com"],
    [/GPT-6 research smoke \d{4}-\d{2}-\d{2}/g, "Benzodiazepine taper guidelines, 2025 update"],
    [/Mike's girlfriend Lilly's website/g, ""],
    [/Franklne Demo Test/g, ""],
    [/Franklne Demo/g, "Harbor Recovery"],
    [/frankline@newperspec\S*/g, "Frankline"],
    [/emir@newperspectiveseo\.com/g, "Emir"],
    [/ignas@newperspective\S*/g, "Ignas"],
    [/anja@newperspectives\S*/g, "Anja"],
    [/(mike|admin)@newperspectiv\S*/g, "Mike"],
    [/Good (morning|afternoon|evening), frankline/g, "Good $1, Frankline"],
    [/\$\d+\.\d{2}/g, ""],
    [/Cost so far\s*(·\s*)?/g, ""],
    [/^\s*Cost\s*$/g, ""],
    [/^\s*174\s*$/g, "3"],
    [/^\s*frankline\s*$/g, "Frankline"],
    [/^\s*·\s*/g, ""],
    [/\d+k chars gathered/g, ""],
  ];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const n of nodes) {
    let t = n.nodeValue;
    for (const [re, to] of rules) t = t.replace(re, to);
    if (t !== n.nodeValue) n.nodeValue = t;
  }
  // The home header's spend chip: hide the whole pill, icon included.
  for (const el of document.querySelectorAll("main *")) {
    if (el.children.length === 0 && /^\s*this month\s*$/.test(el.textContent || "")) {
      let chip = el;
      for (let i = 0; i < 4 && chip.parentElement; i++) {
        chip = chip.parentElement;
        if (chip.querySelector("svg")) break;
      }
      chip.style.display = "none";
    }
  }
}

async function settle(page, ms = 1500) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(ms);
}

async function openRunStep(page, step) {
  await page.goto(`${BASE}/tasks/${TASK}`);
  await settle(page, 4000);
  await page.locator("main button", { hasText: new RegExp("^" + step, "i") }).first().click();
  await settle(page, 3000);
}

/** Named flows that put the app in a state worth photographing. */
const scenes = {
  async home(page) {
    await page.goto(`${BASE}/`);
    await settle(page, 2500);
  },
  async runs(page) {
    await page.goto(`${BASE}/tasks`);
    await settle(page, 2500);
  },
  async review(page) {
    await page.goto(`${BASE}/review`);
    await settle(page, 2500);
  },
  async published(page) {
    await page.goto(`${BASE}/published-pages`);
    await settle(page, 2500);
  },
  async hero(page) {
    await page.goto(`${BASE}/orchestrator`);
    await settle(page, 2000);
    await page.getByPlaceholder("e.g. The Future of AI in Healthcare").fill(
      "How a Benzodiazepine Taper Works and How Long It Takes",
    );
    await page.getByPlaceholder("ai, machine learning, healthcare").fill(
      "benzodiazepine taper, benzo taper schedule, how long does a benzo taper take",
    );
    const site = page.getByText("Choose a site").first();
    if (await site.count()) {
      await site.click();
      await page.waitForTimeout(400);
      const option = page.getByRole("option", { name: /Summit Wellness Group$/ }).first();
      if (await option.count()) await option.click();
      else await page.keyboard.press("Escape");
    }
    await page.waitForTimeout(600);
  },
  async "run-research"(page) { await openRunStep(page, "Research"); },
  async "run-writing"(page) { await openRunStep(page, "Writing"); },
  async "run-fact-check"(page) { await openRunStep(page, "Fact-check"); },
  async "run-images"(page) { await openRunStep(page, "Images"); },
  async "run-seo"(page) { await openRunStep(page, "SEO"); },
  async report(page) {
    await openRunStep(page, "Research");
    await page.getByRole("button", { name: /Open report/ }).or(page.getByRole("link", { name: /Open report/ })).first().click();
    await settle(page, 4000);
  },
  async draft(page) {
    await page.goto(`${BASE}/review/${TASK}`);
    await settle(page, 5000);
  },
};

async function signedIn(page) {
  return !/\/login/.test(page.url());
}

async function main() {
  if (!fs.existsSync(CHROME)) throw new Error(`Chromium not found at ${CHROME}`);
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(path.dirname(SESSION), { recursive: true });

  const browser = await chromium.launch({ executablePath: CHROME, headless: !HEADED_LOGIN });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: 900 },
    deviceScaleFactor: SCALE,
    storageState: fs.existsSync(SESSION) && !process.env.CT_TOKEN ? SESSION : undefined,
  });
  const page = await context.newPage();

  if (process.env.CT_TOKEN) {
    await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded" });
    await page.evaluate(([k, v]) => localStorage.setItem(k, v), [tokenKey(), process.env.CT_TOKEN]);
  }

  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });

  if (!(await signedIn(page))) {
    if (process.env.CT_EMAIL && process.env.CT_PASSWORD) {
      await page.getByPlaceholder("you@company.com").fill(process.env.CT_EMAIL);
      await page.getByPlaceholder("Enter your password").fill(process.env.CT_PASSWORD);
      await page.getByRole("button", { name: "Sign in" }).click();
      try {
        await page.waitForURL((u) => !/\/login/.test(u.href), { timeout: 20000 });
      } catch {
        const err = await page.evaluate(() => document.body.innerText);
        await page.screenshot({ path: path.join(OUT, "_login-failed.png") });
        throw new Error("Sign-in did not complete. Page text:\n" + err.slice(0, 600));
      }
    } else if (HEADED_LOGIN) {
      console.log("Sign in in the browser window. Waiting up to 5 minutes...");
      await page.waitForURL((u) => !/\/login/.test(u.href), { timeout: 300000 });
    } else {
      throw new Error(
        "Not signed in. Set CT_EMAIL and CT_PASSWORD, or CT_TOKEN, or run with --login.",
      );
    }
    await page.waitForLoadState("networkidle");
  }
  await context.storageState({ path: SESSION });
  console.log("Signed in. Session saved to", path.relative(ROOT, SESSION));

  const shoot = async (name) => {
    // Every <img> decoded, so thumbnails are not caught half-loaded.
    await page
      .waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 15000 })
      .catch(() => {});
    if (DRESS) {
      // Twice: animated counters and late fetches can re-render after the first pass.
      await page.evaluate(dressPage);
      await page.waitForTimeout(700);
      await page.evaluate(dressPage);
    }
    await page.waitForTimeout(300);
    const file = path.join(OUT, name);
    await page.screenshot({ path: file });
    console.log("captured", name, "->", path.relative(ROOT, file));
    return file;
  };

  if (SCENES.length) {
    for (const name of SCENES) {
      const scene = scenes[name];
      if (!scene) throw new Error(`Unknown scene "${name}". Known: ${Object.keys(scenes).join(", ")}`);
      await scene(page);
      await shoot(`${name}.png`);
    }
  } else {
    for (const route of ROUTES) {
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200); // let skeletons and fonts settle
      await shoot(fileName(route));
    }
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
