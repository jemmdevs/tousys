import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getAllBlogPosts } from "@/lib/blog-posts";
import styles from "./blog.module.css";

// Lazy load footer components
const PreFooter = dynamic(() => import("@/components/PreFooter"), {
    loading: () => <div style={{ minHeight: '50vh' }} />,
    ssr: true,
});

const Footer = dynamic(() => import("@/components/Footer"), {
    loading: () => <div style={{ minHeight: '60px' }} />,
    ssr: true,
});

export const metadata = {
    title: "Blog | Al-Awal Biotech",
    description: "Latest news, insights, and updates from the Al-Awal Biotech team.",
};

// Format date as "28 Dec 2025" (day before month)
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

export default function BlogPage() {
    const posts = getAllBlogPosts();
    const featuredPost = posts[0]; // Latest post

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className={styles.container}>
                    {/* Featured Post Section */}
                    {featuredPost && (
                        <Link
                            href={`/blog/${featuredPost.slug}`}
                            className={styles.featuredCard}
                        >
                            <article className={styles.featuredArticle}>
                                <div className={styles.featuredImageWrapper}>
                                    <Image
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 60vw"
                                        className={styles.featuredImage}
                                        priority
                                    />
                                </div>
                                <div className={styles.featuredContent}>
                                    <time className={styles.featuredDate}>
                                        {formatDate(featuredPost.date)}
                                    </time>
                                    <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                                    {featuredPost.excerpt && (
                                        <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                                    )}
                                </div>
                            </article>
                        </Link>
                    )}

                    {/* Posts Grid */}
                    <div className={styles.postsGrid}>
                        {posts.map((post, index) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className={styles.postCard}
                            >
                                <article>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className={styles.postImage}
                                            loading={index < 3 ? "eager" : "lazy"}
                                        />
                                    </div>
                                    <div className={styles.postContent}>
                                        <time className={styles.postDate}>
                                            {formatDate(post.date)}
                                        </time>
                                        <h2 className={styles.postTitle}>{post.title}</h2>
                                        {post.excerpt && (
                                            <p className={styles.postExcerpt}>{post.excerpt}</p>
                                        )}
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <PreFooter />
            <Footer />
        </>
    );
}
