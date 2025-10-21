// GIS Proxy API - Bypasses CORS restrictions for town GIS services
// This serverless function acts as a proxy between the frontend and town GIS servers

export default async function handler(req, res) {
  // Enable CORS for your frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Decode the URL
  const targetUrl = decodeURIComponent(url);

  // Security: Only allow specific domains
  const allowedDomains = [
    'gis.hartford.gov',
    'gis.middletownct.gov',
    'gis.glastonburyct.gov',
    'gis.manchesterct.gov',
    'gis.farmington-ct.org',
    'gis.wethersfieldct.gov',
    'gis.cromwellct.com',
    'gis.portlandct.org',
    'gis.easthartfordct.gov',
    'gis.rockyhillct.gov'
  ];

  const urlObj = new URL(targetUrl);
  const isAllowed = allowedDomains.some(domain => urlObj.hostname.includes(domain));

  if (!isAllowed) {
    return res.status(403).json({ error: 'Domain not allowed' });
  }

  try {
    console.log('Proxying request to:', targetUrl);

    // Fetch from the GIS server
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'GD-Landscaping-Website/1.0'
      }
    });

    if (!response.ok) {
      console.error('GIS server error:', response.status, response.statusText);
      return res.status(response.status).json({
        error: 'GIS server error',
        status: response.status,
        statusText: response.statusText
      });
    }

    const data = await response.json();

    console.log('Successfully proxied GIS request');
    return res.status(200).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({
      error: 'Proxy error',
      message: error.message
    });
  }
}
