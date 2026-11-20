import { ArrowIcon, ChevronIcon, ExternalIcon, LogoMark } from "../icons";
import { Frame } from "../shot";
import { RunCard } from "../run-card";
import { HERO_TAGS } from "../../content";
import { screens } from "../../screens";
import { APP_HREF, DEMO_HREF } from "../../site";

export function Hero() {
  return (
    <div className="hero-band">
      <section className="wrap hero">
        <div>
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#top">Home</a>
            <ChevronIcon size={12} className="crumb-sep" />
            <a href="#what">Content tools</a>
            <ChevronIcon size={12} className="crumb-sep" />
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
            {HERO_TAGS.map((t, i) => (
              <span key={t} className={i === 0 ? "is-gold" : undefined}>
                {t}
              </span>
            ))}
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
  );
}
