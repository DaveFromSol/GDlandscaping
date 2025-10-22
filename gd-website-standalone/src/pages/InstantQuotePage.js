import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddressAutocomplete from '../components/AddressAutocomplete';
import './InstantQuotePage.css';

const InstantQuotePage = () => {
  const navigate = useNavigate();

  return (
    <div className="instant-quote-landing">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Get Your Instant Lawn Care Quote
          </h1>
          <p className="hero-subtitle">
            See your property boundary and get accurate pricing in seconds
          </p>

          {/* Address Input */}
          <div className="quote-input-section">
            <h2 className="input-label">Enter Your Property Address</h2>
            <AddressAutocomplete />
          </div>

          {/* Features */}
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Accurate Property Detection</h3>
              <p>We automatically detect your exact property boundaries using official GIS data</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Instant Pricing</h3>
              <p>Get transparent pricing based on your actual property size - no guesswork</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Book Online 24/7</h3>
              <p>Select your services and book immediately - it's that easy</p>
            </div>
          </div>

          {/* How It Works */}
          <div className="how-it-works">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Enter Address</h3>
                <p>Type your property address above</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>View Your Property</h3>
                <p>See your exact property boundary on a map</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Get Instant Quote</h3>
                <p>Choose services and see pricing immediately</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>Book Service</h3>
                <p>Schedule your lawn care in seconds</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <h2>Ready to Get Started?</h2>
            <p>Enter your address above to see your instant quote</p>
            <button
              className="back-button"
              onClick={() => navigate('/')}
            >
              ← Back to Main Site
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2024 GD Landscaping. Professional lawn care services in Connecticut.</p>
      </footer>
    </div>
  );
};

export default InstantQuotePage;
