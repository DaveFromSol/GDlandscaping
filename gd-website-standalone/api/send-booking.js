export default async function handler(req, res) {
  // Enable CORS for the quote app
  res.setHeader('Access-Control-Allow-Origin', 'https://quote-dusky-iota.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
            Email: "contact@gdlandscaping.com",
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
      throw new Error('Failed to send booking email');
    }
  } catch (error) {
    console.error('Booking submission error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process booking' 
    });
  }
}