import { DEMO_HREF } from "../../site";

export function Closing() {
  return (
    <section id="demo" className="wrap closing">
      <h2>Bring a title you have been putting off.</h2>
      <p>We will run it live: the research, the draft and the fact-check, in about 12 minutes.</p>
      <a className="btn btn-lg btn-gold" href={DEMO_HREF}>
        Book a demo
      </a>
    </section>
  );
}
