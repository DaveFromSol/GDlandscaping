/**
 * ParcelService - Connecticut Parcel Data Lookup
 * Ported from iOS Swift version for better CT statewide coverage
 *
 * Uses official CT DEEP Connecticut CAMA and Parcel Layer
 * Covers all 169 CT towns with property boundaries and accurate acreage
 *
 * FIXED: Now includes sophisticated filtering to prevent selecting town boundaries
 */

class ParcelService {
  constructor() {
    this.CT_DEEP_URL = 'https://services3.arcgis.com/3FL1kr7L4LvwA2Kb/arcgis/rest/services/Connecticut_CAMA_and_Parcel_Layer/FeatureServer/0/query';
  }

  /**
   * Get parcel data for a specific lat/lng coordinate
   * @param {number} latitude
   * @param {number} longitude
   * @param {string} address - Optional address for validation
   * @returns {Promise<Object>} Parcel data with area, ID, and boundary coordinates
   */
  async getParcelData(latitude, longitude, address = null) {
    try {
      // Try CT DEEP with retries (primary source)
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          console.log(`📍 CT DEEP Attempt ${attempt} for coordinates: (${latitude}, ${longitude})`);
          const parcelData = await this.fetchFromCTDEEP(latitude, longitude, address);
          return parcelData;
        } catch (error) {
          console.warn(`⚠️ CT DEEP attempt ${attempt} failed:`, error.message);
          if (attempt === 2) {
            console.log('❌ CT DEEP failed after 2 attempts, trying fallback...');
          } else {
            // Wait 1 second before retry
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }

      // Fallback: Use estimation
      console.warn('⚠️ Using estimation fallback for parcel data');
      return this.estimateParcelSize(latitude, longitude);
    } catch (error) {
      console.error('Error in getParcelData:', error);
      return this.estimateParcelSize(latitude, longitude);
    }
  }

