import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AddressAutocomplete from '../components/AddressAutocomplete';
import LocationGallery from '../components/LocationGallery';
import QuoteSection from '../components/QuoteSection';
import FAQSection from '../components/FAQSection';
import OptimizedImage from '../components/OptimizedImage';
import RelatedServices from '../components/RelatedServices';
import RelatedArticles from '../components/RelatedArticles';

const defaultPhoneNumber = '(860) 526-7583';

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
  cta,
  faqs
}) => {
  const defaultFaqs = [
    {
      question: "How often should I trim my hedges and bushes?",
      answer: "Most hedges and shrubs benefit from trimming 2-3 times per year - typically in late spring, mid-summer, and early fall. Fast-growing shrubs like privet may need more frequent trimming. Our team will assess your specific plants and recommend an optimal schedule."
    },
    {
      question: "What's the best time of year for bush trimming?",
      answer: "The ideal timing depends on the plant type. Spring-flowering shrubs should be trimmed right after blooming, while summer-flowering shrubs are best trimmed in late winter or early spring. We recommend avoiding heavy trimming in late fall to prevent winter damage."
    },
    {
      question: "Do you remove the clippings and debris?",
      answer: "Yes, absolutely! Complete cleanup is included in our bush trimming service. We haul away all clippings, branches, and debris, leaving your property clean and tidy."
    },
    {
      question: "Can you shape overgrown bushes into a specific design?",
      answer: "Yes, we specialize in both maintenance trimming and restoration of overgrown shrubs. Whether you want formal geometric shapes, natural rounded forms, or creative topiary, our experienced crew can shape your hedges to match your vision."
    },
    {
      question: "How much does bush trimming cost?",
      answer: `Pricing varies based on the number of shrubs, their size, and complexity of the work. We offer free estimates and can provide accurate pricing after viewing your property. Contact us at ${defaultPhoneNumber} for a quote.`
    },
    {
      question: "Will trimming hurt my plants?",
      answer: "When done properly, trimming promotes healthy growth and fuller, more attractive plants. Our crew is trained in proper pruning techniques for different shrub species, ensuring cuts are made at the right angles and locations to encourage healthy regrowth."
    },
    {
      question: "Do you trim both residential and commercial properties?",
      answer: "Yes, we service both residential homes and commercial properties including office buildings, retail centers, HOA communities, and apartment complexes throughout Central Connecticut."
    },
    {
      question: "What if I'm not home when you perform the service?",
      answer: "No problem! Most of our bush trimming is done while clients are at work. We'll communicate the scheduled date in advance, and you can return home to beautifully trimmed hedges and a clean property."
    }
  ];

  const faqsToDisplay = faqs || defaultFaqs;
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

  const cityName = townName.split(',')[0].trim();
  const townSlug = cityName.toLowerCase().replace(/\s+/g, '-');
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'GD Landscaping LLC',
    url: seo.canonicalUrl,
    telephone: hero?.ctaSecondaryText?.replace('Call ', '') || defaultPhoneNumber,
    serviceType: hero?.title || `Bush Trimming ${townName}`,
    areaServed: townName,
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: 'CT'
    }
  };

  const structuredDataEntries = [
    ...(Array.isArray(seo.structuredData) ? seo.structuredData : seo.structuredData ? [seo.structuredData] : []),
    localBusinessSchema
  ];

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        structuredData={structuredDataEntries}
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
                <OptimizedImage
                  src="/overgrown-hedge-before-trimming-ct.jpg"
                  alt="Overgrown and unruly hedge before professional bush trimming service in Connecticut"
                  width={600}
                  height={400}
                />
                <div className="before-after-label before">Before</div>
              </div>
              <div className="before-after-card">
                <OptimizedImage
                  src="/trimmed-hedge-after-service-ct.jpg"
                  alt="Neatly shaped hedge with clean lines after professional bush trimming and cleanup in Connecticut"
                  width={600}
                  height={400}
                />
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

          <FAQSection faqs={faqsToDisplay} title={`Bush Trimming FAQ - ${townName.split(',')[0]}`} />
        </div>

        <RelatedArticles serviceType="bush-trimming" />

        <RelatedServices
          townSlug={townSlug}
          currentService="bush-trimming"
          townName={cityName}
        />

        <div className="container">
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
