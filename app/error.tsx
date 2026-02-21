'use client';

/**
 * Global Error Boundary
 * This catches all errors in the application and displays a user-friendly error page
 */

import { useEffect } from 'react';
import Link from 'next/link';
import { Home, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <Container>
          <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
            <div className="mb-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                <svg
                  className="h-10 w-10 text-destructive"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="mt-4 text-2xl font-bold text-foreground">
                Something went wrong
              </h1>
              <p className="mt-2 text-muted-foreground">
                We encountered an unexpected error
              </p>
            </div>

            <div className="mx-auto max-w-md">
              <p className="text-muted-foreground">
                Don&apos;t worry, our team has been notified. Please try refreshing
                the page or go back to the home page.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Button size="lg" onClick={reset}>
                <RefreshCcw className="mr-2 h-5 w-5" />
                Try again
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Error details for development */}
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 w-full max-w-md text-left">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
                  Error details (development only)
                </summary>
                <pre className="mt-2 overflow-auto rounded-md bg-muted p-4 text-xs">
                  {error.message}
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </Container>
      </body>
    </html>
  );
}
