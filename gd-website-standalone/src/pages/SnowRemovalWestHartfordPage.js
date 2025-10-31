import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuoteSection from '../components/QuoteSection';

const SnowRemovalWestHartfordPage = () => {
  const packages = [
    {
      id: 1,
      name: 'West Hartford Residential Basic',
      price: 'Starting at $500/season',
      description: 'Perfect for West Hartford homes and driveways',
      features: [
        'Driveway snow plowing (up to 2 cars)',
        'Walkway clearing to front door',
        'Front entrance steps cleared',
        'Priority service during storms',
        '24/7 emergency response in West Hartford'
      ]
    },
    {
      id: 2,
      name: 'West Hartford Residential Premium',
      price: 'Starting at $1000/season',
      description: 'Complete snow removal for West Hartford properties',
      features: [
        'Full driveway and parking area',
        'All walkways and pathways cleared',
        'Front and back entrances',
        'Salt/sand application',
        'Ice removal services',
        'Priority scheduling for West Hartford residents',
        '24/7 emergency response'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'West Hartford Commercial',
      price: 'Custom Pricing',
      description: 'Professional snow removal for West Hartford businesses',
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
      description: 'Professional snow plowing for West Hartford driveways, parking lots, and commercial properties'
    },
    {
      icon: '🧂',
      title: 'Salt & Sand Application',
      description: 'Ice prevention and treatment for West Hartford properties with quality materials'
    },
    {
      icon: '🏠',
      title: 'Walkway Clearing',
      description: 'Safe passage with thorough walkway and entrance clearing throughout West Hartford'
    },
    {
      icon: '⚡',
      title: '24/7 Emergency Service',
      description: 'Round-the-clock availability for West Hartford storm emergencies'
    },
    {
      icon: '🚛',
      title: 'Commercial Snow Removal',
      description: 'Large-scale snow removal for West Hartford businesses and commercial properties'
    },
    {
      icon: '❄️',
      title: 'Ice Management',
      description: 'Professional ice removal and prevention services for West Hartford properties'
    }
  ];

  const westHartfordAreas = [
    'West Hartford Center',
    'Elmwood',
    'Bishop\'s Corner',
    'Blue Back Square',
    'Prospect Hill',
    'Sunset Ridge',
    'Fern Street',
    'Conard'
  ];

  const overviewHighlights = [
    'Dedicated plow and sidewalk teams start in West Hartford Center and Elmwood before retail traffic ramps up.',
    'Narrow streets in the West End receive smaller equipment to protect historic curbs and stone walls.',
    'Commercial plazas along New Britain Avenue and Park Road are cleared overnight for early shoppers and diners.'
  ];

  const serviceStats = [
    { value: '3:30 AM', label: 'First dispatch' },
    { value: '20+', label: 'Neighborhood loops' },
    { value: '2', label: 'Average passes/storm' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Snow Removal Services West Hartford CT - GD Landscaping",
    "description": "Professional snow removal and winter maintenance services in West Hartford, Connecticut. Seasonal packages available for homes and businesses.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "GD Landscaping",
      "logo": "https://www.gdlandscapingllc.com/GD.png",
      "image": "https://www.gdlandscapingllc.com/GD.png",
      "telephone": "(860) 526-7583",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "West Hartford",
        "addressRegion": "CT",
        "postalCode": "06107"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 41.7620,
        "longitude": -72.7420
      }
    },
    "serviceType": "Snow Removal",
    "areaServed": {
      "@type": "City",
      "name": "West Hartford",
      "containedInPlace": {
        "@type": "State",
        "name": "Connecticut"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Snow Removal West Hartford CT | Professional Winter Services | GD Landscaping"
        description="Reliable snow removal services in West Hartford, Connecticut. Seasonal packages for homes and businesses. Fast response, professional equipment, fully insured. Call (860) 526-7583."
        keywords="snow removal West Hartford CT, snow plowing West Hartford Connecticut, winter services West Hartford, ice management West Hartford CT, residential snow removal West Hartford, commercial snow plowing West Hartford, West Hartford Center snow removal, Elmwood winter services"
        canonicalUrl="https://www.gdlandscapingllc.com/snow-removal-west-hartford-ct"
        structuredData={structuredData}
      />

      <div className="snow-removal-section">
        {/* Hero Section */}
        <div className="snow-hero">
          <div className="snow-hero-overlay"></div>
          <div className="snow-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>❄️ Serving West Hartford, CT</span>
              </div>
              <h1>Professional Snow Removal in West Hartford, CT</h1>
              <p className="hero-subtitle">We plow, shovel, and de-ice West Hartford Center, Elmwood, Bishop's Corner, and Blue Back Square so retail, residential, and school properties stay open even during back-to-back storms.</p>
              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get West Hartford Winter Quote
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
                <h2>West Hartford Storm Coverage</h2>
                <p>Upscale neighborhoods, busy retail corridors, and historic streets all receive dedicated care. We tailor equipment sizes, salting strategies, and pass frequency to match each district.</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`wh-snow-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>West Hartford Service Snapshot</h3>
                <p>Supervisors coordinate with local parking bans and HOA requirements to keep everything compliant.</p>
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
              <h2>West Hartford Snow Removal Packages</h2>
              <p className="section-subtitle">Choose the perfect winter maintenance package for your West Hartford property</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in West Hartford</div>}
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
                      Get West Hartford Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services Grid */}
          <section className="services-grid-section">
            <div className="section-header">
              <h2>Winter Services for West Hartford</h2>
              <p className="section-subtitle">Comprehensive snow and ice management solutions for West Hartford properties</p>
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
              <h2>Why West Hartford Trusts GD Landscaping</h2>
              <p className="section-subtitle">Serving West Hartford with professional winter maintenance expertise</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🏠</div>
                <h3>Serving West Hartford</h3>
                <p>Fast response times to all West Hartford areas including West Hartford Center, Elmwood, and Bishop's Corner. We know West Hartford's streets and neighborhoods.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Quick Response</h3>
                <p>Prompt service when storms hit West Hartford. Priority snow removal for reliable access to your home or business.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🚛</div>
                <h3>Professional Equipment</h3>
                <p>Commercial-grade snow plows and salt spreaders sized perfectly for West Hartford's residential and commercial properties.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h3>Fair Pricing</h3>
                <p>Competitive seasonal rates for West Hartford property owners with transparent, honest pricing. No hidden fees.</p>
              </div>
            </div>
          </section>

          {/* West Hartford Areas Served */}
          <section className="location-areas">
            <div className="section-header">
              <h2>West Hartford Areas We Serve</h2>
              <p className="section-subtitle">Complete snow removal coverage throughout West Hartford, Connecticut</p>
            </div>

            <div className="areas-content">
              <div className="local-areas">
                <h3>West Hartford Neighborhoods & Districts</h3>
                <div className="towns-grid">
                  {westHartfordAreas.map((area, index) => (
                    <span key={index} className="town">{area}</span>
                  ))}
                </div>
              </div>

              <div className="service-highlights">
                <div className="highlight-item">
                  <h4>🏢 Commercial District</h4>
                  <p>Professional snow removal for West Hartford businesses, ensuring customer and employee safety throughout the winter.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏘️ Residential Areas</h4>
                  <p>Reliable home snow removal services throughout all West Hartford neighborhoods from West Hartford Center to Elmwood.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏭 Business Parks</h4>
                  <p>Commercial snow clearance for West Hartford's professional office complexes and business parks.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Knowledge Section */}
          <section className="local-knowledge">
            <div className="section-header">
              <h2>West Hartford Winter Expertise</h2>
            </div>

            <div className="knowledge-content">
              <div className="knowledge-text">
                <h3>We Know West Hartford's Winter Challenges</h3>
                <p>As a trusted West Hartford snow removal service, we understand the specific requirements for safe winter maintenance in your area:</p>
                <ul>
                  <li><strong>Local Streets:</strong> Familiar with West Hartford's road network from Farmington Avenue to quiet residential streets</li>
                  <li><strong>Property Types:</strong> Experience with West Hartford's mix of historic homes, new developments, and businesses</li>
                  <li><strong>City Requirements:</strong> Know West Hartford's regulations and best practices for safe winter maintenance</li>
                  <li><strong>Weather Patterns:</strong> Understanding of how West Hartford's location affects snow accumulation and ice formation</li>
                  <li><strong>Storm Response:</strong> Quick mobilization for West Hartford properties when winter storms hit</li>
                </ul>
              </div>
            </div>
          </section>

          <QuoteSection
            title="Get a West Hartford Snow Plan"
            subtitle="Share your address and priorities so we can confirm the best route and response level."
            locationName="West Hartford Snow"
            source="West Hartford Snow Page"
          />

          {/* Contact CTA */}
          <section className="snow-cta">
            <div className="cta-content">
              <h2>Ready for Winter in West Hartford?</h2>
              <p>Join your West Hartford neighbors who trust GD Landscaping for reliable snow removal. Get your seasonal package today and enjoy peace of mind all winter long!</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your West Hartford Winter Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
              <p className="service-note">Proudly serving West Hartford, CT and surrounding areas • Licensed & Insured • 24/7 Emergency Response</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SnowRemovalWestHartfordPage;
