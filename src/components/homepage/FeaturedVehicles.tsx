import React from 'react';

interface Vehicle {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  image: string;
  brand: string;
}

const FEATURED_VEHICLES: Vehicle[] = [
  {
    id: '1',
    title: 'Mercedes-Benz E-Class',
    price: 42500,
    year: 2021,
    mileage: 15000,
    image: '/images/vehicles/mercedes-e-class.jpg',
    brand: 'Mercedes-Benz'
  },
  {
    id: '2',
    title: 'BMW 5 Series',
    price: 39900,
    year: 2020,
    mileage: 22000,
    image: '/images/vehicles/bmw-5-series.jpg',
    brand: 'BMW'
  },
  {
    id: '3',
    title: 'Audi A6',
    price: 37500,
    year: 2021,
    mileage: 18000,
    image: '/images/vehicles/audi-a6.jpg',
    brand: 'Audi'
  },
  {
    id: '4',
    title: 'Lexus RX 350',
    price: 45000,
    year: 2022,
    mileage: 12000,
    image: '/images/vehicles/lexus-rx.jpg',
    brand: 'Lexus'
  }
];

const FeaturedVehicles: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Vehicles</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover our selection of premium pre-owned vehicles, meticulously inspected and maintained to the highest standards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_VEHICLES.map((vehicle) => (
            <div 
              key={vehicle.id}
              className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-neutral-100">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${vehicle.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{vehicle.title}</h3>
                <div className="text-primary-600 font-semibold text-xl mb-3">
                  ${vehicle.price.toLocaleString()}
                </div>
                <div className="flex justify-between text-sm text-neutral-600 mb-4">
                  <span>{vehicle.year}</span>
                  <span>{vehicle.mileage.toLocaleString()} miles</span>
                </div>
                <a 
                  href={`/vehicles/${vehicle.id}`}
                  className="block w-full text-center bg-neutral-800 hover:bg-neutral-900 text-white py-2 rounded-md transition-colors"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="/vehicles" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            View All Vehicles
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
