import React, { useRef, useEffect } from 'react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDiFzxddX5tpdulBf8YMVXFekxFUJ2ys-c';

const GoogleAddressAutocomplete = ({ value, onChange, onPlaceSelected, placeholder = "Enter address", className = "" }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeAutocomplete;
      document.head.appendChild(script);
    } else {
      initializeAutocomplete();
    }

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const initializeAutocomplete = () => {
    if (!inputRef.current || !window.google) return;

    // Create autocomplete instance
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' }, // Restrict to US addresses
      fields: ['address_components', 'formatted_address', 'geometry', 'name']
    });

    // Listen for place selection
    autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
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
