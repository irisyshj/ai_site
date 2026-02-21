'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ResourceType } from '@/types/resource';

interface ResourceFilterProps {
  activeType: ResourceType | 'all';
  onTypeChange: (type: ResourceType | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const filterTypes: Array<{ value: ResourceType | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'article', label: 'Articles' },
  { value: 'video', label: 'Videos' },
  { value: 'pdf', label: 'PDFs' },
  { value: 'podcast', label: 'Podcasts' },
  { value: 'tool', label: 'Tools' },
];

export function ResourceFilter({
  activeType,
  onTypeChange,
  searchQuery,
  onSearchChange,
}: ResourceFilterProps) {
  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          aria-label="Search resources"
        />
      </div>

      {/* Filter Tabs */}
      <nav
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter resources by type"
      >
        {filterTypes.map((filter) => (
          <Button
            key={filter.value}
            variant={activeType === filter.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onTypeChange(filter.value)}
            role="tab"
            aria-selected={activeType === filter.value}
            aria-controls="resources-grid"
          >
            {filter.label}
          </Button>
        ))}
      </nav>
    </div>
  );
}
