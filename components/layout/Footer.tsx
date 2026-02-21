'use client';

import React from 'react';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  MessageCircle,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Container } from './Container';
import { socialLinks } from '@/data/socials';
import { siteConfig } from '@/data/site';

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  wechat: MessageCircle,
  twitter: X,
  x: X,
};

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Resources', href: '/resources' },
  { name: 'AI Coach', href: '/ai-coach' },
  { name: 'About', href: '/about' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          {/* Copyright */}
          <div className="flex flex-col items-center gap-1 md:items-start">
            <Link
              href="/"
              className="text-lg font-semibold text-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-1"
              aria-label={`${siteConfig.name} - Home`}
            >
              {siteConfig.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {siteConfig.author}. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <nav
            className="flex gap-6"
            aria-label="Footer navigation"
          >
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-1 py-0.5"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="sr-only">Follow us on social media</span>
            {socialLinks
              .filter((link) => link.visible)
              .map((social) => {
                const Icon = iconMap[social.platform.toLowerCase()];
                if (!Icon) return null;

                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md p-1"
                    aria-label={`Follow us on ${social.platform} (opens in new tab)`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
