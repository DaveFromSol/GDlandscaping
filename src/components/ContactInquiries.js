import React, { useState, useEffect } from 'react';
import ContactService from '../services/contactService';

const ContactInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ContactService.getInquiries();
      setInquiries(data);
    } catch (error) {
      console.error('Error loading inquiries:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (inquiryId, newStatus) => {
    try {
      await ContactService.updateInquiryStatus(inquiryId, newStatus);
      // Reload inquiries to show updated status
      loadInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="contact-inquiries">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-inquiries">
      <div className="inquiries-header">
        <h2>Website Contact Inquiries</h2>
        <button onClick={loadInquiries} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)} className="close-error">×</button>
        </div>
      )}

      {inquiries.length === 0 ? (
        <div className="no-inquiries">
          <p>No contact inquiries yet. They will appear here when customers submit the website contact form.</p>
        </div>
      ) : (
        <div className="inquiries-grid">
          {inquiries.map(inquiry => (
            <div key={inquiry.id} className="inquiry-card">
              <div className="inquiry-header">
                <h3>{inquiry.name}</h3>
                <div className={`inquiry-status status-${inquiry.status}`}>
                  {inquiry.status.toUpperCase()}
                </div>
              </div>
              
              <div className="inquiry-details">
                <div className="detail-row">
                  <span className="label">Email:</span>
                  <span>{inquiry.email}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Phone:</span>
                  <span>{inquiry.phone || 'Not provided'}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Service:</span>
                  <span>{inquiry.service}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Date:</span>
                  <span>{inquiry.createdAt}</span>
                </div>
              </div>

              <div className="inquiry-message">
                <h4>Message:</h4>
                <p>{inquiry.message}</p>
              </div>

              <div className="inquiry-actions">
                <select
                  value={inquiry.status}
                  onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                  className="status-select"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
                <a 
                  href={`mailto:${inquiry.email}?subject=Re: Your landscaping inquiry&body=Hi ${inquiry.name},%0D%0A%0D%0AThank you for your interest in our ${inquiry.service} service.`}
                  className="email-btn"
                >
                  📧 Email
                </a>
                {inquiry.phone && (
                  <a 
                    href={`tel:${inquiry.phone}`}
                    className="call-btn"
                  >
                    📞 Call
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactInquiries;