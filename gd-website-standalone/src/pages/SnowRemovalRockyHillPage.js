import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuoteSection from '../components/QuoteSection';

const SnowRemovalRockyHillPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Rocky Hill Basic',
      price: '$500/season',
      description: 'Perfect for Rocky Hill residential properties',
      features: [
        'Driveway snow plowing (up to 2 cars)',
        'Walkway clearing to front door',
        'Front entrance steps cleared',
        'Priority service during storms',
        '24/7 emergency response in Rocky Hill'
      ]
    },
    {
      id: 2,
      name: 'Rocky Hill Premium',
      price: '$1000/season',
      description: 'Complete snow removal for Rocky Hill homes',
      features: [
        'Full driveway and parking area',
        'All walkways and pathways cleared',
        'Front and back entrances',
        'Salt/sand application',
        'Ice removal services',
        'Priority scheduling for Rocky Hill residents',
        '24/7 emergency response'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Rocky Hill Commercial',
      price: 'Custom Pricing',
      description: 'Professional snow removal for Rocky Hill businesses',
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

  const serviceBenefits = [
    {
      icon: '🚨',
      title: 'River Valley Readiness',
      description: 'Crews monitor Route 3 and Dividend Brook to pretreat before river humidity turns into black ice.'
    },
    {
      icon: '🚶‍♂️',
      title: 'Walkway Protection',
      description: 'Sidewalk and step teams keep Ferry Landing and corporate campuses compliant with slip-free access.'
    },
    {
      icon: '🏢',
      title: 'Commercial Priority',
      description: 'Industrial parks along Cromwell Avenue receive loader support and haul-away service when piles get high.'
    }
  ];

  const rockyHillAreas = [
    'Dividend',
    'West Rocky Hill',
    'Silas Deane Highway corridor',
    'Ferry Landing',
    'Route 3 Business District',
    'Cromwell Avenue',
    'Old Main Street',
    'Corporate Ridge'
  ];

  const overviewHighlights = [
    'Riverfront microclimates receive early calcium treatments to keep aprons dry.',
    'Upland cul-de-sacs near Corporate Ridge get plowed twice per storm to counter drifting snow.',
    'Commercial lots along Silas Deane Highway are serviced overnight so traffic can flow at opening.'
  ];

  const serviceStats = [
    { value: '3:45 AM', label: 'First dispatch' },
    { value: '9', label: 'Route crews' },
    { value: '24/7', label: 'Storm monitoring' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Snow Removal Service Rocky Hill CT - GD Landscaping",
    "description": "Professional snow removal services in Rocky Hill, Connecticut. Reliable snow plowing, ice management, and winter maintenance for homes and businesses.",
    "logo": "https://gdlandscapingllc.com/GD.png",
    "image": "https://gdlandscapingllc.com/GD.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rocky Hill",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "telephone": "(860) 526-7583",
    "url": "https://gdlandscapingllc.com/snow-removal-rocky-hill-ct"
  };

  return (
    <>
      <SEOHead
        title="Snow Removal Rocky Hill CT | Professional Winter Services | GD Landscaping"
        description="Reliable snow removal services in Rocky Hill, Connecticut. Seasonal packages for homes and businesses. Fast response, professional equipment, fully insured. Call (860) 526-7583."
        keywords="snow removal Rocky Hill CT, snow plowing Rocky Hill Connecticut, winter services Rocky Hill, ice management Rocky Hill CT, residential snow removal Rocky Hill"
        canonicalUrl="https://gdlandscapingllc.com/snow-removal-rocky-hill-ct"
        structuredData={structuredData}
      />

      <div className="snow-removal-section">
        <div className="snow-hero">
          <div className="snow-hero-overlay"></div>
          <div className="snow-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>❄️ Serving Rocky Hill, CT</span>
              </div>
              <h1>Snow Removal Service Rocky Hill CT</h1>
              <p className="hero-subtitle">River humidity, steep drives, and business corridors each get a dedicated response so Rocky Hill properties stay open from the first flake to final melt.</p>
              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Rocky Hill Quote
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
                <h2>Rocky Hill Storm Coverage</h2>
                <p>We stage plow trucks, skid steers, and sidewalk crews around Rocky Hill so neighborhoods, HOAs, and business parks stay passable.</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`rockyhill-snow-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>Rocky Hill Service Snapshot</h3>
                <p>Dedicated supervisors watch radar and redeploy crews as storms shift.</p>
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
              <h2>Rocky Hill Snow Removal Packages</h2>
              <p className="section-subtitle">Winter maintenance solutions for Rocky Hill properties</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in Rocky Hill</div>}
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
                      Get Rocky Hill Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="location-benefits">
            <div className="section-header">
              <h2>Why Rocky Hill Partners With Us</h2>
              <p className="section-subtitle">Riverfront moisture, steep cul-de-sacs, and busy commercial corridors get tailored care.</p>
            </div>
            <div className="benefits-grid">
              {serviceBenefits.map((benefit) => (
                <div className="benefit-card" key={benefit.title}>
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="location-areas">
            <div className="section-header">
              <h2>Coverage Across Rocky Hill</h2>
              <p className="section-subtitle">From Dividend to Ferry Landing and every plaza in between.</p>
            </div>
            <div className="areas-content">
              <div className="local-areas">
                <h3>Neighborhoods & Districts</h3>
                <div className="towns-grid">
                  {rockyHillAreas.map((area) => (
                    <span key={area} className="town">{area}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <QuoteSection
            title="Reserve Rocky Hill Snow Removal"
            subtitle="Send your address and service priorities so we can confirm the right crew and route timing."
            locationName="Rocky Hill Snow"
            source="Rocky Hill Snow Page"
          />

          <section className="snow-cta">
            <div className="cta-content">
              <h2>Ready for Winter in Rocky Hill?</h2>
              <p>Join your Rocky Hill neighbors who trust GD Landscaping for reliable snow removal.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Rocky Hill Quote
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

export default SnowRemovalRockyHillPage;
