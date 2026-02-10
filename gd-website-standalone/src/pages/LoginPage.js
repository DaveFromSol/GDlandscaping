import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useFirebase } from '../contexts/FirebaseContext';
import {
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import SEOHead from '../components/SEOHead';
import './LoginPage.css';

const LoginPage = () => {
  const { auth, user } = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from || '/account';
      // If coming from quote page, preserve the state
      if (from.pathname === '/quote' && from.state) {
        navigate('/quote', { state: from.state, replace: true });
      } else {
        navigate(from.pathname || '/account', { replace: true });
      }
    }
  }, [user, navigate, location]);

  // Show message if redirected from quote page
  useEffect(() => {
    if (location.state?.message) {
      setLoginMessage(location.state.message);
    }
  }, [location]);

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const from = location.state?.from || '/account';
      // If coming from quote page, preserve the state
      if (from.pathname === '/quote' && from.state) {
        navigate('/quote', { state: from.state, replace: true });
      } else {
        navigate(from.pathname || '/account', { replace: true });
      }
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  // Apple Sign In
  const handleAppleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      await signInWithPopup(auth, provider);
      const from = location.state?.from || '/account';
      // If coming from quote page, preserve the state
      if (from.pathname === '/quote' && from.state) {
        navigate('/quote', { state: from.state, replace: true });
      } else {
        navigate(from.pathname || '/account', { replace: true });
      }
    } catch (err) {
      console.error('Apple sign-in error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Sign Up
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Optionally update profile with name
      const from = location.state?.from || '/account';
      // If coming from quote page, preserve the state
      if (from.pathname === '/quote' && from.state) {
        navigate('/quote', { state: from.state, replace: true });
      } else {
        navigate(from.pathname || '/account', { replace: true });
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Sign In
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const from = location.state?.from || '/account';
      // If coming from quote page, preserve the state
      if (from.pathname === '/quote' && from.state) {
        navigate('/quote', { state: from.state, replace: true });
      } else {
        navigate(from.pathname || '/account', { replace: true });
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  // Password Reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent! Check your inbox.');
      setTimeout(() => {
        setShowResetPassword(false);
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  // Error message mapper
  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please sign in instead.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed. Please try again.';
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  return (
    <>
      <SEOHead
        title={`${isSignUp ? 'Sign Up' : 'Login'} - G&D Landscaping | Customer Account`}
        description="Sign in to your G&D Landscaping account to manage bookings, view quotes, and track service history. Quick login with Google or Apple."
        keywords="lawn care login, customer account, manage bookings, G&D Landscaping account"
        canonicalUrl="https://www.gdlandscapingllc.com/login"
        robots="noindex, nofollow"
      />

      <div className="login-page">
        <div className="login-container">
          <div className="login-card">
            {/* Logo */}
            <div className="login-logo">
              <img src="/GD.png" alt="G&D Landscaping" />
              <h1>{showResetPassword ? 'Reset Password' : isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
              <p className="login-subtitle">
                {showResetPassword
                  ? 'Enter your email to receive a password reset link'
                  : isSignUp
                    ? 'Sign up to manage your lawn care services'
                    : 'Sign in to your G&D Landscaping account'}
              </p>
            </div>

            {/* Error/Success Messages */}
            {loginMessage && (
              <div className="info-message">
                <span>ℹ️</span> {loginMessage}
              </div>
            )}
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

            {/* Password Reset Form */}
            {showResetPassword ? (
              <form onSubmit={handlePasswordReset} className="login-form">
                <div className="form-group">
                  <label htmlFor="reset-email">Email Address</label>
                  <input
                    type="email"
                    id="reset-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Email'}
                </button>

                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setShowResetPassword(false);
                    setError('');
                    setSuccessMessage('');
                  }}
                >
                  Back to Sign In
                </button>
              </form>
            ) : (
              <>
                {/* Social Sign In Buttons */}
                <div className="social-login">
                  <button
                    onClick={handleGoogleSignIn}
                    className="social-btn google-btn"
                    disabled={loading}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>

                  <button
                    onClick={handleAppleSignIn}
                    className="social-btn apple-btn"
                    disabled={loading}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    Continue with Apple
                  </button>
                </div>

                <div className="divider">
                  <span>or</span>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailSignIn} className="login-form">
                  {isSignUp && (
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength="6"
                    />
                  </div>

                  {isSignUp && (
                    <div className="form-group">
                      <label htmlFor="confirm-password">Confirm Password</label>
                      <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength="6"
                      />
                    </div>
                  )}

                  {!isSignUp && (
                    <div className="form-options">
                      <button
                        type="button"
                        className="link-btn"
                        onClick={() => setShowResetPassword(true)}
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button type="submit" className="login-btn primary" disabled={loading}>
                    {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
                  </button>
                </form>

                {/* Toggle Sign Up / Sign In */}
                <div className="toggle-form">
                  {isSignUp ? (
                    <p>
                      Already have an account?{' '}
                      <button
                        onClick={() => {
                          setIsSignUp(false);
                          setError('');
                        }}
                        className="link-btn"
                      >
                        Sign In
                      </button>
                    </p>
                  ) : (
                    <p>
                      Don't have an account?{' '}
                      <button
                        onClick={() => {
                          setIsSignUp(true);
                          setError('');
                        }}
                        className="link-btn"
                      >
                        Sign Up
                      </button>
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Back to Home */}
            <div className="back-home">
              <Link to="/">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
