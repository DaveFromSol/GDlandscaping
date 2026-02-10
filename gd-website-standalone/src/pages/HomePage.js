import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import QuoteSection from '../components/QuoteSection';
import OptimizedImage from '../components/OptimizedImage';

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
        "reviewCount": "235",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Michael Thompson"
          },
          "datePublished": "2024-11-15",
          "reviewBody": "GD Landscaping has been taking care of our lawn for two years now. Always on time, professional crew, and our yard looks amazing. Highly recommend for anyone in Berlin or Hartford County.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Sarah Johnson"
          },
          "datePublished": "2024-10-22",
          "reviewBody": "Best snow removal service in New Britain! They cleared our driveway during the last storm before we even woke up. Very reliable and reasonably priced.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "David Martinez"
          },
          "datePublished": "2024-09-08",
          "reviewBody": "Used them for fall cleanup and lawn maintenance in Cromwell. Great communication, fair pricing, and excellent work quality. The team is very professional.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Jennifer Lee"
          },
          "datePublished": "2024-08-14",
          "reviewBody": "We've tried several landscaping companies in Hartford and GD Landscaping is by far the best. They transformed our overgrown yard into something beautiful. Weekly maintenance has been perfect.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Robert Chen"
          },
          "datePublished": "2024-07-30",
          "reviewBody": "Professional bush trimming service in Farmington. They were careful around our flowerbeds and cleaned up everything perfectly. Will definitely use them again next season.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
          }
        }
      ],
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
              <h1>Beautiful Lawns in Summer, Clear Driveways in Winter</h1>
              <p>GD Landscaping keeps your property beautiful year-round — from lawn care to snow removal. Serving Berlin, Hartford County, and surrounding Connecticut communities within 25 miles.</p>

              <div className="homepage-address-input-container">
                <div className="homepage-input-badge">⚡ GET INSTANT QUOTE ⚡</div>
                <div className="homepage-input-wrapper">
                  <div className="homepage-input-header">
                    <span className="homepage-input-icon">📍</span>
                    <h2 className="homepage-input-title">
                      Type Your Address for Instant Quote
                    </h2>
                  </div>
                  <div className="homepage-input-field">
                    <AddressAutocomplete />
                  </div>
                  <div className="homepage-input-benefits">
                    <span className="homepage-benefit-item">✓ See Property Size</span>
                    <span className="homepage-benefit-item">✓ Instant Pricing</span>
                    <span className="homepage-benefit-item">✓ Book Online</span>
                  </div>
                </div>
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
                <div className="feature-icon">🚒</div>
                <h3>Firefighter-Owned</h3>
                <p>Proudly owned and operated by a local firefighter committed to serving our community.</p>
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
              <OptimizedImage
                src="/commercial-property-landscaping-connecticut.jpeg"
                alt="Commercial property landscaping and lawn maintenance services in Connecticut by GD Landscaping"
                width={300}
                height={200}
                style={{
                  width: '300px',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                }}
              />
              <OptimizedImage
                src="/garden-landscape-design-hartford-county.jpeg"
                alt="Professional garden and landscape design in Hartford County CT - custom lawn care and plantings"
                width={300}
                height={200}
                style={{
                  width: '300px',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                }}
              />
              <OptimizedImage
                src="/residential-lawn-service-berlin-ct.jpeg"
                alt="Residential lawn mowing and care services in Berlin Connecticut - professional landscaping"
                width={300}
                height={200}
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

        {/* Featured Services */}
        <div className="featured-services-section">
          <div className="container">
            <h2>Our Services</h2>
            <p className="section-subtitle">Professional year-round landscaping solutions for Connecticut properties</p>

            <div className="featured-services-grid">
              <Link to="/services" className="featured-service-card">
                <div className="service-card-icon">🌱</div>
                <h3>All Landscaping Services</h3>
                <p>Lawn care, design, hardscaping & more</p>
                <span className="service-card-arrow">View All Services →</span>
              </Link>

              <Link to="/leaf-removal" className="featured-service-card featured">
                <div className="service-card-badge">🍂 Seasonal</div>
                <div className="service-card-icon">🍁</div>
                <h3>Fall Leaf Removal</h3>
                <p>Professional cleanup & haul-away service</p>
                <span className="service-card-arrow">Learn More →</span>
              </Link>

              <Link to="/snow-removal" className="featured-service-card">
                <div className="service-card-icon">❄️</div>
                <h3>Snow Removal</h3>
                <p>24/7 winter plowing & ice management</p>
                <span className="service-card-arrow">Get Winter Ready →</span>
              </Link>

              <Link to="/lawn-care-berlin-ct" className="featured-service-card">
                <div className="service-card-icon">🏡</div>
                <h3>Lawn Care</h3>
                <p>Weekly mowing, edging & maintenance</p>
                <span className="service-card-arrow">View Local Services →</span>
              </Link>

              <Link to="/bush-trimming-berlin-ct" className="featured-service-card">
                <div className="service-card-icon">✂️</div>
                <h3>Bush Trimming</h3>
                <p>Professional hedge & shrub shaping</p>
                <span className="service-card-arrow">Get a Quote →</span>
              </Link>

              <Link to="/fertilization-weed-control-berlin-ct" className="featured-service-card">
                <div className="service-card-icon">🌾</div>
                <h3>Fertilization & Weed Control</h3>
                <p>Custom lawn treatment programs</p>
                <span className="service-card-arrow">See Programs →</span>
              </Link>
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
                <OptimizedImage
                  src="/images/before-farmington.jpg"
                  alt="Overgrown hedges and bushes before professional trimming service in Newington CT by GD Landscaping"
                  width={600}
                  height={400}
                />
              </figure>
              <figure className="after-card">
                <OptimizedImage
                  src="/images/after-farmington.jpg"
                  alt="Neatly trimmed hedges and improved curb appeal after bush trimming service in Newington Connecticut"
                  width={600}
                  height={400}
                />
              </figure>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <div id="areas-we-serve" className="service-areas">
          <div className="container">
            <div className="areas-header">
              <h2>Where We Operate</h2>
              <p>GD Landscaping proudly serves Berlin, CT and surrounding communities within a 25-mile radius. Professional landscaping services for residential and commercial properties throughout Central Connecticut.</p>
            </div>
            
            <div className="areas-grid">
              <div className="area-section">
                <h3>Hartford County</h3>
                <div className="towns-grid">
                  <Link to="/lawn-care-berlin-ct" className="town">Berlin</Link>
                  <Link to="/lawn-care-hartford-ct" className="town">Hartford</Link>
                  <Link to="/lawn-care-new-britain-ct" className="town">New Britain</Link>
                  <Link to="/lawn-care-west-hartford-ct" className="town">West Hartford</Link>
                  <Link to="/fertilization-weed-control-east-hartford-ct" className="town">East Hartford</Link>
                  <Link to="/lawn-care-newington-ct" className="town">Newington</Link>
                  <Link to="/fertilization-weed-control-wethersfield-ct" className="town">Wethersfield</Link>
                  <Link to="/lawn-care-rocky-hill-ct" className="town">Rocky Hill</Link>
                  <Link to="/fertilization-weed-control-glastonbury-ct" className="town">Glastonbury</Link>
                  <Link to="/fertilization-weed-control-manchester-ct" className="town">Manchester</Link>
                  <Link to="/fertilization-weed-control-south-windsor-ct" className="town">South Windsor</Link>
                  <Link to="/lawn-care-farmington-ct" className="town">Farmington</Link>
                  <Link to="/fertilization-weed-control-plainville-ct" className="town">Plainville</Link>
                  <Link to="/lawn-care-bristol-ct" className="town">Bristol</Link>
                  <Link to="/fertilization-weed-control-southington-ct" className="town">Southington</Link>
                  <Link to="/fertilization-weed-control-avon-ct" className="town">Avon</Link>
                  <span className="town">Simsbury</span>
                  <Link to="/fertilization-weed-control-windsor-ct" className="town">Windsor</Link>
                  <Link to="/fertilization-weed-control-bloomfield-ct" className="town">Bloomfield</Link>
                  <Link to="/fertilization-weed-control-canton-ct" className="town">Canton</Link>
                  <span className="town">East Windsor</span>
                  <Link to="/fertilization-weed-control-enfield-ct" className="town">Enfield</Link>
                </div>
              </div>

              <div className="area-section">
                <h3>Middlesex County</h3>
                <div className="towns-grid">
                  <Link to="/lawn-care-cromwell-ct" className="town">Cromwell</Link>
                  <Link to="/lawn-care-middletown-ct" className="town">Middletown</Link>
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
