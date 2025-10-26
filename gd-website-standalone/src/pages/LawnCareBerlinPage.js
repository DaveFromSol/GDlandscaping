import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import LocationGallery from '../components/LocationGallery';
import QuoteSection from '../components/QuoteSection';

const LawnCareBerlinPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Berlin Basic',
      price: '$40/visit',
      description: 'Essential lawn care for Berlin homes',
      features: [
        'Weekly mowing during growing season',
        'Edge trimming around walkways',
        'Grass clipping cleanup',
        'Basic weed spot treatment',
        'Reliable Berlin service'
      ]
    },
    {
      id: 2,
      name: 'Berlin Premium',
      price: '$65/visit',
      description: 'Complete lawn maintenance for Berlin properties',
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
      name: 'Berlin Commercial',
      price: 'Custom Pricing',
      description: 'Professional lawn care for Berlin businesses',
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

  const berlinAreas = [
    'Downtown Berlin',
    'Kensington',
    'East Berlin',
    'Worthington Ridge',
    'Berlin Center',
    'Country Club Road area',
    'Mill Street area',
    'Christian Lane area'
  ];

  const overviewHighlights = [
    'Route-optimized crews that service Kensington, East Berlin, and Worthington Ridge multiple times per week for dependable scheduling.',
    'Seasonal programs that pair mowing with fertilization, spot-spraying, and clean bed edges so Berlin lawns hold rich color through August.',
    'On-call quality checks after heavy rain to make sure slopes off Chamberlain Highway stay safe and ruts-free.'
  ];

  const serviceStats = [
    { value: '24 hrs', label: 'Average callback' },
    { value: '12+', label: 'Berlin neighborhoods' },
    { value: '4.9/5', label: 'Client rating' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lawn Care Service Berlin CT - GD Landscaping",
    "description": "Professional lawn care and maintenance services in Berlin, Connecticut. Weekly mowing, fertilization, and complete yard care for homes and businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Berlin",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6217,
      "longitude": -72.7551
    },
    "telephone": "(860) 526-7583",
    "url": "https://gdlandscapingllc.com/lawn-care-berlin-ct",
    "serviceArea": {
      "@type": "City",
      "name": "Berlin, Connecticut"
    }
  };

  return (
    <>
      <SEOHead
        title="Lawn Care Berlin CT | Professional Lawn Maintenance Services | GD Landscaping"
        description="Professional lawn care services in Berlin, Connecticut. Weekly mowing, fertilization, weed control, and complete yard maintenance. Serving all Berlin neighborhoods."
        keywords="lawn care Berlin CT, lawn mowing Berlin Connecticut, landscaping Berlin, yard maintenance Berlin CT, fertilization Berlin, weed control Berlin"
        canonicalUrl="https://gdlandscapingllc.com/lawn-care-berlin-ct"
        structuredData={structuredData}
      />

      <div className="lawn-care-section">
        {/* Berlin Hero Section */}
        <div className="lawn-hero">
          <div className="lawn-hero-video">
            <video autoPlay muted loop playsInline preload="auto" poster="/IMG_5407.jpeg">
              <source src="/AdobeStock_657294798.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="lawn-hero-overlay"></div>
          <div className="lawn-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>🌱 Serving Berlin, CT</span>
              </div>
              <h1>Lawn Care Service Berlin CT</h1>
              <p className="hero-subtitle">Professional lawn maintenance for Berlin residents and businesses. Your local Berlin landscaping experts dedicated to keeping your property beautiful year-round.</p>

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
                  Type Your Berlin Address for Instant Lawn Care Quote
                </h2>
                <AddressAutocomplete />
              </div>

              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Berlin Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
            </div>
          </div>
        </div>

        <LocationGallery
          townName="Berlin, CT"
          subtitle="A quick look at the weekly mowing, edging, and bed care we provide around Kensington, East Berlin, and Worthington Ridge."
        />

        <section className="town-overview">
          <div className="container">
            <div className="town-overview-grid">
              <div className="town-overview-card">
                <h2>Hyper-Local Berlin Lawn Care</h2>
                <p>Berlin properties span hilly Worthington Ridge estates, Kensington cul-de-sacs, and compact downtown lots. We tailor cut heights, striping patterns, and clean-up routines for each micro area so every yard keeps a consistent, high-end finish.</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`berlin-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>Berlin Service Snapshot</h3>
                <p>We keep a dedicated crew, trailer, and standby equipment in town all season.</p>
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
          {/* Berlin Specific Benefits */}
          <section className="location-benefits">
            <div className="section-header">
              <h2>Why Berlin Chooses GD Landscaping</h2>
              <p className="section-subtitle">We're based right here in Berlin - your local lawn care experts</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🏠</div>
                <h3>Local Expertise</h3>
                <p>Based in Berlin, CT - we know your soil, climate, and grass varieties better than anyone.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Fast Response</h3>
                <p>Your neighbor in Berlin - immediate service to all areas including Kensington and East Berlin.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🌱</div>
                <h3>Proven Results</h3>
                <p>Track record of beautiful, healthy lawns throughout Berlin's residential and commercial properties.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h3>Fair Pricing</h3>
                <p>Competitive rates for Berlin property owners with transparent, honest pricing.</p>
              </div>
            </div>
          </section>

          {/* Berlin Packages */}
          <section className="packages-section">
            <div className="section-header">
              <h2>Professional Lawn Care Services</h2>
              <p className="section-subtitle">Professional lawn maintenance plans tailored for Berlin properties</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in Berlin</div>}
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
                      Get Berlin Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Berlin Areas Served */}
          <section className="location-areas">
            <div className="section-header">
              <h2>Berlin Areas We Serve</h2>
              <p className="section-subtitle">Complete lawn care coverage throughout Berlin, Connecticut</p>
            </div>

            <div className="areas-content">
              <div className="local-areas">
                <h3>Berlin Neighborhoods & Districts</h3>
                <div className="towns-grid">
                  {berlinAreas.map((area, index) => (
                    <span key={index} className="town">{area}</span>
                  ))}
                </div>
              </div>

              <div className="service-highlights">
                <div className="highlight-item">
                  <h4>🏢 Commercial Properties</h4>
                  <p>Professional lawn maintenance for Berlin businesses, ensuring attractive storefronts and office complexes.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏘️ Residential Areas</h4>
                  <p>Reliable lawn care for all Berlin neighborhoods from downtown to Kensington and East Berlin.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏭 Industrial Areas</h4>
                  <p>Commercial-grade lawn maintenance for Berlin's business park properties.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Knowledge Section */}
          <section className="local-knowledge">
            <div className="section-header">
              <h2>Berlin Lawn Care Expertise</h2>
            </div>

            <div className="knowledge-content">
              <div className="knowledge-text">
                <h3>We Know Berlin's Lawn Care Needs</h3>
                <p>As your local Berlin landscaping company, we understand the specific requirements for beautiful lawns in our area:</p>
                <ul>
                  <li><strong>Soil Conditions:</strong> Expert knowledge of Berlin's soil types and drainage patterns</li>
                  <li><strong>Local Climate:</strong> Understanding of Berlin's weather patterns and growing seasons</li>
                  <li><strong>Grass Varieties:</strong> Knowledge of which grass types thrive best in Berlin's environment</li>
                  <li><strong>Seasonal Care:</strong> Expertise in timing fertilization, aeration, and treatments for optimal results</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <QuoteSection
            title="Need a Detailed Berlin Quote?"
            subtitle="Send us a few property details and our Berlin team will follow up with personalized pricing."
            locationName="Berlin"
            source="Berlin Lawn Page"
          />

          {/* Contact CTA */}
          <section className="lawn-cta">
            <div className="cta-content">
              <h2>Ready for a Beautiful Lawn in Berlin?</h2>
              <p>Join your Berlin neighbors who trust GD Landscaping for professional lawn care. Get your free quote today!</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Berlin Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
              <p className="service-note">Proudly serving Berlin, CT and surrounding areas • Licensed & Insured • Satisfaction Guaranteed</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LawnCareBerlinPage;
