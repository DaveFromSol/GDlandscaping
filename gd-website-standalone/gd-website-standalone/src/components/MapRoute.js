import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapRoute = ({ job, onClose }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Google Maps API Key
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDiFzxddX5tpdulBf8YMVXFekxFUJ2ys-c';

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
      setError('Please configure your Google Maps API key in Settings');
      setLoading(false);
      return;
    }

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      initializeMap();
    }).catch(err => {
      setError('Failed to load Google Maps');
      setLoading(false);
    });
  }, []);

  const initializeMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const current = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(current);
          setupMap(current);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to a general location if geolocation fails
          const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // NYC
          setCurrentLocation(defaultLocation);
          setupMap(defaultLocation);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
      setLoading(false);
    }
  };

  const setupMap = (currentPos) => {
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      zoom: 13,
      center: currentPos,
      mapTypeId: 'roadmap'
    });

    const directionsServiceInstance = new window.google.maps.DirectionsService();
    const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
      draggable: true,
      panel: document.getElementById('directionsPanel')
    });

    directionsRendererInstance.setMap(mapInstance);

    setMap(mapInstance);
    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);

    // Calculate route to job location
    calculateRoute(currentPos, directionsServiceInstance, directionsRendererInstance);
  };

  const calculateRoute = (origin, directionsServiceInstance, directionsRendererInstance) => {
    if (!job.client || !job.address) {
      setError('Job address not available');
      setLoading(false);
      return;
    }

    const request = {
      origin: origin,
      destination: job.address || `${job.client} address`, // You'll need actual addresses
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    };

    directionsServiceInstance.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRendererInstance.setDirections(result);
        
        const route = result.routes[0];
        const leg = route.legs[0];
        
        setRouteInfo({
          distance: leg.distance.text,
          duration: leg.duration.text,
          startAddress: leg.start_address,
          endAddress: leg.end_address
        });
        setLoading(false);
      } else {
        setError('Could not calculate route: ' + status);
        setLoading(false);
      }
    });
  };

  const openInGoogleMaps = () => {
    if (routeInfo && currentLocation) {
      const destination = encodeURIComponent(job.address || `${job.client} address`);
      const origin = `${currentLocation.lat},${currentLocation.lng}`;
      const url = `https://www.google.com/maps/dir/${origin}/${destination}`;
      window.open(url, '_blank');
    }
  };

  const openInAppleMaps = () => {
    if (routeInfo && currentLocation) {
      const destination = encodeURIComponent(job.address || `${job.client} address`);
      const url = `http://maps.apple.com/?daddr=${destination}&dirflg=d`;
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="map-modal">
        <div className="map-content">
          <div className="map-header">
            <h3>Loading Route...</h3>
            <button onClick={onClose} className="close-btn">×</button>
          </div>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-modal">
        <div className="map-content">
          <div className="map-header">
            <h3>Route Error</h3>
            <button onClick={onClose} className="close-btn">×</button>
          </div>
          <div className="error-message">
            <p>{error}</p>
            <p>Please check your Google Maps API configuration in Settings.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="map-modal">
      <div className="map-content">
        <div className="map-header">
          <div className="job-info">
            <h3>Route to {job.title}</h3>
            <p>{job.client} • {job.date} at {job.time}</p>
          </div>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        {routeInfo && (
          <div className="route-summary">
            <div className="route-details">
              <span className="route-distance">{routeInfo.distance}</span>
              <span className="route-duration">{routeInfo.duration}</span>
            </div>
            <div className="navigation-buttons">
              <button onClick={openInGoogleMaps} className="nav-btn google">
                Open in Google Maps
              </button>
              <button onClick={openInAppleMaps} className="nav-btn apple">
                Open in Apple Maps
              </button>
            </div>
          </div>
        )}

        <div className="map-container">
          <div ref={mapRef} className="map"></div>
          <div id="directionsPanel" className="directions-panel"></div>
        </div>
      </div>
    </div>
  );
};

export default MapRoute;