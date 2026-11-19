import type { ReactNode } from "react";
import Image from "next/image";
import { CheckIcon, FileIcon, PictureIcon } from "./icons";

/**
 * Designed stand-ins for the three "What it does" cards.
 *
 * A desktop capture shrunk into a 360px card reads as noise, so each card
 * shows one idea at a legible size, drawn with the page's own type and
 * colours. The copy is taken from a real run of the app; nothing is invented.
 */

export function ReportArt() {
  return (
    <div className="art art-report" aria-hidden="true" data-play="">
      <div className="art-tabs">
        <span className="is-on">Report</span>
        <span>
          Cited <b>12</b>
        </span>
        <span>Research path</span>
      </div>
      <div className="art-sheet">
        <p className="art-eyebrow">
          <FileIcon size={12} />
          Research report · 69 min read
        </p>
        <h4 className="art-title">How a Benzodiazepine Taper Works: Gradual Dose Reduction and the 2025 Guideline</h4>
        <ul className="art-sources">
          <li>
            <i />
            ASAM joint clinical practice guideline, 2025
          </li>
          <li>
            <i />
            PubMed Central · meta-analysis of three trials
          </li>
        </ul>
      </div>
    </div>
  );
}

export function DraftArt() {
  return (
    <div className="art art-draft" aria-hidden="true" data-play="">
      <div className="art-sheet art-sheet-flush">
        <p className="art-eyebrow">
          <CheckIcon size={12} />
          Version 2 · Fact check
        </p>
        <h4 className="art-title">How Does a Benzodiazepine Taper Work, and How Long Does It Take?</h4>
        <p className="art-body">
          A full taper can take <mark>months to years</mark> <s>usually six weeks</s>, especially after high doses taken for a long time.
        </p>
        <div className="art-chips">
          <span className="art-chip is-ink">
            <CheckIcon size={11} />
            Matches the 2025 guideline
          </span>
          <span className="art-chip art-fixed">1 corrected</span>
        </div>
      </div>
    </div>
  );
}

export function ImagesArt() {
  return (
    <div className="art" aria-hidden="true">
      <div className="art-sheet art-sheet-flush">
        <div className="art-photo">
          <Image
            src="/screens/art-featured.jpg"
            width={960}
            height={640}
            alt=""
            sizes="(max-width: 640px) 92vw, (max-width: 900px) 46vw, 330px"
            quality={80}
          />
          <span className="art-chip is-ink art-photo-tag">
            <PictureIcon size={11} />
            Featured image
          </span>
        </div>
        <p className="art-body art-alt">
          <b>Alt text</b>
          <span className="count">73 / 125</span>
          <span className="art-alt-text">
            Woman listening on a smartphone at a kitchen table in soft morning light
          </span>
        </p>
      </div>
    </div>
  );
}

/**
 * A source as the research step keeps it: where it came from, what it is,
 * and the line of the draft it backs. Used by the Sources cards.
 */
export function SourceArt({
  domain,
  kind,
  title,
  backs,
}: {
  domain: string;
  kind: string;
  title: string;
  backs: ReactNode;
}) {
  return (
    <div className="art art-source" aria-hidden="true" data-play="">
      <div className="art-sheet art-sheet-flush art-sheet-source">
        <p className="art-eyebrow art-domain">
          <span className="art-favicon">{domain[0].toUpperCase()}</span>
          {domain}
        </p>
        <h4 className="art-title">{title}</h4>
        <blockquote className="art-quote">{backs}</blockquote>
        <div className="art-chips">
          <span className="art-chip is-ink">
            <CheckIcon size={11} />
            Linked in draft
          </span>
          <span className="art-chip">{kind}</span>
        </div>
      </div>
    </div>
  );
}
