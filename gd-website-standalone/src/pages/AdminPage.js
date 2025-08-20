import React from 'react';
import SEOHead from '../components/SEOHead';

const AdminPage = () => {
  return (
    <>
      <SEOHead
        title="Admin Panel - GD Landscaping"
        description="Admin panel temporarily unavailable"
        canonicalUrl="https://gdlandscapingllc.com/admin"
      />
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Admin Panel</h2>
            <p className="text-gray-600 mb-4">The admin panel is temporarily unavailable while we transition from Firebase to our new email system.</p>
            <p className="text-gray-500 text-sm">Form submissions are now being sent directly via email using Mailjet.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Form Status</h3>
            <p className="text-green-600">✅ Working - Emails sent via Mailjet</p>
          </div>
          
          <a 
            href="/" 
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default AdminPage;