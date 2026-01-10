import React, { useRef, useEffect, useState, useCallback } from 'react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDiFzxddX5tpdulBf8YMVXFekxFUJ2ys-c';

const GoogleAddressAutocomplete = ({ value, onChange, onPlaceSelected, placeholder = "Enter address", className = "" }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      console.log('Google Maps API already loaded');
      setScriptLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      console.log('Google Maps script found, waiting for load...');
      const handleLoad = () => {
        console.log('Google Maps API loaded via existing script');
        setScriptLoaded(true);
      };
      existingScript.addEventListener('load', handleLoad);
      return () => existingScript.removeEventListener('load', handleLoad);
    }

    // Load Google Maps API
    console.log('Loading Google Maps API...');
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Google Maps API loaded successfully');
      setScriptLoaded(true);
    };
    script.onerror = (error) => {
      console.error('Failed to load Google Maps API:', error);
      setApiError('Failed to load Google Maps. Please check your internet connection.');
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup if component unmounts before script loads
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handlePlaceSelect = useCallback(() => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();

    if (!place.address_components) {
      console.log('No address components found');
      return;
    }

    // Parse address components
    let street = '';
    let city = '';
    let state = '';
    let zip = '';

    place.address_components.forEach(component => {
      const types = component.types;

      if (types.includes('street_number')) {
        street = component.long_name + ' ';
      }
      if (types.includes('route')) {
        street += component.long_name;
      }
      if (types.includes('locality')) {
        city = component.long_name;
      }
      if (types.includes('administrative_area_level_1')) {
        state = component.short_name;
      }
      if (types.includes('postal_code')) {
        zip = component.long_name;
      }
    });

    const addressData = {
      fullAddress: place.formatted_address,
      street: street.trim(),
      city: city,
      state: state,
      zip: zip,
      lat: place.geometry?.location?.lat(),
      lng: place.geometry?.location?.lng()
    };

    console.log('Address selected:', addressData);

    // Call the callback with parsed address data
    if (onPlaceSelected) {
      onPlaceSelected(addressData);
    }
  }, [onPlaceSelected]);

  const initializeAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google || !window.google.maps || !window.google.maps.places) {
      console.error('Google Maps API not loaded properly');
      setApiError('Google Maps not ready. Please refresh the page.');
      return;
    }

    try {
      console.log('Initializing autocomplete on input...');
      // Create autocomplete instance
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' }, // Restrict to US addresses
        fields: ['address_components', 'formatted_address', 'geometry', 'name']
      });

      // Listen for place selection
      autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
      console.log('Autocomplete initialized successfully');
    } catch (error) {
      console.error('Error initializing autocomplete:', error);
      setApiError('Error setting up address autocomplete: ' + error.message);
    }
  }, [handlePlaceSelect]);

  useEffect(() => {
    if (!scriptLoaded || !inputRef.current) return;

    initializeAutocomplete();

    return () => {
      if (autocompleteRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [scriptLoaded, initializeAutocomplete]);

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  // Sync the input value when it changes from parent
  useEffect(() => {
    if (inputRef.current && value !== undefined) {
      // Only update if the values are different to avoid cursor jumping
      if (inputRef.current.value !== value) {
        inputRef.current.value = value;
      }
    }
  }, [value]);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        defaultValue={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
      {apiError && (
        <div className="text-xs text-red-600 mt-1">
          {apiError}
        </div>
      )}
    </>
  );
};

export default GoogleAddressAutocomplete;
