import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import './NotFoundPage.css';

const NotFoundPage = () => {
  useEffect(() => {
    // Set document title for 404
    document.title = '404 - Page Not Found | G&D Landscaping';
  }, []);

  return (
    <>
      <SEOHead
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Return to G&D Landscaping homepage or explore our services."
        keywords="404, page not found"
        canonicalUrl="https://www.gdlandscapingllc.com/404"
        robots="noindex, nofollow"
      />

      <div className="not-found-page">
        <div className="not-found-container">
          <div className="not-found-content">
            <h1 className="not-found-code">404</h1>
            <h2 className="not-found-title">Page Not Found</h2>
            <p className="not-found-message">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="not-found-actions">
              <Link to="/" className="btn-primary">
                Return to Homepage
              </Link>
              <Link to="/services" className="btn-secondary">
                View Our Services
              </Link>
            </div>

            <div className="not-found-links">
              <h3>Popular Pages:</h3>
              <ul>
                <li><Link to="/instant-quote">Get Instant Quote</Link></li>
                <li><Link to="/snow-removal">Snow Removal</Link></li>
                <li><Link to="/lawn-care-berlin-ct">Lawn Care Berlin CT</Link></li>
                <li><Link to="/fall-cleanup-hartford-ct">Fall Cleanup Hartford CT</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
