import React from 'react';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import LocationGallery from '../components/LocationGallery';
import QuoteSection from '../components/QuoteSection';

const LawnCareWestHartfordPage = () => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "GD Landscaping - Lawn Care West Hartford CT",
      "description": "Professional lawn care and landscaping services in West Hartford CT - lawn mowing, maintenance, and complete yard care. Serving West Hartford Center, Elmwood, and surrounding areas.",
      "logo": "https://gdlandscapingllc.com/GD.png",
      "image": "https://gdlandscapingllc.com/GD.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "West Hartford",
        "addressRegion": "CT",
        "postalCode": "06107",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "41.7620",
        "longitude": "-72.7420"
      },
      "telephone": "(860) 526-7583",
      "email": "contact@gdlandscaping.com",
      "url": "https://gdlandscapingllc.com/lawn-care-west-hartford-ct",
      "sameAs": [
        "https://www.gdlandscapingllc.com"
      ],
      "areaServed": {
        "@type": "City",
        "name": "West Hartford",
        "containedInPlace": {
          "@type": "State",
          "name": "Connecticut"
        }
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Lawn Care Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Lawn Maintenance",
              "description": "Professional lawn mowing, trimming, and edging services in West Hartford CT"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Fertilization",
              "description": "Lawn fertilization and treatment services for West Hartford properties"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bush Trimming",
              "description": "Professional bush and shrub trimming services in West Hartford"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Leaf Cleanup",
              "description": "Seasonal leaf removal and cleanup in West Hartford CT"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500",
        "bestRating": "5",
        "worstRating": "1"
      },
      "priceRange": "$$",
      "paymentAccepted": "Cash, Check, Credit Card",
      "currenciesAccepted": "USD"
    }
  ];

  return (
    <>
      <SEOHead
        title="Lawn Care West Hartford CT | Professional Lawn Maintenance Services | GD Landscaping"
        description="Professional lawn care services in West Hartford, Connecticut. Weekly mowing, fertilization, weed control, and complete yard maintenance for West Hartford homes and businesses."
        keywords="lawn care West Hartford CT, lawn mowing West Hartford Connecticut, landscaping West Hartford, yard maintenance West Hartford CT, fertilization West Hartford, weed control West Hartford, West Hartford Center lawn care, Elmwood landscaping"
        canonicalUrl="https://gdlandscapingllc.com/lawn-care-west-hartford-ct"
        ogImage="/GD.png"
        ogType="website"
        structuredData={structuredData}
      />

      <div className="home-section">
        <div className="hero">
          <div className="hero-video-background">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/AdobeStock_657294798.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div>
              <img src="/GD.png" alt="GD Landscaping - Professional Lawn Care Services in West Hartford Connecticut" style={{height: '200px', marginBottom: '2rem'}} />
              <h1>Professional Lawn Care in West Hartford, CT</h1>
              <p>GD Landscaping provides expert lawn maintenance and landscaping services throughout West Hartford Center, Elmwood, Bishop's Corner, and all West Hartford neighborhoods. Beautiful, healthy lawns for West Hartford homes and businesses.</p>

              <div style={{
                margin: '30px 0',
                padding: '0 20px'
              }}>
                <h2 style={{
                  color: 'black',
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  textShadow: '1px 1px 2px rgba(255,255,255,0.5)'
                }}>
                  Type Your West Hartford Address for Instant Lawn Care Quote
                </h2>
                <AddressAutocomplete />
              </div>
            </div>
          </div>
        </div>

        <div className="features">
          <div className="container">
            <h2>Why West Hartford Chooses GD Landscaping</h2>
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon">⭐</div>
                <h3>Expert Team</h3>
                <p>Licensed professionals with years of experience serving West Hartford properties with expert lawn care and landscape maintenance.</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🛡️</div>
                <h3>Fully Insured</h3>
                <p>Complete insurance coverage for your peace of mind on every West Hartford lawn care project.</p>
              </div>
              <div className="feature">
                <div className="feature-icon">💯</div>
                <h3>Satisfaction Guarantee</h3>
                <p>We stand behind our work with a 100% satisfaction guarantee for all West Hartford customers.</p>
              </div>
            </div>

          </div>
        </div>

        <LocationGallery
          townName="West Hartford, CT"
          subtitle="Trusted crews delivering sharp cuts throughout West Hartford Center, Elmwood, and Bishop's Corner."
        />

        {/* Customer Testimonials */}
        <div className="testimonials-section">
          <div className="container">
            <h2>What West Hartford Customers Say</h2>
            <p className="section-subtitle">Trusted by homeowners and businesses throughout West Hartford, Connecticut</p>

            <div className="testimonials-grid">
              <div className="testimonial">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p>"GD Landscaping transformed our West Hartford backyard into a beautiful oasis. Professional, reliable, and fantastic results!"</p>
                <div className="testimonial-author">
                  <strong>Sarah Johnson</strong>
                  <span>West Hartford Homeowner</span>
                </div>
              </div>
              <div className="testimonial">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p>"Just opened but already showing exceptional quality! Their attention to detail and professional approach is outstanding. Can't wait to see them grow!"</p>
                <div className="testimonial-author">
                  <strong>Mike Chen</strong>
                  <span>Property Manager</span>
                </div>
              </div>
              <div className="testimonial">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p>"Their fall cleanup service saved us so much time. Professional team, fair pricing, and they left everything spotless."</p>
                <div className="testimonial-author">
                  <strong>Lisa Martinez</strong>
                  <span>Residential Customer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <QuoteSection
          title="Need a Detailed West Hartford Quote?"
          subtitle="Share a few details about your West Hartford property and we'll follow up with pricing the same day."
          locationName="West Hartford"
          source="West Hartford Lawn Page"
        />

        {/* Service Areas */}
        <div className="service-areas">
          <div className="container">
            <div className="areas-header">
              <h2>Serving West Hartford and Surrounding Areas</h2>
              <p>GD Landscaping proudly serves West Hartford, CT and all surrounding neighborhoods. Professional lawn care services for residential and commercial properties throughout West Hartford and Central Connecticut.</p>
            </div>

            <div className="areas-grid">
              <div className="area-section">
                <h3>West Hartford Neighborhoods</h3>
                <div className="towns-grid">
                  <span className="town">West Hartford Center</span>
                  <span className="town">Elmwood</span>
                  <span className="town">Bishop's Corner</span>
                  <span className="town">Blue Back Square</span>
                  <span className="town">Prospect Hill</span>
                  <span className="town">Sunset Ridge</span>
                  <span className="town">Fern Street</span>
                  <span className="town">Conard</span>
                </div>
              </div>

              <div className="area-section">
                <h3>Hartford County</h3>
                <div className="towns-grid">
                  <span className="town">Berlin</span>
                  <span className="town">Hartford</span>
                  <span className="town">New Britain</span>
                  <span className="town">Bristol</span>
                  <span className="town">Newington</span>
                  <span className="town">Wethersfield</span>
                  <span className="town">Rocky Hill</span>
                  <span className="town">Farmington</span>
                  <span className="town">Plainville</span>
                  <span className="town">Southington</span>
                  <span className="town">Avon</span>
                </div>
              </div>

              <div className="area-section">
                <h3>Nearby Towns</h3>
                <div className="towns-grid">
                  <span className="town">Cromwell</span>
                  <span className="town">Middletown</span>
                  <span className="town">Wallingford</span>
                  <span className="town">Meriden</span>
                  <span className="town">Cheshire</span>
                  <span className="town">Durham</span>
                </div>
              </div>

              <div className="area-section">
                <h3>And More</h3>
                <div className="towns-grid">
                  <span className="town">Vernon</span>
                  <span className="town">Tolland</span>
                  <span className="town">Ellington</span>
                  <span className="town">Glastonbury</span>
                  <span className="town">Manchester</span>
                  <span className="town">Bolton</span>
                </div>
              </div>
            </div>

            <div className="service-radius">
              <div className="radius-info">
                <h4>🎯 Complete Lawn Care for West Hartford</h4>
                <p>We provide full lawn care services including weekly mowing, fertilization, weed control, bush trimming, leaf cleanup, and seasonal maintenance throughout West Hartford and surrounding areas.</p>
                <p className="coverage-note">Don't see your West Hartford neighborhood listed? <a href="/contact">Contact us</a> - we serve all of West Hartford!</p>
              </div>

              <div className="areas-stats">
                <div className="stat-box">
                  <div className="stat-number">West Hartford</div>
                  <div className="stat-label">Primary Service Area</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">25</div>
                  <div className="stat-label">Mile Radius</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">4</div>
                  <div className="stat-label">Counties</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">Central CT</div>
                  <div className="stat-label">Full Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawnCareWestHartfordPage;
