import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  const spinnerClass = `loading-spinner ${sizeClasses[size]}`;
  const containerClass = fullScreen ? 'loading-container fullscreen' : 'loading-container';

  return (
    <div className={containerClass}>
      <div className={spinnerClass}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  message: PropTypes.string,
  fullScreen: PropTypes.bool
};

export default LoadingSpinner;