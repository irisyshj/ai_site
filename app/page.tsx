import { HeroSection } from '@/components/sections/HeroSection';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { FeaturedResources } from '@/components/sections/FeaturedResources';
import { CTASection } from '@/components/sections/CTASection';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <Separator />
      <AboutPreview />
      <Separator />
      <FeaturedResources />
      <Separator />
      <CTASection />
    </main>
  );
}
