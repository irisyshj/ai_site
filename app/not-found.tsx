'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        {/* 404 Heading */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <p className="mt-4 text-xl text-muted-foreground">Page not found</p>
        </div>

        {/* Error Message */}
        <div className="mx-auto max-w-md">
          <h2 className="mb-4 text-2xl font-semibold">
            We couldn&apos;t find what you&apos;re looking for
          </h2>
          <p className="text-muted-foreground">
            The page you requested doesn&apos;t exist or has been moved. Let&apos;s get you
            back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/resources">
              <Search className="mr-2 h-5 w-5" />
              Browse Resources
            </Link>
          </Button>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            Looking for something specific?
          </p>
          <nav
            className="flex flex-wrap justify-center gap-4"
            aria-label="Helpful links"
          >
            <Link
              href="/resources"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Resources
            </Link>
            <Link
              href="/ai-coach"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              AI Coach
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              About
            </Link>
            <Link
              href="/rss"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              RSS Feed
            </Link>
          </nav>
        </div>
      </div>
    </Container>
  );
}
