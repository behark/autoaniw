import HeroSection from '@/components/home/HeroSection';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import BrandHighlights from '@/components/home/BrandHighlights';
import ServicesFeatures from '@/components/home/ServicesFeatures';
import AwardsSection from '@/components/home/AwardsSection';
import StorytellingShowcase from '@/components/home/StorytellingShowcase';
import { demoStories } from '@/data/demoStories';
import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <StorytellingShowcase stories={demoStories} className="my-8" />
      <FeaturedVehicles />
      <BrandHighlights />
      <ServicesFeatures />
      <AwardsSection />
    </MainLayout>
  );
}
