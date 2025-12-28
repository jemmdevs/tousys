import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import ScrollyTellingSection from "@/components/ScrollyTellingSection";
import DeveloperSection from "@/components/DeveloperSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IntroSection />
        <ScrollyTellingSection />
        <DeveloperSection />
      </main>
    </>
  );
}
