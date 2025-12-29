import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/blog-posts";
import styles from "./LatestPosts.module.css";

// Format date as "Dec 28, 2025"
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export default function LatestPosts() {
    const allPosts = getAllBlogPosts();
    const latestPosts = allPosts.slice(0, 3); // Get only 3 latest posts

    if (latestPosts.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h2 className={styles.title}>LATEST POSTS</h2>
                    <Link href="/blog" className={styles.viewAll}>
                        View all posts
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </Link>
                </header>

                <div className={styles.grid}>
                    {latestPosts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className={styles.card}
                        >
                            <article>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                                        className={styles.image}
                                        loading="lazy"
                                    />
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.meta}>
                                        {post.category && (
                                            <span className={styles.category}>{post.category}</span>
                                        )}
                                        <time className={styles.date}>{formatDate(post.date)}</time>
                                    </div>
                                    <h3 className={styles.postTitle}>{post.title}</h3>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
