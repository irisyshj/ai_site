'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Resource, ResourceType } from '@/types/resource';

interface ResourceCardProps {
  resource: Resource;
}

const typeBadgeStyles: Record<ResourceType, { variant: 'default' | 'secondary' | 'outline'; label: string }> = {
  article: { variant: 'default', label: 'Article' },
  video: { variant: 'secondary', label: 'Video' },
  pdf: { variant: 'outline', label: 'PDF' },
  podcast: { variant: 'secondary', label: 'Podcast' },
  tool: { variant: 'outline', label: 'Tool' },
};

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const { variant, label } = typeBadgeStyles[resource.type];

  const CardWrapper = resource.external ? 'a' : Link;
  const wrapperProps = resource.external
    ? { href: resource.url, target: '_blank', rel: 'noopener noreferrer' }
    : { href: resource.url };

  return (
    <CardWrapper
      {...wrapperProps}
      className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
    >
      <Card className="h-full transition-all duration-200 hover:shadow-md group-hover:border-primary/50 border-border/40">
        <CardHeader>
          <div className="flex items-center justify-between gap-2 mb-2">
            <Badge variant={variant} aria-label={`Resource type: ${label}`}>
              {label}
            </Badge>
            {resource.external && (
              <ExternalLink
                className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors"
                aria-label="External link"
              />
            )}
          </div>
          <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
            {resource.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {resource.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2" aria-label="Resource tags">
            {resource.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            {resource.readingTime && (
              <span aria-label={`Reading time: ${resource.readingTime} minutes`}>
                {resource.readingTime} min read
              </span>
            )}
            {resource.difficulty && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[resource.difficulty]}`}
                aria-label={`Difficulty level: ${resource.difficulty}`}
              >
                {resource.difficulty}
              </span>
            )}
          </div>
          {resource.featured && (
            <Badge variant="default" className="text-xs" aria-label="Featured resource">
              Featured
            </Badge>
          )}
        </CardFooter>
      </Card>
    </CardWrapper>
  );
}
