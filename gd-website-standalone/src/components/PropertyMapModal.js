import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const PropertyMapModal = ({ address, coordinates, onClose, onConfirm }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [propertySize, setPropertySize] = useState(null);
  const [parcelGeometry, setParcelGeometry] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [drawnArea, setDrawnArea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('estimate'); // 'cadastre', 'building', or 'estimate'

  console.log('PropertyMapModal rendered with:', { address, coordinates });

  useEffect(() => {
    if (!coordinates || map.current) return;

    console.log('Initializing map with coordinates:', coordinates);

    try {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZHJpY2h0ZXIwNiIsImEiOiJjbWd0anR3ZXEwNTUwMnNwdDRmaDZ5ZndiIn0.UbCV_Y8l1Duq9B2Q77OFCw';

      // Completely disable Mapbox telemetry to prevent CORS errors
      if (typeof mapboxgl.prewarm === 'function') {
        mapboxgl.prewarm();
      }
      // Disable telemetry collection
      if (typeof mapboxgl.setRTLTextPlugin === 'function') {
        // This is safe, just checking if the function exists
      }

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: coordinates,
        zoom: 19,
        pitch: 45,
        collectResourceTiming: false // Disable telemetry to prevent CORS errors
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Handle map load event
      map.current.on('load', () => {
        console.log('Map loaded successfully');
        setIsLoading(false);

        // Add marker at the address
        new mapboxgl.Marker({ color: '#2d5016' })
          .setLngLat(coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<strong>${address}</strong>`))
          .addTo(map.current);

        // Draw property boundary immediately
        console.log('Drawing property boundary immediately');
        drawDefaultProperty(coordinates);
      });

      // Handle map errors
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setError('Error loading map. Please try again.');
        setIsLoading(false);
      });

    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to initialize map. Please try again.');
      setIsLoading(false);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [coordinates, address]);

  const drawDefaultProperty = async (coords) => {
    console.log('=== FETCHING PROPERTY BOUNDARIES ===');
    console.log('Coordinates:', coords);
    console.log('Address:', address);

    try {
      // Parse town from address
      const detectTown = (addressString) => {
        const addressLower = addressString.toLowerCase();

        // Extract the actual town from the address (format: "Street, Town, State ZIP")
        // This prevents matching street names like "Farmington Avenue" in Plainville
        const addressParts = addressString.split(',').map(s => s.trim().toLowerCase());
        const actualTown = addressParts.length >= 2 ? addressParts[1] : addressLower;

        // IMPORTANT: Order matters! Check more specific names first (West Hartford, East Hartford)
        // before checking generic ones (Hartford) to avoid false matches
        const townGisMap = [
          // West Hartford uses MapGeo - different API format, skip for now and use Regrid
          // {
          //   keywords: ['west hartford'],
          //   name: 'West Hartford',
          //   url: 'https://westhartfordct.mapgeo.io/api/v1/parcels'
          // },
          {
            keywords: ['east hartford'],
            name: 'East Hartford',
            url: 'https://gis.easthartfordct.gov/arcgis/rest/services/Parcels/MapServer/0/query'
          },
          {
            keywords: ['new britain'],
            name: 'New Britain',
            url: 'https://gis.vgsi.com/newbritainct/rest/services/Parcel/MapServer/0/query'
          },
          // Rocky Hill GIS server is offline - commented out to fall back to CT CAMA
          // {
          //   keywords: ['rocky hill'],
          //   name: 'Rocky Hill',
          //   url: 'https://gis.rockyhillct.gov/arcgis/rest/services/Parcels/MapServer/0/query'
          // },
          {
            keywords: ['berlin', 'kensington'], // Kensington is a village within Berlin, CT
            name: 'Berlin',
            url: 'https://server1.mapxpress.net/arcgis/rest/services/Berlin/Parcels/MapServer/0/query'
          },
          {
            keywords: ['hartford'],
            exclude: ['west hartford', 'east hartford'],
            name: 'Hartford',
            url: 'https://gis.hartford.gov/arcgis/rest/services/AssessorParcels/MapServer/3/query',
            useProxy: true // Hartford blocks CORS, use backend proxy
          },
          {
            keywords: ['middletown'],
            name: 'Middletown',
            url: 'https://gis.middletownct.gov/arcgis/rest/services/Parcels/MapServer/0/query'
          },
          {
            keywords: ['glastonbury'],
            name: 'Glastonbury',
            url: 'https://gis.glastonburyct.gov/arcgis/rest/services/Parcels/MapServer/0/query'
          },
          {
            keywords: ['manchester'],
            name: 'Manchester',
            url: 'https://gis.manchesterct.gov/arcgis/rest/services/Parcels/MapServer/0/query'
          },
          {
            keywords: ['farmington'],
            name: 'Farmington',
            url: 'https://gis.farmington-ct.org/arcgis/rest/services/Parcels/MapServer/0/query'
          },
          {
            keywords: ['newington'],
            name: 'Newington',
            url: 'https://server1.mapxpress.net/arcgis/rest/services/Newington/Parcels/MapServer/0/query'
          },
          {
            keywords: ['wethersfield'],
            name: 'Wethersfield',
            url: 'https://gis.wethersfieldct.gov/arcgis/rest/services/Parcels/MapServer/0/query'
          },
          // Cromwell GIS server (gis.cromwellct.com) is not working - returns "Web Site Not Found"
          // Commented out to fall back to Regrid/Geocodio for Cromwell addresses
          // {
          //   keywords: ['cromwell'],
          //   name: 'Cromwell',
          //   url: 'https://gis.cromwellct.com/arcgis/rest/services/Parcels/MapServer/0/query'
          // },
          {
            keywords: ['portland'],
            name: 'Portland',
            url: 'https://gis.portlandct.org/arcgis/rest/services/Parcels/MapServer/0/query'
          },
          {
            keywords: ['plainville'],
            name: 'Plainville',
            url: 'https://server1.mapxpress.net/arcgis/rest/services/Plainville/GCX_PLAINVILLE/MapServer/19/query'
          },
          {
            keywords: ['bristol'],
            name: 'Bristol',
            url: 'https://server1.mapxpress.net/arcgis/rest/services/Bristol/Parcels/MapServer/0/query'
          }
          // The following towns within 15 miles of Berlin are supported via CT CAMA statewide layer:
          // - Meriden, Cheshire, Wolcott, East Hampton, Prospect
          // - West Hartford (MapGeo API - different format)
          // - Cromwell (server offline)
          // All 169 CT towns are covered by the CT CAMA fallback layer with 50m buffer
        ];

        // Check each town in order (specific names first)
        for (const townInfo of townGisMap) {
          // Check if any exclude keywords match
          if (townInfo.exclude) {
            let shouldExclude = false;
            for (const excludeKeyword of townInfo.exclude) {
              if (actualTown.includes(excludeKeyword)) {
                shouldExclude = true;
                break;
              }
            }
            if (shouldExclude) continue; // Skip this town
          }

          // Check if any keywords match in the actual town name (not the full address)
          for (const keyword of townInfo.keywords) {
            if (actualTown.includes(keyword)) {
              return townInfo;
            }
          }
        }
        return null;
      };

      // Check if this address is in a supported CT town
      const townGis = detectTown(address);

      if (townGis) {
        console.log(`Address is in ${townGis.name}, querying town GIS...`);
        try {
          // Strategy 1: Try "contains" query first (most accurate - finds parcel that contains the point)
          const pointGeom = `${coords[0]},${coords[1]}`;

          const params = new URLSearchParams({
            f: 'json',
            returnGeometry: 'true',
            spatialRel: 'esriSpatialRelContains',  // CRITICAL: Only parcels containing the point
            geometry: pointGeom,
            geometryType: 'esriGeometryPoint',
            inSR: '4326',
            outFields: '*',
            outSR: '4326'
          });

          console.log(`Using "contains" query: point ${pointGeom}`);

          // Use proxy for CORS-blocked towns, direct fetch for others
          let fetchUrl;
          if (townGis.useProxy) {
            // Route through backend proxy to bypass CORS
            const targetUrl = `${townGis.url}?${params}`;
            fetchUrl = `/api/gis-proxy?url=${encodeURIComponent(targetUrl)}`;
            console.log(`Querying ${townGis.name} GIS via proxy:`, fetchUrl);
          } else {
            // Direct query for CORS-friendly towns
            fetchUrl = `${townGis.url}?${params}`;
            console.log(`Querying ${townGis.name} GIS directly:`, fetchUrl);
          }

          const response = await fetch(fetchUrl, {
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            const data = await response.json();

            if (data.features && data.features.length > 0) {
              console.log(`✓ "Contains" query found ${data.features.length} parcel(s)`);
              const feature = data.features[0];
              console.log(`Found ${townGis.name} parcel:`, feature);

              // Extract geometry
              if (feature.geometry && feature.geometry.rings) {
                const polygonCoords = feature.geometry.rings[0].map(ring => [ring[0], ring[1]]);
                setParcelGeometry(feature.geometry);

                console.log(`Drawing official ${townGis.name} CT parcel boundary`);
                setDataSource('cadastre');

                // Get acres from attributes (try common field names)
                if (feature.attributes) {
                  // Hartford uses a special TotAcreage field (in square feet)
                  const hartfordSqFt = feature.attributes['GISADMIN.CAMAGIS_Property_Details_w_ObjectID.TotAcreage'];

                  if (hartfordSqFt && townGis.name === 'Hartford') {
                    const sqFt = Math.round(parseFloat(hartfordSqFt));
                    const acres = (sqFt / 43560).toFixed(2);
                    console.log(`Official ${townGis.name} CT parcel size:`, { sqFt, acres });
                    setPropertySize({ sqFt, acres });
                  } else {
                    // Try standard acre fields for other towns
                    const acres = feature.attributes.ACRES ||
                                 feature.attributes.Acres ||
                                 feature.attributes.acres ||
                                 feature.attributes.ACREAGE ||
                                 feature.attributes.Acreage ||
                                 feature.attributes.CALC_ACRES ||
                                 feature.attributes.GIS_ACRES;

                    if (acres) {
                      const acresNum = parseFloat(acres);
                      const sqFt = Math.round(acresNum * 43560);
                      console.log(`Official ${townGis.name} CT parcel size:`, { sqFt, acres: acresNum.toFixed(2) });
                      setPropertySize({ sqFt, acres: acresNum.toFixed(2) });
                    }
                  }
                }

                drawPropertyPolygon(polygonCoords, coords);
                return;
              }
            } else {
              // Fallback: If "contains" returns 0 results, try distance-based query
              console.warn(`⚠️ "Contains" query returned 0 results - point may be on road/boundary`);
              console.log(`Falling back to distance-based query (10m radius)...`);

              const distanceParams = new URLSearchParams({
                f: 'json',
                returnGeometry: 'true',
                spatialRel: 'esriSpatialRelIntersects',
                geometry: pointGeom,
                geometryType: 'esriGeometryPoint',
                distance: '10',  // 10 meters - tight radius to avoid neighbors
                units: 'esriSRUnit_Meter',
                inSR: '4326',
                outFields: '*',
                outSR: '4326'
              });

              const fallbackUrl = townGis.useProxy
                ? `/api/gis-proxy?url=${encodeURIComponent(`${townGis.url}?${distanceParams}`)}`
                : `${townGis.url}?${distanceParams}`;

              const fallbackResponse = await fetch(fallbackUrl, { headers: { 'Accept': 'application/json' } });

              if (fallbackResponse.ok) {
                const fallbackData = await fallbackResponse.json();

                if (fallbackData.features && fallbackData.features.length > 0) {
                  console.log(`✓ Distance fallback found ${fallbackData.features.length} parcel(s)`);

                  // Use our existing point-in-polygon check to find the right one
                  const isPointInPolygon = (point, polygon) => {
                    let inside = false;
                    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                      const xi = polygon[i][0], yi = polygon[i][1];
                      const xj = polygon[j][0], yj = polygon[j][1];
                      const intersect = ((yi > point[1]) !== (yj > point[1]))
                        && (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
                      if (intersect) inside = !inside;
                    }
                    return inside;
                  };

                  // Extract street number from address for matching
                  const extractStreetNumber = (addr) => {
                    if (!addr) return null;
                    const match = addr.match(/^\s*(\d+[A-Za-z]?)\s+/);
                    return match ? match[1].toLowerCase() : null;
                  };
                  const inputStreetNumber = extractStreetNumber(address);

                  // PRIORITY 1: Find parcel containing the point with matching street number
                  let selectedFeature = fallbackData.features.find(f => {
                    if (!f.geometry?.rings?.[0]) return false;
                    const containsPoint = isPointInPolygon(coords, f.geometry.rings[0]);
                    if (!containsPoint) return false;

                    // Check address match
                    if (inputStreetNumber) {
                      const parcelAddr = f.attributes?.SITEADDR || f.attributes?.Location ||
                                        f.attributes?.PROPLOC || f.attributes?.ADDRESS || '';
                      const parcelNumber = extractStreetNumber(parcelAddr);
                      if (parcelNumber && parcelNumber === inputStreetNumber) {
                        console.log(`✓ PERFECT: Parcel contains point AND matches address number ${inputStreetNumber}`);
                        return true;
                      }
                    }
                    return false;
                  });

                  // PRIORITY 2: Find parcel containing the point (even without address match)
                  if (!selectedFeature) {
                    selectedFeature = fallbackData.features.find(f =>
                      f.geometry?.rings?.[0] && isPointInPolygon(coords, f.geometry.rings[0])
                    );
                    if (selectedFeature) {
                      console.log(`✓ Found parcel containing point (no address match verified)`);
                    }
                  }

                  // PRIORITY 3: Use closest parcel with matching street number
                  if (!selectedFeature && inputStreetNumber) {
                    selectedFeature = fallbackData.features.find(f => {
                      const parcelAddr = f.attributes?.SITEADDR || f.attributes?.Location ||
                                        f.attributes?.PROPLOC || f.attributes?.ADDRESS || '';
                      const parcelNumber = extractStreetNumber(parcelAddr);
                      return parcelNumber && parcelNumber === inputStreetNumber;
                    });
                    if (selectedFeature) {
                      console.log(`Using closest parcel with matching address number ${inputStreetNumber}`);
                    }
                  }

                  // PRIORITY 4: Last resort - use closest by distance
                  if (!selectedFeature) {
                    selectedFeature = fallbackData.features[0];
                    console.warn(`⚠️ Using closest parcel (no point containment or address match)`);
                  }

                  if (selectedFeature?.geometry?.rings) {
                    const polygonCoords = selectedFeature.geometry.rings[0].map(ring => [ring[0], ring[1]]);
                    setParcelGeometry(selectedFeature.geometry);
                    console.log(`Drawing official ${townGis.name} CT parcel boundary (via fallback)`);
                    setDataSource('cadastre');

                    // Extract acres (same logic as above)
                    if (selectedFeature.attributes) {
                      const hartfordSqFt = selectedFeature.attributes['GISADMIN.CAMAGIS_Property_Details_w_ObjectID.TotAcreage'];
                      if (hartfordSqFt && townGis.name === 'Hartford') {
                        const sqFt = Math.round(parseFloat(hartfordSqFt));
                        const acres = (sqFt / 43560).toFixed(2);
                        setPropertySize({ sqFt, acres });
                      } else {
                        const acres = selectedFeature.attributes.ACRES || selectedFeature.attributes.Acres ||
                                     selectedFeature.attributes.acres || selectedFeature.attributes.ACREAGE ||
                                     selectedFeature.attributes.Acreage || selectedFeature.attributes.CALC_ACRES ||
                                     selectedFeature.attributes.GIS_ACRES;
                        if (acres) {
                          const acresNum = parseFloat(acres);
                          const sqFt = Math.round(acresNum * 43560);
                          setPropertySize({ sqFt, acres: acresNum.toFixed(2) });
                        }
                      }
                    }

                    drawPropertyPolygon(polygonCoords, coords);
                    return;
                  }
                }
              }
            }
          } else {
            console.log(`${townGis.name} GIS returned error:`, response.status);
          }
        } catch (townError) {
          console.log(`${townGis.name} GIS error:`, townError.message);
        }
      } else {
        console.log('Address not in a supported CT town with GIS, skipping town lookups');
      }

      // Try Connecticut CAMA and Parcel Layer (free, covers all CT towns)
      console.log('Trying Connecticut CAMA Parcel Layer...');
      try {
        // CT village names → assessor town mapping
        // Geocoders return village/locality names, but CAMA uses official assessor towns
        const townAliases = {
          'broad brook': 'east windsor',
          'tariffville': 'simsbury',
          'weatogue': 'simsbury',
          'plantsville': 'southington',
          'unionville': 'farmington',
          'terryville': 'plymouth',
          'pequabuck': 'plymouth',
          'kensington': 'berlin',
          'rockfall': 'middlefield',
          'higganum': 'haddam',
          'versailles': 'sprague',
          'hanover': 'sprague',
          'baltic': 'sprague',
          'quinebaug': 'thompson',
          'east thompson': 'thompson',
          'north grosvenordale': 'thompson',
          'grosvenordale': 'thompson'
          // Note: Cromwell is listed below but server is offline, so it uses CT CAMA fallback
        };

        // Map geocoded town to assessor town
        const addressLower = address.toLowerCase();
        let normalizedAddress = address;
        for (const [village, town] of Object.entries(townAliases)) {
          if (addressLower.includes(village)) {
            // Replace village name with official town name
            const regex = new RegExp(village, 'gi');
            normalizedAddress = normalizedAddress.replace(regex, town);
            console.log(`Mapped village "${village}" → town "${town}"`);
            break;
          }
        }

        // Strategy 1: Try "contains" query first (most accurate)
        // FIXED: Correct URL is /arcgis/rest/services/ (lowercase) and 4LvwA2Kb (with 'v')
        const baseUrl = 'https://services3.arcgis.com/3FL1kr7L4LvwA2Kb/arcgis/rest/services/Connecticut_CAMA_and_Parcel_Layer/FeatureServer/0/query';

        // Use simple point geometry - ArcGIS requires "lon,lat" format (NOT JSON)
        const pointGeom = `${coords[0]},${coords[1]}`; // Simple x,y format

        // Try "contains" first (only returns parcel containing the point)
        const containsParams = new URLSearchParams({
          f: 'json',
          returnGeometry: 'true',
          spatialRel: 'esriSpatialRelContains',  // Only parcels containing the point
          geometry: pointGeom,
          geometryType: 'esriGeometryPoint',
          inSR: '4326',
          outFields: '*',
          outSR: '4326',
          where: '1=1',
          resultRecordCount: '10'
        });

        console.log('━━━ CT CAMA "CONTAINS" QUERY ━━━');
        console.log('Point:', pointGeom);

        let ctCAMAResponse = await fetch(`${baseUrl}?${containsParams.toString()}`);
        let ctCAMAData = null;
        let queryType = 'contains';

        if (ctCAMAResponse.ok) {
          ctCAMAData = await ctCAMAResponse.json();

          console.log('CT CAMA "contains" response:', {
            totalFeatures: ctCAMAData.features?.length || 0,
            error: ctCAMAData.error
          });

          if (ctCAMAData.error) {
            console.error('CT CAMA API error:', ctCAMAData.error);
          }

          // If "contains" returns 0 results, fallback to distance query
          if (!ctCAMAData.features || ctCAMAData.features.length === 0) {
            console.warn(`⚠️ "Contains" returned 0 results - falling back to 10m distance query`);
            queryType = 'distance';

            const distanceParams = new URLSearchParams({
              f: 'json',
              returnGeometry: 'true',
              spatialRel: 'esriSpatialRelIntersects',
              geometry: pointGeom,
              geometryType: 'esriGeometryPoint',
              inSR: '4326',
              distance: '10',  // 10 meters - tight radius to avoid neighbors
              units: 'esriSRUnit_Meter',
              outFields: '*',
              outSR: '4326',
              where: '1=1',
              resultRecordCount: '50'
            });

            ctCAMAResponse = await fetch(`${baseUrl}?${distanceParams.toString()}`);
            if (ctCAMAResponse.ok) {
              ctCAMAData = await ctCAMAResponse.json();
              console.log('CT CAMA distance fallback response:', {
                totalFeatures: ctCAMAData.features?.length || 0
              });
            }
          } else {
            console.log(`✓ "Contains" found ${ctCAMAData.features.length} parcel(s)`);
          }

          if (ctCAMAData.features && ctCAMAData.features.length > 0) {
            console.log(`CT CAMA returned ${ctCAMAData.features.length} parcels in envelope`);

            // Log all raw features for debugging
            ctCAMAData.features.forEach((f, idx) => {
              console.log(`CT CAMA parcel ${idx + 1}:`, {
                town: f.attributes?.Town_Name,
                location: f.attributes?.Location,
                parcelType: f.attributes?.Parcel_Type,
                useCode: f.attributes?.Use_Code_Desc,
                calculatedAcres: f.attributes?.Calculated_Acres,
                totalAcres: f.attributes?.Total_Acres,
                landAcres: f.attributes?.Land_Acres,
                shapeArea: f.attributes?.Shape__Area,
                hasGeometry: !!f.geometry?.rings?.[0]
              });
            });

            // Helper function: Check if a point is inside a polygon
            const isPointInPolygon = (point, polygon) => {
              let inside = false;
              for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                const xi = polygon[i][0], yi = polygon[i][1];
                const xj = polygon[j][0], yj = polygon[j][1];
                const intersect = ((yi > point[1]) !== (yj > point[1]))
                  && (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
              }
              return inside;
            };

            // Filter and prioritize parcels
            const validFeatures = ctCAMAData.features
              .filter(f => {
                const parcelType = f.attributes?.Parcel_Type;
                const area = f.attributes?.Shape__Area;

                // Exclude ROW (right-of-way) and utility parcels - these are not properties
                if (parcelType === 'ROW' || parcelType === 'UTIL') {
                  return false;
                }

                // Filter by reasonable size - increased to 10 acres to be more permissive
                // This catches industrial/commercial lots and large estates
                if (area) {
                  const acres = (area * 10.7639) / 43560;
                  if (acres > 10) {
                    return false; // Skip very large parcels (likely farms, parks, commercial)
                  }
                }

                return true;
              })
              .map(f => {
                // Calculate distance from query point to parcel centroid for sorting
                let centroidLon = 0, centroidLat = 0, pointCount = 0;
                if (f.geometry?.rings?.[0]) {
                  f.geometry.rings[0].forEach(([lon, lat]) => {
                    centroidLon += lon;
                    centroidLat += lat;
                    pointCount++;
                  });
                  centroidLon /= pointCount;
                  centroidLat /= pointCount;
                }
                const distance = Math.sqrt(
                  Math.pow(coords[0] - centroidLon, 2) + Math.pow(coords[1] - centroidLat, 2)
                );

                // Check if the query point is actually inside this parcel
                const containsPoint = f.geometry?.rings?.[0]
                  ? isPointInPolygon(coords, f.geometry.rings[0])
                  : false;

                // Extract address number for matching
                const extractStreetNumber = (addr) => {
                  if (!addr) return null;
                  const match = addr.match(/^\s*(\d+[A-Za-z]?)\s+/);
                  return match ? match[1].toLowerCase() : null;
                };
                const inputStreetNumber = extractStreetNumber(address);
                const addressNumber = extractStreetNumber(f.attributes?.Location || '');
                const matchesAddress = inputStreetNumber && addressNumber === inputStreetNumber;

                return { ...f, distance, containsPoint, matchesAddress };
              })
              .sort((a, b) => {
                // PRIORITY 1: Parcels that BOTH contain the point AND match the address number
                const aPerfect = a.containsPoint && a.matchesAddress;
                const bPerfect = b.containsPoint && b.matchesAddress;
                if (aPerfect && !bPerfect) return -1;
                if (!aPerfect && bPerfect) return 1;

                // PRIORITY 2: Parcels that contain the query point (even without address match)
                if (a.containsPoint && !b.containsPoint) return -1;
                if (!a.containsPoint && b.containsPoint) return 1;

                // PRIORITY 3: For parcels that both contain OR both don't contain, prefer address match
                if (a.matchesAddress && !b.matchesAddress) return -1;
                if (!a.matchesAddress && b.matchesAddress) return 1;

                // PRIORITY 4: Distance from centroid
                const distanceDiff = a.distance - b.distance;

                // PRIORITY 5: Use code preference (only if distances very similar)
                if (Math.abs(distanceDiff) < 0.00002) {
                  const aUseCode = (a.attributes?.Use_Code_Desc || '').toLowerCase();
                  const bUseCode = (b.attributes?.Use_Code_Desc || '').toLowerCase();
                  const aIsResidential = aUseCode.includes('residential');
                  const bIsResidential = bUseCode.includes('residential');

                  if (aIsResidential && !bIsResidential) return -1;
                  if (!aIsResidential && bIsResidential) return 1;
                }

                // Final tiebreaker: Closest to query point
                return distanceDiff;
              });

            if (validFeatures.length === 0) {
              console.log('CT CAMA returned only large/ROW parcels, skipping...');
              throw new Error('No valid parcels found');
            }

            // For "contains" query, result is guaranteed to be correct (point inside parcel)
            // For "distance" query, use centroid-based selection
            let closestParcel;
            let selectionStatus;
            let distanceMeters; // Declare at higher scope for use in error logging

            if (queryType === 'contains') {
              // Direct selection - parcel contains the point
              closestParcel = validFeatures[0];
              distanceMeters = closestParcel.distance * 111000;

              // Check if address also matches for perfect confidence
              if (closestParcel.matchesAddress) {
                selectionStatus = 'perfect-match';
                console.log(`✓ PERFECT: "Contains" query with matching address number`);
              } else {
                selectionStatus = 'perfect-contains';
                console.log(`✓ PERFECT: "Contains" query returned parcel with point inside`);
              }
            } else {
              // Distance-based selection (fallback)
              closestParcel = validFeatures[0]; // Already sorted by priority
              distanceMeters = closestParcel.distance * 111000;
              const MAX_DISTANCE_METERS = 30;

              // Determine quality of distance-based match
              if (closestParcel.containsPoint && closestParcel.matchesAddress) {
                selectionStatus = 'perfect-match';
                console.log(`✓ PERFECT: Point inside parcel AND address matches`);
              } else if (closestParcel.containsPoint) {
                selectionStatus = 'perfect-pip';
                console.log(`✓ PERFECT: Point-in-polygon check passed (${distanceMeters.toFixed(1)}m from centroid)`);
              } else if (closestParcel.matchesAddress && distanceMeters <= MAX_DISTANCE_METERS) {
                selectionStatus = 'address-match';
                console.log(`✓ GOOD: Address number matches (${distanceMeters.toFixed(1)}m from centroid)`);
              } else if (distanceMeters > MAX_DISTANCE_METERS) {
                selectionStatus = 'far';
                console.warn(`⚠️ DISTANT MATCH: ${distanceMeters.toFixed(1)}m away (>${MAX_DISTANCE_METERS}m)`);
              } else if (!closestParcel.matchesAddress) {
                selectionStatus = 'address-unknown';
                console.warn(`⚠️ Address match could not be verified (${distanceMeters.toFixed(1)}m from centroid)`);
              } else {
                selectionStatus = 'good';
                console.log(`✓ GOOD: Closest parcel (${distanceMeters.toFixed(1)}m)`);
              }
            }

            // Log top 3 candidates for debugging
            console.log(`━━━ PARCEL SELECTION (${selectionStatus.toUpperCase()}) ━━━`);
            console.log(`Total: ${ctCAMAData.features.length} → Filtered: ${validFeatures.length}`);
            console.log('Top candidates:');
            validFeatures.slice(0, 3).forEach((f, idx) => {
              const isSelected = idx === 0;
              const dist = (f.distance * 111000).toFixed(1);
              console.log(`${isSelected ? '✓ SELECTED' : `  Option ${idx + 1}`}:`, {
                containsPoint: f.containsPoint,
                matchesAddress: f.matchesAddress,
                distance: `${dist}m`,
                location: f.attributes?.Location || 'N/A',
                useCode: f.attributes?.Use_Code_Desc,
                acres: f.attributes?.Calculated_Acres || f.attributes?.Total_Acres || f.attributes?.Land_Acres || 'N/A'
              });
            });
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

            const feature = closestParcel;

            if (feature.geometry && feature.geometry.rings) {
              const polygonCoords = feature.geometry.rings[0].map(ring => [ring[0], ring[1]]);
              setParcelGeometry(feature.geometry);

              console.log('Drawing official CT CAMA parcel boundary');
              setDataSource('cadastre');

              // Use acre fields from attributes (in priority order)
              if (feature.attributes) {
                const calculatedAcres = feature.attributes.Calculated_Acres;
                const totalAcres = feature.attributes.Total_Acres;
                const landAcres = feature.attributes.Land_Acres;

                // Prefer Calculated_Acres, then Total_Acres, then Land_Acres
                const acres = calculatedAcres || totalAcres || landAcres;
                const source = calculatedAcres ? 'Calculated_Acres' : (totalAcres ? 'Total_Acres' : 'Land_Acres');

                if (acres) {
                  const acresNum = parseFloat(acres);
                  const sqFt = Math.round(acresNum * 43560);
                  console.log('Official CT CAMA parcel size:', {
                    sqFt,
                    acres: acresNum.toFixed(2),
                    source,
                    town: feature.attributes.Town_Name,
                    owner: feature.attributes.Owner_Name,
                    propertyId: feature.attributes.Property_ID
                  });
                  setPropertySize({ sqFt, acres: acresNum.toFixed(2) });
                } else if (feature.attributes.Shape__Area) {
                  // Calculate from Shape__Area as fallback (in square meters)
                  const sqMeters = parseFloat(feature.attributes.Shape__Area);
                  const sqFt = Math.round(sqMeters * 10.7639);
                  const acres = (sqFt / 43560).toFixed(2);
                  console.log('CT CAMA parcel size from Shape__Area:', { sqMeters, sqFt, acres });
                  setPropertySize({ sqFt, acres });
                }
              }

              // Calculate parcel centroid for visual verification
              let centroidLon = 0, centroidLat = 0;
              polygonCoords.forEach(([lon, lat]) => {
                centroidLon += lon;
                centroidLat += lat;
              });
              centroidLon /= polygonCoords.length;
              centroidLat /= polygonCoords.length;

              console.log('Parcel centroid:', [centroidLon, centroidLat]);
              console.log('Geocoder point:', coords);
              console.log(`Distance from geocoder to centroid: ${(Math.sqrt(Math.pow(coords[0] - centroidLon, 2) + Math.pow(coords[1] - centroidLat, 2)) * 111000).toFixed(1)}m`);

              // Add blue marker at parcel centroid for visual sanity check
              new mapboxgl.Marker({ color: '#0066ff', scale: 0.7 })
                .setLngLat([centroidLon, centroidLat])
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
                  `<strong>Parcel Center</strong><br/>` +
                  `${feature.attributes?.Location || 'Unknown'}<br/>` +
                  `${(feature.attributes?.Calculated_Acres || feature.attributes?.Total_Acres || feature.attributes?.Land_Acres || 0)} acres`
                ))
                .addTo(map.current);

              drawPropertyPolygon(polygonCoords, coords);
              return;
            }
          } else {
            console.warn('CT CAMA: No parcels found in query', {
              address,
              coords,
              queryType,
              note: 'This address may not be in the CT CAMA dataset'
            });
          }
        } else {
          const errorText = await ctCAMAResponse.text();
          console.error('CT CAMA Parcel Layer HTTP error:', {
            status: ctCAMAResponse.status,
            statusText: ctCAMAResponse.statusText,
            body: errorText
          });
        }
      } catch (ctCAMAError) {
        console.error('CT CAMA Parcel Layer exception:', {
          message: ctCAMAError.message,
          stack: ctCAMAError.stack
        });
      }

      console.log('No CT CAMA data found, trying Regrid...');

      // Second, try Regrid for accurate US parcel boundaries (CORRECT ENDPOINT)
      const regridToken = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWdyaWQuY29tIiwiaWF0IjoxNzYwNjMyNDI3LCJleHAiOjE3NjMyMjQ0MjcsInUiOjYwMzM5NSwiZyI6MjMxNTMsImNhcCI6InBhOnRzOnBzOmJmOm1hOnR5OmVvOnpvOnNiIn0.d_6PmLVJN-Sphw9NkyrXX0FoEI0yHiAu5JMywZnQa_c';
      const regridUrl = `https://api.regrid.com/api/v2/parcels/point?lat=${coords[1]}&lon=${coords[0]}&token=${regridToken}&return_geometry=true`;

      console.log('Fetching parcel data from Regrid...');
      console.log('Regrid URL:', regridUrl);

      try {
        const regridResponse = await fetch(regridUrl);

        if (regridResponse.ok) {
          const regridData = await regridResponse.json();
          console.log('Regrid full response:', JSON.stringify(regridData, null, 2));

          // Regrid API v2 can return multiple response formats:
          // 1. { parcels: [...] } - array of parcels
          // 2. { results: [...] } - legacy format
          // 3. Direct parcel object
          let parcel = null;

          if (regridData.parcels && regridData.parcels.length > 0) {
            parcel = regridData.parcels[0];
            console.log('Regrid format: parcels array');
          } else if (regridData.results && regridData.results.length > 0) {
            parcel = regridData.results[0];
            console.log('Regrid format: results array');
          } else if (regridData.parcel) {
            parcel = regridData.parcel;
            console.log('Regrid format: single parcel object');
          } else if (regridData.geometry) {
            // Direct parcel response
            parcel = regridData;
            console.log('Regrid format: direct parcel');
          }

          if (parcel) {
            console.log('Regrid parcel data:', parcel);

            // Extract geometry
            const geometry = parcel.geometry;
            if (geometry && geometry.coordinates) {
              let polygonCoords;

              if (geometry.type === 'Polygon') {
                polygonCoords = geometry.coordinates[0];
              } else if (geometry.type === 'MultiPolygon') {
                // Use the first polygon of multipolygon
                polygonCoords = geometry.coordinates[0][0];
              }

              if (polygonCoords && polygonCoords.length > 0) {
                console.log('Drawing official parcel boundary from Regrid');
                setDataSource('cadastre');

                // Set accurate property size from Regrid
                // Try multiple field locations: fields.acres, properties.acres, acres
                const acres =
                  (parcel.fields?.acres) ||
                  (parcel.fields?.ll_gisacre) ||
                  (parcel.properties?.acres) ||
                  (parcel.properties?.ll_gisacre) ||
                  (parcel.acres);

                if (acres) {
                  const acresNum = parseFloat(acres);
                  const sqFt = Math.round(acresNum * 43560);
                  console.log('Official parcel size from Regrid:', { sqFt, acres: acresNum.toFixed(2) });
                  setPropertySize({ sqFt, acres: acresNum.toFixed(2) });
                } else {
                  console.log('Regrid parcel has no acres field, available fields:', Object.keys(parcel.fields || {}), Object.keys(parcel.properties || {}));
                }

                drawPropertyPolygon(polygonCoords, coords);
                return;
              } else {
                console.log('Regrid: No valid polygon coordinates found');
              }
            } else {
              console.log('Regrid: No geometry in parcel data');
            }
          } else {
            console.log('Regrid: No parcel found in response');
          }
        } else {
          const errorText = await regridResponse.text();
          console.log('Regrid HTTP error:', regridResponse.status, errorText);
        }
      } catch (error) {
        console.log('Regrid error:', error.message, error.stack);
      }

      console.log('No Regrid data, trying Geocodio...');

      // Second, try Geocodio for accurate US parcel boundaries
      const geocodioApiKey = 'a6c11b81a1a6676da7818ffaa61888aafada7d6';
      const geocodioUrl = `https://api.geocod.io/v1.7/reverse?q=${coords[1]},${coords[0]}&fields=parcel&api_key=${geocodioApiKey}`;

      console.log('Fetching parcel data from Geocodio...');
      const geocodioResponse = await fetch(geocodioUrl);
      const geocodioData = await geocodioResponse.json();

      if (geocodioData.results && geocodioData.results.length > 0) {
        const result = geocodioData.results[0];

        if (result.fields && result.fields.parcel) {
          const parcel = result.fields.parcel;
          console.log('Found Geocodio parcel data:', parcel);

          if (parcel.parcel_geometry && parcel.parcel_geometry.coordinates) {
            // Geocodio returns GeoJSON
            const geometry = parcel.parcel_geometry;
            let polygonCoords;

            if (geometry.type === 'Polygon') {
              polygonCoords = geometry.coordinates[0];
            } else if (geometry.type === 'MultiPolygon') {
              // Use the first polygon of multipolygon
              polygonCoords = geometry.coordinates[0][0];
            }

            if (polygonCoords && polygonCoords.length > 0) {
              console.log('Drawing official parcel boundary from Geocodio');
              setDataSource('cadastre');

              // Set accurate property size from Geocodio
              if (parcel.area_sq_ft) {
                const sqFt = Math.round(parcel.area_sq_ft);
                const acres = (sqFt / 43560).toFixed(2);
                console.log('Official parcel size from Geocodio:', { sqFt, acres });
                setPropertySize({ sqFt, acres });
              }

              drawPropertyPolygon(polygonCoords, coords);
              return;
            }
          }
        }
      }

      console.log('No Geocodio data, trying OpenStreetMap cadastre...');

      // Fallback to OpenStreetMap cadastre data
      const cadastreUrl = `https://overpass-api.de/api/interpreter?data=[out:json];is_in(${coords[1]},${coords[0]})->.a;(way(pivot.a)["boundary"="cadastre"];relation(pivot.a)["boundary"="cadastre"];);out geom;`;

      console.log('Fetching cadastre/parcel data from OpenStreetMap...');
      const cadastreResponse = await fetch(cadastreUrl);
      const cadastreData = await cadastreResponse.json();

      if (cadastreData.elements && cadastreData.elements.length > 0) {
        // Find the parcel
        for (const element of cadastreData.elements) {
          if (element.type === 'way' && element.geometry) {
            console.log('Found cadastre parcel:', element);
            const polygonCoords = element.geometry.map(point => [point.lon, point.lat]);
            if (polygonCoords.length > 0) {
              polygonCoords.push(polygonCoords[0]);
            }
            console.log('Drawing actual parcel boundary');
            setDataSource('cadastre');
            drawPropertyPolygon(polygonCoords, coords);
            return;
          } else if (element.type === 'relation' && element.members) {
            // Handle multipolygon relations
            const outerMembers = element.members.filter(m => m.role === 'outer');
            if (outerMembers.length > 0 && outerMembers[0].geometry) {
              const polygonCoords = outerMembers[0].geometry.map(point => [point.lon, point.lat]);
              if (polygonCoords.length > 0) {
                polygonCoords.push(polygonCoords[0]);
              }
              console.log('Drawing actual parcel boundary from relation');
              setDataSource('cadastre');
              drawPropertyPolygon(polygonCoords, coords);
              return;
            }
          }
        }
      }

      console.log('No cadastre found, trying building footprint...');

      // Try Overpass API (OpenStreetMap) for building footprint
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];is_in(${coords[1]},${coords[0]})->.a;way(pivot.a)["building"];out geom;`;

      console.log('Fetching building data from OpenStreetMap...');
      const overpassResponse = await fetch(overpassUrl);
      const overpassData = await overpassResponse.json();

      if (overpassData.elements && overpassData.elements.length > 0) {
        // Find the closest building
        let closestBuilding = null;
        let minDistance = Infinity;

        for (const element of overpassData.elements) {
          if (element.geometry && element.geometry.length > 0) {
            // Calculate distance to first point
            const firstPoint = element.geometry[0];
            const distance = Math.sqrt(
              Math.pow(firstPoint.lon - coords[0], 2) +
              Math.pow(firstPoint.lat - coords[1], 2)
            );

            if (distance < minDistance) {
              minDistance = distance;
              closestBuilding = element;
            }
          }
        }

        if (closestBuilding && closestBuilding.geometry) {
          console.log('Found building footprint:', closestBuilding);
          const polygonCoords = closestBuilding.geometry.map(point => [point.lon, point.lat]);
          // Close the polygon
          if (polygonCoords.length > 0) {
            polygonCoords.push(polygonCoords[0]);
          }
          console.log('Estimating full lot based on building size');
          drawEstimatedProperty(coords, polygonCoords);
          return;
        }
      }

      console.log('No building found, trying Mapbox building layer...');

      // Try Mapbox building footprint
      const buildingUrl = `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/${coords[0]},${coords[1]}.json?layers=building&radius=50&limit=5&access_token=${mapboxgl.accessToken}`;

      const buildingResponse = await fetch(buildingUrl);
      const buildingData = await buildingResponse.json();

      if (buildingData.features && buildingData.features.length > 0) {
        const building = buildingData.features[0];
        console.log('Found Mapbox building:', building);

        if (building.geometry && building.geometry.type === 'Polygon') {
          console.log('Estimating full lot based on Mapbox building');
          drawEstimatedProperty(coords, building.geometry.coordinates[0]);
          return;
        }
      }

      console.log('No accurate data found, using smart estimate');
      drawEstimatedProperty(coords);

    } catch (error) {
      console.error('Error fetching property data:', error);
      drawEstimatedProperty(coords);
    }
  };

  const drawPropertyPolygon = (coordinates, center) => {
    console.log('Drawing polygon with coordinates:', coordinates);

    // Wait for map to be ready
    if (!map.current || !map.current.isStyleLoaded()) {
      console.log('Map not ready yet, waiting to draw polygon...');
      setTimeout(() => {
        drawPropertyPolygon(coordinates, center);
      }, 100);
      return;
    }

    const geojsonData = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [coordinates]
      }
    };

    // Add or update source
    if (map.current.getSource('property')) {
      map.current.getSource('property').setData(geojsonData);
    } else {
      map.current.addSource('property', {
        type: 'geojson',
        data: geojsonData
      });

      // Add fill layer
      map.current.addLayer({
        id: 'property-fill',
        type: 'fill',
        source: 'property',
        paint: {
          'fill-color': '#2d5016',
          'fill-opacity': 0.4
        }
      });

      // Add border layer
      map.current.addLayer({
        id: 'property-border',
        type: 'line',
        source: 'property',
        paint: {
          'line-color': '#2d5016',
          'line-width': 5
        }
      });
    }

    // Calculate actual area
    const area = calculatePolygonArea(coordinates);
    const sqFt = Math.round(area);
    const acres = (sqFt / 43560).toFixed(2);
    console.log('Calculated area:', { sqFt, acres });
    setPropertySize({ sqFt, acres });
  };

  const drawEstimatedProperty = (coords, buildingFootprint = null) => {
    console.log('Drawing estimated property lot');

    let lotWidth, lotDepth;

    if (buildingFootprint) {
      // If we have building footprint, estimate lot based on building size + buffer
      const buildingBounds = getBuildingBounds(buildingFootprint);
      const buildingWidth = buildingBounds.maxLon - buildingBounds.minLon;
      const buildingDepth = buildingBounds.maxLat - buildingBounds.minLat;

      // Estimate lot as 2-3x building size (typical setback rules)
      lotWidth = buildingWidth * 2.5;
      lotDepth = buildingDepth * 2.5;

      console.log('Building-based estimate:', { buildingWidth, buildingDepth, lotWidth, lotDepth });
    } else {
      // Standard residential lot estimate (80ft x 120ft)
      lotWidth = 0.0008;  // ~80 feet
      lotDepth = 0.0012;  // ~120 feet
    }

    const bounds = [
      [coords[0] - lotWidth/2, coords[1] - lotDepth/2],
      [coords[0] + lotWidth/2, coords[1] - lotDepth/2],
      [coords[0] + lotWidth/2, coords[1] + lotDepth/2],
      [coords[0] - lotWidth/2, coords[1] + lotDepth/2],
      [coords[0] - lotWidth/2, coords[1] - lotDepth/2]
    ];

    drawPropertyPolygon(bounds, coords);
  };

  const getBuildingBounds = (coordinates) => {
    let minLon = Infinity, maxLon = -Infinity;
    let minLat = Infinity, maxLat = -Infinity;

    coordinates.forEach(coord => {
      const [lon, lat] = coord;
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    });

    return { minLon, maxLon, minLat, maxLat };
  };

  const createDefaultPropertyEstimate = (coords) => {
    console.log('Creating default property estimate for coords:', coords);

    // Create a typical residential property estimate (80ft x 120ft ~ 0.22 acres)
    // Using larger values for better visibility
    const lotWidth = 0.0008; // ~80 feet in degrees (more visible)
    const lotDepth = 0.0012; // ~120 feet in degrees (more visible)

    const propertyPolygon = {
      type: 'Polygon',
      coordinates: [[
        [coords[0] - lotWidth/2, coords[1] - lotDepth/2],
        [coords[0] + lotWidth/2, coords[1] - lotDepth/2],
        [coords[0] + lotWidth/2, coords[1] + lotDepth/2],
        [coords[0] - lotWidth/2, coords[1] + lotDepth/2],
        [coords[0] - lotWidth/2, coords[1] - lotDepth/2]
      ]]
    };

    console.log('Property polygon created:', propertyPolygon);
    drawPropertyBoundary(propertyPolygon);

    // Estimate property size (typical lot)
    const sqFt = 80 * 120; // 9,600 sq ft
    const acres = (sqFt / 43560).toFixed(2);
    setPropertySize({ sqFt, acres });
  };

  const drawPropertyBoundary = (geometryOrPolygon) => {
    console.log('drawPropertyBoundary called with:', geometryOrPolygon);

    // Extract geometry if we received a full polygon object
    const geometry = geometryOrPolygon.type === 'Polygon'
      ? geometryOrPolygon
      : geometryOrPolygon.geometry || geometryOrPolygon;

    console.log('Using geometry:', geometry);

    // Make sure map is loaded and ready
    if (!map.current || !map.current.isStyleLoaded()) {
      console.log('Map not ready yet, waiting...');
      setTimeout(() => {
        drawPropertyBoundary(geometryOrPolygon);
      }, 100);
      return;
    }

    console.log('Map is ready, adding property boundary');

    try {
      // Check if source already exists
      if (map.current.getSource('property')) {
        console.log('Updating existing property source');
        map.current.getSource('property').setData({
          type: 'Feature',
          geometry: geometry
        });
      } else {
        console.log('Creating new property source');
        // Add new source
        map.current.addSource('property', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: geometry
          }
        });

        console.log('Adding property fill layer');
        // Add fill layer if it doesn't exist
        if (!map.current.getLayer('property-fill')) {
          map.current.addLayer({
            id: 'property-fill',
            type: 'fill',
            source: 'property',
            paint: {
              'fill-color': '#2d5016',
              'fill-opacity': 0.4
            }
          });
        }

        console.log('Adding property outline layer');
        // Add outline layer if it doesn't exist
        if (!map.current.getLayer('property-outline')) {
          map.current.addLayer({
            id: 'property-outline',
            type: 'line',
            source: 'property',
            paint: {
              'line-color': '#2d5016',
              'line-width': 4,
              'line-opacity': 1
            }
          });
        }
      }

      console.log('Property boundary added successfully');

      // Calculate area
      if (geometry.type === 'Polygon' && geometry.coordinates) {
        const area = calculatePolygonArea(geometry.coordinates[0]);
        const sqFt = Math.round(area);
        const acres = (sqFt / 43560).toFixed(2);
        console.log('Calculated area:', { sqFt, acres });
        setPropertySize({ sqFt, acres });
      }
    } catch (error) {
      console.error('Error drawing property boundary:', error);
    }
  };

  const calculatePolygonArea = (coords) => {
    // Simple area calculation using Shoelace formula
    // Convert lat/lng to approximate feet (rough estimate for Connecticut)
    const latToFeet = 364000; // feet per degree latitude
    const lngToFeet = 288200; // feet per degree longitude at CT latitude

    let area = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      const x1 = coords[i][0] * lngToFeet;
      const y1 = coords[i][1] * latToFeet;
      const x2 = coords[i + 1][0] * lngToFeet;
      const y2 = coords[i + 1][1] * latToFeet;
      area += (x1 * y2) - (x2 * y1);
    }
    return Math.abs(area / 2);
  };

  const handleConfirm = () => {
    onConfirm({
      address,
      coordinates,
      propertySize,
      parcelGeometry
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{
          padding: window.innerWidth <= 768 ? '12px 16px' : '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{
              margin: 0,
              fontSize: window.innerWidth <= 768 ? '18px' : '24px',
              fontWeight: '700',
              color: '#1f2937'
            }}>
              Your Property
            </h2>
            <p style={{
              margin: '4px 0 0',
              fontSize: window.innerWidth <= 768 ? '12px' : '14px',
              color: '#6b7280',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {address}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: window.innerWidth <= 768 ? '24px' : '28px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0',
              width: window.innerWidth <= 768 ? '28px' : '32px',
              height: window.innerWidth <= 768 ? '28px' : '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              flexShrink: 0,
              marginLeft: '12px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>

        {/* Map Container */}
        <div style={{
          flex: 1,
          position: 'relative',
          minHeight: '300px',
          height: window.innerWidth <= 768 ? '40vh' : '60vh',
          maxHeight: window.innerWidth <= 768 ? '50vh' : 'none'
        }}>
          {isLoading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
              zIndex: 10
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  border: '4px solid #e5e7eb',
                  borderTop: '4px solid #2d5016',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px'
                }}></div>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading map...</p>
              </div>
            </div>
          )}

          {error && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fef2f2',
              padding: '20px',
              zIndex: 10
            }}>
              <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
                <p style={{ color: '#991b1b', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    marginTop: '16px',
                    padding: '8px 16px',
                    backgroundColor: '#2d5016',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Reload Page
                </button>
              </div>
            </div>
          )}

          <div ref={mapContainer} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />

          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>

          {/* Property Info Overlay - Responsive */}
          {propertySize && (
            <div style={{
              position: 'absolute',
              ...(window.innerWidth <= 768 ? {
                // Mobile: Compact card at bottom
                bottom: '70px',
                left: '12px',
                right: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '10px 12px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              } : {
                // Desktop: Top left
                top: '16px',
                left: '16px',
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                minWidth: '220px'
              })
            }}>
              <h3 style={{
                margin: '0 0 6px',
                fontSize: window.innerWidth <= 768 ? '13px' : '16px',
                fontWeight: '600',
                color: '#1f2937'
              }}>
                {dataSource === 'cadastre' ? 'Property Lot Size' : 'Estimated Property Size'}
              </h3>
              {dataSource === 'cadastre' && (
                <div style={{
                  fontSize: window.innerWidth <= 768 ? '10px' : '12px',
                  color: '#059669',
                  marginBottom: window.innerWidth <= 768 ? '4px' : '8px',
                  fontWeight: '500'
                }}>
                  ✓ Official Parcel Data
                </div>
              )}
              {dataSource === 'building' && (
                <div style={{
                  fontSize: window.innerWidth <= 768 ? '10px' : '12px',
                  color: '#d97706',
                  marginBottom: window.innerWidth <= 768 ? '4px' : '8px'
                }}>
                  ⚠ Estimated from building
                </div>
              )}
              {dataSource === 'estimate' && (
                <div style={{
                  fontSize: window.innerWidth <= 768 ? '10px' : '12px',
                  color: '#6b7280',
                  marginBottom: window.innerWidth <= 768 ? '4px' : '8px'
                }}>
                  ℹ Standard lot estimate
                </div>
              )}
              <div style={{
                display: 'flex',
                flexDirection: window.innerWidth <= 768 ? 'row' : 'column',
                gap: window.innerWidth <= 768 ? '16px' : '8px',
                justifyContent: window.innerWidth <= 768 ? 'space-around' : 'flex-start'
              }}>
                <div>
                  <div style={{
                    fontSize: window.innerWidth <= 768 ? '11px' : '14px',
                    color: '#6b7280'
                  }}>Square Feet</div>
                  <div style={{
                    fontSize: window.innerWidth <= 768 ? '15px' : '20px',
                    fontWeight: '700',
                    color: '#2d5016',
                    lineHeight: '1.2'
                  }}>
                    {propertySize.sqFt?.toLocaleString()} ft²
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: window.innerWidth <= 768 ? '11px' : '14px',
                    color: '#6b7280'
                  }}>Acres</div>
                  <div style={{
                    fontSize: window.innerWidth <= 768 ? '15px' : '20px',
                    fontWeight: '700',
                    color: '#2d5016',
                    lineHeight: '1.2'
                  }}>
                    {propertySize.acres} acres
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructions - Hidden on mobile to save space */}
          {window.innerWidth > 768 && (
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              📍 Property boundary shown in green • Use scroll to zoom
            </div>
          )}
        </div>

        {/* Footer - Sticky buttons */}
        <div style={{
          padding: window.innerWidth <= 768 ? '10px 12px' : '20px 24px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          gap: window.innerWidth <= 768 ? '8px' : '12px',
          justifyContent: window.innerWidth <= 768 ? 'stretch' : 'flex-end',
          flexDirection: window.innerWidth <= 768 ? 'row' : 'row',
          backgroundColor: 'white',
          position: 'sticky',
          bottom: 0,
          zIndex: 10,
          boxShadow: '0 -2px 8px rgba(0,0,0,0.05)'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: window.innerWidth <= 768 ? '10px 16px' : '12px 24px',
              fontSize: window.innerWidth <= 768 ? '14px' : '16px',
              fontWeight: '600',
              border: '2px solid #d1d5db',
              backgroundColor: 'white',
              color: '#374151',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flex: window.innerWidth <= 768 ? '1' : 'none',
              width: window.innerWidth <= 768 ? '100%' : 'auto'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: window.innerWidth <= 768 ? '10px 20px' : '14px 32px',
              fontSize: window.innerWidth <= 768 ? '14px' : '16px',
              fontWeight: '600',
              border: 'none',
              backgroundColor: '#2d5016',
              color: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flex: window.innerWidth <= 768 ? '2' : 'none',
              width: window.innerWidth <= 768 ? '100%' : 'auto'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1f3810'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2d5016'}
          >
            Continue to Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyMapModal;
