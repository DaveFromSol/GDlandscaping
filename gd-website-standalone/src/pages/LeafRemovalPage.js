import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuoteSection from '../components/QuoteSection';
import FAQSection from '../components/FAQSection';
import AddressAutocomplete from '../components/AddressAutocomplete';

const phoneNumber = '(860) 526-7583';
const phoneHref = 'tel:+18605267583';

const LeafRemovalPage = () => {
  const features = [
    {
      icon: '🍁',
      title: 'Complete Leaf Removal',
      description: 'High-powered blowers and vacuums clear turf, beds, patios, and hardscapes so no debris is left behind.'
    },
    {
      icon: '🧹',
      title: 'Detail-Oriented Finish',
      description: 'Crews finish with final mowing or light raking, ensuring turf can breathe and curb appeal is restored instantly.'
    },
    {
      icon: '🚛',
      title: 'On-Site Haul Away',
      description: 'Everything we remove is loaded and hauled off-site—no messy curb piles or municipal pickup waiting times.'
    },
    {
      icon: '⏱️',
      title: 'Same-Week Scheduling',
      description: 'Route teams work exclusively in Central Connecticut, keeping response time tight during peak leaf drop.'
    }
  ];

  const packages = [
    {
      id: 1,
      name: 'Essential Leaf Sweep',
      price: '$179',
      description: 'Ideal for smaller lawns or first-round cleanups',
      features: [
        'Up to 8,000 sq. ft.',
        'Blow & vacuum turf and hardscapes',
        'Bagging and haul away included',
        'Photo confirmation upon completion'
      ]
    },
    {
      id: 2,
      name: 'Premium Leaf Removal',
      price: '$279',
      description: 'Popular for suburban properties with mature trees',
      features: [
        'Up to 18,000 sq. ft.',
        'Landscape bed detailing and final mow/stripe',
        'Gutter line clearing on request',
        'Priority revisit after heavy winds'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Estate & Commercial',
      price: 'Custom Quote',
      description: 'For large residential lots, HOAs, and commercial sites',
      features: [
        'Multi-visit scheduling',
        'Loader and vacuum truck support',
        'Storm debris removal',
        'Dedicated account manager'
      ]
    }
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Routing & Confirmation',
      description: 'Submit your address to receive a tailored estimate and guaranteed visit window within 24 hours.'
    },
    {
      number: '2',
      title: 'Leaf Clearing & Vacuuming',
      description: 'Crews stage blowers, tarps, and vacuum trucks to clear turf, beds, patios, and drives without damaging plantings.'
    },
    {
      number: '3',
      title: 'Detail Work & Haul Away',
      description: 'Edges are redefined, downspouts cleared if requested, and all debris is hauled to our approved disposal sites.'
    },
    {
      number: '4',
      title: 'Follow-Up Assurance',
      description: 'You receive completion photos plus optional revisit scheduling if late-season leaves keep falling.'
    }
  ];

  const serviceAreas = [
    'Berlin, CT',
    'Kensington, CT',
    'New Britain, CT',
    'Plainville, CT',
    'West Hartford, CT',
    'Avon, CT',
    'Hartford, CT',
    'Wethersfield, CT',
    'Cromwell, CT',
    'Middletown, CT',
    'Rocky Hill, CT',
    'Newington, CT',
    'Farmington, CT',
    'Southington, CT',
    'Glastonbury, CT',
    'Manchester, CT',
    'Bristol, CT',
    'Meriden, CT'
  ];

  const testimonials = [
    {
      quote: 'They vacuumed a full acre in a single morning and left the beds cleaner than when spring started.',
      name: 'Heather M.',
      location: 'Farmington, CT'
    },
    {
      quote: 'The team showed up two days after I booked, cleared our gutters, and hauled everything away—no piles at the curb.',
      name: 'Carlos R.',
      location: 'Newington, CT'
    },
    {
      quote: 'Our HOA switched to GD because they keep common areas spotless and give us leaf drop updates every visit.',
      name: 'Lori P.',
      location: 'Berlin, CT'
    }
  ];

  const faqs = [
    {
      question: 'How quickly can you schedule my leaf removal service?',
      answer: 'During peak season we maintain dedicated leaf crews, allowing most properties to be serviced within 2-4 business days. Emergency cleanups after storms can often be handled next-day—call us to confirm availability.'
    },
    {
      question: 'Do you offer repeat visits during the fall?',
      answer: 'Yes. Many homeowners book two or three visits spaced 7-10 days apart to stay ahead of heavy drop periods. We can pre-schedule those windows so you are always on the route.'
    },
    {
      question: 'Can you mulch leaves instead of hauling them away?',
      answer: 'Absolutely. If you prefer mulching for garden beds or composting, just let us know. Our default service includes removal and disposal, but we are happy to match your preferred approach.'
    },
    {
      question: 'Will you clean my gutters during the appointment?',
      answer: 'Gutter cleaning can be added to any package. Let us know when you request your quote and the crew will come ready with ladders and safety gear.'
    },
    {
      question: 'What happens to the leaves after you remove them?',
      answer: 'All organic material is taken to state-approved composting sites. Nothing is left at your property unless you request on-site mulching.'
    },
    {
      question: 'Do you work with commercial properties and HOAs?',
      answer: 'Yes. We manage multi-building campuses, HOA common areas, and retail sites with dedicated supervisors, detailed reporting, and after-hours scheduling when needed.'
    }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Leaf Removal & Fall Cleanup Services',
    description: 'Professional leaf removal, curbside vacuuming, and fall cleanup services for residential and commercial properties in Central Connecticut.',
    serviceType: 'Leaf Removal',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GD Landscaping',
      telephone: phoneNumber,
      url: 'https://www.gdlandscapingllc.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Berlin',
        addressRegion: 'CT',
        addressCountry: 'US'
      }
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 41.6219,
        longitude: -72.7553
      },
      geoRadius: '25 miles'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Leaf Removal Packages',
      itemListElement: packages.map((pkg) => ({
        '@type': 'Offer',
        name: pkg.name,
        description: pkg.description,
        price: pkg.price
      }))
    }
  };

  return (
    <>
      <SEOHead
        title="Leaf Removal Services CT | Fast Fall Cleanup | GD Landscaping"
        description="Need leaves gone fast? GD Landscaping delivers professional leaf removal, curbside vacuuming, and fall cleanup crews across Central Connecticut. Same-week scheduling."
        keywords="leaf removal CT, fall cleanup Connecticut, leaf vacuum service, leaf pickup Berlin CT, fall clean up company, yard waste removal CT"
        canonicalUrl="https://www.gdlandscapingllc.com/leaf-removal"
        structuredData={structuredData}
      />

      <div className="leaf-removal-section">
        <div className="leaf-hero">
          <div className="leaf-hero-overlay"></div>
          <div className="leaf-hero-content">
            <div className="container">
              <div className="hero-badge">
                <span>🍁 Leaf Season Slots Open</span>
              </div>
              <h1>Leaf Removal Services in Central Connecticut</h1>
              <p className="hero-subtitle">
                Fast, thorough leaf cleanup crews ready for your home, HOA, or commercial property. Haul-away, detailing, and route updates included.
              </p>
              <div className="leaf-hero-address">
                <h2>Check Fall Cleanup Availability Near You</h2>
                <AddressAutocomplete />
              </div>
              <div className="hero-buttons">
                <Link to="/instant-quote" className="cta-primary">
                  Get Leaf Removal Quote
                </Link>
                <a href={phoneHref} className="cta-secondary">
                  Call {phoneNumber}
                </a>
              </div>
              <ul className="leaf-hero-highlights">
                <li>Same-week scheduling during peak drop</li>
                <li>Fully insured crews with commercial-grade vacuums</li>
                <li>Before-and-after photo confirmation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container">
          <section className="leaf-benefits">
            <div className="section-header">
              <h2>Why Homeowners Choose Our Leaf Removal Crews</h2>
              <p className="section-subtitle">
                Dedicated fall cleanup teams that keep lawns healthy, walkways safe, and properties photo-ready ahead of winter.
              </p>
            </div>
            <div className="leaf-feature-grid">
              {features.map((feature) => (
                <div className="leaf-feature-card" key={feature.title}>
                  <div className="leaf-feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="leaf-stats">
            <div className="leaf-stat-card">
              <span className="leaf-stat-number">2.3 Days</span>
              <span className="leaf-stat-label">Average turnaround during peak season</span>
            </div>
            <div className="leaf-stat-card">
              <span className="leaf-stat-number">4,500+</span>
              <span className="leaf-stat-label">Cubic yards of leaves hauled last fall</span>
            </div>
            <div className="leaf-stat-card">
              <span className="leaf-stat-number">4.9★</span>
              <span className="leaf-stat-label">Customer rating from Google & Nextdoor</span>
            </div>
          </section>

          <section className="leaf-process">
            <div className="section-header">
              <h2>Our 4-Step Leaf Removal Process</h2>
              <p className="section-subtitle">
                Transparent communication and predictable results from the day you book until the final leaf is hauled away.
              </p>
            </div>
            <div className="leaf-process-steps">
              {processSteps.map((step) => (
                <div className="leaf-process-step" key={step.title}>
                  <div className="leaf-step-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="packages-section">
            <div className="section-header">
              <h2>Leaf Removal Packages</h2>
              <p className="section-subtitle">
                Flexible options to match every property size—from quick sweeps to multi-visit estate programs.
              </p>
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
                      {pkg.features.map((feature) => (
                        <li key={feature}>
                          <span className="feature-check">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="package-footer">
                    <a href={phoneHref} className="package-btn">
                      Reserve Slot
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="leaf-testimonials">
            <div className="section-header">
              <h2>Trusted by Central Connecticut Property Owners</h2>
              <p className="section-subtitle">
                Real feedback from clients who count on GD Landscaping to keep their properties leaf-free all season long.
              </p>
            </div>
            <div className="leaf-testimonial-grid">
              {testimonials.map((testimonial) => (
                <div className="leaf-testimonial-card" key={testimonial.name}>
                  <p className="leaf-testimonial-quote">“{testimonial.quote}”</p>
                  <div className="leaf-testimonial-author">
                    <span className="leaf-testimonial-name">{testimonial.name}</span>
                    <span className="leaf-testimonial-location">{testimonial.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="leaf-service-area">
            <div className="section-header">
              <h2>Leaf Removal Routes Covering Hartford County</h2>
              <p className="section-subtitle">
                Dedicated cleanups across the I-91 and Route 9 corridors with commercial-grade vacuums staged in each service zone.
              </p>
            </div>
            <div className="leaf-service-area-grid">
              <ul className="leaf-area-list">
                {serviceAreas.map((area) => (
                  <li key={area}>
                    <span>📍</span>
                    {area}
                  </li>
                ))}
              </ul>
              <div className="leaf-service-note">
                <h3>Need a rush cleanup?</h3>
                <p>
                  Call {phoneNumber} for next-day availability. Crews can deploy additional vacuum trailers after major storms or
                  weekly leaf drops.
                </p>
                <Link to="/contact" className="cta-primary">
                  Request Scheduling Help
                </Link>
              </div>
            </div>
          </section>

          <section className="leaf-cta-bar">
            <div className="leaf-cta-content">
              <h2>Ready to Clear Your Property?</h2>
              <p>Lock in your preferred cleanup window before peak fall weekends fill up.</p>
            </div>
            <div className="leaf-cta-actions">
              <Link to="/instant-quote" className="cta-primary">
                Start Instant Quote
              </Link>
              <a href={phoneHref} className="cta-secondary">
                Talk to a Leaf Specialist
              </a>
            </div>
          </section>
        </div>

        <QuoteSection
          title="Get Your Leaf Removal Estimate"
          subtitle="Share property details and photos for the most accurate fall cleanup plan."
          locationName="Leaf Removal"
          source="Leaf Removal Landing Page"
        />

        <FAQSection faqs={faqs} title="Leaf Removal FAQs" />
      </div>
    </>
  );
};

export default LeafRemovalPage;
