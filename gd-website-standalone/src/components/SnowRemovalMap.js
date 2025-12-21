import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDiFzxddX5tpdulBf8YMVXFekxFUJ2ys-c';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

// Larger map for mobile devices
const mobileMapContainerStyle = {
  width: '100%',
  height: '60vh',
  minHeight: '400px'
};

const defaultCenter = {
  lat: 41.6032,
  lng: -73.0877 // Connecticut center
};

const SnowRemovalMap = ({ contracts, hoaCondoProperties = [] }) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [useCurrentLocation] = useState(true); // Always use current location
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [completedStops, setCompletedStops] = useState(new Set());
  const [hasAutoOptimized, setHasAutoOptimized] = useState(false);

  // Detect mobile viewport changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-request location permission when component mounts
  useEffect(() => {
    if (navigator.geolocation && !currentLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          console.log('✅ Auto-acquired location:', location);
        },
        (error) => {
          console.log('Location permission denied or unavailable, will use first stop as origin');
          // Fall back silently - route will start from first stop
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, [currentLocation]);

  const optimizeRoute = useCallback(() => {
    // Flatten HOA/Condo properties into individual addresses (from dedicated properties section)
    const hoaCondoAddresses = hoaCondoProperties.flatMap(property =>
      (property.addresses || []).map((addr, index) => ({
        id: `${property.id}-${index}`,
        name: `${property.propertyName} - ${addr.unitNumber || `Unit ${index + 1}`}`,
        address: addr.location,
        city: '',
        state: '',
        zip: '',
        priority: property.priority || 'Normal',
        phone: property.phone,
        notes: addr.specialInstructions,
        isHOACondo: true,
        propertyId: property.id
      }))
    );

    // Flatten customers with customer type 'HOA' who have multiple addresses
    const hoaCustomerAddresses = (contracts || [])
      .filter(c => c.customerType === 'HOA' && c.addresses && c.addresses.length > 0)
      .flatMap(customer =>
        customer.addresses.map((addr, index) => ({
          id: `${customer.id}-${index}`,
          name: `${customer.name} - ${addr.unitNumber || `Location ${index + 1}`}`,
          address: addr.location,
          city: '',
          state: '',
          zip: '',
          priority: customer.priority || 'Normal',
          phone: customer.phone,
          notes: addr.specialInstructions,
          isHOACondo: true,
          customerId: customer.id
        }))
      );

    // Regular customers (non-HOA or HOA without multiple addresses)
    const regularCustomers = (contracts || []).filter(c =>
      c.customerType !== 'HOA' || !c.addresses || c.addresses.length === 0
    );

    // Combine all stops
    const allStops = [
      ...regularCustomers,
      ...hoaCondoAddresses,
      ...hoaCustomerAddresses
    ];

    if (!allStops || allStops.length === 0) {
      alert('No contracts available to optimize');
      return;
    }

    if (allStops.length < 1) {
      alert('Need at least 1 location to create a route');
      return;
    }

    // Get current location if enabled
    if (useCurrentLocation && !currentLocation) {
      if (!navigator.geolocation) {
        console.log('Geolocation is not supported, starting from first contract instead.');
        // Continue with route optimization using first stop
      } else {
        console.log('📍 Getting your current location...');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setCurrentLocation(location);
            console.log('✅ Current location obtained:', location);
            // Trigger optimization again with location
            setTimeout(() => optimizeRoute(), 100);
          },
          (error) => {
            console.error('❌ Error getting location:', error);
            console.log('Starting from first contract instead.');
            setCurrentLocation(null);
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
        return;
      }
    }

    setIsOptimizing(true);

    // Use Google Directions Service to optimize route
    const directionsService = new window.google.maps.DirectionsService();

    // Helper function to format complete address
    const formatAddress = (contract) => {
      // Combine all address components into a complete address
      const parts = [
        contract.address,
        contract.city,
        contract.state,
        contract.zip
      ].filter(part => part && part.trim()); // Filter out empty parts

      return parts.join(', ');
    };

    // Sort by priority first (High/Critical priority stops first)
    const prioritySorted = [...allStops].sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, normal: 2, low: 3, High: 1, Normal: 2, Low: 3 };
      return priorityOrder[a.priority || 'Normal'] - priorityOrder[b.priority || 'Normal'];
    });

    // Google Maps API limit: 25 total stops (23 waypoints + origin + destination)
    const MAX_WAYPOINTS = 23;
    const maxStops = MAX_WAYPOINTS + 2; // +2 for origin and destination
    let stopsToRoute = prioritySorted;

    if (prioritySorted.length > maxStops) {
      const numExcluded = prioritySorted.length - maxStops;
      alert(
        `⚠️ Google Maps allows a maximum of 25 stops per route.\n\n` +
        `You have ${prioritySorted.length} stops. The route will include the first 25 stops based on priority.\n\n` +
        `${numExcluded} lower-priority stops will be excluded from this route.`
      );
      stopsToRoute = prioritySorted.slice(0, maxStops);
    }

    // Determine origin based on whether we're using current location
    let origin;
    let destination;
    let waypoints;

    if (useCurrentLocation && currentLocation) {
      // Start from current location
      origin = `${currentLocation.lat},${currentLocation.lng}`;
      // Last contract is destination
      destination = formatAddress(stopsToRoute[stopsToRoute.length - 1]);
      // All other contracts are waypoints
      waypoints = stopsToRoute.slice(0, -1).map(contract => ({
        location: formatAddress(contract),
        stopover: true
      }));
    } else {
      // Original behavior: start from first contract
      origin = formatAddress(stopsToRoute[0]);
      destination = formatAddress(stopsToRoute[stopsToRoute.length - 1]);
      waypoints = stopsToRoute.slice(1, -1).map(contract => ({
        location: formatAddress(contract),
        stopover: true
      }));
    }

    console.log('🗺️ Optimizing route with:');
    console.log('Using current location:', useCurrentLocation && currentLocation ? 'YES' : 'NO');
    console.log('Origin:', origin, useCurrentLocation && currentLocation ? '(Your Location)' : '');
    console.log('Destination:', destination);
    console.log('Waypoints:', waypoints);
    console.log('Stops in route:', stopsToRoute.map(c => ({
      name: c.name,
      address: formatAddress(c),
      priority: c.priority || 'Normal'
    })));
    if (prioritySorted.length > stopsToRoute.length) {
      console.log(`⚠️ Excluded ${prioritySorted.length - stopsToRoute.length} stops due to Google Maps 25-stop limit`);
    }

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        setIsOptimizing(false);
        console.log('Directions API response status:', status);

        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log('✅ Route optimized successfully!');
          setDirectionsResponse(result);

          // Get optimized order
          const waypointOrder = result.routes[0].waypoint_order;
          const optimized = [
            stopsToRoute[0], // origin
            ...waypointOrder.map(i => stopsToRoute[i + 1]), // optimized waypoints
            stopsToRoute[stopsToRoute.length - 1] // destination
          ];
          setOptimizedRoute(optimized);

          // Calculate total distance and duration
          const route = result.routes[0];
          let totalDistance = 0;
          let totalDuration = 0;

          route.legs.forEach(leg => {
            totalDistance += leg.distance.value; // in meters
            totalDuration += leg.duration.value; // in seconds
          });

          setRouteInfo({
            distance: (totalDistance / 1609.34).toFixed(2), // Convert to miles
            duration: Math.round(totalDuration / 60), // Convert to minutes
            stops: stopsToRoute.length,
            totalStops: allStops.length,
            excluded: allStops.length - stopsToRoute.length
          });
        } else {
          console.error('❌ Directions request failed with status:', status);
          console.error('Full result:', result);

          // Provide more specific error messages
          let errorMessage = 'Failed to optimize route. ';
          switch (status) {
            case 'ZERO_RESULTS':
              errorMessage += 'No route could be found between these addresses. Please verify all addresses are correct and accessible.';
              break;
            case 'NOT_FOUND':
              errorMessage += 'One or more addresses could not be found. Please check that all addresses are complete and valid.';
              break;
            case 'INVALID_REQUEST':
              errorMessage += 'Invalid request. Please ensure all addresses are properly formatted.';
              break;
            case 'OVER_QUERY_LIMIT':
              errorMessage += 'Too many requests. Please try again in a moment.';
              break;
            case 'REQUEST_DENIED':
              errorMessage += 'Request denied. Please check the API key permissions.';
              break;
            case 'UNKNOWN_ERROR':
              errorMessage += 'Server error. Please try again.';
              break;
            default:
              errorMessage += `Error: ${status}. Please check addresses.`;
          }

          alert(errorMessage);
        }
      }
    );
  }, [contracts, hoaCondoProperties, currentLocation, useCurrentLocation]);

  // Auto-optimize route when contracts are loaded
  useEffect(() => {
    // Check if we have contracts and Google Maps is loaded
    const hasContracts = (contracts && contracts.length > 0) || (hoaCondoProperties && hoaCondoProperties.length > 0);
    const googleMapsLoaded = window.google && window.google.maps;

    if (hasContracts && !hasAutoOptimized && !isOptimizing && googleMapsLoaded) {
      console.log('🎯 Auto-optimizing route...');
      setHasAutoOptimized(true);

      // Small delay to ensure everything is ready
      const timer = setTimeout(() => {
        optimizeRoute();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [contracts, hoaCondoProperties, hasAutoOptimized, isOptimizing, optimizeRoute]);

  const toggleStopCompletion = (stopId) => {
    setCompletedStops(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stopId)) {
        newSet.delete(stopId);
      } else {
        newSet.add(stopId);
      }
      return newSet;
    });
  };

  const getCompletionPercentage = () => {
    if (!optimizedRoute || optimizedRoute.length === 0) return 0;
    return Math.round((completedStops.size / optimizedRoute.length) * 100);
  };

  const openInGoogleMaps = () => {
    if (!optimizedRoute || optimizedRoute.length === 0) {
      alert('Please optimize the route first');
      return;
    }

    // Helper function to format complete address
    const formatFullAddress = (contract) => {
      const parts = [
        contract.address,
        contract.city,
        contract.state,
        contract.zip
      ].filter(part => part && part.trim());
      return parts.join(', ');
    };

    // Build Google Maps URL with waypoints
    const origin = encodeURIComponent(formatFullAddress(optimizedRoute[0]));
    const destination = encodeURIComponent(formatFullAddress(optimizedRoute[optimizedRoute.length - 1]));
    const waypoints = optimizedRoute
      .slice(1, -1)
      .map(c => encodeURIComponent(formatFullAddress(c)))
      .join('|');

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={isMobile ? mobileMapContainerStyle : mapContainerStyle}
          center={defaultCenter}
          zoom={10}
        >
          {/* Display markers for all contracts */}
          {contracts && contracts.map((contract, index) => {
            // Geocode address to get lat/lng (simplified - in production use Geocoding API)
            // For now, we'll use the map's built-in geocoding via addresses
            return null; // We'll rely on DirectionsRenderer to show the route
          })}

          {/* Display optimized route */}
          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
              options={{
                suppressMarkers: false,
                polylineOptions: {
                  strokeColor: '#3B82F6',
                  strokeWeight: 5
                }
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      {/* Open in Google Maps Button */}
      <button
        onClick={openInGoogleMaps}
        disabled={!optimizedRoute || optimizedRoute.length === 0}
        className={`${isMobile ? 'w-full text-lg py-4' : 'w-full py-3'} bg-purple-600 text-white px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors font-semibold shadow-md active:scale-95`}
      >
        🗺️ Open in Google Maps
      </button>

      {/* Route Information */}
      {routeInfo && (
        <div className={`bg-blue-50 border border-blue-200 rounded-lg ${isMobile ? 'p-5' : 'p-4'}`}>
          <h4 className={`font-semibold text-blue-900 mb-3 ${isMobile ? 'text-xl' : 'text-base'}`}>📊 Route Information</h4>
          <div className={`grid grid-cols-3 gap-4 ${isMobile ? 'text-base' : 'text-sm'}`}>
            <div>
              <span className="text-gray-600 block mb-1">Total Distance:</span>
              <p className={`font-bold text-blue-900 ${isMobile ? 'text-2xl' : 'text-lg'}`}>{routeInfo.distance} mi</p>
            </div>
            <div>
              <span className="text-gray-600 block mb-1">Estimated Time:</span>
              <p className={`font-bold text-blue-900 ${isMobile ? 'text-2xl' : 'text-lg'}`}>{routeInfo.duration} min</p>
            </div>
            <div>
              <span className="text-gray-600 block mb-1">Stops in Route:</span>
              <p className={`font-bold text-blue-900 ${isMobile ? 'text-2xl' : 'text-lg'}`}>{routeInfo.stops}</p>
            </div>
          </div>
          {routeInfo.excluded > 0 && (
            <div className={`mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded ${isMobile ? 'text-base' : 'text-sm'}`}>
              <span className="text-yellow-800 font-medium">
                ⚠️ {routeInfo.excluded} stop{routeInfo.excluded > 1 ? 's' : ''} excluded (Google Maps 25-stop limit).
                Total available: {routeInfo.totalStops}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Progress Tracker */}
      {optimizedRoute && optimizedRoute.length > 0 && (
        <div className={`bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg ${isMobile ? 'p-5' : 'p-4'} shadow-sm`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className={`font-bold text-green-900 ${isMobile ? 'text-xl' : 'text-base'}`}>🎯 Route Progress</h4>
            <span className={`font-bold text-green-700 ${isMobile ? 'text-2xl' : 'text-xl'}`}>
              {getCompletionPercentage()}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
              style={{ width: `${getCompletionPercentage()}%` }}
            >
              {getCompletionPercentage() > 10 && (
                <span className="text-white font-bold text-sm drop-shadow">
                  {completedStops.size} / {optimizedRoute.length}
                </span>
              )}
            </div>
          </div>

          {/* Summary Text */}
          <div className={`mt-3 text-center ${isMobile ? 'text-base' : 'text-sm'} text-gray-700`}>
            <span className="font-semibold">{completedStops.size}</span> of <span className="font-semibold">{optimizedRoute.length}</span> stops completed
            {completedStops.size === optimizedRoute.length && optimizedRoute.length > 0 && (
              <span className="ml-2 text-green-600 font-bold">✓ All Done!</span>
            )}
          </div>
        </div>
      )}

      {/* Optimized Route List */}
      {optimizedRoute && optimizedRoute.length > 0 && (
        <div className={`bg-white border border-gray-200 rounded-lg ${isMobile ? 'p-5' : 'p-4'}`}>
          <h4 className={`font-semibold text-gray-900 mb-4 ${isMobile ? 'text-xl' : 'text-base'}`}>📍 Optimized Route Order</h4>
          <div className={isMobile ? 'space-y-3' : 'space-y-2'}>
            {optimizedRoute.map((contract, index) => {
              // Format complete address for display
              const fullAddress = [
                contract.address,
                contract.city,
                contract.state,
                contract.zip
              ].filter(part => part && part.trim()).join(', ');

              const isCompleted = completedStops.has(contract.id);

              return (
                <div
                  key={contract.id}
                  className={`flex items-center gap-3 ${isMobile ? 'p-4' : 'p-2'} rounded-lg border transition-all ${
                    isCompleted
                      ? 'bg-green-50 border-green-200 opacity-75'
                      : 'bg-gray-50 border-gray-100'
                  }`}
                  onClick={() => toggleStopCompletion(contract.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => toggleStopCompletion(contract.id)}
                    onClick={(e) => e.stopPropagation()}
                    className={`flex-shrink-0 ${isMobile ? 'w-7 h-7' : 'w-5 h-5'} text-green-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-green-500 cursor-pointer`}
                  />

                  {/* Route Number */}
                  <span className={`flex-shrink-0 ${isMobile ? 'w-12 h-12 text-lg' : 'w-8 h-8 text-sm'} ${
                    isCompleted ? 'bg-green-600' : 'bg-blue-600'
                  } text-white rounded-full flex items-center justify-center font-bold shadow-sm`}>
                    {index + 1}
                  </span>

                  {/* Address Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'} ${isMobile ? 'text-lg mb-1' : 'text-sm'}`}>
                      {contract.name}
                    </p>
                    <p className={`${isCompleted ? 'text-gray-400' : 'text-gray-600'} ${isMobile ? 'text-sm' : 'text-xs'}`}>
                      {fullAddress}
                    </p>
                  </div>

                  {/* Priority Badge */}
                  <span className={`flex-shrink-0 ${isMobile ? 'px-3 py-2 text-sm' : 'px-2 py-1 text-xs'} rounded-full font-medium ${
                    contract.priority === 'High' ? 'bg-red-100 text-red-800' :
                    contract.priority === 'Low' ? 'bg-gray-100 text-gray-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {contract.priority || 'Normal'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SnowRemovalMap;
