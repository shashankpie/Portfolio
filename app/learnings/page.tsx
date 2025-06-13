import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function LearningsPage() {
  const posts = getAllPosts();

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Learnings</h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold mb-6">Blog Posts</h2>
            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="group p-6 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>
                          {post.featured && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md">
                              Featured
                            </span>
                          )}
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {post.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <time dateTime={post.publishedAt}>
                              {new Date(post.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </time>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readingTime}</span>
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowRight className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  No blog posts yet. Check back soon!
                </div>
                <p className="text-sm text-muted-foreground">
                  Posts will appear here once they&apos;re published.
                </p>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6">Quotes</h2>
            <div className="text-muted-foreground">Coming soon...</div>
          </section>
        </div>
      </div>
    </div>
  );
}
