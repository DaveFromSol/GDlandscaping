// Development proxy for GIS services
// This file is automatically picked up by Create React App's webpack dev server

const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const http = require('http');

module.exports = function(app) {
  // GIS Proxy endpoint - bypasses CORS for town GIS services
  app.use('/api/gis-proxy', async (req, res) => {
    // Enable CORS
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

    try {
      const urlObj = new URL(targetUrl);
      const isAllowed = allowedDomains.some(domain => urlObj.hostname.includes(domain));

      if (!isAllowed) {
        return res.status(403).json({ error: 'Domain not allowed' });
      }
    } catch (error) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
      console.log('Proxying request to:', targetUrl);

      // Use https.get with custom agent to allow legacy SSL
      const urlObj = new URL(targetUrl);
      const isHttps = urlObj.protocol === 'https:';

      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'GD-Landscaping-Website/1.0'
        }
      };

      // For HTTPS, allow legacy renegotiation
      if (isHttps) {
        options.agent = new https.Agent({
          rejectUnauthorized: false,
          secureOptions: require('constants').SSL_OP_LEGACY_SERVER_CONNECT
        });
      }

      const httpModule = isHttps ? https : http;

      httpModule.get(options, (gisRes) => {
        let data = '';

        gisRes.on('data', (chunk) => {
          data += chunk;
        });

        gisRes.on('end', () => {
          if (gisRes.statusCode !== 200) {
            console.error('GIS server error:', gisRes.statusCode, gisRes.statusMessage);
            return res.status(gisRes.statusCode).json({
              error: 'GIS server error',
              status: gisRes.statusCode,
              statusText: gisRes.statusMessage
            });
          }

          try {
            const jsonData = JSON.parse(data);
            console.log('Successfully proxied GIS request');
            return res.status(200).json(jsonData);
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            return res.status(500).json({
              error: 'Failed to parse GIS response',
              message: parseError.message
            });
          }
        });
      }).on('error', (error) => {
        console.error('Proxy error:', error);
        return res.status(500).json({
          error: 'Proxy error',
          message: error.message
        });
      });

    } catch (error) {
      console.error('Proxy error:', error);
      return res.status(500).json({
        error: 'Proxy error',
        message: error.message
      });
    }
  });
};
