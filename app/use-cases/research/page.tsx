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

// Research scenarios - typical use cases
const researchScenarios = [
    { quote: "I'm cloning this gene to express it in E. coli and publish the crystal structure" },
    { quote: "I want to understand why this mutation affects the expression of my protein of interest" },
    { quote: "I need to prepare a figure for my paper showing ribosomal pause sites" },
    { quote: "I'm teaching molecular biology and want to show my students how codon optimization works" },
];

// Research tools data
const researchTools = [
    {
        name: "Codon Optimizer",
        description: "Prepare genes for cloning into expression vectors before producing proteins for structural or functional studies.",
        image: "/features/codonOptimization_converted.avif"
    },
    {
        name: "Kinetic Profile (Vector T)",
        description: "Visualize and understand ribosomal kinetics for translation studies, identify problematic regions for publications.",
        image: "/features/kineticChart_converted.avif"
    },
    {
        name: "Single Codon Editor",
        description: "Manually experiment with different codons to understand their impact, useful for teaching and publications.",
        image: "/features/inCanvasTools_converted.avif"
    },
    {
        name: "Mutation Comparator",
        description: "Compare wild-type vs mutant to analyze functional impact of SNPs or point mutations in research.",
        image: "/features/mutationComparator_converted.avif"
    },
    {
        name: "AI Peak Analysis",
        description: "Get quick insights on bottlenecks to include in paper discussions and research conclusions.",
        image: "/features/aiPeakAnalysis_converted.avif"
    },
    {
        name: "3D Structure Viewer",
        description: "Correlate protein structure with ribosomal pause zones, useful for co-translational folding studies.",
        image: "/features/3dStructure_converted.avif"
    },
    {
        name: "DAIS Score",
        description: "Objective metric to compare different constructs in experiments and validate optimization results.",
        image: "/features/daisAnalysis_converted.avif"
    },
    {
        name: "Multi-Organism",
        description: "Comparative studies between E. coli, yeast, and human expression systems.",
        image: "/features/fullApp2_converted.avif"
    },
    {
        name: "Visual Canvas",
        description: "Create visual figures for publications, presentations, and thesis documentation.",
        image: "/features/inCanvasTools_converted.avif"
    },
    {
        name: "Notes System",
        description: "Document observations and reasoning during analysis for your digital lab notebook.",
        image: "/features/darkMode_converted.avif"
    }
];

export const metadata = {
    title: "Research | Use Cases | Al-Awal Biotech",
    description: "Discover how Al-Awal Biotech empowers research institutions with advanced codon optimization and molecular biology tools.",
};

export default function ResearchPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Spacer for navbar */}
                <div style={{ height: 'calc(80px + 4vh)' }} aria-hidden="true" />

                <UseCaseHeader
                    title="Research"
                    description="Researchers in universities, academic laboratories, graduate students, postdocs, and scientific investigators."
                />

                <UseCaseScenarios scenarios={researchScenarios} />

                <UseCaseToolsList tools={researchTools} />

                <CTASection />
                <PreFooter />
            </main>
            <Footer />
        </>
    );
}
