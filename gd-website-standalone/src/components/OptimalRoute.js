import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const OptimalRoute = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [routeInfo, setRouteInfo] = useState(null);

  // Google Maps API Key
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyDiFzxddX5tpdulBf8YMVXFekxFUJ2ys-c';

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places', 'geometry']
      });

      try {
        await loader.load();
        
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat: 41.6219, lng: -72.7553 }, // Berlin, CT
          zoom: 11,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        const directionsServiceInstance = new window.google.maps.DirectionsService();
        const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
          draggable: false,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#10b981',
            strokeWeight: 4,
            strokeOpacity: 0.8
          }
        });

        directionsRendererInstance.setMap(mapInstance);

        setMap(mapInstance);
        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, []);

  // Fetch clients from Firebase
  useEffect(() => {
    const fetchClients = async () => {
      if (!db) return;
      
      try {
        const submissionsQuery = query(collection(db, 'contactSubmissions'));
        const querySnapshot = await getDocs(submissionsQuery);
        
        const clientsData = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(client => client.address && client.address !== 'Not provided');

        setClients(clientsData);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Geocode addresses and create optimal route
  const calculateOptimalRoute = async () => {
    if (!map || !directionsService || !directionsRenderer || clients.length === 0) return;

    setLoading(true);
    const geocoder = new window.google.maps.Geocoder();
    const validLocations = [];

    // Starting point (your business location)
    const startLocation = 'Berlin, CT 06037';

    try {
      // Geocode all client addresses
      for (const client of clients) {
        try {
          const result = await new Promise((resolve, reject) => {
            geocoder.geocode(
              { address: `${client.address}, Connecticut` },
              (results, status) => {
                if (status === 'OK' && results[0]) {
                  resolve(results[0]);
                } else {
                  reject(status);
                }
              }
            );
          });

          validLocations.push({
            ...client,
            location: result.geometry.location,
            address: result.formatted_address
          });
        } catch (error) {
          console.warn(`Could not geocode address for ${client.firstName} ${client.lastName}:`, client.address);
        }
      }

      if (validLocations.length === 0) {
        alert('No valid addresses found for route calculation.');
        setLoading(false);
        return;
      }

      // Create waypoints (excluding start and end)
      const waypoints = validLocations.slice(0, 8).map(client => ({
        location: client.location,
        stopover: true
      }));

      // Calculate route
      directionsService.route(
        {
          origin: startLocation,
          destination: startLocation, // Return to start
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: window.google.maps.TravelMode.DRIVING,
          avoidTolls: true
        },
        (result, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(result);
            
            // Calculate route info
            const route = result.routes[0];
            let totalDistance = 0;
            let totalDuration = 0;

            route.legs.forEach(leg => {
              totalDistance += leg.distance.value;
              totalDuration += leg.duration.value;
            });

            setRouteInfo({
              totalDistance: (totalDistance / 1609.34).toFixed(1), // Convert to miles
              totalDuration: Math.round(totalDuration / 60), // Convert to minutes
              numberOfStops: validLocations.length,
              waypoints: result.routes[0].waypoint_order.map(index => validLocations[index])
            });
          } else {
            console.error('Directions request failed:', status);
            alert('Could not calculate route. Please try again.');
          }
          setLoading(false);
        }
      );

    } catch (error) {
      console.error('Error calculating route:', error);
      setLoading(false);
    }
  };

  return (
    <div className="optimal-route-container">
      <div className="route-header mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Optimal Route Planner</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={calculateOptimalRoute}
              disabled={loading || clients.length === 0}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Calculating...' : 'Calculate Route'}
            </button>
          </div>
        </div>

        {routeInfo && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-green-800 mb-2">Route Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-green-600 font-medium">Distance:</span>
                <div className="text-lg font-bold text-green-800">{routeInfo.totalDistance} mi</div>
              </div>
              <div>
                <span className="text-green-600 font-medium">Duration:</span>
                <div className="text-lg font-bold text-green-800">{Math.floor(routeInfo.totalDuration / 60)}h {routeInfo.totalDuration % 60}m</div>
              </div>
              <div>
                <span className="text-green-600 font-medium">Stops:</span>
                <div className="text-lg font-bold text-green-800">{routeInfo.numberOfStops}</div>
              </div>
              <div>
                <span className="text-green-600 font-medium">Fuel Est:</span>
                <div className="text-lg font-bold text-green-800">${(routeInfo.totalDistance * 0.15).toFixed(0)}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div 
              ref={mapRef} 
              className="w-full h-96 lg:h-[600px]"
              style={{ minHeight: '400px' }}
            />
          </div>
        </div>

        {/* Client List */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Clients ({clients.length})
          </h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : clients.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No client addresses found.
              <br />
              Submit a contact form with an address to see routes.
            </p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {clients.map((client, index) => (
                <div
                  key={client.id}
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {client.firstName} {client.lastName}
                      </h4>
                      <p className="text-sm text-gray-600 truncate">
                        {client.address}
                      </p>
                      <p className="text-xs text-gray-500">
                        {client.services} • {client.budget}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        {client.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptimalRoute;