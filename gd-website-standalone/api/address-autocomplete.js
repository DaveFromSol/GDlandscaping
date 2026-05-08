export default async function handler(req, res) {
  const allowedOrigins = [
    'https://gdlandscapingllc.com',
    'https://www.gdlandscapingllc.com',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002'
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { input } = req.query;
  if (!input || input.length < 3) {
    res.status(200).json({ predictions: [] });
    return;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=address&components=country:us&key=AIzaSyDiFzxddX5tpdulBf8YMVXFekxFUJ2ys-c`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Autocomplete error:', error);
    res.status(500).json({ predictions: [] });
  }
}
