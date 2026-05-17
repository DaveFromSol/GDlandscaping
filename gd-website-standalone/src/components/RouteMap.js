import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// Nearest-neighbor route from a start point through all jobs
function nearestNeighborRoute(start, jobs) {
  const withCoords = jobs.filter(j => j._coords);
  if (!withCoords.length) return withCoords;

  const startPt = start || withCoords[0]._coords;
  const remaining = [...withCoords];
  const ordered = [];

  let cur = startPt;
  while (remaining.length) {
    let nearest = null, nearestDist = Infinity, nearestIdx = 0;
    remaining.forEach((j, i) => {
      const d = haversineKm(cur.lat, cur.lng, j._coords.lat, j._coords.lng);
      if (d < nearestDist) { nearestDist = d; nearest = j; nearestIdx = i; }
    });
    ordered.push(nearest);
    cur = nearest._coords;
    remaining.splice(nearestIdx, 1);
  }
  return ordered;
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function geocode(address) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&q=${encodeURIComponent(address)}`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    if (data[0]) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch (_) {}
  return null;
}

export default function RouteMap({ jobs, currentLocation, date }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState([]);
  const [totalMi, setTotalMi] = useState(null);

  // Geocode missing coords then compute route
  useEffect(() => {
    if (!jobs.length) { setLoading(false); return; }

    const pendingJobs = jobs.filter(j => j.status !== 'completed');

    const run = async () => {
      setLoading(true);

      // Geocode any jobs that don't have coords yet
      const geocoded = await Promise.all(
        pendingJobs.map(async (job) => {
          if (job._coords) return job;
          if (!job.address) return job;
          const coords = await geocode(job.address);
          return coords ? { ...job, _coords: coords } : job;
        })
      );

      const ordered = nearestNeighborRoute(currentLocation, geocoded);
      setRoute(ordered);

      // Total distance
      if (ordered.length > 1) {
        let start = currentLocation || ordered[0]._coords;
        let dist = 0;
        [start, ...ordered.map(j => j._coords)].reduce((prev, cur) => {
          if (prev && cur) dist += haversineKm(prev.lat, prev.lng, cur.lat, cur.lng);
          return cur;
        });
        setTotalMi((dist * 0.621371).toFixed(1));
      }

      setLoading(false);
    };

    run();
  }, [jobs, currentLocation]);

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-72.755, 41.622],
      zoom: 10,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Draw markers + route line whenever route changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || loading) return;

    const drawOnMap = () => {
      // Clear old markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      // Remove old layers/sources
      ['route-line', 'route-line-bg'].forEach(id => {
        if (map.getLayer(id)) map.removeLayer(id);
      });
      if (map.getSource('route')) map.removeSource('route');

      const points = [];

      // Current location marker (blue dot)
      if (currentLocation) {
        const el = document.createElement('div');
        el.style.cssText = `width:18px;height:18px;border-radius:50%;background:#3b82f6;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);`;
        new mapboxgl.Marker({ element: el })
          .setLngLat([currentLocation.lng, currentLocation.lat])
          .setPopup(new mapboxgl.Popup({ offset: 12 }).setHTML('<p style="font-size:12px;font-weight:600;margin:0">Your Location</p>'))
          .addTo(map);
        markersRef.current.push(new mapboxgl.Marker({ element: el }));
        points.push([currentLocation.lng, currentLocation.lat]);
      }

      // Job markers
      route.forEach((job, i) => {
        if (!job._coords) return;
        const { lat, lng } = job._coords;
        const isCompleted = job.status === 'completed';

        const el = document.createElement('div');
        el.style.cssText = `
          width: 32px; height: 32px; border-radius: 50%;
          background: ${isCompleted ? '#9ca3af' : '#16a34a'};
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: white;
          cursor: pointer;
        `;
        el.textContent = i + 1;

        const serviceLabel = (job.serviceType || 'job').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        const popup = new mapboxgl.Popup({ offset: 16, maxWidth: '220px' }).setHTML(`
          <div style="font-family:system-ui,sans-serif;padding:2px 0">
            <p style="font-size:13px;font-weight:700;margin:0 0 4px;color:#111">${job.customerName || 'Unknown'}</p>
            <p style="font-size:11px;color:#555;margin:0 0 2px">${job.address || ''}</p>
            <p style="font-size:11px;color:#16a34a;font-weight:600;margin:0 0 2px">${serviceLabel}</p>
            ${job.startTime ? `<p style="font-size:11px;color:#777;margin:0">🕐 ${formatTime(job.startTime)}</p>` : ''}
            ${job.estimatedTime ? `<p style="font-size:11px;color:#777;margin:0">⏱ ${job.estimatedTime} min</p>` : ''}
          </div>
        `);

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
        points.push([lng, lat]);
      });

      // Route line
      if (points.length > 1) {
        map.addSource('route', {
          type: 'geojson',
          data: { type: 'Feature', geometry: { type: 'LineString', coordinates: points } }
        });
        // Shadow line
        map.addLayer({
          id: 'route-line-bg',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#000', 'line-width': 6, 'line-opacity': 0.12 }
        });
        // Main line
        map.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#16a34a', 'line-width': 4, 'line-dasharray': [1, 0] }
        });
      }

      // Fit map to all points
      if (points.length === 1) {
        map.flyTo({ center: points[0], zoom: 14 });
      } else if (points.length > 1) {
        const bounds = points.reduce(
          (b, p) => b.extend(p),
          new mapboxgl.LngLatBounds(points[0], points[0])
        );
        map.fitBounds(bounds, { padding: 60, maxZoom: 14 });
      }
    };

    if (map.isStyleLoaded()) {
      drawOnMap();
    } else {
      map.once('load', drawOnMap);
    }
  }, [route, currentLocation, loading]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span className="text-sm font-bold text-gray-800">Route Map</span>
          {loading && <span className="text-xs text-gray-400">Geocoding addresses…</span>}
          {!loading && route.length > 0 && (
            <span className="text-xs text-gray-500">
              {route.length} stop{route.length !== 1 ? 's' : ''}
              {totalMi && ` · ~${totalMi} mi`}
            </span>
          )}
        </div>
        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span style={{width:10,height:10,borderRadius:'50%',background:'#16a34a',display:'inline-block'}}/> Pending</span>
          <span className="flex items-center gap-1"><span style={{width:10,height:10,borderRadius:'50%',background:'#9ca3af',display:'inline-block'}}/> Done</span>
          {currentLocation && <span className="flex items-center gap-1"><span style={{width:10,height:10,borderRadius:'50%',background:'#3b82f6',display:'inline-block'}}/> You</span>}
        </div>
      </div>

      {/* Map container */}
      <div ref={containerRef} style={{ height: 380 }} />

      {/* Stop list */}
      {!loading && route.length > 0 && (
        <div className="border-t border-gray-100 px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {currentLocation && (
              <div className="flex-shrink-0 flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="text-xs font-semibold text-blue-800">Start</span>
              </div>
            )}
            {route.map((job, i) => (
              <div
                key={job.id}
                className={`flex-shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 border ${
                  job.status === 'completed'
                    ? 'bg-gray-50 border-gray-200 opacity-60'
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <span
                  className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: job.status === 'completed' ? '#9ca3af' : '#16a34a', fontSize: 11 }}
                >
                  {i + 1}
                </span>
                <span className={`text-xs font-semibold truncate max-w-[100px] ${job.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                  {job.customerName || job.address?.split(',')[0] || `Stop ${i + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && route.length === 0 && (
        <div className="py-8 text-center text-sm text-gray-400">No pending jobs with addresses to map</div>
      )}
    </div>
  );
}

function formatTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
}
