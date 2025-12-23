"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./Hero.module.css";

// Dynamic import para evitar SSR con Three.js
const Antigravity = dynamic(() => import("./Antigravity"), {
    ssr: false,
});

export default function Hero() {
    return (
        <section className={styles.hero}>
            {/* Antigravity Background */}
            <div className={styles.antigravityContainer}>
                <Antigravity
                    count={350}
                    color="#4A90E2"
                    particleSize={0.75}
                    magnetRadius={18}
                    ringRadius={12}
                    keepCentered={true}
                    lerpSpeed={0.1}
                    waveAmplitude={1.2}
                    waveSpeed={0.5}
                    particleVariance={1.5}
                    pulseSpeed={2}
                />
            </div>

            <div className={styles.content}>
                {/* Company Logo */}
                <div className={styles.companyLogo}>
                    <span className={styles.logoMain}>Tousys</span>
                    <span className={styles.logoSub}>Biotech</span>
                </div>

                {/* Main Headline */}
                <h1 className={styles.headline}>
                    <span className={styles.headlinePrimary}>We engineer progress</span>
                    <span className={styles.headlineSecondary}>with the next-generation platforms</span>
                </h1>

                {/* CTA Button */}
                <Link href="#" className={styles.ctaButton}>
                    Explore our products
                </Link>
            </div>
        </section>
    );
}
