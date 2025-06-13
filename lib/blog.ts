import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  author: string;
  readingTime: string;
  featured: boolean;
  image?: string;
  imageAlt?: string;
  content: string;
}

export type BlogPostMetadata = Omit<BlogPost, 'content'>;

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts(): BlogPostMetadata[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      return getPostBySlug(slug);
    })
    .filter((post): post is BlogPostMetadata => post !== null)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return allPostsData;
}

export function getPostBySlug(slug: string): BlogPostMetadata | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      publishedAt: data.publishedAt || '',
      updatedAt: data.updatedAt,
      tags: data.tags || [],
      author: data.author || 'Shashank',
      readingTime: `${readingTime} min read`,
      featured: data.featured || false,
      image: data.image,
      imageAlt: data.imageAlt,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getPostContent(slug: string): Promise<BlogPost | null> {
  const post = getPostBySlug(slug);
  if (!post) return null;

  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content } = matter(fileContents);

    return {
      ...post,
      content,
    };
  } catch (error) {
    console.error(`Error reading post content ${slug}:`, error);
    return null;
  }
}

export function getFeaturedPosts(): BlogPostMetadata[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostsByTag(tag: string): BlogPostMetadata[] {
  return getAllPosts().filter((post) => 
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}