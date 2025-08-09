import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import SEOHead from '../components/SEOHead';

const AdminPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple password protection - replace 'admin123' with your preferred password
  const ADMIN_PASSWORD = 'gdlandscaping2024';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
      localStorage.setItem('gdAdminAuth', 'true');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword('');
    localStorage.removeItem('gdAdminAuth');
  };

  const fetchSubmissions = async () => {
    try {
      const submissionsQuery = query(
        collection(db, 'contactSubmissions'),
        orderBy('submissionDate', 'desc')
      );
      const querySnapshot = await getDocs(submissionsQuery);
      const submissionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubmissions(submissionsData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if already authenticated
    const isAuth = localStorage.getItem('gdAdminAuth');
    if (isAuth === 'true') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchSubmissions();
    }
  }, [authenticated]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  if (!authenticated) {
    return (
      <>
        <SEOHead
          title="Admin Access - GD Landscaping"
          description="Admin access for GD Landscaping form submissions"
          canonicalUrl="https://gdlandscaping.com/admin"
        />
        
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h2>
              <p className="text-gray-600">Enter password to view form submissions</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              
              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
              >
                Access Admin Panel
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Form Submissions - GD Landscaping Admin"
        description="View and manage contact form submissions"
        canonicalUrl="https://gdlandscaping.com/admin"
      />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Form Submissions</h1>
              <p className="text-gray-600 mt-2">Manage contact form submissions from your website</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg">No form submissions yet</p>
              <p className="text-gray-400 mt-2">New submissions will appear here</p>
            </div>
          ) : (
            <div className="space-y-6">
              {submissions.map((submission) => (
                <div key={submission.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {submission.firstName} {submission.lastName}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Phone:</span> {submission.phone}</p>
                        <p><span className="font-medium">Email:</span> {submission.email}</p>
                        <p><span className="font-medium">Address:</span> {submission.address}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Services:</span> {submission.services}</p>
                      <p><span className="font-medium">Property Type:</span> {submission.projectType}</p>
                      <p><span className="font-medium">Budget:</span> {submission.budget}</p>
                      <p><span className="font-medium">Newsletter:</span> {submission.newsletter ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  
                  {submission.message && (
                    <div className="mb-4">
                      <p className="font-medium text-gray-900 mb-2">Message:</p>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{submission.message}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">
                      Submitted: {formatDate(submission.submissionDate)}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {submission.source || 'Website'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;