"use client";

import { useState } from "react";
import { getAllQuotes } from "@/lib/quotes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QuotesPage() {
  const quotes = getAllQuotes();
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; author: string }>({
    visible: false,
    x: 0,
    y: 0,
    author: ''
  });

  const handleMouseEnter = (e: React.MouseEvent, author: string) => {
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      author
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltip.visible) {
      setTooltip(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY
      }));
    }
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

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
            <div 
              key={quote.id} 
              className="block cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(e, quote.author)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <p className="text-foreground leading-relaxed">
                {quote.text}
              </p>
            </div>
          ))}
        </div>

        {/* Floating tooltip */}
        {tooltip.visible && (
          <div 
            className="fixed z-50 px-3 py-2 text-sm text-foreground bg-popover border border-border rounded-md shadow-lg pointer-events-none transition-opacity duration-200"
            style={{
              left: tooltip.x + 10,
              top: tooltip.y - 40,
            }}
          >
            — {tooltip.author}
          </div>
        )}

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
