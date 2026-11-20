import { ArrowIcon, CheckIcon } from "../icons";
import { NEED_MORE, PLANS, planFeatures } from "../../content";
import { DEMO_HREF } from "../../site";

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
          <span className="count">{PLANS.length}</span>
        </h2>
      </div>
      <div className="plans">
        {PLANS.map((p) => (
          <div key={p.name} className={p.featured ? "plan plan-ink" : "plan"}>
            <h3>{p.name}</h3>
            <p className="plan-price">
              {`$${p.price} `}
              <small>a month</small>
            </p>
            <Features items={planFeatures(p)} />
            <a className={p.featured ? "btn btn-gold" : "btn btn-light"} href={DEMO_HREF}>
              Book a demo
            </a>
          </div>
        ))}
        <div className="plan plan-soft">
          <h3>{NEED_MORE.title}</h3>
          <p>{NEED_MORE.line}</p>
          <a href={DEMO_HREF}>
            Talk to us
            <ArrowIcon size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
