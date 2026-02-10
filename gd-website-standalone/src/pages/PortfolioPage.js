import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const portfolioItems = [
    {
      id: 1,
      title: 'Backyard Landscape Transformation',
      description: 'Complete backyard transformation with native plantings and stone pathways',
      image: '/backyard-landscape-transformation-berlin-ct.png',
      category: 'Landscape Design'
    },
    {
      id: 2,
      title: 'Custom Stone Patio',
      description: 'Elegant hardscaping and outdoor living space installation',
      image: '/custom-stone-patio-hardscaping-ct.png',
      category: 'Hardscaping'
    },
    {
      id: 4,
      title: 'Property Landscaping Project',
      description: 'Professional landscaping transformation in Berlin CT',
      image: '/IMG_5078 (1).avif',
      category: 'Landscape Design'
    },
    {
      id: 5,
      title: 'Seasonal Landscape Maintenance',
      description: 'Year-round property care and landscape management',
      image: '/seasonal-lawn-maintenance-berlin-ct.jpeg',
      category: 'Maintenance'
    },
    {
      id: 6,
      title: 'Commercial Property Care',
      description: 'Professional landscaping for commercial properties',
      image: '/commercial-property-landscaping-connecticut.jpeg',
      category: 'Commercial'
    },
    {
      id: 7,
      title: 'Residential Lawn Service',
      description: 'Premium lawn care and maintenance services',
      image: '/residential-lawn-service-berlin-ct.jpeg',
      category: 'Lawn Care'
    },
    {
      id: 8,
      title: 'Garden & Landscape Design',
      description: 'Custom landscape design and installation',
      image: '/garden-landscape-design-hartford-county.jpeg',
      category: 'Landscape Design'
    }
  ];

  const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];

  const filteredItems = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "G&D Landscaping Portfolio",
    "description": "Professional landscaping project gallery showcasing our work in Berlin CT and surrounding areas",
    "author": {
      "@type": "LocalBusiness",
      "name": "G&D Landscaping",
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
        title="G&D Landscaping Portfolio - Before & After Photos | Berlin CT Landscaping Projects"
        description="View our landscaping portfolio featuring residential and commercial projects in Berlin CT and Hartford County. See lawn maintenance, landscape design, and hardscaping transformations."
        keywords="landscaping portfolio Berlin CT, before after landscaping photos Hartford County, residential landscape design Connecticut, hardscaping projects Berlin CT, lawn transformation photos"
        canonicalUrl="https://www.gdlandscapingllc.com/portfolio"
        structuredData={structuredData}
      />

      <div className="portfolio-section">
        <div className="container">
          <h1>Our Recent Work</h1>
          <p className="section-subtitle">Professional landscaping projects completed in Berlin CT and surrounding areas. See the quality and craftsmanship that sets G&D Landscaping apart.</p>

          {/* Category Filter */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '40px',
            padding: '0 20px'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '10px 24px',
                  border: '2px solid #2d5016',
                  background: selectedCategory === category ? '#2d5016' : 'white',
                  color: selectedCategory === category ? 'white' : '#2d5016',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.background = '#f0f0f0';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.background = 'white';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: '#666',
            fontSize: '16px'
          }}>
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'project' : 'projects'}
          </div>

          <div className="portfolio-grid">
            {filteredItems.map(project => (
              <div key={project.id} className="portfolio-item">
                <div className="portfolio-image">
                  <img 
                    src={project.image} 
                    alt={`${project.title} - Professional Landscaping Work in Berlin CT by G&D Landscaping`}
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
            <p>Contact G&D Landscaping today for your free consultation and quote.</p>
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