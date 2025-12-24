"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
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
