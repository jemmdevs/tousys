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
    title: "Pharma | Use Cases | Al-Awal Biotech",
    description: "Learn how pharmaceutical companies accelerate drug development with Al-Awal Biotech's advanced molecular tools and codon optimization.",
};

export default function PharmaPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Spacer for navbar + breathing room */}
                <div style={{ height: 'calc(80px + 8vh)' }} aria-hidden="true" />

                <UseCaseHeader
                    title="Pharma"
                    description="Pharmaceutical companies, drug development teams, clinical research organizations, and therapeutic protein developers."
                />

                <CTASection />
                <PreFooter />
            </main>
            <Footer />
        </>
    );
}
