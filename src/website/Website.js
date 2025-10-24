import React, { useState } from 'react';
import './Website.css';
import ContactService from '../services/contactService';

const Website = () => {
  const [activeSection, setActiveSection] = useState('home');
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
    }
  ];

  const portfolio = [
    {
      id: 1,
      title: 'Modern Residential Landscape',
      description: 'Complete front yard transformation with native plants',
      image: '🏡',
      category: 'Residential'
    },
    {
      id: 2,
      title: 'Corporate Office Grounds',
      description: 'Professional landscaping for business complex',
      image: '🏢',
      category: 'Commercial'
    },
    {
      id: 3,
      title: 'Backyard Patio & Garden',
      description: 'Custom patio with integrated garden design',
      image: '🌺',
      category: 'Hardscaping'
    },
    {
      id: 4,
      title: 'Tree Service Project',
      description: 'Large oak tree removal and landscape restoration',
      image: '🌲',
      category: 'Tree Services'
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

    try {
      await ContactService.submitInquiry(contactForm);
      setSubmitMessage('Thank you for your inquiry! We will contact you within 24 hours.');
      setContactForm({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage('Sorry, there was an error submitting your inquiry. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderNavigation = () => (
    <nav className="website-nav">
      <div className="nav-container">
        <div className="logo">
          <h2>🌿 GD Landscaping</h2>
        </div>
        <ul className="nav-menu">
          <li>
            <button 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={() => setActiveSection('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'services' ? 'active' : ''}
              onClick={() => setActiveSection('services')}
            >
              Services
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'portfolio' ? 'active' : ''}
              onClick={() => setActiveSection('portfolio')}
            >
              Portfolio
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={() => setActiveSection('about')}
            >
              About
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={() => setActiveSection('contact')}
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );

  const renderHome = () => (
    <div className="home-section">
      <div className="hero">
        <div className="hero-content">
          <h1>Professional Landscape Solutions</h1>
          <p>Transform your outdoor space with GD Landscaping's expert services. From design to maintenance, we create beautiful landscapes that enhance your property value.</p>
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
        <div className="hero-image">
          <div className="hero-placeholder">
            🏡🌿🌺<br/>
            Beautiful<br/>
            Landscapes
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
        <h2>Our Work</h2>
        <p className="section-subtitle">Take a look at some of our recent landscaping projects</p>
        
        <div className="portfolio-grid">
          {portfolio.map(project => (
            <div key={project.id} className="portfolio-item">
              <div className="portfolio-image">
                <div className="portfolio-placeholder">{project.image}</div>
                <div className="portfolio-overlay">
                  <div className="portfolio-category">{project.category}</div>
                </div>
              </div>
              <div className="portfolio-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
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
              With over 15 years of experience in the landscaping industry, GD Landscaping has been 
              transforming outdoor spaces throughout the region. Our team of certified professionals 
              combines creativity with technical expertise to deliver exceptional results.
            </p>
            <p>
              We specialize in both residential and commercial projects, from simple lawn maintenance 
              to complex landscape installations. Our commitment to quality, reliability, and customer 
              satisfaction has made us the preferred choice for property owners who demand the best.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number">15+</div>
                <div className="stat-label">Years Experience</div>
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
              <div className="contact-icon">📞</div>
              <div>
                <strong>Phone</strong>
                <p>(555) 123-4567</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <strong>Email</strong>
                <p>contact@gdlandscaping.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <strong>Address</strong>
                <p>123 Business St<br/>Your City, ST 12345</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🕒</div>
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
              <h3>🌿 GD Landscaping</h3>
              <p>Professional landscape solutions for residential and commercial properties.</p>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>Lawn Maintenance</li>
                <li>Landscape Design</li>
                <li>Tree Services</li>
                <li>Hardscaping</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>📞 (555) 123-4567</p>
              <p>✉️ contact@gdlandscaping.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 GD Landscaping. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Website;