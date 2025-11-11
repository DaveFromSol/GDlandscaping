import React, { useRef, useEffect, useState } from 'react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDiFzxddX5tpdulBf8YMVXFekxFUJ2ys-c';

const GoogleAddressAutocomplete = ({ value, onChange, onPlaceSelected, placeholder = "Enter address", className = "" }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      setScriptLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => setScriptLoaded(true));
      return;
    }

    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => console.error('Failed to load Google Maps API');
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !inputRef.current) return;

    initializeAutocomplete();

    return () => {
      if (autocompleteRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [scriptLoaded]);

  const initializeAutocomplete = () => {
    if (!inputRef.current || !window.google || !window.google.maps || !window.google.maps.places) {
      console.error('Google Maps API not loaded');
      return;
    }

    try {
      // Create autocomplete instance
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' }, // Restrict to US addresses
        fields: ['address_components', 'formatted_address', 'geometry', 'name']
      });

      // Listen for place selection
      autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
    } catch (error) {
      console.error('Error initializing autocomplete:', error);
    }
  };

  const handlePlaceSelect = () => {
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

    // Call the callback with parsed address data
    if (onPlaceSelected) {
      onPlaceSelected(addressData);
    }

    // Update the input value
    if (onChange) {
      onChange(place.formatted_address);
    }
  };

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={className}
      autoComplete="off"
    />
  );
};

export default GoogleAddressAutocomplete;
