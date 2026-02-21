'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';

/**
 * Global Error Boundary
 * This catches all errors in the application
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <Container>
          <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-destructive">Error</h1>
              <p className="mt-4 text-xl text-muted-foreground">
                Something went wrong
              </p>
            </div>

            <div className="mx-auto max-w-md">
              <h2 className="mb-4 text-2xl font-semibold">
                We encountered an unexpected error
              </h2>
              <p className="text-muted-foreground">
                Don&apos;t worry, our team has been notified. Please try refreshing
                the page or go back to the home page.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Button size="lg" onClick={reset}>
                Try again
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </body>
    </html>
  );
}
