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
    title: "Research | Use Cases | Al-Awal Biotech",
    description: "Discover how Al-Awal Biotech empowers research institutions with advanced codon optimization and molecular biology tools.",
};

export default function ResearchPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Spacer for navbar + breathing room */}
                <div style={{ height: 'calc(80px + 8vh)' }} aria-hidden="true" />

                <UseCaseHeader
                    title="Research"
                    description="Researchers in universities, academic laboratories, graduate students, postdocs, and scientific investigators."
                />

                <CTASection />
                <PreFooter />
            </main>
            <Footer />
        </>
    );
}
