import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuickQuoteForm from '../components/QuickQuoteForm';

const CommercialPage = () => {
  const quoteRef = useRef(null);

  const scrollToQuote = () => {
    quoteRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Commercial Landscaping",
    "provider": {
      "@type": "LocalBusiness",
      "name": "G&D Landscaping",
      "telephone": "(860) 526-7583",
      "email": "contact@gdlandscaping.com",
      "url": "https://www.gdlandscapingllc.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Berlin",
        "addressRegion": "CT",
        "postalCode": "06037",
        "addressCountry": "US"
      }
    },
    "areaServed": "Hartford, Middlesex, New Haven, and Tolland Counties, Connecticut",
    "description": "Commercial landscaping and snow removal contracts for property management companies, HOAs, office parks, retail centers, and apartment complexes across Connecticut."
  };

  return (
    <>
      <SEOHead
        title="Commercial Landscaping & Snow Removal Contracts — Hartford County, CT | G&D Landscaping"
        description="G&D Landscaping provides commercial landscaping and snow removal contracts for property managers, HOAs, office parks, retail centers, and apartment complexes across Hartford, Middlesex, New Haven, and Tolland Counties, CT. Licensed HIC.0704814. Fully insured."
        keywords="commercial landscaping Hartford County CT, property management landscaping Connecticut, commercial snow removal contracts CT, HOA landscaping Connecticut, office park lawn care CT, apartment complex landscaping Hartford, commercial grounds maintenance Connecticut"
        canonicalUrl="https://www.gdlandscapingllc.com/commercial"
        ogImage="/GD.png"
        ogType="website"
        structuredData={structuredData}
      />

      <div className="commercial-page">

        {/* Hero */}
        <div className="commercial-hero">
          <div className="container">
            <div className="commercial-hero-content">
              <div className="commercial-hero-badge">🏢 Commercial Services</div>
              <h1>Commercial Landscaping & Snow Removal Contracts in Connecticut</h1>
              <p>Reliable, year-round grounds maintenance for property management companies, HOAs, office parks, retail centers, and apartment complexes across Hartford, Middlesex, New Haven, and Tolland Counties.</p>
              <div className="commercial-hero-ctas">
                <button className="commercial-hero-cta-primary" onClick={scrollToQuote}>
                  Request a Commercial Quote
                </button>
                <a href="tel:8605267583" className="commercial-hero-cta-secondary">
                  📞 (860) 526-7583
                </a>
              </div>
              <div className="commercial-hero-trust">
                <span>✓ Licensed HIC.0704814</span>
                <span>✓ Fully Insured</span>
                <span>✓ Seasonal &amp; Annual Contracts</span>
                <span>✓ Multi-Property Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Who We Serve */}
        <div className="commercial-who">
          <div className="container">
            <h2>Who We Work With</h2>
            <p className="commercial-section-sub">We partner with property professionals who need dependable, professional grounds maintenance — not excuses.</p>
            <div className="commercial-who-grid">
              <div className="commercial-who-card">
                <div className="commercial-who-icon">🏢</div>
                <h3>Property Management Companies</h3>
                <p>Single point of contact for all your managed properties. Consistent service, professional invoicing, and reliable scheduling across your portfolio.</p>
              </div>
              <div className="commercial-who-card">
                <div className="commercial-who-icon">🏘️</div>
                <h3>HOAs & Condo Associations</h3>
                <p>Keep common areas pristine year-round. Seasonal contracts keep your community looking sharp and your board happy.</p>
              </div>
              <div className="commercial-who-card">
                <div className="commercial-who-icon">🏬</div>
                <h3>Retail Centers & Office Parks</h3>
                <p>First impressions matter. We maintain parking lot edges, entrances, and grounds so your tenants and customers always arrive to a clean, professional property.</p>
              </div>
              <div className="commercial-who-card">
                <div className="commercial-who-icon">🏗️</div>
                <h3>Apartment Complexes</h3>
                <p>Attract and retain tenants with well-maintained grounds. Regular mowing, cleanup, and snow removal keep your property competitive.</p>
              </div>
              <div className="commercial-who-card">
                <div className="commercial-who-icon">🏫</div>
                <h3>Institutions & Nonprofits</h3>
                <p>Schools, churches, and community organizations trust us for affordable, reliable grounds care that reflects well on their mission.</p>
              </div>
              <div className="commercial-who-card">
                <div className="commercial-who-icon">🏭</div>
                <h3>Industrial & Warehouse Properties</h3>
                <p>Snow removal and grounds maintenance for distribution centers, warehouses, and industrial parks — keeping access clear and compliant.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="commercial-services">
          <div className="container">
            <h2>Commercial Services</h2>
            <p className="commercial-section-sub">Everything your property needs, handled by one reliable team.</p>
            <div className="commercial-services-grid">
              <div className="commercial-service-item">
                <div className="commercial-service-icon">❄️</div>
                <div>
                  <h3>Commercial Snow Removal</h3>
                  <p>24/7 on-call plowing, salting, and ice management. Seasonal contracts with guaranteed response times — keep your lots safe and your liability low.</p>
                </div>
              </div>
              <div className="commercial-service-item">
                <div className="commercial-service-icon">🌿</div>
                <div>
                  <h3>Grounds Maintenance Contracts</h3>
                  <p>Weekly or bi-weekly mowing, edging, trimming, and blowing. Consistent schedules you can build your tenant communications around.</p>
                </div>
              </div>
              <div className="commercial-service-item">
                <div className="commercial-service-icon">🍂</div>
                <div>
                  <h3>Fall Cleanup & Leaf Removal</h3>
                  <p>Full property leaf removal and haul-away. Keep walkways and parking areas clear before winter sets in.</p>
                </div>
              </div>
              <div className="commercial-service-item">
                <div className="commercial-service-icon">🌱</div>
                <div>
                  <h3>Spring Cleanup & Opening</h3>
                  <p>Post-winter property refresh — debris removal, bed cleanup, edging restoration, and first mow of the season.</p>
                </div>
              </div>
              <div className="commercial-service-item">
                <div className="commercial-service-icon">✂️</div>
                <div>
                  <h3>Bush Trimming & Shrub Care</h3>
                  <p>Professional hedge shaping and shrub maintenance to keep entrances and common areas looking polished.</p>
                </div>
              </div>
              <div className="commercial-service-item">
                <div className="commercial-service-icon">🌾</div>
                <div>
                  <h3>Fertilization & Weed Control</h3>
                  <p>Seasonal treatment programs to keep turf dense, green, and weed-free throughout the growing season.</p>
                </div>
              </div>
              <div className="commercial-service-item">
                <div className="commercial-service-icon">🪨</div>
                <div>
                  <h3>Mulching & Bed Maintenance</h3>
                  <p>Fresh mulch installs and bed edging to give your property a clean, finished look tenants and visitors notice.</p>
                </div>
              </div>
              <div className="commercial-service-item">
                <div className="commercial-service-icon">📋</div>
                <div>
                  <h3>Seasonal & Annual Contracts</h3>
                  <p>Lock in priority scheduling and predictable pricing. Ideal for property managers who need budget certainty across multiple sites.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why G&D */}
        <div className="commercial-why">
          <div className="container">
            <div className="commercial-why-grid">
              <div className="commercial-why-text">
                <h2>Why Property Managers Choose G&D</h2>
                <p>We understand that your reputation is tied to how your properties look and function. That's why we treat every contract like a long-term partnership, not a one-time job.</p>
                <ul className="commercial-why-list">
                  <li>
                    <span className="commercial-why-check">✓</span>
                    <div>
                      <strong>Licensed & Fully Insured</strong>
                      <span>Home Improvement Contractor License HIC.0704814 — coverage that protects you and your tenants.</span>
                    </div>
                  </li>
                  <li>
                    <span className="commercial-why-check">✓</span>
                    <div>
                      <strong>Multi-Property Coordination</strong>
                      <span>One call, one invoice, one team across all your managed sites.</span>
                    </div>
                  </li>
                  <li>
                    <span className="commercial-why-check">✓</span>
                    <div>
                      <strong>Priority Contract Clients</strong>
                      <span>Contract clients get first-response priority for snow removal and emergency service calls.</span>
                    </div>
                  </li>
                  <li>
                    <span className="commercial-why-check">✓</span>
                    <div>
                      <strong>Professional Invoicing</strong>
                      <span>Clean, itemized invoices built for property management accounting workflows.</span>
                    </div>
                  </li>
                  <li>
                    <span className="commercial-why-check">✓</span>
                    <div>
                      <strong>Firefighter-Owned & Community-Rooted</strong>
                      <span>We're not a franchise. We're a local business that depends on long-term relationships, not one-off jobs.</span>
                    </div>
                  </li>
                  <li>
                    <span className="commercial-why-check">✓</span>
                    <div>
                      <strong>65+ Towns Covered</strong>
                      <span>Hartford, Middlesex, New Haven, and Tolland Counties — we service where your properties are.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="commercial-why-stats">
                <div className="commercial-stat">
                  <span className="commercial-stat-number">65+</span>
                  <span className="commercial-stat-label">Towns Served</span>
                </div>
                <div className="commercial-stat">
                  <span className="commercial-stat-number">4</span>
                  <span className="commercial-stat-label">Counties Covered</span>
                </div>
                <div className="commercial-stat">
                  <span className="commercial-stat-number">24/7</span>
                  <span className="commercial-stat-label">Snow Response</span>
                </div>
                <div className="commercial-stat">
                  <span className="commercial-stat-number">5★</span>
                  <span className="commercial-stat-label">Rated Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Form */}
        <div className="commercial-quote" ref={quoteRef} id="commercial-quote">
          <div className="container">
            <div className="commercial-quote-inner">
              <div className="commercial-quote-text">
                <h2>Get a Commercial Quote</h2>
                <p>Tell us about your property and what you need — we'll follow up within 12 hours to discuss a contract that works for your portfolio and budget.</p>
                <div className="commercial-quote-contact">
                  <p>Prefer to talk directly?</p>
                  <a href="tel:8605267583" className="commercial-quote-phone">📞 (860) 526-7583</a>
                  <a href="mailto:contact@gdlandscaping.com" className="commercial-quote-email">✉️ contact@gdlandscaping.com</a>
                </div>
              </div>
              <div className="commercial-quote-form">
                <QuickQuoteForm source="commercial-page" />
              </div>
            </div>
          </div>
        </div>

        {/* Service Area */}
        <div className="commercial-area">
          <div className="container">
            <h2>Service Area</h2>
            <p className="commercial-section-sub">We serve commercial properties across Central Connecticut — including but not limited to:</p>
            <div className="commercial-area-grid">
              <div className="commercial-area-county">
                <h3>Hartford County</h3>
                <p>Berlin, New Britain, Bristol, West Hartford, Hartford, Newington, Rocky Hill, Cromwell, Farmington, Southington, Plainville, Wethersfield, Windsor, Bloomfield, Avon, Canton, Enfield, Manchester, South Windsor</p>
              </div>
              <div className="commercial-area-county">
                <h3>Middlesex County</h3>
                <p>Middletown, Cromwell, Portland, East Hampton, Haddam, Durham, Middlefield</p>
              </div>
              <div className="commercial-area-county">
                <h3>New Haven County</h3>
                <p>Meriden, Wallingford, North Haven, Cheshire, Southbury, Naugatuck, Ansonia, Derby</p>
              </div>
              <div className="commercial-area-county">
                <h3>Tolland County</h3>
                <p>Vernon, Tolland, Ellington, Somers, Coventry, Mansfield, Stafford</p>
              </div>
            </div>
            <p className="commercial-area-note">Not sure if we cover your location? <button className="commercial-area-cta" onClick={scrollToQuote}>Send us a message</button> or call <a href="tel:8605267583">(860) 526-7583</a>.</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default CommercialPage;
