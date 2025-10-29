import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import LocationGallery from '../components/LocationGallery';
import QuoteSection from '../components/QuoteSection';
import FAQSection from '../components/FAQSection';

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
  cta,
  faqs
}) => {
  const defaultFaqs = [
    {
      question: "When is the best time to schedule fall cleanup?",
      answer: "The ideal time for fall cleanup in Connecticut is typically late October through early December, after most leaves have fallen but before the first major snowfall. We recommend scheduling early in the season to secure your preferred time slot, as demand is high during peak leaf-drop weeks."
    },
    {
      question: "What's included in your fall cleanup service?",
      answer: "Our comprehensive fall cleanup includes leaf removal from lawns and landscape beds, debris cleanup, trimming back perennials, clearing gutters (if requested), removing fallen branches, edging beds, and hauling away all organic material. We leave your property clean and ready for winter."
    },
    {
      question: "How many visits does fall cleanup typically require?",
      answer: "Most properties need 1-3 fall cleanup visits depending on the number and types of trees on your property. Properties with many oak trees may need an extra visit since oaks drop leaves later in the season. We can set up a schedule that works for your specific landscape."
    },
    {
      question: "Do you mulch leaves or remove them completely?",
      answer: "We typically remove leaves completely to prevent them from smothering your grass and promoting disease. However, if you prefer mulching for garden beds or composting, we can accommodate that request. We'll discuss the best approach for your property during the estimate."
    },
    {
      question: "What happens to the leaves after you remove them?",
      answer: "All leaves and organic debris are hauled away from your property and disposed of properly at approved facilities. We handle all removal and disposal - you won't need to worry about piles at the curb or managing disposal yourself."
    },
    {
      question: "Can you clean up wet or matted leaves?",
      answer: "Yes, our professional equipment can handle wet, matted leaves that regular rakes and blowers struggle with. Connecticut's fall weather can be unpredictable, and we're equipped to work in various conditions to keep your property clean."
    },
    {
      question: "Should I wait until all the leaves have fallen?",
      answer: "Not necessarily. For properties with heavy leaf coverage, we often recommend 2-3 visits throughout the fall season. This prevents thick layers from matting down and damaging your lawn. We can create a cleanup schedule based on your specific trees and property needs."
    },
    {
      question: "Do you offer emergency cleanup after storms?",
      answer: `Yes, we provide storm damage cleanup including removal of fallen branches, debris, and excess leaves. Contact us at ${phoneNumber} for urgent cleanup needs, and we'll prioritize your property based on severity and safety concerns.`
    }
  ];

  const faqsToDisplay = faqs || defaultFaqs;
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
              <h2>Get Your Custom Fall Cleanup Quote</h2>
              <p className="section-subtitle">Every property is unique. Pricing depends on lot size, leaf coverage, and specific service needs.</p>
            </div>

            <div className="pricing-cta-section" style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              borderRadius: '16px',
              padding: '60px 40px',
              textAlign: 'center',
              color: 'white',
              maxWidth: '800px',
              margin: '0 auto',
              boxShadow: '0 20px 50px rgba(249, 115, 22, 0.3)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🍂</div>
              <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'white' }}>
                Customized Pricing for Your Property
              </h3>
              <p style={{ fontSize: '18px', marginBottom: '32px', opacity: '0.95', lineHeight: '1.6' }}>
                Get an accurate quote based on your property size and cleanup needs. We offer competitive rates for {townName} homeowners.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  to="/instant-quote"
                  style={{
                    background: 'white',
                    color: '#ea580c',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '18px',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Get Instant Quote
                </Link>
                <a
                  href="tel:8605267583"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '18px',
                    textDecoration: 'none',
                    display: 'inline-block',
                    border: '2px solid white',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.color = '#ea580c';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.color = 'white';
                  }}
                >
                  Call (860) 526-7583
                </a>
              </div>
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

          <FAQSection faqs={faqsToDisplay} title={`Fall Cleanup FAQ - ${townName.split(',')[0]}`} />

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
