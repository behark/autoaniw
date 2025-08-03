'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import MediaStoryHero, { StoryMedia } from '@/components/public/storytelling/MediaStoryHero';
import VehicleSpecifications from '@/components/vehicles/VehicleSpecifications';
import VehicleActions from '@/components/vehicles/VehicleActions';
import VehicleFeatures from '@/components/vehicles/VehicleFeatures';
import SimilarVehicles from '@/components/vehicles/SimilarVehicles';
import FinancingOptions from '@/components/vehicles/FinancingOptions';
import { useApi } from '@/hooks/useApi';
import { formatLocalizedCurrency } from '@/i18n/config';

// Sample vehicle data to simulate API response
const mockVehicleData = {
  id: 'ferrari-f8-tributo',
  name: 'Ferrari F8 Tributo',
  year: 2023,
  price: 329000,
  brand: 'Ferrari',
  model: 'F8 Tributo',
  color: 'Rosso Corsa',
  bodyType: 'Coupe',
  engineType: 'V8 Twin-Turbo',
  horsepower: 710,
  torque: 568,
  transmission: '7-speed dual-clutch',
  drivetrain: 'RWD',
  acceleration: 2.9,
  topSpeed: 211,
  mileage: 1250,
  fuelType: 'Gasoline',
  exteriorColor: 'Rosso Corsa',
  interiorColor: 'Nero',
  vin: 'ZFFRA21B000239876',
  stockNumber: 'FC2023112',
  description: 'The Ferrari F8 Tributo is the new mid-rear-engined sports car that represents the highest expression of the Prancing Horse\'s classic two-seater berlinetta. It is homage to the most powerful V8 in Ferrari history.',
  features: [
    'Full-LED headlights',
    'New S-Duct front design',
    'Carbon fiber dashboard inserts',
    'Racing steering wheel with LED shift lights',
    'Daytona racing seats',
    'Ferrari telemetry system',
    'Adaptive front lighting system',
    'Premium JBL sound system',
    'Satellite navigation system',
    'Front and rear parking sensors',
    'Surround view camera system',
    'Carbon ceramic brakes'
  ],
  specifications: {
    'Engine': 'V8 Twin-Turbo',
    'Displacement': '3.9L',
    'Power': '710 hp',
    'Torque': '568 lb-ft',
    'Transmission': '7-speed dual-clutch',
    'Drive': 'Rear-wheel drive',
    'Acceleration': '0-60 mph in 2.9s',
    'Top Speed': '211 mph',
    'Weight': '3,164 lbs',
    'Length': '181.5 in',
    'Width': '77.9 in',
    'Height': '47.5 in',
    'Wheelbase': '104.3 in'
  },
  media: [
    {
      id: 'media-1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1080',
      alt: 'Front view of a red Ferrari F8 Tributo',
      title: 'The Pinnacle of Ferrari Design',
      description: 'Experience the aerodynamic excellence of the F8 Tributo, a masterclass in performance engineering.'
    },
    {
      id: 'media-2',
      type: 'video',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1080',
      alt: 'Ferrari F8 Tributo racing on a track',
      title: 'Unleash 710 Horsepower',
      description: 'Feel the raw power of the twin-turbocharged V8 engine pushing this masterpiece to incredible speeds.',
      videoOptions: {
        autoplay: true,
        loop: true,
        muted: true
      },
      cta: {
        text: 'Schedule Test Drive',
        url: '/contact',
        variant: 'primary'
      }
    },
    {
      id: 'media-3',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1610036615665-ec9252872f0c?q=80&w=1080',
      alt: 'Rear view of Ferrari F8 Tributo showing the iconic design',
      title: 'Iconic Ferrari Heritage',
      description: 'The F8 Tributo pays homage to Ferrari\'s legacy while pushing the boundaries of what\'s possible.',
      cta: {
        text: 'View Specifications',
        url: '#specifications',
        variant: 'secondary'
      }
    }
  ],
  localizedContent: {
    'en': {
      name: 'Ferrari F8 Tributo',
      description: 'The Ferrari F8 Tributo is the new mid-rear-engined sports car that represents the highest expression of the Prancing Horse\'s classic two-seater berlinetta. It is homage to the most powerful V8 in Ferrari history.',
      mediaAlt: ['Front view of a red Ferrari F8 Tributo', 'Ferrari F8 Tributo racing on a track', 'Rear view of Ferrari F8 Tributo showing the iconic design'],
      mediaTitle: ['The Pinnacle of Ferrari Design', 'Unleash 710 Horsepower', 'Iconic Ferrari Heritage'],
      mediaDescription: [
        'Experience the aerodynamic excellence of the F8 Tributo, a masterclass in performance engineering.',
        'Feel the raw power of the twin-turbocharged V8 engine pushing this masterpiece to incredible speeds.',
        'The F8 Tributo pays homage to Ferrari\'s legacy while pushing the boundaries of what\'s possible.'
      ],
      ctaText: ['Learn More', 'Schedule Test Drive', 'View Specifications']
    },
    'es': {
      name: 'Ferrari F8 Tributo',
      description: 'El Ferrari F8 Tributo es el nuevo deportivo con motor central trasero que representa la máxima expresión del clásico berlinetta biplaza del Cavallino Rampante. Es un homenaje al V8 más potente en la historia de Ferrari.',
      mediaAlt: ['Vista frontal de un Ferrari F8 Tributo rojo', 'Ferrari F8 Tributo corriendo en una pista', 'Vista trasera del Ferrari F8 Tributo mostrando el diseño icónico'],
      mediaTitle: ['La Cumbre del Diseño Ferrari', 'Libera 710 Caballos de Potencia', 'Herencia Icónica de Ferrari'],
      mediaDescription: [
        'Experimenta la excelencia aerodinámica del F8 Tributo, una obra maestra de la ingeniería de rendimiento.',
        'Siente la potencia pura del motor V8 biturbo que impulsa esta obra maestra a velocidades increíbles.',
        'El F8 Tributo rinde homenaje al legado de Ferrari mientras empuja los límites de lo posible.'
      ],
      ctaText: ['Saber Más', 'Programar Prueba de Manejo', 'Ver Especificaciones']
    }
  }
};

