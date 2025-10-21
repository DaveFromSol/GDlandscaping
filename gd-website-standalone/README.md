# GD Landscaping Website

Professional landscaping business website built with React and Firebase.

## Features

- 🏠 **Professional Homepage** - Hero section with compelling call-to-action
- 💼 **Services Page** - Detailed service offerings with pricing
- 🖼️ **Portfolio Gallery** - Showcase of past landscaping projects
- ℹ️ **About Us** - Company information and statistics
- 📞 **Contact Form** - Firebase-integrated lead capture system

## Services Offered

1. **Lawn Maintenance** - Regular mowing, edging, and lawn care
2. **Landscape Design** - Custom design and installation
3. **Tree Services** - Trimming, removal, and maintenance
4. **Hardscaping** - Patios, walkways, and retaining walls
5. **Irrigation Systems** - Installation and repair
6. **Seasonal Cleanup** - Spring and fall services

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Firebase:**
   - Copy `.env.example` to `.env`
   - Add your Firebase configuration values
   - Ensure Firestore is enabled in your Firebase project

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Firebase Setup

This website uses Firebase for:
- Contact form submissions
- Lead management
- Analytics (optional)

### Required Firestore Collections:
- `contact_inquiries` - Stores customer inquiries from the contact form

### Firestore Rules Example:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contact_inquiries/{document} {
      allow read, write: if request.auth != null;
      allow create: if true; // Allow anonymous contact form submissions
    }
  }
}
```

## Contact Form Integration

The contact form automatically saves inquiries to Firebase with the following data:
- Customer name and contact information
- Service interest
- Project message
- Timestamp and status tracking

## Customization

### Company Information
Update company details in `src/App.js`:
- Business name and tagline
- Contact information
- Service offerings and pricing
- Business hours

### Styling
Modify `src/App.css` to customize:
- Colors and branding
- Layout and spacing
- Typography
- Animations

### Content
Update content in the render functions:
- Hero section messaging
- Service descriptions
- About us content
- Portfolio projects

## Deployment

### Deploy to Netlify:
1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Set environment variables in Netlify dashboard

### Deploy to Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts and set environment variables

### Deploy to Firebase Hosting:
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## Support

For questions about this website template:
- Check the React documentation
- Firebase documentation for backend integration
- Create issues for bugs or feature requests

## License

This project is proprietary software for GD Landscaping.

---

**GD Landscaping** - Professional Landscape Solutions
📞 (555) 123-4567 | ✉️ contact@gdlandscaping.com