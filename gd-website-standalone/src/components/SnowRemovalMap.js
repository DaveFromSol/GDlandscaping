import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
import GoogleAddressAutocomplete from './GoogleAddressAutocomplete';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

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

const libraries = ['places'];

const SnowRemovalMap = ({ contracts, hoaCondoProperties = [], db, userPermissions = { markSnowComplete: true } }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [displayedDirections, setDisplayedDirections] = useState(null);
  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const [excludedStops, setExcludedStops] = useState([]);
  const [invalidAddresses, setInvalidAddresses] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [startPointOption, setStartPointOption] = useState('gps'); // 'gps', 'manual', or 'first-stop'
  const [manualStartAddress, setManualStartAddress] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [completedStops, setCompletedStops] = useState(new Set());
  const [hasAutoOptimized, setHasAutoOptimized] = useState(false);
  const [stopNotes, setStopNotes] = useState({}); // { stopId: "note text" }
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Firebase route management
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [currentRouteId, setCurrentRouteId] = useState(null);
  const [routeName, setRouteName] = useState('');

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

  // Listen for saved routes from Firebase
  useEffect(() => {
    if (!db) return;

    const routesRef = collection(db, 'snowRoutes');
    const q = query(routesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const routes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSavedRoutes(routes);
    });

    return () => unsubscribe();
  }, [db]);

  // Listen for completion updates and notes on current route
  useEffect(() => {
    if (!db || !currentRouteId) return;

    const routeRef = doc(db, 'snowRoutes', currentRouteId);
    const unsubscribe = onSnapshot(routeRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.completedStops) {
          const completedSet = new Set(data.completedStops);
          setCompletedStops(completedSet);
        }
        if (data.stopNotes) {
          setStopNotes(data.stopNotes);
        }
      }
    });

    return () => unsubscribe();
  }, [db, currentRouteId]);

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

    // Get current location if GPS option is selected and we don't have it yet
    if (startPointOption === 'gps' && !currentLocation) {
      if (!navigator.geolocation) {
        console.log('Geolocation is not supported, please use manual address or start from first stop.');
        alert('Geolocation not supported. Please enter a manual start address or choose "Start from First Stop".');
        return;
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
            alert('Could not get your location. Please enter a manual start address or choose "Start from First Stop".');
            return;
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
        return;
      }
    }

    // Check if manual address is provided when manual option is selected
    if (startPointOption === 'manual' && !manualStartAddress.trim()) {
      alert('Please enter a start address.');
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

    // Google Maps API limit: 25 total stops (23 waypoints + origin + destination)
    const MAX_WAYPOINTS = 23;
    const maxStops = MAX_WAYPOINTS + 2; // +2 for origin and destination
    let stopsToRoute = prioritySorted;
    let excludedStops = [];

    if (prioritySorted.length > maxStops) {
      const numExcluded = prioritySorted.length - maxStops;
      alert(
        `⚠️ Google Maps allows a maximum of 25 stops per route.\n\n` +
        `You have ${prioritySorted.length} stops. The route will include the first 25 stops based on priority.\n\n` +
        `${numExcluded} lower-priority stops will be shown in the list but not on the map.`
      );
      stopsToRoute = prioritySorted.slice(0, maxStops);
      excludedStops = prioritySorted.slice(maxStops);
    }

    // Determine origin based on the selected start point option
    let origin;
    let destination;
    let waypoints;

    if (startPointOption === 'gps' && currentLocation) {
      // Start from GPS current location
      origin = `${currentLocation.lat},${currentLocation.lng}`;
      // Last contract is destination
      destination = formatAddress(stopsToRoute[stopsToRoute.length - 1]);
      // All contracts are waypoints
      waypoints = stopsToRoute.slice(0, -1).map(contract => ({
        location: formatAddress(contract),
        stopover: true
      }));
    } else if (startPointOption === 'manual' && manualStartAddress.trim()) {
      // Start from manual address
      origin = manualStartAddress.trim();
      // Last contract is destination
      destination = formatAddress(stopsToRoute[stopsToRoute.length - 1]);
      // All contracts are waypoints
      waypoints = stopsToRoute.slice(0, -1).map(contract => ({
        location: formatAddress(contract),
        stopover: true
      }));
    } else {
      // Start from first contract (first-stop option or fallback)
      origin = formatAddress(stopsToRoute[0]);
      destination = formatAddress(stopsToRoute[stopsToRoute.length - 1]);
      waypoints = stopsToRoute.slice(1, -1).map(contract => ({
        location: formatAddress(contract),
        stopover: true
      }));
    }

    console.log('🗺️ Optimizing route with:');
    console.log('Start point option:', startPointOption);
    console.log('Origin:', origin,
      startPointOption === 'gps' ? '(GPS Location)' :
      startPointOption === 'manual' ? '(Manual Address)' :
      '(First Stop)');
    console.log('Destination:', destination);
    console.log('Number of waypoints:', waypoints.length);
    console.log('Total stops to route:', stopsToRoute.length);
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
          setDisplayedDirections(result); // Initially show the full route
          setInvalidAddresses([]); // Clear any previous invalid addresses

          // Get optimized order
          const waypointOrder = result.routes[0].waypoint_order;
          const optimized = [
            stopsToRoute[0], // origin
            ...waypointOrder.map(i => stopsToRoute[i + 1]), // optimized waypoints
            stopsToRoute[stopsToRoute.length - 1] // destination
          ];
          setOptimizedRoute(optimized);
          setExcludedStops(excludedStops);

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
            stops: optimized.length,
            totalStops: allStops.length,
            excluded: allStops.length - stopsToRoute.length
          });
        } else {
          console.error('❌ Directions request failed with status:', status);
          console.error('Full result:', result);

          // Handle address-related errors by trying to identify and exclude problematic addresses
          if (status === 'NOT_FOUND' || status === 'ZERO_RESULTS') {
            console.log('🔍 Attempting to identify and exclude invalid addresses...');

            // Try to validate addresses one by one using Geocoding
            const geocoder = new window.google.maps.Geocoder();
            const validatePromises = stopsToRoute.map((stop, index) => {
              const address = formatAddress(stop);
              return new Promise((resolve) => {
                geocoder.geocode({ address: address }, (results, geocodeStatus) => {
                  if (geocodeStatus === 'OK') {
                    resolve({ stop, valid: true, index });
                  } else {
                    console.log(`❌ Invalid address: ${stop.name} - ${address}`);
                    resolve({ stop, valid: false, index });
                  }
                });
              });
            });

            Promise.all(validatePromises).then((validationResults) => {
              const validStops = validationResults.filter(r => r.valid).map(r => r.stop);
              const invalidStops = validationResults.filter(r => !r.valid).map(r => r.stop);

              setInvalidAddresses(invalidStops);

              if (validStops.length < 2) {
                alert(`Unable to create route: Only ${validStops.length} valid address(es) found. Need at least 2 valid addresses.\n\n${invalidStops.length} address(es) marked as invalid - please review and correct them.`);
                setIsOptimizing(false);
                return;
              }

              // If no invalid addresses found, the issue is likely with the start point or connectivity
              if (invalidStops.length === 0) {
                console.log('⚠️ All addresses are valid, but route failed. Issue may be with start point or connectivity.');

                // Try with first stop as origin
                if (startPointOption === 'gps' || startPointOption === 'manual') {
                  alert('⚠️ Your start point may be too far or unreachable.\n\nTrying route from first stop instead...');

                  const fallbackOrigin = formatAddress(validStops[0]);
                  const fallbackDestination = formatAddress(validStops[validStops.length - 1]);
                  const fallbackWaypoints = validStops.slice(1, -1).map(contract => ({
                    location: formatAddress(contract),
                    stopover: true
                  }));

                  directionsService.route(
                    {
                      origin: fallbackOrigin,
                      destination: fallbackDestination,
                      waypoints: fallbackWaypoints,
                      optimizeWaypoints: true,
                      travelMode: window.google.maps.TravelMode.DRIVING,
                    },
                    (fallbackResult, fallbackStatus) => {
                      setIsOptimizing(false);
                      if (fallbackStatus === window.google.maps.DirectionsStatus.OK) {
                        console.log('✅ Route created starting from first stop!');
                        setDirectionsResponse(fallbackResult);
                        setDisplayedDirections(fallbackResult);

                        const waypointOrder = fallbackResult.routes[0].waypoint_order;
                        const optimized = [
                          validStops[0],
                          ...waypointOrder.map(i => validStops[i + 1]),
                          validStops[validStops.length - 1]
                        ];
                        setOptimizedRoute(optimized);
                        setExcludedStops([...excludedStops]);

                        const route = fallbackResult.routes[0];
                        let totalDistance = 0;
                        let totalDuration = 0;
                        route.legs.forEach(leg => {
                          totalDistance += leg.distance.value;
                          totalDuration += leg.duration.value;
                        });

                        setRouteInfo({
                          distance: (totalDistance / 1609.34).toFixed(2),
                          duration: Math.round(totalDuration / 60),
                          stops: optimized.length,
                          totalStops: allStops.length,
                          excluded: allStops.length - validStops.length
                        });
                      } else {
                        console.error('❌ Fallback also failed:', fallbackStatus);
                        alert('Unable to create route. The stops may be too far apart or not connected by roads.');
                      }
                    }
                  );
                  return;
                } else {
                  alert('Unable to create route. The stops may be too far apart or not connected by roads.');
                  setIsOptimizing(false);
                  return;
                }
              }

              alert(`⚠️ Found ${invalidStops.length} invalid address(es).\n\nCreating route with ${validStops.length} valid addresses.\n\nInvalid addresses will be listed separately below the route.`);

              // Retry optimization with only valid stops
              console.log(`🔄 Retrying with ${validStops.length} valid addresses...`);

              // Reconstruct route parameters with valid stops only
              let newOrigin, newDestination, newWaypoints;

              if (startPointOption === 'gps' && currentLocation) {
                newOrigin = `${currentLocation.lat},${currentLocation.lng}`;
                newDestination = formatAddress(validStops[validStops.length - 1]);
                newWaypoints = validStops.slice(0, -1).map(contract => ({
                  location: formatAddress(contract),
                  stopover: true
                }));
              } else if (startPointOption === 'manual' && manualStartAddress.trim()) {
                newOrigin = manualStartAddress.trim();
                newDestination = formatAddress(validStops[validStops.length - 1]);
                newWaypoints = validStops.slice(0, -1).map(contract => ({
                  location: formatAddress(contract),
                  stopover: true
                }));
              } else {
                newOrigin = formatAddress(validStops[0]);
                newDestination = formatAddress(validStops[validStops.length - 1]);
                newWaypoints = validStops.slice(1, -1).map(contract => ({
                  location: formatAddress(contract),
                  stopover: true
                }));
              }

              // Retry the route request with valid addresses
              directionsService.route(
                {
                  origin: newOrigin,
                  destination: newDestination,
                  waypoints: newWaypoints,
                  optimizeWaypoints: true,
                  travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (retryResult, retryStatus) => {
                  if (retryStatus === window.google.maps.DirectionsStatus.OK) {
                    setIsOptimizing(false);
                    console.log('✅ Route created successfully with valid addresses!');
                    setDirectionsResponse(retryResult);
                    setDisplayedDirections(retryResult);

                    const waypointOrder = retryResult.routes[0].waypoint_order;
                    const optimized = [
                      validStops[0],
                      ...waypointOrder.map(i => validStops[i + 1]),
                      validStops[validStops.length - 1]
                    ];
                    setOptimizedRoute(optimized);
                    setExcludedStops([...excludedStops]);

                    const route = retryResult.routes[0];
                    let totalDistance = 0;
                    let totalDuration = 0;
                    route.legs.forEach(leg => {
                      totalDistance += leg.distance.value;
                      totalDuration += leg.duration.value;
                    });

                    setRouteInfo({
                      distance: (totalDistance / 1609.34).toFixed(2),
                      duration: Math.round(totalDuration / 60),
                      stops: optimized.length,
                      totalStops: allStops.length,
                      excluded: allStops.length - validStops.length
                    });
                  } else if (retryStatus === 'ZERO_RESULTS' && (startPointOption === 'gps' || startPointOption === 'manual')) {
                    // If still failing and we're using GPS or manual start, try starting from first stop instead
                    console.log('⚠️ Starting point may be unreachable. Trying route from first stop...');

                    const fallbackOrigin = formatAddress(validStops[0]);
                    const fallbackDestination = formatAddress(validStops[validStops.length - 1]);
                    const fallbackWaypoints = validStops.slice(1, -1).map(contract => ({
                      location: formatAddress(contract),
                      stopover: true
                    }));

                    // Final retry with first stop as origin
                    directionsService.route(
                      {
                        origin: fallbackOrigin,
                        destination: fallbackDestination,
                        waypoints: fallbackWaypoints,
                        optimizeWaypoints: true,
                        travelMode: window.google.maps.TravelMode.DRIVING,
                      },
                      (fallbackResult, fallbackStatus) => {
                        setIsOptimizing(false);
                        if (fallbackStatus === window.google.maps.DirectionsStatus.OK) {
                          console.log('✅ Route created starting from first stop!');
                          alert(`⚠️ Your selected start point could not connect to the stops.\n\nRoute created starting from first stop instead:\n${validStops[0].name}`);

                          setDirectionsResponse(fallbackResult);
                        setDisplayedDirections(fallbackResult);

                          const waypointOrder = fallbackResult.routes[0].waypoint_order;
                          const optimized = [
                            validStops[0],
                            ...waypointOrder.map(i => validStops[i + 1]),
                            validStops[validStops.length - 1]
                          ];
                          setOptimizedRoute(optimized);
                          setExcludedStops([...excludedStops]);

                          const route = fallbackResult.routes[0];
                          let totalDistance = 0;
                          let totalDuration = 0;
                          route.legs.forEach(leg => {
                            totalDistance += leg.distance.value;
                            totalDuration += leg.duration.value;
                          });

                          setRouteInfo({
                            distance: (totalDistance / 1609.34).toFixed(2),
                            duration: Math.round(totalDuration / 60),
                            stops: optimized.length,
                            totalStops: allStops.length,
                            excluded: allStops.length - validStops.length
                          });
                        } else {
                          console.error('❌ All retry attempts failed with status:', fallbackStatus);
                          alert(`Failed to create route. Status: ${fallbackStatus}\n\nPlease verify:\n1. Addresses are complete and correct\n2. Start point is within a reasonable distance\n3. Locations are accessible by road`);
                        }
                      }
                    );
                  } else {
                    setIsOptimizing(false);
                    console.error('❌ Retry also failed with status:', retryStatus);
                    alert(`Failed to create route. Status: ${retryStatus}\n\nPlease check that all addresses are complete, correct, and accessible by road.`);
                  }
                }
              );
            });
          } else {
            // Other errors - show standard error message
            let errorMessage = 'Failed to optimize route. ';
            switch (status) {
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
      }
    );
  }, [contracts, hoaCondoProperties, currentLocation, startPointOption, manualStartAddress]);

  // Auto-optimize route when contracts and necessary data are ready
  useEffect(() => {
    // Check if we have contracts and Google Maps is loaded
    const hasContracts = (contracts && contracts.length > 0) || (hoaCondoProperties && hoaCondoProperties.length > 0);

    // Determine if we're ready to auto-optimize based on start point option
    let isReady = false;
    if (startPointOption === 'gps') {
      // Wait for GPS location
      isReady = hasContracts && !hasAutoOptimized && !isOptimizing && isLoaded && currentLocation;
    } else if (startPointOption === 'manual') {
      // Wait for manual address
      isReady = hasContracts && !hasAutoOptimized && !isOptimizing && isLoaded && manualStartAddress.trim();
    } else {
      // first-stop option - no waiting needed
      isReady = hasContracts && !hasAutoOptimized && !isOptimizing && isLoaded;
    }

    if (isReady) {
      console.log('🎯 Auto-optimizing route...');
      setHasAutoOptimized(true);

      // Small delay to ensure everything is ready
      const timer = setTimeout(() => {
        optimizeRoute();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [contracts, hoaCondoProperties, hasAutoOptimized, isOptimizing, optimizeRoute, currentLocation, manualStartAddress, startPointOption, isLoaded]);

  const updateDisplayedRoute = useCallback((completedIds) => {
    if (!directionsResponse || !optimizedRoute || optimizedRoute.length === 0) {
      return;
    }

    // Filter out completed stops
    const remainingStops = optimizedRoute.filter(stop => !completedIds.has(stop.id));

    if (remainingStops.length === 0) {
      // All stops completed - clear the route
      setDisplayedDirections(null);
      return;
    }

    if (remainingStops.length === 1) {
      // Only one stop left - just show that location, no route needed
      setDisplayedDirections(null);
      return;
    }

    // Create new route with only remaining stops
    const directionsService = new window.google.maps.DirectionsService();
    const formatAddress = (contract) => {
      const parts = [contract.address, contract.city, contract.state, contract.zip].filter(part => part && part.trim());
      return parts.join(', ');
    };

    const origin = formatAddress(remainingStops[0]);
    const destination = formatAddress(remainingStops[remainingStops.length - 1]);
    const waypoints = remainingStops.slice(1, -1).map(contract => ({
      location: formatAddress(contract),
      stopover: true
    }));

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        optimizeWaypoints: false, // Keep the order we already have
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDisplayedDirections(result);
        } else {
          console.log('Could not update displayed route:', status);
          // Keep showing the old route if update fails
        }
      }
    );
  }, [directionsResponse, optimizedRoute]);

  const toggleStopCompletion = async (stopId) => {
    const newSet = new Set(completedStops);
    if (newSet.has(stopId)) {
      newSet.delete(stopId);
    } else {
      newSet.add(stopId);
    }
    setCompletedStops(newSet);

    // Update the displayed route to hide completed stops
    updateDisplayedRoute(newSet);

    // Save to Firebase if we have a current route
    if (db && currentRouteId) {
      try {
        const routeRef = doc(db, 'snowRoutes', currentRouteId);
        await setDoc(routeRef, {
          completedStops: Array.from(newSet),
          lastUpdated: serverTimestamp()
        }, { merge: true });
      } catch (error) {
        console.error('Error updating completion status:', error);
      }
    }
  };

  const saveStopNote = async (stopId, note) => {
    const updatedNotes = {
      ...stopNotes,
      [stopId]: note
    };
    setStopNotes(updatedNotes);

    // Save to Firebase if we have a current route
    if (db && currentRouteId) {
      try {
        const routeRef = doc(db, 'snowRoutes', currentRouteId);
        await setDoc(routeRef, {
          stopNotes: updatedNotes,
          lastUpdated: serverTimestamp()
        }, { merge: true });
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
  };

  const handleNoteChange = (stopId, value) => {
    setStopNotes({
      ...stopNotes,
      [stopId]: value
    });
  };

  const handleNoteSave = async (stopId) => {
    await saveStopNote(stopId, stopNotes[stopId] || '');
    setEditingNoteId(null);
  };

  const saveRoute = async () => {
    if (!db || !optimizedRoute || optimizedRoute.length === 0) {
      alert('Please optimize a route first');
      return;
    }

    const name = routeName.trim() || `Snow Route ${savedRoutes.length + 1}`;

    try {
      const routeData = {
        name: name,
        stops: optimizedRoute.map(stop => ({
          id: stop.id,
          name: stop.name,
          address: formatFullAddress(stop),
          priority: stop.priority || 'Normal'
        })),
        completedStops: Array.from(completedStops),
        stopNotes: stopNotes,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      };

      const routeRef = doc(collection(db, 'snowRoutes'));
      await setDoc(routeRef, routeData);

      setCurrentRouteId(routeRef.id);
      setRouteName('');
      alert(`Route "${name}" saved successfully!`);
    } catch (error) {
      console.error('Error saving route:', error);
      alert('Error saving route');
    }
  };

  const loadRoute = (route) => {
    setCurrentRouteId(route.id);
    setCompletedStops(new Set(route.completedStops || []));
    setStopNotes(route.stopNotes || {});
    alert(`Loaded route: ${route.name}`);
  };

  const getCompletionPercentage = () => {
    const totalStops = optimizedRoute.length + excludedStops.length;
    if (totalStops === 0) return 0;
    return Math.round((completedStops.size / totalStops) * 100);
  };

  const formatFullAddress = (contract) => {
    const parts = [
      contract.address,
      contract.city,
      contract.state,
      contract.zip
    ].filter(part => part && part.trim());
    return parts.join(', ');
  };

  const openInGoogleMaps = () => {
    if (!optimizedRoute || optimizedRoute.length === 0) {
      alert('Please optimize the route first');
      return;
    }

    // Filter out completed stops
    const remainingStops = optimizedRoute.filter(stop => !completedStops.has(stop.id));

    if (remainingStops.length === 0) {
      alert('All stops have been completed!');
      return;
    }

    if (remainingStops.length === 1) {
      // Just open the single remaining location
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatFullAddress(remainingStops[0]))}`;
      window.open(url, '_blank');
      return;
    }

    // Build Google Maps URL with waypoints (only uncompleted stops)
    const origin = encodeURIComponent(formatFullAddress(remainingStops[0]));
    const destination = encodeURIComponent(formatFullAddress(remainingStops[remainingStops.length - 1]));
    const waypoints = remainingStops
      .slice(1, -1)
      .map(c => encodeURIComponent(formatFullAddress(c)))
      .join('|');

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const openInAppleMaps = () => {
    if (!optimizedRoute || optimizedRoute.length === 0) {
      alert('Please optimize the route first');
      return;
    }

    // Filter out completed stops
    const remainingStops = optimizedRoute.filter(stop => !completedStops.has(stop.id));

    if (remainingStops.length === 0) {
      alert('All stops have been completed!');
      return;
    }

    if (remainingStops.length === 1) {
      // Just open the single remaining location
      const url = `http://maps.apple.com/?q=${encodeURIComponent(formatFullAddress(remainingStops[0]))}`;
      window.open(url, '_blank');
      return;
    }

    // Apple Maps supports multiple waypoints via http://maps.apple.com
    const origin = encodeURIComponent(formatFullAddress(remainingStops[0]));
    const destination = encodeURIComponent(formatFullAddress(remainingStops[remainingStops.length - 1]));

    // For Apple Maps, we'll create a URL with origin and destination
    // Note: Apple Maps has limited waypoint support via URL, so we'll use the first and last stops
    // Users will need to manually add intermediate stops or we navigate stop-by-stop
    const url = `http://maps.apple.com/?saddr=${origin}&daddr=${destination}&dirflg=d`;
    window.open(url, '_blank');
  };

  if (loadError) return <div className="p-4 bg-red-50 text-red-700 rounded-lg">Error loading maps</div>;
  if (!isLoaded) return <div className="p-4 bg-gray-50 text-gray-700 rounded-lg">Loading maps...</div>;

  return (
    <div className="space-y-4">
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

        {/* Display optimized route (excluding completed stops) */}
        {displayedDirections && (
          <DirectionsRenderer
            directions={displayedDirections}
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

      {/* Save/Load Routes */}
      {db && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                placeholder={`Snow Route ${savedRoutes.length + 1}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={saveRoute}
              disabled={!optimizedRoute || optimizedRoute.length === 0}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium whitespace-nowrap"
            >
              💾 Save Route
            </button>
            {savedRoutes.length > 0 && (
              <select
                onChange={(e) => {
                  const route = savedRoutes.find(r => r.id === e.target.value);
                  if (route) loadRoute(route);
                }}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="" disabled>Load Saved Route...</option>
                {savedRoutes.map(route => (
                  <option key={route.id} value={route.id}>
                    {route.name} ({route.stops?.length || 0} stops)
                  </option>
                ))}
              </select>
            )}
          </div>
          {currentRouteId && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Currently tracking: {savedRoutes.find(r => r.id === currentRouteId)?.name || 'Active Route'}
            </p>
          )}
        </div>
      )}

      {/* Start Point Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">📍 Route Start Point</h4>
        <div className="space-y-3">
          {/* Radio Options */}
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="startPoint"
                value="gps"
                checked={startPointOption === 'gps'}
                onChange={(e) => setStartPointOption(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">📱 Use GPS Location</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="startPoint"
                value="manual"
                checked={startPointOption === 'manual'}
                onChange={(e) => setStartPointOption(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">✏️ Manual Address</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="startPoint"
                value="first-stop"
                checked={startPointOption === 'first-stop'}
                onChange={(e) => setStartPointOption(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">🏁 Start from First Stop</span>
            </label>
          </div>

          {/* Manual Address Input */}
          {startPointOption === 'manual' && (
            <div>
              <GoogleAddressAutocomplete
                value={manualStartAddress}
                onChange={(value) => {
                  setManualStartAddress(value);
                  setHasAutoOptimized(false); // Allow re-optimization with new address
                }}
                onPlaceSelected={(addressData) => {
                  setManualStartAddress(addressData.fullAddress);
                  setHasAutoOptimized(false); // Allow re-optimization with new address
                  console.log('Start address selected:', addressData);
                }}
                placeholder="Enter starting address (e.g., 123 Main St, Hartford, CT)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Start typing your shop/office address, home, or any starting location
              </p>
            </div>
          )}

          {/* GPS Status */}
          {startPointOption === 'gps' && (
            <div className="text-sm">
              {currentLocation ? (
                <p className="text-green-600 flex items-center gap-2">
                  ✅ GPS location acquired ({currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)})
                </p>
              ) : (
                <p className="text-gray-600 flex items-center gap-2">
                  ⏳ Waiting for GPS location...
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Route Controls */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3`}>
        <button
          onClick={optimizeRoute}
          disabled={isOptimizing}
          className={`${isMobile ? 'w-full text-lg py-4' : 'flex-1 py-3'} bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold shadow-md active:scale-95`}
        >
          {isOptimizing ? '⏳ Optimizing...' : '🎯 Optimize Route'}
        </button>
        <button
          onClick={openInAppleMaps}
          disabled={!optimizedRoute || optimizedRoute.length === 0}
          className={`${isMobile ? 'w-full text-lg py-4' : 'flex-1 py-3'} bg-gray-800 text-white px-4 rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition-colors font-semibold shadow-md active:scale-95`}
        >
          🍎 Apple Maps
        </button>
        <button
          onClick={openInGoogleMaps}
          disabled={!optimizedRoute || optimizedRoute.length === 0}
          className={`${isMobile ? 'w-full text-lg py-4' : 'flex-1 py-3'} bg-purple-600 text-white px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors font-semibold shadow-md active:scale-95`}
        >
          🗺️ Google Maps
        </button>
      </div>

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
          {invalidAddresses && invalidAddresses.length > 0 && (
            <div className={`mt-3 p-3 bg-red-50 border border-red-200 rounded ${isMobile ? 'text-base' : 'text-sm'}`}>
              <span className="text-red-800 font-medium">
                ❌ {invalidAddresses.length} invalid address{invalidAddresses.length > 1 ? 'es' : ''} could not be included.
                Please review and correct {invalidAddresses.length > 1 ? 'them' : 'it'} below.
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
                  {completedStops.size} / {optimizedRoute.length + excludedStops.length}
                </span>
              )}
            </div>
          </div>

          {/* Summary Text */}
          <div className={`mt-3 text-center ${isMobile ? 'text-base' : 'text-sm'} text-gray-700`}>
            <span className="font-semibold">{completedStops.size}</span> of <span className="font-semibold">{optimizedRoute.length + excludedStops.length}</span> stops completed
            {completedStops.size === (optimizedRoute.length + excludedStops.length) && (optimizedRoute.length + excludedStops.length) > 0 && (
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
              const hasNote = stopNotes[contract.id];
              const isEditingNote = editingNoteId === contract.id;

              return (
                <div
                  key={`optimized-${contract.id}`}
                  className={`rounded-lg border transition-all ${
                    isCompleted
                      ? 'bg-green-50 border-green-200 opacity-75'
                      : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  {/* Main Stop Row */}
                  <div
                    className={`flex items-center gap-3 ${isMobile ? 'p-4' : 'p-2'}`}
                    onClick={(e) => {
                      // Only toggle if not clicking on note area
                      if (!e.target.closest('.note-area') && userPermissions.markSnowComplete) {
                        toggleStopCompletion(contract.id);
                      }
                    }}
                    style={{ cursor: userPermissions.markSnowComplete ? 'pointer' : 'default' }}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => userPermissions.markSnowComplete && toggleStopCompletion(contract.id)}
                      onClick={(e) => e.stopPropagation()}
                      disabled={!userPermissions.markSnowComplete}
                      className={`flex-shrink-0 ${isMobile ? 'w-7 h-7' : 'w-5 h-5'} text-green-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-green-500 ${userPermissions.markSnowComplete ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
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

                  {/* Notes Section */}
                  <div className={`note-area border-t ${isCompleted ? 'border-green-200' : 'border-gray-200'} ${isMobile ? 'p-4 pt-3' : 'p-2 pt-2'}`}>
                    {isEditingNote ? (
                      <div className="flex gap-2">
                        <textarea
                          value={stopNotes[contract.id] || ''}
                          onChange={(e) => handleNoteChange(contract.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Add notes for team (e.g., 'Side door access', 'Call on arrival', 'Extra salt needed')"
                          className={`flex-1 ${isMobile ? 'text-sm' : 'text-xs'} px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
                          rows="2"
                          autoFocus
                        />
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNoteSave(contract.id);
                            }}
                            className={`${isMobile ? 'px-3 py-2 text-sm' : 'px-2 py-1 text-xs'} bg-blue-600 text-white rounded hover:bg-blue-700 font-medium whitespace-nowrap`}
                          >
                            Save
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingNoteId(null);
                              // Revert changes
                              if (db && currentRouteId) {
                                const routeRef = doc(db, 'snowRoutes', currentRouteId);
                                getDoc(routeRef).then(snapshot => {
                                  if (snapshot.exists() && snapshot.data().stopNotes) {
                                    setStopNotes(snapshot.data().stopNotes);
                                  }
                                });
                              }
                            }}
                            className={`${isMobile ? 'px-3 py-2 text-sm' : 'px-2 py-1 text-xs'} bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium`}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          {hasNote ? (
                            <p className={`${isMobile ? 'text-sm' : 'text-xs'} text-gray-700 italic bg-white p-2 rounded border border-gray-200`}>
                              💬 {stopNotes[contract.id]}
                            </p>
                          ) : (
                            <p className={`${isMobile ? 'text-sm' : 'text-xs'} text-gray-400 italic`}>
                              No team notes yet
                            </p>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingNoteId(contract.id);
                          }}
                          className={`${isMobile ? 'px-3 py-2 text-sm' : 'px-2 py-1 text-xs'} bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-medium whitespace-nowrap flex-shrink-0`}
                        >
                          {hasNote ? 'Edit Note' : 'Add Note'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Excluded Stops (not on map, but shown in list) */}
            {excludedStops && excludedStops.length > 0 && (
              <>
                <div className="my-4 border-t-2 border-yellow-300 pt-4">
                  <p className="text-sm font-medium text-yellow-700 mb-2">
                    ⚠️ Additional Stops (not on map due to 25-stop limit)
                  </p>
                </div>
                {excludedStops.map((contract, index) => {
                  const fullAddress = [
                    contract.address,
                    contract.city,
                    contract.state,
                    contract.zip
                  ].filter(part => part && part.trim()).join(', ');

                  const isCompleted = completedStops.has(contract.id);

                  return (
                    <div
                      key={`excluded-${contract.id}`}
                      className={`flex items-center gap-3 ${isMobile ? 'p-4' : 'p-2'} rounded-lg border transition-all ${
                        isCompleted
                          ? 'bg-green-50 border-green-200 opacity-75'
                          : 'bg-yellow-50 border-yellow-200'
                      }`}
                      onClick={() => userPermissions.markSnowComplete && toggleStopCompletion(contract.id)}
                      style={{ cursor: userPermissions.markSnowComplete ? 'pointer' : 'default' }}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => userPermissions.markSnowComplete && toggleStopCompletion(contract.id)}
                        onClick={(e) => e.stopPropagation()}
                        disabled={!userPermissions.markSnowComplete}
                        className={`flex-shrink-0 ${isMobile ? 'w-7 h-7' : 'w-5 h-5'} text-green-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-green-500 ${userPermissions.markSnowComplete ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                      />

                      {/* Route Number */}
                      <span className={`flex-shrink-0 ${isMobile ? 'w-12 h-12 text-lg' : 'w-8 h-8 text-sm'} ${
                        isCompleted ? 'bg-green-600' : 'bg-yellow-600'
                      } text-white rounded-full flex items-center justify-center font-bold shadow-sm`}>
                        {optimizedRoute.length + index + 1}
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
              </>
            )}

            {/* Invalid Addresses (addresses that couldn't be geocoded) */}
            {invalidAddresses && invalidAddresses.length > 0 && (
              <>
                <div className="my-4 border-t-2 border-red-300 pt-4">
                  <p className="text-sm font-medium text-red-700 mb-2">
                    ❌ Invalid Addresses (not included in route - please verify and correct)
                  </p>
                </div>
                {invalidAddresses.map((contract, index) => {
                  const fullAddress = [
                    contract.address,
                    contract.city,
                    contract.state,
                    contract.zip
                  ].filter(part => part && part.trim()).join(', ');

                  return (
                    <div
                      key={`invalid-${contract.id}`}
                      className={`flex items-center gap-3 ${isMobile ? 'p-4' : 'p-2'} rounded-lg border bg-red-50 border-red-200`}
                    >
                      {/* Warning Icon */}
                      <span className={`flex-shrink-0 ${isMobile ? 'w-12 h-12 text-lg' : 'w-8 h-8 text-sm'} bg-red-600 text-white rounded-full flex items-center justify-center font-bold shadow-sm`}>
                        !
                      </span>

                      {/* Address Info */}
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-red-900 ${isMobile ? 'text-lg mb-1' : 'text-sm'}`}>
                          {contract.name}
                        </p>
                        <p className={`text-red-700 ${isMobile ? 'text-sm' : 'text-xs'}`}>
                          📍 {fullAddress || 'Address incomplete'}
                        </p>
                        <p className={`text-red-600 ${isMobile ? 'text-xs' : 'text-[10px]'} mt-1 italic`}>
                          This address could not be found by Google Maps. Please verify and correct it in the customer details.
                        </p>
                      </div>

                      {/* Priority Badge */}
                      <span className={`flex-shrink-0 ${isMobile ? 'px-3 py-2 text-sm' : 'px-2 py-1 text-xs'} rounded-full font-medium bg-red-100 text-red-800`}>
                        Invalid
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SnowRemovalMap;
