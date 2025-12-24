import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IntroSection />
      </main>
    </>
  );
}
