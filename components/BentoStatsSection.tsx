"use client";

import styles from "./BentoStatsSection.module.css";

interface StatCard {
    id: string;
    value: string;
    label: string;
    // Puedes añadir aquí tu propio SVG o elemento de fondo
    background?: React.ReactNode;
}

const stats: StatCard[] = [
    {
        id: "sequences",
        value: "10M+",
        label: "Sequences Analyzed",
        background: null
    },
    {
        id: "accuracy",
        value: "99.9%",
        label: "Accuracy Rate",
        background: null
    },
    {
        id: "partners",
        value: "150+",
        label: "Research Partners",
        background: null
    },
    {
        id: "processing",
        value: "24/7",
        label: "AI Processing",
        background: null
    },
    {
        id: "speed",
        value: "50x",
        label: "Faster Results",
        background: null
    },
    {
        id: "network",
        value: "Global",
        label: "Research Network",
        background: null
    }
];

export default function BentoStatsSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className={`${styles.card} ${styles[stat.id]}`}
                        >
                            {/* Área para SVG/fondo personalizado */}
                            {stat.background && (
                                <div className={styles.cardBackground}>
                                    {stat.background}
                                </div>
                            )}

                            <div className={styles.cardContent}>
                                <span className={styles.value}>{stat.value}</span>
                                <span className={styles.label}>{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
