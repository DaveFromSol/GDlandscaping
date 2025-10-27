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
import LawnCareBristolPage from './pages/LawnCareBristolPage';
import SnowRemovalBristolPage from './pages/SnowRemovalBristolPage';
import LawnCareWestHartfordPage from './pages/LawnCareWestHartfordPage';
import SnowRemovalWestHartfordPage from './pages/SnowRemovalWestHartfordPage';
import LawnCareHartfordPage from './pages/LawnCareHartfordPage';
import SnowRemovalHartfordPage from './pages/SnowRemovalHartfordPage';
import SnowRemovalFarmingtonPage from './pages/SnowRemovalFarmingtonPage';
import InstantQuotePage from './pages/InstantQuotePage';
import FallCleanupBerlinPage from './pages/FallCleanupBerlinPage';
import FallCleanupBristolPage from './pages/FallCleanupBristolPage';
import FallCleanupCromwellPage from './pages/FallCleanupCromwellPage';
import FallCleanupHartfordPage from './pages/FallCleanupHartfordPage';
import FallCleanupMiddletownPage from './pages/FallCleanupMiddletownPage';
import FallCleanupNewBritainPage from './pages/FallCleanupNewBritainPage';
import FallCleanupNewingtonPage from './pages/FallCleanupNewingtonPage';
import FallCleanupRockyHillPage from './pages/FallCleanupRockyHillPage';
import FallCleanupWestHartfordPage from './pages/FallCleanupWestHartfordPage';
import FallCleanupFarmingtonPage from './pages/FallCleanupFarmingtonPage';
import BushTrimmingBerlinPage from './pages/BushTrimmingBerlinPage';
import BushTrimmingBristolPage from './pages/BushTrimmingBristolPage';
import BushTrimmingCromwellPage from './pages/BushTrimmingCromwellPage';
import BushTrimmingHartfordPage from './pages/BushTrimmingHartfordPage';
import BushTrimmingMiddletownPage from './pages/BushTrimmingMiddletownPage';
import BushTrimmingNewBritainPage from './pages/BushTrimmingNewBritainPage';
import BushTrimmingNewingtonPage from './pages/BushTrimmingNewingtonPage';
import BushTrimmingRockyHillPage from './pages/BushTrimmingRockyHillPage';
import BushTrimmingWestHartfordPage from './pages/BushTrimmingWestHartfordPage';
import BushTrimmingFarmingtonPage from './pages/BushTrimmingFarmingtonPage';
import LawnCareFarmingtonPage from './pages/LawnCareFarmingtonPage';
import BlogPage from './pages/BlogPage';
import BlogSeasonalLawnCarePage from './pages/BlogSeasonalLawnCarePage';
import BlogCoreAerationBenefitsPage from './pages/BlogCoreAerationBenefitsPage';
import BlogFallCleanupChecklistPage from './pages/BlogFallCleanupChecklistPage';
import BlogWinterizeIrrigationPage from './pages/BlogWinterizeIrrigationPage';
import BlogMulchEdgingCurbAppealPage from './pages/BlogMulchEdgingCurbAppealPage';
import BlogDroughtResistantLandscapingPage from './pages/BlogDroughtResistantLandscapingPage';
import BlogSnowReadinessCommercialPage from './pages/BlogSnowReadinessCommercialPage';
import BlogHedgeTrimmingSecretsPage from './pages/BlogHedgeTrimmingSecretsPage';
import BlogHOAGroundsManagementPage from './pages/BlogHOAGroundsManagementPage';
import BlogSustainableLandscapingPage from './pages/BlogSustainableLandscapingPage';

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
                to="/blog"
                className={isActive('/blog') ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                📝 Blog
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
              <Route path="/instant-quote" element={<InstantQuotePage />} />
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
              <Route path="/lawn-care-farmington-ct" element={<LawnCareFarmingtonPage />} />
              <Route path="/lawn-care-berlin-ct" element={<LawnCareBerlinPage />} />
              <Route path="/snow-removal-berlin-ct" element={<SnowRemovalBerlinPage />} />
              <Route path="/lawn-care-bristol-ct" element={<LawnCareBristolPage />} />
              <Route path="/snow-removal-bristol-ct" element={<SnowRemovalBristolPage />} />
              <Route path="/lawn-care-west-hartford-ct" element={<LawnCareWestHartfordPage />} />
              <Route path="/snow-removal-west-hartford-ct" element={<SnowRemovalWestHartfordPage />} />
              <Route path="/lawn-care-hartford-ct" element={<LawnCareHartfordPage />} />
              <Route path="/snow-removal-hartford-ct" element={<SnowRemovalHartfordPage />} />
              <Route path="/snow-removal-farmington-ct" element={<SnowRemovalFarmingtonPage />} />
              <Route path="/fall-cleanup-berlin-ct" element={<FallCleanupBerlinPage />} />
              <Route path="/fall-cleanup-bristol-ct" element={<FallCleanupBristolPage />} />
              <Route path="/fall-cleanup-cromwell-ct" element={<FallCleanupCromwellPage />} />
              <Route path="/fall-cleanup-hartford-ct" element={<FallCleanupHartfordPage />} />
              <Route path="/fall-cleanup-middletown-ct" element={<FallCleanupMiddletownPage />} />
              <Route path="/fall-cleanup-new-britain-ct" element={<FallCleanupNewBritainPage />} />
              <Route path="/fall-cleanup-newington-ct" element={<FallCleanupNewingtonPage />} />
              <Route path="/fall-cleanup-rocky-hill-ct" element={<FallCleanupRockyHillPage />} />
              <Route path="/fall-cleanup-west-hartford-ct" element={<FallCleanupWestHartfordPage />} />
              <Route path="/fall-cleanup-farmington-ct" element={<FallCleanupFarmingtonPage />} />
              <Route path="/bush-trimming-berlin-ct" element={<BushTrimmingBerlinPage />} />
              <Route path="/bush-trimming-bristol-ct" element={<BushTrimmingBristolPage />} />
              <Route path="/bush-trimming-cromwell-ct" element={<BushTrimmingCromwellPage />} />
              <Route path="/bush-trimming-hartford-ct" element={<BushTrimmingHartfordPage />} />
              <Route path="/bush-trimming-middletown-ct" element={<BushTrimmingMiddletownPage />} />
              <Route path="/bush-trimming-new-britain-ct" element={<BushTrimmingNewBritainPage />} />
              <Route path="/bush-trimming-newington-ct" element={<BushTrimmingNewingtonPage />} />
              <Route path="/bush-trimming-rocky-hill-ct" element={<BushTrimmingRockyHillPage />} />
              <Route path="/bush-trimming-farmington-ct" element={<BushTrimmingFarmingtonPage />} />
              <Route path="/bush-trimming-west-hartford-ct" element={<BushTrimmingWestHartfordPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/seasonal-lawn-care-schedule" element={<BlogSeasonalLawnCarePage />} />
              <Route path="/blog/core-aeration-benefits" element={<BlogCoreAerationBenefitsPage />} />
              <Route path="/blog/fall-cleanup-checklist" element={<BlogFallCleanupChecklistPage />} />
              <Route path="/blog/winterize-irrigation-systems" element={<BlogWinterizeIrrigationPage />} />
              <Route path="/blog/mulch-edging-curb-appeal" element={<BlogMulchEdgingCurbAppealPage />} />
              <Route path="/blog/drought-resistant-landscaping-ideas" element={<BlogDroughtResistantLandscapingPage />} />
              <Route path="/blog/snow-readiness-commercial-lots" element={<BlogSnowReadinessCommercialPage />} />
              <Route path="/blog/hedge-trimming-secrets" element={<BlogHedgeTrimmingSecretsPage />} />
              <Route path="/blog/hoa-grounds-management" element={<BlogHOAGroundsManagementPage />} />
              <Route path="/blog/sustainable-landscaping-connecticut" element={<BlogSustainableLandscapingPage />} />
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
