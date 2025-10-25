import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useFirebase } from '../contexts/FirebaseContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SnowRemovalBerlinPage = () => {
  const { db } = useFirebase();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    services: 'snow-removal',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    if (!formData.firstName || !formData.lastName || !formData.phone) {
      setSubmitStatus('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }

      await addDoc(collection(db, 'quotes'), {
        ...formData,
        location: 'Berlin',
        pageType: 'snow-removal',
        timestamp: serverTimestamp(),
        status: 'new'
      });

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        services: 'snow-removal',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const packages = [
    {
      id: 1,
      name: 'Berlin Basic',
      price: '$500/season',
      description: 'Perfect for Berlin residential properties',
      features: [
        'Driveway snow plowing (up to 2 cars)',
        'Walkway clearing to front door',
        'Front entrance steps cleared',
        'Priority service during storms',
        '24/7 emergency response in Berlin'
      ]
    },
    {
      id: 2,
      name: 'Berlin Premium',
      price: '$1000/season',
      description: 'Complete snow removal for Berlin homes',
      features: [
        'Full driveway and parking area',
        'All walkways and pathways cleared',
        'Front and back entrances',
        'Salt/sand application',
        'Ice removal services',
        'Priority scheduling for Berlin residents',
        '24/7 emergency response'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Berlin Commercial',
      price: 'Custom Pricing',
      description: 'Professional snow removal for Berlin businesses',
      features: [
        'Business parking lot clearing',
        'Sidewalk maintenance per city requirements',
        'Entrance areas kept safe',
        'Salt/sand application',
        'Early morning service before business hours',
        '24/7 emergency response',
        'Liability insurance included'
      ]
    }
  ];

  const berlinAreas = [
    'Downtown Berlin',
    'Kensington',
    'East Berlin',
    'Worthington Ridge',
    'Berlin Center',
    'Country Club Road area',
    'Mill Street area',
    'Christian Lane area'
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Snow Removal Service Berlin CT - GD Landscaping",
    "description": "Professional snow removal services in Berlin, Connecticut. Reliable snow plowing, ice management, and winter maintenance for homes and businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Berlin",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6217,
      "longitude": -72.7551
    },
    "telephone": "(860) 526-7583",
    "url": "https://gdlandscaping.com/snow-removal-berlin-ct",
    "serviceArea": {
      "@type": "City",
      "name": "Berlin, Connecticut"
    }
  };

  return (
    <>
      <SEOHead
        title="Snow Removal Berlin CT | Professional Winter Services | GD Landscaping"
        description="Reliable snow removal services in Berlin, Connecticut. Seasonal packages for homes and businesses. Fast response, professional equipment, fully insured. Call (860) 526-7583."
        keywords="snow removal Berlin CT, snow plowing Berlin Connecticut, winter services Berlin, ice management Berlin CT, residential snow removal Berlin, commercial snow plowing Berlin"
        canonicalUrl="https://gdlandscaping.com/snow-removal-berlin-ct"
        structuredData={structuredData}
      />

      <div className="snow-removal-section">
        {/* Berlin Hero Section */}
        <div className="snow-hero">
          <div className="snow-hero-overlay"></div>
          <div className="snow-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>❄️ Serving Berlin, CT</span>
              </div>
              <h1>Snow Removal Service Berlin CT</h1>
              <p className="hero-subtitle">Professional winter maintenance for Berlin residents and businesses. Your local Berlin snow removal experts keeping properties safe and accessible all season long.</p>
              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Berlin Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Berlin Specific Benefits */}
          <section className="location-benefits">
            <div className="section-header">
              <h2>Why Berlin Chooses GD Landscaping</h2>
              <p className="section-subtitle">We're based right here in Berlin - your local winter maintenance experts</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🏠</div>
                <h3>Based in Berlin</h3>
                <p>We're your neighbors! Fastest possible response times to all Berlin areas including Kensington and East Berlin.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Immediate Response</h3>
                <p>Local Berlin company means we arrive first when storms hit. Priority service for our hometown.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🚛</div>
                <h3>Right Equipment</h3>
                <p>Professional snow plows and salt spreaders sized perfectly for Berlin's residential and commercial properties.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h3>Fair Pricing</h3>
                <p>Competitive seasonal rates for Berlin property owners with transparent, honest pricing.</p>
              </div>
            </div>
          </section>

          {/* Berlin Packages */}
          <section className="packages-section">
            <div className="section-header">
              <h2>Berlin Snow Removal Packages</h2>
              <p className="section-subtitle">Choose the perfect winter maintenance package for your Berlin property</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular in Berlin</div>}
                  <div className="package-header">
                    <h3>{pkg.name}</h3>
                    <div className="package-price">{pkg.price}</div>
                    <p className="package-description">{pkg.description}</p>
                  </div>
                  <div className="package-features">
                    <ul>
                      {pkg.features.map((feature, index) => (
                        <li key={index}>
                          <span className="feature-check">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="package-footer">
                    <Link to="/contact" className="package-btn">
                      Get Berlin Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Berlin Areas Served */}
          <section className="location-areas">
            <div className="section-header">
              <h2>Berlin Areas We Serve</h2>
              <p className="section-subtitle">Complete snow removal coverage throughout Berlin, Connecticut</p>
            </div>

            <div className="areas-content">
              <div className="local-areas">
                <h3>Berlin Neighborhoods & Districts</h3>
                <div className="towns-grid">
                  {berlinAreas.map((area, index) => (
                    <span key={index} className="town">{area}</span>
                  ))}
                </div>
              </div>

              <div className="service-highlights">
                <div className="highlight-item">
                  <h4>🏢 Commercial District</h4>
                  <p>Professional snow removal for Berlin businesses, ensuring customer and employee safety.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏘️ Residential Areas</h4>
                  <p>Reliable home snow removal services throughout all Berlin neighborhoods.</p>
                </div>
                <div className="highlight-item">
                  <h4>🏭 Business Parks</h4>
                  <p>Commercial snow clearance for Berlin's professional office complexes and business parks.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Knowledge Section */}
          <section className="local-knowledge">
            <div className="section-header">
              <h2>Local Berlin Winter Expertise</h2>
            </div>

            <div className="knowledge-content">
              <div className="knowledge-text">
                <h3>We Know Berlin's Winter Challenges</h3>
                <p>As your local Berlin snow removal company, we understand every street, hill, and property type in town:</p>
                <ul>
                  <li><strong>Local Streets:</strong> Familiar with every Berlin road from Route 372 to quiet residential streets</li>
                  <li><strong>Property Types:</strong> Experience with Berlin's mix of historic homes, new developments, and businesses</li>
                  <li><strong>City Requirements:</strong> Know Berlin's regulations and best practices for safe winter maintenance</li>
                  <li><strong>Weather Patterns:</strong> Understanding of how Berlin's location affects snow accumulation and ice formation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            padding: '60px 20px',
            marginTop: '60px'
          }}>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2>Request Your Free Snow Removal Quote</h2>
              <p className="section-subtitle">Get a personalized quote for Berlin snow removal services</p>
            </div>

            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              background: 'white',
              padding: '32px',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}>
              {submitStatus === 'success' && (
                <div style={{
                  padding: '16px',
                  marginBottom: '24px',
                  background: '#d4edda',
                  border: '1px solid #c3e6cb',
                  borderRadius: '8px',
                  color: '#155724'
                }}>
                  Thank you! We'll contact you within 24 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div style={{
                  padding: '16px',
                  marginBottom: '24px',
                  background: '#f8d7da',
                  border: '1px solid #f5c6cb',
                  borderRadius: '8px',
                  color: '#721c24'
                }}>
                  There was an error submitting your request. Please try again or call us.
                </div>
              )}

              {typeof submitStatus === 'string' && submitStatus !== 'success' && submitStatus !== 'error' && submitStatus !== '' && (
                <div style={{
                  padding: '16px',
                  marginBottom: '24px',
                  background: '#fff3cd',
                  border: '1px solid #ffeeba',
                  borderRadius: '8px',
                  color: '#856404'
                }}>
                  {submitStatus}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label htmlFor="firstName" style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px' }}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label htmlFor="email" style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="address" style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>Property Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address, City, State"
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="message" style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>Additional Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell us about your snow removal needs..."
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', fontFamily: 'inherit' }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: isSubmitting ? '#9ca3af' : '#2d5016',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'background 0.3s'
                  }}
                  onMouseOver={(e) => !isSubmitting && (e.target.style.background = '#3d6b1f')}
                  onMouseOut={(e) => !isSubmitting && (e.target.style.background = '#2d5016')}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Quote'}
                </button>
              </form>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="snow-cta">
            <div className="cta-content">
              <h2>Ready for Winter in Berlin?</h2>
              <p>Join your Berlin neighbors who trust GD Landscaping for reliable snow removal. Get your seasonal package today!</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  Get Your Berlin Quote
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  Call (860) 526-7583
                </a>
              </div>
              <p className="service-note">Proudly serving Berlin, CT and surrounding areas • Licensed & Insured • 24/7 Emergency Response</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SnowRemovalBerlinPage;
