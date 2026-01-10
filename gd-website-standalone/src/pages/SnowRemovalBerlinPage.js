import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuoteSection from '../components/QuoteSection';

const SnowRemovalBerlinPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Berlin Basic',
      price: 'Starting at $500/season',
      description: 'Perfect for Berlin residential properties',
      features: [
        'Driveway snow plowing (up to 2 cars)',
        'Walkway clearing to front door',
        'Front entrance steps cleared',
        'Priority service during storms',
        '24/7 emergency response in Berlin'
      ]
    },
    {
      id: 2,
      name: 'Berlin Premium',
      price: 'Starting at $1000/season',
      description: 'Complete snow removal for Berlin homes',
      features: [
        'Full driveway and parking area',
        'All walkways and pathways cleared',
        'Front and back entrances',
        'Salt/sand application',
        'Ice removal services',
        'Priority scheduling for Berlin residents',
        '24/7 emergency response'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Berlin Commercial',
      price: 'Custom Pricing',
      description: 'Professional snow removal for Berlin businesses',
      features: [
        'Business parking lot clearing',
        'Sidewalk maintenance per city requirements',
        'Entrance areas kept safe',
        'Salt/sand application',
        'Early morning service before business hours',
        '24/7 emergency response',
        'Liability insurance included'
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
    'Crew leaders live in Berlin, so plows roll out before 4:30 AM to keep Kensington and East Berlin driveways open ahead of the commute.',
    'Sidewalk crews clear front walks, stoops, and mailbox paths while plow trucks finish the driveway pass to limit refreeze.',
    'Post-storm inspections verify drains along Worthington Ridge stay open so meltwater doesn’t re-freeze across aprons.'
  ];

  const serviceStats = [
    { value: '4:30 AM', label: 'First pass starts' },
    { value: '20+', label: 'Local storm routes' },
    { value: '24/7', label: 'Weather monitoring' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Snow Removal Service Berlin CT - GD Landscaping",
    "description": "Professional snow removal services in Berlin, Connecticut. Reliable snow plowing, ice management, and winter maintenance for homes and businesses.",
    "logo": "https://www.gdlandscapingllc.com/GD.png",
    "image": [
      "https://www.gdlandscapingllc.com/GD_Landscaping_LLC_Snow_removal.JPG",
      "https://www.gdlandscapingllc.com/Gabe_Eltman_GD_Landscaping_LLC.JPG",
      "https://www.gdlandscapingllc.com/snow-plow-clearing-driveway-connecticut.webp"
    ],
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
    "url": "https://www.gdlandscapingllc.com/snow-removal-berlin-ct",
    "serviceArea": {
      "@type": "City",
      "name": "Berlin, Connecticut"
    }
  };

  return (
    <>
      <SEOHead
        title="Snow Removal Berlin CT | Professional Winter Services | GD Landscaping"
        description="Reliable snow removal services in Berlin, Connecticut. Seasonal packages for homes and businesses. Fast response, professional equipment, fully insured. Call (860) 526-7583."
        keywords="snow removal Berlin CT, snow plowing Berlin Connecticut, winter services Berlin, ice management Berlin CT, residential snow removal Berlin, commercial snow plowing Berlin"
        canonicalUrl="https://www.gdlandscapingllc.com/snow-removal-berlin-ct"
        structuredData={structuredData}
      />

      <div className="snow-removal-section">
        {/* Berlin Hero Section */}
        <div className="snow-hero" style={{
          backgroundImage: 'linear-gradient(rgba(30, 58, 138, 0.7), rgba(59, 130, 246, 0.7)), url(/GD_Landscaping_LLC_Snow_removal.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}>
          {/* SEO Image */}
          <img
            src="/GD_Landscaping_LLC_Snow_removal.JPG"
            alt="GD Landscaping snow removal service clearing driveways and parking lots in Berlin CT"
            style={{display: 'none'}}
            width="1920"
            height="1080"
          />
          <div className="snow-hero-overlay"></div>
          <div className="snow-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>❄️ Serving Berlin, CT</span>
              </div>
              <h1>Snow Removal Service Berlin CT</h1>
              <p className="hero-subtitle">Storm-tracking crews clear Berlin driveways, sidewalks, and entrances before the morning rush, then return for follow-up service to keep everything open while temperatures swing.</p>
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

        <section className="town-overview">
          <div className="container">
            <div className="town-overview-grid">
              <div className="town-overview-card">
                <h2>Berlin Winter Readiness</h2>
                <p>Berlin storms stack up quickly on Worthington Ridge and sweep across Kensington. We pre-salt, plow, and return for cleanup so your property never falls behind the weather.</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`berlin-snow-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>Berlin Snow Stats</h3>
                <p>Dedicated plow trucks, sidewalk crews, and loaders are staged inside town limits all winter.</p>
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
              <p className="section-subtitle">We're based right here in Berlin - your local winter maintenance experts</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🏠</div>
                <h3>Based in Berlin</h3>
                <p>We're your neighbors! Fastest possible response times to all Berlin areas including Kensington and East Berlin.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Immediate Response</h3>
                <p>Local Berlin company means we arrive first when storms hit. Priority service for our hometown.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🚛</div>
                <h3>Right Equipment</h3>
                <p>Professional snow plows and salt spreaders sized perfectly for Berlin's residential and commercial properties.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h3>Fair Pricing</h3>
                <p>Competitive seasonal rates for Berlin property owners with transparent, honest pricing.</p>
              </div>
            </div>
          </section>

          {/* Berlin Packages */}
          <section className="packages-section">
            <div className="section-header">
              <h2>Berlin Snow Removal Packages</h2>
              <p className="section-subtitle">Choose the perfect winter maintenance package for your Berlin property</p>
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
              <p className="section-subtitle">Complete snow removal coverage throughout Berlin, Connecticut</p>
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
                  <h4>🏢 Commercial District</h4>
                  <p>Professional snow removal for Berlin businesses, ensuring customer and employee safety.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏘️ Residential Areas</h4>
                  <p>Reliable home snow removal services throughout all Berlin neighborhoods.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏭 Business Parks</h4>
                  <p>Commercial snow clearance for Berlin's professional office complexes and business parks.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Knowledge Section */}
          <section className="local-knowledge">
            <div className="section-header">
              <h2>Local Berlin Winter Expertise</h2>
            </div>

            <div className="knowledge-content">
              <div className="knowledge-text">
                <h3>We Know Berlin's Winter Challenges</h3>
                <p>As your local Berlin snow removal company, we understand every street, hill, and property type in town:</p>
                <ul>
                  <li><strong>Local Streets:</strong> Familiar with every Berlin road from Route 372 to quiet residential streets</li>
                  <li><strong>Property Types:</strong> Experience with Berlin's mix of historic homes, new developments, and businesses</li>
                  <li><strong>City Requirements:</strong> Know Berlin's regulations and best practices for safe winter maintenance</li>
                  <li><strong>Weather Patterns:</strong> Understanding of how Berlin's location affects snow accumulation and ice formation</li>
                </ul>
              </div>
            </div>
          </section>

          <QuoteSection
            title="Request Berlin Snow Removal"
            subtitle="Prefer the traditional form? Share property details and we’ll confirm your route time right away."
            locationName="Berlin Snow"
            source="Berlin Snow Page"
          />

          {/* Contact CTA */}
          <section className="snow-cta">
            <div className="cta-content">
              <h2>Ready for Winter in Berlin?</h2>
              <p>Join your Berlin neighbors who trust GD Landscaping for reliable snow removal. Get your seasonal package today!</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Berlin Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
              <p className="service-note">Proudly serving Berlin, CT and surrounding areas • Licensed & Insured • 24/7 Emergency Response</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SnowRemovalBerlinPage;
