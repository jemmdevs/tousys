"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";
import styles from "./ScrollyTellingSection.module.css";

// Datos de ejemplo para las features
const features = [
    {
        id: 1,
        title: "An AI IDE Core",
        description: "Google Antigravity's Editor view offers tab autocompletion, natural language code commands, and a configurable, and context-aware configurable agent.",
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
    activeFeature,
    blockRef
}: {
    feature: typeof features[0];
    index: number;
    activeFeature: number;
    blockRef?: (el: HTMLDivElement | null) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    // Estados de visibilidad
    const isActive = index === activeFeature;
    const isExiting = index < activeFeature; // El texto anterior está saliendo
    const isNextUp = index === activeFeature + 1; // El siguiente texto que va a aparecer
    const isUpcoming = index > activeFeature + 1; // Los textos más adelante

    // Calcular opacidad del título
    const getTitleOpacity = () => {
        if (isActive) return 1;
        if (isExiting) return 0.2;
        if (isNextUp) return 0.9; // Preview del siguiente - más visible
        return 0.15; // Los demás upcoming
    };

    return (
        <motion.div
            ref={(el) => {
                (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
                blockRef?.(el);
            }}
            className={styles.featureBlock}
        >
            {/* Título - transición suave estilo Apple */}
            <motion.h3
                className={styles.featureTitle}
                animate={{
                    opacity: getTitleOpacity(),
                    color: isActive ? "#121317" : "#d1d5db",
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1], // Apple ease curve
                }}
            >
                {feature.title}
            </motion.h3>

            {/* Cuerpo - solo visible cuando está activo */}
            <motion.p
                className={styles.featureDescription}
                animate={{
                    opacity: isActive ? 1 : 0,
                    color: isActive ? "#45474d" : "#e5e7eb",
                }}
                transition={{
                    duration: isActive ? 0.6 : 0.15,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
            >
                {feature.description}
            </motion.p>
        </motion.div>
    );
}

export default function ScrollyTellingSection() {
    const [activeFeature, setActiveFeature] = useState(0);
    const [isSectionActive, setIsSectionActive] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
    const snapRef = useRef<Snap | null>(null);
    const lastActiveRef = useRef(0);

    const lenis = useLenis();

    // Detectar qué feature está en el centro basándose en la posición de scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!isSectionActive) return;

            const viewportCenter = window.innerHeight * 0.45; // Un poco por encima del centro

            for (let i = blockRefs.current.length - 1; i >= 0; i--) {
                const block = blockRefs.current[i];
                if (!block) continue;

                const rect = block.getBoundingClientRect();
                // El bloque está activo si su parte superior está por encima del centro del viewport
                if (rect.top < viewportCenter) {
                    if (i !== activeFeature) {
                        setActiveFeature(i);
                    }
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isSectionActive, activeFeature]);

    // Configurar Lenis Snap
    useEffect(() => {
        if (!lenis || blockRefs.current.length === 0) return;

        // Snap suave estilo Apple
        const snap = new Snap(lenis, {
            type: 'proximity',
            debounce: 250, // Más tiempo para sentirse natural
            distanceThreshold: '8%', // Solo cuando está muy cerca
            duration: 1.0, // Animación más larga y fluida
            easing: (t) => {
                // Ease curve estilo Apple (ease-out-quint suave)
                return 1 - Math.pow(1 - t, 5);
            },
        });

        // Añadir cada bloque como punto de snap
        blockRefs.current.forEach((block) => {
            if (block) {
                snap.addElement(block, {
                    align: ['start'],
                });
            }
        });

        snap.stop();
        snapRef.current = snap;

        return () => {
            snap.stop();
        };
    }, [lenis]);

    // Activar snap cuando cambia el feature activo
    useEffect(() => {
        if (!snapRef.current || !isSectionActive) return;

        // Solo activar snap cuando avanzamos hacia adelante
        if (activeFeature > lastActiveRef.current) {
            snapRef.current.start();

            // Desactivar después de completar la animación
            setTimeout(() => {
                snapRef.current?.stop();
            }, 1200); // Más tiempo para la animación suave
        }

        lastActiveRef.current = activeFeature;
    }, [activeFeature, isSectionActive]);

    // Detectar cuándo la sección está "sticky"
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const isActive = rect.top <= 0 && rect.bottom > window.innerHeight * 0.5;
                setIsSectionActive(isActive);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                {/* Columna Izquierda - Textos */}
                <div className={styles.textColumn}>
                    {/* Espaciador inicial */}
                    <div className={styles.startSpacer} />

                    {features.map((feature, index) => (
                        <FeatureBlock
                            key={feature.id}
                            feature={feature}
                            index={index}
                            activeFeature={activeFeature}
                            blockRef={(el) => {
                                blockRefs.current[index] = el;
                            }}
                        />
                    ))}

                    {/* Botón Explore Product */}
                    <a href="#" className={styles.exploreButton}>
                        Explore Product
                    </a>

                    {/* Espaciador final para que el último texto pueda scrollearse hasta los 15vh */}
                    <div className={styles.endSpacer} />
                </div>

                {/* Columna Derecha - Visual sticky (NO TOCAR) */}
                <div className={styles.visualColumn}>
                    <div className={styles.stickyWrapper}>
                        <div className={styles.visualCard}>
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
