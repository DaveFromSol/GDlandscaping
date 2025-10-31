import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuoteSection from '../components/QuoteSection';
import FAQSection from '../components/FAQSection';
import OptimizedImage from '../components/OptimizedImage';
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
  cta,
  faqs
}) => {
  const defaultFaqs = [
    {
      question: "How often should I fertilize my lawn in Connecticut?",
      answer: "Connecticut lawns typically benefit from 4-6 applications per year - early spring, late spring, summer, early fall, and late fall. The exact timing depends on your grass type, soil conditions, and weather patterns. Our customized programs are designed specifically for Connecticut's climate and growing seasons."
    },
    {
      question: "What's the difference between your fertilization programs?",
      answer: "Our programs range from basic nutrition (3-4 applications) to comprehensive care (6+ applications with pre-emergent weed control, soil amendments, and targeted treatments). Premium programs include more frequent visits, organic options, and advanced treatments for pest and disease prevention."
    },
    {
      question: "Is your fertilizer safe for kids and pets?",
      answer: "Yes, we use professional-grade products that are safe when applied correctly. We recommend keeping children and pets off treated areas until the product has been watered in or has dried (typically 2-4 hours). We can also provide organic and eco-friendly alternatives upon request."
    },
    {
      question: "How do you control weeds without harming my grass?",
      answer: "We use selective herbicides that target broadleaf weeds and crabgrass while leaving your desirable grass unharmed. Our pre-emergent treatments in early spring prevent weed seeds from germinating, while post-emergent treatments eliminate existing weeds. Proper lawn nutrition also helps grass outcompete weeds naturally."
    },
    {
      question: "When will I see results from fertilization?",
      answer: "You'll typically notice greener, healthier grass within 1-2 weeks of fertilization. Full results develop over 4-6 weeks as the nutrients are absorbed. Weed control results vary - pre-emergent works preventively while post-emergent treatments show visible weed decline within 7-14 days."
    },
    {
      question: "Do I need to be home during application?",
      answer: "No, you don't need to be home. We'll notify you in advance of your scheduled application and leave a service flag and notification after treatment. We mark treated areas and provide any necessary instructions, such as watering requirements or re-entry times."
    },
    {
      question: "What if it rains after you apply fertilizer?",
      answer: "Light rain after fertilization is actually beneficial as it helps water in the nutrients. Heavy rain immediately after application (within 1-2 hours) may reduce effectiveness. If this happens, we'll monitor your lawn and provide a re-treatment if necessary at no additional charge."
    },
    {
      question: "Can you fix bare spots and thin areas?",
      answer: "Yes! Our premium programs include overseeding and spot-seeding services to thicken thin areas and fill in bare spots. Combined with proper fertilization and weed control, we can transform patchy lawns into thick, lush turf. We'll assess your lawn and recommend the best approach during your consultation."
    }
  ];

  const faqsToDisplay = faqs || defaultFaqs;
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
                  <OptimizedImage
                    src={gallery.image}
                    alt={gallery.alt}
                    width={800}
                    height={600}
                  />
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

        <div className="container">
          <FAQSection faqs={faqsToDisplay} title={`Fertilization & Weed Control FAQ - ${townName.split(',')[0]}`} />
        </div>

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
