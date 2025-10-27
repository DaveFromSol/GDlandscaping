import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuoteSection from '../components/QuoteSection';

const SnowRemovalBristolPage = () => {
  const packages = [
    {
      id: 1,
      name: 'Bristol Residential Basic',
      price: '$500/season',
      description: 'Perfect for Bristol homes and driveways',
      features: [
        'Driveway snow plowing (up to 2 cars)',
        'Walkway clearing to front door',
        'Front entrance steps cleared',
        'Priority service during storms',
        '24/7 emergency response in Bristol'
      ]
    },
    {
      id: 2,
      name: 'Bristol Residential Premium',
      price: '$1000/season',
      description: 'Complete snow removal for Bristol properties',
      features: [
        'Full driveway and parking area',
        'All walkways and pathways cleared',
        'Front and back entrances',
        'Salt/sand application',
        'Ice removal services',
        'Priority scheduling for Bristol residents',
        '24/7 emergency response'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Bristol Commercial',
      price: 'Custom Pricing',
      description: 'Professional snow removal for Bristol businesses',
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

  const services = [
    {
      icon: '❄️',
      title: 'Snow Plowing',
      description: 'Professional snow plowing for Bristol driveways, parking lots, and commercial properties'
    },
    {
      icon: '🧂',
      title: 'Salt & Sand Application',
      description: 'Ice prevention and treatment for Bristol properties with quality materials'
    },
    {
      icon: '🏠',
      title: 'Walkway Clearing',
      description: 'Safe passage with thorough walkway and entrance clearing throughout Bristol'
    },
    {
      icon: '⚡',
      title: '24/7 Emergency Service',
      description: 'Round-the-clock availability for Bristol storm emergencies'
    },
    {
      icon: '🚛',
      title: 'Commercial Snow Removal',
      description: 'Large-scale snow removal for Bristol businesses and commercial properties'
    },
    {
      icon: '❄️',
      title: 'Ice Management',
      description: 'Professional ice removal and prevention services for Bristol properties'
    }
  ];

  const bristolAreas = [
    'Downtown Bristol',
    'Forestville',
    'Edgewood',
    'Federal Hill',
    'Bristol Center',
    'Stafford Avenue area',
    'Farmington Avenue area',
    'Lake Avenue area'
  ];

  const overviewHighlights = [
    'Dedicated residential and commercial routes keep Bristol driveways open before the morning commute.',
    'Sidewalk and entry crews follow plow passes to remove lingering ice and windrows.',
    'Commercial lots receive overnight service so parking stalls are clear before opening.'
  ];

  const serviceStats = [
    { value: '4 AM', label: 'First route dispatch' },
    { value: '18', label: 'Dedicated plow loops' },
    { value: '24/7', label: 'Storm monitoring' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Snow Removal Services Bristol CT - GD Landscaping",
    "description": "Professional snow removal and winter maintenance services in Bristol, Connecticut. Seasonal packages available for homes and businesses.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "GD Landscaping",
      "logo": "https://www.gdlandscapingllc.com/GD.png",
      "image": "https://www.gdlandscapingllc.com/GD.png",
      "telephone": "(860) 526-7583",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bristol",
        "addressRegion": "CT",
        "postalCode": "06010"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 41.6718,
        "longitude": -72.9493
      }
    },
    "serviceType": "Snow Removal",
    "areaServed": {
      "@type": "City",
      "name": "Bristol",
      "containedInPlace": {
        "@type": "State",
        "name": "Connecticut"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Snow Removal Bristol CT | Professional Winter Services | GD Landscaping"
        description="Reliable snow removal services in Bristol, Connecticut. Seasonal packages for homes and businesses. Fast response, professional equipment, fully insured. Call (860) 526-7583."
        keywords="snow removal Bristol CT, snow plowing Bristol Connecticut, winter services Bristol, ice management Bristol CT, residential snow removal Bristol, commercial snow plowing Bristol"
        canonicalUrl="https://www.gdlandscapingllc.com/snow-removal-bristol-ct"
        structuredData={structuredData}
      />

      <div className="snow-removal-section">
        {/* Hero Section */}
        <div className="snow-hero">
          <div className="snow-hero-overlay"></div>
          <div className="snow-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>❄️ Serving Bristol, CT</span>
              </div>
              <h1>Professional Snow Removal in Bristol, CT</h1>
              <p className="hero-subtitle">Route-based crews plow, shovel, and de-ice Bristol properties before sunrise, then loop back for cleanups so windrows never block you in.</p>
              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Bristol Winter Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Emergency: (860) 526-7583
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="town-overview">
          <div className="container">
            <div className="town-overview-grid">
              <div className="town-overview-card">
                <h2>Bristol Storm Strategy</h2>
                <p>Snow squalls hit different parts of the city at different times. Our staggered routes and sidewalk teams keep your property clear no matter where you are in Bristol.</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`bristol-snow-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>Bristol Service Snapshot</h3>
                <p>Equipment, salt, and crews are staged across the city for rapid redeployment.</p>
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
          {/* Seasonal Packages */}
          <section className="packages-section">
            <div className="section-header">
              <h2>Bristol Snow Removal Packages</h2>
              <p className="section-subtitle">Choose the perfect winter maintenance package for your Bristol property</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in Bristol</div>}
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
                      Get Bristol Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services Grid */}
          <section className="services-grid-section">
            <div className="section-header">
              <h2>Winter Services for Bristol</h2>
              <p className="section-subtitle">Comprehensive snow and ice management solutions for Bristol properties</p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="location-benefits">
            <div className="section-header">
              <h2>Why Bristol Trusts GD Landscaping</h2>
              <p className="section-subtitle">Serving Bristol with professional winter maintenance expertise</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🏠</div>
                <h3>Serving Bristol</h3>
                <p>Fast response times to every Bristol area with teams that know the streets, traffic patterns, and winter trouble spots.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Quick Response</h3>
                <p>Prompt service when storms hit Bristol. Priority snow removal for reliable access to your home or business.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🚛</div>
                <h3>Professional Equipment</h3>
                <p>Commercial-grade snow plows and salt spreaders sized perfectly for Bristol's residential and commercial properties.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h3>Fair Pricing</h3>
                <p>Competitive seasonal rates for Bristol property owners with transparent, honest pricing. No hidden fees.</p>
              </div>
            </div>
          </section>

          {/* Bristol Areas Served */}
          <section className="location-areas">
            <div className="section-header">
              <h2>Bristol Areas We Serve</h2>
              <p className="section-subtitle">Complete snow removal coverage throughout Bristol, Connecticut</p>
            </div>

            <div className="areas-content">
              <div className="local-areas">
                <h3>Bristol Neighborhoods & Districts</h3>
                <div className="towns-grid">
                  {bristolAreas.map((area, index) => (
                    <span key={index} className="town">{area}</span>
                  ))}
                </div>
              </div>

              <div className="service-highlights">
                <div className="highlight-item">
                  <h4>🏢 Commercial District</h4>
                  <p>Professional snow removal for Bristol businesses, ensuring customer and employee safety throughout the winter.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏘️ Residential Areas</h4>
                  <p>Reliable home snow removal services across every Bristol neighborhood, sized to fit your driveway and walkways.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏭 Business Parks</h4>
                  <p>Commercial snow clearance for Bristol's professional office complexes and business parks.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Knowledge Section */}
          <section className="local-knowledge">
            <div className="section-header">
              <h2>Bristol Winter Expertise</h2>
            </div>

            <div className="knowledge-content">
              <div className="knowledge-text">
                <h3>We Know Bristol's Winter Challenges</h3>
                <p>As a trusted Bristol snow removal service, we understand the specific requirements for safe winter maintenance in your area:</p>
                <ul>
                  <li><strong>Local Streets:</strong> Familiar with Bristol's road network from Route 229 to quiet residential streets</li>
                  <li><strong>Property Types:</strong> Experience with Bristol's mix of historic homes, new developments, and businesses</li>
                  <li><strong>City Requirements:</strong> Know Bristol's regulations and best practices for safe winter maintenance</li>
                  <li><strong>Weather Patterns:</strong> Understanding of how Bristol's location affects snow accumulation and ice formation</li>
                  <li><strong>Storm Response:</strong> Quick mobilization for Bristol properties when winter storms hit</li>
                </ul>
              </div>
            </div>
          </section>

          <QuoteSection
            title="Reserve Your Bristol Snow Route"
            subtitle="Send the address, priorities, and any trouble spots—we’ll reply with the best-fit plan for your property."
            locationName="Bristol Snow"
            source="Bristol Snow Page"
          />

          {/* Contact CTA */}
          <section className="snow-cta">
            <div className="cta-content">
              <h2>Ready for Winter in Bristol?</h2>
              <p>Join your Bristol neighbors who trust GD Landscaping for reliable snow removal. Get your seasonal package today and enjoy peace of mind all winter long!</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Bristol Winter Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
              <p className="service-note">Proudly serving Bristol, CT and surrounding areas • Licensed & Insured • 24/7 Emergency Response</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SnowRemovalBristolPage;
