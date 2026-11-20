import { FAQ } from "../../content";

export function Faq() {
  return (
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
  );
}
