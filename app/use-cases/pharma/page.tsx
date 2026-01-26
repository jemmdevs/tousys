import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import UseCaseHeader from "@/components/UseCaseHeader";
import UseCaseScenarios from "@/components/UseCaseScenarios";
import UseCaseToolsList from "@/components/UseCaseToolsList";

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

// Pharma scenarios - typical use cases
const pharmaScenarios = [
    { quote: "We're developing a therapeutic antibody and need maximum expression in CHO cells" },
    { quote: "We're designing a gene therapy and want to verify the transgene expresses correctly in human cells" },
    { quote: "We need to document all codon optimization for the FDA regulatory dossier" },
    { quote: "The patient has a genetic variant and we want to predict if it will affect protein production" },
];

// Pharma tools data
const pharmaTools = [
    {
        name: "Codon Optimizer",
        description: "Design genes for biopharmaceutical production (antibodies, therapeutic enzymes) with maximum expression.",
        image: "/features/codonOptimization_converted.avif"
    },
    {
        name: "Human Expression Mode",
        description: "Specific optimization for mammalian cell expression (CHO, HEK293) for gene therapies.",
        image: "/features/fullApp2_converted.avif"
    },
    {
        name: "3D Structure Viewer",
        description: "Verify that optimization doesn't introduce folding problems in critical therapeutic proteins.",
        image: "/features/3dStructure_converted.avif"
    },
    {
        name: "Mutation Comparator",
        description: "Analyze how patient variants affect expression vs wild-type in personalized therapies.",
        image: "/features/mutationComparator_converted.avif"
    },
    {
        name: "AI Recommendations",
        description: "AI-informed decisions to document in regulatory submissions.",
        image: "/features/aiPeakAnalysis_converted.avif"
    },
    {
        name: "DAIS Score",
        description: "Quantitative metric for Quality by Design (QbD) and regulatory documentation.",
        image: "/features/daisAnalysis_converted.avif"
    },
    {
        name: "Security & Privacy",
        description: "Critical IP protection in new drug development.",
        image: "/features/darkMode_converted.avif"
    },
    {
        name: "Project Management",
        description: "Complete version traceability for GxP compliance.",
        image: "/features/inCanvasTools_converted.avif"
    },
    {
        name: "Notes System",
        description: "Detailed documentation for regulatory files and audits.",
        image: "/features/darkMode_converted.avif"
    },
    {
        name: "Optimization Report",
        description: "Quantifiable metrics and detailed reports for IND/NDA submissions.",
        image: "/features/reportOptimization.avif",
        isNew: true,
        date: "Jan 2026"
    }
];

export const metadata = {
    title: "Pharma | Use Cases | Al-Awal Biotech",
    description: "Learn how pharmaceutical companies accelerate drug development with Al-Awal Biotech's advanced molecular tools and codon optimization.",
};

export default function PharmaPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Spacer for navbar */}
                <div style={{ height: 'calc(80px + 4vh)' }} aria-hidden="true" />

                <UseCaseHeader
                    title="Pharma"
                    description="Scientists in large pharmaceuticals, biologics development, gene therapy teams, vaccine development, and therapeutic antibodies."
                />

                <UseCaseScenarios scenarios={pharmaScenarios} />

                <UseCaseToolsList tools={pharmaTools} />

                <CTASection />
                <PreFooter />
            </main>
            <Footer />
        </>
    );
}
