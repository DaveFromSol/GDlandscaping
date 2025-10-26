import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuoteSection from '../components/QuoteSection';

const SnowRemovalNewingtonPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Newington Basic',
      price: '$500/season',
      description: 'Perfect for Newington residential properties',
      features: [
        'Driveway snow plowing (up to 2 cars)',
        'Walkway clearing to front door',
        'Front entrance steps cleared',
        'Priority service during storms',
        '24/7 emergency response in Newington'
      ]
    },
    {
      id: 2,
      name: 'Newington Premium',
      price: '$1000/season',
      description: 'Complete snow removal for Newington homes',
      features: [
        'Full driveway and parking area',
        'All walkways and pathways cleared',
        'Front and back entrances',
        'Salt/sand application',
        'Ice removal services',
        'Priority scheduling for Newington residents',
        '24/7 emergency response'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Newington Commercial',
      price: 'Custom Pricing',
      description: 'Professional snow removal for Newington businesses',
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
      icon: '🕓',
      title: 'Pre-dawn Dispatch',
      description: 'Routes begin before 4:30 AM so Maple Hill and Newington Center driveways are open before commuters roll out.'
    },
    {
      icon: '🚶',
      title: 'Walk & Entry Teams',
      description: 'Dedicated crews clear steps, porches, and city sidewalks to stay compliant with Newington ordinances.'
    },
    {
      icon: '🧊',
      title: 'Ice Watch',
      description: 'Calcium, salt, and sand blends are staged near Cedar Mountain and Willard slopes to stop refreeze.'
    }
  ];

  const newingtonAreas = [
    'Newington Center',
    'Maple Hill',
    'Willard District',
    'Cedar Mountain',
    'Church Street Corridor',
    'DiCenzo Area',
    'Berlin Turnpike Businesses',
    'North End'
  ];

  const overviewHighlights = [
    'Staggered plow loops keep arterial roads like Cedar Street and Willard Avenue clear while residential courts stay on schedule.',
    'Sidewalk and shovel crews follow each pass to keep mailboxes, front walks, and hydrants accessible.',
    'Commercial properties along the Berlin Turnpike receive overnight service so lots are open before customers arrive.'
  ];

  const serviceStats = [
    { value: '4 AM', label: 'First Newington pass' },
    { value: '10', label: 'Dedicated crews' },
    { value: '2', label: 'Visits per storm' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Snow Removal Service Newington CT - GD Landscaping",
    "description": "Professional snow removal services in Newington, Connecticut. Reliable snow plowing, ice management, and winter maintenance for homes and businesses.",
    "logo": "https://gdlandscapingllc.com/GD.png",
    "image": "https://gdlandscapingllc.com/GD.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Newington",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "telephone": "(860) 526-7583",
    "url": "https://gdlandscapingllc.com/snow-removal-newington-ct"
  };

  return (
    <>
      <SEOHead
        title="Snow Removal Newington CT | Professional Winter Services | GD Landscaping"
        description="Reliable snow removal services in Newington, Connecticut. Seasonal packages for homes and businesses. Fast response, professional equipment, fully insured. Call (860) 526-7583."
        keywords="snow removal Newington CT, snow plowing Newington Connecticut, winter services Newington, ice management Newington CT, residential snow removal Newington"
        canonicalUrl="https://gdlandscapingllc.com/snow-removal-newington-ct"
        structuredData={structuredData}
      />

      <div className="snow-removal-section">
        <div className="snow-hero">
          <div className="snow-hero-overlay"></div>
          <div className="snow-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>❄️ Serving Newington, CT</span>
              </div>
              <h1>Snow Removal Service Newington CT</h1>
              <p className="hero-subtitle">Neighborhood-focused crews plow, shovel, and de-ice Newington Center, Maple Hill, and Cedar Mountain properties with precise timing so you never get snowed in.</p>
              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Newington Quote
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
                <h2>Newington Storm Coverage</h2>
                <p>Route planning, sidewalk shoveling, and on-call salting keep every neighborhood—from Maple Hill cul-de-sacs to Berlin Turnpike storefronts—open and safe.</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`newington-snow-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>Newington Service Snapshot</h3>
                <p>Same crew leaders return for every storm so communication stays easy.</p>
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
              <h2>Newington Snow Removal Packages</h2>
              <p className="section-subtitle">Winter maintenance solutions for Newington properties</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in Newington</div>}
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
                      Get Newington Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="location-benefits">
            <div className="section-header">
              <h2>Why Newington Chooses GD Landscaping</h2>
              <p className="section-subtitle">Local crews who know every cul-de-sac, condo loop, and commercial plaza.</p>
            </div>

            <div className="benefits-grid">
              {serviceBenefits.map((benefit, index) => (
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
              <h2>Newington Areas We Keep Clear</h2>
              <p className="section-subtitle">Full coverage for residential streets, HOAs, and business corridors.</p>
            </div>
            <div className="areas-content">
              <div className="local-areas">
                <h3>Neighborhood Coverage</h3>
                <div className="towns-grid">
                  {newingtonAreas.map((area) => (
                    <span key={area} className="town">{area}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <QuoteSection
            title="Request Newington Snow Service"
            subtitle="Send your address, driveway layout, and any trouble spots—we’ll recommend the right plan."
            locationName="Newington Snow"
            source="Newington Snow Page"
          />

          <section className="snow-cta">
            <div className="cta-content">
              <h2>Ready for Winter in Newington?</h2>
              <p>Join your Newington neighbors who trust GD Landscaping for reliable snow removal.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Newington Quote
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

export default SnowRemovalNewingtonPage;
