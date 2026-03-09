import { QuotePanel } from '@/components/quote-panel';
import { ApproachSection } from '@/components/sections/approach-section';
import { ClientStoriesSection } from '@/components/sections/client-stories-section';
import { FloatingNav } from '@/components/sections/floating-nav';
import { HeroSection } from '@/components/sections/hero-section';
import { ProjectList } from '@/components/sections/project-list';
import { ServicesGrid } from '@/components/sections/services-grid';
import { SiteFooter } from '@/components/sections/site-footer';
import { VisionCtaSection } from '@/components/sections/vision-cta-section';

export default function HomePage() {
  return (
    <main id="main-content" className="bg-(--bg-base) text-(--text-deep)">
      <HeroSection />
      <ApproachSection />
      <ServicesGrid />
      <ProjectList />
      <ClientStoriesSection />
      <VisionCtaSection />
      <SiteFooter />
      <FloatingNav />
      <QuotePanel />
    </main>
  );
}
