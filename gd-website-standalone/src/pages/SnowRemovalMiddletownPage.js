import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuoteSection from '../components/QuoteSection';

const SnowRemovalMiddletownPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Middletown Basic',
      price: 'Starting at $500/season',
      description: 'Perfect for Middletown residential properties',
      features: [
        'Driveway snow plowing (up to 2 cars)',
        'Walkway clearing to front door',
        'Front entrance steps cleared',
        'Priority service during storms',
        '24/7 emergency response in Middletown'
      ]
    },
    {
      id: 2,
      name: 'Middletown Premium',
      price: 'Starting at $1000/season',
      description: 'Complete snow removal for Middletown homes',
      features: [
        'Full driveway and parking area',
        'All walkways and pathways cleared',
        'Front and back entrances',
        'Salt/sand application',
        'Ice removal services',
        'Priority scheduling for Middletown residents',
        '24/7 emergency response'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Middletown Commercial',
      price: 'Custom Pricing',
      description: 'Professional snow removal for Middletown businesses',
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

  const middletownAreas = [
    'Downtown Middletown',
    'North End',
    'South Farms',
    'Westlake',
    'East Side',
    'Wesleyan University area',
    'Main Street District',
    'Industrial Park'
  ];

  const overviewHighlights = [
    'Campus-adjacent crews clear Wesleyan neighborhoods before students and staff head out.',
    'South Farms, Highland, and East Side drives receive pre-treatment to offset drifting snow.',
    'Commercial and medical corridors along Main Street and Saybrook Road get overnight service so parking spots are open by dawn.'
  ];

  const serviceStats = [
    { value: '4 AM', label: 'Route kickoff' },
    { value: '14', label: 'Middletown loops' },
    { value: '30 min', label: 'Average follow-up' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Snow Removal Service Middletown CT - G&D Landscaping",
    "description": "Professional snow removal services in Middletown, Connecticut. Reliable snow plowing, ice management, and winter maintenance for homes and businesses.",
    "logo": "https://www.gdlandscapingllc.com/GD.png",
    "image": [
      "https://www.gdlandscapingllc.com/GD_Landscaping_LLC_Snow_removal.JPG",
      "https://www.gdlandscapingllc.com/Gabe_Eltman_GD_Landscaping_LLC.JPG",
      "https://www.gdlandscapingllc.com/snow-plow-clearing-driveway-connecticut.webp"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Middletown",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.5623,
      "longitude": -72.6506
    },
    "telephone": "(860) 526-7583",
    "url": "https://www.gdlandscapingllc.com/snow-removal-middletown-ct",
    "serviceArea": {
      "@type": "City",
      "name": "Middletown, Connecticut"
    }
  };

  return (
    <>
      <SEOHead
        title="Snow Removal Middletown CT | Professional Winter Services | G&D Landscaping"
        description="Reliable snow removal services in Middletown, Connecticut. Seasonal packages for homes and businesses. Fast response, professional equipment, fully insured. Call (860) 526-7583."
        keywords="snow removal Middletown CT, snow plowing Middletown Connecticut, winter services Middletown, ice management Middletown CT, residential snow removal Middletown, commercial snow plowing Middletown"
        canonicalUrl="https://www.gdlandscapingllc.com/snow-removal-middletown-ct"
        structuredData={structuredData}
      />

      <div className="snow-removal-section">
        {/* Middletown Hero Section */}
        <div className="snow-hero" style={{
          backgroundImage: 'linear-gradient(rgba(30, 58, 138, 0.7), rgba(59, 130, 246, 0.7)), url(/GD_Landscaping_LLC_Snow_removal.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}>
          {/* SEO Image */}
          <img
            src="/GD_Landscaping_LLC_Snow_removal.JPG"
            alt="G&D Landscaping professional snow removal service in Connecticut"
            style={{display: 'none'}}
            width="1920"
            height="1080"
          />
          <div className="snow-hero-overlay"></div>
          <div className="snow-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>❄️ Serving Middletown, CT</span>
              </div>
              <h1>Snow Removal Service Middletown CT</h1>
              <p className="hero-subtitle">Campus traffic, riverfront wind, and steep neighborhoods demand precise winter care. Our crews plow, shovel, and de-ice every corner of Middletown on schedule.</p>
              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Middletown Quote
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
                <h2>Middletown Storm Coverage</h2>
                <p>University blocks, downtown storefronts, and hillside neighborhoods each have unique winter demands. We tailor equipment and timing for every zone.</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`middletown-snow-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>Middletown Service Snapshot</h3>
                <p>Seasonal contracts include proactive check-ins during back-to-back storms.</p>
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
          {/* Middletown Specific Benefits */}
          <section className="location-benefits">
            <div className="section-header">
              <h2>Why Middletown Chooses G&D Landscaping</h2>
              <p className="section-subtitle">We understand Middletown's diverse community and winter service needs</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🎓</div>
                <h3>University Town Expertise</h3>
                <p>Experience serving Middletown's unique mix of residential, commercial, and university-related properties.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Fast Service</h3>
                <p>Quick response from our nearby Berlin location to all areas of Middletown during winter storms.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🏘️</div>
                <h3>Diverse Properties</h3>
                <p>Experienced with Middletown's variety of housing from historic downtown to modern suburban developments.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🏢</div>
                <h3>Business District Ready</h3>
                <p>Professional snow removal for Main Street businesses, restaurants, and the thriving downtown area.</p>
              </div>
            </div>
          </section>

          {/* Middletown Packages */}
          <section className="packages-section">
            <div className="section-header">
              <h2>Middletown Snow Removal Packages</h2>
              <p className="section-subtitle">Winter maintenance solutions designed for Middletown properties</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in Middletown</div>}
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
                      Get Middletown Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Middletown Areas Served */}
          <section className="location-areas">
            <div className="section-header">
              <h2>Middletown Areas We Serve</h2>
              <p className="section-subtitle">Complete snow removal coverage throughout Middletown, Connecticut</p>
            </div>

            <div className="areas-content">
              <div className="local-areas">
                <h3>Middletown Neighborhoods & Districts</h3>
                <div className="towns-grid">
                  {middletownAreas.map((area, index) => (
                    <span key={index} className="town">{area}</span>
                  ))}
                </div>
              </div>

              <div className="service-highlights">
                <div className="highlight-item">
                  <h4>🎓 University Area</h4>
                  <p>Specialized snow removal near Wesleyan University including student housing and campus-adjacent properties.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏢 Downtown District</h4>
                  <p>Professional service for Middletown's vibrant Main Street business district and historic downtown area.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏘️ Residential Areas</h4>
                  <p>Reliable snow removal for all Middletown neighborhoods from historic areas to newer developments.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Knowledge Section */}
          <section className="local-knowledge">
            <div className="section-header">
              <h2>Local Middletown Winter Expertise</h2>
            </div>

            <div className="knowledge-content">
              <div className="knowledge-text">
                <h3>We Know Middletown's Winter Needs</h3>
                <p>Middletown's unique character as a university town with a thriving downtown creates specific winter service requirements:</p>
                <ul>
                  <li><strong>University Schedule:</strong> Understanding academic calendar needs and student housing requirements</li>
                  <li><strong>Downtown Vitality:</strong> Keeping Main Street businesses accessible during peak winter months</li>
                  <li><strong>Mixed Housing:</strong> Experience with everything from historic homes to modern apartments</li>
                  <li><strong>Community Events:</strong> Ensuring safe access for Middletown's active cultural and community life</li>
                </ul>
              </div>
            </div>
          </section>

          <QuoteSection
            title="Request Middletown Snow Service"
            subtitle="Share your address plus priority areas and we’ll finalize a route spot for your property."
            locationName="Middletown Snow"
            source="Middletown Snow Page"
          />

          {/* Contact CTA */}
          <section className="snow-cta">
            <div className="cta-content">
              <h2>Ready for Winter in Middletown?</h2>
              <p>Join your Middletown neighbors who trust G&D Landscaping for reliable snow removal. Get your seasonal package today!</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Middletown Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
              <p className="service-note">Serving Middletown, CT and surrounding areas • Licensed & Insured • 24/7 Emergency Response</p>
            </div>
          </section>
        </div>

      </div>
    </>
  );
};

export default SnowRemovalMiddletownPage;
