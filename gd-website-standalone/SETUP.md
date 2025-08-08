# GD Landscaping Website Setup

## Quick Setup Instructions

1. **Navigate to the website directory:**
   ```bash
   cd gd-website-standalone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *Note: This may take a few minutes*

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your Firebase configuration.

4. **Start the development server:**
   ```bash
   npm start
   ```
   The website will open at http://localhost:3001 (or another available port)

5. **Build for production:**
   ```bash
   npm run build
   ```

## What's Included

✅ **Complete React Website** - Professional landscaping business site
✅ **Firebase Integration** - Contact forms save to your database  
✅ **Responsive Design** - Works on mobile and desktop
✅ **SEO Optimized** - Ready for search engines
✅ **5 Main Sections** - Home, Services, Portfolio, About, Contact

## File Structure

```
gd-website-standalone/
├── public/
│   ├── index.html          # Main HTML template
│   └── manifest.json       # Web app manifest
├── src/
│   ├── App.js              # Main website component
│   ├── App.css             # All website styling
│   ├── index.js            # React entry point
│   ├── firebase.js         # Firebase configuration
│   └── services/
│       └── contactService.js # Contact form handling
├── package.json            # Dependencies and scripts
├── README.md              # Detailed documentation
└── .env.example           # Environment variables template
```

## Next Steps After Setup

1. **Customize Content** - Edit `src/App.js` to update:
   - Company information
   - Service descriptions and pricing
   - About us content
   - Contact details

2. **Update Styling** - Modify `src/App.css` to match your brand:
   - Colors and fonts
   - Layout adjustments
   - Add your logo

3. **Add Real Images** - Replace emoji placeholders with actual photos:
   - Hero section background
   - Service images
   - Portfolio photos
   - Team photos

4. **Configure Firebase** - Set up your Firebase project:
   - Enable Firestore database
   - Configure authentication (optional)
   - Set up hosting (optional)

5. **Deploy** - Host your website:
   - Netlify (easiest)
   - Vercel 
   - Firebase Hosting
   - Your own server

## Support

The website is now ready to run independently from your admin dashboard!

This gives you:
- A professional public website for customers
- Separate deployment and hosting
- Independent development and updates
- Contact forms that still integrate with your Firebase backend