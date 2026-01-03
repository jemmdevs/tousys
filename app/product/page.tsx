import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ProductHero from "@/components/ProductHero";
import ProductBentoGrid from "@/components/ProductBentoGrid";

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
    title: "Product | Al-Awal Biotech",
    description: "Discover our advanced biotech solutions for codon optimization and molecular biology.",
};

export default function ProductPage() {
    return (
        <>
            <Navbar />
            <main>
                <ProductHero />
                <ProductBentoGrid />
                <CTASection />
                <PreFooter />
            </main>
            <Footer />
        </>
    );
}



