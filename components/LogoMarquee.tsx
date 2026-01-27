"use client";

import Image from "next/image";
import styles from "./LogoMarquee.module.css";

// Logos del marquee
const marqueeLogos = [
    { src: "/WorldCourierPartner.png", alt: "World Courier", className: styles.logoWorldCourier },
    { src: "/scientistPartner.png", alt: "Scientist.com", className: styles.logoScientist },
    { src: "/genscriptPartner.png", alt: "GenScript", className: styles.logoGenScript },
];

export default function LogoMarquee() {
    // Duplicamos para el efecto infinito (4 repeticiones para pantallas anchas)
    const repeatedLogos = [...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos];

    return (
        <div className={styles.marqueeWrapper}>
            <p className={styles.marqueeLabel}>Part of the Tousys ecosystem</p>
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
