import Head from 'next/head';
import Navbar from '../src/components/layout/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>AutoAni - Premium Pre-Owned Vehicles</title>
        <meta name="description" content="Discover exceptional vehicles for exceptional people with AutoAni's curated selection." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Exceptional
                <span className="block text-blue-400">Vehicles</span>
                <span className="block text-sm font-normal text-gray-300 mt-4">
                  for Exceptional People
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Discover premium quality pre-owned vehicles with AutoAni's curated selection 
                and exceptional service.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition-colors">
                  View Our Inventory
                </button>
                <button className="border border-gray-400 hover:border-white px-8 py-4 rounded-lg font-semibold transition-colors">
                  About Us
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-4">Premium Selection</h3>
                  <p className="text-gray-200 mb-6">
                    Each vehicle in our collection is meticulously inspected and maintained 
                    to the highest standards.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-blue-300">500+</div>
                      <div className="text-sm text-gray-300">Vehicles</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-300">98%</div>
                      <div className="text-sm text-gray-300">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
            <p className="text-xl text-gray-600">
              Discover our selection of premium pre-owned vehicles, meticulously inspected 
              and maintained to the highest standards.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Vehicle Card 1 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Mercedes-Benz E-Class</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">$42,500</h3>
                <p className="text-gray-600 mb-4">2021 | 15,000 miles</p>
                <button className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>

            {/* Vehicle Card 2 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-lg">BMW 5 Series</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">$39,000</h3>
                <p className="text-gray-600 mb-4">2020 | 22,500 miles</p>
                <button className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>

            {/* Vehicle Card 3 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Audi A6</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">$37,500</h3>
                <p className="text-gray-600 mb-4">2019 | 28,000 miles</p>
                <button className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-xl text-gray-300">
              At AutoAni, we go beyond just selling vehicles. We provide a comprehensive 
              automotive experience with premium services tailored to your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Detailed Inspection</h3>
              <p className="text-gray-300">
                Every vehicle undergoes a comprehensive 150-point inspection to ensure quality.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Extended Warranty</h3>
              <p className="text-gray-300">
                Comprehensive warranty coverage for peace of mind with your purchase.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Brands</h3>
              <p className="text-gray-300">
                Curated selection from the world's most respected automotive manufacturers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
