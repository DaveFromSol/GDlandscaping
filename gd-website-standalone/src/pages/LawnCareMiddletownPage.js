import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';

const LawnCareMiddletownPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Middletown Basic',
      price: '$40/visit',
      description: 'Essential lawn care for Middletown homes',
      features: [
        'Weekly mowing during growing season',
        'Edge trimming around walkways',
        'Grass clipping cleanup',
        'Basic weed spot treatment',
        'Reliable Middletown service'
      ]
    },
    {
      id: 2,
      name: 'Middletown Premium',
      price: '$65/visit',
      description: 'Complete lawn maintenance for Middletown properties',
      features: [
        'Weekly mowing and edging',
        'Trimming around all structures',
        'Leaf removal and cleanup',
        'Fertilization program',
        'Weed and pest control',
        'Seasonal lawn treatments',
        'Priority scheduling'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Middletown Commercial',
      price: 'Custom Pricing',
      description: 'Professional lawn care for Middletown businesses',
      features: [
        'Commercial-grade equipment',
        'Scheduled weekly maintenance',
        'Professional appearance standards',
        'Landscaping bed maintenance',
        'Seasonal cleanup services',
        'Liability insurance included',
        'Emergency response available'
      ]
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lawn Care Service Middletown CT - GD Landscaping",
    "description": "Professional lawn care and maintenance services in Middletown, Connecticut. Weekly mowing, fertilization, and complete yard care for homes and businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Middletown",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "telephone": "(860) 526-7583",
    "url": "https://gdlandscaping.com/lawn-care-middletown-ct"
  };

  return (
    <>
      <SEOHead
        title="Lawn Care Middletown CT | Professional Lawn Maintenance Services | GD Landscaping"
        description="Professional lawn care services in Middletown, Connecticut. Weekly mowing, fertilization, weed control, and complete yard maintenance for all Middletown areas."
        keywords="lawn care Middletown CT, lawn mowing Middletown Connecticut, landscaping Middletown, yard maintenance Middletown CT, fertilization Middletown, weed control Middletown"
        canonicalUrl="https://gdlandscaping.com/lawn-care-middletown-ct"
        structuredData={structuredData}
      />

      <div className="lawn-care-section">
        <div className="lawn-hero">
          <div className="lawn-hero-overlay"></div>
          <div className="lawn-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>🌱 Serving Middletown, CT</span>
              </div>
              <h1>Lawn Care Service Middletown CT</h1>
              <p className="hero-subtitle">Professional lawn maintenance for Middletown residents and businesses. Keep your university town property looking exceptional with expert lawn care services.</p>

              <div style={{
                margin: '30px 0',
                padding: '0 20px'
              }}>
                <h2 style={{
                  color: 'black',
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  textShadow: '1px 1px 2px rgba(255,255,255,0.5)'
                }}>
                  Type Your Middletown Address for Instant Lawn Care Quote
                </h2>
                <AddressAutocomplete />
              </div>

              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Middletown Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <section className="packages-section">
            <div className="section-header">
              <h2>Middletown Lawn Care Packages</h2>
              <p className="section-subtitle">Professional lawn maintenance plans for Middletown properties</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in Middletown</div>}
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
                      Get Middletown Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="lawn-cta">
            <div className="cta-content">
              <h2>Ready for a Beautiful Lawn in Middletown?</h2>
              <p>Join your Middletown neighbors who trust GD Landscaping for professional lawn care.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Middletown Quote
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

export default LawnCareMiddletownPage;