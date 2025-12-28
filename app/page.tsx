import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Lazy load components below the fold for better initial load performance
const IntroSection = dynamic(() => import("@/components/IntroSection"), {
  loading: () => <div style={{ minHeight: '50vh' }} />,
  ssr: true,
});

const ScrollyTellingSection = dynamic(() => import("@/components/ScrollyTellingSection"), {
  loading: () => <div style={{ minHeight: '100vh' }} />,
  ssr: true,
});

const DeveloperSection = dynamic(() => import("@/components/DeveloperSection"), {
  loading: () => <div style={{ minHeight: '30vh' }} />,
  ssr: true,
});

const BentoStatsSection = dynamic(() => import("@/components/BentoStatsSection"), {
  loading: () => <div style={{ minHeight: '80vh' }} />,
  ssr: true,
});

const CTASection = dynamic(() => import("@/components/CTASection"), {
  loading: () => <div style={{ minHeight: '40vh' }} />,
  ssr: true,
});

const PreFooter = dynamic(() => import("@/components/PreFooter"), {
  loading: () => <div style={{ minHeight: '50vh' }} />,
  ssr: true,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div style={{ minHeight: '60px' }} />,
  ssr: true,
});

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
      <Footer />
    </>
  );
}
