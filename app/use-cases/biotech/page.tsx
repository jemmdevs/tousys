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

// Biotech scenarios - typical use cases
const biotechScenarios = [
    { quote: "We need to optimize 50 genes for yeast production before scaling to fermenters" },
    { quote: "The client wants to maximize expression but avoid certain restriction sites for their vector" },
    { quote: "We're designing a metabolic pathway and each enzyme needs to express well" },
    { quote: "We need to document why we chose each codon for the quality audit" },
];

// Biotech tools data
const biotechTools = [
    {
        name: "Codon Optimizer",
        description: "Optimize synthetic genes before ordering DNA synthesis, maximize expression in production systems.",
        image: "/features/codonOptimization_converted.avif"
    },
    {
        name: "Restriction Site Detection",
        description: "Avoid unwanted cut sites to facilitate modular cloning and construct assembly.",
        image: "/features/inCanvasTools_converted.avif"
    },
    {
        name: "DAIS Score",
        description: "Quick QC of sequences before sending to synthesis, quality control in your pipeline.",
        image: "/features/daisAnalysis_converted.avif"
    },
    {
        name: "Multi-Organism",
        description: "Design flexible constructs that work across multiple expression hosts.",
        image: "/features/fullApp2_converted.avif"
    },
    {
        name: "Real-Time Optimization",
        description: "Iterate rapidly on designs without waiting for processing queues.",
        image: "/features/kineticChart_converted.avif"
    },
    {
        name: "Cloud Storage",
        description: "Manage projects from multiple clients and products in an organized way.",
        image: "/features/darkMode_converted.avif"
    },
    {
        name: "Kinetic Profile",
        description: "Identify and eliminate bottlenecks before scaling up production.",
        image: "/features/kineticChart_converted.avif"
    },
    {
        name: "Single Codon Editor",
        description: "Manually adjust specific codons to avoid IP issues or sequence patents.",
        image: "/features/inCanvasTools_converted.avif"
    },
    {
        name: "FASTA Import",
        description: "Process multiple sequences at once from bioinformatics pipelines.",
        image: "/features/codonOptimization_converted.avif"
    },
    {
        name: "Optimization Report",
        description: "Generate lab-ready optimization reports for clients or internal stakeholders.",
        image: "/features/reportOptimization.avif",
        isNew: true,
        date: "Jan 2026"
    }
];

export const metadata = {
    title: "Biotech | Use Cases | Al-Awal Biotech",
    description: "Explore how biotech companies leverage Al-Awal Biotech for cutting-edge genetic engineering and protein expression optimization.",
};

export default function BiotechPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Spacer for navbar */}
                <div style={{ height: 'calc(80px + 4vh)' }} aria-hidden="true" />

                <UseCaseHeader
                    title="Biotech"
                    description="Scientists in biotech startups, synthetic biology companies, CROs, and protein production enterprises."
                />

                <UseCaseScenarios scenarios={biotechScenarios} />

                <UseCaseToolsList tools={biotechTools} />

                <CTASection />
                <PreFooter />
            </main>
            <Footer />
        </>
    );
}
