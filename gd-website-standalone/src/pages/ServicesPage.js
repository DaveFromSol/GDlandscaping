import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      name: 'Lawn Maintenance',
      description: 'Regular mowing, edging, and lawn care',
      price: 'Starting at $40',
      image: '🌱',
      features: ['Weekly mowing', 'Edge trimming', 'Leaf removal', 'Fertilization']
    },
    {
      id: 2,
      name: 'Landscape Design',
      description: 'Custom landscape design and installation',
      price: 'Starting at $500',
      image: '🌿',
      features: ['Design consultation', '3D renderings', 'Plant selection', 'Installation']
    },
    {
      id: 3,
      name: 'Tree Services',
      description: 'Tree trimming, removal, and maintenance',
      price: 'Starting at $100',
      image: '🌳',
      features: ['Tree trimming', 'Tree removal', 'Stump grinding', 'Emergency service']
    },
    {
      id: 4,
      name: 'Hardscaping',
      description: 'Patios, walkways, and retaining walls',
      price: 'Starting at $300',
      image: '🏗️',
      features: ['Patio installation', 'Walkway creation', 'Retaining walls', 'Outdoor kitchens']
    },
    {
      id: 5,
      name: 'Irrigation Systems',
      description: 'Sprinkler system installation and repair',
      price: 'Starting at $800',
      image: '💧',
      features: ['System design', 'Installation', 'Repairs', 'Seasonal maintenance']
    },
    {
      id: 6,
      name: 'Seasonal Cleanup',
      description: 'Fall yard cleanup services and seasonal maintenance',
      price: 'Starting at $100',
      image: '🍂',
      features: ['Leaf removal', 'Debris cleanup', 'Mulching', 'Plant preparation']
    },
    {
      id: 7,
      name: 'Snow Removal',
      description: 'Professional winter snow removal and ice management',
      price: 'Seasonal packages from $500',
      image: '❄️',
      features: ['Snow plowing', 'Driveway clearing', 'Walkway maintenance', 'Salt application', '24/7 emergency service']
    },
    {
      id: 8,
      name: 'Lawn Fertilization',
      description: 'Professional lawn care and nutrient programs',
      price: 'Starting at $95',
      image: '🌾',
      features: ['Soil testing', 'Custom fertilizer programs', 'Weed control', 'Disease prevention']
    },
    {
      id: 8,
      name: 'Outdoor Lighting',
      description: 'Landscape and security lighting installation',
      price: 'Starting at $400',
      image: '💡',
      features: ['LED installations', 'Security lighting', 'Pathway lights', 'Accent lighting']
    },
    {
      id: 9,
      name: 'Mulching Services',
      description: 'Premium mulch installation and maintenance',
      price: 'Starting at $120',
      image: '🪵',
      features: ['Premium mulch selection', 'Bed preparation', 'Weed barrier installation', 'Annual refresh']
    },
    {
      id: 10,
      name: 'Pressure Washing',
      description: 'Professional cleaning for driveways and patios',
      price: 'Starting at $180',
      image: '💦',
      features: ['Driveway cleaning', 'Patio restoration', 'Walkway maintenance', 'Surface sealing']
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Landscaping Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "GD Landscaping",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Berlin",
        "addressRegion": "CT",
        "addressCountry": "US"
      }
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 41.6219,
        "longitude": -72.7553
      },
      "geoRadius": "25 miles"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Landscaping Services",
      "itemListElement": services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        }
      }))
    }
  };

  return (
    <>
      <SEOHead
        title="Landscaping Services Berlin CT | GD Landscaping - Lawn Care, Snow Removal, Hardscaping"
        description="Complete landscaping services in Berlin CT: lawn maintenance, snow removal, tree services, hardscaping & more. Serving Hartford County. Free estimates available."
        keywords="landscaping services Berlin CT, lawn maintenance Berlin, snow removal Hartford County, tree services Connecticut, hardscaping Berlin CT, irrigation systems Connecticut, seasonal cleanup Berlin, lawn fertilization CT, mulching services Berlin"
        canonicalUrl="https://www.gdlandscapingllc.com/services"
        ogImage="/GD.png"
        ogType="website"
        structuredData={structuredData}
      />
      
      <div className="services-section">
        <div className="container">
          <div className="services-hero">
            <div className="services-hero-content">
              <div className="services-badge">
                <span>🌱 Complete Landscaping Solutions</span>
              </div>
              <h1>Professional Landscaping Services</h1>
              <p className="section-subtitle">Comprehensive landscaping solutions for residential and commercial properties in Berlin CT and surrounding areas</p>
              <div className="services-highlights">
                <div className="highlight-stat">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Services</span>
                </div>
                <div className="highlight-stat">
                  <span className="stat-number">75+</span>
                  <span className="stat-label">Towns Served</span>
                </div>
                <div className="highlight-stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          <div className="services-categories">
            <div className="category-header">
              <h2>Our Service Categories</h2>
              <div className="section-line"></div>
              <p>From basic lawn maintenance to complete landscape transformations, we offer comprehensive services to meet all your outdoor needs.</p>
            </div>
          </div>
          
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-header">
                  <div className="service-icon">{service.image}</div>
                  <div className="service-title-price">
                    <h3>{service.name}</h3>
                    <div className="service-price">{service.price}</div>
                  </div>
                </div>
                <p className="service-description">{service.description}</p>
                <div className="service-features">
                  <h4>What's Included:</h4>
                  <ul>
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <Link 
                  to="/contact"
                  className="service-cta"
                >
                  Get Quote
                </Link>
              </div>
            ))}
          </div>

          <div className="services-guarantee">
            <div className="guarantee-content">
              <div className="guarantee-icon">🛡️</div>
              <div className="guarantee-text">
                <h3>Our Service Guarantee</h3>
                <p>We stand behind every service with our 100% satisfaction guarantee. Licensed, insured, and committed to excellence in every project.</p>
                <div className="guarantee-features">
                  <span className="feature">✓ Licensed & Insured</span>
                  <span className="feature">✓ 100% Satisfaction Guarantee</span>
                  <span className="feature">✓ Free Estimates</span>
                  <span className="feature">✓ Emergency Services Available</span>
                </div>
              </div>
            </div>
          </div>

          <div className="services-cta">
            <div className="cta-content">
              <h2>Ready to Transform Your Outdoor Space?</h2>
              <p>Contact GD Landscaping today for your free consultation and discover how our professional services can enhance your property.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">Get Free Quote</Link>
                <Link to="/portfolio" className="cta-secondary">View Our Work</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;