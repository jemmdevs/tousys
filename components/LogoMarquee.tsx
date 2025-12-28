"use client";

import Image from "next/image";
import styles from "./LogoMarquee.module.css";

// Logos del marquee
const marqueeLogos = [
    { src: "/logoalawal.png", alt: "Al-Awal", className: styles.logoAlawal },
    { src: "/logoaisac.png", alt: "Aisaac", className: styles.logoAisaac },
];

export default function LogoMarquee() {
    // Duplicamos los items múltiples veces para crear el efecto infinito
    const repeatedLogos = [...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos];

    return (
        <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
                {repeatedLogos.map((logo, index) => (
                    <div key={index} className={styles.marqueeItem}>
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={200}
                            height={90}
                            className={`${styles.logoImage} ${logo.className}`}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.marqueeTrack} aria-hidden="true">
                {repeatedLogos.map((logo, index) => (
                    <div key={`dup-${index}`} className={styles.marqueeItem}>
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={200}
                            height={90}
                            className={`${styles.logoImage} ${logo.className}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
