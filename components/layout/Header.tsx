'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Container } from './Container';
import { siteConfig } from '@/data/site';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Resources', href: '/resources' },
  { name: 'AI Coach', href: '/ai-coach' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key to close mobile menu
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [mobileMenuOpen]);

  // Trap focus in mobile menu when open
  const menuRef = React.useRef<HTMLDivElement>(null);
  const firstFocusableRef = React.useRef<HTMLElement | null>(null);
  const lastFocusableRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (mobileMenuOpen && menuRef.current) {
      // Get all focusable elements
      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        firstFocusableRef.current = focusableElements[0];
        lastFocusableRef.current = focusableElements[
          focusableElements.length - 1
        ];

        // Focus first element
        firstFocusableRef.current?.focus();
      }

      // Handle tab key for focus trap
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          // Shift + Tab
          if (
            document.activeElement === firstFocusableRef.current &&
            lastFocusableRef.current
          ) {
            e.preventDefault();
            lastFocusableRef.current.focus();
          }
        } else {
          // Tab
          if (
            document.activeElement === lastFocusableRef.current &&
            firstFocusableRef.current
          ) {
            e.preventDefault();
            firstFocusableRef.current.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    }
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <nav className="flex items-center justify-between py-4" aria-label="Global">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label={`${siteConfig.name} - Home`}
          >
            <span className="text-xl font-bold text-foreground">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className={cn(
            'md:hidden',
            mobileMenuOpen ? 'block' : 'hidden'
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
        >
          <div className="space-y-1 pb-4 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </header>
  );
}
