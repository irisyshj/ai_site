'use client';

/**
 * SkipLink Component
 *
 * Provides a "Skip to main content" link for keyboard navigation.
 * This link is hidden by default and becomes visible when focused.
 *
 * WCAG 2.1 Level A requirement: 2.4.1 Bypass Blocks
 */

import { cn } from '@/lib/utils';

export interface SkipLinkProps {
  /**
   * The ID of the element to skip to
   * @default 'main-content'
   */
  targetId?: string;

  /**
   * Text to display in the skip link
   * @default 'Skip to main content'
   */
  text?: string;

  /**
   * Additional className for styling
   */
  className?: string;
}

export function SkipLink({
  targetId = 'main-content',
  text = 'Skip to main content',
  className,
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        // Base styles - hidden by default, visible on focus
        'sr-only focus:not-sr-only',
        'absolute left-4 top-4 z-[100]',
        'rounded-md bg-primary px-4 py-2',
        'text-sm font-medium text-primary-foreground',
        'shadow-lg',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'transition-all duration-200',
        // High contrast for accessibility
        'focus-visible:outline-none',
        className
      )}
    >
      {text}
    </a>
  );
}

/**
 * Multiple skip links for different sections
 */
export interface SkipLinksProps {
  links: Array<{
    targetId: string;
    text: string;
  }>;
  className?: string;
}

export function SkipLinks({ links, className }: SkipLinksProps) {
  return (
    <div className={cn('fixed left-4 top-4 z-[100] flex flex-col gap-2', className)}>
      {links.map((link) => (
        <SkipLink key={link.targetId} targetId={link.targetId} text={link.text} />
      ))}
    </div>
  );
}

// Add the sr-only utility class to globals.css if not already present
// This is a common pattern that should be available
