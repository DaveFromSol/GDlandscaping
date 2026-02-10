import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import LocationGallery from '../components/LocationGallery';
import QuoteSection from '../components/QuoteSection';

const LawnCareNewBritainPage = () => {
  const packages = [
    {
      id: 1,
      name: 'New Britain Basic',
      price: '$40/visit',
      description: 'Essential lawn care for New Britain homes',
      features: [
        'Weekly mowing during growing season',
        'Edge trimming around walkways',
        'Grass clipping cleanup',
        'Basic weed spot treatment',
        'Reliable New Britain service'
      ]
    },
    {
      id: 2,
      name: 'New Britain Premium',
      price: '$65/visit',
      description: 'Complete lawn maintenance for New Britain properties',
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
      name: 'New Britain Commercial',
      price: 'Custom Pricing',
      description: 'Professional lawn care for New Britain businesses',
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

  const newBritainAreas = [
    'Downtown New Britain',
    'West End',
    'East Side',
    'South End',
    'Belvedere',
    'Sloper',
    'Little Poland',
    'Hardware City area'
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lawn Care Service New Britain CT - G&D Landscaping",
    "description": "Professional lawn care and maintenance services in New Britain, Connecticut. Weekly mowing, fertilization, and complete yard care for homes and businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New Britain",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6612,
      "longitude": -72.7795
    },
    "telephone": "(860) 526-7583",
    "url": "https://www.gdlandscapingllc.com/lawn-care-new-britain-ct",
    "serviceArea": {
      "@type": "City",
      "name": "New Britain, Connecticut"
    }
  };

  const overviewHighlights = [
    'Little Poland storefronts, Belvedere hills, and West Side neighborhoods all receive trims tuned to their lot sizes and sun exposure.',
    'Our Hardware City crews bag clippings during peak seed drop to keep sidewalks spotless and storm drains clear.',
    'Commercial accounts receive after-hours mowing so parking lots along Broad Street stay open for customers.'
  ];

  const serviceStats = [
    { value: '5', label: 'Dedicated crews in town' },
    { value: '22', label: 'Neighborhood routes' },
    { value: '365', label: 'Support days' }
  ];

  return (
    <>
      <SEOHead
        title="Lawn Care New Britain CT | Professional Lawn Maintenance Services | G&D Landscaping"
        description="Professional lawn care services in New Britain, Connecticut. Weekly mowing, fertilization, weed control, and complete yard maintenance. Serving all New Britain neighborhoods."
        keywords="lawn care New Britain CT, lawn mowing New Britain Connecticut, landscaping New Britain, yard maintenance New Britain CT, fertilization New Britain, weed control New Britain"
        canonicalUrl="https://www.gdlandscapingllc.com/lawn-care-new-britain-ct"
        structuredData={structuredData}
      />

      <div className="lawn-care-section">
        {/* New Britain Hero Section */}
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
                <span>🌱 Serving New Britain, CT</span>
              </div>
              <h1>Lawn Care Service New Britain CT</h1>
              <p className="hero-subtitle">Professional lawn maintenance for New Britain residents and businesses. Keep your Hardware City property looking its best year-round with G&D Landscaping's expert lawn care services.</p>

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
                  Type Your New Britain Address for Instant Lawn Care Quote
                </h2>
                <AddressAutocomplete />
              </div>

              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get New Britain Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
            </div>
          </div>
        </div>

        <LocationGallery
          townName="New Britain, CT"
          subtitle="See our crews polishing lawns across Little Poland, Belvedere, and the East Side."
        />

        <section className="town-overview">
          <div className="container">
            <div className="town-overview-grid">
              <div className="town-overview-card">
                <h2>Dialed-In for New Britain Yards</h2>
                <p>New Britain mixes city blocks, condo associations, and classic neighborhoods with mature maples. We manage traffic, slope, and shade by pairing the right equipment with each route so lawns stay consistent across town.</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`new-britain-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>New Britain Service Snapshot</h3>
                <p>Supervisors live nearby for true neighborhood-level accountability.</p>
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
          {/* New Britain Specific Benefits */}
          <section className="location-benefits">
            <div className="section-header">
              <h2>Why New Britain Chooses G&D Landscaping</h2>
              <p className="section-subtitle">We understand New Britain's unique soil conditions and growing environment</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🏛️</div>
                <h3>Local Knowledge</h3>
                <p>Familiar with New Britain's soil types, grass varieties, and optimal growing conditions for Hardware City lawns.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Fast Response</h3>
                <p>Based nearby in Berlin, CT - quick service to all New Britain neighborhoods and reliable weekly scheduling.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🌱</div>
                <h3>Proven Results</h3>
                <p>Track record of healthy, beautiful lawns throughout New Britain's diverse residential and commercial areas.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h3>Fair Pricing</h3>
                <p>Competitive rates designed specifically for New Britain property owners with transparent, honest pricing.</p>
              </div>
            </div>
          </section>

          {/* New Britain Packages */}
          <section className="packages-section">
            <div className="section-header">
              <h2>Professional Lawn Care Services</h2>
              <p className="section-subtitle">Professional lawn maintenance plans tailored for New Britain properties</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in New Britain</div>}
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
                      Get New Britain Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* New Britain Areas Served */}
          <section className="location-areas">
            <div className="section-header">
              <h2>New Britain Areas We Serve</h2>
              <p className="section-subtitle">Complete lawn care coverage throughout New Britain, Connecticut</p>
            </div>

            <div className="areas-content">
              <div className="local-areas">
                <h3>New Britain Neighborhoods & Districts</h3>
                <div className="towns-grid">
                  {newBritainAreas.map((area, index) => (
                    <span key={index} className="town">{area}</span>
                  ))}
                </div>
              </div>

              <div className="service-highlights">
                <div className="highlight-item">
                  <h4>🏢 Commercial Properties</h4>
                  <p>Professional lawn maintenance for New Britain businesses, ensuring attractive storefronts and office complexes.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏘️ Residential Areas</h4>
                  <p>Reliable lawn care for all New Britain neighborhoods from historic downtown to suburban developments.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏭 Industrial Areas</h4>
                  <p>Commercial-grade lawn maintenance for New Britain's industrial and business park properties.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Knowledge Section */}
          <section className="local-knowledge">
            <div className="section-header">
              <h2>New Britain Lawn Care Expertise</h2>
            </div>

            <div className="knowledge-content">
              <div className="knowledge-text">
                <h3>We Know New Britain's Lawn Care Needs</h3>
                <p>New Britain's unique location and climate create specific lawn care requirements that we're equipped to handle:</p>
                <ul>
                  <li><strong>Soil Conditions:</strong> Experience with New Britain's varied soil types and drainage patterns</li>
                  <li><strong>Local Climate:</strong> Understanding of Hardware City's weather patterns and growing seasons</li>
                  <li><strong>Grass Varieties:</strong> Knowledge of which grass types thrive best in New Britain's environment</li>
                  <li><strong>Seasonal Care:</strong> Expertise in timing fertilization, aeration, and treatments for optimal results</li>
                </ul>
              </div>
            </div>
          </section>

          <QuoteSection
            title="Need a Detailed New Britain Quote?"
            subtitle="Share a few details about your Hardware City property and we’ll send pricing within a business day."
            locationName="New Britain"
            source="New Britain Lawn Page"
          />

          {/* Contact CTA */}
          <section className="lawn-cta">
            <div className="cta-content">
              <h2>Ready for a Beautiful Lawn in New Britain?</h2>
              <p>Join your New Britain neighbors who trust G&D Landscaping for professional lawn care. Get your free quote today!</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your New Britain Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
              <p className="service-note">Serving New Britain, CT and surrounding areas • Licensed & Insured • Satisfaction Guaranteed</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LawnCareNewBritainPage;
