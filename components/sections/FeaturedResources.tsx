import { Container } from '@/components/layout/Container';
import { ResourceCard } from '@/components/sections/ResourceCard';
import { resources } from '@/data/resources';

const featuredResources = resources.filter((r) => r.featured);

export function FeaturedResources() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Featured Resources
            </h2>
            <p className="mt-4 text-muted-foreground">
              Handpicked resources to accelerate your AI literacy journey
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/resources"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all resources &rarr;
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
