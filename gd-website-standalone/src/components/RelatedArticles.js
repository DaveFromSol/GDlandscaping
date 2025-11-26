import React from 'react';
import { Link } from 'react-router-dom';
import './RelatedArticles.css';

const RelatedArticles = ({ serviceType }) => {
  const articleMap = {
    'fall-cleanup': [
      {
        title: 'Fall Cleanup Checklist: Complete Guide for Connecticut Homeowners',
        url: '/blog/fall-cleanup-checklist',
        icon: '🍂',
        description: 'Learn the essential steps to prepare your yard for winter'
      },
      {
        title: 'Seasonal Lawn Care Schedule for Connecticut',
        url: '/blog/seasonal-lawn-care-schedule',
        icon: '📅',
        description: 'Year-round maintenance tips for a healthier lawn'
      },
      {
        title: 'How to Winterize Your Irrigation System',
        url: '/blog/winterize-irrigation-systems',
        icon: '💧',
        description: 'Protect your sprinkler system from winter damage'
      }
    ],
    'fertilization': [
      {
        title: 'Seasonal Lawn Care Schedule for Connecticut',
        url: '/blog/seasonal-lawn-care-schedule',
        icon: '📅',
        description: 'Optimal timing for fertilization and weed control'
      },
      {
        title: 'Core Aeration Benefits: When and Why to Aerate',
        url: '/blog/core-aeration-benefits',
        icon: '🌱',
        description: 'Boost fertilizer effectiveness with proper aeration'
      },
      {
        title: 'Drought-Resistant Landscaping Ideas for CT',
        url: '/blog/drought-resistant-landscaping-ideas',
        icon: '🌵',
        description: 'Water-wise lawn care and sustainable practices'
      }
    ],
    'bush-trimming': [
      {
        title: 'Hedge Trimming Secrets: Professional Tips for Perfect Hedges',
        url: '/blog/hedge-trimming-secrets',
        icon: '✂️',
        description: 'Learn expert techniques for beautiful, healthy shrubs'
      },
      {
        title: 'Mulch & Edging: Boost Your Curb Appeal',
        url: '/blog/mulch-edging-curb-appeal',
        icon: '🪵',
        description: 'Complete your landscape with professional finishing'
      },
      {
        title: 'Seasonal Lawn Care Schedule for Connecticut',
        url: '/blog/seasonal-lawn-care-schedule',
        icon: '📅',
        description: 'When to schedule trimming for optimal plant health'
      }
    ],
    'lawn-care': [
      {
        title: 'Seasonal Lawn Care Schedule for Connecticut',
        url: '/blog/seasonal-lawn-care-schedule',
        icon: '📅',
        description: 'Complete year-round lawn maintenance guide'
      },
      {
        title: 'Core Aeration Benefits: When and Why to Aerate',
        url: '/blog/core-aeration-benefits',
        icon: '🌱',
        description: 'Essential service for thick, healthy turf'
      },
      {
        title: 'Sustainable Landscaping Practices in Connecticut',
        url: '/blog/sustainable-landscaping-connecticut',
        icon: '🌿',
        description: 'Eco-friendly lawn care tips and techniques'
      }
    ],
    'snow-removal': [
      {
        title: 'Snow Readiness for Commercial Lots',
        url: '/blog/snow-readiness-commercial-lots',
        icon: '❄️',
        description: 'Prepare your property for winter storms'
      },
      {
        title: 'Fall Cleanup Checklist: Complete Guide',
        url: '/blog/fall-cleanup-checklist',
        icon: '🍂',
        description: 'Get your property ready before the first snowfall'
      },
      {
        title: 'HOA Grounds Management Best Practices',
        url: '/blog/hoa-grounds-management',
        icon: '🏘️',
        description: 'Winter property management for communities'
      }
    ]
  };

  const articles = articleMap[serviceType] || [];

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="related-articles">
      <div className="container">
        <div className="related-articles-header">
          <h2>Helpful Resources</h2>
          <p>Expert tips and guides from GD Landscaping</p>
        </div>
        <div className="related-articles-grid">
          {articles.map((article, index) => (
            <Link
              key={index}
              to={article.url}
              className="related-article-card"
            >
              <div className="related-article-icon">{article.icon}</div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <span className="related-article-link">Read Article →</span>
            </Link>
          ))}
        </div>
        <div className="related-articles-footer">
          <Link to="/blog" className="view-all-articles">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
