import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import UseCaseHeader from "@/components/UseCaseHeader";

// Lazy load components below the fold for better performance
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

export const metadata = {
    title: "Biotech | Use Cases | Al-Awal Biotech",
    description: "Explore how biotech companies leverage Al-Awal Biotech for cutting-edge genetic engineering and protein expression optimization.",
};

export default function BiotechPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Spacer for navbar + breathing room */}
                <div style={{ height: 'calc(80px + 8vh)' }} aria-hidden="true" />

                <UseCaseHeader
                    title="Biotech"
                    description="Biotech startups, genetic engineering teams, synthetic biology labs, and protein expression specialists."
                />

                <CTASection />
                <PreFooter />
            </main>
            <Footer />
        </>
    );
}
