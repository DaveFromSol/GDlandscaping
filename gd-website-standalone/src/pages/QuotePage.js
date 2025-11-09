import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFirebase } from '../contexts/FirebaseContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './QuotePage.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZHJpY2h0ZXIwNiIsImEiOiJjbWd0anR3ZXEwNTUwMnNwdDRmaDZ5ZndiIn0.UbCV_Y8l1Duq9B2Q77OFCw';

const QuotePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { db, auth, user } = useFirebase();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Get property data from navigation state
  const { address, coordinates, propertySize, parcelGeometry } = location.state || {};

  // Booking form state
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    notes: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

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
        small: 0,    // 1-3 feet: $12.50 each
        medium: 0,   // 3-7 feet: $25 each
        large: 0,    // 7-15 feet: $37.50 each
        xlarge: 0    // 15+ feet: $56.25 each
      }
    },
    leafCleanup: { enabled: false, frequency: 'one-time', price: 0, applyFallDiscount: false },
    fertilization: { enabled: false, frequency: 'one-time', price: 81 }
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

  // Calculate leaf cleanup price based on property size
  // $125 minimum, then $25 per 0.1 acre above 0.2 acres
  const calculateLeafCleanupPrice = () => {
    if (!propertySize?.acres) return 125;

    const acres = parseFloat(propertySize.acres);

    // Minimum price is $125 for properties up to 0.2 acres
    if (acres <= 0.2) {
      return 125;
    }

    // Above 0.2 acres: add $25 for every 0.1 acre
    const additionalAcres = acres - 0.2;
    const additionalIncrements = Math.ceil(additionalAcres / 0.1);
    const additionalPrice = additionalIncrements * 25;

    return 125 + additionalPrice;
  };

  // Update lawn mowing and leaf cleanup prices when property size changes
  useEffect(() => {
    setServices(prev => ({
      ...prev,
      lawnMowing: {
        ...prev.lawnMowing,
        price: calculateBaseLawnPrice()
      },
      leafCleanup: {
        ...prev.leafCleanup,
        price: calculateLeafCleanupPrice()
      }
    }));
  }, [propertySize]);

  // Auto-fill user info when logged in
  useEffect(() => {
    if (user) {
      setBookingData(prev => ({
        ...prev,
        name: prev.name || user.displayName || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || !coordinates || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates,
      zoom: 18,
      attributionControl: false
    });

    mapRef.current = map;

    map.on('load', () => {
      // Add parcel boundary if available
      if (parcelGeometry && parcelGeometry.rings) {
        const coordinates = parcelGeometry.rings[0].map(coord => [coord[0], coord[1]]);

        map.addSource('parcel', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [coordinates]
            }
          }
        });

        map.addLayer({
          id: 'parcel-fill',
          type: 'fill',
          source: 'parcel',
          paint: {
            'fill-color': '#22c55e',
            'fill-opacity': 0.3
          }
        });

        map.addLayer({
          id: 'parcel-outline',
          type: 'line',
          source: 'parcel',
          paint: {
            'line-color': '#16a34a',
            'line-width': 3
          }
        });
      }

      // Add property marker
      new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat(coordinates)
        .addTo(map);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [coordinates, parcelGeometry]);

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
        newBushes.small * 12.50 +
        newBushes.medium * 25 +
        newBushes.large * 37.50 +
        newBushes.xlarge * 56.25
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

  // Toggle fall cleanup discount
  const toggleFallDiscount = () => {
    setServices(prev => ({
      ...prev,
      leafCleanup: {
        ...prev.leafCleanup,
        applyFallDiscount: !prev.leafCleanup.applyFallDiscount
      }
    }));
  };

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;

    Object.entries(services).forEach(([name, service]) => {
      if (service.enabled) {
        let price = service.price;

        // Apply 20% fall cleanup discount if selected
        if (name === 'leafCleanup' && service.applyFallDiscount) {
          price = price * 0.8; // 20% off
        }

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
    }
  };

  // Handle booking submission - create account and save booking
  const handleBookService = async () => {
    setFormError('');

    // Validation
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.preferredDate) {
      setFormError('Please fill in all required fields');
      return;
    }

    // If user is not logged in, they need to create account
    if (!user) {
      if (!bookingData.password || !bookingData.confirmPassword) {
        setFormError('Please create a password for your account');
        return;
      }

      if (bookingData.password !== bookingData.confirmPassword) {
        setFormError('Passwords do not match');
        return;
      }

      if (bookingData.password.length < 6) {
        setFormError('Password must be at least 6 characters');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      let userToSave = user;

      // Create account if user is not logged in
      if (!user) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            bookingData.email,
            bookingData.password
          );
          userToSave = userCredential.user;

          // Update profile with name
          if (bookingData.name) {
            await updateProfile(userToSave, {
              displayName: bookingData.name
            });
          }
        } catch (authError) {
          if (authError.code === 'auth/email-already-in-use') {
            setFormError('This email is already registered. Please login instead or use a different email.');
          } else if (authError.code === 'auth/invalid-email') {
            setFormError('Invalid email address');
          } else {
            setFormError('Failed to create account. Please try again.');
          }
          setIsSubmitting(false);
          return;
        }
      }

      // Build service summary
      const selectedServices = Object.entries(services)
        .filter(([_, service]) => service.enabled)
        .map(([name, service]) => ({
          name: serviceInfo[name].name,
          frequency: service.frequency,
          price: service.price,
          ...(name === 'bushTrimming' && service.bushes ? { bushes: service.bushes } : {}),
          ...(name === 'leafCleanup' && service.applyFallDiscount ? { fallDiscount: true } : {})
        }));

      // Save booking to Firebase (without password fields)
      const booking = {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        preferredDate: bookingData.preferredDate,
        notes: bookingData.notes,
        address,
        coordinates,
        propertySize,
        services: selectedServices,
        totalPrice: calculateTotal(),
        status: 'pending',
        source: 'Instant Quote',
        createdAt: serverTimestamp(),
        type: 'booking',
        userId: userToSave?.uid
      };

      await addDoc(collection(db, 'bookings'), booking);

      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/account');
      }, 2000);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setFormError('Failed to submit booking. Please try again.');
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
        price: service.price,
        ...(name === 'leafCleanup' && service.applyFallDiscount ? { fallDiscount: true } : {})
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
          <div className="header-content">
            <h1 style={{ color: 'white' }}>Lawn Care Instant Quote</h1>
            <div className="property-info">
              <p className="address">{address}</p>
              <p className="size">
                {propertySize.acres} acres ({propertySize.sqFt?.toLocaleString()} sq ft)
              </p>
            </div>
          </div>

          {/* Property Map inside header */}
          <div
            ref={mapContainerRef}
            className="property-map"
            style={{
              width: '100%',
              height: '300px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginTop: '20px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}
          />
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

                      {/* Leaf Cleanup - Fall Discount Option */}
                      {serviceName === 'leafCleanup' && (
                        <div className="discount-section" style={{
                          padding: '15px',
                          background: '#f0f9ff',
                          borderRadius: '8px',
                          marginBottom: '15px',
                          border: '2px solid #3b82f6'
                        }}>
                          <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '600'
                          }}>
                            <input
                              type="checkbox"
                              checked={service.applyFallDiscount}
                              onChange={toggleFallDiscount}
                              style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer'
                              }}
                            />
                            <span>
                              🍂 Apply 20% Fall Cleanup Discount
                              <span style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '400',
                                color: '#666',
                                marginTop: '4px'
                              }}>
                                Save ${Math.round(service.price * 0.2)} on your leaf cleanup service!
                              </span>
                            </span>
                          </label>
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
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                              {serviceName === 'leafCleanup' && service.applyFallDiscount ? (
                                <>
                                  <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '14px' }}>
                                    ${service.price}
                                  </span>
                                  <span className="price" style={{ color: '#16a34a' }}>
                                    ${Math.round(service.price * 0.8)}
                                  </span>
                                  <span className="discount-badge" style={{
                                    background: '#dcfce7',
                                    color: '#16a34a',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    marginTop: '4px'
                                  }}>
                                    20% off
                                  </span>
                                </>
                              ) : (
                                <span className="price">${service.price}</span>
                              )}
                            </div>
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
                        {serviceName === 'leafCleanup' && service.applyFallDiscount && (
                          <span style={{
                            background: '#dcfce7',
                            color: '#16a34a',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            marginLeft: '5px',
                            fontWeight: '600'
                          }}>
                            20% OFF
                          </span>
                        )}
                      </div>
                      <div className="item-price">
                        ${(() => {
                          let price = service.price;

                          // Apply fall discount for leaf cleanup
                          if (serviceName === 'leafCleanup' && service.applyFallDiscount) {
                            price = Math.round(price * 0.8);
                          }

                          // Apply frequency multiplier
                          if (service.frequency === 'weekly') {
                            price = Math.round(price * 4 * 0.8);
                          } else if (service.frequency === 'bi-weekly') {
                            price = price * 2;
                          }

                          return price;
                        })()}
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

                  {formError && (
                    <div className="form-error">
                      {formError}
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    required
                    disabled={!!user}
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    required
                    disabled={!!user}
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

                  {!user && (
                    <>
                      <div className="password-section">
                        <h4>Create Your Account</h4>
                        <p className="password-note">Create a password to save your booking and access it later</p>
                      </div>
                      <input
                        type="password"
                        placeholder="Create Password (min 6 characters) *"
                        value={bookingData.password}
                        onChange={(e) => setBookingData({...bookingData, password: e.target.value})}
                        required
                        minLength="6"
                      />
                      <input
                        type="password"
                        placeholder="Confirm Password *"
                        value={bookingData.confirmPassword}
                        onChange={(e) => setBookingData({...bookingData, confirmPassword: e.target.value})}
                        required
                        minLength="6"
                      />
                    </>
                  )}

                  <textarea
                    placeholder="Additional notes or special requests (optional)"
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                    rows="3"
                  />

                  {submitSuccess ? (
                    <div className="success-message">
                      Booking submitted successfully! Redirecting to your account...
                    </div>
                  ) : (
                    <>
                      <button
                        className="proceed-btn"
                        onClick={handleBookService}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Creating Account & Booking...' : 'Confirm Booking'}
                      </button>
                      <button
                        className="back-btn"
                        onClick={() => {
                          setShowBookingForm(false);
                          setFormError('');
                        }}
                        disabled={isSubmitting}
                      >
                        Back to Quote
                      </button>
                    </>
                  )}
                </div>
              )}

              <p className="quote-note">
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
