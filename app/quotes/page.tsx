import { getAllQuotes } from "@/lib/quotes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QuotesPage() {
  const quotes = getAllQuotes();

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          href="/learnings"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Learnings
        </Link>

        <h1 className="text-3xl font-bold mb-8">All Quotes</h1>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          These are some of the best quotes I&apos;ve collected over time, and I strongly believe in and resonate with them. Most were written by others, while some are my own—either inspired by others or based on my own thoughts.
        </p>

        <div className="space-y-6">
          {quotes.map((quote) => (
            <div key={quote.id} className="group relative block">
              <span className="text-foreground leading-relaxed inline-block">
                {quote.text}
                <div className="absolute top-0 left-full ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs text-muted-foreground bg-background border border-border rounded px-2 py-1 shadow-sm whitespace-nowrap">
                  — {quote.author}
                </div>
              </span>
            </div>
          ))}
        </div>

        {/* Back to top */}
        <div className="text-center mt-12">
          <Link
            href="/learnings"
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            ← Back to Learnings
          </Link>
        </div>
      </div>
    </div>
  );
}
