import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QuickQuoteForm from './QuickQuoteForm';

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const blocked = ['/admin', '/account'].includes(location.pathname);
    if (blocked) return;
    if (sessionStorage.getItem('exit-intent-fired') === 'true') return;

    let inactivityTimer;

    const trigger = () => {
      if (sessionStorage.getItem('exit-intent-fired') === 'true') return;
      sessionStorage.setItem('exit-intent-fired', 'true');
      setOpen(true);
      cleanup();
    };

    const handleMouseLeave = (e) => {
      if (e.clientY <= window.innerHeight * 0.1) {
        trigger();
      }
    };

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(trigger, 45000);
    };

    const cleanup = () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keydown', resetTimer);
      document.removeEventListener('scroll', resetTimer);
      clearTimeout(inactivityTimer);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', resetTimer, { passive: true });
    document.addEventListener('keydown', resetTimer);
    document.addEventListener('scroll', resetTimer, { passive: true });
    resetTimer();

    return cleanup;
  }, [location.pathname]);

  if (!open) return null;

  return (
    <div className="exit-intent-overlay" onClick={() => setOpen(false)}>
      <div className="exit-intent-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="exit-intent-close"
          onClick={() => setOpen(false)}
          aria-label="Close popup"
        >
          ✕
        </button>
        <h2>Wait — get a free quote before you go!</h2>
        <p>Fill out the quick form and we'll call you back within 12 hours.</p>
        <QuickQuoteForm source="exit-intent-popup" />
      </div>
    </div>
  );
};

export default ExitIntentPopup;
