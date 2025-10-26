import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

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
              <p className="hero-subtitle">Professional winter maintenance for Newington residents and businesses. Keep your community safe and accessible all season long with reliable snow removal services.</p>
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

        <div className="container">
          <section className="packages-section">
            <div className="section-header">
              <h2>Seasonal Snow Removal Packages</h2>
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