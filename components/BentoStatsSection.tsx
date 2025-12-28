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
        id: "codon-optimization",
        title: "Codon Optimization Engine",
        description: "Optimize DNA sequences using LGRK kinetic models and tRNA availability data",
        size: "large",
        checkpoints: [
            "Real-time kinetic scoring",
            "Multiple organism support",
            "Intelligent codon selection"
        ]
    },
    {
        id: "kinetic-profile",
        title: "Ribosomal Kinetic Profile",
        description: "Visualize translation bottlenecks with interactive Vector T analysis",
        size: "medium"
    },
    {
        id: "multi-organism",
        title: "Multi-Organism",
        description: "Switch between E. coli, Yeast, and Human codon tables instantly",
        size: "medium"
    },
    // Fila 2: Medium + Medium + Medium + Medium
    {
        id: "protein-structure",
        title: "3D Structure Prediction",
        description: "Fold proteins and visualize translation stress with ESMFold integration",
        size: "medium"
    },
    {
        id: "dais-score",
        title: "DAIS Score",
        description: "Instantly assess sequence quality with our proprietary Structural Assurance Index",
        size: "medium"
    },
    {
        id: "restriction-sites",
        title: "Restriction Sites",
        description: "Automatic detection and flagging of restriction enzyme cut sites",
        size: "medium"
    },
    {
        id: "ai-analysis",
        title: "Aisac AI Model",
        description: "Powered by our proprietary Aisac AI model to intelligently optimize sequences and predict translation efficiency",
        size: "medium"
    },
    // Fila 3: Large + Medium + Medium
    {
        id: "visual-canvas",
        title: "Visual Canvas Workflow",
        description: "Node-based editing with zoom, pan, and interactive codon manipulation",
        size: "large",
        checkpoints: [
            "Drag & drop nodes",
            "Add custom notes",
            "Undo/Redo history"
        ]
    },
    {
        id: "project-management",
        title: "Projects & Collaboration",
        description: "Save, load, and manage your optimization projects with cloud sync",
        size: "medium"
    },
    {
        id: "privacy-security",
        title: "Privacy & Security",
        description: "Enterprise-grade encryption and secure data handling to protect your research",
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
