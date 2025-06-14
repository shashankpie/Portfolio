import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostContent, getAllPosts } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx-components";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostContent(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Shashank's Portfolio`,
    description: post.description,
    keywords: post.tags.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.image
        ? [
            {
              url: post.image,
              alt: post.imageAlt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostContent(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          href="/learnings"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Learnings
        </Link>

        {/* Article header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">
            {post.description}
          </p>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt}>{publishedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </header>

        {/* Featured image */}
        {post.image && (
          <div className="mb-8 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className="w-full max-w-md h-auto rounded-lg"
            />
          </div>
        )}

        {/* Article content */}
        <div className="max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Article footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Last updated: {updatedDate || publishedDate}
            </div>
            <Link
              href="/learnings"
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              ← Back to all posts
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
