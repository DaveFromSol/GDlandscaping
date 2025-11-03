import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import { useFirebase } from '../contexts/FirebaseContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactPage = () => {
  const { db } = useFirebase();
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    services: '',
    projectType: '',
    budget: '',
    message: '',
    newsletter: false
  });

  // Pre-fill address if coming from homepage
  useEffect(() => {
    if (location.state?.address) {
      setFormData(prev => ({
        ...prev,
        address: location.state.address
      }));
    }
  }, [location.state]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      setSubmitStatus('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Check if Firebase is properly initialized
      if (!db) {
        throw new Error('Firebase database not initialized');
      }

      // Convert services to display name for admin
      const serviceDisplayNames = {
        'lawn-maintenance': 'Lawn Maintenance',
        'landscape-design': 'Landscape Design',
        'tree-services': 'Tree Services',
        'hardscaping': 'Hardscaping',
        'irrigation': 'Irrigation Systems',
        'seasonal-cleanup': 'Seasonal Cleanup',
        'fertilization': 'Lawn Fertilization',
        'lighting': 'Outdoor Lighting',
        'mulching': 'Mulching Services',
        'pressure-washing': 'Pressure Washing',
        'snow-removal': 'Snow Removal',
        'fall-cleanup': 'Fall Cleanup',
        'multiple': 'Multiple Services',
        'other': 'Other'
      };

      console.log('Attempting to submit form data to Firebase...');

      // Create quote data for Firebase
      const quoteData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email || '',
        phone: formData.phone,
        address: formData.address || '',
        service: serviceDisplayNames[formData.services] || formData.services || 'General Inquiry',
        description: `Property Type: ${formData.projectType || 'Not specified'}
Budget Range: ${formData.budget || 'Not specified'}
Project Details: ${formData.message || 'No additional details provided'}
Newsletter Signup: ${formData.newsletter ? 'Yes' : 'No'}`,
        status: 'Pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: 'website-contact-form',
        source: 'Contact Form'
      };

      console.log('Quote data prepared:', quoteData);

      // Save to Firebase
      const docRef = await addDoc(collection(db, 'quotes'), quoteData);
      console.log('Document successfully written with ID:', docRef.id);

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        services: '',
        projectType: '',
        budget: '',
        message: '',
        newsletter: false
      });

    } catch (error) {
      console.error('Form submission error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);

      // Provide more specific error messages with actionable solutions
      if (error.code === 'permission-denied') {
        setSubmitStatus('Database access denied. The form data couldn\'t be saved due to security settings. Please call us directly at (860) 526-7583 for immediate assistance.');
      } else if (error.code === 'unavailable' || error.code === 'not-found') {
        setSubmitStatus('Database service temporarily unavailable. Your request couldn\'t be saved, but please call us at (860) 526-7583 and we\'ll help you immediately.');
      } else if (error.code === 'deadline-exceeded' || error.message.includes('timeout')) {
        setSubmitStatus('Request timed out. The form submission is taking too long. Please try again or call us directly at (860) 526-7583.');
      } else if (error.message.includes('Failed to get document')) {
        setSubmitStatus('Database connection failed. Please ensure you have a stable internet connection and try again, or call us at (860) 526-7583.');
      } else {
        setSubmitStatus('An unexpected error occurred. Please call us directly at (860) 526-7583 for immediate assistance with your quote request.');
      }

      // Also provide console information for debugging
      console.log('🔧 Debugging info for developer:');
      console.log('- Check if Firestore database is created in Firebase Console');
      console.log('- Verify Firestore security rules allow writes');
      console.log('- Ensure project ID is correct in firebase config');
      console.log('- Check network connectivity to Firebase services');
    }

    setIsSubmitting(false);
  };

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
      "url": "https://www.gdlandscapingllc.com"
    }
  };

  return (
    <>
      <SEOHead
        title="Contact GD Landscaping | Free Quotes - Berlin CT Lawn Care & Snow Removal Services"
        description="Get your free landscaping quote today! Contact GD Landscaping in Berlin CT for lawn care, snow removal, and landscaping services. Same-day response guaranteed."
        keywords="contact GD Landscaping Berlin CT, free landscaping quote Connecticut, lawn care estimate Hartford County, snow removal quote Berlin, landscaping consultation CT, instant lawn quote Berlin"
        canonicalUrl="https://www.gdlandscapingllc.com/contact"
        ogImage="/GD.png"
        ogType="website"
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

          {/* Instant Quote Section */}
          <div style={{
            margin: '40px 0',
            padding: '32px',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              color: '#2d5016',
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              Get Your Instant Lawn Care Quote
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Enter your address to see your property boundary and get accurate pricing in seconds
            </p>
            <AddressAutocomplete />
          </div>

          <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
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

              <div className="contact-item">
                <div className="contact-icon">🚒</div>
                <div className="contact-details">
                  <h3>Firefighter-Owned</h3>
                  <p>Proudly owned and operated by a local Berlin firefighter</p>
                  <small>Committed to serving our community with integrity</small>
                </div>
              </div>
            </div>

            <div className="contact-form bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 w-full max-w-none">
              <div className="form-header">
                <h2>Request Your Free Quote</h2>
                <p className="form-subtitle">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2 text-sm">First Name *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>

                <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Property Address</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address, City, State" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="services">Services Needed</label>
                  <select 
                    id="services" 
                    name="services"
                    value={formData.services}
                    onChange={handleInputChange}
                  >
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
                    <option value="snow-removal">Snow Removal</option>
                    <option value="fall-cleanup">Fall Cleanup</option>
                    <option value="multiple">Multiple Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="projectType">Property Type</label>
                  <select 
                    id="projectType" 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select property type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="hoa">HOA/Community</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Estimated Budget Range</label>
                  <select 
                    id="budget" 
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                  >
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
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, timeline, specific needs, or any questions you have..."
                  ></textarea>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      id="newsletter" 
                      name="newsletter" 
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    I'd like to receive seasonal landscaping tips and service reminders
                  </label>
                </div>

                {submitStatus && (
                  <div className={`form-status ${submitStatus === 'success' ? 'success' : 'error'}`}>
                    {submitStatus === 'success' 
                      ? '✅ Thank you! Your quote request has been sent successfully. We\'ll contact you within 24 hours.' 
                      : submitStatus === 'error'
                      ? '❌ Sorry, there was an error sending your message. Please try again or call us directly.'
                      : submitStatus
                    }
                  </div>
                )}

                <button 
                  type="submit" 
                  className="submit-btn w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none text-lg uppercase tracking-wide"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Get My Free Quote'}
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