"use client";

import styles from "./RealTimeOptimizationVisual.module.css";

interface RealTimeOptimizationVisualProps {
    isHovered?: boolean;
}

export default function RealTimeOptimizationVisual({ isHovered = false }: RealTimeOptimizationVisualProps) {
    return (
        <div className={`${styles.container} ${isHovered ? styles.hovered : ""}`}>
            <div className={styles.radarContainer}>
                {/* Círculos concéntricos pulsantes */}
                <div className={`${styles.ring} ${styles.ring1}`} />
                <div className={`${styles.ring} ${styles.ring2}`} />
                <div className={`${styles.ring} ${styles.ring3}`} />
                <div className={`${styles.ring} ${styles.ring4}`} />

                {/* Punto central */}
                <div className={styles.centerDot} />

                {/* Línea de escaneo (solo visible en hover) */}
                <div className={styles.scanLine} />
            </div>
        </div>
    );
}
