import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp, doc, setDoc, increment } from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';

const INITIAL_FORM_STATE = {
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
};

const SERVICE_DISPLAY_NAMES = {
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
  other: 'Other'
};

const DetailedQuoteForm = ({
  locationName = '',
  source = 'Website Quote Form',
  headline = 'Request Detailed Quote',
  subheadline = "Fill out the form and we'll get back to you within 24 hours",
  submitButtonText = 'Get My Free Quote'
}) => {
  const { db } = useFirebase();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const normalizedLocation = locationName
    ? locationName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : 'home';

  const inputId = (field) => `${field}-${normalizedLocation}`;

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

      const quoteData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email || '',
        phone: formData.phone,
        address: formData.address || '',
        service: SERVICE_DISPLAY_NAMES[formData.services] || formData.services || 'General Inquiry',
        description: `Property Type: ${formData.projectType || 'Not specified'}
Budget Range: ${formData.budget || 'Not specified'}
Project Details: ${formData.message || 'No additional details provided'}
Newsletter Signup: ${formData.newsletter ? 'Yes' : 'No'}`,
        status: 'Pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: `website-${normalizedLocation}-form`,
        source,
        location: locationName || 'General'
      };

      await addDoc(collection(db, 'quotes'), quoteData);
      setSubmitStatus('success');
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      console.error('Form submission error:', error);
      if (error.code === 'permission-denied') {
        setSubmitStatus('Database access denied. Please call us directly at (860) 526-7583 for immediate assistance.');
      } else {
        setSubmitStatus('An error occurred. Please call us at (860) 526-7583 for immediate assistance.');
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="quote-form-card">
      <div className="form-header">
        <h3>{headline}</h3>
        <p className="form-subtitle">{subheadline}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="quote-form-row">
          <div className="quote-form-group">
            <label htmlFor={inputId('firstName')}>First Name *</label>
            <input
              type="text"
              id={inputId('firstName')}
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="quote-input"
              required
            />
          </div>
          <div className="quote-form-group">
            <label htmlFor={inputId('lastName')}>Last Name *</label>
            <input
              type="text"
              id={inputId('lastName')}
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="quote-input"
              required
            />
          </div>
        </div>

        <div className="quote-form-row">
          <div className="quote-form-group">
            <label htmlFor={inputId('email')}>Email</label>
            <input
              type="email"
              id={inputId('email')}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="quote-input"
            />
          </div>
          <div className="quote-form-group">
            <label htmlFor={inputId('phone')}>Phone *</label>
            <input
              type="tel"
              id={inputId('phone')}
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="quote-input"
              required
            />
          </div>
        </div>

        <div className="quote-form-group">
          <label htmlFor={inputId('address')}>Property Address</label>
          <input
            type="text"
            id={inputId('address')}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Street address, City, State"
            className="quote-input"
          />
        </div>

        <div className="quote-form-group">
          <label htmlFor={inputId('services')}>Services Needed</label>
          <select
            id={inputId('services')}
            name="services"
            value={formData.services}
            onChange={handleInputChange}
            className="quote-input"
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

        <div className="quote-form-row">
          <div className="quote-form-group">
            <label htmlFor={inputId('projectType')}>Property Type</label>
            <select
              id={inputId('projectType')}
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className="quote-input"
            >
              <option value="">Select property type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Multi-family">Multi-family</option>
              <option value="HOA / Condo">HOA / Condo</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="quote-form-group">
            <label htmlFor={inputId('budget')}>Budget Range</label>
            <select
              id={inputId('budget')}
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="quote-input"
            >
              <option value="">Select a range</option>
              <option value="Under $1,000">Under $1,000</option>
              <option value="$1,000 - $3,000">$1,000 - $3,000</option>
              <option value="$3,000 - $5,000">$3,000 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000+">$10,000+</option>
            </select>
          </div>
        </div>

        <div className="quote-form-group">
          <label htmlFor={inputId('message')}>Project Details</label>
          <textarea
            id={inputId('message')}
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your property, timeline, or anything else we should know..."
            className="quote-input"
          ></textarea>
        </div>

        <div className="quote-form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
            />
            Keep me posted on seasonal lawn care tips and promotions
          </label>
        </div>

        {submitStatus && (
          <div className={`quote-form-status ${submitStatus === 'success' ? 'success' : 'error'}`}>
            {submitStatus === 'success'
              ? '✅ Thank you! We will reach out within 24 hours.'
              : submitStatus}
          </div>
        )}

        <button type="submit" className="quote-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default DetailedQuoteForm;
