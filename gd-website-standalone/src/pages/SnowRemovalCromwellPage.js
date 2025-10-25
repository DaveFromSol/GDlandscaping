import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const SnowRemovalCromwellPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Cromwell Basic',
      price: '$500/season',
      description: 'Perfect for Cromwell residential properties',
      features: [
        'Driveway snow plowing (up to 2 cars)',
        'Walkway clearing to front door',
        'Front entrance steps cleared',
        'Priority service during storms',
        '24/7 emergency response in Cromwell'
      ]
    },
    {
      id: 2,
      name: 'Cromwell Premium',
      price: '$1000/season',
      description: 'Complete snow removal for Cromwell homes',
      features: [
        'Full driveway and parking area',
        'All walkways and pathways cleared',
        'Front and back entrances',
        'Salt/sand application',
        'Ice removal services',
        'Priority scheduling for Cromwell residents',
        '24/7 emergency response'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Cromwell Commercial',
      price: 'Custom Pricing',
      description: 'Professional snow removal for Cromwell businesses',
      features: [
        'Business parking lot clearing',
        'Sidewalk maintenance',
        'Entrance areas kept safe',
        'Salt/sand application',
        'Early morning service before business hours',
        '24/7 emergency response',
        'Liability insurance included'
      ]
    }
  ];

  const cromwellAreas = [
    'Cromwell Center',
    'North Cromwell',
    'South Cromwell',
    'West Side',
    'East Side',
    'Route 9 Corridor',
    'Main Street District',
    'Riverfront Area'
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Snow Removal Service Cromwell CT - GD Landscaping",
    "description": "Professional snow removal services in Cromwell, Connecticut. Reliable snow plowing, ice management, and winter maintenance for homes and businesses.",
    "logo": "https://gdlandscapingllc.com/GD.png",
    "image": "https://gdlandscapingllc.com/GD.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cromwell",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6126,
      "longitude": -72.6581
    },
    "telephone": "(860) 526-7583",
    "url": "https://gdlandscaping.com/snow-removal-cromwell-ct",
    "serviceArea": {
      "@type": "City",
      "name": "Cromwell, Connecticut"
    }
  };

  return (
    <>
      <SEOHead
        title="Snow Removal Cromwell CT | Professional Winter Services | GD Landscaping"
        description="Reliable snow removal services in Cromwell, Connecticut. Seasonal packages for homes and businesses. Fast response, professional equipment, fully insured. Call (860) 526-7583."
        keywords="snow removal Cromwell CT, snow plowing Cromwell Connecticut, winter services Cromwell, ice management Cromwell CT, residential snow removal Cromwell, commercial snow plowing Cromwell"
        canonicalUrl="https://gdlandscaping.com/snow-removal-cromwell-ct"
        structuredData={structuredData}
      />

      <div className="snow-removal-section">
        {/* Cromwell Hero Section */}
        <div className="snow-hero">
          <div className="snow-hero-overlay"></div>
          <div className="snow-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>❄️ Serving Cromwell, CT</span>
              </div>
              <h1>Snow Removal Service Cromwell CT</h1>
              <p className="hero-subtitle">Professional winter maintenance for Cromwell residents and businesses. Keep your Connecticut River town property safe and accessible all season long with GD Landscaping's reliable snow removal services.</p>
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

        <div className="container">
          {/* Cromwell Specific Benefits */}
          <section className="location-benefits">
            <div className="section-header">
              <h2>Why Cromwell Chooses GD Landscaping</h2>
              <p className="section-subtitle">We understand Cromwell's unique geography and winter weather patterns</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🌊</div>
                <h3>River Town Expertise</h3>
                <p>Experience with Cromwell's unique weather patterns influenced by the Connecticut River and varied terrain.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Quick Response</h3>
                <p>Located just minutes away in Berlin, CT - fast response times throughout all Cromwell neighborhoods.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🏘️</div>
                <h3>Residential Focus</h3>
                <p>Specialized service for Cromwell's mix of suburban homes, condos, and waterfront properties.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💼</div>
                <h3>Commercial Ready</h3>
                <p>Professional snow removal for Cromwell's business district and retail centers along Route 9.</p>
              </div>
            </div>
          </section>

          {/* Cromwell Packages */}
          <section className="packages-section">
            <div className="section-header">
              <h2>Cromwell Snow Removal Packages</h2>
              <p className="section-subtitle">Tailored winter maintenance solutions for Cromwell properties</p>
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

          {/* Cromwell Areas Served */}
          <section className="location-areas">
            <div className="section-header">
              <h2>Cromwell Areas We Serve</h2>
              <p className="section-subtitle">Complete snow removal coverage throughout Cromwell, Connecticut</p>
            </div>

            <div className="areas-content">
              <div className="local-areas">
                <h3>Cromwell Neighborhoods & Areas</h3>
                <div className="towns-grid">
                  {cromwellAreas.map((area, index) => (
                    <span key={index} className="town">{area}</span>
                  ))}
                </div>
              </div>

              <div className="service-highlights">
                <div className="highlight-item">
                  <h4>🏢 Business District</h4>
                  <p>Professional snow removal for Cromwell's Main Street businesses and Route 9 commercial areas.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏘️ Residential Communities</h4>
                  <p>Reliable snow removal for all Cromwell neighborhoods, from historic center to newer developments.</p>
                </div>
                <div className="highlight-item">
                  <h4>🌊 Waterfront Properties</h4>
                  <p>Specialized service for Connecticut River waterfront homes and marinas.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Knowledge Section */}
          <section className="local-knowledge">
            <div className="section-header">
              <h2>Local Cromwell Winter Expertise</h2>
            </div>

            <div className="knowledge-content">
              <div className="knowledge-text">
                <h3>We Know Cromwell's Winter Conditions</h3>
                <p>Cromwell's location along the Connecticut River creates unique winter weather challenges that we're equipped to handle:</p>
                <ul>
                  <li><strong>River Effect Weather:</strong> Understanding how the Connecticut River influences local snow patterns</li>
                  <li><strong>Varied Terrain:</strong> Experience with Cromwell's hills, flats, and waterfront elevation changes</li>
                  <li><strong>Route 9 Access:</strong> Ensuring businesses stay accessible during heavy snow events</li>
                  <li><strong>Residential Diversity:</strong> Service for everything from historic homes to modern subdivisions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="snow-cta">
            <div className="cta-content">
              <h2>Ready for Winter in Cromwell?</h2>
              <p>Join your Cromwell neighbors who trust GD Landscaping for reliable snow removal. Secure your seasonal package today!</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Cromwell Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
              <p className="service-note">Serving Cromwell, CT and surrounding areas • Licensed & Insured • 24/7 Emergency Response</p>
            </div>
          </section>
        </div>

      </div>
    </>
  );
};

export default SnowRemovalCromwellPage;