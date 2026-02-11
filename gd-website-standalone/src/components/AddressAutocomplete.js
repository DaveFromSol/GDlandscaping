import React, { useEffect, useRef, useState } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useNavigate } from 'react-router-dom';
import PropertyMapModal from './PropertyMapModal';

const AddressAutocomplete = () => {
  const geocoderContainerRef = useRef(null);
  const geocoderRef = useRef(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!geocoderContainerRef.current) return;

    // Prevent duplicate geocoder initialization
    if (geocoderRef.current) return;

    const geocoder = new MapboxGeocoder({
      accessToken: 'pk.eyJ1IjoiZHJpY2h0ZXIwNiIsImEiOiJjbWd0anR3ZXEwNTUwMnNwdDRmaDZ5ZndiIn0.UbCV_Y8l1Duq9B2Q77OFCw',
      types: 'address',
      countries: 'us',
      bbox: [-73.2, 41.2, -71.3, 42.7], // CT and Central MA bounding box
      proximity: {
        longitude: -72.7553,
        latitude: 41.6219
      }, // Berlin, CT
      placeholder: 'Enter your address for instant quote...',
      mapboxgl: null, // We're not using a map, just the geocoder
    });

    geocoderRef.current = geocoder;
    geocoder.addTo(geocoderContainerRef.current);

    // Handle address selection
    geocoder.on('result', (e) => {
      const address = e.result.place_name;
      const coordinates = e.result.center; // [longitude, latitude]

      setSelectedAddress(address);
      setAddressData({
        address: address,
        coordinates: coordinates
      });

      // Show the map modal
      setShowMap(true);
    });

    // Clean up - don't call onRemove as it causes errors in some cases
    // The geocoder will be cleaned up when the component unmounts anyway
    return () => {
      if (geocoderRef.current) {
        // Clear the container to remove the geocoder DOM elements
        if (geocoderContainerRef.current) {
          geocoderContainerRef.current.innerHTML = '';
        }
        geocoderRef.current = null;
      }
    };
  }, []);

  // Add/remove body class when modal opens/closes to hide badges and lock scrolling
  useEffect(() => {
    if (showMap) {
      // Always scroll to a fixed position that centers the modal perfectly
      // Modal is 85vh tall, so we need 7.5vh of space at top to center it
      const viewportHeight = window.innerHeight;

      // Calculate absolute scroll position to center modal
      // Modal needs 7.5vh space at top (since it's 85vh tall in a 100vh viewport)
      // We want the modal to start at roughly 7.5vh from the top of the viewport
      // So scroll to 0 (top of page) to ensure consistent positioning
      const targetScroll = 0;

      window.scrollTo({ top: targetScroll, behavior: 'smooth' });

      document.body.classList.add('map-modal-open');
      // Lock body scrolling after scroll completes
      setTimeout(() => {
        document.body.style.overflow = 'hidden';
      }, 300);
    } else {
      document.body.classList.remove('map-modal-open');
      // Restore body scrolling
      document.body.style.overflow = '';
    }

    return () => {
      document.body.classList.remove('map-modal-open');
      document.body.style.overflow = '';
    };
  }, [showMap]);

  const handleMapClose = () => {
    setShowMap(false);
  };

  const handleMapConfirm = (data) => {
    setShowMap(false);

    // Redirect to quote page with property data for instant pricing
    navigate('/quote', {
      state: {
        address: data.address,
        coordinates: data.coordinates,
        propertySize: data.propertySize,
        parcelGeometry: data.parcelGeometry
      }
    });
  };

  return (
    <>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div
          ref={geocoderContainerRef}
          style={{
            fontSize: '16px'
          }}
        />
      <style>{`
        .mapboxgl-ctrl-geocoder {
          min-width: 100%;
          max-width: 100%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          border-radius: 8px;
          font-size: 16px;
          z-index: 1000;
          position: relative !important;
        }

        .mapboxgl-ctrl-geocoder--input {
          height: 60px;
          padding: 0 50px 0 20px;
          font-size: 18px;
          color: #333;
          border-radius: 8px;
        }

        .mapboxgl-ctrl-geocoder--input:focus {
          outline: none;
          box-shadow: 0 4px 20px rgba(45, 80, 22, 0.3);
        }

        .mapboxgl-ctrl-geocoder--icon-search {
          top: 18px;
          left: auto;
          right: 15px;
          width: 24px;
          height: 24px;
        }

        .mapboxgl-ctrl-geocoder--button {
          top: 18px;
          right: 15px;
        }

        .mapboxgl-ctrl-geocoder--icon {
          fill: #2d5016;
        }

        .mapboxgl-ctrl-geocoder--suggestion {
          padding: 12px 20px;
          font-size: 16px;
          white-space: normal !important;
          word-wrap: break-word !important;
          overflow: visible !important;
          text-overflow: clip !important;
          line-height: 1.4 !important;
          min-height: 50px;
        }

        .mapboxgl-ctrl-geocoder--suggestion-title {
          font-weight: 600;
          color: #333;
          white-space: normal !important;
          word-wrap: break-word !important;
          overflow: visible !important;
          text-overflow: clip !important;
        }

        .mapboxgl-ctrl-geocoder--suggestion-address {
          color: #666;
          font-size: 14px;
          white-space: normal !important;
          word-wrap: break-word !important;
          overflow: visible !important;
          text-overflow: clip !important;
          margin-top: 4px;
        }

        .mapboxgl-ctrl-geocoder .suggestions {
          border-radius: 0 0 8px 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          max-height: 400px !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          width: 100% !important;
          min-width: 100% !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 1001;
          position: absolute !important;
          background: white;
        }

        .mapboxgl-ctrl-geocoder--suggestion:hover {
          background-color: #f0f4ed;
        }

        /* Ensure suggestions container doesn't get clipped */
        .mapboxgl-ctrl-geocoder .suggestions-wrapper {
          overflow: visible !important;
        }

        @media (max-width: 768px) {
          .mapboxgl-ctrl-geocoder--input {
            height: 55px;
            font-size: 16px;
            padding: 0 45px 0 15px;
          }

          .mapboxgl-ctrl-geocoder--icon-search,
          .mapboxgl-ctrl-geocoder--button {
            top: 16px;
          }

          .mapboxgl-ctrl-geocoder--suggestion {
            font-size: 14px;
            padding: 10px 15px;
          }

          .mapboxgl-ctrl-geocoder--suggestion-address {
            font-size: 12px;
          }
        }
      `}</style>
      </div>

      {/* Property Map Modal */}
      {showMap && addressData && (
        <PropertyMapModal
          address={addressData.address}
          coordinates={addressData.coordinates}
          onClose={handleMapClose}
          onConfirm={handleMapConfirm}
        />
      )}
    </>
  );
};

export default AddressAutocomplete;
