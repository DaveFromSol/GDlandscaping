import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuoteSection from '../components/QuoteSection';

const SnowRemovalFarmingtonPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Farmington Residential',
      price: '$550/season',
      description: 'Perfect for Farmington driveways and front walks.',
      features: [
        'Driveway plowing (up to 2 cars)',
        'Walkway + front step clearing',
        'Mailbox and apron cleanup',
        'Priority storm routing',
        '24/7 emergency support'
      ]
    },
    {
      id: 2,
      name: 'Farmington Premium',
      price: '$1050/season',
      description: 'Complete snow removal for Devonwood, Unionville, and hillside estates.',
      features: [
        'Full driveway + parking area',
        'Front + rear entrances',
        'Calcium/salt application',
        'Ice monitoring & removal',
        'Early morning return visits',
        '24/7 emergency response'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Farmington HOA & Commercial',
      price: 'Custom Pricing',
      description: 'Professional snow removal for HOAs, private roads, and businesses.',
      features: [
        'Lot & roadway plowing',
        'Sidewalk maintenance per town code',
        'Entrance + loading dock clearing',
        'Salt/sand application',
        'Storm drain checks',
        'Detailed service reporting'
      ]
    }
  ];

  const serviceBenefits = [
    {
      icon: '🕓',
      title: 'Pre-dawn Dispatch',
      description: 'Routes launch by 4:30 AM so Unionville and Devonwood residents can leave on time.'
    },
    {
      icon: '🚶',
      title: 'Walk & Entry Crews',
      description: 'Dedicated teams clear steps, porches, and sidewalks to meet Farmington ordinances.'
    },
    {
      icon: '🧊',
      title: 'Ice Watch',
      description: 'Calcium, salt, and sand blends are staged near Talcott Mountain and river slopes to stop refreeze.'
    }
  ];

  const farmingtonAreas = [
    'Farmington Village',
    'Unionville',
    'Devonwood',
    'Talcott Mountain',
    'Tunis Hill',
    'Scott Swamp',
    'Route 4 Corridor',
    'Farmington Woods'
  ];

  const overviewHighlights = [
    'Staggered plow loops keep Route 4, Route 177, and key arterials clear while cul-de-sacs stay on schedule.',
    'Sidewalk and shovel crews trail the plows to keep mailboxes, hydrants, and front entries accessible.',
    'Commercial sites along Farmington Avenue receive overnight service so lots are open before business hours.'
  ];

  const serviceStats = [
    { value: '4 AM', label: 'First Farmington pass' },
    { value: '12', label: 'Dedicated crews' },
    { value: '2+', label: 'Visits per storm' }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Snow Removal Service Farmington CT - GD Landscaping',
    description:
      'Professional snow removal services in Farmington, Connecticut. Reliable plowing, shoveling, and ice management for homes, HOAs, and businesses.',
    logo: 'https://www.gdlandscapingllc.com/GD.png',
    image: 'https://www.gdlandscapingllc.com/GD.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Farmington',
      addressRegion: 'CT',
      addressCountry: 'US'
    },
    telephone: '(860) 526-7583',
    url: 'https://www.gdlandscapingllc.com/snow-removal-farmington-ct'
  };

  return (
    <>
      <SEOHead
        title="Snow Removal Farmington CT | Professional Winter Services | GD Landscaping"
        description="Reliable snow removal services in Farmington, Connecticut. Seasonal packages for homes and businesses across Unionville, Devonwood, and Talcott Mountain."
        keywords="snow removal Farmington CT, snow plowing Farmington Connecticut, winter services Farmington, ice management Farmington CT"
        canonicalUrl="https://www.gdlandscapingllc.com/snow-removal-farmington-ct"
        structuredData={structuredData}
      />

      <div className="snow-removal-section">
        <div className="snow-hero">
          <div className="snow-hero-overlay"></div>
          <div className="snow-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>❄️ Serving Farmington, CT</span>
              </div>
              <h1>Snow Removal Service Farmington CT</h1>
              <p className="hero-subtitle">
                Neighborhood-focused crews plow, shovel, and de-ice Farmington Village, Unionville, and Talcott Mountain properties with precise timing so you
                never get snowed in.
              </p>
              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Farmington Quote
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
                <h2>Farmington Storm Coverage</h2>
                <p>
                  Route planning, sidewalk shoveling, and on-call salting keep every neighborhood—from Unionville cul-de-sacs to Farmington Avenue storefronts—
                  open and safe.
                </p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`farmington-snow-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>Farmington Service Snapshot</h3>
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
              <h2>Farmington Snow Removal Packages</h2>
              <p className="section-subtitle">Winter maintenance solutions for Farmington properties</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in Farmington</div>}
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
                      Get Farmington Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="location-benefits">
            <div className="section-header">
              <h2>Why Farmington Chooses GD Landscaping</h2>
              <p className="section-subtitle">Local crews who know every cul-de-sac, condo loop, and commercial plaza.</p>
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
              <h2>Farmington Areas We Keep Clear</h2>
              <p className="section-subtitle">Full coverage for residential streets, HOAs, and business corridors.</p>
            </div>
            <div className="areas-content">
              <div className="local-areas">
                <h3>Neighborhood Coverage</h3>
                <div className="towns-grid">
                  {farmingtonAreas.map((area) => (
                    <span key={area} className="town">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <QuoteSection
            title="Request Farmington Snow Service"
            subtitle="Send your address, driveway layout, and trouble spots—we’ll recommend the right plan."
            locationName="Farmington Snow"
            source="Farmington Snow Page"
          />

          <section className="snow-cta">
            <div className="cta-content">
              <h2>Ready for Winter in Farmington?</h2>
              <p>Join your Farmington neighbors who trust GD Landscaping for reliable snow removal.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Farmington Quote
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

export default SnowRemovalFarmingtonPage;
