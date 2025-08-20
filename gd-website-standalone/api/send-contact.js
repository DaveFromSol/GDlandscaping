export default async function handler(req, res) {
  // Enable CORS
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
    const formData = req.body;
    
    // Prepare email content for the contact form
    const emailContent = `
      New Contact Form Submission from GD Landscaping Website
      
      Contact Information:
      Name: ${formData.firstName} ${formData.lastName}
      Email: ${formData.email || 'Not provided'}
      Phone: ${formData.phone}
      Address: ${formData.address || 'Not provided'}
      
      Project Details:
      Services Needed: ${formData.services || 'Not specified'}
      Property Type: ${formData.projectType || 'Not specified'}
      Budget Range: ${formData.budget || 'Not specified'}
      
      Message:
      ${formData.message || 'No additional details provided'}
      
      Newsletter Signup: ${formData.newsletter ? 'Yes' : 'No'}
      
      Submitted: ${new Date().toLocaleString()}
      Source: Website Contact Form
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
            Name: "GD Landscaping Website"
          },
          To: [{
            Email: "contact@gdlandscaping.com",
            Name: "GD Landscaping"
          }],
          Subject: `New Quote Request from ${formData.firstName} ${formData.lastName}`,
          TextPart: emailContent,
          HTMLPart: emailContent.replace(/\n/g, '<br>')
        }]
      })
    });

    if (response.ok) {
      res.status(200).json({ 
        success: true, 
        message: 'Contact form submitted successfully' 
      });
    } else {
      const errorData = await response.text();
      console.error('Mailjet API error:', errorData);
      throw new Error('Failed to send contact email');
    }
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process contact form submission' 
    });
  }
}