import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Blog posts data - read from markdown files
export interface BlogPost {
    slug: string;
    title: string;
    excerpt?: string;
    date: string;
    author: string;
    image: string;
    category?: string;
    content: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllBlogPosts(): BlogPost[] {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || 'Untitled',
                excerpt: data.excerpt,
                date: data.date || new Date().toISOString().split('T')[0],
                author: data.author || 'Unknown',
                image: data.image || '',
                category: data.category,
                content: content.trim(),
            } as BlogPost;
        });

    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
    const posts = getAllBlogPosts();
    return posts.find(post => post.slug === slug);
}
