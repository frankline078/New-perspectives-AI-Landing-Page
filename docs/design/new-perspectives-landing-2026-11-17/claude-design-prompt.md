# Brief: redesign this landing page without changing a word

You're taking this on as a senior designer with 15 years in brand and editorial web design, someone who can tell at a glance when a page was assembled from defaults instead of designed. I want your judgment as well as your hands: where you disagree with this brief, say so and tell me what you did instead.

The attached `index.html` is the current page (plain HTML and CSS, no JavaScript). Render it and look at it before reading the markup.

## The product and the reader

New Perspectives AI takes an article title and keywords, researches the topic from clinical guidelines, studies and government sources, writes the article, fact-checks it against that research, and delivers a draft to WordPress for a human to approve.

The buyers are marketing and content leads at addiction treatment and mental health providers, and the clinical reviewers who sign off on what gets published. A wrong medical claim on their site is a real liability, and most of them are already wary of AI-written content.

The page currently looks AI-generated, which tells this audience that nobody checked it. That is the opposite of what the product promises, and it is the reason for this job.

## The job

The copy is approved and stays exactly as it is. Redesign the visuals so the page reads as the work of a person with a point of view, made for this product and this reader.

## What stays fixed

- Every word of visible text, including the text inside the product mock-ups (form values, "Matches the 2025 guideline", "1 claim corrected", the GEO checklist, the WordPress draft card, the article excerpt and its sources).
- The bracketed placeholders (`[CLIENT LOGO]`, `[CUSTOMER QUOTE: ...]`, `[NAME], [ROLE] at [COMPANY]`, `mailto:[YOUR EMAIL]`). We fill these in later, so keep them visible.
- Section order, anchor ids and link targets.
- Ink `#23254A` and gold `#E5A93A` as the brand anchors. The pale lilac surfaces are not protected.

You may change how text is set as long as the words and reading order survive. For example, two of the three "stats" in the dark section are sentences chopped in half to fill a big-number slot ("Every / statistic links to the source it came from", "No source, / no claim."). Setting them as sentences is welcome.

Do not write new copy to fill a layout. If an idea needs content that doesn't exist (a real screenshot, a longer excerpt), add a labelled placeholder in the same bracket style and list it in your notes. Update `alt` text and `aria-label`s to match whatever you draw.

## Why it reads as generated

The root problem is one template applied to every section: the same extra-bold heading at the same size, the same padding, the same white card with a 28px radius and a soft wide shadow, in alternating light and dark bands. Nothing is louder, quieter or more important than anything else, so nothing looks chosen.

On top of that sit the stock parts:

- Six four-point sparkle stars used as decoration.
- A hero illustration (tilted floating document, magnifying glass with a tick, flask and shield badges) that could illustrate any product.
- Grey rounded bars standing in for text in every mock-up, and generic picture icons standing in for images.
- A seven-step pipeline of line icons in circles on a dashed rail, with an animated token.
- A bento grid of five feature cards, each a small fake interface over a heading and a one-liner.
- A circular score gauge, pill chips, tick-mark checklists, and a row of oversized gold numbers.
- Three pricing columns with the middle one inverted to dark.
- A centred closing block with a decoration, a huge headline and one button.
- Buttons that lift on hover, a rounded-square logo mark, and a globe icon for WordPress.
- Indigo and lavender everywhere, with Bricolage Grotesque at weight 800 on every heading.

Worth protecting: the fact-check example where "usually six weeks" is struck through and replaced by "months to years", and the sample draft with named ASAM sources. They are the most persuasive things on the page because they show the product catching a real error. The focus states, reduced-motion handling and no-JavaScript build are also sound.

## Where I'd like it to go

The product's claim is that it reads before it writes. I'd like the page to look like it was made by people who read: closer to a well-set journal or a good newspaper explainer than a software launch page. Treat that as a starting lean and take it somewhere better if you see how.

- **Let each section's form come from its content.** A list of sources can look like a reference list. Seven steps can be a sentence, a numbered list or a diagram, whichever explains them best. Two plans and a "talk to us" need not be three boxes.
- **Make the evidence the visual centre.** Set the corrected claim, the article excerpt and the sources as real typography at a readable size, and let them carry the page in place of illustration. The hero is the obvious candidate.
- **Establish a hierarchy.** Pick the one or two loudest moments and let the rest be quieter. Vary heading scale, density and whitespace on purpose.
- **Use fewer containers.** Keep a box only where something is truly a separate object, such as a product screen.
- **Draw less, and make what you draw specific** to this product.
- **Choose type with intent.** You may change typefaces (Google Fonts keeps the build simple). Body text should be comfortable to read at length.
- **Keep it calm and credible.** These readers work in healthcare.

Please don't swap one stock look for another. Cream paper with a serif headline and an italic word is as much a template as the bento grid. The test for any decision is whether you can say why it suits this content and would not suit another product.

## Build constraints

- One `index.html`, plain HTML and CSS, no JavaScript, no image files unless flagged as placeholders.
- Works at 1440px, 390px and 360px wide with no sideways scrolling. Design the phone layout properly; don't just stack the desktop one.
- Keep visible focus states, sensible heading order, WCAG AA text contrast and `prefers-reduced-motion` support. Motion is optional and should explain something if kept.

## What to send back

1. The redesigned `index.html`.
2. A short note on the point of view you took and the two or three decisions that matter most.
3. A list of anything you removed and any placeholder you added.
4. Confirmation that the visible text matches the original word for word, with every exception listed (including reunited sentences).

Before you finish, compare your page with the original and ask whether a stranger would guess the same tool made both. If they would, keep going.
