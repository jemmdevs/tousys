"use client";

import { memo } from "react";
import styles from "./AnalyticsVisual.module.css";

interface AnalyticsVisualProps {
    isHovered?: boolean;
}

// Puntos del gráfico (x, y donde y menor = más alto)
const dataPoints = [
    { x: 10, y: 35 },
    { x: 25, y: 15 },
    { x: 40, y: 25 },
    { x: 55, y: 0 },
    { x: 70, y: 18 },
    { x: 85, y: 8 },
];

// Generar el path de la línea
const linePath = dataPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

// Generar el path del área (cierra el path hacia abajo)
const areaPath = `${linePath} L 85 50 L 10 50 Z`;

function AnalyticsVisual({ isHovered = false }: AnalyticsVisualProps) {
    return (
        <div className={`${styles.container} ${isHovered ? styles.hovered : ""}`}>
            <svg
                viewBox="0 0 100 60"
                className={styles.chartContainer}
                aria-hidden="true"
            >
                {/* Definición del degradado */}
                <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#64D8A3" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#64D8A3" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Líneas de grid horizontales - van de borde a borde */}
                <line x1="-30" y1="5" x2="130" y2="5" className={styles.gridLine} />
                <line x1="-30" y1="25" x2="130" y2="25" className={styles.gridLine} />
                <line x1="-30" y1="45" x2="130" y2="45" className={styles.gridLine} />

                {/* Área degradada debajo de la curva */}
                <path d={areaPath} className={styles.areaFill} />

                {/* Línea del gráfico */}
                <path d={linePath} className={styles.chartLine} />

                {/* Anillos pulsantes (solo visibles en hover) */}
                {dataPoints.map((point, index) => (
                    <circle
                        key={`ring-${index}`}
                        cx={point.x}
                        cy={point.y}
                        r={2}
                        className={styles.pulseRing}
                        style={{ "--delay": `${index * 0.15}s` } as React.CSSProperties}
                    />
                ))}

                {/* Puntos de datos */}
                {dataPoints.map((point, index) => (
                    <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r={2}
                        className={styles.dataPoint}
                    />
                ))}

                {/* Punto destacado (el más alto) */}
                <circle
                    cx={55}
                    cy={0}
                    r={2.8}
                    className={styles.highlightPoint}
                />
            </svg>
        </div>
    );
}

export default memo(AnalyticsVisual);
