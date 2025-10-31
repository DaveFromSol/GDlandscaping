import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import FAQSection from '../components/FAQSection';

const SnowRemovalPage = () => {
  const faqs = [
    {
      question: "When do you start plowing snow?",
      answer: "We begin plowing when snow accumulation reaches 2 inches or more. For seasonal contract customers, we monitor weather conditions 24/7 and proactively start services when snow begins to accumulate."
    },
    {
      question: "Do you offer per-storm or seasonal contracts?",
      answer: "Yes, we offer both options. Seasonal contracts provide priority service, guaranteed pricing, and unlimited plowing for a flat rate. Per-storm pricing is also available for those who prefer pay-as-you-go service."
    },
    {
      question: "How quickly do you respond after a snowfall?",
      answer: "Seasonal contract customers receive priority service and are typically cleared within 4-6 hours after snowfall ends. Emergency commercial clients may receive even faster response times depending on their contract terms."
    },
    {
      question: "Do you provide salt or ice management?",
      answer: "Absolutely! Salt/sand application and ice management are included in our premium packages and available as add-ons for basic packages. We use eco-friendly de-icing products when requested."
    },
    {
      question: "What areas do you service for snow removal?",
      answer: "We provide snow removal services throughout Central Connecticut including Berlin, Hartford, Cromwell, Middletown, West Hartford, Newington, Wethersfield, Rocky Hill, Glastonbury, Manchester, Bristol, and Farmington."
    },
    {
      question: "Can you handle commercial snow removal?",
      answer: "Yes! We service commercial properties including office buildings, retail centers, apartment complexes, and medical facilities. We offer customized service plans with guaranteed response times and 24/7 emergency availability."
    },
    {
      question: "What happens if there's no snow this winter?",
      answer: "Our seasonal contracts are risk-based pricing that protects both parties. While we can't control Mother Nature, our pricing is competitive and reflects historical snowfall averages for Connecticut. Per-storm contracts are also available if you prefer to pay only when it snows."
    },
    {
      question: "Do I need to be home when you plow?",
      answer: "No, you don't need to be home. Most of our plowing happens early morning or overnight. We ask that you keep vehicles off driveways when possible and ensure we have clear access to areas that need plowing."
    }
  ];

  const packages = [
    {
      id: 1,
      name: 'Residential Basic',
      price: 'Starting at $500/season',
      description: 'Perfect for small to medium residential properties',
      features: [
        'Driveway snow plowing (up to 2 cars)',
        'Walkway clearing',
        'Front entrance steps',
        'Priority service during storms',
        '24/7 emergency response'
      ]
    },
    {
      id: 2,
      name: 'Residential Premium',
      price: 'Starting at $1000/season',
      description: 'Comprehensive snow removal for larger homes',
      features: [
        'Full driveway and parking area',
        'All walkways and pathways',
        'Front and back entrances',
        'Salt/sand application',
        'Ice removal services',
        'Priority scheduling',
        '24/7 emergency response'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Commercial',
      price: 'Custom Pricing',
      description: 'Professional snow removal for businesses',
      features: [
        'Parking lot clearing',
        'Sidewalk maintenance',
        'Entrance areas',
        'Salt/sand application',
        'Ice management',
        'Early morning service',
        '24/7 emergency response',
        'Liability insurance included'
      ]
    }
  ];

  const services = [
    {
      icon: '❄️',
      title: 'Snow Plowing',
      description: 'Professional snow plowing for driveways, parking lots, and commercial properties'
    },
    {
      icon: '🧂',
      title: 'Salt & Sand Application',
      description: 'Ice prevention and treatment with quality salt and sand materials'
    },
    {
      icon: '🏠',
      title: 'Walkway Clearing',
      description: 'Safe passage with thorough walkway and entrance clearing'
    },
    {
      icon: '⚡',
      title: '24/7 Emergency Service',
      description: 'Round-the-clock availability for storm emergencies'
    },
    {
      icon: '🚛',
      title: 'Commercial Snow Removal',
      description: 'Large-scale snow removal for businesses and commercial properties'
    },
    {
      icon: '❄️',
      title: 'Ice Management',
      description: 'Professional ice removal and prevention services'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Snow Removal Services - GD Landscaping",
    "description": "Professional snow removal and winter maintenance services in Berlin CT and surrounding areas. Seasonal packages available.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "GD Landscaping",
      "logo": "https://www.gdlandscapingllc.com/GD.png",
      "image": "https://www.gdlandscapingllc.com/GD.png",
      "telephone": "(860) 526-7583",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Berlin",
        "addressRegion": "CT"
      }
    },
    "serviceType": "Snow Removal",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 41.6219,
        "longitude": -72.7553
      },
      "geoRadius": "25 miles"
    }
  };

  return (
    <>
      <SEOHead
        title="Professional Snow Removal Services Berlin CT | Winter Maintenance | GD Landscaping"
        description="Reliable snow removal services in Berlin CT. Seasonal packages for residential and commercial properties. 24/7 emergency service, ice management, and winter maintenance."
        keywords="snow removal Berlin CT, winter maintenance Connecticut, snow plowing Hartford County, seasonal snow packages, commercial snow removal, ice management Berlin CT"
        canonicalUrl="https://www.gdlandscapingllc.com/snow-removal"
        structuredData={structuredData}
      />

      <div className="snow-removal-section">
        {/* Hero Section */}
        <div className="snow-hero">
          <div className="snow-hero-overlay"></div>
          <div className="snow-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>❄️ Winter Services Available</span>
              </div>
              <h1>Professional Snow Removal Services</h1>
              <p className="hero-subtitle">Reliable winter maintenance for Berlin, CT and surrounding areas. Keep your property safe and accessible all season long.</p>
              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Winter Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Emergency: (860) 526-7583
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Seasonal Packages */}
          <section className="packages-section">
            <div className="section-header">
              <h2>Winter Seasonal Packages</h2>
              <p className="section-subtitle">Choose the perfect snow removal package for your property. All packages include priority service and 24/7 emergency response.</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular</div>}
                  <div className="package-header">
                    <h3>{pkg.name}</h3>
                    <div className="package-price">{pkg.price}</div>
                    <p className="package-description">{pkg.description}</p>
                  </div>
                  <div className="package-features">
                    <ul>
                      {pkg.features.map((feature, index) => (
                        <li key={index}>
                          <span className="feature-check">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="package-footer">
                    <Link to="/contact" className="package-btn">
                      Select Package
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services Grid */}
          <section className="snow-services">
            <div className="section-header">
              <h2>Our Winter Services</h2>
              <p className="section-subtitle">Comprehensive snow and ice management for residential and commercial properties</p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-item">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="snow-benefits">
            <div className="benefits-content">
              <div className="benefits-text">
                <h2>Why Choose GD Landscaping for Snow Removal?</h2>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <span className="benefit-icon">⚡</span>
                    <div>
                      <h3>Rapid Response</h3>
                      <p>We monitor weather conditions and begin service before storms hit to keep your property accessible.</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🛡️</span>
                    <div>
                      <h3>Fully Insured</h3>
                      <p>Complete liability and equipment insurance for your peace of mind during winter operations.</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🚛</span>
                    <div>
                      <h3>Professional Equipment</h3>
                      <p>State-of-the-art snow plows, salt spreaders, and ice management equipment.</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">📱</span>
                    <div>
                      <h3>Service Updates</h3>
                      <p>Receive notifications when service is complete and property status updates.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="service-areas">
            <div className="section-header">
              <h2>Snow Removal Service Areas</h2>
              <p className="section-subtitle">Serving Berlin, CT and surrounding communities with reliable winter maintenance</p>
            </div>

            <div className="areas-content">
              <div className="primary-areas">
                <h3>Primary Service Area - Hartford County</h3>
                <div className="towns-grid">
                  <span className="town">Berlin</span>
                  <span className="town">Cromwell</span>
                  <span className="town">Middletown</span>
                  <span className="town">Hartford</span>
                  <span className="town">West Hartford</span>
                  <span className="town">Newington</span>
                  <span className="town">Wethersfield</span>
                  <span className="town">Rocky Hill</span>
                  <span className="town">Glastonbury</span>
                  <span className="town">Manchester</span>
                  <span className="town">Bristol</span>
                  <span className="town">Farmington</span>
                </div>
              </div>
            </div>
          </section>

          <FAQSection faqs={faqs} title="Snow Removal FAQ" />

          {/* CTA Section */}
          <section className="snow-cta">
            <div className="cta-content">
              <h2>Ready for Winter?</h2>
              <p>Don't wait for the first snowfall. Secure your seasonal snow removal package today.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Quote Today
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
            </div>
          </section>
        </div>

      </div>
    </>
  );
};

export default SnowRemovalPage;
