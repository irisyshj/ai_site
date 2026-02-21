'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { resources } from '@/data/resources';
import { ResourceFilter } from '@/components/resources/ResourceFilter';
import { ResourceGrid } from '@/components/resources/ResourceGrid';

function ResourcesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeParam = searchParams.get('type') as 'all' | 'article' | 'video' | 'pdf' | 'podcast' | 'tool' | null;
  const queryParam = searchParams.get('q') || '';
  const tagParam = searchParams.get('tag') || undefined;

  const [activeType, setActiveType] = useState<'all' | 'article' | 'video' | 'pdf' | 'podcast' | 'tool'>(
    typeParam || 'all'
  );
  const [searchQuery, setSearchQuery] = useState(queryParam);

  // Update state when URL params change
  useEffect(() => {
    if (typeParam) setActiveType(typeParam);
    if (queryParam !== null) setSearchQuery(queryParam);
  }, [typeParam, queryParam]);

  const handleTypeChange = (newType: 'all' | 'article' | 'video' | 'pdf' | 'podcast' | 'tool') => {
    setActiveType(newType);
    const params = new URLSearchParams(searchParams.toString());
    if (newType === 'all') {
      params.delete('type');
    } else {
      params.set('type', newType);
    }
    const queryString = params.toString();
    router.push(`/resources${queryString ? '?' + queryString : ''}`, { scroll: false });
  };

  const handleSearchChange = (newQuery: string) => {
    setSearchQuery(newQuery);
    const params = new URLSearchParams(searchParams.toString());
    if (newQuery) {
      params.set('q', newQuery);
    } else {
      params.delete('q');
    }
    const queryString = params.toString();
    router.push(`/resources${queryString ? '?' + queryString : ''}`, { scroll: false });
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Resources Hub
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover curated articles, videos, PDFs, podcasts, and tools to help you learn
            and grow. Filter by type or search for specific topics.
          </p>
        </div>

        {/* Filter Section */}
        <section className="mb-10" aria-label="Resource filters">
          <ResourceFilter
            activeType={activeType}
            searchQuery={searchQuery}
            onTypeChange={handleTypeChange}
            onSearchChange={handleSearchChange}
          />
        </section>

        {/* Resources Grid */}
        <section>
          <ResourceGrid
            resources={resources}
            filterType={activeType}
            searchQuery={searchQuery}
            filterTag={tagParam}
          />
        </section>

        {/* RSS Feed Link */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <a
            href="/rss"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Subscribe to RSS feed"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
            </svg>
            Subscribe to RSS Feed
          </a>
        </div>
      </div>
    </main>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Resources Hub
            </h1>
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        </div>
      </main>
    }>
      <ResourcesContent />
    </Suspense>
  );
}
