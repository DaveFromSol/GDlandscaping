# Firebase Setup Guide

## 🔥 Firebase Configuration

To get your website working with Firebase, you need to:

### 1. Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Create a project"
3. Enter project name (e.g., "gd-landscaping")
4. Enable Google Analytics (optional)
5. Create project

### 2. Create Web App
1. In your Firebase project, click "Add app" → Web (</>) 
2. Register app (name: "GD Landscaping Website")
3. Copy the Firebase configuration

### 3. Configure Environment Variables

**Local Development:**
1. Copy `.env.example` to `.env`
2. Replace the values with your Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-from-firebase
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abc123def456
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Vercel Deployment:**
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:
   - `REACT_APP_FIREBASE_API_KEY` = your-api-key
   - `REACT_APP_FIREBASE_AUTH_DOMAIN` = your-project.firebaseapp.com
   - etc... (add all 7 variables)

### 4. Enable Firestore Database
1. In Firebase Console, go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select location closest to your users
5. Click "Done"

### 5. Set Up Firestore Rules (Optional - for security)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to contactSubmissions
    match /contactSubmissions/{document} {
      allow read, write: if true;
    }
  }
}
```

### 6. Test the Setup
1. Run `npm start` locally
2. Go to `/contact` page
3. Fill out the form and submit
4. Go to `/admin` page (password: gdlandscaping2024)
5. Check if submission appears

## 🚀 Admin Access
- **URL**: `https://yoursite.com/admin`
- **Password**: `gdlandscaping2024`

## 📊 Features
- Contact form submissions saved to Firebase
- Real-time admin dashboard
- Mobile-responsive design
- Secure password protection