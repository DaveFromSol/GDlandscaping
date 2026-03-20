import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';

const QuickQuoteForm = ({ source = 'homepage-quick-form' }) => {
  const { db } = useFirebase();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'quotes'), {
        name: name.trim(),
        phone: phone.trim(),
        description: message.trim() || 'No message',
        service: 'Quick Quote',
        source,
        createdAt: serverTimestamp(),
        createdBy: 'website-quick-quote',
      });
      setStatus('success');
    } catch (err) {
      console.error('Quick quote submit error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="quick-quote-success">
        <div className="quick-quote-success-icon">✅</div>
        <h3>We'll call you back within 12 hours!</h3>
        <p>Thanks {name} — we received your request and will be in touch soon.</p>
      </div>
    );
  }

  return (
    <form className="quick-quote-form" onSubmit={handleSubmit}>
      <div className="quick-quote-fields">
        <input
          type="text"
          placeholder="Your Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="quick-quote-input"
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="quick-quote-input"
        />
        <textarea
          placeholder="What do you need? (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="quick-quote-input quick-quote-textarea"
        />
      </div>
      {status === 'error' && (
        <p className="quick-quote-error">Something went wrong. Please try again or call us at (860) 526-7583.</p>
      )}
      <button
        type="submit"
        className="quick-quote-btn"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : 'Get a Free Quote →'}
      </button>
      <p className="quick-quote-reassurance">We call you back within 12 hours · No obligation</p>
    </form>
  );
};

export default QuickQuoteForm;
