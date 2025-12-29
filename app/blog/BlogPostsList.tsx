"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog-posts";
import styles from "./blog.module.css";

// Format date as "28 Dec 2025" (day before month)
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

// Search icon component
function SearchIcon() {
    return (
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

// List view icon (bullets + lines)
function ListIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
    );
}

// Grid view icon (2x2 squares)
function GridIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
        </svg>
    );
}

interface BlogPostsListProps {
    posts: BlogPost[];
}

export default function BlogPostsList({ posts }: BlogPostsListProps) {
    const [activeFilter, setActiveFilter] = useState<'All' | 'Product'>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Filter by category first, then by search query
    // Filter by category first, then by search query
    const filteredPosts = useMemo(() => {
        return posts
            .filter(post => activeFilter === 'All' || post.category === 'Product')
            .filter(post => {
                if (!searchQuery.trim()) return true;
                const query = searchQuery.toLowerCase();
                return (
                    post.title.toLowerCase().includes(query) ||
                    post.excerpt?.toLowerCase().includes(query) ||
                    post.content.toLowerCase().includes(query)
                );
            });
    }, [posts, activeFilter, searchQuery]);

    return (
        <>
            {/* Filter Buttons + Search */}
            <div className={styles.filterContainer}>
                <div className={styles.filterButtons}>
                    <button
                        className={`${styles.filterButton} ${activeFilter === 'All' ? styles.filterButtonActive : ''}`}
                        onClick={() => setActiveFilter('All')}
                    >
                        All
                    </button>
                    <button
                        className={`${styles.filterButton} ${activeFilter === 'Product' ? styles.filterButtonActive : ''}`}
                        onClick={() => setActiveFilter('Product')}
                    >
                        Product
                    </button>
                </div>

                <div className={styles.searchAndViewContainer}>
                    <div className={styles.searchContainer}>
                        <span className={styles.searchIcon}>
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            placeholder="Search blog"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <button
                        className={`${styles.viewToggleButton} ${viewMode === 'list' ? styles.viewToggleActive : ''}`}
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        aria-label={viewMode === 'grid' ? "Switch to list view" : "Switch to grid view"}
                    >
                        {viewMode === 'grid' ? <ListIcon /> : <GridIcon />}
                    </button>
                </div>
            </div>

            {/* Posts - Grid or List View */}
            {viewMode === 'grid' ? (
                <div className={styles.postsGrid}>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
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
                        ))
                    ) : (
                        <p className={styles.noResults}>No posts found matching your search.</p>
                    )}
                </div>
            ) : (
                <div className={styles.postsList}>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className={styles.listItem}
                            >
                                <span className={styles.listTitle}>{post.title}</span>
                                <span className={styles.listCategory}>
                                    {post.category || 'All'}
                                </span>
                                <time className={styles.listDate}>
                                    {formatDate(post.date)}
                                </time>
                            </Link>
                        ))
                    ) : (
                        <p className={styles.noResults}>No posts found matching your search.</p>
                    )}
                </div>
            )}
        </>
    );
}
