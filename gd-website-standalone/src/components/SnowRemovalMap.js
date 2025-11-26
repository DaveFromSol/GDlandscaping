import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDiFzxddX5tpdulBf8YMVXFekxFUJ2ys-c';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
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
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

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
        alert('Geolocation is not supported by your browser. Starting from first contract instead.');
        setUseCurrentLocation(false);
        return;
      }

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
          alert(`Could not get your location: ${error.message}\nStarting from first contract instead.`);
          setUseCurrentLocation(false);
          setCurrentLocation(null);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
      return;
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

    // Determine origin based on whether we're using current location
    let origin;
    let destination;
    let waypoints;

    if (useCurrentLocation && currentLocation) {
      // Start from current location
      origin = `${currentLocation.lat},${currentLocation.lng}`;
      // Last contract is destination
      destination = formatAddress(prioritySorted[prioritySorted.length - 1]);
      // All other contracts are waypoints
      waypoints = prioritySorted.slice(0, -1).map(contract => ({
        location: formatAddress(contract),
        stopover: true
      }));
    } else {
      // Original behavior: start from first contract
      origin = formatAddress(prioritySorted[0]);
      destination = formatAddress(prioritySorted[prioritySorted.length - 1]);
      waypoints = prioritySorted.slice(1, -1).map(contract => ({
        location: formatAddress(contract),
        stopover: true
      }));
    }

    console.log('🗺️ Optimizing route with:');
    console.log('Using current location:', useCurrentLocation && currentLocation ? 'YES' : 'NO');
    console.log('Origin:', origin, useCurrentLocation && currentLocation ? '(Your Location)' : '');
    console.log('Destination:', destination);
    console.log('Waypoints:', waypoints);
    console.log('All contracts:', prioritySorted.map(c => ({
      name: c.name,
      address: formatAddress(c),
      priority: c.priority || 'Normal'
    })));

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
            prioritySorted[0], // origin
            ...waypointOrder.map(i => prioritySorted[i + 1]), // optimized waypoints
            prioritySorted[prioritySorted.length - 1] // destination
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
            stops: allStops.length
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

  const exportRoute = () => {
    if (!optimizedRoute || optimizedRoute.length === 0) {
      alert('Please optimize the route first');
      return;
    }

    // Helper function to format complete address for export
    const formatFullAddress = (contract) => {
      const parts = [
        contract.address,
        contract.city,
        contract.state,
        contract.zip
      ].filter(part => part && part.trim());
      return parts.join(', ');
    };

    let routeText = '🚗 OPTIMIZED SNOW REMOVAL ROUTE\n';
    routeText += '================================\n\n';
    routeText += `Total Stops: ${routeInfo.stops}\n`;
    routeText += `Total Distance: ${routeInfo.distance} miles\n`;
    routeText += `Estimated Time: ${routeInfo.duration} minutes\n\n`;
    routeText += 'ROUTE ORDER:\n';
    routeText += '============\n\n';

    optimizedRoute.forEach((contract, index) => {
      routeText += `${index + 1}. ${contract.name}\n`;
      routeText += `   Address: ${formatFullAddress(contract)}\n`;
      routeText += `   Priority: ${contract.priority || 'Normal'}\n`;
      if (contract.phone) routeText += `   Phone: ${contract.phone}\n`;
      routeText += '\n';
    });

    // Create and download file
    const blob = new Blob([routeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `snow-route-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
          mapContainerStyle={mapContainerStyle}
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

      {/* Location Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="useCurrentLocation"
            checked={useCurrentLocation}
            onChange={(e) => {
              setUseCurrentLocation(e.target.checked);
              if (!e.target.checked) {
                setCurrentLocation(null);
              }
            }}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="useCurrentLocation" className="text-sm font-medium text-gray-900 cursor-pointer">
            📍 Start route from my current location
          </label>
        </div>
        {currentLocation && (
          <span className="text-xs text-green-600 font-medium">✓ Location acquired</span>
        )}
      </div>

      {/* Route Controls */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={optimizeRoute}
          disabled={isOptimizing}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {isOptimizing ? '⏳ Optimizing...' : '🎯 Optimize Route'}
        </button>
        <button
          onClick={exportRoute}
          disabled={!optimizedRoute || optimizedRoute.length === 0}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
        >
          📄 Export Route
        </button>
        <button
          onClick={openInGoogleMaps}
          disabled={!optimizedRoute || optimizedRoute.length === 0}
          className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
        >
          🗺️ Open in Google Maps
        </button>
      </div>

      {/* Route Information */}
      {routeInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">📊 Route Information</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Distance:</span>
              <p className="font-semibold text-blue-900">{routeInfo.distance} mi</p>
            </div>
            <div>
              <span className="text-gray-600">Estimated Time:</span>
              <p className="font-semibold text-blue-900">{routeInfo.duration} min</p>
            </div>
            <div>
              <span className="text-gray-600">Total Stops:</span>
              <p className="font-semibold text-blue-900">{routeInfo.stops}</p>
            </div>
          </div>
        </div>
      )}

      {/* Optimized Route List */}
      {optimizedRoute && optimizedRoute.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">📍 Optimized Route Order</h4>
          <div className="space-y-2">
            {optimizedRoute.map((contract, index) => {
              // Format complete address for display
              const fullAddress = [
                contract.address,
                contract.city,
                contract.state,
                contract.zip
              ].filter(part => part && part.trim()).join(', ');

              return (
                <div key={contract.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{contract.name}</p>
                    <p className="text-xs text-gray-600">{fullAddress}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
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
