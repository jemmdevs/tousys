"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./ScrollyTellingSection.module.css";

// Datos de ejemplo para las features
const features = [
    {
        id: 1,
        title: "An AI IDE Core",
        description: "Google Antigravity's Editor view offers tab autocompletion, natural language code commands, and a configurable, and context-aware configurable agent.",
        // Placeholder images - se pueden reemplazar con imágenes reales
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    },
    {
        id: 2,
        title: "Higher-level Abstractions",
        description: "Build complex applications with intuitive, high-level APIs that handle the underlying complexity for you.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    },
    {
        id: 3,
        title: "Real-time Collaboration",
        description: "Work together with your team in real-time. Share findings, annotate results, and accelerate your research pipeline.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    },
    {
        id: 4,
        title: "Enterprise Security",
        description: "Enterprise-grade security with HIPAA and GDPR compliance. Your research data is protected with end-to-end encryption.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    },
];

// Componente para cada bloque de texto
function FeatureBlock({
    feature,
    index,
    setActiveFeature
}: {
    feature: typeof features[0];
    index: number;
    setActiveFeature: (index: number) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        setActiveFeature(index);
                    }
                });
            },
            {
                threshold: [0.3, 0.5, 0.7],
                rootMargin: "-30% 0px -30% 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [index, setActiveFeature]);

    return (
        <motion.div
            ref={ref}
            className={styles.featureBlock}
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
        >
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
        </motion.div>
    );
}

export default function ScrollyTellingSection() {
    const [activeFeature, setActiveFeature] = useState(0);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Columna Izquierda - Textos que hacen scroll */}
                <div className={styles.textColumn}>
                    {features.map((feature, index) => (
                        <FeatureBlock
                            key={feature.id}
                            feature={feature}
                            index={index}
                            setActiveFeature={setActiveFeature}
                        />
                    ))}
                </div>

                {/* Columna Derecha - Visual sticky */}
                <div className={styles.visualColumn}>
                    <div className={styles.stickyWrapper}>
                        <div className={styles.visualCard}>
                            {/* Todas las imágenes apiladas - solo la activa visible */}
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.id}
                                    className={styles.visualCardInner}
                                    initial={false}
                                    animate={{
                                        opacity: index === activeFeature ? 1 : 0
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                >
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className={styles.featureImage}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
