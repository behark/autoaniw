/**
 * Demo stories data for the StorytellingShowcase component
 * In a production environment, this would come from the API
 */

export const demoStories = [
  {
    id: "story-1",
    title: "Premium Luxury Without Compromise",
    subtitle: "Featured Collection",
    description: "Discover our handpicked selection of high-end vehicles that combine performance, luxury, and unmatched craftsmanship.",
    mediaUrl: "/images/showcase/luxury-car-showcase.jpg",
    mediaType: "image" as const,
    ctaLabel: "Explore Collection",
    ctaUrl: "/vehicles/luxury"
  },
  {
    id: "story-2",
    title: "The All-New 2025 Performance Series",
    subtitle: "Just Arrived",
    description: "Experience the thrill of driving with our latest performance vehicles, engineered to deliver exhilaration at every turn.",
    mediaUrl: "/images/showcase/performance-car.jpg",
    mediaType: "image" as const,
    ctaLabel: "View Details",
    ctaUrl: "/vehicles/performance"
  },
  {
    id: "story-3",
    title: "Crafted For Family Adventures",
    subtitle: "Family Collection",
    description: "Spacious, safe, and stylish vehicles designed with your family's comfort and needs in mind.",
    mediaUrl: "/images/showcase/family-suv.jpg",
    mediaType: "image" as const,
    ctaLabel: "Find Your Next SUV",
    ctaUrl: "/vehicles/family"
  },
  {
    id: "story-4",
    title: "AutoAni Certified Pre-Owned",
    subtitle: "Quality Assured",
    description: "Every certified pre-owned vehicle undergoes a rigorous 150-point inspection process, ensuring only the best make it to our showroom.",
    mediaUrl: "/images/showcase/certified-preowned.jpg", 
    mediaType: "image" as const,
    ctaLabel: "Browse Pre-Owned",
    ctaUrl: "/vehicles/pre-owned"
  }
];
