import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../contexts/FirebaseContext';
import { signOut, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import SEOHead from '../components/SEOHead';
import './AccountPage.css';

const AccountPage = () => {
  const { auth, user, db } = useFirebase();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  // Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user || !db) return;

      setLoading(true);
      try {
        const bookingsRef = collection(db, 'bookings');
        // Query without orderBy to avoid needing composite index
        const q = query(
          bookingsRef,
          where('email', '==', user.email)
        );
        const querySnapshot = await getDocs(q);
        const bookingsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));

        // Sort client-side by createdAt descending
        bookingsData.sort((a, b) => {
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return b.createdAt - a.createdAt;
        });

        setBookings(bookingsData);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, db]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out');
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Update display name
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }

      // Update email
      if (newEmail !== user.email) {
        await updateEmail(user, newEmail);
      }

      // Update password
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (newPassword.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }
        await updatePassword(user, newPassword);
      }

      setSuccessMessage('Profile updated successfully!');
      setIsEditingProfile(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Profile update error:', err);
      if (err.code === 'auth/requires-recent-login') {
        setError('Please log out and log back in to update sensitive information.');
      } else {
        setError('Failed to update profile. Please try again.');
      }
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'confirmed':
        return '#22c55e';
      case 'completed':
        return '#3b82f6';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  if (!user) return null;

  return (
    <>
      <SEOHead
        title="My Account - GD Landscaping | Manage Bookings & Profile"
        description="Manage your GD Landscaping account, view bookings, and update your profile information."
        keywords="account dashboard, manage bookings, lawn care account"
        canonicalUrl="https://www.gdlandscapingllc.com/account"
        robots="noindex, nofollow"
      />

      <div className="account-page">
        <div className="account-container">
          {/* Header */}
          <div className="account-header">
            <div className="user-info">
              <div className="user-avatar">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} />
                ) : (
                  <div className="avatar-placeholder">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
              </div>
              <div className="user-details">
                <h1>{user.displayName || 'Welcome'}</h1>
                <p>{user.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <span>🚪</span> Log Out
            </button>
          </div>

          {/* Messages */}
          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}
          {successMessage && (
            <div className="success-message">
              <span>✓</span> {successMessage}
            </div>
          )}

          {/* Tabs */}
          <div className="account-tabs">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              My Bookings
              {bookings.length > 0 && <span className="badge">{bookings.length}</span>}
            </button>
            <button
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="account-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="welcome-card">
                  <h2>Welcome to Your Dashboard</h2>
                  <p>Manage your lawn care services, view bookings, and update your profile all in one place.</p>
                </div>

                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">📋</div>
                    <div className="stat-info">
                      <div className="stat-number">{bookings.length}</div>
                      <div className="stat-label">Total Bookings</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-info">
                      <div className="stat-number">
                        {bookings.filter(b => b.status === 'pending').length}
                      </div>
                      <div className="stat-label">Pending</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                      <div className="stat-number">
                        {bookings.filter(b => b.status === 'completed').length}
                      </div>
                      <div className="stat-label">Completed</div>
                    </div>
                  </div>
                </div>

                <div className="quick-actions">
                  <h3>Quick Actions</h3>
                  <div className="action-buttons">
                    <button onClick={() => navigate('/instant-quote')} className="action-btn">
                      <span>⚡</span> Get Instant Quote
                    </button>
                    <button onClick={() => navigate('/contact')} className="action-btn">
                      <span>📞</span> Contact Us
                    </button>
                    <button onClick={() => setActiveTab('bookings')} className="action-btn">
                      <span>📋</span> View All Bookings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="bookings-tab">
                <div className="tab-header">
                  <h2>My Bookings</h2>
                  <button onClick={() => navigate('/instant-quote')} className="new-booking-btn">
                    + New Booking
                  </button>
                </div>

                {loading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading bookings...</p>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <h3>No bookings yet</h3>
                    <p>Get started by requesting an instant quote for your property.</p>
                    <button onClick={() => navigate('/instant-quote')} className="cta-btn">
                      Get Instant Quote
                    </button>
                  </div>
                ) : (
                  <div className="bookings-list">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="booking-card">
                        <div className="booking-header">
                          <div className="booking-title">
                            <h3>{booking.address}</h3>
                            <span
                              className="status-badge"
                              style={{ backgroundColor: getStatusColor(booking.status) }}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <div className="booking-date">
                            {formatDate(booking.createdAt)}
                          </div>
                        </div>

                        <div className="booking-details">
                          <div className="detail-row">
                            <span className="detail-label">Property Size:</span>
                            <span className="detail-value">
                              {booking.propertySize?.acres} acres ({booking.propertySize?.sqFt?.toLocaleString()} sq ft)
                            </span>
                          </div>

                          {booking.preferredDate && (
                            <div className="detail-row">
                              <span className="detail-label">Preferred Date:</span>
                              <span className="detail-value">{booking.preferredDate}</span>
                            </div>
                          )}

                          <div className="detail-row">
                            <span className="detail-label">Services:</span>
                            <div className="services-list">
                              {booking.services?.map((service, idx) => (
                                <div key={idx} className="service-item">
                                  <span>{service.name}</span>
                                  <span className="service-frequency">{service.frequency}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="detail-row total-row">
                            <span className="detail-label">Total:</span>
                            <span className="detail-value total">${booking.totalPrice}</span>
                          </div>

                          {booking.notes && (
                            <div className="booking-notes">
                              <strong>Notes:</strong> {booking.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="profile-tab">
                <div className="profile-header">
                  <h2>Profile Settings</h2>
                  {!isEditingProfile && (
                    <button onClick={() => setIsEditingProfile(true)} className="edit-btn">
                      ✏️ Edit Profile
                    </button>
                  )}
                </div>

                {!isEditingProfile ? (
                  <div className="profile-view">
                    <div className="profile-field">
                      <label>Display Name</label>
                      <p>{user.displayName || 'Not set'}</p>
                    </div>
                    <div className="profile-field">
                      <label>Email</label>
                      <p>{user.email}</p>
                    </div>
                    <div className="profile-field">
                      <label>Sign In Method</label>
                      <p>
                        {user.providerData[0]?.providerId === 'google.com' && '🔵 Google'}
                        {user.providerData[0]?.providerId === 'apple.com' && '🍎 Apple'}
                        {user.providerData[0]?.providerId === 'password' && '📧 Email/Password'}
                      </p>
                    </div>
                    <div className="profile-field">
                      <label>Member Since</label>
                      <p>{formatDate(new Date(user.metadata.creationTime))}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleProfileUpdate} className="profile-form">
                    <div className="form-group">
                      <label>Display Name</label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your name"
                      />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="form-divider">
                      <span>Change Password (Optional)</span>
                    </div>

                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Leave blank to keep current"
                        minLength="6"
                      />
                    </div>

                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="save-btn">
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingProfile(false);
                          setDisplayName(user.displayName || '');
                          setNewEmail(user.email);
                          setNewPassword('');
                          setConfirmPassword('');
                          setError('');
                        }}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
