"use client";

import { useState, lazy, Suspense } from "react";
import styles from "./BentoStatsSection.module.css";

// Lazy load visual components for performance
const SecurityVisual = lazy(() => import("./bento/SecurityVisual"));
const CloudStorageVisual = lazy(() => import("./bento/CloudStorageVisual"));
const ToolkitVisual = lazy(() => import("./bento/ToolkitVisual"));
const AnalyticsVisual = lazy(() => import("./bento/AnalyticsVisual"));
const MultiOrganismVisual = lazy(() => import("./bento/MultiOrganismVisual"));
const RealTimeOptimizationVisual = lazy(() => import("./bento/RealTimeOptimizationVisual"));
const AICodonVisual = lazy(() => import("./bento/AICodonVisual"));

interface FeatureCard {
    id: string;
    title: string;
    description: string;
    size: "large" | "medium";
    checkpoints?: string[];
    hasVisual?: boolean;
}

const features: FeatureCard[] = [
    // Fila 1: Large + Medium + Medium
    {
        id: "ai-codon-optimization",
        title: "AI-Powered Optimization",
        description: "Our proprietary AI engine analyzes and optimizes your DNA sequences using advanced kinetic models, maximizing protein expression rates.",
        size: "large",
        hasVisual: true,
        checkpoints: [
            "LGRK kinetic modeling",
            "tRNA availability scoring",
            "Intelligent bottleneck detection"
        ]
    },
    {
        id: "privacy-security",
        title: "Security",
        description: "Your sequences never leave your control. End-to-end encryption and secure authentication protect your intellectual property.",
        size: "medium",
        hasVisual: true
    },
    {
        id: "cloud-storage",
        title: "Cloud Storage",
        description: "Save and sync your projects securely. Access your work from anywhere, anytime.",
        size: "medium",
        hasVisual: true
    },
    // Fila 2: Medium + Medium + Medium
    {
        id: "complete-toolkit",
        title: "Complete Toolkit",
        description: "Everything you need in one place: 3D structure prediction, restriction site detection, kinetic profiling, mutation analysis, and more.",
        size: "medium",
        hasVisual: true
    },
    {
        id: "real-time-analytics",
        title: "Real-Time Analytics",
        description: "Instant feedback with DAIS scoring, GC content analysis, and interactive kinetic profiles. Understand your sequence at a glance.",
        size: "medium",
        hasVisual: true
    },
    {
        id: "multi-organism",
        title: "Multi-Organism Support",
        description: "Optimize for E. coli, Yeast, or Human expression systems with validated codon tables.",
        size: "medium",
        hasVisual: true
    },
    {
        id: "real-time-optimization",
        title: "Real-Time Optimization",
        description: "No queues, no waiting. Your sequences are optimized instantly as you work.",
        size: "medium",
        hasVisual: true
    }
];

// Individual card component
function BentoCard({ feature }: { feature: FeatureCard }) {
    const [isHovered, setIsHovered] = useState(false);

    const renderVisual = () => {
        if (!feature.hasVisual) return null;

        switch (feature.id) {
            case "ai-codon-optimization":
                return (
                    <Suspense fallback={<div className={styles.visualPlaceholder} />}>
                        <AICodonVisual isHovered={isHovered} />
                    </Suspense>
                );
            case "privacy-security":
                return (
                    <Suspense fallback={<div className={styles.visualPlaceholder} />}>
                        <SecurityVisual isHovered={isHovered} />
                    </Suspense>
                );
            case "cloud-storage":
                return (
                    <Suspense fallback={<div className={styles.visualPlaceholder} />}>
                        <CloudStorageVisual isHovered={isHovered} />
                    </Suspense>
                );
            case "complete-toolkit":
                return (
                    <Suspense fallback={<div className={styles.visualPlaceholder} />}>
                        <ToolkitVisual isHovered={isHovered} />
                    </Suspense>
                );
            case "real-time-analytics":
                return (
                    <Suspense fallback={<div className={styles.visualPlaceholder} />}>
                        <AnalyticsVisual isHovered={isHovered} />
                    </Suspense>
                );
            case "multi-organism":
                return (
                    <Suspense fallback={<div className={styles.visualPlaceholder} />}>
                        <MultiOrganismVisual isHovered={isHovered} />
                    </Suspense>
                );
            case "real-time-optimization":
                return (
                    <Suspense fallback={<div className={styles.visualPlaceholder} />}>
                        <RealTimeOptimizationVisual isHovered={isHovered} />
                    </Suspense>
                );
            default:
                return null;
        }
    };

    return (
        <div
            className={`${styles.card} ${styles[feature.size]}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Visual area */}
            {feature.hasVisual && (
                <div className={styles.cardVisual}>
                    {renderVisual()}
                </div>
            )}

            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                    {feature.id === "ai-codon-optimization" && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src="/iconaisac.svg"
                            alt=""
                            className={styles.titleIconLarge}
                            aria-hidden="true"
                        />
                    )}
                    {feature.id === "privacy-security" && (
                        <svg className={styles.titleIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4 5.5V11.5C4 16.45 7.4 21.05 12 22C16.6 21.05 20 16.45 20 11.5V5.5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    {feature.id === "cloud-storage" && (
                        <svg className={styles.titleIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 7C3 5.89543 3.89543 5 5 5H9.58579C9.851 5 10.1054 5.10536 10.2929 5.29289L12 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    {feature.id === "complete-toolkit" && (
                        <svg className={styles.titleIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    {feature.id === "real-time-analytics" && (
                        <svg className={styles.titleIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 16L11 11L15 14L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    {feature.id === "multi-organism" && (
                        <svg className={styles.titleIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 2C12 2 12 6 12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 15C12 18 12 22 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M2 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M15 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    )}
                    {feature.id === "real-time-optimization" && (
                        <svg className={styles.titleIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    {feature.title}
                </h3>
                <p className={styles.cardDescription}>{feature.description}</p>
            </div>

            {/* Checkpoints for large cards */}
            {feature.checkpoints && (
                <ul className={styles.checkpoints}>
                    {feature.checkpoints.map((checkpoint, idx) => (
                        <li key={idx} className={styles.checkpoint}>
                            <svg className={styles.checkIcon} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {checkpoint}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function BentoStatsSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {features.map((feature) => (
                        <BentoCard key={feature.id} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}
