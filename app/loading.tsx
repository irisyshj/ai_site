/**
 * Global Loading State
 *
 * Provides a skeleton loader for page transitions.
 * This file is automatically used by Next.js during route transitions.
 */

import { cn } from '@/lib/utils';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Skeleton */}
            <div className="h-6 w-32 animate-pulse rounded bg-muted" />
            {/* Navigation Skeleton */}
            <div className="hidden items-center gap-6 md:flex">
              <div className="h-5 w-16 animate-pulse rounded bg-muted" />
              <div className="h-5 w-20 animate-pulse rounded bg-muted" />
              <div className="h-5 w-16 animate-pulse rounded bg-muted" />
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
            </div>
            {/* Mobile menu button */}
            <div className="h-8 w-8 animate-pulse rounded-md bg-muted md:hidden" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section Skeleton */}
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="mb-6 h-12 w-full animate-pulse rounded bg-muted sm:h-16 md:h-20" />
            <div className="mb-8 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-40 animate-pulse rounded-lg bg-muted" />
              <div className="h-12 w-40 animate-pulse rounded-lg border border-border bg-muted" />
            </div>
          </div>

          {/* Content Sections Skeleton */}
          <div className="mt-16 space-y-8">
            {/* Section Title */}
            <div className="h-8 w-48 animate-pulse rounded bg-muted" />

            {/* Cards Grid Skeleton */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
                >
                  <div className="h-40 w-full animate-pulse rounded bg-muted" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-6 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                  </div>
                  <div className="mt-auto h-10 w-24 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="w-full border-t border-border/40 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="h-6 w-32 animate-pulse rounded bg-muted" />
            <div className="flex gap-6">
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex gap-4">
              <div className="h-5 w-5 animate-pulse rounded bg-muted" />
              <div className="h-5 w-5 animate-pulse rounded bg-muted" />
              <div className="h-5 w-5 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Skeleton Card Component
 * Can be reused in other loading states
 */
export function SkeletonCard({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-lg border border-border bg-card p-6',
        className
      )}
    >
      {/* Image placeholder */}
      <div className="aspect-video w-full animate-pulse rounded bg-muted" />

      {/* Badge placeholder */}
      <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />

      {/* Title placeholder */}
      <div className="h-6 w-full animate-pulse rounded bg-muted" />
      <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />

      {/* Description placeholder */}
      <div className="space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </div>

      {/* Button placeholder */}
      <div className="mt-4 h-10 w-24 animate-pulse rounded-md bg-muted" />
    </div>
  );
}

/**
 * Minimal Loading Spinner
 */
export function LoadingSpinner({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-primary border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

/**
 * Page Transition Overlay
 * Use this for smooth page transitions
 */
export function PageTransition({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
