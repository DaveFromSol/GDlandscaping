import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK once (survives hot reloads in serverless)
function getDb() {
  if (!getApps().length) {
    initializeApp({
      credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
    });
  }
  return getFirestore();
}

export default async function handler(req, res) {
  // CORS — Google's servers don't need it but useful for testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Verify shared secret (Google sends it as a query param you configure in the webhook URL)
  const secret = req.headers['x-lsa-secret'] || req.query.secret;
  if (process.env.LSA_WEBHOOK_SECRET && secret !== process.env.LSA_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Guard: Firebase service account must be configured
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    console.error('FIREBASE_SERVICE_ACCOUNT env var not set');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const body = req.body || {};

  try {
    const db = getDb();

    // Deduplicate by LSA lead ID so retries don't create duplicates
    const lsaLeadId = body.leadId || body.id || null;
    if (lsaLeadId) {
      const existing = await db.collection('leads')
        .where('lsaLeadId', '==', lsaLeadId)
        .limit(1)
        .get();
      if (!existing.empty) {
        return res.status(200).json({ status: 'duplicate', lsaLeadId });
      }
    }

    // Map Google LSA fields → our leads schema
    // Google sends different field names depending on lead type (call vs message)
    const services = Array.isArray(body.requestedServices)
      ? body.requestedServices.join(', ')
      : (body.jobType || body.category || body.service || 'Lawn Maintenance');

    const leadData = {
      name:           body.customerName || body.consumer_name || 'LSA Lead',
      phone:          body.customerPhoneNumber || body.phone_number || body.phoneNumber || '',
      email:          body.customerEmail || body.email || '',
      address:        body.address || body.customerAddress || '',
      service:        services,
      notes:          [
                        body.note || body.message || body.consumer_note || '',
                        body.leadType ? `Lead type: ${body.leadType}` : ''
                      ].filter(Boolean).join('\n'),
      source:         'Google LSA',
      status:         'New Lead',
      priority:       'high',
      estimatedValue: 0,
      lsaLeadId:      lsaLeadId,
      lsaRaw:         JSON.stringify(body),   // raw payload for debugging
      createdAt:      Timestamp.now(),
      updatedAt:      Timestamp.now(),
      createdBy:      'google-lsa-webhook',
      contactCount:   0,
    };

    await db.collection('leads').add(leadData);
    console.log('LSA lead created:', lsaLeadId || 'no-id');
    return res.status(200).json({ status: 'ok' });

  } catch (err) {
    console.error('LSA webhook error:', err.message);
    return res.status(500).json({ error: 'Internal error', message: err.message });
  }
}
