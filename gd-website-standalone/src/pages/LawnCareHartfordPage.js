import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import LocationGallery from '../components/LocationGallery';
import QuoteSection from '../components/QuoteSection';

const LawnCareHartfordPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Hartford Basic',
      price: '$45/visit',
      description: 'Essential lawn care for Hartford homes',
      features: [
        'Weekly mowing during growing season',
        'Edge trimming around walkways',
        'Grass clipping cleanup',
        'Basic weed spot treatment',
        'Reliable Hartford service'
      ]
    },
    {
      id: 2,
      name: 'Hartford Premium',
      price: '$70/visit',
      description: 'Complete lawn maintenance for Hartford properties',
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
      name: 'Hartford Commercial',
      price: 'Custom Pricing',
      description: 'Professional lawn care for Hartford businesses',
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

  const hartfordAreas = [
    'Downtown Hartford',
    'West End',
    'South End',
    'North End',
    'Parkville',
    'Asylum Hill',
    'Frog Hollow',
    'Blue Hills',
    'Upper Albany',
    'Barry Square',
    'Behind the Rocks',
    'Sheldon Charter Oak'
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lawn Care Service Hartford CT - G&D Landscaping",
    "description": "Professional lawn care and maintenance services in Hartford, Connecticut. Weekly mowing, fertilization, and complete yard care for homes and businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hartford",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.7658,
      "longitude": -72.6734
    },
    "telephone": "(860) 526-7583",
    "url": "https://www.gdlandscapingllc.com/lawn-care-hartford-ct",
    "serviceArea": {
      "@type": "City",
      "name": "Hartford, Connecticut"
    }
  };

  const overviewHighlights = [
    'Crew leads familiar with Parkville’s compact lots and the wide estates off Blue Hills Avenue calibrate deck sizes and approach patterns per street.',
    'Integrated turf care—fertilization, weed control, and overseeding—keeps city lots lush even with heavy foot traffic and pets.',
    'Night-before route planning means downtown, Asylum Hill, and South End clients receive service windows before rush-hour parking fills curb lanes.'
  ];

  const serviceStats = [
    { value: '6', label: 'Dedicated Hartford crews' },
    { value: '20+', label: 'Neighborhoods covered' },
    { value: '2 hrs', label: 'Storm follow-up max' }
  ];

  return (
    <>
      <SEOHead
        title="Lawn Care Hartford CT | Professional Lawn Maintenance Services | G&D Landscaping"
        description="Professional lawn care services in Hartford, Connecticut. Weekly mowing, fertilization, weed control, and complete yard maintenance. Serving all Hartford neighborhoods."
        keywords="lawn care Hartford CT, lawn mowing Hartford Connecticut, landscaping Hartford, yard maintenance Hartford CT, fertilization Hartford, weed control Hartford"
        canonicalUrl="https://www.gdlandscapingllc.com/lawn-care-hartford-ct"
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
                <span>🌱 Serving Hartford, CT</span>
              </div>
              <h1>Lawn Care Service Hartford CT</h1>
              <p className="hero-subtitle">Professional lawn maintenance for Hartford residents and businesses. Keep Connecticut's capital city properties looking their best year-round with G&D Landscaping's expert lawn care services.</p>

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
                  Type Your Hartford Address for Instant Lawn Care Quote
                </h2>
                <AddressAutocomplete />
              </div>

              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Hartford Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
            </div>
          </div>
        </div>

        <LocationGallery
          townName="Hartford, CT"
          subtitle="Fresh cuts and bed edging from Asylum Hill to the South End."
        />

        <section className="town-overview">
          <div className="container">
            <div className="town-overview-grid">
              <div className="town-overview-card">
                <h2>Urban Lawn Care That Fits Hartford</h2>
                <p>Between historic brownstones, riverfront businesses, and new apartment communities, Hartford lawns demand flexible equipment and careful timing. We protect delicate irrigation, coordinate around on-street parking, and keep clippings off city drains.</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`hartford-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>Hartford Service Snapshot</h3>
                <p>Supervisors stage in Downtown, Parkville, and Wethersfield Avenue for rapid deployment.</p>
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
          <section className="location-benefits">
            <div className="section-header">
              <h2>Why Hartford Chooses G&D Landscaping</h2>
              <p className="section-subtitle">We understand Hartford's unique urban landscaping needs</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🏛️</div>
                <h3>Urban Expertise</h3>
                <p>Specialized experience with Hartford's diverse property types from historic homes to modern developments.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Fast Response</h3>
                <p>Serving Hartford from nearby Berlin - quick service to all Hartford neighborhoods and reliable scheduling.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🌱</div>
                <h3>Proven Results</h3>
                <p>Track record of healthy, beautiful lawns throughout Hartford's residential and commercial areas.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h3>Fair Pricing</h3>
                <p>Competitive rates designed for Hartford property owners with transparent, honest pricing.</p>
              </div>
            </div>
          </section>

          <section className="packages-section">
            <div className="section-header">
              <h2>Professional Lawn Care Services</h2>
              <p className="section-subtitle">Professional lawn maintenance plans tailored for Hartford properties</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in Hartford</div>}
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
                      Get Hartford Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="location-areas">
            <div className="section-header">
              <h2>Hartford Areas We Serve</h2>
              <p className="section-subtitle">Complete lawn care coverage throughout Hartford, Connecticut</p>
            </div>

            <div className="areas-content">
              <div className="local-areas">
                <h3>Hartford Neighborhoods & Districts</h3>
                <div className="towns-grid">
                  {hartfordAreas.map((area, index) => (
                    <span key={index} className="town">{area}</span>
                  ))}
                </div>
              </div>

              <div className="service-highlights">
                <div className="highlight-item">
                  <h4>🏢 Commercial Properties</h4>
                  <p>Professional lawn maintenance for Hartford businesses, ensuring attractive storefronts and office complexes.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏘️ Residential Areas</h4>
                  <p>Reliable lawn care for all Hartford neighborhoods from historic West End to modern developments.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏛️ Government & Institutions</h4>
                  <p>Commercial-grade lawn maintenance for Hartford's institutional and municipal properties.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="local-knowledge">
            <div className="section-header">
              <h2>Hartford Lawn Care Expertise</h2>
            </div>

            <div className="knowledge-content">
              <div className="knowledge-text">
                <h3>We Know Hartford's Lawn Care Needs</h3>
                <p>Hartford's urban environment creates specific lawn care requirements that we're equipped to handle:</p>
                <ul>
                  <li><strong>Urban Soil Conditions:</strong> Experience with Hartford's varied soil types and urban drainage challenges</li>
                  <li><strong>Local Climate:</strong> Understanding of Hartford's weather patterns and growing seasons</li>
                  <li><strong>Grass Varieties:</strong> Knowledge of which grass types thrive best in Hartford's urban environment</li>
                  <li><strong>City Requirements:</strong> Expertise in Hartford's property maintenance standards and regulations</li>
                </ul>
              </div>
            </div>
          </section>

          <QuoteSection
            title="Get a Detailed Hartford Estimate"
            subtitle="Fill out the request form and our Hartford account manager will deliver a tailored quote."
            locationName="Hartford"
            source="Hartford Lawn Page"
          />

          <section className="lawn-cta">
            <div className="cta-content">
              <h2>Ready for a Beautiful Lawn in Hartford?</h2>
              <p>Join Hartford residents and businesses who trust G&D Landscaping for professional lawn care. Get your free quote today!</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Hartford Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
              <p className="service-note">Serving Hartford, CT and surrounding areas • Licensed & Insured • Satisfaction Guaranteed</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LawnCareHartfordPage;
