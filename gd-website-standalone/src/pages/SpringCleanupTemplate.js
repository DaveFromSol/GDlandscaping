import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import LocationGallery from '../components/LocationGallery';
import QuoteSection from '../components/QuoteSection';
import QuickQuoteForm from '../components/QuickQuoteForm';
import FAQSection from '../components/FAQSection';
import RelatedServices from '../components/RelatedServices';
import RelatedArticles from '../components/RelatedArticles';

const phoneNumber = '(860) 526-7583';

const SpringCleanupTemplate = ({
  townName,
  seoTitle,
  seoDescription,
  seoKeywords,
  canonicalUrl,
  structuredData,
  hero,
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
      question: "When is the best time to schedule spring cleanup in Connecticut?",
      answer: "The ideal time for spring cleanup in Connecticut is typically late March through early May, once the ground has thawed and overnight temperatures stay consistently above freezing. Early scheduling is recommended as slots fill quickly during the peak spring rush."
    },
    {
      question: "What's included in your spring cleanup service?",
      answer: "Our comprehensive spring cleanup includes removal of winter debris, dead leaves, and fallen branches; cutting back perennials and ornamental grasses; bed edging and cleanup; mulch application (if requested); lawn dethatching and raking; and hauling away all organic material."
    },
    {
      question: "Do you remove winter debris and dead plants?",
      answer: "Yes. We remove all winter debris including salt-damaged mulch, dead annuals, broken branches, and matted leaves that have been compressed under snow. We also cut back any perennials and grasses that weren't cut in the fall."
    },
    {
      question: "Can you aerate and overseed after the spring cleanup?",
      answer: "Absolutely. Spring is a great time for core aeration and overseeding to fill in bare spots left by winter damage. We recommend combining spring cleanup with aeration for the best lawn health results. Ask us about our spring lawn restoration packages."
    },
    {
      question: "How long does a typical spring cleanup take?",
      answer: "Most residential spring cleanups take between 2–6 hours depending on property size, the amount of winter debris, and additional services like mulching or edging. Larger properties or those with heavy debris may require a full day or a follow-up visit."
    },
    {
      question: "Do you haul away all the debris?",
      answer: "Yes, all debris is hauled directly off your property and disposed of properly at approved facilities. You won't need to worry about piles at the curb or making any trips to the transfer station."
    },
    {
      question: "Can I schedule a one-time spring cleanup or a recurring service?",
      answer: "Both options are available. Many customers start with a one-time spring cleanup to get their property looking great, then transition into our weekly or bi-weekly lawn maintenance program. We offer discounts when you bundle spring cleanup with ongoing lawn care."
    },
    {
      question: "Do you offer mulching with spring cleanup?",
      answer: `Yes, fresh mulch application is one of our most popular spring add-ons. We remove old, matted mulch and replace it with fresh material to protect plant roots, suppress weeds, and give your beds a clean, finished look. Call us at ${phoneNumber} to add mulching to your spring cleanup quote.`
    }
  ];

  const faqsToDisplay = faqs || defaultFaqs;

  const resolvedQuote = quoteConfig || {
    title: `Schedule Spring Cleanup in ${townName}`,
    subtitle: 'Share a few property details and we will confirm your route window.',
    locationName: `${townName} Spring Cleanup`,
    source: `${townName} Spring Cleanup Page`
  };

  const resolvedCta = cta || {
    title: `Ready for Spring Cleanup in ${townName}?`,
    body: `Join your ${townName} neighbors who trust G&D Landscaping for thorough spring cleanups, debris removal, and lawn prep.`,
    primaryText: `Get Your ${townName} Quote`,
    secondaryText: 'Call (860) 526-7583'
  };

  const cityName = townName.split(',')[0].trim();
  const townSlug = cityName.toLowerCase().replace(/\s+/g, '-');

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'G&D Landscaping LLC',
    url: canonicalUrl,
    telephone: phoneNumber,
    serviceType: hero?.title || `Spring Cleanup ${townName}`,
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

      <div className="spring-cleanup-section">
        <div className="spring-hero">
          <div className="spring-hero-overlay"></div>
          <div className="spring-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>{hero.badge}</span>
              </div>
              <h1>{hero.title}</h1>
              <p className="hero-subtitle">{hero.subtitle}</p>

              <div style={{ margin: '30px 0', padding: '0 20px' }}>
                <h2 style={{ color: '#14532d', fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>
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
              <h2>Get Your Custom Spring Cleanup Quote</h2>
              <p className="section-subtitle">Every property is unique. Pricing depends on lot size, debris volume, and specific service needs.</p>
            </div>

            <div className="pricing-cta-section" style={{
              background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
              borderRadius: '16px',
              padding: '60px 40px',
              textAlign: 'center',
              color: 'white',
              maxWidth: '800px',
              margin: '0 auto',
              boxShadow: '0 20px 50px rgba(22, 163, 74, 0.3)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌱</div>
              <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'white' }}>
                Customized Pricing for Your Property
              </h3>
              <p style={{ fontSize: '18px', marginBottom: '32px', opacity: '0.95', lineHeight: '1.6' }}>
                Get an accurate quote based on your property size and spring cleanup needs. Competitive rates for {townName} homeowners.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  to="/contact"
                  style={{
                    background: 'white',
                    color: '#15803d',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '18px',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  Get Free Quote
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
                >
                  📞 Call (860) 526-7583
                </a>
              </div>
            </div>
          </section>

          <section className="location-benefits">
            <div className="section-header">
              <h2>Why {cityName} Trusts G&D Landscaping</h2>
              <p className="section-subtitle">Local crews, pro equipment, and reliable scheduling every spring.</p>
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
              <h2>Areas We Cover in {cityName}</h2>
              <p className="section-subtitle">Reliable spring cleanup coverage throughout the community.</p>
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

          <div className="town-quick-quote">
            <div className="container">
              <div className="quick-quote-wrapper">
                <h2>Get a Free Quote</h2>
                <p className="quick-quote-intro">Tell us what you need and we'll call you back within 12 hours.</p>
                <QuickQuoteForm source={`${townSlug}-spring-cleanup`} />
              </div>
            </div>
          </div>

          <QuoteSection
            title={resolvedQuote.title}
            subtitle={resolvedQuote.subtitle}
            locationName={resolvedQuote.locationName}
            source={resolvedQuote.source}
          />

          <FAQSection faqs={faqsToDisplay} title={`Spring Cleanup FAQ - ${cityName}`} />
        </div>

        <RelatedArticles serviceType="spring-cleanup" />

        <RelatedServices
          townSlug={townSlug}
          currentService="spring-cleanup"
          townName={cityName}
        />

        <div className="container">
          <section className="spring-cta">
            <div className="cta-content">
              <h2>{resolvedCta.title}</h2>
              <p>{resolvedCta.body}</p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-primary">
                  {resolvedCta.primaryText}
                </Link>
                <a href="tel:8605267583" className="cta-secondary">
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

export default SpringCleanupTemplate;
