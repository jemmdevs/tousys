"use client";

import styles from "./BentoStatsSection.module.css";

interface FeatureCard {
    id: string;
    title: string;
    description: string;
    size: "large" | "medium";
    checkpoints?: string[];
    // Área para SVG/fondo personalizado - trabajar después
    visual?: React.ReactNode;
}

const features: FeatureCard[] = [
    // Fila 1: Large + Medium + Medium
    {
        id: "ai-codon-optimization",
        title: "AI-Powered Codon Optimization",
        description: "Our proprietary AI engine analyzes and optimizes your DNA sequences using advanced kinetic models, maximizing protein expression rates.",
        size: "large",
        checkpoints: [
            "LGRK kinetic modeling",
            "tRNA availability scoring",
            "Intelligent bottleneck detection"
        ]
    },
    {
        id: "privacy-security",
        title: "Enterprise-Grade Security",
        description: "Your sequences never leave your control. End-to-end encryption and secure authentication protect your intellectual property.",
        size: "medium"
    },
    {
        id: "cloud-storage",
        title: "Cloud Storage",
        description: "Save and sync your projects securely. Access your work from anywhere, anytime.",
        size: "medium"
    },
    // Fila 2: Medium + Medium + Medium
    {
        id: "complete-toolkit",
        title: "Complete Toolkit",
        description: "Everything you need in one place: 3D structure prediction, restriction site detection, kinetic profiling, mutation analysis, and more.",
        size: "medium"
    },
    {
        id: "real-time-analytics",
        title: "Real-Time Analytics",
        description: "Instant feedback with DAIS scoring, GC content analysis, and interactive kinetic profiles. Understand your sequence at a glance.",
        size: "medium"
    },
    {
        id: "multi-organism",
        title: "Multi-Organism Support",
        description: "Optimize for E. coli, Yeast, or Human expression systems with validated codon tables.",
        size: "medium"
    },
    {
        id: "real-time-optimization",
        title: "Real-Time Optimization",
        description: "No queues, no waiting. Your sequences are optimized instantly as you work. Changes reflect immediately across your entire workflow.",
        size: "medium"
    }
];

export default function BentoStatsSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className={`${styles.card} ${styles[feature.size]}`}
                        >
                            {/* Área para visual/SVG personalizado */}
                            {feature.visual && (
                                <div className={styles.cardVisual}>
                                    {feature.visual}
                                </div>
                            )}

                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{feature.title}</h3>
                                <p className={styles.cardDescription}>{feature.description}</p>
                            </div>

                            {/* Checkpoints en la parte inferior para tarjetas grandes */}
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
                    ))}
                </div>
            </div>
        </section>
    );
}
