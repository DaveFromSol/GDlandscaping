import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';

const LawnCareRockyHillPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Rocky Hill Basic',
      price: '$40/visit',
      description: 'Essential lawn care for Rocky Hill homes',
      features: [
        'Weekly mowing during growing season',
        'Edge trimming around walkways',
        'Grass clipping cleanup',
        'Basic weed spot treatment',
        'Reliable Rocky Hill service'
      ]
    },
    {
      id: 2,
      name: 'Rocky Hill Premium',
      price: '$65/visit',
      description: 'Complete lawn maintenance for Rocky Hill properties',
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
      name: 'Rocky Hill Commercial',
      price: 'Custom Pricing',
      description: 'Professional lawn care for Rocky Hill businesses',
      features: [
        'Commercial-grade equipment',
        'Scheduled weekly maintenance',
        'Professional appearance standards',
        'Landscaping bed maintenance',
        'Seasonal cleanup services',
        'Liability insurance included'
      ]
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lawn Care Service Rocky Hill CT - GD Landscaping",
    "description": "Professional lawn care and maintenance services in Rocky Hill, Connecticut. Weekly mowing, fertilization, and complete yard care for homes and businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rocky Hill",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "telephone": "(860) 526-7583",
    "url": "https://gdlandscaping.com/lawn-care-rocky-hill-ct"
  };

  return (
    <>
      <SEOHead
        title="Lawn Care Rocky Hill CT | Professional Lawn Maintenance Services | GD Landscaping"
        description="Professional lawn care services in Rocky Hill, Connecticut. Weekly mowing, fertilization, weed control, and complete yard maintenance for Rocky Hill properties."
        keywords="lawn care Rocky Hill CT, lawn mowing Rocky Hill Connecticut, landscaping Rocky Hill, yard maintenance Rocky Hill CT, fertilization Rocky Hill"
        canonicalUrl="https://gdlandscaping.com/lawn-care-rocky-hill-ct"
        structuredData={structuredData}
      />

      <div className="lawn-care-section">
        <div className="lawn-hero">
          <div className="lawn-hero-overlay"></div>
          <div className="lawn-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>🌱 Serving Rocky Hill, CT</span>
              </div>
              <h1>Lawn Care Service Rocky Hill CT</h1>
              <p className="hero-subtitle">Professional lawn maintenance for Rocky Hill residents and businesses. Keep your Connecticut River community property looking beautiful with expert lawn care.</p>

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
                  Type Your Rocky Hill Address for Instant Lawn Care Quote
                </h2>
                <AddressAutocomplete />
              </div>

              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Rocky Hill Quote
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
              <h2>Rocky Hill Lawn Care Packages</h2>
              <p className="section-subtitle">Professional lawn maintenance for Rocky Hill properties</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in Rocky Hill</div>}
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
                      Get Rocky Hill Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="lawn-cta">
            <div className="cta-content">
              <h2>Ready for a Beautiful Lawn in Rocky Hill?</h2>
              <p>Join your Rocky Hill neighbors who trust GD Landscaping for professional lawn care.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Rocky Hill Quote
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

export default LawnCareRockyHillPage;