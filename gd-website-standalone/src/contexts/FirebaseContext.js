import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXyGHhZ_GkqHDj-7hodHfC9RcQMi9pmIw",
  authDomain: "gd-admin-e57b1.firebaseapp.com",
  databaseURL: "https://gd-admin-e57b1-default-rtdb.firebaseio.com",
  projectId: "gd-admin-e57b1",
  storageBucket: "gd-admin-e57b1.firebasestorage.app",
  messagingSenderId: "384950998335",
  appId: "1:384950998335:web:bc4c4efd94a77c300faf8a",
  measurementId: "G-V7J1L72BB2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Create a secondary app instance for creating employee accounts without affecting current session
const secondaryApp = initializeApp(firebaseConfig, 'secondary');
const secondaryAuth = getAuth(secondaryApp);

// Create Firebase context
const FirebaseContext = createContext({
  auth: null,
  db: null,
  analytics: null,
  secondaryAuth: null,
  user: null,
  loading: true
});

// Firebase provider component
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      console.log('Firebase initialization status:');
      console.log('Auth:', !!auth);
      console.log('Firestore:', !!db);
      console.log('Analytics:', !!analytics);

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed:', user ? 'User logged in' : 'No user');
        setUser(user);
        setLoading(false);
      }, (error) => {
        console.error('Auth state change error:', error);
        setError(error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (initError) {
      console.error('Firebase initialization error:', initError);
      setError(initError);
      setLoading(false);
    }
  }, []);

  const value = {
    auth,
    db,
    analytics,
    secondaryAuth,
    user,
    loading,
    error
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook to use Firebase
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export default FirebaseContext;