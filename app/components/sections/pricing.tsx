import { ArrowIcon, CheckIcon } from "../icons";
import { DEMO_HREF } from "../../site";

/* The plans are also in the structured data (json-ld.tsx); update both together. */

function Features({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((t) => (
        <li key={t}>
          <CheckIcon size={12} />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Pricing() {
  return (
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
          <Features items={["60 articles a month", "1 WordPress site", "Research, fact-check and SEO", "GEO score and images"]} />
          <a className="btn btn-light" href={DEMO_HREF}>
            Book a demo
          </a>
        </div>
        <div className="plan plan-ink">
          <h3>Team</h3>
          <p className="plan-price">
            $799 <small>a month</small>
          </p>
          <Features items={["200 articles a month", "5 WordPress sites", "Everything in Starter", "Your own prompts and house rules"]} />
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
  );
}
