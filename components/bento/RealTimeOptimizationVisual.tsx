"use client";

import { memo } from "react";
import styles from "./RealTimeOptimizationVisual.module.css";

interface RealTimeOptimizationVisualProps {
    isHovered?: boolean;
}

// Elementos elegantes para el marquee - representan optimización en tiempo real
const row0Items = ["TACG", "97.2%", "Compiled", "GCAT", "Active", "99.1%"];
const row1Items = ["ATGC", "99.8%", "Optimized", "GCTA", "100%", "Validated"];
const row2Items = ["Enhanced", "TGCA", "99.9%", "Processed", "CGAT", "Active"];
const row3Items = ["AGCT", "98.7%", "Synced", "TACG", "Ready", "99.5%"];

function RealTimeOptimizationVisual({ isHovered = false }: RealTimeOptimizationVisualProps) {
    return (
        <div className={`${styles.container} ${isHovered ? styles.hovered : ""}`}>
            {/* Línea 0 - derecha a izquierda */}
            <div className={`${styles.marqueeRow} ${styles.row0}`}>
                <div className={styles.marqueeContent}>
                    {row0Items.map((item, i) => (
                        <span key={i} className={styles.chip}>{item}</span>
                    ))}
                </div>
                <div className={styles.marqueeContent} aria-hidden="true">
                    {row0Items.map((item, i) => (
                        <span key={`dup-${i}`} className={styles.chip}>{item}</span>
                    ))}
                </div>
            </div>

            {/* Línea 1 - izquierda a derecha */}
            <div className={`${styles.marqueeRow} ${styles.row1}`}>
                <div className={styles.marqueeContent}>
                    {row1Items.map((item, i) => (
                        <span key={i} className={styles.chip}>{item}</span>
                    ))}
                </div>
                <div className={styles.marqueeContent} aria-hidden="true">
                    {row1Items.map((item, i) => (
                        <span key={`dup-${i}`} className={styles.chip}>{item}</span>
                    ))}
                </div>
            </div>

            {/* Línea 2 - derecha a izquierda */}
            <div className={`${styles.marqueeRow} ${styles.row2}`}>
                <div className={styles.marqueeContent}>
                    {row2Items.map((item, i) => (
                        <span key={i} className={styles.chip}>{item}</span>
                    ))}
                </div>
                <div className={styles.marqueeContent} aria-hidden="true">
                    {row2Items.map((item, i) => (
                        <span key={`dup-${i}`} className={styles.chip}>{item}</span>
                    ))}
                </div>
            </div>

            {/* Línea 3 - izquierda a derecha */}
            <div className={`${styles.marqueeRow} ${styles.row3}`}>
                <div className={styles.marqueeContent}>
                    {row3Items.map((item, i) => (
                        <span key={i} className={styles.chip}>{item}</span>
                    ))}
                </div>
                <div className={styles.marqueeContent} aria-hidden="true">
                    {row3Items.map((item, i) => (
                        <span key={`dup-${i}`} className={styles.chip}>{item}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(RealTimeOptimizationVisual);
