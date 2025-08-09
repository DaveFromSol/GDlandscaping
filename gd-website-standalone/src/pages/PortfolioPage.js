import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const PortfolioPage = () => {
  const portfolioItems = [
    {
      id: 1,
      title: 'Residential Landscape Design',
      description: 'Complete backyard transformation with native plantings and stone pathways',
      image: '/1A0AA44E-D251-41D2-B56A-9543E6E408BD%20-%20Edited.png',
      category: 'Residential'
    },
    {
      id: 2,
      title: 'Residential Property Maintenance',
      description: 'Professional lawn care and landscaping for residential properties',
      image: '/A4D59809-8BCD-4140-837C-A18E6A093CA2_L0_001%20-%20Edited.jpg',
      category: 'Residential'
    },
    {
      id: 3,
      title: 'Residential Hardscaping & Patios',
      description: 'Custom stone patios and outdoor living spaces for residential homes',
      image: '/IMG_2692%20-%20Edited%20-%20Edited.png',
      category: 'Residential'
    },
    {
      id: 4,
      title: 'Recent Landscaping Project',
      description: 'Professional landscaping transformation in Berlin CT area',
      image: '/IMG_5078%20(1).avif',
      category: 'Residential'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "GD Landscaping Portfolio",
    "description": "Professional landscaping project gallery showcasing our work in Berlin CT and surrounding areas",
    "author": {
      "@type": "LocalBusiness",
      "name": "GD Landscaping",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Berlin",
        "addressRegion": "CT",
        "addressCountry": "US"
      }
    },
    "image": portfolioItems.map(item => ({
      "@type": "ImageObject",
      "name": item.title,
      "description": item.description,
      "url": item.image
    }))
  };

  return (
    <>
      <SEOHead
        title="GD Landscaping Portfolio - Before & After Photos | Berlin CT Landscaping Projects"
        description="View our landscaping portfolio featuring residential projects in Berlin CT and Hartford County. See lawn maintenance, landscape design, and hardscaping transformations."
        keywords="landscaping portfolio Berlin CT, before after landscaping photos Hartford County, residential landscape design Connecticut, hardscaping projects Berlin CT, lawn transformation photos"
        canonicalUrl="https://gdlandscaping.com/portfolio"
        structuredData={structuredData}
      />
      
      <div className="portfolio-section">
        <div className="container">
          <h1>Our Recent Work</h1>
          <p className="section-subtitle">Professional landscaping projects completed in Berlin CT and surrounding areas. See the quality and craftsmanship that sets GD Landscaping apart.</p>
          
          <div className="portfolio-grid">
            {portfolioItems.map(project => (
              <div key={project.id} className="portfolio-item">
                <div className="portfolio-image">
                  <img 
                    src={project.image} 
                    alt={`${project.title} - Professional Landscaping Work in Berlin CT by GD Landscaping`}
                    className="portfolio-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="portfolio-placeholder" style={{display: 'none'}}>
                    🏡<br/>Project<br/>Image
                  </div>
                  <div className="portfolio-overlay">
                    <div className="portfolio-category">{project.category}</div>
                    <div className="portfolio-text-box">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="portfolio-cta">
            <h2>Ready to Transform Your Outdoor Space?</h2>
            <p>Contact GD Landscaping today for your free consultation and quote.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-primary">Get Free Quote</Link>
              <Link to="/services" className="cta-secondary">View Our Services</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;