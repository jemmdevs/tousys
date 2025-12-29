import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-posts";
import styles from "./post.module.css";

// Lazy load footer components
const PreFooter = dynamic(() => import("@/components/PreFooter"), {
    loading: () => <div style={{ minHeight: '50vh' }} />,
    ssr: true,
});

const Footer = dynamic(() => import("@/components/Footer"), {
    loading: () => <div style={{ minHeight: '60px' }} />,
    ssr: true,
});

// Generate static params for all blog posts
export async function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        return {
            title: "Post Not Found | Al-Awal Biotech",
        };
    }

    return {
        title: `${post.title} | Al-Awal Biotech Blog`,
        description: post.excerpt,
    };
}

// Simple markdown to HTML converter (lightweight, no dependencies)
function parseMarkdown(markdown: string): string {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Unordered lists
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');

    // Ordered lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

    // Paragraphs
    html = html.replace(/\n\n/gim, '</p><p>');

    // Line breaks
    html = html.replace(/\n/gim, '<br>');

    // Wrap in paragraph if not starting with tag
    if (!html.startsWith('<')) {
        html = '<p>' + html + '</p>';
    }

    return html;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const contentHtml = parseMarkdown(post.content.trim());

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <article className={styles.article}>
                    <header className={styles.header}>
                        <Link href="/blog" className={styles.backLink}>
                            ← Back to Blog
                        </Link>
                        <time className={styles.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                        <h1 className={styles.title}>{post.title}</h1>
                        <p className={styles.author}>By {post.author}</p>
                    </header>

                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                </article>
            </main>
            <PreFooter />
            <Footer />
        </>
    );
}
