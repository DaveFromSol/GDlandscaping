export default async function handler(req, res) {
  // Enable CORS for the quote app
  const allowedOrigins = [
    'https://quote-dusky-iota.vercel.app',
    'https://gdlandscapingllc.com',
    'https://www.gdlandscapingllc.com',
    'https://g-dlandscaping-jsm6-q25z1c454-davefromsols-projects.vercel.app'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const bookingData = req.body;
    
    // Check if Mailjet credentials are configured
    if (!process.env.REACT_APP_MAILJET_API_KEY || !process.env.REACT_APP_MAILJET_SECRET_KEY) {
      console.error('Mailjet credentials not configured for booking');
      // For now, just log the booking data and return success
      console.log('Quote booking submission:', JSON.stringify(bookingData, null, 2));
      res.status(200).json({ 
        success: true, 
        message: 'Booking submitted successfully (logged to console)' 
      });
      return;
    }
    
    // Prepare email content for the booking
    const emailContent = `
      New Lawn Care Quote Booking from GD Landscaping Website
      
      Customer Information:
      Name: ${bookingData.customerName || 'Not provided'}
      Email: ${bookingData.customerEmail || 'Not provided'}
      Phone: ${bookingData.customerPhone || 'Not provided'}
      Address: ${bookingData.address || 'Not provided'}
      
      Lawn Details:
      Total Area: ${bookingData.totalSqFt || 'Not specified'} sq ft
      Estimated Price: $${bookingData.estimatedPrice || 'Not calculated'}
      
      Selections: ${bookingData.selections ? JSON.stringify(bookingData.selections, null, 2) : 'None'}
      
      Additional Notes: ${bookingData.notes || 'None'}
      
      Submitted: ${new Date().toLocaleString()}
      Source: Instant Quote Widget
    `;

    // Send email using Mailjet
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${process.env.REACT_APP_MAILJET_API_KEY}:${process.env.REACT_APP_MAILJET_SECRET_KEY}`).toString('base64')}`
      },
      body: JSON.stringify({
        Messages: [{
          From: {
            Email: "noreply@gdlandscaping.com",
            Name: "GD Landscaping Quote Widget"
          },
          To: [{
            Email: "contact@gdlandscapingllc.com",
            Name: "GD Landscaping"
          }],
          Subject: `New Quote Booking - ${bookingData.customerName || 'Customer'} - $${bookingData.estimatedPrice || 'TBD'}`,
          TextPart: emailContent,
          HTMLPart: emailContent.replace(/\n/g, '<br>')
        }]
      })
    });

    if (response.ok) {
      res.status(200).json({ 
        success: true, 
        message: 'Booking submitted successfully' 
      });
    } else {
      const errorData = await response.text();
      console.error('Mailjet API error for booking:', errorData);
      throw new Error(`Mailjet API failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Booking submission error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process booking' 
    });
  }
}