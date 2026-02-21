'use client';

import { useMemo } from 'react';
import { ResourceCard } from './ResourceCard';
import { Resource, ResourceType } from '@/types/resource';

interface ResourceGridProps {
  resources: Resource[];
  filterType: ResourceType | 'all';
  searchQuery: string;
  filterTag?: string;
}

export function ResourceGrid({
  resources,
  filterType,
  searchQuery,
  filterTag,
}: ResourceGridProps) {
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Filter by type
      if (filterType !== 'all' && resource.type !== filterType) {
        return false;
      }

      // Filter by tag
      if (filterTag && !resource.tags.includes(filterTag)) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = resource.title.toLowerCase().includes(query);
        const matchesDescription = resource.description.toLowerCase().includes(query);
        const matchesTags = resource.tags.some((tag) => tag.toLowerCase().includes(query));

        if (!matchesTitle && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [resources, filterType, searchQuery, filterTag]);

  if (filteredResources.length === 0) {
    return (
      <div
        className="text-center py-12"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg text-muted-foreground">
          No resources found matching your criteria.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div
      id="resources-grid"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="tabpanel"
      aria-label="Filtered resources"
    >
      {filteredResources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
