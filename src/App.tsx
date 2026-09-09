import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollExperience } from "@/components/scroll/ScrollExperience";
import { SnapSection } from "@/components/scroll/SnapSection";
import { Hero } from "@/components/sections/Hero";
import { IntroBand } from "@/components/sections/IntroBand";
import { CustomerSegments } from "@/components/sections/CustomerSegments";
import { TransformBusiness } from "@/components/sections/TransformBusiness";
import { BellLabsBand } from "@/components/sections/BellLabsBand";
import { GlobalNetwork } from "@/components/sections/GlobalNetwork";
import { InsightsGallery, LatestNews } from "@/components/sections/InsightsNews";

function App() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-nokia-navy">
      <SiteHeader />
      <ScrollExperience>
        <main className="flex-1">
          <SnapSection id="hero" overflowHidden className="bg-nokia-blue">
            <Hero />
          </SnapSection>

          {/* Connectivity intro + customer segments share one panel */}
          <SnapSection id="solutions" center>
            <IntroBand />
            <CustomerSegments />
          </SnapSection>

          <SnapSection id="transform" center overflowHidden>
            <TransformBusiness />
          </SnapSection>

          <SnapSection id="belllabs" overflowHidden className="bg-[#0a1e4a]">
            <BellLabsBand />
          </SnapSection>

          <SnapSection id="global" center>
            <GlobalNetwork />
          </SnapSection>

          <SnapSection id="insights" center>
            <InsightsGallery />
          </SnapSection>

          <SnapSection id="news">
            <LatestNews />
          </SnapSection>
        </main>

        <SnapSection id="footer" as="div">
          <SiteFooter />
        </SnapSection>
      </ScrollExperience>
    </div>
  );
}

export default App;
