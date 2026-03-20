import React, { useState } from 'react';

const UrgencyBanner = () => {
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('urgency-banner-dismissed') === 'true'
  );

  const month = new Date().getMonth(); // 0-indexed: 0=Jan
  const isSpring = month >= 2 && month <= 5; // March–June

  if (!isSpring || dismissed) return null;

  const dismiss = () => {
    sessionStorage.setItem('urgency-banner-dismissed', 'true');
    setDismissed(true);
  };

  return (
    <div className="urgency-banner">
      <span className="urgency-banner-text">
        🌱 Spring season is filling up fast — book your cleanup now before slots are gone!
      </span>
      <button className="urgency-banner-dismiss" onClick={dismiss} aria-label="Dismiss banner">
        ✕
      </button>
    </div>
  );
};

export default UrgencyBanner;
