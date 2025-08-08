import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login existing user
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        onLogin(userCredential.user);
      } else {
        // Register new user
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        onLogin(userCredential.user);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Demo login credentials
  const loginAsDemo = (role) => {
    const demoCredentials = {
      admin: { email: 'admin@gdlandscaping.com', password: 'admin123' },
      manager: { email: 'manager@gdlandscaping.com', password: 'manager123' },
      employee: { email: 'employee@gdlandscaping.com', password: 'employee123' }
    };

    const credentials = demoCredentials[role];
    setFormData({
      email: credentials.email,
      password: credentials.password,
      confirmPassword: ''
    });

    // Immediately login with demo user
    const mockUser = {
      email: credentials.email,
      displayName: role === 'admin' ? 'Admin User' : role === 'manager' ? 'Mike Rodriguez' : 'Sarah Johnson'
    };
    onLogin(mockUser);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>GD Landscaping</h1>
          <p>Professional Landscape Solutions</p>
        </div>

        <div className="login-form-container">
          <div className="login-tabs">
            <button 
              className={`tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button 
              className={`tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                minLength="6"
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  minLength="6"
                />
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Register'}
            </button>
          </form>

          <div className="demo-login">
            <p>Demo Login Options:</p>
            <div className="demo-buttons">
              <button 
                onClick={() => loginAsDemo('admin')} 
                className="demo-btn admin"
              >
                Admin Demo
              </button>
              <button 
                onClick={() => loginAsDemo('manager')} 
                className="demo-btn manager"
              >
                Manager Demo
              </button>
              <button 
                onClick={() => loginAsDemo('employee')} 
                className="demo-btn employee"
              >
                Employee Demo
              </button>
            </div>
            <small>Click any demo button to auto-fill credentials</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;