import { CLOSING_LINE } from "../../content";
import { DEMO_HREF } from "../../site";

export function Closing() {
  return (
    <section id="demo" className="wrap closing">
      <h2>Bring a title you have been putting off.</h2>
      <p>{CLOSING_LINE}</p>
      <a className="btn btn-lg btn-gold" href={DEMO_HREF}>
        Book a demo
      </a>
    </section>
  );
}
