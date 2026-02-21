'use client';

import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface NewsletterSignupProps {
  variant?: 'inline' | 'card';
  className?: string;
}

export function NewsletterSignup({
  variant = 'inline',
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-2 text-center',
          variant === 'card' && 'rounded-lg border border-border bg-card p-6',
          className
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <p className="font-medium text-foreground">
          Thanks for subscribing!
        </p>
        <p className="text-sm text-muted-foreground">
          Check your inbox to confirm your subscription.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full',
        variant === 'card' && 'rounded-lg border border-border bg-card p-6',
        className
      )}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">
              Stay Updated
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Get the latest insights on AI and technology delivered to your inbox.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="shrink-0"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">◌</span>
                Subscribing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          No spam, unsubscribe anytime. Read our{' '}
          <a href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}
