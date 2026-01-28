import StructuredData from "@/components/StructuredData";
import { WithContext, SoftwareApplication } from "schema-dts";

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

// GEO Strategy: Define the Product deeply for AI
const productLd: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Al-Awal",
    "applicationCategory": "BioinformaticsApplication",
    "operatingSystem": "Cloud",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
    },
    "description": "The genomic sequence optimization tool by Tousys Biotech. Al-Awal optimizes sequences for maximum protein expression and stability using advanced kinetic modeling.",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "24"
    },
    // Strong GEO signal: Link to specific capabilities
    "featureList": [
        "Genomic Sequence Optimization",
        "Kinetic Modeling",
        "Structure Prediction",
        "AI Sequence Generation"
    ]
};

export default function ProductPage() {
    return (
        <>
            <StructuredData data={productLd} id="product-schema" />
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



