import styles from "./UseCaseHeader.module.css";

interface UseCaseHeaderProps {
    title: string;
    description: string;
}

export default function UseCaseHeader({ title, description }: UseCaseHeaderProps) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
            </div>
        </section>
    );
}
