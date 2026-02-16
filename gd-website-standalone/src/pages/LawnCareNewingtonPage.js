import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import LocationGallery from '../components/LocationGallery';
import QuoteSection from '../components/QuoteSection';

const LawnCareNewingtonPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Newington Basic',
      price: '$40/visit',
      description: 'Essential lawn care for Newington homes',
      features: [
        'Weekly mowing during growing season',
        'Edge trimming around walkways',
        'Grass clipping cleanup',
        'Basic weed spot treatment',
        'Reliable Newington service'
      ]
    },
    {
      id: 2,
      name: 'Newington Premium',
      price: '$65/visit',
      description: 'Complete lawn maintenance for Newington properties',
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
      name: 'Newington Commercial',
      price: 'Custom Pricing',
      description: 'Professional lawn care for Newington businesses',
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
    "name": "Lawn Care Service Newington CT - G&D Landscaping",
    "description": "Professional lawn care and maintenance services in Newington, Connecticut. Weekly mowing, fertilization, and complete yard care for homes and businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Newington",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "telephone": "(860) 526-7583",
    "url": "https://www.gdlandscapingllc.com/lawn-care-newington-ct"
  };

  const overviewHighlights = [
    'Customized mowing stripes for Newington Center colonials, Maple Hill cul-de-sacs, and the larger Willard School neighborhoods.',
    'Blade sharpening schedule adjusted for Newington’s thicker cool-season turf so cuts stay clean even during humid weeks.',
    'Optional shrub trimming, mulch, and seasonal color that keep Cedar Mountain and Church Street properties camera-ready.'
  ];

  const serviceStats = [
    { value: '4.9/5', label: 'Local review score' },
    { value: '16', label: 'Weekly route loops' },
    { value: '2 hr', label: 'Weather alerts' }
  ];

  return (
    <>
      <SEOHead
        title="Lawn Care Newington CT | Professional Lawn Maintenance Services | G&D Landscaping"
        description="Professional lawn care services in Newington, Connecticut. Weekly mowing, fertilization, weed control, and complete yard maintenance for all Newington properties."
        keywords="lawn care Newington CT, lawn mowing Newington Connecticut, landscaping Newington, yard maintenance Newington CT, fertilization Newington"
        canonicalUrl="https://www.gdlandscapingllc.com/lawn-care-newington-ct"
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
                <span>🌱 Serving Newington, CT</span>
              </div>
              <h1>Lawn Care Service Newington CT</h1>
              <p className="hero-subtitle">Professional lawn maintenance for Newington residents and businesses. Keep your community property looking pristine with expert lawn care services.</p>

              <div className="homepage-address-input-container">
                <div className="homepage-input-badge">⚡ GET INSTANT QUOTE ⚡</div>
                <div className="homepage-input-wrapper">
                  <div className="homepage-input-header">
                    <span className="homepage-input-icon">📍</span>
                    <h2 className="homepage-input-title">
                      Type Your Newington Address for Instant Quote
                    </h2>
                  </div>
                  <div className="homepage-input-field">
                    <AddressAutocomplete />
                  </div>
                  <div className="homepage-input-benefits">
                    <span className="homepage-benefit-item">✓ See Property Size</span>
                    <span className="homepage-benefit-item">✓ Instant Pricing</span>
                    <span className="homepage-benefit-item">✓ Book Online</span>
                  </div>
                </div>
              </div>

              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Newington Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
            </div>
          </div>
        </div>

        <LocationGallery
          townName="Newington, CT"
          subtitle="Weekly cuts and detailing completed throughout Newington Center, Willard, and Maple Hill."
        />

        <section className="town-overview">
          <div className="container">
            <div className="town-overview-grid">
              <div className="town-overview-card">
                <h2>Newington Lawn Insight</h2>
                <p>Newington lawns range from wide corner lots to cozy ranch yards shaded by mature oaks. We match deck sizes, clippings strategy, and trim order so every property gets a boutique finish without slowing the schedule.</p>
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
                <h3>Newington Service Snapshot</h3>
                <p>We keep the same crew leaders on each street every week for consistent quality.</p>
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
              <h2>Professional Lawn Care Services</h2>
              <p className="section-subtitle">Professional lawn maintenance for Newington properties</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in Newington</div>}
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
                      Get Newington Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <QuoteSection
            title="Need a Newington Quote?"
            subtitle="Provide details about your property and we'll deliver a personalized lawn care estimate fast."
            locationName="Newington"
            source="Newington Lawn Page"
          />

          <section className="lawn-cta">
            <div className="cta-content">
              <h2>Ready for a Beautiful Lawn in Newington?</h2>
              <p>Join your Newington neighbors who trust G&D Landscaping for professional lawn care.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Newington Quote
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

export default LawnCareNewingtonPage;
