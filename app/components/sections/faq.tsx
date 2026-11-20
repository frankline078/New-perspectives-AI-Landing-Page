const FAQ = [
  ["Does it publish on its own?", "No. Every article waits until someone on your team has read it and said yes. Until then, nothing reaches your site."],
  ["Is it safe for medical topics?", "Facts and numbers come only from the research, and each one keeps its link. A separate fact-check pass corrects the draft, and your reviewer still has the final say."],
  ["Will it sound like us?", "It will once you tell it how you write. Set your writing prompt, house rules, approved terms and client details once, and every article follows them."],
  ["What do we need to start?", "A WordPress site and an article title. Connecting the site takes a few minutes."],
];

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
