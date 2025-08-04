import Head from 'next/head';
import Header from '../src/components/layout/Header';

export default function Home() {
  return (
    <>
      <Head>
        <title>AutoAni - Luxury Automotive Excellence</title>
        <meta name="description" content="Discover exceptional vehicles for exceptional people. Premium luxury automotive experience with meticulously curated collection." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      {/* Luxury Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Exceptional Vehicles for Exceptional People</h1>
          <p className="hero-subtitle">
            Discover premium quality pre-owned vehicles with AutoAni's curated selection and exceptional service.
          </p>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">500+</span>
              <span className="hero-stat-label">Luxury Vehicles</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">25+</span>
              <span className="hero-stat-label">Years Experience</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">98%</span>
              <span className="hero-stat-label">Client Satisfaction</span>
            </div>
          </div>
          
          <div className="btn-group">
            <a href="#inventory" className="btn btn-primary">
              View Our Inventory
            </a>
            <a href="#about" className="btn btn-secondary">
              About Us
            </a>
          </div>
        </div>
      </section>

      {/* Premium Selection Section */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Premium Selection</span>
            <h2 className="section-title">Featured Vehicles</h2>
            <p className="section-subtitle">
              Discover our selection of premium pre-owned vehicles, meticulously inspected and maintained to the highest standards.
            </p>
          </div>
          
          <div className="vehicle-grid">
            {/* Luxury Vehicle Card 1 */}
            <div className="vehicle-card">
              <div className="vehicle-image">
                <div className="vehicle-badge">Premium</div>
                <div className="vehicle-image-placeholder">
                  Mercedes-Benz E-Class
                </div>
              </div>
              <div className="vehicle-content">
                <div className="vehicle-brand">Mercedes-Benz</div>
                <h3 className="vehicle-title">E-Class 450</h3>
                <div className="vehicle-price">$42,500</div>
                <div className="vehicle-details">
                  <span className="vehicle-detail">2021 | 15,000 miles</span>
                </div>
                <div className="vehicle-actions">
                  <a href="#" className="btn btn-primary btn-sm">View Details</a>
                  <a href="#" className="btn btn-secondary btn-sm">Contact</a>
                </div>
              </div>
            </div>

            {/* Luxury Vehicle Card 2 */}
            <div className="vehicle-card">
              <div className="vehicle-image">
                <div className="vehicle-badge">Certified</div>
                <div className="vehicle-image-placeholder">
                  BMW 5 Series
                </div>
              </div>
              <div className="vehicle-content">
                <div className="vehicle-brand">BMW</div>
                <h3 className="vehicle-title">5 Series 540i</h3>
                <div className="vehicle-price">$39,000</div>
                <div className="vehicle-details">
                  <span className="vehicle-detail">2020 | 22,500 miles</span>
                </div>
                <div className="vehicle-actions">
                  <a href="#" className="btn btn-primary btn-sm">View Details</a>
                  <a href="#" className="btn btn-secondary btn-sm">Contact</a>
                </div>
              </div>
            </div>

            {/* Luxury Vehicle Card 3 */}
            <div className="vehicle-card">
              <div className="vehicle-image">
                <div className="vehicle-badge">Exclusive</div>
                <div className="vehicle-image-placeholder">
                  Audi A6
                </div>
              </div>
              <div className="vehicle-content">
                <div className="vehicle-brand">Audi</div>
                <h3 className="vehicle-title">A6 Prestige</h3>
                <div className="vehicle-price">$37,500</div>
                <div className="vehicle-details">
                  <span className="vehicle-detail">2019 | 28,000 miles</span>
                </div>
                <div className="vehicle-actions">
                  <a href="#" className="btn btn-primary btn-sm">View Details</a>
                  <a href="#" className="btn btn-secondary btn-sm">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Premium Services</span>
            <h2 className="section-title">Our Premium Services</h2>
            <p className="section-subtitle">
              At AutoAni, we go beyond just selling vehicles. We provide a comprehensive automotive experience with premium services tailored to your needs.
            </p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🔍</div>
              <h3 className="service-title">Detailed Inspection</h3>
              <p className="service-description">
                Every vehicle undergoes a comprehensive 150-point inspection to ensure quality and reliability.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🛡️</div>
              <h3 className="service-title">Extended Warranty</h3>
              <p className="service-description">
                Comprehensive warranty coverage for peace of mind with your luxury vehicle purchase.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🚗</div>
              <h3 className="service-title">Premium Brands</h3>
              <p className="service-description">
                Curated selection from the world's most respected automotive manufacturers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>AutoAni</h3>
              <p>Exceptional vehicles for exceptional people. Your premier destination for luxury automotive excellence.</p>
            </div>
            
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#inventory">Inventory</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Contact Info</h3>
              <ul className="footer-links">
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@autoani.com</li>
                <li>Address: 123 Luxury Ave, City, State</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 AutoAni. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