export default function VehicleDetailPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation(['common', 'vehicles']);
  const [vehicle, setVehicle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const currentLocale = i18n.language || 'en';
  
  // In a real implementation, we would use our API hooks to fetch data
  // const { data: vehicle, isLoading, error } = useApi.vehicles.getVehicleBySlug(slug as string);
  
  // For demonstration, we'll use mock data
  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setVehicle(mockVehicleData);
      } catch (err) {
        setError('Failed to load vehicle data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [slug]);
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <div className="animate-pulse">
            <div className="h-80 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (error || !vehicle) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold text-error-600 mb-4">Error Loading Vehicle</h2>
          <p>{error || 'Vehicle not found'}</p>
        </div>
      </MainLayout>
    );
  }
  
  // Format media items for the hero component
  const storyMediaItems: StoryMedia[] = vehicle.media.map((media: any) => ({
    ...media,
    // Use the URL directly, assuming it's accessible
    url: media.url
  }));
  
  // Prepare localized content for media items
  const localizedContent = {};
  
  if (vehicle.localizedContent && vehicle.localizedContent[currentLocale]) {
    const locale = vehicle.localizedContent[currentLocale];
    
    vehicle.media.forEach((media: any, index: number) => {
      if (!localizedContent[currentLocale]) {
        localizedContent[currentLocale] = {};
      }
      
      // Set localized content for each media item
      if (locale.mediaTitle && locale.mediaTitle[index]) {
        localizedContent[currentLocale][`media-${index}-title`] = locale.mediaTitle[index];
      }
      
      if (locale.mediaDescription && locale.mediaDescription[index]) {
        localizedContent[currentLocale][`media-${index}-description`] = locale.mediaDescription[index];
      }
      
      if (locale.mediaAlt && locale.mediaAlt[index]) {
        localizedContent[currentLocale][`media-${index}-alt`] = locale.mediaAlt[index];
      }
      
      if (locale.ctaText && locale.ctaText[index]) {
        localizedContent[currentLocale][`media-${index}-ctaText`] = locale.ctaText[index];
      }
    });
  }
  
  // Format price based on locale
  const formattedPrice = formatLocalizedCurrency(vehicle.price, currentLocale, 'USD');
  
  return (
    <MainLayout>
      {/* Hero Media Section */}
      <MediaStoryHero
        mediaItems={storyMediaItems}
        height="70vh"
        overlayStyle="gradient"
        textPosition="left"
        localizedContent={localizedContent}
        className="mb-8"
      />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-grow">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">
                {vehicle.localizedContent?.[currentLocale]?.name || vehicle.name}
              </h1>
              <p className="text-xl text-text-secondary mb-4">
                {vehicle.year} • {vehicle.mileage.toLocaleString()} miles
              </p>
              <h2 className="text-3xl font-bold text-primary-600">
                {formattedPrice}
              </h2>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Overview</h3>
              <p className="text-lg">
                {vehicle.localizedContent?.[currentLocale]?.description || vehicle.description}
              </p>
            </div>
            
            {/* Vehicle Actions (Test Drive, Financing, etc.) */}
            <VehicleActions vehicle={vehicle} className="mb-8" />
            
            {/* Vehicle Specifications */}
            <div id="specifications">
              <VehicleSpecifications specifications={vehicle.specifications} className="mb-8" />
            </div>
            
            {/* Vehicle Features */}
            <VehicleFeatures features={vehicle.features} className="mb-8" />
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-80 lg:w-96">
            <div className="sticky top-24">
              <div className="bg-bg-subtle p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Interested in this vehicle?</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-primary-600 text-white font-medium rounded hover:bg-primary-700 transition">
                    Schedule Test Drive
                  </button>
                  <button className="w-full py-3 bg-white border border-text-primary text-text-primary font-medium rounded hover:bg-bg-muted transition">
                    Request Information
                  </button>
                  <button className="w-full py-3 bg-white border border-text-primary text-text-primary font-medium rounded hover:bg-bg-muted transition">
                    Calculate Payment
                  </button>
                </div>
              </div>
              
              {/* Financing Options */}
              <FinancingOptions vehicle={vehicle} className="mb-6" />
              
              {/* Similar Vehicles */}
              <SimilarVehicles vehicleId={vehicle.id} className="mb-6" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
