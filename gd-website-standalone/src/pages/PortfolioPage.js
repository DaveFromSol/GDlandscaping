import React from 'react';
import SEOHead from '../components/SEOHead';

const PortfolioPage = () => {
  const portfolioItems = [
    {
      id: 1,
      title: "Beautiful Garden Transformation",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
      description: "Complete landscape renovation with native plantings and stone pathways."
    },
    {
      id: 2,
      title: "Modern Patio Design",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop",
      description: "Contemporary hardscape design with integrated seating and fire feature."
    },
    {
      id: 3,
      title: "Lush Lawn Installation",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=500&h=300&fit=crop",
      description: "Professional sod installation with irrigation system setup."
    },
    {
      id: 4,
      title: "Tree Service Excellence",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
      description: "Expert tree pruning and maintenance for optimal health and safety."
    },
    {
      id: 5,
      title: "Seasonal Color Display",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
      description: "Vibrant seasonal plantings and flower bed design."
    },
    {
      id: 6,
      title: "Outdoor Living Space",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop",
      description: "Complete outdoor entertainment area with landscaping integration."
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
          <div className="portfolio-hero">
            <h1>Our Portfolio</h1>
            <p className="section-subtitle">Discover the transformation power of professional landscaping through our completed projects in Berlin CT and surrounding areas.</p>
          </div>

          <div className="portfolio-stats">
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5⭐</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">75+</div>
              <div className="stat-label">Towns Served</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>

          <div className="portfolio-categories">
            <h2>Project Categories</h2>
            <div className="category-filters">
              <button className="filter-btn active">All Projects</button>
              <button className="filter-btn">Residential</button>
              <button className="filter-btn">Commercial</button>
              <button className="filter-btn">Hardscaping</button>
              <button className="filter-btn">Lawn Care</button>
              <button className="filter-btn">Tree Services</button>
            </div>
          </div>

          <div className="portfolio-grid">
            {portfolioItems.map(item => (
              <div key={item.id} className="portfolio-card">
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="portfolio-overlay">
                    <div className="portfolio-category">{item.category}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="portfolio-cta">
            <div className="cta-content">
              <h2>Ready to Transform Your Outdoor Space?</h2>
              <p>Let's create something beautiful together. Contact us today for your free consultation and quote.</p>
              <div className="cta-buttons">
                <a href="/contact" className="cta-primary">Get Free Quote</a>
                <a href="/services" className="cta-secondary">View Services</a>
              </div>
            </div>
          </div>

          <div className="testimonials-preview">
            <h2>What Our Clients Say</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p>"GD Landscaping completely transformed our backyard. From design to completion, they were professional, creative, and exceeded our expectations."</p>
                <div className="testimonial-author">
                  <strong>Jennifer Walsh</strong>
                  <span>Berlin, CT</span>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p>"Outstanding work on our front yard landscaping. The team was punctual, clean, and delivered exactly what they promised. Highly recommend!"</p>
                <div className="testimonial-author">
                  <strong>Robert Thompson</strong>
                  <span>Cromwell, CT</span>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p>"Professional tree service and landscape maintenance. They've been taking care of our property for over a year now. Excellent quality and service."</p>
                <div className="testimonial-author">
                  <strong>Maria Rodriguez</strong>
                  <span>Middletown, CT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="process-overview">
            <h2>Our Process</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>Consultation</h3>
                <p>Free on-site consultation to understand your vision and needs</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>Design</h3>
                <p>Custom design proposal with detailed plans and material selections</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>Installation</h3>
                <p>Professional installation by our experienced, insured team</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>Maintenance</h3>
                <p>Ongoing support and maintenance to keep your landscape beautiful</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;