import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Image from "next/image";
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

// Format date as "Dec 17, 2025"
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Simple markdown to HTML converter (lightweight, no dependencies)
function parseMarkdown(markdown: string): string {
    // Normalize line endings (Windows \r\n to \n)
    const normalized = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // Split into paragraphs by double newlines
    const blocks = normalized.split(/\n\n+/);

    const processedBlocks = blocks.map(block => {
        let html = block.trim();

        // Skip empty blocks
        if (!html) return '';

        // Headers
        if (html.match(/^### /)) {
            html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
        } else if (html.match(/^## /)) {
            html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
        } else if (html.match(/^# /)) {
            html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>');
        } else if (html.match(/^> /)) {
            // Blockquotes
            html = html.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>');
        } else if (html.match(/^- /m)) {
            // Unordered lists
            const items = html.split('\n').map(line =>
                line.replace(/^- (.*)$/, '<li>$1</li>')
            ).join('');
            html = `<ul>${items}</ul>`;
        } else if (html.match(/^\d+\. /m)) {
            // Ordered lists
            const items = html.split('\n').map(line =>
                line.replace(/^\d+\. (.*)$/, '<li>$1</li>')
            ).join('');
            html = `<ol>${items}</ol>`;
        } else {
            // Regular paragraph
            html = `<p>${html}</p>`;
        }

        // Apply bold and italic to all blocks
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        return html;
    });

    return processedBlocks.filter(b => b).join('\n');
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const contentHtml = parseMarkdown(post.content.trim());
    const heroImage = post.detailImage || post.image;

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <article className={styles.article}>
                    {/* Header - Centered */}
                    <header className={styles.header}>
                        <div className={styles.meta}>
                            <span className={styles.category}>
                                {post.category || 'All'}
                            </span>
                            <time className={styles.date}>
                                {formatDate(post.date)}
                            </time>
                        </div>
                        <h1 className={styles.title}>{post.title}</h1>
                        <p className={styles.author}>The Al-Awal Team</p>
                    </header>

                    {/* Hero Image - Optional */}
                    {heroImage && (
                        <div className={styles.heroImageWrapper}>
                            <Image
                                src={heroImage}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 900px"
                                className={styles.heroImage}
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
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
