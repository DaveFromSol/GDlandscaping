import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import FAQSection from '../components/FAQSection';

const ServicesPage = () => {
  const faqs = [
    {
      question: "What services does GD Landscaping offer in Connecticut?",
      answer: "We offer comprehensive landscaping services including lawn maintenance, landscape design, tree services, hardscaping, irrigation systems, seasonal cleanup, snow removal, bush trimming, fertilization & weed control, and mulching. All services are available across Berlin, Hartford, and surrounding Connecticut areas."
    },
    {
      question: "Do you provide free estimates for landscaping projects?",
      answer: "Yes! We provide free, no-obligation estimates for all our services. You can request a quote through our website, call us at (860) 526-7583, or use our instant quote tool for lawn care services."
    },
    {
      question: "Are you licensed and insured?",
      answer: "Absolutely. GD Landscaping is fully licensed and insured in Connecticut. We carry comprehensive liability insurance to protect your property and our team members during all projects."
    },
    {
      question: "What areas do you serve in Connecticut?",
      answer: "We serve Berlin, Hartford, Farmington, New Britain, Cromwell, Middletown, Rocky Hill, Newington, West Hartford, Bristol, and surrounding Hartford County communities. Contact us to confirm service availability in your specific area."
    },
    {
      question: "How often should I schedule lawn maintenance?",
      answer: "For optimal lawn health, we recommend weekly mowing during the growing season (spring through fall). Our maintenance plans include mowing, edging, trimming, and seasonal services like fertilization and cleanup tailored to Connecticut's climate."
    },
    {
      question: "Do you offer snow removal services?",
      answer: "Yes, we provide professional snow removal services throughout the winter season, including plowing, shoveling, and ice management for both residential and commercial properties in Central Connecticut."
    },
    {
      question: "What is your satisfaction guarantee?",
      answer: "We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied with our service, we'll work with you to make it right. Your satisfaction is our top priority."
    },
    {
      question: "Can you help with commercial landscaping projects?",
      answer: "Yes, we serve both residential and commercial clients. Our commercial services include property maintenance, seasonal decorating, snow removal, and comprehensive landscape management for businesses, offices, and multi-family properties."
    }
  ];

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

          <FAQSection faqs={faqs} title="Landscaping Services FAQ" />

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