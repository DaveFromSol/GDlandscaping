import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import LocationGallery from '../components/LocationGallery';
import QuoteSection from '../components/QuoteSection';

const phoneNumber = '(860) 526-7583';

const FallCleanupTemplate = ({
  townName,
  seoTitle,
  seoDescription,
  seoKeywords,
  canonicalUrl,
  structuredData,
  hero,
  packages,
  overviewHighlights,
  serviceStats,
  serviceHighlights,
  areas,
  gallerySubtitle,
  quoteConfig,
  cta
}) => {
  const resolvedQuote = quoteConfig || {
    title: `Schedule Fall Cleanup in ${townName}`,
    subtitle: 'Share a few property details and we will confirm your route window.',
    locationName: `${townName} Fall Cleanup`,
    source: `${townName} Fall Cleanup Page`
  };

  const resolvedCta = cta || {
    title: `Ready for Fall Cleanup in ${townName}?`,
    body: `Join your ${townName} neighbors who trust GD Landscaping for thorough fall cleanups, leaf removal, and property winterization.`,
    primaryText: `Get Your ${townName} Quote`,
    secondaryText: 'Call (860) 526-7583'
  };

  const cityName = townName.split(',')[0].trim();
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'GD Landscaping LLC',
    url: canonicalUrl,
    telephone: phoneNumber,
    serviceType: hero?.title || `Fall Cleanup ${townName}`,
    areaServed: townName,
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: 'CT'
    }
  };

  const structuredDataEntries = [
    ...(Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : []),
    localBusinessSchema
  ];

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={canonicalUrl}
        structuredData={structuredDataEntries}
      />

      <div className="fall-cleanup-section">
        <div className="fall-hero">
          <div className="fall-hero-overlay"></div>
          <div className="fall-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>{hero.badge}</span>
              </div>
              <h1>{hero.title}</h1>
              <p className="hero-subtitle">{hero.subtitle}</p>

              <div style={{ margin: '30px 0', padding: '0 20px' }}>
                <h2 style={{ color: '#78350f', fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>
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

        <LocationGallery townName={townName} subtitle={gallerySubtitle} />

        <section className="town-overview">
          <div className="container">
            <div className="town-overview-grid">
              <div className="town-overview-card">
                <h2>{hero.title} Experts</h2>
                <p>{hero.overviewIntro}</p>
                <ul>
                  {overviewHighlights.map((item, idx) => (
                    <li key={`${townName}-overview-${idx}`}>
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
                    <div key={stat.label} className="town-stat">
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
          <section className="packages-section">
            <div className="section-header">
              <h2>{townName} Fall Cleanup Packages</h2>
              <p className="section-subtitle">Choose the right level of seasonal cleanup and prep for your property.</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Most Popular</div>}
                  <div className="package-header">
                    <h3>{pkg.name}</h3>
                    <div className="package-price">{pkg.price}</div>
                    <p className="package-description">{pkg.description}</p>
                  </div>
                  <div className="package-features">
                    <ul>
                      {pkg.features.map((feature, index) => (
                        <li key={`${pkg.id}-feature-${index}`}>
                          <span className="feature-check">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="package-footer">
                    <Link to="/contact" className="package-btn">
                      Book This Package
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="location-benefits">
            <div className="section-header">
              <h2>Why {townName.split(',')[0]} Trusts GD Landscaping</h2>
              <p className="section-subtitle">Local crews, pro equipment, and reliable scheduling all season.</p>
            </div>

            <div className="benefits-grid">
              {serviceHighlights.map((item, index) => (
                <div key={`${townName}-benefit-${index}`} className="benefit-card">
                  <div className="benefit-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="location-areas">
            <div className="section-header">
              <h2>Areas We Cover in {townName.split(',')[0]}</h2>
              <p className="section-subtitle">Reliable fall cleanup coverage throughout the community.</p>
            </div>

            <div className="areas-content">
              <div className="local-areas">
                <h3>Neighborhoods & Districts</h3>
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

          <section className="fall-cta">
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

export default FallCleanupTemplate;
