import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import ScrollyTellingSection from "@/components/ScrollyTellingSection";
import DeveloperSection from "@/components/DeveloperSection";
import BentoStatsSection from "@/components/BentoStatsSection";
import CTASection from "@/components/CTASection";
import PreFooter from "@/components/PreFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IntroSection />
        <ScrollyTellingSection />
        <DeveloperSection />
        <BentoStatsSection />
        <CTASection />
        <PreFooter />
      </main>
    </>
  );
}

