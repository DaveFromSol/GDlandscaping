import React from 'react';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import QuoteSection from '../components/QuoteSection';

const HomePage = () => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "GD Landscaping",
      "description": "Professional year-round landscaping services in Berlin CT - lawn care in summer, snow removal in winter. Serving Hartford County and surrounding Connecticut communities.",
      "logo": "https://www.gdlandscapingllc.com/GD.png",
      "image": "https://www.gdlandscapingllc.com/GD.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Berlin",
        "addressRegion": "CT",
        "postalCode": "06037",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "41.6219",
        "longitude": "-72.7553"
      },
      "telephone": "(860) 526-7583",
      "email": "contact@gdlandscaping.com",
      "url": "https://www.gdlandscapingllc.com",
      "sameAs": [
        "https://www.gdlandscapingllc.com"
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Berlin",
          "containedInPlace": {
            "@type": "State",
            "name": "Connecticut"
          }
        },
        {
          "@type": "City",
          "name": "Hartford",
          "containedInPlace": {
            "@type": "State",
            "name": "Connecticut"
          }
        },
        {
          "@type": "AdministrativeArea",
          "name": "Hartford County",
          "containedInPlace": {
            "@type": "State",
            "name": "Connecticut"
          }
        }
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 41.6219,
          "longitude": -72.7553
        },
        "geoRadius": "40233.6"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Landscaping Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Lawn Maintenance",
              "description": "Professional lawn mowing, trimming, and edging services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Snow Removal",
              "description": "Winter snow removal and clearing services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Landscape Design",
              "description": "Custom landscape design and installation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Hardscaping",
              "description": "Patios, walkways, and retaining walls"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bush Trimming",
              "description": "Professional bush and shrub trimming services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Leaf Cleanup",
              "description": "Seasonal leaf removal and cleanup"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Fertilization",
              "description": "Lawn fertilization and treatment services"
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
      "currenciesAccepted": "USD",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "07:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "08:00",
          "closes": "16:00"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "GD Landscaping",
      "alternateName": "GD Landscaping LLC",
      "logo": "https://www.gdlandscapingllc.com/GD.png",
      "url": "https://www.gdlandscapingllc.com",
      "sameAs": [
        "https://www.gdlandscapingllc.com"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "(860) 526-7583",
        "contactType": "customer service",
        "email": "contact@gdlandscaping.com",
        "areaServed": "US-CT",
        "availableLanguage": "English"
      }
    }
  ];

  return (
    <>
      <SEOHead
        title="Professional Landscaping in Berlin CT | GD Landscaping - Lawn Care & Snow Removal"
        description="Beautiful lawns in summer, clear driveways in winter. GD Landscaping provides year-round landscaping and snow removal services in Berlin, Hartford County CT."
        keywords="landscaping Berlin CT, lawn care Connecticut, snow removal Berlin, lawn mowing Hartford County, landscape design Berlin CT, hardscaping Connecticut, bush trimming Berlin, leaf cleanup Hartford County, fertilization services CT"
        canonicalUrl="https://www.gdlandscapingllc.com/"
        ogImage="/GD.png"
        ogType="website"
        structuredData={structuredData}
      />

      <style>{`
        @media (max-width: 768px) {
          .contact-form-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          .form-row {
            grid-template-columns: 1fr !important;
          }

          .home-contact-section {
            padding: 30px 15px !important;
          }

          .home-contact-section h2 {
            font-size: 28px !important;
          }

          .home-contact-section .section-subtitle {
            font-size: 14px !important;
          }

          .contact-form {
            padding: 24px !important;
          }

          .contact-form h3 {
            font-size: 20px !important;
          }

          .form-subtitle {
            font-size: 14px !important;
          }

          .contact-form input,
          .contact-form select,
          .contact-form textarea {
            font-size: 16px !important;
          }

          .contact-form button {
            font-size: 16px !important;
            padding: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .home-contact-section h2 {
            font-size: 24px !important;
          }

          .contact-form h3 {
            font-size: 18px !important;
          }
        }
      `}</style>

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
              <h1>Beautiful Lawns in Summer, Clear Driveways in Winter</h1>
              <p>GD Landscaping keeps your property beautiful year-round — from lawn care to snow removal. Serving Berlin, Hartford County, and surrounding Connecticut communities within 25 miles.</p>

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
                  Type Your Address for Instant Lawn Care Quote
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

        <QuoteSection
          title="Get Your Free Quote Today"
          subtitle="Choose your preferred method to request a quote - instant or detailed form"
          locationName="Home"
          source="Home Page Form"
        />



        <section className="before-after-gallery">
          <div className="container">
            <h2>Before & After: Bush Trimming in Newington</h2>
            <p className="section-subtitle">Precision hedge shaping and debris cleanup gave this Newington property instant curb appeal.</p>
            <div className="before-after-grid">
              <figure className="before-card">
                <img src="/images/before-farmington.jpg" alt="Before GD Landscaping bush trimming in Newington CT" />
              </figure>
              <figure className="after-card">
                <img src="/images/after-farmington.jpg" alt="After GD Landscaping bush trimming in Newington CT" />
              </figure>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <div className="service-areas">
          <div className="container">
            <div className="areas-header">
              <h2>Where We Operate</h2>
              <p>GD Landscaping proudly serves Berlin, CT and surrounding communities within a 25-mile radius. Professional landscaping services for residential and commercial properties throughout Central Connecticut.</p>
            </div>
            
            <div className="areas-grid">
              <div className="area-section">
                <h3>Hartford County</h3>
                <div className="towns-grid">
                  <span className="town">Berlin</span>
                  <span className="town">Hartford</span>
                  <span className="town">New Britain</span>
                  <span className="town">West Hartford</span>
                  <span className="town">East Hartford</span>
                  <span className="town">Newington</span>
                  <span className="town">Wethersfield</span>
                  <span className="town">Rocky Hill</span>
                  <span className="town">Glastonbury</span>
                  <span className="town">Manchester</span>
                  <span className="town">South Windsor</span>
                  <span className="town">Farmington</span>
                  <span className="town">Plainville</span>
                  <span className="town">Bristol</span>
                  <span className="town">Southington</span>
                  <span className="town">Avon</span>
                  <span className="town">Simsbury</span>
                  <span className="town">Windsor</span>
                  <span className="town">Bloomfield</span>
                  <span className="town">Canton</span>
                  <span className="town">East Windsor</span>
                  <span className="town">Enfield</span>
                </div>
              </div>

              <div className="area-section">
                <h3>Middlesex County</h3>
                <div className="towns-grid">
                  <span className="town">Cromwell</span>
                  <span className="town">Middletown</span>
                  <span className="town">Portland</span>
                  <span className="town">East Hampton</span>
                  <span className="town">Middlefield</span>
                  <span className="town">Durham</span>
                  <span className="town">Chester</span>
                  <span className="town">Deep River</span>
                  <span className="town">Essex</span>
                  <span className="town">Old Saybrook</span>
                  <span className="town">Clinton</span>
                  <span className="town">Westbrook</span>
                  <span className="town">East Haddam</span>
                  <span className="town">Haddam</span>
                </div>
              </div>

              <div className="area-section">
                <h3>New Haven County</h3>
                <div className="towns-grid">
                  <span className="town">Wallingford</span>
                  <span className="town">Meriden</span>
                  <span className="town">Cheshire</span>
                  <span className="town">Durham</span>
                  <span className="town">North Haven</span>
                  <span className="town">Hamden</span>
                  <span className="town">Branford</span>
                  <span className="town">Guilford</span>
                  <span className="town">Madison</span>
                  <span className="town">Killingworth</span>
                </div>
              </div>

              <div className="area-section">
                <h3>Tolland County</h3>
                <div className="towns-grid">
                  <span className="town">Vernon</span>
                  <span className="town">Tolland</span>
                  <span className="town">Ellington</span>
                  <span className="town">Somers</span>
                  <span className="town">Stafford</span>
                  <span className="town">Willington</span>
                  <span className="town">Coventry</span>
                  <span className="town">Andover</span>
                  <span className="town">Bolton</span>
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
                  <div className="stat-number">65+</div>
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

export default HomePage;
