import React from 'react';
import SEOHead from '../components/SEOHead';

const ContactPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "GD Landscaping",
      "description": "Professional landscaping services in Berlin CT and surrounding areas",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Berlin",
        "addressRegion": "CT",
        "postalCode": "06037",
        "addressCountry": "US"
      },
      "telephone": "(860) 526-7583",
      "email": "contact@gdlandscaping.com",
      "url": "https://gdlandscaping.com"
    }
  };

  return (
    <>
      <SEOHead
        title="Contact GD Landscaping - Get Your Free Quote Today | Berlin CT Landscaping Services"
        description="Contact GD Landscaping for professional landscaping services in Berlin CT. Get your free quote today for lawn care, landscape design, tree services, and hardscaping."
        keywords="contact GD Landscaping, free landscaping quote Berlin CT, landscaping estimates Hartford County, lawn care consultation Connecticut, tree service quote Berlin CT"
        canonicalUrl="https://gdlandscaping.com/contact"
        structuredData={structuredData}
      />
      
      <div className="contact-section">
        <div className="container">
          <div className="contact-hero">
            <div className="contact-hero-content">
              <div className="contact-badge">
                <span>📞 Get Your Free Quote Today</span>
              </div>
              <h1>Contact GD Landscaping</h1>
              <p className="section-subtitle">Ready to transform your outdoor space? Get in touch for a free consultation and quote.</p>
              <div className="contact-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">⚡</span>
                  <span>Same-Day Response</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">💰</span>
                  <span>Free Estimates</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🛡️</span>
                  <span>Licensed & Insured</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-header">
                <h2>Get In Touch</h2>
                <div className="section-line"></div>
              </div>
              <div className="contact-notice">
                <div className="notice-icon">📞</div>
                <div className="notice-content">
                  <h4>Call for Immediate Service</h4>
                  <p>Please contact by phone for fastest response and scheduling</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>(860) 526-7583</p>
                  <small>Call for immediate service</small>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>contact@gdlandscaping.com</p>
                  <small>We'll respond within 24 hours</small>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>Service Area</h3>
                  <p>Berlin, CT & Surrounding Areas</p>
                  <small>25-mile service radius</small>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">⏰</div>
                <div className="contact-details">
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                  <p>Saturday: 8:00 AM - 5:00 PM</p>
                  <p>Sunday: Emergency calls only</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <div className="form-header">
                <h2>Request Your Free Quote</h2>
                <p className="form-subtitle">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Property Address</label>
                  <input type="text" id="address" name="address" placeholder="Street address, City, State" />
                </div>

                <div className="form-group">
                  <label htmlFor="services">Services Needed</label>
                  <select id="services" name="services">
                    <option value="">Select a service</option>
                    <option value="lawn-maintenance">Lawn Maintenance</option>
                    <option value="landscape-design">Landscape Design</option>
                    <option value="tree-services">Tree Services</option>
                    <option value="hardscaping">Hardscaping</option>
                    <option value="irrigation">Irrigation Systems</option>
                    <option value="seasonal-cleanup">Seasonal Cleanup</option>
                    <option value="fertilization">Lawn Fertilization</option>
                    <option value="lighting">Outdoor Lighting</option>
                    <option value="mulching">Mulching Services</option>
                    <option value="pressure-washing">Pressure Washing</option>
                    <option value="multiple">Multiple Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="projectType">Property Type</label>
                  <select id="projectType" name="projectType">
                    <option value="">Select property type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="hoa">HOA/Community</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Estimated Budget Range</label>
                  <select id="budget" name="budget">
                    <option value="">Select budget range</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="200-400">$200 - $400</option>
                    <option value="400-600">$400 - $600</option>
                    <option value="600-1000">$600 - $1,000</option>
                    <option value="over-1000">Over $1,000</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    placeholder="Tell us about your project, timeline, specific needs, or any questions you have..."
                  ></textarea>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" id="newsletter" name="newsletter" />
                    <span className="checkmark"></span>
                    I'd like to receive seasonal landscaping tips and service reminders
                  </label>
                </div>

                <button type="submit" className="submit-btn">
                  Get My Free Quote
                </button>
              </form>
            </div>
          </div>

          <div className="emergency-contact">
            <div className="emergency-card">
              <div className="emergency-icon">🚨</div>
              <div className="emergency-content">
                <h3>24/7 Emergency Services</h3>
                <p>Tree down? Storm damage? Urgent landscaping needs? We're here to help around the clock.</p>
                <div className="emergency-features">
                  <span className="feature">✓ Immediate Response</span>
                  <span className="feature">✓ Storm Damage Cleanup</span>
                  <span className="feature">✓ Tree Removal</span>
                  <span className="feature">✓ Safety First</span>
                </div>
                <a href="tel:(860)526-7583" className="emergency-btn">
                  <span className="btn-icon">📞</span>
                  Call Emergency Line: (860) 526-7583
                </a>
              </div>
            </div>
          </div>

          <div className="contact-cta">
            <div className="cta-content">
              <h2>Ready to Start Your Project?</h2>
              <p>Join hundreds of satisfied customers who trust GD Landscaping for their outdoor needs.</p>
              <div className="cta-stats">
                <div className="cta-stat">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="cta-stat">
                  <span className="stat-number">5⭐</span>
                  <span className="stat-label">Average Rating</span>
                </div>
                <div className="cta-stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Emergency Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;