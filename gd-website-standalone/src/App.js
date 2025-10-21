import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import { Analytics } from '@vercel/analytics/react';
import { FirebaseProvider } from './contexts/FirebaseContext';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import QuotePage from './pages/QuotePage';
import AdminPage from './pages/AdminPage';
import SnowRemovalPage from './pages/SnowRemovalPage';
import SnowRemovalNewBritainPage from './pages/SnowRemovalNewBritainPage';
import SnowRemovalCromwellPage from './pages/SnowRemovalCromwellPage';
import SnowRemovalMiddletownPage from './pages/SnowRemovalMiddletownPage';
import SnowRemovalRockyHillPage from './pages/SnowRemovalRockyHillPage';
import SnowRemovalNewingtonPage from './pages/SnowRemovalNewingtonPage';
import SnowRemovalBerlinPage from './pages/SnowRemovalBerlinPage';
import LawnCareNewBritainPage from './pages/LawnCareNewBritainPage';
import LawnCareCromwellPage from './pages/LawnCareCromwellPage';
import LawnCareMiddletownPage from './pages/LawnCareMiddletownPage';
import LawnCareRockyHillPage from './pages/LawnCareRockyHillPage';
import LawnCareNewingtonPage from './pages/LawnCareNewingtonPage';
import LawnCareBerlinPage from './pages/LawnCareBerlinPage';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };


  return (
    <>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
      
      <nav className="website-nav">
        <div className="nav-container">
          <div className="logo">
            <Link to="/">
              <img src="/GD.png" alt="GD Landscaping - Professional Landscaping Services Berlin CT" style={{height: '40px', marginRight: '10px'}} />
              <h2>GD Landscaping</h2>
            </Link>
          </div>
          
          {/* Mobile Hamburger Button */}
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <Link 
                to="/"
                className={isActive('/') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
            </li>
            <li>
              <Link 
                to="/services"
                className={isActive('/services') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                🌱 Services
              </Link>
            </li>
            <li>
              <Link 
                to="/portfolio"
                className={isActive('/portfolio') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                📸 Portfolio
              </Link>
            </li>
            <li>
              <Link 
                to="/about"
                className={isActive('/about') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                ℹ️ About
              </Link>
            </li>
            <li>
              <Link
                to="/snow-removal"
                className={isActive('/snow-removal') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                ❄️ Snow Removal
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={isActive('/contact') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                📞 Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

const FallBanner = () => (
  <div className="fall-banner">
    <div className="banner-content">
      <span className="banner-icon">🍂</span>
      <div className="banner-text">
        <strong>Fall Cleanup Special!</strong> Save 20% on fall cleanup services - Book by October 31st!
      </div>
      <Link to="/contact" className="banner-cta">
        Book Now
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <div className="website">
          <FallBanner />
          <Navigation />

          <main className="website-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/quote" element={<QuotePage />} />
              <Route path="/snow-removal" element={<SnowRemovalPage />} />
              <Route path="/snow-removal-new-britain-ct" element={<SnowRemovalNewBritainPage />} />
              <Route path="/snow-removal-cromwell-ct" element={<SnowRemovalCromwellPage />} />
              <Route path="/snow-removal-middletown-ct" element={<SnowRemovalMiddletownPage />} />
              <Route path="/snow-removal-rocky-hill-ct" element={<SnowRemovalRockyHillPage />} />
              <Route path="/snow-removal-newington-ct" element={<SnowRemovalNewingtonPage />} />
              <Route path="/lawn-care-new-britain-ct" element={<LawnCareNewBritainPage />} />
              <Route path="/lawn-care-cromwell-ct" element={<LawnCareCromwellPage />} />
              <Route path="/lawn-care-middletown-ct" element={<LawnCareMiddletownPage />} />
              <Route path="/lawn-care-rocky-hill-ct" element={<LawnCareRockyHillPage />} />
              <Route path="/lawn-care-newington-ct" element={<LawnCareNewingtonPage />} />
              <Route path="/lawn-care-berlin-ct" element={<LawnCareBerlinPage />} />
              <Route path="/snow-removal-berlin-ct" element={<SnowRemovalBerlinPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>

          <footer className="website-footer">
            <div className="container">
              <div className="footer-content">
                <div className="footer-section">
                  <h3>GD Landscaping</h3>
                  <p>Professional landscape solutions for residential and commercial properties.</p>
                </div>
                <div className="footer-section">
                  <h4>Services</h4>
                  <ul>
                    <li>Lawn Maintenance</li>
                    <li>Landscape Design</li>
                    <li>Tree Services</li>
                    <li>Hardscaping</li>
                    <li>Irrigation Systems</li>
                    <li>Outdoor Lighting</li>
                    <li>Pressure Washing</li>
                    <li>Snow Removal</li>
                    <li>Winter Packages</li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h4>Contact</h4>
                  <p>Phone: (860) 526-7583</p>
                  <p>Email: contact@gdlandscaping.com</p>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; 2025 GD Landscaping. All rights reserved.</p>
              </div>
            </div>
          </footer>
          <Analytics />
        </div>
      </Router>
    </FirebaseProvider>
  );
}

export default App;