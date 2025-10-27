import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import LocationGallery from '../components/LocationGallery';
import QuoteSection from '../components/QuoteSection';

const BushTrimmingTemplate = ({
  townName,
  seo,
  hero,
  overviewHighlights,
  serviceStats,
  serviceHighlights,
  areas,
  gallerySubtitle,
  quoteConfig,
  cta
}) => {
  const resolvedQuote = quoteConfig || {
    title: `Request Bush Trimming in ${townName}`,
    subtitle: 'Tell us about your shrubs and hedges—our team will send a tailored quote.',
    locationName: `${townName} Bush Trimming`,
    source: `${townName} Bush Trimming Page`
  };

  const resolvedCta = cta || {
    title: `Ready for Picture-Perfect Hedges in ${townName}?`,
    body: 'Reserve a trimming visit before overgrowth sets in. Seasonal and subscription plans available.',
    primaryText: `Get ${townName} Trimming Quote`,
    secondaryText: 'Call (860) 526-7583'
  };

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        structuredData={seo.structuredData}
      />

      <div className="bush-trimming-section">
        <div className="trim-hero">
          <div className="trim-hero-overlay"></div>
          <div className="trim-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>{hero.badge}</span>
              </div>
              <h1>{hero.title}</h1>
              <p className="hero-subtitle">{hero.subtitle}</p>

              <div style={{ margin: '30px 0', padding: '0 20px' }}>
                <h2 style={{ color: '#064e3b', fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>
                  {hero.addressPrompt}
                </h2>
                <AddressAutocomplete />
              </div>

              <div className="hero-buttons">
                <Link to="/contact" className="cta-primary">
                  {hero.ctaPrimaryText}
                </Link>
                <a href={hero.ctaSecondaryHref} className="cta-secondary">
                  {hero.ctaSecondaryText}
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="town-overview">
          <div className="container">
            <div className="town-overview-grid">
              <div className="town-overview-card">
                <h2>Hedge + Shrub Expertise in {townName}</h2>
                <p>{hero.overviewIntro}</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`${townName}-trim-highlight-${idx}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="town-overview-card">
                <h3>Service Snapshot</h3>
                <p>{hero.snapshotCopy}</p>
                <div className="town-stats">
                  {serviceStats.map((stat) => (
                    <div key={`${townName}-stat-${stat.label}`} className="town-stat">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <section className="before-after-section">
            <div className="section-header">
              <h2>Real Results from {townName.split(',')[0]}</h2>
              <p className="section-subtitle">Professional hedge trimming transforms overgrown bushes into clean, maintained landscapes.</p>
            </div>
            <div className="before-after-grid">
              <div className="before-after-card">
                <img src="/IMG_9007.jpg" alt="Overgrown hedge before trimming" />
                <div className="before-after-label before">Before</div>
              </div>
              <div className="before-after-card">
                <img src="/IMG_9012.jpg" alt="Neatly trimmed hedge after professional service" />
                <div className="before-after-label after">After</div>
              </div>
            </div>
          </section>

          <LocationGallery townName={townName} subtitle={gallerySubtitle} />

          <section className="location-benefits">
            <div className="section-header">
              <h2>Why {townName.split(',')[0]} Chooses GD Landscaping</h2>
              <p className="section-subtitle">Licensed crews, sharp equipment, and dependable schedules.</p>
            </div>
            <div className="benefits-grid">
              {serviceHighlights.map((benefit, idx) => (
                <div key={`${townName}-benefit-${idx}`} className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="location-areas">
            <div className="section-header">
              <h2>Neighborhood Coverage</h2>
              <p className="section-subtitle">Hedge and shrub trimming throughout {townName.split(',')[0]}.</p>
            </div>
            <div className="areas-content">
              <div className="local-areas">
                <h3>Areas We Maintain</h3>
                <div className="towns-grid">
                  {areas.map((area, index) => (
                    <span key={`${townName}-area-${index}`} className="town">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <QuoteSection
            title={resolvedQuote.title}
            subtitle={resolvedQuote.subtitle}
            locationName={resolvedQuote.locationName}
            source={resolvedQuote.source}
          />

          <section className="trim-cta">
            <div className="cta-content">
              <h2>{resolvedCta.title}</h2>
              <p>{resolvedCta.body}</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  {resolvedCta.primaryText}
                </Link>
                <a href="tel:(860) 526-7583" className="cta-secondary">
                  {resolvedCta.secondaryText}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BushTrimmingTemplate;
