'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CTASection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // TODO: Implement actual newsletter subscription
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail('');
  };

  if (isSubmitted) {
    return (
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl rounded-lg border bg-card p-8 text-center shadow-sm sm:p-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              You&apos;re on the list!
            </h2>
            <p className="mt-4 text-muted-foreground">
              Check your inbox to confirm your subscription.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl rounded-lg border bg-card p-8 text-center shadow-sm sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Stay Ahead of the AI Curve
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get weekly insights, tips, and curated resources delivered to your
            inbox. Join our community of forward-thinking professionals.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
              disabled={isLoading}
            />
            <Button type="submit" size="lg" className="sm:w-auto" disabled={isLoading}>
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-sm text-muted-foreground">
              Prefer instant messaging? Connect with us on WeChat
            </p>
            <Button variant="outline" className="mt-3" size="sm">
              Connect on WeChat
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
