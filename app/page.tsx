import { JsonLd } from "./components/json-ld";
import { PlayOnView } from "./components/play-on-view";
import { SiteHeader } from "./components/sections/site-header";
import { Hero } from "./components/sections/hero";
import { SectionTabs } from "./components/sections/section-tabs";
import { WhatItDoes } from "./components/sections/what-it-does";
import { Sources } from "./components/sections/sources";
import { WorksWith } from "./components/sections/works-with";
import { Pricing } from "./components/sections/pricing";
import { Faq } from "./components/sections/faq";
import { Closing } from "./components/sections/closing";
import { SiteFooter } from "./components/sections/site-footer";

/*
 * Copy comes from the design file. The only real things shown are the app
 * captures, which contain no client article. Bracketed text is a placeholder
 * for the owner to fill in (see DEMO_HREF in site.ts).
 */

export default function Home() {
  return (
    <div id="top" className="np">
      <JsonLd />
      <SiteHeader />

      <main>
        <Hero />
        <SectionTabs />
        <WhatItDoes />
        <Sources />
        <WorksWith />
        <Pricing />
        <Faq />
        <Closing />
      </main>

      <SiteFooter />
      <PlayOnView />
    </div>
  );
}
