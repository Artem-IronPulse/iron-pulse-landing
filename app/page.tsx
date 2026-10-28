import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
      </main>
      <SiteFooter />
    </>
  );
}
