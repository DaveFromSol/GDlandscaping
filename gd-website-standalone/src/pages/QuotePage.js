import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFirebase } from '../contexts/FirebaseContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './QuotePage.css';

const QuotePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { db } = useFirebase();

  // Get property data from navigation state
  const { address, coordinates, propertySize } = location.state || {};

  // Booking form state
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Redirect to home if no property data
  useEffect(() => {
    if (!address || !propertySize) {
      navigate('/');
    }
  }, [address, propertySize, navigate]);

  // Service state - each service has: enabled, frequency (one-time, weekly, bi-weekly, monthly)
  const [services, setServices] = useState({
    lawnMowing: { enabled: true, frequency: 'weekly', price: 0 },
    bushTrimming: {
      enabled: false,
      frequency: 'one-time',
      price: 0,
      bushes: {
        small: 0,    // 1-3 feet: $10 each
        medium: 0,   // 3-7 feet: $20 each
        large: 0,    // 7-15 feet: $30 each
        xlarge: 0    // 15+ feet: $45 each
      }
    },
    leafCleanup: { enabled: false, frequency: 'one-time', price: 85 },
    fertilization: { enabled: false, frequency: 'one-time', price: 65 },
    mulching: { enabled: false, frequency: 'one-time', price: 120 },
    edging: { enabled: false, frequency: 'bi-weekly', price: 25 },
    weeding: { enabled: false, frequency: 'monthly', price: 40 }
  });

  // Calculate base lawn mowing price based on property size
  // $40 minimum, then $5 per 0.1 acre above 0.2 acres
  const calculateBaseLawnPrice = () => {
    if (!propertySize?.acres) return 40;

    const acres = parseFloat(propertySize.acres);

    // Minimum price is $40 for properties up to 0.2 acres
    if (acres <= 0.2) {
      return 40;
    }

    // Above 0.2 acres: add $5 for every 0.1 acre
    const additionalAcres = acres - 0.2;
    const additionalIncrements = Math.ceil(additionalAcres / 0.1);
    const additionalPrice = additionalIncrements * 5;

    return 40 + additionalPrice;
  };

  // Update lawn mowing price when property size changes
  useEffect(() => {
    setServices(prev => ({
      ...prev,
      lawnMowing: {
        ...prev.lawnMowing,
        price: calculateBaseLawnPrice()
      }
    }));
  }, [propertySize]);

  // Toggle service enabled/disabled
  const toggleService = (serviceName) => {
    setServices(prev => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        enabled: !prev[serviceName].enabled
      }
    }));
  };

  // Change service frequency
  const changeFrequency = (serviceName, frequency) => {
    setServices(prev => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        frequency
      }
    }));
  };

  // Update bush count for a specific size category
  const updateBushCount = (size, count) => {
    const newCount = Math.max(0, count); // Ensure non-negative
    setServices(prev => {
      const newBushes = {
        ...prev.bushTrimming.bushes,
        [size]: newCount
      };

      // Calculate total bush trimming price
      const price = (
        newBushes.small * 10 +
        newBushes.medium * 20 +
        newBushes.large * 30 +
        newBushes.xlarge * 45
      );

      return {
        ...prev,
        bushTrimming: {
          ...prev.bushTrimming,
          bushes: newBushes,
          price: price
        }
      };
    });
  };

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;

    Object.entries(services).forEach(([name, service]) => {
      if (service.enabled) {
        let price = service.price;

        // Apply frequency multiplier for recurring services
        if (service.frequency === 'weekly') {
          price = price * 4; // Monthly cost (4 weeks)
          price = price * 0.8; // 20% discount for weekly service
        } else if (service.frequency === 'bi-weekly') {
          price = price * 2; // Monthly cost (2 services)
        }
        // monthly stays as-is
        // one-time is just added once

        total += price;
      }
    });

    return total;
  };

  // Service display names and descriptions
  const serviceInfo = {
    lawnMowing: {
      name: 'Lawn Mowing',
      description: 'Professional mowing with edging and cleanup',
      icon: '🌱'
    },
    bushTrimming: {
      name: 'Bush Trimming',
      description: 'Precision trimming and shaping of shrubs',
      icon: '✂️'
    },
    leafCleanup: {
      name: 'Leaf Cleanup',
      description: 'Complete leaf removal and disposal',
      icon: '🍂'
    },
    fertilization: {
      name: 'Fertilization',
      description: 'Professional lawn fertilization treatment',
      icon: '🌿'
    },
    mulching: {
      name: 'Mulching',
      description: 'Fresh mulch installation in garden beds',
      icon: '🪵'
    },
    edging: {
      name: 'Edging',
      description: 'Clean border definition along walkways',
      icon: '📏'
    },
    weeding: {
      name: 'Weeding',
      description: 'Garden bed and landscape weeding',
      icon: '🌾'
    }
  };

  // Handle booking submission
  const handleBookService = async () => {
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.preferredDate) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Build service summary
      const selectedServices = Object.entries(services)
        .filter(([_, service]) => service.enabled)
        .map(([name, service]) => ({
          name: serviceInfo[name].name,
          frequency: service.frequency,
          price: service.price,
          ...(name === 'bushTrimming' && service.bushes ? { bushes: service.bushes } : {})
        }));

      // Save booking to Firebase
      const booking = {
        ...bookingData,
        address,
        coordinates,
        propertySize,
        services: selectedServices,
        totalPrice: calculateTotal(),
        status: 'pending',
        source: 'Instant Quote',
        createdAt: serverTimestamp(),
        type: 'booking'
      };

      await addDoc(collection(db, 'bookings'), booking);

      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Proceed to contact page with quote details
  const proceedToContact = () => {
    // Build service summary
    const selectedServices = Object.entries(services)
      .filter(([_, service]) => service.enabled)
      .map(([name, service]) => ({
        name: serviceInfo[name].name,
        frequency: service.frequency,
        price: service.price
      }));

    navigate('/contact', {
      state: {
        address,
        coordinates,
        propertySize,
        quote: {
          services: selectedServices,
          total: calculateTotal()
        }
      }
    });
  };

  if (!address || !propertySize) {
    return null; // Will redirect
  }

  return (
    <div className="quote-page">
      <div className="quote-container">
        <div className="quote-header">
          <h1 style={{ color: 'white' }}>Lawn Care Instant Quote</h1>
          <div className="property-info">
            <p className="address">{address}</p>
            <p className="size">
              {propertySize.acres} acres ({propertySize.sqFt?.toLocaleString()} sq ft)
            </p>
          </div>
        </div>

        <div className="quote-content">
          <div className="services-section">
            <h2>Select Your Services</h2>
            <p className="section-description">
              Choose from our services below and select if you want them as a one-time service or on a recurring schedule.
            </p>

            <div className="services-list">
              {Object.entries(services).map(([serviceName, service]) => (
                <div
                  key={serviceName}
                  className={`service-card ${service.enabled ? 'enabled' : ''}`}
                >
                  <div className="service-header">
                    <div className="service-info-left">
                      <span className="service-icon">{serviceInfo[serviceName].icon}</span>
                      <div className="service-name-desc">
                        <h3>{serviceInfo[serviceName].name}</h3>
                        <p>{serviceInfo[serviceName].description}</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={service.enabled}
                        onChange={() => toggleService(serviceName)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  {service.enabled && (
                    <>
                      {/* Bush Trimming - Special UI for selecting bush sizes */}
                      {serviceName === 'bushTrimming' && (
                        <div className="bush-selection">
                          <label className="frequency-label">Select Number of Bushes by Size:</label>
                          <div className="bush-size-options">
                            <div className="bush-size-input">
                              <label>
                                <span className="size-label">1-3 feet</span>
                                <span className="size-price">$10 each</span>
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={service.bushes.small}
                                onChange={(e) => updateBushCount('small', parseInt(e.target.value) || 0)}
                                placeholder="0"
                              />
                            </div>
                            <div className="bush-size-input">
                              <label>
                                <span className="size-label">3-7 feet</span>
                                <span className="size-price">$20 each</span>
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={service.bushes.medium}
                                onChange={(e) => updateBushCount('medium', parseInt(e.target.value) || 0)}
                                placeholder="0"
                              />
                            </div>
                            <div className="bush-size-input">
                              <label>
                                <span className="size-label">7-15 feet</span>
                                <span className="size-price">$30 each</span>
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={service.bushes.large}
                                onChange={(e) => updateBushCount('large', parseInt(e.target.value) || 0)}
                                placeholder="0"
                              />
                            </div>
                            <div className="bush-size-input">
                              <label>
                                <span className="size-label">15+ feet</span>
                                <span className="size-price">$45 each</span>
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={service.bushes.xlarge}
                                onChange={(e) => updateBushCount('xlarge', parseInt(e.target.value) || 0)}
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="service-options">
                        <div className="frequency-options">
                          <label className="frequency-label">Service Frequency:</label>
                          <div className="frequency-buttons">
                            <button
                              className={`frequency-btn ${service.frequency === 'one-time' ? 'active' : ''}`}
                              onClick={() => changeFrequency(serviceName, 'one-time')}
                            >
                              One-Time
                            </button>
                            <button
                              className={`frequency-btn ${service.frequency === 'weekly' ? 'active' : ''}`}
                              onClick={() => changeFrequency(serviceName, 'weekly')}
                            >
                              Weekly
                            </button>
                            <button
                              className={`frequency-btn ${service.frequency === 'bi-weekly' ? 'active' : ''}`}
                              onClick={() => changeFrequency(serviceName, 'bi-weekly')}
                            >
                              Bi-Weekly
                            </button>
                            <button
                              className={`frequency-btn ${service.frequency === 'monthly' ? 'active' : ''}`}
                              onClick={() => changeFrequency(serviceName, 'monthly')}
                            >
                              Monthly
                            </button>
                          </div>
                        </div>

                        <div className="service-price">
                          {service.frequency === 'one-time' ? (
                            <span className="price">${service.price}</span>
                          ) : (
                            <div className="recurring-price">
                              <span className="price-label">
                                ${service.price} per service
                              </span>
                              <span className="monthly-price">
                                ${service.frequency === 'weekly' ? Math.round(service.price * 4 * 0.8) :
                                   service.frequency === 'bi-weekly' ? service.price * 2 :
                                   service.price}/month
                                {service.frequency === 'weekly' && (
                                  <span className="discount-badge">20% off</span>
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="quote-summary">
            <div className="summary-card">
              <h2>Quote Summary</h2>

              <div className="summary-items">
                {Object.entries(services)
                  .filter(([_, service]) => service.enabled)
                  .map(([serviceName, service]) => (
                    <div key={serviceName} className="summary-item">
                      <div className="item-name">
                        <span>{serviceInfo[serviceName].icon}</span>
                        <span>{serviceInfo[serviceName].name}</span>
                        <span className="frequency-badge">{service.frequency}</span>
                      </div>
                      <div className="item-price">
                        ${service.frequency === 'weekly' ? Math.round(service.price * 4 * 0.8) :
                          service.frequency === 'bi-weekly' ? service.price * 2 :
                          service.price}
                      </div>
                    </div>
                  ))}
              </div>

              {Object.values(services).filter(s => s.enabled).length === 0 && (
                <p className="no-services">No services selected</p>
              )}

              <div className="summary-total">
                <div className="total-label">
                  {Object.values(services).some(s => s.enabled && s.frequency !== 'one-time')
                    ? 'Monthly Total'
                    : 'Total'}
                </div>
                <div className="total-amount">${calculateTotal()}</div>
              </div>

              {!showBookingForm ? (
                <button
                  className="proceed-btn"
                  onClick={() => setShowBookingForm(true)}
                  disabled={Object.values(services).filter(s => s.enabled).length === 0}
                >
                  Book Service
                </button>
              ) : (
                <div className="booking-form">
                  <h3>Your Information</h3>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    required
                  />
                  <input
                    type="date"
                    placeholder="Preferred Start Date *"
                    value={bookingData.preferredDate}
                    onChange={(e) => setBookingData({...bookingData, preferredDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                  <textarea
                    placeholder="Additional notes or special requests (optional)"
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                    rows="3"
                  />

                  {submitSuccess ? (
                    <div className="success-message">
                      Booking submitted successfully! Redirecting...
                    </div>
                  ) : (
                    <>
                      <button
                        className="proceed-btn"
                        onClick={handleBookService}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                      </button>
                      <button
                        className="back-btn"
                        onClick={() => setShowBookingForm(false)}
                        disabled={isSubmitting}
                      >
                        Back to Quote
                      </button>
                    </>
                  )}
                </div>
              )}

              <p className="quote-note">
                This is an estimated quote. Final pricing may vary based on property conditions.
                No payment required at this time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
