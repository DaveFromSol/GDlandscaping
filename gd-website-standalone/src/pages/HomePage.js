import React from 'react';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';

const HomePage = () => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "GD Landscaping",
      "description": "Professional landscaping services in Berlin CT and surrounding areas",
      "logo": "https://gdlandscapingllc.com/GD.png",
      "image": "https://gdlandscapingllc.com/GD.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Berlin",
        "addressRegion": "CT", 
        "postalCode": "06037",
        "addressCountry": "US"
      },
      "telephone": "(860) 526-7583",
      "email": "contact@gdlandscaping.com",
      "url": "https://gdlandscapingllc.com",
      "sameAs": [
        "https://www.gdlandscapingllc.com"
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 41.6219,
          "longitude": -72.7553
        },
        "geoRadius": "25 miles"
      },
      "services": ["Lawn Maintenance", "Landscape Design", "Tree Services", "Hardscaping", "Irrigation Systems", "Seasonal Cleanup"],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "20"
      },
      "priceRange": "$$",
      "paymentAccepted": "Cash, Check, Credit Card",
      "currenciesAccepted": "USD"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "GD Landscaping",
      "logo": "https://gdlandscapingllc.com/GD.png",
      "url": "https://gdlandscapingllc.com",
      "sameAs": [
        "https://www.gdlandscapingllc.com"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "(860) 526-7583",
        "contactType": "customer service",
        "email": "contact@gdlandscaping.com"
      }
    }
  ];

  return (
    <>
      <SEOHead
        title="GD Landscaping - Professional Landscaping Services in Berlin CT | Lawn Care & Landscape Design"
        description="Transform your outdoor space with GD Landscaping. Expert lawn care, landscape design, tree services in Berlin CT and Hartford County. Serving 75+ towns within 25 miles."
        keywords="landscaping Berlin CT, lawn care Berlin Connecticut, tree services Hartford County, landscape design Cromwell, hardscaping Middletown, irrigation systems Connecticut, seasonal cleanup Berlin CT"
        canonicalUrl="https://gdlandscaping.com/"
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
              onError={(e) => {
                console.log('Video error:', e.target.error);
                console.log('Video src:', e.target.currentSrc);
              }}
              onLoadedData={() => console.log('Video loaded successfully')}
              onCanPlay={() => console.log('Video can play')}
            >
              <source src="/AdobeStock_657294798.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div>
              <img src="/GD.png" alt="GD Landscaping - Lawn Care and Landscape Design Services in Berlin Connecticut" style={{height: '200px', marginBottom: '2rem'}} />
              <h1>Professional Landscaping Services in Berlin CT</h1>
              <p>Transform your outdoor space with GD Landscaping's expert lawn care, landscape design, and tree services. Serving Berlin, Hartford County, and surrounding Connecticut communities within 25 miles.</p>

              <div style={{
                margin: '30px 0',
                padding: '0 20px'
              }}>
                <h2 style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                  Type Your Address for Instant Quote
                </h2>
                <AddressAutocomplete />
              </div>
            </div>
          </div>
        </div>

        <div className="features">
          <div className="container">
            <h2>Why Choose GD Landscaping?</h2>
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon">⭐</div>
                <h3>Expert Team</h3>
                <p>Licensed professionals with years of experience in landscape design and maintenance.</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🛡️</div>
                <h3>Fully Insured</h3>
                <p>Complete insurance coverage for your peace of mind on every project.</p>
              </div>
              <div className="feature">
                <div className="feature-icon">💯</div>
                <h3>Satisfaction Guarantee</h3>
                <p>We stand behind our work with a 100% satisfaction guarantee.</p>
              </div>
              <div className="feature">
                <div className="feature-icon">📞</div>
                <h3>24/7 Support</h3>
                <p>Emergency services available for urgent landscaping needs.</p>
              </div>
            </div>

            {/* Small showcase images integrated into features section */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginTop: '40px',
              flexWrap: 'wrap'
            }}>
              <img
                src="/IMG_8872.jpeg"
                alt="GD Landscaping professional work"
                style={{
                  width: '300px',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                }}
              />
              <img
                src="/IMG_5407.jpeg"
                alt="GD Landscaping professional work"
                style={{
                  width: '300px',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                }}
              />
              <img
                src="/IMG_8868.jpeg"
                alt="GD Landscaping professional work"
                style={{
                  width: '300px',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="testimonials-section">
          <div className="container">
            <h2>What Our Customers Say</h2>
            <p className="section-subtitle">Don't just take our word for it - hear from our satisfied customers</p>
            
            <div className="testimonials-grid">
              <div className="testimonial">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p>"GD Landscaping transformed our backyard into a beautiful oasis. Professional, reliable, and fantastic results!"</p>
                <div className="testimonial-author">
                  <strong>Sarah Johnson</strong>
                  <span>Homeowner</span>
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

        {/* Service Areas */}
        <div className="service-areas">
          <div className="container">
            <div className="areas-header">
              <h2>Where We Operate</h2>
              <p>GD Landscaping proudly serves Berlin, CT and surrounding communities within a 25-mile radius. Professional landscaping services for residential and commercial properties throughout Central Connecticut.</p>
            </div>
            
            <div className="areas-grid">
              <div className="area-section">
                <h3>Primary Service Area - Hartford County</h3>
                <div className="towns-grid">
                  <span className="town">Berlin</span>
                  <span className="town">Cromwell</span>
                  <span className="town">Middletown</span>
                  <span className="town">Hartford</span>
                  <span className="town">West Hartford</span>
                  <span className="town">East Hartford</span>
                  <span className="town">Newington</span>
                  <span className="town">Wethersfield</span>
                  <span className="town">Rocky Hill</span>
                  <span className="town">Glastonbury</span>
                  <span className="town">Manchester</span>
                  <span className="town">Farmington</span>
                  <span className="town">Plainville</span>
                </div>
              </div>
              
              <div className="area-section">
                <h3>Extended Coverage - Middlesex County</h3>
                <div className="towns-grid">
                  <span className="town">Portland</span>
                  <span className="town">East Hampton</span>
                  <span className="town">Middlefield</span>
                  <span className="town">Durham</span>
                  <span className="town">Chester</span>
                  <span className="town">Deep River</span>
                  <span className="town">Essex</span>
                  <span className="town">Old Saybrook</span>
                </div>
              </div>
            </div>
            
            <div className="service-radius">
              <div className="radius-info">
                <h4>🎯 Where We Operate</h4>
                <p>We provide full landscaping services including lawn maintenance, landscape design, tree services, hardscaping, irrigation, and seasonal cleanup throughout our coverage area.</p>
                <p className="coverage-note">Don't see your town listed? <a href="/contact">Contact us</a> - we may still provide services in your area!</p>
              </div>
              
              <div className="areas-stats">
                <div className="stat-box">
                  <div className="stat-number">75+</div>
                  <div className="stat-label">Towns Served</div>
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
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;