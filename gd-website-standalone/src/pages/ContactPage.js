import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
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
    message: '',
  });

  useEffect(() => {
    if (location.state?.address) {
      setFormData(prev => ({ ...prev, address: location.state.address }));
    }
  }, [location.state]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      setSubmitStatus('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('');

    const serviceDisplayNames = {
      'lawn-maintenance': 'Lawn Maintenance',
      'landscape-design': 'Landscape Design',
      'hardscaping': 'Hardscaping',
      'seasonal-cleanup': 'Seasonal Cleanup',
      'fertilization': 'Lawn Fertilization',
      'mulching': 'Mulching Services',
      'snow-removal': 'Snow Removal',
      'fall-cleanup': 'Fall Cleanup',
      'spring-cleanup': 'Spring Cleanup',
      'bush-trimming': 'Bush Trimming',
      'multiple': 'Multiple Services',
      'other': 'Other'
    };

    try {
      if (!db) throw new Error('Firebase not initialized');

      await addDoc(collection(db, 'quotes'), {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email || '',
        phone: formData.phone,
        address: formData.address || '',
        service: serviceDisplayNames[formData.services] || formData.services || 'General Inquiry',
        description: `Property Type: ${formData.projectType || 'Not specified'}\nProject Details: ${formData.message || 'No additional details'}`,
        status: 'Pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: 'website-contact-form',
        source: 'Contact Form',
      });

      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '', services: '', projectType: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      if (error.code === 'permission-denied') {
        setSubmitStatus('error-permission');
      } else {
        setSubmitStatus('error');
      }
    }

    setIsSubmitting(false);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "G&D Landscaping",
      "description": "Professional landscaping and snow removal services across Hartford, Middlesex, New Haven, and Tolland Counties, CT",
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
        title="Contact G&D Landscaping | Free Quotes — Hartford County, CT Lawn Care & Snow Removal"
        description="Contact G&D Landscaping for a free quote on lawn care, snow removal, spring & fall cleanups, and more. Serving Hartford, Middlesex, New Haven, and Tolland Counties, CT. Licensed HIC.0704814."
        keywords="contact G&D Landscaping Berlin CT, free landscaping quote Connecticut, lawn care estimate Hartford County, snow removal quote Berlin, landscaping consultation CT"
        canonicalUrl="https://www.gdlandscapingllc.com/contact"
        ogImage="/GD.png"
        ogType="website"
        structuredData={structuredData}
      />

      <div className="contact-page">

        {/* Hero */}
        <div className="contact-page-hero">
          <div className="container">
            <h1>Get a Free Quote</h1>
            <p>Serving Hartford, Middlesex, New Haven &amp; Tolland Counties — 65+ towns across Central Connecticut.</p>
            <div className="contact-page-badges">
              <span>⚡ 12-Hour Response</span>
              <span>💰 Free Estimates</span>
              <span>🛡️ Licensed &amp; Insured</span>
              <span>🚒 Firefighter-Owned</span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="contact-page-grid">

            {/* Form — left col on desktop, first on mobile */}
            <div className="contact-page-form-col">
              <div className="contact-page-form-card">
                <h2>Request Your Free Quote</h2>
                <p className="contact-page-form-sub">We'll call you back within 12 hours.</p>

                <form onSubmit={handleSubmit} className="contact-page-form">
                  <div className="contact-page-row">
                    <div className="contact-page-field">
                      <label htmlFor="firstName">First Name *</label>
                      <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div className="contact-page-field">
                      <label htmlFor="lastName">Last Name *</label>
                      <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="contact-page-row">
                    <div className="contact-page-field">
                      <label htmlFor="phone">Phone Number *</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                    <div className="contact-page-field">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="contact-page-field">
                    <label htmlFor="address">Property Address</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street address, City, State" />
                  </div>

                  <div className="contact-page-row">
                    <div className="contact-page-field">
                      <label htmlFor="services">Service Needed</label>
                      <select id="services" name="services" value={formData.services} onChange={handleInputChange}>
                        <option value="">Select a service</option>
                        <option value="lawn-maintenance">Lawn Maintenance</option>
                        <option value="snow-removal">Snow Removal</option>
                        <option value="fall-cleanup">Fall Cleanup</option>
                        <option value="spring-cleanup">Spring Cleanup</option>
                        <option value="bush-trimming">Bush Trimming</option>
                        <option value="fertilization">Fertilization &amp; Weed Control</option>
                        <option value="mulching">Mulching</option>
                        <option value="hardscaping">Hardscaping</option>
                        <option value="landscape-design">Landscape Design</option>
                        <option value="multiple">Multiple Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="contact-page-field">
                      <label htmlFor="projectType">Property Type</label>
                      <select id="projectType" name="projectType" value={formData.projectType} onChange={handleInputChange}>
                        <option value="">Select type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="hoa">HOA / Community</option>
                      </select>
                    </div>
                  </div>

                  <div className="contact-page-field">
                    <label htmlFor="message">Project Details</label>
                    <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange} placeholder="Tell us about your project, timeline, or any questions..." />
                  </div>

                  {submitStatus && submitStatus !== 'success' && (
                    <div className="contact-page-status error">
                      {submitStatus === 'error-permission'
                        ? '❌ Database access issue — please call us directly at (860) 526-7583.'
                        : submitStatus === 'error'
                        ? '❌ Something went wrong. Please try again or call (860) 526-7583.'
                        : `❌ ${submitStatus}`}
                    </div>
                  )}

                  {submitStatus === 'success' && (
                    <div className="contact-page-status success">
                      ✅ Got it! We'll call you back within 12 hours.
                    </div>
                  )}

                  <button type="submit" className="contact-page-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Get My Free Quote →'}
                  </button>
                </form>
              </div>
            </div>

            {/* Info — right col on desktop, second on mobile */}
            <div className="contact-page-info-col">

              <div className="contact-page-info-card">
                <h3>Contact Us Directly</h3>

                <a href="tel:8605267583" className="contact-page-call-btn">
                  📞 (860) 526-7583
                </a>

                <div className="contact-page-info-item">
                  <span className="contact-page-info-icon">✉️</span>
                  <div>
                    <strong>Email</strong>
                    <p>contact@gdlandscaping.com</p>
                  </div>
                </div>

                <div className="contact-page-info-item">
                  <span className="contact-page-info-icon">⏰</span>
                  <div>
                    <strong>Hours</strong>
                    <p>Mon–Fri: 7:00 AM – 6:00 PM</p>
                    <p>Saturday: 8:00 AM – 5:00 PM</p>
                    <p>Sunday: Emergency calls only</p>
                  </div>
                </div>

                <div className="contact-page-info-item">
                  <span className="contact-page-info-icon">📍</span>
                  <div>
                    <strong>Service Area</strong>
                    <p>Hartford, Middlesex, New Haven &amp; Tolland Counties — Berlin, New Britain, Bristol, Cromwell, Middletown, West Hartford, Newington, Rocky Hill, and 65+ towns.</p>
                  </div>
                </div>

                <div className="contact-page-info-item">
                  <span className="contact-page-info-icon">📋</span>
                  <div>
                    <strong>License</strong>
                    <p>Home Improvement Contractor<br />HIC.0704814</p>
                  </div>
                </div>

                <div className="contact-page-info-item">
                  <span className="contact-page-info-icon">🚒</span>
                  <div>
                    <strong>Firefighter-Owned</strong>
                    <p>Locally owned and operated — committed to serving our community with integrity.</p>
                  </div>
                </div>
              </div>

              <div className="contact-page-emergency-card">
                <div className="contact-page-emergency-icon">🚨</div>
                <h3>24/7 Emergency Service</h3>
                <p>Storm damage? Tree down? We're available around the clock.</p>
                <a href="tel:8605267583" className="contact-page-emergency-btn">
                  Call Emergency Line
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
