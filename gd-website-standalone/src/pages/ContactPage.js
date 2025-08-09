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
      "telephone": "(555) 123-4567",
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
            <h1>Contact GD Landscaping</h1>
            <p className="section-subtitle">Ready to transform your outdoor space? Get in touch for a free consultation and quote.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>(555) 123-4567</p>
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
              <h2>Request Your Free Quote</h2>
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
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" required />
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
                    <option value="under-500">Under $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-2500">$1,000 - $2,500</option>
                    <option value="2500-5000">$2,500 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="over-10000">Over $10,000</option>
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
            <div className="emergency-info">
              <h3>🚨 Emergency Services</h3>
              <p>Tree down? Storm damage? We offer 24/7 emergency landscaping services for urgent situations.</p>
              <a href="tel:(555)123-4567" className="emergency-btn">Call Emergency Line: (555) 123-4567</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;