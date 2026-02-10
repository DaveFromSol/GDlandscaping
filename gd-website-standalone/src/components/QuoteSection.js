import React from 'react';
import DetailedQuoteForm from './DetailedQuoteForm';

const QuoteSection = ({
  title = 'Get Your Free Quote Today',
  subtitle = 'Choose your preferred method to request a quote - instant or detailed form',
  locationName = '',
  source = 'Website Quote Form'
}) => {
  const locationLabel = locationName ? `${locationName} ` : '';

  return (
    <section className="quote-section">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2>{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="contact-form-grid">
          <DetailedQuoteForm
            locationName={locationName}
            source={source}
            headline={`Request a ${locationLabel}Quote`}
            subheadline="Fill out the form and we'll get back to you within 24 hours"
          />

          <div className="quote-sidebar">
            <div className="quote-contact-card">
              <h3>Contact Information</h3>

              <div className="contact-row">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>(860) 526-7583</p>
                  <small>Call for immediate service</small>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p>contact@gdlandscaping.com</p>
                  <small>We'll respond within 24 hours</small>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-icon">⏰</div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon - Fri: 7:00 AM - 6:00 PM</p>
                  <p>Saturday: 8:00 AM - 5:00 PM</p>
                  <p>Sunday: Emergency calls only</p>
                </div>
              </div>
            </div>

            <div className="quote-why-card">
              <h3>Why Choose G&D Landscaping?</h3>
              <ul>
                <li>
                  <span>✓</span>
                  Licensed & Insured
                </li>
                <li>
                  <span>✓</span>
                  Free Estimates
                </li>
                <li>
                  <span>✓</span>
                  Same-Day Response
                </li>
                <li>
                  <span>✓</span>
                  100% Satisfaction Guarantee
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
