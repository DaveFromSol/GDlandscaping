import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

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
    "url": "https://gdlandscaping.com/snow-removal-rocky-hill-ct"
  };

  return (
    <>
      <SEOHead
        title="Snow Removal Rocky Hill CT | Professional Winter Services | GD Landscaping"
        description="Reliable snow removal services in Rocky Hill, Connecticut. Seasonal packages for homes and businesses. Fast response, professional equipment, fully insured. Call (860) 526-7583."
        keywords="snow removal Rocky Hill CT, snow plowing Rocky Hill Connecticut, winter services Rocky Hill, ice management Rocky Hill CT, residential snow removal Rocky Hill"
        canonicalUrl="https://gdlandscaping.com/snow-removal-rocky-hill-ct"
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
              <p className="hero-subtitle">Professional winter maintenance for Rocky Hill residents and businesses. Keep your Connecticut River community safe and accessible all season long.</p>
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