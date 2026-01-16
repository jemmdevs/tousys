"use client";

import styles from "./DeveloperSection.module.css";

export default function DeveloperSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.leftContent}>
                    <h2 className={styles.title}>
                        Built for Researchers
                        <br />
                        <span className={styles.titleSubtle}>for the next generation of biological design</span>
                    </h2>
                </div>
                <div className={styles.rightContent}>
                    <p className={styles.description}>
                        Tousys Biotech is built for scientific rigor, whether you're optimizing a single construct or engineering large-scale sequence libraries for translational research.
                    </p>
                </div>
            </div>
        </section>
    );
}
