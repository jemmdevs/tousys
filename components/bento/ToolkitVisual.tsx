"use client";

import styles from "./ToolkitVisual.module.css";

interface ToolkitVisualProps {
    isHovered?: boolean;
}

type ParticleColor = "green" | "gray" | "darkGray";

// 22 partículas - 3 colores: verde, gris, gris oscuro
const particles: Array<{
    x: number;
    y: number;
    size: number;
    color: ParticleColor;
    hasLine?: boolean;
    lineTarget?: { x: number; y: number };
}> = [
        // Con línea conectora al cubo (verdes) - MÁS ALEJADAS
        { x: 2, y: 42, size: 1.2, color: "green", hasLine: true, lineTarget: { x: 18, y: 35 } },
        { x: 98, y: 22, size: 1.0, color: "green", hasLine: true, lineTarget: { x: 82, y: 30 } },
        { x: 78, y: 96, size: 1.1, color: "green", hasLine: true, lineTarget: { x: 65, y: 78 } },

        // Partículas verdes adicionales
        { x: 50, y: 40, size: 0.8, color: "green" },
        { x: 92, y: 8, size: 0.9, color: "green" },

        // NUEVAS - Arriba y a la izquierda del cubo (separadas)
        { x: 8, y: 12, size: 1.0, color: "darkGray" },
        { x: 5, y: 28, size: 0.8, color: "gray" },
        { x: 12, y: 5, size: 0.7, color: "green" },

        // Zona superior - ENCIMA DEL CUBO (más arriba)
        { x: 38, y: 3, size: 1.4, color: "green" },       // verde, izquierda del centro
        { x: 55, y: 6, size: 1.2, color: "gray" },        // gris clara, centro
        { x: 70, y: 4, size: 1.5, color: "green" },       // verde, derecha del centro
        { x: 88, y: 5, size: 0.7, color: "darkGray" },

        // Zona derecha
        { x: 98, y: 20, size: 0.8, color: "gray" },
        { x: 96, y: 50, size: 0.9, color: "darkGray" },
        { x: 94, y: 70, size: 0.6, color: "gray" },

        // Zona izquierda
        { x: 3, y: 65, size: 0.7, color: "darkGray" },
        { x: 6, y: 80, size: 0.6, color: "gray" },

        // Partículas internas (dentro del cubo)
        { x: 42, y: 55, size: 0.6, color: "darkGray" },
        { x: 58, y: 50, size: 0.7, color: "gray" },

        // Zona inferior (pocas)
        { x: 30, y: 88, size: 0.7, color: "darkGray" },
        { x: 85, y: 92, size: 0.6, color: "gray" },
    ];

const colorClassMap: Record<ParticleColor, string> = {
    green: styles.particleGreen,
    gray: styles.particleGray,
    darkGray: styles.particleDarkGray,
};

export default function ToolkitVisual({ isHovered = false }: ToolkitVisualProps) {
    return (
        <div className={`${styles.container} ${isHovered ? styles.hovered : ""}`}>
            <svg
                viewBox="0 0 100 100"
                className={styles.cubeContainer}
                aria-hidden="true"
            >
                {/* Líneas conectoras discretas */}
                {particles.filter(p => p.hasLine).map((particle, index) => (
                    <line
                        key={`line-${index}`}
                        x1={particle.x}
                        y1={particle.y}
                        x2={particle.lineTarget!.x}
                        y2={particle.lineTarget!.y}
                        className={styles.connectorLine}
                    />
                ))}

                {/* Cubo isométrico - ENORME */}
                <g className={styles.cube}>
                    {/* Cara superior */}
                    <path
                        d="M50 8 L82 26 L50 44 L18 26 Z"
                        className={styles.cubeFace}
                    />
                    {/* Cara izquierda */}
                    <path
                        d="M18 26 L50 44 L50 82 L18 64 Z"
                        className={styles.cubeFace}
                    />
                    {/* Cara derecha */}
                    <path
                        d="M82 26 L50 44 L50 82 L82 64 Z"
                        className={styles.cubeFace}
                    />

                    {/* Bordes del cubo - LÍNEAS CONTINUAS */}
                    <line x1="50" y1="8" x2="82" y2="26" className={styles.cubeEdge} />
                    <line x1="50" y1="8" x2="18" y2="26" className={styles.cubeEdge} />
                    <line x1="82" y1="26" x2="50" y2="44" className={styles.cubeEdge} />
                    <line x1="18" y1="26" x2="50" y2="44" className={styles.cubeEdge} />
                    <line x1="50" y1="44" x2="50" y2="82" className={styles.cubeEdge} />
                    <line x1="18" y1="26" x2="18" y2="64" className={styles.cubeEdge} />
                    <line x1="82" y1="26" x2="82" y2="64" className={styles.cubeEdge} />
                    <line x1="18" y1="64" x2="50" y2="82" className={styles.cubeEdge} />
                    <line x1="82" y1="64" x2="50" y2="82" className={styles.cubeEdge} />
                </g>

                {/* Líneas de proyección - llegan al borde de la tarjeta */}
                <line x1="50" y1="44" x2="-25" y2="90" className={styles.projectionLine} />
                <line x1="50" y1="44" x2="125" y2="90" className={styles.projectionLine} />

                {/* 22 Partículas - 3 colores */}
                {particles.map((particle, index) => (
                    <circle
                        key={index}
                        cx={particle.x}
                        cy={particle.y}
                        r={particle.size}
                        className={colorClassMap[particle.color]}
                    />
                ))}
            </svg>
        </div>
    );
}
