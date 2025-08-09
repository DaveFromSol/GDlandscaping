import React, { useState } from 'react';
import './App.css';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const services = [
    {
      id: 1,
      name: 'Lawn Maintenance',
      description: 'Regular mowing, edging, and lawn care',
      price: 'Starting at $75',
      image: '🌱',
      features: ['Weekly mowing', 'Edge trimming', 'Leaf removal', 'Fertilization']
    },
    {
      id: 2,
      name: 'Landscape Design',
      description: 'Custom landscape design and installation',
      price: 'Starting at $500',
      image: '🌿',
      features: ['Design consultation', '3D renderings', 'Plant selection', 'Installation']
    },
    {
      id: 3,
      name: 'Tree Services',
      description: 'Tree trimming, removal, and maintenance',
      price: 'Starting at $200',
      image: '🌳',
      features: ['Tree trimming', 'Tree removal', 'Stump grinding', 'Emergency service']
    },
    {
      id: 4,
      name: 'Hardscaping',
      description: 'Patios, walkways, and retaining walls',
      price: 'Starting at $1,500',
      image: '🏗️',
      features: ['Patio installation', 'Walkway creation', 'Retaining walls', 'Outdoor kitchens']
    },
    {
      id: 5,
      name: 'Irrigation Systems',
      description: 'Sprinkler system installation and repair',
      price: 'Starting at $800',
      image: '💧',
      features: ['System design', 'Installation', 'Repairs', 'Seasonal maintenance']
    },
    {
      id: 6,
      name: 'Seasonal Cleanup',
      description: 'Spring and fall yard cleanup services',
      price: 'Starting at $150',
      image: '🍂',
      features: ['Leaf removal', 'Debris cleanup', 'Mulching', 'Plant preparation']
    },
    {
      id: 7,
      name: 'Lawn Fertilization',
      description: 'Professional lawn care and nutrient programs',
      price: 'Starting at $95',
      image: '🌾',
      features: ['Soil testing', 'Custom fertilizer programs', 'Weed control', 'Disease prevention']
    },
    {
      id: 8,
      name: 'Outdoor Lighting',
      description: 'Landscape and security lighting installation',
      price: 'Starting at $400',
      image: '💡',
      features: ['LED installations', 'Security lighting', 'Pathway lights', 'Accent lighting']
    },
    {
      id: 9,
      name: 'Mulching Services',
      description: 'Premium mulch installation and maintenance',
      price: 'Starting at $120',
      image: '🪵',
      features: ['Premium mulch selection', 'Bed preparation', 'Weed barrier installation', 'Annual refresh']
    },
    {
      id: 10,
      name: 'Pressure Washing',
      description: 'Professional cleaning for driveways and patios',
      price: 'Starting at $180',
      image: '💦',
      features: ['Driveway cleaning', 'Patio restoration', 'Walkway maintenance', 'Surface sealing']
    },
    {
      id: 11,
      name: 'Garden Design',
      description: 'Custom vegetable and flower garden planning',
      price: 'Starting at $300',
      image: '🌻',
      features: ['Garden planning', 'Soil preparation', 'Plant selection', 'Maintenance plans']
    },
    {
      id: 12,
      name: 'Snow Removal',
      description: 'Winter snow and ice management services',
      price: 'Starting at $80',
      image: '❄️',
      features: ['Snow plowing', 'Ice treatment', 'Walkway clearing', '24/7 emergency service']
    }
  ];

  const portfolio = [
    {
      id: 1,
      title: 'Residential Landscape Design',
      description: 'Complete backyard transformation with native plantings and stone pathways',
      image: '/1A0AA44E-D251-41D2-B56A-9543E6E408BD%20-%20Edited.png',
      category: 'Residential'
    },
    {
      id: 2,
      title: 'Commercial Property Maintenance',
      description: 'Professional lawn care and landscaping for business properties',
      image: '/A4D59809-8BCD-4140-837C-A18E6A093CA2_L0_001%20-%20Edited.jpg',
      category: 'Commercial'
    },
    {
      id: 3,
      title: 'Hardscaping & Patios',
      description: 'Custom stone patios and outdoor living spaces designed for entertaining',
      image: '/IMG_2692%20-%20Edited%20-%20Edited.png',
      category: 'Hardscaping'
    },
    {
      id: 4,
      title: 'Recent Landscaping Project',
      description: 'Professional landscaping transformation in Berlin CT area',
      image: '/IMG_5078%20(1).avif',
      category: 'Residential'
    }
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message || !contactForm.service) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setSubmitMessage('');

    // Simulate form submission (replace with Firebase integration later)
    setTimeout(() => {
      setSubmitMessage('Thank you for your inquiry! We will contact you within 24 hours.');
      setContactForm({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      setSubmitting(false);
    }, 1000);
  };

  const renderNavigation = () => (
    <>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
      
      <nav className="website-nav">
        <div className="nav-container">
          <div className="logo">
            <img src="/GD.png" alt="GD Landscaping - Professional Landscaping Services Berlin CT" style={{height: '40px', marginRight: '10px'}} />
            <h2>GD Landscaping</h2>
          </div>
          
          {/* Mobile Hamburger Button */}
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <button 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={() => {
                setActiveSection('home');
                setMobileMenuOpen(false);
              }}
            >
              🏠 Home
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'services' ? 'active' : ''}
              onClick={() => {
                setActiveSection('services');
                setMobileMenuOpen(false);
              }}
            >
              🌱 Services
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'portfolio' ? 'active' : ''}
              onClick={() => {
                setActiveSection('portfolio');
                setMobileMenuOpen(false);
              }}
            >
              📸 Portfolio
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={() => {
                setActiveSection('about');
                setMobileMenuOpen(false);
              }}
            >
              ℹ️ About
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={() => {
                setActiveSection('contact');
                setMobileMenuOpen(false);
              }}
            >
              📞 Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );

  const renderHome = () => (
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
            <div className="hero-buttons">
              <button 
                className="cta-primary"
                onClick={() => setActiveSection('contact')}
              >
                Get Free Quote
              </button>
              <button 
                className="cta-secondary"
                onClick={() => setActiveSection('services')}
              >
                View Services
              </button>
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
        </div>
      </div>

      {/* Artistic Showcase on Homepage */}
      <div className="home-portfolio-preview">
        <div className="container">
          <h2>Our Work</h2>
          
          <div className="home-portfolio-grid">
            {portfolio.slice(0, 3).map(project => (
              <div key={project.id} className="home-portfolio-item">
                <div className="home-portfolio-image">
                  <img 
                    src={project.image} 
                    alt={`${project.title} - Professional Landscaping Work in Berlin CT by GD Landscaping`}
                    className="home-portfolio-img"
                    onError={(e) => {
                      console.log('Image failed to load:', e.target.src);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="home-portfolio-placeholder" style={{display: 'none'}}>
                    Project<br/>Image
                  </div>
                  <div className="home-portfolio-overlay">
                    <div className="home-portfolio-category">{project.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="home-portfolio-cta">
            <button 
              className="cta-primary"
              onClick={() => setActiveSection('portfolio')}
            >
              Explore Gallery
            </button>
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
                <span className="town">East Glastonbury</span>
                <span className="town">South Glastonbury</span>
                <span className="town">Manchester</span>
                <span className="town">East Windsor</span>
                <span className="town">Windsor</span>
                <span className="town">Windsor Locks</span>
                <span className="town">Bloomfield</span>
                <span className="town">Farmington</span>
                <span className="town">Avon</span>
                <span className="town">Simsbury</span>
              </div>
            </div>
            
            <div className="area-section">
              <h3>Extended Coverage - Middlesex County</h3>
              <div className="towns-grid">
                <span className="town">Portland</span>
                <span className="town">East Hampton</span>
                <span className="town">Middlefield</span>
                <span className="town">Durham</span>
                <span className="town">Higganum</span>
                <span className="town">Haddam</span>
                <span className="town">Chester</span>
                <span className="town">Deep River</span>
                <span className="town">Essex</span>
                <span className="town">Old Saybrook</span>
                <span className="town">Westbrook</span>
                <span className="town">Clinton</span>
              </div>
            </div>
            
            <div className="area-section">
              <h3>Additional Areas - New Haven County</h3>
              <div className="towns-grid">
                <span className="town">Meriden</span>
                <span className="town">Wallingford</span>
                <span className="town">North Haven</span>
                <span className="town">Hamden</span>
                <span className="town">New Haven</span>
                <span className="town">East Haven</span>
                <span className="town">Branford</span>
                <span className="town">Guilford</span>
                <span className="town">Madison</span>
                <span className="town">Killingworth</span>
                <span className="town">Durham</span>
                <span className="town">Middlebury</span>
                <span className="town">Waterbury</span>
                <span className="town">Cheshire</span>
                <span className="town">Prospect</span>
              </div>
            </div>
            
            <div className="area-section">
              <h3>Tolland & New London Counties</h3>
              <div className="towns-grid">
                <span className="town">Vernon</span>
                <span className="town">Tolland</span>
                <span className="town">Ellington</span>
                <span className="town">Stafford</span>
                <span className="town">Somers</span>
                <span className="town">Enfield</span>
                <span className="town">Suffield</span>
                <span className="town">East Lyme</span>
                <span className="town">Old Lyme</span>
                <span className="town">Lyme</span>
                <span className="town">Hadlyme</span>
                <span className="town">Colchester</span>
              </div>
            </div>
          </div>
          
          <div className="service-radius">
            <div className="radius-info">
              <h4>🎯 Where We Operate</h4>
              <p>We provide full landscaping services including lawn maintenance, landscape design, tree services, hardscaping, irrigation, and seasonal cleanup throughout our coverage area.</p>
              <p className="coverage-note">Don't see your town listed? <button className="inline-contact-btn" onClick={() => setActiveSection('contact')}>Contact us</button> - we may still provide services in your area!</p>
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
  );

  const renderServices = () => (
    <div className="services-section">
      <div className="container">
        <h2>Our Services</h2>
        <p className="section-subtitle">Professional landscaping services for residential and commercial properties</p>
        
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.image}</div>
              <h3>{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-price">{service.price}</div>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button 
                className="service-cta"
                onClick={() => setActiveSection('contact')}
              >
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="portfolio-section">
      <div className="container">
        <h2>Our Recent Work</h2>
        <div className="portfolio-grid">
          {portfolio.map(project => (
            <div key={project.id} className="portfolio-item">
              <div className="portfolio-image">
                <img 
                  src={project.image} 
                  alt={`${project.title} - Professional Landscaping Work in Berlin CT by GD Landscaping`}
                  className="portfolio-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="portfolio-placeholder" style={{display: 'none'}}>
                  🏡<br/>Project<br/>Image
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About GD Landscaping</h2>
            <p>
              GD Landscaping is dedicated to transforming outdoor spaces throughout the region. Our team of certified professionals 
              combines creativity with technical expertise to deliver exceptional results.
            </p>
            <p>
              We specialize in both residential and commercial projects, from simple lawn maintenance 
              to complex landscape installations. Our commitment to quality, reliability, and customer 
              satisfaction has made us the preferred choice for property owners who demand the best.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">100+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number">20+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Customer Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="about-placeholder">
              👥<br/>
              Our Expert<br/>
              Team
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I get a quote?</h3>
              <p>Simply fill out our contact form or call us directly. We'll schedule a free consultation to assess your property and provide a detailed estimate.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer maintenance plans?</h3>
              <p>Yes! We offer seasonal and year-round maintenance plans tailored to your landscape's needs. This includes regular mowing, pruning, fertilization, and seasonal cleanups.</p>
            </div>
            <div className="faq-item">
              <h3>Are you licensed and insured?</h3>
              <p>Absolutely. We are fully licensed landscaping professionals with comprehensive liability insurance for your peace of mind.</p>
            </div>
            <div className="faq-item">
              <h3>What areas do you service?</h3>
              <p>We service Berlin, CT and all surrounding communities within a 25-mile radius. Check our service areas section above for the complete list of towns we cover.</p>
            </div>
            <div className="faq-item">
              <h3>Do you handle emergency services?</h3>
              <p>Yes, we provide 24/7 emergency services for storm damage cleanup, fallen trees, and urgent landscape repairs.</p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept cash, check, and all major credit cards. Payment plans are available for larger projects.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="contact-section">
      <div className="container">
        <h2>Get In Touch</h2>
        <p className="section-subtitle">Ready to transform your outdoor space? Contact us today for a free consultation!</p>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <div className="contact-icon">●</div>
              <div>
                <strong>Phone</strong>
                <p>(555) 123-4567</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">●</div>
              <div>
                <strong>Email</strong>
                <p>contact@gdlandscaping.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">●</div>
              <div>
                <strong>Address</strong>
                <p>123 Business St<br/>Your City, ST 12345</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">●</div>
              <div>
                <strong>Business Hours</strong>
                <p>Mon-Fri: 8AM-6PM<br/>Sat: 8AM-4PM<br/>Sun: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Request a Quote</h3>
            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('error') || submitMessage.includes('Sorry') ? 'error' : 'success'}`}>
                {submitMessage}
              </div>
            )}
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <select
                  value={contactForm.service}
                  onChange={(e) => setContactForm({...contactForm, service: e.target.value})}
                  required
                >
                  <option value="">Select a Service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.name}>{service.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Tell us about your project..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows="5"
                  required
                />
              </div>
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="website">
      {/* Fall Cleanup Banner */}
      <div className="fall-banner">
        <div className="banner-content">
          <span className="banner-icon">🍂</span>
          <div className="banner-text">
            <strong>Fall Cleanup Special!</strong> Save 20% on fall cleanup services - Book by October 31st!
          </div>
          <button 
            className="banner-cta"
            onClick={() => setActiveSection('contact')}
          >
            Book Now
          </button>
        </div>
      </div>
      
      {renderNavigation()}
      
      <main className="website-main">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'services' && renderServices()}
        {activeSection === 'portfolio' && renderPortfolio()}
        {activeSection === 'about' && renderAbout()}
        {activeSection === 'contact' && renderContact()}
      </main>

      <footer className="website-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>GD Landscaping</h3>
              <p>Professional landscape solutions for residential and commercial properties.</p>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>Lawn Maintenance</li>
                <li>Landscape Design</li>
                <li>Tree Services</li>
                <li>Hardscaping</li>
                <li>Irrigation Systems</li>
                <li>Outdoor Lighting</li>
                <li>Pressure Washing</li>
                <li>Snow Removal</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Phone: (555) 123-4567</p>
              <p>Email: contact@gdlandscaping.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 GD Landscaping. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;