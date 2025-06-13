# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS. The project uses the App Router and is configured for deployment on Vercel.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Typography**: Geist Sans and Geist Mono fonts
- **Animations**: Framer Motion for animations
- **Path Aliases**: `@/*` maps to root directory

## Key Configuration

- **shadcn/ui**: Configured with "new-york" style, using Lucide icons
- **Component Aliases**: 
  - `@/components` for components
  - `@/lib/utils` for utilities
  - `@/components/ui` for UI components
- **Styling**: Uses `cn()` utility function for conditional classes (clsx + tailwind-merge)

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `lib/` - Utility functions and shared logic
- `public/` - Static assets
- `components.json` - shadcn/ui configuration