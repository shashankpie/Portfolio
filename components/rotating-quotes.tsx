"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getAllQuotes } from "@/lib/quotes";

export function RotatingQuotes() {
  const quotes = getAllQuotes();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [quotes.length, isHovered]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const currentQuote = quotes[currentIndex];

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="min-h-[120px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-center max-w-2xl mx-auto px-8"
          >
            <blockquote className="text-lg md:text-xl font-medium text-foreground leading-relaxed mb-3">
              {currentQuote.text}
            </blockquote>
            <cite className="text-sm text-muted-foreground">
              — {currentQuote.author}
            </cite>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={goToPrevious}
          className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Previous quote"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={goToNext}
          className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Next quote"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>


      {/* View all quotes button */}
      <div className="text-center mt-6">
        <Link
          href="/quotes"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          View all quotes
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}