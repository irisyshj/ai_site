import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Resource } from '@/types/resource';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'article':
        return '📄';
      case 'video':
        return '🎥';
      case 'pdf':
        return '📕';
      case 'podcast':
        return '🎧';
      case 'tool':
        return '🛠️';
      default:
        return '📄';
    }
  };

  const getDifficultyColor = (difficulty?: Resource['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'default';
      case 'intermediate':
        return 'secondary';
      case 'advanced':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <span className="text-2xl" role="img" aria-label={resource.type}>
            {getTypeIcon(resource.type)}
          </span>
          {resource.external && (
            <Badge variant="outline" className="text-xs">External</Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2 mt-2">{resource.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {resource.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {resource.difficulty && (
            <Badge variant={getDifficultyColor(resource.difficulty)} className="text-xs">
              {resource.difficulty}
            </Badge>
          )}
          {resource.readingTime && (
            <span className="text-xs text-muted-foreground">
              {resource.readingTime} min read
            </span>
          )}
        </div>
        {resource.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {resource.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="link" className="px-0" asChild>
          <Link
            href={resource.url}
            target={resource.external ? '_blank' : undefined}
            rel={resource.external ? 'noopener noreferrer' : undefined}
          >
            {resource.external ? 'View Resource' : 'Read More'} &rarr;
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
