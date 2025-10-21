# Firebase Setup Guide for GD Landscaping Website

## Current Issue
The contact form is experiencing "NOT_FOUND" errors when trying to submit data to Firebase. This indicates the Firestore database needs proper configuration.

## URGENT: Required Firebase Setup Steps

### 1. Create Firestore Database
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `gd-admin-e57b1`
3. Navigate to **Firestore Database**
4. Click **Create database**
5. Choose **Start in test mode** (for now)
6. Select a location (us-central1 recommended)

### 2. Configure Security Rules
In Firestore Database > Rules, set these rules for testing:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to quotes collection for website form
    match /quotes/{document} {
      allow read, write: if true;
    }

    // Restrict access to other collections (add as needed)
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 3. Test the Setup
After completing the above steps:
1. Go to `http://localhost:3001/contact`
2. Fill out the contact form
3. Submit the form
4. Check Firebase Console > Firestore Database to see if the quote was saved

### 4. Verify in Admin Dashboard
1. Go to `http://localhost:3001/admin`
2. Login with demo credentials
3. Check if website submissions appear with the blue "🌐 Website" badge

## Current Status
- ✅ Firebase app initialization works
- ✅ Firestore connection established
- ✅ Reading from database works (returns 0 documents)
- ❌ Writing to database fails with NOT_FOUND errors

## Error Details
The Firebase test showed these specific errors:
- `5 NOT_FOUND` errors on write operations
- This typically means Firestore database hasn't been created yet
- Security rules may also be blocking writes

## Legacy Authentication Setup (Still Works)

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Add authorized domains if needed (your domain)

### Step 3: Original Database Rules (For Production)

For production mode, use these more secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write quotes
    match /quotes/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Step 4: Get Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" → **Web** → **Add app**
3. Register app with nickname "GD Landscaping Admin"
4. Copy the Firebase config object

## Step 5: Update firebase.js

Replace the config in `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

## Step 6: Add Team Members

1. Go to **Authentication** → **Users**
2. Click **Add user** for each employee
3. Enter their email and password
4. They can now login and collaborate!

## Step 7: Install Dependencies

Make sure you have Firebase installed:

```bash
npm install firebase
```

## Benefits You'll Get:

✅ **Real-time collaboration** - All employees see updates instantly
✅ **User tracking** - See who created/updated each quote
✅ **Secure authentication** - Proper login system
✅ **Data backup** - Stored safely in Google's cloud
✅ **Offline support** - Works even with poor internet
✅ **Mobile ready** - Access from phones/tablets

## Fallback Mode

If Firebase isn't configured, the system automatically falls back to:
- Local storage for data
- Simple email/password login
- Single-user mode

This ensures the admin panel always works, even without Firebase setup.