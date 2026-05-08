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

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { phone, message } = req.body;

  if (!phone || !message) {
    res.status(400).json({ success: false, error: 'phone and message are required' });
    return;
  }

  try {
    const response = await fetch('https://textbelt.com/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message, key: '8f4c6902e0c6465968e135ad04ce4fda2985ea08a4LUjwbE2BXiBW7sqvipQgrOY' })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('TextBelt error:', error);
    res.status(500).json({ success: false, error: 'Failed to send SMS' });
  }
}
