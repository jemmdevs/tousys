"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./LogoMarquee.module.css";

// Logos del marquee
const marqueeLogos = [
    { src: "/logoalawal.png", alt: "Al-Awal", className: styles.logoAlawal },
    { src: "/logoaisac.png", alt: "Aisaac", className: styles.logoAisaac },
];

export default function LogoMarquee() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // IntersectionObserver para pausar animación fuera de viewport
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                rootMargin: "50px", // Pre-activar 50px antes de ser visible
                threshold: 0
            }
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    // Duplicamos solo lo necesario para el efecto infinito (3 repeticiones)
    const repeatedLogos = [...marqueeLogos, ...marqueeLogos, ...marqueeLogos];

    return (
        <div className={styles.marqueeWrapper}>
            <p className={styles.marqueeLabel}>Part of the Tousys ecosystem</p>
            <div
                ref={containerRef}
                className={`${styles.marqueeContainer} ${isVisible ? styles.playing : styles.paused}`}
            >
                <div className={styles.marqueeTrack}>
                    {repeatedLogos.map((logo, index) => (
                        <div key={index} className={styles.marqueeItem}>
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={200}
                                height={90}
                                className={`${styles.logoImage} ${logo.className}`}
                                loading="lazy"
                                sizes="200px"
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
                                loading="lazy"
                                sizes="200px"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
