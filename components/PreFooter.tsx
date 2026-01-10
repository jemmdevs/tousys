"use client";

import styles from "./PreFooter.module.css";
import Link from "next/link";
import CardNeuralNoise from "./CardNeuralNoise";

const productLinks = [
    { label: "Get Access", href: "/contact?tab=getaccess" },
    { label: "Product", href: "/product" },
    { label: "Docs", href: "#" },
];

const resourceLinks = [
    { label: "Blog", href: "/blog" },
    { label: "Terms", href: "#" },
    { label: "Services", href: "#" },
];

export default function PreFooter() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Top row with tagline and nav columns */}
                <div className={styles.topRow}>
                    {/* Tagline */}
                    <div className={styles.tagline}>
                        <h2 className={styles.taglineText}>Experience liftoff</h2>
                    </div>

                    {/* Navigation columns */}
                    <div className={styles.navColumns}>
                        {/* Product column */}
                        <div className={styles.navColumn}>
                            <h3 className={styles.navTitle}>Product</h3>
                            <ul className={styles.navList}>
                                {productLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className={styles.navLink}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources column */}
                        <div className={styles.navColumn}>
                            <h3 className={styles.navTitle}>Resources</h3>
                            <ul className={styles.navList}>
                                {resourceLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className={styles.navLink}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Giant brand text with neural noise mask */}
                <div className={styles.brandRow}>
                    {/* Neural noise layer */}
                    <div className={styles.noiseLayer}>
                        <CardNeuralNoise color="cyan" />
                    </div>
                    {/* Text mask layer */}
                    <div className={styles.textMask}>
                        <span className={styles.brandText}>Tousys</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
