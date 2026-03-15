import React from 'react';
import { Link } from 'react-router-dom';

const AddressAutocomplete = () => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      background: '#fefce8',
      border: '2px solid #fbbf24',
      borderRadius: '12px',
      padding: '20px 24px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔧</div>
      <p style={{ fontWeight: '700', fontSize: '17px', color: '#92400e', margin: '0 0 6px' }}>
        Instant Quote Temporarily Unavailable
      </p>
      <p style={{ fontSize: '14px', color: '#78350f', margin: '0 0 14px' }}>
        Fill out our contact form and we'll get back to you with a quote right away!
      </p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          to="/contact"
          style={{
            background: '#16a34a',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          Contact Us
        </Link>
        <a
          href="tel:8605267583"
          style={{
            background: '#f59e0b',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          📞 Call (860) 526-7583
        </a>
      </div>
    </div>
  );
};

export default AddressAutocomplete;
