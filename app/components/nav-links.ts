/**
 * The main nav, shared by the desktop pill nav and the mobile menu so the
 * two always carry the same sections and wording. The note only shows in
 * the mobile menu, under the label.
 */
export const NAV_LINKS: { href: string; label: string; note: string }[] = [
  { href: "#what", label: "What it does", note: "Seven steps from a title to a draft" },
  { href: "#sources", label: "Sources", note: "What it reads before it writes" },
  { href: "#pricing", label: "Pricing", note: "From $399 a month" },
  { href: "#faq", label: "Questions", note: "Publishing, safety and your voice" },
];
