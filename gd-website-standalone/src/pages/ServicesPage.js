import React from 'react';
import SEOHead from '../components/SEOHead';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      name: 'Lawn Maintenance',
      description: 'Regular mowing, edging, and lawn care',
      price: 'Starting at $75',
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
      price: 'Starting at $200',
      image: '🌳',
      features: ['Tree trimming', 'Tree removal', 'Stump grinding', 'Emergency service']
    },
    {
      id: 4,
      name: 'Hardscaping',
      description: 'Patios, walkways, and retaining walls',
      price: 'Starting at $1,500',
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
      description: 'Spring and fall yard cleanup services',
      price: 'Starting at $150',
      image: '🍂',
      features: ['Leaf removal', 'Debris cleanup', 'Mulching', 'Plant preparation']
    },
    {
      id: 7,
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
        title="Landscaping Services in Berlin CT | GD Landscaping - Lawn Care, Tree Services, Hardscaping"
        description="Professional landscaping services in Berlin CT. Lawn maintenance, landscape design, tree services, hardscaping, irrigation systems. Serving Hartford County & surrounding areas."
        keywords="lawn maintenance Berlin CT, landscape design Hartford County, tree services Connecticut, hardscaping Berlin, irrigation systems CT, seasonal cleanup Berlin CT"
        canonicalUrl="https://gdlandscaping.com/services"
        structuredData={structuredData}
      />
      
      <div className="services-section">
        <div className="container">
          <h1>Professional Landscaping Services</h1>
          <p className="section-subtitle">Comprehensive landscaping solutions for residential and commercial properties in Berlin CT and surrounding areas</p>
          
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.image}</div>
                <h3>{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-price">{service.price}</div>
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <a 
                  href="/contact"
                  className="service-cta"
                >
                  Get Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;