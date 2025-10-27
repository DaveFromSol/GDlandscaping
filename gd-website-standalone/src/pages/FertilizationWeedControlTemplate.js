import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuoteSection from '../components/QuoteSection';
import './FertilizationWeedControlTemplate.css';

const FertilizationWeedControlTemplate = ({
  seo,
  townName,
  hero,
  intro,
  highlights = [],
  programs = [],
  benefits = [],
  stats = [],
  serviceAreas = [],
  seasonalTips,
  gallery,
  cta
}) => {
  const structuredDataEntries = Array.isArray(seo.structuredData)
    ? seo.structuredData
    : seo.structuredData
    ? [seo.structuredData]
    : [];

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        structuredData={structuredDataEntries}
      />

      <div className="fert-page">
        <section
          className="fert-hero"
          style={{ backgroundImage: `url(${hero.backgroundImage})` }}
        >
          <div className="fert-hero-overlay" />
          <div className="fert-hero-content">
            <div className="fert-hero-badge">{hero.badge}</div>
            <h1>{hero.title}</h1>
            <p>{hero.subtitle}</p>
            <div className="fert-hero-actions">
              <Link to="/instant-quote" className="cta-primary">
                Get Instant Lawn Quote
              </Link>
              <Link to="/services" className="cta-secondary">
                View Lawn Care Services
              </Link>
            </div>
          </div>
        </section>

        <section className="fert-overview">
          <div className="container">
            <div className="fert-overview-grid">
              <div className="fert-overview-text">
                <h2>{intro.heading}</h2>
                <p>{intro.copy}</p>
                {intro.supporting && <p>{intro.supporting}</p>}
                <div className="fert-links">
                  <Link to="/services">Explore full Lawn Care programs</Link>
                  <Link to="/#areas-we-serve">See all areas we serve</Link>
                </div>
              </div>
              <div className="fert-overview-highlights">
                <h3>Why {townName.split(',')[0]} Lawns Trust GD Landscaping</h3>
                <ul>
                  {highlights.map((item, index) => (
                    <li key={`fert-highlight-${index}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {programs.length > 0 && (
          <section className="fert-programs">
            <div className="container">
              <div className="section-header">
                <h2>{townName.split(',')[0]} Fertilization & Weed Control Programs</h2>
                <p>
                  Season-long nutrition and targeted weed suppression keep {townName.split(',')[0]} lawns green and resilient.
                </p>
              </div>
              <div className="fert-programs-grid">
                {programs.map((program) => (
                  <div key={program.id} className={`fert-program-card ${program.popular ? 'popular' : ''}`}>
                    {program.popular && <div className="popular-badge">Most Popular</div>}
                    <div className="fert-program-header">
                      <h3>{program.name}</h3>
                      <div className="fert-program-price">{program.price}</div>
                      <p>{program.description}</p>
                    </div>
                    <ul className="fert-program-features">
                      {program.features.map((feature, index) => (
                        <li key={`${program.id}-feature-${index}`}>
                          <span className="feature-check">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {benefits.length > 0 && (
          <section className="fert-benefits">
            <div className="container">
              <div className="section-header">
                <h2>What to Expect From Our {townName.split(',')[0]} Program</h2>
                <p>
                  Local technicians tailor every application to weather patterns, soil conditions, and turf types across {townName}.
                </p>
              </div>
              <div className="fert-benefits-grid">
                {benefits.map((benefit, index) => (
                  <div key={`fert-benefit-${index}`} className="fert-benefit-card">
                    <div className="fert-benefit-icon">{benefit.icon}</div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {stats.length > 0 && (
          <section className="fert-stats">
            <div className="container">
              <div className="fert-stats-grid">
                {stats.map((stat, index) => (
                  <div key={`fert-stat-${index}`} className="fert-stat">
                    <span className="fert-stat-value">{stat.value}</span>
                    <span className="fert-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {serviceAreas.length > 0 && (
          <section className="fert-service-areas">
            <div className="container">
              <div className="section-header">
                <h2>{townName.split(',')[0]} Neighborhood Coverage</h2>
                <p>Responsive fertilization and weed management across {townName} and nearby communities.</p>
              </div>
              <div className="fert-service-grid">
                <div className="fert-service-neighborhoods">
                  <h3>Neighborhoods & Districts</h3>
                  <div className="towns-grid">
                    {serviceAreas.map((area, index) => (
                      <span key={`fert-area-${index}`} className="town">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                {seasonalTips && (
                  <div className="fert-seasonal-tips">
                    <h3>{seasonalTips.title}</h3>
                    <ul>
                      {seasonalTips.tips.map((tip, index) => (
                        <li key={`fert-tip-${index}`}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {gallery && (
          <section className="fert-gallery">
            <div className="container">
              <div className="fert-gallery-grid">
                <div className="fert-gallery-image">
                  <img src={gallery.image} alt={gallery.alt} />
                </div>
                <div className="fert-gallery-text">
                  <h3>{gallery.title}</h3>
                  <p>{gallery.caption}</p>
                  <Link to="/instant-quote" className="cta-primary">
                    Schedule Your Lawn Assessment
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <QuoteSection
          title={cta?.title || `Start Your ${townName.split(',')[0]} Treatment Plan`}
          subtitle={cta?.subtitle || 'Share your property details and preferred start date. We will design a fertilization and weed control plan that fits your lawn.'}
          locationName={`${townName.split(',')[0]} Fertilization & Weed Control`}
          source={`${townName.split(',')[0]} Fertilization Page`}
        />
      </div>
    </>
  );
};

export default FertilizationWeedControlTemplate;
