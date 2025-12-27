"use client";

import styles from "./DeveloperSection.module.css";

export default function DeveloperSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.leftContent}>
                    <h2 className={styles.title}>
                        Built for developers
                        <br />
                        <span className={styles.titleSubtle}>for the agent-first era</span>
                    </h2>
                </div>
                <div className={styles.rightContent}>
                    <p className={styles.description}>
                        Google Antigravity is built for user trust, whether you're a professional developer working in a large enterprise codebase, a hobbyist vibe-coding in their spare time, or anyone in between.
                    </p>
                </div>
            </div>
        </section>
    );
}
