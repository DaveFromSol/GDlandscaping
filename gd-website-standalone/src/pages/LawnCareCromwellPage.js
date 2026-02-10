import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import LocationGallery from '../components/LocationGallery';
import QuoteSection from '../components/QuoteSection';

const LawnCareCromwellPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Cromwell Basic',
      price: '$40/visit',
      description: 'Essential lawn care for Cromwell homes',
      features: [
        'Weekly mowing during growing season',
        'Edge trimming around walkways',
        'Grass clipping cleanup',
        'Basic weed spot treatment',
        'Reliable Cromwell service'
      ]
    },
    {
      id: 2,
      name: 'Cromwell Premium',
      price: '$65/visit',
      description: 'Complete lawn maintenance for Cromwell properties',
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
      name: 'Cromwell Commercial',
      price: 'Custom Pricing',
      description: 'Professional lawn care for Cromwell businesses',
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
    "name": "Lawn Care Service Cromwell CT - G&D Landscaping",
    "description": "Professional lawn care and maintenance services in Cromwell, Connecticut. Weekly mowing, fertilization, and complete yard care for homes and businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cromwell",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "telephone": "(860) 526-7583",
    "url": "https://www.gdlandscapingllc.com/lawn-care-cromwell-ct"
  };

  const overviewHighlights = [
    'Irrigation-friendly mowing schedules for River Highlands and Court Street slopes where drainage runs toward the Connecticut River.',
    'Detail-focused crews that handle bed edging, walkway trimming, and seasonal color change-outs for Main Street store fronts.',
    'Flexible service windows for TPC River Highlands-adjacent neighborhoods where commuter traffic peaks early.'
  ];

  const serviceStats = [
    { value: '15', label: 'Cromwell crews on call' },
    { value: '20 min', label: 'Average dispatch ETA' },
    { value: '100%', label: 'Storm follow-up checks' }
  ];

  return (
    <>
      <SEOHead
        title="Lawn Care Cromwell CT | Professional Lawn Maintenance Services | G&D Landscaping"
        description="Professional lawn care services in Cromwell, Connecticut. Weekly mowing, fertilization, weed control, and complete yard maintenance for all Cromwell neighborhoods."
        keywords="lawn care Cromwell CT, lawn mowing Cromwell Connecticut, landscaping Cromwell, yard maintenance Cromwell CT, fertilization Cromwell, weed control Cromwell"
        canonicalUrl="https://www.gdlandscapingllc.com/lawn-care-cromwell-ct"
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
                <span>🌱 Serving Cromwell, CT</span>
              </div>
              <h1>Lawn Care Service Cromwell CT</h1>
              <p className="hero-subtitle">Professional lawn maintenance for Cromwell residents and businesses. Keep your Connecticut River town property looking pristine with expert lawn care services.</p>

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
                  Type Your Cromwell Address for Instant Lawn Care Quote
                </h2>
                <AddressAutocomplete />
              </div>

              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Cromwell Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
            </div>
          </div>
        </div>

        <LocationGallery
          townName="Cromwell, CT"
          subtitle="Real project snapshots from Riverport, Nooks Hill, and the neighborhoods flanking Main Street."
        />

        <section className="town-overview">
          <div className="container">
            <div className="town-overview-grid">
              <div className="town-overview-card">
                <h2>Cromwell Lawn Intelligence</h2>
                <p>Riverfront moisture, clay-heavy soil, and mature shade trees require different approaches across Cromwell. We tighten up mower decks near the bluffs, leave longer blades in river bottoms, and schedule aeration right after fall tournaments.</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`cromwell-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>Cromwell Service Snapshot</h3>
                <p>Every route is backed by on-call supervisors who inspect after storms or large events.</p>
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
              <h2>Why Cromwell Chooses G&D Landscaping</h2>
              <p className="section-subtitle">We understand Cromwell's riverfront environment and unique growing conditions</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🌊</div>
                <h3>River Town Expertise</h3>
                <p>Experience with Cromwell's unique microclimate influenced by the Connecticut River and varying soil conditions.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Quick Service</h3>
                <p>Located minutes away in Berlin, CT - fast response times and reliable weekly scheduling throughout Cromwell.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🏘️</div>
                <h3>Diverse Properties</h3>
                <p>Experience with Cromwell's mix of waterfront homes, suburban lawns, and commercial properties along Route 9.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💼</div>
                <h3>Professional Standards</h3>
                <p>High-quality lawn care that maintains Cromwell's reputation as a well-maintained Connecticut community.</p>
              </div>
            </div>
          </section>

          <section className="packages-section">
            <div className="section-header">
              <h2>Professional Lawn Care Services</h2>
              <p className="section-subtitle">Tailored lawn maintenance solutions for Cromwell properties</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in Cromwell</div>}
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
                      Get Cromwell Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <QuoteSection
            title="Ready for a Cromwell Quote?"
            subtitle="Send us the basics about your Connecticut River property and we’ll reply with a detailed estimate ASAP."
            locationName="Cromwell"
            source="Cromwell Lawn Page"
          />

          <section className="lawn-cta">
            <div className="cta-content">
              <h2>Ready for a Beautiful Lawn in Cromwell?</h2>
              <p>Join your Cromwell neighbors who trust G&D Landscaping for professional lawn care.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Cromwell Quote
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

export default LawnCareCromwellPage;
