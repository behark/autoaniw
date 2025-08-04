import React from 'react';
import MainLayout from '../src/components/layout/MainLayout';
import HeroSection from '../src/components/homepage/HeroSection';
import FeaturedVehicles from '../src/components/homepage/FeaturedVehicles';
import BrandHighlights from '../src/components/homepage/BrandHighlights';
import ServicesFeatures from '../src/components/homepage/ServicesFeatures';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedVehicles />
      <BrandHighlights />
      <ServicesFeatures />
    </MainLayout>
  );
}
