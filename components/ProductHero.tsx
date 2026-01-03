import styles from "./ProductHero.module.css";

export default function ProductHero() {
    return (
        <section className={styles.section}>
            <span className={styles.badge}>Product Tools</span>
            <h1 className={styles.title}>Our Tooling Suite</h1>
            <p className={styles.description}>
                Explore our powerful tools designed to accelerate your biotech research workflow
            </p>
        </section>
    );
}
