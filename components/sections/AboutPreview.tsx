import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

export function AboutPreview() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
            {/* Photo placeholder */}
            <div className="flex-shrink-0">
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-4xl font-bold text-primary">
                AL
              </div>
            </div>

            {/* Bio content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold sm:text-3xl">
                About AI Literacy Coach
              </h2>
              <p className="mt-4 text-muted-foreground">
                I help professionals and organizations understand and leverage AI
                tools effectively. With years of experience in technology education
                and a passion for making complex concepts accessible, I bridge the
                gap between AI capabilities and practical workplace applications.
              </p>
              <p className="mt-2 text-muted-foreground">
                My mission is to empower you with the knowledge and skills to thrive
                in an AI-augmented world.
              </p>
              <div className="mt-6">
                <Button variant="link" asChild className="px-0">
                  <Link href="/about">Read More &rarr;</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
