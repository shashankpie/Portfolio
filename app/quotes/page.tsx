"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllQuotes } from "@/lib/quotes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QuotesPage() {
  const quotes = getAllQuotes();
  const [hoveredQuote, setHoveredQuote] = useState<number | null>(null);

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
          These are some of the best quotes I&apos;ve collected over time, and I strongly believe in and resonate with them. Most were written by others, while some are my own.
        </p>

        <div className="space-y-6">
          {quotes.map((quote) => (
            <div key={quote.id} className="quote-item">
              <motion.p
                className="text-foreground leading-relaxed"
                onMouseEnter={() => setHoveredQuote(quote.id)}
                onMouseLeave={() => setHoveredQuote(null)}
              >
                {quote.text}
                <AnimatePresence>
                  {hoveredQuote === quote.id && (
                    <motion.span
                      initial={{ opacity: 0, x: -10, scale: 0.9 }}
                      animate={{ 
                        opacity: [0, 0.3, 0.7, 1],
                        x: 0, 
                        scale: 1 
                      }}
                      exit={{ 
                        opacity: [1, 0.6, 0.2, 0],
                        x: -5, 
                        scale: 0.95 
                      }}
                      transition={{ 
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                        opacity: { duration: 0.4, ease: "easeInOut" }
                      }}
                      className="text-sm text-muted-foreground"
                    >
                      {" — " + quote.author}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.p>
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
