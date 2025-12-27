"use client";

import styles from "./DualCardsSection.module.css";
import CardNeuralNoise from "./CardNeuralNoise";

export default function DualCardsSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <CardNeuralNoise />
                    <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardBadge}>
                                <span className={styles.badgeDot}></span>
                                Available
                            </span>
                        </div>
                        <div className={styles.cardMain}>
                            <h3 className={styles.cardTitle}>
                                <span className={styles.titleHighlight}>Al-Awal</span>
                                <br />
                                <span className={styles.titleSubtle}>For geneticists</span>
                            </h3>
                            <p className={styles.cardTagline}>Master the code of life</p>
                        </div>
                        <div className={styles.cardFooter}>
                            <button className={styles.cardButton}>Explore</button>
                        </div>
                    </div>
                    <div className={styles.cardGlow}></div>
                </div>
                <div className={styles.card}>
                    <CardNeuralNoise color="red" />
                    <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardBadgeSimple}>
                                Coming soon
                            </span>
                        </div>
                        <div className={styles.cardMain}>
                            <h3 className={styles.cardTitle}>
                                <span className={styles.titleHighlight}>Aisaac</span>
                                <br />
                                <span className={styles.titleSubtle}>For developers</span>
                            </h3>
                            <p className={styles.cardTagline}>Intelligence at the speed of thought</p>
                        </div>
                        <div className={styles.cardFooter}>
                            <button className={styles.cardButton}>Notify me</button>
                        </div>
                    </div>
                    <div className={styles.cardGlow}></div>
                </div>
            </div>
        </section>
    );
}
