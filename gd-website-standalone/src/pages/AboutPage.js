import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import OptimizedImage from '../components/OptimizedImage';

const AboutPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "GD Landscaping",
      "description": "Professional landscaping company serving Berlin CT and surrounding areas with expert lawn care, landscape design, tree services, and hardscaping solutions",
      "foundingDate": "2024",
      "founder": {
        "@type": "Person",
        "name": "GD Landscaping Team"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Berlin",
        "addressRegion": "CT",
        "postalCode": "06037",
        "addressCountry": "US"
      },
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 41.6219,
          "longitude": -72.7553
        },
        "geoRadius": "25 miles"
      },
      "specialty": ["Lawn Maintenance", "Landscape Design", "Tree Services", "Hardscaping", "Irrigation Systems"]
    }
  };

  return (
    <>
      <SEOHead
        title="About GD Landscaping - Professional Landscaping Team | Berlin CT Lawn Care Experts"
        description="Learn about GD Landscaping's team of professional landscapers serving Berlin CT and Hartford County. Expert lawn care, landscape design, and tree services since 2024."
        keywords="about GD Landscaping, professional landscapers Berlin CT, landscaping company Hartford County, lawn care experts Connecticut, licensed landscaping Berlin CT"
        canonicalUrl="https://www.gdlandscapingllc.com/about"
        structuredData={structuredData}
      />
      
      <div className="about-section">
        <div className="container">
          <div className="about-hero">
            <div className="about-hero-content">
              <div className="about-badge">
                <span>🏆 Berlin CT's Premier Landscaping</span>
              </div>
              <h1>About GD Landscaping</h1>
              <p className="hero-subtitle">Your trusted partners in creating and maintaining beautiful outdoor spaces throughout Berlin CT and surrounding communities.</p>
              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="stat-number">75+</span>
                  <span className="stat-label">Towns Served</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-number">2024</span>
                  <span className="stat-label">Founded</span>
                </div>
              </div>
            </div>
            <div className="about-hero-image">
              <div className="logo-container">
                <OptimizedImage
                  src="/GD.png"
                  alt="GD Landscaping Logo"
                  width={300}
                  height={300}
                  priority={true}
                />
                <div className="logo-accent"></div>
              </div>
            </div>
          </div>

          <div className="about-story">
            <div className="story-content">
              <div className="section-header">
                <h2>Our Story</h2>
                <div className="section-line"></div>
              </div>
              <div className="story-grid">
                <div className="story-text">
                  <div className="story-highlight">
                    <h3>🚀 Our Mission</h3>
                    <p>GD Landscaping was founded with a simple mission: to transform outdoor spaces into beautiful, functional environments that our clients can enjoy year-round.</p>
                  </div>
                  
                  <p>Based in Berlin, Connecticut, we've quickly established ourselves as the area's premier landscaping service provider. What sets us apart is our commitment to quality craftsmanship, personalized service, and deep understanding of Connecticut's unique climate and soil conditions.</p>
                  
                  <p>Every project we undertake reflects our passion for creating landscapes that not only look stunning but also thrive in our local environment. From our humble beginnings, we've grown to serve over 75 communities within a 25-mile radius of Berlin.</p>
                </div>
                <div className="story-visual">
                  <div className="story-card">
                    <div className="card-icon">🌳</div>
                    <h4>Rooted in Excellence</h4>
                    <p>Building lasting relationships with homeowners and businesses who trust us with their most important outdoor spaces.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="values-section">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🌟</div>
                <h3>Excellence</h3>
                <p>We deliver exceptional quality in every project, big or small. Our attention to detail and commitment to craftsmanship ensures results that exceed expectations.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3>Integrity</h3>
                <p>Honest communication, transparent pricing, and reliable service. We build trust through consistent actions and always do what we say we'll do.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">🌱</div>
                <h3>Sustainability</h3>
                <p>We prioritize environmentally responsible practices, native plantings, and sustainable landscaping solutions that benefit both our clients and the environment.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">💡</div>
                <h3>Innovation</h3>
                <p>Staying current with industry best practices, new technologies, and design trends to provide our clients with modern, efficient landscaping solutions.</p>
              </div>
            </div>
          </div>

          <div className="team-section">
            <h2>Meet Our Team</h2>
            <p className="team-intro">Our experienced professionals bring passion, expertise, and dedication to every project.</p>
            
            <div className="team-highlights">
              <div className="team-stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Years Combined Experience</div>
              </div>
              <div className="team-stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Licensed & Insured</div>
              </div>
              <div className="team-stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Emergency Support</div>
              </div>
            </div>
          </div>

          <div className="expertise-section">
            <h2>Our Expertise</h2>
            <div className="expertise-grid">
              <div className="expertise-area">
                <h3>🌿 Landscape Design</h3>
                <p>Custom design solutions that blend functionality with aesthetic appeal, tailored to your lifestyle and property.</p>
              </div>
              
              <div className="expertise-area">
                <h3>🌱 Lawn Care & Maintenance</h3>
                <p>Comprehensive lawn care programs including mowing, fertilization, aeration, and seasonal treatments.</p>
              </div>
              
              <div className="expertise-area">
                <h3>🌳 Tree Services</h3>
                <p>Professional tree care including pruning, removal, health assessments, and emergency storm damage response.</p>
              </div>
              
              <div className="expertise-area">
                <h3>🏗️ Hardscaping</h3>
                <p>Beautiful stonework, patios, walkways, retaining walls, and outdoor living spaces built to last.</p>
              </div>
              
              <div className="expertise-area">
                <h3>💧 Irrigation Systems</h3>
                <p>Efficient watering solutions including sprinkler system design, installation, and maintenance services.</p>
              </div>
              
              <div className="expertise-area">
                <h3>🍂 Seasonal Services</h3>
                <p>Year-round property maintenance including fall leaf removal, professional snow removal, ice management, and comprehensive seasonal services.</p>
              </div>
            </div>
          </div>

          <div className="service-area-section">
            <h2>Where We Serve</h2>
            <p>Proudly serving Berlin, CT and surrounding communities within a 25-mile radius:</p>
            
            <div className="service-areas-grid">
              <div className="area-column">
                <h4>Hartford County</h4>
                <ul>
                  <li>Berlin</li>
                  <li>Cromwell</li>
                  <li>Hartford</li>
                  <li>West Hartford</li>
                  <li>Newington</li>
                  <li>Wethersfield</li>
                  <li>Rocky Hill</li>
                  <li>Glastonbury</li>
                </ul>
              </div>
              
              <div className="area-column">
                <h4>Middlesex County</h4>
                <ul>
                  <li>Middletown</li>
                  <li>Portland</li>
                  <li>East Hampton</li>
                  <li>Middlefield</li>
                  <li>Durham</li>
                  <li>Chester</li>
                  <li>Essex</li>
                  <li>Old Saybrook</li>
                </ul>
              </div>
              
              <div className="area-column">
                <h4>Extended Areas</h4>
                <ul>
                  <li>Manchester</li>
                  <li>East Hartford</li>
                  <li>Farmington</li>
                  <li>Meriden</li>
                  <li>Wallingford</li>
                  <li>North Haven</li>
                  <li>Madison</li>
                  <li>Guilford</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="commitment-section">
            <h2>Our Commitment to You</h2>
            <div className="commitments-grid">
              <div className="commitment-item">
                <div className="commitment-icon">🛡️</div>
                <h3>Fully Licensed & Insured</h3>
                <p>Complete coverage for your peace of mind on every project</p>
              </div>
              
              <div className="commitment-item">
                <div className="commitment-icon">💯</div>
                <h3>Satisfaction Guarantee</h3>
                <p>We stand behind our work with a 100% satisfaction promise</p>
              </div>
              
              <div className="commitment-item">
                <div className="commitment-icon">⏱️</div>
                <h3>Reliable Scheduling</h3>
                <p>On-time service and clear communication throughout your project</p>
              </div>
              
              <div className="commitment-item">
                <div className="commitment-icon">💰</div>
                <h3>Fair Pricing</h3>
                <p>Transparent, competitive pricing with no hidden fees or surprises</p>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <div className="cta-content">
              <h2>Ready to Get Started?</h2>
              <p>Experience the GD Landscaping difference. Contact us today for your free consultation and discover how we can transform your outdoor space.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">Get Free Quote</Link>
                <Link to="/services" className="cta-secondary">View Our Services</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;