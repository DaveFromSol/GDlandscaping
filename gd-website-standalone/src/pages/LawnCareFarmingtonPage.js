import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import LocationGallery from '../components/LocationGallery';
import QuoteSection from '../components/QuoteSection';

const LawnCareFarmingtonPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Farmington Basic',
      price: '$40/visit',
      description: 'Essential lawn care for Farmington homes',
      features: [
        'Weekly mowing during growing season',
        'Edge trimming around walkways',
        'Grass clipping cleanup',
        'Basic weed spot treatment',
        'Reliable Farmington service'
      ]
    },
    {
      id: 2,
      name: 'Farmington Premium',
      price: '$65/visit',
      description: 'Complete lawn maintenance for Farmington properties',
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
      name: 'Farmington Estate & Commercial',
      price: 'Custom Pricing',
      description: 'Professional lawn care for Farmington estates, HOAs, and businesses',
      features: [
        'Commercial-grade equipment',
        'Scheduled weekly maintenance',
        'Professional appearance standards',
        'Landscaping bed maintenance',
        'Seasonal cleanup services',
        'Liability insurance included',
        'On-call storm cleanup'
      ]
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lawn Care Service Farmington CT - G&D Landscaping",
    "description": "Professional lawn care and maintenance services in Farmington, Connecticut. Weekly mowing, fertilization, and complete yard care for homes and businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Farmington",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "telephone": "(860) 526-7583",
    "url": "https://www.gdlandscapingllc.com/lawn-care-farmington-ct"
  };

  const overviewHighlights = [
    'Custom mowing patterns for Devonwood, Unionville, and Talcott Mountain so manicured lawns match community standards.',
    'Blade heights and fertilization tailored to Farmington’s mix of shady river valley yards and sunny hillside lots.',
    'Optional shrub trimming, mulch refresh, and seasonal color that keep Farmington Village and Highland Park homes market-ready.'
  ];

  const serviceStats = [
    { value: '4.9/5', label: 'Farmington rating' },
    { value: '14', label: 'Weekly route loops' },
    { value: '90 min', label: 'Storm response alerts' }
  ];

  return (
    <>
      <SEOHead
        title="Lawn Care Farmington CT | Professional Lawn Maintenance Services | G&D Landscaping"
        description="Professional lawn care services in Farmington, CT. Weekly mowing, fertilization, weed control, and complete yard maintenance for Unionville, Devonwood, and surrounding neighborhoods."
        keywords="lawn care Farmington CT, lawn mowing Farmington Connecticut, landscaping Farmington, yard maintenance Farmington CT"
        canonicalUrl="https://www.gdlandscapingllc.com/lawn-care-farmington-ct"
        structuredData={structuredData}
      />

      <div className="lawn-care-section">
        <div className="lawn-hero">
          <div className="lawn-hero-video">
            <video autoPlay muted loop playsInline preload="auto" poster="/garden-landscape-design-hartford-county.jpeg">
              <source src="/AdobeStock_657294798.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="lawn-hero-overlay"></div>
          <div className="lawn-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>🌱 Serving Farmington, CT</span>
              </div>
              <h1>Lawn Care Service Farmington CT</h1>
              <p className="hero-subtitle">Professional lawn maintenance for Farmington residents and businesses. Keep Unionville, Devonwood, and Talcott Mountain properties lush and polished all season.</p>

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
                  Type Your Farmington Address for Instant Lawn Care Quote
                </h2>
                <AddressAutocomplete />
              </div>

              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Farmington Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
            </div>
          </div>
        </div>

        <LocationGallery
          townName="Farmington, CT"
          subtitle="Weekly cuts, edging, and detailing across Unionville, Devonwood, and Talcott Mountain."
        />

        <section className="town-overview">
          <div className="container">
            <div className="town-overview-grid">
              <div className="town-overview-card">
                <h2>Farmington Lawn Insight</h2>
                <p>Farmington lawns range from estate lots in Devonwood to river valley yards near Unionville Center. We adjust deck sizes, clipping strategy, and irrigation awareness to deliver a consistent, high-end finish.</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`newington-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>Farmington Service Snapshot</h3>
                <p>Dedicated crews stay on Farmington routes every week, ensuring the same faces maintain your property.</p>
                <div className="town-stats">
                  {serviceStats.map((stat) => (
                    <div key={stat.label} className="town-stat">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <section className="packages-section">
            <div className="section-header">
              <h2>Farmington Lawn Care Packages</h2>
              <p className="section-subtitle">Professional lawn maintenance for Farmington properties</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                    {pkg.popular && <div className="popular-badge">Most Popular in Farmington</div>}
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
                      Get Farmington Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <QuoteSection
            title="Need a Farmington Quote?"
            subtitle="Share your acreage, gate access, and must-have services—we’ll customize your plan."
            locationName="Farmington"
            source="Farmington Lawn Page"
          />

          <section className="lawn-cta">
            <div className="cta-content">
              <h2>Ready for a Beautiful Lawn in Farmington?</h2>
              <p>Join your Farmington neighbors who trust G&D Landscaping for professional lawn care.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Farmington Quote
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

export default LawnCareFarmingtonPage;
