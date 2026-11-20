import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../site";

/**
 * Structured data for search engines: who makes it and what it costs.
 * The plans must match the Pricing section (sections/pricing.tsx); update both together.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/np-logo-512.png`,
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      publisher: { "@id": `${SITE_URL}/#org` },
      offers: [
        { "@type": "Offer", name: "Starter", price: "399", priceCurrency: "USD", description: "60 articles a month, 1 WordPress site" },
        { "@type": "Offer", name: "Team", price: "799", priceCurrency: "USD", description: "200 articles a month, 5 WordPress sites" },
      ],
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
    />
  );
}
