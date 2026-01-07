"use client";

import Link from "next/link";
import styles from "./Hero.module.css";
import NeuralNoiseBackground from "./NeuralNoiseBackground";

export default function Hero() {
    return (
        <section className={styles.hero}>
            {/* Neural Noise Animation Background */}
            <NeuralNoiseBackground />

            <div className={styles.content}>
                {/* Company Logo */}
                <div className={styles.companyLogo}>
                    <span className={styles.logoMain}>Al-Awal</span>
                    <span className={styles.logoSub}>Biotech</span>
                </div>

                {/* Main Headline */}
                <h1 className={styles.headline}>
                    <span className={styles.headlinePrimary}>We engineer progress</span>
                    <span className={styles.headlineSecondary}>with the next-generation platforms</span>
                </h1>

                {/* CTA Buttons */}
                <div className={styles.ctaButtons}>
                    <Link href="/contact?tab=getaccess" className={styles.ctaButton}>
                        Get access
                    </Link>
                    <Link href="/product" className={styles.ctaButtonSecondary}>
                        Explore our product
                    </Link>
                </div>
            </div>
        </section>
    );
}