  /**
   * Fetch parcel data from CT DEEP Connecticut CAMA and Parcel Layer
   * with sophisticated filtering to prevent selecting town boundaries
   */
  async fetchFromCTDEEP(lat, lon, address = null) {
    const params = new URLSearchParams({
      geometry: `${lon},${lat}`,
      geometryType: 'esriGeometryPoint',
      inSR: '4326',
      spatialRel: 'esriSpatialRelIntersects',
      outFields: '*', // Get all fields for filtering
      returnGeometry: 'true',
      outSR: '4326',
      f: 'json',
      resultRecordCount: '50' // Get multiple candidates for filtering
    });

    const url = `${this.CT_DEEP_URL}?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      console.log('CT DEEP: No features found in response');
      throw new Error('No parcel found at this location');
    }

    console.log(`CT DEEP: Found ${data.features.length} potential parcels`);

    // STEP 1: Filter out invalid parcels (ROW, UTIL, oversized)
    const validFeatures = data.features.filter(f => {
      const parcelType = f.attributes?.Parcel_Type;
      const shapeArea = f.attributes?.Shape__Area;

      // Exclude ROW (right-of-way) and utility parcels - these are not properties
      if (parcelType === 'ROW' || parcelType === 'UTIL') {
        console.log(`Filtered out ${parcelType} parcel`);
        return false;
      }

      // Filter by reasonable size - exclude parcels > 10 acres
      // This catches town boundaries, parks, large institutional parcels
      if (shapeArea) {
        // Shape__Area is in square meters for CT DEEP data
        const acres = (shapeArea * 10.7639) / 43560;
        if (acres > 10) {
          console.log(`Filtered out oversized parcel: ${acres.toFixed(2)} acres`);
          return false;
        }
      }

      return true;
    });

    if (validFeatures.length === 0) {
      console.log('CT DEEP: All parcels filtered out (ROW/UTIL or oversized)');
      throw new Error('No valid parcels found (only ROW/UTIL or oversized parcels)');
    }

    console.log(`CT DEEP: ${validFeatures.length} valid parcels after filtering`);

    // STEP 2: Add point-in-polygon verification and distance calculation
    const featuresWithMetrics = validFeatures.map(f => {
      // Calculate if point is inside this parcel
      const containsPoint = f.geometry?.rings?.[0]
        ? this.isPointInPolygon([lon, lat], f.geometry.rings[0])
        : false;

      // Calculate distance from query point to parcel centroid
      let centroidLon = 0, centroidLat = 0, pointCount = 0;
      if (f.geometry?.rings?.[0]) {
        f.geometry.rings[0].forEach(([pLon, pLat]) => {
          centroidLon += pLon;
          centroidLat += pLat;
          pointCount++;
        });
        centroidLon /= pointCount;
        centroidLat /= pointCount;
      }
      const distance = Math.sqrt(
        Math.pow(lon - centroidLon, 2) + Math.pow(lat - centroidLat, 2)
      );

      // Check if address matches (if provided)
      let matchesAddress = false;
      if (address) {
        const inputNumber = this.extractStreetNumber(address);
        const parcelLocation = f.attributes?.Location || '';
        const parcelNumber = this.extractStreetNumber(parcelLocation);
        matchesAddress = inputNumber && parcelNumber && inputNumber === parcelNumber;
      }

      return {
        ...f,
        containsPoint,
        matchesAddress,
        distance,
        distanceMeters: distance * 111000 // Approximate conversion to meters
      };
    });

    // STEP 3: Sort by priority ranking
    const sortedFeatures = featuresWithMetrics.sort((a, b) => {
      // PRIORITY 1: Parcels that BOTH contain the point AND match the address
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

      // PRIORITY 4: Distance from centroid (closest wins)
      const distanceDiff = a.distance - b.distance;

      // PRIORITY 5: Use code preference (residential over commercial/industrial)
      if (Math.abs(distanceDiff) < 0.00002) { // Very close in distance
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

    // STEP 4: Select the best parcel
    const selectedFeature = sortedFeatures[0];

    // Log selection details
    if (selectedFeature.containsPoint && selectedFeature.matchesAddress) {
      console.log('✅ PERFECT MATCH: Point inside parcel AND address matches');
    } else if (selectedFeature.containsPoint) {
      console.log('✅ GOOD MATCH: Point inside parcel');
    } else if (selectedFeature.matchesAddress) {
      console.log('⚠️  ADDRESS MATCH: Address matches but point not in polygon (distance: ' + selectedFeature.distanceMeters.toFixed(1) + 'm)');
    } else {
      console.log('⚠️  CLOSEST MATCH: Using nearest parcel (distance: ' + selectedFeature.distanceMeters.toFixed(1) + 'm)');
    }

    console.log('Selected parcel:', {
      location: selectedFeature.attributes?.Location,
      parcelId: selectedFeature.attributes?.Parcel_ID,
      useCode: selectedFeature.attributes?.Use_Code_Desc,
      containsPoint: selectedFeature.containsPoint,
      matchesAddress: selectedFeature.matchesAddress,
      distanceMeters: selectedFeature.distanceMeters.toFixed(1)
    });

    // STEP 5: Extract parcel data
    let areaAcres;

    if (selectedFeature.attributes.Land_Acres) {
      areaAcres = selectedFeature.attributes.Land_Acres;
      console.log('CT DEEP: Found Land_Acres field:', areaAcres);
    } else if (selectedFeature.attributes.Calculated_Acres) {
      areaAcres = selectedFeature.attributes.Calculated_Acres;
      console.log('CT DEEP: Found Calculated_Acres field:', areaAcres);
    } else if (selectedFeature.attributes.Total_Acres) {
      areaAcres = selectedFeature.attributes.Total_Acres;
      console.log('CT DEEP: Found Total_Acres field:', areaAcres);
    } else if (selectedFeature.attributes.Shape__Area) {
      // Shape__Area is in square meters
      areaAcres = (selectedFeature.attributes.Shape__Area * 10.7639) / 43560;
      console.log('CT DEEP: Calculated from Shape__Area:', areaAcres, 'acres');
    } else {
      // Default to typical CT residential lot
      areaAcres = 0.25;
      console.log('CT DEEP: Using default estimate: 0.25 acres');
    }

    const areaSquareFeet = areaAcres * 43560.0;

    // Parse boundary coordinates from geometry
    let boundaryCoordinates = null;
    if (selectedFeature.geometry && selectedFeature.geometry.rings) {
      boundaryCoordinates = this.parsePolygonRings(selectedFeature.geometry.rings);
      console.log('CT DEEP: Parsed', boundaryCoordinates?.length || 0, 'boundary points');
    }

    return {
      areaAcres,
      areaSquareFeet,
      parcelId: selectedFeature.attributes.Parcel_ID,
      boundaryCoordinates,
      geometry: selectedFeature.geometry,
      selectionQuality: {
        containsPoint: selectedFeature.containsPoint,
        matchesAddress: selectedFeature.matchesAddress,
        distanceMeters: selectedFeature.distanceMeters
      }
    };
  }

  /**
   * Check if a point is inside a polygon using ray casting algorithm
   * @param {Array} point - [lon, lat]
   * @param {Array} polygon - Array of [lon, lat] coordinates
   * @returns {boolean} True if point is inside polygon
   */
  isPointInPolygon(point, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];

      const intersect = ((yi > point[1]) !== (yj > point[1]))
        && (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);

      if (intersect) inside = !inside;
    }
    return inside;
  }

  /**
   * Extract street number from address
   * @param {string} address - Full address string
   * @returns {string|null} Street number (e.g., "123" from "123 Main St")
   */
  extractStreetNumber(address) {
    if (!address) return null;
    const match = address.match(/^\s*(\d+[A-Za-z]?)\s+/);
    return match ? match[1].toLowerCase() : null;
  }

  /**
   * Parse polygon rings from ArcGIS geometry
   * @param {Array} rings - Array of rings (array of coordinate pairs)
   * @returns {Array} Array of [lon, lat] coordinates
   */
  parsePolygonRings(rings) {
    // Get the outer ring (first ring in the array)
    if (!rings || rings.length === 0) {
      return [];
    }

    const outerRing = rings[0];

    // Convert coordinate pairs to [longitude, latitude]
    return outerRing
      .filter(point => point && point.length >= 2)
      .map(point => [point[0], point[1]]);
  }

  /**
   * Estimate parcel size based on typical Connecticut residential lot sizes
   */
  estimateParcelSize(lat, lon) {
    // Average CT residential lot: 0.25 - 0.5 acres
    const estimatedAcres = 0.33; // Conservative estimate
    const estimatedSquareFeet = estimatedAcres * 43560.0;

    return {
      areaAcres: estimatedAcres,
      areaSquareFeet: estimatedSquareFeet,
      parcelId: null,
      boundaryCoordinates: null,
      isEstimate: true
    };
  }

  /**
   * Geocode an address to coordinates (uses Mapbox Geocoding API)
   * @param {string} address
   * @param {string} mapboxToken
   * @returns {Promise<Object>} {latitude, longitude}
   */
  async geocodeAddress(address, mapboxToken) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}&country=us&types=address&proximity=-72.7553,41.6219`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      throw new Error('Address not found');
    }

    const [longitude, latitude] = data.features[0].center;

    return { latitude, longitude };
  }
}

export default ParcelService;
