import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const StickyMobileBar = () => {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToQuote = () => {
    const el = document.getElementById('quick-quote-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!visible || pathname === '/admin') return null;

  return (
    <div className="sticky-mobile-bar">
      <a href="tel:8605267583" className="sticky-mobile-call">
        📞 Call Now
      </a>
      <button onClick={scrollToQuote} className="sticky-mobile-quote">
        Get Free Quote
      </button>
    </div>
  );
};

export default StickyMobileBar;
