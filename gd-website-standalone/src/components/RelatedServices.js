import React from 'react';
import { Link } from 'react-router-dom';
import './RelatedServices.css';

const RelatedServices = ({ townSlug, currentService, townName }) => {
  // Map of all available services by town
  const serviceMap = {
    'berlin': [
      { name: 'Lawn Care', url: '/lawn-care-berlin-ct', icon: '🌱', type: 'lawn-care' },
      { name: 'Fall Cleanup', url: '/fall-cleanup-berlin-ct', icon: '🍂', type: 'fall-cleanup' },
      { name: 'Bush Trimming', url: '/bush-trimming-berlin-ct', icon: '✂️', type: 'bush-trimming' },
      { name: 'Snow Removal', url: '/snow-removal-berlin-ct', icon: '❄️', type: 'snow-removal' },
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-berlin-ct', icon: '🌾', type: 'fertilization' }
    ],
    'hartford': [
      { name: 'Lawn Care', url: '/lawn-care-hartford-ct', icon: '🌱', type: 'lawn-care' },
      { name: 'Fall Cleanup', url: '/fall-cleanup-hartford-ct', icon: '🍂', type: 'fall-cleanup' },
      { name: 'Bush Trimming', url: '/bush-trimming-hartford-ct', icon: '✂️', type: 'bush-trimming' },
      { name: 'Snow Removal', url: '/snow-removal-hartford-ct', icon: '❄️', type: 'snow-removal' },
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-hartford-ct', icon: '🌾', type: 'fertilization' }
    ],
    'new-britain': [
      { name: 'Lawn Care', url: '/lawn-care-new-britain-ct', icon: '🌱', type: 'lawn-care' },
      { name: 'Fall Cleanup', url: '/fall-cleanup-new-britain-ct', icon: '🍂', type: 'fall-cleanup' },
      { name: 'Bush Trimming', url: '/bush-trimming-new-britain-ct', icon: '✂️', type: 'bush-trimming' },
      { name: 'Snow Removal', url: '/snow-removal-new-britain-ct', icon: '❄️', type: 'snow-removal' },
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-new-britain-ct', icon: '🌾', type: 'fertilization' }
    ],
    'west-hartford': [
      { name: 'Lawn Care', url: '/lawn-care-west-hartford-ct', icon: '🌱', type: 'lawn-care' },
      { name: 'Fall Cleanup', url: '/fall-cleanup-west-hartford-ct', icon: '🍂', type: 'fall-cleanup' },
      { name: 'Bush Trimming', url: '/bush-trimming-west-hartford-ct', icon: '✂️', type: 'bush-trimming' },
      { name: 'Snow Removal', url: '/snow-removal-west-hartford-ct', icon: '❄️', type: 'snow-removal' },
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-west-hartford-ct', icon: '🌾', type: 'fertilization' }
    ],
    'newington': [
      { name: 'Lawn Care', url: '/lawn-care-newington-ct', icon: '🌱', type: 'lawn-care' },
      { name: 'Fall Cleanup', url: '/fall-cleanup-newington-ct', icon: '🍂', type: 'fall-cleanup' },
      { name: 'Bush Trimming', url: '/bush-trimming-newington-ct', icon: '✂️', type: 'bush-trimming' },
      { name: 'Snow Removal', url: '/snow-removal-newington-ct', icon: '❄️', type: 'snow-removal' },
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-newington-ct', icon: '🌾', type: 'fertilization' }
    ],
    'cromwell': [
      { name: 'Lawn Care', url: '/lawn-care-cromwell-ct', icon: '🌱', type: 'lawn-care' },
      { name: 'Fall Cleanup', url: '/fall-cleanup-cromwell-ct', icon: '🍂', type: 'fall-cleanup' },
      { name: 'Bush Trimming', url: '/bush-trimming-cromwell-ct', icon: '✂️', type: 'bush-trimming' },
      { name: 'Snow Removal', url: '/snow-removal-cromwell-ct', icon: '❄️', type: 'snow-removal' }
    ],
    'middletown': [
      { name: 'Lawn Care', url: '/lawn-care-middletown-ct', icon: '🌱', type: 'lawn-care' },
      { name: 'Fall Cleanup', url: '/fall-cleanup-middletown-ct', icon: '🍂', type: 'fall-cleanup' },
      { name: 'Bush Trimming', url: '/bush-trimming-middletown-ct', icon: '✂️', type: 'bush-trimming' },
      { name: 'Snow Removal', url: '/snow-removal-middletown-ct', icon: '❄️', type: 'snow-removal' }
    ],
    'rocky-hill': [
      { name: 'Lawn Care', url: '/lawn-care-rocky-hill-ct', icon: '🌱', type: 'lawn-care' },
      { name: 'Fall Cleanup', url: '/fall-cleanup-rocky-hill-ct', icon: '🍂', type: 'fall-cleanup' },
      { name: 'Bush Trimming', url: '/bush-trimming-rocky-hill-ct', icon: '✂️', type: 'bush-trimming' },
      { name: 'Snow Removal', url: '/snow-removal-rocky-hill-ct', icon: '❄️', type: 'snow-removal' },
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-rocky-hill-ct', icon: '🌾', type: 'fertilization' }
    ],
    'bristol': [
      { name: 'Lawn Care', url: '/lawn-care-bristol-ct', icon: '🌱', type: 'lawn-care' },
      { name: 'Fall Cleanup', url: '/fall-cleanup-bristol-ct', icon: '🍂', type: 'fall-cleanup' },
      { name: 'Bush Trimming', url: '/bush-trimming-bristol-ct', icon: '✂️', type: 'bush-trimming' },
      { name: 'Snow Removal', url: '/snow-removal-bristol-ct', icon: '❄️', type: 'snow-removal' },
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-bristol-ct', icon: '🌾', type: 'fertilization' }
    ],
    'farmington': [
      { name: 'Lawn Care', url: '/lawn-care-farmington-ct', icon: '🌱', type: 'lawn-care' },
      { name: 'Fall Cleanup', url: '/fall-cleanup-farmington-ct', icon: '🍂', type: 'fall-cleanup' },
      { name: 'Bush Trimming', url: '/bush-trimming-farmington-ct', icon: '✂️', type: 'bush-trimming' },
      { name: 'Snow Removal', url: '/snow-removal-farmington-ct', icon: '❄️', type: 'snow-removal' },
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-farmington-ct', icon: '🌾', type: 'fertilization' }
    ],
    'east-hartford': [
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-east-hartford-ct', icon: '🌾', type: 'fertilization' }
    ],
    'wethersfield': [
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-wethersfield-ct', icon: '🌾', type: 'fertilization' }
    ],
    'glastonbury': [
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-glastonbury-ct', icon: '🌾', type: 'fertilization' }
    ],
    'manchester': [
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-manchester-ct', icon: '🌾', type: 'fertilization' }
    ],
    'south-windsor': [
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-south-windsor-ct', icon: '🌾', type: 'fertilization' }
    ],
    'plainville': [
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-plainville-ct', icon: '🌾', type: 'fertilization' }
    ],
    'southington': [
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-southington-ct', icon: '🌾', type: 'fertilization' }
    ],
    'avon': [
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-avon-ct', icon: '🌾', type: 'fertilization' }
    ],
    'windsor': [
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-windsor-ct', icon: '🌾', type: 'fertilization' }
    ],
    'bloomfield': [
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-bloomfield-ct', icon: '🌾', type: 'fertilization' }
    ],
    'canton': [
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-canton-ct', icon: '🌾', type: 'fertilization' }
    ],
    'enfield': [
      { name: 'Fertilization & Weed Control', url: '/fertilization-weed-control-enfield-ct', icon: '🌾', type: 'fertilization' }
    ]
  };

  const services = serviceMap[townSlug] || [];

  // Filter out the current service
  const relatedServices = services.filter(service => service.type !== currentService);

  // Only show section if there are related services
  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <section className="related-services">
      <div className="container">
        <div className="related-services-header">
          <h2>Other Services in {townName}</h2>
          <p>Complete landscaping solutions for your {townName} property</p>
        </div>
        <div className="related-services-grid">
          {relatedServices.map((service, index) => (
            <Link
              key={index}
              to={service.url}
              className="related-service-card"
            >
              <div className="related-service-icon">{service.icon}</div>
              <h3>{service.name}</h3>
              <span className="related-service-arrow">→</span>
            </Link>
          ))}
        </div>
        <div className="related-services-footer">
          <Link to="/services" className="view-all-services">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;
