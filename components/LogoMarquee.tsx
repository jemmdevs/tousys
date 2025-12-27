"use client";

import styles from "./LogoMarquee.module.css";

// Items del marquee - fácil de cambiar a logos después
const marqueeItems = ["Aisaac", "Al-Awal"];

export default function LogoMarquee() {
    // Duplicamos los items múltiples veces para crear el efecto infinito
    const repeatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

    return (
        <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
                {repeatedItems.map((item, index) => (
                    <span key={index} className={styles.marqueeItem}>
                        {item}
                    </span>
                ))}
            </div>
            <div className={styles.marqueeTrack} aria-hidden="true">
                {repeatedItems.map((item, index) => (
                    <span key={`dup-${index}`} className={styles.marqueeItem}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
