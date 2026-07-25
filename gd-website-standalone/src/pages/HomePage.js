import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import QuoteSection from '../components/QuoteSection';
import QuickQuoteForm from '../components/QuickQuoteForm';
import OptimizedImage from '../components/OptimizedImage';
import { ReactGoogleReviews } from 'react-google-reviews';
import 'react-google-reviews/dist/index.css';

const HomePage = () => {
  const quoteSectionRef = useRef(null);
  const quickQuoteRef = useRef(null);

  const scrollToContact = () => {
    quoteSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToQuickQuote = () => {
    quickQuoteRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "G&D Landscaping",
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
          "reviewBody": "G&D Landscaping has been taking care of our lawn for two years now. Always on time, professional crew, and our yard looks amazing. Highly recommend for anyone in Berlin or Hartford County.",
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
          "reviewBody": "We've tried several landscaping companies in Hartford and G&D Landscaping is by far the best. They transformed our overgrown yard into something beautiful. Weekly maintenance has been perfect.",
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
      "name": "G&D Landscaping",
      "alternateName": "G&D Landscaping LLC",
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
        title="Landscaping Berlin CT | Lawn Care & Snow Removal | G&D"
        description="Beautiful lawns in summer, clear driveways in winter. G&D Landscaping provides year-round landscaping and snow removal services in Berlin, Hartford County CT."
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
              <span style={{
                display: 'inline-block',
                background: 'rgba(16, 185, 129, 0.95)',
                color: 'white',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                padding: '6px 16px',
                borderRadius: '20px',
                marginBottom: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>
                Landscape Construction &amp; Design
              </span>
              <h1>Professional Landscaping & Snow Removal Across Central Connecticut</h1>
              <p>G&D Landscaping serves homeowners and businesses across Hartford, Middlesex, New Haven, and Tolland Counties — lawn care, spring & fall cleanups, bush trimming, fertilization, and 24/7 snow removal. Covering Berlin, New Britain, Bristol, Cromwell, Middletown, West Hartford, Newington, Rocky Hill, and 65+ Connecticut towns. Firefighter-owned. Fully insured. Licensed Home Improvement Contractor — HIC.0704814.</p>

              <div className="hero-cta-buttons">
                <a href="#get-quote" className="hero-cta-quote" onClick={(e) => { e.preventDefault(); scrollToQuickQuote(); }}>Get a Free Quote</a>
                <a href="tel:8605267583" className="hero-cta-call">📞 Call Now</a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Quote Section */}
        <div id="quick-quote-section" ref={quickQuoteRef} className="quick-quote-section">
          <div className="container">
            <div className="quick-quote-wrapper">
              <h2>Get a Free Quote</h2>
              <p className="quick-quote-intro">Tell us what you need and we'll call you back within 12 hours.</p>
              <QuickQuoteForm source="homepage-quick-form" />
            </div>
          </div>
        </div>

        <div className="homepage-why">
          <div className="container">
            <div className="homepage-why-header">
              <h2>Why Connecticut Homeowners Choose G&D Landscaping</h2>
              <p>From Berlin to West Hartford, Newington to Bristol — here's what sets us apart from every other landscaping company in Hartford County.</p>
            </div>

            <div className="homepage-why-grid">
              <div className="homepage-why-item">
                <span className="homepage-why-check">✓</span>
                <div>
                  <strong>Licensed Home Improvement Contractor</strong>
                  <span>HIC.0704814 — fully licensed by the State of Connecticut. Every job is covered, documented, and done right.</span>
                </div>
              </div>
              <div className="homepage-why-item">
                <span className="homepage-why-check">✓</span>
                <div>
                  <strong>Fully Insured on Every Job</strong>
                  <span>Complete liability coverage protects your property on every visit — lawn care, snow removal, cleanups, and more.</span>
                </div>
              </div>
              <div className="homepage-why-item">
                <span className="homepage-why-check">✓</span>
                <div>
                  <strong>Firefighter-Owned &amp; Community-Rooted</strong>
                  <span>We're not a franchise. We're a local business built on reputation, serving the same Connecticut communities we live in.</span>
                </div>
              </div>
              <div className="homepage-why-item">
                <span className="homepage-why-check">✓</span>
                <div>
                  <strong>Year-Round Service Across Central CT</strong>
                  <span>Lawn care in spring and summer, fall cleanups in October, and 24/7 snow removal all winter — one crew, all year.</span>
                </div>
              </div>
              <div className="homepage-why-item">
                <span className="homepage-why-check">✓</span>
                <div>
                  <strong>65+ Towns in 4 Counties</strong>
                  <span>Hartford, Middlesex, New Haven, and Tolland Counties. If you're in Central Connecticut, we cover your area.</span>
                </div>
              </div>
              <div className="homepage-why-item">
                <span className="homepage-why-check">✓</span>
                <div>
                  <strong>100% Satisfaction Guarantee</strong>
                  <span>Not happy with the work? We come back and make it right — no arguments, no runaround.</span>
                </div>
              </div>
            </div>

            <div className="homepage-why-images">
              <img
                src="/landscape-design-gd-landscaping.jpeg"
                alt="Professional landscape design and construction by G&D Landscaping in Berlin CT"
                style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
              />
              <img
                src="/garden-design-gd-landscaping.jpeg"
                alt="Custom garden design and planting services by G&D Landscaping in Hartford County CT"
                style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
              />
              <img
                src="/snow-removal-trucks-gd-landscaping.jpeg"
                alt="G&D Landscaping snow removal trucks with plows during Connecticut winter storm"
                style={{ width: '300px', height: '200px', objectFit: 'cover', objectPosition: 'center 18%', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
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
              <Link to="/hardscaping" className="featured-service-card featured">
                <div className="service-card-badge">🪨 Our Specialty</div>
                <div className="service-card-icon">🏗️</div>
                <h3>Hardscaping & Outdoor Living</h3>
                <p>Patios, retaining walls, walkways & fire features built to last</p>
                <span className="service-card-arrow">See All Hardscaping →</span>
              </Link>

              <Link to="/services" className="featured-service-card">
                <div className="service-card-icon">🌱</div>
                <h3>All Landscaping Services</h3>
                <p>Lawn care, design, hardscaping & more</p>
                <span className="service-card-arrow">View All Services →</span>
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

        {/* Social Proof / Reviews Section */}
        <div className="reviews-section">
          <div className="container">
            <h2>What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from our Google Business profile</p>
            <ReactGoogleReviews
              layout="carousel"
              featurableId="796e3d36-f890-4b06-9c03-61ce14b1bf9c"
              theme="light"
              structuredData={true}
            />
          </div>
        </div>

        <div ref={quoteSectionRef}>
          <QuoteSection
            title="Get Your Free Quote Today"
            subtitle="Choose your preferred method to request a quote - instant or detailed form"
            locationName="Home"
            source="Home Page Form"
          />
        </div>



        <section className="before-after-gallery">
          <div className="container">
            <h2>See the Difference — Bush Trimming in Newington, CT</h2>
            <p className="section-subtitle">One visit. Overgrown hedges shaped, debris hauled, and curb appeal transformed. This is what G&D Landscaping delivers on every job.</p>
            <div className="before-after-grid">
              <figure className="before-card">
                <OptimizedImage
                  src="/images/before-farmington.jpg"
                  alt="Overgrown hedges and bushes before professional trimming service in Newington CT by G&D Landscaping"
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
              <p>G&D Landscaping proudly serves Berlin, CT and surrounding communities within a 25-mile radius. Professional landscaping services for residential and commercial properties throughout Central Connecticut.</p>
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
