import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import AddressAutocomplete from '../components/AddressAutocomplete';
import SEOHead from '../components/SEOHead';
import OptimizedImage from '../components/OptimizedImage';
import { useFirebase } from '../contexts/FirebaseContext';
import './InstantQuotePage.css';

const InstantQuotePage = () => {
  const navigate = useNavigate();
  const { db } = useFirebase();
  const contactFormRef = useRef(null);
  const [contactData, setContactData] = useState({ name: '', phone: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const scrollToContact = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.phone) {
      setSubmitStatus('Please enter your name and phone number.');
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'quotes'), {
        name: contactData.name,
        phone: contactData.phone,
        description: contactData.message || 'No message provided',
        service: 'General Inquiry',
        email: '',
        address: '',
        createdAt: serverTimestamp(),
        createdBy: 'website-instant-quote-contact',
      });
      setSubmitStatus('success');
      setContactData({ name: '', phone: '', message: '' });
    } catch (err) {
      setSubmitStatus('Something went wrong. Please call us at (860) 526-7583.');
    } finally {
      setSubmitting(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "G&D Landscaping Instant Quote System",
    "description": "Get an instant lawn care quote in 30 seconds with property boundary detection and accurate pricing for Berlin CT and surrounding areas",
    "url": "https://www.gdlandscapingllc.com/instant-quote",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free instant lawn care quote"
    },
    "provider": {
      "@type": "LocalBusiness",
      "name": "G&D Landscaping",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Berlin",
        "addressRegion": "CT",
        "addressCountry": "US"
      },
      "telephone": "(860) 526-7583"
    }
  };

  return (
    <>
      <SEOHead
        title="Instant Lawn Care Quote | G&D Landscaping - Free 30-Second Property Quote Berlin CT"
        description="Get your lawn care quote in 30 seconds! See your property boundary on a map + instant accurate pricing. All CT supported. No credit card required. 100% free."
        keywords="instant lawn quote, free lawn care estimate, property boundary detection, lawn mowing quote Berlin CT, instant landscaping quote Connecticut, lawn care pricing Berlin"
        canonicalUrl="https://www.gdlandscapingllc.com/instant-quote"
        ogImage="/GD.png"
        ogType="website"
        structuredData={structuredData}
      />
      <div className="instant-quote-landing">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          {/* Logo */}
          <div className="logo-container">
            <OptimizedImage
              src="/GD.png"
              alt="G&D Landscaping"
              width={200}
              height={200}
              priority={true}
              className="landing-logo"
            />
          </div>

          <h1 className="hero-title">
            Get Your Lawn Care Quote in 30 Seconds
          </h1>
          <p className="hero-subtitle">
            See your exact property boundary on a map + get accurate pricing instantly
          </p>

          {/* Temporary Unavailable Notice */}
          <div className="quote-input-section">
            <div className="unavailable-notice">
              <span className="unavailable-icon">🔧</span>
              <h2 className="unavailable-title">Instant Quote Temporarily Unavailable</h2>
              <p className="unavailable-text">We're working on getting this back up. In the meantime, fill out our contact form and we'll get back to you with a quote right away!</p>
              <button className="contact-scroll-btn contact-scroll-btn-primary" onClick={scrollToContact}>
                Fill Out Contact Form
              </button>
              <a href="tel:8605267583" className="unavailable-call">📞 Or Call Us: (860) 526-7583</a>
            </div>
          </div>

          {/* Social Proof */}
          <div className="social-proof">
            <div className="proof-stat">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Properties Quoted</div>
            </div>
            <div className="proof-stat">
              <div className="stat-number">4.9⭐</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="proof-stat">
              <div className="stat-number">All CT</div>
              <div className="stat-label">Statewide Coverage</div>
            </div>
          </div>

          {/* How It Works - Streamlined */}
          <div className="how-it-works">
            <h2 className="section-heading">How It Works</h2>
            <div className="steps-timeline">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Enter Your Address</h3>
                  <p>Type your property address in the search box above</p>
                </div>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>View Property Map</h3>
                  <p>See your exact property boundary and size</p>
                </div>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Select Services</h3>
                  <p>Choose from lawn mowing, trimming, and more</p>
                </div>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Book Online</h3>
                  <p>Schedule your service instantly</p>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Showcase */}
          <div className="portfolio-showcase">
            <h2 className="section-heading">See Our Professional Work</h2>
            <div className="showcase-grid">
              <div className="showcase-item">
                <div className="showcase-image-wrapper">
                  <OptimizedImage
                    src="/residential-lawn-service-berlin-ct.jpeg"
                    alt="Residential Lawn Service - Professional Landscaping Work in Berlin CT by G&D Landscaping"
                    width={600}
                    height={400}
                  />
                  <div className="showcase-overlay">
                    <div className="showcase-category">Lawn Care</div>
                    <h3>Residential Lawn Service</h3>
                    <p>Premium lawn care and maintenance services</p>
                  </div>
                </div>
              </div>
              <div className="showcase-item">
                <div className="showcase-image-wrapper">
                  <OptimizedImage
                    src="/commercial-property-landscaping-connecticut.jpeg"
                    alt="Commercial Property Care - Professional Landscaping for Businesses in Connecticut"
                    width={600}
                    height={400}
                  />
                  <div className="showcase-overlay">
                    <div className="showcase-category">Commercial</div>
                    <h3>Commercial Property Care</h3>
                    <p>Professional landscaping for commercial properties</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid - Enhanced */}
          <div className="benefits-section">
            <h2 className="section-heading">Why Choose Our Instant Quote System?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">🗺️</div>
                </div>
                <h3>See Your Property Boundary</h3>
                <p>View your exact property lines on an interactive map using official town GIS data</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">📏</div>
                </div>
                <h3>Accurate Size Detection</h3>
                <p>We calculate your property size automatically - no guessing, no surprises</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">💰</div>
                </div>
                <h3>Transparent Pricing</h3>
                <p>See exactly what you'll pay based on your actual property size</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">⚡</div>
                </div>
                <h3>Book Instantly</h3>
                <p>Choose your services and schedule online 24/7 - no phone calls needed</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">🏘️</div>
                </div>
                <h3>All of CT Supported</h3>
                <p>Statewide property data coverage across all Connecticut towns and cities</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">✅</div>
                </div>
                <h3>No Commitment</h3>
                <p>Get your quote with zero obligation - see pricing before you decide</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="cta-section">
            <h2>Ready to See Your Instant Quote?</h2>
            <p>Enter your address above to get started</p>
            <button
              className="back-button"
              onClick={() => navigate('/')}
            >
              Visit Our Main Website
            </button>
          </div>
        </div>
      </div>

      {/* Simple Contact Form */}
      <div className="simple-contact-section" ref={contactFormRef}>
        <div className="simple-contact-inner">
          <h2 className="simple-contact-title">Not Sure? We'll Help You Out</h2>
          <p className="simple-contact-subtitle">Leave your name and number and we'll call you back with a quote.</p>
          {submitStatus === 'success' ? (
            <div className="contact-success">
              <span>✓</span> Got it! We'll give you a call soon.
            </div>
          ) : (
            <form className="simple-contact-form" onSubmit={handleContactSubmit}>
              <input
                className="simple-contact-input"
                type="text"
                placeholder="Your Name"
                value={contactData.name}
                onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
              />
              <input
                className="simple-contact-input"
                type="tel"
                placeholder="Phone Number"
                value={contactData.phone}
                onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
              />
              <textarea
                className="simple-contact-input simple-contact-textarea"
                placeholder="Anything you'd like us to know? (optional)"
                rows={3}
                value={contactData.message}
                onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
              />
              {submitStatus && submitStatus !== 'success' && (
                <p className="contact-error">{submitStatus}</p>
              )}
              <button className="simple-contact-submit" type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send My Info'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <p>© 2025 G&D Landscaping LLC</p>
          <p>Professional lawn care services in Connecticut</p>
          <p className="footer-phone">📞 (860) 526-7583</p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default InstantQuotePage;
