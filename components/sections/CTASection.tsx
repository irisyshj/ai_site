import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl rounded-lg border bg-card p-8 text-center shadow-sm sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Stay Ahead of the AI Curve
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get weekly insights, tips, and curated resources delivered to your
            inbox. Join our community of forward-thinking professionals.
          </p>

          <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
            <Button type="submit" size="lg" className="sm:w-auto">
              Subscribe
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-sm text-muted-foreground">
              Prefer instant messaging? Connect with us on WeChat
            </p>
            <Button variant="outline" className="mt-3" size="sm">
              Connect on WeChat
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
