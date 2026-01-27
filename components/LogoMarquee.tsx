"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./LogoMarquee.module.css";

// Logos del marquee
const marqueeLogos = [
    { src: "/WorldCourierPartner.png", alt: "World Courier", className: styles.logoWorldCourier },
    { src: "/scientistPartner.png", alt: "Scientist.com", className: styles.logoScientist },
    { src: "/genscriptPartner.png", alt: "GenScript", className: styles.logoGenScript },
];

export default function LogoMarquee() {
    const tracksRef = useRef<HTMLDivElement[]>([]);

    // Duplicamos para el efecto infinito (4 repeticiones para pantallas anchas)
    const repeatedLogos = [...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos];

    // Observer para pausar animación - manipulación directa del DOM
    useEffect(() => {
        const tracks = tracksRef.current.filter(Boolean);
        if (tracks.length === 0) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Cambiar animationPlayState directamente en el DOM (sin re-render)
                tracks.forEach(track => {
                    if (track) {
                        track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
                    }
                });
            },
            {
                rootMargin: "100px", // Pre-activa 100px antes
                threshold: 0
            }
        );

        // Observar el primer track
        if (tracks[0]) {
            observer.observe(tracks[0]);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className={styles.marqueeWrapper}>
            <p className={styles.marqueeLabel}>Part of the Tousys ecosystem</p>
            <div className={styles.marqueeContainer}>
                <div
                    className={styles.marqueeTrack}
                    ref={(el) => { if (el) tracksRef.current[0] = el; }}
                >
                    {repeatedLogos.map((logo, index) => (
                        <div key={index} className={styles.marqueeItem}>
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={200}
                                height={90}
                                className={`${styles.logoImage} ${logo.className}`}
                                priority
                                sizes="200px"
                            />
                        </div>
                    ))}
                </div>
                <div
                    className={styles.marqueeTrack}
                    aria-hidden="true"
                    ref={(el) => { if (el) tracksRef.current[1] = el; }}
                >
                    {repeatedLogos.map((logo, index) => (
                        <div key={`dup-${index}`} className={styles.marqueeItem}>
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={200}
                                height={90}
                                className={`${styles.logoImage} ${logo.className}`}
                                priority
                                sizes="200px"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
