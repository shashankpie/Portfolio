"use client";

import Link from "next/link";
import { Moon } from "lucide-react";
import { useAvailabilityStatus } from "@/lib/use-availability-status";

export default function ContactPage() {
  const availabilityStatus = useAvailabilityStatus();

  const renderStatusIcon = () => {
    switch (availabilityStatus.icon) {
      case 'dot':
        return (
          <div 
            className={`w-3 h-3 rounded-full ${availabilityStatus.color} ${
              availabilityStatus.pulse ? 'animate-pulse' : ''
            }`}
          />
        );
      case 'away':
        return (
          <div 
            className={`w-3 h-3 rounded-full ${availabilityStatus.color}`}
          />
        );
      case 'sleep':
        return (
          <Moon 
            className={`w-3 h-3 ${availabilityStatus.color.replace('bg-', 'text-')}`}
          />
        );
      default:
        return (
          <div 
            className={`w-3 h-3 rounded-full ${availabilityStatus.color} ${
              availabilityStatus.pulse ? 'animate-pulse' : ''
            }`}
          />
        );
    }
  };
  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact</h1>
        
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            {renderStatusIcon()}
            <span className="text-sm text-muted-foreground">
              {availabilityStatus.text}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-3">Schedule a call</h2>
              <Link 
                href="https://cal.com/shashankpie" 
                target="_blank"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                cal.com/shashankpie
              </Link>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-3">Connect</h2>
              <div className="flex gap-4">
                <Link 
                  href="https://linkedin.com/in/shashankpie" 
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  LinkedIn
                </Link>
                <Link 
                  href="https://x.com/thevibepreneur" 
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  X
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}