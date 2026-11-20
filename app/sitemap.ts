import type { MetadataRoute } from "next";
import { LAST_MODIFIED, SITE_URL } from "./site";

/** One page for now. Add a row here for each new route. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 1 }];
}
