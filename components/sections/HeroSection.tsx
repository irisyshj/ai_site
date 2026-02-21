import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section
      className="py-20 sm:py-24 md:py-32"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            AI Literacy for the Modern Professional
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Navigate the AI revolution with confidence. Access curated resources,
            practical guides, and personalized coaching to transform how you work
            with artificial intelligence.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/resources">Explore Resources</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/ai-coach">Talk to AI Coach</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
