import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const SnowRemovalHartfordPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Hartford Basic',
      price: '$550/season',
      description: 'Perfect for Hartford residential properties',
      features: [
        'Driveway snow plowing (up to 2 cars)',
        'Walkway clearing to front door',
        'Front entrance steps cleared',
        'Priority service during storms',
        '24/7 emergency response in Hartford'
      ]
    },
    {
      id: 2,
      name: 'Hartford Premium',
      price: '$1100/season',
      description: 'Complete snow removal for Hartford homes',
      features: [
        'Full driveway and parking area',
        'All walkways and pathways cleared',
        'Front and back entrances',
        'Salt/sand application',
        'Ice removal services',
        'Priority scheduling for Hartford residents',
        '24/7 emergency response'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Hartford Commercial',
      price: 'Custom Pricing',
      description: 'Professional snow removal for Hartford businesses',
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
    "name": "Snow Removal Service Hartford CT - GD Landscaping",
    "description": "Professional snow removal services in Hartford, Connecticut. Reliable snow plowing, ice management, and winter maintenance for homes and businesses.",
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
    "url": "https://gdlandscaping.com/snow-removal-hartford-ct",
    "serviceArea": {
      "@type": "City",
      "name": "Hartford, Connecticut"
    }
  };

  return (
    <>
      <SEOHead
        title="Snow Removal Hartford CT | Professional Winter Services | GD Landscaping"
        description="Reliable snow removal services in Hartford, Connecticut. Seasonal packages for homes and businesses. Fast response, professional equipment, fully insured. Call (860) 526-7583."
        keywords="snow removal Hartford CT, snow plowing Hartford Connecticut, winter services Hartford, ice management Hartford CT, residential snow removal Hartford, commercial snow plowing Hartford"
        canonicalUrl="https://gdlandscaping.com/snow-removal-hartford-ct"
        structuredData={structuredData}
      />

      <div className="snow-removal-section">
        <div className="snow-hero">
          <div className="snow-hero-overlay"></div>
          <div className="snow-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>❄️ Serving Hartford, CT</span>
              </div>
              <h1>Snow Removal Service Hartford CT</h1>
              <p className="hero-subtitle">Professional winter maintenance for Hartford residents and businesses. Keep Connecticut's capital city properties safe and accessible all season long with GD Landscaping's reliable snow removal services.</p>
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

        <div className="container">
          <section className="location-benefits">
            <div className="section-header">
              <h2>Why Hartford Chooses GD Landscaping</h2>
              <p className="section-subtitle">We understand Hartford's unique urban winter challenges</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🏛️</div>
                <h3>Know City Requirements</h3>
                <p>Familiar with Hartford city ordinances and sidewalk clearing requirements for businesses and residents.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Fast Urban Response</h3>
                <p>Efficient service to Hartford's dense urban areas with proper equipment for city streets.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🚛</div>
                <h3>Right Equipment</h3>
                <p>Professional snow plows sized appropriately for Hartford's urban streets and varied property types.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h3>Affordable Packages</h3>
                <p>Competitive seasonal rates designed for Hartford's residential and commercial properties.</p>
              </div>
            </div>
          </section>

          <section className="packages-section">
            <div className="section-header">
              <h2>Hartford Snow Removal Packages</h2>
              <p className="section-subtitle">Choose the perfect winter maintenance package for your Hartford property</p>
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
              <p className="section-subtitle">Complete snow removal coverage throughout Hartford, Connecticut</p>
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
                  <h4>🏢 Commercial District</h4>
                  <p>Professional snow removal for downtown Hartford businesses, ensuring customer and employee safety.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏘️ Residential Areas</h4>
                  <p>Reliable home snow removal services throughout all Hartford neighborhoods.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏛️ Government Buildings</h4>
                  <p>Commercial snow clearance for Hartford's institutional and municipal facilities.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="local-knowledge">
            <div className="section-header">
              <h2>Local Hartford Winter Expertise</h2>
            </div>

            <div className="knowledge-content">
              <div className="knowledge-text">
                <h3>We Know Hartford's Winter Challenges</h3>
                <p>Hartford experiences significant snowfall during Connecticut winters, and we understand the unique challenges the capital city faces:</p>
                <ul>
                  <li><strong>City Sidewalk Requirements:</strong> We know Hartford's strict sidewalk clearing ordinances</li>
                  <li><strong>Traffic Patterns:</strong> Familiar with busy areas like Asylum Street and Main Street</li>
                  <li><strong>Urban Properties:</strong> Experience with Hartford's diverse property types from high-rises to row homes</li>
                  <li><strong>Business Districts:</strong> Specialized service for the downtown commercial area and retail centers</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="snow-cta">
            <div className="cta-content">
              <h2>Ready for Winter in Hartford?</h2>
              <p>Join Hartford residents and businesses who trust GD Landscaping for reliable snow removal. Get your seasonal package today!</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Hartford Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
              <p className="service-note">Serving Hartford, CT and surrounding areas • Licensed & Insured • 24/7 Emergency Response</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SnowRemovalHartfordPage;
