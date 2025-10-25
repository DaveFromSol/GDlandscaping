import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const SnowRemovalNewBritainPage = () => {
  const packages = [
    {
      id: 1,
      name: 'New Britain Basic',
      price: '$500/season',
      description: 'Perfect for New Britain residential properties',
      features: [
        'Driveway snow plowing (up to 2 cars)',
        'Walkway clearing to front door',
        'Front entrance steps cleared',
        'Priority service during storms',
        '24/7 emergency response in New Britain'
      ]
    },
    {
      id: 2,
      name: 'New Britain Premium',
      price: '$1000/season',
      description: 'Complete snow removal for New Britain homes',
      features: [
        'Full driveway and parking area',
        'All walkways and pathways cleared',
        'Front and back entrances',
        'Salt/sand application',
        'Ice removal services',
        'Priority scheduling for New Britain residents',
        '24/7 emergency response'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'New Britain Commercial',
      price: 'Custom Pricing',
      description: 'Professional snow removal for New Britain businesses',
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
    "name": "Snow Removal Service New Britain CT - GD Landscaping",
    "description": "Professional snow removal services in New Britain, Connecticut. Reliable snow plowing, ice management, and winter maintenance for homes and businesses.",
    "logo": "https://gdlandscapingllc.com/GD.png",
    "image": "https://gdlandscapingllc.com/GD.png",
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
    "url": "https://gdlandscaping.com/snow-removal-new-britain-ct",
    "serviceArea": {
      "@type": "City",
      "name": "New Britain, Connecticut"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "New Britain Snow Removal Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Snow Removal New Britain"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Snow Removal New Britain CT | Professional Winter Services | GD Landscaping"
        description="Reliable snow removal services in New Britain, Connecticut. Seasonal packages for homes and businesses. Fast response, professional equipment, fully insured. Call (860) 526-7583."
        keywords="snow removal New Britain CT, snow plowing New Britain Connecticut, winter services New Britain, ice management New Britain CT, residential snow removal New Britain, commercial snow plowing New Britain"
        canonicalUrl="https://gdlandscaping.com/snow-removal-new-britain-ct"
        structuredData={structuredData}
      />

      <div className="snow-removal-section">
        {/* New Britain Hero Section */}
        <div className="snow-hero">
          <div className="snow-hero-overlay"></div>
          <div className="snow-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>❄️ Serving New Britain, CT</span>
              </div>
              <h1>Snow Removal Service New Britain CT</h1>
              <p className="hero-subtitle">Professional winter maintenance for New Britain residents and businesses. Keep your Hardware City property safe and accessible all season long with GD Landscaping's reliable snow removal services.</p>
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

        <div className="container">
          {/* New Britain Specific Benefits */}
          <section className="location-benefits">
            <div className="section-header">
              <h2>Why New Britain Chooses GD Landscaping</h2>
              <p className="section-subtitle">We understand New Britain's unique winter challenges and city requirements</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🏛️</div>
                <h3>Know Local Requirements</h3>
                <p>Familiar with New Britain city ordinances and sidewalk clearing requirements for businesses and residents.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Fast Response Times</h3>
                <p>Based nearby in Berlin, CT - we can reach any New Britain location within 15 minutes during snow events.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🚛</div>
                <h3>Right Equipment</h3>
                <p>Professional snow plows and salt spreaders sized appropriately for New Britain's streets and driveways.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h3>Affordable Packages</h3>
                <p>Competitive seasonal rates designed specifically for New Britain's residential and commercial properties.</p>
              </div>
            </div>
          </section>

          {/* New Britain Packages */}
          <section className="packages-section">
            <div className="section-header">
              <h2>New Britain Snow Removal Packages</h2>
              <p className="section-subtitle">Choose the perfect winter maintenance package for your New Britain property</p>
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
              <p className="section-subtitle">Complete snow removal coverage throughout New Britain, Connecticut</p>
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
                  <h4>🏢 Commercial District</h4>
                  <p>Professional snow removal for downtown New Britain businesses, ensuring customer and employee safety.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏘️ Residential Areas</h4>
                  <p>Reliable home snow removal services throughout all New Britain neighborhoods and subdivisions.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏭 Industrial Zone</h4>
                  <p>Heavy-duty snow clearance for New Britain's industrial and manufacturing facilities.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Knowledge Section */}
          <section className="local-knowledge">
            <div className="section-header">
              <h2>Local New Britain Winter Expertise</h2>
            </div>

            <div className="knowledge-content">
              <div className="knowledge-text">
                <h3>We Know New Britain's Winter Challenges</h3>
                <p>New Britain experiences significant snowfall during Connecticut winters, and we understand the unique challenges Hardware City faces:</p>
                <ul>
                  <li><strong>City Sidewalk Requirements:</strong> We know New Britain's 24-hour sidewalk clearing ordinance</li>
                  <li><strong>Traffic Patterns:</strong> Familiar with busy areas like West Main Street and Berlin Turnpike</li>
                  <li><strong>Residential Layouts:</strong> Experience with New Britain's diverse housing from downtown condos to suburban homes</li>
                  <li><strong>Business Districts:</strong> Specialized service for the downtown commercial area and retail centers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="snow-cta">
            <div className="cta-content">
              <h2>Ready for Winter in New Britain?</h2>
              <p>Join your New Britain neighbors who trust GD Landscaping for reliable snow removal. Get your seasonal package today!</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your New Britain Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
              <p className="service-note">Serving New Britain, CT and surrounding areas • Licensed & Insured • 24/7 Emergency Response</p>
            </div>
          </section>
        </div>

      </div>
    </>
  );
};

export default SnowRemovalNewBritainPage;